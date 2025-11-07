import { useState, useEffect } from "react";
import { X, Save, Gift, Plus, ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { ValueMapContextHints, CustomerConnectionPreview } from "./ValueMapContextHints";
import { getColorVariants } from "../lib/colorUtils";

interface ValueOption {
  text: string;
  color: string;
}

interface Tag {
  text: string;
  color: string;
}

interface Props {
  userId: string;
  selectedSegment: string;
  selectedValue: string | null;
  onSelectValue: (value: string) => void;
  onComplete?: () => void; // ✅ Callback pro dokončení lekce
  onAchievementUnlocked?: (achievementId: string) => void; // 🎉 Achievement callback
  onNavigateToLesson?: (lessonId: number) => void; // 🎯 Navigace do lekcí
}

// 🎨 Helper pro generování barev podle hodnoty
function getValueBasedColors(valueColor: string) {
  // Pro bílou/šedou použij fixní barvy
  if (!valueColor || valueColor === '#d1d5db') {
    return {
      product: '#f59e0b',
      painReliever: '#8b5cf6',
      gainCreator: '#10b981'
    };
  }
  
  // Převeď hex na RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 59, g: 130, b: 246 };
  };
  
  const rgb = hexToRgb(valueColor);
  
  // Products - základní barva (100% sytosti)
  const product = `rgb(${rgb.r} ${rgb.g} ${rgb.b})`;
  
  // Pain Relievers - tmavší odstín (70%)
  const painReliever = `rgb(${Math.max(0, rgb.r * 0.7)} ${Math.max(0, rgb.g * 0.7)} ${Math.max(0, rgb.b * 0.7)})`;
  
  // Gain Creators - světlejší odstín (130%)
  const gainCreator = `rgb(${Math.min(255, rgb.r + (255 - rgb.r) * 0.3)} ${Math.min(255, rgb.g + (255 - rgb.g) * 0.3)} ${Math.min(255, rgb.b + (255 - rgb.b) * 0.3)})`;
  
  return {
    product,
    painReliever,
    gainCreator
  };
}

function normalizeColor(color: string): string {
  const colorMap: Record<string, string> = {
    'blue': '#3b82f6',
    'green': '#22c55e',
    'yellow': '#eab308',
    'red': '#ef4444',
    'purple': '#8b5cf6',
    'pink': '#ec4899',
    'orange': '#f59e0b',
    'white': '#d1d5db',
    'gray': '#6b7280'
  };
  
  if (color.startsWith('#')) return color;
  return colorMap[color.toLowerCase()] || '#3b82f6';
}

export function VPCValueMapSquare({ userId, selectedSegment, selectedValue, onSelectValue, onComplete, onAchievementUnlocked, onNavigateToLesson }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [products, setProducts] = useState<Tag[]>([]);
  const [painRelievers, setPainRelievers] = useState<Tag[]>([]);
  const [gainCreators, setGainCreators] = useState<Tag[]>([]);
  
  const [newProduct, setNewProduct] = useState("");
  const [newPainReliever, setNewPainReliever] = useState("");
  const [newGainCreator, setNewGainCreator] = useState("");
  
  const [isSaving, setIsSaving] = useState(false);
  const [vpcId, setVpcId] = useState<number | null>(null);
  
  const [availableValues, setAvailableValues] = useState<ValueOption[]>([]);
  const [availableSegments, setAvailableSegments] = useState<SegmentOption[]>([]);
  
  // ✅ Jobs/Pains/Gains pro načítání z databáze
  const [jobs, setJobs] = useState<Tag[]>([]);
  const [pains, setPains] = useState<Tag[]>([]);
  const [gains, setGains] = useState<Tag[]>([]);
  
  // ✅ Customer Profile data pro context hints
  const [customerProfileData, setCustomerProfileData] = useState<{
    jobs: Array<{ text: string }>;
    pains: Array<{ text: string }>;
    gains: Array<{ text: string }>;
  } | null>(null);
  
  interface SegmentOption {
    text: string;
    color: string;
  }
  
  useEffect(() => {
    loadSegmentsAndValues();
    loadCustomerProfile();
  }, [userId, selectedSegment]);
  
  // ✅ Sleduj změnu segmentu - když se změní, zkontroluj jestli aktuální hodnota odpovídá novému segmentu
  useEffect(() => {
    if (!selectedSegment || !selectedValue || availableValues.length === 0 || availableSegments.length === 0) {
      return;
    }
    
    const segmentObj = availableSegments.find(s => s.text === selectedSegment);
    const valueObj = availableValues.find(v => v.text === selectedValue);
    
    // Pokud hodnota NEMÁ stejnou barvu jako segment, reset!
    if (segmentObj && valueObj && segmentObj.color !== valueObj.color) {
      console.log('🔄 Segment se změnil, hodnota neodpovídá - hledám matching hodnotu...', {
        segment: selectedSegment,
        segmentColor: segmentObj.color,
        currentValue: selectedValue,
        currentValueColor: valueObj.color
      });
      
      // Najdi hodnotu se stejnou barvou jako segment
      const matchingValue = availableValues.find(v => v.color === segmentObj.color);
      
      if (matchingValue) {
        console.log('✅ Nalezena matching hodnota:', matchingValue.text);
        onSelectValue(matchingValue.text);
        toast.info(`🔄 Automaticky vybrána hodnota "${matchingValue.text}" pro segment "${selectedSegment}"`);
      } else {
        console.warn('⚠️ Žádná hodnota neodpovídá barvě segmentu!');
        // Reset na prázdnou
        onSelectValue('');
        toast.warning(`⚠️ Pro segment "${selectedSegment}" nemáte žádnou odpovídající hodnotu. Vyberte jinou hodnotu.`);
      }
    }
  }, [selectedSegment, selectedValue, availableValues, availableSegments]);
  
  // ✅ Load Customer Profile data pro context hints
  const loadCustomerProfile = async () => {
    if (!userId || !selectedSegment) return;
    
    try {
      const { data } = await supabase
        .from('value_proposition_canvas')
        .select('jobs, pains, gains')
        .eq('user_id', userId)
        .eq('segment_name', selectedSegment)
        .maybeSingle();
      
      if (data) {
        setCustomerProfileData({
          jobs: data.jobs || [],
          pains: data.pains || [],
          gains: data.gains || []
        });
      }
    } catch (err) {
      console.error('Error loading customer profile:', err);
    }
  };
  
  const loadSegmentsAndValues = async () => {
    if (!userId || userId === 0) return;
    
    try {
      // Load segments
      const { data: segData } = await supabase
        .from('user_canvas_data')
        .select('content')
        .eq('user_id', userId)
        .eq('section_key', 'segments')
        .maybeSingle();
      
      if (segData && Array.isArray(segData.content)) {
        setAvailableSegments(segData.content.map((s: SegmentOption) => ({
          text: s.text,
          color: normalizeColor(s.color)
        })));
      }
      
      // Load values
      const { data, error } = await supabase
        .from('user_canvas_data')
        .select('content')
        .eq('user_id', userId)
        .eq('section_key', 'value')
        .maybeSingle();
      
      if (error) return;
      
      if (data && Array.isArray(data.content) && data.content.length > 0) {
        const normalized = data.content.map((item: ValueOption) => ({
          text: item.text,
          color: normalizeColor(item.color)
        }));
        
        setAvailableValues(normalized);
        
        // Auto-select první hodnotu se stejnou barvou jako segment
        if (!selectedValue && normalized.length > 0) {
          const segmentObj = availableSegments.find(s => s.text === selectedSegment);
          const matchingValue = normalized.find(v => v.color === segmentObj?.color);
          onSelectValue(matchingValue?.text || normalized[0].text);
        }
      }
    } catch (err) {
      console.error('VPC load error:', err);
    }
  };
  
  useEffect(() => {
    if (!userId || !selectedSegment || !selectedValue) return;
    
    // ✅ KONTROLA PŘED NAČTENÍM: Odpovídá hodnota segmentu?
    const segmentObj = availableSegments.find(s => s.text === selectedSegment);
    const valueObj = availableValues.find(v => v.text === selectedValue);
    
    if (segmentObj && valueObj && segmentObj.color !== valueObj.color) {
      console.error('❌ NEKONZISTENTNÍ STAV - hodnota neodpovídá segmentu!', {
        segment: selectedSegment,
        segmentColor: segmentObj.color,
        value: selectedValue,
        valueColor: valueObj.color
      });
      
      // BLOKUJ načítání dat! Resetuj na Krok 0
      setCurrentStep(0);
      setProducts([]);
      setPainRelievers([]);
      setGainCreators([]);
      setJobs([]);
      setPains([]);
      setGains([]);
      
      toast.error(`❌ Hodnota "${selectedValue}" neodpovídá segmentu "${selectedSegment}"!`, {
        description: 'Vyberte prosím odpovídající hodnotu se stejnou barvou.',
        duration: 6000
      });
      
      // Zkus najít správnou hodnotu
      const matchingValue = availableValues.find(v => v.color === segmentObj.color);
      if (matchingValue) {
        setTimeout(() => {
          onSelectValue(matchingValue.text);
          toast.success(`✅ Automaticky vybrána hodnota "${matchingValue.text}"`);
        }, 500);
      } else {
        onSelectValue('');
      }
      
      return; // STOP! Nedělej nic dalšího
    }
    
    const loadVPC = async () => {
      try {
        // DŮLEŽITÉ: Načítáme podle HODNOTY, ne jen segmentu!
        const { data } = await supabase
          .from('value_proposition_canvas')
          .select('*')
          .eq('user_id', userId)
          .eq('segment_name', selectedSegment)
          .eq('selected_value', selectedValue)
          .maybeSingle();
        
        if (data) {
          setVpcId(data.id);
          
          // ✅ PŘEKRESLI VŠECHNY ŠTÍTKY na barvu aktuální hodnoty!
          const valueObj = availableValues.find(v => v.text === selectedValue);
          let currentValueColor = valueObj?.color;
          
          // ✅ NORMALIZE barvu (stejná logika jako FitValidatorV2)
          const colorMap: Record<string, string> = {
            'blue': '#3b82f6',
            'green': '#22c55e',
            'yellow': '#eab308',
            'red': '#ef4444',
            'purple': '#8b5cf6',
            'pink': '#ec4899',
            'orange': '#f59e0b',
            'gray': '#6b7280'
          };
          
          if (!currentValueColor) {
            currentValueColor = '#f59e0b'; // default
          } else if (typeof currentValueColor === 'string' && !currentValueColor.startsWith('#')) {
            currentValueColor = colorMap[currentValueColor.toLowerCase()] || '#f59e0b';
          }
          
          console.log('🔄 VPCValueMapSquare - Načítám data pro hodnotu:', selectedValue);
          console.log('📦 RAW DATA FROM DB:', { products: data.products, painRelievers: data.pain_relievers, gainCreators: data.gain_creators });
          console.log('📦 RAW PRODUCTS DETAILED:', JSON.stringify(data.products, null, 2));
          
          // ✅ Normalizuj stará data (string → object) ALE ZACHOVEJ původní barvu!
          const normalizeItems = (items: any[]) => {
            if (!items) {
              console.log('⚠️ Items is null/undefined!');
              return [];
            }
            console.log('🔄 Normalizing items:', items);
            
            // ✅ FILTER OUT poškozená data (bez text property)
            return items
              .filter((item, idx) => {
                if (typeof item === 'string') {
                  return item.trim().length > 0; // Ignoruj prázdné stringy
                }
                if (item && typeof item === 'object') {
                  const hasText = item.text && item.text.trim().length > 0;
                  if (!hasText) {
                    console.warn(`⚠️ [${idx}] IGNORING item without text:`, JSON.stringify(item));
                  }
                  return hasText; // ✅ IGNORUJ položky bez textu!
                }
                return false;
              })
              .map((item, idx) => {
                if (typeof item === 'string') {
                  console.log(`  [${idx}] STRING:`, item);
                  return { text: item, color: currentValueColor };
                } else {
                  // ✅ VŽDY použij AKTUÁLNÍ barvu hodnoty (ne starou uloženou)
                  console.log(`  [${idx}] OBJECT:`, item.text, '→ FORCE color:', currentValueColor);
                  return { text: item.text, color: normalizeColor(currentValueColor!) };
                }
              });
          };
          
          const normalizedProducts = normalizeItems(data.products || []);
          const normalizedPainRelievers = normalizeItems(data.pain_relievers || []);
          const normalizedGainCreators = normalizeItems(data.gain_creators || []);
          
          // ✅ PŘEPIŠ BARVY I U JOBS/PAINS/GAINS!
          const normalizedJobs = normalizeItems(data.jobs || []);
          const normalizedPains = normalizeItems(data.pains || []);
          const normalizedGains = normalizeItems(data.gains || []);
          
          console.log('✅ NORMALIZED JOBS/PAINS/GAINS:', { jobs: normalizedJobs, pains: normalizedPains, gains: normalizedGains });
          
          setProducts(normalizedProducts);
          setPainRelievers(normalizedPainRelievers);
          setGainCreators(normalizedGainCreators);
          setJobs(normalizedJobs);
          setPains(normalizedPains);
          setGains(normalizedGains);
          
          // Pokud už má data, přeskoč na shrnutí
          if (normalizedProducts.length > 0 || normalizedGainCreators.length > 0 || normalizedPainRelievers.length > 0) {
            setCurrentStep(4);
          }
        } else {
          // Žádná data pro tuto hodnotu - reset na začátek
          setVpcId(null);
          setProducts([]);
          setPainRelievers([]);
          setGainCreators([]);
          setJobs([]);
          setPains([]);
          setGains([]);
          if (currentStep > 0) {
            setCurrentStep(1);
          }
        }
      } catch (err) {
        console.error('Load VPC error:', err);
      }
    };
    
    loadVPC();
  }, [userId, selectedSegment, selectedValue]);
  
  useEffect(() => {
    if (!userId || !selectedSegment) return;
    
    const saveTimeout = setTimeout(async () => {
      await saveVPC();
    }, 1000);
    
    return () => clearTimeout(saveTimeout);
  }, [products, painRelievers, gainCreators, selectedValue]);
  
  const saveVPC = async () => {
    if (!userId || !selectedSegment || isSaving) return;
    
    if (products.length === 0 && painRelievers.length === 0 && gainCreators.length === 0) {
      return;
    }
    
    setIsSaving(true);
    
    try {
      const vpcData = {
        user_id: userId,
        segment_name: selectedSegment,
        selected_value: selectedValue,
        products,
        pain_relievers: painRelievers,
        gain_creators: gainCreators,
        updated_at: new Date().toISOString()
      };
      
      if (vpcId) {
        const { error } = await supabase
          .from('value_proposition_canvas')
          .update(vpcData)
          .eq('id', vpcId);
        
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('value_proposition_canvas')
          .insert([vpcData])
          .select()
          .single();
        
        if (error) throw error;
        
        if (data) {
          setVpcId(data.id);
        }
      }
      
      // ⏸️ ACHIEVEMENT přesunut do onComplete callback (triggeruje se až po kliknutí "Dokončit lekci")
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setIsSaving(false);
    }
  };
  
  const addProduct = () => {
    if (!newProduct.trim()) return;
    if (products.length >= 8) {
      toast.error('Maximum 8 produktů!');
      return;
    }
    
    // ✅ KONTROLA DUPLICIT (fix: p může být string nebo object!)
    const isDuplicate = products.some(p => {
      const pText = typeof p === 'string' ? p : p?.text;
      return pText?.toLowerCase() === newProduct.trim().toLowerCase();
    });
    
    console.log('🔍 Duplicate check result:', isDuplicate, 'for:', newProduct);
    
    if (isDuplicate) {
      console.log('❌ DUPLICATE DETECTED - showing toast #1');
      toast.error('❌ Tento produkt již existuje! Použijte jiný text.');
      return;
    }
    
    // ✅ VŠECHNY štítky mají barvu HODNOTY (ne různé barvy)!
    const valueColor = selectedValueObj?.color || selectedSegmentObj?.color || '#f59e0b';
    setProducts([...products, { 
      text: newProduct.trim(), 
      color: normalizeColor(valueColor)
    }]);
    setNewProduct("");
  };
  
  const addPainReliever = () => {
    console.log('🔵 addPainReliever called with:', newPainReliever);
    if (!newPainReliever.trim()) return;
    if (painRelievers.length >= 20) {
      toast.error('Maximum 20 řešení!');
      return;
    }
    
    // ✅ KONTROLA DUPLICIT (fix: pr může být string nebo object!)
    if (painRelievers.some(pr => {
      const prText = typeof pr === 'string' ? pr : pr?.text;
      return prText?.toLowerCase() === newPainReliever.trim().toLowerCase();
    })) {
      toast.error('❌ Toto řešení již existuje! Použijte jiný text.');
      return;
    }
    
    // ✅ VŠECHNY štítky mají barvu HODNOTY!
    const valueColor = selectedValueObj?.color || selectedSegmentObj?.color || '#8b5cf6';
    setPainRelievers([...painRelievers, { 
      text: newPainReliever.trim(), 
      color: normalizeColor(valueColor)
    }]);
    setNewPainReliever("");
  };
  
  const addGainCreator = () => {
    console.log('🔵 addGainCreator called with:', newGainCreator);
    if (!newGainCreator.trim()) return;
    if (gainCreators.length >= 20) {
      toast.error('Maximum 20 přínosů!');
      return;
    }
    
    // ✅ KONTROLA DUPLICIT (fix: gc může být string nebo object!)
    if (gainCreators.some(gc => {
      const gcText = typeof gc === 'string' ? gc : gc?.text;
      return gcText?.toLowerCase() === newGainCreator.trim().toLowerCase();
    })) {
      toast.error('❌ Tento přínos již existuje! Použijte jiný text.');
      return;
    }
    
    // ✅ VŠECHNY štítky mají barvu HODNOTY!
    const valueColor = selectedValueObj?.color || selectedSegmentObj?.color || '#10b981';
    setGainCreators([...gainCreators, { 
      text: newGainCreator.trim(), 
      color: normalizeColor(valueColor)
    }]);
    setNewGainCreator("");
  };
  
  const selectedValueObj = availableValues.find(v => v.text === selectedValue);
  const selectedSegmentObj = availableSegments.find(s => s.text === selectedSegment);
  
  // Filtrovat hodnoty podle barvy segmentu
  const filteredValues = availableValues.filter(v => {
    if (!selectedSegmentObj) return true;
    return v.color === selectedSegmentObj.color;
  });
  
  // ✅ AUTOMATICKY VYRESETUJ hodnotu když nepatří k aktuálnímu segmentu!
  useEffect(() => {
    if (!selectedValue || !selectedSegmentObj || availableValues.length === 0) return;
    
    // Zjisti, jestli aktuální hodnota je v seznamu povolených hodnot pro tento segment
    const isValueInFilteredList = filteredValues.some(v => v.text === selectedValue);
    
    if (!isValueInFilteredList) {
      console.log('🔄 Auto-reset: Hodnota', selectedValue, 'nepatří k segmentu', selectedSegment);
      onSelectValue('');
      setCurrentStep(0);
      setProducts([]);
      setPainRelievers([]);
      setGainCreators([]);
      toast.info(`✨ Změnil se segment → Vyberte hodnotu pro "${selectedSegment}"`, {
        duration: 4000
      });
    }
  }, [selectedSegment, filteredValues, selectedValue]);
  
  const canContinueStep1 = products.length > 0;
  const canContinueStep2 = gainCreators.length > 0;
  const canContinueStep3 = painRelievers.length > 0;
  
  const steps = [
    { label: 'Hodnota', icon: '🎁', completed: !!selectedValue },
    { label: 'Produkty', icon: '📦', completed: products.length > 0 },
    { label: 'Jak naplňujeme', icon: '📈', completed: gainCreators.length > 0 },
    { label: 'Jak řešíme', icon: '💊', completed: painRelievers.length > 0 },
    { label: 'Hotovo', icon: '✅', completed: false }
  ];
  
  // ✅ Zobrazit scroll down JEN když je hodnota BÍLÁ (= sdílená mezi více segmenty)
  const isValueWhite = selectedValueObj && (
    selectedValueObj.color === '#d1d5db' || 
    selectedValueObj.color === '#ffffff' || 
    selectedValueObj.color.toLowerCase() === 'white'
  );
  
  // 🎨 Získat barevné varianty podle vybrané hodnoty
  const colorVariants = getColorVariants(selectedValueObj?.color);
  
  // ✅ BLOKUJ KROKY 1+ pokud hodnota neodpovídá segmentu!
  const isValueMismatch = selectedValue && selectedSegmentObj && selectedValueObj && 
                          selectedSegmentObj.color !== selectedValueObj.color;
  
  // Pokud je nekonzistence, FORCE reset na Krok 0
  if (isValueMismatch && currentStep > 0) {
    setTimeout(() => {
      setCurrentStep(0);
      setProducts([]);
      setPainRelievers([]);
      setGainCreators([]);
      toast.error(`❌ Hodnota "${selectedValue}" neodpovídá segmentu "${selectedSegment}"! Vyberte správnou hodnotu.`, {
        duration: 6000
      });
    }, 100);
  }
  
  return (
    <div className="w-full space-y-6">
      {/* Value Switcher - ZOBRAZÍ SE JEN když je hodnota BÍLÁ (sdílená) */}
      {currentStep >= 1 && availableValues.length > 1 && isValueWhite && (
        <div className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl border-2 border-blue-200 p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-blue-500 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl flex-shrink-0">
              🎁
            </div>
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium text-blue-700 mb-1 block">
                Vybraná hodnota:
                {selectedSegmentObj && (
                  <span className="ml-2 text-xs text-blue-500 hidden sm:inline">
                    (pro segment: {selectedSegment})
                  </span>
                )}
              </label>
              <select
                value={selectedValue || ''}
                onChange={(e) => {
                  onSelectValue(e.target.value);
                  setCurrentStep(1);
                }}
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-white border-2 border-blue-300 rounded-lg font-bold text-sm sm:text-base text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none cursor-pointer"
              >
                {filteredValues.length === 0 ? (
                  <option value="">Žádné hodnoty pro tento segment</option>
                ) : (
                  filteredValues.map((value, idx) => (
                    <option key={idx} value={value.text}>
                      {value.text}
                    </option>
                  ))
                )}
              </select>
              <p className="text-[10px] sm:text-xs text-blue-600 mt-1">
                ⚪ Tato hodnota je BÍLÁ - patří k více segmentům. Zde můžete přepínat mezi nimi.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Progress Stepper - Responzivní */}
      <div className="mb-4 sm:mb-8">
        <div className="flex items-center justify-between relative px-2">
          {/* Progress Line */}
          <div className="absolute top-4 sm:top-5 left-0 right-0 h-0.5 sm:h-1 bg-gray-200 -z-10">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center relative">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg transition-all ${
                  idx === currentStep
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg scale-110'
                    : idx < currentStep || step.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step.completed && idx < currentStep ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : step.icon}
              </div>
              <span className={`text-[10px] sm:text-xs mt-1 sm:mt-2 font-medium text-center max-w-[60px] sm:max-w-none leading-tight ${idx === currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Content Area */}
      <div>
        {/* STEP 0: Výběr hodnoty */}
        {currentStep === 0 && (
          <div
            key="step0"
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-blue-200 p-4 sm:p-8 animate-in fade-in slide-in-from-right-4 duration-300"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-2xl sm:text-3xl shadow-lg flex-shrink-0">
                🎁
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-2xl font-bold text-blue-900">Vyberte hodnotu</h2>
                <p className="text-sm sm:text-base text-blue-700">Pro každou HODNOTU máte samostatnou mapu.</p>
                {selectedSegmentObj && (
                  <div className="mt-2 flex items-center gap-2">
                    <div
                      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: selectedSegmentObj.color }}
                    />
                    <span className="text-xs sm:text-sm text-blue-600 truncate">
                      Pro segment: <strong>{selectedSegment}</strong>
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {filteredValues.length === 0 ? (
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🎯</div>
                <p className="text-yellow-900 mb-2 font-bold">Žádné hodnoty pro tento segment</p>
                <p className="text-sm text-yellow-800 mb-3">
                  Segment <strong>{selectedSegment}</strong> nemá žádné hodnoty se stejnou barvou
                </p>
                <div className="bg-white rounded-lg p-3 text-left text-xs text-gray-700 mb-4">
                  <p className="mb-1">💡 <strong>Co to znamená?</strong></p>
                  <p className="mb-2">V <strong>Modulu 1, Lekce 2 (Hodnotová nabídka)</strong> přidejte hodnotu se stejnou barvou jako váš segment:</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: selectedSegmentObj?.color }}></span>
                    <span className="font-medium">{selectedSegment}</span>
                  </div>
                  <p className="mt-2 text-xs text-gray-600">
                    Klikněte na hodnotu a nastavte ji stejnou barvou jako má segment "{selectedSegment}"
                  </p>
                </div>
                {onNavigateToLesson && (
                  <button
                    onClick={() => onNavigateToLesson(2)}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Přejít do Lekce 2: Hodnotová nabídka
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="mb-4 bg-blue-100 border border-blue-300 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Zobrazeny pouze hodnoty pro tento segment</strong> (stejná barva)
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {filteredValues.map((value, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onSelectValue(value.text);
                      }}
                      className={`p-6 rounded-xl border-3 text-left transition-all hover:scale-102 active:scale-98 ${
                        selectedValue === value.text
                          ? 'bg-blue-100 border-blue-500 shadow-lg scale-105'
                          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 rounded-full flex-shrink-0"
                          style={{ backgroundColor: value.color }}
                        />
                        <span className="font-bold text-gray-900 text-lg">{value.text}</span>
                      </div>
                      {selectedValue === value.text && (
                        <div className="mt-2 flex items-center gap-2 text-blue-600 text-sm">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Vybráno</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-between items-center gap-4">
                  {/* 🗑️ Reset tlačítko - smaže data pro aktuální hodnotu */}
                  {vpcId && selectedValue && (
                    <button
                      onClick={async () => {
                        if (!window.confirm(`Opravdu chcete smazat všechna data pro hodnotu "${selectedValue}"?\n\nTato akce je nevratná!`)) {
                          return;
                        }
                        
                        try {
                          // 1️⃣ Vymaž FIT mappings z Customer Profile (pokud existují)
                          const { data: customerProfile } = await supabase
                            .from('value_proposition_canvas')
                            .select('id, fit_validation_data')
                            .eq('user_id', userId)
                            .eq('segment_name', selectedSegment)
                            .is('selected_value', null)
                            .maybeSingle();
                          
                          if (customerProfile && customerProfile.fit_validation_data) {
                            const cleanProgressData = {
                              ...customerProfile.fit_validation_data,
                              painRelieverMappings: {},
                              gainCreatorMappings: {},
                              productMappings: {},
                              selectedValueUsed: null,
                              lastSaved: new Date().toISOString()
                            };
                            
                            await supabase
                              .from('value_proposition_canvas')
                              .update({ fit_validation_data: cleanProgressData })
                              .eq('id', customerProfile.id);
                            
                            console.log('✅ FIT mappings vymazány z Customer Profile');
                          }
                          
                          // 2️⃣ Vymaž Value Map záznam z DB
                          const { error } = await supabase
                            .from('value_proposition_canvas')
                            .delete()
                            .eq('id', vpcId);
                          
                          if (error) throw error;
                          
                          // 3️⃣ Reset lokálního stavu
                          setVpcId(null);
                          setProducts([]);
                          setPainRelievers([]);
                          setGainCreators([]);
                          setJobs([]);
                          setPains([]);
                          setGains([]);
                          setCurrentStep(1);
                          
                          toast.success(`✅ Data pro hodnotu "${selectedValue}" byla vymazána včetně FIT propojení`);
                        } catch (error) {
                          console.error('Error deleting value map:', error);
                          toast.error('Chyba při mazání dat');
                        }
                      }}
                      className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm flex items-center gap-2 border border-red-200 transition-all"
                    >
                      <X className="w-4 h-4" />
                      Smazat data pro tuto hodnotu
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      if (selectedValue) {
                        setCurrentStep(1);
                      } else {
                        toast.error('Vyberte hodnotu!');
                      }
                    }}
                    disabled={!selectedValue}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                  >
                    Pokračovat
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
        
        {/* STEP 1: Produkty */}
        {currentStep === 1 && (
          <div
            key="step1"
            className="bg-orange-50 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-orange-300 p-4 sm:p-8 animate-in fade-in slide-in-from-right-4 duration-300"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-orange-500 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-2xl sm:text-3xl shadow-lg flex-shrink-0">
                📦
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-orange-800 text-lg sm:text-2xl font-bold">Produkty a služby</h2>
                <p className="text-orange-700 text-sm sm:text-base truncate">Pro: <span className="font-bold">{selectedValue}</span> ({products.length}/8)</p>
              </div>
            </div>
            
            {/* ✅ Context Hints */}
            <ValueMapContextHints
              currentStep={1}
              segment={selectedSegment}
              value={selectedValue || ""}
              customerData={customerProfileData || undefined}
            />
            
            {/* Input - Stack na mobilu */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
              <input
                type="text"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                placeholder="Např.: Online kurz, 1-1 konzultace..."
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-orange-400 rounded-xl text-sm sm:text-base bg-white shadow-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    console.log('⌨️ Enter key pressed in product input');
                    addProduct();
                  }
                }}
              />
              <button
                onClick={() => {
                  console.log('🖱️ Button clicked for product');
                  addProduct();
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-2.5 sm:py-3 shadow-md transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Přidat</span>
              </button>
            </div>
            
            {/* Štítky - Responzivní grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6 min-h-[150px] sm:min-h-[200px]">
              {products.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center text-orange-500 h-32 sm:h-48">
                  <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3 opacity-50" />
                  <p className="text-center text-sm sm:text-base px-4">Začněte přidáváním produktů a služeb</p>
                </div>
              ) : (
                products.map((product, idx) => {
                  const productText = typeof product === 'string' ? product : product?.text;
                  
                  console.log('🔍 RENDERING PRODUCT:', { product, productText, colorVariants, type: typeof product });
                  
                  return (
                  <div
                    key={idx}
                    className="group relative animate-in fade-in zoom-in-95 duration-200"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div
                      className="w-full h-20 sm:h-28 rounded-lg sm:rounded-xl flex items-center justify-center font-medium shadow-lg hover:scale-105 transition-all cursor-pointer p-2 sm:p-3 text-white"
                      style={{ backgroundColor: colorVariants.icon }}
                    >
                      <span className="text-center text-xs sm:text-sm line-clamp-4 break-words">
                        {productText || '[PRÁZDNÉ]'}
                      </span>
                      <button
                        onClick={() => setProducts(products.filter((_, i) => i !== idx))}
                        className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 rounded-full p-1 sm:p-1.5 shadow-lg hover:bg-red-600"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </button>
                    </div>
                  </div>
                  );
                })
              )}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between gap-2">
              <button
                onClick={() => setCurrentStep(0)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium flex items-center gap-1.5 sm:gap-2 transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Zpět</span>
              </button>
              <button
                onClick={() => {
                  if (canContinueStep1) {
                    setCurrentStep(2);
                  } else {
                    toast.error('Přidejte alespoň 1 produkt!');
                  }
                }}
                disabled={!canContinueStep1}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 sm:gap-2 transition-all text-sm sm:text-base"
              >
                Pokračovat
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        )}
        
        {/* STEP 2: Přínosy */}
        {currentStep === 2 && (
          <div
            key="step2"
            className="bg-green-50 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-green-300 p-4 sm:p-8 animate-in fade-in slide-in-from-right-4 duration-300"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-green-500 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-2xl sm:text-3xl shadow-lg flex-shrink-0">
                📈
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-green-800 text-lg sm:text-2xl font-bold">Jak naplňujeme očekávání</h2>
                <p className="text-green-700 text-sm sm:text-base truncate">Jak <span className="font-bold">{selectedValue}</span> vytváří hodnotu? ({gainCreators.length}/20)</p>
              </div>
            </div>
            
            {/* ✅ Context Hints pro Gain Creators */}
            <ValueMapContextHints
              currentStep={2}
              segment={selectedSegment}
              value={selectedValue || ""}
              customerData={customerProfileData || undefined}
            />
            
            {/* ✅ Preview návaznosti */}
            {customerProfileData && customerProfileData.gains.length > 0 && gainCreators.length > 0 && (
              <CustomerConnectionPreview
                type="gains"
                customerItems={customerProfileData.gains}
                valueItems={gainCreators}
              />
            )}
            
            {/* Input - Stack na mobilu */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
              <input
                type="text"
                value={newGainCreator}
                onChange={(e) => setNewGainCreator(e.target.value)}
                placeholder="Např.: Zvýší prodeje, ušetří čas..."
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-green-400 rounded-xl text-sm sm:text-base bg-white shadow-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') addGainCreator();
                }}
              />
              <button
                onClick={addGainCreator}
                className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-6 py-2.5 sm:py-3 shadow-md transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Přidat</span>
              </button>
            </div>
            
            {/* Štítky - Responzivní */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 min-h-[150px] sm:min-h-[200px]">
              {gainCreators.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center text-green-500 h-32 sm:h-48">
                  <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3 opacity-50" />
                  <p className="text-center text-sm sm:text-base px-4">Popište přínosy, které vytváříte</p>
                </div>
              ) : (
                gainCreators.map((creator, idx) => {
                  const creatorText = typeof creator === 'string' ? creator : creator?.text;
                  
                  console.log('🔍 RENDERING GAIN CREATOR:', { creator, creatorText, colorVariants, type: typeof creator });
                  
                  return (
                  <div
                    key={idx}
                    className="group relative animate-in fade-in zoom-in-95 duration-200"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div
                      className="w-28 h-20 sm:w-32 sm:h-24 rounded-lg sm:rounded-xl flex items-center justify-center font-medium shadow-lg hover:scale-105 transition-all cursor-pointer p-2 sm:p-3 text-white"
                      style={{ backgroundColor: colorVariants.icon }}
                    >
                      <span className="text-center text-xs sm:text-sm line-clamp-4 break-words">
                        {creatorText || '[PRÁZDNÉ]'}
                      </span>
                      <button
                        onClick={() => setGainCreators(gainCreators.filter((_, i) => i !== idx))}
                        className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 rounded-full p-1 sm:p-1.5 shadow-lg hover:bg-red-600"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </button>
                    </div>
                  </div>
                  );
                })
              )}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between gap-2">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium flex items-center gap-1.5 sm:gap-2 transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Zpět</span>
              </button>
              <button
                onClick={() => {
                  if (canContinueStep2) {
                    setCurrentStep(3);
                  } else {
                    toast.error('Přidejte alespoň 1 přínos!');
                  }
                }}
                disabled={!canContinueStep2}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 sm:gap-2 transition-all text-sm sm:text-base"
              >
                Pokračovat
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        )}
        
        {/* STEP 3: Řešení */}
        {currentStep === 3 && (
          <div
            key="step3"
            className="bg-purple-50 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-purple-300 p-4 sm:p-8 animate-in fade-in slide-in-from-right-4 duration-300"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-purple-500 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-2xl sm:text-3xl shadow-lg flex-shrink-0">
                💊
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-purple-800 text-lg sm:text-2xl font-bold">Jak řešíme obavy</h2>
                <p className="text-purple-700 text-sm sm:text-base truncate">Jak <span className="font-bold">{selectedValue}</span> řeší problémy? ({painRelievers.length}/20)</p>
              </div>
            </div>
            
            {/* ✅ Context Hints pro Pain Relievers */}
            <ValueMapContextHints
              currentStep={3}
              segment={selectedSegment}
              value={selectedValue || ""}
              customerData={customerProfileData || undefined}
            />
            
            {/* ✅ Preview návaznosti */}
            {customerProfileData && customerProfileData.pains.length > 0 && painRelievers.length > 0 && (
              <CustomerConnectionPreview
                type="pains"
                customerItems={customerProfileData.pains}
                valueItems={painRelievers}
              />
            )}
            
            {/* Input - Stack na mobilu */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
              <input
                type="text"
                value={newPainReliever}
                onChange={(e) => setNewPainReliever(e.target.value)}
                placeholder="Např.: Odstraní nejistotu, sníží náklady..."
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-purple-400 rounded-xl text-sm sm:text-base bg-white shadow-md focus:ring-2 focus:ring-purple-400 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') addPainReliever();
                }}
              />
              <button
                onClick={addPainReliever}
                className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl px-6 py-2.5 sm:py-3 shadow-md transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Přidat</span>
              </button>
            </div>
            
            {/* Štítky - Responzivní */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 min-h-[150px] sm:min-h-[200px]">
              {painRelievers.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center text-purple-500 h-32 sm:h-48">
                  <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3 opacity-50" />
                  <p className="text-center text-sm sm:text-base px-4">Popište řešení problémů zákazníka</p>
                </div>
              ) : (
                painRelievers.map((reliever, idx) => {
                  const relieverText = typeof reliever === 'string' ? reliever : reliever?.text;
                  
                  console.log('🔍 RENDERING PAIN RELIEVER:', { reliever, relieverText, colorVariants, type: typeof reliever });
                  
                  return (
                  <div
                    key={idx}
                    className="group relative animate-in fade-in zoom-in-95 duration-200"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div
                      className="w-28 h-20 sm:w-32 sm:h-24 rounded-lg sm:rounded-xl flex items-center justify-center font-medium shadow-lg hover:scale-105 transition-all cursor-pointer p-2 sm:p-3 text-white"
                      style={{ backgroundColor: colorVariants.icon }}
                    >
                      <span className="text-center text-xs sm:text-sm line-clamp-4 break-words">
                        {relieverText || '[PRÁZDNÉ]'}
                      </span>
                      <button
                        onClick={() => setPainRelievers(painRelievers.filter((_, i) => i !== idx))}
                        className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 rounded-full p-1 sm:p-1.5 shadow-lg hover:bg-red-600"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </button>
                    </div>
                  </div>
                  );
                })
              )}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between gap-2">
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium flex items-center gap-1.5 sm:gap-2 transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Zpět</span>
              </button>
              <button
                onClick={() => {
                  if (canContinueStep3) {
                    setCurrentStep(4);
                  } else {
                    toast.error('Přidejte alespoň 1 řešení!');
                  }
                }}
                disabled={!canContinueStep3}
                className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 sm:gap-2 transition-all text-sm sm:text-base"
              >
                Dokončit
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        )}
        
        {/* STEP 4: Shrnutí */}
        {currentStep === 4 && (
          <div
            key="step4"
            className="space-y-4 sm:space-y-6 animate-in fade-in zoom-in-95 duration-500"
          >
            {/* Gratulace */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-2xl">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎉</div>
              <h2 className="mb-2 text-white text-lg sm:text-2xl font-bold">Skvělá práce!</h2>
              <p className="text-white text-base sm:text-lg opacity-90">Hodnotová nabídka je kompletní</p>
            </div>
            
            {/* Shrnutí hodnoty */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-blue-200 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl">
                  🎁
                </div>
                <h3 className="text-xl font-bold text-blue-900">Vybraná hodnota</h3>
              </div>
              <div
                className="inline-block px-6 py-3 rounded-xl text-white font-bold text-lg shadow-lg"
                style={{ backgroundColor: selectedValueObj?.color || '#3b82f6' }}
              >
                {selectedValue}
              </div>
            </div>
            
            {/* Grid - 3 sekce */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Produkty */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border-4 border-orange-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                    📦
                  </div>
                  <h3 className="font-bold text-orange-900">Produkty ({products.length})</h3>
                </div>
                <div className="space-y-2">
                  {products.map((p, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3 shadow-sm text-sm">
                      {p.text}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Jak naplňujeme očekávání */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-4 border-green-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                    📈
                  </div>
                  <h3 className="font-bold text-green-900">Jak naplňujeme ({gainCreators.length})</h3>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {gainCreators.map((g, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3 shadow-sm">
                      {g.text}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Jak řešíme obavy */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border-4 border-purple-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                    💊
                  </div>
                  <h3 className="font-bold text-purple-900">Jak řešíme ({painRelievers.length})</h3>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {painRelievers.map((r, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3 shadow-sm">
                      {r.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Akce */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Upravit
              </button>
              {onComplete && (
                <button
                  onClick={async () => {
                    // ✅ Ulož VPC před dokončením
                    await saveVPC();
                    // ❌ Odstraněno - duplicitní toast (autosave indicator stačí)
                    
                    // ✅ Zavolej callback (uloží progress do CourseDemoV3)
                    onComplete();
                  }}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-all"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Dokončit lekci
                </button>
              )}
            </div>
            
            {/* Auto-save indikátor */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-md border-2 border-gray-200 w-fit mx-auto">
              <Save className={`w-4 h-4 ${isSaving ? 'animate-pulse text-blue-500' : 'text-green-500'}`} />
              <span className="font-medium">{isSaving ? 'Ukládám...' : 'Automaticky uloženo'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

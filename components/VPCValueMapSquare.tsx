import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Save, Gift, Plus, ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { ValueMapContextHints, CustomerConnectionPreview } from "./ValueMapContextHints";

interface ValueOption {
  text: string;
  color: string;
}

interface Tag {
  text: string;
  color: string;
}

interface Props {
  userId: number;
  selectedSegment: string;
  selectedValue: string | null;
  onSelectValue: (value: string) => void;
  onComplete?: () => void; // ✅ Callback pro dokončení lekce
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

export function VPCValueMapSquare({ userId, selectedSegment, selectedValue, onSelectValue, onComplete }: Props) {
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
        .from('business_canvas_sections')
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
        .from('business_canvas_sections')
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
                  // Objekt s textem (už jsme odfiltrovali ty bez textu)
                  const itemColor = item.color || currentValueColor;
                  console.log(`  [${idx}] OBJECT:`, item.text, '→ color:', itemColor);
                  return { text: item.text, color: normalizeColor(itemColor) };
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
  
  const canContinueStep1 = products.length > 0;
  const canContinueStep2 = gainCreators.length > 0;
  const canContinueStep3 = painRelievers.length > 0;
  
  const steps = [
    { label: 'Hodnota', icon: '🎁', completed: !!selectedValue },
    { label: 'Produkty', icon: '📦', completed: products.length > 0 },
    { label: 'Přínosy', icon: '📈', completed: gainCreators.length > 0 },
    { label: 'Řešení', icon: '💊', completed: painRelievers.length > 0 },
    { label: 'Hotovo', icon: '✅', completed: false }
  ];
  
  // ✅ Zobrazit scroll down JEN když je hodnota BÍLÁ (= sdílená mezi více segmenty)
  const isValueWhite = selectedValueObj && (
    selectedValueObj.color === '#d1d5db' || 
    selectedValueObj.color === '#ffffff' || 
    selectedValueObj.color.toLowerCase() === 'white'
  );
  
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Value Switcher - ZOBRAZÍ SE JEN když je hodnota BÍLÁ (sdílená) */}
      {currentStep >= 1 && availableValues.length > 1 && isValueWhite && (
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl flex-shrink-0">
              🎁
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-blue-700 mb-1 block">
                Vybraná hodnota:
                {selectedSegmentObj && (
                  <span className="ml-2 text-xs text-blue-500">
                    (pro segment: {selectedSegment})
                  </span>
                )}
              </label>
              <select
                value={selectedValue || ''}
                onChange={(e) => {
                  onSelectValue(e.target.value);
                  setCurrentStep(1); // Reset na krok 1
                  // ❌ Odstraněno - duplicitní toast
                }}
                className="w-full px-4 py-2 bg-white border-2 border-blue-300 rounded-lg font-bold text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none cursor-pointer"
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
              <p className="text-xs text-blue-600 mt-1">
                ⚪ Tato hodnota je BÍLÁ - patří k více segmentům. Zde můžete přepínat mezi nimi.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center relative">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                  idx === currentStep
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg scale-110'
                    : idx < currentStep || step.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step.completed && idx < currentStep ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
              </motion.div>
              <span className={`text-xs mt-2 font-medium ${idx === currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Content Area */}
      <AnimatePresence mode="wait">
        {/* STEP 0: Výběr hodnoty */}
        {currentStep === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-4 border-blue-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg">
                🎁
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-blue-900">Vyberte hodnotu</h2>
                <p className="text-blue-700">Pro každou HODNOTU máte samostatnou mapu. Vyberte hodnotu pro kterou chcete vytvořit řešení.</p>
                {selectedSegmentObj && (
                  <div className="mt-2 flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: selectedSegmentObj.color }}
                    />
                    <span className="text-sm text-blue-600">
                      Pro segment: <strong>{selectedSegment}</strong>
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {filteredValues.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <p className="text-yellow-800 mb-2">💡 Žádné hodnoty pro segment "{selectedSegment}"</p>
                <p className="text-sm text-yellow-700">Přidejte hodnoty se stejnou barvou jako segment v Modulu 1</p>
                <p className="text-xs text-gray-600 mt-2">
                  Barva segmentu: <span className="inline-block w-3 h-3 rounded-full align-middle" style={{ backgroundColor: selectedSegmentObj?.color }}></span>
                </p>
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
                    <motion.button
                      key={idx}
                      onClick={() => {
                        onSelectValue(value.text);
                      }}
                      className={`p-6 rounded-xl border-3 text-left transition-all ${
                        selectedValue === value.text
                          ? 'bg-blue-100 border-blue-500 shadow-lg scale-105'
                          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
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
                    </motion.button>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      if (selectedValue) {
                        setCurrentStep(1);
                      } else {
                        toast.error('Vyberte hodnotu!');
                      }
                    }}
                    disabled={!selectedValue}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                  >
                    Pokračovat
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
        
        {/* STEP 1: Produkty */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border-4 border-orange-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg">
                📦
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-orange-900">Produkty a služby</h2>
                <p className="text-orange-700">Co nabízíte pro hodnotu: <span className="font-bold">{selectedValue}</span>? ({products.length}/8)</p>
              </div>
            </div>
            
            {/* ✅ Context Hints */}
            <ValueMapContextHints
              currentStep={1}
              segment={selectedSegment}
              value={selectedValue || ""}
              customerData={customerProfileData || undefined}
            />
            
            {/* Input */}
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                placeholder="Např.: Online kurz, 1-1 konzultace, PDF šablony..."
                className="flex-1 px-4 py-3 border-2 border-orange-400 rounded-xl text-base bg-white shadow-md focus:ring-2 focus:ring-orange-300 focus:outline-none"
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
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-3 shadow-md transition-colors flex items-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                Přidat
              </button>
            </div>
            
            {/* Štítky */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 min-h-[200px]">
              {products.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center h-48 text-orange-600">
                  <Sparkles className="w-12 h-12 mb-3 opacity-50" />
                  <p className="text-center">Začněte přidáváním produktů a služeb</p>
                </div>
              ) : (
                products.map((product, idx) => {
                  // ✅ FIX: product může být string nebo object!
                  const productText = typeof product === 'string' ? product : product?.text;
                  const productColor = typeof product === 'string' 
                    ? (selectedValueObj?.color || selectedSegmentObj?.color || '#f59e0b')
                    : product?.color;
                  
                  console.log('🔍 RENDERING PRODUCT:', { product, productText, productColor, type: typeof product });
                  
                  return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative"
                  >
                    <div
                      className="w-full h-28 rounded-xl flex items-center justify-center font-medium shadow-lg hover:scale-105 transition-all cursor-pointer p-3"
                      style={{ backgroundColor: normalizeColor(productColor || '#f59e0b'), color: '#ffffff' }}
                    >
                      <span className="text-center text-sm line-clamp-4 break-words">
                        {productText || '[PRÁZDNÉ]'}
                      </span>
                      <button
                        onClick={() => setProducts(products.filter((_, i) => i !== idx))}
                        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 rounded-full p-1.5 shadow-lg hover:bg-red-600"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </motion.div>
                  );
                })
              )}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(0)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Zpět
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
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
              >
                Pokračovat
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
        
        {/* STEP 2: Přínosy */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-4 border-green-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg">
                📈
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-green-900">Tvorba přínosů</h2>
                <p className="text-green-700">Jak <span className="font-bold">{selectedValue}</span> vytváří hodnotu pro zákazníka? ({gainCreators.length}/20)</p>
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
            
            {/* Input */}
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={newGainCreator}
                onChange={(e) => setNewGainCreator(e.target.value)}
                placeholder="Např.: Zvýší prodeje, ušetří čas, zlepší kvalitu..."
                className="flex-1 px-4 py-3 border-2 border-green-400 rounded-xl text-base bg-white shadow-md focus:ring-2 focus:ring-green-300 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') addGainCreator();
                }}
              />
              <button
                onClick={addGainCreator}
                className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-6 py-3 shadow-md transition-colors flex items-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                Přidat
              </button>
            </div>
            
            {/* Štítky */}
            <div className="flex flex-wrap gap-3 mb-6 min-h-[200px]">
              {gainCreators.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center h-48 text-green-600">
                  <Sparkles className="w-12 h-12 mb-3 opacity-50" />
                  <p className="text-center">Popište přínosy, které vytváříte</p>
                </div>
              ) : (
                gainCreators.map((creator, idx) => {
                  // ✅ FIX: creator může být string nebo object!
                  const creatorText = typeof creator === 'string' ? creator : creator?.text;
                  const creatorColor = typeof creator === 'string'
                    ? (selectedValueObj?.color || selectedSegmentObj?.color || '#22c55e')
                    : creator?.color;
                  
                  console.log('🔍 RENDERING GAIN CREATOR:', { creator, creatorText, creatorColor, type: typeof creator });
                  
                  return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative"
                  >
                    <div
                      className="w-32 h-24 rounded-xl flex items-center justify-center font-medium shadow-lg hover:scale-105 transition-all cursor-pointer p-3"
                      style={{ backgroundColor: normalizeColor(creatorColor || '#22c55e'), color: '#ffffff' }}
                    >
                      <span className="text-center text-sm line-clamp-4 break-words">
                        {creatorText || '[PRÁZDNÉ]'}
                      </span>
                      <button
                        onClick={() => setGainCreators(gainCreators.filter((_, i) => i !== idx))}
                        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 rounded-full p-1.5 shadow-lg hover:bg-red-600"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </motion.div>
                  );
                })
              )}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Zpět
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
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
              >
                Pokračovat
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
        
        {/* STEP 3: Řešení */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border-4 border-purple-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg">
                💊
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-purple-900">Řešení obtíží</h2>
                <p className="text-purple-700">Jak <span className="font-bold">{selectedValue}</span> řeší problémy zákazníka? ({painRelievers.length}/20)</p>
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
            
            {/* Input */}
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={newPainReliever}
                onChange={(e) => setNewPainReliever(e.target.value)}
                placeholder="Např.: Odstraní nejistotu, sníží náklady, zjednoduší proces..."
                className="flex-1 px-4 py-3 border-2 border-purple-400 rounded-xl text-base bg-white shadow-md focus:ring-2 focus:ring-purple-300 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') addPainReliever();
                }}
              />
              <button
                onClick={addPainReliever}
                className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl px-6 py-3 shadow-md transition-colors flex items-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                Přidat
              </button>
            </div>
            
            {/* Štítky */}
            <div className="flex flex-wrap gap-3 mb-6 min-h-[200px]">
              {painRelievers.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center h-48 text-purple-600">
                  <Sparkles className="w-12 h-12 mb-3 opacity-50" />
                  <p className="text-center">Popište řešení problémů zákazníka</p>
                </div>
              ) : (
                painRelievers.map((reliever, idx) => {
                  // ✅ FIX: reliever může být string nebo object!
                  const relieverText = typeof reliever === 'string' ? reliever : reliever?.text;
                  const relieverColor = typeof reliever === 'string'
                    ? (selectedValueObj?.color || selectedSegmentObj?.color || '#8b5cf6')
                    : reliever?.color;
                  
                  console.log('🔍 RENDERING PAIN RELIEVER:', { reliever, relieverText, relieverColor, type: typeof reliever });
                  
                  return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative"
                  >
                    <div
                      className="w-32 h-24 rounded-xl flex items-center justify-center font-medium shadow-lg hover:scale-105 transition-all cursor-pointer p-3"
                      style={{ backgroundColor: normalizeColor(relieverColor || '#8b5cf6'), color: '#ffffff' }}
                    >
                      <span className="text-center text-sm line-clamp-4 break-words">
                        {relieverText || '[PRÁZDNÉ]'}
                      </span>
                      <button
                        onClick={() => setPainRelievers(painRelievers.filter((_, i) => i !== idx))}
                        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 rounded-full p-1.5 shadow-lg hover:bg-red-600"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </motion.div>
                  );
                })
              )}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Zpět
              </button>
              <button
                onClick={() => {
                  if (canContinueStep3) {
                    setCurrentStep(4);
                    // ❌ Odstraněno - duplicitní toast (stačí achievement)
                  } else {
                    toast.error('Přidejte alespoň 1 řešení!');
                  }
                }}
                disabled={!canContinueStep3}
                className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
              >
                Dokončit
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
        
        {/* STEP 4: Shrnutí */}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-6"
          >
            {/* Gratulace */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-8 text-center shadow-2xl">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-2">Skvělá práce!</h2>
              <p className="text-lg opacity-90">Value Proposition Canvas je kompletní</p>
            </div>
            
            {/* Shrnutí hodnoty */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-4 border-blue-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl">
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
              
              {/* Přínosy */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-4 border-green-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                    📈
                  </div>
                  <h3 className="font-bold text-green-900">Přínosy ({gainCreators.length})</h3>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {gainCreators.map((g, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3 shadow-sm text-sm">
                      {g.text}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Řešení */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border-4 border-purple-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                    💊
                  </div>
                  <h3 className="font-bold text-purple-900">Řešení ({painRelievers.length})</h3>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {painRelievers.map((r, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3 shadow-sm text-sm">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * 📱 MOBILE VPC - VALUE MAP (Lekce 15)
 * 
 * Mobilní verze hodnotové mapy.
 * LOGIKA Z DESKTOPU: hodnota se auto-selectuje podle barvy segmentu, sticky notes s barvou hodnoty
 * DESIGN: optimalizovaný pro mobil (kompaktní inputy, malé sticky notes)
 */

import { useState, useEffect } from "react";
import { X, Plus, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";
import { haptic } from "../../lib/haptics";
import { Button } from "../ui/button";

interface ValueOption {
  text: string;
  color: string;
}

interface SegmentOption {
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
  onComplete?: () => void;
  onAchievementUnlocked?: (achievementId: string) => void;
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

export function MobileVPCValueMap({
  userId,
  selectedSegment,
  selectedValue,
  onSelectValue,
  onComplete,
  onAchievementUnlocked
}: Props) {
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
  
  // 🎨 Barva vybrané hodnoty (pro sticky notes a UI)
  const valueColor = availableValues.find(v => v.text === selectedValue)?.color || '#3b82f6';
  
  // Load segments and values
  useEffect(() => {
    loadSegmentsAndValues();
  }, [userId]);
  
  // 🗑️ CLEANUP: Smaž záznamy pro hodnoty, které už neexistují
  const cleanupOrphanedRecords = async () => {
    if (!userId || userId === "guest" || availableValues.length === 0) return;
    
    try {
      // Získej všechny VPC záznamy pro tohoto uživatele
      const { data: allRecords } = await supabase
        .from('value_proposition_canvas')
        .select('id, selected_value')
        .eq('user_id', userId);
      
      if (!allRecords || allRecords.length === 0) return;
      
      // Najdi záznamy, které mají hodnotu, která už neexistuje
      const validValueNames = availableValues.map(v => v.text);
      const orphanedIds = allRecords
        .filter(record => record.selected_value && !validValueNames.includes(record.selected_value))
        .map(record => record.id);
      
      if (orphanedIds.length > 0) {
        console.log('🗑️ [Mobile ValueMap] Mazání orphaned záznamů:', orphanedIds);
        
        const { error } = await supabase
          .from('value_proposition_canvas')
          .delete()
          .in('id', orphanedIds);
        
        if (error) {
          console.error('❌ Error cleaning orphaned records:', error);
        } else {
          console.log('✅ Orphaned záznamy smazány!');
        }
      }
    } catch (err) {
      console.error('❌ Error during cleanup:', err);
    }
  };
  
  // 🗑️ CLEANUP ORPHANED VALUES: Smaž hodnoty bez matching segmentu
  const cleanupOrphanedValues = async () => {
    if (!userId || userId === "guest") return;
    
    try {
      // Načti segments a values
      const { data: segData } = await supabase
        .from('user_canvas_data')
        .select('content')
        .eq('user_id', userId)
        .eq('section_key', 'segments')
        .maybeSingle();
      
      const { data: valData } = await supabase
        .from('user_canvas_data')
        .select('content')
        .eq('user_id', userId)
        .eq('section_key', 'value')
        .maybeSingle();
      
      if (!segData?.content || !valData?.content) return;
      
      const segmentColors = segData.content.map((s: any) => normalizeColor(s.color));
      const allValues = valData.content.map((v: any) => ({
        text: v.text,
        color: normalizeColor(v.color)
      }));
      
      // Najdi orphaned values (barva neodpovídá žádnému segmentu)
      const orphanedValues = allValues.filter(v => !segmentColors.includes(v.color));
      
      if (orphanedValues.length > 0) {
        console.log('🗑️ [Mobile ValueMap] Mazání orphaned VALUES:', orphanedValues);
        
        // Odstraň orphaned values z content
        const cleanedValues = allValues.filter(v => segmentColors.includes(v.color));
        
        const { error } = await supabase
          .from('user_canvas_data')
          .update({ content: cleanedValues })
          .eq('user_id', userId)
          .eq('section_key', 'value');
        
        if (error) {
          console.error('❌ Error cleaning orphaned values:', error);
        } else {
          console.log('✅ Orphaned VALUES smazány z user_canvas_data!');
          
          // 🗑️ BONUS: Smaž i jejich VPC záznamy
          for (const orphaned of orphanedValues) {
            await supabase
              .from('value_proposition_canvas')
              .delete()
              .eq('user_id', userId)
              .eq('selected_value', orphaned.text);
          }
        }
      }
    } catch (err) {
      console.error('❌ Error during value cleanup:', err);
    }
  };
  
  const loadSegmentsAndValues = async () => {
    if (!userId || userId === "guest") return;
    
    try {
      // Load segments FIRST
      const { data: segData } = await supabase
        .from('user_canvas_data')
        .select('content')
        .eq('user_id', userId)
        .eq('section_key', 'segments')
        .maybeSingle();
      
      let normalizedSegments: SegmentOption[] = [];
      if (segData && Array.isArray(segData.content)) {
        normalizedSegments = segData.content.map((s: SegmentOption) => ({
          text: s.text,
          color: normalizeColor(s.color)
        }));
        setAvailableSegments(normalizedSegments);
      }
      
      // Load values SECOND
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
        
        // 🗑️ FILTER: Zobraz jen hodnoty, které mají matching segment (podle barvy)
        const segmentColors = normalizedSegments.map(s => s.color);
        const filteredValues = normalized.filter(v => segmentColors.includes(v.color));
        
        console.log('🔍 [Mobile ValueMap] Filtrování hodnot:', {
          total: normalized.length,
          filtered: filteredValues.length,
          segmentColors,
          orphaned: normalized.filter(v => !segmentColors.includes(v.color))
        });
        
        setAvailableValues(filteredValues);
        
        // ✅ AUTO-SELECT: Hodnota se STEJNOU BARVOU jako segment!
        if (!selectedValue && normalized.length > 0 && normalizedSegments.length > 0) {
          const segmentObj = normalizedSegments.find(s => s.text === selectedSegment);
          const matchingValue = normalized.find(v => v.color === segmentObj?.color);
          
          if (matchingValue) {
            console.log('🎯 Auto-selecting value:', matchingValue.text, 'matching segment color:', segmentObj?.color);
            onSelectValue(matchingValue.text);
          } else {
            console.log('⚠️ No matching color, selecting first:', normalized[0].text);
            onSelectValue(normalized[0].text);
          }
        }
      }
    } catch (err) {
      console.error('Error loading segments/values:', err);
    }
  };
  
  // Load VPC data when value changes
  useEffect(() => {
    if (selectedValue && userId !== "guest") {
      loadVPCData();
    }
  }, [selectedValue, selectedSegment, userId]);
  
  // 🗑️ CLEANUP: Smaž orphaned records když se změní seznam hodnot
  useEffect(() => {
    if (availableValues.length > 0 && userId !== "guest") {
      cleanupOrphanedRecords();
      cleanupOrphanedValues(); // Nová funkce - maže hodnoty bez matching segmentu!
    }
  }, [availableValues.length]); // Spustí se když se změní počet hodnot
  
  // 🔄 REAL-TIME COLOR SYNC: Sleduj změny barev v Customer Profile
  useEffect(() => {
    if (!userId || userId === "guest" || !selectedValue) return;
    
    // Subscribe to changes in user_canvas_data (segments/values)
    const channel = supabase
      .channel('mobile-value-map-colors')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_canvas_data',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          console.log('🔄 [Mobile ValueMap] Segments/Values změněny, reloaduji...');
          // Reload segments and values to get new colors
          loadSegmentsAndValues();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, selectedValue]);
  
  // 🎨 AUTO-UPDATE COLORS: Když se změní barva hodnoty, aktualizuj všechny štítky
  useEffect(() => {
    if (!valueColor || products.length === 0 && painRelievers.length === 0 && gainCreators.length === 0) return;
    
    console.log('🎨 [Mobile ValueMap] Aktualizuji barvy štítků na:', valueColor);
    
    // Aktualizuj barvy všech štítků
    setProducts(prev => prev.map(p => ({ ...p, color: valueColor })));
    setPainRelievers(prev => prev.map(pr => ({ ...pr, color: valueColor })));
    setGainCreators(prev => prev.map(gc => ({ ...gc, color: valueColor })));
  }, [valueColor]); // Sleduj změny barvy hodnoty
  
  // Auto-save when data changes (debounced)
  useEffect(() => {
    if (!selectedValue || !selectedSegment || userId === "guest") return;
    if (products.length === 0 && painRelievers.length === 0 && gainCreators.length === 0) return;
    
    const saveTimeout = setTimeout(() => {
      console.log('⏰ [Mobile ValueMap] Auto-saving Value Map...', { 
        products: products.length, 
        painRelievers: painRelievers.length, 
        gainCreators: gainCreators.length 
      });
      saveVPCData();
    }, 1000);
    
    return () => clearTimeout(saveTimeout);
  }, [products, painRelievers, gainCreators, selectedValue, selectedSegment]);
  
  const loadVPCData = async () => {
    if (!selectedValue || !selectedSegment || !userId || userId === "guest") return;
    
    console.log('🔄 [Mobile ValueMap] loadVPC called for:', { segment: selectedSegment, value: selectedValue });
    
    try {
      // ⚠️ FIX: Použij order + limit místo maybeSingle (kvůli duplicitám!)
      const { data: allRecords, error } = await supabase
        .from('value_proposition_canvas')
        .select('*')
        .eq('user_id', userId)
        .eq('segment_name', selectedSegment)
        .eq('selected_value', selectedValue)
        .order('created_at', { ascending: false }); // Nejnovější první
      
      console.log('📊 [Mobile ValueMap] Query result:', { count: allRecords?.length, error });
      
      // Vezmi NEJNOVĚJŠÍ záznam
      const data = allRecords && allRecords.length > 0 ? allRecords[0] : null;
      
      // 🗑️ SMAŽ DUPLICITY (pokud existují)
      if (allRecords && allRecords.length > 1) {
        const duplicateIds = allRecords.slice(1).map(r => r.id);
        console.log('🗑️ [Mobile ValueMap] Mazání duplicit:', duplicateIds);
        
        const { error: deleteError } = await supabase
          .from('value_proposition_canvas')
          .delete()
          .in('id', duplicateIds);
        
        if (deleteError) {
          console.error('❌ Error deleting duplicates:', deleteError);
        } else {
          console.log('✅ Duplicity smazány!');
        }
      }
      
      if (data) {
        console.log('✅ [Mobile ValueMap] Data found:', data);
        setVpcId(data.id);
        
        // ✅ POUŽIJ BARVU HODNOTY (ne segmentu)!
        // Použij valueColor state (který je synchronizovaný s real-time změnami)
        const currentColor = valueColor || '#3b82f6';
        
        console.log('🎨 [Mobile ValueMap] Překreslování štítků na barvu HODNOTY:', currentColor, 'valueColor:', valueColor);
        
        // Překresli VŠECHNY štítky na barvu HODNOTY (ignoruj staré barvy!)
        const productsWithCorrectColor = (data.products || []).map((p: any) => ({
          text: typeof p === 'string' ? p : (p?.text || p),
          color: currentColor
        }));
        const painRelieversWithCorrectColor = (data.pain_relievers || []).map((pr: any) => ({
          text: typeof pr === 'string' ? pr : (pr?.text || pr),
          color: currentColor
        }));
        const gainCreatorsWithCorrectColor = (data.gain_creators || []).map((gc: any) => ({
          text: typeof gc === 'string' ? gc : (gc?.text || gc),
          color: currentColor
        }));
        
        setProducts(productsWithCorrectColor);
        setPainRelievers(painRelieversWithCorrectColor);
        setGainCreators(gainCreatorsWithCorrectColor);
        
        // Pokud už má data, přeskoč na poslední step
        if (productsWithCorrectColor.length > 0 && painRelieversWithCorrectColor.length > 0 && gainCreatorsWithCorrectColor.length > 0) {
          setCurrentStep(3);
        }
      } else {
        // No data yet - reset
        console.log('🆕 [Mobile ValueMap] Žádná data, resetuji');
        setVpcId(null);
        setProducts([]);
        setPainRelievers([]);
        setGainCreators([]);
        setCurrentStep(0);
      }
    } catch (err) {
      console.error('❌ [Mobile ValueMap] Load error:', err);
    }
  };
  
  // Save VPC data
  const saveVPCData = async () => {
    console.log('💾 [Mobile ValueMap] saveVPC called', { 
      userId, 
      selectedSegment, 
      selectedValue,
      isSaving, 
      productsCount: products.length, 
      painRelieversCount: painRelievers.length, 
      gainCreatorsCount: gainCreators.length 
    });
    
    if (!selectedValue || !selectedSegment || !userId || userId === "guest") {
      console.log('❌ [Mobile ValueMap] saveVPC skipped - validation failed');
      return;
    }
    
    if (isSaving) {
      console.log('❌ [Mobile ValueMap] saveVPC skipped - already saving');
      return;
    }
    
    if (products.length === 0 && painRelievers.length === 0 && gainCreators.length === 0) {
      console.log('❌ [Mobile ValueMap] saveVPC skipped - no data to save');
      return;
    }
    
    setIsSaving(true);
    
    try {
      // ⚠️ IMPORTANT: Ukládej jen TEXT (ne barvu!)
      // Barva se určí dynamicky podle aktuální barvy hodnoty
      const vpcData = {
        user_id: userId,
        segment_name: selectedSegment,
        selected_value: selectedValue,
        jobs: [],
        pains: [],
        gains: [],
        products: products.map(p => p.text), // ✅ Jen text!
        pain_relievers: painRelievers.map(pr => pr.text), // ✅ Jen text!
        gain_creators: gainCreators.map(gc => gc.text), // ✅ Jen text!
        updated_at: new Date().toISOString()
      };
      
      console.log('💾 [Mobile ValueMap] Saving data:', { vpcId, vpcData });
      
      // 🔍 VŽDY HLEDAT existující záznam (fix pro duplicity!)
      const { data: existing } = await supabase
        .from('value_proposition_canvas')
        .select('id')
        .eq('user_id', userId)
        .eq('segment_name', selectedSegment)
        .eq('selected_value', selectedValue)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      const recordId = existing?.id || vpcId;
      
      if (recordId) {
        // UPDATE existující záznam
        const { error } = await supabase
          .from('value_proposition_canvas')
          .update(vpcData)
          .eq('id', recordId);
        
        if (error) throw error;
        
        if (!vpcId) setVpcId(recordId); // Aktualizuj state pokud nebyl
        console.log('✅ [Mobile ValueMap] Data updated successfully, id:', recordId);
      } else {
        // INSERT nový záznam (pokud opravdu neexistuje)
        const { data, error } = await supabase
          .from('value_proposition_canvas')
          .insert([vpcData])
          .select()
          .single();
        
        if (error) throw error;
        
        if (data) {
          setVpcId(data.id);
          console.log('✅ [Mobile ValueMap] Data inserted successfully, new vpcId:', data.id);
        }
      }
      
      // 🎉 ACHIEVEMENT: Value Map Complete
      if (products.length > 0 && painRelievers.length > 0 && gainCreators.length > 0 && onAchievementUnlocked) {
        console.log('✅ Value Map complete! Triggering achievement...');
        onAchievementUnlocked('value-map-complete');
      }
    } catch (err: any) {
      console.error('❌ [Mobile ValueMap] Save error:', err);
      toast.error('❌ Chyba při ukládání');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Add tag functions
  const addProduct = () => {
    const timestamp = Date.now();
    console.log('📦 [Mobile PRODUCT] addProduct called at:', timestamp, 'with:', newProduct);
    
    if (!newProduct.trim()) return;
    if (products.length >= 10) {
      toast.error('Maximum 10 produktů!');
      return;
    }
    
    const isDuplicate = products.some(p => p.text.toLowerCase() === newProduct.trim().toLowerCase());
    if (isDuplicate) {
      toast.error('❌ Tento produkt již existuje!');
      return;
    }
    
    haptic('light');
    const newProductTag = { text: newProduct.trim(), color: valueColor };
    console.log('✅ [Mobile PRODUCT] Adding product:', newProductTag, 'at:', timestamp);
    
    const newProducts = [...products, newProductTag];
    setProducts(newProducts);
    setNewProduct("");
    
    console.log('✅ [Mobile PRODUCT] Product added, triggering auto-save in 1s...');
    // Auto-save bude spuštěn z useEffect
  };
  
  const addPainReliever = () => {
    const timestamp = Date.now();
    console.log('💊 [Mobile PAIN_RELIEVER] addPainReliever called at:', timestamp, 'with:', newPainReliever);
    
    if (!newPainReliever.trim()) return;
    if (painRelievers.length >= 20) {
      toast.error('Maximum 20 řešení!');
      return;
    }
    
    const isDuplicate = painRelievers.some(p => p.text.toLowerCase() === newPainReliever.trim().toLowerCase());
    if (isDuplicate) {
      toast.error('❌ Toto řešení již existuje!');
      return;
    }
    
    haptic('light');
    const newPainRelieverTag = { text: newPainReliever.trim(), color: valueColor };
    console.log('✅ [Mobile PAIN_RELIEVER] Adding pain reliever:', newPainRelieverTag, 'at:', timestamp);
    
    const newPainRelievers = [...painRelievers, newPainRelieverTag];
    setPainRelievers(newPainRelievers);
    setNewPainReliever("");
    
    console.log('✅ [Mobile PAIN_RELIEVER] Pain reliever added, triggering auto-save in 1s...');
    // Auto-save bude spuštěn z useEffect
  };
  
  const addGainCreator = () => {
    const timestamp = Date.now();
    console.log('🎁 [Mobile GAIN_CREATOR] addGainCreator called at:', timestamp, 'with:', newGainCreator);
    
    if (!newGainCreator.trim()) return;
    if (gainCreators.length >= 20) {
      toast.error('Maximum 20 přínosů!');
      return;
    }
    
    const isDuplicate = gainCreators.some(g => g.text.toLowerCase() === newGainCreator.trim().toLowerCase());
    if (isDuplicate) {
      toast.error('❌ Tento přínos již existuje!');
      return;
    }
    
    haptic('light');
    const newGainCreatorTag = { text: newGainCreator.trim(), color: valueColor };
    console.log('✅ [Mobile GAIN_CREATOR] Adding gain creator:', newGainCreatorTag, 'at:', timestamp);
    
    const newGainCreators = [...gainCreators, newGainCreatorTag];
    setGainCreators(newGainCreators);
    setNewGainCreator("");
    
    console.log('✅ [Mobile GAIN_CREATOR] Gain creator added, triggering auto-save in 1s...');
    // Auto-save bude spuštěn z useEffect
  };
  
  // Progress stepper
  const steps = [
    { label: 'Hodnota', completed: !!selectedValue },
    { label: 'Produkty', completed: products.length > 0 },
    { label: 'Řešení', completed: painRelievers.length > 0 },
    { label: 'Přínosy', completed: gainCreators.length > 0 },
  ];
  
  return (
    <div className="space-y-4 pb-8 max-w-2xl mx-auto">
      {/* PROGRESS STEPPER */}
      <div className="bg-white rounded-xl p-3 shadow-sm">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                  idx === currentStep
                    ? 'bg-green-500 text-white shadow-md scale-110'
                    : idx < currentStep || step.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step.completed && idx < currentStep ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
              </div>
              <span className={`text-[10px] mt-1 font-medium text-center max-w-[60px] leading-tight ${idx === currentStep ? 'text-green-600' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* STEP 0: Value Selector - LOCKED (jen matching hodnota) */}
      {currentStep === 0 && (
        <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="text-green-900 mb-2">💎 Hodnota pro segment</h3>
            <p className="text-sm text-gray-600 mb-3">
              Hodnotová mapa pro segment <strong>"{selectedSegment}"</strong>
            </p>
            
            {availableValues.length === 0 ? (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-900">
                  💡 Nejprve vyplňte "Hodnoty" v Modulu 1
                </p>
              </div>
            ) : (() => {
              // Find matching value (by color)
              const segmentObj = availableSegments.find(s => s.text === selectedSegment);
              const matchingValue = availableValues.find(v => v.color === segmentObj?.color);
              
              if (!matchingValue) {
                return (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-900">
                      ⚠️ Žádná hodnota se STEJNOU BARVOU jako segment "{selectedSegment}"
                    </p>
                    <p className="text-xs text-amber-700 mt-2">
                      Vytvořte hodnotu se stejnou barvou jako segment v Modulu 1
                    </p>
                  </div>
                );
              }
              
              // Auto-select matching value
              if (selectedValue !== matchingValue.text) {
                onSelectValue(matchingValue.text);
              }
              
              return (
                <div className="bg-white rounded-lg border-2 border-green-500 p-4 shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-6 h-6 rounded-full flex-shrink-0"
                      style={{ backgroundColor: matchingValue.color }}
                    />
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-green-900 block">
                        {matchingValue.text}
                      </span>
                      <span className="text-xs text-green-600">
                        ✅ Hodnota pro tento segment
                      </span>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    💡 Každý segment má vlastní hodnotovou mapu
                  </p>
                </div>
              );
            })()}
          </div>
          
          <div className="flex justify-end">
            <Button
              onClick={() => {
                if (selectedValue) {
                  haptic('medium');
                  setCurrentStep(1);
                } else {
                  toast.error('Nenalezena hodnota pro tento segment!');
                }
              }}
              disabled={!selectedValue}
              className="flex items-center gap-2"
            >
              Pokračovat
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* STEP 1: Products */}
      {currentStep === 1 && (
        <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="rounded-xl p-4" style={{ backgroundColor: `${valueColor}15`, borderWidth: '2px', borderColor: valueColor }}>
            <h3 className="mb-1" style={{ color: valueColor }}>📦 Produkty a služby</h3>
            <p className="text-sm text-gray-600 mb-3">
              Co KONKRÉTNĚ nabízíte? ({products.length}/10)
            </p>
            
            {/* Input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addProduct()}
                placeholder="Např.: Specialty káva..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
                style={{ borderColor: valueColor }}
              />
              <button
                onClick={addProduct}
                className="px-4 py-2 text-white rounded-lg"
                style={{ backgroundColor: valueColor }}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 min-h-[100px]">
              {products.map((product, idx) => (
                <div
                  key={idx}
                  className="relative group w-24 h-16 rounded-lg flex items-center justify-center p-2 shadow-md"
                  style={{ backgroundColor: product.color }}
                >
                  <span className="text-xs text-white text-center line-clamp-3 break-words">
                    {product.text}
                  </span>
                  <button
                    onClick={() => {
                      haptic('light');
                      setProducts(products.filter((_, i) => i !== idx));
                      saveVPCData();
                    }}
                    className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-red-500 rounded-full p-1"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between gap-2">
            <Button
              onClick={() => {
                haptic('light');
                setCurrentStep(0);
              }}
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Zpět
            </Button>
            <Button
              onClick={() => {
                if (products.length > 0) {
                  haptic('medium');
                  setCurrentStep(2);
                } else {
                  toast.error('Přidejte alespoň 1 produkt!');
                }
              }}
            >
              Pokračovat
            </Button>
          </div>
        </div>
      )}
      
      {/* STEP 2: Pain Relievers */}
      {currentStep === 2 && (
        <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="rounded-xl p-4" style={{ backgroundColor: `${valueColor}15`, borderWidth: '2px', borderColor: valueColor }}>
            <h3 className="mb-1" style={{ color: valueColor }}>💊 Řešení obtíží</h3>
            <p className="text-sm text-gray-600 mb-3">
              Jak ŘEŠÍTE problémy zákazníka? ({painRelievers.length}/20)
            </p>
            
            {/* Input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newPainReliever}
                onChange={(e) => setNewPainReliever(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addPainReliever()}
                placeholder="Např.: Jen cena kávy..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
                style={{ borderColor: valueColor }}
              />
              <button
                onClick={addPainReliever}
                className="px-4 py-2 text-white rounded-lg"
                style={{ backgroundColor: valueColor }}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 min-h-[100px]">
              {painRelievers.map((pain, idx) => (
                <div
                  key={idx}
                  className="relative group w-24 h-16 rounded-lg flex items-center justify-center p-2 shadow-md"
                  style={{ backgroundColor: pain.color }}
                >
                  <span className="text-xs text-white text-center line-clamp-3 break-words">
                    {pain.text}
                  </span>
                  <button
                    onClick={() => {
                      haptic('light');
                      setPainRelievers(painRelievers.filter((_, i) => i !== idx));
                      saveVPCData();
                    }}
                    className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-red-500 rounded-full p-1"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between gap-2">
            <Button
              onClick={() => {
                haptic('light');
                setCurrentStep(1);
              }}
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Zpět
            </Button>
            <Button
              onClick={() => {
                if (painRelievers.length > 0) {
                  haptic('medium');
                  setCurrentStep(3);
                } else {
                  toast.error('Přidejte alespoň 1 řešení!');
                }
              }}
            >
              Pokračovat
            </Button>
          </div>
        </div>
      )}
      
      {/* STEP 3: Gain Creators */}
      {currentStep === 3 && (
        <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="rounded-xl p-4" style={{ backgroundColor: `${valueColor}15`, borderWidth: '2px', borderColor: valueColor }}>
            <h3 className="mb-1" style={{ color: valueColor }}>📈 Tvorba přínosů</h3>
            <p className="text-sm text-gray-600 mb-3">
              Jak VYTVÁŘÍTE hodnotu? ({gainCreators.length}/20)
            </p>
            
            {/* Input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newGainCreator}
                onChange={(e) => setNewGainCreator(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addGainCreator()}
                placeholder="Např.: Komunitní akce..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
                style={{ borderColor: valueColor }}
              />
              <button
                onClick={addGainCreator}
                className="px-4 py-2 text-white rounded-lg"
                style={{ backgroundColor: valueColor }}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 min-h-[100px]">
              {gainCreators.map((gain, idx) => (
                <div
                  key={idx}
                  className="relative group w-24 h-16 rounded-lg flex items-center justify-center p-2 shadow-md"
                  style={{ backgroundColor: gain.color }}
                >
                  <span className="text-xs text-white text-center line-clamp-3 break-words">
                    {gain.text}
                  </span>
                  <button
                    onClick={() => {
                      haptic('light');
                      setGainCreators(gainCreators.filter((_, i) => i !== idx));
                      saveVPCData();
                    }}
                    className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-red-500 rounded-full p-1"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between gap-2">
            <Button
              onClick={() => {
                haptic('light');
                setCurrentStep(2);
              }}
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Zpět
            </Button>
            
            {gainCreators.length > 0 && onComplete && (
              <Button
                onClick={() => {
                  haptic('success');
                  saveVPCData();
                  onComplete();
                }}
              >
                Dokončit
                <CheckCircle2 className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

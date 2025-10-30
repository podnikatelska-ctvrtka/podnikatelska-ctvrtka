import { useState, useEffect } from "react";
import { Plus, X, Save } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { trackCourseEvent, trackError } from "../lib/sentry";

interface Props {
  userId: string;
  selectedSegment: string;
  selectedValue?: string;
}

// 🎨 Helper pro barvy podle hodnoty  
const getValueColors = (valueColor: string) => {
  // Pro bílou/šedou barvu nebo když není definována - vrať inline RGB hodnoty!
  if (!valueColor || valueColor === '#d1d5db' || valueColor.toLowerCase() === 'white') {
    return {
      products: { bg: 'rgb(254, 249, 195)', border: 'rgb(253, 224, 71)', text: 'rgb(146, 64, 14)', button: 'rgb(202, 138, 4)', buttonHover: 'rgb(161, 98, 7)' },
      painRelievers: { bg: 'rgb(254, 242, 242)', border: 'rgb(252, 165, 165)', text: 'rgb(153, 27, 27)', button: 'rgb(220, 38, 38)', buttonHover: 'rgb(185, 28, 28)' },
      gainCreators: { bg: 'rgb(240, 253, 244)', border: 'rgb(134, 239, 172)', text: 'rgb(22, 101, 52)', button: 'rgb(22, 163, 74)', buttonHover: 'rgb(21, 128, 61)' }
    };
  }
  
  // Pro barevnou hodnotu - vygeneruj tmavší odstíny
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 34, g: 197, b: 94 }; // fallback zelená
  };
  
  const rgb = hexToRgb(valueColor);
  
  // Products - světlejší odstín (90% světlosti)
  const productsBg = `rgb(${Math.min(255, rgb.r + (255 - rgb.r) * 0.9)} ${Math.min(255, rgb.g + (255 - rgb.g) * 0.9)} ${Math.min(255, rgb.b + (255 - rgb.b) * 0.9)})`;
  const productsBorder = `rgb(${Math.min(255, rgb.r + (255 - rgb.r) * 0.6)} ${Math.min(255, rgb.g + (255 - rgb.g) * 0.6)} ${Math.min(255, rgb.b + (255 - rgb.b) * 0.6)})`;
  
  // Pain Relievers - střední odstín (80% světlosti)
  const painsBg = `rgb(${Math.min(255, rgb.r + (255 - rgb.r) * 0.85)} ${Math.min(255, rgb.g + (255 - rgb.g) * 0.85)} ${Math.min(255, rgb.b + (255 - rgb.b) * 0.85)})`;
  const painsBorder = `rgb(${Math.min(255, rgb.r + (255 - rgb.r) * 0.5)} ${Math.min(255, rgb.g + (255 - rgb.g) * 0.5)} ${Math.min(255, rgb.b + (255 - rgb.b) * 0.5)})`;
  
  // Gain Creators - tmavší odstín (70% světlosti)
  const gainsBg = `rgb(${Math.min(255, rgb.r + (255 - rgb.r) * 0.75)} ${Math.min(255, rgb.g + (255 - rgb.g) * 0.75)} ${Math.min(255, rgb.b + (255 - rgb.b) * 0.75)})`;
  const gainsBorder = `rgb(${Math.min(255, rgb.r + (255 - rgb.r) * 0.4)} ${Math.min(255, rgb.g + (255 - rgb.g) * 0.4)} ${Math.min(255, rgb.b + (255 - rgb.b) * 0.4)})`;
  
  // Text - EXTRA TMAVÁ varianta pro maximální kontrast (15% původní barvy)
  const darkColor = `rgb(${Math.max(20, rgb.r * 0.15)} ${Math.max(20, rgb.g * 0.15)} ${Math.max(20, rgb.b * 0.15)})`;
  const buttonColor = `rgb(${Math.max(0, rgb.r * 0.8)} ${Math.max(0, rgb.g * 0.8)} ${Math.max(0, rgb.b * 0.8)})`;
  const buttonHover = `rgb(${Math.max(0, rgb.r * 0.6)} ${Math.max(0, rgb.g * 0.6)} ${Math.max(0, rgb.b * 0.6)})`;
  
  return {
    products: { bg: productsBg, border: productsBorder, text: darkColor, button: buttonColor, buttonHover },
    painRelievers: { bg: painsBg, border: painsBorder, text: darkColor, button: buttonColor, buttonHover },
    gainCreators: { bg: gainsBg, border: gainsBorder, text: darkColor, button: buttonColor, buttonHover }
  };
};

export function VPCValueMap({ userId, selectedSegment, selectedValue }: Props) {
  const [products, setProducts] = useState<string[]>([]);
  const [painRelievers, setPainRelievers] = useState<string[]>([]);
  const [gainCreators, setGainCreators] = useState<string[]>([]);
  
  const [newProduct, setNewProduct] = useState("");
  const [newPainReliever, setNewPainReliever] = useState("");
  const [newGainCreator, setNewGainCreator] = useState("");
  
  const [isSaving, setIsSaving] = useState(false);
  const [vpcId, setVpcId] = useState<number | null>(null);
  const [valueColor, setValueColor] = useState<string>('');
  
  // Load VPC data + value color
  useEffect(() => {
    if (!userId || !selectedSegment) return;
    
    const loadVPC = async () => {
      try {
        // 🎨 Načti barvu hodnoty
        const { data: valuesData } = await supabase
          .from('user_canvas_data')
          .select('content')
          .eq('user_id', userId)
          .eq('section_key', 'value')
          .maybeSingle();
        
        if (valuesData?.content && selectedValue) {
          const value = valuesData.content.find((v: any) => v.text === selectedValue);
          if (value) {
            setValueColor(value.color || '');
          }
        } else {
          // Pokud není vybraná hodnota, použij barvu segmentu
          const { data: segmentData } = await supabase
            .from('user_canvas_data')
            .select('content')
            .eq('user_id', userId)
            .eq('section_key', 'segments')
            .maybeSingle();
          
          if (segmentData?.content) {
            const segment = segmentData.content.find((s: any) => s.text === selectedSegment);
            if (segment) {
              setValueColor(segment.color || '');
            }
          }
        }
        
        // Načti VPC data
        let query = supabase
          .from('value_proposition_canvas')
          .select('*')
          .eq('user_id', userId)
          .eq('segment_name', selectedSegment);
        
        // Pokud je vybraná hodnota, načti tu konkrétní
        if (selectedValue) {
          query = query.eq('selected_value', selectedValue);
        } else {
          query = query.is('selected_value', null);
        }
        
        const { data, error } = await query.maybeSingle();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error loading VPC:', error);
          
          // 🚨 SENTRY: Track load error
          trackError.loadError('VPCValueMap', error as Error, {
            userId,
            segmentName: selectedSegment,
            selectedValue: selectedValue || 'none',
          });
          return;
        }
        
        if (data) {
          setVpcId(data.id);
          setProducts(data.products || []);
          setPainRelievers(data.pain_relievers || []);
          setGainCreators(data.gain_creators || []);
        }
      } catch (err) {
        console.error('Error loading VPC:', err);
      }
    };
    
    loadVPC();
  }, [userId, selectedSegment, selectedValue]);
  
  // 🗑️ CLEANUP ORPHANED VALUES: Smaž hodnoty bez matching segmentu
  const cleanupOrphanedValues = async () => {
    if (!userId) return;
    
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
      
      const segmentColors = segData.content.map((s: any) => s.color);
      const allValues = valData.content;
      
      // Najdi orphaned values (barva neodpovídá žádnému segmentu)
      const orphanedValues = allValues.filter((v: any) => !segmentColors.includes(v.color));
      
      if (orphanedValues.length > 0) {
        console.log('🗑️ [Desktop ValueMap] Mazání orphaned VALUES:', orphanedValues);
        
        // Odstraň orphaned values z content
        const cleanedValues = allValues.filter((v: any) => segmentColors.includes(v.color));
        
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
  
  // 🗑️ INITIAL CLEANUP: Smaž orphaned values při načtení
  useEffect(() => {
    if (!userId) return;
    cleanupOrphanedValues();
  }, [userId]);
  
  // 🎨 REAL-TIME COLOR UPDATE: Sleduj změny barev segmentů/hodnot
  useEffect(() => {
    if (!userId || !selectedSegment) return;
    
    const updateColor = async () => {
      try {
        // Priorita: Barva HODNOTY (pokud je vybraná)
        if (selectedValue) {
          const { data: valuesData } = await supabase
            .from('user_canvas_data')
            .select('content')
            .eq('user_id', userId)
            .eq('section_key', 'value')
            .maybeSingle();
          
          if (valuesData?.content) {
            const value = valuesData.content.find((v: any) => v.text === selectedValue);
            if (value && value.color) {
              console.log('🎨 [Desktop ValueMap] Aktualizuji barvu hodnoty:', value.color);
              setValueColor(value.color);
              return;
            }
          }
        }
        
        // Fallback: Barva SEGMENTU
        const { data: segmentData } = await supabase
          .from('user_canvas_data')
          .select('content')
          .eq('user_id', userId)
          .eq('section_key', 'segments')
          .maybeSingle();
        
        if (segmentData?.content) {
          const segment = segmentData.content.find((s: any) => s.text === selectedSegment);
          if (segment && segment.color) {
            console.log('🎨 [Desktop ValueMap] Aktualizuji barvu segmentu:', segment.color);
            setValueColor(segment.color);
          }
        }
      } catch (err) {
        console.error('❌ Error updating color:', err);
      }
    };
    
    // Initial update
    updateColor();
    
    // Subscribe to changes in user_canvas_data
    const channel = supabase
      .channel('value-map-colors')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_canvas_data',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          console.log('🔄 [Desktop ValueMap] Segments/Values změněny, aktualizuji barvu...');
          updateColor();
          cleanupOrphanedValues(); // Smaž orphaned hodnoty!
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, selectedSegment, selectedValue]);
  
  // Auto-save (when data changes)
  useEffect(() => {
    if (!userId || !selectedSegment) return;
    if (products.length === 0 && painRelievers.length === 0 && gainCreators.length === 0) return; // Don't save empty data
    
    const saveTimeout = setTimeout(async () => {
      await saveVPC();
    }, 1000);
    
    return () => clearTimeout(saveTimeout);
  }, [products, painRelievers, gainCreators]); // Only trigger on data changes
  
  const saveVPC = async () => {
    if (!userId || !selectedSegment || isSaving) return;
    
    setIsSaving(true);
    
    try {
      const vpcData = {
        user_id: userId,
        segment_name: selectedSegment,
        selected_value: selectedValue || null,
        jobs: [],
        pains: [],
        gains: [],
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
        if (data) setVpcId(data.id);
      }
      
      // 🚨 SENTRY: Track successful save
      trackCourseEvent.vpcSave({
        userId,
        segmentName: selectedSegment,
        hasJobs: false,
        hasPains: painRelievers.length > 0,
        hasGains: gainCreators.length > 0,
      });
    } catch (err) {
      console.error('Error saving VPC:', err);
      
      // 🚨 SENTRY: Track error
      trackError.saveError('VPCValueMap', err as Error, {
        userId,
        segmentName: selectedSegment,
        selectedValue: selectedValue || 'none',
        hasProducts: products.length > 0,
        hasPainRelievers: painRelievers.length > 0,
        hasGainCreators: gainCreators.length > 0,
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-t-xl">
        <h2 className="text-2xl font-bold mb-2">💎 Hodnotová Mapa</h2>
        <p className="text-green-100">
          Segment: <strong>{selectedSegment}</strong>
        </p>
      </div>
      
      <div className="bg-green-50 p-8 rounded-b-xl border-2 border-green-300">
        <p className="text-sm text-green-700 mb-6">
          Vyplňte JAK přesně vaše produkty řeší problémy z předchozí lekce (Zákaznický profil).
        </p>
        
        {/* Products */}
        <div className="mb-6">
          <h3 className="font-bold mb-2 text-lg" style={{ color: getValueColors(valueColor).products.text }}>
            📦 Produkty a Služby
          </h3>
          <p className="text-sm mb-3" style={{ color: getValueColors(valueColor).products.text }}>
            Co konkrétně nabízíte?
          </p>
          <div className="space-y-2 mb-3">
            {products.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg border-2 flex items-start gap-2"
                style={{ 
                  backgroundColor: getValueColors(valueColor).products.bg,
                  borderColor: getValueColors(valueColor).products.border
                }}
              >
                <span className="flex-1 text-sm" style={{ color: getValueColors(valueColor).products.text }}>{product}</span>
                <button
                  onClick={() => setProducts(products.filter((_, i) => i !== idx))}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              placeholder='Např: "Workspace s WiFi celý den"'
              className="flex-1 px-3 py-2 border-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ 
                borderColor: getValueColors(valueColor).products.border
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && newProduct.trim()) {
                  setProducts([...products, newProduct.trim()]);
                  setNewProduct("");
                }
              }}
            />
            <Button
              size="sm"
              onClick={async () => {
                if (newProduct.trim()) {
                  const newProducts = [...products, newProduct.trim()];
                  setProducts(newProducts);
                  setNewProduct("");
                  
                  // ✅ Immediate save
                  setTimeout(() => saveVPC(), 100);
                }
              }}
              style={{
                backgroundColor: getValueColors(valueColor).products.button,
                borderColor: getValueColors(valueColor).products.border
              }}
              className="hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Pain Relievers */}
        <div className="mb-6">
          <h3 className="font-bold mb-2 text-lg" style={{ color: getValueColors(valueColor).painRelievers.text }}>
            🛡️ Řešení Obtíží
          </h3>
          <p className="text-sm mb-3" style={{ color: getValueColors(valueColor).painRelievers.text }}>
            Jak řešíte obavy zákazníka?
          </p>
          <div className="space-y-2 mb-3">
            {painRelievers.map((reliever, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg border-2 flex items-start gap-2"
                style={{ 
                  backgroundColor: getValueColors(valueColor).painRelievers.bg,
                  borderColor: getValueColors(valueColor).painRelievers.border
                }}
              >
                <span className="flex-1 text-sm" style={{ color: getValueColors(valueColor).painRelievers.text }}>{reliever}</span>
                <button
                  onClick={() => setPainRelievers(painRelievers.filter((_, i) => i !== idx))}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newPainReliever}
              onChange={(e) => setNewPainReliever(e.target.value)}
              placeholder='Např: "Jen cena kávy (80 Kč) místo 300 Kč"'
              className="flex-1 px-3 py-2 border-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ 
                borderColor: getValueColors(valueColor).painRelievers.border
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && newPainReliever.trim()) {
                  setPainRelievers([...painRelievers, newPainReliever.trim()]);
                  setNewPainReliever("");
                }
              }}
            />
            <Button
              size="sm"
              onClick={async () => {
                if (newPainReliever.trim()) {
                  const newPainRelievers = [...painRelievers, newPainReliever.trim()];
                  setPainRelievers(newPainRelievers);
                  setNewPainReliever("");
                  
                  // ✅ Immediate save
                  setTimeout(() => saveVPC(), 100);
                }
              }}
              style={{
                backgroundColor: getValueColors(valueColor).painRelievers.button,
                borderColor: getValueColors(valueColor).painRelievers.border
              }}
              className="hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Gain Creators */}
        <div className="mb-6">
          <h3 className="font-bold mb-2 text-lg" style={{ color: getValueColors(valueColor).gainCreators.text }}>
            ✨ Tvorba Přínosů
          </h3>
          <p className="text-sm mb-3" style={{ color: getValueColors(valueColor).gainCreators.text }}>
            Jak vytváříte očekávané přínosy?
          </p>
          <div className="space-y-2 mb-3">
            {gainCreators.map((creator, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg border-2 flex items-start gap-2"
                style={{ 
                  backgroundColor: getValueColors(valueColor).gainCreators.bg,
                  borderColor: getValueColors(valueColor).gainCreators.border
                }}
              >
                <span className="flex-1 text-sm" style={{ color: getValueColors(valueColor).gainCreators.text }}>{creator}</span>
                <button
                  onClick={() => setGainCreators(gainCreators.filter((_, i) => i !== idx))}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newGainCreator}
              onChange={(e) => setNewGainCreator(e.target.value)}
              placeholder='Např: "WiFi 100+ Mbps + zásuvky u každého stolu"'
              className="flex-1 px-3 py-2 border-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ 
                borderColor: getValueColors(valueColor).gainCreators.border
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && newGainCreator.trim()) {
                  setGainCreators([...gainCreators, newGainCreator.trim()]);
                  setNewGainCreator("");
                }
              }}
            />
            <Button
              size="sm"
              onClick={async () => {
                if (newGainCreator.trim()) {
                  const newGainCreators = [...gainCreators, newGainCreator.trim()];
                  setGainCreators(newGainCreators);
                  setNewGainCreator("");
                  
                  // ✅ Immediate save
                  setTimeout(() => saveVPC(), 100);
                }
              }}
              style={{
                backgroundColor: getValueColors(valueColor).gainCreators.button,
                borderColor: getValueColors(valueColor).gainCreators.border
              }}
              className="hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Save Indicator */}
        <div className="flex items-center justify-between bg-white rounded-lg p-4 border-2 border-green-200">
          <div className="flex items-center gap-3">
            <Save className={`w-5 h-5 ${isSaving ? 'text-green-500 animate-pulse' : 'text-green-600'}`} />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {isSaving ? 'Ukládám...' : '✅ Automaticky uloženo'}
              </p>
              <p className="text-xs text-gray-500">
                {products.length + painRelievers.length + gainCreators.length} položek celkem
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={saveVPC}
            disabled={isSaving}
          >
            💾 Uložit teď
          </Button>
        </div>
      </div>
    </div>
  );
}

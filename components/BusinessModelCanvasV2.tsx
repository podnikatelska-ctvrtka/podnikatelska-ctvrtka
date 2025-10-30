import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Download, Plus, X, Printer, Calculator, TrendingUp, TrendingDown, Users } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import { hexToColorName } from "../lib/colorUtils";
import { trackCourseEvent, trackError } from "../lib/sentry";

interface CanvasItem {
  text: string;
  color: 'blue' | 'green' | 'yellow' | 'pink' | 'purple' | 'gray' | 'global';
  value?: number; // Jednoduchá hodnota (cena, náklady, příjmy, průměrná útrata)
}

interface CanvasSection {
  id: string;
  title: string;
  items: CanvasItem[];
  gridArea: string;
  valueLabel?: string; // "Počet zákazníků", "Cena (Kč)", "Náklady (Kč)", "Příjmy (Kč)"
}

// 🎨 Barvy pro sticky notes
// ❌ BÍLÁ ODSTRANĚNA - byla matoucí (hodnota vs globální zdroj)
// ✅ GLOBAL (šedá + 🌐) - jen pro byznysové sekce (zdroje, náklady...)
const STICKY_COLORS = {
  blue: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-900' },
  green: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-900' },
  yellow: { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-900' },
  pink: { bg: 'bg-pink-100', border: 'border-pink-300', text: 'text-pink-900' },
  purple: { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-900' },
  global: { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-800' }, // 🌐 Pro celý byznys
  gray: { bg: 'bg-gray-100', border: 'border-gray-400', text: 'text-gray-700' }, // Backward compatibility
};

// Podnikatelský model - NOVÁ EKONOMICKÁ LOGIKA
const INITIAL_CANVAS: CanvasSection[] = [
  { id: "partners", title: "Klíčová partnerství", items: [], gridArea: "partners" },
  { id: "activities", title: "Klíčové aktivity", items: [], gridArea: "activities" },
  { id: "resources", title: "Klíčové zdroje", items: [], gridArea: "resources" },
  { id: "value", title: "Hodnotová nabídka", items: [], gridArea: "value" }, // ❌ BEZ Kč - jsou to benefity!
  { id: "relationships", title: "Vztahy se zákazníky", items: [], gridArea: "relationships" },
  { id: "channels", title: "Kanály", items: [], gridArea: "channels" },
  { id: "segments", title: "Zákaznické segmenty", items: [], gridArea: "segments", valueLabel: "Průměrná útrata (Kč)" }, // ✅ Průměr na návštěvu
  { id: "costs", title: "Struktura nákladů", items: [], gridArea: "costs", valueLabel: "Náklady (Kč/měsíc)" },
  { id: "revenue", title: "Zdroje příjmů", items: [], gridArea: "revenue", valueLabel: "Příjmy (K��/měsíc)" },
];

interface Props {
  userId: string;
  highlightSection?: string; // Pro guided tour - highlight specific section
  onAchievementUnlocked?: (achievementId: string) => void; // 🎉 Achievement callback
}

export function BusinessModelCanvasV2({ userId, highlightSection, onAchievementUnlocked }: Props) {
  const [canvas, setCanvas] = useState<CanvasSection[]>(INITIAL_CANVAS);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [newItem, setNewItem] = useState("");
  const [newValue, setNewValue] = useState<number | undefined>(); // Pro všechny sekce s valueLabel
  const [selectedColor, setSelectedColor] = useState<'blue' | 'green' | 'yellow' | 'pink' | 'purple' | 'gray' | 'global'>('blue');
  const [isSaving, setIsSaving] = useState(false);
  const [showCalculations, setShowCalculations] = useState(true);

  // Load canvas data
  useEffect(() => {
    loadCanvasData();
  }, [userId]);

  const loadCanvasData = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('user_canvas_data')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.warn('Canvas data not available:', error);
        return;
      }

      if (data && data.length > 0) {
        const updatedCanvas = canvas.map(section => {
          const saved = data.find(d => d.section_key === section.id);
          if (saved && saved.content) {
            return { ...section, items: saved.content };
          }
          return section;
        });
        setCanvas(updatedCanvas);
      }
    } catch (err) {
      console.warn('Failed to load canvas:', err);
      
      // 🚨 SENTRY: Track load error
      trackError.loadError('BusinessModelCanvasV2', err as Error, {
        userId,
      });
    }
  };

  const saveCanvasData = async (sectionId: string, items: CanvasItem[]) => {
    if (!userId) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('user_canvas_data')
        .upsert({
          user_id: userId,
          section_key: sectionId,
          content: items,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,section_key'
        });

      if (error) throw error;
      toast.success("✅ Uloženo!");
      
      // 🚨 SENTRY: Track successful save
      trackCourseEvent.vpcSave({
        userId,
        segmentName: sectionId,
        hasJobs: items.length > 0,
        hasPains: false,
        hasGains: false,
      });
      
      // 🎉 ACHIEVEMENT TRIGGERING (real-time, desktop V2)
      if (onAchievementUnlocked) {
        const itemCount = items.length;
        
        // First segment/value
        if (sectionId === 'segments' && itemCount === 1) {
          onAchievementUnlocked('first-segment');
        } else if (sectionId === 'value' && itemCount === 1) {
          onAchievementUnlocked('first-value');
        }
        
        // Profit calculated
        if ((sectionId === 'revenue' || sectionId === 'costs') && items.some(i => i.value && i.value > 0)) {
          onAchievementUnlocked('profit-calculated');
        }
        
        // Check all sections filled & profitable
        const { data: allSections } = await supabase
          .from('user_canvas_data')
          .select('section_key, content')
          .eq('user_id', userId);
        
        if (allSections) {
          const requiredSections = ['segments', 'value', 'channels', 'relationships', 'revenue', 'resources', 'activities', 'partners', 'costs'];
          const filledSections = allSections.filter(s => 
            requiredSections.includes(s.section_key) && s.content?.length > 0
          );
          
          if (filledSections.length === 9) {
            onAchievementUnlocked('all-sections-filled');
          }
          
          // ❌ "profitable-business" achievement SE NETRIGGERUJE ZDE!
          // Triggeruje se v ProfitCalculator (Modul 2, Lekce 2) když user VIDÍ finanční analýzu
        }
      }
    } catch (err) {
      console.error('Save failed:', err);
      toast.error("Chyba při ukládání");
      
      // 🚨 SENTRY: Track error
      trackError.saveError('BusinessModelCanvasV2', err as Error, {
        userId,
        sectionId,
        itemCount: items.length,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addItem = (sectionId: string) => {
    if (!newItem.trim()) return;

    const updated = canvas.map(section => {
      if (section.id === sectionId) {
        // ❌ ODSTRANĚNO: TEĎ/CÍL pro segments - matoucí!
        // VŠECHNY sekce: jen text, color, value
        const newItemData = { 
          text: newItem.trim(), 
          color: selectedColor,
          value: newValue 
        };
        
        const newItems = [...section.items, newItemData];
        saveCanvasData(sectionId, newItems);
        return { ...section, items: newItems };
      }
      return section;
    });

    setCanvas(updated);
    setNewItem("");
    setNewValue(undefined);
    setEditingSection(null);
  };

  const removeItem = (sectionId: string, index: number) => {
    const updated = canvas.map(section => {
      if (section.id === sectionId) {
        const newItems = section.items.filter((_, i) => i !== index);
        saveCanvasData(sectionId, newItems);
        return { ...section, items: newItems };
      }
      return section;
    });
    setCanvas(updated);
  };

  // Kalkulace - ZJEDNODUŠENÁ (TEĎ/CÍL jen u zákazníků!)
  const calculations = () => {
    const segments = canvas.find(s => s.id === 'segments')?.items || [];
    const values = canvas.find(s => s.id === 'value')?.items || [];
    const costs = canvas.find(s => s.id === 'costs')?.items || [];
    const revenue = canvas.find(s => s.id === 'revenue')?.items || [];

    // ZÁKAZNÍCI: TEĎ vs CÍL
    const currentCustomers = segments.reduce((sum, item) => sum + (item.currentValue || 0), 0);
    const targetCustomers = segments.reduce((sum, item) => sum + (item.targetValue || 0), 0);
    const customerGap = targetCustomers - currentCustomers;
    
    // HODNOTA: průměrná cena
    const avgPrice = values.length > 0 
      ? values.reduce((sum, item) => sum + (item.value || 0), 0) / values.length 
      : 0;
    
    // NÁKLADY: suma (fix hodnoty, ne TEĎ/CÍL!)
    const totalCosts = costs.reduce((sum, item) => sum + (item.value || 0), 0);
    
    // PŘÍJMY: suma (fix hodnoty, ne TEĎ/CÍL!)
    const totalRevenue = revenue.reduce((sum, item) => sum + (item.value || 0), 0);
    
    // ZISK
    const profit = totalRevenue - totalCosts;
    
    // POTENCIÁLNÍ PŘÍJEM (Zákazníci × Cena)
    const potentialCurrentRevenue = currentCustomers * avgPrice;
    const potentialTargetRevenue = targetCustomers * avgPrice;
    const revenueGap = potentialTargetRevenue - potentialCurrentRevenue;

    return {
      currentCustomers,
      targetCustomers,
      customerGap,
      avgPrice,
      totalCosts,
      totalRevenue,
      profit,
      potentialCurrentRevenue,
      potentialTargetRevenue,
      revenueGap,
    };
  };

  const calc = calculations();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="px-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 print:shadow-none">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              🎨 Podnikatelská Čtvrtka
            </h2>
            <p className="text-gray-600">
              Vyplňte si svůj byznys model + automatická kalkulace ziskovosti
            </p>
          </div>

          <div className="flex items-center gap-3 print:hidden">
            <Button
              variant="outline"
              onClick={() => setShowCalculations(!showCalculations)}
              size="sm"
            >
              <Calculator className="w-4 h-4 mr-2" />
              {showCalculations ? 'Skrýt' : 'Zobrazit'} kalkulaci
            </Button>
            <Button
              variant="outline"
              onClick={handlePrint}
              size="sm"
            >
              <Printer className="w-4 h-4 mr-2" />
              Vytisknout
            </Button>
            <Button
              onClick={handlePrint}
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas Grid */}
      <div className="bg-gray-50 rounded-xl shadow-lg p-6 print:p-8 print:bg-white">
        <div className="grid gap-3" style={{
          gridTemplateColumns: 'repeat(10, 1fr)',
          gridTemplateRows: 'repeat(3, minmax(200px, auto))',
          gridTemplateAreas: `
            "partners partners activities activities value value relationships relationships segments segments"
            "partners partners resources resources value value channels channels segments segments"
            "costs costs costs costs costs revenue revenue revenue revenue revenue"
          `
        }}>
          {canvas.map((section) => (
            <motion.div
              key={section.id}
              data-canvas-section={section.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border-2 border-gray-300 rounded-lg p-4 flex flex-col"
              style={{ gridArea: section.gridArea }}
            >
              {/* Section Title */}
              <h3 className="font-bold text-gray-900 mb-3 text-sm border-b border-gray-200 pb-2">
                {section.title}
              </h3>

              {/* Sticky Notes - FLEX WRAP (rozházené jako skutečné post-it!) */}
              <div className="flex-1 mb-3 overflow-y-auto max-h-40">
                <div className="flex flex-wrap gap-2">
                {section.items.map((item, index) => {
                  const colorName = hexToColorName(item.color as any);
                  const colorClasses = STICKY_COLORS[colorName] || STICKY_COLORS.blue;
                  
                  // 🌐 Detekuj "globální" štítky v byznysových sekcích
                  const isGlobalColor = colorName === 'global';
                  const isBusinessSection = ['partners', 'activities', 'resources', 'costs', 'revenue', 'channels', 'relationships'].includes(section.id);
                  const isGlobalItem = isGlobalColor && isBusinessSection;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      whileHover={{ scale: 1.05, rotate: 1, zIndex: 10 }}
                      className={`${colorClasses.bg} ${colorClasses.border} ${isGlobalItem ? 'border-dashed' : 'border-2'} p-2 rounded shadow-sm text-xs group hover:shadow-lg transition-all min-w-[80px] max-w-[140px] relative`}
                      title={isGlobalItem ? '🌐 Pro celý byznys model' : ''}
                    >
                      <div className="flex items-start gap-2">
                        {isGlobalItem && (
                          <span className="absolute top-0.5 right-0.5 text-[10px] opacity-60" title="Pro celý byznys">🌐</span>
                        )}
                        <div className="flex-1">
                          <div className={colorClasses.text}>{item.text}</div>
                          {/* ❌ ODSTRANĚNO: TEĎ/CÍL pro segments - byly matoucí */}
                          {/* Hodnota (cena, náklady, příjmy, průměrná útrata) */}
                          {item.value !== undefined && (
                            <div className={`${colorClasses.text} font-bold mt-1 text-xs`}>
                              {item.value.toLocaleString('cs-CZ')} {section.valueLabel?.includes('Kč') ? 'Kč' : ''}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(section.id, index)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-600 print:hidden"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
                </div>
              </div>

              {/* Add Item Form */}
              {editingSection === section.id ? (
                <div className="space-y-2 print:hidden">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) addItem(section.id);
                    }}
                    placeholder="Přidat položku..."
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  
                  {/* Value inputs */}
                  {section.valueLabel && (
                    <>
                      {/* ❌ ODSTRANĚNO: TEĎ/CÍL pro segments - matoucí! Segments mají jen průměrnou útratu */}
                      {/* Všechny sekce s valueLabel: jen jedna hodnota */}
                      <input
                        type="number"
                        value={newValue || ''}
                        onChange={(e) => setNewValue(e.target.value ? parseInt(e.target.value) : undefined)}
                        placeholder={section.valueLabel}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </>
                  )}
                  
                  {/* Color Picker - dynamický based on sekce */}
                  <div>
                    {/* ZÁKAZNICKÉ SEKCE: jen barevné segmenty (BEZ GLOBAL!) */}
                    {['segments', 'value', 'channels', 'relationships'].includes(section.id) ? (
                      <div className="flex gap-1 items-center">
                        <span className="text-xs text-gray-600 mr-1">Barva segmentu:</span>
                        {['blue', 'green', 'yellow', 'pink', 'purple'].map((color) => {
                          const classes = STICKY_COLORS[color as keyof typeof STICKY_COLORS];
                          return (
                            <button
                              key={color}
                              onClick={() => setSelectedColor(color as any)}
                              className={`w-6 h-6 rounded ${classes.bg} ${classes.border} border-2 ${
                                selectedColor === color ? 'ring-2 ring-gray-900' : ''
                              }`}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      /* BYZNYSOVÉ SEKCE: global + barevné (pokud je specifické) */
                      <div className="space-y-2">
                        <div className="flex gap-1 items-center">
                          <span className="text-xs text-gray-600 mr-1">🌐 Globální:</span>
                          {['global'].map((color) => {
                            const classes = STICKY_COLORS[color as keyof typeof STICKY_COLORS];
                            return (
                              <button
                                key={color}
                                onClick={() => setSelectedColor(color as any)}
                                className={`w-6 h-6 rounded ${classes.bg} ${classes.border} border-2 ${
                                  selectedColor === color ? 'ring-2 ring-gray-900' : ''
                                }`}
                                title="Pro celý byznys"
                              />
                            );
                          })}
                        </div>
                        <div className="flex gap-1 items-center">
                          <span className="text-xs text-gray-600 mr-1">Specifické:</span>
                          {['blue', 'green', 'yellow', 'pink', 'purple'].map((color) => {
                            const classes = STICKY_COLORS[color as keyof typeof STICKY_COLORS];
                            return (
                              <button
                                key={color}
                                onClick={() => setSelectedColor(color as any)}
                                className={`w-6 h-6 rounded ${classes.bg} ${classes.border} border-2 ${
                                  selectedColor === color ? 'ring-2 ring-gray-900' : ''
                                }`}
                                title={`Pro segment ${color}`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-1">
                    <Button
                      onClick={() => addItem(section.id)}
                      size="sm"
                      className="flex-1 text-xs h-7"
                    >
                      Přidat
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingSection(null);
                        setNewItem("");
                        setNewValue(undefined);
                      }}
                      size="sm"
                      className="text-xs h-7"
                    >
                      Zrušit
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setEditingSection(section.id)}
                  size="sm"
                  className="w-full text-xs h-7 print:hidden border-dashed"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Přidat
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Financial Calculations - POD Canvasem */}
      {showCalculations && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border-2 border-blue-200 print:hidden"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900">💰 Finanční kalkulace</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Náklady - SUMA (fix) */}
            <div className="bg-white rounded-lg p-4 border-2 border-red-200">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="w-4 h-4 text-red-600" />
                <span className="text-sm text-gray-600 font-semibold">Náklady (měsíčně)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">CELKEM:</span>
                <span className="font-bold text-red-600 text-lg">{calc.totalCosts.toLocaleString('cs-CZ')} Kč</span>
              </div>
            </div>

            {/* Příjmy - SUMA (fix) */}
            <div className="bg-white rounded-lg p-4 border-2 border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600 font-semibold">Příjmy (měsí��ně)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">CELKEM:</span>
                <span className="font-bold text-green-600 text-lg">{calc.totalRevenue.toLocaleString('cs-CZ')} Kč</span>
              </div>
            </div>
          </div>

          {/* Zisk */}
          <div className={`bg-white rounded-lg p-4 border-2 mt-4 ${
            calc.profit >= 0 ? 'border-emerald-300' : 'border-orange-300'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600 font-semibold">Zisk (Příjmy - Náklady)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">CELKEM:</span>
              <span className={`font-bold text-2xl ${calc.profit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {calc.profit >= 0 ? '+' : ''}{calc.profit.toLocaleString('cs-CZ')} Kč/měsíc
              </span>
            </div>
          </div>

          {/* Potenciál podle zákazníků - TEĎ vs CÍL */}
          {(calc.currentCustomers > 0 || calc.targetCustomers > 0) && (
            <div className="mt-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border-2 border-blue-300">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-gray-900">📈 Potenciál podle zákazníků</h4>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {/* TEĎ */}
                <div className="bg-white/70 rounded p-3">
                  <div className="text-xs text-gray-500 mb-1">TEĎ:</div>
                  <div className="font-bold text-gray-700">{calc.currentCustomers.toLocaleString('cs-CZ')} zákazníků</div>
                  {calc.avgPrice > 0 && (
                    <div className="text-xs text-gray-600 mt-1">
                      × {calc.avgPrice.toLocaleString('cs-CZ')} Kč = <strong>{calc.potentialCurrentRevenue.toLocaleString('cs-CZ')} Kč</strong>
                    </div>
                  )}
                </div>

                {/* CÍL */}
                <div className="bg-white/70 rounded p-3">
                  <div className="text-xs text-gray-500 mb-1">CÍL:</div>
                  <div className="font-bold text-green-600">{calc.targetCustomers.toLocaleString('cs-CZ')} zákazníků</div>
                  {calc.avgPrice > 0 && (
                    <div className="text-xs text-gray-600 mt-1">
                      × {calc.avgPrice.toLocaleString('cs-CZ')} Kč = <strong>{calc.potentialTargetRevenue.toLocaleString('cs-CZ')} Kč</strong>
                    </div>
                  )}
                </div>

                {/* GAP */}
                {calc.customerGap > 0 && (
                  <div className="bg-orange-50 rounded p-3 border border-orange-300">
                    <div className="text-xs text-orange-600 mb-1 font-semibold">POTŘEBUJETE:</div>
                    <div className="font-bold text-orange-600 text-lg">+{calc.customerGap.toLocaleString('cs-CZ')}</div>
                    <div className="text-xs text-orange-700 mt-1">zákazníků navíc</div>
                    {calc.avgPrice > 0 && (
                      <div className="text-xs text-orange-600 mt-1 font-semibold">
                        = +{calc.revenueGap.toLocaleString('cs-CZ')} Kč
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 print:hidden">
        <h3 className="font-bold text-blue-900 mb-3">
          💡 Tipy pro vyplnění + kalkulaci
        </h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-3 text-sm text-blue-800">
            <div>
              <strong>• Barvy = souvislost:</strong> Všechny modré položky spolu souvisí (produkt A)
            </div>
            <div>
              <strong>• 🌐 Globální = sdílená:</strong> Pro celý byznys (všechny segmenty)
            </div>
            <div>
              <strong>• Zákaznické segmenty:</strong> Přidejte počet zákazníků (TEĎ vs CÍL)
            </div>
            <div>
              <strong>• Hodnotová nabídka:</strong> Přidejte cenu produktu (např. 65 Kč)
            </div>
            <div>
              <strong>• Náklady a příjmy:</strong> Uvádějte měsíční částky (fix hodnoty)
            </div>
            <div>
              <strong>• ⚫ Šedá = neutrální:</strong> Zatím nezařazené položky
            </div>
          </div>
          
          <div className="bg-white/60 rounded-lg p-4 border border-blue-300">
            <div className="font-semibold text-blue-900 mb-2">📘 Kdy použít BÍLOU barvu:</div>
            <div className="space-y-1 text-xs text-blue-800">
              <div>✅ 1 hodnota pro více segmentů (kurz pro freelancery i firmy)</div>
              <div>✅ Více hodnot pro 1 kanál (prodáváme kurz i konzultace na FB)</div>
              <div>✅ Sdílené náklady (nájem, energie pro všechny produkty)</div>
              <div>✅ Společní partneři (Google Ads pro všechny produkty)</div>
              <div>✅ Univerzální zdroje (tým pracuje na všem)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          
          .grid {
            visibility: visible !important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          
          .grid * {
            visibility: visible !important;
          }
          
          button, .print\\:hidden {
            display: none !important;
          }

          @page {
            size: A4 landscape;
            margin: 1cm;
          }
        }
      `}</style>
    </div>
  );
}

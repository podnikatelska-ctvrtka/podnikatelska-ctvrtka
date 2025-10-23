import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import { hexToColorName } from "../lib/colorUtils";

interface CanvasItem {
  text: string;
  color: 'blue' | 'green' | 'yellow' | 'pink' | 'purple' | 'global' | 'red' | 'orange' | 'gray' | string; // Podporuje hex i názvy (gray = fallback)
  value?: number; // Jen pro value, costs, revenue (bez TEĎ/CÍL!)
}

interface CanvasSection {
  id: string;
  title: string;
  items: CanvasItem[];
  gridArea: string;
  valueLabel?: string;
}

// 🎨 Barvy pro sticky notes
// ❌ BÍLÁ ODSTRANĚNA - matoucí (hodnota vs globální zdroj)
// ✅ GLOBAL (šedá + 🌐) - jen pro byznysové sekce
// ❌ GRAY ODSTRANĚNA - používáme jen GLOBAL s ikonou 🌐
const STICKY_COLORS = {
  blue: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-900' },
  green: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-900' },
  yellow: { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-900' },
  pink: { bg: 'bg-pink-100', border: 'border-pink-300', text: 'text-pink-900' },
  purple: { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-900' },
  global: { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-800' }, // 🌐 Pro celý byznys
  gray: { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-800' }, // Backward compatibility - fallback na global
  red: { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-900' },
  orange: { bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-900' },
};

// ✅ hexToColorName moved to /lib/colorUtils.ts (shared utility)

// Canvas struktura - ZJEDNODUŠENÁ (bez TEĎ/CÍL)
const INITIAL_CANVAS: CanvasSection[] = [
  { id: "partners", title: "Klíčová partnerství", items: [], gridArea: "partners" },
  { id: "activities", title: "Klíčové aktivity", items: [], gridArea: "activities" },
  { id: "resources", title: "Klíčové zdroje", items: [], gridArea: "resources" },
  { id: "value", title: "Hodnotová nabídka", items: [], gridArea: "value" }, // ❌ BEZ Kč - jsou to benefity!
  { id: "relationships", title: "Vztahy se zákazníky", items: [], gridArea: "relationships" },
  { id: "channels", title: "Kanály", items: [], gridArea: "channels" },
  { id: "segments", title: "Zákaznické segmenty", items: [], gridArea: "segments" },
  { id: "costs", title: "Struktura nákladů", items: [], gridArea: "costs", valueLabel: "Náklady (Kč/měsíc)" },
  { id: "revenue", title: "Zdroje příjmů", items: [], gridArea: "revenue", valueLabel: "Příjmy (Kč/měsíc)" },
];

interface Props {
  userId: string;
  highlightSection?: string;
  hideTips?: boolean; // Schovat tipy během guided tour
  onItemAdded?: (sectionId: string) => void; // Callback když přidá položku
  onAchievementUnlocked?: (achievementId: string) => void; // 🎉 Achievement callback
  allowedSection?: string; // Jen tato sekce může přidávat položky (pro lekce)
  previewMode?: boolean; // Pro dashboard preview - menší štítky
}

export function BusinessModelCanvasSimple({ userId, highlightSection, hideTips = false, onItemAdded, onAchievementUnlocked, allowedSection, previewMode = false }: Props) {
  const [canvas, setCanvas] = useState<CanvasSection[]>(INITIAL_CANVAS);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [newItem, setNewItem] = useState("");
  const [newValue, setNewValue] = useState<number | undefined>();
  const [selectedColor, setSelectedColor] = useState<'blue' | 'green' | 'yellow' | 'pink' | 'purple' | 'global' | 'gray'>('blue');
  const [isSaving, setIsSaving] = useState(false);
  
  // ✅ NOVÉ: Pro editaci existujících štítků
  const [editingItem, setEditingItem] = useState<{sectionId: string; itemIndex: number} | null>(null);
  const [editItemText, setEditItemText] = useState("");
  const [editItemValue, setEditItemValue] = useState<number | undefined>();
  const [editItemColor, setEditItemColor] = useState<string>('blue');

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
      console.warn('Error loading canvas:', err);
    }
  };

  const saveCanvasData = async (sectionId: string, items: CanvasItem[]) => {
    if (!userId) return;

    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('user_canvas_data')
        .upsert({
          user_id: userId,
          section_key: sectionId,
          content: items
        }, {
          onConflict: 'user_id,section_key'
        });

      if (error) throw error;
      
      // 🎉 ACHIEVEMENT TRIGGERING (real-time, desktop version)
      if (onAchievementUnlocked) {
        const itemCount = items.length;
        
        // First segment/value
        if (sectionId === 'segments' && itemCount === 1) {
          onAchievementUnlocked('first-segment');
        } else if (sectionId === 'value' && itemCount === 1) {
          onAchievementUnlocked('first-value');
        }
        
        // Profit calculated (revenue/costs with value > 0)
        if ((sectionId === 'revenue' || sectionId === 'costs') && items.some(i => i.value && i.value > 0)) {
          onAchievementUnlocked('profit-calculated');
        }
        
        // Check if all 9 sections filled & profitable business
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
      console.error('Error saving canvas:', err);
      toast.error('Chyba při ukládání');
    } finally {
      setIsSaving(false);
    }
  };

  const addItem = (sectionId: string) => {
    if (!newItem.trim()) return;

    const updated = canvas.map(section => {
      if (section.id === sectionId) {
        const newItems = [...section.items, { text: newItem, color: selectedColor, value: newValue }];
        saveCanvasData(sectionId, newItems);
        
        // ✅ Callback pro guided tour
        if (onItemAdded) {
          onItemAdded(sectionId);
        }
        
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

  // ✅ NOVÉ: Update existujícího štítku
  const startEditItem = (sectionId: string, itemIndex: number) => {
    const section = canvas.find(s => s.id === sectionId);
    if (!section) return;
    
    const item = section.items[itemIndex];
    // 🔧 FIX: Vyčisti text od čísel (starší data měla číslo přímo v textu)
    const cleanText = item.text.replace(/\s+\d+(\s*Kč)?$/g, '').trim();
    
    setEditingItem({ sectionId, itemIndex });
    setEditItemText(cleanText);
    setEditItemValue(item.value);
    setEditItemColor(hexToColorName(item.color as any));
  };

  const saveEditItem = () => {
    if (!editingItem || !editItemText.trim()) return;

    const updated = canvas.map(section => {
      if (section.id === editingItem.sectionId) {
        const newItems = section.items.map((item, idx) => {
          if (idx === editingItem.itemIndex) {
            return {
              ...item,
              text: editItemText.trim(),
              color: editItemColor,
              value: editItemValue
            };
          }
          return item;
        });
        saveCanvasData(editingItem.sectionId, newItems);
        return { ...section, items: newItems };
      }
      return section;
    });

    setCanvas(updated);
    setEditingItem(null);
    setEditItemText("");
    setEditItemValue(undefined);
    toast.success("✅ Štítek upraven!");
  };

  const cancelEditItem = () => {
    setEditingItem(null);
    setEditItemText("");
    setEditItemValue(undefined);
  };

  return (
    <div className="space-y-6">
      {/* Mobile Warning */}
      <div className="md:hidden bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-4">
        <p className="text-sm text-yellow-800">
          📱 <strong>Mobilní upozornění:</strong> Canvas je optimalizovaný pro desktop. 
          Můžete scrollovat horizontálně. Pro nejlepší zkušenost doporučujeme PC nebo tablet.
        </p>
      </div>
      
      {/* Canvas Grid - FIXNÍ ŠÍŘKA 920px pro konzistenci (fit v 1152px containeru s paddingem) */}
      <div className="bg-gray-50 rounded-xl shadow-lg p-3 md:p-4 overflow-x-auto">
        <div className="grid gap-3 min-w-[920px]" style={{
          gridTemplateColumns: 'repeat(10, 1fr)',
          gridTemplateRows: 'minmax(240px, auto) minmax(240px, auto) minmax(200px, auto)', // Větší výšky pro více štítků
          gridTemplateAreas: `
            "partners partners activities activities value value relationships relationships segments segments"
            "partners partners resources resources value value channels channels segments segments"
            "costs costs costs costs costs revenue revenue revenue revenue revenue"
          `
        }}>
          {canvas.map((section) => (
            <div
              key={section.id}
              id={`canvas-section-${section.id}`}
              data-canvas-section={section.id}
              className={`bg-white border-2 rounded-lg p-3 flex flex-col transition-all overflow-visible ${
                highlightSection === section.id 
                  ? 'border-green-500 ring-2 ring-green-300' 
                  : 'border-gray-300'
              }`}
              style={{ gridArea: section.gridArea }}
            >
              {/* Section Title */}
              <h4 className="font-bold text-gray-700 mb-2 text-sm border-b border-gray-200 pb-1 pt-2 flex-shrink-0">
                {section.title}
              </h4>

              {/* Sticky Notes - NOVÝ DESIGN: čtvercové, nakloněné */}
              <div className="overflow-visible flex-1">
                <div className="flex flex-wrap gap-1.5 items-start content-start justify-start">
                {section.items.map((item, index) => {
                  // ✅ Převod HEX → název barvy
                  const colorName = hexToColorName(item.color as any);
                  const colorClasses = STICKY_COLORS[colorName] || STICKY_COLORS.blue;
                  
                  // 🌐 Detekuj "globální" štítky v byznysových sekcích
                  const isGlobalColor = colorName === 'global';
                  // ✅ Global JEN v: partners, activities, resources, costs, revenue (NE v channels, relationships!)
                  const isBusinessSection = ['partners', 'activities', 'resources', 'costs', 'revenue'].includes(section.id);
                  const isGlobalItem = isGlobalColor && isBusinessSection;
                  
                  // 🔧 FIX: Odstraň čísla z textu (starší data měla číslo přímo v textu)
                  // Regex: odstraň mezery + čísla na konci textu (např. "Manažinky 500" → "Manažinky")
                  const cleanText = item.text.replace(/\s+\d+(\s*Kč)?$/g, '').trim();
                  
                  // ✅ OPTIMALIZOVANÁ VELIKOST: 75px (z 85px) - menší ale stále čitelné
                  const rotationAngle = previewMode ? 1 : 2;
                  const randomRotate = index % 2 === 0 ? rotationAngle : -rotationAngle;
                  return (
                    <div
                      key={index}
                      onDoubleClick={() => {
                        // ✅ Edit JEN pokud je sekce povolená (nebo není žádné omezení)
                        if (!previewMode && (!allowedSection || allowedSection === section.id)) {
                          startEditItem(section.id, index);
                        }
                      }}
                      className={`${colorClasses.bg} ${colorClasses.border} ${isGlobalItem ? 'border-dashed' : 'border-2'} p-2 rounded shadow-md hover:shadow-lg transition-all flex items-center justify-center group relative flex-shrink-0 ${!previewMode && (!allowedSection || allowedSection === section.id) ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`}
                      title={isGlobalItem ? '🌐 Pro celý byznys model' : ''}
                      style={{
                        width: '75px',
                        minHeight: '75px',
                        transform: `rotate(${randomRotate}deg)`,
                      }}
                    >
                      {isGlobalItem && (
                        <span className="absolute top-0.5 right-0.5 text-[9px] opacity-60">🌐</span>
                      )}
                      <p 
                        className={`text-xs ${colorClasses.text} leading-tight text-center break-words font-medium`}
                      >
                        {cleanText}
                      </p>
                      {/* HODNOTA SE UKLÁDÁ, ALE NEZOBRAZUJE (pro výpočty v Modulu 2, Lekci 2) */}
                      {/* ✅ KŘÍŽEK JEN pokud je sekce povolená (nebo není žádné omezení) */}
                      {!previewMode && (!allowedSection || allowedSection === section.id) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem(section.id, index);
                          }}
                          className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-0.5 text-gray-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
                </div>
              </div>

              {/* Add Item Form nebo + Přidat tlačítko - VŽDYCKY DOLE (mt-auto) */}
              {editingSection === section.id ? (
                <div className="space-y-2 mt-auto pt-2 border-t border-gray-200">
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
                  
                  {/* Value input (pokud má valueLabel) */}
                  {section.valueLabel && (
                    <input
                      type="number"
                      value={newValue || ''}
                      onChange={(e) => setNewValue(e.target.value ? parseInt(e.target.value) : undefined)}
                      placeholder={section.valueLabel}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                  
                  {/* Color Picker - DYNAMICKÝ (zákaznické vs byznysové vs globální) */}
                  {(() => {
                    // 🎨 Zákaznické sekce (segments, value, channels, relationships) - JEN barevné
                    const allowsGlobal = ['partners', 'activities', 'resources', 'costs', 'revenue'].includes(section.id);
                    
                    return (
                      <div className="flex gap-1 flex-wrap">
                        {/* Barevné segmenty (vždy) */}
                        {['blue', 'green', 'yellow', 'pink', 'purple'].map((color) => {
                          const classes = STICKY_COLORS[color as keyof typeof STICKY_COLORS];
                          return (
                            <button
                              key={color}
                              onClick={() => setSelectedColor(color as any)}
                              className={`w-7 h-7 rounded ${classes.bg} ${classes.border} border hover:scale-110 transition-transform ${
                                selectedColor === color ? 'ring-2 ring-gray-900' : ''
                              }`}
                              title={`Segment ${color}`}
                            />
                          );
                        })}
                        
                        {/* Global (JEN pro vybrané byznysové sekce) */}
                        {allowsGlobal && (
                          <button
                            onClick={() => setSelectedColor('global')}
                            className={`w-7 h-7 rounded ${STICKY_COLORS.global.bg} ${STICKY_COLORS.global.border} border hover:scale-110 transition-transform flex items-center justify-center ${
                              selectedColor === 'global' ? 'ring-2 ring-gray-900' : ''
                            }`}
                            title="🌐 Pro celý byznys"
                          >
                            <span className="text-[10px]">🌐</span>
                          </button>
                        )}
                      </div>
                    );
                  })()}

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
                      className="flex-1 text-xs h-7"
                    >
                      Zrušit
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Add Button - JEN pokud je sekce povolená (nebo není žádné omezení) - VŽDYCKY DOLE */}
                  {!previewMode && (!allowedSection || allowedSection === section.id) && (
                    <Button
                      onClick={() => setEditingSection(section.id)}
                      variant="outline"
                      size="sm"
                      className="w-full border-2 border-dashed border-blue-400 hover:bg-blue-50 text-xs h-8 mt-auto"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Přidat
                    </Button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tips - ZJEDNODUŠENÉ (schované během tour!) */}
      {!hideTips && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-3">
            💡 Tipy pro vyplnění
          </h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm text-blue-800">
            <div>
              <strong>• Barvy = souvislost:</strong> Všechny modré položky spolu souvisí (produkt A)
            </div>
            <div className="bg-yellow-50 border border-yellow-300 rounded p-2">
              <strong>✏️ Double-click = editace:</strong> Dvakrát klikněte na jakýkoli štítek pro úpravu textu, barvy a hodnoty
            </div>
            <div>
              <strong>• Zákaznické segmenty:</strong> Popište své zákazníky konkrétně
            </div>
            <div>
              <strong>• Hodnotová nabídka:</strong> Přidejte cenu produktu (např. 65 Kč)
            </div>
            <div>
              <strong>• Náklady a příjmy:</strong> Uvádějte měsíční částky
            </div>
            <div>
              <strong>• 🌐 Globální (šedá):</strong> Jen pro partners, activities, resources, costs, revenue
            </div>
          </div>
        </div>
      )}

      {/* ✅ EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={cancelEditItem}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <h3 className="font-bold text-gray-900 mb-4">✏️ Upravit štítek</h3>
            
            <div className="space-y-4">
              {/* Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Text:</label>
                <input
                  type="text"
                  value={editItemText}
                  onChange={(e) => setEditItemText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>

              {/* Value (pokud má section valueLabel) */}
              {(() => {
                const section = canvas.find(s => s.id === editingItem.sectionId);
                return section?.valueLabel ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{section.valueLabel}:</label>
                    <input
                      type="number"
                      value={editItemValue || ''}
                      onChange={(e) => setEditItemValue(e.target.value ? parseInt(e.target.value) : undefined)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ) : null;
              })()}

              {/* Color Picker - 2 ŘÁDKY (s podmínkou pro global) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Barva:</label>
                
                {/* Řádek 1: Barevné segmenty */}
                <div className="mb-3">
                  <p className="text-xs text-gray-600 mb-1">Pro konkrétní segment:</p>
                  <div className="flex gap-2 flex-wrap">
                    {['blue', 'green', 'yellow', 'pink', 'purple'].map((color) => {
                      const classes = STICKY_COLORS[color as keyof typeof STICKY_COLORS];
                      return (
                        <button
                          key={color}
                          onClick={() => setEditItemColor(color)}
                          className={`w-10 h-10 rounded ${classes.bg} ${classes.border} border-2 hover:scale-110 transition-transform ${
                            editItemColor === color ? 'ring-2 ring-gray-900' : ''
                          }`}
                          title={`Segment ${color}`}
                        />
                      );
                    })}
                  </div>
                </div>
                
                {/* Řádek 2: Globální - JEN pro vybrané byznysové sekce */}
                {(() => {
                  const section = canvas.find(s => s.id === editingItem.sectionId);
                  const allowsGlobal = section && ['partners', 'activities', 'resources', 'costs', 'revenue'].includes(section.id);
                  
                  return allowsGlobal ? (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Globální (celý byznys):</p>
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => setEditItemColor('global')}
                          className={`w-10 h-10 rounded ${STICKY_COLORS.global.bg} ${STICKY_COLORS.global.border} border-2 hover:scale-110 transition-transform ${
                            editItemColor === 'global' ? 'ring-2 ring-gray-900' : ''
                          }`}
                          title="🌐 Pro celý byznys"
                        >
                          <span className="text-xs">🌐</span>
                        </button>
                      </div>
                      {editItemColor === 'global' && (
                        <p className="text-xs text-gray-500 mt-2">🌐 Globální = pro celý byznys model</p>
                      )}
                    </div>
                  ) : null;
                })()}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-2">
                <Button onClick={saveEditItem} className="flex-1">
                  ✅ Uložit
                </Button>
                <Button variant="outline" onClick={cancelEditItem} className="flex-1">
                  Zrušit
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

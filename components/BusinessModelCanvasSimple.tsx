import { useState, useEffect } from "react";
import { motion } from "motion/react";
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
  { id: "costs", title: "Struktura nákladů", items: [], gridArea: "costs", valueLabel: "Náklady (Kč/m��síc)" },
  { id: "revenue", title: "Zdroje příjmů", items: [], gridArea: "revenue", valueLabel: "Příjmy (Kč/měsíc)" },
];

interface Props {
  userId: number;
  highlightSection?: string;
  hideTips?: boolean; // Schovat tipy během guided tour
  onItemAdded?: (sectionId: string) => void; // Callback když přidá položku
  allowedSection?: string; // Jen tato sekce může přidávat položky (pro lekce)
  previewMode?: boolean; // Pro dashboard preview - menší štítky
}

export function BusinessModelCanvasSimple({ userId, highlightSection, hideTips = false, onItemAdded, allowedSection, previewMode = false }: Props) {
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
        .from('business_canvas_sections')
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
    }
  };

  const saveCanvasData = async (sectionId: string, items: CanvasItem[]) => {
    if (!userId) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('business_canvas_sections')
        .upsert({
          user_id: userId,
          section_key: sectionId,
          content: items,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,section_key'
        });

      if (error) throw error;
      // ✅ TOAST ODSTRANĚN - AutosaveIndicator to už ukazuje!
    } catch (err) {
      console.error('Save failed:', err);
      toast.error("Chyba při ukládání");
    } finally {
      setIsSaving(false);
    }
  };

  const addItem = (sectionId: string) => {
    if (!newItem.trim()) return;

    const updated = canvas.map(section => {
      if (section.id === sectionId) {
        // ✅ ZPĚT NA selectedColor - uživatel vybírá barvu manuálně!
        const newItemData = { 
          text: newItem.trim(), 
          color: selectedColor, // ← MANUÁLNÍ VÝBĚR BARVY!
          value: newValue 
        };
        
        const newItems = [...section.items, newItemData];
        saveCanvasData(sectionId, newItems);
        
        // Notify parent že přidal položku
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
    setEditingItem({ sectionId, itemIndex });
    setEditItemText(item.text);
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
      
      {/* Canvas Grid - VĚTŠÍ! */}
      <div className="bg-gray-50 rounded-xl shadow-lg p-4 md:p-8 overflow-x-auto">
        <div className="grid gap-4 min-w-[800px]" style={{
          gridTemplateColumns: 'repeat(10, 1fr)',
          gridTemplateRows: 'repeat(3, minmax(220px, auto))',
          gridTemplateAreas: `
            "partners partners activities activities value value relationships relationships segments segments"
            "partners partners resources resources value value channels channels segments segments"
            "costs costs costs costs costs revenue revenue revenue revenue revenue"
          `
        }}>
          {canvas.map((section) => (
            <motion.div
              key={section.id}
              id={`canvas-section-${section.id}`}
              data-canvas-section={section.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-white border-2 rounded-lg p-3 flex flex-col transition-all ${
                highlightSection === section.id 
                  ? 'border-green-500 ring-2 ring-green-300' 
                  : 'border-gray-300'
              }`}
              style={{ gridArea: section.gridArea }}
            >
              {/* Section Title */}
              <h3 className="font-bold text-gray-900 mb-2 text-sm border-b border-gray-200 pb-1.5">
                {section.title}
              </h3>

              {/* Sticky Notes - NOVÝ DESIGN: čtvercové, nakloněné */}
              <div className="flex-1 mb-2">
                <div className="flex flex-wrap gap-2 items-start content-start justify-start">
                {section.items.map((item, index) => {
                  // ✅ Převod HEX → název barvy
                  const colorName = hexToColorName(item.color as any);
                  const colorClasses = STICKY_COLORS[colorName] || STICKY_COLORS.blue;
                  
                  // 🌐 Detekuj "globální" štítky v byznysových sekcích
                  const isGlobalColor = colorName === 'global';
                  const isBusinessSection = ['partners', 'activities', 'resources', 'costs', 'revenue', 'channels', 'relationships'].includes(section.id);
                  const isGlobalItem = isGlobalColor && isBusinessSection;
                  
                  // Inteligentní náklom - menší v preview módu pro lepší využití prostoru
                  const rotationAngle = previewMode ? 1 : 2;
                  const randomRotate = index % 2 === 0 ? rotationAngle : -rotationAngle;
                  return (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.8, opacity: 0, rotate: randomRotate - 3 }}
                      animate={{ scale: 1, opacity: 1, rotate: randomRotate }}
                      whileHover={
                        !previewMode && (!allowedSection || allowedSection === section.id)
                          ? { scale: 1.05, rotate: 0, zIndex: 20 }
                          : { rotate: 0 }
                      }
                      onDoubleClick={() => {
                        // ✅ Edit JEN pokud je sekce povolená (nebo není žádné omezení)
                        if (!previewMode && (!allowedSection || allowedSection === section.id)) {
                          startEditItem(section.id, index);
                        }
                      }}
                      className={`${colorClasses.bg} ${colorClasses.border} ${isGlobalItem ? 'border-dashed' : 'border-2'} p-1.5 rounded shadow-md hover:shadow-lg transition-all flex items-center justify-center group relative ${!previewMode && (!allowedSection || allowedSection === section.id) ? 'cursor-pointer' : 'cursor-default opacity-60'}`}
                      title={isGlobalItem ? '🌐 Pro celý byznys model' : ''}
                      style={{
                        width: '80px',
                        minHeight: '80px',
                      }}
                    >
                      {isGlobalItem && (
                        <span className="absolute top-0.5 right-0.5 text-[9px] opacity-60">🌐</span>
                      )}
                      <p 
                        className={`${previewMode ? 'text-[10px]' : 'text-[11px]'} ${colorClasses.text} leading-tight font-medium text-center break-words`}
                      >
                        {item.text}
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
                    </motion.div>
                  );
                })}
                </div>
              </div>

              {/* Add Item Form */}
              {editingSection === section.id ? (
                <div className="space-y-2">
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
                  
                  {/* Color Picker - DYNAMICKÝ (zákaznické vs byznysové) */}
                  {(() => {
                    const isCustomerSection = ['segments', 'value', 'channels', 'relationships'].includes(section.id);
                    
                    if (isCustomerSection) {
                      // ✅ ZÁKAZNICKÉ SEKCE: Jen barevné segmenty (BEZ GLOBAL!)
                      return (
                        <div className="flex gap-1 items-center flex-wrap">
                          <span className="text-xs text-gray-600 mr-1">Barva segmentu:</span>
                          {['blue', 'green', 'yellow', 'pink', 'purple'].map((color) => {
                            const classes = STICKY_COLORS[color as keyof typeof STICKY_COLORS];
                            return (
                              <button
                                key={color}
                                onClick={() => setSelectedColor(color as any)}
                                className={`w-6 h-6 rounded ${classes.bg} ${classes.border} border-2 hover:scale-110 transition-transform ${
                                  selectedColor === color ? 'ring-2 ring-gray-900' : ''
                                }`}
                              />
                            );
                          })}
                        </div>
                      );
                    } else {
                      // ✅ BYZNYSOVÉ SEKCE: Segmenty + Global
                      return (
                        <div className="space-y-2">
                          <div className="flex gap-1 items-center flex-wrap">
                            <span className="text-xs text-gray-600 mr-1">Segment:</span>
                            {['blue', 'green', 'yellow', 'pink', 'purple'].map((color) => {
                              const classes = STICKY_COLORS[color as keyof typeof STICKY_COLORS];
                              return (
                                <button
                                  key={color}
                                  onClick={() => setSelectedColor(color as any)}
                                  className={`w-6 h-6 rounded ${classes.bg} ${classes.border} border-2 hover:scale-110 transition-transform ${
                                    selectedColor === color ? 'ring-2 ring-gray-900' : ''
                                  }`}
                                />
                              );
                            })}
                          </div>
                          <div className="flex gap-1 items-center flex-wrap">
                            <span className="text-xs text-gray-600 mr-1">Globální:</span>
                            <button
                              onClick={() => setSelectedColor('global')}
                              className={`w-6 h-6 rounded ${STICKY_COLORS.global.bg} ${STICKY_COLORS.global.border} border-2 hover:scale-110 transition-transform flex items-center justify-center ${
                                selectedColor === 'global' ? 'ring-2 ring-gray-900' : ''
                              }`}
                              title="🌐 Pro celý byznys"
                            >
                              <span className="text-[8px]">🌐</span>
                            </button>
                          </div>
                        </div>
                      );
                    }
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
                // Zobraz tlačítko "Přidat" jen pokud:
                // 1. allowedSection není nastaveno (= volný režim) NEBO
                // 2. allowedSection === section.id (= tato sekce je povolená)
                (!allowedSection || allowedSection === section.id) && (
                  <Button
                    onClick={() => setEditingSection(section.id)}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs h-8"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Přidat
                  </Button>
                )
              )}
            </motion.div>
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
            <div>
              <strong>• Double klik = editace:</strong> Dvakrát klikněte na štítek pro editaci textu a barvy
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
              <strong>• 🌐 Globální (šedá):</strong> Pro celý byznys model
            </div>
          </div>
        </div>
      )}

      {/* ✅ EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={cancelEditItem}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl"
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

              {/* Color Picker - 2 ŘÁDKY */}
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
                
                {/* Řádek 2: Globální */}
                <div>
                  <p className="text-xs text-gray-600 mb-1">Globální (celý byznys):</p>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setEditItemColor('global')}
                      className={`w-10 h-10 rounded ${STICKY_COLORS.global.bg} ${STICKY_COLORS.global.border} border-2 hover:scale-110 transition-transform ${
                        editItemColor === 'global' ? 'ring-2 ring-gray-900' : ''
                      }`}
                      title="�� Pro celý byznys"
                    >
                      <span className="text-xs">🌐</span>
                    </button>
                  </div>
                </div>
                
                {editItemColor === 'global' && (
                  <p className="text-xs text-gray-500 mt-2">🌐 Globální = pro celý byznys model</p>
                )}
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
          </motion.div>
        </div>
      )}
    </div>
  );
}

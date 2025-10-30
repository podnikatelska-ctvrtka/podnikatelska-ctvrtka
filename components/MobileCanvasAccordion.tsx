import { useState } from "react";
import { Plus, X, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { hexToColorName } from "../lib/colorUtils";
import { BottomSheet } from "./BottomSheet";
import { haptic } from "../lib/haptics";
import { toast } from "sonner";

interface CanvasItem {
  text: string;
  color: 'blue' | 'green' | 'yellow' | 'pink' | 'purple' | 'global' | 'gray';
  value?: number;
}

interface CanvasSection {
  id: string;
  title: string;
  items: CanvasItem[];
  valueLabel?: string;
}

const STICKY_COLORS = {
  blue: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-900' },
  green: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-900' },
  yellow: { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-900' },
  pink: { bg: 'bg-pink-100', border: 'border-pink-300', text: 'text-pink-900' },
  purple: { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-900' },
  global: { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-800' }, // 🌐 Pro celý byznys
  gray: { bg: 'bg-gray-100', border: 'border-gray-400', text: 'text-gray-700' },
};

interface Props {
  sections: CanvasSection[];
  highlightSection?: string;
  allowedSection?: string;
  onAddItem: (sectionId: string, text: string, color: string, value?: number) => void;
  onRemoveItem: (sectionId: string, index: number) => void;
  onUpdateItem?: (sectionId: string, index: number, text: string, color: string, value?: number) => void;
}

export function MobileCanvasAccordion({ 
  sections, 
  highlightSection,
  allowedSection,
  onAddItem, 
  onRemoveItem,
  onUpdateItem
}: Props) {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [newItem, setNewItem] = useState("");
  const [newValue, setNewValue] = useState<number | undefined>();
  const [selectedColor, setSelectedColor] = useState<'blue' | 'green' | 'yellow' | 'pink' | 'purple' | 'global' | 'gray'>('blue');
  
  // 🎯 EDIT STATE: Pro editaci existujících položek
  const [editingItem, setEditingItem] = useState<{sectionId: string, index: number} | null>(null);
  const [editText, setEditText] = useState("");
  const [editValue, setEditValue] = useState<number | undefined>();

  const handleAddItem = (sectionId: string) => {
    if (!newItem.trim()) return;
    
    haptic('success');
    onAddItem(sectionId, newItem, selectedColor, newValue);
    
    // 🎉 Toast notification
    toast.success("✅ Štítek přidán!", {
      description: newItem.length > 30 ? newItem.substring(0, 30) + "..." : newItem
    });
    
    setNewItem("");
    setNewValue(undefined);
    setEditingSection(null);
    
    // ✅ Scroll restore handled by BottomSheet component
  };

  const handleOpenSheet = (sectionId: string) => {
    haptic('light');
    setEditingSection(sectionId);
  };

  const handleCloseSheet = () => {
    setEditingSection(null);
    setNewItem("");
    setNewValue(undefined);
    setEditingItem(null);
    setEditText("");
    setEditValue(undefined);
  };
  
  // 🎯 EDIT HANDLERS
  const handleStartEdit = (sectionId: string, index: number) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;
    
    const item = section.items[index];
    
    haptic('medium');
    setEditingItem({ sectionId, index });
    setEditText(item.text);
    setEditValue(item.value);
    setSelectedColor(item.color); // ✅ Načti původní barvu
    setEditingSection(sectionId); // Otevře bottom sheet
  };
  
  const handleSaveEdit = () => {
    if (!editingItem || !editText.trim()) return;
    
    const section = sections.find(s => s.id === editingItem.sectionId);
    if (!section) return;
    
    haptic('success');
    
    // ✅ POUŽIJ UPDATE místo remove+add (zachová pořadí!)
    if (onUpdateItem) {
      onUpdateItem(editingItem.sectionId, editingItem.index, editText, selectedColor, editValue);
    } else {
      // Fallback: Remove + Add (pro backward compatibility)
      onRemoveItem(editingItem.sectionId, editingItem.index);
      onAddItem(editingItem.sectionId, editText, selectedColor, editValue);
    }
    
    // 🎉 Toast notification
    toast.success("✅ Štítek upraven!", {
      description: editText.length > 30 ? editText.substring(0, 30) + "..." : editText
    });
    
    // Close sheet
    handleCloseSheet();
    
    // ✅ Scroll restore handled by BottomSheet component
  };

  const handleSubmit = () => {
    if (!editingSection) return;
    
    if (editingItem) {
      handleSaveEdit();
    } else {
      handleAddItem(editingSection);
    }
  };

  const currentSection = sections.find(s => s.id === editingSection);
  const isEditMode = !!editingItem;
  const currentText = isEditMode ? editText : newItem;
  const currentValue = isEditMode ? editValue : newValue;

  return (
    <div className="space-y-4">
      {sections.map((section) => {
        const isHighlighted = highlightSection === section.id;
        const isAllowed = !allowedSection || allowedSection === section.id;
        
        return (
          <div
            key={section.id}
            className={`border-2 rounded-xl p-4 transition-all ${
              isHighlighted 
                ? 'border-blue-500 bg-blue-50 shadow-lg' 
                : 'border-gray-200 bg-white'
            } ${!isAllowed ? 'opacity-50 pointer-events-none' : ''}`}
          >
            {/* ✅ HEADER - vždy viditelný */}
            <div className="mb-3">
              <h3 className="font-semibold text-gray-900">{section.title}</h3>
              {isHighlighted && (
                <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                  <span>Začni zde</span>
                  <span className="text-base">↓</span>
                </p>
              )}
            </div>

            {/* ✅ STICKY NOTES - existující položky */}
            {section.items.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {section.items.map((item, index) => {
                  const colorClasses = STICKY_COLORS[item.color] || STICKY_COLORS.blue;
                  const isGlobal = item.color === 'global';
                  const randomRotate = (index % 3 - 1) * 2;
                  
                  return (
                    <div
                      key={index}
                      style={{ transform: `rotate(${randomRotate}deg)` }}
                      onClick={() => handleStartEdit(section.id, index)}
                      className={`${colorClasses.bg} ${colorClasses.border} ${
                        isGlobal ? 'border-dashed' : 'border-2'
                      } p-1.5 rounded-md shadow-md text-xs group relative transition-all cursor-pointer hover:scale-105 select-none min-w-[60px] max-w-[85px]`}
                    >
                      {/* Globální ikona */}
                      {isGlobal && (
                        <span className="absolute top-0.5 right-0.5 text-[10px] opacity-60">🌐</span>
                      )}
                      
                      {/* ❌ DELETE BUTTON REMOVED - pouze v bottom sheetu! */}
                      
                      <div className={colorClasses.text}>
                        <div className="pr-2 break-words overflow-wrap-anywhere leading-tight text-[11px]">{item.text}</div>
                        <p className="text-[9px] opacity-0 group-hover:opacity-60 transition-opacity mt-0.5">
                          Klikni
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ✅ ADD BUTTON - vždy viditelné */}
            <Button
              onClick={() => handleOpenSheet(section.id)}
              variant="outline"
              className="w-full border-2 border-dashed border-blue-400 text-blue-600 hover:bg-blue-50 h-12"
              disabled={!isAllowed}
            >
              <Plus className="w-5 h-5 mr-2" />
              Přidej {section.title.toLowerCase()}
            </Button>
          </div>
        );
      })}

      {/* ✅ BOTTOM SHEET - pro přidání/editaci */}
      <BottomSheet
        isOpen={!!editingSection}
        onClose={handleCloseSheet}
        title={isEditMode ? `Upravit položku` : `Přidat do "${currentSection?.title}"`}
        snapPoints={[0.85, 0.95]}
        defaultSnap={0}
      >
        {currentSection && (
          <div className="p-4">
            {/* ✅ INPUT NAHORU - první věc co user vidí */}
            <div className="space-y-4">
              {/* Text Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text položky
                </label>
                <input
                  type="text"
                  value={currentText}
                  onChange={(e) => {
                    if (isEditMode) {
                      setEditText(e.target.value);
                    } else {
                      setNewItem(e.target.value);
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) handleSubmit();
                  }}
                  placeholder="Napište text..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Value Input (optional) */}
              {currentSection.valueLabel && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentSection.valueLabel}
                  </label>
                  <input
                    type="number"
                    value={currentValue || ''}
                    onChange={(e) => {
                      const val = e.target.value ? parseInt(e.target.value) : undefined;
                      if (isEditMode) {
                        setEditValue(val);
                      } else {
                        setNewValue(val);
                      }
                    }}
                    placeholder={currentSection.valueLabel}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}

              {/* ✅ COLOR PICKER - POD inputem */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Vyber barvu:</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-2">Pro konkrétní segment:</p>
                    <div className="flex flex-wrap gap-2">
                      {(['blue', 'green', 'yellow', 'pink', 'purple'] as const).map((color) => {
                        const classes = STICKY_COLORS[color as keyof typeof STICKY_COLORS];
                        return (
                          <button
                            key={color}
                            onClick={() => {
                              haptic('selection');
                              setSelectedColor(color as any);
                            }}
                            className={`w-12 h-12 rounded-lg ${classes.bg} ${classes.border} border-2 transition-all ${
                              selectedColor === color ? 'ring-4 ring-blue-500 scale-110' : 'hover:scale-105'
                            }`}
                            aria-label={`Segment: ${color}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* ✅ GLOBAL - JEN pro vybrané sekce (partners, activities, resources, costs, revenue) */}
                  {currentSection && ['partners', 'activities', 'resources', 'costs', 'revenue'].includes(currentSection.id) && (
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Globální (celý byznys):</p>
                      <button
                        onClick={() => {
                          haptic('selection');
                          setSelectedColor('global');
                        }}
                        className={`w-12 h-12 rounded-lg ${STICKY_COLORS.global.bg} ${STICKY_COLORS.global.border} border-2 border-dashed transition-all ${
                          selectedColor === 'global' ? 'ring-4 ring-blue-500 scale-110' : 'hover:scale-105'
                        }`}
                        aria-label="Globální segment"
                      >
                        🌐
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ✅ BUTTONS - fixed na bottom */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleSubmit}
                disabled={!currentText.trim()}
                size="lg"
                className="flex-1 bg-blue-600 hover:bg-blue-700 h-14 text-lg"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                {isEditMode ? 'Uložit' : 'Přidat'}
              </Button>
              <Button
                onClick={handleCloseSheet}
                variant="outline"
                size="lg"
                className="h-14 px-6"
              >
                Zrušit
              </Button>
            </div>
            
            {/* Delete Button - pouze při editaci */}
            {isEditMode && editingItem && (
              <Button
                onClick={() => {
                  haptic('warning');
                  const deletedText = editText;
                  onRemoveItem(editingItem.sectionId, editingItem.index);
                  
                  // 🗑️ Toast notification
                  toast.success("🗑️ Štítek smazán", {
                    description: deletedText.length > 30 ? deletedText.substring(0, 30) + "..." : deletedText
                  });
                  
                  handleCloseSheet();
                }}
                variant="destructive"
                size="lg"
                className="w-full h-12 bg-red-500 hover:bg-red-600 mt-3"
              >
                <X className="w-5 h-5 mr-2" />
                Smazat položku
              </Button>
            )}
          </div>
        )}
      </BottomSheet>
    </div>
  );
}

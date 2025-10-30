import { useState } from "react";
import { Plus, X, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { hexToColorName } from "../lib/colorUtils";
import { BottomSheet } from "./BottomSheet";
import { haptic } from "../lib/haptics";
import { toast } from "sonner";

interface CanvasItem {
  text: string;
  color: 'blue' | 'green' | 'yellow' | 'pink' | 'purple' | 'white' | 'gray';
  value?: number;
}

const STICKY_COLORS = {
  blue: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-900' },
  green: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-900' },
  yellow: { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-900' },
  pink: { bg: 'bg-pink-100', border: 'border-pink-300', text: 'text-pink-900' },
  purple: { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-900' },
  // ❌ BÍLÁ A ŠEDÁ ODSTRANĚNY - není na desktop verzi, může docházet ke kolizi
  global: { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-800', icon: '🌐' }, // Pro celý byznys
};

interface Props {
  sectionTitle: string;
  items: CanvasItem[];
  valueLabel?: string;
  allowGlobal?: boolean; // Povolit globální barvu? (default: true)
  onAddItem: (text: string, color: string, value?: number) => void;
  onRemoveItem: (index: number) => void;
  onEditItem?: (index: number, text: string, color: string, value?: number) => void; // ✅ Nový callback pro editaci
  onComplete: () => void;
}

export function MobileSingleSection({ 
  sectionTitle,
  items,
  valueLabel,
  allowGlobal = true,
  onAddItem,
  onRemoveItem,
  onEditItem,
  onComplete
}: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newItem, setNewItem] = useState("");
  const [newValue, setNewValue] = useState<number | undefined>();
  const [selectedColor, setSelectedColor] = useState<'blue' | 'green' | 'yellow' | 'pink' | 'purple' | 'white' | 'gray'>('blue');

  const handleAdd = () => {
    if (!newItem.trim()) return;
    
    haptic('success');
    onAddItem(newItem, selectedColor, newValue);
    
    // 🎉 Toast notification
    toast.success("✅ Štítek přidán!", {
      description: newItem.length > 30 ? newItem.substring(0, 30) + "..." : newItem
    });
    
    setNewItem("");
    setNewValue(undefined);
    setIsAdding(false);
    
    // ✅ Scroll restore handled by BottomSheet component
  };

  const handleOpenSheet = () => {
    haptic('light');
    setIsAdding(true);
    // ✅ Scroll freeze handled by BottomSheet component
  };

  const handleCloseSheet = () => {
    setIsAdding(false);
    setIsEditing(false);
    setEditingIndex(null);
    setNewItem("");
    setNewValue(undefined);
    // ✅ Scroll restore handled by BottomSheet component
  };
  
  const handleEdit = (index: number) => {
    const item = items[index];
    // 🔧 FIX: Vyčisti text od čísel (starší data měla číslo přímo v textu)
    const cleanText = item.text.replace(/\s+\d+(\s*Kč)?$/g, '').trim();
    
    setEditingIndex(index);
    setNewItem(cleanText);
    setNewValue(item.value);
    setSelectedColor(typeof item.color === 'string' ? hexToColorName(item.color as any) : item.color);
    setIsEditing(true);
    haptic('light');
    // ✅ Scroll freeze handled by BottomSheet component
  };
  
  const handleSaveEdit = () => {
    if (!newItem.trim() || editingIndex === null) return;
    
    haptic('success');
    
    // ✅ DESKTOP LOGIKA - IN-PLACE editace (ne remove+add!)
    if (onEditItem) {
      // Nový callback - edituje přímo na indexu
      onEditItem(editingIndex, newItem, selectedColor, newValue);
    } else {
      // ❌ FALLBACK - stará logika (může způsobit duplicity!)
      onRemoveItem(editingIndex);
      onAddItem(newItem, selectedColor, newValue);
    }
    
    // 🎉 Toast notification
    toast.success("✅ Štítek upraven!", {
      description: newItem.length > 30 ? newItem.substring(0, 30) + "..." : newItem
    });
    
    // Reset
    setIsEditing(false);
    setEditingIndex(null);
    setNewItem("");
    setNewValue(undefined);
    
    // ✅ Scroll restore handled by BottomSheet component
  };

  return (
    <div className="bg-white rounded-xl border-2 border-blue-400 shadow-lg p-4">
      {/* Header */}
      <div className="mb-4 pb-3 border-b-2 border-blue-200">
        <h3 className="font-bold text-lg text-blue-900 mb-1">{sectionTitle}</h3>
        <p className="text-sm text-gray-600">
          Přidejte položky do této sekce
        </p>
        {items.length > 0 && (
          <div className="mt-2 inline-flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              {items.length} {items.length === 1 ? 'položka' : items.length < 5 ? 'položky' : 'položek'}
            </span>
          </div>
        )}
      </div>

      {/* Sticky Notes */}
      <div className="mb-4 min-h-[80px]">
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => {
            // ✅ Převod HEX → název barvy
            const colorName = hexToColorName(item.color as any);
            const colorClasses = STICKY_COLORS[colorName] || STICKY_COLORS.blue;
            const randomRotate = (index % 3 - 1) * 2;
            const isGlobal = colorName === 'global';
            
            // 🔧 FIX: Odstraň čísla z textu (starší data měla číslo přímo v textu)
            // Regex: odstraň mezery + čísla na konci textu (např. "Manažinky 500" → "Manažinky")
            const cleanText = item.text.replace(/\s+\d+(\s*Kč)?$/g, '').trim();
            
            return (
              <div
                key={index}
                style={{ transform: `rotate(${randomRotate}deg)` }}
                onClick={() => handleEdit(index)}
                className={`${colorClasses.bg} ${colorClasses.border} ${isGlobal ? 'border-dashed' : 'border-2'} p-1.5 rounded-md shadow-md text-xs group relative transition-all cursor-pointer hover:scale-105 select-none min-w-[60px] max-w-[85px]`}
              >
                {/* Globální ikona */}
                {isGlobal && (
                  <span className="absolute top-0.5 right-0.5 text-[10px] opacity-60">🌐</span>
                )}
                
                {/* ❌ DELETE BUTTON REMOVED - pouze v bottom sheetu! */}
                
                <div className={colorClasses.text}>
                  <div className="pr-2 break-words overflow-wrap-anywhere leading-tight text-[11px]">{cleanText}</div>
                  {/* HODNOTA SE UKLÁDÁ, ALE NEZOBRAZUJE (pro výpočty v Modulu 2, Lekci 2) */}
                  <p className="text-[9px] opacity-0 group-hover:opacity-60 transition-opacity mt-0.5">
                    Klikni
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {items.length > 0 && (
          <p className="text-xs text-gray-500 text-center mt-2">
            💡 Tip: Klikněte na štítek pro editaci
          </p>
        )}
      </div>

      {/* Add Button - Opens Bottom Sheet */}
      <Button
        onClick={handleOpenSheet}
        variant="outline"
        size="lg"
        className="w-full h-12 border-2 border-dashed border-blue-400 hover:bg-blue-50"
      >
        <Plus className="w-5 h-5 mr-2" />
        Přidat další položku
      </Button>

      {/* Bottom Sheet - Add/Edit Item Form */}
      <BottomSheet
        isOpen={isAdding || isEditing}
        onClose={handleCloseSheet}
        title={isEditing ? "Upravit položku" : "Přidat položku"}
        snapPoints={[0.85, 0.95]}
        defaultSnap={0}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text položky
            </label>
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  if (isEditing) {
                    handleSaveEdit();
                  } else {
                    handleAdd();
                  }
                }
              }}
              placeholder="Napište text..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {valueLabel && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {valueLabel}
              </label>
              <input
                type="number"
                value={newValue || ''}
                onChange={(e) => setNewValue(e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder={valueLabel}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
          
          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vyberte barvu
            </label>
            
            {/* Řádek 1: Barevné segmenty */}
            <p className="text-xs text-gray-600 mb-2">Pro konkrétní segment:</p>
            <div className="flex gap-3 flex-wrap mb-4">
              {['blue', 'green', 'yellow', 'pink', 'purple'].map((color) => {
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
                    aria-label={`Barva: ${color}`}
                  />
                );
              })}
            </div>
            
            {/* Řádek 2: Globální - JEN pokud je povoleno */}
            {allowGlobal && (
              <>
                <p className="text-xs text-gray-600 mb-2">Globální (celý byznys):</p>
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => {
                      haptic('selection');
                      setSelectedColor('global');
                    }}
                    className={`w-12 h-12 rounded-lg ${STICKY_COLORS.global.bg} ${STICKY_COLORS.global.border} border-2 transition-all flex items-center justify-center ${
                      selectedColor === 'global' ? 'ring-4 ring-blue-500 scale-110' : 'hover:scale-105'
                    }`}
                    aria-label="Globální barva pro celý byznys"
                  >
                    <span className="text-xl">🌐</span>
                  </button>
                </div>
                
                {selectedColor === 'global' && (
                  <p className="text-xs text-gray-500 mt-2">🌐 Globální = pro celý byznys model</p>
                )}
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={isEditing ? handleSaveEdit : handleAdd}
              disabled={!newItem.trim()}
              size="lg"
              className="flex-1 bg-blue-600 hover:bg-blue-700 h-14 text-lg"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {isEditing ? 'Uložit změny' : 'Přidat'}
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
          {isEditing && editingIndex !== null && (
            <Button
              onClick={() => {
                haptic('warning');
                const deletedText = newItem;
                onRemoveItem(editingIndex);
                
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
      </BottomSheet>

      {/* Complete Button */}
      {items.length > 0 && (
        <div
          className="mt-4 pt-4 border-t-2 border-gray-200 transition-all duration-300 ease-out"
        >
          <Button
            onClick={onComplete}
            size="lg"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 h-12"
          >
            ✅ Hotovo
          </Button>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { Plus, X, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { hexToColorName } from "../lib/colorUtils";

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
  white: { bg: 'bg-white', border: 'border-gray-400', text: 'text-gray-900' },
  gray: { bg: 'bg-gray-100', border: 'border-gray-400', text: 'text-gray-700' },
};

interface Props {
  sectionTitle: string;
  items: CanvasItem[];
  valueLabel?: string;
  onAddItem: (text: string, color: string, value?: number) => void;
  onRemoveItem: (index: number) => void;
  onComplete: () => void;
}

export function MobileSingleSection({ 
  sectionTitle,
  items,
  valueLabel,
  onAddItem,
  onRemoveItem,
  onComplete
}: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newValue, setNewValue] = useState<number | undefined>();
  const [selectedColor, setSelectedColor] = useState<'blue' | 'green' | 'yellow' | 'pink' | 'purple' | 'white' | 'gray'>('blue');

  const handleAdd = () => {
    if (!newItem.trim()) return;
    onAddItem(newItem, selectedColor, newValue);
    setNewItem("");
    setNewValue(undefined);
    setIsAdding(false);
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
            
            return (
              <div
                key={index}
                style={{ transform: `rotate(${randomRotate}deg)` }}
                className={`${colorClasses.bg} ${colorClasses.border} border-2 p-3 rounded shadow-md text-sm group relative transition-all duration-300 ease-out`}
              >
                <button
                  onClick={() => onRemoveItem(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className={colorClasses.text}>
                  <div className="font-medium">{item.text}</div>
                  {item.value !== undefined && (
                    <div className="font-bold mt-1">
                      {item.value.toLocaleString('cs-CZ')} {valueLabel?.includes('Kč') ? 'Kč' : ''}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Form */}
      {isAdding ? (
        <div
          className="space-y-3 bg-blue-50 p-4 rounded-lg border-2 border-blue-300 transition-all duration-300 ease-out"
        >
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) handleAdd();
            }}
            placeholder="Napište text..."
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-base"
            autoFocus
          />
          
          {valueLabel && (
            <input
              type="number"
              value={newValue || ''}
              onChange={(e) => setNewValue(e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder={valueLabel}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-base"
            />
          )}
          
          {/* Color Picker */}
          <div>
            <p className="text-xs text-gray-600 mb-2">Vyberte barvu:</p>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(STICKY_COLORS).map(([color, classes]) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color as any)}
                  className={`w-10 h-10 rounded-lg ${classes.bg} ${classes.border} border-2 ${
                    selectedColor === color ? 'ring-4 ring-blue-500' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleAdd}
              size="lg"
              className="flex-1 bg-blue-600 hover:bg-blue-700 h-12"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Přidat
            </Button>
            <Button
              onClick={() => {
                setIsAdding(false);
                setNewItem("");
                setNewValue(undefined);
              }}
              variant="outline"
              size="lg"
              className="h-12"
            >
              Zrušit
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsAdding(true)}
          variant="outline"
          size="lg"
          className="w-full h-12 border-2 border-dashed border-blue-400 hover:bg-blue-50"
        >
          <Plus className="w-5 h-5 mr-2" />
          Přidat další položku
        </Button>
      )}

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
            ✅ Hotovo - pokračovat dál
          </Button>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { ChevronDown, Plus, X, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { hexToColorName } from "../lib/colorUtils";
import { BottomSheet } from "./BottomSheet";
import { haptic } from "../lib/haptics";

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
}

export function MobileCanvasAccordion({ 
  sections, 
  highlightSection,
  allowedSection,
  onAddItem, 
  onRemoveItem 
}: Props) {
  const [openSection, setOpenSection] = useState<string | null>(highlightSection || null);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [newItem, setNewItem] = useState("");
  const [newValue, setNewValue] = useState<number | undefined>();
  const [selectedColor, setSelectedColor] = useState<'blue' | 'green' | 'yellow' | 'pink' | 'purple' | 'global' | 'gray'>('blue');

  const handleAddItem = (sectionId: string) => {
    if (!newItem.trim()) return;
    haptic('success');
    onAddItem(sectionId, newItem, selectedColor, newValue);
    setNewItem("");
    setNewValue(undefined);
    setEditingSection(null);
  };

  const handleOpenSheet = (sectionId: string) => {
    haptic('light');
    setEditingSection(sectionId);
  };

  const handleCloseSheet = () => {
    setEditingSection(null);
    setNewItem("");
    setNewValue(undefined);
  };

  return (
    <div className="space-y-2">
      {sections.map((section) => {
        const isOpen = openSection === section.id;
        const isHighlighted = highlightSection === section.id;
        const isAllowed = !allowedSection || allowedSection === section.id;
        
        return (
          <div
            key={section.id}
            className={`border-2 rounded-lg overflow-hidden ${
              isHighlighted 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 bg-white'
            }`}
          >
            {/* Header */}
            <button
              onClick={() => setOpenSection(isOpen ? null : section.id)}
              className="w-full flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-left">{section.title}</h3>
                {section.items.length > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {section.items.length}
                  </span>
                )}
              </div>
              <ChevronDown 
                className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Content */}
              {isOpen && (
                <div
                  className="border-t-2 border-gray-200 transition-all duration-200 ease-out"
                >
                  <div className="p-4 space-y-3">
                    {/* Sticky Notes */}
                    <div className="flex flex-wrap gap-2">
                      {section.items.map((item, index) => {
                        const colorName = hexToColorName(item.color as any);
                        const colorClasses = STICKY_COLORS[colorName] || STICKY_COLORS.blue;
                        const randomRotate = (index % 3 - 1) * 2;
                        
                        return (
                          <div
                            key={index}
                            style={{ transform: `rotate(${randomRotate}deg)` }}
                            className={`${colorClasses.bg} ${colorClasses.border} border-2 p-2 rounded shadow-sm text-xs group min-w-[80px] max-w-[140px] transition-all duration-300 ease-out`}
                          >
                            <div className="flex items-start gap-1">
                              <div className="flex-1">
                                <div className={colorClasses.text}>{item.text}</div>
                                {item.value !== undefined && (
                                  <div className={`${colorClasses.text} font-bold mt-1 text-xs`}>
                                    {item.value.toLocaleString('cs-CZ')} {section.valueLabel?.includes('Kč') ? 'Kč' : ''}
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => onRemoveItem(section.id, index)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Add Button */}
                    {isAllowed && (
                      <Button
                        onClick={() => handleOpenSheet(section.id)}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Přidat položku
                      </Button>
                    )}
                  </div>
                </div>
              )}
          </div>
        );
      })}

      {/* Bottom Sheet - Add Item Form */}
      {editingSection && (() => {
        const currentSection = sections.find(s => s.id === editingSection);
        if (!currentSection) return null;

        const isCustomerSection = ['segments', 'value', 'channels', 'relationships'].includes(currentSection.id);

        return (
          <BottomSheet
            isOpen={true}
            onClose={handleCloseSheet}
            title={`Přidat: ${currentSection.title}`}
            snapPoints={[0.75, 0.95]}
            defaultSnap={0}
          >
            <div className="space-y-4">
              {/* Text Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text položky
                </label>
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) handleAddItem(currentSection.id);
                  }}
                  placeholder="Napište text..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  autoFocus
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
                    value={newValue || ''}
                    onChange={(e) => setNewValue(e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder={currentSection.valueLabel}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}

              {/* Color Picker - DYNAMICKÝ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isCustomerSection ? 'Barva segmentu' : 'Segment / Globální'}
                </label>

                {isCustomerSection ? (
                  // ✅ ZÁKAZNICKÉ: Jen barevné (BEZ GLOBAL!)
                  <div className="flex gap-3 flex-wrap">
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
                ) : (
                  // ✅ BYZNYSOVÉ: Segmenty + Global
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Segment zákazníka:</p>
                      <div className="flex gap-3 flex-wrap">
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
                              aria-label={`Segment: ${color}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Globální (celý byznys):</p>
                      <button
                        onClick={() => {
                          haptic('selection');
                          setSelectedColor('global');
                        }}
                        className={`w-12 h-12 rounded-lg ${STICKY_COLORS.global.bg} ${STICKY_COLORS.global.border} border-2 flex items-center justify-center transition-all ${
                          selectedColor === 'global' ? 'ring-4 ring-blue-500 scale-110' : 'hover:scale-105'
                        }`}
                        title="🌐 Pro celý byznys"
                      >
                        <span className="text-lg">🌐</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => handleAddItem(currentSection.id)}
                  disabled={!newItem.trim()}
                  size="lg"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 h-14 text-lg"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Přidat
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
            </div>
          </BottomSheet>
        );
      })()}
    </div>
  );
}

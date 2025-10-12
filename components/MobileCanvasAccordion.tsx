import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Plus, X, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { hexToColorName } from "../lib/colorUtils";

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
    onAddItem(sectionId, newItem, selectedColor, newValue);
    setNewItem("");
    setNewValue(undefined);
    setEditingSection(null);
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
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t-2 border-gray-200"
                >
                  <div className="p-4 space-y-3">
                    {/* Sticky Notes */}
                    <div className="flex flex-wrap gap-2">
                      {section.items.map((item, index) => {
                        const colorName = hexToColorName(item.color as any);
                        const colorClasses = STICKY_COLORS[colorName] || STICKY_COLORS.blue;
                        const randomRotate = (index % 3 - 1) * 2;
                        
                        return (
                          <motion.div
                            key={index}
                            initial={{ scale: 0.8, opacity: 0, rotate: randomRotate - 3 }}
                            animate={{ scale: 1, opacity: 1, rotate: randomRotate }}
                            className={`${colorClasses.bg} ${colorClasses.border} border-2 p-2 rounded shadow-sm text-xs group min-w-[80px] max-w-[140px]`}
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
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Add Form */}
                    {isAllowed && (
                      <>
                        {editingSection === section.id ? (
                          <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
                            <input
                              type="text"
                              value={newItem}
                              onChange={(e) => setNewItem(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) handleAddItem(section.id);
                              }}
                              placeholder="Přidat položku..."
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                              autoFocus
                            />
                            
                            {section.valueLabel && (
                              <input
                                type="number"
                                value={newValue || ''}
                                onChange={(e) => setNewValue(e.target.value ? parseInt(e.target.value) : undefined)}
                                placeholder={section.valueLabel}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                              />
                            )}
                            
                            {/* Color Picker - DYNAMICKÝ */}
                            {(() => {
                              const isCustomerSection = ['segments', 'value', 'channels', 'relationships'].includes(section.id);
                              
                              if (isCustomerSection) {
                                // ✅ ZÁKAZNICKÉ: Jen barevné (BEZ GLOBAL!)
                                return (
                                  <div className="flex gap-1 items-center flex-wrap">
                                    <span className="text-xs text-gray-600 mr-1">Barva segmentu:</span>
                                    {['blue', 'green', 'yellow', 'pink', 'purple'].map((color) => {
                                      const classes = STICKY_COLORS[color as keyof typeof STICKY_COLORS];
                                      return (
                                        <button
                                          key={color}
                                          onClick={() => setSelectedColor(color as any)}
                                          className={`w-8 h-8 rounded ${classes.bg} ${classes.border} border-2 ${
                                            selectedColor === color ? 'ring-2 ring-gray-900' : ''
                                          }`}
                                        />
                                      );
                                    })}
                                  </div>
                                );
                              } else {
                                // ✅ BYZNYSOVÉ: Segmenty + Global
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
                                            className={`w-8 h-8 rounded ${classes.bg} ${classes.border} border-2 ${
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
                                        className={`w-8 h-8 rounded ${STICKY_COLORS.global.bg} ${STICKY_COLORS.global.border} border-2 flex items-center justify-center ${
                                          selectedColor === 'global' ? 'ring-2 ring-gray-900' : ''
                                        }`}
                                        title="🌐 Pro celý byznys"
                                      >
                                        <span className="text-[9px]">🌐</span>
                                      </button>
                                    </div>
                                  </div>
                                );
                              }
                            })()}

                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleAddItem(section.id)}
                                size="sm"
                                className="flex-1 h-9"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Přidat
                              </Button>
                              <Button
                                onClick={() => {
                                  setEditingSection(null);
                                  setNewItem("");
                                  setNewValue(undefined);
                                }}
                                variant="outline"
                                size="sm"
                                className="flex-1 h-9"
                              >
                                Zrušit
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            onClick={() => setEditingSection(section.id)}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Přidat položku
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

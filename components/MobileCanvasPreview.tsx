import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
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
  defaultOpen?: boolean; // Všechny sekce otevřené nebo jen první?
}

export function MobileCanvasPreview({ sections, defaultOpen = false }: Props) {
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(defaultOpen ? sections.map(s => s.id) : [])
  );

  const toggleSection = (sectionId: string) => {
    const newOpen = new Set(openSections);
    if (newOpen.has(sectionId)) {
      newOpen.delete(sectionId);
    } else {
      newOpen.add(sectionId);
    }
    setOpenSections(newOpen);
  };

  return (
    <div className="space-y-2">
      {sections.map((section) => {
        const isOpen = openSections.has(section.id);
        const hasItems = section.items.length > 0;
        
        return (
          <div
            key={section.id}
            className={`border-2 rounded-lg overflow-hidden ${
              hasItems ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
            }`}
          >
            {/* Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-3"
            >
              <div className="flex items-center gap-2">
                <h3 className={`text-sm text-left ${
                  hasItems ? 'font-bold text-gray-900' : 'text-gray-500'
                }`}>
                  {section.title}
                </h3>
                {hasItems && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {section.items.length}
                  </span>
                )}
              </div>
              <ChevronDown 
                className={`w-5 h-5 transition-transform text-gray-600 ${isOpen ? 'rotate-180' : ''}`}
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
                  <div className="p-3">
                    {hasItems ? (
                      <div className="flex flex-wrap gap-2">
                        {section.items.map((item, index) => {
                          const colorName = hexToColorName(item.color as any);
                          const colorClasses = STICKY_COLORS[colorName] || STICKY_COLORS.blue;
                          const randomRotate = (index % 3 - 1) * 1.5; // Mírnější rotace
                          
                          return (
                            <motion.div
                              key={index}
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className={`${colorClasses.bg} ${colorClasses.border} border-2 p-2 rounded shadow-sm text-xs min-w-[80px] max-w-[140px]`}
                              style={{ transform: `rotate(${randomRotate}deg)` }}
                            >
                              <div className={colorClasses.text}>{item.text}</div>
                              {item.value !== undefined && (
                                <div className={`${colorClasses.text} font-bold mt-1 text-xs`}>
                                  {item.value.toLocaleString('cs-CZ')} {section.valueLabel?.includes('Kč') ? 'Kč' : ''}
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 italic text-center py-2">
                        Zatím žádné položky
                      </p>
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

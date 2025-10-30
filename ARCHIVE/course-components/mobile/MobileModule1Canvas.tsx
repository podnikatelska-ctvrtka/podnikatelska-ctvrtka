/**
 * 📱 MOBILE MODULE 1 CANVAS - Helper Component
 * 
 * **Účel:** Mobile optimalizovaný view pro Module 1 Business Model Canvas
 * **Používá:** MobileCanvasAccordion.tsx
 * **Data:** Centralizovaná v CourseDemoV3.tsx
 * 
 * **Status:** 🔄 WIP - Testování mobile accordion system
 * **Datum:** 2025-01-24
 */

import { MobileCanvasAccordion } from "../../MobileCanvasAccordion";

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

interface Props {
  /** Canvas data from CourseDemoV3 state */
  data: {
    segments?: CanvasItem[];
    value?: CanvasItem[];
    channels?: CanvasItem[];
    relationships?: CanvasItem[];
    revenue?: CanvasItem[];
    partners?: CanvasItem[];
    activities?: CanvasItem[];
    resources?: CanvasItem[];
    costs?: CanvasItem[];
  };
  
  /** Update handler - syncs back to CourseDemoV3 */
  onChange: (section: string, items: CanvasItem[]) => void;
  
  /** Which section to highlight (from current lesson) */
  highlightSection?: string;
  
  /** Which section is currently being edited (null = all unlocked) */
  allowedSection?: string;
}

export function MobileModule1Canvas({ 
  data, 
  onChange, 
  highlightSection,
  allowedSection 
}: Props) {
  
  // Transform data to sections format
  const sections: CanvasSection[] = [
    {
      id: 'segments',
      title: '👥 Zákaznické segmenty',
      items: data.segments || [],
    },
    {
      id: 'value',
      title: '💎 Hodnotová nabídka',
      items: data.value || [],
    },
    {
      id: 'channels',
      title: '📢 Kanály',
      items: data.channels || [],
    },
    {
      id: 'relationships',
      title: '❤️ Vztahy se zákazníky',
      items: data.relationships || [],
    },
    {
      id: 'revenue',
      title: '💰 Zdroje příjmů',
      items: data.revenue || [],
      valueLabel: 'Měsíční příjem (Kč)',
    },
    {
      id: 'partners',
      title: '🤝 Klíčoví partneři',
      items: data.partners || [],
    },
    {
      id: 'activities',
      title: '⚡ Klíčové aktivity',
      items: data.activities || [],
    },
    {
      id: 'resources',
      title: '🏗️ Klíčové zdroje',
      items: data.resources || [],
    },
    {
      id: 'costs',
      title: '💸 Náklady',
      items: data.costs || [],
      valueLabel: 'Měsíční náklad (Kč)',
    },
  ];
  
  const handleAddItem = (sectionId: string, text: string, color: string, value?: number) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;
    
    const newItem: CanvasItem = { 
      text, 
      color: color as CanvasItem['color'], 
      value 
    };
    
    const updatedItems = [...section.items, newItem];
    onChange(sectionId, updatedItems);
  };
  
  const handleRemoveItem = (sectionId: string, index: number) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;
    
    const updatedItems = section.items.filter((_, i) => i !== index);
    onChange(sectionId, updatedItems);
  };
  
  return (
    <div className="w-full">
      {/* 📱 MOBILE ACCORDION VIEW */}
      <MobileCanvasAccordion 
        sections={sections}
        highlightSection={highlightSection}
        allowedSection={allowedSection}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
      />
      
      {/* 💡 HELPER TEXT */}
      <div className="mt-6 px-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            💡 <strong>Tip:</strong> Klikněte na sekci pro přidání položek. 
            Každá barva reprezentuje jeden zákaznický segment.
          </p>
        </div>
      </div>
    </div>
  );
}

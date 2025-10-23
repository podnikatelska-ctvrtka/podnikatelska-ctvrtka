import { hexToColorName } from "../lib/colorUtils";

interface CanvasItem {
  text: string;
  color: 'blue' | 'green' | 'yellow' | 'pink' | 'purple' | 'global' | 'gray';
  price?: string;
  percentage?: string;
}

interface CanvasSection {
  id: string;
  title: string;
  items: CanvasItem[];
  gridArea: string;
}

// Barvy pro sticky notes
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
  highlightSections?: string[]; // které sekce zvýraznit (např. ['segments', 'value'])
}

export function ReadOnlyBusinessModelCanvas({ sections, highlightSections = ['segments', 'value'] }: Props) {
  const getSectionData = (sectionId: string) => {
    return sections.find(s => s.id === sectionId) || { items: [] };
  };

  const renderSection = (sectionId: string, title: string, gridArea: string) => {
    const section = getSectionData(sectionId);
    const isHighlighted = highlightSections.includes(sectionId);

    return (
      <div
        key={sectionId}
        className={`bg-gray-50 border-2 ${
          isHighlighted ? 'border-blue-400 ring-2 ring-blue-300' : 'border-gray-300'
        } rounded-lg p-2 flex flex-col overflow-visible`}
        style={{ gridArea }}
      >
        <h3 className="text-xs font-bold text-gray-700 mb-2 pt-2 flex-shrink-0">
          {title}
        </h3>
        <div className="overflow-visible">
          <div className="flex flex-wrap gap-2 items-start content-start justify-start">
            {section.items.map((item, idx) => {
            const colorName = hexToColorName(item.color as any);
            const colorStyle = STICKY_COLORS[colorName] || STICKY_COLORS.blue;
            
            // 🌐 Detekuj "globální" štítky v byznysových sekcích
            const isGlobalColor = colorName === 'global';
            const isBusinessSection = ['partners', 'activities', 'resources', 'costs', 'revenue', 'channels', 'relationships'].includes(sectionId);
            const isGlobalItem = isGlobalColor && isBusinessSection;
            
            return (
              <div
                key={idx}
                className={`${colorStyle.bg} ${colorStyle.border} ${isGlobalItem ? 'border-dashed' : 'border-2'} p-2 rounded shadow-md hover:shadow-lg transition-all flex items-center justify-center relative flex-shrink-0`}
                style={{
                  width: '85px',
                  minHeight: '85px',
                  transform: `rotate(${idx % 2 === 0 ? 2 : -2}deg)`,
                }}
                title={isGlobalItem ? '🌐 Pro celý byznys model' : ''}
              >
                {isGlobalItem && (
                  <span className="absolute top-0.5 right-0.5 text-[9px] opacity-60">🌐</span>
                )}
                <p className={`text-xs ${colorStyle.text} leading-tight text-center break-words font-medium`}>
                  {item.text}
                </p>
                {/* ❌ HODNOTY SKRYTÉ - galerie je jen pro inspiraci, ne konkrétní čísla! */}
                {/* {item.price && <div className="text-[10px] font-bold mt-1">{item.price}</div>} */}
                {/* {item.percentage && <div className="text-[10px] font-bold mt-1">{item.percentage}</div>} */}
              </div>
            );
          })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-3 animate-in fade-in duration-500">
      <div
        className="grid gap-4"
        style={{
          gridTemplateAreas: `
            "partners partners activities activities value value relationships relationships segments segments"
            "partners partners resources resources value value channels channels segments segments"
            "costs costs costs costs costs revenue revenue revenue revenue revenue"
          `,
          gridTemplateColumns: "repeat(10, 1fr)",
          gridTemplateRows: "minmax(220px, auto) minmax(220px, auto) minmax(180px, auto)", // Flexibilní výšky - expandují s obsahem
        }}
      >
        {renderSection("partners", "🤝 Klíčová partnerství", "partners")}
        {renderSection("activities", "🎯 Klíčové aktivity", "activities")}
        {renderSection("resources", "🔑 Klíčové zdroje", "resources")}
        {renderSection("value", "💎 Hodnotová nabídka", "value")}
        {renderSection("relationships", "❤️ Vztahy", "relationships")}
        {renderSection("channels", "📢 Kanály", "channels")}
        {renderSection("segments", "👥 Segmenty", "segments")}
        {renderSection("costs", "💸 Struktura nákladů", "costs")}
        {renderSection("revenue", "💰 Zdroje příjmů", "revenue")}
      </div>
    </div>
  );
}

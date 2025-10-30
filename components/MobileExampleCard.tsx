import { CheckCircle } from "lucide-react";

interface MobileExampleCardProps {
  good: string[];
}

// Parse emoji and color from example string
// Format: "🍕 Pizzerie (🔵): Text here" → { emoji: "🍕", color: "blue", text: "Pizzerie: Text here" }
function parseExample(example: string) {
  // Extract emoji if present (první znak)
  const emojiMatch = example.match(/^([\u{1F000}-\u{1FFFF}])\s*/u);
  const emoji = emojiMatch ? emojiMatch[1] : null;
  
  // Extract color indicator (🔵, 🟢, 🟡, 🟣, 🔴)
  const colorMatch = example.match(/\(([🔵🟢🟡🟣🔴🌐])\)/);
  let color: 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'gray' = 'blue';
  
  if (colorMatch) {
    const colorEmoji = colorMatch[1];
    switch (colorEmoji) {
      case '🔵': color = 'blue'; break;
      case '🟢': color = 'green'; break;
      case '🟡': color = 'yellow'; break;
      case '🟣': color = 'purple'; break;
      case '🔴': color = 'pink'; break;
      case '🌐': color = 'gray'; break;
    }
  }
  
  // Clean text - remove emoji at start and color indicator
  let cleanText = example;
  if (emoji) {
    cleanText = cleanText.replace(emoji, '').trim();
  }
  cleanText = cleanText.replace(/\([🔵🟢🟡🟣🔴🌐]\):\s*/, '').trim();
  
  return { emoji, color, text: cleanText };
}

const STICKY_COLORS = {
  blue: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-900' },
  green: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-900' },
  yellow: { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-900' },
  pink: { bg: 'bg-pink-100', border: 'border-pink-300', text: 'text-pink-900' },
  purple: { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-900' },
  gray: { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-800' },
};

export function MobileExampleCard({ good }: MobileExampleCardProps) {
  return (
    <div className="bg-white rounded-xl border-2 border-green-400 shadow-lg p-4">
      {/* Header */}
      <div className="mb-4 pb-3 border-b-2 border-green-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-green-900">✅ Dobré příklady</h3>
            <p className="text-sm text-gray-600">Jak to udělat správně</p>
          </div>
        </div>
      </div>

      {/* Sticky Notes */}
      <div className="space-y-2">
        {good.map((example, index) => {
          const { emoji, color, text } = parseExample(example);
          const colorClasses = STICKY_COLORS[color];
          const randomRotate = (index % 3 - 1) * 1.5;
          
          return (
            <div
              key={index}
              style={{ transform: `rotate(${randomRotate}deg)` }}
              className={`${colorClasses.bg} ${colorClasses.border} ${colorClasses.text} border-2 rounded-lg p-3 shadow-md hover:shadow-lg transition-all cursor-default`}
            >
              <div className="flex items-start gap-2">
                {emoji && <span className="text-xl flex-shrink-0">{emoji}</span>}
                <p className="text-sm leading-relaxed flex-1">{text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info note */}
      <div className="mt-4 pt-3 border-t-2 border-gray-200">
        <p className="text-xs text-gray-600 text-center">
          💡 Na mobilu zobrazujeme příklady jako <strong>barevné štítky</strong> (stejně jako v canvasu)
        </p>
      </div>
    </div>
  );
}

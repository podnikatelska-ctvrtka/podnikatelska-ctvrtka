import { Info, ArrowRight, Users, Target, AlertCircle, Sparkles } from "lucide-react";
import { useState } from "react";

interface ContextHintsProps {
  currentStep: number;
  segment: string;
  value: string;
  customerData?: {
    jobs?: Array<{ text: string }>;
    pains?: Array<{ text: string }>;
    gains?: Array<{ text: string }>;
  };
}

export function ValueMapContextHints({ currentStep, segment, value, customerData }: ContextHintsProps) {
  // ✅ FIX: Default FALSE - tipy budou skryté, uživatel si je zobrazí když chce
  const [isExpanded, setIsExpanded] = useState(false);

  const hints = {
    1: { // Produkty
      icon: <Target className="w-5 h-5" />,
      title: "💡 Tip pro Produkty",
      description: "Vypište VŠE co zákazník dostane - fyzické produkty, služby, digitální obsah, prostředí...",
      examples: [
        "✅ Specifické: \"Online kurz s 20 videolekcemi\"",
        "✅ Konkrétní: \"PDF šablony Business Model Canvas\"",
        "❌ Příliš obecné: \"Produkt\", \"Služba\""
      ],
      connection: customerData?.jobs && customerData.jobs.length > 0 ? {
        label: "🎯 Důvod návštěvy zákazníka",
        items: customerData.jobs.slice(0, 3).map(j => j.text)
      } : null
    },
    2: { // Jak naplňujeme očekávání (Gain Creators)
      icon: <Sparkles className="w-5 h-5" />,
      title: "💡 Tip pro Jak naplňujeme očekávání",
      description: "Jak VYTVÁŘÍTE hodnotu? Každý způsob by měl odpovídat OČEKÁVÁNÍ zákazníka!",
      examples: [
        "✅ Naplňuje očekávání: \"Community events pro networking\"",
        "✅ Překvapuje: \"Lifetime přístup ke všem materiálům\"",
        "❌ Obecné: \"Kvalita\", \"Dobrá cena\""
      ],
      connection: customerData?.gains && customerData.gains.length > 0 ? {
        label: "✨ Očekávání zákazníka",
        items: customerData.gains.slice(0, 3).map(g => g.text),
        hint: "Každý způsob by měl odpovídat jednomu očekávání!"
      } : null
    },
    3: { // Jak řešíme obavy (Pain Relievers)
      icon: <AlertCircle className="w-5 h-5" />,
      title: "💡 Tip pro Jak řešíme obavy",
      description: "Jak ŘEŠÍTE problémy zákazníka? Každé řešení by mělo odpovídat OBAVĚ zákazníka!",
      examples: [
        "✅ Řeší konkrétní problém: \"Stabilní WiFi 100+ Mbps\"",
        "✅ Odstraňuje překážku: \"Cena jen 80 Kč místo 300 Kč\"",
        "❌ Obecné: \"Pomůžeme\", \"Vyřešíme\""
      ],
      connection: customerData?.pains && customerData.pains.length > 0 ? {
        label: "😰 Obavy zákazníka",
        items: customerData.pains.slice(0, 3).map(p => p.text),
        hint: "Každé řešení by mělo odpovídat jedné obavě!"
      } : null
    }
  };

  const currentHint = hints[currentStep as keyof typeof hints];
  if (!currentHint) return null;

  return (
    <>
      {isExpanded && (
        <div
          className="mb-6"
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5 shadow-sm">
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                {currentHint.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-blue-900 mb-1">{currentHint.title}</h4>
                <p className="text-sm text-blue-700">{currentHint.description}</p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="flex-shrink-0 text-blue-400 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Examples */}
            <div className="bg-white/50 rounded-lg p-3">
              <p className="text-xs font-semibold text-blue-800 mb-2">📝 Příklady:</p>
              <div className="space-y-1">
                {currentHint.examples.map((example, idx) => (
                  <p key={idx} className="text-xs text-blue-700">{example}</p>
                ))}
              </div>
            </div>

            {/* ❌ ODSTRANĚNO: Connection to Customer Profile - bylo to moc informací
            {currentHint.connection && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
                ...
              </div>
            )}
            */}
          </div>
        </div>
      )}
      
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="mb-4 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          <Info className="w-4 h-4" />
          Zobrazit tipy
        </button>
      )}
    </>
  );
}

/**
 * Mini preview komponenta pro zobrazení návaznosti
 */
export function CustomerConnectionPreview({ 
  type,
  customerItems,
  valueItems 
}: { 
  type: "gains" | "pains";
  customerItems: Array<{ text: string }>;
  valueItems: Array<{ text: string }>;
}) {
  // ✅ FIX: Zobrazit i když valueItems jsou prázdné - systematický přístup!
  if (customerItems.length === 0) return null;

  const config = {
    gains: {
      customerLabel: "✨ Očekávání",
      valueLabel: "📈 Jak naplňujeme",
      color: "green"
    },
    pains: {
      customerLabel: "😰 Obavy",
      valueLabel: "💊 Jak řešíme",
      color: "purple"
    }
  };

  const { customerLabel, valueLabel, color } = config[type];
  const bgColor = color === "green" ? "bg-green-50" : "bg-purple-50";
  const borderColor = color === "green" ? "border-green-200" : "border-purple-200";
  const textColor = color === "green" ? "text-green-800" : "text-purple-800";

  return (
    <div
      className={`${bgColor} border ${borderColor} rounded-lg p-4 mb-4`}
    >
      <h4 className={`text-sm font-bold ${textColor} mb-3 flex items-center gap-2`}>
        <ArrowRight className="w-4 h-4" />
        Návaznost: {customerLabel} → {valueLabel}
      </h4>
      
      <div className="grid md:grid-cols-2 gap-3 text-xs">
        <div>
          <p className="font-semibold mb-1">{customerLabel} ({customerItems.length})</p>
          <div className="space-y-1">
            {customerItems.slice(0, 3).map((item, idx) => (
              <div key={idx} className="bg-white/50 rounded px-2 py-1">
                {item.text}
              </div>
            ))}
            {customerItems.length > 3 && (
              <p className="text-gray-500 italic">+{customerItems.length - 3} dalších...</p>
            )}
          </div>
        </div>
        
        <div>
          <p className="font-semibold mb-1">{valueLabel} ({valueItems.length})</p>
          <div className="space-y-1">
            {valueItems.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded px-3 py-2 text-yellow-700">
                <p className="text-xs font-medium">⚠️ Zatím žádné řešení</p>
                <p className="text-xs mt-1 opacity-75">Přidejte způsoby, jak to naplníte/vyřešíte!</p>
              </div>
            ) : (
              <>
                {valueItems.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="bg-white/50 rounded px-2 py-1">
                    {item.text}
                  </div>
                ))}
                {valueItems.length > 3 && (
                  <p className="text-gray-500 italic">+{valueItems.length - 3} dalších...</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      <p className={`text-xs ${textColor} mt-2 font-medium italic`}>
        {valueItems.length === 0 
          ? '💡 Jděte systematicky - uspokojte každé očekávání/obavy zákazníka!' 
          : '✅ Skvělé! V další lekci propojíte tyto položky v FIT validátoru!'
        }
      </p>
    </div>
  );
}

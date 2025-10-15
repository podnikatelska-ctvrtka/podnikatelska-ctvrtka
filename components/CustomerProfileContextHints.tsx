import React, { useState } from 'react';
import { Info, Target, AlertCircle, Sparkles } from 'lucide-react';

interface CustomerProfileContextHintsProps {
  currentStep: number; // 1 = Jobs, 2 = Pains, 3 = Gains
  selectedSegment?: string;
}

export function CustomerProfileContextHints({ currentStep, selectedSegment }: CustomerProfileContextHintsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const hints = {
    1: { // Jobs (Úkoly)
      icon: <Target className="w-5 h-5" />,
      title: "💡 Tip pro Úkoly",
      description: "Co segment chce udělat? Proč k vám přichází? Co se snaží dokončit?",
      examples: [
        '✅ Konkrétní: "Pracovat produktivně mimo domov"',
        '✅ Specifické: "Stihnout vrátit se pro dítě z MŠ do 16:00"',
        '❌ Příliš obecné: "Pracovat", "Studovat"'
      ]
    },
    2: { // Pains (Obavy)
      icon: <AlertCircle className="w-5 h-5" />,
      title: "💡 Tip pro Obavy",
      description: "Co zákazníka trápí, brání mu nebo dělá starosti? Jaké má překážky?",
      examples: [
        '✅ Konkrétní problém: "Nedostatek času na přípravu jídla"',
        '✅ Překážka: "Vysoké náklady na marketing (20k+ měsíčně)"',
        '❌ Obecné: "Problémy", "Nejistota"'
      ]
    },
    3: { // Gains (Očekávání)
      icon: <Sparkles className="w-5 h-5" />,
      title: "💡 Tip pro Očekávání",
      description: "Co zákazník OČEKÁVÁ a čemu by se potěšil? Jaké výhody a výsledky chce?",
      examples: [
        '✅ Jasné očekávání: "Ušetřit 10+ hodin týdně"',
        '✅ Konkrétní benefit: "Stabilní měsíční příjem 50k+"',
        '❌ Obecné: "Úspěch", "Spokojenost"'
      ]
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

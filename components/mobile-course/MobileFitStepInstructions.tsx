/**
 * 📱 MOBILE FIT STEP INSTRUCTIONS
 * 
 * Mobilní verze FitStepInstructions - stejný obsah, kompaktní design
 */

import { Users, TrendingUp, Target, Info } from "lucide-react";
import { useState } from "react";

interface MobileFitStepInstructionsProps {
  step: number;
}

export function MobileFitStepInstructions({ step }: MobileFitStepInstructionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const instructions = {
    1: {
      icon: <Users className="w-5 h-5" />,
      color: "blue",
      title: "📍 Krok 1: Průzkum zákazníků",
      shortDescription: "PŘED prioritizací - mluvte se zákazníky!",
      content: (
        <>
          <p className="font-semibold mb-2 text-sm">PŘED tím, než začnete prioritizovat, MUSÍTE mluvit se zákazníky!</p>
          <ul className="space-y-1.5 text-sm">
            <li>🎤 <strong>Zeptejte se 3-5 lidí</strong> z vašeho segmentu (ideálně 10+)</li>
            <li>📝 <strong>Zaznamenejte KOLIK lidí zmínilo každý problém/očekávání</strong></li>
            <li>💡 <strong>Položky zmíněné nejvíce lidmi = NEJVYŠŠÍ priorita!</strong></li>
          </ul>
          <div className="mt-3 bg-yellow-50 border border-yellow-300 rounded-lg p-2.5">
            <p className="text-xs text-yellow-900">
              ⚠️ <strong>Častá chyba:</strong> Prioritizovat podle VAŠEHO názoru místo podle ZÁKAZNÍKŮ!
            </p>
          </div>
        </>
      )
    },
    2: {
      icon: <TrendingUp className="w-5 h-5" />,
      color: "purple",
      title: "⭐ Krok 2: Prioritizace (Diamantový model)",
      shortDescription: "Seřaďte podle toho, KOLIK lidí to zmínilo",
      content: (
        <>
          <p className="font-semibold mb-2 text-sm">Po průzkumu (Krok 1) seřaďte položky podle toho, KOLIK lidí je zmínilo:</p>
          <ul className="space-y-1.5 text-sm">
            <li>🔥 <strong>Top 3 v každé kategorii</strong> = co zmínilo nejvíc lidí</li>
            <li>📊 <strong>Sledujte %</strong> = kolik % zákazníků má tento problém</li>
            <li>🎯 <strong>Zaměřte se na kritické problémy</strong> které má většina</li>
          </ul>
          <div className="mt-3 bg-blue-50 border border-blue-300 rounded-lg p-2.5">
            <p className="text-xs text-blue-900">
              💡 <strong>Tip:</strong> Položky s 50%+ jsou kritické - většina zákazníků je zmiňuje!
            </p>
          </div>
        </>
      )
    },
    3: {
      icon: <Target className="w-5 h-5" />,
      color: "green",
      title: "🔗 Krok 3: Mapování FIT Score",
      shortDescription: "Propojte co nabízíte s tím, co zákazníci potřebují",
      content: (
        <>
          <p className="font-semibold mb-2 text-sm">Propojte co nabízíte s tím, co zákazníci potřebují:</p>
          <ul className="space-y-1.5 text-sm">
            <li>💊 <strong>Jak řešíme obavy</strong> → Obavy zákazníka</li>
            <li>📈 <strong>Jak naplňujeme očekávání</strong> → Očekávání zákazníka</li>
            <li>✅ <strong>FIT Score 70%+</strong> = máte Product-Market Fit!</li>
          </ul>
          <div className="mt-3 bg-green-50 border border-green-300 rounded-lg p-2.5">
            <p className="text-xs text-green-900">
              🎯 <strong>Cíl:</strong> FIT Score ukazuje, jak dobře vaše řešení sedí zákazníkům. Čím vyšší, tím lepší Product-Market Fit!
            </p>
          </div>
        </>
      )
    }
  };

  const instruction = instructions[step as keyof typeof instructions];
  if (!instruction) return null;

  const bgColors = {
    blue: "from-blue-500 to-indigo-500",
    purple: "from-purple-500 to-pink-500",
    green: "from-green-500 to-teal-500"
  };

  const textColors = {
    blue: "text-blue-900",
    purple: "text-purple-900",
    green: "text-green-900"
  };

  return (
    <div className="mb-4">
      {/* HEADER - Always visible */}
      <div 
        className={`bg-gradient-to-r ${bgColors[instruction.color]} text-white p-4 rounded-xl cursor-pointer active:opacity-90 transition-opacity`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {instruction.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-bold mb-1">{instruction.title}</h3>
            <p className="text-sm opacity-90">{instruction.shortDescription}</p>
          </div>
          <button className="flex-shrink-0 mt-1">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* EXPANDED CONTENT */}
      {isExpanded && (
        <div className={`mt-2 bg-white border-2 ${
          instruction.color === 'blue' ? 'border-blue-300' :
          instruction.color === 'purple' ? 'border-purple-300' :
          'border-green-300'
        } rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200`}>
          <div className={textColors[instruction.color]}>
            {instruction.content}
          </div>
        </div>
      )}
    </div>
  );
}

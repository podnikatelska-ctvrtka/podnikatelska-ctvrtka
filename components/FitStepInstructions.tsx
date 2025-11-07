import { Lightbulb, Users, TrendingUp, Target } from "lucide-react";

interface FitStepInstructionsProps {
  step: number;
}

export function FitStepInstructions({ step }: FitStepInstructionsProps) {
  const instructions = {
    1: {
      icon: <Users className="w-6 h-6" />,
      color: "blue",
      title: "📍 Krok 1: Průzkum zákazníků",
      content: (
        <>
          <p className="font-semibold mb-2">PŘED tím, než začnete prioritizovat, MUSÍTE mluvit se zákazníky!</p>
          <ul className="space-y-1 text-sm">
            <li>🎤 <strong>Zeptejte se 3-5 lidí</strong> z vašeho segmentu (ideálně 10+)</li>
            <li>📝 <strong>Zaznamenejte KOLIK lidí zmínilo každý problém/očekávání</strong></li>
            <li>💡 <strong>Položky zmíněné nejvíce lidmi = NEJVYŠŠÍ priorita!</strong></li>
          </ul>
          <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              ⚠️ <strong>Častá chyba:</strong> Prioritizovat podle VAŠEHO názoru místo podle ZÁKAZNÍKŮ!
            </p>
          </div>
        </>
      )
    },
    2: {
      icon: <TrendingUp className="w-6 h-6" />,
      color: "purple",
      title: "⭐ Krok 2: Prioritizace (Diamantový model)",
      content: (
        <>
          <p className="font-semibold mb-2">Po průzkumu (Krok 1) seřaďte položky podle toho, KOLIK lidí je zmínilo:</p>
          <ul className="space-y-1 text-sm">
            <li>🔥 <strong>Top 3 v každé kategorii</strong> = co zmínilo nejvíc lidí</li>
            <li>📊 <strong>Sledujte %</strong> = kolik % zákazníků má tento problém</li>
            <li>🎯 <strong>Zaměřte se na kritické problémy</strong> které má většina</li>
          </ul>
          <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Položky s 50%+ jsou kritické - většina zákazníků je zmiňuje!
            </p>
          </div>
        </>
      )
    },
    3: {
      icon: <Target className="w-6 h-6" />,
      color: "green",
      title: "🔗 Krok 3: Mapování FIT Score",
      content: (
        <>
          <p className="font-semibold mb-2">Propojte co nabízíte s tím, co zákazníci potřebují:</p>
          <ul className="space-y-1 text-sm">
            <li>💊 <strong>Jak řešíme obavy</strong> → Obavy zákazníka</li>
            <li>📈 <strong>Jak naplňujeme očekávání</strong> → Očekávání zákazníka</li>
            <li>✅ <strong>FIT Score 70%+</strong> = máte Product-Market Fit!</li>
          </ul>
          <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-800">
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
    blue: "from-blue-50 to-indigo-50 border-blue-200",
    purple: "from-purple-50 to-pink-50 border-purple-200",
    green: "from-green-50 to-emerald-50 border-green-200"
  };

  const iconBgColors = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    green: "bg-green-500"
  };

  const textColors = {
    blue: "text-blue-900",
    purple: "text-purple-900",
    green: "text-green-900"
  };

  return (
    <div
      className={`bg-gradient-to-br ${bgColors[instruction.color]} border-2 rounded-xl p-6 mb-6 shadow-sm`}
    >
      <div className="flex items-start gap-4">
        <div className={`${iconBgColors[instruction.color]} text-white rounded-lg p-3 flex-shrink-0`}>
          {instruction.icon}
        </div>
        <div className="flex-1">
          <h4 className={`font-bold ${textColors[instruction.color]} mb-3`}>
            {instruction.title}
          </h4>
          <div className={textColors[instruction.color]}>
            {instruction.content}
          </div>
        </div>
      </div>
    </div>
  );
}

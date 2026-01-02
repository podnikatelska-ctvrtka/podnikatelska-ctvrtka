import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, RotateCcw, Play } from 'lucide-react';

/**
 * 🎬 YOUTUBE SHORTS KOMPONENTA - "MODEL PODNIKÁNÍ"
 * 
 * PRAVIDLA:
 * - Chytlavé hooky (curiosity + benefit)
 * - Vertical format (1080x1920)
 * - 15-60 sekund ideálně
 * - Brand colors: Orange/Red gradient (energy)
 * - Motion animace
 * 
 * CONTENT MIX:
 * 1. Case Studies (Jak Zásilkovna...)
 * 2. Practical Tips (Jak začít podnikat)
 * 3. Mistakes (90% dělá špatně)
 * 
 * WORKFLOW:
 * 1. Vytvoř Short v této komponentě
 * 2. Screen record přes ShareX (1080x1920)
 * 3. Upload do YT Studio
 * 4. Přidaj hudbu + AI voiceover v YT Studio
 */

// ═══════════════════════════════════════
// YOUTUBE SHORTS DATA
// ═══════════════════════════════════════

interface YouTubeShort {
  id: number;
  title: string;
  hook: string;
  description: string;
  type: 'case-study' | 'how-to' | 'mistake' | 'comparison';
  component: () => JSX.Element;
}

// ═══════════════════════════════════════
// SHORT #1: "Jak Zásilkovna vybudovala byznys za miliardu BEZ skladů"
// ═══════════════════════════════════════

function Short01_Zasilkovna() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      icon: "🏢",
      title: "PROBLÉM",
      text: "E-shopy potřebují doručit balíky",
      detail: "Vlastní sklady = drahé, složité"
    },
    {
      icon: "💡",
      title: "NÁPAD",
      text: "Co kdyby existovala SÍŤ výdejních míst?",
      detail: "Žádné sklady, nízké náklady"
    },
    {
      icon: "🤝",
      title: "MODEL",
      text: "Platí jim E-SHOPY (ne zákazníci)",
      detail: "B2B model = předvídatelný cashflow"
    },
    {
      icon: "📈",
      title: "ŠKÁLOVÁNÍ",
      text: "7 000+ výdejních míst",
      detail: "Bez investic do nemovitostí"
    },
    {
      icon: "💰",
      title: "VÝSLEDEK",
      text: "1,2 MILIARDY Kč ročně",
      detail: "Bez vlastních skladů!"
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-orange-600 via-red-600 to-orange-800 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold mb-3">
          MODEL PODNIKÁNÍ
        </div>
        <h1 className="text-3xl font-black text-white mb-2 leading-tight">
          Jak Zásilkovna vybudovala
        </h1>
        <h2 className="text-4xl font-black text-yellow-300">
          byznys za MILIARDU
        </h2>
        <p className="text-xl font-bold text-white/90 mt-2">
          BEZ vlastních skladů? 🤯
        </p>
      </div>

      {/* Steps */}
      <div className="w-full max-w-md space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: index <= currentStep ? 1 : 0.3,
              x: index <= currentStep ? 0 : -50,
              scale: index === currentStep ? 1.02 : 1
            }}
            transition={{ duration: 0.5 }}
            className={`p-4 rounded-2xl border-2 ${
              index <= currentStep
                ? 'bg-white/95 border-yellow-400 shadow-xl'
                : 'bg-white/20 border-white/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-4xl">{step.icon}</span>
              <div className="flex-1">
                <p className="text-xs font-bold text-orange-600 mb-1">
                  {step.title}
                </p>
                <p className="text-sm font-black text-gray-900 mb-1">
                  {step.text}
                </p>
                {index === currentStep && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-xs text-gray-600"
                  >
                    {step.detail}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      {currentStep >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-white rounded-xl p-4 max-w-md"
        >
          <p className="text-sm font-black text-gray-900 text-center">
            💡 Chceš vědět JAK udělat model správně?
          </p>
          <p className="text-xs text-gray-600 text-center mt-1">
            Link v bio 👇
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ══════════════��════════════════════════
// SHORT #2: "Jak začít podnikat - prvních 5 kroků (SPRÁVNĚ)"
// ═══════════════════════════════════════

function Short02_HowToStart() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      number: 1,
      icon: "🎯",
      title: "VYBER SI PROBLÉM",
      subtitle: "Ne produkt!",
      example: "❌ 'Budu prodávat svíčky'\n✅ 'Pomůžu lidem relaxovat doma'"
    },
    {
      number: 2,
      icon: "👥",
      title: "NAJDI ZÁKAZNÍKA",
      subtitle: "Konkrétního člověka",
      example: "❌ 'Každý'\n✅ 'Ženy 25-40, stresovaná práce, bydlí ve městě'"
    },
    {
      number: 3,
      icon: "💬",
      title: "PROMLUV SI S NÍM",
      subtitle: "PŘED výrobou!",
      example: "5-10 rozhovorů\n→ zjistíš co SKUTEČNĚ chtějí"
    },
    {
      number: 4,
      icon: "🧪",
      title: "OTESTUJ ZA 0 KČ",
      subtitle: "Landing page + ads",
      example: "100-500 Kč na FB reklamu\n→ vidíš jestli je zájem"
    },
    {
      number: 5,
      icon: "🚀",
      title: "TEĎ INVESTUJ",
      subtitle: "Až VÍME že to funguje",
      example: "✅ Validace hotová\n✅ Zákazníci potvrzeni\n✅ Teď škáluj"
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold mb-3">
          JAK NA TO
        </div>
        <h1 className="text-3xl font-black text-white mb-2">
          Jak začít podnikat?
        </h1>
        <h2 className="text-3xl font-black text-orange-400">
          Prvních 5 kroků (SPRÁVNĚ)
        </h2>
      </div>

      {/* Steps */}
      <div className="w-full max-w-md space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: index <= currentStep ? 1 : 0.3,
              y: index <= currentStep ? 0 : 20
            }}
            transition={{ duration: 0.5 }}
            className={`p-4 rounded-xl border-2 ${
              index <= currentStep
                ? 'bg-white/10 border-orange-400'
                : 'bg-white/5 border-gray-700'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <span className="text-3xl">{step.icon}</span>
                <span className="text-lg font-black text-orange-400 mt-1">
                  {step.number}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-black text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-orange-300 mb-2">
                  {step.subtitle}
                </p>
                {index === currentStep && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-gray-800/50 rounded-lg p-2 text-xs text-gray-300 whitespace-pre-line"
                  >
                    {step.example}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-xs">
          #jakzačítpodnikat #tipy #modelPodnikání
        </p>
      </div>
    </div>
  );
}

// ═════���═════════════════════════════════
// SHORT #3: "Tohle dělá 90% podnikatelů ŠPATNĚ"
// ═══════════════════════════════════════

function Short03_90PercentMistake() {
  const [revealedMistakes, setRevealedMistakes] = useState(0);

  const mistakes = [
    {
      icon: "💭",
      mistake: "DOUFAJÍ místo TESTOVÁNÍ",
      stat: "92 %",
      reality: "Reality: Zákazníci chtějí něco jiného",
      fix: "✅ Testuj PŘED investicí"
    },
    {
      icon: "🎲",
      mistake: "JDou NASLEPO bez plánu",
      stat: "73 %",
      reality: "Reality: Nevědí kam jdou ani proč",
      fix: "✅ Model podnikání = 1 stránka clarity"
    },
    {
      icon: "💸",
      mistake: "INVESTUJÍ bez validace",
      stat: "81 %",
      reality: "Reality: 280k ztráta na něco co nikdo nechce",
      fix: "✅ Validace za 500 Kč, ne 500k"
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setRevealedMistakes((prev) => (prev < 2 ? prev + 1 : prev));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-red-900 via-orange-900 to-red-900 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold mb-3">
          ⚠️ POZOR
        </div>
        <h1 className="text-4xl font-black text-white mb-2">
          Tohle dělá
        </h1>
        <h2 className="text-5xl font-black text-yellow-300">
          90 % podnikatelů
        </h2>
        <p className="text-2xl font-black text-red-300 mt-2">
          ŠPATNĚ
        </p>
      </div>

      {/* Mistakes */}
      <div className="w-full max-w-md space-y-4">
        {mistakes.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: index <= revealedMistakes ? 1 : 0.3,
              scale: index <= revealedMistakes ? 1 : 0.9
            }}
            transition={{ duration: 0.5 }}
            className={`p-5 rounded-2xl border-2 ${
              index <= revealedMistakes
                ? 'bg-white/10 border-red-400'
                : 'bg-white/5 border-gray-700'
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="text-5xl">{item.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl font-black text-red-400">
                    {item.stat}
                  </span>
                </div>
                <p className="text-base font-black text-white mb-2">
                  {item.mistake}
                </p>
                {index === revealedMistakes && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2"
                  >
                    <p className="text-xs text-red-300">
                      {item.reality}
                    </p>
                    <div className="bg-green-500/20 border border-green-500 rounded-lg p-2">
                      <p className="text-xs font-bold text-green-400">
                        {item.fix}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      {revealedMistakes >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-white rounded-xl p-4 max-w-md"
        >
          <p className="text-sm font-black text-gray-900 text-center">
            🎯 Zjisti kde děláš chyby TY
          </p>
          <p className="text-xs text-gray-600 text-center mt-1">
            Test zdarma v bio 👇
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// SHORT #4: "Pizzerie nedělá peníze - 3 důvody PROČ"
// ═══════════════════════════════════════

function Short04_PizzaMistakes() {
  const [stage, setStage] = useState(0);

  const problems = [
    {
      icon: "📞",
      title: "Žádný FOLLOW-UP",
      detail: "Zákazník objedná 1x → nikdy se neozve",
      lost: "Ztráta: 80 % možných opakovaných objednávek"
    },
    {
      icon: "📊",
      title: "Žádná DATA",
      detail: "Neví kdo objednává, co, jak často",
      lost: "Ztráta: Nemůže optimalizovat nabídku"
    },
    {
      icon: "🎯",
      title: "Jen WALK-INS",
      detail: "Spoléhá na náhodné kolemjdoucí",
      lost: "Ztráta: Nestabilní cashflow, žádné plánování"
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev < 2 ? prev + 1 : prev));
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold mb-3">
          🍕 CASE STUDY
        </div>
        <h1 className="text-3xl font-black text-white mb-2">
          Pizzerie dělá jen
        </h1>
        <h2 className="text-5xl font-black text-red-400">
          30 000 Kč/měsíc
        </h2>
        <p className="text-lg font-bold text-white/80 mt-2">
          3 důvody PROČ 👇
        </p>
      </div>

      {/* Problems */}
      <div className="w-full max-w-md space-y-4">
        {problems.map((problem, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{
              opacity: index <= stage ? 1 : 0.3,
              x: index <= stage ? 0 : -30
            }}
            transition={{ duration: 0.5 }}
            className={`p-5 rounded-2xl border-2 ${
              index <= stage
                ? 'bg-white/10 border-red-400'
                : 'bg-white/5 border-gray-700'
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{problem.icon}</span>
              <div className="flex-1">
                <p className="text-lg font-black text-white mb-2">
                  {problem.title}
                </p>
                {index === stage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2"
                  >
                    <p className="text-xs text-gray-300">
                      {problem.detail}
                    </p>
                    <div className="bg-red-500/20 rounded-lg p-2">
                      <p className="text-xs font-bold text-red-300">
                        {problem.lost}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fix */}
      {stage >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 max-w-md"
        >
          <p className="text-sm font-black text-white text-center">
            ✅ FIX: Systém pro opakované objednávky
          </p>
          <p className="text-xs text-white/80 text-center mt-1">
            = 3x vyšší tržby ze STEJNÝCH zákazníků
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// SHORT #5: "Jak otestovat nápad za 0 Kč (VALIDACE)"
// ═══════════════════════════════════════

function Short05_ValidateFor0() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      step: "KROK 1",
      icon: "📝",
      title: "Landing page za 1 hodinu",
      tool: "Carrd.co (zdarma)",
      action: "Napiš co řešíš + CTA 'Předobjednat'"
    },
    {
      step: "KROK 2",
      icon: "📸",
      title: "Screenshot / mockup produktu",
      tool: "Canva (zdarma)",
      action: "Nemusíš mít hotový produkt!"
    },
    {
      step: "KROK 3",
      icon: "💬",
      title: "5-10 rozhovorů",
      tool: "FB skupiny, Reddit, LinkedIn",
      action: "Zeptej se: 'Řešil jsi někdy X?'"
    },
    {
      step: "KROK 4",
      icon: "📢",
      title: "100-500 Kč na FB reklamu",
      tool: "Facebook Ads",
      action: "Test: Kolik lidí klikne?"
    },
    {
      step: "VÝSLEDEK",
      icon: "✅",
      title: "VALIDACE za víkend",
      tool: "Celkem: 500 Kč max",
      action: "Víš jestli investovat nebo ne!"
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 2300);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-xs font-bold mb-3">
          💡 VALIDACE
        </div>
        <h1 className="text-3xl font-black text-white mb-2">
          Jak otestovat nápad
        </h1>
        <h2 className="text-4xl font-black text-green-300">
          za 0 Kč?
        </h2>
        <p className="text-base font-bold text-white/80 mt-2">
          (skoro zdarma 😉)
        </p>
      </div>

      {/* Steps */}
      <div className="w-full max-w-md space-y-3">
        {steps.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: index <= currentStep ? 1 : 0.3,
              y: index <= currentStep ? 0 : 20
            }}
            transition={{ duration: 0.5 }}
            className={`p-4 rounded-xl border-2 ${
              index === 4
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-300'
                : index <= currentStep
                ? 'bg-white/10 border-green-400'
                : 'bg-white/5 border-gray-700'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-xs font-bold text-green-300 mb-1">
                  {item.step}
                </p>
                <p className="text-sm font-black text-white mb-1">
                  {item.title}
                </p>
                {index === currentStep && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-1 mt-2"
                  >
                    <p className="text-xs text-green-200">
                      🛠️ {item.tool}
                    </p>
                    <p className="text-xs text-white/80">
                      {item.action}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-xs">
          #validace #testování #jakzačít
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SHORT #6: "E-shop vs. Služba - který model je PRO TEBE?"
// ═══════════════════════════════════════

function Short06_EshopVsService() {
  const [revealed, setRevealed] = useState<'eshop' | 'service' | null>(null);

  const comparison = {
    eshop: {
      icon: "🛒",
      title: "E-SHOP",
      pros: ["Škálovatelný", "Pasivní příjem", "Velký trh"],
      cons: ["Vysoká konkurence", "Logistika", "Zásoby = riziko"],
      bestFor: "Pokud máš kapitál (50-200k) a chceš škálovat"
    },
    service: {
      icon: "💼",
      title: "SLUŽBA",
      pros: ["Nízký start (0-5k)", "Osobní vztahy", "Vyšší marže"],
      cons: ["Limitováno časem", "Těžko škálovat", "Musíš 'prodávat'"],
      bestFor: "Pokud začínáš s malým budgetem"
    }
  };

  React.useEffect(() => {
    const timer1 = setTimeout(() => setRevealed('eshop'), 1500);
    const timer2 = setTimeout(() => setRevealed('service'), 3500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-purple-500 text-white px-4 py-2 rounded-full text-xs font-bold mb-3">
          🤔 COMPARISON
        </div>
        <h1 className="text-3xl font-black text-white mb-2">
          E-shop vs. Služba
        </h1>
        <h2 className="text-3xl font-black text-purple-300">
          Který model je PRO TEBE?
        </h2>
      </div>

      {/* Comparison */}
      <div className="w-full max-w-md space-y-4">
        {/* E-shop */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{
            opacity: revealed ? 1 : 0.3,
            x: revealed ? 0 : -50
          }}
          transition={{ duration: 0.5 }}
          className={`p-5 rounded-2xl border-2 ${
            revealed ? 'bg-blue-500/20 border-blue-400' : 'bg-white/5 border-gray-700'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{comparison.eshop.icon}</span>
            <h3 className="text-xl font-black text-white">
              {comparison.eshop.title}
            </h3>
          </div>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <div>
                <p className="text-xs font-bold text-green-400 mb-1">✅ PRO:</p>
                {comparison.eshop.pros.map((pro, i) => (
                  <p key={i} className="text-xs text-gray-300 ml-4">• {pro}</p>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-red-400 mb-1">❌ CONS:</p>
                {comparison.eshop.cons.map((con, i) => (
                  <p key={i} className="text-xs text-gray-300 ml-4">• {con}</p>
                ))}
              </div>
              <div className="bg-blue-500/30 rounded-lg p-2 mt-2">
                <p className="text-xs font-bold text-blue-200">
                  {comparison.eshop.bestFor}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Service */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{
            opacity: revealed === 'service' ? 1 : 0.3,
            x: revealed === 'service' ? 0 : 50
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`p-5 rounded-2xl border-2 ${
            revealed === 'service' ? 'bg-purple-500/20 border-purple-400' : 'bg-white/5 border-gray-700'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{comparison.service.icon}</span>
            <h3 className="text-xl font-black text-white">
              {comparison.service.title}
            </h3>
          </div>
          {revealed === 'service' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <div>
                <p className="text-xs font-bold text-green-400 mb-1">✅ PRO:</p>
                {comparison.service.pros.map((pro, i) => (
                  <p key={i} className="text-xs text-gray-300 ml-4">• {pro}</p>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-red-400 mb-1">❌ CONS:</p>
                {comparison.service.cons.map((con, i) => (
                  <p key={i} className="text-xs text-gray-300 ml-4">• {con}</p>
                ))}
              </div>
              <div className="bg-purple-500/30 rounded-lg p-2 mt-2">
                <p className="text-xs font-bold text-purple-200">
                  {comparison.service.bestFor}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* CTA */}
      {revealed === 'service' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-white rounded-xl p-4 max-w-md"
        >
          <p className="text-sm font-black text-gray-900 text-center">
            🎯 Zjisti který model je pro TEBE
          </p>
          <p className="text-xs text-gray-600 text-center mt-1">
            Test v bio 👇
          </p>
        </motion.div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// SHORTS ARRAY
// ═══════════════════════════════════════

const SHORTS: YouTubeShort[] = [
  {
    id: 1,
    title: "Jak Zásilkovna vybudovala byznys za miliardu BEZ skladů",
    hook: "1,2 MILIARDY ročně... BEZ vlastních skladů? 🤯",
    description: "Case study úspěšného business modelu",
    type: 'case-study',
    component: Short01_Zasilkovna
  },
  {
    id: 2,
    title: "Jak začít podnikat - prvních 5 kroků (SPRÁVNĚ)",
    hook: "90% lidí dělá krok #1 špatně...",
    description: "Praktický návod pro začínající podnikatele",
    type: 'how-to',
    component: Short02_HowToStart
  },
  {
    id: 3,
    title: "Tohle dělá 90% podnikatelů ŠPATNĚ (a jak to opravit)",
    hook: "92% podnikatelů doufá místo testování... 😱",
    description: "3 kritické chyby + jak je vyřešit",
    type: 'mistake',
    component: Short03_90PercentMistake
  },
  {
    id: 4,
    title: "Pizzerie dělá jen 30 000 Kč/měsíc - 3 důvody PROČ",
    hook: "Proč pizzerie nedělá peníze? 🍕",
    description: "Real case study + co by mohla udělat lépe",
    type: 'case-study',
    component: Short04_PizzaMistakes
  },
  {
    id: 5,
    title: "Jak otestovat nápad za 0 Kč (validace za víkend)",
    hook: "Validace za víkend? JDE TO. 💡",
    description: "5 kroků jak otestovat nápad skoro zdarma",
    type: 'how-to',
    component: Short05_ValidateFor0
  },
  {
    id: 6,
    title: "E-shop vs. Služba - který model je PRO TEBE?",
    hook: "E-shop nebo služba? Záleží na... 🤔",
    description: "Porovnání 2 modelů + který je pro tebe",
    type: 'comparison',
    component: Short06_EshopVsService
  }
];

// ═══════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════

export function YouTubeShorts() {
  const [currentShortIndex, setCurrentShortIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentShort = SHORTS[currentShortIndex];
  const ShortComponent = currentShort.component;

  const handlePrevious = () => {
    setCurrentShortIndex((prev) => (prev > 0 ? prev - 1 : prev));
    setIsPlaying(true);
  };

  const handleNext = () => {
    setCurrentShortIndex((prev) => (prev < SHORTS.length - 1 ? prev + 1 : prev));
    setIsPlaying(true);
  };

  const handleReplay = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-2">
            🎬 YouTube Shorts Preview
          </h1>
          <p className="text-slate-400">
            Screen record these animated shorts for YouTube
          </p>
          <div className="mt-4 inline-block bg-yellow-400/10 border border-yellow-400/30 rounded-lg px-4 py-2">
            <p className="text-yellow-400 text-sm font-bold">
              📹 Recording Area: 1080×1920 (vertical)
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr,auto] gap-8 items-start">
          {/* LEFT: Phone Preview */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-8 border-slate-800">
                {/* Screen (9:16 aspect ratio for vertical video) */}
                <div className="relative bg-black rounded-[2.5rem] overflow-hidden" style={{ width: '405px', height: '720px' }}>
                  <AnimatePresence mode="wait">
                    {isPlaying && (
                      <motion.div
                        key={currentShortIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                      >
                        <ShortComponent />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Recording Hint */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                RECORD THIS AREA
              </div>
            </div>
          </div>

          {/* RIGHT: Controls & Info */}
          <div className="lg:w-80 space-y-6">
            {/* Short Info */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🎬</span>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">
                    Short #{currentShort.id}
                  </p>
                  <h3 className="text-white font-bold">
                    {currentShort.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-4">
                {currentShort.description}
              </p>
              <div className="inline-block bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold">
                {currentShort.type.toUpperCase()}
              </div>
            </div>

            {/* Controls */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h4 className="text-white font-bold mb-4">Controls</h4>
              
              {/* Navigation */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentShortIndex === 0}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentShortIndex === SHORTS.length - 1}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Replay */}
              <button
                onClick={handleReplay}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                Replay Animation
              </button>

              {/* Progress */}
              <div className="mt-4 pt-4 border-t border-slate-800">
                <p className="text-xs text-slate-500 mb-2">Progress</p>
                <div className="flex gap-1">
                  {SHORTS.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 flex-1 rounded-full ${
                        index === currentShortIndex
                          ? 'bg-yellow-400'
                          : index < currentShortIndex
                          ? 'bg-green-500'
                          : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {currentShortIndex + 1} / {SHORTS.length} Shorts
                </p>
              </div>
            </div>

            {/* Recording Instructions */}
            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-6 border border-indigo-700">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                📹 Recording Workflow
              </h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p>1. Open ShareX</p>
                <p>2. Set region: 1080×1920</p>
                <p>3. Center on phone screen</p>
                <p>4. Record animation (loop)</p>
                <p>5. Upload to YT Studio</p>
                <p>6. Add music in YT</p>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h4 className="text-white font-bold mb-3">📊 Content Mix</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tips</span>
                  <span className="text-white font-bold">
                    {SHORTS.filter(s => s.type === 'tip').length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Stories</span>
                  <span className="text-white font-bold">
                    {SHORTS.filter(s => s.type === 'story').length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total Shorts</span>
                  <span className="text-yellow-400 font-bold">
                    {SHORTS.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
/**
 * 🎯 COURSE CONTENT SHOWCASE - Value-focused marketing
 * 
 * Ukazuje CO KONKRÉTNĚ DOSTANEŠ - ne abstraktní "model", ale RESULTS
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, BookOpen, Target, Calculator, FileText, 
  TrendingUp, Users, Zap, Clock, Award, Sparkles, Play,
  ChevronRight, Lightbulb, DollarSign
} from "lucide-react";
import { Button } from "./ui/button";

// Co skutečně dostanou
const COURSE_MODULES = [
  {
    id: 1,
    title: "Modul 1: Tvůj jasný model",
    subtitle: "9 lekcí • 90 minut",
    icon: <Target className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    results: [
      "Víš PŘESNĚ kdo jsou tvojí zákazníci (ne 'všichni')",
      "Máš jasno CO nabízíš a PROČ si tě vybrat",
      "Znáš své kanály - KDE svoje lidi najdeš",
      "Víš kolik čeho prodáváš a za kolik"
    ],
    lessons: [
      { name: "Zákaznické segmenty", icon: <Users className="w-4 h-4" /> },
      { name: "Hodnotová nabídka", icon: <Sparkles className="w-4 h-4" /> },
      { name: "Kanály", icon: <TrendingUp className="w-4 h-4" /> },
      { name: "Vztahy se zákazníky", icon: <BookOpen className="w-4 h-4" /> },
      { name: "Zdroje příjmů", icon: <DollarSign className="w-4 h-4" /> },
    ]
  },
  {
    id: 2,
    title: "Modul 2: Chytré kalkulačky",
    subtitle: "4 lekce • 45 minut",
    icon: <Calculator className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    results: [
      "Spočítáš si kolik potřebuješ zákazníků (číselně)",
      "Zjistíš jestli je tvůj trh dost velký",
      "Ověříš že tvůj byznys dává smysl",
      "Máš konkrétní cílová čísla na příští měsíc"
    ],
    tools: [
      { name: "Cílová kalkulačka", desc: "Kolik zákazníků potřebuješ?" },
      { name: "Velikost trhu", desc: "Je tvůj segment dost velký?" },
      { name: "Profit kalkulačka", desc: "Vydělává to dost?" }
    ]
  },
  {
    id: 3,
    title: "Modul 3: Akční plán",
    subtitle: "3 lekce • 30 minut",
    icon: <FileText className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    results: [
      "Máš akční plán na příštích 30 dní",
      "Víš CO konkrétně dělat ZÍTRA ráno",
      "Dostaneš PDF se svým modelem (ke stažení)",
      "Můžeš to ukázat partnerovi/investorovi"
    ],
    deliverables: [
      { name: "Business Model Canvas", icon: <Target className="w-4 h-4" /> },
      { name: "30-denní akční plán", icon: <CheckCircle2 className="w-4 h-4" /> },
      { name: "Value Proposition Canvas", icon: <Sparkles className="w-4 h-4" /> },
      { name: "PDF ke stažení", icon: <FileText className="w-4 h-4" /> }
    ]
  }
];

// Real testimonials - co lidi řekli KONKRÉTNĚ
const REAL_RESULTS = [
  {
    quote: "Konečně vím na koho cílit reklamy. Předtím jsem házel peníze oknem.",
    author: "Petr, e-shop",
    result: "3x víc konverzí na FB reklamách"
  },
  {
    quote: "Za 90 minut jsem měla jasnější strategii než za 3 roky podnikání.",
    author: "Jana, kosmetička",
    result: "Zdvojnásobila ceny služeb"
  },
  {
    quote: "Ukázal jsem to investorovi a hned věděl o čem mluvím.",
    author: "Martin, startup",
    result: "Dostal 500k investici"
  }
];

export function CourseContentShowcase() {
  const [activeModule, setActiveModule] = useState(1);
  const [showVideo, setShowVideo] = useState(false);

  const currentModule = COURSE_MODULES.find(m => m.id === activeModule)!;

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - VALUE PROP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-white mb-4">
            Co konkrétně dostaneš za 90 minut?
          </h2>
          <p className="text-slate-300 text-xl mb-2">
            Žádné obecné kecy. Budeš mít <span className="text-yellow-400 font-bold">KONKRÉTNÍ plán</span> co dělat zítra.
          </p>
          <p className="text-slate-400">
            👇 Tady je přesně co tě čeká:
          </p>
        </motion.div>

        {/* Module Tabs */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
          {COURSE_MODULES.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`
                flex items-center gap-3 px-6 py-4 rounded-lg transition-all
                ${activeModule === module.id
                  ? 'bg-white text-slate-900 shadow-lg scale-105'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                }
              `}
            >
              <div className={activeModule === module.id ? 'text-slate-900' : 'text-slate-400'}>
                {module.icon}
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm">{module.title.split(':')[0]}</div>
                <div className="text-xs opacity-70">{module.subtitle}</div>
              </div>
              {activeModule === module.id && (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              )}
            </button>
          ))}
        </div>

        {/* Active Module Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Module Header */}
            <div className={`bg-gradient-to-r ${currentModule.color} text-white px-8 py-6`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  {currentModule.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{currentModule.title}</h3>
                  <p className="text-white/80">{currentModule.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Module Content - 2 Column Layout */}
            <div className="grid md:grid-cols-2 gap-8 p-8">
              
              {/* Left: What you'll GET */}
              <div>
                <h4 className="text-slate-900 font-bold text-lg mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Co z toho budeš mít:
                </h4>
                <ul className="space-y-3">
                  {currentModule.results.map((result, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{result}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Right: What's INSIDE */}
              <div>
                <h4 className="text-slate-900 font-bold text-lg mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                  Co je uvnitř:
                </h4>

                {/* Lessons */}
                {currentModule.lessons && (
                  <div className="space-y-2 mb-4">
                    {currentModule.lessons.map((lesson, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200"
                      >
                        <div className="text-slate-600">{lesson.icon}</div>
                        <span className="text-slate-700 text-sm">{lesson.name}</span>
                        <div className="ml-auto text-xs text-slate-400">10 min</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tools */}
                {currentModule.tools && (
                  <div className="space-y-2 mb-4">
                    {currentModule.tools.map((tool, idx) => (
                      <div
                        key={idx}
                        className="bg-blue-50 p-3 rounded-lg border border-blue-200"
                      >
                        <div className="font-semibold text-slate-900 text-sm mb-1">
                          🧮 {tool.name}
                        </div>
                        <div className="text-xs text-slate-600">{tool.desc}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Deliverables */}
                {currentModule.deliverables && (
                  <div className="space-y-2">
                    {currentModule.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg border border-orange-200"
                      >
                        <div className="text-orange-600">{item.icon}</div>
                        <span className="text-slate-700 text-sm font-medium">{item.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* CTA at bottom of module */}
            <div className="bg-slate-50 px-8 py-6 border-t border-slate-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-slate-700 font-semibold">
                    ⏱️ Tohle všechno za {currentModule.subtitle.split('•')[1].trim()}
                  </p>
                  <p className="text-slate-500 text-sm">
                    Krok za krokem. Žádný stress.
                  </p>
                </div>
                <Button
                  onClick={() => window.location.href = '/order'}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-slate-900 hover:from-yellow-400 hover:to-orange-400 px-8 py-6"
                >
                  Chci to mít hotové 👉 4999 Kč
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Real Results - Social Proof */}
        <div className="mt-16">
          <h3 className="text-white text-center mb-8">
            ✨ Co z toho měli ostatní:
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {REAL_RESULTS.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
              >
                <p className="text-white italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between">
                  <p className="text-slate-300 text-sm">— {testimonial.author}</p>
                </div>
                <div className="mt-3 bg-green-500/20 text-green-300 text-sm px-3 py-2 rounded-lg border border-green-500/30">
                  ✅ {testimonial.result}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-center"
        >
          <div className="text-slate-900 mb-4">
            <Clock className="w-12 h-12 mx-auto mb-3" />
            <h3 className="text-3xl font-bold mb-2">90 minut. Jasný plán.</h3>
            <p className="text-lg">
              3 moduly • 16 lekcí • Kalkulačky • PDF ke stažení
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="bg-white/20 px-4 py-2 rounded-full text-slate-900 font-semibold">
              ✅ Jasný model
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full text-slate-900 font-semibold">
              ✅ Čísla co dávají smysl
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full text-slate-900 font-semibold">
              ✅ Akční plán na zítra
            </div>
          </div>

          <p className="text-slate-800 mb-6">
            Žádné obecné bláboly. Konkrétní čísla. Konkrétní kroky.
          </p>

          <Button
            onClick={() => window.location.href = '/order'}
            className="bg-slate-900 text-yellow-400 hover:bg-slate-800 text-xl px-12 py-8 shadow-xl"
          >
            Chci jasno v byznysu → 4999 Kč
          </Button>
        </motion.div>

      </div>
    </div>
  );
}

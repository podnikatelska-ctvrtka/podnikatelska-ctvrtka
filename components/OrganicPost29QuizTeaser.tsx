/**
 * POST #29: QUIZ TEASER - "3 MINUTY ODHALÍ ZDRAVÍ TVÉHO MODELU"
 * 
 * Koncept: Mockup screen recording - rychlý průlet kvízem
 * Visual: Phone/desktop mockup, animované otázky, progress bar, výsledek reveal
 * Style: Podobný jako CourseDemoV3 - purple gradients, clean UI
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, TrendingUp, ArrowRight, Star, AlertCircle } from 'lucide-react';

export function OrganicPost29QuizTeaser() {
  const [stage, setStage] = useState(0);
  // 0: Question 1
  // 1: Question 2
  // 2: Question 3
  // 3: Calculating...
  // 4: Result reveal
  // 5: CTA

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 6);
    }, 3200); // Increased from 2200ms to 3200ms for better readability
    return () => clearInterval(timer);
  }, []);

  const questions = [
    {
      id: 1,
      question: 'Máš jasně definovaný zákaznický segment?',
      answer: 'Vím přesně kdo je můj zákazník',
      emoji: '👥'
    },
    {
      id: 2,
      question: 'Testoval jsi hodnotu u skutečných zákazníků?',
      answer: 'Zatím jen přemýšlím',
      emoji: '💎'
    },
    {
      id: 3,
      question: 'Kolik zákazníků ti stačí na přežití?',
      answer: 'Nevím přesně',
      emoji: '💰'
    },
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden p-8">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Glow effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      <div className="relative z-10 max-w-4xl w-full">
        {/* Header - persists across all stages */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-block px-6 py-3 bg-purple-500/20 border border-purple-400/30 rounded-full mb-4">
            <span className="text-purple-300 text-sm uppercase tracking-wider font-bold">🎯 ZDARMA Kvíz</span>
          </div>
          <h1 className="text-4xl md:text-6xl text-white leading-tight">
            3 minuty odhalí
            <span className="block mt-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              zdraví tvého modelu
            </span>
          </h1>
        </motion.div>

        {/* Phone mockup container */}
        <div className="mx-auto" style={{ maxWidth: '600px' }}>
          <AnimatePresence mode="wait">
            {/* STAGES 0-2: Questions */}
            {stage >= 0 && stage <= 2 && (
              <motion.div
                key={`question-${stage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-purple-400/30 overflow-hidden"
              >
                {/* Progress bar */}
                <div className="bg-slate-100 p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-600 text-sm font-semibold">
                      Otázka {questions[stage].id} / 10
                    </span>
                    <span className="text-purple-600 text-sm font-bold">
                      {Math.round((questions[stage].id / 10) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(questions[stage].id / 10) * 100}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Question content */}
                <div className="p-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-6xl mb-6 text-center"
                  >
                    {questions[stage].emoji}
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-3xl text-slate-900 mb-8 text-center leading-tight"
                  >
                    {questions[stage].question}
                  </motion.h2>

                  {/* Answer options */}
                  <div className="space-y-4">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="bg-slate-100 hover:bg-purple-50 border-2 border-slate-300 rounded-xl p-4 cursor-pointer transition-all"
                    >
                      <p className="text-slate-600 text-lg">Ano, mám to jasné</p>
                    </motion.div>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-purple-600 rounded-xl p-4 cursor-pointer shadow-lg"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-white text-lg font-semibold">{questions[stage].answer}</p>
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="bg-slate-100 hover:bg-purple-50 border-2 border-slate-300 rounded-xl p-4 cursor-pointer transition-all"
                    >
                      <p className="text-slate-600 text-lg">Nevím / nejsem si jistý</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STAGE 3: Calculating */}
            {stage === 3 && (
              <motion.div
                key="calculating"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-purple-400/30 p-12 text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 mx-auto mb-6"
                >
                  <div className="w-full h-full border-4 border-purple-200 border-t-purple-600 rounded-full" />
                </motion.div>

                <h2 className="text-3xl text-slate-900 mb-4">Počítám výsledky...</h2>
                <p className="text-slate-600 text-lg">Analyzuji tvůj model podnikání</p>

                <div className="mt-8 space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Vyhodnocuji zákaznické segmenty</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Kontroluji hodnotovou nabídku</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Měřím finanční udržitelnost</span>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* STAGE 4: Result */}
            {stage === 4 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-orange-400/30 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <div className="text-6xl mb-3">⚠️</div>
                    <h2 className="text-3xl text-white font-bold">Tvé skóre: 38/100</h2>
                    <p className="text-orange-100 text-lg mt-2">RIZIKOVÝ MODEL</p>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-2xl text-slate-900 mb-4 font-bold flex items-center gap-3">
                      <AlertCircle className="w-7 h-7 text-orange-500" />
                      Kritické problémy:
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                        <span className="text-red-500 text-xl shrink-0">❌</span>
                        <p className="text-slate-700">Nedefinované segmenty</p>
                      </div>
                      <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                        <span className="text-red-500 text-xl shrink-0">❌</span>
                        <p className="text-slate-700">Netestovaná hodnota</p>
                      </div>
                      <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                        <span className="text-red-500 text-xl shrink-0">❌</span>
                        <p className="text-slate-700">Neznámá ekonomika</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 rounded-2xl p-6">
                      <h4 className="text-lg text-purple-900 font-bold mb-3 flex items-center gap-2">
                        <Star className="w-5 h-5 text-purple-600" />
                        Tvůj personalizovaný plán:
                      </h4>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Přesně víš, které kroky udělat PRVNÍ a můžeš začít hned teď (ne za týden)
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* STAGE 5: CTA */}
            {stage === 5 && (
              <motion.div
                key="cta"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl shadow-2xl border-2 border-white/20 p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                  className="text-8xl mb-6"
                >
                  🎯
                </motion.div>

                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-5xl text-white mb-4 font-black"
                >
                  Chceš znát SVOJE skóre?
                </motion.h2>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-2xl text-white/90 mb-8"
                >
                  3 minuty. ZDARMA. Personalizovaný plán.
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white text-purple-600 px-8 py-5 rounded-2xl text-2xl font-bold inline-flex items-center gap-3 shadow-2xl cursor-pointer hover:scale-105 transition-transform"
                >
                  <span>Udělej kvíz TEĎKA</span>
                  <ArrowRight className="w-7 h-7" />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-white/70 mt-6 text-sm"
                >
                  www.podnikatelskactvrtka.cz/kviz
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                stage === i ? 'bg-white w-8' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
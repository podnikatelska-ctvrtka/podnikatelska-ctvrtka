/**
 * POST #30: 3 DŮVODY PROČ BYZNYSY UMÍRAJÍ
 * 
 * Koncept: Card flip reveal - každá karta se otočí a ukáže důvod + řešení
 * Visual: Minimalistický design, clean white cards, smooth transitions
 * Format: 4:5 (vertical) - ANIMATED
 * 
 * Animation flow:
 * Stage 0: Intro headline (2s)
 * Stage 1-3: Každá karta se otočí (3s každá) - flip animation
 * Stage 4: "Řešení?" reveal (2.5s)
 * Stage 5: CTA (3s)
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Skull, AlertTriangle, Target, Sparkles, ArrowRight, TrendingDown } from 'lucide-react';

export function OrganicPost30ThreeReasons() {
  const [stage, setStage] = useState(0);
  // 0: Intro
  // 1: Důvod #1 flip
  // 2: Důvod #2 flip
  // 3: Důvod #3 flip
  // 4: Řešení
  // 5: CTA

  const reasons = [
    {
      number: 1,
      emoji: '🎲',
      title: 'ŽÁDNÝ PLÁN',
      subtitle: 'Improvizuješ každý den',
      problem: 'Nevíš KDO je zákazník',
      result: 'Zákazníci tě ignorují',
      color: 'from-red-500 to-orange-500'
    },
    {
      number: 2,
      emoji: '❓',
      title: 'NEZNÁŠ ČÍSLA',
      subtitle: 'Netestoval jsi ekonomiku',
      problem: 'Nevíš kolik zákazníků potřebuješ',
      result: 'Byznys není udržitelný',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      number: 3,
      emoji: '🔀',
      title: 'VŠECHNO NAJEDNOU',
      subtitle: 'Zkoušíš 10 věcí současně',
      problem: 'Nevíš, co funguje, co ne',
      result: 'Spaluješ čas + peníze',
      color: 'from-yellow-500 to-red-500'
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (stage === 0) {
      // Intro: 2s
      timer = setTimeout(() => setStage(1), 2000);
    } else if (stage >= 1 && stage <= 3) {
      // Each card flip: 3s
      timer = setTimeout(() => setStage(stage + 1), 3000);
    } else if (stage === 4) {
      // Solution: 2.5s
      timer = setTimeout(() => setStage(5), 2500);
    } else if (stage === 5) {
      // CTA: 3s, then loop
      timer = setTimeout(() => setStage(0), 3000);
    }

    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center overflow-hidden p-8">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 bg-red-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />

      <div className="relative z-10 max-w-2xl w-full">
        <AnimatePresence mode="wait">
          
          {/* STAGE 0: Intro */}
          {stage === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="text-9xl mb-6"
              >
                💀
              </motion.div>
              
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-6xl text-slate-900 mb-4 leading-tight"
              >
                3 důvody proč<br/>
                <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent font-black">
                  byznysy UMÍRAJÍ
                </span>
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-slate-600 text-xl"
              >
                v prvním roce
              </motion.p>
            </motion.div>
          )}

          {/* STAGES 1-3: Card Flips */}
          {stage >= 1 && stage <= 3 && (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {/* Show all cards, flip them progressively */}
              {reasons.map((reason, index) => {
                const cardStage = index + 1;
                // Karta se flipne když: stage >= cardStage
                const shouldFlip = stage >= cardStage;

                return (
                  <div
                    key={reason.number}
                    className="relative h-[160px]"
                    style={{ perspective: '1000px' }}
                  >
                    <motion.div
                      initial={{ rotateY: 0 }}
                      animate={{
                        rotateY: shouldFlip ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: 'easeInOut'
                      }}
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                      className="relative w-full h-full"
                    >
                      {/* FRONT of card (before flip) */}
                      <div
                        className="absolute inset-0 bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6 flex items-center gap-4"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                        }}
                      >
                        <div className="text-5xl flex-shrink-0">
                          {reason.emoji}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-slate-500 font-bold mb-1">
                            DŮVOD #{reason.number}
                          </div>
                          <h3 className="text-2xl text-slate-900 font-black">
                            {reason.title}
                          </h3>
                        </div>
                        <div className="text-slate-400">
                          <AlertTriangle className="w-8 h-8" />
                        </div>
                      </div>

                      {/* BACK of card (after flip) */}
                      <div
                        className={`bg-gradient-to-br ${reason.color} rounded-2xl shadow-2xl border-2 border-white/20 p-6`}
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-5xl flex-shrink-0">
                            {reason.emoji}
                          </div>
                          <div className="flex-1 text-white">
                            <div className="text-sm font-bold mb-2 opacity-90">
                              DŮVOD #{reason.number}
                            </div>
                            <h3 className="text-2xl font-black mb-3">
                              {reason.title}
                            </h3>
                            <div className="space-y-2 text-sm opacity-95">
                              <div className="flex items-start gap-2">
                                <span className="text-lg shrink-0">❌</span>
                                <span>{reason.problem}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-lg shrink-0">→</span>
                                <span className="font-bold">{reason.result}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* STAGE 4: Solution */}
          {stage === 4 && (
            <motion.div
              key="solution"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="text-8xl mb-6"
              >
                💡
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-5xl text-slate-900 mb-6 leading-tight"
              >
                Řešení?
              </motion.h2>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border-2 border-slate-700"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                  <h3 className="text-3xl text-white font-black">
                    Jasný MODEL PODNIKÁNÍ
                  </h3>
                </div>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3 text-slate-300">
                    <span className="text-green-400 text-xl shrink-0">✓</span>
                    <span className="text-lg">Víš PŘESNĚ, co děláš</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <span className="text-green-400 text-xl shrink-0">✓</span>
                    <span className="text-lg">Znáš svá čísla</span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-300">
                    <span className="text-green-400 text-xl shrink-0">✓</span>
                    <span className="text-lg">Víš, co je priorita</span>
                  </div>
                </div>
              </motion.div>
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
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
                className="text-8xl mb-6"
              >
                🎯
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-5xl text-slate-900 mb-3 font-black"
              >
                Zjisti, kde máš
              </motion.h2>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-4xl md:text-5xl font-black mb-6"
              >
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  NEJVĚTŠÍ DÍRY
                </span>
              </motion.div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-2xl text-slate-600 mb-10"
              >
                3 minuty. ZDARMA. Personalizovaný plán.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-5 rounded-2xl text-2xl font-bold inline-flex items-center gap-3 shadow-2xl"
              >
                <span>Udělej změnu TEĎ</span>
                <ArrowRight className="w-7 h-7" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-slate-500 mt-6 text-lg"
              >
                podnikatelskactvrtka.cz
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
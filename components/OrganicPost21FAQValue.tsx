import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * 🎯 POST #21: FAQ/VALUE - 3 věci co POTŘEBUJEŠ vs 3 co NEPOTŘEBUJEŠ
 * Rychlá hodnota, ujištění, debunk mýtů
 */

export function OrganicPost21FAQValue() {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const timings = [3500, 3500, 3500, 3500, 4000, 5000]; // Timing každé scény
    
    if (scene < 6) {
      const timer = setTimeout(() => {
        setScene(scene + 1);
      }, timings[scene]);
      
      return () => clearTimeout(timer);
    } else {
      // Po CTA -> resetuj na začátek (loop)
      const timer = setTimeout(() => {
        setScene(0);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [scene]);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden">
      
      <AnimatePresence mode="wait">
        
        {/* SCÉNA 1: Hook */}
        {scene === 0 && (
          <motion.div
            key="scene1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-12"
          >
            <div className="text-center max-w-2xl space-y-6">
              <div className="text-8xl mb-4">🤔</div>
              <h1 className="text-5xl font-black text-white leading-tight">
                CO VLASTNĚ<br/>
                <span className="text-yellow-400">POTŘEBUJEŠ</span><br/>
                K STARTU?
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-white/60 text-2xl italic"
              >
                Většina podnikatelů řeší úplně špatné věci
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* SCÉNA 2: CO LIDI MYSLÍ ŽE POTŘEBUJÍ */}
        {scene === 1 && (
          <motion.div
            key="scene2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-12 gap-8"
          >
            <div className="text-center">
              <div className="text-7xl mb-4">❌</div>
              <h2 className="text-4xl font-black text-red-400 mb-6">
                CO LIDI MYSLÍ ŽE MUSÍ MÍT
              </h2>
            </div>

            <div className="space-y-4 max-w-2xl w-full">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-red-950/40 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-500/30"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🌐</div>
                  <p className="text-2xl font-black text-white">Dokonalý web</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-red-950/40 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-500/30"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🎨</div>
                  <p className="text-2xl font-black text-white">Luxusní logo a brand</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-red-950/40 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-500/30"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🏢</div>
                  <p className="text-2xl font-black text-white">Kancelář / prostor</p>
                </div>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white/50 text-xl italic"
            >
              Investují 100k+ PŘED prvním zákazníkem
            </motion.p>
          </motion.div>
        )}

        {/* SCÉNA 3: Realita */}
        {scene === 2 && (
          <motion.div
            key="scene3"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-12 gap-6"
          >
            <div className="text-center max-w-3xl space-y-6">
              <div className="text-8xl mb-4">💡</div>
              <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl p-10 border-2 border-white/10">
                <p className="text-4xl font-black text-white/90 italic leading-tight">
                  "Všechno tohle<br/>
                  potřebuješ<br/>
                  <span className="text-yellow-400">AŽ KDYŽ</span><br/>
                  víš že to funguje."
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* SCÉNA 4: CO OPRAVDU POTŘEBUJEŠ */}
        {scene === 3 && (
          <motion.div
            key="scene4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-12 gap-6"
          >
            <div className="text-center mb-4">
              <div className="text-7xl mb-4">✅</div>
              <h2 className="text-4xl font-black text-green-400">
                CO OPRAVDU POTŘEBUJEŠ
              </h2>
            </div>

            <div className="max-w-2xl space-y-4">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-green-950/60 to-emerald-950/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-400/30"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl font-black text-green-400">1</div>
                  <div>
                    <div className="text-2xl font-black text-white mb-2">
                      Jasný Model podnikání
                    </div>
                    <p className="text-white/70 text-lg">
                      Kdo je zákazník, co řeší, kolik zaplatí, jak ho najdeš.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-green-950/60 to-emerald-950/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-400/30"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl font-black text-green-400">2</div>
                  <div>
                    <div className="text-2xl font-black text-white mb-2">
                      Validace že to někdo chce
                    </div>
                    <p className="text-white/70 text-lg">
                      Než investuješ korunu, ověř že je poptávka.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-r from-green-950/60 to-emerald-950/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-400/30"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl font-black text-green-400">3</div>
                  <div>
                    <div className="text-2xl font-black text-white mb-2">
                      Prvních 10 zákazníků
                    </div>
                    <p className="text-white/70 text-lg">
                      Dokud nemáš zaplaceno, všechno ostatní je předčasné.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* SCÉNA 5: Porovnání */}
        {scene === 4 && (
          <motion.div
            key="scene5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-12 gap-8"
          >
            <div className="text-center">
              <div className="text-8xl mb-4">⚖️</div>
              <h2 className="text-4xl font-black text-white mb-3">
                DVA PŘÍSTUPY
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-6 max-w-4xl">
              {/* Špatně */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-red-950/40 backdrop-blur-sm rounded-2xl p-8 border-2 border-red-500/30"
              >
                <div className="text-4xl mb-4">❌</div>
                <div className="text-2xl font-black text-red-400 mb-4">KLASIKA</div>
                <div className="space-y-3 text-white/80 text-lg">
                  <div>→ Web za 50k</div>
                  <div>→ Logo za 20k</div>
                  <div>→ Nájem 3 měsíce</div>
                  <div>→ Pak teprve hledání zákazníků</div>
                </div>
                <div className="mt-6 text-red-400 font-black text-xl">
                  100k+ investováno, 0 Kč tržby
                </div>
              </motion.div>

              {/* Správně */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-green-950/40 backdrop-blur-sm rounded-2xl p-8 border-2 border-green-400/30"
              >
                <div className="text-4xl mb-4">✅</div>
                <div className="text-2xl font-black text-green-400 mb-4">CHYTŘE</div>
                <div className="space-y-3 text-white/80 text-lg">
                  <div>→ Model za 5k</div>
                  <div>→ Validace zdarma</div>
                  <div>→ Prvních 10 zákazníků</div>
                  <div>→ Pak investice z tržeb</div>
                </div>
                <div className="mt-6 text-green-400 font-black text-xl">
                  5k investováno, tržby už běží
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* SCÉNA 6: CTA */}
        {scene === 5 && (
          <motion.div
            key="scene6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-12 gap-8"
          >
            <div className="text-center max-w-2xl">
              <div className="text-7xl mb-4">🎯</div>
              <h2 className="text-5xl font-black text-white leading-tight mb-4">
                ZAČNI<br/>
                <span className="text-purple-400">SPRÁVNĚ</span>
              </h2>
              <p className="text-white/60 text-2xl">
                Investuj do modelu, ne do vzhledu
              </p>
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-10 border-4 border-white/20 shadow-2xl text-center max-w-xl"
            >
              <div className="text-white/90 text-2xl mb-3 uppercase tracking-wide">
                Podnikatelská Čtvrtka
              </div>
              <div className="text-8xl font-black text-white mb-4">
                4 999 Kč
              </div>
              <div className="text-white/90 text-xl space-y-2">
                <div>✅ 90 minut • Jasný Model</div>
                <div>✅ Validace trhu • Bez rizika</div>
                <div>✅ Víš CO potřebuješ a CO NE</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-white/40 text-lg italic"
            >
              Model první. Investice až když víš že to funguje.
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Progress dots */}
      {scene < 5 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === scene 
                  ? 'w-12 bg-white' 
                  : i < scene 
                    ? 'w-8 bg-white/50' 
                    : 'w-8 bg-white/20'
              }`}
            />
          ))}
        </div>
      )}

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXh0IHR5cGU9InNhdHVyYXRlIiB2YWx1ZXM9IjAiLz48L2ZpbHRlcj48cGF0aCBkPSJNMCAwaDMwMHYzMDBIMHoiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')]" />
    </div>
  );
}

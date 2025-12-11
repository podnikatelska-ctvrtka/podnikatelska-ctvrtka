import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * 🎯 POST #19: HOKEJOVÁ VÝBAVA - Reálný příběh
 * Slide-show: Setup → Problém → Strach → Řešení → Výsledek → CTA
 */

export function OrganicPost19OpportunityCost() {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const timings = [3500, 3500, 3500, 3500, 4000, 5000]; // Timing každé scény (poslední = CTA zobrazení)
    
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
    <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden">
      
      <AnimatePresence mode="wait">
        
        {/* SCÉNA 1: Setup - Kdo je */}
        {scene === 0 && (
          <motion.div
            key="scene1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-12"
          >
            <div className="text-center max-w-2xl space-y-4">
              <div className="text-8xl mb-4">🏒</div>
              <h1 className="text-6xl font-black text-white leading-tight">
                OBCHOD<br/>
                S HOKEJOVOU<br/>
                VÝBAVOU
              </h1>
              <p className="text-white/60 text-2xl">
                Ve městě, mezi lidmi
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-white/40 text-lg italic mt-4"
              >
                Celý život miloval hokej. Teď má svůj obchod.
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* SCÉNA 2: Problém - Konkurence */}
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
              <div className="text-7xl mb-4">😰</div>
              <h2 className="text-5xl font-black text-red-400 mb-6">
                ALE...
              </h2>
            </div>

            <div className="space-y-4 max-w-xl w-full">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-red-950/40 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-500/30"
              >
                <div className="text-3xl font-black text-white">
                  🏬 DECATHLON
                </div>
                <p className="text-white/70 text-xl mt-2">Levnější, všechno skladem</p>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-red-950/40 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-500/30"
              >
                <div className="text-3xl font-black text-white">
                  🏢 SPORTISIMO
                </div>
                <p className="text-white/70 text-xl mt-2">Nákupní centra, reklama všude</p>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-red-950/40 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-500/30"
              >
                <div className="text-3xl font-black text-white">
                  💻 E-SHOPY
                </div>
                <p className="text-white/70 text-xl mt-2">Doručí domů, ještě levněji</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* SCÉNA 3: Strach - Proč by lidi šli ke mně? */}
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
              <div className="text-7xl mb-4">💭</div>
              <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl p-10 border-2 border-white/10">
                <p className="text-4xl font-black text-white/90 italic leading-tight">
                  "Proč by lidi šli<br/>
                  ke mně, když tam<br/>
                  je to <span className="text-red-400">levnější</span>?"
                </p>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/50 text-xl italic"
              >
                3 měsíce platil nájem. Skoro nikdo nepřišel.
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* SCÉNA 4: Řešení - Čtvrtka ukázala */}
        {scene === 3 && (
          <motion.div
            key="scene4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-12 gap-6"
          >
            <div className="text-center">
              <div className="text-7xl mb-4">✨</div>
              <h2 className="text-4xl font-black text-purple-400 mb-2">
                ČTVRTKA UKÁZALA
              </h2>
            </div>

            <div className="max-w-2xl space-y-4">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-blue-950/40 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-400/30"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">❌</div>
                  <div>
                    <div className="text-2xl font-black text-white mb-1">
                      Není to o ceně
                    </div>
                    <p className="text-white/70 text-lg">
                      Decathlon prodává hole. Ty prodáváš lepší hru.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-950/40 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-400/30"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🎯</div>
                  <div>
                    <div className="text-2xl font-black text-white mb-1">
                      Expertiza &gt; skladem
                    </div>
                    <p className="text-white/70 text-lg">
                      Poraď rodičům jakou hůl pro juniora. To Decathlon nezvládne.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-blue-950/40 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-400/30"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🤝</div>
                  <div>
                    <div className="text-2xl font-black text-white mb-1">
                      Buduj komunitu
                    </div>
                    <p className="text-white/70 text-lg">
                      Staň se místem kde se hokejisté potkávají a radí.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* SCÉNA 5: Výsledek */}
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
              <div className="text-8xl mb-4">🚀</div>
              <h2 className="text-5xl font-black text-green-400 mb-3">
                VÝSLEDEK?
              </h2>
            </div>

            <div className="max-w-2xl space-y-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-green-950/40 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-400/30"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">✅</div>
                  <p className="text-2xl font-black text-white">
                    Dodává výbavu celým týmům
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-green-950/40 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-400/30"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">✅</div>
                  <p className="text-2xl font-black text-white">
                    Pořádá hokejové večery pro fanoušky
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-green-950/40 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-400/30"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">✅</div>
                  <p className="text-2xl font-black text-white">
                    Konkuruje velkým hráčům svým stylem
                  </p>
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
              <div className="text-7xl mb-4">💡</div>
              <h2 className="text-5xl font-black text-white leading-tight mb-4">
                TVŮJ PODNIK<br/>
                <span className="text-purple-400">MÁ TAKY CESTU</span>
              </h2>
              <p className="text-white/60 text-2xl">
                I když teď nevidíš jak
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
                <div>✅ 90 minut • Jasný Model podnikání</div>
                <div>✅ Víš jak se odlišit od konkurence</div>
                <div>✅ Máš plán co dělat první měsíc</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-white/40 text-lg italic"
            >
              Nemusíš být největší. Stačí být jiný.
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
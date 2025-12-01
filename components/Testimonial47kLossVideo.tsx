// 🎯 TESTIMONIAL #3: "47 000 KČ ZA CHYBY" - ANIMATED VIDEO
// FASTER FLOW: Hook → Chyby grid → Řešení → Transformace → Regret
// POSITIVE SHIFT: Dark → Green když funguje
// REGRET + LOSS AVERSION + OVERCOMING SKEPTICISM
// SQUARE FORMAT 1:1 (1080x1080) - READY FOR SHAREX → FB + IG

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Testimonial47kLossVideo() {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const timings = [
      3500,  // Scene 0: HOOK - Skepticismus + 47k (+0.5s)
      3000,  // Scene 1: 3 výdaje GRID najednou (+0.5s)
      3000,  // Scene 2: Realization (+0.5s)
      2500,  // Scene 3: Decision (+0.5s)
      3000,  // Scene 4: Solution (GREEN!) (+0.5s)
      3000,  // Scene 5: Results (GREEN!) (+0.5s)
      3500,  // Scene 6: Regret + CTA (same)
    ];

    const timer = setTimeout(() => {
      if (scene < 6) {
        setScene(scene + 1);
      } else {
        setScene(0); // Loop
      }
    }, timings[scene]);

    return () => clearTimeout(timer);
  }, [scene]);

  // Background color based on scene
  const getBackgroundClass = () => {
    if (scene >= 4 && scene <= 5) {
      return 'bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900';
    } else if (scene === 6) {
      return 'bg-gradient-to-br from-slate-100 via-gray-100 to-white';
    } else {
      return 'bg-gradient-to-br from-gray-900 via-red-950 to-gray-900';
    }
  };

  return (
    <div className={`relative w-[1080px] h-[1080px] flex items-center justify-center overflow-hidden transition-all duration-1000 ${getBackgroundClass()}`}>
      <AnimatePresence mode="wait">
        {/* SCENE 0: HOOK - Skepticismus + PROPÁLIL 47K */}
        {scene === 0 && (
          <motion.div
            key="scene-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center px-10 max-w-4xl"
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-6 border-4 border-yellow-500/50"
            >
              <p className="text-2xl text-yellow-300 mb-2">⚠️</p>
              <p className="text-3xl text-white font-black mb-2">
                "Netajím, že jsem tomu nevěřil."
              </p>
              <p className="text-3xl text-white italic mb-2">
                Zase další kurz... 😤
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-red-600 rounded-3xl px-12 py-8 shadow-2xl border-4 border-red-500"
            >
              <p className="text-xl text-white/90 mb-3">Ale já už jsem</p>
              <p className="text-7xl font-black text-white mb-2">PROPÁLIL</p>
              <p className="text-6xl font-black text-yellow-300">47 000 Kč</p>
              <p className="text-xl text-white/90 mt-3">za chyby</p>
            </motion.div>
          </motion.div>
        )}

        {/* SCENE 1: 3 VÝDAJE GRID NAJEDNOU */}
        {scene === 1 && (
          <motion.div
            key="scene-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center px-8 max-w-5xl w-full"
          >
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl text-white font-black mb-6"
            >
              💸 NA CO JSEM TO PROPÁLIL:
            </motion.p>

            <div className="grid grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border-4 border-red-500/50"
              >
                <p className="text-6xl mb-3">💸</p>
                <p className="text-4xl font-black text-red-400 mb-3">12 000</p>
                <p className="text-xl text-white mb-1">Expert na reklamu</p>
                <p className="text-base text-gray-400 italic">(Nefungovalo)</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border-4 border-red-500/50"
              >
                <p className="text-6xl mb-3">💸</p>
                <p className="text-4xl font-black text-red-400 mb-3">18 000</p>
                <p className="text-xl text-white mb-1">Web a logo</p>
                <p className="text-base text-gray-400 italic">(Krásný design. Nula zákazníků.)</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border-4 border-red-500/50"
              >
                <p className="text-6xl mb-3">💸</p>
                <p className="text-4xl font-black text-red-400 mb-3">17 000</p>
                <p className="text-xl text-white mb-1">Vylepšení prostor</p>
                <p className="text-base text-gray-400 italic">(Luxusní interiér. Zákazníci nepřicházeli.)</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* SCENE 2: REALIZATION */}
        {scene === 2 && (
          <motion.div
            key="scene-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center px-10 max-w-3xl"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border-4 border-white/30"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl text-white mb-6"
              >
                Myslel jsem, že se zákazníci pohrnou.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="text-5xl text-white font-black mb-8"
              >
                Nehrnuli.
              </motion.p>
              
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1 }}
                className="h-2 bg-white/30 my-6"
              />
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="text-2xl text-gray-300"
              >
                Protože jsem řešil <span className="text-red-400 font-black">SYMPTOMY</span>.<br/>
                Ne <span className="text-green-400 font-black">PŘÍČINU</span>.
              </motion.p>
            </motion.div>
          </motion.div>
        )}

        {/* SCENE 3: DECISION */}
        {scene === 3 && (
          <motion.div
            key="scene-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center px-10 max-w-3xl"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-br from-orange-600 to-yellow-600 rounded-3xl p-10 shadow-2xl"
            >
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl text-white font-black mb-5"
              >
                Řekl jsem si:
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-4xl text-white font-black italic"
              >
                💭 "Co když to zkusím..."
              </motion.p>
            </motion.div>
          </motion.div>
        )}

        {/* SCENE 4: SOLUTION - GREEN POSITIVE! */}
        {scene === 4 && (
          <motion.div
            key="scene-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center px-10 max-w-4xl"
          >
            {/* BACKGROUND CHANGE TO GREEN */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 -z-10"
            />

            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-12 shadow-2xl border-4 border-green-500"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-8xl mb-5"
              >
                💡
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl font-black text-white mb-5"
              >
                ZA 90 MINUT JSEM SI UDĚLAL
              </motion.p>
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="text-6xl font-black text-yellow-300"
              >
                MODEL PODNIKÁNÍ
              </motion.p>
            </motion.div>
          </motion.div>
        )}

        {/* SCENE 5: RESULTS - GREEN POSITIVE! */}
        {scene === 5 && (
          <motion.div
            key="scene-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center px-10 max-w-4xl"
          >
            {/* GREEN BACKGROUND */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 -z-10"
            />

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl text-green-300 mb-6 font-black"
            >
              NAJEDNOU JSEM VIDĚL:
            </motion.p>

            <div className="space-y-3 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-4 border-green-400"
              >
                <p className="text-2xl text-white">
                  <span className="text-green-400 font-black text-3xl">✓</span> Kde dělám chybu
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-4 border-green-400"
              >
                <p className="text-2xl text-white">
                  <span className="text-green-400 font-black text-3xl">✓</span> Proč reklama nefungovala
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-4 border-green-400"
              >
                <p className="text-2xl text-white">
                  <span className="text-green-400 font-black text-3xl">✓</span> Co změnit ZÍTRA
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="bg-white rounded-3xl px-12 py-8 shadow-2xl"
            >
              <p className="text-6xl font-black text-gray-900">
                📈 +60% tržby
              </p>
              <p className="text-2xl font-bold text-gray-700 mt-2">za měsíc</p>
            </motion.div>
          </motion.div>
        )}

        {/* SCENE 6: REGRET + CTA */}
        {scene === 6 && (
          <motion.div
            key="scene-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center px-10 max-w-4xl"
          >
            {/* BRIGHT BACKGROUND */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-slate-100 via-gray-100 to-white -z-10"
            />

            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white shadow-2xl rounded-3xl p-10 mb-6 border-4 border-gray-200"
            >
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl text-gray-900 mb-5 italic"
              >
                Kdybych měl ten model o měsíc dřív...
              </motion.p>
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="text-6xl font-black text-red-600 mb-6"
              >
                ušetřil bych 47 000 Kč
              </motion.p>
            </motion.div>
              
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-yellow-100 border-4 border-yellow-500 rounded-3xl p-8 mb-6"
            >
              <p className="text-3xl font-black text-gray-900">
                ⚠️ Nemakej naslepo jako já.<br/>
                Udělej si model TEĎ.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 }}
              className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-3xl px-12 py-6 inline-block shadow-xl"
            >
              <p className="text-4xl font-black">
                CHCI TEN MODEL →
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === scene ? 'w-8 bg-white' : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export const testimonial47kLossVideoMetadata = {
  id: 'testimonial-47k-loss-video',
  name: 'TESTIMONIAL #3: 47K ZTRÁTA (VIDEO)',
  subtitle: 'Kolik mě stály chyby...',
  format: 'Animated video - confession + skepticism overcome',
  budget: '20 Kč/den',
  trigger: 'Regret • Loss aversion • Skepticism • Authenticity • Overcoming doubt',
  adCopy: {
    primaryText: `Propálil jsem 47 000 Kč na blbosti.

12 000 za experta na reklamy (nefungovalo).
18 000 za web a logo (krásný design, nula zákazníků).
17 000 za vylepšení prostor (luxusní interiér, zákazníci nepřicházeli).

Všechno zbytečný.

Protože jsem řešil SYMPTOMY. Ne PŘÍČINU.

Myslel jsem, že když udělám reklamu, zákazníci se pohrnou. Nehrnuli.

Tak jsem to nakonec zkusil. Model podnikání za 90 minut.

Netajím, že jsem tomu nevěřil. Zase další kurz...

Ale najednou jsem viděl:
→ Kde dělám chybu
→ Proč reklama nefungovala
→ Co změnit ZÍTRA

Za měsíc: +60% tržby.

Kdybych měl ten model o měsíc dřív, ušetřil bych 47 000 Kč.

Nemakej naslepo jako já.`,
    headline: 'Co mě naučilo propálených 47 000 Kč',
    description: 'Reálný příběh • Od skeptika k výsledkům • 90 minut práce',
    cta: 'Nechci dělat stejné chyby'
  }
};
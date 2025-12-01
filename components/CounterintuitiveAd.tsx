import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, TrendingDown, TrendingUp, Clock, DollarSign, AlertCircle } from 'lucide-react';

export function CounterintuitiveAd() {
  const [stage, setStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play animation sequence
  useEffect(() => {
    if (!isPlaying) return;

    const timings = [
      2000, // Stage 0: Hook (2s)
      3000, // Stage 1: Scénář A setup (3s)
      3000, // Stage 2: Scénář A result (3s)
      3000, // Stage 3: Scénář B setup (3s)
      3000, // Stage 4: Scénář B result (3s)
      4000, // Stage 5: Comparison + punchline (4s)
    ];

    const timer = setTimeout(() => {
      if (stage < 5) {
        setStage(stage + 1);
      } else {
        // Loop back
        setStage(0);
      }
    }, timings[stage]);

    return () => clearTimeout(timer);
  }, [stage, isPlaying]);

  const startAnimation = () => {
    setIsPlaying(true);
    setStage(0);
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setStage(0);
  };

  return (
    <div className="w-full max-w-[500px] bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Video container - 4:5 ratio for FB feed */}
      <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 aspect-[4/5]">
        
        {/* Stage 0: Hook */}
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div
              key="hook"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white text-center"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <AlertCircle className="w-20 h-20 mb-6 mx-auto" />
              </motion.div>
              
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl mb-4"
              >
                Proč víc zákazníků = <span className="text-yellow-300">menší peníze?</span>
              </motion.h1>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg opacity-90"
              >
                (ano, čteš dobře)
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 1-2: Scénář A */}
        <AnimatePresence mode="wait">
          {(stage === 1 || stage === 2) && (
            <motion.div
              key="scenario-a"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 w-full">
                <div className="bg-red-500 text-white px-4 py-2 rounded-lg inline-block mb-6">
                  Scénář A: "Chci všechny"
                </div>

                {/* Stage 1: Setup */}
                {stage === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8" />
                      <div>
                        <div className="text-2xl">100 zákazníků</div>
                        <div className="text-sm opacity-80">Prodáváš všem levně</div>
                      </div>
                    </div>

                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.5 }}
                      className="grid grid-cols-10 gap-1 mt-4"
                    >
                      {[...Array(100)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + (i * 0.01) }}
                          className="w-full aspect-square bg-red-300 rounded-sm"
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {/* Stage 2: Result */}
                {stage === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 text-red-300">
                      <Clock className="w-8 h-8" />
                      <div>
                        <div className="text-2xl">70 hodin týdně</div>
                        <div className="text-sm">Makáš jako kůň</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-red-300">
                      <DollarSign className="w-8 h-8" />
                      <div>
                        <div className="text-2xl">25 000 Kč</div>
                        <div className="text-sm">Marže 12% = skoro nic</div>
                      </div>
                    </div>

                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="bg-red-400 text-white px-4 py-3 rounded-lg text-center"
                    >
                      <TrendingDown className="w-6 h-6 mx-auto mb-1" />
                      <div className="text-sm">Vyhoření + minimum peněz</div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 3-4: Scénář B */}
        <AnimatePresence mode="wait">
          {(stage === 3 || stage === 4) && (
            <motion.div
              key="scenario-b"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 w-full">
                <div className="bg-green-500 text-white px-4 py-2 rounded-lg inline-block mb-6">
                  Scénář B: "Vím KOHO chci"
                </div>

                {/* Stage 3: Setup */}
                {stage === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8" />
                      <div>
                        <div className="text-2xl">20 zákazníků</div>
                        <div className="text-sm opacity-80">Správní lidé, správná cena</div>
                      </div>
                    </div>

                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.5 }}
                      className="grid grid-cols-5 gap-2 mt-4"
                    >
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + (i * 0.05) }}
                          className="w-full aspect-square bg-green-300 rounded-lg"
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {/* Stage 4: Result */}
                {stage === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 text-green-300">
                      <Clock className="w-8 h-8" />
                      <div>
                        <div className="text-2xl">30 hodin týdně</div>
                        <div className="text-sm">Máš čas žít</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-green-300">
                      <DollarSign className="w-8 h-8" />
                      <div>
                        <div className="text-2xl">60 000 Kč</div>
                        <div className="text-sm">Marže 45% = luxus</div>
                      </div>
                    </div>

                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="bg-green-400 text-white px-4 py-3 rounded-lg text-center"
                    >
                      <TrendingUp className="w-6 h-6 mx-auto mb-1" />
                      <div className="text-sm">Svoboda + velké peníze</div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 5: Comparison + Punchline */}
        <AnimatePresence mode="wait">
          {stage === 5 && (
            <motion.div
              key="punchline"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white text-center"
            >
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <div className="text-5xl mb-2">🎯</div>
                <h2 className="text-3xl mb-4">
                  Míň zákazníků<br/>= víc peněz + víc času
                </h2>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6"
              >
                <p className="text-lg mb-4">
                  Problém není v počtu zákazníků...
                </p>
                <p className="text-2xl text-yellow-300">
                  Problém je, že nevíš <span className="underline">NA KOHO</span> se zaměřit
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-yellow-400 text-gray-900 px-6 py-4 rounded-xl"
              >
                <div className="text-sm opacity-80 mb-1">Podnikatelská Čtvrtka ti ukáže:</div>
                <div className="text-xl">
                  <strong>Kdo</strong> jsou tví praví zákazníci a <strong>proč</strong> ti zaplatí víc
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-6 text-sm opacity-70"
              >
                3 hodiny • 1 model • 20 Kč • jasno v byznysu
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play/Replay controls */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {!isPlaying && (
            <button
              onClick={startAnimation}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
            >
              ▶ Play
            </button>
          )}
          {isPlaying && (
            <button
              onClick={resetAnimation}
              className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg shadow-lg hover:bg-white transition-colors"
            >
              ↻ Restart
            </button>
          )}
        </div>

        {/* Progress indicator */}
        <div className="absolute top-4 left-4 right-4 flex gap-1">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all ${
                i <= stage ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ChevronDown, CheckCircle2, Circle } from 'lucide-react';

interface Checkpoint {
  id: number;
  label: string;
  title: string;
  emoji: string;
}

const checkpoints: Checkpoint[] = [
  { id: 0, label: 'START', title: 'Mám nápad', emoji: '💡' },
  { id: 1, label: 'KDO', title: 'Definuji zákazníka', emoji: '🎯' },
  { id: 2, label: 'CO', title: 'Validuji nabídku', emoji: '✅' },
  { id: 3, label: 'KOLIK', title: 'Testuji ekonomiku', emoji: '💰' },
  { id: 4, label: 'JAK', title: 'Mám akční plán', emoji: '🚀' },
];

export function OrganicPost31Path() {
  const [stage, setStage] = useState(0);
  // 0: Path drawing + checkpoints lighting up
  // 1: Warning message
  // 2: 2 možnosti comparison
  // 3: CTA

  const [activeCheckpoints, setActiveCheckpoints] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Light up checkpoints progressively during stage 0
  useEffect(() => {
    if (stage === 0) {
      const interval = setInterval(() => {
        setActiveCheckpoints((prev) => {
          if (prev < checkpoints.length) {
            return prev + 1;
          }
          return prev;
        });
      }, 800);
      return () => clearInterval(interval);
    } else {
      setActiveCheckpoints(checkpoints.length); // All active for other stages
    }
  }, [stage]);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex flex-col items-center justify-center overflow-hidden p-8">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <AnimatePresence mode="wait">
        {/* STAGE 0: Path + Checkpoints */}
        {stage === 0 && (
          <motion.div
            key="path"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full max-w-md"
          >
            {/* Headline */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl text-white mb-2">
                CESTA Z CHAOSU
              </h1>
              <h2 className="text-3xl text-yellow-400">
                DO JASNA
              </h2>
            </motion.div>

            {/* Path with checkpoints */}
            <div className="relative">
              {checkpoints.map((checkpoint, index) => (
                <div key={checkpoint.id} className="relative">
                  {/* Checkpoint */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: activeCheckpoints > index ? 1 : 0.3,
                      opacity: activeCheckpoints > index ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.4, delay: index * 0.8 }}
                    className="flex items-center gap-4 mb-8"
                  >
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-500 ${
                      activeCheckpoints > index
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/50'
                        : 'bg-slate-700/50'
                    }`}>
                      {checkpoint.emoji}
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <div className={`text-sm tracking-wider mb-1 transition-colors duration-500 ${
                        activeCheckpoints > index ? 'text-yellow-400' : 'text-slate-500'
                      }`}>
                        📍 {checkpoint.label}
                      </div>
                      <div className={`text-lg transition-colors duration-500 ${
                        activeCheckpoints > index ? 'text-white' : 'text-slate-600'
                      }`}>
                        {checkpoint.title}
                      </div>
                    </div>
                  </motion.div>

                  {/* Connecting line (arrow) */}
                  {index < checkpoints.length - 1 && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{
                        scaleY: activeCheckpoints > index ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, delay: index * 0.8 + 0.4 }}
                      className="absolute left-7 top-14 w-0.5 h-8 -mb-8 origin-top"
                      style={{
                        background: activeCheckpoints > index
                          ? 'linear-gradient(to bottom, rgba(251, 191, 36, 0.8), rgba(251, 191, 36, 0.2))'
                          : 'rgba(100, 116, 139, 0.3)'
                      }}
                    >
                      {/* Arrow head */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-yellow-400/80" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STAGE 1: Warning */}
        {stage === 1 && (
          <motion.div
            key="warning"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 text-center max-w-lg"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8 backdrop-blur-sm"
            >
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-3xl text-white mb-4 leading-tight">
                Většina podnikatelů<br/>
                nikdy nepřejde první míli
              </h2>
              <div className="flex items-center justify-center gap-4 text-2xl mb-4">
                <span className="text-yellow-400">START</span>
                <span className="text-white">→</span>
                <span className="text-red-400">KDO</span>
              </div>
              <p className="text-xl text-slate-300">
                Uvíznou v nejistotě.<br/>
                Nevědí, kam jít dál.
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 2: 2 možnosti */}
        {stage === 2 && (
          <motion.div
            key="choices"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 text-center max-w-lg"
          >
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl text-white mb-8"
            >
              Ty máš 2 možnosti:
            </motion.h2>

            <div className="space-y-4">
              {/* Option 1 */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800/50 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">1️⃣</div>
                  <div className="text-left flex-1">
                    <h3 className="text-xl text-white mb-2">Zkoušet a doufat</h3>
                    <p className="text-slate-400">
                      Měsíce ztraceného času<br/>
                      Pokusy naslepo<br/>
                      Dotazy "Co mám dělat?"
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Option 2 */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-xl p-6 backdrop-blur-sm shadow-lg shadow-green-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">2️⃣</div>
                  <div className="text-left flex-1">
                    <h3 className="text-xl text-green-400 mb-2">Mít mapu + průvodce</h3>
                    <p className="text-white">
                      90 minut struktury<br/>
                      Krok za krokem<br/>
                      Odpovědi "Co dělat TEĎKA"
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* STAGE 3: CTA */}
        {stage === 3 && (
          <motion.div
            key="cta"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 text-center max-w-md"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl mb-6">🗺️</div>
              <h2 className="text-3xl text-white mb-4">
                Podnikatelská Čtvrtka
              </h2>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 rounded-xl px-6 py-4 mb-6 inline-block">
                <div className="text-2xl mb-1">4 999 Kč</div>
                <div className="text-sm opacity-80">90 minut. Jeden model.</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
                <p className="text-lg text-white">
                  podnikatelskactvrtka.cz
                </p>
              </div>

              <p className="text-slate-400 text-sm">
                Jasná cesta. Jasný plán. Jasný úspěch.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              stage === i ? 'bg-yellow-400 w-8' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
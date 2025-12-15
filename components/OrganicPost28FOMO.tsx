import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, TrendingUp, Users, Target, AlertCircle } from 'lucide-react';

export function OrganicPost28FOMO() {
  const [stage, setStage] = useState(0);
  // 0: "Právě teď" counters
  // 1: "Co ty?" challenge
  // 2: "Realita" - co ztrácíš
  // 3: "2 možnosti" final

  const [counters, setCounters] = useState({
    validating: 42,
    tested: 18,
    saved: 12,
    found: 7,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Animated counters for stage 0 - numbers only go UP
  useEffect(() => {
    if (stage === 0) {
      const interval = setInterval(() => {
        setCounters(prev => ({
          validating: prev.validating + Math.floor(Math.random() * 3) + 1, // +1 to +3
          tested: prev.tested + (Math.random() > 0.6 ? 1 : 0), // occasionally +1
          saved: prev.saved + (Math.random() > 0.7 ? 1 : 0), // occasionally +1
          found: prev.found + (Math.random() > 0.8 ? 1 : 0), // occasionally +1
        }));
      }, 800);
      return () => clearInterval(interval);
    }
  }, [stage]);

  const lossItems = [
    { icon: Users, text: 'Konkurence testuje zákazníky', color: 'text-red-400' },
    { icon: TrendingUp, text: 'Trh se mění', color: 'text-orange-400' },
    { icon: Target, text: 'Příležitosti mizí', color: 'text-yellow-400' },
    { icon: Clock, text: 'Nápad stárne', color: 'text-red-400' },
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center overflow-hidden p-8">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Pulsing background circles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      <AnimatePresence mode="wait">
        {/* STAGE 0: "Právě teď" - live counters */}
        {stage === 0 && (
          <motion.div
            key="now"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center max-w-4xl w-full"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-10"
            >
              <div className="inline-block px-6 py-3 bg-blue-500/20 border border-blue-400/30 rounded-full mb-6">
                <span className="text-blue-300 text-sm uppercase tracking-wider font-bold">⏱️ Právě teď</span>
              </div>
              <h1 className="text-4xl md:text-6xl text-white mb-4 leading-tight">
                Zatímco čteš tento post...
              </h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-8"
              >
                <motion.div 
                  key={counters.validating}
                  initial={{ scale: 1.2, color: '#60a5fa' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  className="text-6xl font-black mb-3"
                >
                  {counters.validating}
                </motion.div>
                <p className="text-blue-200 text-lg">podnikatelů validuje nápad</p>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white/5 backdrop-blur-sm border border-green-400/20 rounded-2xl p-8"
              >
                <motion.div 
                  key={counters.tested}
                  initial={{ scale: 1.2, color: '#4ade80' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  className="text-6xl font-black mb-3"
                >
                  {counters.tested}
                </motion.div>
                <p className="text-green-200 text-lg">otestovalo první segment</p>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white/5 backdrop-blur-sm border border-orange-400/20 rounded-2xl p-8"
              >
                <motion.div 
                  key={counters.saved}
                  initial={{ scale: 1.2, color: '#fb923c' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  className="text-6xl font-black mb-3"
                >
                  {counters.saved}
                </motion.div>
                <p className="text-orange-200 text-lg">ušetřilo 50k+ špatnou investicí</p>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-8"
              >
                <motion.div 
                  key={counters.found}
                  initial={{ scale: 1.2, color: '#c084fc' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  className="text-6xl font-black mb-3"
                >
                  {counters.found}
                </motion.div>
                <p className="text-purple-200 text-lg">našlo ziskový kanál</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* STAGE 1: "Co ty?" */}
        {stage === 1 && (
          <motion.div
            key="you"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center max-w-3xl"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-8xl mb-8 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent font-black">
                A co TY?
              </h1>
            </motion.div>

            <div className="space-y-4 mt-12">
              {['„Ještě si to rozmyslím..."', '„Až budu mít čas..."', '„Možná to zkusím později..."'].map((text, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.15 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                >
                  <p className="text-2xl md:text-3xl text-slate-300 italic">{text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STAGE 2: "Realita" - co ztrácíš */}
        {stage === 2 && (
          <motion.div
            key="reality"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center max-w-4xl w-full"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-10"
            >
              <div className="inline-block px-6 py-3 bg-red-500/20 border border-red-400/30 rounded-full mb-6">
                <AlertCircle className="w-5 h-5 inline-block mr-2 text-red-400" />
                <span className="text-red-300 text-sm uppercase tracking-wider font-bold">Realita</span>
              </div>
              <h1 className="text-4xl md:text-6xl text-white mb-4 leading-tight">
                Zatímco ty váháš:
              </h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lossItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6 flex items-center gap-4"
                >
                  <div className="flex-shrink-0">
                    <item.icon className={`w-12 h-12 ${item.color}`} />
                  </div>
                  <div className="text-left">
                    <p className="text-xl text-white">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-10 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-8"
            >
              <p className="text-3xl md:text-4xl text-white font-bold">
                Každý den = <span className="text-red-400">Ztráta</span>
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 3: "2 možnosti" */}
        {stage === 3 && (
          <motion.div
            key="choice"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center max-w-4xl w-full"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-10"
            >
              <div className="inline-block px-6 py-3 bg-purple-500/20 border border-purple-400/30 rounded-full mb-6">
                <span className="text-purple-300 text-sm uppercase tracking-wider font-bold">🎯 Tvoje volba</span>
              </div>
              <h1 className="text-4xl md:text-6xl text-white mb-4 leading-tight">
                Dvě možnosti
              </h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8"
              >
                <div className="text-6xl mb-4">❌</div>
                <h3 className="text-3xl text-white font-bold mb-4">Čekat</h3>
                <p className="text-xl text-slate-300">
                  Další měsíc<br />
                  a doufat
                </p>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border-2 border-green-400/40 rounded-2xl p-8"
              >
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-3xl text-white font-bold mb-4">Jednat</h3>
                <p className="text-xl text-green-200">
                  90 minut<br />
                  a <strong className="text-white">VĚDĚT</strong>
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-10"
            >
              <p className="text-2xl md:text-3xl text-white leading-relaxed mb-6">
                Tvůj čas <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-black">tiká</span>
              </p>

              {/* CTA Button */}
              <motion.a
                href="/landing-page"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block mt-6 px-10 py-5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 rounded-full text-slate-900 text-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <span>🚀 Zjisti jak na to</span>
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              stage === i ? 'bg-white w-8' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
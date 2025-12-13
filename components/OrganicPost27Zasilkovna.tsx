/**
 * POST #27: ZÁSILKOVNA - JAK POSLALI POŠTU DO KOLEN
 * 
 * Koncept: Animated transformation - Problém (Pošta) → Inovace (Model) → Výsledky
 * Visual: Split screen s animovanými ikonami, pak BMC grid reveal
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Clock, MapPin, TrendingUp, Users, DollarSign } from 'lucide-react';

export function OrganicPost27Zasilkovna() {
  const [stage, setStage] = useState(0);
  // 0: Problém (pošta)
  // 1: Inovace (model)
  // 2: Výsledky (čísla)

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const problems = [
    { icon: Clock, text: 'Dlouhé fronty', color: 'text-red-500' },
    { icon: MapPin, text: 'Zavřeno když potřebuješ', color: 'text-red-500' },
    { icon: Package, text: 'Drahá doprava', color: 'text-red-500' },
  ];

  const solutions = [
    { icon: MapPin, text: '10,000+ výdejních míst', color: 'text-green-500' },
    { icon: Clock, text: '24/7 boxy', color: 'text-green-500' },
    { icon: DollarSign, text: 'Levnější než pošta', color: 'text-green-500' },
  ];

  const results = [
    { number: '10,000+', label: 'výdejních míst', color: 'from-orange-500 to-red-500' },
    { number: '10+ mld', label: 'hodnota Kč', color: 'from-purple-500 to-pink-500' },
    { number: '30+ zemí', label: 'rozšíření', color: 'from-blue-500 to-cyan-500' },
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden p-8">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <AnimatePresence mode="wait">
        {/* STAGE 0: Problém */}
        {stage === 0 && (
          <motion.div
            key="problem"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center max-w-4xl"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-block px-6 py-3 bg-red-500/20 border border-red-500/30 rounded-full mb-6">
                <span className="text-red-400 text-sm uppercase tracking-wider font-bold">Problém</span>
              </div>
              <h1 className="text-5xl md:text-7xl text-white mb-4 leading-tight">
                Česká pošta
                <span className="block mt-2 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  štvala lidi roky
                </span>
              </h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.15 }}
                  className="bg-white/5 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6"
                >
                  <problem.icon className={`w-12 h-12 ${problem.color} mx-auto mb-4`} />
                  <p className="text-white text-lg">{problem.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STAGE 1: Inovace */}
        {stage === 1 && (
          <motion.div
            key="solution"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center max-w-4xl"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-block px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-full mb-6">
                <span className="text-green-400 text-sm uppercase tracking-wider font-bold">Inovace</span>
              </div>
              <h1 className="text-5xl md:text-7xl text-white mb-4 leading-tight">
                Pak přišla
                <span className="block mt-2 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Zásilkovna
                </span>
              </h1>
              <p className="text-2xl text-slate-300 mt-4">
                Neřešili produkt. Změnili <strong className="text-white">model.</strong>
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.15 }}
                  className="bg-white/5 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6"
                >
                  <solution.icon className={`w-12 h-12 ${solution.color} mx-auto mb-4`} />
                  <p className="text-white text-lg">{solution.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STAGE 2: Výsledky */}
        {stage === 2 && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center max-w-4xl"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-block px-6 py-3 bg-purple-500/20 border border-purple-500/30 rounded-full mb-6">
                <span className="text-purple-400 text-sm uppercase tracking-wider font-bold">Výsledky</span>
              </div>
              <h1 className="text-5xl md:text-7xl text-white mb-4 leading-tight">
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Dominance
                </span>
              </h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.4 + index * 0.15,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
                >
                  <div className={`text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}>
                    {result.number}
                  </div>
                  <p className="text-slate-300 text-lg">{result.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12"
            >
              <p className="text-2xl text-white">
                Všechno začalo <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-bold">správným modelem</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {[0, 1, 2].map((i) => (
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

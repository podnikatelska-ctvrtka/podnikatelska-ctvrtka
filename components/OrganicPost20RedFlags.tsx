import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * 🎯 POST #20: RED FLAGS - Kdy do toho NEJÍT
 * Big bold flags planting animation
 */

export function OrganicPost20RedFlags() {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const timings = [3000, 3500, 3500, 3500, 3500, 3500, 4000, 5000];
    
    if (scene < 8) {
      const timer = setTimeout(() => {
        setScene(scene + 1);
      }, timings[scene]);
      
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setScene(0);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [scene]);

  const redFlags = [
    {
      number: "1",
      title: "MUSÍŠ JE PŘESVĚDČOVAT",
      subtitle: "Že problém vůbec mají"
    },
    {
      number: "2",
      title: "NEMAJÍ PENÍZE",
      subtitle: "Ideální zákazník si to nemůže dovolit"
    },
    {
      number: "3",
      title: "PŘESYCENÝ TRH BEZ DIFERENCIACE",
      subtitle: "Všichni to mají, ty nemáš nic navíc"
    },
    {
      number: "4",
      title: "DLOUHÝ PRODEJ",
      subtitle: "Rozhodnutí 6+ měsíců"
    },
    {
      number: "5",
      title: "NEZNÁŠ POČET POTENCIÁLNÍCH ZÁKAZNÍKŮ",
      subtitle: "Možná jich je 20 možná 2000"
    }
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-red-500 via-rose-600 to-orange-600 overflow-hidden">
      
      <AnimatePresence>
        
        {/* SCÉNA 0: Hook */}
        {scene === 0 && (
          <motion.div
            key="scene0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-12"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-9xl mb-6"
              >
                💡
              </motion.div>
              <h1 className="text-6xl font-black text-white leading-tight mb-4">
                "MÁM NÁPAD<br/>
                NA BYZNYS!"
              </h1>
              <p className="text-2xl text-white/80 italic">
                Ale měl bys do toho jít?
              </p>
            </div>
          </motion.div>
        )}

        {/* SCÉNA 1: Warning intro */}
        {scene === 1 && (
          <motion.div
            key="scene1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-12"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-8xl mb-6">🚩</div>
              <h2 className="text-5xl font-black text-white mb-4">
                5 ČERVENÝCH VLAJEK
              </h2>
              <p className="text-2xl text-white/90">
                Kdy do toho NEJÍT
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* SCÉNY 2-6: Jednotlivé červené vlajky */}
        {scene >= 2 && scene <= 6 && (
          <motion.div
            key={`flag-${scene}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center p-12"
          >
            <div className="flex items-start gap-8 max-w-5xl">
              
              {/* Flag pole + flag */}
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 150, 
                  damping: 15,
                  delay: 0.2 
                }}
                className="relative flex-shrink-0"
              >
                {/* Flag */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="relative"
                  style={{ transformOrigin: "left" }}
                >
                  <div className="w-64 h-48 bg-white rounded-r-2xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-rose-700" />
                    <div className="text-9xl font-black text-white z-10">
                      {redFlags[scene - 2].number}
                    </div>
                    {/* Wave effect */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 2, 0, -2, 0],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    />
                  </div>
                </motion.div>
                
                {/* Pole */}
                <div className="w-3 h-96 bg-gray-800 absolute top-0 -left-3 rounded-full" />
              </motion.div>

              {/* Text content */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex-1 pt-8"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                  <h3 className="text-4xl font-black text-gray-900 mb-3 leading-tight">
                    {redFlags[scene - 2].title}
                  </h3>
                  <p className="text-2xl text-gray-700">
                    {redFlags[scene - 2].subtitle}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* SCÉNA 7: Green signals */}
        {scene === 7 && (
          <motion.div
            key="scene7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 flex items-center justify-center p-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-center max-w-4xl"
            >
              <div className="text-8xl mb-6">✅</div>
              <h2 className="text-5xl font-black text-white mb-6">
                DOBRÉ SIGNÁLY
              </h2>
              <div className="space-y-4">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/95 rounded-2xl p-6"
                >
                  <p className="text-2xl text-gray-900">
                    ✨ Lidé AKTIVNĚ hledají řešení
                  </p>
                </motion.div>
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/95 rounded-2xl p-6"
                >
                  <p className="text-2xl text-gray-900">
                    💰 Mají peníze na zaplacení
                  </p>
                </motion.div>
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white/95 rounded-2xl p-6"
                >
                  <p className="text-2xl text-gray-900">
                    📈 Konkurence existuje a vydělává
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* SCÉNA 8: CTA */}
        {scene === 8 && (
          <motion.div
            key="scene8"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
              className="text-center max-w-3xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-7xl mb-6"
              >
                🎯
              </motion.div>
              
              <h2 className="text-5xl font-black text-white mb-4 leading-tight">
                UŠETŘI SI<br/>
                <span className="text-red-500">6 MĚSÍCŮ ZKOUŠENÍ</span>
              </h2>
              
              <p className="text-2xl text-gray-300 mb-8">
                Nauč se validovat PŘED investicí
              </p>

              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-10 shadow-2xl">
                <div className="text-sm uppercase tracking-wider text-green-100 mb-2">
                  Podnikatelská Čtvrtka
                </div>
                <div className="text-7xl font-black text-white mb-4">
                  4 999 Kč
                </div>
                <div className="space-y-2 text-lg text-white/90">
                  <div>✅ Celý validační checklist</div>
                  <div>✅ Červené i zelené vlajky</div>
                  <div>✅ Data, ne dohady</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
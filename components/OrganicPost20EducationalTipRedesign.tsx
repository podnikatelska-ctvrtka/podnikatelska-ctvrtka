import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * 🎯 POST #20: EDUCATIONAL TIP REDESIGN - Phone Tutorial Style
 * Vypadá jako Instagram tutorial na mobilu - interaktivní, moderní
 */

export function OrganicPost20EducationalTipRedesign() {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const timings = [3500, 3500, 3500, 3500, 4000, 5000];
    
    if (scene < 6) {
      const timer = setTimeout(() => {
        setScene(scene + 1);
      }, timings[scene]);
      
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setScene(0);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [scene]);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex items-center justify-center p-8">
      
      {/* Phone mockup */}
      <div className="relative w-[420px] h-[860px] bg-black rounded-[50px] shadow-2xl p-3">
        {/* Phone screen */}
        <div className="w-full h-full bg-white rounded-[42px] overflow-hidden relative">
          
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50" />

          {/* Screen content */}
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
            
            <AnimatePresence mode="wait">
              
              {/* SCÉNA 1: Hook */}
              {scene === 0 && (
                <motion.div
                  key="scene1"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8"
                >
                  <div className="text-center space-y-4">
                    <div className="text-6xl mb-4">🤔</div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                      <h1 className="text-3xl font-black text-gray-900 leading-tight">
                        "JE TO<br/>
                        <span className="text-blue-600">DOST VELKÝ</span><br/>
                        TRH?"
                      </h1>
                    </div>
                    <p className="text-gray-600 text-lg italic">
                      Nejčastější otázka
                    </p>
                  </div>
                </motion.div>
              )}

              {/* SCÉNA 2: Problém */}
              {scene === 1 && (
                <motion.div
                  key="scene2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex flex-col p-8 pt-16 gap-4"
                >
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-2">❌</div>
                    <h2 className="text-2xl font-black text-red-600">
                      VĚTŠINA TO DĚLÁ ŠPATNĚ
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white rounded-2xl p-4 shadow-md"
                    >
                      <p className="text-gray-800 text-base">
                        💭 "Určitě ano!"
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white rounded-2xl p-4 shadow-md"
                    >
                      <p className="text-gray-800 text-base">
                        📊 Googling statistik
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="bg-white rounded-2xl p-4 shadow-md"
                    >
                      <p className="text-gray-800 text-base">
                        🎲 Házení peněz
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* SCÉNA 3: Řešení intro */}
              {scene === 2 && (
                <motion.div
                  key="scene3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">✨</div>
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 shadow-xl text-white">
                      <h2 className="text-3xl font-black mb-2">
                        5 MINUT
                      </h2>
                      <p className="text-xl">
                        Jednoduchý trik
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SCÉNA 4: Tutorial - Krok 1 */}
              {scene === 3 && (
                <motion.div
                  key="scene4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex flex-col p-6 pt-14"
                >
                  {/* Progress bar */}
                  <div className="flex gap-1 mb-6">
                    <div className="flex-1 h-1 bg-blue-500 rounded-full" />
                    <div className="flex-1 h-1 bg-gray-300 rounded-full" />
                    <div className="flex-1 h-1 bg-gray-300 rounded-full" />
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 shadow-xl text-white w-full">
                      <div className="text-5xl font-black mb-4">1</div>
                      <h3 className="text-2xl font-black mb-3">
                        Facebook Ad Library
                      </h3>
                      <p className="text-blue-100 text-base">
                        Otevři (zdarma, bez registrace)
                      </p>
                      <p className="text-blue-100 text-base mt-2">
                        Vyhledej konkurenci ve tvém oboru
                      </p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6 bg-white/90 backdrop-blur rounded-2xl p-4 shadow-md w-full"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">💡</div>
                        <p className="text-gray-700 text-sm">
                          Nejrychlejší způsob jak zjistit kdo v oboru funguje
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* SCÉNA 5: Tutorial - Kroky 2 a 3 */}
              {scene === 4 && (
                <motion.div
                  key="scene5"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex flex-col p-6 pt-14"
                >
                  {/* Progress bar */}
                  <div className="flex gap-1 mb-6">
                    <div className="flex-1 h-1 bg-blue-500 rounded-full" />
                    <div className="flex-1 h-1 bg-blue-500 rounded-full" />
                    <div className="flex-1 h-1 bg-blue-500 rounded-full" />
                  </div>

                  <div className="flex-1 flex flex-col gap-4 justify-center">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-5 shadow-xl text-white">
                      <div className="text-4xl font-black mb-2">2</div>
                      <h3 className="text-xl font-black mb-2">
                        Kolik jich běží?
                      </h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-green-300">✓</span>
                          <span>5+ firem = solidní trh</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-300">✗</span>
                          <span>0-2 firmy = problém</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-5 shadow-xl text-white">
                      <div className="text-4xl font-black mb-2">3</div>
                      <h3 className="text-xl font-black mb-2">
                        Jak dlouho běží?
                      </h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-green-300">✓</span>
                          <span>6+ měsíců = funguje</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-300">?</span>
                          <span>Pár dní = test/fail</span>
                        </div>
                      </div>
                    </div>
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
                  className="absolute inset-0 flex flex-col items-center justify-center p-8"
                >
                  <div className="text-center space-y-4">
                    <div className="text-5xl mb-2">🎯</div>
                    <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl">
                      <h2 className="text-2xl font-black text-gray-900 leading-tight mb-3">
                        TOHLE JE<br/>
                        <span className="text-purple-600">JEN ZAČÁTEK</span>
                      </h2>
                      <p className="text-gray-600 text-sm mb-4">
                        Celý systém validace na Čtvrtce
                      </p>
                      
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-5 text-white">
                        <div className="text-xs uppercase tracking-wide mb-1">
                          Podnikatelská Čtvrtka
                        </div>
                        <div className="text-4xl font-black mb-2">
                          4 999 Kč
                        </div>
                        <div className="text-xs space-y-1">
                          <div>✅ 90 min • Validace</div>
                          <div>✅ Jasný Model</div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-500 text-xs italic">
                      Data, ne dohady
                    </p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Shadow under phone */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-black/20 blur-3xl rounded-full -z-10" />
    </div>
  );
}

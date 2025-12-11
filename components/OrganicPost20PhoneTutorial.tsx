import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * 🎯 POST #20: PHONE TUTORIAL - Červené vlajky: Kdy do toho NEJÍT
 * Phone screen tutorial style - warning signs checklist
 */

export function OrganicPost20PhoneTutorial() {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const timings = [3500, 3500, 3500, 4000, 4000, 5000];
    
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
          <div className="w-full h-full bg-gradient-to-br from-red-50 to-orange-50 overflow-hidden">
            
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
                    <div className="text-6xl mb-4">💡</div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                      <h1 className="text-3xl font-black text-gray-900 leading-tight">
                        "MÁM NÁPAD<br/>
                        <span className="text-blue-600">NA BYZNYS!"</span>
                      </h1>
                    </div>
                    <p className="text-gray-600 text-lg italic">
                      Ale měl bys do toho jít?
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
                    <div className="text-5xl mb-2">😬</div>
                    <h2 className="text-2xl font-black text-red-600">
                      VĚTŠINA JDE NASLEPO
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
                        💸 Investuje prachy
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white rounded-2xl p-4 shadow-md"
                    >
                      <p className="text-gray-800 text-base">
                        ⏰ Ztrácí měsíce času
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="bg-white rounded-2xl p-4 shadow-md"
                    >
                      <p className="text-gray-800 text-base">
                        💔 A pak zjistí že to nejde
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
                    <div className="text-6xl mb-4">🚩</div>
                    <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-3xl p-8 shadow-xl text-white">
                      <h2 className="text-3xl font-black mb-2">
                        5 MINUT
                      </h2>
                      <p className="text-xl">
                        Checklist PŘED startem
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SCÉNA 4: Červené vlajky 1-3 */}
              {scene === 3 && (
                <motion.div
                  key="scene4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex flex-col p-6 pt-12"
                >
                  <div className="text-center mb-3">
                    <h3 className="text-lg font-black text-red-600">
                      ČERVENÉ VLAJKY
                    </h3>
                    <p className="text-xs text-gray-600">Kdy do toho NEJÍT</p>
                  </div>

                  <div className="flex-1 flex flex-col gap-2.5 justify-center">
                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white rounded-2xl p-3.5 shadow-lg border-l-4 border-red-500"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="text-2xl">1️⃣</div>
                        <div>
                          <h4 className="text-sm font-black text-gray-900 mb-0.5">
                            MUSÍŠ JE PŘESVĚDČOVAT
                          </h4>
                          <p className="text-gray-700 text-xs">
                            Že ten problém mají a potřebují řešení
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white rounded-2xl p-3.5 shadow-lg border-l-4 border-red-500"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="text-2xl">2️⃣</div>
                        <div>
                          <h4 className="text-sm font-black text-gray-900 mb-0.5">
                            NEMAJÍ PENÍZE
                          </h4>
                          <p className="text-gray-700 text-xs">
                            Tvůj ideální zákazník si to nemůže dovolit
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="bg-white rounded-2xl p-3.5 shadow-lg border-l-4 border-red-500"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="text-2xl">3️⃣</div>
                        <div>
                          <h4 className="text-sm font-black text-gray-900 mb-0.5">
                            KONKURENCE = ZDARMA
                          </h4>
                          <p className="text-gray-700 text-xs">
                            To co ty prodáváš, jiní dávají zadarmo
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* SCÉNA 5: Červené vlajky 4-5 + zelené */}
              {scene === 4 && (
                <motion.div
                  key="scene5"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex flex-col p-6 pt-12"
                >
                  <div className="flex-1 flex flex-col gap-2.5 justify-center">
                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white rounded-2xl p-3.5 shadow-lg border-l-4 border-red-500"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="text-2xl">4️⃣</div>
                        <div>
                          <h4 className="text-sm font-black text-gray-900 mb-0.5">
                            DLOUHÝ PRODEJNÍ CYKLUS
                          </h4>
                          <p className="text-gray-700 text-xs">
                            Rozhodnutí trvá 6+ měsíců, složitý proces
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white rounded-2xl p-3.5 shadow-lg border-l-4 border-red-500"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="text-2xl">5️⃣</div>
                        <div>
                          <h4 className="text-sm font-black text-gray-900 mb-0.5">
                            JEN TY TO VIDÍŠ
                          </h4>
                          <p className="text-gray-700 text-xs">
                            Nikdo jiný ten problém neřeší = možná neexistuje
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <div className="h-px bg-gray-300 my-1" />

                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-3.5 shadow-lg text-white"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="text-2xl">✅</div>
                        <div>
                          <h4 className="text-sm font-black mb-0.5">
                            DOBRÉ SIGNÁLY
                          </h4>
                          <p className="text-xs text-green-50">
                            Lidé aktivně hledají řešení • Mají peníze • Konkurence existuje a vydělává
                          </p>
                        </div>
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
                  className="absolute inset-0 flex flex-col items-center justify-center p-8"
                >
                  <div className="text-center space-y-4">
                    <div className="text-5xl mb-2">🎯</div>
                    <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl">
                      <h2 className="text-2xl font-black text-gray-900 leading-tight mb-3">
                        UŠETŘI SI<br/>
                        <span className="text-red-600">6 MĚSÍCŮ</span>
                      </h2>
                      <p className="text-gray-600 text-sm mb-4">
                        Nauč se validovat PŘED investicí
                      </p>
                      
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-5 text-white">
                        <div className="text-xs uppercase tracking-wide mb-1">
                          Podnikatelská Čtvrtka
                        </div>
                        <div className="text-4xl font-black mb-2">
                          4 999 Kč
                        </div>
                        <div className="text-xs space-y-1">
                          <div>✅ Celý validační checklist</div>
                          <div>✅ Červené i zelené vlajky</div>
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
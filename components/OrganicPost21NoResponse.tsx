import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * 🎯 POST #21: PROČ SE TI NIKDO NEOZVE ZPĚT
 * Sticky notes / whiteboard style - empatie + quick wins
 */

export function OrganicPost21NoResponse() {
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
    <div className="relative w-full h-full bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
      
      {/* Cork board texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900 via-transparent to-transparent" />
      
      <AnimatePresence mode="wait">
        
        {/* SCÉNA 1: Hook - Empatie */}
        {scene === 0 && (
          <motion.div
            key="scene1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, rotate: -5 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-12"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-8xl mb-6">📱</div>
              
              {/* Sticky note style */}
              <div className="bg-yellow-200 rounded-lg p-8 shadow-2xl rotate-[-2deg] border-t-8 border-yellow-300 max-w-2xl relative">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-400/40 rounded-b-lg" />
                
                <h1 className="text-5xl font-black text-gray-900 leading-tight mb-4">
                  "POSLAL JSEM<br/>
                  NABÍDKU..."
                </h1>
                <div className="h-1 w-32 bg-gray-400 mx-auto mb-4" />
                <p className="text-3xl text-gray-700 italic">
                  ...a ticho 🦗
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* SCÉNA 2: Frustrace */}
        {scene === 1 && (
          <motion.div
            key="scene2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-12 gap-6"
          >
            <div className="text-center mb-4">
              <div className="text-7xl mb-3">😤</div>
              <h2 className="text-4xl font-black text-gray-900">
                ZNÁŠ TO?
              </h2>
            </div>

            <div className="max-w-2xl space-y-4">
              <motion.div
                initial={{ x: -50, opacity: 0, rotate: -3 }}
                animate={{ x: 0, opacity: 1, rotate: -2 }}
                transition={{ delay: 0.2 }}
                className="bg-pink-200 rounded-lg p-6 shadow-lg border-l-4 border-pink-400"
              >
                <p className="text-xl text-gray-800">
                  ✉️ Posíláš nabídky
                </p>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0, rotate: 3 }}
                animate={{ x: 0, opacity: 1, rotate: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-blue-200 rounded-lg p-6 shadow-lg border-l-4 border-blue-400"
              >
                <p className="text-xl text-gray-800">
                  ⏰ Čekáš 3 dny
                </p>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0, rotate: -3 }}
                animate={{ x: 0, opacity: 1, rotate: -1 }}
                transition={{ delay: 0.6 }}
                className="bg-purple-200 rounded-lg p-6 shadow-lg border-l-4 border-purple-400"
              >
                <p className="text-xl text-gray-800">
                  🤷 Pošleš follow-up
                </p>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0, rotate: 3 }}
                animate={{ x: 0, opacity: 1, rotate: 2 }}
                transition={{ delay: 0.8 }}
                className="bg-red-200 rounded-lg p-6 shadow-lg border-l-4 border-red-400"
              >
                <p className="text-xl text-gray-800 font-black">
                  🦗 TICHO
                </p>
              </motion.div>
            </div>
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
            className="absolute inset-0 flex flex-col items-center justify-center p-12"
          >
            <div className="text-center max-w-2xl">
              <div className="text-8xl mb-6">💡</div>
              
              <div className="bg-gradient-to-br from-amber-300 to-orange-300 rounded-2xl p-10 shadow-2xl rotate-[-1deg] border-4 border-amber-400">
                <p className="text-4xl font-black text-gray-900 italic leading-tight">
                  "Není to o tobě.<br/>
                  Je to o <span className="text-red-600">NABÍDCE</span>."
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* SCÉNA 4: 3 důvody - whiteboard style */}
        {scene === 3 && (
          <motion.div
            key="scene4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-12 gap-6"
          >
            <div className="text-center mb-3">
              <h2 className="text-4xl font-black text-gray-900">
                3 DŮVODY PROČ TICHO
              </h2>
              <div className="h-1 w-48 bg-gray-900 mx-auto mt-2" />
            </div>

            <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto w-full">
              <motion.div
                initial={{ x: -50, opacity: 0, rotate: -2 }}
                animate={{ x: 0, opacity: 1, rotate: -1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-xl border-l-8 border-red-500"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl font-black text-red-500">1</div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">
                      NEŘEŠÍŠ BOLEST
                    </h3>
                    <p className="text-gray-700 text-lg leading-snug">
                      Píšeš "Nabízím XYZ"<br/>
                      Místo: "Řeším tvůj problém ABC"
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0, rotate: 2 }}
                animate={{ x: 0, opacity: 1, rotate: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-xl border-l-8 border-orange-500"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl font-black text-orange-500">2</div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">
                      MOC KOMPLIKOVANÉ
                    </h3>
                    <p className="text-gray-700 text-lg leading-snug">
                      3 paragrafy textu<br/>
                      Místo: 1 jasný benefit
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -50, opacity: 0, rotate: -2 }}
                animate={{ x: 0, opacity: 1, rotate: -1 }}
                transition={{ delay: 0.7 }}
                className="bg-white rounded-xl p-6 shadow-xl border-l-8 border-purple-500"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl font-black text-purple-500">3</div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">
                      NEJASNÝ DALŠÍ KROK
                    </h3>
                    <p className="text-gray-700 text-lg leading-snug">
                      "Dej vědět když budeš chtít"<br/>
                      Místo: "Máš čas ve čtvrtek 14:00?"
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* SCÉNA 5: Quick wins */}
        {scene === 4 && (
          <motion.div
            key="scene5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-12 gap-6"
          >
            <div className="text-center mb-4">
              <div className="text-7xl mb-3">✅</div>
              <h2 className="text-4xl font-black text-gray-900">
                JAK NA TO
              </h2>
            </div>

            <div className="bg-gradient-to-br from-green-200 to-emerald-300 rounded-2xl p-8 shadow-2xl max-w-2xl border-4 border-green-400 rotate-[1deg]">
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <div className="text-xl font-black text-gray-900">Jasný benefit</div>
                    <p className="text-gray-800">"Ušetřím ti 5 hodin týdně"</p>
                  </div>
                </div>

                <div className="h-px bg-green-500/30" />

                <div className="flex items-start gap-3">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <div className="text-xl font-black text-gray-900">Krátce a jasně</div>
                    <p className="text-gray-800">Max 3 věty, 1 otázka</p>
                  </div>
                </div>

                <div className="h-px bg-green-500/30" />

                <div className="flex items-start gap-3">
                  <div className="text-2xl">📅</div>
                  <div>
                    <div className="text-xl font-black text-gray-900">Konkrétní výzva</div>
                    <p className="text-gray-800">"Zavolat zítra v 10?"</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* SCÉNA 6: Soft CTA */}
        {scene === 5 && (
          <motion.div
            key="scene6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-12 gap-6"
          >
            <div className="text-center max-w-2xl space-y-6">
              <div className="text-7xl mb-3">🚀</div>
              
              <div className="bg-white rounded-2xl p-8 shadow-2xl rotate-[-1deg] border-t-4 border-blue-500">
                <h2 className="text-4xl font-black text-gray-900 leading-tight mb-4">
                  TOHLE JE<br/>
                  <span className="text-blue-600">ZÁKLAD</span>
                </h2>
                <p className="text-xl text-gray-700">
                  Správná komunikace = více odpovědí
                </p>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 shadow-xl text-white rotate-[1deg]"
              >
                <div className="text-sm uppercase tracking-wide mb-1 opacity-90">
                  Podnikatelská Čtvrtka
                </div>
                <div className="text-5xl font-black mb-2">
                  4 999 Kč
                </div>
                <p className="text-sm opacity-90">
                  Celý Model včetně komunikace se zákazníky
                </p>
              </motion.div>

              <p className="text-gray-600 italic text-lg">
                Správná nabídka • Správná komunikace • Správný timing
              </p>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Floating thumbtacks */}
      {scene < 5 && (
        <>
          <motion.div
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-20 left-20 text-4xl opacity-30"
          >
            📌
          </motion.div>
          <motion.div
            animate={{ rotate: [0, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute top-32 right-24 text-4xl opacity-30"
          >
            📌
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-40 left-32 text-4xl opacity-30"
          >
            📌
          </motion.div>
        </>
      )}

      {/* Progress dots */}
      {scene < 5 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-3 rounded-full transition-all duration-300 ${
                i === scene 
                  ? 'w-12 bg-amber-600' 
                  : i < scene 
                    ? 'w-8 bg-amber-400' 
                    : 'w-8 bg-amber-200'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
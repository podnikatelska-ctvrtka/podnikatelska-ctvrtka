/**
 * POST #26: "KOLIK STOJÍ TVŮJ ČAS?"
 * 
 * Koncept: Kalkulačka revelující skutečnou hodinovou sazbu (často méně než v práci)
 * Pointa: Bez jasného modelu nevíš kde tratíš čas a peníze
 * Angle: Reality check - tvůj čas je investice
 * Format: 4:5 (vertical) - ANIMATED
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function OrganicPost26TimeValue() {
  const [stage, setStage] = useState(0);
  const [calculatedRate, setCalculatedRate] = useState(0);
  const [realRate, setRealRate] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage === 0) {
        // Stage 0: Question intro (3s → déle)
        setStage(1);
      } else if (stage === 1) {
        // Stage 1: Kalkulačka appear (2s → déle)
        setTimeout(() => setStage(2), 2000);
      } else if (stage === 2) {
        // Stage 2: Calculation animation (3s → pomalejší)
        // Animuj číslo od 0 do 250 POMALEJI
        let count = 0;
        const interval = setInterval(() => {
          count += 10;
          setCalculatedRate(Math.min(count, 250));
          if (count >= 250) {
            clearInterval(interval);
            setTimeout(() => setStage(3), 1500); // Pauza po dokončení
          }
        }, 80); // POMALEJI (bylo 40ms)
      } else if (stage === 3) {
        // Stage 3: Reality check (4s → déle na přečtení)
        // Animuj reálnou sazbu POMALEJI
        let count = 250;
        const interval = setInterval(() => {
          count -= 10;
          setRealRate(Math.max(count, 100));
          if (count <= 100) {
            clearInterval(interval);
            setTimeout(() => setStage(4), 2500); // Víc času na přečtení textu
          }
        }, 100); // POMALEJI (bylo 60ms)
      } else if (stage === 4) {
        // Stage 4: Comparison with job (4s → déle)
        setTimeout(() => setStage(5), 4000);
      } else if (stage === 5) {
        // Stage 5: Why? (4s → déle)
        setTimeout(() => setStage(6), 4000);
      } else if (stage === 6) {
        // Stage 6: Solution (5s → déle na přečtení CTA)
        setTimeout(() => {
          // Reset
          setStage(0);
          setCalculatedRate(0);
          setRealRate(0);
        }, 5000);
      }
    }, stage === 0 ? 3000 : 0); // První stage déle (3s)

    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
      
      <AnimatePresence mode="wait">
        
        {/* STAGE 0: Question */}
        {stage === 0 && (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full h-full flex items-center justify-center px-12 bg-gradient-to-br from-blue-50 to-indigo-50"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="text-[96px] mb-8"
              >
                ⏰
              </motion.div>
              
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[56px] leading-tight"
              >
                <span className="font-black">Kolik SKUTEČNĚ<br/>vyděláš za hodinu?</span>
              </motion.h1>
            </div>
          </motion.div>
        )}

        {/* STAGE 1: Calculator intro */}
        {stage === 1 && (
          <motion.div
            key="calc-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center px-12 bg-gradient-to-br from-slate-100 to-slate-200"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-12 shadow-2xl max-w-4xl w-full"
            >
              <div className="text-center mb-10">
                <div className="text-[48px] font-black text-slate-900">📊 Rychlá kalkulačka</div>
              </div>

              <div className="space-y-8">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200"
                >
                  <div className="text-[24px] text-gray-700 mb-2">Vydělal jsi minulý měsíc:</div>
                  <div className="text-[64px] font-black text-green-600">50 000 Kč</div>
                </motion.div>

                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200"
                >
                  <div className="text-[24px] text-gray-700 mb-2">Odpracoval jsi:</div>
                  <div className="text-[64px] font-black text-blue-600">200 hodin</div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 2: Calculation */}
        {stage === 2 && (
          <motion.div
            key="calculation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center px-12 bg-gradient-to-br from-purple-50 to-pink-50"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
                className="text-[80px] mb-8"
              >
                💰
              </motion.div>

              <div className="text-[40px] text-gray-700 mb-6">Tvoje hodinová sazba:</div>
              
              <motion.div
                className="text-[120px] font-black text-purple-600"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                {calculatedRate} Kč/hod
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: calculatedRate === 250 ? 1 : 0 }}
                className="text-[32px] text-gray-600 mt-8"
              >
                Zní to dobře... nebo ne?
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* STAGE 3: Reality check */}
        {stage === 3 && (
          <motion.div
            key="reality"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center px-12 bg-gradient-to-br from-red-50 to-orange-50"
          >
            <div className="text-center max-w-5xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
                className="text-[96px] mb-8"
              >
                ❌
              </motion.div>

              <div className="text-[48px] font-black text-red-600 mb-10">ALE POZOR!</div>

              <div className="bg-white/80 backdrop-blur rounded-3xl p-10 mb-10">
                <div className="text-[28px] text-gray-700 mb-6">Z toho musíš odečíst:</div>
                <div className="space-y-4 text-[24px] text-gray-600 text-left max-w-2xl mx-auto">
                  <div>- Náklady na provoz</div>
                  <div>- Daně a pojištění</div>
                  <div>- Čas na administrativu</div>
                  <div>- Marketing který nefunguje</div>
                </div>
              </div>

              <div className="text-[40px] text-gray-700 mb-4">💔 REALITA:</div>
              <motion.div
                className="text-[100px] font-black text-red-600"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                {realRate} Kč/hod
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* STAGE 4: Comparison */}
        {stage === 4 && (
          <motion.div
            key="comparison"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center px-12 bg-gradient-to-br from-slate-800 to-slate-900"
          >
            <div className="text-center max-w-5xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-[96px] mb-8"
              >
                💼
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[52px] leading-tight text-white font-black mb-12"
              >
                Méně než dostaneš<br/>
                <span className="text-red-400">v práci.</span>
              </motion.h2>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white/10 backdrop-blur rounded-3xl p-10"
              >
                <div className="text-[28px] text-white/90 mb-6">A v práci:</div>
                <div className="space-y-4 text-[24px] text-emerald-300 text-left max-w-2xl mx-auto">
                  <div>✅ Nemáš stres z faktur</div>
                  <div>✅ Nemáš nespavé noci</div>
                  <div>✅ Nemáš strach co bude zítra</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* STAGE 5: Why? */}
        {stage === 5 && (
          <motion.div
            key="why"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center px-12 bg-gradient-to-br from-orange-50 to-yellow-50"
          >
            <div className="text-center max-w-5xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="text-[96px] mb-8"
              >
                💡
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[56px] leading-tight font-black text-slate-900 mb-12"
              >
                PROČ SE TO DĚJE?
              </motion.h2>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-3xl p-10 shadow-2xl"
              >
                <div className="text-[40px] font-black text-orange-600 mb-8">
                  Protože nemáš jasný MODEL
                </div>
                
                <div className="space-y-6 text-[24px] text-gray-700 text-left max-w-3xl mx-auto">
                  <div>❌ Kolik OPRAVDU stojí získání zákazníka</div>
                  <div>❌ Která práce ti dělá ZISK a která ztrátu</div>
                  <div>❌ Kde tratíš čas na zbytečnosti</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* STAGE 6: Solution/CTA */}
        {stage === 6 && (
          <motion.div
            key="solution"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center px-12 bg-gradient-to-br from-green-50 to-emerald-50"
          >
            <div className="text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[72px] mb-8"
              >
                🎯
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[56px] leading-tight mb-10 font-black text-slate-900"
              >
                ŘEŠ TO TEĎ
              </motion.h2>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[32px] text-gray-700 mb-12 max-w-3xl mx-auto"
              >
                Ne za měsíc.<br/>
                Ne až "bude čas".<br/>
                <span className="font-black text-red-600">TEĎ.</span>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-white rounded-3xl px-10 py-8 shadow-2xl border-4 border-green-500 max-w-4xl mx-auto mb-10"
              >
                <p className="text-[32px] leading-tight text-gray-900 mb-6">
                  <span className="font-black text-green-700">Podnikatelská Čtvrtka ti ukáže:</span>
                </p>
                <div className="text-[24px] text-gray-700 space-y-3 text-left max-w-2xl mx-auto">
                  <div>→ Kde tratíš čas (a peníze)</div>
                  <div>→ Jak zvýšit hodnotu každé hodiny</div>
                  <div>→ Jak vybudovat byznys který má smysl</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="text-[28px] text-gray-600 mb-8 max-w-3xl mx-auto"
              >
                <span className="font-black">90 minut investice</span> = roky lepších rozhodnutí
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="bg-gradient-to-r from-orange-600 to-red-600 px-12 py-6 rounded-full shadow-2xl"
              >
                <p className="text-white text-[28px] font-black">
                  podnikatelskactvrtka.cz
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Progress dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className={`rounded-full transition-all ${
              i === stage 
                ? 'w-10 h-2.5 bg-orange-500' 
                : 'w-2.5 h-2.5 bg-slate-400/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
/**
 * POST #24: SPLIT SCREEN - "2 PODNIKATELÉ"
 * 
 * Koncept: Side-by-side comparison s ANIMACÍ
 * ❌ Chaotický podnikatel (bez modelu)
 * ✅ Systematický podnikatel (s modelem)
 * Format: 4:5 (vertical) - ANIMATED
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function OrganicPost24SplitScreen() {
  const [stage, setStage] = useState(0);
  const [visibleItems, setVisibleItems] = useState(0);

  const chaosTimeline = [
    { time: '7:00', emoji: '😰', title: 'Panika', desc: 'Co dnes vlastně dělat?' },
    { time: '10:00', emoji: '🤔', title: 'Hádání', desc: 'Kam dát peníze?' },
    { time: '14:00', emoji: '💸', title: 'Další neúspěšná', desc: 'reklama za 5000 Kč' },
    { time: '18:00', emoji: '😤', title: 'Frustrace', desc: 'Pořád žádné výsledky' },
    { time: '22:00', emoji: '😫', title: 'Nemůžu spát', desc: 'Myslím na problémy' },
  ];

  const systemTimeline = [
    { time: '7:00', emoji: '☕', title: 'Klid', desc: 'Vím přesně co dělat' },
    { time: '10:00', emoji: '📊', title: 'Data', desc: 'Jasné priority' },
    { time: '14:00', emoji: '🎯', title: 'Cílená investice', desc: 'Do toho co funguje' },
    { time: '18:00', emoji: '✅', title: '+3 zákazníci', desc: 'Byznys roste' },
    { time: '22:00', emoji: '😴', title: 'Spím klidně', desc: 'Všechno sedí' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage === 0) {
        // Stage 0: Intro (2s)
        setStage(1);
      } else if (stage === 1) {
        // Stage 1: Timeline items přibývají (každých 0.6s)
        if (visibleItems < 5) {
          setVisibleItems(prev => prev + 1);
        } else {
          setTimeout(() => setStage(2), 1000);
        }
      } else if (stage === 2) {
        // Stage 2: Rozdíl message (3s)
        setTimeout(() => setStage(3), 3000);
      } else if (stage === 3) {
        // Stage 3: CTA (3s)
        setTimeout(() => {
          // Reset pro loop
          setStage(0);
          setVisibleItems(0);
        }, 3000);
      }
    }, stage === 0 ? 2000 : stage === 1 ? 600 : 0);

    return () => clearTimeout(timer);
  }, [stage, visibleItems]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
      
      <AnimatePresence mode="wait">
        
        {/* STAGE 0: Intro */}
        {stage === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full h-full flex items-center justify-center px-12"
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
                className="text-[56px] leading-tight mb-6"
              >
                <span className="font-black">Den v životě</span><br/>
                <span className="text-[48px]">2 podnikatelů</span>
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-[36px] text-slate-600"
              >
                Chaos vs Systém
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* STAGE 1: Split screen timeline */}
        {stage === 1 && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-8 px-6">
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-white text-center text-[40px] leading-tight"
              >
                Den v životě<br/>
                <span className="font-black">2 podnikatelů</span>
              </motion.h1>
            </div>

            {/* Main split container */}
            <div className="flex h-[calc(100%-140px)]">
              
              {/* LEFT SIDE - CHAOS */}
              <div className="w-1/2 bg-gradient-to-br from-red-500 via-orange-500 to-red-600 relative">
                
                {/* Header */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-black/20 backdrop-blur-sm py-6 px-4 border-b-4 border-white/30"
                >
                  <div className="text-center">
                    <div className="text-[48px] mb-1">❌</div>
                    <h2 className="text-white text-[28px] font-black mb-1">CHAOS</h2>
                    <p className="text-white/90 text-[16px]">Bez modelu</p>
                  </div>
                </motion.div>

                {/* Timeline */}
                <div className="p-4 space-y-3">
                  {chaosTimeline.slice(0, visibleItems).map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border-2 border-white/30"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-[36px] leading-none">{item.emoji}</div>
                        <div className="flex-1">
                          <div className="text-white/80 text-[14px] font-bold mb-0.5">{item.time}</div>
                          <div className="text-white text-[18px] font-black leading-tight mb-0.5">{item.title}</div>
                          <div className="text-white/90 text-[14px] leading-tight">{item.desc}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CENTER DIVIDER */}
              <div className="w-1 bg-gradient-to-b from-slate-800 via-slate-600 to-slate-800 shadow-2xl z-10" />

              {/* RIGHT SIDE - SYSTEM */}
              <div className="w-1/2 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 relative">
                
                {/* Header */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-black/20 backdrop-blur-sm py-6 px-4 border-b-4 border-white/30"
                >
                  <div className="text-center">
                    <div className="text-[48px] mb-1">✅</div>
                    <h2 className="text-white text-[28px] font-black mb-1">SYSTÉM</h2>
                    <p className="text-white/90 text-[16px]">S modelem</p>
                  </div>
                </motion.div>

                {/* Timeline */}
                <div className="p-4 space-y-3">
                  {systemTimeline.slice(0, visibleItems).map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border-2 border-white/30"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-[36px] leading-none">{item.emoji}</div>
                        <div className="flex-1">
                          <div className="text-white/80 text-[14px] font-bold mb-0.5">{item.time}</div>
                          <div className="text-white text-[18px] font-black leading-tight mb-0.5">{item.title}</div>
                          <div className="text-white/90 text-[14px] leading-tight">{item.desc}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer label */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-slate-800 to-slate-900 py-4 px-6">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-white/80 text-center text-[18px]"
              >
                Sleduj den Martina vs Petry 👇
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* STAGE 2: Rozdíl message */}
        {stage === 2 && (
          <motion.div
            key="difference"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center px-12"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="text-[96px] mb-6"
              >
                🤔
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[56px] leading-tight mb-8"
              >
                <span className="font-black">ROZDÍL?</span>
              </motion.h2>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-6 text-[36px]"
              >
                <div className="bg-red-100 border-4 border-red-500 rounded-2xl px-8 py-6">
                  <p className="text-red-700 leading-tight">
                    Martin řeší byznys<br/>
                    <span className="font-black">"od oka"</span>
                  </p>
                </div>

                <div className="text-[64px]">⬇️</div>

                <div className="bg-green-100 border-4 border-green-500 rounded-2xl px-8 py-6">
                  <p className="text-green-700 leading-tight">
                    Petra má<br/>
                    <span className="font-black">MODEL PODNIKÁNÍ</span>
                  </p>
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
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center px-12"
          >
            <div className="text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[72px] mb-6"
              >
                👉
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[48px] leading-tight mb-8"
              >
                <span className="font-black">Nechceš být<br/>jako Martin?</span>
              </motion.h2>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl px-10 py-8 mb-8 border-4 border-white shadow-2xl"
              >
                <p className="text-white text-[32px] leading-tight mb-4">
                  <span className="font-black">Podnikatelská Čtvrtka</span><br/>
                  tě naučí model podnikání
                </p>
                <p className="text-white/90 text-[24px]">
                  Za 90 minut. Systematicky.
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
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
        {[0, 1, 2, 3].map((i) => (
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
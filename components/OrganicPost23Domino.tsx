import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * POST #23: DOMINO EFEKT
 * 
 * Koncept: 9 domino kostek = 9 bloků Business Model Canvas
 * Chain reaction: Vynech jednu → všechno spadne
 * Format: 4:5 (vertical)
 */

const DOMINO_BLOCKS = [
  { id: 1, emoji: '👥', label: 'Zákaznický\nsegment', color: 'from-blue-500 to-cyan-500' },
  { id: 2, emoji: '💎', label: 'Hodnotová\nnabídka', color: 'from-orange-500 to-red-500' },
  { id: 3, emoji: '📢', label: 'Kanály', color: 'from-green-500 to-emerald-500' },
  { id: 4, emoji: '🤝', label: 'Vztahy', color: 'from-purple-500 to-pink-500' },
  { id: 5, emoji: '💰', label: 'Zdroje\npříjmů', color: 'from-yellow-500 to-orange-500' },
  { id: 6, emoji: '🔧', label: 'Klíčové\nzdroje', color: 'from-indigo-500 to-purple-500' },
  { id: 7, emoji: '⚙️', label: 'Klíčové\naktivity', color: 'from-teal-500 to-cyan-500' },
  { id: 8, emoji: '🤝', label: 'Partnerství', color: 'from-pink-500 to-red-500' },
  { id: 9, emoji: '💸', label: 'Náklady', color: 'from-red-500 to-orange-500' },
];

export function OrganicPost23Domino() {
  const [stage, setStage] = useState(0);
  const [fallenDominos, setFallenDominos] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage === 0) {
        // Stage 0: Úvodní screen (2s)
        setStage(1);
      } else if (stage === 1) {
        // Stage 1: Začne domino efekt (počká 1.5s, pak začne padat)
        setStage(2);
      } else if (stage === 2) {
        // Stage 2: Domino padají jeden po druhém
        if (fallenDominos.length < DOMINO_BLOCKS.length) {
          setFallenDominos(prev => [...prev, prev.length]);
        } else {
          // Všechny spadly → další stage
          setTimeout(() => setStage(3), 1000);
        }
      } else if (stage === 3) {
        // Stage 3: Message "Tohle se stane..." (3s)
        setTimeout(() => setStage(4), 3000);
      } else if (stage === 4) {
        // Stage 4: CTA (3s)
        setTimeout(() => {
          // Reset pro loop
          setStage(0);
          setFallenDominos([]);
        }, 3000);
      }
    }, stage === 0 ? 2000 : stage === 1 ? 1500 : stage === 2 ? 250 : 0);

    return () => clearTimeout(timer);
  }, [stage, fallenDominos]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
      
      <AnimatePresence mode="wait">
        {/* STAGE 0: Úvodní hook */}
        {stage === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center px-12"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[72px] mb-8"
            >
              🎯
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[64px] text-white leading-tight mb-8"
            >
              Model podnikání =<br/>
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent font-black">
                9 domino kostek
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-[42px] text-slate-300"
            >
              Vynech jednu →<br/>
              <span className="text-red-400 font-bold">všechno spadne</span>
            </motion.p>
          </motion.div>
        )}

        {/* STAGE 1 & 2: Domino kostky */}
        {(stage === 1 || stage === 2) && (
          <motion.div
            key="dominos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full flex items-center justify-center px-4"
          >
            {/* Domino kostky - 2 ŘÁDKY (5 + 4) */}
            <div className="relative space-y-4">
              {/* První řádek - 5 kostek */}
              <div className="flex gap-3 justify-center">
                {DOMINO_BLOCKS.slice(0, 5).map((block, index) => {
                  const isFallen = fallenDominos.includes(index);
                  
                  return (
                    <motion.div
                      key={block.id}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ 
                        y: 0, 
                        opacity: 1,
                        rotateZ: isFallen ? 90 : 0,
                        x: isFallen ? 50 : 0,
                        y: isFallen ? 35 : 0,
                      }}
                      transition={{ 
                        delay: index * 0.1,
                        rotateZ: { duration: 0.3 },
                        x: { duration: 0.3 },
                        y: { duration: 0.3 }
                      }}
                      className="relative"
                      style={{
                        transformOrigin: 'bottom right'
                      }}
                    >
                      {/* ŠIPKA/TRIGGER pro PRVNÍ kostku */}
                      {index === 0 && stage === 2 && fallenDominos.length === 0 && (
                        <motion.div
                          initial={{ opacity: 0, x: -50, scale: 0.8 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          className="absolute -left-[220px] top-1/2 -translate-y-1/2 z-50"
                        >
                          <div className="flex items-center gap-2">
                            <div className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold text-[20px] shadow-2xl whitespace-nowrap">
                              Vynecháš tohle?
                            </div>
                            <div className="text-red-500 text-[48px] leading-none">
                              👉
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Domino kostka */}
                      <div className={`
                        w-[100px] h-[200px] rounded-2xl
                        bg-gradient-to-br ${block.color}
                        border-4 border-white/30
                        shadow-2xl
                        flex flex-col items-center justify-center
                        relative overflow-hidden
                      `}>
                        {/* Emoji */}
                        <div className="text-[48px] mb-2">
                          {block.emoji}
                        </div>
                        
                        {/* Label */}
                        <div className="text-white text-[16px] font-bold text-center leading-tight whitespace-pre-line px-2">
                          {block.label}
                        </div>

                        {/* Number badge */}
                        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {block.id}
                          </span>
                        </div>

                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Druhý řádek - 4 kostky */}
              <div className="flex gap-3 justify-center">
                {DOMINO_BLOCKS.slice(5, 9).map((block, index) => {
                  const actualIndex = index + 5;
                  const isFallen = fallenDominos.includes(actualIndex);
                  
                  return (
                    <motion.div
                      key={block.id}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ 
                        y: 0, 
                        opacity: 1,
                        rotateZ: isFallen ? 90 : 0,
                        x: isFallen ? 50 : 0,
                        y: isFallen ? 35 : 0,
                      }}
                      transition={{ 
                        delay: actualIndex * 0.1,
                        rotateZ: { duration: 0.3 },
                        x: { duration: 0.3 },
                        y: { duration: 0.3 }
                      }}
                      className="relative"
                      style={{
                        transformOrigin: 'bottom right'
                      }}
                    >
                      {/* Domino kostka */}
                      <div className={`
                        w-[100px] h-[200px] rounded-2xl
                        bg-gradient-to-br ${block.color}
                        border-4 border-white/30
                        shadow-2xl
                        flex flex-col items-center justify-center
                        relative overflow-hidden
                      `}>
                        {/* Emoji */}
                        <div className="text-[48px] mb-2">
                          {block.emoji}
                        </div>
                        
                        {/* Label */}
                        <div className="text-white text-[16px] font-bold text-center leading-tight whitespace-pre-line px-2">
                          {block.label}
                        </div>

                        {/* Number badge */}
                        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {block.id}
                          </span>
                        </div>

                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 3: Důsledek */}
        {stage === 3 && (
          <motion.div
            key="consequence"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center px-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="text-[96px] mb-8"
            >
              💥
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[56px] text-white leading-tight mb-6"
            >
              Tohle se stane když<br/>
              <span className="text-red-400 font-black">vynecháš jednu část</span>
            </motion.h2>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4 text-[36px] text-slate-300"
            >
              <div className="flex items-center justify-center gap-4">
                <span className="text-red-500 text-[48px]">❌</span>
                <span>Nevíš kdo je zákazník</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-red-500 text-[48px]">❌</span>
                <span>Utrácíš zbytečně</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-red-500 text-[48px]">❌</span>
                <span>Byznys nesedí</span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 4: CTA */}
        {stage === 4 && (
          <motion.div
            key="cta"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center px-12"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[72px] mb-6"
            >
              ✅
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[64px] text-white leading-tight mb-8"
            >
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent font-black">
                Podnikatelská Čtvrtka
              </span>
              <br/>
              <span className="text-[48px]">
                tě provede VŠEMI 9 bloky
              </span>
            </motion.h2>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white/20 backdrop-blur-sm px-12 py-8 rounded-3xl border-4 border-white/30 mb-10"
            >
              <p className="text-[36px] text-white leading-relaxed">
                Žádné hádání<br/>
                Žádné vynechávání<br/>
                <span className="font-black text-green-400">Kompletní model</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-orange-500 to-red-600 px-14 py-8 rounded-full shadow-2xl"
            >
              <p className="text-[36px] text-white font-black">
                👉 podnikatelskactvrtka.cz
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`rounded-full transition-all ${
              i === stage 
                ? 'w-12 h-3 bg-orange-500' 
                : 'w-3 h-3 bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
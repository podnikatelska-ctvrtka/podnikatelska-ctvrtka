import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Post #8: Model vs Nápad - SLIDE STYLE (jako předtím s tečkami)
export function Post8ModelVsNapad() {
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 8);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex flex-col p-6 relative overflow-hidden">
      
      {/* Header */}
      <div className="text-center mb-4 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-3xl font-bold text-white mb-1">
              {step === 0 && "2 podnikatelé. Stejný start."}
              {step === 1 && "📅 MĚSÍC 1"}
              {step === 2 && "📅 MĚSÍC 2"}
              {step === 3 && "📅 MĚSÍC 3"}
              {step === 4 && "📅 MĚSÍC 4"}
              {step === 5 && "📅 MĚSÍC 5"}
              {step === 6 && "📅 MĚSÍC 6"}
              {step === 7 && "Jeden hádá. Druhý ví."}
            </div>
            <div className="text-base text-slate-400">
              {step === 0 && "Po 6 měsících? Úplně jiný výsledek."}
              {step >= 1 && step <= 6 && "Jak reagují?"}
              {step === 7 && "Výsledky"}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content - split screen */}
      <div className="flex-1 grid grid-cols-2 gap-3 relative z-10">
        
        {/* LEFT: NÁPAD */}
        <motion.div 
          className="bg-gradient-to-br from-red-900/50 to-red-950/50 backdrop-blur rounded-2xl border-2 border-red-500/40 p-5 flex flex-col justify-between"
          animate={{
            borderColor: step === 7 ? 'rgba(239, 68, 68, 0.6)' : 'rgba(239, 68, 68, 0.4)',
            scale: step === 7 ? 0.98 : 1
          }}
        >
          {/* Header */}
          <div className="text-center pb-4 border-b-2 border-red-500/30">
            <div className="text-4xl mb-2">🎲</div>
            <div className="text-2xl font-bold text-red-400">NÁPAD</div>
            <div className="text-sm text-red-300/60">Reaktivní chaos</div>
          </div>

          {/* Content */}
          <div className="flex-1 flex items-center justify-center py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-4 w-full"
              >
                {step === 0 && (
                  <div className="text-white/70 text-2xl italic">
                    "Zkusím to..."
                  </div>
                )}
                {step === 1 && (
                  <>
                    <div className="text-2xl text-white font-bold">
                      "Zkusím to levněji,<br/>možná zabere"
                    </div>
                    <div className="text-3xl text-red-400 font-bold mt-6">-8k</div>
                    <div className="text-base text-red-300">→ Střílí od boku</div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="text-2xl text-white font-bold">
                      "Možná to chce<br/>víc postů?"
                    </div>
                    <div className="text-3xl text-red-400 font-bold mt-6">-15k</div>
                    <div className="text-base text-red-300">→ Neví kde je problém</div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <div className="text-2xl text-white font-bold">
                      "Proč to<br/>NEKUPUJÍ??"
                    </div>
                    <div className="text-3xl text-red-400 font-bold mt-6">-23k</div>
                    <div className="text-base text-red-300">→ Žádná diagnóza</div>
                  </>
                )}
                {step === 4 && (
                  <>
                    <div className="text-2xl text-white font-bold">
                      "Nemám cash..."
                    </div>
                    <div className="text-3xl text-red-400 font-bold mt-6">-28k</div>
                    <div className="text-base text-red-300">→ Panika</div>
                  </>
                )}
                {step === 5 && (
                  <>
                    <div className="text-2xl text-white font-bold">
                      "Půjčím si..."
                    </div>
                    <div className="text-3xl text-red-400 font-bold mt-6">-35k</div>
                    <div className="text-base text-red-300">→ Dluh</div>
                  </>
                )}
                {step === 6 && (
                  <>
                    <div className="text-2xl text-white font-bold">
                      "Končím"
                    </div>
                    <div className="text-3xl text-red-400 font-bold mt-6">-40k</div>
                    <div className="text-base text-red-300">→ Zavírá</div>
                  </>
                )}
                {step === 7 && (
                  <>
                    <div className="text-6xl mb-4">💀</div>
                    <div className="text-3xl text-red-400 font-bold">
                      ZTRÁTA -40k
                    </div>
                    <div className="text-lg text-red-300 mt-4">
                      Nevíš proč selhal
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* RIGHT: MODEL */}
        <motion.div 
          className="bg-gradient-to-br from-green-900/50 to-emerald-950/50 backdrop-blur rounded-2xl border-2 border-green-500/40 p-5 flex flex-col justify-between"
          animate={{
            borderColor: step === 7 ? 'rgba(34, 197, 94, 0.6)' : 'rgba(34, 197, 94, 0.4)',
            scale: step === 7 ? 1.02 : 1
          }}
        >
          {/* Header */}
          <div className="text-center pb-4 border-b-2 border-green-500/30">
            <div className="text-4xl mb-2">♟️</div>
            <div className="text-2xl font-bold text-green-400">MODEL</div>
            <div className="text-sm text-green-300/60">Systém a růst</div>
          </div>

          {/* Content */}
          <div className="flex-1 flex items-center justify-center py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-4 w-full"
              >
                {step === 0 && (
                  <div className="text-white/70 text-2xl italic">
                    "Mám plán..."
                  </div>
                )}
                {step === 1 && (
                  <>
                    <div className="text-2xl text-white font-bold">
                      "Testuji 2 ceny<br/>na stejné skupině"
                    </div>
                    <div className="text-3xl text-green-400 font-bold mt-6">+3k</div>
                    <div className="text-base text-green-300">→ Kontrolovaný test</div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="text-2xl text-white font-bold">
                      "Vím že 70%<br/>je na Instagramu"
                    </div>
                    <div className="text-3xl text-green-400 font-bold mt-6">+7k</div>
                    <div className="text-base text-green-300">→ Data rozhodnutí</div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <div className="text-2xl text-white font-bold">
                      "Upravím jak to<br/>zákazníkům říkám"
                    </div>
                    <div className="text-3xl text-green-400 font-bold mt-6">+12k</div>
                    <div className="text-base text-green-300">→ Přesná změna</div>
                  </>
                )}
                {step === 4 && (
                  <>
                    <div className="text-2xl text-white font-bold">
                      "Škáluju<br/>co funguje"
                    </div>
                    <div className="text-3xl text-green-400 font-bold mt-6">+18k</div>
                    <div className="text-base text-green-300">→ Růst</div>
                  </>
                )}
                {step === 5 && (
                  <>
                    <div className="text-2xl text-white font-bold">
                      "Najmu<br/>prvního člověka"
                    </div>
                    <div className="text-3xl text-green-400 font-bold mt-6">+25k</div>
                    <div className="text-base text-green-300">→ Delegace</div>
                  </>
                )}
                {step === 6 && (
                  <>
                    <div className="text-2xl text-white font-bold">
                      "Plánuju Q2"
                    </div>
                    <div className="text-3xl text-green-400 font-bold mt-6">+35k</div>
                    <div className="text-base text-green-300">→ Strategie</div>
                  </>
                )}
                {step === 7 && (
                  <>
                    <div className="text-6xl mb-4">🚀</div>
                    <div className="text-3xl text-green-400 font-bold">
                      ZISK +100k
                    </div>
                    <div className="text-lg text-green-300 mt-4">
                      Víš přesně proč roste
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Footer CTA */}
      <AnimatePresence>
        {step === 7 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center mt-5 relative z-10 space-y-2"
          >
            <div className="text-2xl font-bold text-white">
              Postav si Model za 90 minut
            </div>
            <div className="text-xl font-bold text-blue-400">
              👉 www.podnikatelskactvrtka.cz
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-4 relative z-10">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === step ? 'bg-white scale-125' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

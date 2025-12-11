/**
 * POST #25: "PROČ SLEVY NEFUNGUJÍ"
 * 
 * Koncept: Email inbox = spam s "free trial" a "50% sleva" které nikdo neotevře
 * Pointa: Bez dobré hodnoty nepomůže ani sleva ani "zdarma"
 * Angle: Counterintuitive - ANTI-sleva positioning
 * Format: 4:5 (vertical) - ANIMATED
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function OrganicPost25NoDiscounts() {
  const [stage, setStage] = useState(0);
  const [visibleEmails, setVisibleEmails] = useState(0);

  const spamEmails = [
    { 
      subject: '🎁 ZDARMA na zkoušku!', 
      preview: 'Získej náš kurz úplně zdarma...',
      status: 'unread'
    },
    { 
      subject: '⚡ 50% SLEVA - pouze dnes!', 
      preview: 'Nevynechej tuhle jedinečnou příležitost...',
      status: 'unread'
    },
    { 
      subject: '🔥 GRATIS konzultace v hodnotě 5000 Kč', 
      preview: 'Rezervuj si ještě dnes...',
      status: 'unread'
    },
    { 
      subject: '💎 Exkluzivní nabídka - 70% OFF', 
      preview: 'Poslední šance získat...',
      status: 'unread'
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage === 0) {
        // Stage 0: Inbox intro (2s)
        setStage(1);
      } else if (stage === 1) {
        // Stage 1: Emails přibývají (každých 0.8s)
        if (visibleEmails < 4) {
          setVisibleEmails(prev => prev + 1);
        } else {
          setTimeout(() => setStage(2), 1000);
        }
      } else if (stage === 2) {
        // Stage 2: Question "Otevřeš?" (2s)
        setTimeout(() => setStage(3), 2000);
      } else if (stage === 3) {
        // Stage 3: Answer "Ne. Proč?" (2s)
        setTimeout(() => setStage(4), 2000);
      } else if (stage === 4) {
        // Stage 4: Truth reveal (4s)
        setTimeout(() => setStage(5), 4000);
      } else if (stage === 5) {
        // Stage 5: CTA (3s)
        setTimeout(() => {
          // Reset pro loop
          setStage(0);
          setVisibleEmails(0);
        }, 3000);
      }
    }, stage === 0 ? 2000 : stage === 1 ? 800 : 0);

    return () => clearTimeout(timer);
  }, [stage, visibleEmails]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
      
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
                📧
              </motion.div>
              
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[56px] leading-tight mb-6"
              >
                <span className="font-black">Tvůj inbox</span><br/>
                <span className="text-[48px] text-slate-600">každé ráno</span>
              </motion.h1>
            </div>
          </motion.div>
        )}

        {/* STAGE 1: Email inbox */}
        {stage === 1 && (
          <motion.div
            key="inbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center px-12 py-16"
          >
            <div className="w-full max-w-4xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-8 px-8 rounded-t-3xl">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <div className="text-white text-[40px] font-black">Doručená pošta</div>
                    <div className="text-blue-100 text-[20px] mt-1">
                      {visibleEmails} nepřečtených zpráv
                    </div>
                  </div>
                  <div className="text-[56px]">📬</div>
                </motion.div>
              </div>

              {/* Email list */}
              <div className="bg-white p-6 space-y-4 rounded-b-3xl shadow-2xl">
                {spamEmails.slice(0, visibleEmails).map((email, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-slate-50 rounded-xl p-5 shadow-lg border-2 border-slate-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <div className="flex-1 overflow-hidden">
                        <div className="text-[22px] font-black text-gray-900 mb-1 truncate">
                          {email.subject}
                        </div>
                        <div className="text-[16px] text-gray-500 truncate">
                          {email.preview}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 2: Question */}
        {stage === 2 && (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center px-12 bg-gradient-to-br from-orange-50 to-yellow-50"
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
                className="text-[64px] leading-tight"
              >
                <span className="font-black">Otevřeš<br/>něco z toho?</span>
              </motion.h2>
            </div>
          </motion.div>
        )}

        {/* STAGE 3: Answer */}
        {stage === 3 && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center px-12 bg-gradient-to-br from-red-50 to-orange-50"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="text-[120px] mb-8"
              >
                ❌
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[72px] leading-tight mb-8"
              >
                <span className="font-black text-red-600">NE.</span>
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[48px] text-gray-700"
              >
                Proč?
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* STAGE 4: Truth reveal */}
        {stage === 4 && (
          <motion.div
            key="truth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center px-12 bg-gradient-to-br from-slate-900 to-slate-800"
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

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                <h2 className="text-[52px] leading-tight text-white font-black">
                  Protože když nemáš<br/>
                  <span className="text-yellow-400">HODNOTU kterou potřebuješ,</span>
                </h2>

                <div className="text-[64px]">⬇️</div>

                <p className="text-[44px] leading-snug text-white/90">
                  nepomůže ti ani<br/>
                  <span className="font-black text-red-400">SLEVA 70%</span><br/>
                  ani<br/>
                  <span className="font-black text-red-400">ZDARMA</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* STAGE 5: CTA */}
        {stage === 5 && (
          <motion.div
            key="cta"
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
                💎
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[48px] leading-tight mb-10"
              >
                <span className="font-black">Zaměř se na HODNOTU</span>
              </motion.h2>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-6"
              >
                <div className="text-[32px] text-gray-700 leading-snug max-w-3xl mx-auto">
                  Na to <span className="font-black text-green-700">CO nabízíš</span>,<br/>
                  ne <span className="font-black text-red-600">JAK LEVNĚ</span>.
                </div>

                <div className="text-[28px] text-gray-600 leading-snug max-w-3xl mx-auto mt-8">
                  Vybuduj produkt/službu,<br/>
                  kterou lidé <span className="font-black">OPRAVDU CHTĚJÍ</span>.
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12"
              >
                <div className="bg-white rounded-3xl px-10 py-8 shadow-2xl border-4 border-green-500 max-w-3xl mx-auto">
                  <p className="text-[32px] leading-tight text-gray-900 mb-4">
                    <span className="font-black text-green-700">Přesně tohle řeší<br/>Podnikatelská Čtvrtka</span>
                  </p>
                  <p className="text-[24px] text-gray-600">
                    Pomůžeme ti vytvořit hodnotu,<br/>
                    kterou tvoji zákazníci POTŘEBUJÍ
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="mt-10 bg-gradient-to-r from-orange-600 to-red-600 px-12 py-6 rounded-full shadow-2xl"
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
        {[0, 1, 2, 3, 4, 5].map((i) => (
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
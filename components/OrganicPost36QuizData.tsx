/**
 * 📊 ORGANIC POST 36 - Quiz Data Stats
 * 
 * DVOUSLOUPCOVÝ LAYOUT pro IG/FB Stories (ušetřit výšku!)
 * - LEFT: Statistiky (92%, 81%, 73%) + red box
 * - RIGHT: Řešení + CTA kvíz
 * - Opakující se animace
 * - Správná česká typografie (mezera před %)
 */

import { motion } from 'motion/react';

export function OrganicPost36QuizData() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-3 py-2 rounded-full text-xs font-bold mb-3">
            📊 PRŮZKUM
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
            Zeptali jsme se 49 podnikatelů.
          </h2>
          <p className="text-lg text-red-400 font-bold">
            Výsledky šokují.
          </p>
        </div>

        {/* Main Content Card - DVA SLOUPCE */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl">
          <h3 className="text-lg font-black text-gray-900 mb-4 text-center">
            ⚠️ TOP 3 ZJIŠTĚNÍ:
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* LEFT COLUMN - Statistiky + Red Box */}
            <div className="space-y-3">
              {/* Statistiky */}
              {[
                { percentage: 92, text: '"doufají že to vyjde"', icon: "🤞", color: "red", delay: 0 },
                { percentage: 81, text: "netestovali produkt", icon: "⚠️", color: "orange", delay: 0.3 },
                { percentage: 73, text: "nemají ekonomický model", icon: "📊", color: "red", delay: 0.6 }
              ].map((stat, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{stat.icon}</span>
                    <motion.span 
                      className={`text-3xl font-black ${
                        stat.color === 'red' ? 'text-red-600' : 'text-orange-600'
                      }`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: stat.delay,
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      {stat.percentage} %
                    </motion.span>
                  </div>
                  <p className="text-xs text-gray-800 font-bold mb-2">
                    {stat.text}
                  </p>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        stat.color === 'red'
                          ? 'bg-gradient-to-r from-red-500 to-red-600'
                          : 'bg-gradient-to-r from-orange-500 to-orange-600'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.percentage}%` }}
                      transition={{ 
                        delay: stat.delay,
                        duration: 1,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Red Box */}
              <div className="p-3 bg-red-600 rounded-xl">
                <p className="text-white text-sm font-black text-center leading-tight">
                  A pak se divíme proč 70 % byznysů umírá v prvním roce.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN - Řešení + CTA */}
            <div className="space-y-3">
              {/* Solution */}
              <div className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl h-full flex flex-col">
                <h3 className="text-base font-black text-white mb-3 text-center">
                  ✅ JE LEPŠÍ CESTA:
                </h3>
                
                <div className="space-y-2 flex-1">
                  {[
                    { text: "Validuj PŘED investicí", icon: "🎯", delay: 1.5 },
                    { text: "Měř místo hádání", icon: "📊", delay: 1.7 },
                    { text: "Testuj místo doufání", icon: "⚡", delay: 1.9 }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="bg-white/20 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: item.delay,
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <p className="text-white font-bold text-xs">{item.text}</p>
                    </motion.div>
                  ))}
                </div>

                {/* CTA inline v RIGHT column */}
                <div className="mt-3 pt-3 border-t-2 border-white/20">
                  <h4 className="text-sm font-black text-white mb-2 text-center">
                    🎯 Udělej si kvíz ZDARMA
                  </h4>
                  <motion.div 
                    className="bg-white/30 backdrop-blur-sm rounded-lg p-2 text-center"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ 
                      delay: 2.5,
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <p className="text-white text-xs font-bold mb-1">
                      👉 podnikatelskactvrtka.cz/kviz
                    </p>
                    <p className="text-white/80 text-[10px]">
                      ⏱️ 3 minuty • Personalizované výsledky
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <motion.div 
          className="mt-4 bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center border-2 border-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: 3,
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <p className="text-lg text-white font-black">
            Přestaň být součástí statistiky.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
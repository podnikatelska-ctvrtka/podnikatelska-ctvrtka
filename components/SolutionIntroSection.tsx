import { motion } from "motion/react";
import { ArrowDown, Lightbulb, Target, CheckCircle2, Zap, Wrench, HandHeart } from "lucide-react";

export function SolutionIntroSection() {
  return (
    <section className="solution-intro relative overflow-hidden bg-gradient-to-b from-slate-900 via-gray-100 to-green-50" data-section="solution">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BRIDGE - Emocionální přechod z pain na hope */}
        <motion.div
          className="text-center py-6 pt-10 md:py-8 md:pt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-800 rounded-2xl p-6 md:p-8 mb-6 md:mb-8 shadow-xl border-b-4 border-green-400 relative overflow-hidden">
              {/* Decorative element */}
              <div className="absolute top-4 right-4 opacity-20">
                <HandHeart className="w-16 h-16 text-green-300" />
              </div>
              
              <div className="relative z-10">
                <p className="text-xl text-blue-200 leading-relaxed mb-4">
                  <span className="text-3xl mr-2">🤚</span> <strong>Zastavte se na chvíli.</strong> 
                </p>
                <p className="text-lg text-gray-100 leading-relaxed">
                  Tohle všechno, co jste právě četli... <strong className="text-white">není vaše chyba</strong>. 
                  Není to proto, že byste nebyli dostatečně šikovní, pracovití nebo schopní.
                </p>
                <p className="text-lg text-gray-100 leading-relaxed mt-4">
                  Prostě vám <strong className="text-green-300">to nikdo neukázal</strong>.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Solution teaser - SVĚTLÁ A POZITIVNÍ SEKCE */}
        <motion.div
          className="text-center pb-10 md:pb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto">
            
            {/* Transformace arrow */}
            <motion.div
              className="mb-8"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ArrowDown className="w-8 h-8 text-white transform rotate-180" />
              </div>
              <div className="inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-full text-xl font-black tracking-wide shadow-lg">
                ✨ TRANSFORMACE ✨
              </div>
            </motion.div>
            
            <div className="bg-gradient-to-br from-white via-green-50 to-blue-50 rounded-3xl p-10 border-4 border-green-400 shadow-2xl relative overflow-hidden">
              {/* Pozitivní pattern background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>
              <div className="relative z-10">
                {/* Badge uvnitř boxu */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                    <Lightbulb className="w-4 h-4" />
                    <span>Řešení existuje</span>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-center mb-8 gap-4">
                  <motion.div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 rounded-full p-3 shadow-2xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Lightbulb className="w-10 h-10 md:w-8 md:h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl md:text-4xl text-gray-900 font-black leading-tight text-center md:text-left">
                    Co kdyby za tím vším nebyla <span className="text-blue-600">vaše chyba</span>, ale jen <span className="text-green-600">chybějící plán</span>? ✨
                  </h3>
                </div>
              
                {/* GAINS - Pozitivní budoucnost */}
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 mb-10 border-2 border-green-300 shadow-lg max-w-3xl mx-auto">
                  <p className="text-xl text-gray-800 mb-4 leading-relaxed">
                    ✅ <strong className="text-green-700">Zítra ráno vstanete a víte PŘESNĚ, co dělat.</strong>
                  </p>
                  <p className="text-xl text-gray-800 mb-4 leading-relaxed">
                    ✅ <strong className="text-green-700">Víte, kam zaměřit své úsilí</strong> – žádné plýtvání časem a penězi.
                  </p>
                  <p className="text-xl text-gray-800 mb-4 leading-relaxed">
                    ✅ <strong className="text-green-700">Víte, kdo jsou vaši správní zákazníci</strong> – a jak je oslovit.
                  </p>
                  <p className="text-xl text-gray-800 leading-relaxed">
                    ✅ <strong className="text-green-700">Víte, jak otestovat nápady DŘÍV</strong>, než utratíte čas a peníze.
                  </p>
                </div>
              
                <div className="grid md:grid-cols-3 gap-8 mb-10">
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 shadow-xl mb-4 border-2 border-blue-300"
                      whileInView={{ scale: [0.8, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <Target className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                      </motion.div>
                      <div className="text-3xl font-black text-blue-700">90 min</div>
                    </motion.div>
                    <div className="text-base font-medium text-gray-700">Čas na vyřešení všech problémů</div>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 shadow-xl mb-4 border-2 border-green-300"
                      whileInView={{ scale: [0.8, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      </motion.div>
                      <div className="text-3xl font-black text-green-700">1 list</div>
                    </motion.div>
                    <div className="text-base font-medium text-gray-700">Kompletní strategie na jedné stránce</div>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6 shadow-xl mb-4 border-2 border-purple-300"
                      whileInView={{ scale: [0.8, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, -15, 15, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <Wrench className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                      </motion.div>
                      <div className="text-3xl font-black text-purple-700">Bez nástrojů</div>
                    </motion.div>
                    <div className="text-base font-medium text-gray-700">Jen čtvrtka a štítky</div>
                  </motion.div>
                </div>
              
                <div className="text-center">
                  <motion.div 
                    className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold mb-4 shadow-2xl"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✅ Řešení je jednodušší, než si myslíte
                  </motion.div>
                  <div className="text-lg font-medium text-gray-700">
                    Ostatní podnikatelé už této transformace dosáhli... 👇
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
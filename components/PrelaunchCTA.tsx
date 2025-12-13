import { motion } from "motion/react";
import { Calendar, Clock, Gift, CheckCircle, Sparkles, Zap, ArrowRight, BookOpen, Target, Star } from "lucide-react";
import { EnhancedCTA } from "./EnhancedCTA";
import { TouchFeedback } from "./TouchFeedback";

export function PrelaunchCTA() {
  return (
    <motion.section 
      className="relative py-24 px-4 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.15),transparent_50%)]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-3 rounded-full font-black text-base mb-6 shadow-xl">
            <Sparkles className="w-5 h-5" />
            <span>🎁 VÁNOČNÍ NABÍDKA</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white font-black leading-tight px-2">
            Získej Model podnikání <span className="text-yellow-300">za 90 minut</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8 px-2">
            Interaktivní online kurz - víš co dělat hned po spuštění
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 mb-8">
          
          {/* Left: Co získáš */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h3 className="text-2xl mb-6 text-center text-gray-900 font-black">
              Co získáš:
            </h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎯</div>
                <div>
                  <p className="font-bold text-gray-900">Byznys model na jednom listu</p>
                  <p className="text-sm text-gray-600">Vyplníš všech 9 bloků krok za krokem</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-2xl">✨</div>
                <div>
                  <p className="font-bold text-gray-900">FIT validátor</p>
                  <p className="text-sm text-gray-600">Ověříš jestli tvoje nabídka opravdu řeší problém</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-2xl">📚</div>
                <div>
                  <p className="font-bold text-gray-900">Galerie reálných příkladů</p>
                  <p className="text-sm text-gray-600">10+ hotových modelů (kavárna, e-shop...)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-2xl">🚀</div>
                <div>
                  <p className="font-bold text-gray-900">Personalizovaný akční plán</p>
                  <p className="text-sm text-gray-600">Víš přesně CO dělat zítra, za týden, za měsíc</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-indigo-50 p-4 rounded-lg border-2 border-indigo-200">
                <div className="text-2xl">♾️</div>
                <div>
                  <p className="font-bold text-indigo-900">Lifetime přístup</p>
                  <p className="text-sm text-indigo-700">Platíš jednou. Máš navždy. Včetně všech updatů.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Cena + CTA */}
          <div className="bg-white rounded-2xl shadow-xl border-4 border-red-500 p-8 flex flex-col relative overflow-hidden">
            
            {/* SLEVA badge */}
            <div className="absolute -right-12 top-8 rotate-45 bg-gradient-to-r from-red-600 to-red-500 text-white px-16 py-2 font-black text-lg shadow-lg">
              -40% SLEVA
            </div>
            
            <div className="text-center mb-8">
              <p className="text-sm text-gray-600 mb-2">Běžná cena:</p>
              <div className="text-3xl text-gray-400 line-through mb-2">
                8.499,- Kč
              </div>
              
              <p className="text-sm font-black text-red-600 mb-3 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                VÁNOČNÍ SLEVA 40%
                <Sparkles className="w-4 h-4" />
              </p>
              
              <div className="text-6xl text-green-600 font-black mb-2 drop-shadow-lg">
                4.999,- Kč
              </div>
              <p className="text-sm text-gray-600">bez DPH • Ušetříš 3.500 Kč!</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-xl p-6 mb-8 border-2 border-red-200">
              <h4 className="text-center mb-4 text-gray-900 font-black">
                🎁 Za tuhle cenu dostaneš:
              </h4>
              <div className="space-y-3 text-sm text-gray-700">
                <p>🔥 <strong>90 minut tvého času</strong> místo měsíců zmatku</p>
                <p>⚡ <strong>Jasná struktura</strong> místo chaotického plánování</p>
                <p>🚀 <strong>Okamžitá akce</strong> místo odkládání na později</p>
                <p className="text-red-600 font-black pt-2 border-t border-red-200">💰 + UŠETŘÍŠ 3.500 KČ DNES!</p>
              </div>
            </div>
            
            <div className="mt-auto">
              <TouchFeedback className="w-full">
                <motion.button
                  className="w-full bg-gradient-to-r from-red-600 via-orange-600 to-green-600 text-white px-8 py-5 rounded-xl font-black text-xl shadow-2xl hover:shadow-red-500/50 transition-all flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = '/objednavka'}
                >
                  <Zap className="w-6 h-6" fill="currentColor" />
                  CHCI UŠETŘIT 3.500 KČ!
                </motion.button>
              </TouchFeedback>
              
              <p className="text-center text-xs text-gray-500 mt-4">
                ✅ 14 dní záruka vrácení peněz • Okamžitý přístup
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-red-500 p-6 mb-6 relative overflow-hidden">
            
            {/* SLEVA badge mobile */}
            <div className="absolute -right-10 top-6 rotate-45 bg-gradient-to-r from-red-600 to-red-500 text-white px-12 py-1.5 font-black text-sm shadow-lg">
              -40%
            </div>
            
            <div className="text-center mb-6">
              <p className="text-xs text-gray-600 mb-1">Běžná cena:</p>
              <div className="text-2xl text-gray-400 line-through mb-2">
                8.499,- Kč
              </div>
              
              <p className="text-xs font-black text-red-600 mb-2 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" />
                SLEVA 40%
              </p>
              
              <div className="text-5xl text-green-600 font-black mb-2">
                4.999,- Kč
              </div>
              <p className="text-xs text-gray-600">bez DPH • Ušetříš 3.500 Kč!</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2 text-sm">
                <div className="text-lg">🎯</div>
                <div>
                  <span className="font-bold">Byznys model</span>
                  <span className="text-gray-600 ml-1">na jednom listu</span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="text-lg">✨</div>
                <div>
                  <span className="font-bold">FIT validátor</span>
                  <span className="text-gray-600 ml-1">ověř si nápad</span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="text-lg">📚</div>
                <div>
                  <span className="font-bold">10+ příkladů</span>
                  <span className="text-gray-600 ml-1">reálných byznysů</span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="text-lg">🚀</div>
                <div>
                  <span className="font-bold">Akční plán</span>
                  <span className="text-gray-600 ml-1">víš co dělat zítra</span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                <div className="text-lg">♾️</div>
                <div>
                  <span className="font-bold text-indigo-900">Lifetime přístup</span>
                  <span className="text-indigo-700 ml-1">platíš jednou, máš navždy</span>
                </div>
              </div>
            </div>
            
            <TouchFeedback className="w-full">
              <motion.button
                className="w-full bg-gradient-to-r from-red-600 via-orange-600 to-green-600 text-white px-6 py-4 rounded-xl font-black text-lg shadow-2xl hover:shadow-red-500/50 transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/objednavka'}
              >
                <Zap className="w-5 h-5" fill="currentColor" />
                UŠETŘIT 3.500 KČ!
              </motion.button>
            </TouchFeedback>
            
            <p className="text-center text-xs text-gray-500 mt-4">
              ✅ 14 dní záruka vrácení peněz
            </p>
          </div>
        </div>

        {/* Trust elements */}
        <div className="text-center mt-8">
          <p className="text-yellow-300 font-black text-lg mb-2">
            ⚡ Zbývá jen pár míst se slevou!
          </p>
          <p className="text-red-100 text-sm">
            Okamžitý přístup • Celoživotní licence • Záruka vrácení peněz
          </p>
        </div>

      </div>
    </motion.section>
  );
}
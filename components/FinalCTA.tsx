import { motion } from "motion/react";
import { ArrowRight, CheckCircle, Clock, Zap } from "lucide-react";
import { Button } from "./ui/button";

export function FinalCTA() {
  return (
    <motion.section 
      id="final-cta"
      className="py-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-10 left-10 md:top-20 md:left-20 w-48 h-48 md:w-72 md:h-72 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-purple-400/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-white">
          
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              🎯 Jsi připravený/á začít?
            </h2>
            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
              Za 90 minut budeš mít jasno v byznysu.<br/>
              Žádné složité teorie. Jen konkrétní kroky.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl mb-2">90 minut změny</h3>
              <p className="text-blue-200 text-sm">
                Jeden workshop, který ti dá jasno v byznysu
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl mb-2">Konkrétní kroky</h3>
              <p className="text-blue-200 text-sm">
                Bez teorie. Jdeš rovnou na věc s akčním plánem
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl mb-2">Model podnikání</h3>
              <p className="text-blue-200 text-sm">
                Hotový plán, který můžeš hned použít
              </p>
            </div>
          </motion.div>

          {/* Main CTA Box */}
          <motion.div 
            className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border-2 border-white/20 shadow-2xl max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {/* Price */}
            <div className="text-center mb-8">
              <p className="text-blue-200 text-lg mb-2">Investice do tvého byznysu:</p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-6xl md:text-7xl">4.999 Kč</span>
              </div>
            </div>

            {/* What's Included */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold mb-1">90min workshop</p>
                  <p className="text-sm text-blue-200">Podnikatelská Čtvrtka krok po kroku</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold mb-1">Tvůj model podnikání</p>
                  <p className="text-sm text-blue-200">Vyplněný, hotový k použití</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold mb-1">Akční plán na 30 dní</p>
                  <p className="text-sm text-blue-200">Co udělat hned příští týden</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold mb-1">Online přístup 24/7</p>
                  <p className="text-sm text-blue-200">Kdykoliv, odkudkoliv</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={() => {
                  window.location.href = '/objednavka';
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-7 text-xl md:text-2xl rounded-2xl shadow-lg shadow-orange-500/25 transition-all hover:shadow-xl hover:shadow-orange-500/40 hover:scale-[1.02] group"
              >
                <span>Chci Podnikatelskou Čtvrtku</span>
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button 
                onClick={() => {
                  window.location.href = '/kviz';
                }}
                variant="outline"
                className="w-full bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 py-6 text-lg rounded-2xl transition-all backdrop-blur-sm"
              >
                <Zap className="w-5 h-5 mr-2" />
                Nebo začni kvízem zdarma (3 min)
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Okamžitý přístup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Bezpečná platba</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Online 24/7</span>
              </div>
            </div>
          </motion.div>

          {/* Bottom note */}
          <motion.div 
            className="text-center mt-8 text-blue-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm">
              🔒 Bezpečná platba • 💳 Karta nebo převod • ✅ Okamžitý přístup po platbě
            </p>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
import { motion } from 'motion/react';
import { Sparkles, CheckCircle, TrendingUp, Users, Zap, Target } from 'lucide-react';

/**
 * Live Product Showcase - Ukázka skutečných nástrojů z kurzu
 * Pro zobrazení na /objednavka stránce jako důkaz že je to skutečný produkt
 * REDESIGN: Bento Grid layout s vizuálně bohatším obsahem
 */
export function LiveProductShowcase() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Animovaný badge - pulzující */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 0 rgba(147, 51, 234, 0)",
                "0 0 0 8px rgba(147, 51, 234, 0.1)",
                "0 0 0 0 rgba(147, 51, 234, 0)"
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span className="font-black text-lg tracking-wide">NAUČÍME TĚ PODNIKAT</span>
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900 leading-tight">
            Hotové <span className="text-purple-600 font-black">nástroje</span> které můžeš použít <span className="text-purple-600 font-black">hned</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-3">
            <strong>Interaktivní aplikace</strong> které okamžitě použiješ ve svém podnikání:
          </p>
          <p className="text-sm text-gray-500 italic">
            (Ukázka 4 z 10+ nástrojů v kurzu)
          </p>
        </motion.div>

        {/* BENTO GRID - 2 velké boxy nahoře, 2 menší dole */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 🎯 KALKULAČKA - velký box vlevo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:shadow-2xl hover:border-purple-300 transition-all"
          >
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-black text-xl text-white">🎯 Kalkulačka zákazníků</h3>
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs text-white font-bold">LIVE</span>
                </div>
              </div>
              <p className="text-sm text-white/95">Zadáš čísla → okamžitě víš kolik zákazníků potřebuješ</p>
            </div>
            
            {/* Mock kalkulačka - více obsahu */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Typ byznysu</label>
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-2">
                    <p className="text-sm text-purple-900 font-semibold">🔄 Opakované</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Finanční cíl</label>
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2">
                    <p className="text-sm text-gray-900 font-semibold">60.000 Kč</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Průměrný účet</label>
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2">
                    <p className="text-sm text-gray-900 font-semibold">120 Kč</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Návštěv/měsíc</label>
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-2">
                    <p className="text-sm text-gray-900 font-semibold">8x</p>
                  </div>
                </div>
              </div>

              {/* Výsledek - výraznější */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-white" />
                  <p className="text-sm text-white font-semibold">Potřebuješ:</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-3">
                  <p className="text-5xl font-black text-white mb-1" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>63</p>
                  <p className="text-sm text-white font-medium">stálých zákazníků</p>
                </div>
                <div className="border-t border-white/30 pt-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-white/90 mb-1">Celkově oslovit:</p>
                      <p className="text-2xl font-black text-white mb-0.5">3.150</p>
                      <p className="text-xs text-white/80">zákazníků</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/90 mb-1">Při 2% CR</p>
                      <Users className="w-6 h-6 text-white/90 ml-auto" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700"><strong>Live kalkulace!</strong> Vidíš přesně kolik zákazníků musíš získat pro svůj finanční cíl.</p>
              </div>
            </div>
          </motion.div>

          {/* 📋 PODNIKATELSKÁ ČTVRTKA - velký box vpravo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all"
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-black text-xl text-white">📋 Podnikatelská Čtvrtka</h3>
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs text-white font-bold">AI</span>
                </div>
              </div>
              <p className="text-sm text-white/95">Validace byznysu v reálném čase - vidíš co chybí</p>
            </div>
            
            {/* Mock canvas - více obsahu */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 h-24 flex flex-col justify-between">
                  <div className="text-xs md:text-sm text-blue-600 font-bold">Partneři</div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs md:text-sm text-gray-600">3 položky</span>
                  </div>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 h-24 flex flex-col justify-between">
                  <div className="text-xs md:text-sm text-green-600 font-bold">Hodnota</div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs md:text-sm text-gray-600">Validováno</span>
                  </div>
                </div>
                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-3 h-24 flex flex-col justify-between">
                  <div className="text-xs md:text-sm text-purple-600 font-bold">Zákazníci</div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs md:text-sm text-gray-600">2 segmenty</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3 h-20 flex flex-col justify-between">
                  <div className="text-xs text-yellow-600 font-bold">Aktivity</div>
                  <div className="text-xs text-gray-600">✅ 5 položek</div>
                </div>
                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-3 h-20 flex flex-col justify-between">
                  <div className="text-xs text-orange-600 font-bold">Kanály</div>
                  <div className="text-xs text-gray-600">✅ 3 kanály</div>
                </div>
              </div>

              {/* Validace status - výraznější */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-white" />
                    <span className="font-black text-lg text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>Kompletnost</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <span className="text-2xl font-black text-white">85%</span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm text-white font-medium mb-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>7/9 sekcí vyplněno ✓</p>
                  <p className="text-xs text-white/90 font-medium" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>💡 Tip: Doplň "Náklady" a "Příjmy" pro 100%</p>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700"><strong>Live validace!</strong> Vidíš progress v reálném čase a dostaneš tipy co doplnit.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Spodní řada - 2 menší boxy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ✅ AKČNÍ PLÁN - KOMPAKTNÍ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:shadow-2xl hover:border-green-300 transition-all"
          >
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-black text-lg text-white">✅ Personalizovaný akční plán</h3>
                <Zap className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm text-white/95">Na základě tvé analýzy</p>
            </div>
            
            <div className="p-5 space-y-3">
              {/* TOP segment */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏆</span>
                    <p className="text-sm font-black text-purple-900">#1 Segment</p>
                  </div>
                  <div className="bg-purple-200 px-3 py-1 rounded-full">
                    <span className="text-xs font-bold text-purple-900">FIT: 87%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-700">Mladí podnikatelé 25-35 let</p>
                <p className="text-xs text-purple-700 font-semibold mt-1">💰 Potenciál: 85.000 Kč/měsíc</p>
              </div>

              {/* Úkoly */}
              <div className="space-y-2">
                <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-3">
                  <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900 mb-1">Řeš TOP obtíže zákazníků</p>
                    <p className="text-xs text-gray-600">📅 14 dní • 🎯 KRITICKÁ</p>
                    <div className="mt-2 bg-white rounded p-2 text-xs text-gray-700 space-y-1">
                      <p>😰 Nejistá budoucnost (45%)</p>
                      <p>💸 Složité finance (32%)</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-purple-50 rounded-lg p-3">
                  <div className="w-7 h-7 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900 mb-1">Komunikuj TOP přínosy</p>
                    <p className="text-xs text-gray-600">📅 14 dní • 🎯 VYSOKÁ</p>
                    <div className="mt-2 bg-white rounded p-2 text-xs text-gray-700">
                      🎯 Jistota • Zjednodušení • Růst
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-green-50 rounded-lg p-3">
                  <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900 mb-1">Nastav měření úspěchu</p>
                    <p className="text-xs text-gray-600">📅 7 dní • 🎯 STŘEDNÍ</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <Target className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700"><strong>Automaticky generováno!</strong> Plán se vytvoří z tvých výsledků v kurzu.</p>
              </div>
            </div>
          </motion.div>

          {/* 🏆 GAMIFIKACE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 hover:shadow-2xl hover:border-orange-300 transition-all"
          >
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-black text-lg text-white">🏆 Progress & Gamifikace</h3>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm text-white/95">Vidíš svůj pokrok live</p>
            </div>
            
            <div className="p-5 space-y-4">
              {/* Progress bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-700 font-bold">Celkový pokrok kurzu</span>
                  <span className="text-sm font-black text-orange-600">67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-4 rounded-full flex items-center justify-end pr-2" style={{ width: '67%' }}>
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">7/11 modulů hotovo</p>
              </div>

              {/* Achievements - výraznější */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl p-4 text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <p className="text-xs font-black text-gray-900 mb-1">Canvas Master</p>
                  <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full">
                    <span className="text-xs font-bold">+50 XP</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-4 text-center">
                  <div className="text-4xl mb-2">⚡</div>
                  <p className="text-xs font-black text-gray-900 mb-1">Speed Learner</p>
                  <div className="bg-blue-400 text-blue-900 px-2 py-1 rounded-full">
                    <span className="text-xs font-bold">+30 XP</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">🔥 Streak</span>
                  <span className="text-sm font-bold text-gray-900">5 dní</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">⭐ Body</span>
                  <span className="text-sm font-bold text-gray-900">285 XP</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">📊 Úkoly</span>
                  <span className="text-sm font-bold text-gray-900">12/18</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
                <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700"><strong>Udržuj momentum!</strong> Gamifikace tě motivuje dokončit každý krok.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Text pod nástroji */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 italic">
            A mnoho dalšího...
          </p>
        </motion.div>

      </div>
    </div>
  );
}

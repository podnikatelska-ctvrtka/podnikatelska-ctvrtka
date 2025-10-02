import { motion } from "motion/react";
import { Target, Users, TrendingUp, Zap, ArrowRight, CheckCircle, Clock, Sparkles, Star } from "lucide-react";
import { Button } from "./ui/button";

export function OptimizedCombinedSection() {
  const valueProps = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Přesné zacílení",
      description: "Místo střílení naslepo budete vědět přesně, kdo jsou vaši ideální zákazníci",
      result: "Efektivnější marketing s vyššími konverzemi",
      color: "blue",
      bgGradient: "from-blue-50 to-blue-100",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Silná pozice na trhu",
      description: "Vytvoříte si jedinečnou pozici, díky které se odlišíte od konkurence",
      result: "Zákazníci si vás vyberou i přes vyšší ceny",
      color: "purple",
      bgGradient: "from-purple-50 to-purple-100",
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Rostoucí zisky",
      description: "Objevíte nové způsoby, jak zvýšit marže a najít dodatečné zdroje příjmů",
      result: "Vyšší ziskovost při stejném úsilí",
      color: "green",
      bgGradient: "from-green-50 to-green-100",
      iconBg: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Rychlé rozhodování",
      description: "Budete mít jasný rámec pro všechna obchodní rozhodnutí",
      result: "Méně stresu, více sebejistoty v podnikání",
      color: "orange",
      bgGradient: "from-orange-50 to-orange-100",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="combined-section py-16 bg-gradient-to-b from-gray-50 via-white to-blue-50/30 relative overflow-hidden" data-section="benefits">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/4 w-36 h-36 bg-green-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Strategický rámec pro úspěšný byznys</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl mb-6 text-gray-900 font-black leading-tight">
            Získejte <span className="text-blue-600 font-black">jasnou strategii</span> pro váš byznys
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Podnikatelská čtvrtka vám poskytne kompletní strategický rámec, 
            díky kterému budete vědět přesně, <strong className="text-gray-900 font-semibold">co dělat, komu prodávat a jak se odlišit od konkurence</strong>.
          </p>
        </motion.div>

        {/* Value Propositions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {valueProps.map((prop, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
            >
              {/* Card Background with Glassmorphism */}
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg group-hover:shadow-2xl transition-all duration-500"></div>
              
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${prop.bgGradient} opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-500`}></div>
              
              <div className="relative p-8 text-center">
                {/* Icon with enhanced styling */}
                <div className={`w-20 h-20 ${prop.iconBg} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 relative`}>
                  {prop.icon}
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                  {prop.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {prop.description}
                </p>
                
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl px-4 py-3 border border-green-200 shadow-sm group-hover:shadow-md transition-all duration-300">
                  <CheckCircle className="w-4 h-4" />
                  <span>{prop.result}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>



        {/* Decorative Separator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
            <Star className="w-6 h-6 text-blue-500" />
            <div className="w-12 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
          </div>
        </div>

        {/* What you get section */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl md:text-4xl mb-4 text-gray-900 font-black leading-tight">
              Co přesně získáte za <span className="text-blue-600 font-black">90 minut práce</span>
            </h3>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              Místo měsíců plánování získáte kompletní strategii během jednoho odpoledne
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="group relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-xl font-bold text-gray-900 mb-3">Jasný akční plán</div>
                  <div className="text-gray-600 leading-relaxed">Konkrétní kroky, které můžete začít implementovat hned zítra</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="group relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-green-100 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-xl font-bold text-gray-900 mb-3">Ověřený systém</div>
                  <div className="text-gray-600 leading-relaxed">Metoda, kterou úspěšně používají stovky podnikatelů</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="group relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-100 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-xl font-bold text-gray-900 mb-3">Okamžité výsledky</div>
                  <div className="text-gray-600 leading-relaxed">Strategii vytvoříte za jedno odpoledne, ne za měsíce</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Decorative Separator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
          </div>
        </div>

        {/* Comparison Table */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl mb-6 text-gray-900 font-black leading-tight">
              Proč je <span className="text-blue-600 font-black">Podnikatelská čtvrtka</span> lepší řešení?
            </h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Zatímco zastaralé tradiční plánování trvá měsíce a stojí desetitisíce korun,{" "} 
              <strong className="text-gray-900 font-semibold">Podnikatelská čtvrtka vám poskytne stejné výsledky za 90 minut</strong>.
            </p>
          </div>

          {/* Desktop Comparison */}
          <div className="hidden lg:block max-w-5xl mx-auto">
            <div className="grid grid-cols-2 gap-12">
              
              {/* Tradiční plánování */}
              <motion.div 
                className="group relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
                <div className="relative bg-white rounded-3xl border-2 border-red-200 shadow-xl overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                  <div className="bg-gradient-to-r from-red-50 to-red-100 p-8 text-center border-b-2 border-red-200">
                    <div className="text-2xl font-bold text-red-700 mb-2">Tradiční plánování</div>
                    <div className="text-red-600 font-medium flex items-center justify-center gap-2">
                      <span className="text-lg">⚠️</span>
                      <span>Zastaralý přístup</span>
                    </div>
                  </div>
                
                  <div className="p-8 space-y-5">
                    <div className="flex items-start gap-4 p-4 bg-red-50 rounded-2xl border border-red-100">
                      <span className="text-red-500 text-xl mt-1">❌</span>
                      <div>
                        <div className="font-semibold text-red-700 text-lg">Složité teorie</div>
                        <div className="text-red-600 mt-1">Nepraktické akademické přístupy</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-red-50 rounded-2xl border border-red-100">
                      <span className="text-red-500 text-xl mt-1">❌</span>
                      <div>
                        <div className="font-semibold text-red-700 text-lg">3-6 měsíců</div>
                        <div className="text-red-600 mt-1">Dlouhý proces vytváření</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-red-50 rounded-2xl border border-red-100">
                      <span className="text-red-500 text-xl mt-1">❌</span>
                      <div>
                        <div className="font-semibold text-red-700 text-lg">50+ stran dokumentů</div>
                        <div className="text-red-600 mt-1">Složité a nepraktické</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-red-50 rounded-2xl border border-red-100">
                      <span className="text-red-500 text-xl mt-1">❌</span>
                      <div>
                        <div className="font-semibold text-red-700 text-lg">Teoretický jazyk</div>
                        <div className="text-red-600 mt-1">Těžko aplikovatelné v praxi</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Podnikatelská čtvrtka */}
              <motion.div 
                className="group relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
                <div className="relative bg-white rounded-3xl border-2 border-blue-300 shadow-2xl overflow-hidden group-hover:shadow-3xl transition-all duration-500">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 text-center border-b-2 border-blue-200">
                    <div className="text-2xl font-bold text-blue-800 mb-2">Podnikatelská čtvrtka</div>
                    <div className="text-blue-600 font-semibold flex items-center justify-center gap-2">
                      <span className="text-lg">🚀</span>
                      <span>Moderní řešení</span>
                    </div>
                  </div>
                
                  <div className="p-8 space-y-5">
                    <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                      <span className="text-blue-600 text-xl mt-1">📄</span>
                      <div className="flex-1">
                        <div className="font-semibold text-blue-800 text-lg">1 přehledná stránka</div>
                        <div className="text-blue-600 mt-1">Vše podstatné na jednom místě</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                      <span className="text-blue-600 text-xl mt-1">⚡</span>
                      <div className="flex-1">
                        <div className="font-semibold text-blue-800 text-lg">90 minut</div>
                        <div className="text-blue-600 mt-1">Kompletní strategie za jedno odpoledne</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                      <span className="text-blue-600 text-xl mt-1">🎯</span>
                      <div className="flex-1">
                        <div className="font-semibold text-blue-800 text-lg">Praktické kroky</div>
                        <div className="text-blue-600 mt-1">Okamžitě aplikovatelné ve vašem byznysu</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                      <span className="text-blue-600 text-xl mt-1">✅</span>
                      <div className="flex-1">
                        <div className="font-semibold text-blue-800 text-lg">Dostupné řešení</div>
                        <div className="text-blue-600 mt-1">Bez nutnosti drahých konzultací</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-6">
            {/* Tradiční plánování */}
            <div className="bg-white rounded-xl border border-red-200 shadow-sm p-6">
              <div className="text-center mb-6">
                <h4 className="text-lg font-medium text-red-700 mb-2">Tradiční plánování</h4>
                <div className="text-sm text-red-600">⚠️ Zastaralý přístup</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <span className="text-red-500">❌</span>
                  <div className="text-sm">
                    <div className="font-medium text-red-700">Složité teorie</div>
                    <div className="text-red-600">Nepraktické přístupy</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <span className="text-red-500">❌</span>
                  <div className="text-sm">
                    <div className="font-medium text-red-700">3-6 měsíců</div>
                    <div className="text-red-600">Dlouhý proces</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <span className="text-red-500">❌</span>
                  <div className="text-sm">
                    <div className="font-medium text-red-700">Obecné rady</div>
                    <div className="text-red-600">Nespecifické pro váš byznys</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <span className="text-red-500">❌</span>
                  <div className="text-sm">
                    <div className="font-medium text-red-700">Drahé konzultace</div>
                    <div className="text-red-600">25.000+ Kč za rady</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Podnikatelská čtvrtka */}
            <div className="bg-white rounded-xl border-2 border-blue-200 shadow-lg p-6">
              <div className="text-center mb-6">
                <h4 className="text-lg font-medium text-blue-800 mb-2">Podnikatelská čtvrtka</h4>
                <div className="text-sm text-blue-600 font-medium">🚀 Moderní řešení</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">📄</span>
                  <div className="text-sm flex-1">
                    <div className="font-medium text-blue-800">1 přehledná stránka</div>
                    <div className="text-blue-600">Vše na jednom místě</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">⚡</span>
                  <div className="text-sm flex-1">
                    <div className="font-medium text-blue-800">90 minut</div>
                    <div className="text-blue-600">Kompletní strategie za jedno odpoledne</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">🎯</span>
                  <div className="text-sm flex-1">
                    <div className="font-medium text-blue-800">Praktické kroky</div>
                    <div className="text-blue-600">Okamžitě aplikovatelné ve vašem byznysu</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">✅</span>
                  <div className="text-sm flex-1">
                    <div className="font-medium text-blue-800">Dostupné řešení</div>
                    <div className="text-blue-600">Bez nutnosti drahých konzultací</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-3xl p-10 border-2 border-orange-200 shadow-2xl overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-200 rounded-full blur-3xl opacity-30"></div>
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="animate-pulse">🔥</span>
                <span>Omezená nabídka</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-gray-900 text-center font-black leading-tight">
                <span className="text-red-600">STOP ztrátám!</span> Začněte prosperovat <span className="text-green-600">ještě dnes</span>
              </h3>
              
              <p className="text-gray-700 mb-8 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
                <strong className="text-red-600">Každý den bez strategie = ztracené zisky a zákazníci.</strong> 
                Jeden podnikatel <strong className="text-green-600">zdvojnásobil tržby za 3 měsíce</strong> díky Podnikatelské čtvrtce.{" "}
                <strong className="text-gray-900">Čím dřív začnete, tím dřív prosperujete.</strong>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-red-600 via-red-700 to-pink-600 hover:from-red-700 hover:via-red-800 hover:to-pink-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      🚀 Chci konečně uspět!
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </Button>
                </motion.div>
                
                <div className="text-gray-500 flex items-center gap-2">
                  <span className="animate-bounce">↓</span>
                  <span>nebo pokračujte v čtení</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
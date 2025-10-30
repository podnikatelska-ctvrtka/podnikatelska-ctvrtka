import { motion } from "motion/react";
import { Target, Users, TrendingUp, Zap, ArrowRight, CheckCircle, Clock, Sparkles, Star, Award, Lightbulb } from "lucide-react";
import { Button } from "./ui/button";

export function OptimizedCombinedSectionV2() {
  const valueProps = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Přesné zacílení na ideální zákazníky",
      description: "Místo střílení naslepo odpovíte, kdo přesně je váš ideální zákazník – jeho problémy, potřeby a kde ho najít. Přestanete mstit peníze na lidi, kteří stejně nekoupí.",
      result: "Ušetříte 15+ hodin týdně",
      color: "blue"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Jedinečná pozice na trhu",
      description: "Zjistíte, čím se odlišujete od konkurence a proč by si zákazníci měli vybrat právě vás. Ne jen cenou - ale skutečnou hodnotou, kterou nikdo jiný nedává.",
      result: "30-50% vyšší ceny za stejnou práci",
      color: "purple"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Nové možnosti růstu a zisku",
      description: "Odhalíte příležitosti, které jste dosud přehlíželi – nové produkty, služby nebo způsoby monetizace. Zjistíte, jak zvýšit hodnotu každého zákazníka.",
      result: "2-3 nové zdroje příjmů do měsíce",
      color: "green"
    }
  ];

  const whatYouGet = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Konkrétní odpovědi na vaše otázky",
      description: "Ne obecné teorie, ale přesné kroky pro vaše podnikání"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Ověřený systém stovek podnikatelů",
      description: "Od autoservisů po fitness trenérky - funguje v každém oboru"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Jasnost okamžitě, první výsledky za 1-2 týdny",
      description: "90 minut práce, celoživotní strategický nástroj"
    }
  ];

  const comparison = [
    {
      before: "Nevím, komu přesně prodávám",
      after: "Vím, kdo je můj ideální zákazník",
      icon: "🎯"
    },
    {
      before: "Konkuruji jen cenou",
      after: "Vytvářím jinou hodnotu",
      icon: "💎"
    },
    {
      before: "Bojím se zkoušet nové věci",
      after: "Vím, co otestovat první",
      icon: "🚀"
    },
    {
      before: "Marketing mě děsí",
      after: "Rozumím, jak oslovit zákazníky",
      icon: "💡"
    },
    {
      before: "Nevím, jak zvýšit zisky",
      after: "Vidím nové možnosti růstu",
      icon: "📈"
    }
  ];

  return (
    <section data-section="benefits" className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Konkrétní odpovědi na vaše otázky
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
            Podnikatelská <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Čtvrtka</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            9 políček, která vyřeší nedostatek zákazníků, špatné zacílení a nízké zisky
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          
          {/* Left: Value Props */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 md:mb-8">
              Co <span className="text-blue-600">konkrétně</span> vyřešíte?
            </h3>
            
            <div className="space-y-5 md:space-y-6">
              {valueProps.map((prop, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4 p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white
                      ${prop.color === 'blue' ? 'bg-blue-500' : ''}
                      ${prop.color === 'purple' ? 'bg-purple-500' : ''}
                      ${prop.color === 'green' ? 'bg-green-500' : ''}
                      ${prop.color === 'orange' ? 'bg-orange-500' : ''}
                      group-hover:scale-110 transition-transform duration-300
                    `}>
                      {prop.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">{prop.title}</h4>
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">{prop.description}</p>
                      <div className="inline-flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg px-3 py-1.5">
                        <CheckCircle className="w-4 h-4" />
                        <span>{prop.result}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: What You Get + Comparison */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* What You Get */}
            <div className="mb-8 md:mb-10">
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                Co přesně získáte za <span className="text-blue-600">90 minut</span>
              </h3>
              <p className="text-gray-600 text-base md:text-lg mb-5 md:mb-6">
                Jedno odpoledne, které změní směr vašeho byznysu
              </p>
              
              {/* Benefit cards */}
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {whatYouGet.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                      <div className="text-gray-600 text-sm leading-relaxed">{item.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Before/After Comparison */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 md:p-6 border border-indigo-200">
              <h4 className="text-lg md:text-xl font-black text-gray-900 mb-4 text-center">
                Před Čtvrtkou → <span className="text-blue-600">Po Čtvrtce</span>
              </h4>
              
              <div className="space-y-3">
                {comparison.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/80 rounded-xl overflow-hidden"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {/* Mobile: Stacked layout */}
                    <div className="block md:hidden p-3">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-red-500 mt-0.5">❌</span>
                        <div className="text-red-600 text-sm line-through flex-1">{item.before}</div>
                      </div>
                      <div className="font-semibold text-blue-700 text-sm flex items-start gap-2 pl-6">
                        <span className="mt-0.5">{item.icon}</span>
                        <span className="flex-1">{item.after}</span>
                      </div>
                    </div>
                    
                    {/* Desktop: Side by side */}
                    <div className="hidden md:flex items-center gap-4 p-3">
                      <div className="flex-1 grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-red-500 mt-0.5">❌</span>
                          <span className="text-red-600 line-through flex-1">{item.before}</span>
                        </div>
                        <div className="flex items-start gap-2 font-semibold text-blue-700">
                          <span className="mt-0.5">{item.icon}</span>
                          <span className="flex-1">{item.after}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
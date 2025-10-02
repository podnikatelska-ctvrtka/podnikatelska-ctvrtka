import { motion } from "motion/react";
import { Users, Target, TrendingUp, CheckCircle, Sparkles } from "lucide-react";

export function SuccessPatternSection() {
  const successSteps = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Nebyli 'marketing experti'",
      description: "Martin dřív jen opravoval auta. Marketing? 'To není pro mě.'",
      example: "Po Čtvrtce: Pochopil, že jde o vztahy - dávat zákazníkům vědět, co se děje",
      color: "blue"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Vyplnili 9 políček za víkend",
      description: "Žádné složité strategie. Konkrétní otázky → konkrétní odpovědi.",
      example: "Jana: 'Konečně jsem věděla, CO prodávám'",
      color: "purple"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "První změny za 2-3 měsíce",
      description: "Ne za rok. Ne za 5 let. Za pár měsíců.",
      example: "Petra: 120 ebooků za 3 měsíce",
      color: "green"
    }
  ];

  return (
    <section data-section="success-pattern" className="py-12 bg-gradient-to-b from-blue-50 to-purple-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-blue-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-purple-400 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>🔍</span>
            <span>Co mají společného</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900 font-black leading-tight">
            Co mají společného ti, <span className="text-blue-600 font-black">kdo uspěli?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Všichni, kteří použili Čtvrtku, udělali <strong className="text-gray-900 font-semibold">TOHLE:</strong>
          </p>
        </motion.div>

        {/* Success Pattern Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {successSteps.map((step, index) => (
            <motion.div
              key={index}
              className="group relative bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                {index + 1}
              </div>

              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 ${
                  step.color === 'blue' ? 'bg-blue-500' :
                  step.color === 'purple' ? 'bg-purple-500' :
                  step.color === 'green' ? 'bg-green-500' : 'bg-blue-500'
                } rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {step.description}
                </p>
                
                {/* Example */}
                <div className="flex items-start gap-1.5 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
                  <span className="text-sm mt-0.5">💡</span>
                  <p className="text-xs text-blue-900 font-medium text-left leading-relaxed">
                    {step.example}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Insight - Enhanced */}
        <motion.div
          className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200 max-w-3xl mx-auto mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Klíčové zjištění</span>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-800 font-semibold leading-relaxed mb-2">
              <span className="text-green-600 font-bold">Podnikatelská čtvrtka</span> je ten stejný systém
            </p>
          </div>

          {/* Stats/Facts - element z varianty C */}
          <div className="bg-white/60 rounded-xl p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-600 mb-2">❌ Co NEBYLO potřeba:</p>
                <ul className="text-sm text-gray-700 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">•</span>
                    <span>Marketingové vzdělání</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">•</span>
                    <span>"Online marketing" zkušenosti</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">•</span>
                    <span>Složité strategie a "funnely"</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">✅ Co BYLO potřeba:</p>
                <ul className="text-sm text-gray-700 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    <span>Znát svoje zákazníky</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    <span>Víkend času vyplnit 9 políček</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    <span>Ochota to vyzkoušet</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <p className="text-center text-gray-700 leading-relaxed">
            Pokud to dokázal Martin v autoservisu, <strong className="text-gray-900">funguje to i ve vašem podnikání.</strong>
            <br/>
            <span className="text-sm text-gray-600 mt-2 inline-block">
              Nejste marketing expert? To je v pořádku. Čtvrtka vám ukáže, jak zpeněžit to, co už o zákaznících víte.
            </span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
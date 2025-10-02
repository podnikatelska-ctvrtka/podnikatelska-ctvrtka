import { motion } from "motion/react";
import { Lightbulb, Rocket, Brain } from "lucide-react";

export function CompactInsightsCards() {
  const insights = [
    {
      icon: Lightbulb,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      accentColor: "yellow",
      title: "💡 Největší překvapení",
      subtitle: "3 kavárny v jedné",
      mainInsight: "Zjistila jsem, že můžu obsloužit 3 úplně různé skupiny zákazníků:",
      segments: [
        "Freelanceři (8-11h & 14-17h) → WiFi + klid + zásuvky",
        "Byznys obědy (11-13h) → rychlé menu pro okolní kanceláře", 
        "Odpolední relax (17-19h) → dezerty a pohodová atmosféra"
      ],
      impact: "Personalizovaná nabídka pro každý segment",
      quote: "Zeptala jsem se stávajících zákazníků co potřebují. Pak jsem se inspirovala u CrossCafe a přizpůsobila to svému prostoru. Každá skupina chtěla něco jiného."
    },
    {
      icon: Rocket,
      iconColor: "text-orange-600", 
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      accentColor: "orange",
      title: "🚀 Nejrychlejší výsledek",
      subtitle: "Byznys obědy za 2 týdny",
      mainInsight: "Prázdný čas 11-13h jsem využila pro nový segment:",
      metrics: [
        { label: "Dodatečný příjem", value: "+15k Kč/měsíc" },
        { label: "Vytížení 11-13h", value: "0% → 85%" },
        { label: "Nových zákazníků", value: "+120/měsíc" }
      ],
      impact: "Návratnost 750% za první měsíc",
      quote: "Stačilo přidat rychlé menu a předobjednávky přes Instagram. Okolní kanceláře byly nadšené - konečně mají kam jít na oběd."
    },
    {
      icon: Brain,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50", 
      borderColor: "border-purple-200",
      accentColor: "purple",
      title: "🧠 Hlavní poznatek",
      subtitle: "Správní lidé + jejich potřeby",
      mainInsight: "Zaměřila jsem se na lidi, pro které mám největší hodnotu:",
      valueStack: [
        "Dezerty viditelně u pokladny (impulzivní nákupy)",
        "Barista doporučí co k čemu pasuje",
        "Kombo nabídky se slevou (káva+croissant 95 Kč místo 105 Kč)",
        "Domácí sušenka zdarma při první návštěvě"
      ],
      impact: "+123% průměrný účet stávajících zákazníků",
      quote: "Zjistila jsem přesně komu můžu nabídnout nejvíc hodnoty - freelancerům klid na práci, firmám rychlé obědy, párům atmosféru. A každému z nich dávám v��c než konkurence."
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {insights.map((insight, index) => {
        const Icon = insight.icon;
        
        return (
          <motion.div
            key={index}
            className={`${insight.bgColor} ${insight.borderColor} border-2 rounded-xl p-5 hover:shadow-lg transition-all duration-300 group`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ scale: 1.02, y: -3 }}
          >
            {/* Header */}
            <div className="text-center mb-4">
              <motion.div 
                className={`${insight.bgColor} p-2.5 rounded-full border-2 ${insight.borderColor} inline-flex group-hover:scale-110 transition-transform duration-300 mb-3`}
                whileHover={{ rotate: 15 }}
              >
                <Icon className={`w-5 h-5 ${insight.iconColor}`} />
              </motion.div>
              <h5 className={`font-bold mb-1 ${ 
                insight.accentColor === 'yellow' ? 'text-yellow-700' :
                insight.accentColor === 'orange' ? 'text-orange-700' :
                'text-purple-700'
              }`}>
                {insight.title}
              </h5>
              <p className={`text-sm ${ 
                insight.accentColor === 'yellow' ? 'text-yellow-600' :
                insight.accentColor === 'orange' ? 'text-orange-600' :
                'text-purple-600'
              }`}>
                {insight.subtitle}
              </p>
            </div>

            {/* Main Insight */}
            <div className="mb-3">
              <p className="text-gray-800 font-medium text-sm leading-relaxed">
                {insight.mainInsight}
              </p>
            </div>

            {/* Content based on type */}
            {insight.segments && (
              <div className="space-y-2 mb-4">
                {insight.segments.slice(0, 2).map((segment, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-2 bg-white rounded-lg border border-gray-200">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      insight.accentColor === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                      insight.accentColor === 'orange' ? 'bg-orange-100 text-orange-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className="text-gray-700 text-sm leading-relaxed">{segment}</span>
                  </div>
                ))}
              </div>
            )}

            {insight.metrics && (
              <div className="space-y-2 mb-4">
                {insight.metrics.map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-200">
                    <span className="text-gray-600 text-sm">{metric.label}:</span>
                    <span className={`font-bold text-sm ${
                      insight.accentColor === 'yellow' ? 'text-yellow-600' :
                      insight.accentColor === 'orange' ? 'text-orange-600' :
                      'text-purple-600'
                    }`}>
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {insight.valueStack && (
              <div className="space-y-2 mb-4">
                {insight.valueStack.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2 p-2 bg-white rounded-lg border border-gray-200">
                    <div className="text-green-500 text-sm mt-0.5">✓</div>
                    <span className="text-gray-700 text-sm flex-1 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Impact */}
            <div className="text-center mt-auto pt-2">
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full font-bold text-sm text-white ${
                insight.accentColor === 'yellow' ? 'bg-yellow-500' :
                insight.accentColor === 'orange' ? 'bg-orange-500' :
                'bg-purple-500'
              }`}>
                📊 {insight.impact}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
import { motion } from "motion/react";
import { Lightbulb, Rocket, Brain, TrendingUp, Users, DollarSign } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

export function InsightsVariantCards() {
  const insights = [
    {
      icon: Lightbulb,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      accentColor: "yellow",
      title: "💡 Největší překvapení",
      subtitle: "3 kavárny v jedné",
      quote: "Zjistila jsem, že mám vlastně 3 různé typy zákazníků, každý s úplně jinými potřebami:",
      segments: [
        { name: "Freelanceři", percent: 30, need: "Klid, wifi, dlouhé sezení", value: "kancelář" },
        { name: "Firemní klienti", percent: 40, need: "Rychlý oběd, meeting prostory", value: "efektivita" },
        { name: "Páry/přátelé", percent: 30, need: "Útulnost, romantiku", value: "kvalitní zážitek" }
      ],
      conclusion: "Před čtvrtkou jsem všem nabízela to samé. Teď mám pro každý segment jiný přístup.",
      impact: "Personalizovaná nabídka pro každý segment"
    },
    {
      icon: Rocket,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200", 
      accentColor: "orange",
      title: "🚀 Nejrychlejší výsledek",
      subtitle: "Business lunch hit",
      quote: "Business lunch program - implementace za 2 týdny, výsledky okamžité:",
      metrics: [
        { label: "Dodatečný příjem", value: 15, suffix: "k Kč/měsíc", period: "už první měsíc" },
        { label: "Nových klientů", value: 40, suffix: "+ firemních", period: "pravidelně" },
        { label: "Vytížení 11-14h", valueBefore: 20, valueAfter: 85, suffix: "%", period: "" },
        { label: "Průměrný účet", valueBefore: 180, valueAfter: 320, suffix: " Kč", period: "" }
      ],
      conclusion: "Stačilo přidat rychlé menu a rezervace. Žádné velké investice.",
      impact: "Návratnost 750% za první měsíc"
    },
    {
      icon: Brain,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      accentColor: "purple",
      title: "🧠 Hlavní poznatek",
      subtitle: "Více z méně",
      quote: "Největší objev byl, že nemusím hledat nové zákazníky. Stačí lépe využít ty současné.",
      comparison: {
        before: { visit: "1 návštěva", item: "1 káva", amount: 65 },
        after: { visit: "1 návštěva", item: "káva + dezert + Wi-Fi fee", amount: 145 },
        bonus: "Víkendové workshopy, večerní degustace",
        result: 123
      },
      conclusion: "Pomocí čtvrtky jsem vymyslela desítky způsobů, jak monetizovat stávající prostor a klienty.",
      impact: "+123% průměrný účet bez nových zákazníků"
    }
  ];

  return (
    <div className="space-y-6">
      <h4 className="text-xl font-semibold text-center text-gray-900 mb-8">
        🎯 Klíčové objevy Marie
      </h4>
      
      <div className="grid gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          
          return (
            <motion.div
              key={index}
              className={`${insight.bgColor} ${insight.borderColor} border-2 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              {/* Header */}
              <div className="flex items-center space-x-4 mb-4">
                <motion.div 
                  className={`${insight.bgColor} p-3 rounded-full border-2 ${insight.borderColor} group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 15 }}
                >
                  <Icon className={`w-6 h-6 ${insight.iconColor}`} />
                </motion.div>
                <div className="flex-1">
                  <h5 className={`font-bold text-lg ${
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
              </div>

              {/* Quote */}
              <div className="mb-6">
                <p className="text-gray-800 italic leading-relaxed">
                  "{insight.quote}"
                </p>
              </div>

              {/* Content based on type */}
              {insight.segments && (
                <div className="space-y-3 mb-4">
                  {insight.segments.map((segment, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          {segment.name} ({segment.percent}%)
                        </div>
                        <div className="text-sm text-gray-600">
                          {segment.need} - potřebují "{segment.value}"
                        </div>
                      </div>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        insight.accentColor === 'yellow' ? 'bg-yellow-100' :
                        insight.accentColor === 'orange' ? 'bg-orange-100' :
                        'bg-purple-100'
                      }`}>
                        <span className={`font-bold ${
                          insight.accentColor === 'yellow' ? 'text-yellow-600' :
                          insight.accentColor === 'orange' ? 'text-orange-600' :
                          'text-purple-600'
                        }`}>
                          {segment.percent}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {insight.metrics && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {insight.metrics.map((metric, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
                      {metric.valueBefore ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-red-600 text-sm">
                            <AnimatedCounter from={0} to={metric.valueBefore} />{metric.suffix}
                          </span>
                          <span className="text-gray-400">→</span>
                          <span className={`font-bold ${
                            insight.accentColor === 'yellow' ? 'text-yellow-600' :
                            insight.accentColor === 'orange' ? 'text-orange-600' :
                            'text-purple-600'
                          }`}>
                            <AnimatedCounter from={0} to={metric.valueAfter!} />{metric.suffix}
                          </span>
                        </div>
                      ) : (
                        <div className={`font-bold ${
                          insight.accentColor === 'yellow' ? 'text-yellow-600' :
                          insight.accentColor === 'orange' ? 'text-orange-600' :
                          'text-purple-600'
                        }`}>
                          +<AnimatedCounter from={0} to={metric.value!} />{metric.suffix}
                        </div>
                      )}
                      <div className="text-xs text-gray-500">{metric.period}</div>
                    </div>
                  ))}
                </div>
              )}

              {insight.comparison && (
                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="text-red-600 font-medium text-sm mb-1">❌ Před</div>
                      <div className="text-sm">
                        {insight.comparison.before.visit} → {insight.comparison.before.item}
                      </div>
                      <div className="text-red-700 font-bold">
                        <AnimatedCounter from={0} to={insight.comparison.before.amount} /> Kč průměr
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-green-600 font-medium text-sm mb-1">✅ Po</div>
                      <div className="text-sm">
                        {insight.comparison.after.visit} → {insight.comparison.after.item}
                      </div>
                      <div className="text-green-700 font-bold">
                        <AnimatedCounter from={0} to={insight.comparison.after.amount} /> Kč průměr
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                    <div className="text-sm text-gray-700 mb-2">
                      <strong>Bonus:</strong> {insight.comparison.bonus}
                    </div>
                    <div className="text-center">
                      <span className={`font-bold text-lg ${
                        insight.accentColor === 'yellow' ? 'text-yellow-600' :
                        insight.accentColor === 'orange' ? 'text-orange-600' :
                        'text-purple-600'
                      }`}>
                        +<AnimatedCounter from={0} to={insight.comparison.result} />% průměrný účet
                      </span>
                      <div className="text-xs text-gray-600">bez nových zákazníků</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Conclusion */}
              <div className={`p-4 rounded-lg border-2 mb-4 ${
                insight.accentColor === 'yellow' ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-200' :
                insight.accentColor === 'orange' ? 'bg-gradient-to-r from-orange-100 to-orange-50 border-orange-200' :
                'bg-gradient-to-r from-purple-100 to-purple-50 border-purple-200'
              }`}>
                <p className={`text-sm italic leading-relaxed ${
                  insight.accentColor === 'yellow' ? 'text-yellow-800' :
                  insight.accentColor === 'orange' ? 'text-orange-800' :
                  'text-purple-800'
                }`}>
                  "{insight.conclusion}"
                </p>
              </div>

              {/* Impact */}
              <div className="text-center">
                <span className={`inline-flex items-center px-4 py-2 rounded-full font-bold text-sm text-white ${
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
    </div>
  );
}
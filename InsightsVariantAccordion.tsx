import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Lightbulb, Rocket, Brain, Users, TrendingUp, Target } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

export function InsightsVariantAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  const insights = [
    {
      id: 0,
      icon: Lightbulb,
      emoji: "💡",
      title: "Největší překvapení",
      subtitle: "3 kavárny v jedné",
      color: "yellow",
      teaser: "Marie objevila, že má vlastně 3 různé kavárny v jedné...",
      content: {
        quote: "Zjistila jsem, že mám vlastně 3 různé typy zákazníků, každý s úplně jinými potřebami:",
        details: [
          {
            icon: Users,
            segment: "Freelanceři (30%)",
            need: "Klid, wifi, dlouhé sezení",
            solution: "Potřebují \"kancelář\"",
            color: "blue"
          },
          {
            icon: Target,
            segment: "Firemní klienti (40%)", 
            need: "Rychlý oběd, meeting prostory",
            solution: "Chtějí efektivitu",
            color: "green"
          },
          {
            icon: Users,
            segment: "Páry/přátelé (30%)",
            need: "Útulnost, romantiku",
            solution: "Kvalitní zážitek",
            color: "pink"
          }
        ],
        conclusion: "Před čtvrtkou jsem všem nabízela to samé. Teď mám pro každý segment jiný přístup.",
        impact: "Personalizovaná nabídka pro každý segment"
      }
    },
    {
      id: 1,
      icon: Rocket,
      emoji: "🚀",
      title: "Nejrychlejší výsledek",
      subtitle: "Business lunch program",
      color: "orange",
      teaser: "Za pouhé 2 týdny implementace +15.000 Kč měsíčně navíc...",
      content: {
        quote: "Business lunch program - implementace za 2 týdny, výsledky okamžité:",
        metrics: [
          { 
            label: "Dodatečný příjem", 
            value: 15, 
            suffix: "k Kč/měsíc", 
            period: "už první měsíc",
            icon: TrendingUp,
            color: "green"
          },
          { 
            label: "Nových klientů", 
            value: 40, 
            suffix: "+ firemních", 
            period: "pravidelně",
            icon: Users,
            color: "blue"
          },
          { 
            label: "Vytížení (11-14h)", 
            valueBefore: 20, 
            valueAfter: 85, 
            suffix: "%",
            icon: Target,
            color: "purple"
          },
          { 
            label: "Průměrný účet", 
            valueBefore: 180, 
            valueAfter: 320, 
            suffix: " Kč",
            icon: TrendingUp,
            color: "orange"
          }
        ],
        conclusion: "Stačilo přidat rychlé menu a rezervace. Žádné velké investice.",
        impact: "Návratnost 750% za první měsíc"
      }
    },
    {
      id: 2,
      icon: Brain,
      emoji: "🧠",
      title: "Hlavní poznatek",
      subtitle: "Více z méně strategie",
      color: "purple",
      teaser: "Nepotřebovala nové zákazníky - jen lépe využít stávající...",
      content: {
        quote: "Největší objev byl, že nemusím hledat nové zákazníky. Stačí lépe využít ty současné.",
        comparison: {
          before: {
            pattern: "1 návštěva → 1 káva",
            amount: 65,
            description: "Základní prodej"
          },
          after: {
            pattern: "1 návštěva → káva + dezert + Wi-Fi fee",
            amount: 145,
            description: "Kompletní zážitek"
          }
        },
        additions: [
          "Víkendové workshopy",
          "Večerní degustace vín",
          "Rozvoz kávy do kanceláří", 
          "Loajální zákaznický program"
        ],
        result: 123,
        conclusion: "Pomocí čtvrtky jsem vymyslela desítky způsobů, jak monetizovat stávající prostor a klienty.",
        impact: "+123% průměrný účet bez nových zákazníků"
      }
    }
  ];

  return (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold text-center text-gray-900 mb-6">
        🎯 Klíčové objevy Marie
      </h4>

      <div className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          const isActive = activeIndex === index;
          
          return (
            <motion.div
              key={insight.id}
              className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${
                isActive 
                  ? `border-${insight.color}-400 shadow-lg` 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              layout
            >
              {/* Header - Always visible */}
              <motion.button
                className={`w-full p-4 md:p-6 text-left transition-all duration-300 ${
                  isActive 
                    ? `bg-${insight.color}-50` 
                    : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => setActiveIndex(isActive ? -1 : index)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <motion.div 
                      className={`p-3 rounded-full ${
                        isActive ? `bg-${insight.color}-100` : 'bg-gray-100'
                      } transition-colors duration-300`}
                      whileHover={{ rotate: 15 }}
                    >
                      <Icon className={`w-6 h-6 ${
                        isActive ? `text-${insight.color}-600` : 'text-gray-600'
                      }`} />
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-2xl">{insight.emoji}</span>
                        <h5 className={`font-bold text-lg ${
                          isActive ? `text-${insight.color}-800` : 'text-gray-900'
                        }`}>
                          {insight.title}
                        </h5>
                      </div>
                      <p className={`text-sm ${
                        isActive ? `text-${insight.color}-600` : 'text-gray-600'
                      }`}>
                        {insight.subtitle}
                      </p>
                      {!isActive && (
                        <p className="text-xs text-gray-500 mt-2 italic">
                          {insight.teaser}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className={`w-5 h-5 ${
                      isActive ? `text-${insight.color}-600` : 'text-gray-400'
                    }`} />
                  </motion.div>
                </div>
              </motion.button>

              {/* Expandable content */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 md:p-6 pt-0 bg-white">
                      {/* Quote */}
                      <div className={`p-4 bg-${insight.color}-50 rounded-lg border border-${insight.color}-200 mb-6`}>
                        <p className={`text-${insight.color}-800 italic leading-relaxed`}>
                          "{insight.content.quote}"
                        </p>
                      </div>

                      {/* Content based on type */}
                      {insight.content.details && (
                        <div className="grid gap-4 mb-6">
                          {insight.content.details.map((detail: any, idx: number) => {
                            const DetailIcon = detail.icon;
                            return (
                              <motion.div
                                key={idx}
                                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                              >
                                <div className={`p-2 bg-${detail.color}-100 rounded-lg flex-shrink-0`}>
                                  <DetailIcon className={`w-5 h-5 text-${detail.color}-600`} />
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-900 mb-1">
                                    {detail.segment}
                                  </div>
                                  <div className="text-sm text-gray-600 mb-2">
                                    {detail.need}
                                  </div>
                                  <div className={`text-sm font-medium text-${detail.color}-700`}>
                                    → {detail.solution}
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}

                      {insight.content.metrics && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          {insight.content.metrics.map((metric: any, idx: number) => {
                            const MetricIcon = metric.icon;
                            return (
                              <motion.div
                                key={idx}
                                className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                              >
                                <div className="flex items-center space-x-3 mb-3">
                                  <div className={`p-2 bg-${metric.color}-100 rounded-lg`}>
                                    <MetricIcon className={`w-4 h-4 text-${metric.color}-600`} />
                                  </div>
                                  <div className="text-sm text-gray-600">{metric.label}</div>
                                </div>
                                
                                {metric.valueBefore ? (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-red-600 text-sm">
                                      <AnimatedCounter from={0} to={metric.valueBefore} />{metric.suffix}
                                    </span>
                                    <span className="text-gray-400">→</span>
                                    <span className={`text-${metric.color}-600 font-bold`}>
                                      <AnimatedCounter from={0} to={metric.valueAfter} />{metric.suffix}
                                    </span>
                                  </div>
                                ) : (
                                  <div className={`text-${metric.color}-600 font-bold text-lg`}>
                                    +<AnimatedCounter from={0} to={metric.value} />{metric.suffix}
                                  </div>
                                )}
                                
                                {metric.period && (
                                  <div className="text-xs text-gray-500 mt-1">{metric.period}</div>
                                )}
                              </motion.div>
                            );
                          })}
                        </div>
                      )}

                      {insight.content.comparison && (
                        <div className="space-y-4 mb-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                              <div className="text-red-600 font-medium text-sm mb-2">❌ Před</div>
                              <div className="text-sm mb-2">{insight.content.comparison.before.pattern}</div>
                              <div className="text-red-700 font-bold">
                                <AnimatedCounter from={0} to={insight.content.comparison.before.amount} /> Kč průměr
                              </div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                              <div className="text-green-600 font-medium text-sm mb-2">✅ Po</div>
                              <div className="text-sm mb-2">{insight.content.comparison.after.pattern}</div>
                              <div className="text-green-700 font-bold">
                                <AnimatedCounter from={0} to={insight.content.comparison.after.amount} /> Kč průměr
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                            <div className="text-sm font-medium text-gray-700 mb-3">🎁 Přidané služby:</div>
                            <div className="flex flex-wrap gap-2">
                              {insight.content.additions.map((addition: string, idx: number) => (
                                <span key={idx} className={`px-3 py-1 bg-${insight.color}-100 text-${insight.color}-700 rounded-full text-xs font-medium`}>
                                  {addition}
                                </span>
                              ))}
                            </div>
                            <div className="mt-4 text-center">
                              <span className={`text-${insight.color}-600 font-bold text-lg`}>
                                +<AnimatedCounter from={0} to={insight.content.result} />% průměrný účet
                              </span>
                              <div className="text-xs text-gray-600">bez nových zákazníků</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Conclusion */}
                      <div className={`p-4 bg-gradient-to-r from-${insight.color}-100 to-white rounded-lg border border-${insight.color}-300 mb-4`}>
                        <p className={`text-${insight.color}-800 italic leading-relaxed`}>
                          "{insight.content.conclusion}"
                        </p>
                      </div>

                      {/* Impact */}
                      <div className="text-center">
                        <span className={`inline-flex items-center px-4 py-2 bg-${insight.color}-500 text-white rounded-full font-bold text-sm`}>
                          📊 {insight.content.impact}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
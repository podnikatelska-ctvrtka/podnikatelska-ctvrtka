import { motion } from "motion/react";
import { Calendar, TrendingUp, Target, Award } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

export function InsightsVariantTimeline() {
  const timelineEvents = [
    {
      phase: "Týden 1-2",
      icon: Target,
      color: "blue",
      title: "💡 Analýza zákazníků",
      discovery: "3 kavárny v jedné",
      content: {
        type: "segments",
        data: [
          { segment: "Freelanceři", percent: 30, insight: "Potřebují klid a wifi → Pracovní prostředí" },
          { segment: "Business klienti", percent: 40, insight: "Chtějí rychlost a meeting → Efektivní služby" },
          { segment: "Páry & přátelé", percent: 30, insight: "Hledají útulnost → Kvalitní zážitek" }
        ]
      },
      quote: "Konečně jsem pochopila, komu vlastně vařím kávu!",
      impact: "Jasné segmentace zákazníků"
    },
    {
      phase: "Týden 3-4",
      icon: TrendingUp,
      color: "orange", 
      title: "🚀 První implementace",
      discovery: "Business lunch program",
      content: {
        type: "metrics",
        data: [
          { label: "Implementace", value: "2 týdny", highlight: true },
          { label: "Nový příjem", value: "+15k Kč/měsíc", highlight: true },
          { label: "Firemní klienti", value: "40+ pravidelných" },
          { label: "Vytížení", before: "20%", after: "85%", timeframe: "11-14h" },
          { label: "Průměrný účet", before: "180 Kč", after: "320 Kč" }
        ]
      },
      quote: "Za 2 týdny jsem vydělala víc než za půl roku!",
      impact: "+46% tržby jen z jedné změny"
    },
    {
      phase: "Měsíc 2-6",
      icon: Award,
      color: "purple",
      title: "🧠 Systematická optimalizace", 
      discovery: "Více z méně strategie",
      content: {
        type: "comparison",
        before: {
          pattern: "1 návštěva = 1 káva",
          revenue: 65,
          description: "Základní prodej"
        },
        after: {
          pattern: "1 návštěva = káva + dezert + Wi-Fi + bonus služby",
          revenue: 145,
          description: "Kompletní zážitek"
        },
        additions: [
          "Víkendové workshopy",
          "Večerní degustace vín", 
          "Rozvoz do kanceláří",
          "Loajální program"
        ]
      },
      quote: "Nepotřebovala jsem nové zákazníky - jen lépe využít ty stávající!",
      impact: "+123% průměrný účet za návštěvu"
    }
  ];

  return (
    <div className="space-y-6">
      <h4 className="text-xl font-semibold text-center text-gray-900 mb-8">
        ⏱️ Marie's Journey - Klíčové objevy v čase
      </h4>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-300 via-orange-300 to-purple-300"></div>

        <div className="space-y-8">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            
            return (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
              >
                {/* Timeline dot */}
                <motion.div 
                  className={`absolute left-6 w-4 h-4 bg-${event.color}-500 rounded-full border-4 border-white shadow-lg z-10`}
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.2 }}
                ></motion.div>

                {/* Content card */}
                <motion.div 
                  className={`ml-16 bg-white rounded-2xl shadow-lg border-l-4 border-${event.color}-400 p-6 hover:shadow-xl transition-all duration-300 group`}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 bg-${event.color}-100 rounded-lg`}>
                        <Icon className={`w-5 h-5 text-${event.color}-600`} />
                      </div>
                      <div>
                        <div className={`text-${event.color}-600 text-sm font-medium`}>
                          {event.phase}
                        </div>
                        <h5 className="font-bold text-gray-900">
                          {event.title}
                        </h5>
                      </div>
                    </div>
                    <div className={`px-3 py-1 bg-${event.color}-100 text-${event.color}-700 rounded-full text-xs font-medium`}>
                      {event.discovery}
                    </div>
                  </div>

                  {/* Content based on type */}
                  {event.content.type === 'segments' && (
                    <div className="grid gap-3 mb-4">
                      {event.content.data.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <span className="font-semibold text-gray-900">{item.segment}</span>
                            <span className={`ml-2 text-${event.color}-600`}>({item.percent}%)</span>
                            <div className="text-sm text-gray-600 mt-1">{item.insight}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {event.content.type === 'metrics' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      {event.content.data.map((metric: any, idx: number) => (
                        <div key={idx} className={`p-3 rounded-lg border ${metric.highlight ? `bg-${event.color}-50 border-${event.color}-200` : 'bg-gray-50 border-gray-200'}`}>
                          <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
                          {metric.before ? (
                            <div className="flex items-center space-x-2">
                              <span className="text-red-600 text-sm">{metric.before}</span>
                              <span className="text-gray-400">→</span>
                              <span className={`text-${event.color}-600 font-bold`}>{metric.after}</span>
                              {metric.timeframe && <span className="text-xs text-gray-500">({metric.timeframe})</span>}
                            </div>
                          ) : (
                            <div className={`font-bold ${metric.highlight ? `text-${event.color}-700` : 'text-gray-700'}`}>
                              {metric.value}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {event.content.type === 'comparison' && (
                    <div className="space-y-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                          <div className="text-red-600 font-medium text-sm mb-2">❌ Před</div>
                          <div className="text-sm mb-2">{event.content.before.pattern}</div>
                          <div className="text-red-700 font-bold">
                            <AnimatedCounter from={0} to={event.content.before.revenue} /> Kč průměr
                          </div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="text-green-600 font-medium text-sm mb-2">✅ Po</div>
                          <div className="text-sm mb-2">{event.content.after.pattern}</div>
                          <div className="text-green-700 font-bold">
                            <AnimatedCounter from={0} to={event.content.after.revenue} /> Kč průměr
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                        <div className="text-sm font-medium text-gray-700 mb-2">🎁 Přidané služby:</div>
                        <div className="flex flex-wrap gap-2">
                          {event.content.additions.map((addition: string, idx: number) => (
                            <span key={idx} className={`px-2 py-1 bg-${event.color}-100 text-${event.color}-700 rounded-full text-xs`}>
                              {addition}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quote */}
                  <div className={`p-4 bg-gradient-to-r from-${event.color}-50 to-${event.color}-100 rounded-lg border border-${event.color}-200 mb-4`}>
                    <p className={`text-${event.color}-800 italic text-sm leading-relaxed`}>
                      "{event.quote}"
                    </p>
                  </div>

                  {/* Impact */}
                  <div className="text-center">
                    <span className={`inline-flex items-center px-4 py-2 bg-${event.color}-500 text-white rounded-full text-sm font-bold`}>
                      📊 {event.impact}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
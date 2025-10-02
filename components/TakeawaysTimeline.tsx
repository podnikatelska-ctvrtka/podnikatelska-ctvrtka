import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import { Target, Rocket, Eye, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";

export function TakeawaysTimeline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const takeaways = [
    {
      icon: Target,
      number: "1",
      title: "Zeptej se zákazníků, nezůstávej v hlavě",
      subtitle: "47 odpovědí za týden → 3 jasné segmenty",
      description: "Marie dala na stoly leták se 3 otázkami. Za vyplnění káva zdarma. Získala 47 odpovědí za týden a objevila, že má 3 různé skupiny zákazníků - každou s jinými potřebami.",
      examples: [
        { emoji: "📋", text: "Vytvoř 3 jednoduché otázky pro zákazníky" },
        { emoji: "🎁", text: "Nabídni malý bonus za odpověď (káva, sleva)" },
        { emoji: "🔍", text: "Hledej vzorce - kdo chodí, kdy a proč" }
      ],
      color: "blue",
      bgGradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-300",
      textColor: "text-blue-700",
      iconBg: "bg-blue-100",
      accentColor: "text-blue-600"
    },
    {
      icon: Rocket,
      number: "2",
      title: "Testuj nejrychlejší win",
      titleExtra: "jako první",
      subtitle: "Obědové menu = +15k Kč za 2 týdny",
      description: "Marie měla prázdnou kavárnu v poledne, ale kolem byly kanceláře. Místo velkých změn spustila jen obědové menu s online objednávkou. První týden 12 objednávek, druhý týden 45.",
      examples: [
        { emoji: "⚡", text: "Vyber 1 segment, na který dosáhneš nejsnáz" },
        { emoji: "💰", text: "Spusť základní nabídku co nejdříve" },
        { emoji: "📈", text: "Když funguje, vylepšuj dál" }
      ],
      color: "orange",
      bgGradient: "from-orange-50 to-red-50",
      borderColor: "border-orange-300",
      textColor: "text-orange-700",
      iconBg: "bg-orange-100",
      accentColor: "text-orange-600"
    },
    {
      icon: Eye,
      number: "3",
      title: "Minimální investice, maximální efekt",
      subtitle: "3.500 Kč → 35+ pravidelných zákazníků",
      description: "Freelance zóna: rychlejší WiFi za 2.800 Kč + prodlužovačky + plakátky (700 Kč). Celkem 3.500 Kč investice. Výsledek: 35+ pravidelných freelancerů, kteří utrácejí 3-4× víc než běžný zákazník.",
      examples: [
        { emoji: "💰", text: "Co s minimální investicí?" },
        { emoji: "🎯", text: "Zaměř se na jednu skupinu zákazníků" },
        { emoji: "🚀", text: "Testuj rychle, neříkej 'ještě to není dokonalé'" }
      ],
      color: "green",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-300",
      textColor: "text-green-700",
      iconBg: "bg-green-100",
      accentColor: "text-green-600"
    }
  ];

  const nextTakeaway = () => {
    setCurrentIndex((prev) => (prev + 1) % takeaways.length);
  };

  const prevTakeaway = () => {
    setCurrentIndex((prev) => (prev - 1 + takeaways.length) % takeaways.length);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prevTakeaway();
    } else if (info.offset.x < -threshold) {
      nextTakeaway();
    }
  };

  return (
    <div className="space-y-6">
      {/* Timeline connector line - hidden on mobile */}
      <div className="hidden md:block relative">
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-blue-200 via-orange-200 to-green-200 transform -translate-y-1/2" />
      </div>

      {/* DESKTOP - Grid Layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 md:gap-6 relative">
        {takeaways.map((takeaway, index) => {
          const Icon = takeaway.icon;
          
          return (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Timeline icon badge */}
              <div className="flex justify-center mb-3 md:mb-4">
                <motion.div 
                  className={`w-16 h-16 rounded-full ${takeaway.iconBg} border-4 ${takeaway.borderColor} shadow-lg flex items-center justify-center relative z-10 bg-white`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className={`w-7 h-7 ${takeaway.accentColor}`} />
                </motion.div>
              </div>

              {/* Content card */}
              <motion.div
                className={`bg-gradient-to-br ${takeaway.bgGradient} rounded-2xl p-4 md:p-5 pb-3 md:pb-4 shadow-md h-full`}
                whileHover={{ y: -5, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                {/* Title */}
                <h4 className={`font-bold text-xl md:text-2xl mb-2 ${takeaway.textColor} text-center`}>
                  {takeaway.title}
                  {takeaway.titleExtra && (
                    <>
                      <br />
                      {takeaway.titleExtra}
                    </>
                  )}
                </h4>
                <p className={`text-sm md:text-base mb-3 md:mb-4 ${takeaway.accentColor} font-medium text-center`}>
                  {takeaway.subtitle}
                </p>

                {/* Description */}
                <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                  {takeaway.description}
                </p>

                {/* Examples */}
                <div className="space-y-2">
                  {takeaway.examples.map((example, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-2 md:gap-3 bg-white/70 rounded-lg p-2 md:p-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.2 + idx * 0.1 }}
                    >
                      <span className="text-lg md:text-xl flex-shrink-0">{example.emoji}</span>
                      <span className="text-gray-700 text-sm md:text-base font-medium flex-1">
                        {example.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* MOBILE - Swipeable Carousel */}
      <div className="md:hidden relative">
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="px-2"
            >
              {(() => {
                const takeaway = takeaways[currentIndex];
                const Icon = takeaway.icon;
                
                return (
                  <div className="relative">
                    {/* Timeline icon badge */}
                    <div className="flex justify-center mb-4">
                      <div 
                        className={`w-16 h-16 rounded-full ${takeaway.iconBg} border-4 ${takeaway.borderColor} shadow-lg flex items-center justify-center relative z-10 bg-white`}
                      >
                        <Icon className={`w-7 h-7 ${takeaway.accentColor}`} />
                      </div>
                    </div>

                    {/* Content card */}
                    <div
                      className={`bg-gradient-to-br ${takeaway.bgGradient} rounded-2xl p-5 shadow-md`}
                    >
                      {/* Title */}
                      <h4 className={`font-bold text-xl mb-2 ${takeaway.textColor} text-center`}>
                        {takeaway.title}
                        {takeaway.titleExtra && (
                          <>
                            <br />
                            {takeaway.titleExtra}
                          </>
                        )}
                      </h4>
                      <p className={`text-base mb-4 ${takeaway.accentColor} font-medium text-center`}>
                        {takeaway.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-gray-700 text-base leading-relaxed mb-4">
                        {takeaway.description}
                      </p>

                      {/* Examples */}
                      <div className="space-y-2">
                        {takeaway.examples.map((example, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 bg-white/70 rounded-lg p-3 border border-gray-200"
                          >
                            <span className="text-xl flex-shrink-0">{example.emoji}</span>
                            <span className="text-gray-700 text-base font-medium flex-1">
                              {example.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows - Mobile */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prevTakeaway}
            className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Předchozí poznatek"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Dots indicators */}
          <div className="flex gap-2">
            {takeaways.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-8 bg-blue-600' 
                    : 'w-2 bg-gray-300'
                }`}
                aria-label={`Přejít na poznatek ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTakeaway}
            className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Další poznatek"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

    </div>
  );
}
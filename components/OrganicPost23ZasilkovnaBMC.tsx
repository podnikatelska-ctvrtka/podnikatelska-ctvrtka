import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * 📦 ORGANIC POST #23: ZÁSILKOVNA BMC
 * 
 * VALUE CONTENT - Educational rozbor Business Model Canvas
 * Format: Animated carousel (4 slides)
 * Angle: "Takhle vypadá úspěšný byznys - na 1 stránce"
 */

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  items: string[];
  color: string;
  emoji: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    title: "JAK TO ZAČALO?",
    subtitle: "Zásilkovna vs Česká pošta",
    emoji: "📦",
    color: "from-orange-500 to-red-500",
    items: [
      "Neměli lepší technologii",
      "Neměli víc peněz",
      "Našli chytřejší způsob"
    ]
  },
  {
    id: 2,
    title: "CO ŘEŠILI?",
    subtitle: "Bolesti zákazníků",
    emoji: "😤",
    color: "from-red-500 to-pink-500",
    items: [
      "Pošta = fronty, čekání, stres",
      "Nulová flexibilita",
      "Drahá doprava",
      "Frustrovaní zákazníci"
    ]
  },
  {
    id: 3,
    title: "JAK TO VYŘEŠILI?",
    subtitle: "Jejich strategie",
    emoji: "💡",
    color: "from-green-500 to-emerald-500",
    items: [
      "10,000+ výdejních míst",
      "Flexibilní vyzvednutí",
      "Levnější než pošta",
      "Win-win pro všechny"
    ]
  },
  {
    id: 4,
    title: "VÝSLEDEK",
    subtitle: "Kam se dostali?",
    emoji: "🚀",
    color: "from-purple-500 to-pink-500",
    items: [
      "10+ mld Kč hodnota",
      "30+ zemí",
      "Dominantní hráč v CZ/SK",
      "Postavili udržitelný byznys"
    ]
  }
];

export function OrganicPost23ZasilkovnaBMC() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)`
        }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="relative h-full flex flex-col items-center justify-center p-16"
        >
          {/* Slide number indicator */}
          <div className="absolute top-12 right-12 flex gap-3">
            {SLIDES.map((_, index) => (
              <div
                key={index}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-12 bg-white' 
                    : 'w-3 bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* Emoji header */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-9xl mb-8"
          >
            {slide.emoji}
          </motion.div>

          {/* Title badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`inline-block px-8 py-3 bg-gradient-to-r ${slide.color} rounded-full text-white text-base font-bold uppercase tracking-wider mb-6`}
          >
            {slide.title}
          </motion.div>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl text-white text-center mb-12 px-8"
          >
            {slide.subtitle}
          </motion.h2>

          {/* Items list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-5 w-full max-w-3xl px-8"
          >
            {slide.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <span className={`shrink-0 w-3 h-3 rounded-full bg-gradient-to-r ${slide.color} mt-2`} />
                <span className="text-white/90 text-xl leading-relaxed">
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-2 bg-white/10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 4, ease: "linear" }}
            style={{ transformOrigin: "left" }}
          >
            <div className={`h-full bg-gradient-to-r ${slide.color}`} />
          </motion.div>

        </motion.div>
      </AnimatePresence>

      {/* Branding - bottom corner */}
      <div className="absolute bottom-8 left-8 text-white/60 text-sm">
        podnikatelskactvrtka.cz
      </div>
    </div>
  );
}
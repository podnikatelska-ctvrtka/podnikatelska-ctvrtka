import { motion } from 'motion/react';
import { Calendar, TrendingDown, TrendingUp, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * 📱 ORGANIC POST #22: TÝDEN VALIDACE
 * 
 * KONCEPT: Carousel - každý den samostatný slide
 * ANGLE: Pure educational framework
 * FORMAT: 4:5 portrait (1080x1350)
 * ANIMACE: Auto-rotating carousel (8 slides)
 * EMOTION: Clarity (přesný postup co dělat)
 */

export function OrganicPost22WeekValidation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 9); // 9 slides total
    }, 4000); // 4 seconds per slide

    return () => clearInterval(timer);
  }, []);

  const slides = [
    // SLIDE 0: Hook
    {
      type: 'hook',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-7xl font-black text-white mb-6 leading-tight">
              Jak otestovat<br/>nápad za TÝDEN?
            </h1>
            <p className="text-3xl text-orange-300 font-bold mb-8">
              Místo měsíců plánování,<br/>validuj za 7 dní.
            </p>
            <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">
              <p className="text-2xl text-white/90">
                Každý den = jeden konkrétní úkol
              </p>
            </div>
          </motion.div>
        </div>
      )
    },

    // SLIDES 1-7: Each day
    ...([
      { 
        day: 1, 
        emoji: '🎯', 
        title: 'KDO?', 
        subtitle: 'Bez zákazníka = bez byznysu', 
        task1: 'Napiš 3 typy lidí kteří to potřebují', 
        task2: 'Vyber skupinu kterou OSOBNĚ znáš', 
        color: 'from-blue-500 to-cyan-500' 
      },
      { 
        day: 2, 
        emoji: '❓', 
        title: 'PROBLÉM?', 
        subtitle: 'Tvůj nápad ≠ jejich realita', 
        task1: 'Sejdi se s 10 lidmi. Káva, call, DM.', 
        task2: '"Jak to řešíš teď? Co tě na tom štve?"', 
        color: 'from-purple-500 to-pink-500' 
      },
      { 
        day: 3, 
        emoji: '💔', 
        title: 'BOLEST?', 
        subtitle: 'Pattern = pravda', 
        task1: 'Vezmi 10 odpovědí ze včerejška', 
        task2: 'Co říká minimálně 5 lidí stejně?', 
        color: 'from-red-500 to-orange-500' 
      },
      { 
        day: 4, 
        emoji: '💡', 
        title: 'ŘEŠENÍ?', 
        subtitle: 'Jednoduchá věta = jasný produkt', 
        task1: 'Zkus: "Pomůžu [komu] s [čím] pomocí [jak]"', 
        task2: 'Musí to pochopit i tvoje babička', 
        color: 'from-yellow-500 to-orange-500' 
      },
      { 
        day: 5, 
        emoji: '💰', 
        title: 'CENA?', 
        subtitle: 'Platí = validace. Neplatí = hobby.', 
        task1: 'Zeptej se 5 lidí: "Kolik bys za to dal?"', 
        task2: 'Nechej je odpovědět první. Mlč.', 
        color: 'from-green-500 to-emerald-500' 
      },
      { 
        day: 6, 
        emoji: '🔍', 
        title: 'KONKURENCE?', 
        subtitle: 'Kopírovat ≠ špatně. Ignorovat = blbost.', 
        task1: 'Google, Instagram, LinkedIn. 30 minut.', 
        task2: 'Kdo to dělá? Za kolik? Jak se prodávají?', 
        color: 'from-indigo-500 to-purple-500' 
      },
      { 
        day: 7, 
        emoji: '✅', 
        title: 'ROZHODNUTÍ', 
        subtitle: 'Data > pocity', 
        task1: '✅ Lidé platí + mluví o tom = jdi do toho', 
        task2: '❌ Nezaplatí nebo tě ignorují = změň nápad', 
        color: 'from-pink-500 to-red-500' 
      },
    ].map((day) => ({
      type: 'day',
      content: (
        <div className="flex flex-col items-center justify-center h-full px-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {/* Day number badge */}
            <div className="flex justify-center mb-8">
              <div className={`w-32 h-32 bg-gradient-to-br ${day.color} rounded-full flex items-center justify-center`}>
                <span className="text-6xl font-black text-white">{day.day}</span>
              </div>
            </div>

            {/* Emoji + Title */}
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">{day.emoji}</div>
              <h2 className="text-6xl font-black text-white mb-3">{day.title}</h2>
              <p className="text-3xl text-orange-300 font-bold">{day.subtitle}</p>
            </div>

            {/* Tasks */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <ChevronRight className="w-8 h-8 text-orange-400 flex-shrink-0 mt-1" />
                  <p className="text-2xl text-white/90 leading-relaxed">{day.task1}</p>
                </div>
                <div className="flex items-start gap-4">
                  <ChevronRight className="w-8 h-8 text-orange-400 flex-shrink-0 mt-1" />
                  <p className="text-2xl text-white/90 leading-relaxed">{day.task2}</p>
                </div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {[1,2,3,4,5,6,7].map((d) => (
                <div
                  key={d}
                  className={`h-2 rounded-full transition-all ${
                    d === day.day 
                      ? 'w-12 bg-orange-400' 
                      : d < day.day 
                        ? 'w-2 bg-white/40'
                        : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      )
    }))),

    // SLIDE 8: Result + CTA
    {
      type: 'cta',
      content: (
        <div className="flex flex-col items-center justify-center h-full px-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            {/* Results */}
            <div className="text-center mb-10">
              <h2 className="text-5xl font-black text-white mb-8">VÝSLEDEK:</h2>
              <div className="grid grid-cols-3 gap-6 mb-10">
                <div>
                  <div className="text-6xl font-black text-green-400 mb-2">7</div>
                  <div className="text-xl text-white/70">dní práce</div>
                </div>
                <div>
                  <div className="text-6xl font-black text-green-400 mb-2">0</div>
                  <div className="text-xl text-white/70">Kč investice</div>
                </div>
                <div>
                  <div className="text-6xl font-black text-green-400 mb-2">100%</div>
                  <div className="text-xl text-white/70">data</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 text-center mb-6">
              <p className="text-2xl text-white/90 mb-2 leading-relaxed">
                Tahle validace ti ukáže<br/>
                <span className="font-black text-3xl">JESTLI</span> má nápad smysl.
              </p>
              <p className="text-2xl text-white/90 mb-6 leading-relaxed">
                Model podnikání ti ukáže<br/>
                <span className="font-black text-3xl">JAK</span> ho postavit.
              </p>
              
              <div className="bg-white/20 rounded-2xl p-6 mb-6">
                <div className="text-xl text-white/90 mb-4">
                  <strong>V Podnikatelské Čtvrtce dostaneš:</strong>
                </div>
                <div className="space-y-2 text-left">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-white">Kompletní Model podnikání</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-white">Akční plán co dělat dál</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-white">Framework jak ověřit nápad</span>
                  </div>
                </div>
              </div>

              <div className="text-4xl font-black text-white mb-3">
                Podnikatelská Čtvrtka
              </div>
              <div className="text-2xl text-yellow-300 font-bold">
                4 999 Kč • 90 minut
              </div>
            </div>

            <div className="text-center">
              <a 
                href="https://podnikatelskactvrtka.cz" 
                className="text-orange-300 text-2xl font-bold hover:text-orange-200 transition-colors"
              >
                👉 www.podnikatelskactvrtka.cz
              </a>
            </div>
          </motion.div>
        </div>
      )
    }
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid22" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid22)" />
        </svg>
      </div>

      {/* Slides */}
      <div className="relative z-10 h-full">
        {slides[currentSlide].content}
      </div>

      {/* Slide counter */}
      <div className="absolute top-8 right-8 z-20 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
        <span className="text-white font-bold">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
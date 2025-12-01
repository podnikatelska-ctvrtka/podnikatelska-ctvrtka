// VALUE #3: EDUCATION - "Jak na úspěšný byznys"
// Laický, common sense přístup - "dává rozum, ne?"
// 5 slides carousel s edukací + soft punch na konci
// Hovorový jazyk, feels like brnkačka
// SQUARE FORMAT 1:1 (1080x1080) - READY FOR SHAREX → FB + IG

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Value3EducationVideo() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  // Auto-advance každých 4 sekund
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-[1080px] h-[1080px] bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex flex-col items-center justify-center px-12 py-10 text-center overflow-hidden relative">
      
      {/* Slides */}
      <div className="w-full h-full flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          {currentSlide === 0 && <Slide1Intro key="slide1" />}
          {currentSlide === 1 && <Slide2Zakaznici key="slide2" />}
          {currentSlide === 2 && <Slide3Produkt key="slide3" />}
          {currentSlide === 3 && <Slide4Prodej key="slide4" />}
          {currentSlide === 4 && <Slide5Punch key="slide5" />}
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-20">
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? 'w-16 h-4 bg-purple-400'
                : 'w-4 h-4 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Animované pozadí */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}

// SLIDE 1: INTRO - Hook
function Slide1Intro() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col items-center justify-center px-6"
    >
      {/* Icon */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-8xl mb-10"
      >
        💡
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg"
      >
        Jak na úspěšný<br/>
        byznys?
      </motion.h1>

      {/* Subheadline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/20 backdrop-blur-sm rounded-2xl px-10 py-5 border-2 border-white/30"
      >
        <p className="text-3xl text-gray-200">
          (Není to rocket science 🚀)
        </p>
      </motion.div>
    </motion.div>
  );
}

// SLIDE 2: ZÁKAZNÍCI
function Slide2Zakaznici() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col items-center justify-center px-6"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-400 text-gray-900 px-6 py-2 rounded-full shadow-xl border-2 border-blue-500 mb-8"
      >
        <p className="font-black text-xl">KROK 1</p>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-blue-600/90 to-cyan-600/90 backdrop-blur-sm rounded-3xl p-12 border-4 border-blue-400/70 max-w-4xl w-full"
      >
        <p className="text-5xl font-black text-white mb-6 leading-tight">
          Musíš vědět<br/>
          <span className="text-cyan-300">NA KOHO</span> cílíš
        </p>
        
        <p className="text-4xl font-black text-white mb-8 leading-tight">
          A jestli <span className="text-cyan-300">JICH JE DOST</span>
        </p>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 inline-block">
          <p className="text-3xl text-gray-100">
            Dává rozum, ne? 🤷‍♂️
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// SLIDE 3: PRODUKT
function Slide3Produkt() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col items-center justify-center px-6"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-purple-400 text-gray-900 px-6 py-2 rounded-full shadow-xl border-2 border-purple-500 mb-8"
      >
        <p className="font-black text-xl">KROK 2</p>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-3xl p-12 border-4 border-purple-400/70 max-w-4xl w-full"
      >
        <p className="text-5xl font-black text-white mb-6 leading-tight">
          Máš produkt - super! 👍
        </p>
        
        <p className="text-4xl font-black text-white mb-6 leading-tight">
          Ale <span className="text-pink-300">CHTĚJÍ HO</span><br/>
          tvoji zákazníci?
        </p>

        <p className="text-4xl font-black text-white mb-8 leading-tight">
          Musíš si to <span className="text-pink-300">OVĚŘIT</span>
        </p>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 inline-block">
          <p className="text-3xl text-gray-100">
            Logický, ne? 💡
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// SLIDE 4: PRODEJ
function Slide4Prodej() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col items-center justify-center px-6"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-green-400 text-gray-900 px-6 py-2 rounded-full shadow-xl border-2 border-green-500 mb-8"
      >
        <p className="font-black text-xl">KROK 3</p>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-green-600/90 to-emerald-600/90 backdrop-blur-sm rounded-3xl p-12 border-4 border-green-400/70 max-w-4xl w-full"
      >
        <p className="text-5xl font-black text-white mb-6 leading-tight">
          "Jak to prodat<br/>
          je těžký!" 😰
        </p>
        
        <p className="text-6xl font-black text-white mb-8 leading-tight">
          <span className="text-green-300">EASY</span>
        </p>

        <p className="text-4xl font-black text-white mb-8 leading-tight">
          když víš <span className="text-green-300">KDO</span> to je<br/>
          a <span className="text-green-300">CO CHTĚJÍ</span>
        </p>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 inline-block">
          <p className="text-3xl text-gray-100">
            Jasný, ne? ✅
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// SLIDE 5: PUNCH
function Slide5Punch() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col items-center justify-center px-6"
    >
      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-orange-600/95 to-yellow-600/95 backdrop-blur-sm rounded-3xl p-16 border-4 border-yellow-400/70 max-w-5xl w-full mb-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-7xl font-black text-white mb-8 leading-tight">
            PODNIKÁNÍ<br/>
            <span className="text-yellow-300">JINAK</span> ⚡
          </p>
          
          <div className="space-y-5">
            <p className="text-4xl font-black text-white">
              Model za 90 minut
            </p>
            
            <p className="text-3xl font-black text-gray-100">
              Revoluční způsob cílení
            </p>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-10 py-5 inline-block mt-6">
              <p className="text-3xl font-black text-white">
                To je Čtvrtka
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Brand */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <p className="text-4xl font-black text-white">
          PODNIKATELSKÁ ČTVRTKA
        </p>
      </motion.div>
    </motion.div>
  );
}
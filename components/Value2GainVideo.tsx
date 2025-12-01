// VALUE #2: GAIN - CAROUSEL VIDEO (3 slides)
// Transformační příběh: DNES → PO ČTVRTCE → ZA MĚSÍC
// SQUARE FORMAT 1:1 (1080x1080) - READY FOR SHAREX → FB + IG
// Auto-advance carousel s pagination dots

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Value2GainVideo() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  // Individuální timing pro každý slide (podle množství obsahu)
  const slideTiming = [
    4500,  // Slide 1 (DNES) - 3 boxy, delay do 0.7s → potřebuje víc času
    4500,  // Slide 2 (PO ČTVRTCE) - 3 boxy, delay do 0.7s → stejně
    5500,  // Slide 3 (ZA MĚSÍC) - 4 boxy + punch, delay do 1.1s → ještě víc času
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, slideTiming[currentSlide]);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="w-[1080px] h-[1080px] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center px-12 py-10 text-center overflow-hidden relative">
      
      {/* Slides */}
      <div className="w-full h-full flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          {currentSlide === 0 && <Slide1Dnes key="slide1" />}
          {currentSlide === 1 && <Slide2PoCtvrtce key="slide2" />}
          {currentSlide === 2 && <Slide3ZaMesic key="slide3" />}
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-20">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? 'w-16 h-4 bg-cyan-400'
                : 'w-4 h-4 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Animované pozadí */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
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

// SLIDE 1: DNES - Problémový stav
function Slide1Dnes() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col items-center justify-center px-6"
    >
      {/* Badge */}
      <div className="bg-red-500 text-white px-6 py-2 rounded-full shadow-xl border-2 border-red-600 mb-6">
        <p className="font-black text-xl">😰 DNES</p>
      </div>

      {/* Headline */}
      <h1 className="text-7xl font-black text-white mb-10 leading-tight drop-shadow-lg">
        <span className="text-red-300">Tvůj byznys</span><br/>
        teď
      </h1>

      {/* Problémy - 3 velké boxy */}
      <div className="space-y-4 w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-red-900/80 backdrop-blur-sm rounded-2xl p-7 border-2 border-red-500/50"
        >
          <p className="text-4xl mb-2">😵‍💫</p>
          <p className="text-3xl font-black text-white mb-2">Nevíš co dělat zítra</p>
          <p className="text-xl text-gray-200">Každý den chaos • Žádný plán • Co teď?</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-red-900/80 backdrop-blur-sm rounded-2xl p-7 border-2 border-red-500/50"
        >
          <p className="text-4xl mb-2">💸</p>
          <p className="text-3xl font-black text-white mb-2">Málo peněz</p>
          <p className="text-xl text-gray-200">Pořád tvrdě makáš • Stres z účtů</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-red-900/80 backdrop-blur-sm rounded-2xl p-7 border-2 border-red-500/50"
        >
          <p className="text-4xl mb-2">⏰</p>
          <p className="text-3xl font-black text-white mb-2">Žádný čas</p>
          <p className="text-xl text-gray-200">Rodina ti uniká • Pořád v práci</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// SLIDE 2: PO ČTVRTCE - Immediate transformation
function Slide2PoCtvrtce() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col items-center justify-center px-6"
    >
      {/* Badge */}
      <div className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full shadow-xl border-2 border-yellow-500 mb-6">
        <p className="font-black text-xl">💡 PO ČTVRTCE</p>
      </div>

      {/* Headline */}
      <h1 className="text-7xl font-black text-white mb-10 leading-tight drop-shadow-lg">
        <span className="text-yellow-300">Co máš</span><br/>
        hned
      </h1>

      {/* Gains - 3 velké boxy */}
      <div className="space-y-4 w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-yellow-600/90 to-orange-600/90 backdrop-blur-sm rounded-2xl p-7 border-2 border-yellow-400/70"
        >
          <p className="text-4xl mb-2">🎯</p>
          <p className="text-3xl font-black text-white mb-2">Jasný směr</p>
          <p className="text-xl text-gray-100">Víš kam jdeš • Plán na měsíce dopředu</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-yellow-600/90 to-orange-600/90 backdrop-blur-sm rounded-2xl p-7 border-2 border-yellow-400/70"
        >
          <p className="text-4xl mb-2">💼</p>
          <p className="text-3xl font-black text-white mb-2">Model podnikání</p>
          <p className="text-xl text-gray-100">Víš koho oslovit • Jak prodávat • Co nabízet</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-yellow-600/90 to-orange-600/90 backdrop-blur-sm rounded-2xl p-7 border-2 border-yellow-400/70"
        >
          <p className="text-4xl mb-2">🚀</p>
          <p className="text-3xl font-black text-white mb-2">Akční plán</p>
          <p className="text-xl text-gray-100">Víš co dělat první • Žádné bloudění</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// SLIDE 3: ZA MĚSÍC - Long-term gains
function Slide3ZaMesic() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col items-center justify-center px-6"
    >
      {/* Badge */}
      <div className="bg-cyan-400 text-gray-900 px-6 py-2 rounded-full shadow-xl border-2 border-cyan-500 mb-6">
        <p className="font-black text-xl">🚀 ZA MĚSÍC</p>
      </div>

      {/* Headline */}
      <h1 className="text-6xl font-black text-white mb-8 leading-tight drop-shadow-lg">
        <span className="text-cyan-300">Představ si:</span><br/>
        Tvůj byznys
      </h1>

      {/* 4 GAINS - Grid 2x2 */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-600/90 to-emerald-600/90 backdrop-blur-sm rounded-2xl p-6 border-4 border-green-400/70"
        >
          <p className="text-5xl mb-2">💰</p>
          <p className="text-3xl font-black text-white mb-2">Víc tržeb</p>
          <p className="text-lg text-gray-100">Každý měsíc lepší čísla</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-blue-600/90 to-cyan-600/90 backdrop-blur-sm rounded-2xl p-6 border-4 border-blue-400/70"
        >
          <p className="text-5xl mb-2">📞</p>
          <p className="text-3xl font-black text-white mb-2">Plný kalendář</p>
          <p className="text-lg text-gray-100">Zákazníci se hlásí sami</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-2xl p-6 border-4 border-purple-400/70"
        >
          <p className="text-5xl mb-2">⏰</p>
          <p className="text-3xl font-black text-white mb-2">Volný čas</p>
          <p className="text-lg text-gray-100">Nemusíš makat 24/7</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-yellow-600/90 to-orange-600/90 backdrop-blur-sm rounded-2xl p-6 border-4 border-yellow-400/70"
        >
          <p className="text-5xl mb-2">😌</p>
          <p className="text-3xl font-black text-white mb-2">Klidná hlava</p>
          <p className="text-lg text-gray-100">Můžeš plánovat budoucnost</p>
        </motion.div>
      </div>

      {/* PUNCH - velká zpráva */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="mt-8"
      >
        <p className="text-4xl font-black text-white mb-2">
          PODNIKATELSKÁ ČTVRTKA
        </p>
        <p className="text-xl text-gray-300">
          90 minut • Model podnikání
        </p>
      </motion.div>
    </motion.div>
  );
}
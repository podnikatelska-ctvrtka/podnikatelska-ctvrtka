// POST #17: MYTH BUSTER - VIDEO ANIMACE
// ❌ CO NEPOTŘEBUJEŠ K ÚSPĚŠNÉMU PODNIKÁNÍ
// SQUARE FORMAT 1:1 (1080x1080) - READY FOR REEL/STORIES
// Sequential reveal: Intro → 4 mýty (jeden po druhém) → Outro CTA

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Building2, Megaphone, Users } from 'lucide-react';

const myths = [
  {
    icon: Package,
    title: "Objednat tisíce kusů napřed",
    subtitle: "Nemusíš investovat do výroby. Stačí ověřit ŽE to někdo chce."
  },
  {
    icon: Building2,
    title: "Pronajmout si prostor hned",
    subtitle: "Nepotřebuješ kancelář. Potřebuješ PRVNĚ vědět že to funguje."
  },
  {
    icon: Megaphone,
    title: "Čekat se spuštěním než začneš marketing",
    subtitle: "Nemusíš mít hotovo. Marketing může běžet UŽ TEĎ."
  },
  {
    icon: Users,
    title: "Najmout tým na začátku",
    subtitle: "Nepotřebuješ lidi. Potřebuješ vědět CO vůbec dělat."
  }
];

export function OrganicPost17MythBusterVideo() {
  const [currentScene, setCurrentScene] = useState(0);
  // 0 = intro, 1-4 = myths, 5 = outro
  const totalScenes = 6;

  // Timing pro každou scénu
  const sceneTiming = [
    3000,  // Intro
    4500,  // Myth 1
    4500,  // Myth 2
    4500,  // Myth 3
    4500,  // Myth 4
    5000,  // Outro
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScene((prev) => (prev + 1) % totalScenes);
    }, sceneTiming[currentScene]);
    return () => clearTimeout(timer);
  }, [currentScene]);

  return (
    <div className="w-[1080px] h-[1080px] bg-white flex flex-col items-center justify-center overflow-hidden relative">
      
      {/* Scenes */}
      <div className="w-full h-full flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          {currentScene === 0 && <IntroScene key="intro" />}
          {currentScene === 1 && <MythScene key="myth1" myth={myths[0]} mythNumber={1} />}
          {currentScene === 2 && <MythScene key="myth2" myth={myths[1]} mythNumber={2} />}
          {currentScene === 3 && <MythScene key="myth3" myth={myths[2]} mythNumber={3} />}
          {currentScene === 4 && <MythScene key="myth4" myth={myths[3]} mythNumber={4} />}
          {currentScene === 5 && <OutroScene key="outro" />}
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-20">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentScene(index)}
            className={`transition-all duration-300 rounded-full ${
              currentScene === index
                ? 'w-12 h-3 bg-red-600'
                : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// INTRO SCENE: Hook
function IntroScene() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full flex flex-col items-center justify-center px-12 text-center"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-red-50 text-red-600 px-8 py-3 rounded-full mb-8"
      >
        <p className="text-[24px]">❌ CO NEPOTŘEBUJEŠ</p>
      </motion.div>

      {/* Main headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-[72px] leading-tight mb-6"
      >
        K úspěšnému<br/>
        <span className="text-red-600">podnikání</span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-[26px] text-gray-600 max-w-2xl"
      >
        Většina lidí prohodí <span className="text-red-600">tisíce</span> na startu.<br/>
        Ty to můžeš udělat <span className="text-red-600">chytřeji</span>.
      </motion.p>
    </motion.div>
  );
}

// MYTH SCENE: Individual myth reveal
interface MythSceneProps {
  myth: typeof myths[0];
  mythNumber: number;
}

function MythScene({ myth, mythNumber }: MythSceneProps) {
  const Icon = myth.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex flex-col items-center justify-center px-16"
    >
      {/* Myth number badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mb-8"
      >
        <span className="text-[32px]">{mythNumber}</span>
      </motion.div>

      {/* Icon + X mark */}
      <div className="flex items-center gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="bg-red-50 p-6"
        >
          <Icon size={64} strokeWidth={2} className="text-red-600" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, rotate: -90, scale: 0 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="text-red-600 text-[96px] leading-none"
        >
          ❌
        </motion.div>
      </div>

      {/* Title with strikethrough */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-[36px] mb-6 text-center line-through decoration-red-500 decoration-[3px] max-w-3xl"
      >
        {myth.title}
      </motion.h2>

      {/* Subtitle - the truth */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="bg-gray-50 px-10 py-6 rounded-2xl border-2 border-gray-200 max-w-3xl"
      >
        <p className="text-[24px] text-gray-700 text-center leading-relaxed">
          {myth.subtitle}
        </p>
      </motion.div>
    </motion.div>
  );
}

// OUTRO SCENE: CTA + Social proof
function OutroScene() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 px-12 text-center"
    >
      {/* Main message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-[52px] text-white mb-6 leading-tight">
          Model ti ukáže<br/>
          <span className="font-black">CO doopravdy potřebuješ</span><br/>
          a <span className="font-black">KDE začít</span>
        </h2>
      </motion.div>

      {/* Social proof */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/10 backdrop-blur-sm px-10 py-6 rounded-2xl border-2 border-white/30 mb-10"
      >
        <p className="text-[28px] text-white mb-2">
          <span className="font-black">27 podnikatelů</span> už BEZPEČNĚ investovalo
        </p>
        <p className="text-[36px] font-black text-cyan-300">
          1,4M Kč
        </p>
        <p className="text-[22px] text-blue-100">
          do svých byznysů
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, type: "spring" }}
        className="bg-white px-12 py-6 rounded-full"
      >
        <p className="text-[32px] text-blue-600">
          👉 <span className="font-black">podnikatelskactvrtka.cz</span>
        </p>
      </motion.div>
    </motion.div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, RotateCcw, Play } from 'lucide-react';

/**
 * 🎬 YOUTUBE SHORTS KOMPONENTA
 * 
 * PRAVIDLA:
 * - Pure edukace (NO CTA, NO odkazy na Čtvrtku)
 * - Vertical format (1080x1920)
 * - 15-60 sekund ideálně
 * - Brand colors (slate/indigo/yellow)
 * - Motion animace
 * 
 * WORKFLOW:
 * 1. Vytvoř Short v této komponentě
 * 2. Screen record přes ShareX (1080x1920)
 * 3. Upload do YT Studio
 * 4. Přidej hudbu v YT Studio
 */

// ═══════════════════════════════════════
// YOUTUBE SHORTS DATA
// ═══════════════════════════════════════

interface YouTubeShort {
  id: number;
  title: string;
  description: string;
  type: 'tip' | 'myth' | 'comparison' | 'stats' | 'story';
  component: () => JSX.Element;
}

// ═══════════════════════════════════════
// SHORT #1: "3 věci co MUSÍ mít každý e-shop"
// ═══════════════════════════════════════

function Short01_EshopEssentials() {
  const [currentItem, setCurrentItem] = useState(0);
  
  const essentials = [
    {
      number: 1,
      title: "JASNÁ HODNOTA",
      subtitle: "Za 3 sekundy vím CO prodáváš a PROČ to chci",
      icon: "🎯",
      example: "❌ 'Nejlepší produkty'\n✅ 'Ručně dělané svíčky s 48h výdrží'"
    },
    {
      number: 2,
      title: "DŮVĚRA",
      subtitle: "Recenze, certifikáty, záruka vrácení peněz",
      icon: "🛡️",
      example: "❌ Žádné recenze\n✅ '1 247 spokojených zákazníků + 30 dní záruka'"
    },
    {
      number: 3,
      title: "JEDNODUCHÝ CHECKOUT",
      subtitle: "Max 3 kroky k dokončení objednávky",
      icon: "⚡",
      example: "❌ 7 formulářů\n✅ 'Košík → Doprava → Zaplatit → Hotovo'"
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentItem((prev) => (prev < 2 ? prev + 1 : prev));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
          E-SHOP ESSENTIALS
        </div>
        <h1 className="text-4xl font-black text-white mb-2">
          3 věci co MUSÍ mít
        </h1>
        <h2 className="text-3xl font-black text-yellow-400">
          každý e-shop
        </h2>
      </div>

      {/* Essentials */}
      <div className="w-full max-w-md space-y-4">
        {essentials.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: index <= currentItem ? 1 : 0.3,
              x: index <= currentItem ? 0 : -50,
              scale: index === currentItem ? 1.05 : 1
            }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            className={`p-6 rounded-2xl border-2 ${
              index <= currentItem
                ? 'bg-white/10 border-yellow-400'
                : 'bg-white/5 border-slate-700'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-5xl">{item.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-black text-yellow-400">
                    {item.number}.
                  </span>
                  <h3 className="text-xl font-black text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-300 mb-3">
                  {item.subtitle}
                </p>
                {index === currentItem && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-slate-800/50 rounded-lg p-3 text-xs text-white whitespace-pre-line"
                  >
                    {item.example}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-slate-400 text-sm">
          #eshop #tipy #podnikani
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SHORT #2: "Tohle stálo kamaráda 50k"
// ═══════════════════════════════════════

function Short02_50kMistake() {
  const [stage, setStage] = useState(0);

  const timeline = [
    { label: "Měsíc 1", text: "Objednal 1000 ks zboží", cost: "30 000 Kč", icon: "📦", color: "red" },
    { label: "Měsíc 2", text: "Pronajal sklad", cost: "+ 12 000 Kč", icon: "🏢", color: "red" },
    { label: "Měsíc 3", text: "Udělal web a reklamy", cost: "+ 15 000 Kč", icon: "💻", color: "red" },
    { label: "Měsíc 4", text: "Zjistil: NIKDO TO NECHCE", cost: "= 57 000 Kč ztráta", icon: "💸", color: "red" }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev < 3 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
          ⚠️ REAL STORY
        </div>
        <h1 className="text-4xl font-black text-white mb-2">
          Tohle stálo
        </h1>
        <h2 className="text-5xl font-black text-red-400">
          kamaráda 50k
        </h2>
        <p className="text-xl text-slate-300 mt-4">
          Nedělejte to.
        </p>
      </div>

      {/* Timeline */}
      <div className="w-full max-w-md space-y-4">
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: index <= stage ? 1 : 0.3,
              y: index <= stage ? 0 : 20
            }}
            transition={{ duration: 0.5 }}
            className={`p-5 rounded-2xl border-2 ${
              index === 3
                ? 'bg-red-500/20 border-red-500'
                : 'bg-white/10 border-red-400/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-xs text-slate-400 font-semibold mb-1">
                  {item.label}
                </p>
                <p className="text-white font-bold mb-1">
                  {item.text}
                </p>
                <p className={`text-lg font-black ${
                  index === 3 ? 'text-red-400' : 'text-red-300'
                }`}>
                  {item.cost}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lesson */}
      {stage >= 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 p-6 rounded-2xl max-w-md"
        >
          <p className="text-xl font-black text-center">
            ✅ OVĚŘ SI ZÁJEM<br/>PŘED INVESTICÍ
          </p>
        </motion.div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-slate-400 text-sm">
          #chyby #lekce #validace
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SHORT #3: "Margin kalkulace - 30 sekund"
// ═══════════════════════════════════════

function Short03_MarginCalc() {
  const [step, setStep] = useState(0);

  const steps = [
    { label: "Prodejní cena", value: "500 Kč", icon: "💰" },
    { label: "Náklady na produkt", value: "- 200 Kč", icon: "📦" },
    { label: "Provozní náklady", value: "- 100 Kč", icon: "🏢" },
    { label: "ČISTÝ ZISK", value: "= 200 Kč", icon: "✅", highlight: true },
    { label: "MARŽE", value: "40%", icon: "📊", highlight: true }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
          ⚡ QUICK MATH
        </div>
        <h1 className="text-4xl font-black text-white mb-2">
          Margin kalkulace
        </h1>
        <h2 className="text-2xl font-black text-yellow-400">
          za 30 sekund
        </h2>
      </div>

      {/* Calculator */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/20">
        <div className="space-y-4">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{
                opacity: index <= step ? 1 : 0.3,
                x: index <= step ? 0 : -30
              }}
              transition={{ duration: 0.4 }}
              className={`p-4 rounded-xl ${
                item.highlight
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                  : 'bg-white/10'
              } ${index === step ? 'ring-2 ring-yellow-400' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <span className={`font-bold ${
                    item.highlight ? 'text-white text-lg' : 'text-slate-300'
                  }`}>
                    {item.label}
                  </span>
                </div>
                <span className={`text-2xl font-black ${
                  item.highlight ? 'text-white' : 'text-yellow-400'
                }`}>
                  {item.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tip */}
      {step >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-yellow-400/10 border-2 border-yellow-400 rounded-xl p-4 max-w-md"
        >
          <p className="text-sm text-yellow-400 text-center font-bold">
            💡 Zdravá marže = min. 30-40%
          </p>
        </motion.div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-slate-400 text-sm">
          #kalkulace #marže #byznys
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SHORTS ARRAY
// ═══════════════════════════════════════

const SHORTS: YouTubeShort[] = [
  {
    id: 1,
    title: "3 věci co MUSÍ mít každý e-shop",
    description: "Quick checklist pro začínající e-shopy",
    type: 'tip',
    component: Short01_EshopEssentials
  },
  {
    id: 2,
    title: "Tohle stálo kamaráda 50k - nedělejte to",
    description: "Real story - validace PŘED investicí",
    type: 'story',
    component: Short02_50kMistake
  },
  {
    id: 3,
    title: "Margin kalkulace - 30 sekund",
    description: "Jak spočítat marži rychle a správně",
    type: 'tip',
    component: Short03_MarginCalc
  }
];

// ═══════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════

export function YouTubeShorts() {
  const [currentShortIndex, setCurrentShortIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentShort = SHORTS[currentShortIndex];
  const ShortComponent = currentShort.component;

  const handlePrevious = () => {
    setCurrentShortIndex((prev) => (prev > 0 ? prev - 1 : prev));
    setIsPlaying(true);
  };

  const handleNext = () => {
    setCurrentShortIndex((prev) => (prev < SHORTS.length - 1 ? prev + 1 : prev));
    setIsPlaying(true);
  };

  const handleReplay = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-2">
            🎬 YouTube Shorts Preview
          </h1>
          <p className="text-slate-400">
            Screen record these animated shorts for YouTube
          </p>
          <div className="mt-4 inline-block bg-yellow-400/10 border border-yellow-400/30 rounded-lg px-4 py-2">
            <p className="text-yellow-400 text-sm font-bold">
              📹 Recording Area: 1080×1920 (vertical)
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr,auto] gap-8 items-start">
          {/* LEFT: Phone Preview */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-8 border-slate-800">
                {/* Screen (9:16 aspect ratio for vertical video) */}
                <div className="relative bg-black rounded-[2.5rem] overflow-hidden" style={{ width: '405px', height: '720px' }}>
                  <AnimatePresence mode="wait">
                    {isPlaying && (
                      <motion.div
                        key={currentShortIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                      >
                        <ShortComponent />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Recording Hint */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                RECORD THIS AREA
              </div>
            </div>
          </div>

          {/* RIGHT: Controls & Info */}
          <div className="lg:w-80 space-y-6">
            {/* Short Info */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🎬</span>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">
                    Short #{currentShort.id}
                  </p>
                  <h3 className="text-white font-bold">
                    {currentShort.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-4">
                {currentShort.description}
              </p>
              <div className="inline-block bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold">
                {currentShort.type.toUpperCase()}
              </div>
            </div>

            {/* Controls */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h4 className="text-white font-bold mb-4">Controls</h4>
              
              {/* Navigation */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentShortIndex === 0}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentShortIndex === SHORTS.length - 1}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Replay */}
              <button
                onClick={handleReplay}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                Replay Animation
              </button>

              {/* Progress */}
              <div className="mt-4 pt-4 border-t border-slate-800">
                <p className="text-xs text-slate-500 mb-2">Progress</p>
                <div className="flex gap-1">
                  {SHORTS.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 flex-1 rounded-full ${
                        index === currentShortIndex
                          ? 'bg-yellow-400'
                          : index < currentShortIndex
                          ? 'bg-green-500'
                          : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {currentShortIndex + 1} / {SHORTS.length} Shorts
                </p>
              </div>
            </div>

            {/* Recording Instructions */}
            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-6 border border-indigo-700">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                📹 Recording Workflow
              </h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p>1. Open ShareX</p>
                <p>2. Set region: 1080×1920</p>
                <p>3. Center on phone screen</p>
                <p>4. Record animation (loop)</p>
                <p>5. Upload to YT Studio</p>
                <p>6. Add music in YT</p>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h4 className="text-white font-bold mb-3">📊 Content Mix</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tips</span>
                  <span className="text-white font-bold">
                    {SHORTS.filter(s => s.type === 'tip').length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Stories</span>
                  <span className="text-white font-bold">
                    {SHORTS.filter(s => s.type === 'story').length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total Shorts</span>
                  <span className="text-yellow-400 font-bold">
                    {SHORTS.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
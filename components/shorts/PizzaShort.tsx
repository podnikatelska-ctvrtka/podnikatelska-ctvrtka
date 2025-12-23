import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * 🍕 PIZZA SHORT - "Majitel pizzerie nedělá follow-up"
 * 
 * Story: Objednal jsem pizzu přes Foodoru. Byla skvělá.
 *        Ale majitel se nezeptal jestli objednám znovu.
 *        Zaplatil prowizi (30%), dostal zákazníka, neudělal NIC.
 * 
 * Hook: Everyday relatable example
 * Insight: Customer retention > acquisition
 * Value: Praktický tip (SMS follow-up)
 */

type Scene = 'hook' | 'problem' | 'numbers' | 'solution' | 'punchline';

export function PizzaShort() {
  const [scene, setScene] = useState<Scene>('hook');
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const timings: Record<Scene, number> = {
      hook: 3000,
      problem: 6000,
      numbers: 8000,
      solution: 7000,
      punchline: 5000,
    };

    const timer = setTimeout(() => {
      const scenes: Scene[] = ['hook', 'problem', 'numbers', 'solution', 'punchline'];
      const currentIndex = scenes.indexOf(scene);
      const nextIndex = (currentIndex + 1) % scenes.length;
      setScene(scenes[nextIndex]);
    }, timings[scene]);

    return () => clearTimeout(timer);
  }, [scene, autoPlay]);

  return (
    <div className="w-[1080px] h-[1920px] bg-black relative overflow-hidden flex items-center justify-center">
      
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex gap-2 p-4">
        {(['hook', 'problem', 'numbers', 'solution', 'punchline'] as Scene[]).map((s) => (
          <div key={s} className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: scene === s ? 1 : s < scene ? 1 : 0 }}
              transition={{ duration: scene === s ? 3 : 0.3 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
        ))}
      </div>

      {/* Pause/Play toggle */}
      <button
        onClick={() => setAutoPlay(!autoPlay)}
        className="absolute top-20 right-6 z-50 text-white/60 text-sm"
      >
        {autoPlay ? '⏸ Pause' : '▶ Play'}
      </button>

      <AnimatePresence mode="wait">
        {scene === 'hook' && <HookScene key="hook" />}
        {scene === 'problem' && <ProblemScene key="problem" />}
        {scene === 'numbers' && <NumbersScene key="numbers" />}
        {scene === 'solution' && <SolutionScene key="solution" />}
        {scene === 'punchline' && <PunchlineScene key="punchline" />}
      </AnimatePresence>

      {/* Watermark */}
      <div className="absolute bottom-8 right-8 text-white/30 text-2xl font-black">
        PročToFunguje
      </div>
    </div>
  );
}

// SCENE 1: HOOK
function HookScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
    >
      {/* Pizza emoji */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="text-[280px] mb-12"
      >
        🍕
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-white text-7xl font-black mb-6 leading-tight">
          Objednal jsem včera pizzu
        </div>
        <div className="text-green-400 text-6xl font-black">
          Přišla. Skvělá. 👌
        </div>
      </motion.div>
    </motion.div>
  );
}

// SCENE 2: PROBLEM
function ProblemScene() {
  const items = [
    { icon: '📧', text: 'Žádný email', delay: 0 },
    { icon: '📱', text: 'Žádná SMS', delay: 0.2 },
    { icon: '❓', text: 'Žádný "Jak ti chutnala?"', delay: 0.4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-12"
    >
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-white/60 text-6xl font-black mb-16"
      >
        Ale pak... nic.
      </motion.div>

      <div className="space-y-8 w-full max-w-[800px]">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + item.delay }}
            className="bg-red-500/10 border-2 border-red-500 rounded-3xl p-8 flex items-center gap-6"
          >
            <div className="text-7xl">{item.icon}</div>
            <div className="text-white text-5xl font-black flex-1">
              {item.text}
            </div>
            <div className="text-red-500 text-7xl font-black">✗</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-orange-400 text-6xl font-black text-center"
      >
        Majitele NEZAJÍMÁ<br />jestli objednám ZNOVU? 😳
      </motion.div>
    </motion.div>
  );
}

// SCENE 3: NUMBERS
function NumbersScene() {
  const stats = [
    { emoji: '💰', label: 'Foodora provize', value: '30%', color: 'text-red-400' },
    { emoji: '✅', label: 'Dostal zákazníka', value: 'JÁ', color: 'text-green-400' },
    { emoji: '❌', label: 'Follow-up', value: '0', color: 'text-red-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-12"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-white text-7xl font-black mb-16 text-center"
      >
        Tady je problém:
      </motion.div>

      <div className="space-y-6 w-full max-w-[900px] mb-16">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2 * i, type: 'spring' }}
            className="bg-white/5 backdrop-blur rounded-3xl p-8 flex items-center justify-between"
          >
            <div className="flex items-center gap-6">
              <div className="text-7xl">{stat.emoji}</div>
              <div className="text-white/80 text-4xl">{stat.label}</div>
            </div>
            <div className={`${stat.color} text-7xl font-black`}>
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-10 max-w-[900px]"
      >
        <div className="text-white text-5xl font-black text-center leading-tight">
          Nový zákazník stojí<br />
          <span className="text-8xl">5× VÍC</span><br />
          než udržet stávajícího
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        className="mt-12 text-white/60 text-6xl text-center"
      >
        A on to hodil do koše 🗑️
      </motion.div>
    </motion.div>
  );
}

// SCENE 4: SOLUTION
function SolutionScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-12"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-green-400 text-7xl font-black mb-16 text-center"
      >
        Stačila by JEDNA SMS:
      </motion.div>

      {/* SMS mockup */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-[50px] p-8 max-w-[800px] shadow-2xl"
      >
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-[40px] p-12 text-white">
          <div className="text-5xl mb-8">📱</div>
          <div className="text-4xl leading-relaxed">
            "Ahoj! Děkujeme za objednávku. 🍕<br /><br />
            Jak ti chutnala pizza?<br /><br />
            Odpověz 1-5 (1=špatně, 5=super)"
          </div>
        </div>
      </motion.div>

      {/* Cost */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
        className="mt-16 space-y-6"
      >
        <div className="text-white/60 text-5xl text-center flex items-center justify-center gap-6">
          <span>Cena SMS:</span>
          <span className="text-green-400 font-black text-7xl">2 Kč</span>
        </div>
        <div className="text-white/60 text-5xl text-center flex items-center justify-center gap-6">
          <span>Čas nastavit:</span>
          <span className="text-green-400 font-black text-7xl">5 min</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// SCENE 5: PUNCHLINE
function PunchlineScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="mb-16"
      >
        <div className="text-green-400 text-7xl font-black mb-8">
          ✅ SE SMS:
        </div>
        <div className="text-white text-6xl mb-16">
          Objednám znovu ➡️ Opakující se zákazník
        </div>

        <div className="text-red-400 text-7xl font-black mb-8">
          ❌ BEZ SMS:
        </div>
        <div className="text-white text-6xl">
          Zkusím jinou ➡️ Ztracený zákazník
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 max-w-[900px]"
      >
        <div className="text-white text-7xl font-black leading-tight">
          80% podnikatelů<br />nesbírá feedback
        </div>
        <div className="text-white/80 text-5xl mt-6">
          Pak se diví proč klienti nechodí zpátky 🤷
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="mt-16 text-orange-400 text-6xl font-black"
      >
        Proč to funguje? 🤔
      </motion.div>
    </motion.div>
  );
}
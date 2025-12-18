/**
 * 🎬 ORGANIC POST #30 - DEMO WALKTHROUGH
 * 
 * Concept: Jana's cafe story - 90 second demo preview
 * Stages:
 * 1. Hook - "90 sekund = celý proces"
 * 2. Jana + Questions - "Má skvělý nápad, ale..."
 * 3. Tools Preview - "Nástroje v akci"
 * 4. Results - "Konkrétní plán + čísla"
 * 5. CTA - "Pusť si ZDARMA"
 * 
 * Auto-loops every 3.5s per stage
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Coffee, HelpCircle, Target, Calculator, CheckCircle2, Play } from "lucide-react";

type Stage = "hook" | "questions" | "tools" | "results" | "cta";

export function OrganicPost30DemoWalkthrough() {
  const [stage, setStage] = useState<Stage>("hook");

  useEffect(() => {
    const stages: Stage[] = ["hook", "questions", "tools", "results", "cta"];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % stages.length;
      setStage(stages[currentIndex]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full aspect-square bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex flex-col items-center justify-center p-8 md:p-12 relative overflow-hidden">
      
      {/* Animated Background Shapes */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        
        {/* STAGE 1: HOOK */}
        {stage === "hook" && (
          <motion.div
            key="hook"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6"
            >
              <Coffee className="w-24 h-24 md:w-32 md:h-32 text-orange-400 mx-auto" />
            </motion.div>
            
            <h2 className="text-white mb-4 text-4xl md:text-6xl leading-tight">
              90 sekund =<br />celý proces.
            </h2>
            
            <p className="text-white/70 text-xl md:text-2xl">
              Jana • Kavárna • Praha
            </p>
          </motion.div>
        )}

        {/* STAGE 2: QUESTIONS */}
        {stage === "questions" && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl"
          >
            <div className="text-white mb-6 text-3xl md:text-4xl text-center">
              Má skvělý nápad, ale...
            </div>
            
            <div className="space-y-4">
              {[
                "Je tam vůbec místo?",
                "Kolik zákazníků reálně získám?", 
                "Vydělám vůbec?"
              ].map((question, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.3 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 md:p-6 flex items-center gap-4"
                >
                  <HelpCircle className="w-8 h-8 md:w-10 md:h-10 text-orange-400 flex-shrink-0" />
                  <span className="text-white text-xl md:text-2xl">
                    {question}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STAGE 3: TOOLS PREVIEW */}
        {stage === "tools" && (
          <motion.div
            key="tools"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            <div className="text-white mb-8 text-3xl md:text-4xl text-center">
              🛠️ Nástroje v akci
            </div>
            
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {[
                { icon: Target, label: "Průzkum trhu", color: "from-green-500 to-emerald-500" },
                { icon: Calculator, label: "Kalkulačky", color: "from-blue-500 to-cyan-500" },
                { icon: Coffee, label: "Model 9 bloků", color: "from-purple-500 to-pink-500" }
              ].map((tool, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-br ${tool.color} rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center`}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                  >
                    <tool.icon className="w-12 h-12 md:w-16 md:h-16 text-white mb-3" />
                  </motion.div>
                  <span className="text-white font-bold text-sm md:text-base">
                    {tool.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STAGE 4: RESULTS */}
        {stage === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
              >
                <CheckCircle2 className="w-20 h-20 md:w-24 md:h-24 text-green-400 mx-auto mb-4" />
              </motion.div>
              
              <h2 className="text-white mb-2 text-3xl md:text-4xl">
                Výsledek:
              </h2>
            </div>
            
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white"
              >
                <div className="text-lg md:text-xl mb-1">📊 Konkrétní čísla</div>
                <div className="text-2xl md:text-3xl font-bold">54k tržby • 25k zisk</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white"
              >
                <div className="text-lg md:text-xl mb-1">📋 Akční plán</div>
                <div className="text-2xl md:text-3xl font-bold">4 týdny • 16 kroků</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-6 text-white"
              >
                <div className="text-lg md:text-xl mb-1">⏱️ Čas investice</div>
                <div className="text-2xl md:text-3xl font-bold">90 minut</div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* STAGE 5: CTA */}
        {stage === "cta" && (
          <motion.div
            key="cta"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mb-8"
            >
              <Play className="w-24 h-24 md:w-32 md:h-32 text-orange-400 mx-auto" />
            </motion.div>
            
            <h2 className="text-white mb-6 text-4xl md:text-6xl leading-tight">
              Pusť si<br />ZDARMA
            </h2>
            
            <motion.div
              animate={{ 
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-slate-900 px-8 py-4 rounded-2xl inline-block"
            >
              <div className="text-sm md:text-base mb-1">👉 Demo trvá 90 sekund</div>
              <div className="text-xl md:text-2xl font-bold">
                podnikatelskactvrtka.cz/demo
              </div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Progress Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {(["hook", "questions", "tools", "results", "cta"] as Stage[]).map((s) => (
          <motion.div
            key={s}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              stage === s ? "bg-orange-400 w-8" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

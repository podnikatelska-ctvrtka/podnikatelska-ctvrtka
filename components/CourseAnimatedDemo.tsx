/**
 * 🎬 COURSE ANIMATED DEMO - Cafe Story
 * 
 * Real story: "Jana chce otevřít kavárnu v Praze" → complete journey
 * Shows: Question → Tools → BMC → Analysis → Profit → Problem → VPC → Action Plan → Improve
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Coffee, Users, Calculator, Target, TrendingUp, HelpCircle, 
  CheckCircle2, Lightbulb, Play, MousePointer2, Sparkles, 
  AlertCircle, DollarSign, FileText, Zap
} from "lucide-react";
import { Button } from "./ui/button";

// Demo stages - Real cafe story
type DemoStage = 
  | "intro"
  | "want-cafe"
  | "question-space"
  | "tool-segment-size"
  | "tool-target-calc"
  | "fill-bmc"
  | "analysis"
  | "profit-calc"
  | "stuck-problem"
  | "problem-solver"
  | "vpc"
  | "action-plan"
  | "take-action"
  | "improve-model"
  | "complete";

interface CursorPosition {
  x: number;
  y: number;
}

// Cafe data for BMC - ✅ FIX: Vyšší ceny, lepší vztahy
const CAFE_BMC_DATA = [
  { id: 1, label: "Segmenty", data: ["🔵 Kolemjdoucí (spěchají)", "🟢 Studenti (levná káva)"], color: "blue" },
  { id: 2, label: "Hodnota", data: ["☕ Káva za 2 min", "📶 Rychlé WiFi"], color: "green" },
  { id: 3, label: "Kanály", data: [" Lokace u metra", "📱 Instagram"], color: "purple" },
  { id: 4, label: "Vztahy", data: ["👋 Osobní přístup", "🎁 Věrnostní karta"], color: "pink" },
  { id: 5, label: "Příjmy", data: ["☕ 75 Kč káva", "🍰 95 Kč dezert"], color: "yellow" },
  { id: 6, label: "Aktivity", data: ["📱 Denní Instagram", "☕ Příprava kávy"], color: "orange" },
  { id: 7, label: "Zdroje", data: ["☕ Kávovar", "👨‍🍳 Barista"], color: "cyan" },
  { id: 8, label: "Partneři", data: ["☕ Dodavatel zrn", "🥐 Pekárna"], color: "indigo" },
  { id: 9, label: "Náklady", data: ["🏠 Nájem 50k", "☕ Suroviny 20k"], color: "red" },
];

// BMC data WITH smoothie added (for improve stage)
const CAFE_BMC_WITH_SMOOTHIE = [
  { id: 1, label: "Segmenty", data: ["🔵 Kolemjdoucí (spěchají)", "🟢 Studenti (levná káva)", "🏃 Fitness nadšenci"], color: "blue" },
  { id: 2, label: "Hodnota", data: ["☕ Káva za 2 min", "📶 Rychlé WiFi", "🥤 Fresh smoothie"], color: "green" },
  { id: 3, label: "Kanály", data: ["📍 Lokace u metra", "📱 Instagram"], color: "purple" },
  { id: 4, label: "Vztahy", data: ["👋 Osobní přístup", "🎁 Věrnostní karta"], color: "pink" },
  { id: 5, label: "Příjmy", data: ["☕ 75 Kč káva", "🍰 95 Kč dezert", "🥤 85 Kč smoothie"], color: "yellow" },
  { id: 6, label: "Aktivity", data: ["📱 Denní Instagram", "☕ Příprava kávy"], color: "orange" },
  { id: 7, label: "Zdroje", data: ["☕ Kávovar", "👨‍🍳 Barista"], color: "cyan" },
  { id: 8, label: "Partneři", data: ["☕ Dodavatel zrn", "🥐 Pekárna"], color: "indigo" },
  { id: 9, label: "Náklady", data: ["🏠 Nájem 50k", "☕ Suroviny 20k"], color: "red" },
];

export function CourseAnimatedDemo() {
  const [stage, setStage] = useState<DemoStage>("intro");
  const [isPlaying, setIsPlaying] = useState(false);
  const [cursor, setCursor] = useState<CursorPosition>({ x: 50, y: 50 });
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState("");
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [bmcProgress, setBmcProgress] = useState(0);
  const [typingText, setTypingText] = useState("");

  // Auto-play demo sequence
  useEffect(() => {
    if (!isPlaying) return;

    const sequence = async () => {
      // 1. Want cafe
      await delay(500);
      setStage("want-cafe");
      setBubbleText("Jana chce otevřít kavárnu v Praze ☕");
      setShowBubble(true);
      await delay(2500);
      setShowBubble(false);

      // 2. Question - Is there space?
      await delay(300);
      setStage("question-space");
      setBubbleText("Je v Praze ještě místo pro další kavárnu? 🤔");
      setShowBubble(true);
      await moveCursor(50, 50, 20, 30, 800);
      await delay(2500);
      
      // 3. Tool - Segment size - ✅ FIX: Průzkum konkurence místo "kolik lidí pije kávu"
      setStage("tool-segment-size");
      setBubbleText("Zkusme nástroj 'Průzkum trhu'! 🎯");
      await moveCursor(20, 30, 10, 22, 800);
      await delay(1500);
      setShowBubble(false);
      setCurrentModal("segment-size");
      await delay(1000);
      
      // Type data - Průzkum konkurence
      await typeText("15 kaváren v okolí, průměr 90 zákazníků/den");
      await delay(1500);
      
      // Show blur tip
      setBubbleText("Kde můžu prorazit? 💡");
      setShowBubble(true);
      await delay(2000);
      setShowBubble(false);
      setCurrentModal(null);
      setTypingText("");

      // 4. Tool - Target calculator
      await delay(500);
      setStage("tool-target-calc");
      setBubbleText("Kolik jich reálně nakoupí? 🧮");
      setShowBubble(true);
      await moveCursor(10, 22, 10, 30, 800);
      await delay(1500);
      setShowBubble(false);
      setCurrentModal("target-calc");
      await delay(1000);
      await typeText("30 zákazníků denně = 54 000 Kč/měsíc");
      await delay(2000);
      setCurrentModal(null);
      setTypingText("");

      // 5. Fill BMC
      await delay(500);
      setStage("fill-bmc");
      setBubbleText("Teď vyplň 9 bloků modelu! 📝");
      setShowBubble(true);
      await moveCursor(10, 30, 10, 38, 800);
      await delay(1000);
      setShowBubble(false);
      
      for (let i = 1; i <= 9; i++) {
        setBmcProgress(i);
        await delay(600);
      }
      await delay(1000);

      // 6. Analysis
      setStage("analysis");
      setCurrentModal("analysis");
      await delay(2000); // ✅ Show modal FIRST
      setBubbleText("Tvůj model má 85% zdraví! 🎉");
      setShowBubble(true);
      await delay(2000);
      setShowBubble(false);
      setCurrentModal(null);
      setBmcProgress(0); // ✅ FIX: Hide BMC IMMEDIATELY after closing analysis

      // 7. Profit calc - Show profit modal right away
      await delay(200);
      setStage("profit-calc");
      setCurrentModal("profit");
      setBubbleText("Zisk: 25 000 Kč měsíčně 💰");
      setShowBubble(true);
      await moveCursor(10, 38, 10, 46, 800);
      await delay(3000);
      setShowBubble(false);
      setCurrentModal(null);

      // 8. Stuck problem
      await delay(500);
      setStage("stuck-problem");
      setBubbleText("Hmm... nevím jak dál 😕");
      setShowBubble(true);
      await delay(2000);

      // 9. Problem solver - ✅ FIX: Obecnější problémy
      setStage("problem-solver");
      setBubbleText("Klikni na 'Řešení problémů'! 🆘");
      await moveCursor(10, 46, 10, 54, 800);
      await delay(1500);
      setShowBubble(false);
      setCurrentModal("problem-solver");
      await delay(3000);
      setCurrentModal(null);

      // 10. FIT VALIDATOR - ✅ FIX: Rename VPC + fix overflow
      await delay(500);
      setStage("vpc");
      setBubbleText("Fit Validátor! 🎯");
      setShowBubble(true);
      await moveCursor(10, 54, 10, 62, 800);
      await delay(1000);
      setShowBubble(false);
      setCurrentModal("vpc");
      await delay(3000);
      setCurrentModal(null);

      // 11. Action Plan - ✅ FIX: Generovaný podle vyplněného
      await delay(500);
      setStage("action-plan");
      setCurrentModal("action-plan");
      setBubbleText("Vygeneruje se akční plán! 📋");
      setShowBubble(true);
      await moveCursor(10, 62, 10, 70, 800);
      await delay(3000);
      setShowBubble(false);
      setCurrentModal(null);

      // 12. Take action - ✅ FIX: Obecnější text místo "Otevři Instagram"
      await delay(500);
      setStage("take-action");
      setBubbleText("Jdi do akce! 🚀");
      setShowBubble(true);
      await delay(2500);
      setShowBubble(false);

      // 13. Improve model - ✅ FIX: Animace přidání smoothie do modelu
      await delay(500);
      setStage("improve-model");
      setBubbleText("Zkusím přidat smoothie! 🥤");
      setShowBubble(true);
      
      // Move cursor to BMC canvas
      await moveCursor(10, 70, 50, 50, 800);
      await delay(1000);
      
      // Show BMC again to animate change
      setBmcProgress(9);
      setShowBubble(false);
      
      // Move cursor around BMC blocks (simulate editing)
      await moveCursor(50, 50, 30, 30, 600); // Segmenty
      await delay(400);
      await moveCursor(30, 30, 50, 30, 600); // Hodnota
      await delay(400);
      await moveCursor(50, 30, 70, 50, 600); // Příjmy
      await delay(800);
      
      // Highlight Příjmy block (id 5) - add smoothie
      setCurrentModal("improve");
      setBubbleText("Model se upravil! ✅");
      setShowBubble(true);
      await delay(3500); // ✅ Ještě delší pauza na modal
      setShowBubble(false);

      // 14. Complete
      setStage("complete");
      setCurrentModal(null);
      setIsPlaying(false);
    };

    sequence();
  }, [isPlaying]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const typeText = async (text: string) => {
    for (let i = 0; i <= text.length; i++) {
      setTypingText(text.slice(0, i));
      await delay(30);
    }
  };

  const moveCursor = async (fromX: number, fromY: number, toX: number, toY: number, duration: number) => {
    const steps = 30;
    const stepDelay = duration / steps;
    
    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      const easeProgress = easeInOutCubic(progress);
      
      const x = fromX + (toX - fromX) * easeProgress;
      const y = fromY + (toY - fromY) * easeProgress;
      
      setCursor({ x, y });
      await delay(stepDelay);
    }
  };

  const easeInOutCubic = (t: number) => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const startDemo = () => {
    setStage("intro");
    setIsPlaying(true);
    setBmcProgress(0);
    setCurrentModal(null);
    setTypingText("");
    setCursor({ x: 50, y: 50 });
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-8 md:py-16 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* ✅ NAVIGATION - Back to homepage */}
        <div className="mb-4 md:mb-6">
          <button
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-xs md:text-sm group"
          >
            <svg className="w-3 h-3 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zpět na hlavní stránku
          </button>
        </div>
        
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-white mb-2 md:mb-3 text-xl md:text-3xl">
            ☕ Příklad: Kavárna v Praze
          </h2>
          <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">
            Sleduj Janin příběh - od nápadu až po hotový model podnikání
          </p>
        </div>

        {/* Demo Container */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ minHeight: "600px" }}>
          
          {/* ✅ START BUTTON - Show when not playing */}
          {!isPlaying && stage === "intro" && (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center z-40">
              <div className="text-center max-w-md px-6">
                <Coffee className="w-16 h-16 md:w-20 md:h-20 text-indigo-600 mx-auto mb-6" />
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                  ☕ Sleduj Janin příběh
                </h3>
                <p className="text-sm md:text-base text-slate-600 mb-8">
                  Za 90 sekund uvidíš, jak vyplnit model podnikání od začátku až po akční plán
                </p>
                <Button
                  onClick={startDemo}
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-xl"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Spustit demo (90s)
                </Button>
              </div>
            </div>
          )}
          
          {/* Animated Cursor */}
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                className="absolute z-50 pointer-events-none"
                style={{
                  left: `${cursor.x}%`,
                  top: `${cursor.y}%`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                <MousePointer2 className="w-8 h-8 text-indigo-600 drop-shadow-lg" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Speech Bubble */}
          <AnimatePresence>
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="absolute z-40"
                style={{
                  left: `${Math.min(70, cursor.x + 15)}%`,
                  top: `${Math.max(10, cursor.y - 5)}%`,
                }}
              >
                <div className="bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl max-w-xs text-sm">
                  {bubbleText}
                  <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-slate-900" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* UI Layout */}
          <div className="flex h-full">
            
            {/* Sidebar - ✅ HIDE ON MOBILE */}
            <div className="hidden md:block w-64 bg-slate-100 border-r border-slate-200 p-4 flex-shrink-0">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Coffee className="w-5 h-5 text-slate-700" />
                  <div className="text-slate-900 font-bold">Kavárna Praha</div>
                </div>
                <div className="text-xs text-slate-600">Progress: {Math.round((bmcProgress / 9) * 100)}%</div>
                <div className="w-full h-2 bg-slate-300 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(bmcProgress / 9) * 100}%` }}
                  />
                </div>
              </div>

              {/* Module List */}
              <div className="space-y-2 text-sm">
                <div className={`p-2 rounded-lg transition-all ${
                  stage === "tool-segment-size" ? "bg-green-100 border-2 border-green-500" : "bg-white"
                }`}>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-slate-700">Velikost trhu</span>
                  </div>
                </div>
                
                <div className={`p-2 rounded-lg transition-all ${
                  stage === "tool-target-calc" ? "bg-blue-100 border-2 border-blue-500" : "bg-white"
                }`}>
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-blue-600" />
                    <span className="text-slate-700">Cílová kalkulačka</span>
                  </div>
                </div>
                
                <div className={`p-2 rounded-lg transition-all ${
                  stage === "fill-bmc" || bmcProgress > 0 ? "bg-indigo-100 border-2 border-indigo-500" : "bg-white"
                }`}>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-indigo-600" />
                    <span className="text-slate-700">Čtvrtka (9 bloků)</span>
                  </div>
                </div>
                
                <div className={`p-2 rounded-lg transition-all ${
                  stage === "analysis" ? "bg-green-100 border-2 border-green-500" : "bg-white"
                }`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-slate-700">Analýza</span>
                  </div>
                </div>
                
                <div className={`p-2 rounded-lg transition-all ${
                  stage === "profit-calc" ? "bg-yellow-100 border-2 border-yellow-500" : "bg-white"
                }`}>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-yellow-600" />
                    <span className="text-slate-700">Profit kalkulačka</span>
                  </div>
                </div>
                
                <div className={`p-2 rounded-lg transition-all ${
                  stage === "problem-solver" ? "bg-orange-100 border-2 border-orange-500" : "bg-white"
                }`}>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-orange-600" />
                    <span className="text-slate-700">Řešení problémů</span>
                  </div>
                </div>
                
                <div className={`p-2 rounded-lg transition-all ${
                  stage === "vpc" ? "bg-purple-100 border-2 border-purple-500" : "bg-white"
                }`}>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span className="text-slate-700">Fit Validátor</span>
                  </div>
                </div>
                
                <div className={`p-2 rounded-lg transition-all ${
                  stage === "action-plan" ? "bg-pink-100 border-2 border-pink-500" : "bg-white"
                }`}>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-pink-600" />
                    <span className="text-slate-700">Akční plán</span>
                  </div>
                </div>
                
                <div className={`p-2 rounded-lg transition-all ${
                  stage === "take-action" || stage === "improve-model" ? "bg-cyan-100 border-2 border-cyan-500" : "bg-white"
                }`}>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-600" />
                    <span className="text-slate-700">Akce & Iterace</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-3 md:p-6 bg-white relative min-h-[600px]">
              
              {/* BMC Canvas Grid */}
              {(stage === "fill-bmc" || bmcProgress > 0) && !currentModal && (
                <div className="grid grid-cols-3 gap-3 h-full">
                  {/* ✅ Show WITH smoothie during improve stage */}
                  {(stage === "improve-model" ? CAFE_BMC_WITH_SMOOTHIE : CAFE_BMC_DATA).map((block) => {
                    // ✅ Highlight smoothie additions with glow
                    const isImproveStage = stage === "improve-model";
                    const hasSmoothieAddition = isImproveStage && [1, 2, 5].includes(block.id);
                    
                    return (
                      <motion.div
                        key={block.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: bmcProgress >= block.id ? 1 : 0.3,
                          scale: bmcProgress >= block.id ? 1 : 0.8,
                          boxShadow: hasSmoothieAddition 
                            ? "0 0 20px rgba(34, 211, 238, 0.6), 0 0 40px rgba(34, 211, 238, 0.3)" 
                            : "none"
                        }}
                        transition={{
                          boxShadow: { duration: 0.8, repeat: Infinity, repeatType: "reverse" }
                        }}
                        className={`border-2 rounded-lg p-3 ${
                          bmcProgress >= block.id
                            ? `border-${block.color}-500 bg-${block.color}-50`
                            : "border-slate-200 bg-slate-50"
                        } ${hasSmoothieAddition ? "ring-2 ring-cyan-400" : ""}`}
                      >
                        <div className="text-xs font-semibold text-slate-700 mb-2">
                          {block.label}
                        </div>
                        {bmcProgress >= block.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-1"
                          >
                            {block.data.map((item, idx) => {
                              // ✅ Highlight NEW smoothie items
                              const isSmoothieItem = item.includes("🥤") || item.includes("Fitness");
                              const showHighlight = isImproveStage && isSmoothieItem;
                              
                              return (
                                <motion.div 
                                  key={idx} 
                                  className={`text-xs text-slate-600 bg-white/50 rounded px-2 py-1 ${
                                    showHighlight ? "bg-cyan-200 font-bold border-2 border-cyan-500" : ""
                                  }`}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ 
                                    opacity: 1, 
                                    x: 0,
                                    scale: showHighlight ? [1, 1.05, 1] : 1
                                  }}
                                  transition={{ 
                                    delay: idx * 0.1,
                                    scale: { duration: 0.6, repeat: Infinity, repeatType: "reverse" }
                                  }}
                                >
                                  {item}
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Modals */}
              <AnimatePresence>
                {/* Segment Size Tool - ✅ FIX: Průzkum konkurence */}
                {currentModal === "segment-size" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-4 bg-white rounded-xl shadow-2xl border-2 border-green-500 p-6 z-30"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                      <h3 className="text-lg font-bold text-slate-900">
                        🎯 Průzkum trhu
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-slate-600 block mb-2">
                          Jaká je konkurence v okolí?
                        </label>
                        <div className="h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg flex items-center px-4 border-2 border-green-300">
                          <span className="text-slate-900 font-medium">{typingText}</span>
                          {typingText.length > 0 && typingText.length < 50 && (
                            <span className="animate-pulse ml-1">|</span>
                          )}
                        </div>
                      </div>
                      
                      {typingText.length > 30 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-slate-900/90 backdrop-blur-md border-2 border-slate-700 rounded-lg p-3"
                        >
                          <div className="flex items-start gap-2">
                            <div className="w-5 h-5 bg-slate-700 rounded flex-shrink-0 mt-0.5 blur-sm" />
                            <div className="text-sm text-white/80 blur-sm select-none">
                              💡 Máme na to speciální nástroj v kurzu...
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Target Calculator */}
                {currentModal === "target-calc" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-4 bg-white rounded-xl shadow-2xl border-2 border-blue-500 p-6 z-30"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-bold text-slate-900">
                        🧮 Cílová kalkulačka
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-slate-600 block mb-2">
                          Kolik jich reálně nakoupí?
                        </label>
                        <div className="h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg flex items-center px-4 border-2 border-blue-300">
                          <span className="text-slate-900 font-medium">{typingText}</span>
                          {typingText.length > 0 && typingText.length < 50 && (
                            <span className="animate-pulse ml-1">|</span>
                          )}
                        </div>
                      </div>
                      
                      {typingText.length > 30 && (
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-green-50 border border-green-300 rounded-lg p-3">
                            <div className="text-xs text-slate-600 mb-1">Zákazníci/den</div>
                            <div className="text-2xl font-bold text-green-600">30</div>
                          </div>
                          <div className="bg-blue-50 border border-blue-300 rounded-lg p-3">
                            <div className="text-xs text-slate-600 mb-1">Tržby/měsíc</div>
                            <div className="text-2xl font-bold text-blue-600">54k</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Analysis */}
                {currentModal === "analysis" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute inset-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-500 p-6 z-20"
                  >
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      📊 Analýza modelu
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4 border border-green-300">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700">Zdraví modelu</span>
                          <span className="text-3xl font-bold text-green-600">85%</span>
                        </div>
                        <div className="w-full h-4 bg-slate-200 rounded-full mt-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "85%" }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-lg p-3 border border-blue-300">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mb-1" />
                          <div className="text-xs text-slate-600">Silné stránky</div>
                          <div className="text-2xl font-bold text-slate-900">6</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-orange-300">
                          <AlertCircle className="w-5 h-5 text-orange-600 mb-1" />
                          <div className="text-xs text-slate-600">Rizika</div>
                          <div className="text-2xl font-bold text-slate-900">3</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Profit Calculator */}
                {currentModal === "profit" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-500 p-6 z-20"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <DollarSign className="w-6 h-6 text-yellow-600" />
                      <h3 className="text-lg font-bold text-slate-900">
                        💰 Profit kalkulačka
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4 border border-green-300">
                        <div className="text-sm text-slate-600 mb-2">Měsíční tržby</div>
                        <div className="text-3xl font-bold text-slate-900">54 000 Kč</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-red-300">
                        <div className="text-sm text-slate-600 mb-2">Měsíční náklady</div>
                        <div className="text-3xl font-bold text-slate-900">29 000 Kč</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-4 text-white">
                        <div className="text-sm mb-2">💰 Čistý zisk</div>
                        <div className="text-4xl font-bold">25 000 Kč</div>
                        <div className="text-sm mt-1 opacity-90">měsíčně</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Problem Solver - ✅ FIX: Obecnější problémy */}
                {currentModal === "problem-solver" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-500 p-6 z-20 overflow-auto"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <HelpCircle className="w-6 h-6 text-orange-600" />
                      <h3 className="text-lg font-bold text-slate-900">
                        🆘 Řešení problémů
                      </h3>
                    </div>
                    
                    <div className="text-sm text-slate-600 mb-4">
                      Nevíš si rady? Vyber problém a najdi inspiraci 👇
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                        <div className="font-semibold text-slate-900 mb-2">
                          ❓ Jak oslovit zákazníky?
                        </div>
                        <div className="text-sm text-slate-600">
                          💡 Inspirace podle tvého segmentu a kanálů z modelu
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                        <div className="font-semibold text-slate-900 mb-2">
                          ❓ Jak oceňovat produkt?
                        </div>
                        <div className="text-sm text-slate-600">
                          💡 Kalkulačky a porovnání s konkurencí
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                        <div className="font-semibold text-slate-900 mb-2">
                          ❓ Jak vydělat víc?
                        </div>
                        <div className="text-sm text-slate-600">
                          💡 Nové segmenty, produkty, nebo zvýšení cen podle trhu
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* FIT VALIDATOR - ✅ FIX: Rename VPC + fix overflow */}
                {currentModal === "vpc" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-500 p-6 z-20 overflow-auto"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles className="w-6 h-6 text-purple-600" />
                      <h3 className="text-lg font-bold text-slate-900">
                        🎯 Fit Validátor
                      </h3>
                    </div>
                    
                    <div className="text-sm text-slate-600 mb-4">
                      Ověř že tvoje nabídka sedí na bolesti zákazníka 👇
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-lg p-3 border border-purple-300 overflow-hidden">
                        <div className="font-semibold text-slate-900 mb-2 text-sm">
                          👤 Segment: Kolemjdoucí
                        </div>
                        <div className="space-y-2">
                          <div className="bg-red-50 p-2 rounded border border-red-200">
                            <div className="font-medium text-red-900 text-xs">😣 Bolest</div>
                            <div className="text-slate-600 text-xs">Nemá čas čekat</div>
                          </div>
                          <div className="bg-green-50 p-2 rounded border border-green-200">
                            <div className="font-medium text-green-900 text-xs">🎁 Zisk</div>
                            <div className="text-slate-600 text-xs">Ušetří čas</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 border border-purple-300 overflow-hidden">
                        <div className="font-semibold text-slate-900 mb-2 text-sm">
                          💎 Tvoje nabídka
                        </div>
                        <div className="space-y-2">
                          <div className="bg-orange-50 p-2 rounded border border-orange-200">
                            <div className="font-medium text-orange-900 text-xs">💊 Lék</div>
                            <div className="text-slate-600 text-xs">Káva za 2 min</div>
                          </div>
                          <div className="bg-green-50 p-2 rounded border border-green-200">
                            <div className="font-medium text-green-900 text-xs">✅ FIT!</div>
                            <div className="text-slate-600 text-xs">Bolest → Řešení</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Action Plan - ✅ FIX: Generovaný podle vyplněného */}
                {currentModal === "action-plan" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border-2 border-pink-500 p-6 z-20 overflow-auto"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <FileText className="w-6 h-6 text-pink-600" />
                      <h3 className="text-lg font-bold text-slate-900">
                        📋 Akční plán (generovaný)
                      </h3>
                    </div>
                    
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg p-4 mb-4">
                      <div className="text-sm mb-2">🎯 Top priority podle tvého modelu:</div>
                      <div className="font-bold text-lg">Segment: 🔵 Kolemjdoucí (60% tržeb)</div>
                      <div className="font-bold text-lg">Produkt: ☕ Káva za 2 min (nejžádanější)</div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                        <div className="font-semibold text-slate-900">Týden 1: Zaměř se na top segment</div>
                        <div className="text-slate-600">✅ Instagram stories v 7h • Stojan s "Káva za 2 min" • Testovat flow</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border-l-4 border-blue-500">
                        <div className="font-semibold text-slate-900">Týden 2: Optimalizuj top produkt</div>
                        <div className="text-slate-600">🚀 Měř čas přípravy • Přidej věrnostní kartu • Sbírej feedback</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border-l-4 border-orange-500">
                        <div className="font-semibold text-slate-900">Týden 3: Škáluj top kanál</div>
                        <div className="text-slate-600">📱 Denní Instagram + FB reklama na okolí metra</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                        <div className="font-semibold text-slate-900">Týden 4: Expanze</div>
                        <div className="text-slate-600">📊 Analyzuj čísla • Přidej 2. segment (Studenti) • Nový produkt?</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Improve Model */}
                {currentModal === "improve" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-500 p-6 z-20"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-6 h-6 text-cyan-600" />
                      <h3 className="text-lg font-bold text-slate-900">
                        🛠️ Iteruj & Vylepši model
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4 border border-cyan-300">
                        <div className="font-semibold text-slate-900 mb-2 text-lg">
                          💡 Nový produkt: 🥤 Smoothie
                        </div>
                        <div className="text-sm text-slate-600 mb-3">
                          Přidej nový zdroj příjmů pro studenty a fitness nadšence
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-green-50 px-3 py-2 rounded-lg border-2 border-green-400">
                            <div className="text-xs text-green-700 mb-1">Nový segment</div>
                            <div className="font-bold text-green-900">🏃 Fitness</div>
                          </div>
                          <motion.div 
                            className="bg-gradient-to-br from-yellow-400 to-orange-400 px-3 py-2 rounded-lg border-2 border-orange-500 text-white"
                            animate={{
                              scale: [1, 1.05, 1],
                              boxShadow: [
                                "0 0 0 0 rgba(251, 191, 36, 0)",
                                "0 0 20px 5px rgba(251, 191, 36, 0.4)",
                                "0 0 0 0 rgba(251, 191, 36, 0)"
                              ]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatType: "loop"
                            }}
                          >
                            <div className="text-xs mb-1">Nový zisk</div>
                            <div className="font-bold text-2xl">+15k Kč</div>
                            <div className="text-xs">měsíčně</div>
                          </motion.div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg p-4">
                        <div className="text-sm mb-1">🎯 Tvůj model žije!</div>
                        <div className="font-bold">Pravidelně upravuj podle feedback a dat</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Complete Modal */}
          {stage === "complete" && !isPlaying && (
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
                <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  🎉 A to je celé!
                </h3>
                <p className="text-slate-600 mb-6">
                  Za 90 minut máš konkrétní plán + čísla + kroky co dělat zítra.
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={startDemo}
                    variant="outline"
                    className="flex-1"
                  >
                    🔄 Pustit znovu
                  </Button>
                  <Button
                    onClick={() => window.location.href = '/objednavka'}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-slate-900"
                  >
                    Chci to! 4999 Kč
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        {isPlaying && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>
                {stage === "want-cafe" && "🏁 Start: Chci kavárnu..."}
                {stage === "question-space" && "❓ Je tu místo?"}
                {stage === "tool-segment-size" && "📊 Zjišťuju velikost trhu..."}
                {stage === "tool-target-calc" && "🧮 Kolik jich nakoupí..."}
                {stage === "fill-bmc" && "📝 Vyplňuji model..."}
                {stage === "analysis" && "✅ Analyzuji..."}
                {stage === "profit-calc" && "💰 Počítám zisk..."}
                {stage === "stuck-problem" && "😕 Nevím jak dál..."}
                {stage === "problem-solver" && "🆘 Řeším problém..."}
                {stage === "vpc" && "🎯 VPC Canvas..."}
                {stage === "action-plan" && "📋 Akční plán..."}
                {stage === "take-action" && "🚀 Do akce!"}
                {stage === "improve-model" && "🛠️ Vylepšuju model..."}
              </span>
            </div>
          </div>
        )}

        {/* Toggle overlay texts - ✅ FIXED z-index to not overlap content */}
        {(stage === "analyze" || stage === "validator" || stage === "action-plan") && (
          <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 z-50 pointer-events-none">
            {stage === "analyze" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/90 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm"
              >
                ✅ Tvůj model má 85% zdraví
              </motion.div>
            )}
            {stage === "validator" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/90 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm"
              >
                💰 Zisk je 25k měsíčně
              </motion.div>
            )}
            {stage === "action-plan" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/90 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm"
              >
                📋 Vygeneroval se ti akční plán
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
import { CheckCircle, Map, Users, Compass, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState, useEffect } from "react";
import { EnhancedCTA } from "./EnhancedCTA";
import { TouchFeedback } from "./TouchFeedback";
import { QuickEmailCaptureModal } from "./QuickEmailCaptureModal";
import { getRemainingSpots } from "../lib/scarcity";

export function HeroSection() {
  const [activeCanvasBlock, setActiveCanvasBlock] = useState('value');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileTooltip, setMobileTooltip] = useState<string | null>(null);
  const [remainingSpots, setRemainingSpots] = useState(50);
  
  // 🚀 PERFORMANCE: Detect if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // Simplified animation config for better mobile performance
  const animationConfig = prefersReducedMotion ? {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    transition: { duration: 0 }
  } : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };
  
  // Update spots on mount
  useEffect(() => {
    setRemainingSpots(getRemainingSpots());
  }, []);

  const tooltipData = {
    'partners': {
      title: 'Klíčová partnerství',
      content: 'Zjistíte, kdo vám může pomoct ušetřit čas a peníze - místo abyste vše dělali sami'
    },
    'activities': {
      title: 'Klíčové aktivity', 
      content: 'Zjistíte, na co se zaměřit PRVNÍ - a přestaňte ztrácet čas na zbytečnosti'
    },
    'value': {
      title: 'Hodnotová nabídka',
      content: 'Zjistíte, čím se lišíte od konkurence - a proč si zákazníci vyberou vás, ne je'
    },
    'relationships': {
      title: 'Vztahy se zákazníky',
      content: 'Zjistíte, jak udržet zákazníky - aby kupovali znovu, ne jen jednou'
    },
    'segments': {
      title: 'Zákaznické segmenty',
      content: 'Zjistíte, komu prodávat - a přestanete mařit peníze na špatný marketing'
    },
    'resources': {
      title: 'Klíčové zdroje',
      content: 'Zjistíte, co OPRAVDU potřebujete - a přestanete utrácet za věci, které nepotřebujete'
    },
    'channels': {
      title: 'Distribuční kanály',
      content: 'Zjistíte, kde najít zákazníky - bez promrhání času a peněz na špatné kanály'
    },
    'costs': {
      title: 'Struktura nákladů',
      content: 'Zjistíte, kde ztrácíte peníze - a kde můžete ušetřit až 30% nákladů'
    },
    'revenue': {
      title: 'Zdroje příjmů',
      content: 'Najdete 3-5 způsobů, jak zvýšit tržby - ze stejných zákazníků a stejné práce'
    }
  };

  return (
    <>
      <div id="hero" className="hero-section relative overflow-hidden py-16 min-h-[800px]" data-section="hero">
        {/* Animated gradient background - zmírněný */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        </div>
        
        {/* Floating elements background - redukováno na 1 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Levá strana - Hero obsah */}
            <motion.div 
              className="relative space-y-8"
              {...animationConfig}
            >

              {/* Badge - transformace podniku */}
              <motion.div 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-indigo-300/50"
                {...animationConfig}
              >
                <span className="text-lg">✨</span>
                <span className="font-semibold">Od chaosu ke struktuře za 90 minut</span>
              </motion.div>

              {/* Hlavní nadpis */}
              <div className="space-y-4">
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
                >
                  <span className="text-indigo-600 font-black">Jeden list papíru</span> změní váš byznys
                </h1>
                
                <div className="space-y-3">
                  <p 
                    className="text-xl text-gray-600 leading-relaxed"
                  >
                    Za 90 minut vyplníte Čtvrtku krok za krokem a <strong>víte přesně, co dělat dál.</strong>
                  </p>
                  
                  <p 
                    className="text-lg text-gray-600 leading-relaxed"
                  >
                    <span className="text-indigo-600 font-medium">Pro každého podnikatele – od e-shopů po freelancery a služby.</span>
                    <br />
                    Žádná teorie – vyplňujete přímo v kurzu a odcházíte s konkrétním výsledkem.
                  </p>
                </div>
              </div>

              {/* Benefity - s kulatými ikonami jako ve V2 */}
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Čtvrtka za 90 minut</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Map className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Mapa celého byznysu</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Profil ideálního zákazníka</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Compass className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Víte přesně, co dělat</span>
                </div>
              </div>

              {/* Desktop CTA tlačítko */}
              <div 
                className="text-center mt-8 hidden md:block"
              >
                <TouchFeedback className="max-w-sm mx-auto">
                  <EnhancedCTA 
                    variant="primary" 
                    size="lg"
                    className="w-full"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Chci vědět, co dělat jako první
                  </EnhancedCTA>
                </TouchFeedback>
                <p className="text-xs text-gray-600 mt-2 font-medium">
                  ⏰ Sleva platí 24 hodin od registrace
                </p>
              </div>

            </motion.div>

            {/* Pravá strana - Interactive Canvas */}
            <div 
              className="relative min-h-[600px]"
            >
              {/* Moderní interaktivní čtvrtka */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Těchto 9 bloků vyplníte krok za krokem
                </h3>
                <p className="text-sm text-gray-600 hidden md:block">
                  Klikněte na políčko a zjistěte, co každá část Čtvrtky řeší
                </p>
                <p className="text-sm text-gray-600 md:hidden">
                  Klikněte a zjistěte, co políčko řeší
                </p>
              </div>

              {/* Canvas grid - DESKTOP */}
              <div className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-3xl p-6 shadow-lg mb-8 hidden md:block">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {Object.entries({
                    value: { icon: "💎", title: "Hodnota", color: "from-indigo-600 to-purple-600" },
                    activities: { icon: "⚡", title: "Aktivity", color: "from-indigo-500 to-indigo-600" },
                    partners: { icon: "🤝", title: "Partneři", color: "from-amber-500 to-amber-600" },
                    relationships: { icon: "🤝", title: "Vztahy", color: "from-blue-500 to-blue-600" },
                    segments: { icon: "🎯", title: "Zákazníci", color: "from-purple-500 to-purple-600" },
                    resources: { icon: "🔧", title: "Zdroje", color: "from-violet-500 to-violet-600" },
                    channels: { icon: "📢", title: "Kanály", color: "from-sky-500 to-sky-600" },
                    costs: { icon: "💰", title: "Náklady", color: "from-red-500 to-red-600" },
                    revenue: { icon: "💸", title: "Příjmy", color: "from-emerald-500 to-emerald-600" }
                  }).map(([key, block]) => (
                    <motion.button
                      key={key}
                      className={`p-4 rounded-xl text-center transition-all duration-300 ${
                        activeCanvasBlock === key 
                          ? `bg-gradient-to-br ${block.color} text-white shadow-lg` 
                          : 'bg-white/80 text-gray-700 hover:bg-white shadow-sm hover:shadow-md'
                      }`}
                      onClick={() => setActiveCanvasBlock(key)}
                      animate={{ 
                        scale: activeCanvasBlock === key ? 1.05 : 1
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="text-2xl mb-2">{block.icon}</div>
                      <div className={`text-xs font-semibold ${activeCanvasBlock === key ? 'text-white' : 'text-gray-600'}`}>
                        {block.title}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Active block detail */}
                <motion.div
                  key={activeCanvasBlock}
                  className={`bg-gradient-to-br ${
                    activeCanvasBlock === 'partners' ? 'from-amber-500 to-amber-600' :
                    activeCanvasBlock === 'activities' ? 'from-indigo-500 to-indigo-600' :
                    activeCanvasBlock === 'value' ? 'from-indigo-600 to-purple-600' :
                    activeCanvasBlock === 'relationships' ? 'from-blue-500 to-blue-600' :
                    activeCanvasBlock === 'segments' ? 'from-purple-500 to-purple-600' :
                    activeCanvasBlock === 'resources' ? 'from-violet-500 to-violet-600' :
                    activeCanvasBlock === 'channels' ? 'from-sky-500 to-sky-600' :
                    activeCanvasBlock === 'costs' ? 'from-red-500 to-red-600' :
                    'from-emerald-500 to-emerald-600'
                  } text-white p-4 rounded-2xl`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">
                      {tooltipData[activeCanvasBlock as keyof typeof tooltipData] ? 
                        Object.entries({
                          partners: "🤝", activities: "⚡", value: "💎", relationships: "🤝", 
                          segments: "🎯", resources: "🔧", channels: "📢", costs: "💰", revenue: "💸"
                        }).find(([key]) => key === activeCanvasBlock)?.[1] : "🤝"
                      }
                    </span>
                    <h4 className="text-white text-sm">
                      {tooltipData[activeCanvasBlock as keyof typeof tooltipData]?.title || "Klíčoví partneři"}
                    </h4>
                  </div>
                  <p className="text-white opacity-95 text-sm leading-relaxed">
                    {tooltipData[activeCanvasBlock as keyof typeof tooltipData]?.content || "Vybudujte si síť spolehlivých partnerů, kteří vás posunou vpřed rychleji než konkurenci!"}
                  </p>
                </motion.div>
              </div>

              {/* Canvas grid - MOBILNÍ VERZE s TOOLTIP MODAL */}
              <div className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-3xl p-4 shadow-lg mb-8 md:hidden">
                {/* Mobilní - 2 sloupcový layout pro větší tlačítka */}
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries({
                    value: { icon: "💎", title: "Hodnota", color: "from-indigo-600 to-purple-600" },
                    activities: { icon: "⚡", title: "Aktivity", color: "from-indigo-500 to-indigo-600" },
                    partners: { icon: "🤝", title: "Partneři", color: "from-amber-500 to-amber-600" },
                    relationships: { icon: "🤝", title: "Vztahy", color: "from-blue-500 to-blue-600" },
                    segments: { icon: "🎯", title: "Zákazníci", color: "from-purple-500 to-purple-600" },
                    resources: { icon: "🔧", title: "Zdroje", color: "from-violet-500 to-violet-600" },
                    channels: { icon: "📢", title: "Kanály", color: "from-sky-500 to-sky-600" },
                    costs: { icon: "💰", title: "Náklady", color: "from-red-500 to-red-600" },
                    revenue: { icon: "💸", title: "Příjmy", color: "from-emerald-500 to-emerald-600" }
                  }).map(([key, block]) => (
                    <motion.button
                      key={key}
                      className="p-5 rounded-xl text-center bg-white/80 text-gray-700 active:bg-white shadow-sm active:shadow-lg transition-all duration-200"
                      onClick={() => setMobileTooltip(key)}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="text-3xl mb-2">{block.icon}</div>
                      <div className="text-sm font-semibold text-gray-600">
                        {block.title}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Sloučený info box - Canvas + Credibility */}
              <motion.div 
                className="text-center p-5 bg-gradient-to-r from-indigo-50/60 to-purple-50/60 backdrop-blur-sm rounded-xl border border-indigo-100/50 shadow-lg space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                {/* Desktop verze */}
                <div className="hidden md:block space-y-2">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-semibold text-indigo-700">Podnikatelská Čtvrtka,</span>{" "}
                    kterou používají firmy jako Google, Airbnb a Spotify
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                    <span>🎯</span>
                    <span>Krok za krokem • 90 minut • Kompletní mapa byznysu</span>
                  </div>
                </div>

                {/* Mobilní verze - kratší text */}
                <div className="md:hidden space-y-2">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-semibold text-indigo-700">Podnikatelská Čtvrtka</span> – 9 políček k vyplnění
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                    <span>🎯</span>
                    <span>90 minut • Hotovo • Jasný plán</span>
                  </div>
                </div>
              </motion.div>

              {/* Mobilní CTA tlačítko pod canvasem */}
              <motion.div 
                className="text-center mt-8 md:hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group max-w-xs mx-auto w-full"
                >
                  Chci vědět, co dělat jako první
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Sleva 40% vyprší za 24 hodin od registrace
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Quick Email Capture Modal */}
      <QuickEmailCaptureModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />

      {/* Mobile Tooltip Modal - ZERO SCROLLOVÁNÍ! */}
      <MobileTooltipModal
        tooltipKey={mobileTooltip}
        tooltipData={tooltipData}
        onClose={() => setMobileTooltip(null)}
      />
    </>
  );
}

// Mobile Tooltip Modal Component - eliminuje scrollování!
function MobileTooltipModal({ 
  tooltipKey, 
  tooltipData, 
  onClose 
}: { 
  tooltipKey: string | null;
  tooltipData: Record<string, { title: string; content: string }>;
  onClose: () => void;
}) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!tooltipKey) {
      setProgress(100);
      return;
    }

    // Auto-dismiss po 4 sekundách
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / 40); // 4000ms / 100ms intervals
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      setProgress(100);
    };
  }, [tooltipKey, onClose]);

  const blockIcons = {
    partners: "🤝", 
    activities: "⚡", 
    value: "💎", 
    relationships: "🤝", 
    segments: "🎯", 
    resources: "🔧", 
    channels: "📢", 
    costs: "💰", 
    revenue: "💸"
  };

  const blockColors = {
    partners: 'from-amber-500 to-amber-600',
    activities: 'from-indigo-500 to-indigo-600',
    value: 'from-indigo-600 to-purple-600',
    relationships: 'from-blue-500 to-blue-600',
    segments: 'from-purple-500 to-purple-600',
    resources: 'from-violet-500 to-violet-600',
    channels: 'from-sky-500 to-sky-600',
    costs: 'from-red-500 to-red-600',
    revenue: 'from-emerald-500 to-emerald-600'
  };

  const currentData = tooltipKey ? tooltipData[tooltipKey as keyof typeof tooltipData] : null;
  const currentIcon = tooltipKey ? blockIcons[tooltipKey as keyof typeof blockIcons] : null;
  const currentColor = tooltipKey ? blockColors[tooltipKey as keyof typeof blockColors] : 'from-gray-500 to-gray-600';

  return (
    <AnimatePresence>
      {tooltipKey && currentData && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={`bg-gradient-to-br ${currentColor} text-white rounded-2xl p-5 sm:p-6 max-w-sm w-full shadow-2xl relative`}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Zavřít"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="flex items-center gap-3 mb-4 pr-8">
              <span className="text-4xl">{currentIcon}</span>
              <h4 className="text-white">
                {currentData.title}
              </h4>
            </div>
            <p className="text-white leading-relaxed opacity-95 mb-4">
              {currentData.content}
            </p>

            {/* Auto-dismiss progress bar */}
            <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
            <p className="text-xs text-white/70 text-center mt-2">
              Zavře se automaticky za {Math.ceil(progress / 25)} s
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

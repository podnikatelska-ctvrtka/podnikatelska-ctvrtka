import { CheckCircle, Map, Users, Compass, X, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { EnhancedCTA } from "./EnhancedCTA";
import { TouchFeedback } from "./TouchFeedback";
import { QuickEmailCaptureModal } from "./QuickEmailCaptureModal";
import { getRemainingSpots } from "../lib/scarcity";

export function HeroSectionVariant3Cards() {
  const [activeCanvasBlock, setActiveCanvasBlock] = useState('value');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileTooltip, setMobileTooltip] = useState<string | null>(null);
  const [remainingSpots, setRemainingSpots] = useState(50);
  
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
      content: 'Zjistíte, komu prodávat - a přestaňte mařit peníze na špatný marketing'
    },
    'resources': {
      title: 'Klíčové zdroje',
      content: 'Zjistíte, co OPRAVDU potřebujete - a přestaňte utrácet za věci, které nepotřebujete'
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
      <div id="hero" className="hero-section relative overflow-hidden py-12 md:py-20 bg-gray-50" data-section="hero">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* LEVÁ STRANA - Content cards */}
            <div className="space-y-6">
              
              {/* Header Card */}
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-medium mb-6">
                  <span>✨</span>
                  <span>Od chaosu ke struktuře za 90 minut</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
                  <span className="text-indigo-600">Jeden list papíru</span> změní váš byznys
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Za 90 minut vyplníte Čtvrtku krok za krokem a <strong className="text-gray-900">víte přesně, co dělat dál.</strong>
                </p>
              </motion.div>

              {/* Benefits Card */}
              <motion.div 
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-green-50 border border-green-100">
                    <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                    <span className="text-sm font-bold text-gray-900">90 minut</span>
                    <span className="text-xs text-gray-600">Čas práce</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <Map className="w-8 h-8 text-blue-600 mb-2" />
                    <span className="text-sm font-bold text-gray-900">1 list</span>
                    <span className="text-xs text-gray-600">Celý byznys</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-purple-50 border border-purple-100">
                    <Users className="w-8 h-8 text-purple-600 mb-2" />
                    <span className="text-sm font-bold text-gray-900">Profil</span>
                    <span className="text-xs text-gray-600">Ideální zákazník</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                    <Compass className="w-8 h-8 text-indigo-600 mb-2" />
                    <span className="text-sm font-bold text-gray-900">Jasný plán</span>
                    <span className="text-xs text-gray-600">Co dělat dál</span>
                  </div>
                </div>
              </motion.div>

              {/* Credibility Card */}
              <motion.div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-6 h-6 text-yellow-300" />
                  <span className="font-bold text-lg">Důvěřují nám světové firmy</span>
                </div>
                <p className="text-white/90 text-sm mb-4">
                  Podnikatelská Čtvrtka je framework, který používají Google, Airbnb a Spotify pro strategické plánování
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-white/20 px-3 py-1 rounded-full">🎯 9 bloků</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">⚡ Krok za krokem</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">✅ Hotovo</span>
                </div>
              </motion.div>

              {/* CTA Card */}
              <motion.div 
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-indigo-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <TouchFeedback className="w-full">
                  <EnhancedCTA 
                    variant="primary" 
                    size="lg"
                    className="w-full"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Chci vědět, co dělat jako první
                  </EnhancedCTA>
                </TouchFeedback>
                <p className="text-xs text-center text-gray-600 mt-3 font-medium">
                  ⏰ Sleva platí 24 hodin od registrace
                </p>
              </motion.div>

            </div>

            {/* PRAVÁ STRANA - Canvas Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Canvas Main Card */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-100 sticky top-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                    9 bloků vyplníte krok za krokem
                  </h3>
                  <p className="text-sm text-gray-600">
                    Klikněte a zjistěte, co každý blok řeší
                  </p>
                </div>

                {/* Canvas Grid - DESKTOP */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-3 gap-3 mb-5">
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
                        className={`p-5 rounded-xl text-center transition-all duration-300 border-2 ${
                          activeCanvasBlock === key 
                            ? `bg-gradient-to-br ${block.color} text-white shadow-lg border-transparent` 
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
                        }`}
                        onClick={() => setActiveCanvasBlock(key)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-3xl mb-2">{block.icon}</div>
                        <div className={`text-xs font-bold ${activeCanvasBlock === key ? 'text-white' : 'text-gray-600'}`}>
                          {block.title}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Active detail */}
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
                    } text-white p-5 rounded-xl`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-white text-sm leading-relaxed">
                      {tooltipData[activeCanvasBlock as keyof typeof tooltipData]?.content}
                    </p>
                  </motion.div>
                </div>

                {/* Canvas Grid - MOBILNÍ */}
                <div className="md:hidden">
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries({
                      value: { icon: "💎", title: "Hodnota" },
                      activities: { icon: "⚡", title: "Aktivity" },
                      partners: { icon: "🤝", title: "Partneři" },
                      relationships: { icon: "🤝", title: "Vztahy" },
                      segments: { icon: "🎯", title: "Zákazníci" },
                      resources: { icon: "🔧", title: "Zdroje" },
                      channels: { icon: "📢", title: "Kanály" },
                      costs: { icon: "💰", title: "Náklady" },
                      revenue: { icon: "💸", title: "Příjmy" }
                    }).map(([key, block]) => (
                      <motion.button
                        key={key}
                        className="p-4 rounded-xl text-center bg-gray-50 active:bg-gray-100 border-2 border-gray-200"
                        onClick={() => setMobileTooltip(key)}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-3xl mb-2">{block.icon}</div>
                        <div className="text-xs font-bold text-gray-600">
                          {block.title}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <QuickEmailCaptureModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />

      {/* Mobile Tooltip Modal */}
      <MobileTooltipModal
        tooltipKey={mobileTooltip}
        tooltipData={tooltipData}
        onClose={() => setMobileTooltip(null)}
      />
    </>
  );
}

// Mobile Tooltip Modal
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

    const timer = setTimeout(() => onClose(), 4000);
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - (100 / 40)));
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      setProgress(100);
    };
  }, [tooltipKey, onClose]);

  const blockIcons = {
    partners: "🤝", activities: "⚡", value: "💎", relationships: "🤝", 
    segments: "🎯", resources: "🔧", channels: "📢", costs: "💰", revenue: "💸"
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
        >
          <motion.div
            className={`bg-gradient-to-br ${currentColor} text-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative`}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4 pr-8">
              <span className="text-4xl">{currentIcon}</span>
              <h4 className="text-white">{currentData.title}</h4>
            </div>
            <p className="text-white leading-relaxed opacity-95 mb-4">
              {currentData.content}
            </p>

            <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
              <motion.div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
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

import { CheckCircle, Map, Users, Compass, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { EnhancedCTA } from "./EnhancedCTA";
import { TouchFeedback } from "./TouchFeedback";
import { QuickEmailCaptureModal } from "./QuickEmailCaptureModal";
import { getRemainingSpots } from "../lib/scarcity";

export function HeroSectionVariant1Clean() {
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
      <div id="hero" className="hero-section relative overflow-hidden py-20 min-h-screen flex items-center" data-section="hero">
        {/* Simple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
          {/* Centrovaný obsah */}
          <div className="text-center mb-16">
            
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-lg">✨</span>
              <span className="font-semibold">Od chaosu ke struktuře za 90 minut</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-indigo-600 font-black">Jeden list papíru</span> změní váš byznys
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Za 90 minut vyplníte Čtvrtku krok za krokem a <strong>víte přesně, co dělat dál.</strong>
              <br className="hidden sm:block" />
              <span className="text-indigo-600 font-medium">Pro každého podnikatele – od e-shopů po freelancery a služby.</span>
            </motion.p>

            {/* Benefity - inline badges místo karet */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">90 minut</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                <Map className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Celý byznys na 1 listu</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                <Users className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">Ideální zákazník</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                <Compass className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium text-gray-700">Jasný plán</span>
              </div>
            </motion.div>

            {/* CTA - desktop */}
            <motion.div 
              className="mb-16 hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <TouchFeedback className="max-w-md mx-auto">
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
            </motion.div>
          </div>

          {/* Canvas - centrovaný, větší */}
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Těchto 9 bloků vyplníte krok za krokem
              </h3>
              <p className="text-sm text-gray-600">
                Klikněte na políčko a zjistěte, co každá část Čtvrtky řeší
              </p>
            </div>

            {/* Canvas grid - DESKTOP */}
            <div className="bg-white rounded-3xl p-8 shadow-xl mb-6 hidden md:block">
              <div className="grid grid-cols-3 gap-4 mb-6">
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
                    className={`p-6 rounded-2xl text-center transition-all duration-300 ${
                      activeCanvasBlock === key 
                        ? `bg-gradient-to-br ${block.color} text-white shadow-xl scale-105` 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 shadow-sm'
                    }`}
                    onClick={() => setActiveCanvasBlock(key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-3xl mb-3">{block.icon}</div>
                    <div className={`text-sm font-semibold ${activeCanvasBlock === key ? 'text-white' : 'text-gray-600'}`}>
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
                } text-white p-6 rounded-2xl`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-white leading-relaxed">
                  {tooltipData[activeCanvasBlock as keyof typeof tooltipData]?.content}
                </p>
              </motion.div>
            </div>

            {/* Canvas grid - MOBILNÍ */}
            <div className="bg-white rounded-3xl p-6 shadow-xl mb-6 md:hidden">
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
                    className="p-5 rounded-xl text-center bg-gray-50 text-gray-700 active:bg-white shadow-sm active:shadow-lg"
                    onClick={() => setMobileTooltip(key)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-3xl mb-2">{block.icon}</div>
                    <div className="text-sm font-semibold text-gray-600">
                      {block.title}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* SLOUČENÝ BOX - Process + Credibility */}
            <motion.div 
              className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {/* První řádek - Process */}
              <div className="text-center mb-4">
                <p className="text-gray-700 mb-2">
                  <span className="font-bold text-indigo-600 text-lg">Podnikatelská Čtvrtka</span>
                  <span className="text-gray-600"> – vyplníte 9 políček a máte kompletní mapu byznysu</span>
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <span>🎯</span>
                  <span>Krok za krokem • 90 minut práce • Vyplněná Čtvrtka v ruce</span>
                </div>
              </div>
              
              {/* Separator */}
              <div className="border-t border-indigo-200 my-4"></div>
              
              {/* Druhý řádek - Credibility */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  ✨ <span className="font-medium text-indigo-700">Používají firmy jako</span>{' '}
                  <span className="font-bold text-gray-800">Google, Airbnb a Spotify</span>
                </p>
              </div>
            </motion.div>

            {/* Mobile CTA */}
            <motion.div 
              className="text-center mt-8 md:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group w-full"
              >
                Chci vědět, co dělat jako první
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Sleva 40% vyprší za 24 hodin od registrace
              </p>
            </motion.div>

          </motion.div>
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

// Mobile Tooltip Modal Component
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

    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / 40);
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
              <motion.div
                className="h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
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

import { CheckCircle, Target, Users, Zap, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { EnhancedCTA } from "./EnhancedCTA";
import { TouchFeedback } from "./TouchFeedback";
import { QuickEmailCaptureModal } from "./QuickEmailCaptureModal";

export function HeroSection() {
  const [activeCanvasBlock, setActiveCanvasBlock] = useState('value');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileTooltip, setMobileTooltip] = useState<string | null>(null);

  const tooltipData = {
    'partners': {
      title: 'Klíčoví partneři',
      content: 'Vybudujte si síť spolehlivých partnerů, kteří vás posunou vpřed rychleji než konkurenci!'
    },
    'activities': {
      title: 'Klíčové aktivity', 
      content: 'Přesný plán akcí, který vás dovede k zisku rychleji a efektivněji než 90% podnikatelů'
    },
    'value': {
      title: 'Hodnotová nabídka',
      content: 'Objevte svůj unikátní prodejní argument, který zákazníky přinutí říct ANO!'
    },
    'relationships': {
      title: 'Vztahy se zákazníky',
      content: 'Tajemství budování vztahů, které z jednorázových kupců udělají věrné fanoušky'
    },
    'segments': {
      title: 'Zákaznické segmenty',
      content: 'Přesně identifikujte své ideální zákazníky a nikdy už neutratíte korunu za špatný marketing'
    },
    'resources': {
      title: 'Klíčové zdroje',
      content: 'Zjistěte, co SKUTEČNĚ potřebujete k úspěchu a přestaňte utrácet za zbytečnosti'
    },
    'channels': {
      title: 'Distribuční kanály',
      content: 'Nejkratší a nejlevnější cesty k vašim zákazníkům - bez promarnění času a peněz'
    },
    'costs': {
      title: 'Struktura nákladů',
      content: 'Ovládněte své náklady jako profík a zvyšte zisk až o 40% během prvního roku'
    },
    'revenue': {
      title: 'Zdroje příjmů',
      content: 'Objevte skryté příležitosti k výdělku, které vaši konkurenti ještě neznají!'
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >

              {/* Badge - transformace podniku */}
              <motion.div 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-indigo-300/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1
                }}
                transition={{ 
                  delay: 0.2,
                  duration: 0.5
                }}
              >
                <span className="text-lg">✨</span>
                <span className="font-semibold">Od chaosu ke struktuře za 90 minut</span>
              </motion.div>

              {/* Hlavní nadpis */}
              <div className="space-y-4">
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-indigo-600 font-black">Jeden list papíru</span> změní váš byznys
                </motion.h1>
                
                <div className="space-y-3">
                  <motion.p 
                    className="text-xl text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <strong>Za 90 minut sestavte kompletní strategii</strong> na jednu čtvrtku.
                  </motion.p>
                  
                  <motion.p 
                    className="text-lg text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.45 }}
                  >
                    <span className="text-indigo-600 font-medium">Ideální pro e-shopy, restaurace, kadeřnice a služby.</span> Vyřešte nedostatek zákazníků a chaotické podnikání bez složitých teorií.
                  </motion.p>
                </div>
              </div>

              {/* Benefity */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, staggerChildren: 0.1 }}
              >
                <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Jasná strategie za 90 minut</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg">
                  <Target className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-gray-700">Přesné zacílení zákazníků</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg">
                  <Users className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  <span className="text-gray-700">Stabilní tok zákazníků</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg">
                  <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span className="text-gray-700">Konkurenční výhoda</span>
                </div>
              </motion.div>

              {/* Metodologie credibility */}
              <motion.div 
                className="relative bg-gradient-to-r from-blue-50/60 to-indigo-50/60 backdrop-blur-sm rounded-xl p-5 border border-blue-100/50 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <p className="text-sm text-gray-700 text-center leading-relaxed">
                  <span className="font-semibold text-indigo-700">Podnikatelská Čtvrtka,</span><br className="hidden sm:block" />
                  kterou používají firmy jako Google, Airbnb a Spotify
                </p>
              </motion.div>

              {/* Desktop CTA tlačítko */}
              <motion.div 
                className="text-center mt-8 hidden md:block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <TouchFeedback className="max-w-sm mx-auto">
                  <EnhancedCTA 
                    variant="primary" 
                    size="lg"
                    className="w-full"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Chci ten list papíru
                  </EnhancedCTA>
                </TouchFeedback>
                <p className="text-xs text-gray-600 mt-2 font-medium">
                  🎁 Začni 3-denním mini kurzem ZDARMA
                </p>
              </motion.div>

            </motion.div>

            {/* Pravá strana - Interactive Canvas */}
            <motion.div 
              className="relative min-h-[600px]"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {/* Moderní interaktivní čtvrtka */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Toto je Čtvrtka, kterou se naučíte vyplnit
                </h3>
                <p className="text-sm text-gray-600 hidden md:block">
                  Klikněte na jakýkoli blok a zjistěte, co vám každý segment přinese
                </p>
                <p className="text-sm text-gray-600 md:hidden">
                  Klikněte na blok a zjistěte, co vám přinese
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

              {/* Informace o Canvas */}
              <motion.div 
                className="text-center p-4 bg-gradient-to-r from-indigo-50/60 to-purple-50/60 backdrop-blur-sm rounded-xl border border-indigo-100/50 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                {/* Desktop verze */}
                <p className="text-sm text-gray-600 mb-2 hidden md:block">
                  <span className="font-semibold text-indigo-600">9 stavebních prvků byznysu</span>
                  <span> na jedné čtvrtce - kompletní mapa pro úspěšné podnikání</span>
                </p>
                <div className="items-center justify-center gap-2 text-xs text-gray-500 hidden md:flex">
                  <span>🎯</span>
                  <span>Kompletní mapa byznysu • 90 minut práce • Jasné výsledky</span>
                </div>

                {/* Mobilní verze - kratší text */}
                <p className="text-sm text-gray-600 mb-2 md:hidden">
                  <span className="font-semibold text-indigo-600">9 prvků úspěšného byznysu</span>
                  <span> na jedné čtvrtce</span>
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 md:hidden">
                  <span>🎯</span>
                  <span>90 minut • Jasná strategie • Více zákazníků</span>
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
                  Získat předběžný přístup
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Omezená možnost předobjednávky
                </p>
              </motion.div>

            </motion.div>
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
/**
 * 🎬 MARKETINGOVÁ BOMBA: Real Course UI s Blur Efekty
 * 
 * Zobrazuje SKUTEČNÝ kurz s demo daty + blur overlay na citlivé části
 * = Autenticita + FOMO + Trust
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Clock, TrendingUp, Target, Users, DollarSign, Zap, Package, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

interface DemoData {
  segment: string;
  value: string;
  channel: string;
  relationship: string;
  revenue: string;
  partner: string;
  activity: string;
  resource: string;
  cost: string;
}

// Demo data - částečně viditelná, částečně blurred
const DEMO_DATA: DemoData = {
  segment: "Studenti a mladí profesionálové 20-35 let v Praze 2 a okolí",
  value: "Kvalitní káva + rychlé WiFi + klidné místo na práci/schůzky",
  channel: "Instagram, Google Maps, word-of-mouth, FB lokální reklamy",
  relationship: "Osobní přístup, věrnostní karta, Instagram stories daily",
  revenue: "Káva 50-90 Kč, snídaně/obědy 120-200 Kč, firemní catering",
  partner: "Pražírna kávy, lokální pekárna, dodavatel Bio mléka",
  activity: "Vaření kávy, příprava jídla, Instagram marketing, údržba",
  resource: "Profesionální kávovar La Marzocco, 2x barista, prostor 60m²",
  cost: "Nájem 35k/měsíc, suroviny 40% revenue, mzdy 2 baristi 50k",
};

// Progress tracking
const LESSONS_COMPLETED = 12;
const TOTAL_LESSONS = 16;
const PROGRESS_PERCENT = Math.round((LESSONS_COMPLETED / TOTAL_LESSONS) * 100);

export function CourseScreenshotMarketing() {
  const [activeView, setActiveView] = useState<'desktop' | 'mobile'>('desktop');
  const [showTyping, setShowTyping] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentBox, setCurrentBox] = useState<keyof DemoData>('segment');

  // Typing animation
  useEffect(() => {
    if (!showTyping) return;

    const fullText = DEMO_DATA[currentBox];
    let currentIndex = 0;

    const timer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
        // Cycle to next box after 2s
        setTimeout(() => {
          const boxes: (keyof DemoData)[] = ['segment', 'value', 'channel', 'relationship', 'revenue'];
          const currentIdx = boxes.indexOf(currentBox);
          const nextIdx = (currentIdx + 1) % boxes.length;
          setCurrentBox(boxes[nextIdx]);
          setTypedText("");
        }, 2000);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [showTyping, currentBox]);

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-white mb-4">
            👀 Takhle vypadá Podnikatelská Čtvrtka
          </h2>
          <p className="text-slate-300 text-lg mb-6">
            Není to jen grafika. Je to <span className="text-yellow-400 font-semibold">SKUTEČNÝ KURZ</span> s tvými daty.
          </p>

          {/* View Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={() => setActiveView('desktop')}
              variant={activeView === 'desktop' ? 'default' : 'outline'}
              className={activeView === 'desktop' ? 'bg-yellow-500 text-slate-900 hover:bg-yellow-400' : 'text-white border-white/20'}
            >
              💻 Desktop
            </Button>
            <Button
              onClick={() => setActiveView('mobile')}
              variant={activeView === 'mobile' ? 'default' : 'outline'}
              className={activeView === 'mobile' ? 'bg-yellow-500 text-slate-900 hover:bg-yellow-400' : 'text-white border-white/20'}
            >
              📱 Mobile
            </Button>
          </div>
        </motion.div>

        {/* Desktop View */}
        <AnimatePresence mode="wait">
          {activeView === 'desktop' && (
            <motion.div
              key="desktop"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-2xl overflow-hidden"
            >
              {/* Browser Chrome */}
              <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 ml-4 bg-slate-700 rounded px-3 py-1 text-slate-300 text-sm">
                  podnikatelskactvrtka.cz/kurz
                </div>
              </div>

              {/* Course Header */}
              <div className="bg-gradient-to-r from-slate-600 to-indigo-600 text-white px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Podnikatelská Čtvrtka</h3>
                  <p className="text-sm text-slate-200">Lekce {LESSONS_COMPLETED}/{TOTAL_LESSONS} - Model podnikání</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-400">{PROGRESS_PERCENT}%</div>
                    <div className="text-xs text-slate-200">Hotovo</div>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
              </div>

              {/* Canvas Grid */}
              <div className="p-6 bg-slate-50">
                <div className="grid grid-cols-5 gap-3 mb-3">
                  
                  {/* Row 1: Partners, Activities, Value, Relationships, Segments */}
                  <CanvasBox
                    icon={<Users className="w-4 h-4" />}
                    title="Partnerství"
                    content={DEMO_DATA.partner}
                    blurLevel="medium"
                    isActive={currentBox === 'partner'}
                  />
                  
                  <CanvasBox
                    icon={<Zap className="w-4 h-4" />}
                    title="Aktivity"
                    content={DEMO_DATA.activity}
                    blurLevel="medium"
                    isActive={currentBox === 'activity'}
                  />
                  
                  <CanvasBox
                    icon={<Target className="w-4 h-4" />}
                    title="Hodnota"
                    content={showTyping && currentBox === 'value' ? typedText : DEMO_DATA.value}
                    blurLevel="light"
                    isActive={currentBox === 'value'}
                    highlight
                  />
                  
                  <CanvasBox
                    icon={<BookOpen className="w-4 h-4" />}
                    title="Vztahy"
                    content={showTyping && currentBox === 'relationship' ? typedText : DEMO_DATA.relationship}
                    blurLevel="light"
                    isActive={currentBox === 'relationship'}
                  />
                  
                  <CanvasBox
                    icon={<Users className="w-4 h-4" />}
                    title="Segmenty"
                    content={showTyping && currentBox === 'segment' ? typedText : DEMO_DATA.segment}
                    blurLevel="none"
                    isActive={currentBox === 'segment'}
                  />
                </div>

                <div className="grid grid-cols-5 gap-3 mb-3">
                  {/* Row 2: Resources (span 2) + Channels (span 3) */}
                  <div className="col-span-2">
                    <CanvasBox
                      icon={<Package className="w-4 h-4" />}
                      title="Zdroje"
                      content={DEMO_DATA.resource}
                      blurLevel="medium"
                      isActive={currentBox === 'resource'}
                    />
                  </div>
                  
                  <div className="col-span-3">
                    <CanvasBox
                      icon={<TrendingUp className="w-4 h-4" />}
                      title="Kanály"
                      content={showTyping && currentBox === 'channel' ? typedText : DEMO_DATA.channel}
                      blurLevel="light"
                      isActive={currentBox === 'channel'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Row 3: Costs + Revenue */}
                  <CanvasBox
                    icon={<DollarSign className="w-4 h-4" />}
                    title="Náklady"
                    content={DEMO_DATA.cost}
                    blurLevel="heavy"
                    isActive={currentBox === 'cost'}
                  />
                  
                  <CanvasBox
                    icon={<DollarSign className="w-4 h-4" />}
                    title="Příjmy"
                    content={showTyping && currentBox === 'revenue' ? typedText : DEMO_DATA.revenue}
                    blurLevel="heavy"
                    isActive={currentBox === 'revenue'}
                  />
                </div>
              </div>

              {/* Action Bar */}
              <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>Automaticky uloženo před 2 minutami</span>
                </div>
                <Button
                  onClick={() => setShowTyping(!showTyping)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-slate-900 hover:from-yellow-400 hover:to-orange-400"
                >
                  {showTyping ? '⏸️ Pozastavit' : '▶️ Animovat vyplňování'}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Mobile View */}
          {activeView === 'mobile' && (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mx-auto max-w-sm"
            >
              {/* Phone Mockup */}
              <div className="bg-slate-900 rounded-[3rem] p-4 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  
                  {/* Phone Notch */}
                  <div className="bg-slate-800 h-8 flex items-center justify-center relative">
                    <div className="absolute top-2 w-24 h-4 bg-slate-900 rounded-full"></div>
                  </div>

                  {/* Mobile Course Header */}
                  <div className="bg-gradient-to-r from-slate-600 to-indigo-600 text-white px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Modul 1</h3>
                      <span className="text-xs bg-green-500 px-2 py-1 rounded-full">
                        {LESSONS_COMPLETED}/{TOTAL_LESSONS}
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${PROGRESS_PERCENT}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Mobile Canvas Accordion */}
                  <div className="p-4 space-y-2 max-h-[500px] overflow-y-auto">
                    <MobileCanvasItem
                      icon={<Users className="w-4 h-4" />}
                      title="Zákaznické segmenty"
                      content={DEMO_DATA.segment}
                      blurLevel="none"
                      completed
                    />
                    <MobileCanvasItem
                      icon={<Target className="w-4 h-4" />}
                      title="Hodnotová nabídka"
                      content={DEMO_DATA.value}
                      blurLevel="light"
                      completed
                    />
                    <MobileCanvasItem
                      icon={<TrendingUp className="w-4 h-4" />}
                      title="Kanály"
                      content={DEMO_DATA.channel}
                      blurLevel="light"
                      completed
                    />
                    <MobileCanvasItem
                      icon={<BookOpen className="w-4 h-4" />}
                      title="Vztahy se zákazníky"
                      content={DEMO_DATA.relationship}
                      blurLevel="medium"
                      completed={false}
                    />
                    <MobileCanvasItem
                      icon={<DollarSign className="w-4 h-4" />}
                      title="Zdroje příjmů"
                      content={DEMO_DATA.revenue}
                      blurLevel="heavy"
                      completed={false}
                    />
                  </div>

                  {/* Mobile Bottom Nav */}
                  <div className="border-t border-slate-200 p-2 flex justify-around">
                    <button className="p-2 text-indigo-600">
                      <BookOpen className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-400">
                      <Target className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-400">
                      <TrendingUp className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-center text-slate-300 mt-6 text-sm">
                ✨ Funguje i na mobilu - vyplníš to klidně na tramvaji
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-white text-xl mb-2">
            <span className="text-yellow-400 font-bold">90 minut.</span> Z prázdna do jasna.
          </p>
          <p className="text-slate-300 mb-6">
            Tohle přesně dostaneš. Žádné obecné kecy, jen TVŮJ model.
          </p>
          <Button
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-slate-900 hover:from-yellow-400 hover:to-orange-400 text-lg px-8 py-6"
            onClick={() => window.location.href = '/order'}
          >
            Chci to vyplnit 👉 4999 Kč
          </Button>
        </motion.div>

      </div>
    </div>
  );
}

// Canvas Box Component (Desktop)
interface CanvasBoxProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  blurLevel: 'none' | 'light' | 'medium' | 'heavy';
  isActive?: boolean;
  highlight?: boolean;
}

function CanvasBox({ icon, title, content, blurLevel, isActive, highlight }: CanvasBoxProps) {
  const blurClasses = {
    none: '',
    light: 'blur-[2px]',
    medium: 'blur-[4px]',
    heavy: 'blur-[6px]',
  };

  return (
    <div className={`
      bg-white rounded-lg border-2 p-3 relative transition-all duration-300
      ${isActive ? 'border-yellow-400 shadow-lg' : 'border-slate-200'}
      ${highlight ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}
    `}>
      <div className="flex items-center gap-2 mb-2">
        <div className="text-slate-600">{icon}</div>
        <h4 className="text-xs font-semibold text-slate-700">{title}</h4>
      </div>
      <p className={`text-xs text-slate-600 leading-relaxed ${blurClasses[blurLevel]}`}>
        {content}
      </p>
      {blurLevel !== 'none' && (
        <div className="absolute top-1 right-1">
          <div className="bg-yellow-400 text-slate-900 text-[10px] px-1.5 py-0.5 rounded font-bold">
            🔒
          </div>
        </div>
      )}
      {isActive && (
        <motion.div
          className="absolute inset-0 border-2 border-yellow-400 rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );
}

// Mobile Canvas Item
interface MobileCanvasItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  blurLevel: 'none' | 'light' | 'medium' | 'heavy';
  completed: boolean;
}

function MobileCanvasItem({ icon, title, content, blurLevel, completed }: MobileCanvasItemProps) {
  const blurClasses = {
    none: '',
    light: 'blur-[2px]',
    medium: 'blur-[4px]',
    heavy: 'blur-[6px]',
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="text-slate-600">{icon}</div>
          <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
        </div>
        {completed ? (
          <CheckCircle2 className="w-4 h-4 text-green-500" />
        ) : (
          <div className="w-4 h-4 border-2 border-slate-300 rounded-full"></div>
        )}
      </div>
      <p className={`text-xs text-slate-600 ${blurClasses[blurLevel]}`}>
        {content}
      </p>
      {blurLevel !== 'none' && (
        <div className="mt-2 text-[10px] text-yellow-600 font-semibold">
          🔒 Uvidíš po vyplnění
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Copy, Check, Video, Image as ImageIcon, Download,
  Calendar, ArrowRight, ChevronLeft, ChevronRight
} from 'lucide-react';

/**
 * 🚀 30 ORGANIC POSTŮ - SIMPLE & EFFICIENT
 * 
 * Každý post = 1 animace NEBO 1 statický obrázek
 * 
 * Workflow:
 * 1. Vyber post
 * 2. Screenshot (static) NEBO nahraj mobil obrazovku (animace)
 * 3. Upload na FB/IG + copy text
 * 4. HOTOVO!
 */

interface PostData {
  id: number;
  type: 'static' | 'animated';
  title: string;
  segment: string;
  pain: string;
  copy: string;
}

const POSTS: PostData[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // POST #1: Target Kalkulačka (ANIMATED)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 1,
    type: 'animated',
    title: 'Target Kalkulačka',
    segment: 'universal',
    pain: 'Nevím kolik zákazníků potřebuju',
    copy: `💬 "Kolik máš sledujících?"

❌ ŠPATNÁ otázka.

━━━━━━━━━━━━━━━━━━━━━━━

Správná otázka:

✅ "Kolik zákazníků potřebuješ k 50.000 Kč/měsíc?"

━━━━━━━━━━━━━━━━━━━━━━━

Příklad:

Průměrná hodnota zákazníka: 2.500 Kč
Tvůj měsíční cíl: 50.000 Kč

50.000 ÷ 2.500 = 20 zákazníků/měsíc

= 5 zákazníků/týden
= 1 zákazník/den

━━━━━━━━━━━━━━━━━━━━━━━

TARGET KALKULAČKA.

Žádné doufání. Jen matematika.

👉 www.podnikatelskactvrtka.cz

#podnikani #strategie #businesstips #matematika`
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // POST #2: 3 roky vs 90 minut (STATIC)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 2,
    type: 'static',
    title: '3 roky vs 90 minut',
    segment: 'beginner',
    pain: 'Investoval bez strategie',
    copy: `"Prodal jsem všechno."
"Vzal jsem hypotéku."
"Investoval do byznysu."

━━━━━━━━━━━━━━━━━━━━━━━

Rok 1: "Ještě to chce čas..."
Rok 2: "Asi změním strategii..."
Rok 3: "Možná to vzdám..."

━━━━━━━━━━━━━━━━━━━━━━━

💔 To bolí.

Šlo o to, že CHYBÍ STRATEGIE.

━━━━━━━━━━━━━━━━━━━━━━━

✅ CO KDYBY...

PŘED tou hypotékou.
PŘED tou investicí.

...si udělal Model podnikání?

90 minut. Zjistíš JESTLI to má šanci.

www.podnikatelskactvrtka.cz

#podnikani #investice #startup`
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // POST #3: Prodělávám (ANIMATED)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 3,
    type: 'animated',
    title: 'Tržby vs Náklady',
    segment: 'struggling',
    pain: 'Prodělávám, nevím proč',
    copy: `Máma: "Vydělal jsi už něco?"

TY: 😅 "Jo, běží to..."

REALITA:
📊 Tržby: 12.000 Kč
💸 Náklady: 35.000 Kč
💔 Zisk: -23.000 Kč

━━━━━━━━━━━━━━━━━━━━━━━

❌ NE. Nejsi blbej.
Jen ti chybí SYSTÉM.

━━━━━━━━━━━━━━━━━━━━━━━

Model podnikání:

✅ Jasný zákazník
✅ Jasná nabídka
✅ Jasný plán

90 minut. Místo chaosu → jasno.

www.podnikatelskactvrtka.cz

#podnikani #reality #strategie`
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // POST #4: Segment Size (STATIC)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 4,
    type: 'static',
    title: 'Je tam dost zákazníků?',
    segment: 'beginner',
    pain: 'Nevím jestli je dost lidí',
    copy: `💬 "Je v ČR vůbec dost lidí pro můj byznys?"

━━━━━━━━━━━━━━━━━━━━━━━

SEGMENT SIZE TOOL ukázal:

✅ Marketing manažeři: 12.000
✅ Freelanceři: 3.500
✅ E-shop majitelé: 8.500
✅ Podnikatelé: 15.000

= CELKEM: 39.000 zákazníků

━━━━━━━━━━━━━━━━━━━━━━━

Potřebuji k 50k: 20 zákazníků

20 z 39.000 = 0,05% conversion

━━━━━━━━━━━━━━━━━━━━━━━

Přesná čísla místo guessingu.

To je SEGMENT SIZE TOOL
v Podnikatelské Čtvrtce.

www.podnikatelskactvrtka.cz

#podnikani #data #matematika`
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // POST #5: Googling chaos (ANIMATED)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 5,
    type: 'animated',
    title: '15 tabů → 0 výsledků',
    segment: 'struggling',
    pain: 'Googlit každý den, nic',
    copy: `Pondělí večer. 22:37.

15 otevřených tabů:
→ "Jak udělat FB reklamu"
→ "Jak najít zákazníky"
→ "Best marketing 2025"

━━━━━━━━━━━━━━━━━━━━━━━

23:45. Zavíráš notebook.

❓ Co jsi udělal? Nic.

━━━━━━━━━━━━━━━━━━━━━━━

Existuje systém:

1. KDO je zákazník
2. CO mu nabízíš
3. KDE ho najdeš
4. AKČNÍ PLÁN na zítra

90 minut. Hotovo.

www.podnikatelskactvrtka.cz

#podnikani #produktivita #focus`
  }
];

// ═══════════════════════════════════════════════════════════
// 🎨 POST VISUAL COMPONENTS
// ═══════════════════════════════════════════════════════════

function Post1TargetCalculator() {
  return (
    <motion.div
      className="relative w-full aspect-square bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 rounded-xl overflow-hidden flex items-center justify-center"
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      <div className="text-center p-6">
        <div className="text-2xl mb-6">TARGET KALKULAČKA</div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-3">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, repeat: Infinity, repeatDelay: 4 }}
          >
            <div className="text-xs text-slate-300">Tvůj cíl:</div>
            <div className="text-3xl font-bold text-green-400">50.000 Kč</div>
          </motion.div>

          <motion.div
            className="text-3xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 4 }}
          >
            ÷
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatDelay: 4 }}
          >
            <div className="text-xs text-slate-300">Cena produktu:</div>
            <div className="text-3xl font-bold text-blue-400">2.500 Kč</div>
          </motion.div>

          <motion.div
            className="border-t border-white/20 pt-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8, repeat: Infinity, repeatDelay: 4 }}
          >
            <div className="text-lg mb-1">=</div>
            <motion.div
              className="text-5xl font-bold text-yellow-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ delay: 2.5, duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
            >
              20
            </motion.div>
            <div className="text-sm text-slate-300 mt-1">zákazníků/měsíc</div>
          </motion.div>

          <motion.div
            className="text-sm text-green-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.8, repeat: Infinity, repeatDelay: 4 }}
          >
            <div className="text-lg font-bold">= 1 zákazník/DEN</div>
          </motion.div>
        </div>

        <motion.div
          className="mt-6 text-lg font-bold text-yellow-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          podnikatelskactvrtka.cz
        </motion.div>
      </div>

      <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs">
        1080×1080
      </div>
      <div className="absolute top-2 right-2 px-2 py-1 bg-purple-600/50 backdrop-blur-sm rounded text-xs flex items-center gap-1">
        <Video size={10} />
        VIDEO
      </div>
    </motion.div>
  );
}

function Post2Timeline() {
  return (
    <div className="relative w-full aspect-square bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-xl overflow-hidden">
      <div className="absolute inset-0 flex p-4">
        {/* Left - BEZ STRATEGIE */}
        <div className="flex-1 flex flex-col justify-center pr-2">
          <div className="text-center">
            <div className="text-base mb-3 text-red-400 font-bold">BEZ STRATEGIE</div>
            
            <div className="space-y-2">
              <div className="bg-red-900/30 border border-red-600 rounded-lg p-2">
                <div className="text-2xl font-bold">Rok 1</div>
                <div className="text-xs text-gray-300">"Ještě to chce čas..."</div>
                <div className="text-3xl mt-1">📉</div>
              </div>

              <div className="text-2xl text-red-500">↓</div>

              <div className="bg-red-900/40 border border-red-700 rounded-lg p-2">
                <div className="text-2xl font-bold">Rok 2</div>
                <div className="text-xs text-gray-300">"Asi změním..."</div>
                <div className="text-3xl mt-1">📉</div>
              </div>

              <div className="text-2xl text-red-500">↓</div>

              <div className="bg-red-900/50 border border-red-800 rounded-lg p-2">
                <div className="text-2xl font-bold">Rok 3</div>
                <div className="text-xs text-gray-300">"Možná to vzdám..."</div>
                <div className="text-3xl mt-1">💔</div>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="w-px bg-white/20 mx-2" />

        {/* Right - SE STRATEGIÍ */}
        <div className="flex-1 flex flex-col justify-center items-center text-center pl-2">
          <div className="text-base mb-3 text-green-400 font-bold">SE STRATEGIÍ</div>
          
          <div className="bg-green-900/30 border border-green-500 rounded-lg p-3 mb-3">
            <div className="text-4xl mb-2">✅</div>
            <div className="text-4xl font-bold mb-2 text-yellow-400">90 min</div>
            <div className="text-xs text-gray-300">PŘED investicí</div>
          </div>

          <div className="text-2xl mb-2">↓</div>

          <div className="text-base mb-1">Model podnikání</div>
          <div className="text-xs text-gray-300 mb-2">Zjistíš JESTLI<br/>to má šanci</div>

          <div className="text-5xl">📈</div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 text-center">
        <div className="text-base font-bold text-yellow-400">
          podnikatelskactvrtka.cz
        </div>
      </div>

      <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs">
        1080×1080
      </div>
      <div className="absolute top-2 right-2 px-2 py-1 bg-blue-600/50 backdrop-blur-sm rounded text-xs flex items-center gap-1">
        <ImageIcon size={10} />
        IMG
      </div>
    </div>
  );
}

function Post3Revenue() {
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div className="relative w-full aspect-square rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="text-4xl mb-6">💬</div>
            <div className="text-2xl">"Vydělal jsi už něco?"</div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="lie"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="text-5xl mb-6">😅</div>
            <div className="text-2xl">"Jo jo, běží to..."</div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="reality"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-red-800 to-red-950 flex flex-col items-center justify-center p-6"
          >
            <div className="text-2xl mb-6">REALITA:</div>
            <div className="space-y-4 text-center">
              <div>
                <div className="text-sm mb-1">📊 Tržby</div>
                <div className="text-4xl font-bold text-green-400">12.000</div>
              </div>
              <div>
                <div className="text-sm mb-1">💸 Náklady</div>
                <div className="text-4xl font-bold text-red-400">35.000</div>
              </div>
              <div>
                <div className="text-5xl">💔</div>
                <div className="text-3xl font-bold text-red-500">-23k Kč</div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="solution"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-green-700 to-emerald-800 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="text-xl mb-4">Nejsi blbej.</div>
            <div className="text-2xl font-bold text-yellow-400 mb-6">
              Jen ti chybí SYSTÉM
            </div>
            <div className="text-base mb-2">Model podnikání</div>
            <div className="text-3xl font-bold">90 minut</div>
            <div className="text-base mt-6 text-yellow-400">
              podnikatelskactvrtka.cz
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs z-10">
        1080×1080
      </div>
      <div className="absolute top-2 right-2 px-2 py-1 bg-purple-600/50 backdrop-blur-sm rounded text-xs flex items-center gap-1 z-10">
        <Video size={10} />
        VIDEO
      </div>
    </motion.div>
  );
}

function Post4SegmentSize() {
  return (
    <div className="relative w-full aspect-square bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-900 rounded-xl overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-xl mb-4">"Je tam dost zákazníků?"</div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-full space-y-2 mb-4">
          <div className="text-base mb-3 text-yellow-400">SEGMENT SIZE TOOL:</div>
          
          <div className="flex justify-between items-center p-2 bg-green-600/20 rounded">
            <div className="text-xs text-slate-300">Marketing manažeři</div>
            <div className="text-xl font-bold text-green-400">12k</div>
          </div>

          <div className="flex justify-between items-center p-2 bg-green-600/20 rounded">
            <div className="text-xs text-slate-300">Freelanceři</div>
            <div className="text-xl font-bold text-green-400">3,5k</div>
          </div>

          <div className="flex justify-between items-center p-2 bg-green-600/20 rounded">
            <div className="text-xs text-slate-300">E-shop majitelé</div>
            <div className="text-xl font-bold text-green-400">8,5k</div>
          </div>

          <div className="flex justify-between items-center p-2 bg-green-600/20 rounded">
            <div className="text-xs text-slate-300">Podnikatelé</div>
            <div className="text-xl font-bold text-green-400">15k</div>
          </div>

          <div className="border-t border-white/20 pt-2 mt-2">
            <div className="flex justify-between items-center">
              <div className="text-base">CELKEM:</div>
              <div className="text-3xl font-bold text-yellow-400">39k</div>
            </div>
          </div>
        </div>

        <div className="text-base mb-2">Potřebuju: 20 zákazníků</div>
        <div className="text-sm text-green-300">20 z 39.000 = 0,05% ✅</div>

        <div className="text-base mt-6 font-bold text-yellow-400">
          podnikatelskactvrtka.cz
        </div>
      </div>

      <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs">
        1080×1080
      </div>
      <div className="absolute top-2 right-2 px-2 py-1 bg-blue-600/50 backdrop-blur-sm rounded text-xs flex items-center gap-1">
        <ImageIcon size={10} />
        IMG
      </div>
    </div>
  );
}

function Post5GoogleTabs() {
  const [showChaos, setShowChaos] = useState(true);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setShowChaos((prev) => !prev);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div className="relative w-full aspect-square rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        {showChaos ? (
          <motion.div
            key="chaos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex flex-col p-4"
          >
            <div className="text-center mb-4">
              <div className="text-3xl mb-1">🕙</div>
              <div className="text-2xl">22:37</div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="bg-red-600/30 border border-red-400/50 rounded p-2 text-xs">
                "Jak udělat FB reklamu"
              </div>
              <div className="bg-red-600/30 border border-red-400/50 rounded p-2 text-xs">
                "Jak najít zákazníky"
              </div>
              <div className="bg-red-600/30 border border-red-400/50 rounded p-2 text-xs">
                "Best marketing 2025"
              </div>
              <div className="bg-red-600/30 border border-red-400/50 rounded p-2 text-xs opacity-70">
                ...a dalších 12 tabů
              </div>
            </div>

            <div className="text-center mt-4">
              <div className="text-2xl mb-2">23:45</div>
              <div className="text-xl mb-1">❓</div>
              <div className="text-sm text-red-400">Co jsi udělal?</div>
              <div className="text-5xl mt-2 text-gray-500">0</div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="solution"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="text-xl mb-4">Existuje systém:</div>
            
            <div className="space-y-2 text-left w-full">
              <div className="flex items-center gap-2 bg-white/10 rounded p-2">
                <div className="text-xl font-bold text-green-400">1.</div>
                <div className="text-sm">KDO je zákazník</div>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded p-2">
                <div className="text-xl font-bold text-green-400">2.</div>
                <div className="text-sm">CO mu nabízíš</div>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded p-2">
                <div className="text-xl font-bold text-green-400">3.</div>
                <div className="text-sm">KDE ho najdeš</div>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded p-2">
                <div className="text-xl font-bold text-green-400">4.</div>
                <div className="text-sm">PLÁN na zítra</div>
              </div>
            </div>

            <div className="mt-6 text-2xl font-bold text-yellow-400">90 minut</div>
            <div className="text-sm mt-4 text-yellow-400">podnikatelskactvrtka.cz</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs z-10">
        1080×1080
      </div>
      <div className="absolute top-2 right-2 px-2 py-1 bg-purple-600/50 backdrop-blur-sm rounded text-xs flex items-center gap-1 z-10">
        <Video size={10} />
        VIDEO
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// 🎨 MAIN COMPONENT
// ═══════════════════════════════════════════════════════════

export default function OrganicPostsSimple() {
  const [selectedPost, setSelectedPost] = useState(1);
  const [copiedPost, setCopiedPost] = useState<number | null>(null);

  const currentPost = POSTS.find(p => p.id === selectedPost) || POSTS[0];

  const copyToClipboard = (text: string, postId: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPost(postId);
    setTimeout(() => setCopiedPost(null), 2000);
  };

  const renderPostVisual = () => {
    switch (selectedPost) {
      case 1: return <Post1TargetCalculator />;
      case 2: return <Post2Timeline />;
      case 3: return <Post3Revenue />;
      case 4: return <Post4SegmentSize />;
      case 5: return <Post5GoogleTabs />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl mb-2">
          🚀 Organic Posts - Simple & Efektivní
        </h1>
        <p className="text-slate-300">
          1 post = 1 animace nebo 1 obrázek. Screenshot/nahraj → upload na FB/IG!
        </p>
      </div>

      {/* Post Selector */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Vyber Post:</h2>
            <div className="text-sm text-slate-300">
              Post {selectedPost} / {POSTS.length}
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {POSTS.map((post) => (
              <button
                key={post.id}
                onClick={() => setSelectedPost(post.id)}
                className={`
                  p-4 rounded-lg transition-all text-left
                  ${selectedPost === post.id
                    ? 'bg-purple-600 scale-105 shadow-lg'
                    : 'bg-white/20 hover:bg-white/30'
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-2xl font-bold">{post.id}</div>
                  {post.type === 'animated' ? (
                    <Video size={16} className="text-purple-300" />
                  ) : (
                    <ImageIcon size={16} className="text-blue-300" />
                  )}
                </div>
                <div className="text-xs text-slate-300 line-clamp-2">
                  {post.title}
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setSelectedPost(Math.max(1, selectedPost - 1))}
              disabled={selectedPost === 1}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
              Předchozí
            </button>
            <button
              onClick={() => setSelectedPost(Math.min(POSTS.length, selectedPost + 1))}
              disabled={selectedPost === POSTS.length}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              Další
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Current Post */}
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Left: Visual */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl mb-1">Post #{currentPost.id}</h2>
                <div className="text-xs text-slate-400">{currentPost.title}</div>
              </div>
              <div className={`
                px-3 py-1 rounded-full text-sm flex items-center gap-2
                ${currentPost.type === 'animated' ? 'bg-purple-600/50' : 'bg-blue-600/50'}
              `}>
                {currentPost.type === 'animated' ? (
                  <>
                    <Video size={16} />
                    Animace
                  </>
                ) : (
                  <>
                    <ImageIcon size={16} />
                    Static
                  </>
                )}
              </div>
            </div>

            {/* Visual - max 400px */}
            <div className="flex justify-center mb-4">
              <div className="w-full max-w-[400px]">
                {renderPostVisual()}
              </div>
            </div>

            {/* Instructions */}
            <div className={`
              p-4 rounded-lg border
              ${currentPost.type === 'animated' 
                ? 'bg-purple-600/20 border-purple-400/30' 
                : 'bg-blue-600/20 border-blue-400/30'
              }
            `}>
              <div className="text-sm space-y-2">
                <div className="font-bold mb-2">
                  {currentPost.type === 'animated' ? '📱 Jak natočit:' : '📸 Jak použít:'}
                </div>
                {currentPost.type === 'animated' ? (
                  <ol className="list-decimal list-inside space-y-1 text-slate-300">
                    <li>Otevři tuto stránku na mobilu</li>
                    <li>Zapni nahrávání obrazovky</li>
                    <li>Nech animaci běžet 5-10s</li>
                    <li>Ukonči nahrávání</li>
                    <li>Upload video na FB/IG + copy text vpravo</li>
                  </ol>
                ) : (
                  <ol className="list-decimal list-inside space-y-1 text-slate-300">
                    <li>Screenshot tohoto obrázku</li>
                    <li>Upload na FB/IG jako post</li>
                    <li>Přidej copy text z pravé strany</li>
                    <li>Publikuj!</li>
                  </ol>
                )}
              </div>
            </div>

            {/* Metadata */}
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Segment:</span>
                <span className="px-2 py-1 bg-green-600/30 rounded">{currentPost.segment}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-slate-400">Pain:</span>
                <span className="text-orange-300 text-right max-w-xs">{currentPost.pain}</span>
              </div>
            </div>
          </div>

          {/* Right: Copy Text */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">Copy Text</h3>
              <button
                onClick={() => copyToClipboard(currentPost.copy, currentPost.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                  ${copiedPost === currentPost.id
                    ? 'bg-green-600'
                    : 'bg-purple-600 hover:bg-purple-700'
                  }
                `}
              >
                {copiedPost === currentPost.id ? (
                  <>
                    <Check size={20} />
                    Zkopírováno!
                  </>
                ) : (
                  <>
                    <Copy size={20} />
                    Kopírovat
                  </>
                )}
              </button>
            </div>

            <div className="bg-black/30 rounded-lg p-4 max-h-[500px] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed">
                {currentPost.copy}
              </pre>
            </div>

            {/* Quick workflow */}
            <div className="mt-6 p-4 bg-green-600/20 border border-green-400/30 rounded-lg">
              <div className="text-sm space-y-2">
                <div className="font-bold mb-2 flex items-center gap-2">
                  ✅ Quick Workflow:
                </div>
                <div className="space-y-1 text-slate-300">
                  <div>1. {currentPost.type === 'animated' ? 'Nahraj video' : 'Screenshot obrázku'} vlevo</div>
                  <div>2. Zkopíruj tento text ↑</div>
                  <div>3. Upload na FB/IG s tímto textem</div>
                  <div className="text-yellow-400 font-bold">4. HOTOVO! 🚀</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

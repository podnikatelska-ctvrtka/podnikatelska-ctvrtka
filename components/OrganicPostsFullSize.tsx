import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Copy, Check, Video, Image as ImageIcon,
  ChevronLeft, ChevronRight, Monitor
} from 'lucide-react';

/**
 * 🎨 ORGANIC POSTS - FULL SIZE
 * 
 * Každý post = CELÁ STRÁNKA (plná velikost)
 * Screenshot celé stránky → upload na FB/IG
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
  {
    id: 4,
    type: 'static',
    title: 'Segment Size',
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
  {
    id: 5,
    type: 'animated',
    title: 'Google Tabs Chaos',
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
// 🎨 FULL-SIZE POST COMPONENTS
// ═══════════════════════════════════════════════════════════

function Post1TargetCalculator() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
          className="mb-12"
        >
          <h1 className="text-7xl font-bold mb-4">TARGET KALKULAČKA</h1>
          <p className="text-3xl text-slate-300">Kolik zákazníků potřebuješ?</p>
        </motion.div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-16 space-y-10">
          {/* Input 1 */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1, repeat: Infinity, repeatDelay: 5 }}
          >
            <div className="text-2xl text-slate-300 mb-4">Tvůj měsíční cíl:</div>
            <div className="text-8xl font-bold text-green-400">50.000 Kč</div>
          </motion.div>

          {/* Division */}
          <motion.div
            className="text-8xl font-bold"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, delay: 2, repeat: Infinity, repeatDelay: 5 }}
          >
            ÷
          </motion.div>

          {/* Input 2 */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 1, repeat: Infinity, repeatDelay: 5 }}
          >
            <div className="text-2xl text-slate-300 mb-4">Průměrná cena produktu:</div>
            <div className="text-8xl font-bold text-blue-400">2.500 Kč</div>
          </motion.div>

          {/* Result */}
          <motion.div
            className="border-t-4 border-white/30 pt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 1, repeat: Infinity, repeatDelay: 5 }}
          >
            <div className="text-4xl mb-4">=</div>
            <motion.div
              className="text-9xl font-bold text-yellow-400 mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ delay: 4, duration: 0.6, repeat: Infinity, repeatDelay: 5 }}
            >
              20
            </motion.div>
            <div className="text-3xl text-slate-300 mb-8">zákazníků/měsíc</div>
            
            <motion.div
              className="text-4xl space-y-3 text-green-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.5, duration: 1, repeat: Infinity, repeatDelay: 5 }}
            >
              <div>= 5 zákazníků/týden</div>
              <div className="text-5xl font-bold text-yellow-400">= 1 zákazník/DEN</div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 text-5xl font-bold text-yellow-400"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          www.podnikatelskactvrtka.cz
        </motion.div>
      </div>
    </div>
  );
}

function Post2Timeline() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        <h1 className="text-7xl font-bold text-center mb-16">3 roky vs 90 minut</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left - BEZ STRATEGIE */}
          <div className="space-y-8">
            <div className="text-5xl font-bold text-red-400 text-center mb-12">
              ❌ BEZ STRATEGIE
            </div>
            
            <div className="space-y-6">
              <div className="bg-red-900/30 border-4 border-red-600 rounded-2xl p-8">
                <div className="text-7xl font-bold mb-4">Rok 1</div>
                <div className="text-2xl text-gray-300">"Ještě to chce čas..."</div>
                <div className="text-8xl mt-6">📉</div>
              </div>

              <div className="text-7xl text-red-500 text-center">↓</div>

              <div className="bg-red-900/40 border-4 border-red-700 rounded-2xl p-8">
                <div className="text-7xl font-bold mb-4">Rok 2</div>
                <div className="text-2xl text-gray-300">"Asi změním strategii..."</div>
                <div className="text-8xl mt-6">📉</div>
              </div>

              <div className="text-7xl text-red-500 text-center">↓</div>

              <div className="bg-red-900/50 border-4 border-red-800 rounded-2xl p-8">
                <div className="text-7xl font-bold mb-4">Rok 3</div>
                <div className="text-2xl text-gray-300">"Možná to vzdám..."</div>
                <div className="text-8xl mt-6">💔</div>
              </div>
            </div>
          </div>

          {/* Right - SE STRATEGIÍ */}
          <div className="flex flex-col justify-center items-center text-center space-y-12">
            <div className="text-5xl font-bold text-green-400 mb-8">
              ✅ SE STRATEGIÍ
            </div>
            
            <div className="bg-green-900/30 border-4 border-green-500 rounded-3xl p-12">
              <div className="text-9xl mb-8">✅</div>
              <div className="text-9xl font-bold mb-6 text-yellow-400">90 min</div>
              <div className="text-3xl text-gray-300">PŘED investicí</div>
            </div>

            <div className="text-8xl">↓</div>

            <div className="space-y-6">
              <div className="text-4xl font-bold">Model podnikání</div>
              <div className="text-2xl text-gray-300">
                Zjistíš JESTLI<br/>to má šanci
              </div>
              <div className="text-9xl mt-8">📈</div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-5xl font-bold text-yellow-400 text-center">
          www.podnikatelskactvrtka.cz
        </div>
      </div>
    </div>
  );
}

function Post3Revenue() {
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex flex-col items-center justify-center p-16 text-center"
          >
            <div className="text-9xl mb-12">💬</div>
            <div className="text-7xl">Máma: "Vydělal jsi už něco?"</div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="lie"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 flex flex-col items-center justify-center p-16 text-center"
          >
            <div className="text-9xl mb-12">😅</div>
            <div className="text-7xl">"Jo jo, běží to..."</div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="reality"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-red-800 to-red-950 flex flex-col items-center justify-center p-16"
          >
            <div className="text-7xl mb-16 font-bold">REALITA:</div>
            <div className="space-y-12 text-center max-w-4xl">
              <div>
                <div className="text-4xl mb-4">📊 Tržby</div>
                <div className="text-9xl font-bold text-green-400">12.000</div>
              </div>
              <div>
                <div className="text-4xl mb-4">💸 Náklady</div>
                <div className="text-9xl font-bold text-red-400">35.000</div>
              </div>
              <div className="border-t-4 border-white/20 pt-12">
                <div className="text-9xl mb-8">💔</div>
                <div className="text-9xl font-bold text-red-500">-23.000 Kč</div>
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
            className="absolute inset-0 bg-gradient-to-br from-green-700 to-emerald-800 flex flex-col items-center justify-center p-16 text-center"
          >
            <div className="text-6xl mb-8">Nejsi blbej.</div>
            <div className="text-7xl font-bold text-yellow-400 mb-16">
              Jen ti chybí SYSTÉM
            </div>
            <div className="text-5xl mb-8">Model podnikání</div>
            <div className="text-9xl font-bold mb-16">90 minut</div>
            <div className="text-5xl text-yellow-400">
              www.podnikatelskactvrtka.cz
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Post4SegmentSize() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-900 flex items-center justify-center p-16">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-7xl mb-16">"Je tam dost zákazníků?"</h1>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-16 space-y-8 mb-16">
          <div className="text-5xl mb-12 text-yellow-400 font-bold">SEGMENT SIZE TOOL:</div>
          
          <div className="flex justify-between items-center p-6 bg-green-600/20 rounded-2xl">
            <div className="text-3xl text-slate-300">Marketing manažeři</div>
            <div className="text-6xl font-bold text-green-400">12.000</div>
          </div>

          <div className="flex justify-between items-center p-6 bg-green-600/20 rounded-2xl">
            <div className="text-3xl text-slate-300">Freelanceři</div>
            <div className="text-6xl font-bold text-green-400">3.500</div>
          </div>

          <div className="flex justify-between items-center p-6 bg-green-600/20 rounded-2xl">
            <div className="text-3xl text-slate-300">E-shop majitelé</div>
            <div className="text-6xl font-bold text-green-400">8.500</div>
          </div>

          <div className="flex justify-between items-center p-6 bg-green-600/20 rounded-2xl">
            <div className="text-3xl text-slate-300">Podnikatelé</div>
            <div className="text-6xl font-bold text-green-400">15.000</div>
          </div>

          <div className="border-t-4 border-white/30 pt-8 mt-8">
            <div className="flex justify-between items-center">
              <div className="text-5xl font-bold">CELKEM:</div>
              <div className="text-9xl font-bold text-yellow-400">39.000</div>
            </div>
          </div>
        </div>

        <div className="text-4xl mb-6">Potřebuju k 50k měsíčně: <span className="text-yellow-400 font-bold">20 zákazníků</span></div>
        <div className="text-5xl text-green-300 mb-16">
          20 z 39.000 = <span className="font-bold">0,05%</span> ✅
        </div>

        <div className="text-5xl font-bold text-yellow-400">
          www.podnikatelskactvrtka.cz
        </div>
      </div>
    </div>
  );
}

function Post5GoogleTabs() {
  const [showChaos, setShowChaos] = useState(true);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setShowChaos((prev) => !prev);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {showChaos ? (
          <motion.div
            key="chaos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex flex-col justify-center p-16"
          >
            <div className="max-w-6xl mx-auto w-full">
              <div className="text-center mb-12">
                <div className="text-9xl mb-6">🕙</div>
                <div className="text-7xl font-bold">Pondělí večer, 22:37</div>
              </div>

              <div className="space-y-6 mb-16">
                <div className="bg-red-600/30 border-4 border-red-400/50 rounded-2xl p-8 text-4xl">
                  "Jak udělat FB reklamu"
                </div>
                <div className="bg-red-600/30 border-4 border-red-400/50 rounded-2xl p-8 text-4xl">
                  "Jak najít zákazníky"
                </div>
                <div className="bg-red-600/30 border-4 border-red-400/50 rounded-2xl p-8 text-4xl">
                  "Best marketing 2025"
                </div>
                <div className="bg-red-600/30 border-4 border-red-400/50 rounded-2xl p-8 text-4xl opacity-70">
                  ...a dalších 12 tabů
                </div>
              </div>

              <div className="text-center">
                <div className="text-7xl font-bold mb-8">23:45</div>
                <div className="text-8xl mb-6">❓</div>
                <div className="text-5xl text-red-400 mb-8">Co jsi udělal?</div>
                <div className="text-9xl font-bold text-gray-500">0</div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="solution"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 flex items-center justify-center p-16"
          >
            <div className="max-w-5xl w-full text-center">
              <div className="text-7xl mb-16 font-bold">Existuje systém:</div>
              
              <div className="space-y-6 mb-16">
                <div className="flex items-center gap-6 bg-white/10 rounded-2xl p-8">
                  <div className="text-8xl font-bold text-green-400">1.</div>
                  <div className="text-5xl text-left">KDO je zákazník</div>
                </div>
                <div className="flex items-center gap-6 bg-white/10 rounded-2xl p-8">
                  <div className="text-8xl font-bold text-green-400">2.</div>
                  <div className="text-5xl text-left">CO mu nabízíš</div>
                </div>
                <div className="flex items-center gap-6 bg-white/10 rounded-2xl p-8">
                  <div className="text-8xl font-bold text-green-400">3.</div>
                  <div className="text-5xl text-left">KDE ho najdeš</div>
                </div>
                <div className="flex items-center gap-6 bg-white/10 rounded-2xl p-8">
                  <div className="text-8xl font-bold text-green-400">4.</div>
                  <div className="text-5xl text-left">AKČNÍ PLÁN na zítra</div>
                </div>
              </div>

              <div className="text-9xl font-bold text-yellow-400 mb-12">90 minut</div>
              <div className="text-5xl text-yellow-400">www.podnikatelskactvrtka.cz</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 🎨 MAIN COMPONENT - SELECTOR + FULL-SCREEN VIEW
// ═══════════════════════════════════════════════════════════

export default function OrganicPostsFullSize() {
  const [selectedPost, setSelectedPost] = useState(1);
  const [viewMode, setViewMode] = useState<'selector' | 'fullscreen'>('selector');
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

  // FULLSCREEN MODE - jen grafika, nic víc
  if (viewMode === 'fullscreen') {
    return (
      <div className="relative">
        {renderPostVisual()}
        
        {/* Exit fullscreen button */}
        <button
          onClick={() => setViewMode('selector')}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-black/80 hover:bg-black text-white rounded-lg backdrop-blur-sm flex items-center gap-2"
        >
          ← Zpět
        </button>
      </div>
    );
  }

  // SELECTOR MODE - výběr postu + copy text
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">
            🎨 Organic Posts - Full Size
          </h1>
          <p className="text-slate-300">
            Klikni "📺 Celá obrazovka" → Screenshot celé stránky → Upload na FB/IG!
          </p>
        </div>

        {/* Post Selector */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl">Vyber Post:</h2>
            <div className="text-sm text-slate-300">
              Post {selectedPost} / {POSTS.length}
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 mb-6">
            {POSTS.map((post) => (
              <button
                key={post.id}
                onClick={() => setSelectedPost(post.id)}
                className={`
                  p-6 rounded-lg transition-all text-left
                  ${selectedPost === post.id
                    ? 'bg-purple-600 scale-105 shadow-lg'
                    : 'bg-white/20 hover:bg-white/30'
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-3xl font-bold">{post.id}</div>
                  {post.type === 'animated' ? (
                    <Video size={20} className="text-purple-300" />
                  ) : (
                    <ImageIcon size={20} className="text-blue-300" />
                  )}
                </div>
                <div className="text-sm text-slate-300">
                  {post.title}
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedPost(Math.max(1, selectedPost - 1))}
              disabled={selectedPost === 1}
              className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
              Předchozí
            </button>
            <button
              onClick={() => setSelectedPost(Math.min(POSTS.length, selectedPost + 1))}
              disabled={selectedPost === POSTS.length}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              Další
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Current Post Info */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Preview + Fullscreen Button */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl mb-2">Post #{currentPost.id}</h2>
                <div className="text-lg text-slate-400">{currentPost.title}</div>
              </div>
              <div className={`
                px-4 py-2 rounded-full flex items-center gap-2
                ${currentPost.type === 'animated' ? 'bg-purple-600/50' : 'bg-blue-600/50'}
              `}>
                {currentPost.type === 'animated' ? (
                  <>
                    <Video size={20} />
                    Animace
                  </>
                ) : (
                  <>
                    <ImageIcon size={20} />
                    Static
                  </>
                )}
              </div>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={() => setViewMode('fullscreen')}
              className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-2xl font-bold flex items-center justify-center gap-3 mb-6 transition-all transform hover:scale-105"
            >
              <Monitor size={32} />
              📺 Otevřít celou obrazovku
            </button>

            {/* Instructions */}
            <div className={`
              p-6 rounded-lg border-2
              ${currentPost.type === 'animated' 
                ? 'bg-purple-600/20 border-purple-400/30' 
                : 'bg-blue-600/20 border-blue-400/30'
              }
            `}>
              <div className="space-y-3">
                <div className="font-bold text-xl mb-4">
                  {currentPost.type === 'animated' ? '📱 Jak natočit:' : '📸 Jak použít:'}
                </div>
                {currentPost.type === 'animated' ? (
                  <ol className="list-decimal list-inside space-y-2 text-slate-300">
                    <li>Klikni "📺 Otevřít celou obrazovku" nahoře</li>
                    <li>Na mobilu zapni nahrávání obrazovky</li>
                    <li>Nech animaci běžet 8-12 sekund</li>
                    <li>Ukonči nahrávání</li>
                    <li>Upload video na FB/IG + copy text vpravo →</li>
                  </ol>
                ) : (
                  <ol className="list-decimal list-inside space-y-2 text-slate-300">
                    <li>Klikni "📺 Otevřít celou obrazovku" nahoře</li>
                    <li>Screenshot celé stránky (Win+Shift+S / Cmd+Shift+4)</li>
                    <li>Upload na FB/IG jako post</li>
                    <li>Přidej copy text z pravé strany →</li>
                    <li>Publikuj!</li>
                  </ol>
                )}
              </div>
            </div>

            {/* Metadata */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-lg">
                <span className="text-slate-400">Segment:</span>
                <span className="px-3 py-1 bg-green-600/30 rounded">{currentPost.segment}</span>
              </div>
              <div className="flex items-start justify-between text-lg">
                <span className="text-slate-400">Pain point:</span>
                <span className="text-orange-300 text-right max-w-md">{currentPost.pain}</span>
              </div>
            </div>
          </div>

          {/* Right: Copy Text */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl">Copy Text pro FB/IG</h3>
              <button
                onClick={() => copyToClipboard(currentPost.copy, currentPost.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg transition-all text-lg font-bold
                  ${copiedPost === currentPost.id
                    ? 'bg-green-600'
                    : 'bg-purple-600 hover:bg-purple-700'
                  }
                `}
              >
                {copiedPost === currentPost.id ? (
                  <>
                    <Check size={24} />
                    Zkopírováno!
                  </>
                ) : (
                  <>
                    <Copy size={24} />
                    Kopírovat
                  </>
                )}
              </button>
            </div>

            <div className="bg-black/30 rounded-lg p-6 max-h-[700px] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans leading-relaxed">
                {currentPost.copy}
              </pre>
            </div>

            {/* Quick workflow */}
            <div className="mt-6 p-6 bg-green-600/20 border-2 border-green-400/30 rounded-lg">
              <div className="space-y-3">
                <div className="font-bold text-xl mb-4 flex items-center gap-2">
                  ✅ Quick Workflow:
                </div>
                <div className="space-y-2 text-slate-300 text-lg">
                  <div>1. Klikni "📺 Celá obrazovka" vlevo</div>
                  <div>2. {currentPost.type === 'animated' ? 'Nahraj mobil obrazovku 8-12s' : 'Screenshot celé stránky'}</div>
                  <div>3. Zkopíruj tento text ↑</div>
                  <div>4. Upload na FB/IG s tímto textem</div>
                  <div className="text-yellow-400 font-bold text-xl">5. HOTOVO! 🚀</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

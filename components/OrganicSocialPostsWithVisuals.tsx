import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Copy, Check, Video, Image as ImageIcon, Download, Camera,
  Calendar, Target, TrendingUp, AlertCircle, Sparkles, ArrowRight,
  DollarSign, Users, Zap, Clock, BarChart3, CheckCircle2
} from 'lucide-react';

/**
 * 🚀 30 POSTŮ CO GRÁLAJÍ - S VIZUÁLNÍMI MOCKUPY!
 * 
 * Každý post má:
 * ✅ Copy text
 * ✅ VIZUÁLNÍ MOCKUP (grafika/animace)
 * ✅ Storyboard pro video
 * ✅ Export možnost
 */

// ═══════════════════════════════════════════════════════════
// 📝 POST DATA S VIZUÁLNÍMI NÁVRHY
// ═══════════════════════════════════════════════════════════

interface VisualFrame {
  title: string;
  elements: string[];
  duration?: string;
  animation?: string;
}

interface PostData {
  id: number;
  type: 'video' | 'static';
  videoFormat?: string;
  segment: string;
  pain: string;
  copy: string;
  mediaDescription: string;
  visualFrames: VisualFrame[];
  colors: {
    bg: string;
    primary: string;
    accent: string;
  };
}

export const SOCIAL_POSTS: PostData[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // POST #1: Target Kalkulačka
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 1,
    type: 'video',
    videoFormat: 'animated-calculator',
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

#podnikani #strategie #businesstips #matematika`,
    mediaDescription: 'VIDEO: Animace kalkulačky - zadání čísel → automatický výpočet',
    visualFrames: [
      {
        title: 'Frame 1: Hook',
        elements: [
          '❌ "Kolik máš sledujících?"',
          'Velký červený X',
          'Fade in'
        ],
        duration: '2s'
      },
      {
        title: 'Frame 2: Správná otázka',
        elements: [
          '✅ "Kolik zákazníků potřebuješ?"',
          'Zelený checkmark',
          'Slide in'
        ],
        duration: '2s'
      },
      {
        title: 'Frame 3: Kalkulačka',
        elements: [
          'Input: 50.000 Kč',
          'Input: 2.500 Kč',
          'Animovaný výpočet ÷',
          'Výsledek: 20 zákazníků'
        ],
        duration: '3s',
        animation: 'typing effect'
      },
      {
        title: 'Frame 4: Breakdown',
        elements: [
          '20 zákazníků/měsíc',
          '↓',
          '5/týden',
          '↓',
          '1/den',
          'Zeleně zvýraznit'
        ],
        duration: '3s'
      },
      {
        title: 'Frame 5: CTA',
        elements: [
          'TARGET KALKULAČKA',
          'www.podnikatelskactvrtka.cz',
          'Fade in'
        ],
        duration: '2s'
      }
    ],
    colors: {
      bg: 'from-purple-900 to-indigo-900',
      primary: '#8B5CF6',
      accent: '#10B981'
    }
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━���━━━
  // POST #2: Investice bez strategie
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 2,
    type: 'video',
    videoFormat: 'story-format',
    segment: 'beginner',
    pain: 'Investoval jsem, ale neprodává se',
    copy: `"Mám skvělý nápad!"

Pak přijde realita:

MĚSÍC 1:
💸 50.000 Kč
😰 3 prodeje

MĚSÍC 2:
💸 30.000 Kč
😓 5 prodejů

MĚSÍC 3:
💔 "Možná to vzdám..."

━━━━━━━━━━━━━━━━━━━━━━━

PROBLÉM? Chybí STRATEGIE.

✅ ŘEŠENÍ: Model podnikání
90 minut. Jasno.

www.podnikatelskactvrtka.cz

#podnikani #startup #businessmodel`,
    mediaDescription: 'VIDEO: Story formát - timeline 3 měsíců s emocemi',
    visualFrames: [
      {
        title: 'Frame 1: Optimismus',
        elements: [
          '😊 "Mám skvělý nápad!"',
          'Veselá barva',
          'Hvězdičky'
        ],
        duration: '2s'
      },
      {
        title: 'Frame 2: Realita - Měsíc 1',
        elements: [
          'MĚSÍC 1',
          '💸 -50.000 Kč (červeně)',
          '😰 3 prodeje',
          'Declining chart'
        ],
        duration: '2s'
      },
      {
        title: 'Frame 3: Měsíc 2',
        elements: [
          'MĚSÍC 2',
          '💸 -30.000 Kč',
          '😓 5 prodejů',
          'Stále red'
        ],
        duration: '2s'
      },
      {
        title: 'Frame 4: Měsíc 3',
        elements: [
          'MĚSÍC 3',
          '💔 "Možná to vzdám..."',
          'Smutný emoji',
          'Gray out'
        ],
        duration: '2s'
      },
      {
        title: 'Frame 5: Řešení',
        elements: [
          '✅ ŘEŠENÍ',
          'Model podnikání',
          '90 minut',
          'Zelená, optimistická'
        ],
        duration: '2s'
      },
      {
        title: 'Frame 6: CTA',
        elements: [
          'www.podnikatelskactvrtka.cz',
          'QR kód (optional)'
        ],
        duration: '2s'
      }
    ],
    colors: {
      bg: 'from-red-900 to-orange-900',
      primary: '#EF4444',
      accent: '#10B981'
    }
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // POST #3: Googling chaos
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 3,
    type: 'video',
    videoFormat: 'screen-recording',
    segment: 'struggling',
    pain: 'Googlit každý den, pořád nic',
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

#podnikani #produktivita #focus`,
    mediaDescription: 'VIDEO: Screen recording - chaos vs systém',
    visualFrames: [
      {
        title: 'Frame 1: Chaos',
        elements: [
          'Browser s 15 taby',
          'Scroll, scroll',
          'Rozmazané',
          'Chaos vibe'
        ],
        duration: '3s',
        animation: 'fast scrolling'
      },
      {
        title: 'Frame 2: Čas plyne',
        elements: [
          'Hodiny: 22:37 → 23:45',
          'Unavený emoji',
          'Fade mezi časy'
        ],
        duration: '2s'
      },
      {
        title: 'Frame 3: Výsledek = 0',
        elements: [
          '❓ Co jsi udělal?',
          'Velké 0',
          'Red/gray'
        ],
        duration: '2s'
      },
      {
        title: 'Frame 4: Řešení - Systém',
        elements: [
          'Business Model Canvas (1 list)',
          'Clean, organized',
          'Zelená'
        ],
        duration: '2s'
      },
      {
        title: 'Frame 5: 4 kroky',
        elements: [
          '1. KDO',
          '2. CO',
          '3. KDE',
          '4. PLÁN',
          'Animated list'
        ],
        duration: '3s'
      },
      {
        title: 'Frame 6: CTA',
        elements: [
          '90 minut. Hotovo.',
          'www.podnikatelskactvrtka.cz'
        ],
        duration: '2s'
      }
    ],
    colors: {
      bg: 'from-slate-900 to-blue-900',
      primary: '#3B82F6',
      accent: '#10B981'
    }
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // POST #4: Investice bez strategie (STATIC)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 4,
    type: 'static',
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

#podnikani #investice #startup`,
    mediaDescription: 'STATIC: Timeline infografika - 3 roky declining vs. 90 min strategie',
    visualFrames: [
      {
        title: 'Static Design',
        elements: [
          'Vlevo: Timeline Rok 1→2→3',
          'Červený declining chart',
          'Smutné emoji',
          'vs.',
          'Vpravo: "90 minut PŘED"',
          'Business Model Canvas',
          'Zelený ascending chart',
          '✅ checkmark'
        ]
      }
    ],
    colors: {
      bg: 'from-red-900 to-slate-900',
      primary: '#EF4444',
      accent: '#10B981'
    }
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // POST #5: Prodělávám
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 5,
    type: 'video',
    videoFormat: 'story-format',
    segment: 'struggling',
    pain: 'Prodělávám, nevím co dělám špatně',
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

#podnikani #reality #strategie`,
    mediaDescription: 'VIDEO: Story - čísla tržeb/nákladů animovaně',
    visualFrames: [
      {
        title: 'Frame 1: Otázka',
        elements: [
          '💬 "Vydělal jsi něco?"',
          'Speech bubble'
        ],
        duration: '2s'
      },
      {
        title: 'Frame 2: Lež',
        elements: [
          '😅 "Jo, běží to..."',
          'Nervous emoji'
        ],
        duration: '2s'
      },
      {
        title: 'Frame 3: Realita - Tržby',
        elements: [
          '📊 Tržby: 12.000 Kč',
          'Animované číslo',
          'Malý sloupeček'
        ],
        duration: '2s',
        animation: 'counting up'
      },
      {
        title: 'Frame 4: Náklady',
        elements: [
          '💸 Náklady: 35.000 Kč',
          'Červený velký sloupeček',
          'Převyšuje tržby'
        ],
        duration: '2s'
      },
      {
        title: 'Frame 5: Ztráta',
        elements: [
          '💔 Zisk: -23.000 Kč',
          'Velké minus',
          'Červeně'
        ],
        duration: '2s'
      },
      {
        title: 'Frame 6: Empatie',
        elements: [
          '❌ Nejsi blbej',
          'Jen ti chybí SYSTÉM',
          'Zelená'
        ],
        duration: '2s'
      },
      {
        title: 'Frame 7: CTA',
        elements: [
          'Model podnikání',
          '90 minut',
          'www.podnikatelskactvrtka.cz'
        ],
        duration: '2s'
      }
    ],
    colors: {
      bg: 'from-red-900 to-pink-900',
      primary: '#EC4899',
      accent: '#10B981'
    }
  }

];

// ═══════════════════════════════════════════════════════════
// 🎨 VISUAL MOCKUP KOMPONENTY
// ═══════════════════════════════════════════════════════════

interface VisualPreviewProps {
  post: PostData;
}

function VisualPreview({ post }: VisualPreviewProps) {
  // Renderuj SKUTEČNÝ vizuální post připravený k screenshotu
  return <ReadyToGoPost post={post} />;
}

// ═══════════════════════════════════════════════════════════
// 📱 READY-TO-GO POST GRAPHICS
// ═══════════════════════════════════════════════════════════

function ReadyToGoPost({ post }: { post: PostData }) {
  // Rendering podle ID postu - každý má vlastní design
  
  if (post.id === 1) {
    // POST #1: Target Kalkulačka - Animovaná kalkulačka
    return (
      <div className="space-y-4">
        <div className="text-sm text-slate-300 mb-2">
          📱 Instagram/Facebook Post (1080×1080) - Video Frames:
        </div>
        
        {/* Frame 1 */}
        <motion.div
          className="relative w-full aspect-square bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 rounded-2xl overflow-hidden"
          style={{ maxWidth: '600px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <div className="text-8xl mb-6">❌</div>
            <div className="text-3xl mb-4">"Kolik máš sledujících?"</div>
            <div className="text-xl text-red-400 font-bold">ŠPATNÁ otázka</div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Frame 1/5 - Hook (2s)
          </div>
        </motion.div>

        {/* Frame 2 */}
        <motion.div
          className="relative w-full aspect-square bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 rounded-2xl overflow-hidden"
          style={{ maxWidth: '600px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <div className="text-8xl mb-6">✅</div>
            <div className="text-2xl mb-4">Správná otázka:</div>
            <div className="text-3xl text-green-300 font-bold leading-tight">
              "Kolik zákazníků<br/>potřebuješ k 50.000 Kč?"
            </div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Frame 2/5 - Správná otázka (2s)
          </div>
        </motion.div>

        {/* Frame 3 - Kalkulačka */}
        <motion.div
          className="relative w-full aspect-square bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 rounded-2xl overflow-hidden"
          style={{ maxWidth: '600px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
            <div className="w-full max-w-md space-y-6">
              <div className="text-2xl mb-8 text-center">TARGET KALKULAČKA</div>
              
              <div className="bg-white/10 rounded-xl p-6 space-y-4">
                <div>
                  <div className="text-sm text-slate-300 mb-2">Tvůj cíl:</div>
                  <div className="text-4xl font-bold text-green-400">50.000 Kč</div>
                </div>
                
                <div className="text-center text-3xl">÷</div>
                
                <div>
                  <div className="text-sm text-slate-300 mb-2">Cena produktu:</div>
                  <div className="text-4xl font-bold text-blue-400">2.500 Kč</div>
                </div>
                
                <div className="border-t border-white/20 pt-4">
                  <div className="text-sm text-slate-300 mb-2">=</div>
                  <div className="text-5xl font-bold text-yellow-400">20</div>
                  <div className="text-lg text-slate-300">zákazníků/měsíc</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Frame 3/5 - Kalkulačka (3s)
          </div>
        </motion.div>

        {/* Frame 4 - Breakdown */}
        <motion.div
          className="relative w-full aspect-square bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 rounded-2xl overflow-hidden"
          style={{ maxWidth: '600px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
            <div className="text-3xl mb-8">To je jen:</div>
            
            <div className="space-y-6 text-center">
              <div>
                <div className="text-6xl font-bold text-green-300">20</div>
                <div className="text-xl text-slate-300">zákazníků/měsíc</div>
              </div>
              
              <div className="text-4xl">↓</div>
              
              <div>
                <div className="text-6xl font-bold text-green-300">5</div>
                <div className="text-xl text-slate-300">zákazníků/týden</div>
              </div>
              
              <div className="text-4xl">↓</div>
              
              <div>
                <div className="text-7xl font-bold text-yellow-400">1</div>
                <div className="text-2xl text-slate-300">zákazník/DEN</div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Frame 4/5 - Breakdown (3s)
          </div>
        </motion.div>

        {/* Frame 5 - CTA */}
        <motion.div
          className="relative w-full aspect-square bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 rounded-2xl overflow-hidden"
          style={{ maxWidth: '600px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <div className="text-4xl mb-8">
              TARGET KALKULAČKA
            </div>
            <div className="text-2xl text-slate-300 mb-12">
              Žádné doufání.<br/>Jen matematika.
            </div>
            <div className="text-3xl font-bold text-yellow-400 bg-white/10 px-8 py-4 rounded-xl">
              www.podnikatelskactvrtka.cz
            </div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Frame 5/5 - CTA (2s)
          </div>
        </motion.div>

        {/* Instrukce */}
        <div className="mt-6 p-4 bg-green-600/20 border border-green-400/30 rounded-lg">
          <div className="flex items-start gap-2">
            <Camera className="text-green-400 mt-1 flex-shrink-0" size={16} />
            <div className="text-sm">
              <strong className="text-green-300">Jak natočit:</strong>
              <ol className="text-slate-300 mt-2 space-y-1 list-decimal list-inside">
                <li>Screenshotu každý frame (5 obrázků)</li>
                <li>Nahraj do CapCut/InShot</li>
                <li>Každý frame 2-3 sekundy</li>
                <li>Přidej transitions mezi framy</li>
                <li>Export jako MP4</li>
                <li>Upload na FB/IG s textem z "Copy Preview"</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (post.id === 2) {
    // POST #2: Investice bez strategie - Story timeline
    return (
      <div className="space-y-4">
        <div className="text-sm text-slate-300 mb-2">
          📱 Instagram Story / FB Post - Video Frames:
        </div>

        {/* Frame 1 - Optimismus */}
        <motion.div
          className="relative w-full aspect-[9/16] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl overflow-hidden"
          style={{ maxWidth: '400px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-8xl mb-6">😊</div>
            <div className="text-4xl font-bold mb-4">"Mám skvělý nápad!"</div>
            <div className="text-6xl">✨</div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Frame 1/6 - Optimismus (2s)
          </div>
        </motion.div>

        {/* Frame 2 - Měsíc 1 */}
        <motion.div
          className="relative w-full aspect-[9/16] bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl overflow-hidden"
          style={{ maxWidth: '400px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-5xl font-bold mb-8">MĚSÍC 1</div>
            <div className="space-y-4">
              <div className="text-2xl">💸</div>
              <div className="text-4xl text-red-300 font-bold">-50.000 Kč</div>
              <div className="text-6xl mt-6">😰</div>
              <div className="text-3xl">3 prodeje</div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Frame 2/6 - Realita začíná (2s)
          </div>
        </motion.div>

        {/* Frame 3 - Měsíc 2 */}
        <motion.div
          className="relative w-full aspect-[9/16] bg-gradient-to-br from-red-700 to-red-900 rounded-2xl overflow-hidden"
          style={{ maxWidth: '400px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-5xl font-bold mb-8">MĚSÍC 2</div>
            <div className="space-y-4">
              <div className="text-2xl">💸</div>
              <div className="text-4xl text-red-300 font-bold">-30.000 Kč</div>
              <div className="text-6xl mt-6">😓</div>
              <div className="text-3xl">5 prodejů</div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Frame 3/6 - Ještě horší (2s)
          </div>
        </motion.div>

        {/* Frame 4 - Měsíc 3 */}
        <motion.div
          className="relative w-full aspect-[9/16] bg-gradient-to-br from-gray-800 to-black rounded-2xl overflow-hidden"
          style={{ maxWidth: '400px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-5xl font-bold mb-8 text-gray-400">MĚSÍC 3</div>
            <div className="text-6xl mb-8">💔</div>
            <div className="text-3xl text-gray-300 leading-tight">
              "Možná to vzdám..."
            </div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Frame 4/6 - Vzdávám to (2s)
          </div>
        </motion.div>

        {/* Frame 5 - Řešení */}
        <motion.div
          className="relative w-full aspect-[9/16] bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl overflow-hidden"
          style={{ maxWidth: '400px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-7xl mb-8">✅</div>
            <div className="text-4xl font-bold mb-6">ŘEŠENÍ</div>
            <div className="text-3xl mb-4">Model podnikání</div>
            <div className="text-5xl font-bold text-yellow-400">90 minut</div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Frame 5/6 - Řešení (2s)
          </div>
        </motion.div>

        {/* Frame 6 - CTA */}
        <motion.div
          className="relative w-full aspect-[9/16] bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl overflow-hidden"
          style={{ maxWidth: '400px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-4xl font-bold mb-12 text-yellow-400">
              Podnikatelská Čtvrtka
            </div>
            <div className="text-5xl font-bold bg-white/10 px-6 py-4 rounded-xl">
              www.podnikatelskactvrtka.cz
            </div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Frame 6/6 - CTA (2s)
          </div>
        </motion.div>

        {/* Instrukce */}
        <div className="mt-6 p-4 bg-purple-600/20 border border-purple-400/30 rounded-lg">
          <div className="flex items-start gap-2">
            <Camera className="text-purple-400 mt-1 flex-shrink-0" size={16} />
            <div className="text-sm">
              <strong className="text-purple-300">Jak natočit:</strong>
              <p className="text-slate-300 mt-2">
                Ideální pro IG Stories (9:16). Screenshotu všech 6 frames, nahraj do CapCut, 
                každý 2s, přidej fade transitions. Celkem ~12s video.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (post.id === 3) {
    // POST #3: Googling chaos
    return (
      <div className="space-y-4">
        <div className="text-sm text-slate-300 mb-2">
          📱 Facebook/Instagram Post (1080×1080):
        </div>

        {/* Main Visual */}
        <motion.div
          className="relative w-full aspect-square bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-2xl overflow-hidden"
          style={{ maxWidth: '600px' }}
        >
          <div className="absolute inset-0 flex flex-col p-8">
            {/* Top - Hodiny */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-2">🕙</div>
              <div className="text-4xl font-bold">22:37</div>
            </div>

            {/* Middle - Browser tabs (chaos) */}
            <div className="flex-1 space-y-3">
              <div className="bg-red-600/30 border border-red-400/50 rounded-lg p-3 text-sm">
                "Jak udělat FB reklamu"
              </div>
              <div className="bg-red-600/30 border border-red-400/50 rounded-lg p-3 text-sm">
                "Jak najít zákazníky"
              </div>
              <div className="bg-red-600/30 border border-red-400/50 rounded-lg p-3 text-sm">
                "Best marketing 2025"
              </div>
              <div className="bg-red-600/30 border border-red-400/50 rounded-lg p-3 text-sm opacity-70">
                ...a dalších 12 tabů
              </div>
            </div>

            {/* Bottom - Výsledek */}
            <div className="text-center mt-8">
              <div className="text-5xl mb-4">23:45</div>
              <div className="text-3xl mb-2">❓</div>
              <div className="text-2xl text-red-400 font-bold">
                Co jsi udělal?
              </div>
              <div className="text-6xl mt-4 text-gray-500">0</div>
            </div>
          </div>
        </motion.div>

        {/* Řešení frame */}
        <motion.div
          className="relative w-full aspect-square bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 rounded-2xl overflow-hidden"
          style={{ maxWidth: '600px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <div className="text-3xl mb-8">Existuje systém:</div>
            
            <div className="space-y-4 text-left max-w-sm">
              <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-400">1.</div>
                <div className="text-xl">KDO je zákazník</div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-400">2.</div>
                <div className="text-xl">CO mu nabízíš</div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-400">3.</div>
                <div className="text-xl">KDE ho najdeš</div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-400">4.</div>
                <div className="text-xl">PLÁN na zítra</div>
              </div>
            </div>

            <div className="mt-8 text-4xl font-bold text-yellow-400">
              90 minut. Hotovo.
            </div>
          </div>
        </motion.div>

        {/* Instrukce */}
        <div className="mt-6 p-4 bg-blue-600/20 border border-blue-400/30 rounded-lg">
          <div className="flex items-start gap-2">
            <ImageIcon className="text-blue-400 mt-1 flex-shrink-0" size={16} />
            <div className="text-sm">
              <strong className="text-blue-300">Jak použít:</strong>
              <p className="text-slate-300 mt-2">
                Screenshotu oba frames → carousel post na FB/IG (swipe →). 
                Nebo jen první frame jako static post.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (post.id === 4) {
    // POST #4: Timeline infografika (STATIC)
    return (
      <div className="space-y-4">
        <div className="text-sm text-slate-300 mb-2">
          📱 Instagram/Facebook Post (1080×1350) - Static:
        </div>

        <motion.div
          className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          style={{ maxWidth: '600px', aspectRatio: '4/5' }}
        >
          <div className="absolute inset-0 flex p-8">
            <div className="flex-1 flex flex-col justify-between">
              {/* Left side - BEZ STRATEGIE */}
              <div className="text-center">
                <div className="text-2xl mb-6 text-red-400 font-bold">BEZ STRATEGIE</div>
                
                <div className="space-y-6">
                  <div className="bg-red-900/30 border-2 border-red-600 rounded-lg p-4">
                    <div className="text-4xl font-bold mb-2">Rok 1</div>
                    <div className="text-lg text-gray-300">"Ještě to chce čas..."</div>
                    <div className="text-6xl mt-4">📉</div>
                  </div>

                  <div className="text-5xl text-red-500">↓</div>

                  <div className="bg-red-900/40 border-2 border-red-700 rounded-lg p-4">
                    <div className="text-4xl font-bold mb-2">Rok 2</div>
                    <div className="text-lg text-gray-300">"Asi změním..."</div>
                    <div className="text-6xl mt-4">📉</div>
                  </div>

                  <div className="text-5xl text-red-500">↓</div>

                  <div className="bg-red-900/50 border-2 border-red-800 rounded-lg p-4">
                    <div className="text-4xl font-bold mb-2">Rok 3</div>
                    <div className="text-lg text-gray-300">"Možná to vzdám..."</div>
                    <div className="text-6xl mt-4">💔</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical divider */}
            <div className="w-px bg-white/20 mx-6" />

            {/* Right side - SE STRATEGIÍ */}
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="text-2xl mb-6 text-green-400 font-bold">SE STRATEGIÍ</div>
              
              <div className="bg-green-900/30 border-2 border-green-500 rounded-xl p-6 mb-6">
                <div className="text-5xl mb-4">✅</div>
                <div className="text-6xl font-bold mb-4 text-yellow-400">90 min</div>
                <div className="text-xl text-gray-300">PŘED investicí</div>
              </div>

              <div className="text-5xl mb-6">↓</div>

              <div className="text-3xl mb-4">Model podnikání</div>
              <div className="text-lg text-gray-300 mb-6">Zjistíš JESTLI<br/>to má šanci</div>

              <div className="text-7xl">📈</div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              www.podnikatelskactvrtka.cz
            </div>
          </div>
        </motion.div>

        {/* Instrukce */}
        <div className="mt-6 p-4 bg-green-600/20 border border-green-400/30 rounded-lg">
          <div className="flex items-start gap-2">
            <ImageIcon className="text-green-400 mt-1 flex-shrink-0" size={16} />
            <div className="text-sm">
              <strong className="text-green-300">Jak použít:</strong>
              <p className="text-slate-300 mt-2">
                Screenshot tohoto → upload na FB/IG jako static post. 
                Nebo vytvoř v Canva podle tohoto layoutu.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (post.id === 5) {
    // POST #5: Prodělávám - čísla
    return (
      <div className="space-y-4">
        <div className="text-sm text-slate-300 mb-2">
          📱 Instagram Story / FB Post - Video Frames:
        </div>

        {/* Frame 1 - Otázka */}
        <motion.div
          className="relative w-full aspect-[9/16] bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl overflow-hidden"
          style={{ maxWidth: '400px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-6xl mb-8">💬</div>
            <div className="text-3xl leading-tight">
              "Tak co, vydělal jsi už něco?"
            </div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Frame 1/7 - Otázka (2s)
          </div>
        </motion.div>

        {/* Frame 2 - Lež */}
        <motion.div
          className="relative w-full aspect-[9/16] bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl overflow-hidden"
          style={{ maxWidth: '400px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-8xl mb-8">😅</div>
            <div className="text-4xl leading-tight">
              "Jo jo, běží to..."
            </div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Frame 2/7 - Lež (2s)
          </div>
        </motion.div>

        {/* Frame 3 - Realita header */}
        <motion.div
          className="relative w-full aspect-[9/16] bg-gradient-to-br from-red-900 to-black rounded-2xl overflow-hidden"
          style={{ maxWidth: '400px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="text-5xl font-bold mb-12">REALITA:</div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Frame 3/7 - Realita (1s)
          </div>
        </motion.div>

        {/* Frame 4 - Tržby */}
        <motion.div
          className="relative w-full aspect-[9/16] bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl overflow-hidden"
          style={{ maxWidth: '400px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="text-4xl mb-6">📊 Tržby</div>
            <div className="text-8xl font-bold text-green-400">12.000</div>
            <div className="text-3xl mt-4">Kč</div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Frame 4/7 - Tržby (2s)
          </div>
        </motion.div>

        {/* Frame 5 - Náklady */}
        <motion.div
          className="relative w-full aspect-[9/16] bg-gradient-to-br from-red-700 to-red-900 rounded-2xl overflow-hidden"
          style={{ maxWidth: '400px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="text-4xl mb-6">💸 Náklady</div>
            <div className="text-8xl font-bold text-red-400">35.000</div>
            <div className="text-3xl mt-4">Kč</div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Frame 5/7 - Náklady (2s)
          </div>
        </motion.div>

        {/* Frame 6 - Ztráta */}
        <motion.div
          className="relative w-full aspect-[9/16] bg-gradient-to-br from-black to-red-950 rounded-2xl overflow-hidden"
          style={{ maxWidth: '400px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="text-8xl mb-8">💔</div>
            <div className="text-4xl mb-6">Zisk:</div>
            <div className="text-9xl font-bold text-red-500">-23k</div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Frame 6/7 - Ztráta (2s)
          </div>
        </motion.div>

        {/* Frame 7 - Řešení */}
        <motion.div
          className="relative w-full aspect-[9/16] bg-gradient-to-br from-green-700 to-emerald-800 rounded-2xl overflow-hidden"
          style={{ maxWidth: '400px' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-5xl mb-8">❌</div>
            <div className="text-3xl mb-6">Nejsi blbej.</div>
            <div className="text-4xl font-bold text-yellow-400 mb-12">
              Jen ti chybí SYSTÉM
            </div>
            <div className="text-2xl">
              Model podnikání
            </div>
            <div className="text-5xl mt-6 font-bold">90 minut</div>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-black/50 px-2 py-1 rounded">
            Frame 7/7 - Řešení (3s)
          </div>
        </motion.div>

        {/* Instrukce */}
        <div className="mt-6 p-4 bg-pink-600/20 border border-pink-400/30 rounded-lg">
          <div className="flex items-start gap-2">
            <Camera className="text-pink-400 mt-1 flex-shrink-0" size={16} />
            <div className="text-sm">
              <strong className="text-pink-300">Jak natočit:</strong>
              <p className="text-slate-300 mt-2">
                IG Story formát (9:16). Screenshot všech 7 frames, CapCut, 
                frame 3 jen 1s, ostatní 2s. Přidej dramatic music. ~15s celkem.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback pro posty které ještě nejsou hotové
  return (
    <div className="text-center p-12 bg-white/5 rounded-xl">
      <div className="text-4xl mb-4">🚧</div>
      <div className="text-xl mb-2">Post #{post.id} - Coming Soon</div>
      <div className="text-sm text-slate-400">
        Vizuální mockup se připravuje...
      </div>
    </div>
  );
}



// ═══════════════════════════════════════════════════════════
// 📱 MAIN COMPONENT
// ═══════════════════════════════════════════════════════════

export default function OrganicSocialPostsWithVisuals() {
  const [selectedPost, setSelectedPost] = useState(1);
  const [copiedPost, setCopiedPost] = useState<number | null>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  const currentPost = SOCIAL_POSTS.find(p => p.id === selectedPost) || SOCIAL_POSTS[0];

  const copyToClipboard = (text: string, postId: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPost(postId);
    setTimeout(() => setCopiedPost(null), 2000);
  };

  const downloadSchedule = () => {
    const schedule = SOCIAL_POSTS.map((post, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POST #${post.id} - ${date.toLocaleDateString('cs-CZ')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TYPE: ${post.type.toUpperCase()}
${post.videoFormat ? `VIDEO FORMAT: ${post.videoFormat}` : ''}
SEGMENT: ${post.segment}
PAIN: ${post.pain}

VISUAL FRAMES:
${post.visualFrames.map((f, i) => `
  Frame ${i + 1}: ${f.title}
  ${f.elements.map(e => `  - ${e}`).join('\n')}
  ${f.duration ? `Duration: ${f.duration}` : ''}
  ${f.animation ? `Animation: ${f.animation}` : ''}
`).join('\n')}

COPY:
${post.copy}

`;
    }).join('\n\n');

    const blob = new Blob([schedule], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '30-posts-with-visuals.txt';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl mb-2">
              🚀 30 Postů S Vizuálními Mockupy
            </h1>
            <p className="text-slate-300">
              Copy + Grafika + Storyboard = Ready k natočení!
            </p>
          </div>
          <button
            onClick={downloadSchedule}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <Download size={20} />
            Export All
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Video size={20} className="text-purple-400" />
              <span className="text-sm text-slate-300">Video Posts</span>
            </div>
            <div className="text-2xl">
              {SOCIAL_POSTS.filter(p => p.type === 'video').length}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <ImageIcon size={20} className="text-blue-400" />
              <span className="text-sm text-slate-300">Static Posts</span>
            </div>
            <div className="text-2xl">
              {SOCIAL_POSTS.filter(p => p.type === 'static').length}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Camera size={20} className="text-green-400" />
              <span className="text-sm text-slate-300">Visual Frames</span>
            </div>
            <div className="text-2xl">
              {SOCIAL_POSTS.reduce((acc, p) => acc + p.visualFrames.length, 0)}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={20} className="text-orange-400" />
              <span className="text-sm text-slate-300">Total Posts</span>
            </div>
            <div className="text-2xl">{SOCIAL_POSTS.length}</div>
          </div>
        </div>
      </div>

      {/* Post Selector */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Vyber Post:</h2>
            <div className="text-sm text-slate-300">
              Post {selectedPost} / 5 (Demo)
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((num) => {
              const post = SOCIAL_POSTS.find(p => p.id === num);
              if (!post) return null;
              return (
                <button
                  key={post.id}
                  onClick={() => setSelectedPost(post.id)}
                  className={`
                    aspect-square rounded-lg transition-all flex flex-col items-center justify-center
                    ${selectedPost === post.id
                      ? 'bg-purple-600 scale-110 shadow-lg'
                      : 'bg-white/20 hover:bg-white/30'
                    }
                  `}
                >
                  <div className="text-lg">{post.id}</div>
                  {post.type === 'video' ? (
                    <Video size={12} className="mt-1" />
                  ) : (
                    <ImageIcon size={12} className="mt-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current Post */}
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Visual Mockup */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">Visual Mockup #{currentPost.id}</h2>
              <div className="flex gap-2">
                {currentPost.type === 'video' ? (
                  <div className="flex items-center gap-2 px-3 py-1 bg-purple-600/50 rounded-full text-sm">
                    <Video size={16} />
                    Video
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-600/50 rounded-full text-sm">
                    <ImageIcon size={16} />
                    Static
                  </div>
                )}
              </div>
            </div>

            <div ref={visualRef}>
              <VisualPreview post={currentPost} />
            </div>

            {/* Metadata */}
            <div className="mt-6 space-y-3">
              <div>
                <div className="text-sm text-slate-400 mb-1">Segment:</div>
                <div className="px-3 py-1 bg-green-600/30 rounded inline-block">
                  {currentPost.segment}
                </div>
              </div>

              <div>
                <div className="text-sm text-slate-400 mb-1">Pain Point:</div>
                <div className="text-orange-300">{currentPost.pain}</div>
              </div>

              <div>
                <div className="text-sm text-slate-400 mb-1">Media Description:</div>
                <div className="text-sm text-slate-200">{currentPost.mediaDescription}</div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedPost(Math.max(1, selectedPost - 1))}
                disabled={selectedPost === 1}
                className="flex-1 px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                ← Předchozí
              </button>
              <button
                onClick={() => setSelectedPost(Math.min(5, selectedPost + 1))}
                disabled={selectedPost === 5}
                className="flex-1 px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                Další →
              </button>
            </div>
          </div>

          {/* Right: Copy Preview */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
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

            <div className="bg-black/30 rounded-lg p-6 max-h-[600px] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {currentPost.copy}
              </pre>
            </div>

            {/* Workflow */}
            <div className="mt-6 p-4 bg-green-600/20 border border-green-400/30 rounded-lg">
              <div className="text-sm space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 size={16} className="text-green-400" />
                  <strong className="text-green-300">Workflow:</strong>
                </div>
                <div className="space-y-1 text-slate-300">
                  <div>1. Podívej se na Visual Mockup vlevo</div>
                  <div>2. Natoc video podle Storyboard / vytvoř grafiku</div>
                  <div>3. Zkopíruj Copy text výše</div>
                  <div>4. Publikuj na FB/IG s tímto textem</div>
                  <div>5. Repeat pro dalších 29 postů! 🚀</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

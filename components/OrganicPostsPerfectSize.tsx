import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Copy, Check, Video, Image as ImageIcon,
  ChevronLeft, ChevronRight, Monitor
} from 'lucide-react';

/**
 * 🎯 ORGANIC POSTS - PERFECT SIZE
 * 
 * FIXED formát který:
 * - Se VEJDE na jednu obrazovku (100vh max)
 * - FB to rozchroustá (1080×1080 / 1080×1350)
 * - Screenshot celé stránky = ready to upload
 */

interface PostData {
  id: number;
  type: 'static' | 'animated';
  format: '1:1' | '4:5'; // Square nebo Portrait
  title: string;
  segment: string;
  pain: string;
  copy: string;
}

const POSTS: PostData[] = [
  {
    id: 0,
    type: 'static',
    format: '1:1',
    title: 'Kdo je tvůj zákazník?',
    segment: 'universal',
    pain: 'Nevím komu prodávám',
    copy: `Proč většina začínajících podnikatelů skončí ten samý rok?

━━━━━━━━━━━━━━━━━━━━━━━

❌ NEVÍ KDO je jejich zákazník.
❌ NEVÍ KDE ho najít.
❌ NEVÍ CO mu nabídnout.

━━━━━━━━━━━━━━━━━━━━━━━

Narozdíl od guru, co jen mluví...

✅ VEDEME TĚ KROK ZA KROKEM

Vyplníš si to SAM.
Pro TVÉ podnikání.
S DATY, ne domněnkami.

━━━━━━━━━━━━━━━━━━━━━━━

Ať máš kavárnu, e-shop nebo služby:

➡️ FIT VALIDÁTOR tě provede systematicky
➡️ Zjistíš PŘESNĚ komu prodáváš
➡️ Ověříš si to PŘED investicí

━━━━━━━━━━━━━━━━━━━━━━━

Žádné guessing.
Žádné bláboly.
REÁLNÁ VALIDACE.

👉 www.podnikatelskactvrtka.cz

#podnikani #zakaznik #validace #data`
  },
  {
    id: 1,
    type: 'animated',
    format: '1:1',
    title: 'Kalkulačka cíle',
    segment: 'universal',
    pain: 'Nevím kolik zákazníků potřebuju',
    copy: `95 % podnikatelů dělá byznys "od oka".

❌ Doufají, že to vyjde.
❌ Nemají přesný cíl.
❌ Neví KOLIK zákazníků opravdu potřebují.

━━━━━━━━━━━━━━━━━━━━━━━

✅ To se dá spočítat.

KALKULAČKA CÍLE v Podnikatelské Čtvrtce:

→ Zadáš měsíční cíl
→ Zadáš průměrnou cenu produktu
→ Dostaneš PŘESNÉ ČÍSLO zákazníků/den

━━━━━━━━━━━━━━━━━━━━━━━

Příklad:

Chci 50.000 Kč/měsíc
Produkt za 2.500 Kč

= Potřebuji 20 zákazníků/měsíc
= 1 zákazník DENNĚ

━━━━━━━━━━━━━━━━━━━━━━━

Žádné doufání.
Jen data a matematika.

To je Model podnikání.

👉 www.podnikatelskactvrtka.cz

#podnikani #strategie #data #matematika`
  },
  {
    id: 2,
    type: 'static',
    format: '1:1',
    title: 'Plán vs Chaos',
    segment: 'beginner',
    pain: 'Neví co dělat',
    copy: `🤔 "Co mám dělat dnes?"

━━━━━━━━━━━━━━━━━━━━━━━

❌ BEZ PLÁNU:

Ráno: FB scroll, hledám inspiraci
Odpoledne: Googlím "jak získat zákazníky"
Večer: Zavírám 15 záložek, nic neudělal

━━━━━━━━━━━━━━━━━━━━━━━

✅ S PLÁNEM:

Ráno: Vím KDO je zákazník
Odpoledne: Vím KDE ho najít
Večer: Akce = splněno ✓

━━━━━━━━━━━━━━━━━━━━━━━

Rozdíl?

MODEL PODNIKÁNÍ = 90 minut.

→ Jasný zákazník
→ Jasná nabídka  
→ Jasný akční plán

Žádný chaos. Jen execution.

www.podnikatelskactvrtka.cz

#podnikani #planovani #produktivita #strategie`
  },
  {
    id: 3,
    type: 'animated',
    format: '1:1',
    title: 'Pravda o číslech',
    segment: 'struggling',
    pain: 'Prodělávám, nevím proč',
    copy: `💬 "Jak ti jde byznys?"

━━━━━━━━━━━━━━━━━━━━━━━

TY: 😅 "Jo, dobře, pracuju na tom..."

━━━━━━━━━━━━━━━━━━━━━━━

REALITA:

📊 Tržby: 12.000 Kč
💸 Náklady: 35.000 Kč
💔 Výsledek: -23.000 Kč

━━━━━━━━━━━━━━━━━━━━━━━

Není to o tvém talentu.
Není to o tvé práci.

Je to o SYSTÉMU.

━━━━━━━━━━━━━━━━━━━━━━━

Model podnikání ti dá:

✅ Jasného zákazníka
✅ Jasnou nabídku  
✅ Jasný plán

90 minut.
Místo chaosu → jasno.

www.podnikatelskactvrtka.cz

#podnikani #pravda #strategie #system`
  },
  {
    id: 4,
    type: 'static',
    format: '1:1',
    title: 'Velikost trhu',
    segment: 'beginner',
    pain: 'Nevím jestli je dost lidí',
    copy: `💬 "Je v Česku vůbec dost zákazníků pro mě?"

━━━━━━━━━━━━━━━━━━━━━━━

Většina podnikatelů TIPUJE.

"Asi jo..."
"Snad ano..."
"Doufám..."

━━━━━━━━━━━━━━━━━━━━━━━

✅ NÁSTROJ VELIKOST TRHU:

Marketing manažeři: 12.000
Freelanceři: 3.500
E-shop majitelé: 8.500
Podnikatelé: 15.000

CELKEM = 39.000 potenciálních zákazníků

━━━━━━━━━━━━━━━━━━━━━━━

Potřebuji k 50.000 Kč/měsíc: 20 zákazníků

20 z 39.000 = 0,05 % trhu

= Realistické? ANO ✓

━━━━━━━━━━━━━━━━━━━━━━━

Žádné tipování.
Data z Model podnikání.

www.podnikatelskactvrtka.cz

#podnikani #data #trh #strategie`
  },
  {
    id: 5,
    type: 'animated',
    format: '1:1',
    title: 'Záložky',
    segment: 'struggling',
    pain: 'Googlit každý den, nic',
    copy: `Pondělí večer. 22:37.

15 otevřených ZÁLOŽEK:

→ "Jak udělat FB reklamu"
→ "Jak najít zákazníky"  
→ "Best marketing 2025"
→ ...a dalších 12

━━━━━━━━━━━━━━━━━━━━━━━

23:45. Zavíráš notebook.

❓ Co jsi udělal? NIC.

━━━━━━━━━━━━━━━━━━━━━━━

Existuje systém:

1️⃣ KDO je zákazník
2️⃣ CO mu nabízíš
3️⃣ KDE ho najdeš  
4️⃣ AKČNÍ PLÁN na zítra

━━━━━━━━━━━━━━━━━━━━━━━

Model podnikání.
90 minut. Hotovo.

Žádné záložky. Jen akce.

www.podnikatelskactvrtka.cz

#podnikani #produktivita #focus #akce`
  },
  {
    id: 6,
    type: 'static',
    format: '1:1',
    title: '90 minut vs 20 hodin kurzů',
    segment: 'universal',
    pain: 'Dlouhé kurzy, nic konkrétního',
    copy: `Pondělí večer. 21:37.

Pouštíš si online kurz o podnikání.

━━━━━━━━━━━━━━━━━━━━━━━

3 HODINY POZDĚJI:

📹 Video #47: "Mindset úspěchu"
📹 Video #83: "Tipy na Instagram"
📹 Video #124: "Jak na prodej"

━━━━━━━━━━━━━━━━━━━━━━━

❓ Co máš HOTOVÉHO?

...NIC.

━━━━━━━━━━━━━━━━━━━━━━━

Zítra musíš:
→ Hledat v minutách kde co je
→ Vracet se k teorii
→ Stejně nevíš co dělat

━━━━━━━━━━━━━━━━━━━━━━━

❌ PROBLÉM VĚTŠINY KURZŮ:

20+ hodin videa
= 90 % teorie
= 10 % použitelného

━━━━━━━━━━━━━━━━━━━━━━━

✅ PODNIKATELSKÁ ČTVRTKA:

JEN to podstatné.
3 nástroje. 90 minut.
VYPLNĚNÝ model pro tvůj byznys.

━━━━━━━━━━━━━━━━━━━━━━━

Za ty roky jsme dali dokupy jen ty nejdůležitější nástroje.

Šetříme ti čas.
Dáváme ti SYSTÉM.

Žádné teorie.
Jen AKCE.

👉 www.podnikatelskactvrtka.cz

#podnikani #efektivita #system #usporacasu`
  },
  {
    id: 7,
    type: 'animated',
    format: '1:1',
    title: 'ŽIVÝ model - rozvíjíš podnikání',
    segment: 'universal',
    pain: 'Chybí ongoing rozvoj',
    copy: `😰 "Kde začít? Co dělat? Jak na marketing?"

Znáš to, že?

━━━━━━━━━━━━━━━━━━━━━━━

Máme řešení:

✅ NEVYPOUŠTÍŠ video.
✅ VYPLŇUJEŠ model.

90 minut → 9 bloků strategie:

→ Hodnotová nabídka
→ Segmenty zákazníků
→ Partneři, aktivity, zdroje
→ Vztahy, kanály, příjmy, náklady

━━━━━━━━━━━━━━━━━━━━━━━

🔄 A TO NENÍ KONEC.

Model je ŽIVÝ.

━━━━━━━━━━━━━━━━━━━━━━━

Co to znamená?

→ UPRAVUJEŠ ho každý měsíc
→ ZLEPŠUJEŠ co nefunguje
→ PŘIDÁVÁŠ nové nápady
→ ROZVÍJÍŠ svou strategii

━━━━━━━━━━━━━━━━━━━━━━━

Po kurzu NEZAHODÍŠ poznámky.

Máš MODEL který s tebou ROSTE.

━━━━━━━━━━━━━━━━━━━━━━━

🚀 Nutíme tě:

Kreativně přemýšlet.
Systematicky zlepšovat.
Pořád rozvíjet byznys.

━━━━━━━━━━━━━━━━━━━━━━━

Není to kurz.
Je to STRATEGIE se kterou žiješ.

👉 www.podnikatelskactvrtka.cz

#podnikani #strategie #rozvoj #zivysystem`
  }
];

// ═══════════════════════════════════════════════════════════
// 🎨 POST COMPONENTS - PERFECT SIZE
// Container je vždycky max 100vh a správný aspect-ratio
// ═══════════════════════════════════════════════════════════

// Wrapper pro správný formát
function PostContainer({ 
  format, 
  children 
}: { 
  format: '1:1' | '4:5'; 
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex items-center justify-center p-4 bg-black">
      <div 
        className="w-full rounded-lg overflow-hidden shadow-2xl"
        style={{
          aspectRatio: format === '1:1' ? '1/1' : '4/5',
          maxHeight: 'calc(100vh - 2rem)',
          maxWidth: format === '1:1' ? 'calc(100vh - 2rem)' : 'calc((100vh - 2rem) * 0.8)'
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Post0StartupsFail() {
  return (
    <PostContainer format="1:1">
      <div className="h-full bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col justify-between p-8 relative overflow-hidden">
        {/* Dekorativní kruhy na pozadí */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-slate-900 mb-3">
              Proč většina podnikatelů skončí?
            </div>
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-5 py-3 rounded-full">
              <span className="text-2xl">❌</span>
              <span className="font-semibold text-xl">Neví KDO je zákazník</span>
            </div>
          </div>

          {/* Main - Vizuální flow */}
          <div className="flex-1 space-y-6">
            {/* PŘED - chaotické body */}
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-300 to-red-500 rounded-full"></div>
              <div className="text-xl font-bold text-red-600 mb-3 uppercase tracking-wide">Před kurzem:</div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full flex-shrink-0"></div>
                  <div className="text-slate-700 text-lg">"Všichni potřebují můj produkt"</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full flex-shrink-0"></div>
                  <div className="text-slate-700 text-lg">"Napíšu to na FB a uvidím"</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full flex-shrink-0"></div>
                  <div className="text-slate-700 text-lg">"Zkusím všechno najednou"</div>
                </div>
              </div>
            </div>

            {/* Šipka transformace */}
            <div className="flex items-center justify-center gap-3 py-2">
              <div className="h-px flex-1 bg-gradient-to-r from-red-300 to-green-300"></div>
              <div className="bg-gradient-to-r from-red-500 to-green-500 text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg">
                90 MINUT
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-green-300 to-green-300"></div>
            </div>

            {/* PO - strukturované karty */}
            <div className="space-y-3">
              <div className="text-xl font-bold text-green-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                Po kurzu máš:
              </div>
              
              {/* Segment */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">📍</div>
                  <div className="flex-1">
                    <div className="text-base text-blue-600 font-semibold uppercase mb-2">Přesný segment</div>
                    <div className="text-slate-900 font-bold text-xl">"Fitness trenéři 25-40 let"</div>
                  </div>
                </div>
              </div>

              {/* Bolest */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">💢</div>
                  <div className="flex-1">
                    <div className="text-base text-orange-600 font-semibold uppercase mb-2">Hlavní problém</div>
                    <div className="text-slate-900 font-bold text-xl">"Nemám klienty, nevím jak oslovit"</div>
                  </div>
                </div>
              </div>

              {/* Kanály */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">📱</div>
                  <div className="flex-1">
                    <div className="text-base text-purple-600 font-semibold uppercase mb-2">Kde ho najdeš</div>
                    <div className="text-slate-900 font-bold text-xl">"Instagram, lokální gym, FB skupiny"</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8 pt-6 border-t border-slate-200">
            <div className="text-green-600 mb-3 font-semibold flex items-center justify-center gap-2 text-xl">
              <span>✅</span>
              <span>Konkrétní výstup který POUŽIJEŠ</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              podnikatelskactvrtka.cz
            </div>
          </div>
        </div>
      </div>
    </PostContainer>
  );
}

// Post #6: 90 minut vs dlouhé kurzy
function Post1ThreeModules() {
  return (
    <PostContainer format="1:1">
      <div className="h-full bg-gradient-to-br from-red-50 via-white to-green-50 flex flex-col p-8 relative overflow-hidden">
        {/* Dekorativní pozadí */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-red-200/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-200/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Header */}
          <div className="text-center">
            <div className="text-4xl text-slate-600 mb-2">Pondělí večer. 21:37</div>
            <div className="text-2xl text-slate-500">Pouštíš online kurz...</div>
          </div>

          {/* Problema - dlouhé kurzy */}
          <div className="bg-red-100/80 backdrop-blur-sm rounded-3xl p-6 border-2 border-red-300">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-red-700 mb-3">❌ 3 HODINY POZDĚJI:</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-lg text-slate-700">
                <div className="text-3xl">📹</div>
                <div>Video #47: "Mindset úspěchu"</div>
              </div>
              <div className="flex items-center gap-3 text-lg text-slate-700">
                <div className="text-3xl">📹</div>
                <div>Video #83: "Tipy na Instagram"</div>
              </div>
              <div className="flex items-center gap-3 text-lg text-slate-700">
                <div className="text-3xl">📹</div>
                <div>Video #124: "Jak na prodej"</div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">Co máš HOTOVÉHO?</div>
              <div className="text-4xl font-bold text-slate-900">...NIC.</div>
            </div>
          </div>

          {/* Šipka transformace */}
          <div className="flex items-center justify-center">
            <div className="text-5xl">⬇️</div>
          </div>

          {/* Solution - Podnikatelská Čtvrtka */}
          <div className="bg-green-100/80 backdrop-blur-sm rounded-3xl p-6 border-2 border-green-400">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-green-700 mb-2">✅ PODNIKATELSKÁ ČTVRTKA:</div>
            </div>
            <div className="space-y-2 text-xl text-slate-800">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold">90 minut</span>
                <span>→</span>
                <span>JEN podstatné</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold">3 nástroje</span>
                <span>→</span>
                <span>HOTOVÝ model</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold">0 % teorie</span>
                <span>→</span>
                <span>100 % AKCE</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-700 mb-3">
              Šetříme ti čas. Dáváme ti systém.
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
              podnikatelskactvrtka.cz
            </div>
          </div>
        </div>
      </div>
    </PostContainer>
  );
}

function Post1TargetCalculator() {
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PostContainer format="1:1">
      <div className="h-full relative">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="problem"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-red-900 to-red-950 flex flex-col items-center justify-center p-8 text-center text-white"
            >
              <div className="text-6xl md:text-7xl mb-8">❌</div>
              <div className="text-3xl md:text-4xl font-bold mb-6">95 % podnikatelů</div>
              <div className="text-2xl md:text-3xl text-slate-300 mb-8">
                dělá byznys<br/>"OD OKA"
              </div>
              <div className="space-y-4 text-xl md:text-2xl text-slate-400">
                <div>Doufají, že to vyjde</div>
                <div>Nemají přesný cíl</div>
                <div>Neví KOLIK zákazníků potřebují</div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="calculation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 flex flex-col items-center justify-center p-8 text-center text-white"
            >
              <div className="text-4xl md:text-5xl font-bold mb-8">KALKULAČKA CÍLE</div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 space-y-4 w-full max-w-2xl">
                <div>
                  <div className="text-base text-slate-300 mb-2">Chci za měsíc:</div>
                  <div className="text-5xl md:text-6xl font-bold text-green-400">50.000 Kč</div>
                </div>

                <div className="text-4xl font-bold">÷</div>

                <div>
                  <div className="text-base text-slate-300 mb-2">Produkt za:</div>
                  <div className="text-5xl md:text-6xl font-bold text-blue-400">2.500 Kč</div>
                </div>

                <div className="border-t-2 border-white/30 pt-4">
                  <div className="text-3xl mb-2">=</div>
                  <div className="text-6xl md:text-7xl font-bold text-yellow-400 mb-2">20</div>
                  <div className="text-xl text-slate-300">zákazníků/měsíc</div>
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 mt-3">= 1/DEN</div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="solution"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-green-700 to-emerald-800 flex flex-col items-center justify-center p-8 text-center text-white"
            >
              <div className="text-6xl md:text-7xl mb-8">✅</div>
              <div className="text-3xl md:text-4xl font-bold mb-6">Žádné doufání.</div>
              <div className="text-3xl md:text-4xl font-bold mb-8 text-yellow-400">
                Jen DATA a matematika.
              </div>
              <div className="text-2xl md:text-3xl mb-4">Model podnikání</div>
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                podnikatelskactvrtka.cz
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PostContainer>
  );
}

function Post2Timeline() {
  const [showChaos, setShowChaos] = useState(true);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setShowChaos((prev) => !prev);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <PostContainer format="1:1">
      <div className="h-full relative">
        <AnimatePresence mode="wait">
          {showChaos ? (
            <motion.div
              key="chaos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex flex-col justify-center p-6 md:p-8 text-white"
            >
              <div className="text-center mb-8">
                <div className="text-6xl md:text-7xl mb-4">❌</div>
                <div className="text-4xl md:text-5xl font-bold mb-6">BEZ PLÁNU</div>
              </div>

              <div className="space-y-4 mb-8 max-w-2xl mx-auto">
                <div className="bg-red-600/30 border-2 border-red-400/50 rounded-lg p-4">
                  <div className="text-xl md:text-2xl text-slate-300 mb-2">Ráno:</div>
                  <div className="text-base md:text-lg">FB scroll, hledám inspiraci</div>
                </div>
                <div className="bg-red-600/30 border-2 border-red-400/50 rounded-lg p-4">
                  <div className="text-xl md:text-2xl text-slate-300 mb-2">Odpoledne:</div>
                  <div className="text-base md:text-lg">Googlím "jak získat zákazníky"</div>
                </div>
                <div className="bg-red-600/30 border-2 border-red-400/50 rounded-lg p-4">
                  <div className="text-xl md:text-2xl text-slate-300 mb-2">Večer:</div>
                  <div className="text-base md:text-lg">Zavírám 15 záložek</div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-5xl md:text-6xl mb-4">❓</div>
                <div className="text-3xl md:text-4xl text-red-400">Co jsem udělal?</div>
                <div className="text-6xl md:text-7xl font-bold text-gray-500 mt-4">0</div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="solution"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 flex flex-col items-center justify-center p-6 md:p-8 text-center text-white"
            >
              <div className="text-6xl md:text-7xl mb-6">✅</div>
              <div className="text-4xl md:text-5xl font-bold mb-8">S PLÁNEM</div>
              
              <div className="space-y-4 mb-8 w-full max-w-2xl">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-xl md:text-2xl text-green-300 mb-2">Ráno:</div>
                  <div className="text-base md:text-lg">Vím KDO je zákazník ✓</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-xl md:text-2xl text-green-300 mb-2">Odpoledne:</div>
                  <div className="text-base md:text-lg">Vím KDE ho najít ✓</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-xl md:text-2xl text-green-300 mb-2">Večer:</div>
                  <div className="text-base md:text-lg">Akce splněno ✓</div>
                </div>
              </div>

              <div className="text-3xl md:text-4xl font-bold mb-4">Model podnikání</div>
              <div className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6">90 minut</div>
              <div className="text-2xl md:text-3xl text-yellow-400">podnikatelskactvrtka.cz</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PostContainer>
  );
}

function Post3Revenue() {
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PostContainer format="1:1">
      <div className="h-full relative">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex flex-col items-center justify-center p-8 text-center text-white"
            >
              <div className="text-6xl md:text-7xl mb-8">💬</div>
              <div className="text-3xl md:text-4xl mb-8">"Jak ti jde byznys?"</div>
              <div className="text-6xl md:text-7xl mb-8">😅</div>
              <div className="text-3xl md:text-4xl text-slate-300">"Jo, dobře,<br/>pracuju na tom..."</div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="reality"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-red-800 to-red-950 flex flex-col items-center justify-center p-8 text-white"
            >
              <div className="text-4xl md:text-5xl mb-8 font-bold">REALITA:</div>
              <div className="space-y-6 text-center">
                <div>
                  <div className="text-xl md:text-2xl mb-2">📊 Tržby</div>
                  <div className="text-5xl md:text-6xl font-bold text-green-400">12.000</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl mb-2">💸 Náklady</div>
                  <div className="text-5xl md:text-6xl font-bold text-red-400">35.000</div>
                </div>
                <div className="border-t-2 border-white/20 pt-6">
                  <div className="text-6xl md:text-7xl mb-4">💔</div>
                  <div className="text-5xl md:text-6xl font-bold text-red-500">-23k Kč</div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="solution"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-green-700 to-emerald-800 flex flex-col items-center justify-center p-8 text-center text-white"
            >
              <div className="text-3xl md:text-4xl mb-6">Není to o tvém talentu.</div>
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-10">
                Je to o SYSTÉMU
              </div>
              <div className="text-2xl md:text-3xl mb-4">Model podnikání</div>
              <div className="text-6xl md:text-7xl font-bold mb-6">90 minut</div>
              <div className="text-xl md:text-2xl text-slate-300 mb-8">Místo chaosu → jasno</div>
              <div className="text-2xl md:text-3xl text-yellow-400">
                podnikatelskactvrtka.cz
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PostContainer>
  );
}

function Post4SegmentSize() {
  return (
    <PostContainer format="1:1">
      <div className="h-full bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-6 md:p-8 text-center text-white">
        <div className="text-3xl md:text-4xl mb-4">"Je v Česku</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-8">dost zákazníků pro mě?"</h1>
        
        <div className="text-2xl md:text-3xl text-red-400 mb-8">
          Většina: "Asi jo... 🤷"
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-6 space-y-3 w-full max-w-2xl mb-6">
          <div className="text-xl md:text-2xl mb-4 text-yellow-400 font-bold">NÁSTROJ VELIKOST TRHU:</div>
          
          <div className="flex justify-between items-center p-3 bg-green-600/20 rounded-lg">
            <div className="text-sm md:text-base">Marketing manažeři</div>
            <div className="text-3xl md:text-4xl font-bold text-green-400">12k</div>
          </div>

          <div className="flex justify-between items-center p-3 bg-green-600/20 rounded-lg">
            <div className="text-sm md:text-base">Freelanceři</div>
            <div className="text-3xl md:text-4xl font-bold text-green-400">3,5k</div>
          </div>

          <div className="flex justify-between items-center p-3 bg-green-600/20 rounded-lg">
            <div className="text-sm md:text-base">E-shop majitelé</div>
            <div className="text-3xl md:text-4xl font-bold text-green-400">8,5k</div>
          </div>

          <div className="flex justify-between items-center p-3 bg-green-600/20 rounded-lg">
            <div className="text-sm md:text-base">Podnikatelé</div>
            <div className="text-3xl md:text-4xl font-bold text-green-400">15k</div>
          </div>

          <div className="border-t-2 border-white/30 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <div className="text-2xl md:text-3xl font-bold">CELKEM</div>
              <div className="text-5xl md:text-6xl font-bold text-yellow-400">39k</div>
            </div>
          </div>
        </div>

        <div className="text-xl md:text-2xl mb-2">K 50.000 Kč potřebuji: <span className="text-yellow-400 font-bold">20</span></div>
        <div className="text-2xl md:text-3xl text-green-300 mb-6">
          20 z 39k = <span className="font-bold">0,05 %</span> ✅
        </div>

        <div className="text-base md:text-lg text-slate-300 mb-4">Žádné tipování. Data z:</div>
        <div className="text-2xl md:text-3xl font-bold text-yellow-400">
          podnikatelskactvrtka.cz
        </div>
      </div>
    </PostContainer>
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
    <PostContainer format="1:1">
      <div className="h-full relative">
        <AnimatePresence mode="wait">
          {showChaos ? (
            <motion.div
              key="chaos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex flex-col justify-center p-6 md:p-8 text-white"
            >
              <div className="text-center mb-6">
                <div className="text-5xl md:text-6xl mb-3">🕙</div>
                <div className="text-3xl md:text-4xl font-bold">Pondělí večer, 22:37</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="bg-red-600/30 border-2 border-red-400/50 rounded-lg p-3 text-base md:text-lg">
                  "Jak udělat FB reklamu"
                </div>
                <div className="bg-red-600/30 border-2 border-red-400/50 rounded-lg p-3 text-base md:text-lg">
                  "Jak najít zákazníky"
                </div>
                <div className="bg-red-600/30 border-2 border-red-400/50 rounded-lg p-3 text-base md:text-lg">
                  "Best marketing 2025"
                </div>
                <div className="bg-red-600/30 border-2 border-red-400/50 rounded-lg p-3 text-base md:text-lg opacity-70">
                  ...a dalších 12 ZÁLOŽEK
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-4">23:45</div>
                <div className="text-5xl md:text-6xl mb-3">❓</div>
                <div className="text-2xl md:text-3xl text-red-400 mb-4">Co jsi udělal?</div>
                <div className="text-6xl md:text-7xl font-bold text-gray-500">0</div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="solution"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 flex flex-col items-center justify-center p-6 md:p-8 text-center text-white"
            >
              <div className="text-3xl md:text-4xl mb-6 font-bold">Existuje systém:</div>
              
              <div className="space-y-3 mb-6 w-full max-w-2xl">
                <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                  <div className="text-4xl md:text-5xl font-bold text-green-400">1.</div>
                  <div className="text-xl md:text-2xl text-left">KDO je zákazník</div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                  <div className="text-4xl md:text-5xl font-bold text-green-400">2.</div>
                  <div className="text-xl md:text-2xl text-left">CO mu nabízíš</div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                  <div className="text-4xl md:text-5xl font-bold text-green-400">3.</div>
                  <div className="text-xl md:text-2xl text-left">KDE ho najdeš</div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                  <div className="text-4xl md:text-5xl font-bold text-green-400">4.</div>
                  <div className="text-xl md:text-2xl text-left">PLÁN na zítra</div>
                </div>
              </div>

              <div className="text-3xl md:text-4xl mb-4">Model podnikání</div>
              <div className="text-5xl md:text-6xl font-bold text-yellow-400 mb-4">90 minut</div>
              <div className="text-xl md:text-2xl text-slate-300 mb-4">Žádné záložky. Jen akce.</div>
              <div className="text-2xl md:text-3xl text-yellow-400">podnikatelskactvrtka.cz</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PostContainer>
  );
}

// Post #7: Interaktivní vyplňování BMC (animace)
function Post7InteractiveBMC() {
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4); // 4 kroky
    }, 4000); // Zpomaleno na 4s pro více času
    return () => clearInterval(timer);
  }, []);

  // Simplified BMC bloky (3x3 grid)
  const blocks = [
    { id: 'partners', label: 'Partneři', color: 'from-blue-500 to-blue-600', step: 2 },
    { id: 'activities', label: 'Aktivity', color: 'from-purple-500 to-purple-600', step: 2 },
    { id: 'resources', label: 'Zdroje', color: 'from-pink-500 to-pink-600', step: 2 },
    { id: 'value', label: 'Hodnotová\nnabídka', color: 'from-orange-500 to-orange-600', step: 1 },
    { id: 'relations', label: 'Vztahy se\nzákazníky', color: 'from-yellow-500 to-yellow-600', step: 3 },
    { id: 'channels', label: 'Kanály', color: 'from-green-500 to-green-600', step: 3 },
    { id: 'segments', label: 'Segmenty\nzákazníků', color: 'from-teal-500 to-teal-600', step: 1 },
    { id: 'costs', label: 'Náklady', color: 'from-red-500 to-red-600', step: 2 },
    { id: 'revenue', label: 'Příjmy', color: 'from-emerald-500 to-emerald-600', step: 3 },
  ];

  return (
    <PostContainer format="1:1">
      <div className="h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col p-6 relative overflow-hidden">
        {/* Header */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ 
              type: "spring",
              stiffness: 150,
              damping: 20
            }}
            className="text-center mb-6 relative z-10"
          >
            <div className="text-4xl font-bold text-white mb-2">
              {step === 0 && "😰 Znáš to?"}
              {step === 1 && "✅ VYPLŇUJEŠ model"}
              {step === 2 && "🔄 Je ŽIVÝ, roste s tebou"}
              {step === 3 && "🚀 Pracuješ s ním POŘÁD"}
            </div>
            <div className="text-xl text-slate-300">
              {step === 0 && "Frustrace každého podnikatele"}
              {step === 1 && "Přidáváš TVOJE data"}
              {step === 2 && "Upravuješ, zlepšuješ"}
              {step === 3 && "STRATEGIE co žije"}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* BMC Grid */}
        <div className="flex-1 grid grid-cols-3 gap-3 p-4">
          {blocks.map((block, index) => {
            const isVisible = step === 0 ? false : step >= block.step;
            
            return (
              <motion.div
                key={block.id}
                animate={{ 
                  opacity: isVisible ? 1 : (step === 0 ? 0.4 : 0.3),
                  scale: isVisible ? 1 : 0.98,
                }}
                transition={{ 
                  type: "spring", // SPRING animace místo obyčejné!
                  stiffness: 100,
                  damping: 20,
                  mass: 0.8,
                  delay: isVisible ? index * 0.05 : 0, // Jemnější stagger
                }}
                className={`
                  rounded-2xl border-2 flex flex-col items-center justify-center text-center p-2
                  ${isVisible 
                    ? `bg-gradient-to-br ${block.color} border-white/30 shadow-lg` 
                    : 'bg-slate-800/60 border-slate-700'
                  }
                `}
              >
                {step === 0 ? (
                  // Frame 0: PAINS reálných podnikatelů - VĚTŠÍ PÍSMO pro video!
                  <motion.div 
                    className="text-white text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="text-4xl mb-2">😰</div>
                    <div className="text-xl leading-tight whitespace-pre-line font-bold drop-shadow-lg">
                      {index === 0 && "Kde\nzačít?"}
                      {index === 1 && "Co mám\ndělat?"}
                      {index === 2 && "Jak na\nmarketing?"}
                      {index === 3 && "Všechno\nje složité"}
                      {index === 4 && "Nechci\ndalší videa"}
                      {index === 5 && "Hodiny\nstudování"}
                      {index === 6 && "Kde jsou\nzákazníci?"}
                      {index === 7 && "Nemám\nsystém"}
                      {index === 8 && "Co\nvůbec?"}
                    </div>
                  </motion.div>
                ) : isVisible ? (
                  <motion.div 
                    className="text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                    style={{ 
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      WebkitFontSmoothing: 'antialiased'
                    }}
                  >
                    <div className="text-lg font-bold leading-tight whitespace-pre-line">
                      {block.label}
                    </div>
                    <div className="text-4xl mt-2">
                      ✓
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-slate-600 text-xs">
                    ...
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 relative z-10">
          <AnimatePresence mode="wait">
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="text-2xl font-bold text-green-400">
                  Model co s tebou ROSTE
                </div>
                <div className="text-xl text-white">
                  Živá STRATEGIE • Neustálý rozvoj
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  podnikatelskactvrtka.cz
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PostContainer>
  );
}

// ═══════════════════════════════════════════════════════════
// 🎨 MAIN COMPONENT
// ═══════════════════════════════════════════════════════════

export default function OrganicPostsPerfectSize() {
  const [selectedPost, setSelectedPost] = useState(0);
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
      case 0: return <Post0StartupsFail />;
      case 1: return <Post1TargetCalculator />;
      case 2: return <Post2Timeline />;
      case 3: return <Post3Revenue />;
      case 4: return <Post4SegmentSize />;
      case 5: return <Post5GoogleTabs />;
      case 6: return <Post1ThreeModules />;
      case 7: return <Post7InteractiveBMC />;
      default: return null;
    }
  };

  // FULLSCREEN MODE
  if (viewMode === 'fullscreen') {
    return (
      <div className="relative bg-black">
        {renderPostVisual()}
        
        <button
          onClick={() => setViewMode('selector')}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-black/90 hover:bg-black text-white rounded-lg backdrop-blur-sm flex items-center gap-2 text-sm"
        >
          ← Zpět
        </button>

        {/* Format info */}
        <div className="fixed bottom-4 left-4 z-50 px-3 py-2 bg-black/90 text-white rounded-lg backdrop-blur-sm text-xs">
          {currentPost.format === '1:1' ? '1080×1080 (Square)' : '1080×1350 (Portrait)'}
        </div>
      </div>
    );
  }

  // SELECTOR MODE
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl mb-2">
            🎯 Organic Posts - Perfect Size
          </h1>
          <p className="text-slate-300">
            Vejde se na obrazovku! Screenshot → Upload na FB/IG! 🚀
          </p>
        </div>

        {/* Post Selector */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Vyber Post:</h2>
            <div className="text-sm text-slate-300">
              {selectedPost} / {POSTS.length}
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 md:gap-4 mb-4">
            {POSTS.map((post) => (
              <button
                key={post.id}
                onClick={() => setSelectedPost(post.id)}
                className={`
                  p-3 md:p-4 rounded-lg transition-all text-left
                  ${selectedPost === post.id
                    ? 'bg-purple-600 scale-105'
                    : 'bg-white/20 hover:bg-white/30'
                  }
                `}
              >
                <div className="flex items-center gap-1 md:gap-2 mb-1">
                  <div className="text-xl md:text-2xl font-bold">{post.id}</div>
                  {post.type === 'animated' ? (
                    <Video size={14} className="text-purple-300" />
                  ) : (
                    <ImageIcon size={14} className="text-blue-300" />
                  )}
                </div>
                <div className="text-xs text-slate-300 line-clamp-2">
                  {post.title}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {post.format === '1:1' ? '1:1' : '4:5'}
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSelectedPost(Math.max(1, selectedPost - 1))}
              disabled={selectedPost === 1}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
            >
              <ChevronLeft size={16} />
              <span className="hidden md:inline">Předchozí</span>
            </button>
            <button
              onClick={() => setSelectedPost(Math.min(POSTS.length, selectedPost + 1))}
              disabled={selectedPost === POSTS.length}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
            >
              <span className="hidden md:inline">Další</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
          {/* Left */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl mb-1">Post #{currentPost.id}</h2>
                <div className="text-sm text-slate-400">{currentPost.title}</div>
              </div>
              <div className={`
                px-3 py-1 rounded-full text-xs flex items-center gap-2
                ${currentPost.type === 'animated' ? 'bg-purple-600/50' : 'bg-blue-600/50'}
              `}>
                {currentPost.type === 'animated' ? (
                  <>
                    <Video size={14} />
                    VIDEO
                  </>
                ) : (
                  <>
                    <ImageIcon size={14} />
                    IMG
                  </>
                )}
              </div>
            </div>

            <button
              onClick={() => setViewMode('fullscreen')}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-xl font-bold flex items-center justify-center gap-2 mb-4"
            >
              <Monitor size={24} />
              📺 Celá obrazovka
            </button>

            <div className={`
              p-4 rounded-lg border-2
              ${currentPost.type === 'animated' 
                ? 'bg-purple-600/20 border-purple-400/30' 
                : 'bg-blue-600/20 border-blue-400/30'
              }
            `}>
              <div className="text-sm space-y-2">
                <div className="font-bold mb-2">
                  {currentPost.type === 'animated' ? '📱 Workflow:' : '📸 Workflow:'}
                </div>
                {currentPost.type === 'animated' ? (
                  <ol className="list-decimal list-inside space-y-1 text-slate-300 text-xs">
                    <li>Klikni "📺 Celá obrazovka"</li>
                    <li>Na mobilu nahraj obrazovku 8-12s</li>
                    <li>Zkopíruj text vpravo →</li>
                    <li>Upload video na FB/IG + text</li>
                  </ol>
                ) : (
                  <ol className="list-decimal list-inside space-y-1 text-slate-300 text-xs">
                    <li>Klikni "📺 Celá obrazovka"</li>
                    <li>Screenshot (Win+Shift+S / Cmd+Shift+4)</li>
                    <li>Zkopíruj text vpravo →</li>
                    <li>Upload na FB/IG + text</li>
                  </ol>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Formát:</span>
                <span className="px-2 py-1 bg-purple-600/30 rounded text-xs">
                  {currentPost.format === '1:1' ? '1080×1080 (Square)' : '1080×1350 (Portrait)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Segment:</span>
                <span className="px-2 py-1 bg-green-600/30 rounded text-xs">{currentPost.segment}</span>
              </div>
            </div>
          </div>

          {/* Right - Copy */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">Copy Text</h3>
              <button
                onClick={() => copyToClipboard(currentPost.copy, currentPost.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-bold
                  ${copiedPost === currentPost.id
                    ? 'bg-green-600'
                    : 'bg-purple-600 hover:bg-purple-700'
                  }
                `}
              >
                {copiedPost === currentPost.id ? (
                  <>
                    <Check size={18} />
                    Hotovo!
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Kopírovat
                  </>
                )}
              </button>
            </div>

            <div className="bg-black/30 rounded-lg p-4 max-h-[500px] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-xs md:text-sm leading-relaxed">
                {currentPost.copy}
              </pre>
            </div>

            <div className="mt-4 p-4 bg-green-600/20 border-2 border-green-400/30 rounded-lg">
              <div className="text-sm space-y-2">
                <div className="font-bold mb-2">✅ Quick:</div>
                <div className="text-slate-300 text-xs space-y-1">
                  <div>1. Celá obrazovka → Screenshot/video</div>
                  <div>2. Zkopíruj text ↑</div>
                  <div>3. Upload na FB/IG</div>
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

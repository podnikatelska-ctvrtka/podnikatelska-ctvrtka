import { useState } from 'react';
import { ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';

interface AdData {
  id: string;
  name: string;
  category: string;
  concept: string;
  budget: string;
  background: string;
  reasoning: string;
  content: React.ReactNode;
  copy: {
    primary: string;
    headline: string;
    cta: string;
  };
}

const finalAdPortfolio: AdData[] = [
  // AD #1: PŘED/PO - Transformation
  {
    id: 'before-after',
    name: 'Ad #1: PŘED/PO ČTVRTCE',
    category: 'Transformation • Social Proof',
    concept: 'Konkrétní změna • Vizuální kontrast • Relatable',
    budget: '70 Kč/den',
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    reasoning: `TRANSFORMATION = DESIRE • CONCRETE = TRUST • VISUAL = MEMORABLE`,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <h1 className="text-5xl font-black text-white mb-10 leading-tight">
          PŘED ČTVRTKOU<br/>
          <span className="text-red-400">vs</span><br/>
          PO ČTVRTCE
        </h1>

        <div className="grid grid-cols-2 gap-6 mb-10 max-w-4xl w-full">
          {/* PŘED */}
          <div className="bg-red-900/30 backdrop-blur-sm rounded-xl p-6 border-2 border-red-500/50">
            <p className="text-3xl mb-6">😰</p>
            <p className="text-2xl font-black text-red-300 mb-5">PŘED</p>
            <div className="space-y-3 text-left text-white">
              <p className="text-lg">❌ Chaos v hlavě</p>
              <p className="text-lg">❌ Nevíš kudy kam</p>
              <p className="text-lg">❌ Plno nápadů, žádný plán</p>
              <p className="text-lg">❌ Prokrastinace</p>
            </div>
          </div>

          {/* PO */}
          <div className="bg-green-900/30 backdrop-blur-sm rounded-xl p-6 border-2 border-green-500/50">
            <p className="text-3xl mb-6">✅</p>
            <p className="text-2xl font-black text-green-300 mb-5">PO</p>
            <div className="space-y-3 text-left text-white">
              <p className="text-lg">✓ Jasná strategie</p>
              <p className="text-lg">✓ Konkrétní kroky</p>
              <p className="text-lg">✓ Fokus na 1 věc</p>
              <p className="text-lg">✓ Akce hned zítra</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-7 max-w-3xl w-full border-2 border-white/30">
          <p className="text-2xl font-bold text-yellow-300 mb-3">
            CO SE STALO?
          </p>
          <p className="text-xl text-white">
            90 minut práce s 2 nástroji.<br/>
            Celý byznys na 1 papíře A4.
          </p>
        </div>

        <div className="bg-white text-black px-16 py-7 rounded-xl shadow-2xl mb-5">
          <p className="text-5xl font-black">CHCI TAKY! →</p>
        </div>

        <p className="text-yellow-300 text-2xl font-bold">
          🔥 Prvních 50 lidí • Sleva 40%
        </p>
      </div>
    ),
    copy: {
      primary: `PŘED ČTVRTKOU vs PO ČTVRTCE

PŘED:
❌ Chaos v hlavě
❌ Nevíš kudy kam
❌ Plno nápadů, žádný plán
❌ Prokrastinace

PO:
✅ Jasná strategie
✅ Konkrétní kroky
✅ Fokus na 1 věc
✅ Akce hned zítra

━━━━━━━━━━━━━━━━━━━━━━━━━━━

CO SE STALO?

90 minut práce s 2 nástroji.
Celý byznys na 1 papíře A4.

PODNIKATELSKÁ ČTVRTKA
= Business Model Canvas + Value Proposition Canvas

První v ČR. Poprvé v češtině. Konečně použitelné.

🔥 Prvních 50 lidí získá průkopnickou cenu
→ Sleva 40% navždy

Není čas váhat.`,
      headline: 'Z chaosu do jasna za 90 minut',
      cta: 'Chci taky'
    }
  },

  // AD #2: PRAVDA - Anti-establishment (MODRÁ SAFE VERZE)
  {
    id: 'truth-blue',
    name: 'Ad #2: PRAVDA (MODRÁ)',
    category: 'Anti-Guru • Kontrast • Odvaha',
    concept: 'Polarizace • Důvěryhodnost • First-mover',
    budget: '80 Kč/den',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    reasoning: `KONTRAST = POZORNOST • PRAVDA = DŮVĚRA • MODRÁ = SAFE`,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="bg-red-600 text-white px-10 py-4 rounded-lg mb-6 shadow-lg">
          <p className="text-3xl font-black">
            ⚠️ PRAVDA, KTEROU NIKDO NEŘEKNE
          </p>
        </div>

        <h1 className="text-6xl font-black text-white mb-8 leading-tight drop-shadow-lg">
          V Česku žádná<br/>
          <span className="text-red-400">REÁLNÁ POMOC</span><br/>
          podnikatelům není.
        </h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-7 mb-7 max-w-3xl w-full border-2 border-white/30">
          <div className="space-y-4 text-left">
            <p className="text-2xl">
              <span style={{ color: '#ffffff' }}>✅ <span className="font-bold">Guru kurzy?</span> Máme.</span> <span style={{ color: '#e5e5e5' }}>(50 hodin teorie, nula praxe)</span>
            </p>
            <p className="text-2xl">
              <span style={{ color: '#ffffff' }}>✅ <span className="font-bold">AI automaty?</span> Máme.</span> <span style={{ color: '#e5e5e5' }}>(Nic neřeší)</span>
            </p>
            <p className="text-2xl">
              <span style={{ color: '#ffffff' }}>✅ <span className="font-bold">Online konzultanti?</span> Máme.</span> <span style={{ color: '#e5e5e5' }}>(Obecné rady)</span>
            </p>
            <p className="text-3xl font-black mt-6" style={{ color: '#fbbf24' }}>
              ❌ KONKRÉTNÍ METODA? NIKDE.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black rounded-xl px-10 py-6 mb-7 shadow-lg">
          <p className="text-4xl font-black mb-2">
            TAK JSME TO VYTVOŘILI.
          </p>
          <p className="text-2xl font-bold">
            První v ČR • Konečně realita • Bez keců
          </p>
        </div>

        <div className="mb-7">
          <p className="text-5xl font-black text-white mb-3">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-2xl text-gray-300">
            2 nástroje poprvé v češtině • 90 minut • Hotovo
          </p>
        </div>

        <div className="bg-white text-black px-16 py-7 rounded-xl shadow-2xl mb-5">
          <p className="text-5xl font-black">CHCI VIDĚT! →</p>
        </div>

        <p className="text-yellow-300 text-2xl font-bold">
          🔥 Jenom 50 lidí • První v ČR
        </p>
      </div>
    ),
    copy: {
      primary: `V ČESKU ŽÁDNÁ REÁLNÁ POMOC NENÍ.

Guru kurzy? ✅ Máme. (50 hodin teorie)
AI automaty? ✅ Máme. (Nic neřeší)
Konzultanti? ✅ Máme. (Obecné rady)

KONKRÉTNÍ METODA? ❌ NIKDE.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

TAK JSME TO VYTVOŘILI.

PODNIKATELSKÁ ČTVRTKA = první v ČR.

2 vědecké nástroje poprvé v češtině.
90 minut práce.
Hotový byznys model + marketing strategie.

Bez teorií. Bez keců. Bez čekání.

🔥 JENOM 50 LIDÍ
→ První v ČR dostanou průkopnickou cenu
→ Sleva 40% navždy

⏰ Není čas na váhání.`,
      headline: 'První v ČR • Konečně realita',
      cta: 'Chci vidět'
    }
  },

  // AD #3: STOP - Pattern interrupt
  {
    id: 'stop-scroll',
    name: 'Ad #3: STOP SCROLL',
    category: 'Pattern Interrupt • Empatie • Simplifikace',
    concept: 'Zastavit scroll • Pozitivní frame • Konkrétní řešení',
    budget: '85 Kč/den',
    background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
    reasoning: `STOP = ATTENTION • EMPATHY = CONNECTION • SIMPLE = ACTION`,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center mb-8 shadow-2xl">
          <p className="text-7xl">🛑</p>
        </div>

        <h1 className="text-6xl font-black text-white mb-8 leading-tight">
          STOP!<br/>
          Tvůj business<br/>
          <span className="text-yellow-300">není špatný.</span>
        </h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-7 mb-7 max-w-3xl w-full border-2 border-white/30">
          <p className="text-2xl text-white mb-5">
            Jen ti <span className="font-bold text-yellow-300">chybí mapa.</span>
          </p>
          <div className="space-y-3 text-left text-white text-xl">
            <p>✓ Máš dobré nápady</p>
            <p>✓ Máš skills</p>
            <p>✓ Máš motivaci</p>
            <p className="text-red-300 font-bold pt-3">
              ❌ Ale nemáš STRATEGII na 1 místě
            </p>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-10 py-6 mb-7 shadow-2xl">
          <p className="text-3xl font-black mb-3">
            300 STRÁNEK TEORIE?
          </p>
          <p className="text-5xl font-black">
            ❌
          </p>
        </div>

        <div className="bg-green-600 text-white rounded-xl px-10 py-6 mb-7 shadow-2xl">
          <p className="text-3xl font-black mb-3">
            1 PAPÍR A4?
          </p>
          <p className="text-5xl font-black">
            ✅
          </p>
        </div>

        <div className="bg-white text-black px-16 py-7 rounded-xl shadow-2xl mb-5">
          <p className="text-5xl font-black">CHCI MAPU! →</p>
        </div>

        <p className="text-yellow-300 text-2xl font-bold">
          🔥 90 minut • Hotovo • Sleva 40%
        </p>
      </div>
    ),
    copy: {
      primary: `STOP!

Tvůj business není špatný.

Jen ti chybí mapa.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Máš dobré nápady
✓ Máš skills
✓ Máš motivaci

❌ Ale nemáš STRATEGII na 1 místě

━━━━━━━━━━━━━━━━━━━━━━━━━━━

300 stránek teorie? ❌
1 papír A4? ✅

PODNIKATELSKÁ ČTVRTKA
= 2 vědecké nástroje na 1 papíře

Business Model Canvas + Value Proposition Canvas

90 minut práce.
Jasná strategie.
Víš co dělat zítra.

🔥 Prvních 50 lidí • Sleva 40%

Získej mapu svého byznysu.`,
      headline: 'Není to špatný byznys, jen chybí mapa',
      cta: 'Chci mapu'
    }
  },

  // AD #4: MATRIX - Volba
  {
    id: 'matrix',
    name: 'Ad #4: THE MATRIX',
    category: 'Volba • Metafora • Wake up call',
    concept: 'Známá metafora • Kontrast • Decision moment',
    budget: '75 Kč/den',
    background: 'linear-gradient(135deg, #001a00 0%, #003300 50%, #000000 100%)',
    reasoning: `CHOICE = ENGAGEMENT • MATRIX = CULTURAL • CONTRAST = CLARITY`,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <p className="text-3xl font-bold mb-6" style={{ color: '#22c55e', textShadow: '0 0 10px rgba(34, 197, 94, 0.8), 2px 2px 4px rgba(0,0,0,0.9)' }}>
          ⚡ WAKE UP CALL
        </p>

        <h1 className="text-5xl font-black text-white mb-8 leading-tight">
          DVĚ PILULKY<br/>
          <span className="text-green-400">JEDNA VOLBA</span>
        </h1>

        <div className="grid grid-cols-2 gap-6 mb-10 max-w-4xl w-full">
          {/* Modrá pilulka */}
          <div className="bg-blue-900/70 backdrop-blur-sm rounded-xl p-7 border-3 border-blue-500 shadow-xl">
            <div className="bg-blue-500 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 text-5xl shadow-lg">
              💊
            </div>
            <p className="text-2xl font-black mb-4" style={{ color: '#93c5fd' }}>
              MODRÁ PILULKA
            </p>
            <div className="space-y-3 text-left">
              <p className="text-base" style={{ color: '#ffffff' }}>
                ✓ Další guru kurz (50 hodin)
              </p>
              <p className="text-base" style={{ color: '#ffffff' }}>
                ✓ Konzultant (3 měsíce čekání)
              </p>
              <p className="text-base" style={{ color: '#ffffff' }}>
                ✓ Agentura (30k/měsíc)
              </p>
              <p className="text-base" style={{ color: '#ffffff' }}>
                ✓ Stejný chaos jako dnes
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-400">
              <p className="text-lg font-bold" style={{ color: '#bfdbfe' }}>
                Investice: 65.000+ Kč
              </p>
              <p className="text-sm mt-1" style={{ color: '#93c5fd' }}>
                Výsledek: Nejasný
              </p>
            </div>
          </div>

          {/* Červená pilulka */}
          <div className="bg-red-900/70 backdrop-blur-sm rounded-xl p-7 border-3 border-red-500 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent"></div>
            <div className="relative z-10">
              <div className="bg-black rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 text-5xl shadow-lg border-3 border-red-500">
                💊
              </div>
              <p className="text-2xl font-black mb-4" style={{ color: '#fca5a5' }}>
                ČERVENÁ PILULKA
              </p>
              <div className="space-y-3 text-left">
                <p className="text-base font-bold" style={{ color: '#ffffff' }}>
                  ✓ 2 vědecké nástroje (CZ PREMIÉRA)
                </p>
                <p className="text-base font-bold" style={{ color: '#ffffff' }}>
                  ✓ 90 minut práce
                </p>
                <p className="text-base font-bold" style={{ color: '#ffffff' }}>
                  ✓ 1 papír A4
                </p>
                <p className="text-base font-bold" style={{ color: '#fbbf24' }}>
                  ✓ Celý byznys jasně vidíš
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-red-400">
                <p className="text-lg font-black" style={{ color: '#fbbf24', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Investice: 4.999 Kč
                </p>
                <p className="text-sm mt-1 font-bold" style={{ color: '#fca5a5' }}>
                  Výsledek: Hotový plán
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-3xl w-full border-2 border-white/30">
          <p className="text-2xl font-bold mb-3" style={{ color: '#ffffff' }}>
            Co dostaneš s ČERVENOU:
          </p>
          <div className="space-y-2 text-left text-lg">
            <p style={{ color: '#ffffff' }}>📊 <span className="font-bold">Business Model Canvas</span> <span style={{ color: '#e5e5e5' }}>• Celý model na 1 stránce</span></p>
            <p style={{ color: '#ffffff' }}>💎 <span className="font-bold">Value Proposition Canvas</span> <span style={{ color: '#e5e5e5' }}>• Marketing sorted</span></p>
            <p style={{ color: '#ffffff' }}>🎯 <span className="font-bold">Jasný akční plán</span> <span style={{ color: '#e5e5e5' }}>• Víš co dělat zítra</span></p>
          </div>
        </div>

        <div className="bg-white text-black px-16 py-7 rounded-xl shadow-2xl mb-5 border-4 border-red-500">
          <p className="text-5xl font-black">BERU ČERVENOU! →</p>
        </div>

        <p className="text-xl font-bold" style={{ color: '#22c55e', textShadow: '0 0 10px rgba(34, 197, 94, 0.8), 2px 2px 4px rgba(0,0,0,0.9)' }}>
          ⚡ První 50 • Průkopnická cena • Sleva 40%
        </p>
      </div>
    ),
    copy: {
      primary: `⚡ WAKE UP CALL

DVĚ PILULKY. JEDNA VOLBA.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

MODRÁ PILULKA:
✓ Další guru kurz (50 hodin)
✓ Konzultant (3 měsíce čekání)
✓ Agentura (30k/měsíc)
✓ Stejný chaos jako dnes

Investice: 65.000+ Kč
Výsledek: Nejasný

━━━━━━━━━━━━━━━━━━━━━━━━━━━

ČERVENÁ PILULKA:
✓ 2 vědecké nástroje (CZ PREMIÉRA)
✓ 90 minut práce
✓ 1 papír A4
✓ Celý byznys jasně vidíš

Investice: 4.999 Kč
Výsledek: Hotový plán

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA

📊 Business Model Canvas • Celý model na 1 stránce
💎 Value Proposition Canvas • Marketing sorted
🎯 Jasný akční plán • Víš co dělat zítra

⚡ První 50 lidí • Průkopnická cena • Sleva 40%

Jakou pilulku bereš?`,
      headline: 'Modrá nebo červená?',
      cta: 'Beru červenou'
    }
  },

  // AD #5: PAIN - Boj podnikatele (NOVÝ!)
  {
    id: 'struggle',
    name: 'Ad #5: BOJ PODNIKATELE (NOVÝ)',
    category: 'Pain Point • Empatie • Real struggle',
    concept: 'Deep pain • Intimní pochopení • Konkrétní relief',
    budget: '75 Kč/den',
    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
    reasoning: `PAIN = RECOGNITION • EMPATHY = CONNECTION • RELIEF = DESIRE`,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <p className="text-3xl mb-6">😓</p>

        <h1 className="text-5xl font-black text-white mb-8 leading-tight">
          Jsou 3 hodiny ráno.<br/>
          <span className="text-yellow-300">Zase nespíš.</span>
        </h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-7 mb-7 max-w-3xl w-full border-2 border-white/30">
          <div className="space-y-4 text-left text-white text-xl">
            <p>
              💭 <span className="font-bold">"Mám dobrý produkt..."</span>
            </p>
            <p>
              💭 <span className="font-bold">"Ale co když se to nepovede?"</span>
            </p>
            <p>
              💭 <span className="font-bold">"Už do toho dávám rok..."</span>
            </p>
            <p>
              💭 <span className="font-bold">"A pořád tápu."</span>
            </p>
          </div>
        </div>

        <div className="bg-red-600/20 backdrop-blur-sm rounded-xl p-7 mb-7 max-w-3xl w-full border-2 border-red-500/50">
          <p className="text-2xl font-bold text-red-300 mb-4">
            Problém není TY.
          </p>
          <p className="text-xl text-white">
            Problém je, že <span className="font-bold text-yellow-300">nemáš jasný plán</span>,<br/>
            který ti ukáže kam jít.
          </p>
        </div>

        <div className="bg-green-600/20 backdrop-blur-sm rounded-xl p-7 mb-7 max-w-3xl w-full border-2 border-green-500/50">
          <p className="text-2xl font-bold text-green-300 mb-4">
            Co kdyby...
          </p>
          <div className="space-y-3 text-left text-white text-lg">
            <p>✓ Celá strategie na 1 papíře A4?</p>
            <p>✓ Vidíš přesně co dělat zítra?</p>
            <p>✓ Žádné další pochybnosti?</p>
            <p className="font-bold text-green-300 pt-2">✓ Konečně v klidu spíš?</p>
          </div>
        </div>

        <div className="mb-7">
          <p className="text-4xl font-black text-white mb-3">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-xl text-gray-300">
            90 minut • 1 papír • Jasno v hlavě
          </p>
        </div>

        <div className="bg-white text-black px-16 py-7 rounded-xl shadow-2xl mb-5">
          <p className="text-5xl font-black">CHCI JASNO! →</p>
        </div>

        <p className="text-yellow-300 text-2xl font-bold">
          🔥 Prvních 50 • Sleva 40%
        </p>
      </div>
    ),
    copy: {
      primary: `Jsou 3 hodiny ráno. Zase nespíš.

💭 "Mám dobrý produkt..."
💭 "Ale co když se to nepovede?"
💭 "Už do toho dávám rok..."
💭 "A pořád tápu."

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Problém není TY.

Problém je, že nemáš jasný plán,
který ti ukáže kam jít.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Co kdyby...

✓ Celá strategie na 1 papíře A4?
✓ Vidíš přesně co dělat zítra?
✓ Žádné další pochybnosti?
✓ Konečně v klidu spíš?

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA

2 vědecké nástroje.
90 minut práce.
1 papír A4.
Jasno v hlavě.

Business Model Canvas + Value Proposition Canvas
= Celá strategie na jednom místě.

🔥 Prvních 50 lidí • Sleva 40%

Získej klid a jasno.`,
      headline: '3:00 ráno a nespíš? Tohle ti chybí.',
      cta: 'Chci jasno'
    }
  },

  // AD #6: SIMPLE A4 - Zlepšená verze (VYLEPŠENÝ!)
  {
    id: 'simple-a4',
    name: 'Ad #6: CELÝ BYZNYS NA A4 (VYLEPŠENÝ)',
    category: 'Simplicity • Visual • Konkrétní benefit',
    concept: 'Visual metafora • Anti-komplexita • Okamžitý benefit',
    budget: '70 Kč/den',
    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    reasoning: `VISUAL = MEMORABLE • SIMPLE = DESIRE • A4 = TANGIBLE`,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="mb-8">
          <div className="bg-white rounded-lg p-10 w-56 h-72 shadow-2xl border-4 border-yellow-400 mx-auto relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-8xl">📄</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-full">
              <p className="text-lg font-black">A4</p>
            </div>
          </div>
        </div>

        <h1 className="text-6xl font-black text-white mb-6 leading-tight">
          Celý tvůj byznys<br/>
          <span className="text-yellow-300">NA JEDNÉ STRÁNCE</span>
        </h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-7 mb-7 max-w-3xl w-full border-2 border-white/30">
          <p className="text-3xl font-bold mb-5" style={{ color: '#fbbf24' }}>
            DOST BYLO:
          </p>
          <div className="space-y-3 text-left text-xl">
            <p style={{ color: '#ff6b6b' }}>
              ❌ 300 stránek dokumentů
            </p>
            <p style={{ color: '#ff6b6b' }}>
              ❌ 50 hodin online kurzů
            </p>
            <p style={{ color: '#ff6b6b' }}>
              ❌ 10 Excel tabulek
            </p>
            <p style={{ color: '#ff6b6b' }}>
              ❌ Chaos v hlavě
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-7 mb-7 max-w-3xl w-full border-2 border-white/30">
          <p className="text-3xl font-bold mb-5" style={{ color: '#4ade80' }}>
            TEĎKA:
          </p>
          <div className="space-y-3 text-left">
            <p className="text-xl" style={{ color: '#ffffff' }}>
              ✓ <span className="font-bold">Vidíš vše najednou</span> <span style={{ color: '#e5e5e5' }}>(ne 50 záložek)</span>
            </p>
            <p className="text-xl" style={{ color: '#ffffff' }}>
              ✓ <span className="font-bold">Jen co potřebuješ</span> <span style={{ color: '#e5e5e5' }}>(bez keců)</span>
            </p>
            <p className="text-xl" style={{ color: '#ffffff' }}>
              ✓ <span className="font-bold">Změna za 5 minut</span> <span style={{ color: '#e5e5e5' }}>(ne 3 týdny)</span>
            </p>
            <p className="text-xl font-bold" style={{ color: '#4ade80' }}>
              ✓ Jasno v hlavě
            </p>
          </div>
        </div>

        <div className="mb-7">
          <p className="text-4xl font-black text-white mb-2">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-xl text-gray-300">
            Business Model + Marketing • Na 1 papíře • 90 minut
          </p>
        </div>

        <div className="bg-white text-black px-16 py-7 rounded-xl shadow-2xl mb-5">
          <p className="text-5xl font-black">CHCI ČTVRTKU! →</p>
        </div>

        <p className="text-yellow-300 text-2xl font-bold">
          🔥 Prvních 50 • Sleva 40%
        </p>
      </div>
    ),
    copy: {
      primary: `CELÝ TVŮJ BYZNYS NA JEDNÉ STRÁNCE A4.

Zní to nereálně?

━━━━━━━━━━━━━━━━━━━━━━━━━━━

DOST BYLO:

❌ 300 stránek strategických dokumentů
❌ 50 hodin online kurzů
❌ 10 Excel tabulek s čísly
❌ Chaos v hlavě

━━━━━━━━━━━━━━━━━━━━━━━━━━━

TEĎKA:

✓ Vidíš vše najednou (ne 50 záložek v browseru)
✓ Jen co potřebuješ (bez zbytečností)
✓ Změna strategie za 5 minut (ne 3 týdny)
✓ Jasno v hlavě

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA

= Business Model Canvas (celý model na 1 A4)
+ Value Proposition Canvas (marketing na 1 A4)

90 minut práce.
2 papíry A4.
Hotovo.

Jednoduchý = lepší.

🔥 Prvních 50 lidí • Sleva 40%

Získej čtvrtku.`,
      headline: 'Celý byznys na A4',
      cta: 'Chci čtvrtku'
    }
  },

  // AD #7: LOSS AVERSION - Co ztratíš (NOVÝ!)
  {
    id: 'loss-aversion',
    name: 'Ad #7: CO ZTRATÍŠ (NOVÝ)',
    category: 'Fear • Loss Aversion • Urgency',
    concept: 'FOMO • Konkrétní ztráty • Time-sensitive',
    budget: '80 Kč/den',
    background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #450a0a 100%)',
    reasoning: `LOSS > GAIN • FEAR = MOTIVATION • URGENCY = ACTION`,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <p className="text-3xl mb-6">⏰</p>

        <h1 className="text-5xl font-black text-white mb-8 leading-tight">
          Každý měsíc<br/>
          <span className="text-red-400">BEZ STRATEGIE</span><br/>
          tě stojí...
        </h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-7 mb-7 max-w-3xl w-full border-2 border-red-500/50">
          <div className="space-y-5 text-left">
            <div>
              <p className="text-3xl font-black text-red-400 mb-2">💸 30.000 Kč</p>
              <p className="text-lg text-gray-300">Ztracené příležitosti (špatný focus)</p>
            </div>
            <div>
              <p className="text-3xl font-black text-red-400 mb-2">⏰ 80 hodin</p>
              <p className="text-lg text-gray-300">Práce na špatných věcech</p>
            </div>
            <div>
              <p className="text-3xl font-black text-red-400 mb-2">😰 Neklid</p>
              <p className="text-lg text-gray-300">"Dělám to správně?"</p>
            </div>
            <div className="pt-4 border-t-2 border-red-500/30">
              <p className="text-2xl font-black text-yellow-300">
                Za rok = 360.000 Kč + vyhoření
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-600/20 backdrop-blur-sm rounded-xl p-7 mb-7 max-w-3xl w-full border-2 border-green-500/50">
          <p className="text-3xl font-bold text-green-300 mb-4">
            CO KDYBY...
          </p>
          <div className="space-y-3 text-left text-white text-lg">
            <p>✓ Jasný plán za 90 minut?</p>
            <p>✓ Focus jen na to co funguje?</p>
            <p>✓ Konec prokrastinace?</p>
            <p className="font-bold text-green-300 pt-2">
              ✓ Začneš vydělávat místo ztrácet?
            </p>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-10 py-6 mb-7 shadow-2xl">
          <p className="text-3xl font-black mb-2">
            INVESTICE: 4.999 Kč
          </p>
          <p className="text-xl font-bold">
            Vrátí se první měsíc. (Pokud to uděláš.)
          </p>
        </div>

        <div className="mb-7">
          <p className="text-4xl font-black text-white mb-2">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-xl text-gray-300">
            Přestaň ztrácet. Začni vydělávat.
          </p>
        </div>

        <div className="bg-white text-black px-16 py-7 rounded-xl shadow-2xl mb-5">
          <p className="text-5xl font-black">STOP ZTRÁTÁM! →</p>
        </div>

        <p className="text-red-300 text-xl font-bold">
          ⏰ Prvních 50 • Sleva 40% • Neváhej
        </p>
      </div>
    ),
    copy: {
      primary: `KAŽDÝ MĚSÍC BEZ STRATEGIE TĚ STOJÍ...

💸 30.000 Kč
→ Ztracené příležitosti (špatný focus)

⏰ 80 hodin
→ Práce na špatných věcech

😰 Neklid
→ "Dělám to správně?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Za rok = 360.000 Kč + vyhoření

━━━━━━━━━━━━━━━━━━━━━━━━━━━

CO KDYBY...

✓ Jasný plán za 90 minut?
✓ Focus jen na to co funguje?
✓ Konec prokrastinace?
✓ Začneš vydělávat místo ztrácet?

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA

Business Model Canvas + Value Proposition Canvas
= Celá strategie na 1 papíře A4

90 minut práce.
Jasný plán.
Konec ztrát.

INVESTICE: 4.999 Kč
(Vrátí se první měsíc. Pokud to uděláš.)

⏰ Prvních 50 lidí • Sleva 40%

Přestaň ztrácet. Začni vydělávat.`,
      headline: 'Kolik tě stojí měsíc bez strategie?',
      cta: 'Stop ztrátám'
    }
  }
];

export default function FinalAdPortfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCopy, setShowCopy] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentAd = finalAdPortfolio[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? finalAdPortfolio.length - 1 : prev - 1));
    setShowCopy(false);
    setCopied(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === finalAdPortfolio.length - 1 ? 0 : prev + 1));
    setShowCopy(false);
    setCopied(false);
  };

  const handleCopyCopy = () => {
    navigator.clipboard.writeText(currentAd.copy.primary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-white mb-4">
            🎯 FINÁLNÍ AD PORTFOLIO
          </h1>
          <p className="text-2xl text-gray-400 mb-6">
            7 testovaných ad setů • Různé úhly • Ready to launch
          </p>
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-2 border-green-400 rounded-xl p-6 max-w-4xl mx-auto">
            <p className="text-xl text-green-300 mb-3">
              <span className="font-bold">✅ VYČIŠTĚNO • VYLEPŠENO • READY!</span>
            </p>
            <p className="text-lg text-gray-300">
              Necháváme jen to nejlepší + 2 nové z jiného "soudku"
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <button
            onClick={goToPrevious}
            className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div className="text-center">
            <p className="text-white text-2xl font-bold">
              {currentIndex + 1} / {finalAdPortfolio.length}
            </p>
            <p className="text-gray-400 text-lg">{currentAd.name}</p>
          </div>
          <button
            onClick={goToNext}
            className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Ad Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-5xl mx-auto">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-2">{currentAd.name}</h3>
              <p className="text-lg text-gray-300 mb-2">
                <span className="font-bold">Kategorie:</span> {currentAd.category}
              </p>
              <p className="text-lg text-gray-300">
                <span className="font-bold">Koncept:</span> {currentAd.concept}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-yellow-300">{currentAd.budget}</p>
            </div>
          </div>
          <p className="text-yellow-300 mt-3 text-sm">
            {currentAd.reasoning}
          </p>
        </div>

        {/* VELKÝ AD PREVIEW - 1080x1080px */}
        <div className="flex items-center justify-center mb-10">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30"
            style={{ 
              width: '1080px',
              height: '1080px',
              background: currentAd.background
            }}
          >
            {currentAd.content}
          </div>
        </div>

        {/* Copy Section */}
        <div className="max-w-5xl mx-auto mb-8">
          <button
            onClick={() => setShowCopy(!showCopy)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-4 rounded-xl transition-all mb-4 font-bold text-lg"
          >
            {showCopy ? 'Skrýt FB copy 👆' : 'Zobraz FB copy 👇'}
          </button>

          {showCopy && (
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold text-white">📝 Facebook Copy</h4>
                <button
                  onClick={handleCopyCopy}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Zkopírováno!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Kopírovat</span>
                    </>
                  )}
                </button>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                  {currentAd.copy.primary}
                </pre>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Headline:</p>
                  <p className="text-sm text-white font-bold">{currentAd.copy.headline}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">CTA Button:</p>
                  <p className="text-sm text-white font-bold">{currentAd.copy.cta}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Overview */}
        <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl p-8 border-2 border-white/20 max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-6 text-center">
            📊 PORTFOLIO PŘEHLED
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 text-white">
            {finalAdPortfolio.map((ad, index) => (
              <div 
                key={ad.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setShowCopy(false);
                  setCopied(false);
                }}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  currentIndex === index 
                    ? 'bg-white/20 border-2 border-white' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <p className="font-bold text-lg mb-1">{ad.name}</p>
                <p className="text-sm text-gray-300">{ad.category}</p>
                <p className="text-xs text-yellow-300 mt-2">{ad.budget}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white/10 rounded-xl p-6">
            <p className="text-white text-lg mb-3">
              <span className="font-bold">💡 Testovací strategie:</span>
            </p>
            <div className="space-y-2 text-gray-300">
              <p>• <span className="text-white font-bold">Týden 1:</span> Pusť Ad #1, #2, #3 (safe bet - 235 Kč/den)</p>
              <p>• <span className="text-white font-bold">Týden 2:</span> Přidej #4, #5 (expand - 385 Kč/den)</p>
              <p>• <span className="text-white font-bold">Týden 3:</span> Testuj #6, #7 (experiment - 535 Kč/den)</p>
              <p>• <span className="text-white font-bold">Po 21 dnech:</span> Vypni nejhorší 3, zdvoj budget na top 2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

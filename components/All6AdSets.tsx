import { useState } from 'react';
import { ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';

interface AdSetData {
  id: string;
  name: string;
  category: string;
  budget: string;
  background: string;
  content: React.ReactNode;
  copy: {
    primary: string;
    headline: string;
    cta: string;
  };
}

const allAdSets: AdSetData[] = [
  // AD #1: PŘED/PO (Z Final3AdSets.tsx - HOTOVÝ!)
  {
    id: 'before-after',
    name: 'Ad #1: PŘED/PO ČTVRTCE ✅',
    category: 'Transformation • Concrete results',
    budget: '70 Kč/den',
    background: 'linear-gradient(135deg, #1e40af 0%, #6366f1 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <h1 className="text-6xl font-black text-white mb-8 leading-tight">
          Před Čtvrtkou → <span className="text-yellow-300">Po Čtvrtce</span>
        </h1>
        
        <div className="bg-white/95 rounded-2xl p-8 mb-6 max-w-4xl w-full">
          <div className="space-y-5">
            {/* Row 1 */}
            <div className="flex items-start gap-6 pb-4 border-b-2 border-gray-200">
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-3xl">❌</span>
                  <span className="text-red-700 text-xl line-through">Nevím, komu přesně prodávám</span>
                </div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🎯</span>
                  <span className="text-blue-700 font-bold text-xl">Vím, kdo je můj ideální zákazník</span>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-start gap-6 pb-4 border-b-2 border-gray-200">
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-3xl">❌</span>
                  <span className="text-red-700 text-xl line-through">Reklamy jen žerou peníze</span>
                </div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">💎</span>
                  <span className="text-blue-700 font-bold text-xl">Vím, co skutečně testovat první</span>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex items-start gap-6 pb-4 border-b-2 border-gray-200">
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-3xl">❌</span>
                  <span className="text-red-700 text-xl line-through">Bojím se marketingu</span>
                </div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🚀</span>
                  <span className="text-blue-700 font-bold text-xl">Rozumím, jak oslovit zákazníky</span>
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex items-start gap-6">
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-3xl">❌</span>
                  <span className="text-red-700 text-xl line-through">Nevím, jak zvýšit zisky</span>
                </div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">📈</span>
                  <span className="text-blue-700 font-bold text-xl">Vidím nové možnosti růstu</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-14 py-6 mb-6">
          <p className="text-5xl font-black mb-2">90 MINUT</p>
          <p className="text-2xl font-bold">= celý byznys jasně</p>
        </div>

        <div className="bg-white text-black px-16 py-7 rounded-xl shadow-2xl mb-5">
          <p className="text-5xl font-black">CHCI TO TAKY! →</p>
        </div>

        <p className="text-white text-2xl font-bold">
          🔥 Prvních 50 • Sleva 40%
        </p>
      </div>
    ),
    copy: {
      primary: `PŘED ČTVRTKOU → PO ČTVRTCE

PŘED:
❌ Nevím, komu přesně prodávám
❌ Reklamy jen žerou peníze
❌ Bojím se marketingu
❌ Nevím, jak zvýšit zisky

PO:
✅ Vím, kdo je můj ideální zákazník
✅ Vím, co skutečně testovat první
✅ Rozumím, jak oslovit zákazníky
✅ Vidím nové možnosti růstu

━━━━━━━━━━━━━━━━━━━━━━━━━━━

CO SE STALO?

90 MINUT = CELÝ BYZNYS JASNĚ

PODNIKATELSKÁ ČTVRTKA
Business Model Canvas + Value Proposition Canvas

První v ČR. Poprvé v češtině.

🔥 Prvních 50 lidí • Sleva 40%`,
      headline: 'Z chaosu do jasna za 90 minut',
      cta: 'Chci to taky'
    }
  },

  // AD #2: PRAVDA (Z MyCreativeAdSetsFixed.tsx - ORIGINÁL!)
  {
    id: 'truth-blue',
    name: 'Ad #2: PRAVDA (MODRÁ) ✅',
    category: 'Anti-Guru • Kontrast',
    budget: '80 Kč/den',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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

  // AD #3: STOP (Z ThreeNewCreativeAds.tsx - OPRAVENÝ!)
  {
    id: 'stop',
    name: 'Ad #3: STOP SCROLL ✅',
    category: 'Pattern Interrupt • Empatie',
    budget: '85 Kč/den',
    background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-10">
        <div className="bg-black text-white px-12 py-5 rounded-xl mb-5 shadow-2xl border-4 border-yellow-400">
          <p className="text-4xl font-black drop-shadow-md">
            🛑 STOP!
          </p>
        </div>

        <h1 className="text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg">
          Tvůj business<br/>
          <span className="text-yellow-400">NENÍ ŠPATNÝ</span>
        </h1>

        <p className="text-4xl font-black text-white mb-7 drop-shadow-md">
          Jen nemáš ten SPRÁVNÝ<br/>papír.
        </p>

        <div className="bg-white rounded-xl p-6 mb-6 max-w-3xl w-full shadow-2xl">
          <p className="text-2xl text-gray-900 font-bold mb-6">
            Představ si, že celý tvůj byznys...
          </p>
          
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-black">
                ✗
              </div>
              <p className="text-xl text-gray-800">
                <span className="font-bold line-through">300 stránek</span> dokumentů
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-black">
                ✗
              </div>
              <p className="text-xl text-gray-800">
                <span className="font-bold line-through">50 hodin</span> online kurzů
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-black">
                ✗
              </div>
              <p className="text-xl text-gray-800">
                <span className="font-bold line-through">Měsíce</span> konzultací
              </p>
            </div>

            <div className="h-px bg-gray-300 my-6"></div>

            <div className="flex items-start gap-4">
              <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-black">
                ✓
              </div>
              <p className="text-2xl text-green-700 font-black">
                = 1 PAPÍR A4
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-12 py-5 mb-5 shadow-2xl border-4 border-yellow-500">
          <p className="text-4xl font-black mb-2">
            90 MINUT
          </p>
          <p className="text-xl font-bold">
            Celý byznys model • Marketing • Jasno
          </p>
        </div>

        <div className="bg-white text-black px-14 py-5 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">UKÁZAT MI TO! →</p>
        </div>

        <p className="text-white text-xl font-bold drop-shadow-md">
          🔥 Prvních 50 • Sleva 40% • Jen dnes
        </p>
      </div>
    ),
    copy: {
      primary: `🛑 STOP!

Tvůj business NENÍ špatný.
Jen nemáš ten SPRÁVNÝ papír.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Představ si, že celý tvůj byznys:

❌ 300 stránek dokumentů
❌ 50 hodin kurzů  
❌ Měsíce konzultací

= 1 PAPÍR A4

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA:

90 MINUT = HOTOVO.

🔥 Prvních 50 • Sleva 40%`,
      headline: 'Celý byznys na 1 papír A4',
      cta: 'Ukázat mi to'
    }
  },

  // AD #4: MATRIX (Z ThreeNewCreativeAds.tsx - OPRAVENÝ!)
  {
    id: 'matrix',
    name: 'Ad #4: THE MATRIX ✅',
    category: 'Volba • Wake up call',
    budget: '75 Kč/den',
    background: 'linear-gradient(135deg, #001a00 0%, #003300 50%, #000000 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-10">
        <p className="text-2xl font-bold mb-5" style={{ color: '#22c55e', textShadow: '0 0 10px rgba(34, 197, 94, 0.8), 2px 2px 4px rgba(0,0,0,0.9)' }}>
          ⚡ WAKE UP CALL
        </p>

        <h1 className="text-5xl font-black text-white mb-7 leading-tight drop-shadow-lg">
          Dvě pilulky.<br/>
          Jedna volba.
        </h1>

        <div className="grid grid-cols-2 gap-5 mb-6 max-w-4xl w-full">
          {/* Modrá pilulka */}
          <div className="bg-blue-900/70 backdrop-blur-sm rounded-xl p-5 border-3 border-blue-500 shadow-xl">
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
          <div className="bg-red-900/70 backdrop-blur-sm rounded-xl p-5 border-3 border-red-500 shadow-2xl relative overflow-hidden">
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

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-5 max-w-3xl w-full border-2 border-white/30">
          <p className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>
            Co dostaneš s ČERVENOU:
          </p>
          <div className="space-y-1 text-left text-base">
            <p style={{ color: '#ffffff' }}>📊 <span className="font-bold">Business Model Canvas</span> <span style={{ color: '#e5e5e5' }}>• Celý model</span></p>
            <p style={{ color: '#ffffff' }}>💎 <span className="font-bold">Value Proposition Canvas</span> <span style={{ color: '#e5e5e5' }}>• Marketing</span></p>
            <p style={{ color: '#ffffff' }}>🎯 <span className="font-bold">Jasný akční plán</span> <span style={{ color: '#e5e5e5' }}>• Víš co dělat</span></p>
          </div>
        </div>

        <div className="bg-white text-black px-12 py-5 rounded-xl shadow-2xl mb-4 border-4 border-red-500">
          <p className="text-4xl font-black">BERU ČERVENOU! →</p>
        </div>

        <p className="text-lg font-bold" style={{ color: '#22c55e', textShadow: '0 0 10px rgba(34, 197, 94, 0.8), 2px 2px 4px rgba(0,0,0,0.9)' }}>
          ⚡ První 50 • Průkopnická cena • Sleva 40%
        </p>
      </div>
    ),
    copy: {
      primary: `⚡ WAKE UP CALL

Dvě pilulky. Jedna volba.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

💊 MODRÁ PILULKA:
→ Guru kurz (50 hodin)
→ Konzultant (3 měsíce)
→ Agentura (30k/měsíc)

INVESTICE: 65.000+ Kč
VÝSLEDEK: Nejasný

━━━━━━━━━━━━━━━━━━━━━━━━━━━

💊 ČERVENÁ PILULKA:
→ 2 vědecké nástroje
→ 90 minut
→ 1 papír A4

INVESTICE: 4.999 Kč  
VÝSLEDEK: Hotový plán

⚡ První 50 • Sleva 40%`,
      headline: 'Modrá nebo červená?',
      cta: 'Beru červenou'
    }
  },

  // AD #5: ALL-IN-ONE (Z Final3AdSets.tsx - ÚSPORA!)
  {
    id: 'all-in-one',
    name: 'Ad #5: ALL-IN-ONE ✅',
    category: 'Value • Úspora • All-in-one řešení',
    budget: '70 Kč/den',
    background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="text-5xl mb-6">📱</div>

        <h1 className="text-5xl font-black text-white mb-6 leading-tight drop-shadow-lg">
          Kamarád právě<br/>
          <span className="text-green-400">VYDĚLAL 100k</span>
        </h1>

        <p className="text-4xl font-bold text-gray-300 mb-7">
          Já? Řeším cashflow.
        </p>

        <div className="bg-white/95 rounded-2xl p-7 mb-7 max-w-3xl w-full shadow-2xl">
          <p className="text-2xl font-black text-gray-900 mb-5">
            Znáš to?
          </p>
          
          <div className="space-y-4 text-left text-gray-800">
            <p className="text-xl">
              ❌ <span className="font-bold">Další kurz</span> <span className="text-gray-600">(dokončený 20%)</span>
            </p>
            <p className="text-xl">
              ❌ <span className="font-bold">Další video</span> <span className="text-gray-600">("Pak to uděl��m")</span>
            </p>
            <p className="text-xl">
              ❌ <span className="font-bold">Další článek</span> <span className="text-gray-600">(100+ záložek)</span>
            </p>
            
            <div className="h-px bg-gray-300 my-4"></div>
            
            <p className="text-2xl font-black text-red-600 pt-2">
              Konzumuješ. Neděláš.
            </p>
          </div>
        </div>

        <div className="bg-green-600/20 backdrop-blur-sm rounded-xl p-4 mb-5 max-w-3xl w-full border-2 border-green-500/50 shadow-xl">
          <p className="text-xl font-black text-green-300 mb-3">
            CO KDYBY...
          </p>
          <div className="space-y-2 text-left text-lg">
            <p className="font-bold text-green-300">✓ 90 minut práce = hotový plán?</p>
            <p className="font-bold text-green-300">✓ Zítra už DĚLÁŠ (ne plánuješ)?</p>
            <p className="font-bold text-green-300">✓ Konec prokrastinace?</p>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-10 py-4 mb-5 shadow-2xl border-4 border-yellow-500">
          <p className="text-3xl font-black mb-1">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-lg font-bold">
            90 minut • Konec plánování • START akce
          </p>
        </div>

        <div className="bg-white text-black px-12 py-5 rounded-xl shadow-2xl mb-3">
          <p className="text-4xl font-black">CHCI ZAČÍT! →</p>
        </div>

        <p className="text-yellow-300 text-lg font-bold">
          🔥 Prvních 50 • Sleva 40%
        </p>
      </div>
    ),
    copy: {
      primary: `Plánuješ už 3 MĚSÍCE.

Výsledky? NULA.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Znáš to?

❌ Další kurz (dokončený 20%)
❌ Další video ("Pak to udělám")
❌ Další článek (100+ záložek)

Konzumuješ. Neděláš.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

CO KDYBY...

✓ 90 minut práce = hotový plán?
✓ Zítra už DĚLÁŠ (ne plánuješ)?
✓ Konec prokrastinace?

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA

90 minut práce.
Konec plánování.
START akce.

Business Model Canvas + Value Proposition Canvas
= Celá strategie hotová.

🔥 Prvních 50 • Sleva 40%

Přestaň plánovat. Začni dělat.`,
      headline: '3 měsíce plánuješ • 0 výsledků',
      cta: 'Chci začít'
    }
  },

  // AD #6: PRACUJU 12H (NOVÝ - HARD WORK BEZ VÝSLEDKŮ!)
  {
    id: 'work-hard-no-results',
    name: 'Ad #6: PRACUJU 12H. VÝSLEDKY? STEJNÉ. 🆕',
    category: 'Frustrace • Hard work bez výsledků',
    budget: '80 Kč/den',
    background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="text-5xl mb-6">😩</div>

        <h1 className="text-5xl font-black text-white mb-6 leading-tight drop-shadow-lg">
          Pracuju<br/>
          <span className="text-red-400">12 HODIN DENNĚ</span>
        </h1>

        <p className="text-4xl font-bold text-gray-300 mb-7">
          Výsledky? Stejné.
        </p>

        <div className="bg-white/95 rounded-2xl p-6 mb-6 max-w-3xl w-full shadow-2xl">
          <p className="text-2xl font-black text-gray-900 mb-5">
            Každý den:
          </p>
          
          <div className="space-y-4 text-left text-gray-800">
            <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
              <p className="text-xl font-bold text-orange-800">🔥 Hasiči požárů</p>
              <p className="text-base text-gray-600">Urgentní emaily. Krizová řešení.</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <p className="text-xl font-bold text-red-800">⚡ Chaos</p>
              <p className="text-base text-gray-600">Zadávám. Kontroluju. Opravuju.</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
              <p className="text-xl font-bold text-purple-800">😩 Únava</p>
              <p className="text-base text-gray-600">Večer padám. Ráno znovu.</p>
            </div>
            
            <div className="h-px bg-gray-300 my-4"></div>
            
            <p className="text-2xl font-black text-red-600 pt-2">
              Pracuješ NA firmě. Ne V firmě.
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-5 max-w-3xl w-full border-2 border-white/30 shadow-xl">
          <p className="text-xl font-black text-white mb-3">
            CO KDYBY...
          </p>
          <div className="space-y-2 text-left text-lg">
            <p className="font-bold text-white">✓ Měl systém co funguje i beze mě?</p>
            <p className="font-bold text-white">✓ Pracoval 6h a vydělal víc?</p>
            <p className="font-bold text-white">✓ Firma rostla bez vyhoření?</p>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-8 py-4 mb-4 shadow-2xl border-4 border-yellow-500">
          <p className="text-2xl font-black mb-1">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-base font-bold">
            90 minut • Jasná strategie • Efektivita
          </p>
        </div>

        <div className="bg-white text-black px-12 py-5 rounded-xl shadow-2xl mb-3 border-4 border-red-500">
          <p className="text-4xl font-black">CHCI SYSTÉM! →</p>
        </div>

        <p className="text-red-300 text-lg font-bold">
          ⏰ Prvních 50 • Sleva 40%
        </p>
      </div>
    ),
    copy: {
      primary: `Pracuju 12 HODIN DENNĚ.

Výsledky? Stejné.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Každý den:

🔥 Hasiči požárů
→ Urgentní emaily. Krizová řešení.

⚡ Chaos
→ Zadávám. Kontroluju. Opravuju.

😩 Únava
→ Večer padám. Ráno znovu.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pracuješ NA firmě. Ne V firmě.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

CO KDYBY...

✓ Měl systém co funguje i beze mě?
✓ Pracoval 6h a vydělal víc?
✓ Firma rostla bez vyhoření?

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA

Business Model Canvas + Value Proposition Canvas
= Jasná strategie místo chaosu

90 minut práce.
Systém co funguje.
Konec vyhoření.

⏰ Prvních 50 • Sleva 40%

Přestaň dřít. Začni systémově.`,
      headline: 'Pracuju 12h denně. Výsledky? Stejné.',
      cta: 'Chci systém'
    }
  },

  // AD #7: ZA 2 TÝDNY NÁJEM (NOVÝ - FINANCIAL PRESSURE!)
  {
    id: 'rent-pressure',
    name: 'Ad #7: ZA 2 TÝDNY NÁJEM. ZASE. 🆕',
    category: 'Financial Pressure • Konkrétní čísla',
    budget: '75 Kč/den',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="text-5xl mb-6">📅</div>

        <h1 className="text-5xl font-black text-white mb-6 leading-tight drop-shadow-lg">
          Za 2 týdny<br/>
          <span className="text-red-400">NÁJEM</span>
        </h1>

        <p className="text-4xl font-bold text-gray-300 mb-7">
          Zase.
        </p>

        <div className="bg-white/95 rounded-2xl p-6 mb-6 max-w-3xl w-full shadow-2xl">
          <p className="text-2xl font-black text-gray-900 mb-5">
            Každý měsíc to samé:
          </p>
          
          <div className="space-y-4 text-left text-gray-800">
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <p className="text-xl font-bold text-red-600">💸 Nájem</p>
              <p className="text-base text-gray-600">25.000 Kč (vždycky přijde)</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
              <p className="text-xl font-bold text-orange-600">📊 Odvody</p>
              <p className="text-base text-gray-600">Nový rok = zase vyšší</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-600">
              <p className="text-xl font-bold text-yellow-600">⚡ Energie</p>
              <p className="text-base text-gray-600">+30% oproti loňsku</p>
            </div>
            
            <div className="h-px bg-gray-300 my-4"></div>
            
            <p className="text-2xl font-black text-red-600 pt-2">
              A příjmy? Pořád stejné.
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-5 max-w-3xl w-full border-2 border-white/30 shadow-xl">
          <p className="text-xl font-black text-white mb-3">
            CO KDYBY...
          </p>
          <div className="space-y-2 text-left text-lg">
            <p className="font-bold text-white">✓ Příští měsíc vydělám 2× víc?</p>
            <p className="font-bold text-white">✓ Konečně vím co dělat?</p>
            <p className="font-bold text-white">✓ Nájem přestane být problém?</p>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-8 py-4 mb-4 shadow-2xl border-4 border-yellow-500">
          <p className="text-2xl font-black mb-1">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-base font-bold">
            90 minut • Jasný plán • Víc peněz
          </p>
        </div>

        <div className="bg-white text-black px-12 py-5 rounded-xl shadow-2xl mb-3 border-4 border-red-500">
          <p className="text-4xl font-black">CHCI VÍC! →</p>
        </div>

        <p className="text-yellow-300 text-lg font-bold">
          ⏰ Prvních 50 • Sleva 40%
        </p>
      </div>
    ),
    copy: {
      primary: `Za 2 týdny NÁJEM.

Zase.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Každý měsíc to samé:

💸 Nájem - 25.000 Kč (vždycky přijde)
📊 Odvody - Nový rok = zase vyšší
⚡ Energie - +30% oproti loňsku

A příjmy? Pořád stejné.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

CO KDYBY...

✓ Příští měsíc vydělám 2× víc?
✓ Konečně vím co dělat?
✓ Nájem přestane být problém?

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA

90 minut práce.
Jasný business model.
Víc peněz.

Business Model Canvas + Value Proposition Canvas
= Konečně víš KDE jsou peníze.

⏰ Prvních 50 • Sleva 40%

Přestaň řešit nájem. Začni vydělávat.`,
      headline: 'Za 2 týdny nájem. Každý měsíc to samé.',
      cta: 'Chci víc'
    }
  }
];

export default function All6AdSets() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCopy, setShowCopy] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentAd = allAdSets[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allAdSets.length - 1 : prev - 1));
    setShowCopy(false);
    setCopied(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === allAdSets.length - 1 ? 0 : prev + 1));
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
          <h1 className="text-7xl font-black text-white mb-4">
            🎯 FINÁLNÍ 7 AD SETŮ
          </h1>
          <p className="text-2xl text-gray-400 mb-6">
            4 hotové ✅ + 3 nové 🆕 • Všechny 1080x1080px • Ready to screenshot!
          </p>
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-2 border-green-400 rounded-xl p-6 max-w-4xl mx-auto">
            <p className="text-xl text-green-300">
              <span className="font-bold">✅ KOMPLET!</span> Všech 7 ad setů ready! Včetně Financial Pressure (Nájem)!
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
              {currentIndex + 1} / {allAdSets.length}
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
              <p className="text-lg text-gray-300">
                <span className="font-bold">Kategorie:</span> {currentAd.category}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-yellow-300">{currentAd.budget}</p>
            </div>
          </div>
        </div>

        {/* AD PREVIEW - 1080x1080px */}
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

        {/* Quick Navigation */}
        <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl p-8 border-2 border-white/20 max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-6 text-center">
            📊 QUICK NAVIGATION
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4 text-white">
            {allAdSets.map((ad, index) => (
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
              <span className="font-bold">💰 CELKOVÝ BUDGET:</span>
            </p>
            <p className="text-3xl font-black text-yellow-300">465 Kč/den</p>
            <p className="text-gray-300 mt-2">= ~14.000 Kč/měsíc (all 6 ad sets running)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

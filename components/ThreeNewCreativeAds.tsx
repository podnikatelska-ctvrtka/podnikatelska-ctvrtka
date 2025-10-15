// 🚀 3 NOVÉ KREATIVNÍ AD SETY - FRESH & BOLD!
// Bez kompromisů • Pattern interrupt • Emotions first

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NewAdData {
  id: string;
  name: string;
  concept: string;
  budget: string;
  background: string;
  content: React.ReactNode;
  reasoning: string;
  copy: {
    primary: string;
    headline: string;
    cta: string;
  };
}

const newCreativeAds: NewAdData[] = [
  // AD #1: STOP SCROLL - Brutální pravda
  {
    id: 'stop-scroll',
    name: 'NOVÝ Ad #1: STOP SCROLL',
    concept: 'Šokující pravda • Zastaví v scrollování',
    budget: '85 Kč/den (PREMIUM)',
    background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
    reasoning: `ŠOKUJÍCÍ = POZORNOST • PRAVDA = DŮVĚRA • URGENCE = AKCE`,
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
          
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-black">
                ✗
              </div>
              <p className="text-xl text-gray-800">
                <span className="font-bold line-through">300 stránek</span> strategických dokumentů
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

📊 Business Model Canvas
💎 Value Proposition Canvas

90 MINUT = HOTOVO.

Celý byznys model vidíš.
Marketing strategie máš.
JASNO. KONEČNĚ.

🔥 PRVNÍCH 50 LIDÍ:
→ Sleva 40% navždy
→ První v ČR tohoto typu

⏰ Neváhej. Začni dnes večer.`,
      headline: 'Celý byznys na 1 papír A4 • 90 minut',
      cta: 'Ukázat mi to'
    }
  },

  // AD #2: BEFORE MIDNIGHT - Časová urgence
  {
    id: 'before-midnight',
    name: 'NOVÝ Ad #2: BEFORE MIDNIGHT',
    concept: 'Time pressure • FOMO • Scarcity',
    budget: '80 Kč/den',
    background: 'linear-gradient(135deg, #0c4a6e 0%, #082f49 100%)',
    reasoning: `DEADLINE = AKCE • SCARCITY = VALUE • FOMO = CONVERSION`,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="bg-red-600 text-white px-10 py-4 rounded-xl mb-6 shadow-xl border-2 border-red-400 animate-pulse">
          <p className="text-3xl font-black drop-shadow-md">
            ⏰ DNES DO PŮLNOCI
          </p>
        </div>

        <h1 className="text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg">
          50 MÍST
        </h1>

        <p className="text-4xl font-bold text-yellow-400 mb-10 drop-shadow-md">
          Pak už nikdy takhle levně.
        </p>

        <div className="bg-white rounded-xl p-8 mb-8 max-w-3xl w-full shadow-2xl">
          <p className="text-2xl font-black text-gray-900 mb-6">
            PROČ JEN 50?
          </p>
          
          <div className="space-y-5 text-left">
            <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-600">
              <p className="text-lg text-gray-800">
                <span className="font-bold text-blue-700">1. První v ČR:</span> Testujeme, jestli Češi chtějí SKUTEČNOU pomoc, nebo jen další kurzy.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-600">
              <p className="text-lg text-gray-800">
                <span className="font-bold text-green-700">2. Beta cena:</span> Průkopníci dostanou 40% slevu. Navždy.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-5 border-l-4 border-orange-600">
              <p className="text-lg text-gray-800">
                <span className="font-bold text-orange-700">3. Kapacita:</span> Chci dát každému REÁLNOU zpětnou vazbu. Nezvládnu víc.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8 max-w-2xl w-full">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border-2 border-gray-600">
            <p className="text-lg text-gray-300 mb-2">Normální cena:</p>
            <p className="text-4xl font-black text-white line-through">8.333 Kč</p>
          </div>
          <div className="bg-green-600 rounded-xl p-6 shadow-xl border-4 border-green-500">
            <p className="text-lg text-white mb-2 font-bold">Tvoje cena:</p>
            <p className="text-4xl font-black text-white drop-shadow-md">4.999 Kč</p>
          </div>
        </div>

        <div className="bg-white text-black px-16 py-7 rounded-xl shadow-2xl mb-5">
          <p className="text-5xl font-black">CHCI SLEVU! →</p>
        </div>

        <p className="text-yellow-400 text-xl font-bold drop-shadow-md">
          ⚡ Zbývá {Math.floor(Math.random() * 15) + 35} míst • Končí dnes o půlnoci
        </p>
      </div>
    ),
    copy: {
      primary: `⏰ DNES DO PŮLNOCI.

50 MÍST. Pak už nikdy takhle levně.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROČ JEN 50?

1️⃣ PRVNÍ V ČR
Testuju, jestli Češi chtějí SKUTEČNOU pomoc.

2️⃣ BETA CENA  
Průkopníci = 40% sleva NAVŽDY.

3️⃣ REÁLNÁ ZPĚTNÁ VAZBA
Chci pomoct každému osobně. Nezvládnu víc.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 NORMÁLNĚ: 8.333 Kč
💎 TVOJE CENA: 4.999 Kč

UŠETŘÍŠ: 3.334 Kč

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA:
→ Business Model Canvas (poprvé CZ)
→ Value Proposition Canvas (poprvé CZ)
→ 90 minut = HOTOVO

⏰ DEADLINE: DNES O PŮLNOCI
Po 50. člověku? Plná cena.

Není čas váhat.`,
      headline: '50 míst • Sleva 40% • Jen dnes',
      cta: 'Chci slevu'
    }
  },

  // AD #3: THE MATRIX - Červená vs Modrá
  {
    id: 'matrix',
    name: 'NOVÝ Ad #3: THE MATRIX',
    concept: 'Volba • Transformace • Wake up call',
    budget: '75 Kč/den',
    background: 'linear-gradient(135deg, #001a00 0%, #003300 50%, #000000 100%)',
    reasoning: `VOLBA = ENGAGEMENT • METAFORA = STICKY • KONTRAST = CLARITY`,
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
→ Konzultant (3 měsíce čekání)  
→ Agentura (30k/měsíc)

INVESTICE: 65.000+ Kč
VÝSLEDEK: Nejasný

━━━━━━━━━━━━━━━━━━━━━━━━━━━

💊 ČERVENÁ PILULKA:

→ 2 vědecké nástroje (CZ PREMIÉRA)
→ 90 minut práce
→ 1 papír A4

INVESTICE: 4.999 Kč  
VÝSLEDEK: Hotový plán

━━━━━━━━━��━━━━━━━━━━━━━━━━━

CO DOSTANEŠ S ČERVENOU:

📊 BUSINESS MODEL CANVAS
Celý tvůj byznys model na 1 stránce.

💎 VALUE PROPOSITION CANVAS
Marketing strategie sorted.

🎯 JASNÝ AKČNÍ PLÁN
Víš co dělat zítra ráno.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ PRVNÍ 50 LIDÍ
→ Průkopnická cena (sleva 40%)
→ První v ČR tohoto typu

Která pilulka to bude?`,
      headline: 'Modrá nebo Červená? • Tvoje volba',
      cta: 'Beru červenou'
    }
  }
];

export default function ThreeNewCreativeAds() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? newCreativeAds.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === newCreativeAds.length - 1 ? 0 : prev + 1));
  };

  const currentAd = newCreativeAds[currentIndex];

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-white mb-4">
            🚀 3 NOVÉ KREATIVNÍ AD SETY
          </h1>
          <p className="text-2xl text-gray-300 mb-6">
            Fresh angles • Pattern interrupt • Emotivní engagement
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm">
              🆕 Stop Scroll (Šokující pravda)
            </div>
            <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-sm">
              🆕 Before Midnight (FOMO)
            </div>
            <div className="bg-green-600 text-white px-4 py-2 rounded-full font-bold text-sm">
              🆕 The Matrix (Volba)
            </div>
          </div>
        </div>

        {/* Ad Preview */}
        <div className="mb-8">
          <div className="bg-gray-800 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-black text-white mb-1">
                  {currentAd.name}
                </h2>
                <p className="text-lg text-gray-300">
                  {currentAd.concept}
                </p>
              </div>
              <div className="text-right">
                <div className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold">
                  {currentAd.budget}
                </div>
              </div>
            </div>

            <div className="bg-blue-900/30 border-l-4 border-blue-500 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-300">
                <span className="font-bold text-blue-400">REASONING:</span> {currentAd.reasoning}
              </p>
            </div>

            {/* Ad Visual - 1080x1080 pro screenshot */}
            <div 
              className="rounded-lg overflow-hidden shadow-2xl mx-auto"
              style={{ 
                background: currentAd.background,
                width: '1080px',
                height: '1080px',
                maxWidth: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {currentAd.content}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex gap-2">
              {newCreativeAds.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Copy Details */}
        <div className="bg-gray-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">📝 Kompletní copy:</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-xl p-6">
              <h4 className="text-lg font-bold text-blue-400 mb-3">Primary Text:</h4>
              <p className="text-sm text-gray-300 whitespace-pre-line font-mono">
                {currentAd.copy.primary}
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-xl p-6">
                <h4 className="text-lg font-bold text-green-400 mb-3">Headline:</h4>
                <p className="text-base text-white font-bold">
                  {currentAd.copy.headline}
                </p>
              </div>

              <div className="bg-gray-900 rounded-xl p-6">
                <h4 className="text-lg font-bold text-yellow-400 mb-3">CTA Button:</h4>
                <p className="text-base text-white font-bold">
                  {currentAd.copy.cta}
                </p>
              </div>

              <div className="bg-purple-900/50 border-2 border-purple-500 rounded-xl p-6">
                <h4 className="text-lg font-bold text-purple-300 mb-3">💡 Strategy:</h4>
                <p className="text-sm text-gray-300">
                  {currentAd.reasoning}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

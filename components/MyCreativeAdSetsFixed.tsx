// 🎨 MÉ KREATIVNÍ AD SETY - STEJNÝ FORMÁT JAKO TVOJE!
// Fresh angles • Neotřelé • Překvapivé!

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CreativeAdData {
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

const myCreativeAds: CreativeAdData[] = [
  // AD #1: ANTI-GURU - Kontrast proti "expertům"
  {
    id: 'anti-guru',
    name: 'MÉ Ad #1: ANTI-GURU',
    concept: 'Kontrast: Ty vs Všichni "experti"',
    budget: '80 Kč/den (HIGH BET)',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    reasoning: `KONTRAST = POZORNOST • DŮVĚRYHODNOST • SCARCITY`,
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

  // AD #2: NÚMEROS! - Čísla, čísla, čísla!
  {
    id: 'numbers',
    name: 'MÉ Ad #2: NÚMEROS!',
    concept: 'Čísla jsou sexy • Konkrétnost wins',
    budget: '75 Kč/den',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    reasoning: `ČÍSLA = KONKRÉTNOST • ROI = NO-BRAINER`,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="bg-blue-600 text-white px-8 py-3 rounded-xl mb-6">
          <p className="text-2xl font-black">
            📊 ČÍSLA, KTERÁ MLUVÍ ZA VŠE
          </p>
        </div>

        <h1 className="text-8xl font-black text-white mb-6 leading-none">
          90<span className="text-blue-400">min</span>
        </h1>

        <p className="text-3xl text-gray-300 mb-8">
          To je všechno, co potřebuješ.
        </p>

        <div className="bg-white rounded-xl p-7 mb-7 max-w-3xl w-full">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <p className="text-6xl font-black text-blue-600">9</p>
              <p className="text-lg text-gray-700 mt-2">Stavebních<br/>prvků</p>
            </div>
            <div className="text-center">
              <p className="text-6xl font-black text-green-600">2</p>
              <p className="text-lg text-gray-700 mt-2">Vědecké<br/>nástroje</p>
            </div>
            <div className="text-center">
              <p className="text-6xl font-black text-orange-600">1</p>
              <p className="text-lg text-gray-700 mt-2">Papír<br/>A4</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-lg p-5 border-2 border-red-300">
            <p className="text-lg text-gray-700 mb-3 font-bold">
              VS jiné řešení:
            </p>
            <div className="space-y-2 text-left text-base">
              <p>• Guru kurz: <span className="line-through">50 hodin + 5.000 Kč</span></p>
              <p>• Konzultant: <span className="line-through">3 měsíce čekání + 15.000 Kč</span></p>
              <p>• Agentura: <span className="line-through">30.000+ Kč/měsíc</span></p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-12 py-6 mb-7">
          <p className="text-5xl font-black">
            4.999 Kč
          </p>
          <p className="text-xl font-bold mt-2">
            All-in-one řešení • Sleva 40%
          </p>
        </div>

        <div className="mb-6">
          <p className="text-4xl font-black text-white mb-2">
            Podnikatelská Čtvrtka
          </p>
          <p className="text-xl text-gray-300">
            Čísla nelžou • Funguje to
          </p>
        </div>

        <div className="bg-white text-black px-16 py-7 rounded-xl shadow-2xl mb-5">
          <p className="text-5xl font-black">CHCI ČÍSLA! →</p>
        </div>

        <p className="text-yellow-300 text-2xl font-bold">
          ⚡ 50 míst • Průkopnická cena
        </p>
      </div>
    ),
    copy: {
      primary: `90 MINUT.
To je všechno.

9 stavebních prvků
2 vědecké nástroje  
1 papír A4

━━━━━━━━━━━━━━━━━━━━━━━━━━━

VS JINÉ ŘEŠENÍ:

❌ Guru kurz: 50 hodin + 5.000 Kč
❌ Konzultant: 3 měsíce + 15.000 Kč
❌ Agentura: 30.000+ Kč/měsíc

CELKEM: 65.000+ Kč a stejně nejasno.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ PODNIKATELSKÁ ČTVRTKA:

90 minut práce = 4.999 Kč
Hotový byznys model + marketing strategie

UŠETŘÍTE: 60.000+ Kč

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Čísla nelžou. Funguje to.

🔥 Prvních 50 • Sleva 40%`,
      headline: 'Čísla, která mluví za vše',
      cta: 'Chci čísla'
    }
  },

  // AD #3: VISUAL MAGIC - Čtvrtka jako metafora
  {
    id: 'visual-simple',
    name: 'MÉ Ad #3: VISUAL MAGIC',
    concept: 'Čtvrtka jako metafora • Visual storytelling',
    budget: '70 Kč/den',
    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    reasoning: `VISUAL = ZAPAMATOVATELNÉ • SIMPLICITY = APPEAL`,
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

        <h1 className="text-6xl font-black text-white mb-4 leading-tight">
          Celý tvůj byznys<br/>
          <span className="text-yellow-300">NA JEDNÉ STRÁNCE</span>
        </h1>

        <p className="text-2xl text-gray-300 mb-8 max-w-2xl">
          Ne 300 stránek strategických dokumentů.<br/>
          Ne 50 hodin online kurzů.<br/>
          <span className="text-white font-bold">Jenom 1 papír A4.</span>
        </p>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-7 mb-7 max-w-3xl w-full border-2 border-white/30">
          <p className="text-3xl font-bold mb-5" style={{ color: '#fbbf24', textShadow: '2px 2px 6px rgba(0,0,0,0.9)' }}>
            PROČ TO FUNGUJE?
          </p>
          <div className="space-y-3 text-left">
            <p className="text-xl" style={{ color: '#ffffff' }}>
              ✓ <span className="font-bold">Vidíš všechno najednou</span> <span style={{ color: '#e5e5e5' }}>(ne 50 záložek v browseru)</span>
            </p>
            <p className="text-xl" style={{ color: '#ffffff' }}>
              ✓ <span className="font-bold">Žádné zbytečnosti</span> <span style={{ color: '#e5e5e5' }}>(jen co potřebuješ)</span>
            </p>
            <p className="text-xl" style={{ color: '#ffffff' }}>
              ✓ <span className="font-bold">Měníš strategii za 5 minut</span> <span style={{ color: '#e5e5e5' }}>(ne 3 týdny)</span>
            </p>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-10 py-6 mb-7 shadow-xl">
          <p className="text-4xl font-black">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-2xl mt-2 font-bold">
            Byznys model + Marketing • 90 minut
          </p>
        </div>

        <div className="bg-white text-black px-16 py-7 rounded-xl shadow-2xl mb-5">
          <p className="text-5xl font-black">CHCI ČTVRTKU! →</p>
        </div>

        <p className="text-yellow-300 text-2xl font-bold">
          📄 Prvních 50 • Jednoduchý = lepší
        </p>
      </div>
    ),
    copy: {
      primary: `CELÝ BYZNYS NA JEDNÉ STRÁNCE.

Ne 300 stránek dokumentů.
Ne 50 hodin online kurzů.
Ne 3 měsíce čekání na konzultaci.

JENOM 1 PAPÍR A4.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROČ TO FUNGUJE?

✓ Vidíš všechno najednou
  (ne 50 záložek v browseru)

✓ Žádné zbytečnosti
  (jen co potřebuješ)

✓ Měníš strategii za 5 minut
  (ne 3 týdny)

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA:

• Byznys model na A4
• Marketing strategie na A4
• 90 minut práce
• Hotovo

Jednoduchý = lepší.

🔥 Prvních 50 • Sleva 40%`,
      headline: 'Celý byznys na A4',
      cta: 'Chci čtvrtku'
    }
  }
];

export default function MyCreativeAdSetsFixed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCopy, setShowCopy] = useState(false);

  const currentAd = myCreativeAds[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? myCreativeAds.length - 1 : prev - 1));
    setShowCopy(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === myCreativeAds.length - 1 ? 0 : prev + 1));
    setShowCopy(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">
            🎨 MÉ KREATIVNÍ AD SETY
          </h1>
          <p className="text-2xl text-gray-400 mb-6">
            Podle mého názoru • Bez odkývávání • Fresh angles
          </p>
          <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-xl p-6 max-w-3xl mx-auto">
            <p className="text-xl text-yellow-300 font-bold mb-2">
              💡 FILOZOFIE:
            </p>
            <p className="text-base text-white leading-relaxed">
              Neokoukávám tvé reklamy. Myslím jinak. Zkouším neotřelé úhly. 
              Možná to bude shit, možná ne - ale aspoň to není "Ano, pane!" 🤷‍♂️
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={goToPrevious}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Předchozí
          </button>
          
          <div className="text-white text-xl font-bold">
            {currentIndex + 1} / {myCreativeAds.length}
          </div>
          
          <button
            onClick={goToNext}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            Další
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Ad Preview */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-white/5 rounded-2xl p-8 border-2 border-white/10">
            {/* Ad Info */}
            <div className="mb-6">
              <h2 className="text-3xl font-black text-yellow-400 mb-2">{currentAd.name}</h2>
              <p className="text-xl text-white mb-2">{currentAd.concept}</p>
              <p className="text-lg text-gray-400">{currentAd.budget}</p>
              <p className="text-base text-purple-400 italic mt-2">{currentAd.reasoning}</p>
            </div>

            {/* Ad Visual */}
            <div 
              className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 mx-auto"
              style={{ 
                background: currentAd.background,
                width: '1080px',
                height: '1080px',
                maxWidth: '100%'
              }}
            >
              {currentAd.content}
            </div>

            {/* Toggle Copy */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowCopy(!showCopy)}
                className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-black text-xl hover:bg-yellow-300 transition-colors"
              >
                {showCopy ? '🔼 Skrýt AD COPY' : '📄 Zobrazit AD COPY'}
              </button>
            </div>

            {/* Ad Copy */}
            {showCopy && (
              <div className="mt-6 bg-black/40 rounded-xl p-6 border-2 border-yellow-400">
                <h3 className="text-2xl font-black text-yellow-400 mb-4">📄 AD COPY:</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Primary Text:</p>
                    <pre className="text-white whitespace-pre-wrap text-base leading-relaxed bg-black/30 p-4 rounded">
                      {currentAd.copy.primary}
                    </pre>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Headline:</p>
                    <p className="text-white text-xl font-bold">{currentAd.copy.headline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">CTA:</p>
                    <p className="text-white text-lg font-bold">{currentAd.copy.cta}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-2xl p-8 border-4 border-purple-400">
          <h2 className="text-3xl font-black text-white mb-4">
            🎯 PROČ TYHLE 3?
          </h2>
          <div className="space-y-4 text-white">
            <div>
              <p className="text-xl font-bold text-yellow-300 mb-2">Ad #1: ANTI-GURU</p>
              <p className="text-base">
                • Kontrast proti "expertům" = pozornost<br/>
                • Autenticita = důvěra<br/>
                • "První v ČR" = unikátnost
              </p>
            </div>
            <div>
              <p className="text-xl font-bold text-yellow-300 mb-2">Ad #2: NÚMEROS</p>
              <p className="text-base">
                • Čísla = konkrétnost<br/>
                • ROI kalkulace = no-brainer<br/>
                • Value stacking = wow faktor
              </p>
            </div>
            <div>
              <p className="text-xl font-bold text-yellow-300 mb-2">Ad #3: VISUAL MAGIC</p>
              <p className="text-base">
                • Čtvrtka = visual metaphor<br/>
                • "Celý byznys na A4" = zapamatovatelné<br/>
                • Simplicity = appeal
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-lg">
            💪 Možná to bude shit, možná ne.<br/>
            Ale aspoň jsem se snažil myslet jinak! 🔥
          </p>
        </div>
      </div>
    </div>
  );
}

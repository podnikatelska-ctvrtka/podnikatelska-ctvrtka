import { useState } from 'react';
import { ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';

interface AdData {
  id: string;
  name: string;
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

const antiGuruVariants: AdData[] = [
  // ORIGINAL: Modrá verze (SAFE)
  {
    id: 'anti-guru-blue',
    name: 'ANTI-GURU - MODRÁ (SAFE)',
    concept: 'Profesionální • Důvěryhodná • B2B friendly',
    budget: '80 Kč/den',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    reasoning: `MODRÁ = DŮVĚRA • SAFE BET • B2B FRIENDLY`,
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

  // NEW: Černá verze (BOLD)
  {
    id: 'anti-guru-dark',
    name: 'ANTI-GURU - ČERNÁ (BOLD) 🔥',
    concept: 'Odvážná • Disruptive • Rebel positioning',
    budget: '80 Kč/den',
    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #0a0a0a 100%)',
    reasoning: `ČERNÁ = ODVAHA • HIGH CONTRAST • MEMORABLE • ANTI-ESTABLISHMENT`,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="bg-red-600 text-white px-10 py-4 rounded-lg mb-6 shadow-2xl border-2 border-red-500">
          <p className="text-3xl font-black">
            ⚠️ PRAVDA, KTEROU NIKDO NEŘEKNE
          </p>
        </div>

        <h1 className="text-6xl font-black text-white mb-8 leading-tight" style={{ textShadow: '0 0 30px rgba(255,255,255,0.3)' }}>
          V Česku žádná<br/>
          <span className="text-red-500">REÁLNÁ POMOC</span><br/>
          podnikatelům není.
        </h1>

        <div className="bg-white rounded-xl p-8 mb-7 max-w-3xl w-full shadow-2xl">
          <div className="space-y-4 text-left">
            <p className="text-2xl text-gray-800">
              <span className="text-black">✅ <span className="font-bold">Guru kurzy?</span> Máme.</span> <span className="text-gray-500">(50 hodin teorie, nula praxe)</span>
            </p>
            <p className="text-2xl text-gray-800">
              <span className="text-black">✅ <span className="font-bold">AI automaty?</span> Máme.</span> <span className="text-gray-500">(Nic neřeší)</span>
            </p>
            <p className="text-2xl text-gray-800">
              <span className="text-black">✅ <span className="font-bold">Online konzultanti?</span> Máme.</span> <span className="text-gray-500">(Obecné rady)</span>
            </p>
            <div className="pt-4 mt-4 border-t-2 border-gray-200">
              <p className="text-3xl font-black text-red-600">
                ❌ KONKRÉTNÍ METODA? NIKDE.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-white rounded-xl px-10 py-6 mb-7 shadow-2xl">
          <p className="text-4xl font-black mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            TAK JSME TO VYTVOŘILI.
          </p>
          <p className="text-2xl font-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            První v ČR • Konečně realita • Bez keců
          </p>
        </div>

        <div className="mb-7">
          <p className="text-5xl font-black text-white mb-3" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-2xl text-gray-300">
            2 nástroje poprvé v češtině • 90 minut • Hotovo
          </p>
        </div>

        <div className="bg-yellow-400 text-black px-16 py-7 rounded-xl shadow-2xl mb-5 border-3 border-yellow-500">
          <p className="text-5xl font-black">CHCI VIDĚT! →</p>
        </div>

        <div className="bg-red-600 text-white px-8 py-3 rounded-full">
          <p className="text-2xl font-bold">
            🔥 Jenom 50 lidí • První v ČR
          </p>
        </div>
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
  }
];

export default function AntiGuruDarkVersion() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCopy, setShowCopy] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentAd = antiGuruVariants[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? antiGuruVariants.length - 1 : prev - 1));
    setShowCopy(false);
    setCopied(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === antiGuruVariants.length - 1 ? 0 : prev + 1));
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
          <h1 className="text-5xl font-black text-white mb-4">
            🎨 ANTI-GURU: MODRÁ vs ČERNÁ
          </h1>
          <p className="text-2xl text-gray-400 mb-6">
            Safe professional design vs Bold rebel positioning
          </p>
          <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-xl p-6 max-w-3xl mx-auto">
            <p className="text-xl text-yellow-300">
              <span className="font-bold">OBSAH = 10/10 ✅</span><br/>
              Teď testujeme který DESIGN funguje lépe!
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
              {currentIndex + 1} / {antiGuruVariants.length}
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-3xl font-bold text-white">{currentAd.name}</h3>
            <span className={`px-6 py-3 rounded-full text-xl font-bold ${
              currentAd.id === 'anti-guru-blue' 
                ? 'bg-blue-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {currentAd.id === 'anti-guru-blue' ? 'SAFE' : 'BOLD 🔥'}
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <p className="text-gray-300 text-lg">
              <span className="font-bold">Koncept:</span> {currentAd.concept}
            </p>
            <p className="text-gray-300 text-lg">
              <span className="font-bold">Budget:</span> {currentAd.budget}
            </p>
          </div>
          <p className="text-yellow-300 mt-3">
            {currentAd.reasoning}
          </p>
        </div>

        {/* VELKÝ AD PREVIEW - CENTROVANÝ */}
        <div className="flex items-center justify-center mb-10">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30"
            style={{ 
              width: '900px',
              height: '900px',
              background: currentAd.background
            }}
          >
            {currentAd.content}
          </div>
        </div>

        {/* Analysis Section */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-8 border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-6">
              📊 Design Analýza
            </h3>
            
            {currentAd.id === 'anti-guru-blue' ? (
              <div className="space-y-6 text-white">
                <div>
                  <p className="font-bold text-blue-300 mb-3 text-xl">✅ CO FUNGUJE:</p>
                  <ul className="space-y-2 text-lg text-gray-300">
                    <li>• Modrá = důvěra & profesionalita</li>
                    <li>• Safe pro B2B audience</li>
                    <li>• Čitelné, známé, bezpečné</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-yellow-300 mb-3 text-xl">🟡 CO BY MOHLO BÝT LEPŠÍ:</p>
                  <ul className="space-y-2 text-lg text-gray-300">
                    <li>• Box se trochu ztrácí na modrém pozadí</li>
                    <li>• Méně "punchové" než obsah</li>
                    <li>• Možná moc korporátní pro rebel message</li>
                  </ul>
                </div>
                <div className="bg-blue-500/30 rounded-lg p-6 mt-6">
                  <p className="font-bold text-white mb-3 text-xl">📈 PREDIKCE:</p>
                  <p className="text-lg text-gray-200">
                    CTR: 2.0-2.5% • Cost per lead: 50-65 Kč<br/>
                    <span className="text-blue-300 font-bold">Solidní, bezpečná volba pro start!</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-white">
                <div>
                  <p className="font-bold text-green-300 mb-3 text-xl">✅ CO FUNGUJE:</p>
                  <ul className="space-y-2 text-lg text-gray-300">
                    <li>• Černá = odvaha, rebel positioning</li>
                    <li>• Bílý box = MAXIMÁLNÍ kontrast +++</li>
                    <li>• Design matches odvážný obsah!</li>
                    <li>• Výrazně zapamatovatelné</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-yellow-300 mb-3 text-xl">⚠️ RIZIKA:</p>
                  <ul className="space-y-2 text-lg text-gray-300">
                    <li>• Může polarizovat (ale to chceš!)</li>
                    <li>• Odvážnější = menší reach možná</li>
                    <li>• Méně "safe" pro konzervativní</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-lg p-6 mt-6">
                  <p className="font-bold text-white mb-3 text-xl">🔥 PREDIKCE:</p>
                  <p className="text-lg text-gray-200">
                    CTR: 2.5-3.5% • Cost per lead: 40-55 Kč<br/>
                    <span className="text-orange-300 font-bold">Vyšší CTR, ale polarizuje audience!</span>
                  </p>
                </div>
              </div>
            )}
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

        {/* Comparison Summary */}
        <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-red-500/20 rounded-2xl p-8 border-2 border-white/20 max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-6 text-center">
            🎯 DOPORUČENÍ PRO TESTOVÁNÍ
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-500/20 rounded-xl p-6 border-2 border-blue-400">
              <h3 className="text-2xl font-bold text-blue-300 mb-3">
                🔵 MODRÁ (SAFE)
              </h3>
              <p className="text-white mb-4">
                <span className="font-bold">Pro koho:</span><br/>
                B2B, konzervativní, starší audience (35+)
              </p>
              <p className="text-white mb-4">
                <span className="font-bold">Výhody:</span><br/>
                Důvěryhodná, profesionální, safe bet
              </p>
              <p className="text-green-300 font-bold text-xl">
                ✅ ZAČNI S TOUHLE!
              </p>
            </div>

            <div className="bg-red-500/20 rounded-xl p-6 border-2 border-red-400">
              <h3 className="text-2xl font-bold text-red-300 mb-3">
                ⚫ ČERNÁ (BOLD) 🔥
              </h3>
              <p className="text-white mb-4">
                <span className="font-bold">Pro koho:</span><br/>
                Mladší (25-40), odvážnější, anti-establishment
              </p>
              <p className="text-white mb-4">
                <span className="font-bold">Výhody:</span><br/>
                Zapamatovatelná, high CTR, rebel positioning
              </p>
              <p className="text-yellow-300 font-bold text-xl">
                🔥 TESTUJ AŽ POTOM!
              </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h4 className="text-xl font-bold text-white mb-4">💡 MŮJ TESTOVACÍ PLÁN:</h4>
            <div className="space-y-3 text-gray-300 text-lg">
              <p>
                <span className="text-white font-bold">Týden 1:</span> Pusť MODROU s 80 Kč/den
              </p>
              <p>
                <span className="text-white font-bold">Den 3-5:</span> Analyzuj CTR + Cost per lead
              </p>
              <p>
                <span className="text-white font-bold">Týden 2:</span> Přidej ČERNOU s 50/50 budgetem (40 Kč každá)
              </p>
              <p>
                <span className="text-white font-bold">Po 7 dnech:</span> Vyhodnoť a zdvoj budget na vítěze
              </p>
              <p className="text-yellow-300 font-bold mt-4 text-xl">
                🎯 Očekávám, že ČERNÁ bude mít vyšší CTR, ale MODRÁ lepší konverzi!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

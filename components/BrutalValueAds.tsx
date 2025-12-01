// 🔥 BRUTAL VALUE ADS - Konkrétní + Empatické
// Format inspirovaný MATRIX (čitelnost, velké fonty)
// Real triggers: peníze, nájem, klid, život

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BrutalAdData {
  id: string;
  name: string;
  category: string;
  realTrigger: string;
  background: string;
  content: React.ReactNode;
  copy: {
    primary: string;
    headline: string;
    cta: string;
  };
}

const brutalValueAds: BrutalAdData[] = [
  // ========================================
  // VALUE #1: ACHIEVE - VÍC PENĚZ (konkrétní outcome)
  // ========================================
  {
    id: 'achieve-more-money',
    name: 'VALUE #1: VÍC PENĚZ',
    category: 'ACHIEVE • Desire • Hope',
    realTrigger: 'Chci víc peněz z byznysu',
    background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="text-7xl mb-5">💰</div>

        <h1 className="text-6xl font-black text-white mb-5 leading-tight drop-shadow-lg">
          CHCEŠ<br/>
          <span className="text-green-300">VÍC PENĚZ</span><br/>
          Z BYZNYSU?
        </h1>

        <p className="text-2xl text-gray-300 mb-6">
          Ne teorie. Konkrétní systém.
        </p>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-5 max-w-3xl w-full border-2 border-white/30">
          <p className="text-2xl font-black text-white mb-4">
            CO KDYBY ZA 90 MINUT:
          </p>
          
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <span className="text-3xl">💎</span>
              <div>
                <p className="text-xl font-bold text-white">Věděl/a přesně komu prodávat</p>
                <p className="text-base text-gray-300">
                  Ne "všem". Správným zákazníkům, kteří platí víc.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-3xl">📈</span>
              <div>
                <p className="text-xl font-bold text-white">Viděl/a kde jsou peníze</p>
                <p className="text-base text-gray-300">
                  Nové revenue streams. Cross-sell. Upsell. Růst.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-3xl">🎯</span>
              <div>
                <p className="text-xl font-bold text-white">Měl/a jasný plán na růst</p>
                <p className="text-base text-gray-300">
                  Ne doufání. Konkrétní kroky. Jasný směr.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl px-10 py-5 mb-5 shadow-xl">
          <p className="text-4xl font-black mb-2">
            = VÍC PRODEJŮ
          </p>
          <p className="text-2xl">
            Víš komu • Víš co • Víš jak
          </p>
        </div>

        <div className="mb-4">
          <p className="text-3xl font-black text-white mb-1">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-xl text-gray-300">
            90 minut • Hotový plán
          </p>
        </div>

        <div className="bg-white text-black px-14 py-6 rounded-xl shadow-2xl mb-3">
          <p className="text-4xl font-black">CHCI VÍC PENĚZ! →</p>
        </div>

        <p className="text-green-300 text-xl font-bold">
          🔥 Prvních 50 • Sleva 40%
        </p>
      </div>
    ),
    copy: {
      primary: `CHCEŠ VÍC PENĚZ Z BYZNYSU?

Ne teorie. Konkrétní systém.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

CO KDYBY ZA 90 MINUT:

💎 Věděl/a přesně komu prodávat
→ Ne "všem". Správným zákazníkům, kteří platí víc.

📈 Viděl/a kde jsou peníze
→ Nové revenue streams. Cross-sell. Upsell. Růst.

🎯 Měl/a jasný plán na růst
→ Ne doufání. Konkrétní kroky. Jasný směr.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

= VÍC PRODEJŮ

Víš komu • Víš co • Víš jak

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA
90 minut • Hotový plán

🔥 Prvních 50 • Sleva 40%`,
      headline: 'Víc peněz z byznysu',
      cta: 'Chci víc peněz'
    }
  },

  // ========================================
  // VALUE #2: AVOID - NÁJEM BEZ STRESU
  // ========================================
  {
    id: 'avoid-rent-stress',
    name: 'VALUE #2: NÁJEM BEZ STRESU',
    category: 'AVOID • Pain • Fear',
    realTrigger: 'Nechci se bát nájmu každý měsíc',
    background: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="text-7xl mb-5">🏢</div>

        <h1 className="text-6xl font-black text-white mb-5 leading-tight drop-shadow-lg">
          NECHCEŠ SE<br/>
          <span className="text-orange-300">BÁT NÁJMU</span><br/>
          KAŽDÝ MĚSÍC?
        </h1>

        <p className="text-2xl text-gray-300 mb-6">
          Tohle znáš:
        </p>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-5 max-w-3xl w-full border-2 border-white/30">
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <span className="text-3xl">😰</span>
              <div>
                <p className="text-xl font-bold text-white">20. v měsíci = panika</p>
                <p className="text-base text-gray-300">
                  „Za 10 dní nájem. Odkud ty peníze vezmu?"
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-3xl">💸</span>
              <div>
                <p className="text-xl font-bold text-white">Nepravidelný cashflow</p>
                <p className="text-base text-gray-300">
                  Jeden měsíc OK. Další měsíc prázdno. Stres.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-3xl">🔴</span>
              <div>
                <p className="text-xl font-bold text-white">Nevíš odkud přijdou zákazníci</p>
                <p className="text-base text-gray-300">
                  Doufáš. Modlíš se. Žádný systém.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl px-10 py-5 mb-5 shadow-xl border-2 border-blue-400">
          <p className="text-3xl font-black mb-3">
            CO KDYBY MÍT SYSTÉM?
          </p>
          <div className="space-y-2 text-left text-lg">
            <p>✅ Víš komu prodávat = pravidelní zákazníci</p>
            <p>✅ Víš jak získat zákazníky = stabilní cashflow</p>
            <p>✅ Víš kde jsou peníze = žádná panika</p>
            <p className="text-cyan-300 font-bold text-xl">✅ Nájem? Bez stresu.</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-3xl font-black text-white mb-1">
            ZA 90 MINUT = SYSTÉM
          </p>
          <p className="text-xl text-gray-300">
            Podnikatelská Čtvrtka • 4.999 Kč
          </p>
        </div>

        <div className="bg-white text-black px-14 py-6 rounded-xl shadow-2xl mb-3">
          <p className="text-4xl font-black">CHCI KLID! →</p>
        </div>

        <p className="text-orange-300 text-xl font-bold">
          🔥 Přestaň se bát • Prvních 50
        </p>
      </div>
    ),
    copy: {
      primary: `NECHCEŠ SE BÁT NÁJMU KAŽDÝ MĚSÍC?

Tohle znáš:

━━━━━━━━━━━━━━━━━━━━━━━━━━━

😰 20. v měsíci = panika
→ „Za 10 dní nájem. Odkud ty peníze vezmu?"

💸 Nepravidelný cashflow
→ Jeden měsíc OK. Další měsíc prázdno. Stres.

🔴 Nevíš odkud přijdou zákazníci
→ Doufáš. Modlíš se. Žádný systém.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

CO KDYBY MÍT SYSTÉM?

✅ Víš komu prodávat = pravidelní zákazníci
✅ Víš jak získat zákazníky = stabilní cashflow
✅ Víš kde jsou peníze = žádná panika
✅ Nájem? Bez stresu.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

ZA 90 MINUT = SYSTÉM

PODNIKATELSKÁ ČTVRTKA
90 minut • 4.999 Kč

🔥 Přestaň se bát • Prvních 50`,
      headline: 'Nájem bez stresu',
      cta: 'Chci klid'
    }
  },

  // ========================================
  // VALUE #3: TRUTH - MARKETA SI KOUPILA (hope + social proof)
  // ========================================
  {
    id: 'marketa-hope',
    name: 'VALUE #3: MARKETA SI KOUPILA',
    category: 'HOPE • Social proof • You can too',
    realTrigger: 'Pokud to funguje pro ni, může pro mě',
    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="text-7xl mb-5">✨</div>

        <h1 className="text-6xl font-black text-white mb-5 leading-tight drop-shadow-lg">
          MARKETA<br/>
          <span className="text-blue-300">SI KOUPILA</span><br/>
          ZA PODNIKÁNÍ
        </h1>

        <p className="text-2xl text-gray-300 mb-6">
          Ty taky můžeš.
        </p>

        <div className="bg-white/95 rounded-2xl p-6 mb-5 max-w-3xl w-full">
          <div className="space-y-4">
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <p className="text-xl font-bold text-gray-900 mb-2">
                PŘED ČTVRTKOU:
              </p>
              <div className="space-y-1 text-base text-gray-700 text-left">
                <p>• Pracovala 60h týdně v korporátu</p>
                <p>• „Chci vlastní byznys, ale nevím jak"</p>
                <p>• Bála se začít (co když to nevyjde?)</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
              <p className="text-xl font-bold text-gray-900 mb-2">
                PO ČTVRTCE:
              </p>
              <div className="space-y-1 text-base text-gray-700 text-left">
                <p>• <strong>Jasný plán:</strong> Konzultace pro e-shopy (marketing)</p>
                <p>• <strong>Jasný segment:</strong> E-shopy 5-20M obratu</p>
                <p>• <strong>Jasná hodnota:</strong> Zvýším jejich ROAS o 30%</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-5 border-2 border-blue-500">
              <p className="text-2xl font-black text-blue-700 mb-2">
                📈 VÝSLEDEK:
              </p>
              <p className="text-lg text-gray-800">
                <strong>3 klienti první měsíc</strong><br/>
                Vlastní byznys. Vlastní pravidla. Koupila si byt.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl px-10 py-5 mb-5 shadow-xl">
          <p className="text-3xl font-black mb-2">
            TY TAKY MŮŽEŠ
          </p>
          <p className="text-xl">
            Za 90 minut • Jasný plán • Tvůj byznys
          </p>
        </div>

        <div className="mb-4">
          <p className="text-3xl font-black text-white mb-1">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-xl text-gray-300">
            Stejný systém. Tvoje situace.
          </p>
        </div>

        <div className="bg-white text-black px-14 py-6 rounded-xl shadow-2xl mb-3">
          <p className="text-4xl font-black">CHCI TO TAKY! →</p>
        </div>

        <p className="text-blue-300 text-xl font-bold">
          🔥 Pokud Marketa, tak i ty • Prvních 50
        </p>
      </div>
    ),
    copy: {
      primary: `MARKETA SI KOUPILA ZA PODNIKÁNÍ.

Ty taky můžeš.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PŘED ČTVRTKOU:

• Pracovala 60h týdně v korporátu
• „Chci vlastní byznys, ale nevím jak"
• Bála se začít (co když to nevyjde?)

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PO ČTVRTCE:

• JASNÝ PLÁN: Konzultace pro e-shopy (marketing)
• JASNÝ SEGMENT: E-shopy 5-20M obratu
• JASNÁ HODNOTA: Zvýším jejich ROAS o 30%

━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 VÝSLEDEK:

3 klienti první měsíc
Vlastní byznys. Vlastní pravidla. Koupila si byt.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

TY TAKY MŮŽEŠ

Za 90 minut • Jasný plán • Tvůj byznys

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODNIKATELSKÁ ČTVRTKA
Stejný systém. Tvoje situace.

🔥 Pokud Marketa, tak i ty • Prvních 50`,
      headline: 'Marketa si koupila byt za podnikání',
      cta: 'Chci to taky'
    }
  },

  // ========================================
  // DEMO #4: VÁNOČNÍ VARIANTA (emotional + urgency)
  // ========================================
  {
    id: 'christmas-urgency',
    name: 'CTA: VÁNOČNÍ URGENCY',
    category: 'CTA • Emotion • Time pressure',
    realTrigger: 'Chci změnu TEĎKA, ne za rok',
    background: 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <div className="text-7xl mb-5">🎄</div>

        <h1 className="text-6xl font-black text-white mb-5 leading-tight drop-shadow-lg">
          ZA ROK<br/>
          <span className="text-red-300">ZASE BUDOU</span><br/>
          VÁNOCE
        </h1>

        <p className="text-2xl text-gray-300 mb-6">
          Budeš mít zase stejný stres?
        </p>

        <div className="bg-white/95 rounded-2xl p-6 mb-5 max-w-3xl w-full">
          <p className="text-2xl font-black text-gray-900 mb-4">
            LETOS O VÁNOCÍCH:
          </p>
          
          <div className="space-y-3 text-left">
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <p className="text-lg font-bold text-gray-900">
                😰 „Mám na dárky?"
              </p>
              <p className="text-base text-gray-600">
                Stres. Kalkulace. Strach z výpisů.
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <p className="text-lg font-bold text-gray-900">
                💸 „Leden = prázdno"
              </p>
              <p className="text-base text-gray-600">
                Žádní zákazníci. Žádný cashflow. Panika.
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <p className="text-lg font-bold text-gray-900">
                😔 „Zase další rok..."
              </p>
              <p className="text-base text-gray-600">
                Stejný stres. Stejné problémy. Žádná změna.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl px-10 py-5 mb-5 shadow-xl border-2 border-green-400">
          <p className="text-3xl font-black mb-3">
            PŘÍŠTÍ VÁNOCE?
          </p>
          <div className="space-y-2 text-left text-lg">
            <p>✅ Víš komu prodávat = stabilní cashflow</p>
            <p>✅ Víš jak získat zákazníky = klid</p>
            <p>✅ Dárky? Bez stresu.</p>
            <p className="text-green-300 font-bold text-xl">✅ Leden? Přijdou peníze.</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 mb-5 max-w-3xl w-full border-2 border-white/30">
          <p className="text-2xl font-black text-white mb-2">
            ZMĚNA ZAČÍNÁ TEĎ
          </p>
          <p className="text-lg text-gray-300">
            Ne za rok. Ne za půl roku. <span className="text-yellow-300 font-bold">Dnes.</span>
          </p>
        </div>

        <div className="mb-4">
          <p className="text-3xl font-black text-white mb-1">
            90 MINUT = NOVÝ ROK
          </p>
          <p className="text-xl text-gray-300">
            Podnikatelská Čtvrtka • 4.999 Kč
          </p>
        </div>

        <div className="bg-white text-black px-14 py-6 rounded-xl shadow-2xl mb-3">
          <p className="text-4xl font-black">CHCI ZMĚNU! →</p>
        </div>

        <p className="text-red-300 text-xl font-bold">
          🎄 Příští Vánoce bez stresu • Start dnes
        </p>
      </div>
    ),
    copy: {
      primary: `ZA ROK ZASE BUDOU VÁNOCE.

Budeš mít zase stejný stres?

━━━━━━━━━━━━━━━━━━━━━━━━━━━

LETOS O VÁNOCÍCH:

😰 „Mám na dárky?"
→ Stres. Kalkulace. Strach z výpisů.

💸 „Leden = prázdno"
→ Žádní zákazníci. Žádný cashflow. Panika.

😔 „Zase další rok..."
→ Stejný stres. Stejné problémy. Žádná změna.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

PŘÍŠTÍ VÁNOCE?

✅ Víš komu prodávat = stabilní cashflow
✅ Víš jak získat zákazníky = klid
✅ Dárky? Bez stresu.
✅ Leden? Přijdou peníze.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

ZMĚNA ZAČÍNÁ TEĎ

Ne za rok. Ne za půl roku. Dnes.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

90 MINUT = NOVÝ ROK

PODNIKATELSKÁ ČTVRTKA
4.999 Kč • Prvních 50

🎄 Příští Vánoce bez stresu • Start dnes`,
      headline: 'Za rok zase budou Vánoce',
      cta: 'Chci změnu'
    }
  }
];

export function BrutalValueAds() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentAd = brutalValueAds[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % brutalValueAds.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + brutalValueAds.length) % brutalValueAds.length);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2">
            🔥 BRUTAL VALUE ADS
          </h1>
          <p className="text-xl text-gray-400">
            Konkrétní triggers • Empatické • MATRIX format
          </p>
        </div>

        {/* Ad Preview */}
        <div className="mb-8">
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-black">{currentAd.name}</h2>
                <p className="text-gray-400">{currentAd.category}</p>
                <p className="text-green-400 mt-1">
                  <strong>Real trigger:</strong> {currentAd.realTrigger}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={goToPrevious}
                  className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* FB Ad Preview (4:5 ratio) */}
            <div className="mx-auto" style={{ maxWidth: '500px' }}>
              <div 
                className="relative overflow-hidden rounded-xl shadow-2xl"
                style={{
                  aspectRatio: '4/5',
                  background: currentAd.background
                }}
              >
                {currentAd.content}
              </div>
            </div>
          </div>

          {/* Ad Copy */}
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black">AD COPY (pro FB Ads)</h3>
              <button
                onClick={() => copyToClipboard(currentAd.copy.primary)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-bold"
              >
                Copy text
              </button>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
              {currentAd.copy.primary}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Headline:</p>
                <p className="font-bold">{currentAd.copy.headline}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">CTA Button:</p>
                <p className="font-bold">{currentAd.copy.cta}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brutalValueAds.map((ad, index) => (
            <button
              key={ad.id}
              onClick={() => setCurrentIndex(index)}
              className={`p-4 rounded-lg transition-all ${
                index === currentIndex
                  ? 'bg-blue-600 ring-2 ring-blue-400'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <p className="font-bold text-sm mb-1">{ad.name}</p>
              <p className="text-xs text-gray-400">{ad.category}</p>
            </button>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h3 className="text-2xl font-black mb-4">📊 BRUTAL VALUE ADS STRUKTURA:</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <p className="font-bold">VALUE #1: VÍC PENĚZ</p>
                <p className="text-gray-400 text-sm">Trigger: Chci víc prodávat (achieve)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏢</span>
              <div>
                <p className="font-bold">VALUE #2: NÁJEM BEZ STRESU</p>
                <p className="text-gray-400 text-sm">Trigger: Nechci se bát (avoid)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <p className="font-bold">VALUE #3: MARKETA SI KOUPILA</p>
                <p className="text-gray-400 text-sm">Trigger: Pokud ona, tak i já (hope)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎄</span>
              <div>
                <p className="font-bold">CTA: VÁNOČNÍ URGENCY</p>
                <p className="text-gray-400 text-sm">Trigger: Změna začíná TEĎ (urgency)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

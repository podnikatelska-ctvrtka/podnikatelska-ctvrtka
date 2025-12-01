// 🎯 VALUE ADS (3x) - FULL SCREEN PREVIEW
// 1. AVOID - Náklady odkládání (Cost of inaction)
// 2. TRUTH - Pravda / Anti-guru (Ultimate10Ads #2)
// 3. ACHIEVE - Carousel růst bez vyhoření

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ValueAchieveCarousel } from './ValueAchieveCarousel';

export function Value3AdsPreview() {
  const [currentAd, setCurrentAd] = useState(0);

  const ads = [
    {
      id: 'avoid',
      name: 'VALUE #1: AVOID',
      subtitle: 'Náklady odkládání',
      budget: '20 Kč/den',
      trigger: 'Cost of inaction • Fear • Time urgency'
    },
    {
      id: 'truth',
      name: 'VALUE #2: TRUTH',
      subtitle: 'Pravda / Anti-guru',
      budget: '20 Kč/den',
      trigger: 'Authenticity • Problem agitation • Contrast'
    },
    {
      id: 'achieve',
      name: 'VALUE #3: ACHIEVE',
      subtitle: 'Růst bez vyhoření (Carousel)',
      budget: '20 Kč/den',
      trigger: 'Aspiration • Better future • Freedom'
    }
  ];

  const nextAd = () => {
    setCurrentAd((prev) => (prev + 1) % ads.length);
  };

  const prevAd = () => {
    setCurrentAd((prev) => (prev - 1 + ads.length) % ads.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-white/10 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-white mb-2">
            🎯 VALUE ADS (3x) - Omnipresent Strategie
          </h1>
          <p className="text-xl text-gray-300">
            {ads[currentAd].name} - {ads[currentAd].subtitle}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={prevAd}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white font-bold"
          >
            <ChevronLeft className="w-5 h-5" />
            Předchozí
          </button>
          
          <div className="flex gap-3">
            {ads.map((ad, index) => (
              <button
                key={ad.id}
                onClick={() => setCurrentAd(index)}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  index === currentAd
                    ? 'bg-purple-500 text-white scale-110'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {ad.name}
              </button>
            ))}
          </div>

          <button
            onClick={nextAd}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white font-bold"
          >
            Další
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative">
          {/* Ad Preview Container - 1080x1350 (FB 4:5) */}
          <div 
            className="bg-white shadow-2xl overflow-hidden mx-auto"
            style={{
              width: '1080px',
              height: '1350px'
            }}
          >
            {currentAd === 0 && <CostOfInactionAd />}
            {currentAd === 1 && <TruthAntiGuruAd />}
            {currentAd === 2 && <ValueAchieveCarousel />}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-black/30 backdrop-blur-sm border-t border-white/10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-3xl font-black text-white mb-2">{ads[currentAd].name}</div>
              <div className="text-lg text-gray-300">{ads[currentAd].subtitle}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-3xl font-black text-yellow-400 mb-2">{ads[currentAd].budget}</div>
              <div className="text-lg text-gray-300">Budget • ENGAGEMENT objective</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-base text-gray-300 mb-2">
                <span className="font-bold text-white">Trigger:</span>
              </div>
              <div className="text-sm text-gray-400">{ads[currentAd].trigger}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// VALUE AD #1: AVOID - Cost of Inaction (4:5 format) - ZKOMPAKTNIT ALE UDRŽET SÍLU!
function CostOfInactionAd() {
  return (
    <div className="h-full bg-gradient-to-br from-red-900 via-red-800 to-slate-900 flex flex-col items-center justify-center px-12 py-8 text-center">
      <div className="text-7xl mb-5">😰</div>

      <h1 className="text-5xl font-black text-white mb-5 leading-tight drop-shadow-2xl">
        KAŽDÝ DEN<br/>
        <span className="text-red-300">TO SAMÉ</span><br/>
        A POŘÁD NIČEHO.
      </h1>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-5 max-w-2xl w-full border-2 border-white/30">
        <div className="space-y-3">
          <p className="text-xl text-white font-bold">
            😞 Makáš do tmy
          </p>
          <p className="text-lg text-gray-300">
            Nevíš jestli to zvládneš
          </p>
          
          <p className="text-xl text-white font-bold mt-3">
            👨‍👩‍👧 Rodina ti uniká
          </p>
          <p className="text-lg text-gray-300">
            Pořád v práci • Pořád unavený
          </p>
          
          <p className="text-xl text-white font-bold mt-3">
            ✈️ Nemůžeš plánovat
          </p>
          <p className="text-lg text-gray-300">
            Dovolenou • Budoucnost • Nic
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black rounded-2xl px-10 py-5 mb-5 shadow-lg">
        <p className="text-4xl font-black mb-2">
          CO KDYBY...
        </p>
        <p className="text-xl font-bold">
          Za 90 minut měl jasno?
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-5 max-w-2xl w-full border-2 border-green-400/50">
        <div className="space-y-2">
          <p className="text-xl text-green-400 font-bold">
            ✅ Vidíš kam jdeš
          </p>
          <p className="text-xl text-green-400 font-bold">
            ✅ Můžeš plánovat dovolenou
          </p>
          <p className="text-xl text-green-400 font-bold">
            ✅ Víc peněz pro rodinu
          </p>
          <p className="text-2xl text-yellow-300 font-black mt-3">
            ✨ Lepší život
          </p>
        </div>
      </div>

      <div className="mb-5">
        <p className="text-3xl font-black text-white mb-2">
          PODNIKATELSKÁ ČTVRTKA
        </p>
        <p className="text-lg text-gray-300">
          90 minut • Celý model podnikání
        </p>
      </div>

      <div className="bg-white/90 text-black px-10 py-4 rounded-xl shadow-2xl">
        <p className="text-2xl font-black">Chci vědět víc →</p>
      </div>
    </div>
  );
}

// VALUE AD #2: TRUTH - Anti-guru (4:5 format) - NOVÝ ANGLE!
function TruthAntiGuruAd() {
  return (
    <div className="h-full bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center px-12 py-8 text-center">
      <div className="bg-red-600 text-white px-6 py-2 rounded-lg mb-4 shadow-lg">
        <p className="text-xl font-black">
          ⚠️ PRAVDA
        </p>
      </div>

      <h1 className="text-4xl font-black text-white mb-4 leading-tight drop-shadow-lg">
        V Česku není<br/>
        <span className="text-red-400">REÁLNÁ POMOC</span><br/>
        pro podnikatele.
      </h1>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 mb-4 max-w-2xl w-full border-2 border-white/30">
        <div className="space-y-2 text-left">
          <p className="text-lg text-white">
            ✅ <span className="font-bold">Guru kurzy?</span> Máme. <span className="text-gray-300">(50h teorie)</span>
          </p>
          <p className="text-lg text-white">
            ✅ <span className="font-bold">FB marketing?</span> Máme. <span className="text-gray-300">(Byznys neřešíš)</span>
          </p>
          <p className="text-lg text-white">
            ✅ <span className="font-bold">Konzultanti?</span> Máme. <span className="text-gray-300">(Obecné rady)</span>
          </p>
          <p className="text-2xl font-black text-yellow-300 mt-3">
            ❌ KONKRÉTNÍ METODA? NIKDE.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black rounded-xl px-8 py-4 mb-4 shadow-lg max-w-2xl w-full">
        <p className="text-3xl font-black mb-2">
          TAK JSME TO VYTVOŘILI.
        </p>
        <p className="text-lg font-bold">
          Chceme, aby podnikatelé měli dobře
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 mb-5 max-w-2xl w-full border-2 border-green-400/50">
        <div className="space-y-2">
          <p className="text-xl text-green-400 font-bold">
            ✅ Měli peníze na dovolenou
          </p>
          <p className="text-xl text-green-400 font-bold">
            ✅ Trávili čas s rodinou
          </p>
          <p className="text-xl text-green-400 font-bold">
            ✅ Spali v noci klidně
          </p>
          <p className="text-2xl text-yellow-300 font-black mt-3">
            ✨ Měli lepší život
          </p>
        </div>
      </div>

      <div className="mb-5">
        <p className="text-3xl font-black text-white mb-2">
          PODNIKATELSKÁ ČTVRTKA
        </p>
        <p className="text-lg text-gray-300">
          Model podnikání • 90 minut • Hotovo
        </p>
      </div>

      <div className="bg-white/90 text-black px-10 py-4 rounded-xl shadow-2xl">
        <p className="text-2xl font-black">Zjistit víc →</p>
      </div>
    </div>
  );
}
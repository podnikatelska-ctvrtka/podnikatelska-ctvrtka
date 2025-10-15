import { useState } from 'react';
import { ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';

// Import PŮVODNÍCH hotových ad setů - už vytvořených
import Final3AdSets from './Final3AdSets';
import MyCreativeAdSetsFixed from './MyCreativeAdSetsFixed';
import ThreeNewCreativeAds from './ThreeNewCreativeAds';

interface AdData {
  id: string;
  name: string;
  category: string;
  source: string;
  budget: string;
  component: React.ReactNode;
}

const finalCleanPortfolio: AdData[] = [
  // AD #1: PŘED/PO - Z Final3AdSets.tsx (PŮVODNÍ!)
  {
    id: 'before-after',
    name: 'Ad #1: PŘED/PO ČTVRTCE',
    category: 'Transformation • Concrete results',
    source: 'Hotový z Final3AdSets.tsx',
    budget: '70 Kč/den',
    component: <Final3AdSets />
  },

  // AD #2: PRAVDA - Z MyCreativeAdSetsFixed.tsx (PŮVODNÍ!)
  {
    id: 'truth',
    name: 'Ad #2: PRAVDA (MODRÁ)',
    category: 'Anti-Guru • Kontrast',
    source: 'Hotový z MyCreativeAdSetsFixed.tsx',
    budget: '80 Kč/den',
    component: <MyCreativeAdSetsFixed />
  },

  // AD #3: STOP - Z ThreeNewCreativeAds.tsx (PŮVODNÍ!)
  {
    id: 'stop',
    name: 'Ad #3: STOP SCROLL',
    category: 'Pattern Interrupt • Empatie',
    source: 'Hotový z ThreeNewCreativeAds.tsx',
    budget: '85 Kč/den',
    component: <ThreeNewCreativeAds />
  },

  // AD #4: MATRIX - Z ThreeNewCreativeAds.tsx (PŮVODNÍ!)
  {
    id: 'matrix',
    name: 'Ad #4: THE MATRIX',
    category: 'Volba • Wake up call',
    source: 'Hotový z ThreeNewCreativeAds.tsx',
    budget: '75 Kč/den',
    component: <ThreeNewCreativeAds />
  }
];

export default function FinalCleanPortfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentAd = finalCleanPortfolio[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? finalCleanPortfolio.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === finalCleanPortfolio.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-white mb-4">
            ✅ POUŽIJU TVOJE HOTOVÉ!
          </h1>
          <p className="text-2xl text-gray-400 mb-6">
            Sorry za bordel - tady jsou TVOJE původní ad sety!
          </p>
          <div className="bg-red-500/20 border-2 border-red-400 rounded-xl p-6 max-w-4xl mx-auto">
            <p className="text-xl text-red-300">
              <span className="font-bold">❌ MÁ CHYBA!</span><br/>
              Vytvořil jsem nové místo použití hotových. Tady jsou TVOJE PŮVODNÍ designy!
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
              {currentIndex + 1} / {finalCleanPortfolio.length}
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
              <p className="text-lg text-green-300">
                <span className="font-bold">Zdroj:</span> {currentAd.source}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-yellow-300">{currentAd.budget}</p>
            </div>
          </div>
        </div>

        {/* ORIGINAL COMPONENT - CELÁ STRÁNKA */}
        <div className="w-full">
          {currentAd.component}
        </div>

        {/* Note */}
        <div className="mt-12 bg-yellow-500/20 border-2 border-yellow-400 rounded-xl p-6 max-w-5xl mx-auto">
          <p className="text-xl text-yellow-300 text-center">
            <span className="font-bold">💡 POZOR:</span><br/>
            Toto jsou TVOJE původní komponenty - vidíš celou stránku s navigací!<br/>
            Pro screenshot otevři přímo:<br/>
            <code className="text-white">/reklamy</code> (Final3AdSets) |  
            <code className="text-white">/kreativni-reklamy</code> (Anti-Guru) | 
            <code className="text-white">/nove-reklamy</code> (Stop + Matrix)
          </p>
        </div>
      </div>
    </div>
  );
}

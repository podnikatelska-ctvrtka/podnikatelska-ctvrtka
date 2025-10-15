import { useState } from 'react';
import Final3AdSets from '../components/Final3AdSets';
import MyCreativeAdSetsFixed from '../components/MyCreativeAdSetsFixed';
import ThreeNewCreativeAds from '../components/ThreeNewCreativeAds';

export function AdComparison() {
  const [activeTab, setActiveTab] = useState<'final3' | 'creative' | 'new'>('new');

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-4">
            📊 Porovnání Reklamních Setů
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Vyber si mezi finálními a kreativními verzemi
          </p>

          {/* Tabs */}
          <div className="inline-flex bg-gray-800 rounded-lg p-1 gap-2 flex-wrap justify-center">
            <button
              onClick={() => setActiveTab('new')}
              className={`px-8 py-3 rounded-lg font-bold transition-all ${
                activeTab === 'new'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🔥 NOVÉ Ad Sety
              <span className="block text-xs mt-1 opacity-80">
                Stop Scroll • FOMO • Matrix
              </span>
            </button>
            <button
              onClick={() => setActiveTab('final3')}
              className={`px-8 py-3 rounded-lg font-bold transition-all ${
                activeTab === 'final3'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🎯 Finální Ad Sety
              <span className="block text-xs mt-1 opacity-80">
                Systematické • PŘED/PO • 1. místo
              </span>
            </button>
            <button
              onClick={() => setActiveTab('creative')}
              className={`px-8 py-3 rounded-lg font-bold transition-all ${
                activeTab === 'creative'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🎨 Kreativní Ad Sety
              <span className="block text-xs mt-1 opacity-80">
                Anti-guru • Emotivní • Číselné
              </span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
          {activeTab === 'new' ? (
            <div>
              <div className="mb-6 p-4 bg-red-900/30 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-white mb-2">
                  🔥 O těchto NOVÝCH ad setech:
                </h3>
                <ul className="text-gray-300 space-y-1">
                  <li>✅ ZCELA NOVÉ koncepce (Stop Scroll, FOMO, Matrix)</li>
                  <li>✅ Pattern interrupt + emotivní metafory</li>
                  <li>✅ Vyšší budget (75-85 Kč/den) = premium positioning</li>
                  <li>✅ Vylepšená čitelnost všech textů!</li>
                </ul>
              </div>
              <ThreeNewCreativeAds />
            </div>
          ) : activeTab === 'final3' ? (
            <div>
              <div className="mb-6 p-4 bg-blue-900/30 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-white mb-2">
                  📌 O těchto finálních ad setech:
                </h3>
                <ul className="text-gray-300 space-y-1">
                  <li>✅ Systematický přístup (PŘED/PO transformace)</li>
                  <li>✅ Jasné zákaznické benefity</li>
                  <li>✅ První v ČR positioning</li>
                  <li>✅ Cold audience friendly</li>
                </ul>
              </div>
              <Final3AdSets />
            </div>
          ) : (
            <div>
              <div className="mb-6 p-4 bg-purple-900/30 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-white mb-2">
                  📌 O těchto kreativních ad setech:
                </h3>
                <ul className="text-gray-300 space-y-1">
                  <li>✅ Kreativní a neotřelé koncepty</li>
                  <li>✅ Anti-guru positioning</li>
                  <li>✅ Emotivní zapojení + čísla</li>
                  <li>✅ OPRAVENO: Lepší čitelnost textů!</li>
                </ul>
              </div>
              <MyCreativeAdSetsFixed />
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-green-500">
            <h3 className="text-lg font-bold text-white mb-3">
              💡 Doporučení k testování:
            </h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Začni s menším budgetem (50-70 Kč/den)</li>
              <li>• Testuj 3-5 dní minimálně</li>
              <li>• Sleduj CTR a cost per lead</li>
              <li>• Optimalizuj na základě dat</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-yellow-500">
            <h3 className="text-lg font-bold text-white mb-3">
              📈 Metriky k sledování:
            </h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• <strong>CTR:</strong> &gt;1.5% je dobrý (cold traffic)</li>
              <li>• <strong>CPM:</strong> ~100-200 Kč je normální</li>
              <li>• <strong>Cost per lead:</strong> &lt;50 Kč je skvělý</li>
              <li>• <strong>Conversion rate:</strong> &gt;2% je výborné</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

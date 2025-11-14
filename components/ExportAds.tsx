// 📸 EXPORT ADS - Přesně 1080×1350 px pro FB Ads Manager
// Optimalizováno pro screenshot export bez ořezu!

import { useState } from 'react';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';

const ExportAds = () => {
  const [currentAd, setCurrentAd] = useState(0);

  const ads = [
    // AD #1: DENNÍ ZTRÁTY
    {
      id: 'daily-loss',
      name: 'Denní ztráty',
      content: (
        <div 
          className="relative overflow-hidden"
          style={{
            width: '1080px',
            height: '1350px',
            background: 'linear-gradient(135deg, #991b1b 0%, #ea580c 100%)',
          }}
        >
          <div className="flex flex-col items-center justify-between h-full px-16 py-12">
            {/* Header */}
            <div className="text-center space-y-6">
              <h1 className="text-[88px] font-black text-white leading-[0.95] tracking-tight">
                KAŽDÝ DEN<br/>
                ZTRÁCÍŠ PENÍZE
              </h1>
              <p className="text-[36px] text-white/90">
                A ani to nevíš.
              </p>
            </div>

            {/* Main Content */}
            <div className="w-full space-y-8">
              {/* Big Number */}
              <div className="bg-black/20 rounded-3xl p-10 text-center border-4 border-yellow-300">
                <div className="text-yellow-300 text-[120px] font-black leading-none mb-4">
                  -1.500 Kč
                </div>
                <div className="text-white text-[32px]">
                  KAŽDÝ DEN
                </div>
              </div>

              {/* Pain Points */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-4">
                <div className="flex items-start gap-4 text-white">
                  <span className="text-[40px]">💸</span>
                  <div className="flex-1">
                    <p className="text-[28px] leading-tight">
                      Nevíš komu prodávat = prázdno
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-white">
                  <span className="text-[40px]">💸</span>
                  <div className="flex-1">
                    <p className="text-[28px] leading-tight">
                      Prodáváš levně = málo marže
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-white">
                  <span className="text-[40px]">⏰</span>
                  <div className="flex-1">
                    <p className="text-[28px] leading-tight">
                      Čas běží • Stojíš na místě
                    </p>
                  </div>
                </div>
              </div>

              {/* Solution */}
              <div className="bg-white rounded-2xl p-8 space-y-4">
                <div className="text-center mb-6">
                  <p className="text-[32px] font-black text-gray-900">
                    90 MINUT = JASNÝ PLÁN
                  </p>
                </div>
                <div className="space-y-3 text-[24px] text-gray-800">
                  <div className="flex items-center gap-3">
                    <span className="text-green-600 font-black">✓</span>
                    <span>Víš komu prodávat</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-600 font-black">✓</span>
                    <span>Víš jak na marketing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-600 font-black">✓</span>
                    <span>Přestaneš ztrácet peníze</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center space-y-4 w-full">
              <div className="bg-white rounded-2xl px-12 py-8 inline-block">
                <p className="text-[36px] font-black text-gray-900 mb-2">
                  PODNIKATELSKÁ ČTVRTKA
                </p>
                <p className="text-[28px] text-gray-700">
                  90 minut • 4.999 Kč
                </p>
              </div>
              <div className="bg-yellow-300 rounded-xl px-10 py-5 inline-block">
                <p className="text-[30px] font-black text-gray-900">
                  🔥 Sleva 40% • Prvních 50 lidí
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // AD #2: PRAVDA / ANTI-GURU
    {
      id: 'anti-guru',
      name: 'Pravda / Anti-guru',
      content: (
        <div 
          className="relative overflow-hidden"
          style={{
            width: '1080px',
            height: '1350px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          }}
        >
          <div className="flex flex-col items-center justify-between h-full px-16 py-12">
            {/* Header */}
            <div className="text-center space-y-6">
              <div className="bg-red-600 rounded-2xl px-10 py-5 inline-block border-4 border-white">
                <p className="text-white text-[40px] font-black">
                  ⚠️ PRAVDA
                </p>
              </div>
              <h1 className="text-[72px] font-black text-white leading-[0.95] tracking-tight px-8">
                V ČESKU ŽÁDNÁ<br/>
                REÁLNÁ POMOC<br/>
                PODNIKATELŮM<br/>
                NENÍ
              </h1>
            </div>

            {/* Content */}
            <div className="w-full space-y-6">
              {/* Problems */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-5">
                <div className="flex items-start gap-4">
                  <span className="text-[36px]">✅</span>
                  <div className="flex-1 text-white">
                    <p className="text-[26px] font-bold mb-1">Guru kurzy? Máme.</p>
                    <p className="text-[22px] text-white/80">(50 hodin teorie, nula praxe)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[36px]">✅</span>
                  <div className="flex-1 text-white">
                    <p className="text-[26px] font-bold mb-1">FB marketing? Máme.</p>
                    <p className="text-[22px] text-white/80">(Nikdo byznys neřeší)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[36px]">✅</span>
                  <div className="flex-1 text-white">
                    <p className="text-[26px] font-bold mb-1">Konzultanti? Máme.</p>
                    <p className="text-[22px] text-white/80">(Obecné rady za 5.000 Kč/hod)</p>
                  </div>
                </div>
              </div>

              {/* Missing */}
              <div className="bg-red-600 rounded-2xl p-8 text-center border-4 border-white">
                <p className="text-white text-[36px] font-black">
                  ❌ KONKRÉTNÍ METODA?<br/>NIKDE.
                </p>
              </div>

              {/* Solution */}
              <div className="bg-yellow-300 rounded-2xl p-8 text-center">
                <p className="text-gray-900 text-[40px] font-black mb-2">
                  TAK JSME TO<br/>VYTVOŘILI
                </p>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl p-8 space-y-4">
                <p className="text-[32px] font-black text-gray-900 text-center mb-4">
                  PODNIKATELSKÁ ČTVRTKA
                </p>
                <div className="space-y-3 text-[24px] text-gray-800">
                  <div className="flex items-start gap-3">
                    <span>🎯</span>
                    <span>Business Model Canvas</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span>💡</span>
                    <span>Value Proposition Canvas</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span>📋</span>
                    <span>Akční plán (co dělat zítra)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center space-y-3">
              <p className="text-white text-[32px] font-black">
                Ne guru. Ne AI kecy. METODA.
              </p>
              <div className="bg-yellow-300 rounded-xl px-10 py-5 inline-block">
                <p className="text-[30px] font-black text-gray-900">
                  🔥 Sleva 40% jen pro prvních 50
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // AD #3: PŘED/PO TRANSFORMACE
    {
      id: 'before-after',
      name: 'Před/Po transformace',
      content: (
        <div 
          className="relative overflow-hidden"
          style={{
            width: '1080px',
            height: '1350px',
            background: 'linear-gradient(135deg, #1e40af 0%, #6366f1 100%)',
          }}
        >
          <div className="flex flex-col items-center justify-between h-full px-16 py-12">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-[80px] font-black text-white leading-[0.95] tracking-tight">
                PŘED ČTVRTKOU<br/>
                <span className="text-yellow-300">→</span><br/>
                PO ČTVRTCE
              </h1>
            </div>

            {/* Comparison */}
            <div className="w-full space-y-6">
              {/* Before/After Grid */}
              <div className="bg-white rounded-2xl p-8 space-y-5">
                {/* Item 1 */}
                <div className="grid grid-cols-2 gap-6 pb-5 border-b-2 border-gray-200">
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-[32px]">❌</span>
                    <span className="text-red-700 text-[22px] leading-tight">
                      Nevím, komu přesně prodávám
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[32px]">🎯</span>
                    <span className="text-blue-700 font-bold text-[22px] leading-tight">
                      Vím, kdo je můj ideální zákazník
                    </span>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="grid grid-cols-2 gap-6 pb-5 border-b-2 border-gray-200">
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-[32px]">❌</span>
                    <span className="text-red-700 text-[22px] leading-tight">
                      Reklamy jen žerou peníze
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[32px]">💎</span>
                    <span className="text-blue-700 font-bold text-[22px] leading-tight">
                      Vím, co testovat první
                    </span>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="grid grid-cols-2 gap-6 pb-5 border-b-2 border-gray-200">
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-[32px]">❌</span>
                    <span className="text-red-700 text-[22px] leading-tight">
                      Bojím se marketingu
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[32px]">🚀</span>
                    <span className="text-blue-700 font-bold text-[22px] leading-tight">
                      Rozumím, jak oslovit lidi
                    </span>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-[32px]">❌</span>
                    <span className="text-red-700 text-[22px] leading-tight">
                      Nevím, jak zvýšit zisky
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[32px]">📈</span>
                    <span className="text-blue-700 font-bold text-[22px] leading-tight">
                      Vidím nové možnosti růstu
                    </span>
                  </div>
                </div>
              </div>

              {/* Big Statement */}
              <div className="bg-yellow-300 rounded-2xl p-8 text-center border-4 border-white">
                <p className="text-gray-900 text-[48px] font-black leading-tight">
                  90 MINUT =<br/>CELÝ BYZNYS<br/>JASNĚ
                </p>
              </div>

              {/* Features */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-4">
                <div className="space-y-3 text-white text-[24px]">
                  <div className="flex items-start gap-3">
                    <span>🎯</span>
                    <span>Business Model Canvas</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span>💡</span>
                    <span>Value Proposition Canvas</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span>📋</span>
                    <span>Akční plán (co dělat ZÍTRA)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center space-y-4">
              <div className="bg-white rounded-2xl px-10 py-6 inline-block">
                <p className="text-[36px] font-black text-gray-900">
                  Z CHAOSU DO JASNA
                </p>
                <p className="text-[28px] text-gray-700">
                  90 minut • 4.999 Kč
                </p>
              </div>
              <div className="bg-yellow-300 rounded-xl px-10 py-5 inline-block">
                <p className="text-[30px] font-black text-gray-900">
                  🔥 Prvních 50 lidí • Sleva 40%
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleDownload = () => {
    const adName = ads[currentAd].name;
    alert(`📸 NÁVOD PRO EXPORT:\n\n1. Klikni pravým tlačítkem na reklamu\n2. "Uložit obrázek jako..."\n3. Nebo použij screenshot tool:\n   • Windows: Win + Shift + S\n   • Mac: Cmd + Shift + 4\n\n4. Ulož jako: ${adName.toLowerCase().replace(/\s+/g, '-')}.png\n\n5. Upload do Facebook Ads Manager!\n\n✅ Rozměry: Přesně 1080×1350 px\n✅ Formát: 4:5 (Facebook doporučený!)\n✅ Žádné ořezy! Perfect fit! 🔥`);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-4">
            📸 EXPORT REKLAM PRO FB ADS
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Přesně 1080×1350 px • Optimalizováno pro Facebook Ads Manager
          </p>
          <p className="text-gray-400">
            {currentAd + 1} / {ads.length} • {ads[currentAd].name}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <button
            onClick={() => setCurrentAd((prev) => (prev > 0 ? prev - 1 : ads.length - 1))}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Předchozí
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-bold"
          >
            <Download className="w-5 h-5" />
            Návod na export
          </button>

          <button
            onClick={() => setCurrentAd((prev) => (prev < ads.length - 1 ? prev + 1 : 0))}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Další
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Ad Preview - EXACTLY 1080×1350 */}
        <div className="flex justify-center">
          <div className="inline-block shadow-2xl rounded-lg overflow-hidden">
            {ads[currentAd].content}
          </div>
        </div>

        {/* Instructions */}
        <div className="max-w-2xl mx-auto mt-12 bg-white/5 rounded-xl p-8">
          <h2 className="text-2xl font-black text-white mb-4">
            📋 NÁVOD PRO EXPORT:
          </h2>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">1.</span>
              <p>Vyber reklamu pomocí šipek (nebo klikni "Další")</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">2.</span>
              <p>Screenshot celou reklamu (Win + Shift + S nebo Cmd + Shift + 4)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">3.</span>
              <p>Ulož jako PNG</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">4.</span>
              <p>Upload do Facebook Ads Manager → Média sekce</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 font-bold">✅</span>
              <p className="font-bold">Žádné ořezy! Perfect 4:5 ratio pro FB!</p>
            </div>
          </div>
        </div>

        {/* Quick Nav */}
        <div className="flex justify-center gap-4 mt-8">
          {ads.map((ad, index) => (
            <button
              key={ad.id}
              onClick={() => setCurrentAd(index)}
              className={`px-6 py-3 rounded-lg transition-colors ${
                currentAd === index
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {ad.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportAds;

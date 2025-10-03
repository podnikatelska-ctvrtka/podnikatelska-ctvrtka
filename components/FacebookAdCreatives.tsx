import { motion } from "motion/react";
import { Gift, TrendingUp, Users } from "lucide-react";

// 🎨 AD CREATIVE 1: VALUE BOMB (hlavní číslo dominuje)
export function AdCreative1() {
  return (
    <div className="w-[1080px] h-[1080px] bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 relative overflow-hidden flex items-center justify-center p-16">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
      
      {/* Urgence badge */}
      <div className="absolute top-12 right-12 bg-red-500 text-white px-8 py-4 rounded-2xl shadow-2xl">
        <p className="font-black text-2xl">PRVNÍCH 50 MÍST!</p>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Hlavní číslo */}
        <div className="mb-8">
          <div className="text-[160px] font-black text-white leading-none tracking-tight drop-shadow-2xl">
            7.999 Kč
          </div>
          <div className="text-5xl font-bold text-yellow-300 mt-4 drop-shadow-lg">
            UŠETŘÍTE
          </div>
          <div className="text-4xl font-semibold text-white/90 mt-2">
            jako PRŮKOPNÍK
          </div>
        </div>
        
        {/* Benefity */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center justify-center gap-4 text-white text-2xl font-semibold">
            <Gift className="w-8 h-8 text-yellow-300" />
            <span>Mini kurz ZDARMA (2.999 Kč)</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-white text-2xl font-semibold">
            <TrendingUp className="w-8 h-8 text-green-300" />
            <span>Sleva 62% (7.999 Kč úspora)</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-white text-2xl font-semibold">
            <Users className="w-8 h-8 text-blue-300" />
            <span>Konzultace ZDARMA (50×)</span>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-green-500 hover:bg-green-600 text-white px-12 py-6 rounded-2xl inline-block shadow-2xl">
          <p className="text-3xl font-black">REZERVOVAT MÍSTO →</p>
        </div>
        
        {/* Subtext */}
        <p className="text-white/80 text-xl mt-6 font-medium">
          ⏰ Zbývá jen pár míst!
        </p>
      </div>
    </div>
  );
}

// 🎨 AD CREATIVE 2: BENEFIT STACK (čistý, minimalistický)
export function AdCreative2() {
  return (
    <div className="w-[1080px] h-[1080px] bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 relative overflow-hidden flex items-center justify-center p-12">
      {/* Main card */}
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl w-full border-4 border-green-200 relative">
        {/* Badge */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-full shadow-xl">
          <p className="font-black text-lg">PRVNÍCH 50 MÍST!</p>
        </div>
        
        {/* Header */}
        <div className="text-center mb-8 mt-4">
          <div className="text-blue-600 font-black text-2xl mb-3">
            PRŮKOPNICKÁ VÝHODA
          </div>
          <div className="text-gray-800 font-bold text-4xl mb-2">
            Balíček v hodnotě
          </div>
          <div className="text-blue-600 font-black text-6xl">
            12.998 Kč
          </div>
        </div>
        
        {/* Benefity s checkmarky */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-4 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-xl text-gray-800">Mini kurz ZDARMA</p>
              <p className="text-purple-600 font-semibold text-base">Hodnota 2.999 Kč</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-xl text-gray-800">Sleva 62%</p>
              <p className="text-green-600 font-semibold text-base">Úspora 7.999 Kč</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border-2 border-blue-200">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-xl text-gray-800">Konzultace ZDARMA</p>
              <p className="text-blue-600 font-semibold text-base">Prvních 50 kupujících • 1.500 Kč</p>
            </div>
          </div>
        </div>
        
        {/* Cena */}
        <div className="text-center mb-6 bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl">
          <p className="text-white text-xl font-bold mb-1">ZAPLATÍTE JEN</p>
          <p className="text-white text-5xl font-black">4.999 Kč</p>
        </div>
        
        {/* CTA */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-xl text-2xl font-black shadow-xl text-center">
          REZERVOVAT MÍSTO TEĎ! →
        </button>
      </div>
    </div>
  );
}

// 🎨 AD CREATIVE 3: BADGE STYLE (exkluzivní)
export function AdCreative3() {
  return (
    <div className="w-[1080px] h-[1080px] bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden flex items-center justify-center p-16">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
      
      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Badge */}
        <div className="inline-block mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl blur-xl opacity-50" />
          <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 p-12 rounded-3xl border-4 border-yellow-300 shadow-2xl">
            <p className="text-indigo-900 font-black text-5xl mb-4">PRŮKOPNÍK</p>
            <p className="text-indigo-900 font-black text-8xl">#42</p>
          </div>
        </div>
        
        {/* Headline */}
        <div className="mb-12">
          <p className="text-white text-5xl font-bold mb-4">
            Mezi prvními 50 lidmi!
          </p>
          <p className="text-yellow-300 text-6xl font-black">
            Ušetříte 7.999 Kč
          </p>
        </div>
        
        {/* Benefity */}
        <div className="space-y-4 mb-12 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
            <p className="text-white text-3xl font-bold">🎁 Mini kurz ZDARMA po registraci</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
            <p className="text-white text-3xl font-bold">💰 Průkopnická cena (sleva 62%)</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
            <p className="text-white text-3xl font-bold">💎 Konzultace ZDARMA (50×)</p>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-green-500 hover:bg-green-600 text-white px-16 py-8 rounded-2xl inline-block shadow-2xl mb-6">
          <p className="text-4xl font-black">CHCI BÝT PRŮKOPNÍK! →</p>
        </div>
        
        {/* Urgence */}
        <div className="bg-red-500 text-white px-8 py-4 rounded-full inline-block">
          <p className="text-2xl font-black">⏰ LIMITOVANÁ KAPACITA</p>
        </div>
      </div>
    </div>
  );
}

// 🎯 KOMPONENTA PRO ZOBRAZENÍ VŠECH VARIANT
export function AdCreativesShowcase() {
  const downloadAsPNG = (adNumber: number) => {
    const element = document.getElementById(`ad-creative-${adNumber}`);
    if (!element) return;
    
    // Použij html2canvas nebo jednoduchý screenshot
    alert(`📸 Pro stažení jako PNG:\n\n1. Pravým tlačítkem na obrázek\n2. "Uložit obrázek jako..."\n3. Název: ad-creative-${adNumber}.png\n\nNebo použij screenshot tool:\nMac: Cmd+Shift+4\nWindows: Win+Shift+S`);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Facebook Ad Creatives - Podnikatelská Čtvrtka
        </h1>
        
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">📸 JAK STÁHNOUT JAKO PNG:</h2>
          <div className="space-y-2 text-lg text-blue-800">
            <p><strong>NEJLEPŠÍ KVALITA:</strong></p>
            <ol className="list-decimal ml-6 space-y-1">
              <li>Pravým tlačítkem na reklamu → <strong>"Uložit obrázek jako..."</strong></li>
              <li>Název: <code className="bg-blue-100 px-2 py-1 rounded">ad-creative-1.png</code></li>
              <li>Formát: PNG</li>
              <li>Upload do FB Ads Manager!</li>
            </ol>
            <p className="mt-4"><strong>ALTERNATIVA - Screenshot:</strong></p>
            <p className="ml-6">Mac: <kbd className="bg-white px-2 py-1 rounded border">Cmd + Shift + 4</kbd> | Windows: <kbd className="bg-white px-2 py-1 rounded border">Win + Shift + S</kbd></p>
          </div>
        </div>
        
        <div className="space-y-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Ad Creative 1: Value Bomb</h2>
            <p className="text-gray-600 mb-4">Hlavní číslo dominuje, urgence, tmavé pozadí</p>
            <div className="inline-block shadow-2xl" id="ad-creative-1">
              <AdCreative1 />
            </div>
            <div className="mt-4">
              <button 
                onClick={() => downloadAsPNG(1)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700"
              >
                📥 Návod na stažení PNG
              </button>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Ad Creative 2: Benefit Stack ✅ OPRAVENO!</h2>
            <p className="text-gray-600 mb-4">Čistý, minimalistický, zmenšené fonty - vejde se celé!</p>
            <div className="inline-block shadow-2xl" id="ad-creative-2">
              <AdCreative2 />
            </div>
            <div className="mt-4">
              <button 
                onClick={() => downloadAsPNG(2)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700"
              >
                📥 Návod na stažení PNG
              </button>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Ad Creative 3: Badge Style 🔥 NEJLEPŠÍ!</h2>
            <p className="text-gray-600 mb-4">Exkluzivní, premium feel, průkopník badge</p>
            <div className="inline-block shadow-2xl" id="ad-creative-3">
              <AdCreative3 />
            </div>
            <div className="mt-4">
              <button 
                onClick={() => downloadAsPNG(3)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700"
              >
                📥 Návod na stažení PNG
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-green-50 border-2 border-green-200 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-green-900 mb-4">🎯 DOPORUČENÍ PRO FB REKLAMY:</h3>
          <div className="space-y-4 text-lg text-green-800">
            <div>
              <p className="font-bold mb-2">📱 FORMÁT: 1080 × 1080 px (Square) ✅</p>
              <p className="ml-4">Funguje pro: FB Feed, IG Feed, Stories (crop)</p>
            </div>
            <div>
              <p className="font-bold mb-2">🚀 KTEROU POUŽÍT:</p>
              <ul className="ml-4 space-y-1">
                <li><strong>Ad #3 (Badge Style)</strong> - Nejlepší! Exkluzivní vibe + FB text dodá kontext</li>
                <li><strong>Ad #1 (Value Bomb)</strong> - Backup pro A/B test</li>
                <li><strong>Ad #2 (Benefit Stack)</strong> - Pokud chceš detailnější info</li>
              </ul>
            </div>
            <div>
              <p className="font-bold mb-2">💰 BUDGET:</p>
              <p className="ml-4">Start: 200 Kč/den | Scale: 400-600 Kč/den po 7 dnech</p>
            </div>
            <div>
              <p className="font-bold mb-2">🎯 TARGETING:</p>
              <p className="ml-4">Věk: 28-55 (TVRDO!) | Zájmy: Small Business, Entrepreneurship</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

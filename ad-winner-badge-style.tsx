// 🏆 VÝHERNÍ REKLAMA - Ad Creative 3: Badge Style
// Pro export jako PNG: Pravým tlačítkem → Uložit obrázek jako...
// Formát: 1080×1080 px (Square)
// Použití: FB Feed, IG Feed, Stories

export default function AdWinnerBadgeStyle() {
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

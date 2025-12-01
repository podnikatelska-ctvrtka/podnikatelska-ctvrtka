// 🎯 CTA AD (1x) - JEDINÁ HARD SALES reklama!
// FULL PRODEJ: Cena, sleva, urgence, KOUP TEĎ!

export function CtaHardSales() {
  return (
    <div className="h-full bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500 flex flex-col items-center justify-center px-16 py-8 text-center">
      <div className="bg-black text-white px-10 py-4 rounded-xl mb-6 shadow-2xl animate-pulse">
        <p className="text-3xl font-black">
          ⚡ AKCE 2025
        </p>
      </div>

      <h1 className="text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
        ZVYŠ ZISK<br/>
        <span className="text-black">V ROCE 2025</span>
      </h1>

      <div className="bg-white/95 rounded-2xl p-8 mb-6 max-w-3xl w-full shadow-2xl">
        <p className="text-4xl font-black text-gray-900 mb-6">
          🎯 CO DOSTANEŠ:
        </p>
        <div className="space-y-3 text-left">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
            <span className="text-3xl">✓</span>
            <p className="text-xl font-bold text-gray-900">Interaktivní Model podnikání</p>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <span className="text-3xl">✓</span>
            <p className="text-xl font-bold text-gray-900">FIT Validátor (vidíš slabiny)</p>
          </div>
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
            <span className="text-3xl">✓</span>
            <p className="text-xl font-bold text-gray-900">Email kurz ZDARMA (7 dní)</p>
          </div>
          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
            <span className="text-3xl">✓</span>
            <p className="text-xl font-bold text-gray-900">Lifetime přístup</p>
          </div>
        </div>
      </div>

      <div className="bg-black text-white rounded-2xl px-12 py-8 mb-6 shadow-2xl border-4 border-yellow-400">
        <p className="text-2xl text-gray-300 line-through mb-2">8.333 Kč</p>
        <p className="text-7xl font-black text-yellow-400 mb-2">4.999 Kč</p>
        <p className="text-3xl font-black text-white">SLEVA 40%</p>
      </div>

      <div className="bg-red-600 text-white rounded-xl px-8 py-4 mb-6 shadow-lg">
        <p className="text-2xl font-black mb-1">
          ⏰ JENOM PRVNÍCH 50 LIDÍ
        </p>
        <p className="text-lg">
          Pak cena roste na 8.333 Kč
        </p>
      </div>

      <div className="bg-white text-black px-16 py-8 rounded-2xl shadow-2xl mb-6 transform hover:scale-105 transition-transform">
        <p className="text-6xl font-black mb-2">CHCI SLEVU! →</p>
        <p className="text-xl font-bold">Zvyšuju zisk v 2025</p>
      </div>

      <div className="flex items-center gap-4 text-white">
        <div className="text-center">
          <p className="text-3xl font-black">90 min</p>
          <p className="text-sm">Práce</p>
        </div>
        <span className="text-3xl">•</span>
        <div className="text-center">
          <p className="text-3xl font-black">100%</p>
          <p className="text-sm">Záruka</p>
        </div>
        <span className="text-3xl">•</span>
        <div className="text-center">
          <p className="text-3xl font-black">24h</p>
          <p className="text-sm">Přístup</p>
        </div>
      </div>
    </div>
  );
}

export const ctaAdMetadata = {
  id: 'cta-hard-sales',
  name: 'CTA: Hard Sales',
  subtitle: 'Jediná prodejní reklama',
  budget: '20 Kč/den',
  objective: 'ENGAGEMENT',
  trigger: 'Urgency • Scarcity • Price • Action'
};

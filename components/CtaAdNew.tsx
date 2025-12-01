// 🎯 CTA AD (1x) - VÁNOČNÍ PREMIUM "NADĚLÍ SI FUNGUJÍCÍ BYZNYS"
// Soft urgency, důvěryhodný, elegantní (zelená/zlatá, ne červená spam)

export function CtaStart2026() {
  return (
    <div className="h-full bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 flex flex-col items-center justify-center px-16 py-12 text-center relative overflow-hidden">
      {/* Vánoční pattern/textura - HŘEJIVÉ POZADÍ */}
      <div className="absolute inset-0 opacity-10">
        {/* Sněhové vločky pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        {/* Vánoční hvězdy */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 70%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(255, 215, 0, 0.2) 0%, transparent 50%)
          `
        }}></div>
      </div>
      
      {/* Dekorativní emoji - subtilnější */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-16 left-16 text-6xl">🎄</div>
        <div className="absolute bottom-16 right-16 text-6xl">🎄</div>
        <div className="absolute top-[50%] left-[8%] text-4xl">⭐</div>
        <div className="absolute top-[50%] right-[8%] text-4xl">⭐</div>
      </div>
      
      {/* Premium badge - SOLO bez social proof */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-8 py-3 rounded-full shadow-xl">
          <p className="text-xl font-black">
            🎄 VÁNOČNÍ NABÍDKA 2025 🎁
          </p>
        </div>
      </div>

      <h1 className="text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
        NADĚL SI <span className="text-yellow-300">POD STROMEČEK</span><br/>
        FUNGUJÍCÍ BYZNYS!
      </h1>
      
      <p className="text-2xl text-green-200 mb-8 max-w-4xl leading-tight">
        Zjistíš za 90 minut, jestli tvůj nápad <span className="font-black text-yellow-300">VYDĚLÁ</span> nebo jen <span className="font-black text-red-300">VYHOŘÍ</span>.
      </p>

      {/* HLAVNÍ OBSAH - 2 SLOUPCE */}
      <div className="grid grid-cols-2 gap-8 max-w-6xl w-full mb-8">
        {/* LEVÝ SLOUPEC - Co dostaneš */}
        <div className="bg-white/95 rounded-2xl p-8 shadow-2xl">
          <p className="text-2xl font-black text-gray-900 mb-6">
            🎁 Co dostaneš:
          </p>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border-2 border-green-300">
              <span className="text-2xl">✓</span>
              <div>
                <p className="text-lg font-black text-gray-900">Interaktivní Model podnikání</p>
                <p className="text-sm text-gray-600">90 minut → Vidíš kde jsou peníze</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border-2 border-blue-300">
              <span className="text-2xl">✓</span>
              <div>
                <p className="text-lg font-black text-gray-900">FIT Validátor</p>
                <p className="text-sm text-gray-600">Okamžitě vidíš jestli to má smysl</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border-2 border-purple-300">
              <span className="text-2xl">✓</span>
              <div>
                <p className="text-lg font-black text-gray-900">Knihovna modelů</p>
                <p className="text-sm text-gray-600">Kopíruj, co funguje ostatním</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl border-2 border-yellow-300">
              <span className="text-2xl">✓</span>
              <div>
                <p className="text-lg font-black text-gray-900">Lifetime přístup</p>
                <p className="text-sm text-gray-600">Model roste s tebou</p>
              </div>
            </div>
          </div>
        </div>

        {/* PRAVÝ SLOUPEC - Cena + CTA + Benefits */}
        <div className="flex flex-col justify-between relative">
          {/* Urgency badge - NA ROHU BOXU */}
          <div className="absolute -top-4 -right-4 transform rotate-12 z-10">
            <div className="bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-xl px-4 py-3 shadow-2xl border-3 border-yellow-400">
              <p className="text-sm font-black leading-tight">
                ⏰ LIMITOVANÁ<br/>NABÍDKA
              </p>
            </div>
          </div>

          {/* Price - MENŠÍ, kompaktnější */}
          <div className="bg-white/95 rounded-2xl p-8 shadow-2xl mb-4">
            <p className="text-sm text-gray-600 line-through mb-3">Běžná cena: 8.333 Kč</p>
            <div className="mb-3">
              <div className="flex items-baseline justify-center gap-3">
                <p className="text-6xl font-black text-gray-900">4.999 Kč</p>
                <div className="bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-lg shadow-lg">
                  <p className="text-xl font-black">-40%</p>
                </div>
              </div>
            </div>
            <p className="text-base text-green-600 font-black mb-6">
              Ušetříš 3.334 Kč
            </p>
            
            {/* Anti-guru */}
            <p className="text-sm text-gray-600 mb-6 italic border-t-2 border-gray-200 pt-6">
              Žádné hádání. Žádné kecy. Jen model, co funguje.
            </p>

            {/* CTA Button */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-10 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform cursor-pointer border-4 border-yellow-400">
              <p className="text-3xl font-black mb-1">Chci to pod stromeček →</p>
              <p className="text-base">Začínám 2026 s fungujícím modelem</p>
            </div>
          </div>

          {/* Benefits badges */}
          <div className="bg-white/95 rounded-2xl p-6 shadow-2xl">
            <div className="grid grid-cols-3 gap-4 text-gray-900">
              <div className="text-center">
                <p className="text-2xl font-black text-green-600">90 min</p>
                <p className="text-sm text-gray-600">Práce</p>
              </div>
              <div className="text-center border-x-2 border-gray-200">
                <p className="text-2xl font-black text-green-600">100%</p>
                <p className="text-sm text-gray-600">Záruka</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-green-600">Lifetime</p>
                <p className="text-sm text-gray-600">Přístup</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social proof + GIFT ANGLE - dole centrovaně */}
      <div className="text-center mb-4">
        <p className="text-sm text-green-300 flex items-center gap-2 justify-center mb-2">
          <span>👥</span> Desítky podnikatelů už mají svůj model • <span>🎯</span> Prvních 50 se slevou
        </p>
        <p className="text-base text-yellow-300 font-bold">
          🎁 Nebo naděl někomu sen o podnikání
        </p>
      </div>
    </div>
  );
}

export const ctaAdNewMetadata = {
  id: 'cta-start-2026',
  name: 'CTA: Start 2026',
  subtitle: 'Vánoční premium nabídka',
  format: 'Elegant premium static',
  budget: '20 Kč/den',
  objective: 'ENGAGEMENT',
  trigger: 'Soft urgency • Premium positioning • New year motivation'
};
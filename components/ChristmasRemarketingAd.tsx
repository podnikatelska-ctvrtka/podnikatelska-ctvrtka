// REMARKETING AD - KICKSTART 2026 ANGLE - "Začni rok 2026 správně"

export function ChristmasRemarketingAd() {
  return (
    <div className="h-full bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 flex flex-col items-center justify-center px-16 py-12 text-center relative overflow-hidden">
      {/* Explosive energy circles - MÍSTO LASERŮ */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400/40 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-40 right-32 w-40 h-40 bg-orange-400/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-32 left-40 w-36 h-36 bg-purple-400/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 right-20 w-44 h-44 bg-blue-400/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Glow elements - energy */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/15 rounded-full blur-3xl"></div>

      {/* Top badge - SILNĚJŠÍ */}
      <div className="mb-8 relative z-10">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full shadow-2xl border-2 border-yellow-400">
          <p className="font-black text-xl">
            🚀 NAKOPNI SVŮJ BYZNYS V ROCE 2026
          </p>
        </div>
      </div>

      {/* Main headline - RAZANTNÍ A PRO VŠECHNY */}
      <h1 className="text-7xl font-black text-white mb-8 leading-tight drop-shadow-2xl relative z-10 max-w-5xl">
        Máš plán<br/>
        <span className="text-yellow-300">nebo jen improvizuješ?</span>
      </h1>

      {/* Subheadline - JASNÝ */}
      <p className="text-3xl text-white/95 mb-10 max-w-4xl relative z-10 leading-snug">
        Zjisti <span className="font-black text-yellow-200">PŘESNĚ,</span> co dělat první<br/>
        a dostaň konkrétní plán na <span className="font-black text-white">LEDEN 2026.</span>
      </p>

      {/* Promise box */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 mb-10 max-w-3xl w-full shadow-2xl relative z-10">
        <p className="text-2xl font-black text-gray-900 mb-4">
          💎 Co dostaneš OKAMŽITĚ:
        </p>
        <div className="space-y-3 text-left">
          <div className="flex items-start gap-3">
            <div className="text-orange-600 text-2xl flex-shrink-0">✓</div>
            <p className="text-xl text-gray-700">
              <span className="font-black">Konkrétní akční plán na leden</span> – žádné kecy, KONKRÉTNÍ KROKY
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-orange-600 text-2xl flex-shrink-0">✓</div>
            <p className="text-xl text-gray-700">
              <span className="font-black">Přesnou diagnózu,</span> kde tratíš peníze a co s tím
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-orange-600 text-2xl flex-shrink-0">✓</div>
            <p className="text-xl text-gray-700">
              <span className="font-black">30denní náskok</span> zatímco konkurence "se ještě rozjíždí"
            </p>
          </div>
        </div>
        <p className="text-lg text-gray-900 mt-5 font-black">
          ⚡ Už ho absolvovalo 200+ podnikatelů
        </p>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl px-12 py-8 shadow-2xl max-w-2xl w-full relative z-10 border-4 border-yellow-400">
        <p className="text-4xl font-black mb-3">
          🚀 Chci mít jasnej plán na leden
        </p>
        <p className="text-xl text-orange-100">
          3 minuty • Akční plán na leden • 100% zdarma
        </p>
      </div>

      {/* Bottom message */}
      <p className="text-white text-xl mt-6 relative z-10 font-bold max-w-3xl drop-shadow-lg">
        💪 Zatímco ostatní ještě spí, <span className="text-yellow-300">ty už budeš vědět kam jdeš.</span>
      </p>
    </div>
  );
}
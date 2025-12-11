// REMARKETING AD - CHRISTMAS ANGLE - "Vánoční dárek pro podnikatele"

export function ChristmasRemarketingAd() {
  return (
    <div className="h-full bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center px-16 py-12 text-center relative overflow-hidden">
      {/* Snow effect - floating circles */}
      <div className="absolute top-20 left-20 w-6 h-6 bg-blue-200/60 rounded-full blur-sm"></div>
      <div className="absolute top-40 left-60 w-4 h-4 bg-blue-300/50 rounded-full blur-sm"></div>
      <div className="absolute top-60 right-40 w-7 h-7 bg-blue-200/70 rounded-full blur-sm"></div>
      <div className="absolute top-80 right-80 w-3 h-3 bg-blue-300/60 rounded-full blur-sm"></div>
      <div className="absolute top-[700px] left-40 w-5 h-5 bg-blue-200/50 rounded-full blur-sm"></div>
      <div className="absolute top-[900px] right-60 w-4 h-4 bg-blue-300/60 rounded-full blur-sm"></div>
      <div className="absolute top-[1100px] left-[600px] w-6 h-6 bg-blue-200/50 rounded-full blur-sm"></div>
      
      {/* Soft glow elements */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200/15 rounded-full blur-3xl"></div>

      {/* Top badge */}
      <div className="mb-8 relative z-10">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full shadow-2xl border-2 border-blue-400">
          <p className="font-black text-xl">
            🎁 VÁNOČNÍ DÁREK PRO PODNIKATELE
          </p>
        </div>
      </div>

      {/* Main headline */}
      <h1 className="text-7xl font-black text-gray-900 mb-8 leading-tight drop-shadow-sm relative z-10 max-w-5xl">
        Celý rok makáš.<br/>
        <span className="text-blue-700">Zasloužíš si víc.</span>
      </h1>

      {/* Subheadline */}
      <p className="text-3xl text-gray-700 mb-10 max-w-4xl relative z-10 leading-snug">
        Vyplníš kvíz za <span className="font-black text-gray-900">3 minuty</span><br/>
        a dostaneš přesnou diagnózu svého byznysu.
      </p>

      {/* Promise box */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-8 mb-10 max-w-3xl w-full shadow-2xl relative z-10">
        <p className="text-2xl font-black text-gray-900 mb-4">
          🎁 Co dostaneš zdarma:
        </p>
        <div className="space-y-3 text-left">
          <div className="flex items-start gap-3">
            <div className="text-gray-900 text-2xl flex-shrink-0">✓</div>
            <p className="text-xl text-gray-900">
              <span className="font-black">Zjistíš přesně</span> co ti chybí k tomu, aby tvůj byznys fungoval líp
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-gray-900 text-2xl flex-shrink-0">✓</div>
            <p className="text-xl text-gray-900">
              <span className="font-black">Kde má tvé podnikání slabiny</span> (a co s nimi)
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-gray-900 text-2xl flex-shrink-0">✓</div>
            <p className="text-xl text-gray-900">
              <span className="font-black">Akční plán</span> co udělat první
            </p>
          </div>
        </div>
        <p className="text-lg text-gray-900 mt-5 font-black">
          ✨ Už ho absolvovalo 200+ podnikatelů
        </p>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl px-12 py-8 shadow-2xl max-w-2xl w-full relative z-10 border-4 border-blue-300">
        <p className="text-4xl font-black mb-3">
          🎯 Spustit kvíz zdarma
        </p>
        <p className="text-xl text-blue-100">
          3 minuty • Personalizované výsledky • Žádné závazky
        </p>
      </div>

      {/* Bottom message */}
      <p className="text-gray-700 text-xl mt-6 relative z-10 font-bold max-w-3xl">
        Protože <span className="text-blue-700">každý podnikatel, co celý rok maká,</span> si zaslouží něco navíc. 🎁
      </p>
    </div>
  );
}
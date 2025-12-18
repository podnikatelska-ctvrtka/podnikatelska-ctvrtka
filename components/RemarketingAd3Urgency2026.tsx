// REMARKETING AD #3 - SANTA / GIFT ANGLE
// Angle: "Jedinečný dárek pro podnikatele + nikdo ti nepomáhá"
// Hook: Vánoční self-gift + rejection messaging

export function RemarketingAd3Urgency2026() {
  return (
    <div className="h-full bg-gradient-to-br from-red-700 via-green-700 to-red-800 flex flex-col items-center justify-center px-12 py-10 text-center relative overflow-hidden">
      {/* Decorative background - Christmas vibes */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>

      {/* Snowflakes decorative */}
      <div className="absolute top-20 left-1/4 text-white/30 text-5xl">❄️</div>
      <div className="absolute top-40 right-1/3 text-white/20 text-3xl">❄️</div>
      <div className="absolute bottom-32 left-1/3 text-white/25 text-4xl">❄️</div>

      {/* SANTA Badge */}
      <div className="mb-6 relative z-10">
        <div className="bg-white text-red-700 px-6 py-2 rounded-full shadow-2xl">
          <p className="font-black text-lg">
            🎅 DÁREK PRO SEBE
          </p>
        </div>
      </div>

      {/* Main headline */}
      <h1 className="text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl relative z-10 max-w-4xl">
        Nejlepší vánoční dárek?<br/>
        <span className="text-yellow-200">VĚDĚT, CO TI CHYBÍ</span><br/>
        v podnikání
      </h1>

      {/* Subheadline */}
      <p className="text-2xl text-white/95 mb-8 max-w-3xl relative z-10">
        3minutový kvíz ti ukáže <span className="font-black">PŘESNĚ</span>, kde máš mezery<br/>
        a dá ti <span className="font-black">konkrétní plán</span> na rok 2026.
      </p>

      {/* Rejection messaging box */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-7 mb-8 max-w-3xl w-full shadow-2xl relative z-10">
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* LEFT - Co NEDOSTANEŠ */}
          <div className="text-left bg-red-50 rounded-xl p-5">
            <p className="text-2xl font-black text-red-700 mb-3">
              ❌ Co ti nikdo NEDÁ:
            </p>
            <div className="space-y-2">
              <p className="text-lg text-gray-700">→ Pomoc s podnikáním</p>
              <p className="text-lg text-gray-700">→ Konkrétní plán</p>
            </div>
          </div>

          {/* RIGHT - Co si můžeš DÁT */}
          <div className="text-left bg-green-50 rounded-xl p-5">
            <p className="text-2xl font-black text-green-700 mb-3">
              ✅ Co si můžeš dát SÁM:
            </p>
            <div className="space-y-2">
              <p className="text-lg text-gray-900 font-bold">→ Diagnózu ZDARMA</p>
              <p className="text-lg text-gray-900 font-bold">→ Plán pro TVŮJ byznys</p>
            </div>
          </div>
        </div>

        {/* Gift messaging */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-5 border-2 border-dashed border-orange-300">
          <p className="text-2xl font-black text-orange-800">
            🎁 Nejlepší dárek pod stromeček? <span className="text-green-700">ZDARMA</span> analýza byznysu.
          </p>
        </div>
      </div>

      {/* CTA - Christmas urgency */}
      <div className="bg-gradient-to-r from-green-600 to-red-600 text-white rounded-2xl px-10 py-6 shadow-2xl max-w-2xl w-full relative z-10">
        <p className="text-4xl font-black mb-3">
          🎄 Naděl si dárek ještě LETOS
        </p>
        <p className="text-xl">
          3min kvíz • Diagnóza • Plán na 2026
        </p>
      </div>

      {/* Social proof footer */}
      <p className="text-white/90 text-base mt-5 relative z-10">
        ✨ <span className="font-black">200+ podnikatelů</span> si už dárek dalo
      </p>
    </div>
  );
}
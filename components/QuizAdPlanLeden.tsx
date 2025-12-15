// CONVERSIONS AD #1 - SEASONAL PLANNING - "Máš plán nebo jen improvizuješ?"
// Používá se v COLD CONVERSIONS i REMARKETING kampaních

export function QuizAdPlanLeden() {
  return (
    <div className="h-full bg-gradient-to-br from-purple-600 via-violet-500 to-orange-500 flex flex-col items-center justify-center px-16 py-12 text-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"></div>

      {/* Badge */}
      <div className="mb-8 relative z-10">
        <div className="bg-white text-purple-700 px-8 py-3 rounded-full shadow-2xl">
          <p className="font-black text-xl">
            ✨ LEDEN 2026 • FRESH START
          </p>
        </div>
      </div>

      {/* Main headline */}
      <h1 className="text-7xl font-black text-white mb-8 leading-tight drop-shadow-2xl relative z-10 max-w-5xl">
        Máš plán nebo<br/>
        <span className="text-yellow-200">jen improvizuješ?</span>
      </h1>

      {/* Subheadline */}
      <p className="text-3xl text-white/95 mb-10 max-w-4xl relative z-10">
        Zjisti <span className="font-black">PŘESNĚ, co dělat první</span><br/>
        a dostaň konkrétní plán na <span className="font-black">LEDEN 2026.</span>
      </p>

      {/* Benefits box */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 mb-10 max-w-3xl w-full shadow-2xl relative z-10">
        <p className="text-2xl font-black text-gray-900 mb-6">
          🎯 Interaktivní kvíz ti ukáže:
        </p>
        <div className="space-y-4 text-left">
          <div className="flex items-start gap-3">
            <div className="text-purple-600 text-2xl flex-shrink-0">✓</div>
            <p className="text-xl text-gray-700">
              <span className="font-black">Kde má tvé podnikání slabiny</span> (a co s nimi)
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-purple-600 text-2xl flex-shrink-0">✓</div>
            <p className="text-xl text-gray-700">
              <span className="font-black">Co ti blokuje růst</span> (konkrétní důvody)
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-purple-600 text-2xl flex-shrink-0">✓</div>
            <p className="text-xl text-gray-700">
              <span className="font-black">Jaké kroky udělat první</span> (prioritizované)
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl px-12 py-8 shadow-2xl max-w-2xl w-full relative z-10">
        <p className="text-4xl font-black mb-3">
          📅 Chci mít jasnej plán na leden
        </p>
        <p className="text-xl text-gray-300">
          Kvíz zdarma • 3 minuty • Konkrétní akční plán
        </p>
      </div>

      {/* Social proof footer */}
      <p className="text-white/80 text-lg mt-6 relative z-10">
        ✨ Už ho absolvovalo <span className="font-black">200+ podnikatelů</span>
      </p>
    </div>
  );
}

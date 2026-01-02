export function OrganicPost39Alternative() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
            ⚖️ SROVNÁNÍ
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            JAK VALIDOVAT BYZNYS?
          </h2>
          <p className="text-xl text-slate-300">
            3 MOŽNOSTI. KTERÁ JE NEJLEPŠÍ?
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="space-y-4 mb-6">
          {/* Option A - Konzultant */}
          <div className="bg-red-900/30 backdrop-blur-sm border-2 border-red-500/30 rounded-3xl p-6">
            <div className="text-center mb-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-red-500/30 flex items-center justify-center text-3xl mb-3">
                💼
              </div>
              <div className="text-xs font-bold text-gray-400 mb-2">OPTION A</div>
              <h3 className="text-xl font-black text-red-400">NAJMI KONZULTANTA</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gray-900/30">
                <p className="text-sm text-gray-400 mb-1">Cena:</p>
                <p className="text-lg font-black text-white">80-200k Kč</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-900/30">
                <p className="text-sm text-gray-400 mb-1">Čas:</p>
                <p className="text-lg font-black text-white">2-3 měsíce</p>
              </div>
            </div>

            <div className="space-y-2">
              {[
                "Není to TVOJE",
                "Nevíš JAK to udělali",
                "Nemůžeš to použít příště"
              ].map((con, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">❌</span>
                  <p className="text-sm text-gray-300">{con}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Option B - Trial/Error */}
          <div className="bg-orange-900/30 backdrop-blur-sm border-2 border-orange-500/30 rounded-3xl p-6">
            <div className="text-center mb-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-orange-500/30 flex items-center justify-center text-3xl mb-3">
                🤷
              </div>
              <div className="text-xs font-bold text-gray-400 mb-2">OPTION B</div>
              <h3 className="text-xl font-black text-orange-400">UDĚLEJ TO SÁM</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gray-900/30">
                <p className="text-sm text-gray-400 mb-1">Cena:</p>
                <p className="text-lg font-black text-white">"Zdarma" (ale...)</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-900/30">
                <p className="text-sm text-gray-400 mb-1">Čas:</p>
                <p className="text-lg font-black text-white">6-12 měsíců</p>
              </div>
            </div>

            <div className="space-y-2">
              {[
                "Drahé chyby",
                "Nevíš jestli děláš správně",
                "Ztracený čas"
              ].map((con, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">❌</span>
                  <p className="text-sm text-gray-300">{con}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Option C - Čtvrtka (WINNER) */}
          <div className="relative bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-6 shadow-2xl ring-4 ring-yellow-400">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-black">
              🏆 BEST CHOICE
            </div>

            <div className="text-center mb-4 mt-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-white/20 flex items-center justify-center text-3xl mb-3">
                🎯
              </div>
              <div className="text-xs font-bold text-yellow-300 mb-2">OPTION C</div>
              <h3 className="text-xl font-black text-white">ONLINE KURZ (Čtvrtka)</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-white/10">
                <p className="text-sm text-green-200 mb-1">Cena:</p>
                <p className="text-lg font-black text-white">4 999 Kč</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10">
                <p className="text-sm text-green-200 mb-1">Čas:</p>
                <p className="text-lg font-black text-white">90 minut</p>
              </div>
            </div>

            <div className="space-y-2">
              {[
                "Vyplníš si to SÁM (učíš se proces)",
                "Máš nástroje NA VŽDY",
                "Můžeš použít na další byznys",
                "Online = žádná cesta"
              ].map((pro, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-green-200 mt-0.5">✓</span>
                  <p className="text-sm font-bold text-white">{pro}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
          <h3 className="text-2xl font-black text-gray-900 mb-4 text-center">
            Middle-ground řešení:
          </h3>
          <div className="space-y-2">
            {[
              "Lepší než drahý konzultant",
              "Rychlejší než trial/error",
              "Flexibilnější než live workshop"
            ].map((item, i) => (
              <p key={i} className="text-lg text-gray-700 font-bold flex items-center justify-center gap-2">
                <span className="text-green-600">✓</span>
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 text-center shadow-2xl">
          <p className="text-white text-lg mb-2">
            👉 <span className="font-bold text-2xl">podnikatelskactvrtka.cz</span>
          </p>
          <p className="text-indigo-200 text-sm">
            Online kurz • 90 minut • 4 999 Kč
          </p>
        </div>
      </div>
    </div>
  );
}

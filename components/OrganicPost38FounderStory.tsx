export function OrganicPost38FounderStory() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
            💙 FOUNDER STORY
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Proč jsem postavil Čtvrtku?
          </h2>
          <p className="text-xl text-slate-300">
            Protože jsem udělal <span className="text-red-400 font-bold">VŠECHNY chyby</span>.
          </p>
        </div>

        {/* Story Card 1 - Failure */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
          <div className="text-center mb-6">
            <div className="px-4 py-1.5 rounded-full text-sm font-bold mb-4 bg-red-100 text-red-700 inline-block">
              2018
            </div>
            <div className="text-7xl mb-4">💔</div>
            <h3 className="text-3xl font-black text-red-600 mb-6">
              Můj první byznys
            </h3>
          </div>

          <div className="space-y-3 mb-6">
            {[
              "Investoval jsem 300k do produktu",
              "NETESTOVAL jsem nic",
              '"Všichni to budou chtít," myslel jsem'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-red-50">
                <span className="text-xl flex-shrink-0">❌</span>
                <p className="font-bold text-red-900">{item}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {[
              { label: "Čas", value: "6 měsíců práce" },
              { label: "Peníze", value: "300k pryč" },
              { label: "Zákazníci", value: "0" }
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-red-50 rounded-xl border-2 border-red-200">
                <span className="text-gray-700 font-bold">{stat.label}:</span>
                <span className="text-2xl font-black text-red-600">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Story Card 2 - Discovery */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
          <div className="text-center mb-6">
            <div className="px-4 py-1.5 rounded-full text-sm font-bold mb-4 bg-yellow-100 text-yellow-700 inline-block">
              2019
            </div>
            <div className="text-7xl mb-4">💡</div>
            <h3 className="text-3xl font-black text-yellow-600 mb-6">
              Objevil jsem Model podnikání
            </h3>
          </div>

          <div className="space-y-3 mb-6">
            {[
              "Definoval segment",
              "Otestoval hodnotu",
              "Spočítal čísla",
              "Validoval PŘED investicí"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-yellow-50">
                <span className="text-xl flex-shrink-0">✓</span>
                <p className="font-bold text-yellow-900">{item}</p>
              </div>
            ))}
          </div>

          <div className="p-6 bg-green-50 rounded-2xl border-4 border-green-500">
            <p className="text-4xl font-black text-green-600 text-center">
              Druhý byznys? Úspěch. ✅
            </p>
          </div>
        </div>

        {/* Story Card 3 - Mission */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
          <div className="text-center mb-6">
            <div className="px-4 py-1.5 rounded-full text-sm font-bold mb-4 bg-indigo-100 text-indigo-700 inline-block">
              2024
            </div>
            <div className="text-7xl mb-4">❤️</div>
            <h3 className="text-3xl font-black text-indigo-600 mb-6">
              Proto existuje Čtvrtka
            </h3>
          </div>

          <div className="space-y-3">
            {[
              "Abys nemusel udělat stejné chyby",
              "Abys netopil 300k",
              "Abys měl JASNO od začátku"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-indigo-50">
                <span className="text-xl flex-shrink-0">💙</span>
                <p className="font-bold text-indigo-900">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-center shadow-2xl mb-6">
          <p className="text-2xl text-white font-black mb-4">
            Není to o penězích.
          </p>
          <p className="text-xl text-white font-bold">
            Je to o tom NEUDĚLAT moje chyby.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-center border-2 border-white/20">
          <p className="text-white text-lg mb-2">
            👉 <span className="font-bold text-2xl">podnikatelskactvrtka.cz</span>
          </p>
          <p className="text-slate-300 text-sm">
            Online kurz • 90 minut • 4 999 Kč
          </p>
        </div>
      </div>
    </div>
  );
}

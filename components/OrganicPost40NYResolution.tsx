export function OrganicPost40NYResolution() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
            🎯 ANTI-RESOLUTION
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            NOVOROČNÍ PŘEDSEVZETÍ:
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
            <p className="text-2xl text-yellow-400 font-bold italic">
              "V roce 2025 rozjedu byznys."
            </p>
          </div>
        </div>

        {/* Reality Check */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-red-600 text-3xl">❌</span>
            <h3 className="text-2xl font-black text-gray-900">REALITA:</h3>
          </div>

          <div className="space-y-3">
            {[
              { month: "Leden", status: "Plánuješ", icon: "📝" },
              { month: "Únor", status: "Ještě plánuješ", icon: "📝" },
              { month: "Březen", status: '"Nevím jestli to půjde"', icon: "🤔" },
              { month: "Duben", status: "Odloženo", icon: "⏸️" },
              { month: "Květen", status: '"Možná příští rok"', icon: "😔" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border-2 border-red-200">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-sm text-red-600 font-bold">{item.month}</p>
                  <p className="text-lg font-black text-gray-900">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Problem Analysis */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 shadow-2xl mb-6">
          <h3 className="text-2xl font-black text-white mb-6 text-center">
            ⚠️ PROBLÉM NENÍ V TOBĚ.
          </h3>

          <p className="text-xl text-white text-center mb-6 font-bold">
            Problém je v tom, že:
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { text: "Nemáš plán", icon: "❌" },
              { text: "Bojíš se udělat krok", icon: "❌" },
              { text: "Nevíš JESTLI to má smysl", icon: "❌" },
              { text: 'Hledáš "dokonalý moment"', icon: "❌" }
            ].map((problem, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <span className="text-xl">{problem.icon}</span>
                <span className="text-white font-bold text-sm">{problem.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* The Solution */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
          <h3 className="text-2xl font-black text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
            <span className="text-green-600 text-3xl">✓</span>
            CO KDYBY 2025 BYL JINÝ?
          </h3>

          <p className="text-xl text-gray-800 mb-6 text-center font-bold">
            Co kdyby <span className="text-green-600">5. ledna</span> (ne 1.!) měl:
          </p>

          <div className="space-y-3 mb-6">
            {[
              { text: "Validovaný segment", icon: "✓" },
              { text: "Spočítané čísla", icon: "✓" },
              { text: "Jasný akční plán", icon: "✓" },
              { text: "Důvod proč to PŮJDE", icon: "✓" }
            ].map((goal, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border-2 border-green-300">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black">✓</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{goal.text}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200">
            <h4 className="text-xl font-black text-gray-900 mb-4 text-center">
              🎯 NEPOTŘEBUJEŠ RESOLUTION.
            </h4>

            <p className="text-lg text-gray-800 mb-4 text-center font-bold">
              Potřebuješ:
            </p>

            <div className="space-y-3">
              {[
                { num: "1", text: "90 minut času" },
                { num: "2", text: "Notebook" },
                { num: "3", text: "Tenhle kurz" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white rounded-xl p-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-xl flex items-center justify-center flex-shrink-0">
                    {item.num}
                  </div>
                  <span className="text-lg font-bold text-gray-900">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote Comparison */}
        <div className="bg-gradient-to-r from-slate-800 to-gray-800 rounded-3xl p-8 shadow-2xl mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-5 bg-red-500/20 rounded-2xl border-2 border-red-500">
              <span className="text-red-400 text-4xl mb-3 block">❌</span>
              <p className="text-lg font-bold text-white line-through opacity-60">
                "2025 je můj rok"
              </p>
            </div>

            <div className="p-5 bg-green-500/20 rounded-2xl border-2 border-green-500">
              <span className="text-green-400 text-4xl mb-3 block">✓</span>
              <p className="text-lg font-bold text-white">
                "5. ledna mám hotový model"
              </p>
            </div>
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

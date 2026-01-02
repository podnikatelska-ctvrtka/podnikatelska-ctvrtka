export function OrganicPost37CourseMechanics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
            ❓ JAK TO FUNGUJE
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            "90 MINUT? JE TO DOST?"
          </h2>
          <p className="text-2xl text-green-400 font-bold">
            Ano. Tady je proč.
          </p>
        </div>

        {/* Format Badge */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 border-2 border-white/20 text-center">
          <p className="text-white text-xl font-bold">
            📱 FORMÁT: Online (tvoje tempo)
          </p>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
          <h3 className="text-2xl font-black text-gray-900 mb-6 text-center">
            🎯 JAK FUNGUJE KURZ:
          </h3>

          <div className="space-y-4">
            {[
              {
                number: 1,
                title: "Video lekce",
                time: "30 min",
                icon: "🎬",
                description: "9 bloků modelu podnikání"
              },
              {
                number: 2,
                title: "Vyplňování",
                time: "40 min",
                icon: "✍️",
                description: "Tvůj byznys + kalkulačky"
              },
              {
                number: 3,
                title: "Validace",
                time: "20 min",
                icon: "✅",
                description: "Kontrola mezer + akční plán"
              }
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-indigo-50 border-2 border-indigo-300">
                <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 text-3xl">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xl font-black text-gray-900">
                      {step.number}. {step.title}
                    </h4>
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-indigo-600 text-white">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-gray-700 font-bold">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl">
            <p className="text-white text-2xl font-black text-center">
              ⏱️ CELKEM: 90 minut
            </p>
          </div>
        </div>

        {/* What You Get */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 shadow-2xl mb-6">
          <h3 className="text-2xl font-black text-white mb-6 text-center">
            🎁 CO DOSTANEŠ:
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {[
              { text: "Model podnikání (tvůj)", icon: "🎯" },
              { text: "Ekonomické kalkulace", icon: "📊" },
              { text: "Akční plán na 30 dní", icon: "📋" },
              { text: "Přístup navždy", icon: "♾️" }
            ].map((benefit, i) => (
              <div key={i} className="flex flex-col items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                <span className="text-3xl">{benefit.icon}</span>
                <span className="text-white font-bold text-sm">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why 90 Minutes */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
          <h3 className="text-2xl font-black text-gray-900 mb-6 text-center">
            ⏰ PROČ 90 MINUT?
          </h3>

          <p className="text-xl text-gray-800 font-bold mb-4 text-center">
            Protože NEMUSÍŠ:
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { text: "Čekat na live", icon: "❌" },
              { text: "Jet do Prahy", icon: "❌" },
              { text: "Blokovat celý den", icon: "❌" },
              { text: "Přizpůsobovat se", icon: "❌" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                <span className="text-xl">{item.icon}</span>
                <span className="text-gray-800 font-bold text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200 text-center">
            <p className="text-lg font-bold text-gray-900 mb-2">
              Chceš v neděli večer? <span className="text-green-600">Klidně.</span>
            </p>
            <p className="text-lg font-bold text-gray-900">
              Chceš ve vlaku? <span className="text-green-600">Go ahead.</span>
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 text-center shadow-2xl">
          <p className="text-2xl text-white font-black mb-4">
            🎯 Rychle. Online. Ve tvém tempu.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5">
            <p className="text-white text-xl font-bold mb-2">
              👉 podnikatelskactvrtka.cz
            </p>
            <p className="text-indigo-200">
              4 999 Kč • Přístup navždy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

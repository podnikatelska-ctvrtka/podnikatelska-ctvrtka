export function OrganicPost35HiddenCost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
            💸 SKRYTÉ NÁKLADY
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            "PROSTĚ TO ZKUS."
          </h2>
          <p className="text-xl text-yellow-400 font-bold">
            Ale nikdo ti neřekl KOLIK to stojí.
          </p>
        </div>

        {/* Cost Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
          <h3 className="text-2xl font-black text-red-600 mb-6 text-center">
            💔 SKRYTÉ NÁKLADY "PROSTĚ TO ZKUS":
          </h3>

          <div className="space-y-3 mb-6">
            {[
              { label: "6 měsíců živobytí", amount: "120k", icon: "🏠" },
              { label: "První nájem", amount: "80k", icon: "📦" },
              { label: "Chybné investice", amount: "60k", icon: "❌" },
              { label: "Ztracené příležitosti", amount: "???", icon: "⏰" }
            ].map((cost, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-red-50 rounded-xl border-2 border-red-200">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cost.icon}</span>
                  <span className="font-bold text-gray-800">{cost.label}</span>
                </div>
                <span className="text-xl font-black text-red-600">
                  {cost.amount === "???" ? cost.amount : `${cost.amount} Kč`}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t-4 border-red-600 pt-4">
            <div className="flex items-center justify-between p-5 bg-red-600 rounded-xl">
              <span className="text-xl font-black text-white">CELKEM RIZIKA:</span>
              <span className="text-3xl font-black text-yellow-300">300k+ Kč</span>
            </div>
          </div>

          <div className="mt-6 p-5 bg-gray-900 rounded-xl">
            <p className="text-xl text-white font-bold text-center">
              A pak zjistíš: <span className="text-red-400">"Nikdo to nechce."</span>
            </p>
          </div>
        </div>

        {/* Solution */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 shadow-2xl mb-6">
          <h3 className="text-2xl font-black text-white mb-4 text-center">
            ✅ LEVNĚJŠÍ CESTA EXISTUJE:
          </h3>

          <div className="bg-white rounded-2xl p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600 mb-1">Investice:</p>
                <p className="text-2xl font-black text-green-600">4 999 Kč</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Čas:</p>
                <p className="text-2xl font-black text-green-600">90 min</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Ušetříš:</p>
                <p className="text-2xl font-black text-green-600">295k+ Kč</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-center border-2 border-white/20 mb-6">
          <p className="text-2xl text-white font-bold mb-2">
            "Just start" je dobrá rada.
          </p>
          <p className="text-3xl text-yellow-400 font-black">
            Ale "Start SMART" je lepší.
          </p>
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
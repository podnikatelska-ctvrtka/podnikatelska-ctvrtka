// 🎯 D2 - DEEP DIVE PŘÍKLAD (Kosmetický salon)
// Konkrétní, autentický, relatable
// DEMO kategorie - ukazuje jak to funguje

export function D2DeepDiveExample() {
  return (
    <div className="h-full bg-gradient-to-br from-pink-900 via-rose-900 to-purple-900 flex items-center justify-center p-10">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-pink-400 text-white px-6 py-2 rounded-full inline-block mb-5 shadow-lg">
            <p className="text-xl font-black">🔍 REAL EXAMPLE</p>
          </div>
          <h1 className="text-5xl font-black text-white mb-3">
            Takhle to funguje v praxi
          </h1>
          <p className="text-2xl text-pink-200 mb-2">
            Kosmetický salon • Skutečný příklad
          </p>
          <p className="text-xl text-pink-300">
            (Funguje stejně pro každý byznys)
          </p>
        </div>

        {/* Example breakdown */}
        <div className="space-y-5 mb-8">
          {/* Problem */}
          <div className="bg-red-900/40 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-500/50">
            <div className="flex items-start gap-5">
              <div className="text-5xl">😰</div>
              <div className="flex-1">
                <p className="text-3xl font-black text-red-300 mb-3">
                  PROBLÉM:
                </p>
                <p className="text-2xl text-white mb-2">
                  "Mám klientky, ale vydělávám málo. Nevím proč."
                </p>
                <p className="text-xl text-red-200">
                  Chaos, neví kam jít, pracuje 12h denně
                </p>
              </div>
            </div>
          </div>

          {/* What we did */}
          <div className="bg-white/95 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-start gap-5">
              <div className="text-5xl">📋</div>
              <div className="flex-1">
                <p className="text-3xl font-black text-gray-900 mb-4">
                  CO JSME UDĚLALI:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="text-xl font-bold text-gray-900">Vyplnili jsme model</p>
                      <p className="text-lg text-gray-600">Zjistila kdo je ideální klientka (35+ ženy, prémiové ošetření)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="text-xl font-bold text-gray-900">Finanční analýza ukázala</p>
                      <p className="text-lg text-gray-600">Levné ošetření ji ruinovalo • Premium balíčky = zisk</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="text-xl font-bold text-gray-900">Akční plán</p>
                      <p className="text-lg text-gray-600">Zaměřit se na premium • Zrušit levné služby</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 border-4 border-green-400 shadow-2xl">
            <div className="flex items-start gap-5">
              <div className="text-5xl">🎉</div>
              <div className="flex-1">
                <p className="text-3xl font-black text-white mb-3">
                  VÝSLEDEK:
                </p>
                <p className="text-3xl text-white mb-2">
                  +40% příjmů za 2 měsíce
                </p>
                <p className="text-xl text-green-100">
                  Pracuje míň • Vydělává víc • Konečně ví co dělá
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Your turn */}
        <div className="bg-yellow-400 rounded-2xl p-6 mb-6 text-center shadow-2xl">
          <p className="text-4xl font-black text-gray-900 mb-2">
            TEĎKA TY
          </p>
          <p className="text-xl text-gray-800">
            Stejný systém • Tvůj byznys • 90 minut
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-white/95 rounded-2xl px-10 py-5 inline-block shadow-2xl">
            <p className="text-3xl font-black text-gray-900">
              Chci taky výsledky →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const d2DeepDiveMetadata = {
  id: 'd2-deep-dive',
  name: 'DEMO #2: Deep Dive',
  subtitle: 'Kosmetický salon +40%',
  format: 'Real example case study',
  budget: '20 Kč/den',
  objective: 'ENGAGEMENT',
  trigger: 'Relatable • Concrete • Authentic proof'
};

// 🔥 WARM ADS - ADJUSTED FOR LAICKY + EMOTIONAL
// WARM #4 → Místo D1 (Objection Handler)
// WARM #1 → Místo V2 (Social Proof)

export function Warm4ObjectionHandlerAdjusted() {
  // WARM #4: "Nevím jestli je to pro mě..." - UPRAVENO!
  // ✅ Emoční důvody (ne odborné)
  // ❌ Jasné ne
  // CTA soft
  // DVA SLOUPCE - zelená/červená vedle sebe
  return (
    <div className="h-full bg-gradient-to-br from-orange-900 via-red-900 to-orange-900 flex flex-col items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <h1 className="text-5xl font-black text-white mb-3 text-center leading-tight drop-shadow-lg">
          „Nevím, jestli je to<br/>
          <span className="text-orange-300">PRO MĚ..." 🤔</span>
        </h1>

        <p className="text-2xl text-gray-300 mb-6 text-center">
          Jasně. Odpověz si sám/sama:
        </p>

        {/* DVA SLOUPCE - ZELENÁ | ČERVENÁ */}
        <div className="grid grid-cols-2 gap-6 mb-5">
          {/* ZELENÁ - JE TO PRO TEBE */}
          <div className="bg-white/95 rounded-2xl p-6 shadow-2xl">
            <p className="text-2xl font-black text-gray-900 mb-4 text-center">
              ✅ JE TO PRO TEBE
            </p>
            
            <div className="space-y-3">
              <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-600">
                <p className="text-xl font-bold text-gray-900">
                  💰 Máš chuť vydělávat víc
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Větší příjmy, ne jen „přežít"
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-600">
                <p className="text-xl font-bold text-gray-900">
                  🌴 Sníš o svobodě
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Čas • Peníze • Nezávislost
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-600">
                <p className="text-xl font-bold text-gray-900">
                  🏆 Úspěšné podnikání
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Na který můžeš být hrdý
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-600">
                <p className="text-xl font-bold text-gray-900">
                  ✈️ Dovolená v klidu
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Bez stresu o byznys
                </p>
              </div>
            </div>
          </div>

          {/* ČERVENÁ - NENÍ TO PRO TEBE */}
          <div className="bg-white/95 rounded-2xl p-6 shadow-2xl">
            <p className="text-2xl font-black text-gray-900 mb-4 text-center">
              ❌ NENÍ TO PRO TEBE
            </p>

            <div className="space-y-3">
              <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-600">
                <p className="text-base text-gray-700">
                  ❌ Podnikání ti šlape jak hodinky
                </p>
              </div>

              <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-600">
                <p className="text-base text-gray-700">
                  ❌ Drtíš konkurenci každý měsíc
                </p>
              </div>

              <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-600">
                <p className="text-base text-gray-700">
                  ❌ Zákazníci se ti sami hlásí
                </p>
              </div>

              <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-600">
                <p className="text-base text-gray-700">
                  ❌ Máš jasný plán na další rok
                </p>
              </div>

              <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-600">
                <p className="text-base text-gray-700">
                  ❌ Máš čas na rodinu i byznys
                </p>
              </div>
              
              {/* PUNCH - gratulace */}
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-5 border-2 border-green-400 mt-4">
                <p className="text-lg font-black text-gray-900 mb-1">
                  Pokud tohle všechno máš...
                </p>
                <p className="text-2xl font-black text-green-700">
                  GRATULACE 🎉
                </p>
                <p className="text-base font-bold text-gray-700 mt-1">
                  Nás nepotřebuješ
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl px-8 py-4 mb-4 shadow-2xl text-center">
          <p className="text-3xl font-black mb-1">
            Tak co? Chceš to změnit?
          </p>
          <p className="text-xl">
            Dělí tě 90 minut
          </p>
        </div>

        {/* CTA - SOFT */}
        <div className="text-center">
          <div className="bg-white/95 rounded-2xl px-8 py-4 inline-block shadow-2xl">
            <p className="text-2xl font-black text-gray-900">
              CHCI TO ZMĚNIT →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Warm1SocialProofAdjusted() {
  // WARM #1: 22 podnikatelů - CLEAN VERZE!
  // Jednoduchá: číslo 22 → co už mají → TY POŘÁD ČEKÁŠ punch → soft brand
  return (
    <div className="h-full bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 flex flex-col items-center justify-center px-12 py-8 text-center">
      {/* Badge nahoře - v normálním flow */}
      <div className="mb-8">
        <div className="bg-green-400 text-gray-900 px-6 py-2 rounded-full shadow-xl border-2 border-green-500">
          <p className="font-black text-lg">
            ✅ 22 PODNIKATELŮ
          </p>
        </div>
      </div>

      <h1 className="text-6xl font-black text-white mb-8 leading-tight drop-shadow-lg">
        <span className="text-green-300">Už má jasno</span>
      </h1>

      {/* CO UŽ MAJÍ - benefits */}
      <div className="bg-white/95 rounded-2xl p-8 mb-8 max-w-3xl w-full shadow-2xl">
        <p className="text-2xl font-black text-gray-900 mb-6">
          Co už mají:
        </p>
        
        <div className="space-y-4">
          <div className="bg-green-50 rounded-xl p-5 border-l-4 border-green-600">
            <p className="text-2xl font-bold text-gray-900 mb-1">
              ✓ Dobře spí
            </p>
            <p className="text-lg text-gray-600">
              Žádný stres • Vědí co dělat zítra
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5 border-l-4 border-green-600">
            <p className="text-2xl font-bold text-gray-900 mb-1">
              ✓ Mohou plánovat dovolenou
            </p>
            <p className="text-lg text-gray-600">
              V klidu • Bez obav o byznys
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5 border-l-4 border-green-600">
            <p className="text-2xl font-bold text-gray-900 mb-1">
              ✓ Víc peněz pro rodinu
            </p>
            <p className="text-lg text-gray-600">
              Rostoucí příjmy • Stabilita • Budoucnost
            </p>
          </div>
        </div>
      </div>

      {/* PUNCH - TY POŘÁD ČEKÁŠ */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black rounded-2xl px-12 py-6 mb-8 shadow-lg">
        <p className="text-5xl font-black">
          Ty pořád čekáš?
        </p>
      </div>

      {/* BRAND menší */}
      <div className="mb-6">
        <p className="text-4xl font-black text-white mb-2">
          PODNIKATELSKÁ ČTVRTKA
        </p>
        <p className="text-xl text-gray-300">
          90 minut • Model podnikání
        </p>
      </div>

      {/* CTA soft */}
      <div className="bg-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-xl">
        <p className="text-2xl font-bold">Podnikatelská Čtvrtka</p>
      </div>
    </div>
  );
}

export const warmAdsAdjustedMetadata = [
  {
    id: 'warm-4-objection',
    name: 'WARM #4: Objection Handler',
    subtitle: 'Nevím jestli je to pro mě (ADJUSTED)',
    format: 'Qualification • Emotional',
    budget: '20 Kč/den',
    trigger: 'Self-qualification • Emotional resonance • Clear fit'
  },
  {
    id: 'warm-1-social-proof',
    name: 'WARM #1: Social Proof',
    subtitle: '22 podnikatelů už má jasno (ADJUSTED)',
    format: 'FOMO • Bandwagon • Competitive threat',
    budget: '20 Kč/den',
    trigger: 'FOMO • Social validation • Urgency'
  }
];
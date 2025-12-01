// 🎯 "JEDINÁ VĚC" - VALUE + TESTIMONIAL HYBRID
// Místo T1 (Petr story)
// Simple, jasné, zaujme

export function TheOneThing() {
  return (
    <div className="h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center p-8">
      {/* BADGE nahoře - v normálním flow */}
      <div className="mb-8">
        <div className="bg-purple-400 text-gray-900 px-6 py-2 rounded-full shadow-xl border-2 border-purple-500">
          <p className="font-black text-lg">
            💎 TOHLE POTŘEBUJEŠ
          </p>
        </div>
      </div>

      <div className="max-w-4xl w-full">
        {/* Hook */}
        <h1 className="text-6xl font-black text-white mb-4 text-center leading-tight drop-shadow-lg">
          Jediná věc,<br/>
          <span className="text-yellow-300">kterou potřebuješ</span>
        </h1>

        <p className="text-2xl text-gray-300 mb-8 text-center">
          k úspěšnému podnikání
        </p>

        {/* Main Content */}
        <div className="bg-white/95 rounded-2xl p-8 mb-6 shadow-2xl">
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">📋</div>
            <p className="text-4xl font-black text-gray-900 mb-2">
              Model podnikání
            </p>
            <p className="text-xl text-gray-600">
              To je všechno. Vážně.
            </p>
          </div>

          <div className="h-px bg-gray-300 my-6"></div>

          {/* What it gives you */}
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-600">
              <p className="text-2xl font-bold text-gray-900 mb-2">
                ✓ Jasno
              </p>
              <p className="text-base text-gray-600">
                Víš přesně kam jdeš • Žádné chaos
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-5 border-l-4 border-green-600">
              <p className="text-2xl font-bold text-gray-900 mb-2">
                ✓ Akční plán
              </p>
              <p className="text-base text-gray-600">
                Víš co dělat zítra ráno • Konkrétní kroky
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-600">
              <p className="text-2xl font-bold text-gray-900 mb-2">
                ✓ Rostoucí příjmy
              </p>
              <p className="text-base text-gray-600">
                Víš jak vydělávat víc • Stabilita
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial hybrid */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border-2 border-white/30">
          <div className="flex items-start gap-4">
            <div className="text-5xl">💬</div>
            <div className="flex-1">
              <p className="text-xl text-white mb-2 italic">
                "Za 2 hodiny jsem konečně věděl, kam jdu. Model mi dal jasno."
              </p>
              <p className="text-base text-gray-300">
                — Podnikatel z Prahy
              </p>
            </div>
          </div>
        </div>

        {/* Time urgency */}
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-2xl px-8 py-5 mb-6 shadow-2xl text-center">
          <p className="text-3xl font-black mb-2">
            Za 90 minut budeš mít svůj
          </p>
          <p className="text-2xl">
            Podnikatelská Čtvrtka = tvůj model
          </p>
        </div>

        {/* CTA - SOFT */}
        <div className="text-center">
          <div className="bg-white/95 rounded-2xl px-10 py-5 inline-block shadow-2xl">
            <p className="text-3xl font-black text-gray-900">
              Chci svůj model →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const theOneThingMetadata = {
  id: 'the-one-thing',
  name: 'JEDINÁ VĚC',
  subtitle: 'Model podnikání - to je všechno',
  format: 'Value + Testimonial hybrid',
  budget: '20 Kč/den',
  trigger: 'Simplicity • Clarity • One thing focus'
};
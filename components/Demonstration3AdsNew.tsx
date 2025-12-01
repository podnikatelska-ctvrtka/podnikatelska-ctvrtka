// 🎯 DEMONSTRATION ADS (3x) - NOVÉ FORMÁTY!
// #1: PHOTO STYLE - Autentický člověk s papírem
// #2: DEEP DIVE - Konkrétní příklad (kosmetický salon)
// #3: VIDEO LOOK - Fake video frame "Proč to funguje"

export function Demo1PhotoAuthentic() {
  // D1: CO JE UVNITŘ - ukázat PROCES vyplnění, ne jen výsledek
  return (
    <div className="h-full bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 flex flex-col items-center justify-center px-12 py-10 text-center relative">
      {/* Ukázka JAK SE TO VYPLŇUJE */}
      
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full mb-8 relative">
        <p className="text-4xl font-black text-gray-900 mb-3">
          CO JE UVNITŘ?
        </p>
        <p className="text-2xl text-gray-600 mb-8">
          Vyplníš 4 pole • Vyjde ti hotový plán
        </p>

        {/* Simulace procesu vyplnění */}
        <div className="bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl p-8 mb-6 relative">
          {/* Papír s čtvrtkou - PROCES VYPLNĚNÍ */}
          <div className="bg-white rounded-lg shadow-xl p-7 border-4 border-gray-300 relative">
            {/* Grid čtvrtky s VYSVĚTLENÍM co do toho napsat */}
            <div className="grid grid-cols-2 gap-5 mb-6">
              {/* Q1 - Zákazník */}
              <div className="bg-blue-50 p-5 rounded-lg border-3 border-blue-400 relative">
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full inline-block mb-3">
                  <p className="text-base font-black">1️⃣ ZÁKAZNÍK</p>
                </div>
                <p className="text-lg font-bold text-gray-900 mb-2">
                  Komu prodáváš?
                </p>
                <div className="bg-white p-3 rounded border-2 border-dashed border-blue-300 text-left">
                  <p className="text-base text-gray-700">
                    "Např: Ženy 30-45,<br/>
                    co chtějí hubnout..."
                  </p>
                </div>
              </div>
              
              {/* Q2 - Hodnota */}
              <div className="bg-purple-50 p-5 rounded-lg border-3 border-purple-400 relative">
                <div className="bg-purple-600 text-white px-3 py-1 rounded-full inline-block mb-3">
                  <p className="text-base font-black">2️⃣ HODNOTA</p>
                </div>
                <p className="text-lg font-bold text-gray-900 mb-2">
                  Co jim řešíš?
                </p>
                <div className="bg-white p-3 rounded border-2 border-dashed border-purple-300 text-left">
                  <p className="text-base text-gray-700">
                    "Např: Chudnutí<br/>
                    bez hladu..."
                  </p>
                </div>
              </div>
              
              {/* Q3 - Finance */}
              <div className="bg-yellow-50 p-5 rounded-lg border-3 border-yellow-400 relative">
                <div className="bg-yellow-600 text-white px-3 py-1 rounded-full inline-block mb-3">
                  <p className="text-base font-black">3️⃣ FINANCE</p>
                </div>
                <p className="text-lg font-bold text-gray-900 mb-2">
                  Kolik stojí? Kolik chceš?
                </p>
                <div className="bg-white p-3 rounded border-2 border-dashed border-yellow-300 text-left">
                  <p className="text-base text-gray-700">
                    "Např: 5.000 Kč/měsíc<br/>
                    20 klientů = 100K"
                  </p>
                </div>
              </div>
              
              {/* Q4 - Marketing */}
              <div className="bg-green-50 p-5 rounded-lg border-3 border-green-400 relative">
                <div className="bg-green-600 text-white px-3 py-1 rounded-full inline-block mb-3">
                  <p className="text-base font-black">4️⃣ MARKETING</p>
                </div>
                <p className="text-lg font-bold text-gray-900 mb-2">
                  Kde je najdeš?
                </p>
                <div className="bg-white p-3 rounded border-2 border-dashed border-green-300 text-left">
                  <p className="text-base text-gray-700">
                    "Např: FB skupiny<br/>
                    pro maminky..."
                  </p>
                </div>
              </div>
            </div>
            
            {/* Arrow dolů */}
            <div className="text-center mb-4">
              <div className="text-5xl text-gray-400">⬇️</div>
            </div>
            
            {/* VÝSLEDEK - TRANSFORMACE V JAZYCE ZÁKAZNÍKŮ */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-xl">
              <p className="text-3xl font-black text-white mb-3">
                = VÝSLEDEK
              </p>
              <div className="space-y-2">
                <p className="text-xl text-white flex items-center gap-2">
                  💰 <span>Víš přesně kolik budeš mít peníze</span>
                </p>
                <p className="text-xl text-white flex items-center gap-2">
                  ⏰ <span>Konečně máš jasný plán (ne chaos)</span>
                </p>
                <p className="text-xl text-white flex items-center gap-2">
                  😌 <span>Klidně spíš (víš že to funguje)</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Ruka/tužka simulace */}
          <div className="absolute bottom-4 right-8 text-5xl opacity-50">
            ✍️
          </div>
        </div>
        
        <p className="text-3xl font-black text-gray-900 mb-3">
          Za 90 minut
        </p>
        <p className="text-xl text-gray-600 mb-5">
          Máš peníze • Máš klid • Máš čas
        </p>
        
        <div className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-lg shadow-lg">
          <p className="text-2xl font-black">Vyplnit za 90 minut →</p>
        </div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm text-gray-900 px-12 py-5 rounded-xl shadow-lg border-2 border-gray-300">
        <p className="text-3xl font-black">Chci hotový plán →</p>
      </div>
      
      {/* Authentic watermark */}
      <div className="absolute bottom-10 left-10 text-gray-400 text-base">
        📋 Vyplníš • Máš hotovo • Easy
      </div>
    </div>
  );
}

export function Demo2DeepDive() {
  // SKUTEČNÝ PŘÍKLAD - salon, ale JINÁ PROBLEMATIKA (ne ceny!)
  return (
    <div className="h-full bg-gradient-to-br from-pink-900 via-rose-900 to-purple-900 flex items-center justify-center p-10 relative">
      {/* BADGE nahoře */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-pink-400 text-gray-900 px-6 py-2 rounded-full shadow-xl border-2 border-pink-500">
          <p className="font-black text-lg">
            🏆 VÝSLEDEK
          </p>
        </div>
      </div>

      <div className="max-w-5xl w-full mt-20">
        {/* Header */}
        <div className="text-center mb-8">
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
          {/* Problem - NOVÝ! Ne o penězích */}
          <div className="bg-red-900/40 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-500/50">
            <div className="flex items-start gap-5">
              <div className="text-5xl">😰</div>
              <div className="flex-1">
                <p className="text-3xl font-black text-red-300 mb-3">
                  PROBLÉM:
                </p>
                <p className="text-2xl text-white mb-2">
                  "Nevím KOMU přesně prodávat. Co říct. Jak oslovit."
                </p>
                <p className="text-xl text-red-200">
                  Nabízí všem • Všechno • Žádný jasný profil
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
                      <p className="text-lg text-gray-600">Zjistila PŘESNĚ kdo je ideální klientka (35+ ženy, péče o pleť)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="text-xl font-bold text-gray-900">Definovali hodnotu</p>
                      <p className="text-lg text-gray-600">Co přesně řeší • Proč si vybrat ji • Jak komunikovat</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="text-xl font-bold text-gray-900">Hotový marketing</p>
                      <p className="text-lg text-gray-600">Ví co říct • Komu to říct • Jak to říct</p>
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
                  Jasný profil = +40% příjmů
                </p>
                <p className="text-xl text-green-100">
                  Ví co dělá • Jasný marketing • Klientky přicházejí
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
              Chci taky jasno →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Demo3VideoLook() {
  // D3: TAKHLE JE TO EASY - 5 ÚDERNÝCH kroků s gradienty
  return (
    <div className="h-full bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-12">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-3 rounded-full inline-block mb-6 shadow-lg">
            <p className="text-xl font-black">🎬 JAK TO FUNGUJE</p>
          </div>
          <h1 className="text-6xl font-black text-white mb-4">
            Takhle je to <span className="text-yellow-300">EASY</span>
          </h1>
          <p className="text-2xl text-blue-200">
            5 kroků • 90 minut • Hotovo
          </p>
        </div>

        {/* Flow steps - ÚDERNÉ! */}
        <div className="space-y-4 mb-10">
          {/* Step 1 */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 shadow-xl border-2 border-green-400">
            <div className="flex items-center gap-4">
              <div className="bg-white text-green-600 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                <p className="text-3xl font-black">1</p>
              </div>
              <div className="flex-1">
                <p className="text-2xl font-black text-white mb-2">Zapneš kurz → Víš co dělat</p>
                <p className="text-lg text-green-100">Krok za krokem tě vedeme • Žádná teorie</p>
              </div>
              <div className="text-5xl">🎯</div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 shadow-xl border-2 border-blue-400">
            <div className="flex items-center gap-4">
              <div className="bg-white text-blue-600 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                <p className="text-3xl font-black">2</p>
              </div>
              <div className="flex-1">
                <p className="text-2xl font-black text-white mb-2">Vyplníš SVŮJ model</p>
                <p className="text-lg text-blue-100">Konkrétní odpovědi na otázky • Tvůj byznys</p>
              </div>
              <div className="text-5xl">✍️</div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 shadow-xl border-2 border-purple-400">
            <div className="flex items-center gap-4">
              <div className="bg-white text-purple-600 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                <p className="text-3xl font-black">3</p>
              </div>
              <div className="flex-1">
                <p className="text-2xl font-black text-white mb-2">Validace + Finanční analýza</p>
                <p className="text-lg text-purple-100">Okamžitě vidíš kde vyděláš a kde tratíš</p>
              </div>
              <div className="text-5xl">💰</div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-6 shadow-xl border-2 border-orange-400">
            <div className="flex items-center gap-4">
              <div className="bg-white text-orange-600 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                <p className="text-3xl font-black">4</p>
              </div>
              <div className="flex-1">
                <p className="text-2xl font-black text-white mb-2">Optimalizace → Dotáhneš detaily</p>
                <p className="text-lg text-orange-100">Opravíš slabiny • Posílíš co funguje</p>
              </div>
              <div className="text-5xl">🔥</div>
            </div>
          </div>

          {/* Step 5 - WIN */}
          <div className="bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl p-8 shadow-2xl border-4 border-yellow-600">
            <div className="flex items-center gap-4">
              <div className="bg-black text-yellow-400 rounded-full w-20 h-20 flex items-center justify-center flex-shrink-0">
                <p className="text-4xl font-black">✓</p>
              </div>
              <div className="flex-1">
                <p className="text-3xl font-black text-gray-900 mb-2">WIN → Akční plán!</p>
                <p className="text-xl text-gray-800">Víš přesně co dělat zítra • Růst začíná teď</p>
              </div>
              <div className="text-6xl">🚀</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-white/95 rounded-2xl px-10 py-6 inline-block shadow-2xl">
            <p className="text-3xl font-black text-gray-900 mb-2">
              Vypadá to easy, protože to easy JE →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const demonstration3AdsNewMetadata = [
  {
    id: 'demo-1-photo',
    name: 'DEMO #1: Photo',
    subtitle: 'Autentický hotový model',
    format: 'Photo style - realistic',
    budget: '20 Kč/den',
    trigger: 'Physical proof • Authenticity • Real result'
  },
  {
    id: 'demo-2-deep-dive',
    name: 'DEMO #2: Deep Dive',
    subtitle: 'Konkrétní příklad (kosmetický salon)',
    format: 'Interactive carousel',
    budget: '20 Kč/den',
    trigger: 'Educational • Process clarity • Step-by-step'
  },
  {
    id: 'demo-3-video',
    name: 'DEMO #3: Video Look',
    subtitle: 'Proč to funguje (logic)',
    format: 'Video frame look',
    budget: '20 Kč/den',
    trigger: 'Intellectual buy-in • Trust through logic • Comparison'
  }
];
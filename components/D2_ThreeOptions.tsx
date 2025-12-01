// 🎯 D2 - TŘI VARIANTY NA VÝBĚR!
// Option A: CO DOSTANEŠ (Inventory/breakdown)
// Option C: DEEP DIVE PŘÍKLAD (Jeden konkrétní byznys)
// Option D: BEFORE/AFTER MODEL (Prázdný → Vyplněný)

export function D2_OptionA_CoDostanes() {
  // CO DOSTANEŠ - Visual inventory
  return (
    <div className="h-full bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 flex items-center justify-center p-12">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-yellow-400 text-black px-8 py-3 rounded-full inline-block mb-6 shadow-lg">
            <p className="text-xl font-black">📦 INSIDE THE BOX</p>
          </div>
          <h1 className="text-6xl font-black text-white mb-4">
            Co dostaneš?
          </h1>
          <p className="text-2xl text-purple-200">
            Kompletní systém • Nic nechybí
          </p>
        </div>

        {/* Inventory grid - 2x3 */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          {/* Item 1 */}
          <div className="bg-white/95 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="text-5xl">📋</div>
              <div>
                <p className="text-2xl font-black text-gray-900 mb-2">
                  Model podnikání
                </p>
                <p className="text-lg text-gray-600">
                  Vyplníš za 90 minut • 9 bloků
                </p>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-white/95 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="text-5xl">🎯</div>
              <div>
                <p className="text-2xl font-black text-gray-900 mb-2">
                  Profil zákazníka
                </p>
                <p className="text-lg text-gray-600">
                  Víš komu prodávat • Detailně
                </p>
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-white/95 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="text-5xl">💰</div>
              <div>
                <p className="text-2xl font-black text-gray-900 mb-2">
                  Finanční analýza
                </p>
                <p className="text-lg text-gray-600">
                  Vidíš kde vyděláš • Automaticky
                </p>
              </div>
            </div>
          </div>

          {/* Item 4 */}
          <div className="bg-white/95 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="text-5xl">✅</div>
              <div>
                <p className="text-2xl font-black text-gray-900 mb-2">
                  Validace + doporučení
                </p>
                <p className="text-lg text-gray-600">
                  Okamžitá zpětná vazba
                </p>
              </div>
            </div>
          </div>

          {/* Item 5 */}
          <div className="bg-white/95 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="text-5xl">📚</div>
              <div>
                <p className="text-2xl font-black text-gray-900 mb-2">
                  Knihovna modelů
                </p>
                <p className="text-lg text-gray-600">
                  Inspirace z reálných byznysů
                </p>
              </div>
            </div>
          </div>

          {/* Item 6 */}
          <div className="bg-white/95 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="text-5xl">🚀</div>
              <div>
                <p className="text-2xl font-black text-gray-900 mb-2">
                  Akční plán
                </p>
                <p className="text-lg text-gray-600">
                  Co dělat hned zítra
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 mb-8 text-center shadow-2xl">
          <p className="text-4xl font-black text-white mb-3">
            Vše v jednom kurzu
          </p>
          <p className="text-xl text-green-100">
            90 minut • Hotový systém • Víš co dělat
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-white/95 rounded-2xl px-10 py-6 inline-block shadow-2xl">
            <p className="text-3xl font-black text-gray-900">
              Chci kompletní systém →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function D2_OptionC_DeepDive() {
  // DEEP DIVE - Jeden konkrétní příklad (Kosmetický salon)
  return (
    <div className="h-full bg-gradient-to-br from-pink-900 via-rose-900 to-purple-900 flex items-center justify-center p-12">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-pink-400 text-white px-8 py-3 rounded-full inline-block mb-6 shadow-lg">
            <p className="text-xl font-black">🔍 REAL EXAMPLE</p>
          </div>
          <h1 className="text-6xl font-black text-white mb-4">
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
        <div className="space-y-6 mb-10">
          {/* Problem */}
          <div className="bg-red-900/40 backdrop-blur-sm rounded-2xl p-8 border-2 border-red-500/50">
            <div className="flex items-start gap-6">
              <div className="text-6xl">😰</div>
              <div className="flex-1">
                <p className="text-3xl font-black text-red-300 mb-3">
                  PROBLÉM:
                </p>
                <p className="text-xl text-white mb-2">
                  "Mám klientky, ale vydělávám málo. Nevím proč."
                </p>
                <p className="text-lg text-red-200">
                  Chaos, neví kam jít, pracuje 12h denně
                </p>
              </div>
            </div>
          </div>

          {/* What we did */}
          <div className="bg-white/95 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-start gap-6">
              <div className="text-6xl">📋</div>
              <div className="flex-1">
                <p className="text-3xl font-black text-gray-900 mb-4">
                  CO JSME UDĚLALI:
                </p>
                
                <div className="space-y-4">
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
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 border-4 border-green-400 shadow-2xl">
            <div className="flex items-start gap-6">
              <div className="text-6xl">🎉</div>
              <div className="flex-1">
                <p className="text-3xl font-black text-white mb-3">
                  VÝSLEDEK:
                </p>
                <p className="text-2xl text-white mb-2">
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
        <div className="bg-yellow-400 rounded-2xl p-8 mb-8 text-center shadow-2xl">
          <p className="text-4xl font-black text-gray-900 mb-3">
            TEĎKA TY
          </p>
          <p className="text-xl text-gray-800">
            Stejný systém • Tvůj byznys • 90 minut
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-white/95 rounded-2xl px-10 py-6 inline-block shadow-2xl">
            <p className="text-3xl font-black text-gray-900">
              Chci taky výsledky →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function D2_OptionD_BeforeAfter() {
  // BEFORE/AFTER MODEL - Prázdný vs Vyplněný (visual transformation)
  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-12">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-8 py-3 rounded-full inline-block mb-6 shadow-lg">
            <p className="text-xl font-black">🎨 TRANSFORMACE</p>
          </div>
          <h1 className="text-6xl font-black text-white mb-4">
            Takhle vypadá TVŮJ model
          </h1>
          <p className="text-2xl text-gray-300 mb-2">
            Před kurzem → Po kurzu
          </p>
          <p className="text-xl text-gray-400">
            90 minut • Z chaosu k jasnu
          </p>
        </div>

        {/* Split view */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          {/* PŘED - Empty/chaos */}
          <div className="space-y-4">
            <div className="bg-red-900/30 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-500/50 text-center">
              <p className="text-4xl font-black text-red-300 mb-2">
                PŘED
              </p>
              <p className="text-xl text-red-200">
                Prázdný • Chaos • Nevím
              </p>
            </div>

            {/* Empty model visualization */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[...Array(9)].map((_, i) => (
                  <div 
                    key={i}
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 min-h-[80px] flex items-center justify-center"
                  >
                    <p className="text-4xl text-gray-600">❓</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">❌</span>
                  <p className="text-lg text-gray-400">Nevím komu prodávat</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">❌</span>
                  <p className="text-lg text-gray-400">Nevím kde vydělávám</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">❌</span>
                  <p className="text-lg text-gray-400">Nevím co dělat</p>
                </div>
              </div>
            </div>
          </div>

          {/* PO - Filled/clarity */}
          <div className="space-y-4">
            <div className="bg-green-900/30 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-500/50 text-center">
              <p className="text-4xl font-black text-green-300 mb-2">
                PO
              </p>
              <p className="text-xl text-green-200">
                Vyplněný • Jasný • Vím přesně
              </p>
            </div>

            {/* Filled model visualization */}
            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { icon: '💎', color: 'from-indigo-600 to-purple-600' },
                  { icon: '⚡', color: 'from-blue-600 to-cyan-600' },
                  { icon: '🤝', color: 'from-amber-600 to-orange-600' },
                  { icon: '🤝', color: 'from-sky-600 to-blue-600' },
                  { icon: '🎯', color: 'from-purple-600 to-pink-600' },
                  { icon: '🔧', color: 'from-violet-600 to-purple-600' },
                  { icon: '📢', color: 'from-cyan-600 to-blue-600' },
                  { icon: '💰', color: 'from-red-600 to-rose-600' },
                  { icon: '💸', color: 'from-green-600 to-emerald-600' }
                ].map((block, i) => (
                  <div 
                    key={i}
                    className={`bg-gradient-to-br ${block.color} rounded-lg p-4 border border-white/20 min-h-[80px] flex items-center justify-center shadow-lg`}
                  >
                    <p className="text-3xl">{block.icon}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <p className="text-lg text-white font-bold">Jasný zákaznický profil</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <p className="text-lg text-white font-bold">Vidíš finanční model</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <p className="text-lg text-white font-bold">Máš akční plán</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow + time */}
        <div className="text-center mb-10">
          <div className="bg-yellow-400 text-black rounded-2xl px-10 py-6 inline-block shadow-2xl">
            <p className="text-5xl font-black mb-2">
              ⬆️ 90 MINUT ⬆️
            </p>
            <p className="text-xl">
              Z nejistoty k jistotě
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-white/95 rounded-2xl px-10 py-6 inline-block shadow-2xl">
            <p className="text-3xl font-black text-gray-900">
              Chci z prázdného na hotový →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const d2ThreeOptionsMetadata = [
  {
    id: 'd2-option-a',
    name: 'OPTION A: Co dostaneš',
    subtitle: 'Inventory/breakdown všeho',
    format: 'Grid showcase',
    angle: 'Complete system • All-in-one • Nothing missing'
  },
  {
    id: 'd2-option-c',
    name: 'OPTION C: Deep dive',
    subtitle: 'Jeden konkrétní příklad (salon)',
    format: 'Case study walkthrough',
    angle: 'Real example • Relatable • Concrete results'
  },
  {
    id: 'd2-option-d',
    name: 'OPTION D: Before/After',
    subtitle: 'Prázdný → Vyplněný model',
    format: 'Visual transformation',
    angle: 'Visual proof • Clarity transformation • Your result'
  }
];

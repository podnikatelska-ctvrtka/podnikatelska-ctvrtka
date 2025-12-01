// 🎯 NOVÉ OMNIPRESENT ADS - 3 ADS!
// #1: D4 NEW - COMPARISON (Před → Po) - DEMO!
// #2: D3 NEW - VIDEO ANIMACE (Easy flow) - DEMO!
// #3: D2 NEW - KNIHOVNA MODELŮ (Vidíš jak to dělají ostatní) - DEMO!

export function ComparisonBeforeAfter() {
  // D4 - Před → Po - DEMO KATEGORIE!
  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-12">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-yellow-400 text-black px-8 py-3 rounded-full inline-block mb-6 shadow-lg">
            <p className="text-xl font-black">PŘED → PO</p>
          </div>
          <h1 className="text-6xl font-black text-white mb-4">
            Co se změní?
          </h1>
          <p className="text-2xl text-gray-300">
            90 minut s Čtvrtkou
          </p>
        </div>

        {/* Split comparison */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          {/* PŘED */}
          <div className="bg-gradient-to-br from-red-900/40 to-red-800/40 backdrop-blur-sm rounded-3xl p-8 border-4 border-red-500/50">
            <div className="text-center mb-6">
              <p className="text-5xl mb-3">😰</p>
              <p className="text-4xl font-black text-red-300">PŘED</p>
            </div>

            <div className="space-y-4">
              <div className="bg-red-900/60 rounded-xl p-4 border-2 border-red-500/30">
                <p className="text-xl text-white">❌ Nevím proč to nejde</p>
              </div>
              <div className="bg-red-900/60 rounded-xl p-4 border-2 border-red-500/30">
                <p className="text-xl text-white">❌ Každý měsíc jinak</p>
              </div>
              <div className="bg-red-900/60 rounded-xl p-4 border-2 border-red-500/30">
                <p className="text-xl text-white">❌ Strach z budoucnosti</p>
              </div>
              <div className="bg-red-900/60 rounded-xl p-4 border-2 border-red-500/30">
                <p className="text-xl text-white">❌ Nespím v noci</p>
              </div>
            </div>
          </div>

          {/* PO */}
          <div className="bg-gradient-to-br from-green-900/40 to-emerald-800/40 backdrop-blur-sm rounded-3xl p-8 border-4 border-green-500/50">
            <div className="text-center mb-6">
              <p className="text-5xl mb-3">🎯</p>
              <p className="text-4xl font-black text-green-300">PO</p>
            </div>

            <div className="space-y-4">
              <div className="bg-green-900/60 rounded-xl p-4 border-2 border-green-500/30">
                <p className="text-xl text-white">✅ Vím kde vyděláš</p>
              </div>
              <div className="bg-green-900/60 rounded-xl p-4 border-2 border-green-500/30">
                <p className="text-xl text-white">✅ Konzistentní systém</p>
              </div>
              <div className="bg-green-900/60 rounded-xl p-4 border-2 border-green-500/30">
                <p className="text-xl text-white">✅ Jistota & klid</p>
              </div>
              <div className="bg-green-900/60 rounded-xl p-4 border-2 border-green-500/30">
                <p className="text-xl text-white">✅ Klidně spíš</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-white/95 rounded-2xl px-10 py-6 inline-block shadow-2xl">
            <p className="text-4xl font-black text-gray-900">
              Chci z leva doprava →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VideoAnimationEasyFlow() {
  // D3 - ÚDERNÉ TEXTY! - Animace postupu
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

export function LibraryOfModels() {
  // D2 - DEMONSTRATION 2! - Knihovna modelů
  return (
    <div className="h-full bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 flex items-center justify-center p-12">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-black px-8 py-3 rounded-full inline-block mb-6 shadow-lg">
            <p className="text-xl font-black">🎁 BONUS</p>
          </div>
          <h1 className="text-6xl font-black text-white mb-4">
            NEBUDEŠ NA TO SÁM
          </h1>
          <p className="text-3xl text-cyan-200 mb-2">
            Knihovna <span className="text-yellow-300 font-black">skutečných modelů</span>
          </p>
          <p className="text-xl text-cyan-300">
            z reálných byznysů
          </p>
        </div>

        {/* Gallery - kompaktní */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: '🧘', title: 'Jóga studio' },
            { icon: '💇', title: 'Kadeřnictví' },
            { icon: '📦', title: 'Eshop' },
            { icon: '💼', title: 'Kouč' },
            { icon: '🍰', title: 'Cukrárna' },
            { icon: '🏋️', title: 'Posilovna' }
          ].map((model, i) => (
            <div key={i} className="bg-white/95 rounded-xl p-4 shadow-xl text-center">
              <div className="text-4xl mb-2">{model.icon}</div>
              <p className="text-lg font-black text-gray-900 mb-2">{model.title}</p>
              <div className="bg-green-100 rounded px-3 py-1">
                <p className="text-xs font-bold text-green-700">✅ HOTOVÝ</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="text-center mb-8">
          <div className="bg-yellow-400 text-black px-6 py-3 rounded-xl inline-block shadow-lg">
            <p className="text-xl font-black">+ desítky dalších 🔥</p>
          </div>
        </div>

        {/* Benefits - ÚDERNÉ TEXTY! */}
        <div className="bg-white/90 rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <span className="text-4xl">✅</span>
              <div>
                <p className="text-2xl font-black text-gray-900 mb-2">Vidíš jak to dělají ostatní</p>
                <p className="text-lg text-gray-700">Reálné byznys modely z praxe • Inspirace kdykoliv potřebuješ</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-4xl">✅</span>
              <div>
                <p className="text-2xl font-black text-gray-900 mb-2">Ušetříš hodiny práce</p>
                <p className="text-lg text-gray-700">Nemusíš vymýšlet od nuly • Použij osvědčené vzory</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-4xl">✅</span>
              <div>
                <p className="text-2xl font-black text-gray-900 mb-2">Vidíš strukturu úspěšného modelu</p>
                <p className="text-lg text-gray-700">Pizza, salon, eshop, kouč • Každý jiný, ale vidíš JAK přemýšlet</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-4xl">✅</span>
              <div>
                <p className="text-2xl font-black text-gray-900 mb-2">Přístup NAVŽDY</p>
                <p className="text-lg text-gray-700">Každý měsíc nové modely • Lifetime přístup bez doplatků</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl px-10 py-6 inline-block shadow-2xl">
            <p className="text-4xl font-black">
              Chci do knihovny →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const newOmnipresent3AdsMetadata = [
  {
    id: 'comparison-before-after',
    name: 'D4 NEW: Comparison Table',
    subtitle: 'Před → Po (Split vizuál)',
    format: 'Split screen comparison',
    budget: '20 Kč/den',
    objective: 'ENGAGEMENT',
    trigger: 'Visual contrast • Clear transformation • Desire state'
  },
  {
    id: 'video-animation-easy',
    name: 'D3 NEW: Video Animace',
    subtitle: 'Takhle je to easy (5 kroků)',
    format: 'Animated flow showcase',
    budget: '20 Kč/den',
    objective: 'ENGAGEMENT',
    trigger: 'Process visualization • Ease of use • Quick wins'
  },
  {
    id: 'library-of-models',
    name: 'D2 NEW: Knihovna Modelů',
    subtitle: 'Nebudeš na to sám (Social proof)',
    format: 'Gallery showcase with benefits',
    budget: '20 Kč/den',
    objective: 'ENGAGEMENT',
    trigger: 'Social proof • Community • Inspiration • Not alone'
  }
];
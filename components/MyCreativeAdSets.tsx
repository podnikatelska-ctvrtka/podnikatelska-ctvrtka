// 🎨 MÉ KREATIVNÍ AD SETY - BEZ ODKÝVÁVÁNÍ!
// Fresh angles • Neotřelé • Překvapivé!

interface CreativeAdData {
  id: string;
  name: string;
  concept: string;
  budget: string;
  background: string;
  content: React.ReactNode;
  reasoning: string;
}

const myCreativeAds: CreativeAdData[] = [
  // AD #1: ANTI-GURU - Kontrast proti "expertům"
  {
    id: 'anti-guru',
    name: 'Ad #1: ANTI-GURU',
    concept: 'Kontrast: Ty vs Všichni "experti"',
    budget: '80 Kč/den (HIGH BET)',
    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
    reasoning: `
PROČ TOHLE FUNGUJE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. KONTRAST = POZORNOST
   • Všichni říkají "Máme řešení!"
   → Ty říkáš: "Nemáme nic."
   
2. DŮVĚRYHODNOST
   • Přiznáváš problém = autenticita
   • Lidé jsou unavení z "expertů"
   
3. SCARCITY
   • Jenom 50 míst = urgence
   • První v ČR = unikátnost

4. EMOTIONAL HOOK
   • "Nikdo to neřeší" = anger
   → "Tak jsme to vytvořili" = hope
`,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-5">
        <div className="bg-red-600 text-white px-8 py-3 rounded-xl mb-5">
          <p className="text-2xl font-black">
            ⚠️ PRAVDA, KTEROU NIKDO NEŘEKNE
          </p>
        </div>

        <h1 className="text-5xl font-black text-white mb-6 leading-tight">
          V Česku žádná<br/>
          <span className="text-red-400">REÁLNÁ POMOC</span><br/>
          podnikatelům není.
        </h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 mb-5 max-w-2xl w-full border-2 border-white/30">
          <div className="space-y-3 text-left text-white">
            <p className="text-lg">
              ✅ <span className="font-bold">Guru kurzy?</span> Máme. (50 hodin teorie, nula praxe)
            </p>
            <p className="text-lg">
              ✅ <span className="font-bold">AI automaty?</span> Máme. (Nic neřeší)
            </p>
            <p className="text-lg">
              ✅ <span className="font-bold">Online konzultanti?</span> Máme. (Obecné rady)
            </p>
            <p className="text-2xl font-black text-red-400 mt-4">
              ❌ KONKRÉTNÍ METODA? NIKDE.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black rounded-xl px-8 py-5 mb-5">
          <p className="text-3xl font-black mb-2">
            TAK JSME TO VYTVOŘILI.
          </p>
          <p className="text-xl font-bold">
            První v ČR • Konečně realita • Bez keců
          </p>
        </div>

        <div className="mb-5">
          <p className="text-4xl font-black text-white mb-2">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-xl text-gray-300">
            2 nástroje poprvé v češtině • 90 minut • Hotovo
          </p>
        </div>

        <div className="bg-white text-black px-12 py-5 rounded-xl shadow-2xl mb-3">
          <p className="text-3xl font-black">CHCI VIDĚT! →</p>
        </div>

        <p className="text-yellow-300 text-lg font-bold">
          🔥 Jenom 50 lidí • První v ČR
        </p>
      </div>
    )
  },

  // AD #2: SOCIAL PROOF EXTREME - Čísla, čísla, čísla!
  {
    id: 'numbers',
    name: 'Ad #2: NÚMEROS!',
    concept: 'Čísla jsou sexy • Konkrétnost wins',
    budget: '75 Kč/den',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    reasoning: `
PROČ TOHLE FUNGUJE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ČÍSLA = KONKRÉTNOST
   • Ne "pomůžeme vám"
   → "90 minut, 9 prvků, 2 nástroje"
   
2. ROI KALKULACE
   • Vidíš přesně co získáš
   • Vs co bys zaplatil jinde
   
3. MINIMALIZACE RIZIKA
   • "Jenom 90 minut" = malý závazek
   • "Jeden papír A4" = jednoduchý
   
4. VALUE STACKING
   • Ukazuješ hodnotu vs cenu
   • 65.000 Kč ušetřeno = no-brainer
`,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-5">
        <div className="bg-blue-600 text-white px-6 py-2 rounded-xl mb-4">
          <p className="text-lg font-black">
            📊 ČÍSLA, KTERÁ MLUVÍ ZA VŠE
          </p>
        </div>

        <h1 className="text-6xl font-black text-white mb-5 leading-none">
          90<span className="text-blue-400">min</span>
        </h1>

        <p className="text-2xl text-gray-300 mb-6">
          To je všechno, co potřebuješ.
        </p>

        <div className="bg-white rounded-xl p-5 mb-5 max-w-2xl w-full">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-4xl font-black text-blue-600">9</p>
              <p className="text-sm text-gray-700">Stavebních<br/>prvků</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-green-600">2</p>
              <p className="text-sm text-gray-700">Vědecké<br/>nástroje</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-black text-orange-600">1</p>
              <p className="text-sm text-gray-700">Papír<br/>A4</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-lg p-4 border-2 border-red-300">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-bold">VS jiné řešení:</span>
            </p>
            <div className="space-y-1 text-left text-sm">
              <p>• Guru kurz: <span className="line-through">50 hodin</span></p>
              <p>• Konzultant: <span className="line-through">3 měsíce čekání</span></p>
              <p>• Agentura: <span className="line-through">30.000+ Kč/měsíc</span></p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-10 py-4 mb-5">
          <p className="text-3xl font-black">
            4.999 Kč
          </p>
          <p className="text-base font-bold">
            (místo 65.000+ Kč jinde)
          </p>
        </div>

        <div className="mb-4">
          <p className="text-2xl font-black text-white mb-1">
            Podnikatelská Čtvrtka
          </p>
          <p className="text-base text-gray-300">
            Čísla nelamou • Funguje to
          </p>
        </div>

        <div className="bg-white text-black px-12 py-5 rounded-xl shadow-2xl mb-3">
          <p className="text-3xl font-black">CHCI ČÍSLA! →</p>
        </div>

        <p className="text-yellow-300 text-base font-bold">
          ⚡ 50 míst • Průkopnická cena
        </p>
      </div>
    )
  },

  // AD #3: VISUAL METAPHOR - Čtvrtka = jednoduchý!
  {
    id: 'visual-simple',
    name: 'Ad #3: VISUAL MAGIC',
    concept: 'Čtvrtka jako metafora • Visual storytelling',
    budget: '70 Kč/den',
    background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
    reasoning: `
PROČ TOHLE FUNGUJE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. VISUAL METAPHOR
   • Čtvrtka = jednoduchost
   • Fyzický objekt = tangible
   
2. KONTRAST VELIKOSTI
   • "50 hodin teorie" vs "1 papír A4"
   • Překvapivý kontrast = zapamatovatelné
   
3. NAME DROP
   • "Čtvrtka" v názvu = branding
   • Opakování = zapamatování
   
4. SIMPLICITY APPEAL
   • Lidé chtějí jednoduché
   • "Celý byznys na A4" = wow!
`,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-5">
        <div className="mb-5">
          <div className="bg-white rounded-lg p-8 w-48 h-64 shadow-2xl border-4 border-yellow-400 mx-auto relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-6xl">📄</p>
            </div>
            <div className="absolute -top-3 -right-3 bg-red-600 text-white px-3 py-1 rounded-full">
              <p className="text-sm font-black">A4</p>
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-black text-white mb-3 leading-tight">
          Celý tvůj byznys<br/>
          <span className="text-yellow-300">NA JEDNÉ STRÁNCE</span>
        </h1>

        <p className="text-xl text-gray-300 mb-6 max-w-lg">
          Ne 300 stránek strategických dokumentů.<br/>
          Ne 50 hodin online kurzů.<br/>
          <span className="text-white font-bold">Jenom 1 papír A4.</span>
        </p>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 mb-5 max-w-2xl w-full border-2 border-white/30">
          <p className="text-2xl font-bold text-yellow-300 mb-3">
            PROČ TO FUNGUJE?
          </p>
          <div className="space-y-2 text-left text-white">
            <p className="text-base">
              ✓ <span className="font-bold">Vidíš všechno najednou</span> (ne 50 záložek v browseru)
            </p>
            <p className="text-base">
              ✓ <span className="font-bold">Žádné zbytečnosti</span> (jen co potřebuješ)
            </p>
            <p className="text-base">
              ✓ <span className="font-bold">Měníš strategii za 5 minut</span> (ne 3 týdny)
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl px-8 py-4 mb-5">
          <p className="text-3xl font-black">
            PODNIKATELSKÁ ČTVRTKA
          </p>
          <p className="text-lg">
            Byznys model + Marketing • 90 minut
          </p>
        </div>

        <div className="bg-white text-black px-12 py-5 rounded-xl shadow-2xl mb-3">
          <p className="text-3xl font-black">CHCI ČTVRTKU! →</p>
        </div>

        <p className="text-yellow-300 text-base font-bold">
          📄 Prvních 50 • Jednoduchý = lepší
        </p>
      </div>
    )
  }
];

export function MyCreativeAdSets() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">
            🎨 MÉ KREATIVNÍ AD SETY
          </h1>
          <p className="text-2xl text-gray-400 mb-6">
            Podle mého názoru • Bez odkývávání • Fresh angles
          </p>
          <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded-xl p-6 max-w-3xl mx-auto">
            <p className="text-xl text-yellow-300 font-bold mb-2">
              💡 FILOZOFIE:
            </p>
            <p className="text-base text-white leading-relaxed">
              Neokoukávám tvé reklamy. Myslím jinak. Zkouším neotřelé úhly. 
              Možná to bude shit, možná ne - ale aspoň to není "Ano, pane!" 🤷‍♂️
            </p>
          </div>
        </div>

        {/* Ad Sets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {myCreativeAds.map((ad, index) => (
            <div key={ad.id} className="flex flex-col">
              {/* Ad Preview */}
              <div className="relative mb-6">
                <div className="absolute -top-3 -left-3 bg-yellow-400 text-black px-4 py-2 rounded-lg z-10">
                  <p className="text-sm font-black">{ad.name}</p>
                </div>
                <div 
                  className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20"
                  style={{ 
                    background: ad.background,
                    width: '100%',
                    height: '600px'
                  }}
                >
                  {ad.content}
                </div>
              </div>

              {/* Ad Info */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex-1">
                <div className="mb-4">
                  <p className="text-sm text-yellow-400 font-bold mb-1">KONCEPT:</p>
                  <p className="text-base text-white">{ad.concept}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-yellow-400 font-bold mb-1">BUDGET:</p>
                  <p className="text-base text-white">{ad.budget}</p>
                </div>
                <div>
                  <p className="text-sm text-yellow-400 font-bold mb-2">MŮJ REASONING:</p>
                  <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono bg-black/30 p-3 rounded">
                    {ad.reasoning}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-2xl p-8 border-4 border-purple-400">
          <h2 className="text-3xl font-black text-white mb-4">
            🎯 PROČ TYHLE 3?
          </h2>
          <div className="space-y-4 text-white">
            <div>
              <p className="text-xl font-bold text-yellow-300 mb-2">Ad #1: ANTI-GURU</p>
              <p className="text-base">
                • Kontrast proti "expertům" = pozornost<br/>
                • Autenticita = důvěra<br/>
                • "První v ČR" = unikátnost
              </p>
            </div>
            <div>
              <p className="text-xl font-bold text-yellow-300 mb-2">Ad #2: NÚMEROS</p>
              <p className="text-base">
                • Čísla = konkrétnost<br/>
                • ROI kalkulace = no-brainer<br/>
                • Value stacking = wow faktor
              </p>
            </div>
            <div>
              <p className="text-xl font-bold text-yellow-300 mb-2">Ad #3: VISUAL MAGIC</p>
              <p className="text-base">
                • Čtvrtka = visual metaphor<br/>
                • "Celý byznys na A4" = zapamatovatelné<br/>
                • Simplicity = appeal
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-lg">
            💪 Možná to bude shit, možná ne.<br/>
            Ale aspoň jsem se snažil myslet jinak! 🔥
          </p>
        </div>
      </div>
    </div>
  );
}

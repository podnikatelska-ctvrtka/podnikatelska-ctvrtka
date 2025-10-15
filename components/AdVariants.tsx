// 🎯 AD VARIANTS - MARKETING APPROACHES!
// 6-8 různých přístupů + OBROVSKÉ FONTY!

interface AdVariant {
  id: string;
  name: string;
  angle: string;
  background: string;
  content: React.ReactNode;
}

const adVariants: AdVariant[] = [
  // VARIANT 1: PAIN POINT (klasika)
  {
    id: 'pain',
    name: 'Varianta #1: PAIN POINT',
    angle: 'Empatie + pain → řešení',
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-20">
        <h1 className="text-8xl font-black text-red-400 mb-12 leading-none">
          "Makám od rána<br/>do večera..."
        </h1>
        <h2 className="text-7xl font-black text-white mb-24">
          ...ale podnik<br/>neroste.
        </h2>
        
        <div className="bg-yellow-400 text-black rounded-3xl px-16 py-10 mb-16">
          <p className="text-5xl font-black">
            Chybí vám JASNÝ PLÁN
          </p>
        </div>

        <p className="text-4xl text-white font-bold mb-20">
          9 kroků k fungujícímu byznysu
        </p>

        <div className="bg-green-600 text-white px-20 py-10 rounded-3xl">
          <p className="text-5xl font-black">CHCI MÍT JASNO →</p>
        </div>
      </div>
    )
  },

  // VARIANT 2: BEFORE/AFTER
  {
    id: 'before-after',
    name: 'Varianta #2: BEFORE/AFTER',
    angle: 'Kontrast - před vs po',
    background: 'linear-gradient(135deg, #dc2626 0%, #059669 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-20">
        <div className="grid grid-cols-2 gap-8 w-full max-w-5xl mb-20">
          <div className="bg-red-600/90 rounded-3xl p-12">
            <p className="text-6xl font-black text-white mb-8">PŘED</p>
            <p className="text-3xl text-white">Chaos v hlavě</p>
            <p className="text-3xl text-white">Hádání a zkoušení</p>
            <p className="text-3xl text-white">Nestabilní tržby</p>
          </div>
          <div className="bg-green-600/90 rounded-3xl p-12">
            <p className="text-6xl font-black text-white mb-8">PO</p>
            <p className="text-3xl text-white">Jasný plán</p>
            <p className="text-3xl text-white">Vím CO a KOMU</p>
            <p className="text-3xl text-white">Stabilní růst</p>
          </div>
        </div>

        <div className="bg-white text-black rounded-3xl px-16 py-10 mb-12">
          <p className="text-6xl font-black">
            90 MINUT = HOTOVO
          </p>
        </div>

        <p className="text-5xl text-white font-black mb-16">
          Podnikatelská Čtvrtka
        </p>

        <div className="bg-yellow-400 text-black px-20 py-10 rounded-3xl">
          <p className="text-5xl font-black">CHCI TÝ! →</p>
        </div>
      </div>
    )
  },

  // VARIANT 3: BIG QUESTION
  {
    id: 'question',
    name: 'Varianta #3: BIG QUESTION',
    angle: 'Otázka → curiosity',
    background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-20">
        <h1 className="text-9xl font-black text-yellow-300 mb-20">
          PROČ?
        </h1>
        
        <p className="text-6xl text-white font-bold mb-16 leading-tight">
          Proč se některým<br/>podnikatelům daří...
        </p>
        <p className="text-6xl text-white font-bold mb-24 leading-tight">
          ...a některým ne?
        </p>

        <div className="bg-white/95 text-gray-900 rounded-3xl px-16 py-12 mb-20 max-w-4xl">
          <p className="text-5xl font-black mb-6">
            Protože mají jasný
          </p>
          <p className="text-7xl font-black text-orange-600">
            PLÁN
          </p>
        </div>

        <div className="bg-green-600 text-white px-20 py-10 rounded-3xl">
          <p className="text-5xl font-black">CHCI VĚDĚT PROČ →</p>
        </div>
      </div>
    )
  },

  // VARIANT 4: DIRECT BENEFIT
  {
    id: 'benefit',
    name: 'Varianta #4: DIRECT BENEFIT',
    angle: 'Přímý benefit - co dostaneš',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-20">
        <h1 className="text-8xl font-black text-white mb-20 leading-tight">
          Celý byznys<br/>na 1 stránce
        </h1>
        
        <div className="bg-white/95 text-gray-900 rounded-3xl p-16 mb-20 max-w-4xl">
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <span className="text-7xl">🎯</span>
              <p className="text-4xl font-bold text-left">Vidíš všechno najednou</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-7xl">💡</span>
              <p className="text-4xl font-bold text-left">Víš NA KOHO prodávat</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-7xl">📋</span>
              <p className="text-4xl font-bold text-left">Co dělat zítra</p>
            </div>
          </div>
        </div>

        <p className="text-5xl text-yellow-300 font-black mb-16">
          90 minut • Hotovo
        </p>

        <div className="bg-green-600 text-white px-20 py-10 rounded-3xl">
          <p className="text-5xl font-black">CHCI TO! →</p>
        </div>
      </div>
    )
  },

  // VARIANT 5: TIME-BASED
  {
    id: 'time',
    name: 'Varianta #5: TIME-BASED',
    angle: 'Rychlost - 90 minut',
    background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-20">
        <div className="bg-white text-black rounded-3xl px-16 py-12 mb-16">
          <p className="text-9xl font-black">90</p>
          <p className="text-6xl font-black">MINUT</p>
        </div>

        <h1 className="text-7xl font-black text-white mb-16 leading-tight">
          Od chaosu<br/>k jasnému plánu
        </h1>

        <div className="bg-white/20 backdrop-blur rounded-3xl p-12 mb-20 max-w-4xl">
          <p className="text-4xl text-white font-bold mb-4">Dnes večer:</p>
          <p className="text-5xl text-yellow-300 font-black">
            Celý byznys na 1 stránce
          </p>
        </div>

        <p className="text-4xl text-white font-bold mb-16">
          Podnikatelská Čtvrtka
        </p>

        <div className="bg-green-600 text-white px-20 py-10 rounded-3xl">
          <p className="text-5xl font-black">ZAČÍT TEĎ →</p>
        </div>
      </div>
    )
  },

  // VARIANT 6: ANTI-PATTERN
  {
    id: 'anti',
    name: 'Varianta #6: ANTI-PATTERN',
    angle: 'Ne X, Ano Y',
    background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-20">
        <div className="mb-20">
          <div className="bg-red-600/90 rounded-3xl px-16 py-10 mb-8">
            <p className="text-6xl font-black text-white mb-4">❌ NE:</p>
            <p className="text-4xl text-white">50 stránek teorie v PDF</p>
          </div>
          
          <div className="bg-green-600/90 rounded-3xl px-16 py-10">
            <p className="text-6xl font-black text-white mb-4">✅ ANO:</p>
            <p className="text-4xl text-white">Konkrétní kroky co dělat TEĎ</p>
          </div>
        </div>

        <div className="bg-white text-black rounded-3xl px-16 py-10 mb-16">
          <p className="text-6xl font-black">
            Celý byznys<br/>na 1 stránce
          </p>
        </div>

        <p className="text-5xl text-yellow-300 font-black mb-16">
          Podnikatelská Čtvrtka
        </p>

        <div className="bg-green-600 text-white px-20 py-10 rounded-3xl">
          <p className="text-5xl font-black">CHCI AKČNÍ PLÁN →</p>
        </div>
      </div>
    )
  },

  // VARIANT 7: SIMPLE & BOLD
  {
    id: 'simple',
    name: 'Varianta #7: SIMPLE & BOLD',
    angle: 'Jednoduchý - jen message',
    background: 'linear-gradient(135deg, #000000 0%, #1e293b 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-20">
        <h1 className="text-9xl font-black text-white mb-16 leading-none">
          JASNÝ<br/>PLÁN
        </h1>

        <div className="bg-yellow-400 text-black rounded-3xl px-16 py-10 mb-20">
          <p className="text-6xl font-black">
            za 90 minut
          </p>
        </div>

        <p className="text-5xl text-white font-bold mb-20 leading-tight">
          Celý byznys<br/>na jedné stránce.<br/>Hotovo.
        </p>

        <p className="text-4xl text-gray-300 font-bold mb-16">
          Podnikatelská Čtvrtka
        </p>

        <div className="bg-white text-black px-20 py-10 rounded-3xl">
          <p className="text-5xl font-black">ZAČÍT →</p>
        </div>
      </div>
    )
  },

  // VARIANT 8: PROBLEM → SOLUTION
  {
    id: 'problem-solution',
    name: 'Varianta #8: PROBLEM → SOLUTION',
    angle: 'Problém → řešení s šipkou',
    background: 'linear-gradient(135deg, #dc2626 0%, #16a34a 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-20">
        <div className="bg-red-600/90 rounded-3xl px-16 py-12 mb-12 w-full max-w-3xl">
          <p className="text-6xl font-black text-white mb-6">PROBLÉM:</p>
          <p className="text-4xl text-white">
            Nevím kam s byznysem
          </p>
        </div>

        <div className="text-8xl text-yellow-300 mb-12">↓</div>

        <div className="bg-green-600/90 rounded-3xl px-16 py-12 mb-20 w-full max-w-3xl">
          <p className="text-6xl font-black text-white mb-6">ŘEŠENÍ:</p>
          <p className="text-4xl text-white">
            Celý byznys na 1 stránce
          </p>
        </div>

        <p className="text-5xl text-white font-black mb-16">
          90 minut • Hotovo
        </p>

        <div className="bg-white text-black px-20 py-10 rounded-3xl">
          <p className="text-5xl font-black">CHCI ŘEŠENÍ →</p>
        </div>
      </div>
    )
  }
];

export default function AdVariants() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">
            🎯 8 VARIANT - VYBER NEJLEPŠÍ!
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Různé marketing přístupy • Obrovské fonty • Screenshot ready!
          </p>
          <div className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-bold">
            ✅ 8 variant • Marketing angles • Velké fonty
          </div>
        </div>

        {/* Marketing Angles Summary */}
        <div className="bg-purple-900/50 border-2 border-purple-500 rounded-2xl p-6 mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">📊 MARKETING PŘÍSTUPY:</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-200 text-sm">
            <div>
              <p className="font-bold text-yellow-300">1. Pain Point</p>
              <p>Empatie + pain → řešení</p>
            </div>
            <div>
              <p className="font-bold text-yellow-300">2. Before/After</p>
              <p>Kontrast - před vs po</p>
            </div>
            <div>
              <p className="font-bold text-yellow-300">3. Big Question</p>
              <p>Otázka → curiosity</p>
            </div>
            <div>
              <p className="font-bold text-yellow-300">4. Direct Benefit</p>
              <p>Přímý benefit - co dostaneš</p>
            </div>
            <div>
              <p className="font-bold text-yellow-300">5. Time-Based</p>
              <p>Rychlost - 90 minut</p>
            </div>
            <div>
              <p className="font-bold text-yellow-300">6. Anti-Pattern</p>
              <p>Ne X, Ano Y</p>
            </div>
            <div>
              <p className="font-bold text-yellow-300">7. Simple & Bold</p>
              <p>Jednoduchý - jen message</p>
            </div>
            <div>
              <p className="font-bold text-yellow-300">8. Problem → Solution</p>
              <p>Problém → řešení s šipkou</p>
            </div>
          </div>
        </div>

        {/* Ad Variants Grid */}
        <div className="space-y-12">
          {adVariants.map((variant) => (
            <div key={variant.id} className="space-y-4">
              {/* Variant Info */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{variant.name}</h3>
                <p className="text-lg text-yellow-300 font-semibold">Angle: {variant.angle}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Screenshot ready • 1080x1080px • Obrovské fonty
                </p>
              </div>

              {/* Visual - EXACT 1080x1080px */}
              <div className="flex justify-center">
                <div 
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                  style={{ 
                    width: '1080px',
                    height: '1080px',
                    maxWidth: '100%',
                    aspectRatio: '1/1',
                    background: variant.background
                  }}
                >
                  {variant.content}
                </div>
              </div>

              {/* Download Hint */}
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-400">
                  👆 Right-click → Screenshot nebo Print Screen
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer - COPY Template */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8">
          <h2 className="text-3xl font-black text-white mb-6 text-center">
            📝 UNIVERSAL COPY (použij pro všechny!)
          </h2>
          
          <div className="bg-white/10 rounded-xl p-6 max-w-3xl mx-auto">
            <div className="space-y-6 text-white">
              <div>
                <p className="text-sm font-bold text-yellow-300 mb-2">PRIMARY TEXT:</p>
                <p className="text-sm whitespace-pre-line bg-black/30 p-4 rounded">
{`Nevíte kam s byznysem?

Většina podnikatelů:
❌ Nevědí komu přesně prodávají
❌ Mění strategii každý týden
❌ Hádají co zákazník chce

Podnikatelská Čtvrtka = celý byznys na 1 stránce.

✅ Vidíš CO a KOMU prodávat
✅ Víš jaké kroky udělat TEĎ
✅ Hotovo za 90 minut

První kurz v ČR který SKUTEČNĚ pomůže.
Ne teorie. Konkrétní akční plán.

🔥 PRVNÍCH 50 LIDÍ:
→ Mini kurz ZDARMA (3 dny přípravy)
→ Sleva 40% při spuštění

⏰ Zbývá jen pár míst.`}
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-bold text-yellow-300 mb-2">HEADLINE:</p>
                  <p className="text-sm bg-black/30 p-3 rounded">Celý byznys na 1 stránce</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-yellow-300 mb-2">CTA:</p>
                  <p className="text-sm bg-black/30 p-3 rounded">Chci jasný plán</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-yellow-300 mb-2">BUDGET:</p>
                  <p className="text-sm bg-black/30 p-3 rounded">Start: 25 Kč/den per ad</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-300 text-sm">
            <p>💡 TEST VŠECH 8 → Kill underperformers → Scale winner!</p>
            <p className="mt-2">Total budget: 200 Kč/den (8× 25 Kč) → Po 3 dnech scale 3 best na 65 Kč</p>
          </div>
        </div>

        {/* Testing Strategy */}
        <div className="mt-12 bg-gradient-to-r from-green-900 to-emerald-900 rounded-2xl p-8">
          <h2 className="text-3xl font-black text-white mb-6 text-center">
            🧪 TESTING STRATEGIE
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-white">
            <div className="bg-white/10 rounded-xl p-6">
              <p className="text-2xl font-bold mb-4">DAY 1-3</p>
              <p className="text-sm mb-2">• Test všech 8 variant</p>
              <p className="text-sm mb-2">• Budget: 25 Kč/den each</p>
              <p className="text-sm mb-2">• Total: 200 Kč/den</p>
              <p className="text-sm mb-2">• Monitor CTR + CPL</p>
              <p className="text-yellow-300 text-sm mt-4">→ Find top 3 performers</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6">
              <p className="text-2xl font-bold mb-4">DAY 4-7</p>
              <p className="text-sm mb-2">• Kill 5 underperformers</p>
              <p className="text-sm mb-2">• Keep top 3</p>
              <p className="text-sm mb-2">• Budget: 65 Kč/den each</p>
              <p className="text-sm mb-2">• Total: 195 Kč/den</p>
              <p className="text-yellow-300 text-sm mt-4">→ Find THE winner</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6">
              <p className="text-2xl font-bold mb-4">DAY 8+</p>
              <p className="text-sm mb-2">• Scale winner!</p>
              <p className="text-sm mb-2">• Budget: 300-500 Kč/den</p>
              <p className="text-sm mb-2">• Keep 2nd best as backup</p>
              <p className="text-sm mb-2">• Create variants of winner</p>
              <p className="text-yellow-300 text-sm mt-4">→ Dominate! 🚀</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>🎯 8 variant • Různé přístupy • Vyber co funguje!</p>
          <p className="mt-2">📸 Screenshot → Upload → Test → Scale! 🚀</p>
        </div>
      </div>
    </div>
  );
}

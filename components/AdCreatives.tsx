// 🎨 AD CREATIVES - PURE VISUALS 1080x1080px
// Jen vizuály pro screenshot → upload do FB Ads Manager

interface AdCreativeData {
  id: string;
  name: string;
  background: string;
  content: React.ReactNode;
}

const adCreatives: AdCreativeData[] = [
  // AD #1: PROBLEM
  {
    id: 'problem',
    name: 'Ad Set #1: PROBLEM 😰',
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-12">
        <h1 className="text-6xl font-black text-red-400 mb-6 leading-tight">
          "Makám od rána do večera..."
        </h1>
        <h2 className="text-5xl font-bold text-white mb-16">
          ...ale podnik neroste.
        </h2>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 max-w-3xl w-full border-2 border-white/20">
          <h3 className="text-3xl font-bold text-white mb-8">Znáte to?</h3>
          <div className="space-y-5 text-left">
            <p className="text-2xl text-white flex items-start gap-4">
              <span className="text-red-400 text-3xl flex-shrink-0">✕</span>
              <span>Málo objednávek, prázdný podnik</span>
            </p>
            <p className="text-2xl text-white flex items-start gap-4">
              <span className="text-red-400 text-3xl flex-shrink-0">✕</span>
              <span>Marketing nefunguje, peníze ven</span>
            </p>
            <p className="text-2xl text-white flex items-start gap-4">
              <span className="text-red-400 text-3xl flex-shrink-0">✕</span>
              <span>Nestabilní tržby každý měsíc</span>
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <h3 className="text-4xl font-bold text-blue-300">
            Podnikatelská Čtvrtka
          </h3>
          <p className="text-2xl text-white">
            9 kroků k jasnému podnikání
          </p>
        </div>

        <div className="mt-10 bg-green-600 text-white px-10 py-6 rounded-2xl">
          <p className="text-2xl font-bold mb-2">PRŮKOPNICKÁ NABÍDKA</p>
          <p className="text-xl">Prvních 50 lidí</p>
          <p className="text-lg mt-2">🎁 Mini kurz ZDARMA + 💎 Konzultace ZDARMA</p>
        </div>

        <div className="mt-8 bg-white text-black px-12 py-5 rounded-2xl shadow-2xl">
          <p className="text-3xl font-black">KONEČNĚ MÍT JASNO! →</p>
        </div>

        <p className="mt-6 text-yellow-300 text-xl font-bold">
          ⚡ Limitovaná kapacita • Prvních 50 míst
        </p>
      </div>
    )
  },

  // AD #2: DIFERENCIACE
  {
    id: 'differentiation',
    name: 'Ad Set #2: DIFERENCIACE 🎯',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-12">
        <h1 className="text-6xl font-black text-white mb-4 leading-tight">
          Není to PDF.
        </h1>
        <h2 className="text-5xl font-bold text-white mb-16">
          Dostaneš KONKRÉTNÍ akční plán.
        </h2>
        
        <div className="space-y-6 max-w-3xl w-full">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30">
            <p className="text-3xl text-white font-semibold flex items-center gap-4">
              <span className="text-5xl">🎯</span>
              <span>Business Model Canvas</span>
            </p>
          </div>
          
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30">
            <p className="text-3xl text-white font-semibold flex items-center gap-4">
              <span className="text-5xl">💡</span>
              <span>Value Proposition</span>
            </p>
          </div>
          
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30">
            <p className="text-3xl text-white font-semibold flex items-center gap-4">
              <span className="text-5xl">🎨</span>
              <span>4 vzorové modely</span>
            </p>
          </div>
          
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30">
            <p className="text-3xl text-white font-semibold flex items-center gap-4">
              <span className="text-5xl">📋</span>
              <span>Akční plán co dělat TEĎ</span>
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <p className="text-3xl text-white font-bold">
            Ne teorie. Konkrétní výsledky.
          </p>
          <p className="text-4xl text-yellow-300 font-black">
            90 minut. Hotovo.
          </p>
        </div>

        <div className="mt-10 bg-green-600 text-white px-12 py-5 rounded-2xl shadow-2xl">
          <p className="text-3xl font-black">CHCI KONKRÉTNÍ PLÁN! →</p>
        </div>
      </div>
    )
  },

  // AD #4: CURIOSITY (MAIN BET!)
  {
    id: 'curiosity',
    name: 'Ad Set #4: CURIOSITY 🏆 (MAIN BET!)',
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-12">
        <h1 className="text-7xl font-black text-white mb-20">
          PROČ?
        </h1>
        
        <div className="grid grid-cols-2 gap-8 max-w-4xl w-full mb-12">
          {/* Levá strana - Úspěšní */}
          <div className="bg-green-600/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-green-400">
            <h3 className="text-2xl font-bold text-white mb-6">Někteří:</h3>
            <div className="space-y-4 text-left">
              <p className="text-xl text-white flex items-start gap-3">
                <span className="text-green-300 text-2xl">✓</span>
                <span>Jasný plán</span>
              </p>
              <p className="text-xl text-white flex items-start gap-3">
                <span className="text-green-300 text-2xl">✓</span>
                <span>Vědí KOMU prodávat</span>
              </p>
              <p className="text-xl text-white flex items-start gap-3">
                <span className="text-green-300 text-2xl">✓</span>
                <span>Stabilní růst</span>
              </p>
            </div>
          </div>

          {/* Pravá strana - Neúspěšní */}
          <div className="bg-red-600/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-red-400">
            <h3 className="text-2xl font-bold text-white mb-6">Jiní:</h3>
            <div className="space-y-4 text-left">
              <p className="text-xl text-white flex items-start gap-3">
                <span className="text-red-300 text-2xl">✕</span>
                <span>Chaos v hlavě</span>
              </p>
              <p className="text-xl text-white flex items-start gap-3">
                <span className="text-red-300 text-2xl">✕</span>
                <span>Hádají co funguje</span>
              </p>
              <p className="text-xl text-white flex items-start gap-3">
                <span className="text-red-300 text-2xl">✕</span>
                <span>Nestabilní tržby</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 max-w-3xl w-full border-2 border-white/20 mb-10">
          <p className="text-3xl text-white font-bold mb-4">
            Protože úspěšní mají jasný
          </p>
          <p className="text-5xl text-yellow-300 font-black">
            BUSINESS MODEL
          </p>
          <p className="text-2xl text-white mt-4">
            Na JEDNÉ stránce.
          </p>
        </div>

        <div className="space-y-4 mb-10">
          <h3 className="text-4xl font-bold text-white">
            Podnikatelská Čtvrtka
          </h3>
          <p className="text-2xl text-blue-200">
            9 lekcí • 1 stránka • Jasný plán
          </p>
        </div>

        <div className="bg-green-600 text-white px-12 py-5 rounded-2xl shadow-2xl">
          <p className="text-3xl font-black">CHCI VĚDĚT PROČ! →</p>
        </div>
      </div>
    )
  },

  // ORANŽOVÝ BOX A: AGRESIVNÍ
  {
    id: 'orange-aggressive',
    name: '🔥 ORANŽOVÝ BOX - Varianta A (Agresivní)',
    background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-12">
        <h1 className="text-7xl font-black text-white mb-6 leading-tight">
          ❌ DOST BYLO BULLSHITU
        </h1>
        <h2 className="text-4xl font-bold text-yellow-200 mb-16">
          První kurz v ČR s REÁLNOU strategií
        </h2>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 max-w-3xl w-full border-2 border-white/20 mb-12">
          <div className="space-y-6 text-left">
            <p className="text-3xl text-white flex items-start gap-4">
              <span className="text-red-300 text-4xl flex-shrink-0">✕</span>
              <span>Experti (bez strategie = hození peněz)</span>
            </p>
            <p className="text-3xl text-white flex items-start gap-4">
              <span className="text-red-300 text-4xl flex-shrink-0">✕</span>
              <span>AI nástroje (žádná hodnota)</span>
            </p>
            <p className="text-3xl text-white flex items-start gap-4">
              <span className="text-red-300 text-4xl flex-shrink-0">✕</span>
              <span>Guruové (prázdné sliby)</span>
            </p>
          </div>
        </div>

        <div className="bg-white/95 text-gray-900 rounded-3xl p-10 max-w-3xl w-full mb-10">
          <p className="text-5xl font-black mb-4">
            STAČILO VYHAZOVAT PENÍZE? 💸
          </p>
          <p className="text-2xl">
            Bez strategie je reklama jen hození peněz oknem.
          </p>
        </div>

        <div className="space-y-6 text-left max-w-3xl w-full mb-10">
          <p className="text-2xl text-white flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            <span>Business Model Canvas (celý byznys na 1 stránce)</span>
          </p>
          <p className="text-2xl text-white flex items-center gap-3">
            <span className="text-3xl">💡</span>
            <span>Value Proposition (NA KOHO prodávat)</span>
          </p>
          <p className="text-2xl text-white flex items-center gap-3">
            <span className="text-3xl">📋</span>
            <span>Akční plán (CO dělat zítra)</span>
          </p>
        </div>

        <div className="bg-green-600 text-white px-12 py-5 rounded-2xl shadow-2xl">
          <p className="text-3xl font-black">CHCI STRATEGII! →</p>
        </div>
      </div>
    )
  },

  // ORANŽOVÝ BOX B: SOFT
  {
    id: 'orange-soft',
    name: '🔥 ORANŽOVÝ BOX - Varianta B (Soft)',
    background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-12">
        <h1 className="text-6xl font-black text-white mb-6 leading-tight">
          3 věci, co vám NIKDO neřekne 🤫
        </h1>
        
        <div className="space-y-8 max-w-4xl w-full mb-12">
          <div className="bg-white/95 text-gray-900 rounded-3xl p-10 text-left">
            <p className="text-5xl font-black mb-4">1️⃣</p>
            <p className="text-3xl font-bold mb-3">Experti na reklamu?</p>
            <p className="text-2xl text-gray-700">
              Bez strategie = hození peněz
            </p>
          </div>

          <div className="bg-white/95 text-gray-900 rounded-3xl p-10 text-left">
            <p className="text-5xl font-black mb-4">2️⃣</p>
            <p className="text-3xl font-bold mb-3">AI nástroje?</p>
            <p className="text-2xl text-gray-700">
              Žádnou hodnotu za 0 dní
            </p>
          </div>

          <div className="bg-white/95 text-gray-900 rounded-3xl p-10 text-left">
            <p className="text-5xl font-black mb-4">3️⃣</p>
            <p className="text-3xl font-bold mb-3">Guru kurzy?</p>
            <p className="text-2xl text-gray-700">
              Frustrovaní podnikatelé
            </p>
          </div>
        </div>

        <div className="bg-green-600 text-white rounded-3xl p-10 max-w-3xl w-full mb-10">
          <p className="text-4xl font-black mb-4">
            ✅ Podnikatelská Čtvrtka = SKUTEČNÁ strategie
          </p>
          <p className="text-2xl">
            90 minut práce • Jasný plán • Reálné výsledky
          </p>
        </div>

        <div className="bg-white text-black px-12 py-5 rounded-2xl shadow-2xl">
          <p className="text-3xl font-black">CHCI TO ZKUSIT JINAK! →</p>
        </div>
      </div>
    )
  },

  // ORANŽOVÝ BOX C: STORYTELLING (BEST!)
  {
    id: 'orange-story',
    name: '🔥 ORANŽOVÝ BOX - Varianta C (Storytelling) - BEST!',
    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-12">
        <h1 className="text-6xl font-black text-white mb-4 leading-tight">
          Markéta utratila 50.000 Kč...
        </h1>
        <h2 className="text-4xl font-bold text-yellow-200 mb-16">
          ...za FB reklamy. Ztráta 48.000 Kč.
        </h2>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 max-w-3xl w-full border-2 border-white/20 mb-12">
          <div className="space-y-5 text-left">
            <p className="text-3xl text-white flex items-center gap-4">
              <span className="text-4xl">💼</span>
              <span>"Expert" → kampaně</span>
            </p>
            <p className="text-3xl text-white flex items-center gap-4">
              <span className="text-4xl">🤖</span>
              <span>"AI nástroj" → texty</span>
            </p>
            <p className="text-3xl text-white flex items-center gap-4">
              <span className="text-4xl">🎪</span>
              <span>"Guru kurz" → miliony</span>
            </p>
          </div>
          
          <div className="mt-8 pt-8 border-t-2 border-white/30">
            <p className="text-4xl text-red-300 font-bold">
              Výsledek? 2 prodeje.
            </p>
          </div>
        </div>

        <div className="bg-green-600 text-white rounded-3xl p-10 max-w-3xl w-full mb-12">
          <p className="text-4xl font-black mb-6">
            Pak Čtvrtka: 35 prodejů. ✅
          </p>
          <p className="text-5xl font-black text-yellow-300">
            Profit 120.000 Kč
          </p>
        </div>

        <div className="space-y-4 mb-10">
          <p className="text-3xl text-white font-bold">
            Za 90 minut zjistila:
          </p>
          <div className="space-y-3 text-2xl text-white">
            <p>• Komu SKUTEČNĚ prodává</p>
            <p>• Jakou hodnotu nabízí</p>
            <p>• Jak správně komunikovat</p>
          </div>
        </div>

        <div className="bg-white text-black px-12 py-5 rounded-2xl shadow-2xl">
          <p className="text-3xl font-black">CHCI STRATEGII JAKO MARKÉTA! →</p>
        </div>
      </div>
    )
  }
];

export default function AdCreatives() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">
            🎨 AD CREATIVES - 1080x1080px
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Screenshot každý obrázek → Upload do FB Ads Manager → Přidej text!
          </p>
          <div className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-bold">
            ✅ Ready to Screenshot • 6 vizuálů
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-900/50 border-2 border-blue-500 rounded-2xl p-6 mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">📸 JAK NA TO:</h2>
          <ol className="space-y-2 text-lg text-gray-200">
            <li><strong>1.</strong> Screenshot každý obrázek (1080x1080px)</li>
            <li><strong>2.</strong> Save jako PNG (high quality)</li>
            <li><strong>3.</strong> Upload do FB Ads Manager jako Creative</li>
            <li><strong>4.</strong> Přidej Primary Text + Headline z dokumentace</li>
            <li><strong>5.</strong> Launch! 🚀</li>
          </ol>
        </div>

        {/* Ad Creatives Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {adCreatives.map((creative) => (
            <div key={creative.id} className="space-y-4">
              {/* Ad Info */}
              <div className="bg-gray-800 rounded-xl p-4">
                <h3 className="text-xl font-bold text-white">{creative.name}</h3>
                <p className="text-sm text-gray-400 mt-1">
                  ID: {creative.id} • 1080x1080px • Screenshot ready
                </p>
              </div>

              {/* Creative Visual - EXACT 1080x1080px */}
              <div 
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                style={{ 
                  width: '1080px',
                  height: '1080px',
                  maxWidth: '100%',
                  aspectRatio: '1/1',
                  background: creative.background
                }}
              >
                {creative.content}
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

        {/* Footer Summary */}
        <div className="mt-16 bg-gradient-to-r from-green-900 to-emerald-900 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            ✅ 6 VIZUÁLŮ READY!
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-left max-w-4xl mx-auto text-white">
            <div>
              <p className="font-bold mb-2">FINÁLNÍ 3 AD SETY:</p>
              <p className="text-sm">• Problem (dark blue)</p>
              <p className="text-sm">• Diferenciace (blue-purple)</p>
              <p className="text-sm">• Curiosity (purple) 🏆</p>
            </div>
            <div>
              <p className="font-bold mb-2">ORANŽOVÝ BOX (3):</p>
              <p className="text-sm">• Varianta A (agresivní)</p>
              <p className="text-sm">• Varianta B (soft)</p>
              <p className="text-sm">• Varianta C (storytelling) 🏆</p>
            </div>
            <div>
              <p className="font-bold mb-2">NEXT:</p>
              <p className="text-sm">1. Screenshot všechny</p>
              <p className="text-sm">2. Upload do FB</p>
              <p className="text-sm">3. Add copy z docs</p>
              <p className="text-sm">4. Launch! 🚀</p>
            </div>
          </div>
        </div>

        {/* Reference Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>💡 Copy (text) najdeš v: /AKTUALNI_REKLAMY_PREHLED.md</p>
          <p className="mt-2">🎯 Budget: 200 Kč/den • 3 finální ad sety + 3 oranžový box</p>
        </div>
      </div>
    </div>
  );
}

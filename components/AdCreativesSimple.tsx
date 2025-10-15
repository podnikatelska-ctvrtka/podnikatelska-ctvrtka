// 🎨 AD CREATIVES - SIMPLIFIED VERSION!
// Méně textu, větší fonty, jasnější message!

interface AdCreativeData {
  id: string;
  name: string;
  background: string;
  content: React.ReactNode;
}

const adCreatives: AdCreativeData[] = [
  // AD #1: PROBLEM (FUNGUJE! Jen bez konzultace)
  {
    id: 'problem',
    name: 'Ad Set #1: PROBLEM 😰 (EMPATIE - FUNGUJE!)',
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-16 py-20">
        <h1 className="text-7xl font-black text-red-400 mb-8 leading-tight">
          "Makám od rána<br/>do večera..."
        </h1>
        <h2 className="text-6xl font-bold text-white mb-20">
          ...ale podnik neroste.
        </h2>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 max-w-3xl w-full border-2 border-white/20 mb-16">
          <h3 className="text-4xl font-bold text-white mb-10">Znáte to?</h3>
          <div className="space-y-6 text-left">
            <p className="text-3xl text-white flex items-center gap-4">
              <span className="text-red-400 text-4xl">✕</span>
              <span>Málo objednávek</span>
            </p>
            <p className="text-3xl text-white flex items-center gap-4">
              <span className="text-red-400 text-4xl">✕</span>
              <span>Marketing nefunguje</span>
            </p>
            <p className="text-3xl text-white flex items-center gap-4">
              <span className="text-red-400 text-4xl">✕</span>
              <span>Nestabilní tržby</span>
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-5xl font-black text-yellow-300 mb-4">
            Podnikatelská Čtvrtka
          </h3>
          <p className="text-3xl text-white">
            9 kroků k jasnému podnikání
          </p>
        </div>

        <div className="bg-green-600 text-white px-16 py-8 rounded-3xl shadow-2xl mb-8">
          <p className="text-4xl font-black">KONEČNĚ MÍT JASNO! →</p>
        </div>

        <p className="text-yellow-300 text-2xl font-bold">
          ⚡ Prvních 50 lidí • Mini kurz ZDARMA
        </p>
      </div>
    )
  },

  // AD #2: KONKRÉTNÍ PLÁN (NOVÝ! Bez jargonu, jasný benefit)
  {
    id: 'concrete-plan',
    name: 'Ad Set #2: KONKRÉTNÍ PLÁN 🎯 (BEZ JARGONU!)',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-16 py-20">
        <h1 className="text-7xl font-black text-white mb-8 leading-tight">
          Není to PDF<br/>s teorií.
        </h1>
        <h2 className="text-6xl font-bold text-yellow-300 mb-20">
          Je to KONKRÉTNÍ<br/>akční plán.
        </h2>
        
        <div className="bg-white/90 text-gray-900 rounded-3xl p-12 max-w-3xl w-full mb-16">
          <h3 className="text-4xl font-black mb-10">Co dostanete:</h3>
          <div className="space-y-6 text-left">
            <p className="text-3xl font-bold flex items-center gap-4">
              <span className="text-5xl">🎯</span>
              <span>Celý byznys na 1 stránce</span>
            </p>
            <p className="text-3xl font-bold flex items-center gap-4">
              <span className="text-5xl">💡</span>
              <span>Na KOHO a CO prodávat</span>
            </p>
            <p className="text-3xl font-bold flex items-center gap-4">
              <span className="text-5xl">📋</span>
              <span>Co dělat zítra RÁNO</span>
            </p>
          </div>
        </div>

        <div className="mb-12">
          <p className="text-4xl text-white font-bold mb-4">
            90 minut.
          </p>
          <p className="text-5xl text-yellow-300 font-black">
            Hotovo.
          </p>
        </div>

        <div className="bg-green-600 text-white px-16 py-8 rounded-3xl shadow-2xl">
          <p className="text-4xl font-black">CHCI AKČNÍ PLÁN! →</p>
        </div>
      </div>
    )
  },

  // AD #3: CURIOSITY (UPRAVENO! "Podnikatelská Čtvrtka" místo "Business Model")
  {
    id: 'curiosity',
    name: 'Ad Set #3: CURIOSITY 🏆 (BEZ "BUSINESS MODEL" JARGONU!)',
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-16 py-20">
        <h1 className="text-8xl font-black text-white mb-20">
          PROČ?
        </h1>
        
        <div className="grid grid-cols-2 gap-8 max-w-5xl w-full mb-16">
          {/* Levá strana - Úspěšní */}
          <div className="bg-green-600/90 backdrop-blur-sm rounded-3xl p-10 border-4 border-green-400">
            <h3 className="text-3xl font-bold text-white mb-8">Někteří:</h3>
            <div className="space-y-5 text-left">
              <p className="text-2xl text-white flex items-center gap-3">
                <span className="text-green-300 text-3xl">✓</span>
                <span>Jasný plán</span>
              </p>
              <p className="text-2xl text-white flex items-center gap-3">
                <span className="text-green-300 text-3xl">✓</span>
                <span>Vědí KOMU</span>
              </p>
              <p className="text-2xl text-white flex items-center gap-3">
                <span className="text-green-300 text-3xl">✓</span>
                <span>Stabilní růst</span>
              </p>
            </div>
          </div>

          {/* Pravá strana - Neúspěšní */}
          <div className="bg-red-600/90 backdrop-blur-sm rounded-3xl p-10 border-4 border-red-400">
            <h3 className="text-3xl font-bold text-white mb-8">Jiní:</h3>
            <div className="space-y-5 text-left">
              <p className="text-2xl text-white flex items-center gap-3">
                <span className="text-red-300 text-3xl">✕</span>
                <span>Chaos v hlavě</span>
              </p>
              <p className="text-2xl text-white flex items-center gap-3">
                <span className="text-red-300 text-3xl">✕</span>
                <span>Hádají a zkoušejí</span>
              </p>
              <p className="text-2xl text-white flex items-center gap-3">
                <span className="text-red-300 text-3xl">✕</span>
                <span>Nestabilní tržby</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/95 text-gray-900 rounded-3xl p-12 max-w-4xl w-full mb-16">
          <p className="text-4xl font-bold mb-6">
            Protože úspěšní mají jasný
          </p>
          <p className="text-7xl font-black text-orange-600 mb-6">
            PODNIKATELSKÝ<br/>PLÁN
          </p>
          <p className="text-3xl font-bold">
            Na jedné stránce.
          </p>
        </div>

        <div className="mb-10">
          <h3 className="text-5xl font-black text-yellow-300 mb-4">
            Podnikatelská Čtvrtka
          </h3>
          <p className="text-3xl text-white">
            9 kroků • 90 minut • Hotovo
          </p>
        </div>

        <div className="bg-green-600 text-white px-16 py-8 rounded-3xl shadow-2xl">
          <p className="text-4xl font-black">CHCI VĚDĚT PROČ! →</p>
        </div>
      </div>
    )
  }
];

export default function AdCreativesSimple() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">
            🎨 AD CREATIVES - SIMPLIFIED!
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            3 reklamy • Méně textu • Větší fonty • Jasnější message!
          </p>
          <div className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-bold">
            ✅ Screenshot Ready ��� Bez jargonu • Bez bullshitu
          </div>
        </div>

        {/* Changes Summary */}
        <div className="bg-blue-900/50 border-2 border-blue-500 rounded-2xl p-6 mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">✅ CO SE ZMĚNILO:</h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-200">
            <div>
              <p className="font-bold text-green-400 mb-2">Ad #1: PROBLEM</p>
              <p className="text-sm">✅ Zůstala (FUNGUJE!)</p>
              <p className="text-sm">❌ Vyhodil konzultaci</p>
              <p className="text-sm">✅ Má empatii + jasno</p>
            </div>
            <div>
              <p className="font-bold text-blue-400 mb-2">Ad #2: NOVÝ!</p>
              <p className="text-sm">❌ Škrtl "Business Model Canvas"</p>
              <p className="text-sm">✅ "Konkrétní akční plán"</p>
              <p className="text-sm">✅ Jasné benefity</p>
            </div>
            <div>
              <p className="font-bold text-purple-400 mb-2">Ad #3: UPRAVENO</p>
              <p className="text-sm">❌ Škrtl "Business Model"</p>
              <p className="text-sm">✅ "Podnikatelský plán"</p>
              <p className="text-sm">✅ Větší text, méně obsahu</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-blue-400">
            <p className="font-bold text-red-400 mb-2">❌ ŠKRTLI JSME:</p>
            <ul className="text-sm space-y-1">
              <li>• Oranžový box (působil jako další guru bullshit)</li>
              <li>• Konzultaci ZDARMA (už nedáváme)</li>
              <li>• Jargon (BMC, VPC atd.)</li>
              <li>• 50% textu (moc toho bylo!)</li>
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-900/50 border-2 border-yellow-500 rounded-2xl p-6 mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">📸 JAK NA TO:</h2>
          <ol className="space-y-2 text-lg text-gray-200">
            <li><strong>1.</strong> Screenshot každý obrázek (1080x1080px)</li>
            <li><strong>2.</strong> Save jako PNG</li>
            <li><strong>3.</strong> Upload do FB Ads Manager</li>
            <li><strong>4.</strong> Přidej text z dokumentace níže</li>
            <li><strong>5.</strong> Launch! 🚀</li>
          </ol>
        </div>

        {/* Ad Creatives Grid */}
        <div className="space-y-12">
          {adCreatives.map((creative) => (
            <div key={creative.id} className="space-y-4">
              {/* Ad Info */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{creative.name}</h3>
                <p className="text-sm text-gray-400">
                  Screenshot ready • 1080x1080px • Simplified
                </p>
              </div>

              {/* Creative Visual - EXACT 1080x1080px */}
              <div className="flex justify-center">
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

        {/* Copy for Each Ad */}
        <div className="mt-16 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-8">
          <h2 className="text-3xl font-black text-white mb-8 text-center">
            📝 COPY PRO FB ADS MANAGER
          </h2>
          
          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Ad #1 Copy */}
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-yellow-300 mb-4">AD #1: PROBLEM</h3>
              
              <div className="space-y-4 text-white">
                <div>
                  <p className="text-sm font-bold text-gray-300 mb-2">PRIMARY TEXT:</p>
                  <p className="text-sm whitespace-pre-line bg-black/30 p-4 rounded">
{`Podnikáte, ale výsledky nepřicházejí?

Každý den makáte od rána do večera...
Ale podnik neroste.

Znáte to?
❌ Málo objednávek
❌ Marketing nefunguje
❌ Nestabilní tržby

Není to o tom, že by vám chybělá práce.
Chybí vám JASNÝ PLÁN.

PODNIKATELSKÁ ČTVRTKA = 9 kroků k jasnému podnikání.

Ne teorie. Ne guru kecy. Jen konkrétní kroky které fungují.

🎁 PRVNÍCH 50 LIDÍ:
→ Mini kurz ZDARMA po registraci (3 dny přípravy)
→ Průkopnická cena při spuštění (sleva 40%)

⏰ Zbývá jen pár míst z 50.`}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-gray-300 mb-2">HEADLINE:</p>
                    <p className="text-sm bg-black/30 p-3 rounded">Konečně mějte jasno v podnikání</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-300 mb-2">CTA:</p>
                    <p className="text-sm bg-black/30 p-3 rounded">Rezervovat místo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ad #2 Copy */}
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-300 mb-4">AD #2: KONKRÉTNÍ PLÁN (NOVÝ!)</h3>
              
              <div className="space-y-4 text-white">
                <div>
                  <p className="text-sm font-bold text-gray-300 mb-2">PRIMARY TEXT:</p>
                  <p className="text-sm whitespace-pre-line bg-black/30 p-4 rounded">
{`Většina kurzů = 50 stránek teorie v PDF.

Podnikatelská Čtvrtka = KONKRÉTNÍ kroky co udělat TEĎ.

CO DOSTANETE:
🎯 Celý byznys na 1 stránce (vidíte všechno najednou)
💡 Na KOHO a CO prodávat (přesné zacílení)
📋 Co dělat zítra RÁNO (konkrétní akční plán)

Ne teorie. Konkrétní výsledky.
90 minut. Hotovo.

První kurz v ČR s REÁLNOU strategií.
Bez bullshitu. Bez prázdných slibů.

🔥 PRVNÍCH 50 LIDÍ:
→ Mini kurz ZDARMA (3 dny přípravy)
→ Sleva 40% při spuštění`}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-gray-300 mb-2">HEADLINE:</p>
                    <p className="text-sm bg-black/30 p-3 rounded">Není to PDF. Je to konkrétní akční plán.</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-300 mb-2">CTA:</p>
                    <p className="text-sm bg-black/30 p-3 rounded">Chci akční plán</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ad #3 Copy */}
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-purple-300 mb-4">AD #3: CURIOSITY (UPRAVENO!)</h3>
              
              <div className="space-y-4 text-white">
                <div>
                  <p className="text-sm font-bold text-gray-300 mb-2">PRIMARY TEXT:</p>
                  <p className="text-sm whitespace-pre-line bg-black/30 p-4 rounded">
{`Proč se některým podnikatelům daří... a některým ne?

Všichni makají stejně tvrdě.
Všichni chtějí uspět.
Ale výsledky? Nebe a dudy.

Někteří:
✅ Vědí přesně komu prodávají
✅ Mají jasný podnikatelský plán
✅ Rostou stabilně každý měsíc

Jiní:
❌ Hádají co zákazník chce
❌ Mění strategii každý týden
❌ Nevědí proč to nefunguje

PROČ?

Protože úspěšní mají jasný PODNIKATELSKÝ PLÁN.
Ne v hlavě. Ne na 50 stránkách.
Na JEDNÉ stránce.

PODNIKATELSKÁ ČTVRTKA = Kurz který ti ukáže JAK.

9 kroků • 90 minut • Hotovo
První kurz v ČR. Bez bullshitu. Jen strategie která funguje.`}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-gray-300 mb-2">HEADLINE:</p>
                    <p className="text-sm bg-black/30 p-3 rounded">Proč se některým podnikatelům daří?</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-300 mb-2">CTA:</p>
                    <p className="text-sm bg-black/30 p-3 rounded">Chci vědět proč</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Summary */}
        <div className="mt-16 bg-gradient-to-r from-green-900 to-emerald-900 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-black text-white mb-6">
            ✅ 3 REKLAMY READY!
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto text-white">
            <div className="bg-white/10 rounded-xl p-6">
              <p className="font-bold mb-3 text-xl">Ad #1: Problem</p>
              <p className="text-sm mb-2">✅ Empatie</p>
              <p className="text-sm mb-2">✅ Jasný benefit</p>
              <p className="text-sm mb-2">✅ Funguje!</p>
              <p className="text-xs text-yellow-300 mt-3">Budget: 65 Kč/den</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <p className="font-bold mb-3 text-xl">Ad #2: Konkrétní plán</p>
              <p className="text-sm mb-2">✅ Bez jargonu</p>
              <p className="text-sm mb-2">✅ Jasné benefity</p>
              <p className="text-sm mb-2">✅ Results-focused</p>
              <p className="text-xs text-yellow-300 mt-3">Budget: 65 Kč/den</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <p className="font-bold mb-3 text-xl">Ad #3: Curiosity 🏆</p>
              <p className="text-sm mb-2">✅ Bez "Business Model"</p>
              <p className="text-sm mb-2">✅ Funguje pro všechny</p>
              <p className="text-sm mb-2">✅ MAIN BET!</p>
              <p className="text-xs text-yellow-300 mt-3">Budget: 70 Kč/den</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-2xl font-bold">TOTAL: 200 Kč/den • 7 dní test</p>
            <p className="text-sm text-gray-300 mt-2">Po 7 dnech: Kill underperformers, scale winner!</p>
          </div>
        </div>

        {/* Reference Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>🎯 Všechen copy je přímo tady nahoře - ready to copy/paste!</p>
          <p className="mt-2">📸 Screenshot → Upload → Launch! 🚀</p>
        </div>
      </div>
    </div>
  );
}

// 🎯 3 FINÁLNÍ AD SETY - SYSTEMATICKY + ÚDERNĚ!
// Cold traffic • Zaujmout → leads • Výrazné painy/gainy • První v ČR!

interface AdSetData {
  id: string;
  name: string;
  angle: string;
  budget: string;
  background: string;
  content: React.ReactNode;
  copy: {
    primary: string;
    headline: string;
    cta: string;
  };
}

const adSets: AdSetData[] = [
  // AD SET 4: PŘED/PO (COLD AUDIENCE!)
  {
    id: 'before-after',
    name: 'Ad Set #4: PŘED/PO ČTVRTCE',
    angle: 'Konkrétní transformace • Před vs Po',
    budget: '70 Kč/den',
    background: 'linear-gradient(135deg, #1e40af 0%, #6366f1 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <h1 className="text-6xl font-black text-white mb-8 leading-tight">
          Před Čtvrtkou → <span className="text-yellow-300">Po Čtvrtce</span>
        </h1>
        
        <div className="bg-white/95 rounded-2xl p-8 mb-6 max-w-4xl w-full">
          <div className="space-y-5">
            {/* Row 1 */}
            <div className="flex items-start gap-6 pb-4 border-b-2 border-gray-200">
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-3xl">❌</span>
                  <span className="text-red-700 text-xl line-through">Nevím, komu přesně prodávám</span>
                </div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🎯</span>
                  <span className="text-blue-700 font-bold text-xl">Vím, kdo je můj ideální zákazník</span>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-start gap-6 pb-4 border-b-2 border-gray-200">
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-3xl">❌</span>
                  <span className="text-red-700 text-xl line-through">Reklamy jen žerou peníze</span>
                </div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">💎</span>
                  <span className="text-blue-700 font-bold text-xl">Vím, co skutečně testovat první</span>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex items-start gap-6 pb-4 border-b-2 border-gray-200">
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-3xl">❌</span>
                  <span className="text-red-700 text-xl line-through">Bojím se marketingu</span>
                </div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🚀</span>
                  <span className="text-blue-700 font-bold text-xl">Rozumím, jak oslovit zákazníky</span>
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex items-start gap-6">
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-3xl">❌</span>
                  <span className="text-red-700 text-xl line-through">Nevím, jak zvýšit zisky</span>
                </div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">📈</span>
                  <span className="text-blue-700 font-bold text-xl">Vidím nové možnosti růstu</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-14 py-6 mb-6">
          <p className="text-5xl font-black">
            90 MINUT • CELÝ ROZDÍL
          </p>
        </div>

        <div className="mb-6">
          <p className="text-4xl font-black text-white mb-2">
            Podnikatelská Čtvrtka
          </p>
          <p className="text-xl text-gray-300">
            Změna, kterou uvidíte hned
          </p>
        </div>

        <div className="bg-white text-black px-16 py-7 rounded-xl shadow-2xl mb-5">
          <p className="text-5xl font-black">CHCI ZMĚNU! →</p>
        </div>

        <p className="text-yellow-300 text-2xl font-bold">
          🔥 Prvních 50 • Sleva 40%
        </p>
      </div>
    ),
    copy: {
      primary: `PŘED ČTVRTKOU → PO ČTVRTCE

❌ Nevím, komu přesně prodávám
🎯 VÍM, KDO JE MŮJ IDEÁLNÍ ZÁKAZNÍK

❌ Konkuruji jen cenou
💎 VYTVÁŘÍM JINOU HODNOTU

❌ Bojím se zkoušet nové věci
🚀 VÍM, CO OTESTOVAT PRVNÍ

❌ Marketing mě děsí
💡 ROZUMÍM, JAK OSLOVIT ZÁKAZNÍKY

❌ Nevím, jak zvýšit zisky
📈 VIDÍM NOVÉ MOŽNOSTI RŮSTU

━━━━━━━━━━━━━━━━━━━━━━━━━━━

CELÝ ROZDÍL = 90 MINUT

PODNIKATELSKÁ ČTVRTKA:
9 stavebních prvků fungujícího byznysu.

Ne teorie. Konkrétní odpovědi na vaše otázky.
Změna, kterou uvidíte HNED.

🔥 PRVNÍCH 50 LIDÍ:
→ Mini kurz ZDARMA (3 dny přípravy)
→ Průkopnická cena (sleva 40%)

⏰ Zbývá jen pár míst.`,
      headline: 'Před → Po • 90 minut změny',
      cta: 'Chci změnu'
    }
  },

  // AD SET 5: ALL-IN-ONE (WARM/RETARGETING!)
  {
    id: 'all-in-one',
    name: 'Ad Set #5: ALL-IN-ONE',
    angle: 'Nepotřebuješ 10 věcí • Jen Čtvrtku!',
    budget: '70 Kč/den',
    background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-6">
        <h1 className="text-5xl font-black text-white mb-6 leading-tight">
          Nepotřebuješ 10 věcí<br/>
          <span className="text-yellow-300">K PODNIKÁNÍ...</span>
        </h1>
        
        <div className="bg-white/95 rounded-2xl p-6 mb-5 max-w-3xl w-full">
          <p className="text-2xl font-bold text-gray-900 mb-4">
            Místo:
          </p>
          
          <div className="space-y-3 text-left mb-4">
            <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
              <span className="text-3xl">❌</span>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-lg">Guru kurz online</p>
                <p className="text-gray-600 text-base">50 hodin teorie • 5.000 Kč</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
              <span className="text-3xl">❌</span>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-lg">Marketing konzultant</p>
                <p className="text-gray-600 text-base">Obecné rady • 15.000 Kč</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
              <span className="text-3xl">❌</span>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-lg">Business stratég</p>
                <p className="text-gray-600 text-base">Týdenní čekací doba • 20.000 Kč</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-3xl">❌</span>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-lg">Marketing agentura</p>
                <p className="text-gray-600 text-base">Drahé • 30.000+ Kč/měsíc</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl px-6 py-4">
            <p className="text-xl font-black mb-1">
              ✅ Stačí: <span className="text-yellow-300">💎 Podnikatelská Čtvrtka</span>
            </p>
            <p className="text-sm">
              90 minut • 4.999 Kč • Byznys model + Marketing v jednom
            </p>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-12 py-5 mb-5">
          <p className="text-4xl font-black">
            UŠETŘÍTE 65.000+ Kč
          </p>
        </div>

        <div className="mb-5">
          <p className="text-3xl font-black text-white mb-2">
            Všechno v jednom
          </p>
          <p className="text-xl text-gray-300">
            Žádné další konzultace • Žádné další kurzy
          </p>
        </div>

        <div className="bg-white text-black px-14 py-6 rounded-xl shadow-2xl mb-4">
          <p className="text-4xl font-black">CHCI TO! →</p>
        </div>

        <p className="text-yellow-300 text-xl font-bold">
          🔥 Prvních 50 • All-in-one řešení
        </p>
      </div>
    ),
    copy: {
      primary: `NEPOTŘEBUJEŠ 10 VĚCÍ.
STAČÍ PODNIKATELSKÁ ČTVRTKA.

━━━━━━━━━━━━━━━━━━━━━━━━━━━

MÍSTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Guru kurz online
   50 hodin teorie • 5.000 Kč

❌ Marketing konzultant
   Obecné rady • 15.000 Kč

❌ Business stratég
   Týdenní čekací doba • 20.000 Kč

❌ Marketing agentura
   Drahé • 30.000+ Kč/měsíc

CELKEM: 70.000+ Kč (a stejně nejasno!)

━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ STAČÍ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

💎 PODNIKATELSKÁ ČTVRTKA

• 90 minut práce
• Byznys model + Marketing v jednom
• Konkrétní odpovědi pro VAŠE podnikání
• Žádné další konzultace
• Žádné další kurzy

CENA: 4.999 Kč

→ UŠETŘÍTE 65.000+ Kč!

━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔥 PRVNÍCH 50 LIDÍ:
→ Mini kurz ZDARMA (3 dny)
→ Průkopnická cena (sleva 40%)

Všechno v jednom. Jednou provždy.`,
      headline: 'Všechno v jednom • Ušetři 65.000 Kč',
      cta: 'Chci all-in-one'
    }
  },

  // AD SET 1: PAIN POINT (COLD AUDIENCE!)
  {
    id: 'pain',
    name: 'Ad Set #1: PAIN POINT',
    angle: 'Empatie + výrazné painy → řešení',
    budget: '65 Kč/den',
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-10 py-8">
        <h1 className="text-6xl font-black text-red-400 mb-8 leading-tight">
          "Makám od rána<br/>do večera..."
        </h1>
        <h2 className="text-5xl font-black text-white mb-12">
          ...ale podnik<br/>neroste.
        </h2>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl w-full border-2 border-white/20 mb-10">
          <h3 className="text-3xl font-bold text-white mb-5">Znáte to?</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <span className="text-red-600 text-3xl flex-shrink-0 font-black">✕</span>
              <p className="text-lg text-white">
                <strong>Marketing nefunguje</strong><br/>
                <span className="text-sm text-gray-300">Házíte peníze do reklam, ale objednávky nejsou</span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-600 text-3xl flex-shrink-0 font-black">✕</span>
              <p className="text-lg text-white">
                <strong>Nevíte, kde hledat zákazníky</strong><br/>
                <span className="text-sm text-gray-300">FB? Google? Instagram? Všude zkoušíte, nic nefunguje</span>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-600 text-3xl flex-shrink-0 font-black">✕</span>
              <p className="text-lg text-white">
                <strong>Konkurence vás tlačí dolů</strong><br/>
                <span className="text-sm text-gray-300">"Proč jste dražší než oni?" • Marže mizí</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-400 text-black rounded-xl px-12 py-7 mb-10">
          <p className="text-4xl font-black">
            CO S TÍM?
          </p>
        </div>

        <div className="mb-10">
          <h3 className="text-4xl font-black text-yellow-300 mb-3">
            Podnikatelská Čtvrtka
          </h3>
          <p className="text-2xl text-white">
            9 kroků k fungujícímu byznysu
          </p>
        </div>

        <div className="bg-white text-black px-14 py-7 rounded-xl shadow-2xl mb-6">
          <p className="text-4xl font-black">KONEČNĚ MÍT JASNO! →</p>
        </div>

        <p className="text-yellow-300 text-xl font-bold">
          ⚡ Prvních 50 lidí • Mini kurz ZDARMA
        </p>
      </div>
    ),
    copy: {
      primary: `Podnikáte, ale výsledky nepřicházejí?

Každý den makáte od rána do večera...
Ale podnik neroste.

Znáte to?
❌ MÁLO OBJEDNÁVEK
   Prázdný kalendář. Hluchý telefon. Nikdo nevolá.

❌ MARKETING = PENÍZE PRYČ
   FB reklamy? Google Ads? Nic nefunguje. Jen peníze ven.

❌ JEDEN MĚSÍC 100K, DRUHÝ 20K
   Ruský ruleta. Nevíte proč. Nemůžete spát.

Není to o tom, že by vám chybělá práce.
Chybí vám JASNÝ PLÁN.

PODNIKATELSKÁ ČTVRTKA = 9 kroků k jasnému podnikání.

Ne teorie. Ne guru kecy. Konkrétní kroky které fungují.

🎁 PRVNÍCH 50 LIDÍ:
→ Mini kurz ZDARMA po registraci (3 dny přípravy)
→ Průkopnická cena při spuštění (sleva 40%)

⏰ Zbývá jen pár míst z 50.`,
      headline: 'Konečně mějte jasno v podnikání',
      cta: 'Rezervovat místo'
    }
  },

  // AD SET 2: BYZNYS MODEL (COLD + AWARENESS!)
  {
    id: 'first',
    name: 'Ad Set #2: BYZNYS MODEL',
    angle: 'Konkrétní metoda • Model Canvas česky!',
    budget: '70 Kč/den (MAIN BET)',
    background: 'linear-gradient(135deg, #dc2626 0%, #f97316 50%, #eab308 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-10 py-6">
        <div className="bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600 rounded-2xl px-12 py-7 mb-8 border-4 border-yellow-300 shadow-2xl">
          <p className="text-6xl font-black text-yellow-100 mb-3">💡 KONEČNĚ</p>
          <p className="text-4xl font-bold text-white">
            Metoda která funguje
          </p>
        </div>

        <h1 className="text-6xl font-black text-white mb-8 leading-tight">
          Celý byznys<br/>na 1 stránce
        </h1>

        <div className="bg-white/95 rounded-xl p-7 mb-6 max-w-3xl w-full">
          <p className="text-3xl font-bold text-gray-900 mb-6">
            2 konkrétní nástroje:
          </p>
          
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <span className="text-4xl">📊</span>
              <div className="text-left">
                <p className="text-2xl font-black text-gray-900">
                  BYZNYS MODEL
                </p>
                <p className="text-lg text-gray-700">
                  Celý model na čtvrtce
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-4xl">💎</span>
              <div className="text-left">
                <p className="text-2xl font-black text-gray-900">
                  HODNOTOVÁ NABÍDKA
                </p>
                <p className="text-lg text-gray-700">
                  Přesně víš KOMU a CO prodávat
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 mb-7 border-2 border-yellow-400 max-w-3xl w-full">
          <p className="text-2xl text-yellow-300 font-bold mb-3">
            CO TÍ CHYBÍ:
          </p>
          <p className="text-lg text-white leading-relaxed">
            Guru kurzy s teorií? <span className="text-green-400 font-bold">✅ Máš.</span><br/>
            Investuješ do reklam podle expertů? <span className="text-green-400 font-bold">✅ Máš.</span><br/>
            <strong className="text-yellow-300 text-xl">Konkrétní metoda? ❌ TO NE.</strong>
          </p>
        </div>

        <div className="mb-7">
          <p className="text-5xl font-black text-white mb-2">
            90 MINUT
          </p>
          <p className="text-3xl text-yellow-300">
            Hotovo. Máš plán.
          </p>
        </div>

        <div className="bg-white text-black px-16 py-7 rounded-xl shadow-2xl mb-6">
          <p className="text-5xl font-black">CHCI METODU! →</p>
        </div>

        <p className="text-white text-2xl font-bold">
          🔥 Prvních 50 lidí • Sleva 40%
        </p>
      </div>
    ),
    copy: {
      primary: `🇨🇿 PRVNÍ KURZ V ČR TOHOTO TYPU.

Nikdo to tady nedělá. 
Žádná reálná pomoc podnikatelům v ČR není.

Guru kurzy s teorií? ✅ Máme.
AI automaty co nic neřeší? ✅ Máme.
REÁLNÁ strategie? ❌ NIČEHO.

PODNIKATELSKÁ ČTVRTKA = celý byznys na 1 stránce.

2 VĚDECKÉ NÁSTROJE POPRVÉ V ČEŠTINĚ:

📊 BUSINESS MODEL CANVAS
→ Celý obchodní model vidíš na jednom A4
→ Víš CO prodáváš a JAK vyděláváš

💎 VALUE PROPOSITION CANVAS  
→ Přesně víš KOMU a CO prodávat
→ Trefíš potřeby zákazníka na 100%

Ne teorie. Konkrétní plán který SKUTEČNĚ funguje.

⏱️ 90 MINUT = HOTOVO
Máš jasný plán. Víš kam jít. Konečně.

🔥 PRVNÍCH 50 LIDÍ:
→ Mini kurz ZDARMA (3 dny přípravy)
→ Průkopnická cena (sleva 40%)

Buď mezi prvními. Ostatní budou kopírovat.`,
      headline: 'První kurz tohoto typu v ČR',
      cta: 'Chci být první'
    }
  },

  // AD SET 3: KONKRÉTNÍ VALUE (WARM AUDIENCE!)
  {
    id: 'value',
    name: 'Ad Set #3: KONKRÉTNÍ VALUE',
    angle: 'Rychlost + konkrétní výstup',
    budget: '65 Kč/den',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center px-10 py-6">
        <div className="bg-white text-black rounded-xl px-14 py-10 mb-10">
          <p className="text-8xl font-black mb-2">90</p>
          <p className="text-5xl font-black">MINUT</p>
        </div>

        <h1 className="text-6xl font-black text-white mb-8 leading-tight">
          Celý byznys<br/>na 1 stránce
        </h1>
        
        <p className="text-4xl text-yellow-300 font-bold mb-10">
          Od chaosu k plánu
        </p>

        <div className="bg-white/95 rounded-xl p-7 mb-10 max-w-2xl w-full">
          <p className="text-2xl font-bold text-gray-900 mb-6">
            CO BUDEŠ MÍT:
          </p>
          
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-black">
                1
              </div>
              <div>
                <p className="text-xl font-black text-gray-900 mb-1">
                  Celý model na čtvrtce
                </p>
                <p className="text-sm text-gray-700">
                  Vidíš všechno najednou
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-black">
                2
              </div>
              <div>
                <p className="text-xl font-black text-gray-900 mb-1">
                  Víš KOMU prodávat
                </p>
                <p className="text-sm text-gray-700">
                  Znáš zákazníka jako sebe
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-black">
                3
              </div>
              <div>
                <p className="text-xl font-black text-gray-900 mb-1">
                  Co dělat zítra
                </p>
                <p className="text-sm text-gray-700">
                  Konkrétní kroky • Akční plán
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-3xl text-white font-bold mb-2">
            Dnes večer:
          </p>
          <p className="text-5xl font-black text-yellow-300">
            HOTOVO
          </p>
        </div>

        <div className="bg-white text-black px-14 py-7 rounded-xl shadow-2xl mb-6">
          <p className="text-4xl font-black">CHCI TO! →</p>
        </div>

        <p className="text-yellow-300 text-xl font-bold">
          ⚡ Prvních 50 • Mini kurz ZDARMA
        </p>
      </div>
    ),
    copy: {
      primary: `90 MINUT.
Od chaosu k jasnému plánu.

CELÝ BYZNYS NA 1 STRÁNCE.

CO BUDEŠ MÍT:

✅ CELÝ OBCHODNÍ MODEL NA A4
   → Vidíš všechno najednou
   → Žádný chaos v hlavě
   → Všechno má smysl

✅ PŘESNĚ VÍŠ KOMU PRODÁVAT
   → Konec hádání "kdo je můj zákazník"
   → Znáš jeho bolesti jako svý
   → Marketing najednou funguje

✅ CO DĚLAT ZÍTRA RÁNO
   → Konkrétní kroky
   → Ne teorie, AKČNÍ PLÁN
   → Víš kam jít

Většina kurzů = 50 stránek teorie v PDF.
Podnikatelská Čtvrtka = konkrétní plán za večer.

⏱️ DNES VEČER: HOTOVO.
Máš jasno. Víš co dělat. Konečně.

🎁 PRVNÍCH 50 LIDÍ:
→ Mini kurz ZDARMA (3 dny přípravy)
→ Průkopnická cena (sleva 40%)

Začni dnes. Funguj zítra.`,
      headline: '90 minut • Celý byznys na 1 stránce',
      cta: 'Chci jasný plán'
    }
  }
];

export default function Final3AdSets() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-white mb-4">
            🎯 5 AD SETŮ • 2 NOVÉ!
          </h1>
          <p className="text-2xl text-gray-300 mb-6">
            🆕 Před/Po + All-in-One (Flowlance style!)
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <div className="bg-green-600 text-white px-4 py-2 rounded-full font-bold text-sm">
              🆕 Ad #4: Před/Po Čtvrtce
            </div>
            <div className="bg-green-600 text-white px-4 py-2 rounded-full font-bold text-sm">
              🆕 Ad #5: All-in-One
            </div>
          </div>
          <p className="text-base text-gray-400">
            + 3 původní (Pain Point • První v ČR • Konkrétní Value)
          </p>
        </div>

        {/* Strategy Summary */}
        <div className="bg-purple-900/50 border-2 border-purple-500 rounded-2xl p-8 mb-12 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">📊 STRATEGIE • 5 AD SETŮ + AUDIENCE!</h2>
          
          {/* COLD AUDIENCE */}
          <div className="mb-8">
            <div className="bg-blue-600/30 border-2 border-blue-400 rounded-xl p-4 mb-4">
              <h3 className="text-xl font-bold text-blue-300 mb-2">❄️ COLD AUDIENCE (nikdy o nás neslyšeli)</h3>
              <p className="text-sm text-gray-300">Cíl: Stop scrolling • Upoutat pozornost • Relatable pain/gain</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 text-white">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-lg font-bold mb-2 text-red-400">Ad #1: PAIN POINT</p>
                <p className="text-xs mb-2 text-gray-300">
                  <strong>Angle:</strong> Specifické painy<br/>
                  <strong>Hook:</strong> "Makám od rána..."<br/>
                  <strong>Budget:</strong> 65 Kč/den
                </p>
                <div className="bg-red-900/30 rounded p-2 mt-2">
                  <p className="text-[10px] text-gray-200">
                    ✅ Konkrétní painy<br/>
                    ✅ Ne guru vibe<br/>
                    ✅ "CO S TÍM?"
                  </p>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 border-2 border-yellow-400">
                <p className="text-lg font-bold mb-2 text-yellow-400">Ad #2: BYZNYS MODEL ⭐</p>
                <p className="text-xs mb-2 text-gray-300">
                  <strong>Angle:</strong> Konkrétní metoda<br/>
                  <strong>Hook:</strong> "💡 KONEČNĚ"<br/>
                  <strong>Budget:</strong> 70 Kč/den
                </p>
                <div className="bg-yellow-900/30 rounded p-2 mt-2">
                  <p className="text-[10px] text-gray-200">
                    ✅ "Metoda funguje"<br/>
                    ✅ Česky (ne BMC/VPC)<br/>
                    ✅ Konkrétní nástroje
                  </p>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 border-2 border-green-400">
                <p className="text-lg font-bold mb-2 text-green-400">Ad #4: PŘED/PO 🆕</p>
                <p className="text-xs mb-2 text-gray-300">
                  <strong>Angle:</strong> Transformace<br/>
                  <strong>Hook:</strong> "Před → Po"<br/>
                  <strong>Budget:</strong> 70 Kč/den
                </p>
                <div className="bg-green-900/30 rounded p-2 mt-2">
                  <p className="text-[10px] text-gray-200">
                    ✅ Visual kontrast<br/>
                    ✅ Konkrétní změna<br/>
                    ✅ Aspirational
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* WARM/RETARGETING */}
          <div className="mb-6">
            <div className="bg-orange-600/30 border-2 border-orange-400 rounded-xl p-4 mb-4">
              <h3 className="text-xl font-bold text-orange-300 mb-2">🔥 WARM / RETARGETING (znají nás, váhají)</h3>
              <p className="text-sm text-gray-300">Cíl: Překonat námitky • Ukázat value • Urgence</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-white">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-lg font-bold mb-2 text-purple-400">Ad #3: VALUE</p>
                <p className="text-xs mb-2 text-gray-300">
                  <strong>Angle:</strong> Rychlost + výstup<br/>
                  <strong>Hook:</strong> "90 MINUT"<br/>
                  <strong>Budget:</strong> 65 Kč/den
                </p>
                <div className="bg-purple-900/30 rounded p-2 mt-2">
                  <p className="text-[10px] text-gray-200">
                    ✅ Konkrétní benefit<br/>
                    ✅ Time value<br/>
                    ✅ Clear deliverable
                  </p>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 border-2 border-yellow-400">
                <p className="text-lg font-bold mb-2 text-yellow-400">Ad #5: ALL-IN-ONE 🆕</p>
                <p className="text-xs mb-2 text-gray-300">
                  <strong>Angle:</strong> Simplifikace<br/>
                  <strong>Hook:</strong> "Místo 10 věcí..."<br/>
                  <strong>Budget:</strong> 70 Kč/den
                </p>
                <div className="bg-yellow-900/30 rounded p-2 mt-2">
                  <p className="text-[10px] text-gray-200">
                    ✅ Překoná "tried it all"<br/>
                    ✅ Cost comparison<br/>
                    ✅ Simplification appeal
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-purple-400">
            <div className="text-center mb-4">
              <p className="text-2xl font-bold mb-2">TOTAL: 340 Kč/den</p>
              <p className="text-sm text-gray-300">3 cold • 2 warm/retargeting</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-lg font-bold mb-3">🧪 TEST STRATEGIE:</p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-bold text-green-400 mb-1">DAY 1-3:</p>
                  <p className="text-xs text-gray-300">Launch všech 5 • Sleduj CTR</p>
                </div>
                <div>
                  <p className="font-bold text-yellow-400 mb-1">DAY 4-7:</p>
                  <p className="text-xs text-gray-300">Vyhodnoť • Kill bottom 2</p>
                </div>
                <div>
                  <p className="font-bold text-blue-400 mb-1">DAY 8+:</p>
                  <p className="text-xs text-gray-300">Scale top 3 • Dominuj!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Sets Grid */}
        <div className="space-y-16">
          {adSets.map((adSet, index) => (
            <div key={adSet.id} className="space-y-6">
              {/* Ad Set Info */}
              <div className="bg-gray-800 rounded-xl p-8 border-l-4" style={{
                borderColor: index === 1 ? '#facc15' : '#3b82f6'
              }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{adSet.name}</h3>
                    <p className="text-xl text-yellow-300 font-semibold mb-2">
                      {adSet.angle}
                    </p>
                    <p className="text-lg text-gray-400">
                      Budget: {adSet.budget}
                    </p>
                  </div>
                  {index === 1 && (
                    <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                      ⭐ MAIN BET
                    </div>
                  )}
                </div>
              </div>

              {/* Visual - 1080x1080px */}
              <div className="flex justify-center">
                <div 
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                  style={{ 
                    width: '1080px',
                    height: '1080px',
                    maxWidth: '100%',
                    aspectRatio: '1/1',
                    background: adSet.background
                  }}
                >
                  {adSet.content}
                </div>
              </div>

              {/* Copy */}
              <div className="bg-gray-800 rounded-xl p-8">
                <h4 className="text-2xl font-bold text-white mb-6">📝 AD COPY</h4>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-bold text-yellow-300 mb-2">PRIMARY TEXT:</p>
                    <p className="text-sm whitespace-pre-line bg-black/30 p-4 rounded text-gray-200">
                      {adSet.copy.primary}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-bold text-yellow-300 mb-2">HEADLINE:</p>
                      <p className="text-sm bg-black/30 p-3 rounded text-gray-200">
                        {adSet.copy.headline}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-yellow-300 mb-2">CTA:</p>
                      <p className="text-sm bg-black/30 p-3 rounded text-gray-200">
                        {adSet.copy.cta}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-yellow-300 mb-2">BUDGET:</p>
                      <p className="text-sm bg-black/30 p-3 rounded text-gray-200">
                        {adSet.budget}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screenshot Hint */}
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-400">
                  👆 Right-click → Screenshot nebo Print Screen • 1080x1080px ready!
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Testing Strategy */}
        <div className="mt-16 bg-gradient-to-r from-green-900 to-emerald-900 rounded-2xl p-8">
          <h2 className="text-3xl font-black text-white mb-8 text-center">
            🧪 TESTING & SCALING STRATEGIE
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-white mb-8">
            <div className="bg-white/10 rounded-xl p-6">
              <p className="text-2xl font-bold mb-4">DAY 1-3</p>
              <p className="text-sm mb-2">• Launch všech 3</p>
              <p className="text-sm mb-2">• Monitor CTR denně</p>
              <p className="text-sm mb-2">• Budget: 200 Kč/den total</p>
              <p className="text-yellow-300 text-sm mt-4">→ Find leader</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6">
              <p className="text-2xl font-bold mb-4">DAY 4-7</p>
              <p className="text-sm mb-2">• Keep top 2</p>
              <p className="text-sm mb-2">• Kill underperformer if CTR &lt; 1%</p>
              <p className="text-sm mb-2">• Redistribute budget</p>
              <p className="text-yellow-300 text-sm mt-4">→ Find winner</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6">
              <p className="text-2xl font-bold mb-4">DAY 8+</p>
              <p className="text-sm mb-2">• Scale winner</p>
              <p className="text-sm mb-2">• 300-500 Kč/den</p>
              <p className="text-sm mb-2">• Create variants</p>
              <p className="text-yellow-300 text-sm mt-4">→ Dominate! 🚀</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-6 max-w-3xl mx-auto">
            <p className="text-xl font-bold mb-4">🎯 EXPECTED WINNER:</p>
            <p className="text-lg mb-2">
              <strong className="text-yellow-300">Ad #2 (Byznys Model) nebo Ad #5 (All-in-One)</strong>
            </p>
            <p className="text-sm text-gray-300">
              Proč? "Metoda která funguje" + česky! (ne BMC/VPC scary názvy). 
              All-in-One = simplifikace (překoná "tried it all"). 
              Oba mají vysoký curiosity factor!
            </p>
          </div>
        </div>

        {/* Targeting */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8">
          <h2 className="text-3xl font-black text-white mb-6 text-center">
            🎯 TARGETING (všechny stejné!)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-white">
            <div className="bg-white/10 rounded-xl p-6">
              <p className="text-xl font-bold mb-4">DEMOGRAPHICS:</p>
              <p className="text-sm mb-2">• Age: 28-55 let (TVRDO!)</p>
              <p className="text-sm mb-2">• Location: Česká republika</p>
              <p className="text-sm mb-2">• Language: Czech</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6">
              <p className="text-xl font-bold mb-4">INTERESTS:</p>
              <p className="text-sm mb-2">• Small Business</p>
              <p className="text-sm mb-2">• Entrepreneurship</p>
              <p className="text-sm mb-2">• Business Management</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6">
              <p className="text-xl font-bold mb-4">PLACEMENT (MANUAL!):</p>
              <p className="text-sm mb-2">✅ Facebook Feed</p>
              <p className="text-sm mb-2">✅ Instagram Feed</p>
              <p className="text-sm mb-2">❌ Stories (NE!)</p>
              <p className="text-sm mb-2">❌ Reels (NE!)</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6">
              <p className="text-xl font-bold mb-4">EXPECTED METRICS:</p>
              <p className="text-sm mb-2">• CTR: 1.5-2.5%</p>
              <p className="text-sm mb-2">• CPL: 35-50 Kč</p>
              <p className="text-sm mb-2">• Leads/day: 4-6</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            ✅ 3 FINÁLNÍ AD SETY READY!
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Systematicky • Úderně • Pro cold traffic!
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="bg-white/10 rounded-xl px-6 py-3">
              <p className="text-sm text-gray-300">Výrazné painy ✅</p>
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-3">
              <p className="text-sm text-gray-300">První v ČR ✅</p>
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-3">
              <p className="text-sm text-gray-300">BMC + VPC česky ✅</p>
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-3">
              <p className="text-sm text-gray-300">Konkrétní value ✅</p>
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-3">
              <p className="text-sm text-gray-300">200 Kč/den ✅</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>📸 Screenshot → Upload do FB Ads Manager → Launch! 🚀</p>
        </div>
      </div>
    </div>
  );
}

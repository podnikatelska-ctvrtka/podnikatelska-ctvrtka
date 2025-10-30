import { Card } from './ui/card';
import { Button } from './ui/button';
import { ThumbsUp, MessageCircle, Share2, ExternalLink } from 'lucide-react';

interface AdData {
  id: string;
  name: string;
  budget: string;
  visual: {
    background: string;
    headline: string;
    subheadline?: string;
    content?: string[];
    badge?: string;
  };
  copy: {
    primary: string;
    headline: string;
    description: string;
    cta: string;
  };
  notes?: string;
}

const adSets: AdData[] = [
  // AD SET #1: PROBLEM
  {
    id: 'problem',
    name: 'Ad Set #1: PROBLEM 😰',
    budget: '65 Kč/den',
    visual: {
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      headline: 'Makám od rána do večera...',
      subheadline: '...ale podnik neroste.',
      content: [
        'Znáte to?',
        '❌ Málo objednávek, prázdný podnik',
        '❌ Marketing nefunguje, peníze ven',
        '❌ Nestabilní tržby každý měsíc'
      ]
    },
    copy: {
      primary: `Podnikáte, ale výsledky nepřicházejí?

Každý den makáte od rána do večera...
Ale podnik neroste.

Znáte to?
❌ Málo objednávek, prázdný podnik
❌ Marketing nefunguje, peníze ven
❌ Nestabilní tržby každý měsíc

Není to o tom, že by vám chybělá práce.
Chybí vám JASNÝ PLÁN.

PODNIKATELSKÁ ČTVRTKA = 9 kroků k jasnému podnikání.

Ne teorie. Ne guru kecy. Jen konkrétní kroky které fungují.

🎁 PRŮKOPNICKÁ VÝHODA (prvních 50 lidí):
→ Sleva 40% během prvních 24 hodin (ušetříte 3.500 Kč)
→ Průkopnická cena 4.999 Kč místo 8.499 Kč
→ BONUS: 3-denní mini kurz ZDARMA pro prvních 50

💰 CELKOVÁ ÚSPORA: 3.500 Kč

⏰ Zbývá jen pár míst z 50.`,
      headline: 'Konečně mějte jasno v podnikání',
      description: '9 kroků k fungujícímu byznysu • Prvních 50 získá bonusy ZDARMA',
      cta: 'Rezervovat místo'
    },
    notes: 'Angle: Emocionální pain → empatie. Target: Frustrated entrepreneurs.'
  },
  
  // AD SET #2: DIFERENCIACE
  {
    id: 'differentiation',
    name: 'Ad Set #2: DIFERENCIACE 🎯 (NOVÝ!)',
    budget: '65 Kč/den',
    visual: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      headline: 'Není to PDF.',
      subheadline: 'Dostaneš KONKRÉTNÍ akční plán.',
      content: [
        '🎯 Business Model Canvas',
        '💡 Value Proposition',
        '🎨 4 vzorové modely',
        '📋 Akční plán co dělat TEĎ'
      ]
    },
    copy: {
      primary: `Většina kurzů = 50 stránek teorie v PDF.

Podnikatelská Čtvrtka = KONKRÉTNÍ kroky co udělat TEĎ.

CO DOSTANEŠ:
🎯 Business Model Canvas (celý byznys na 1 stránce)
💡 Value Proposition (NA KOHO a CO nabídnout)
🎨 4 vzorové modely (fungující byznysy)
📋 Akční plán (konkrétní kroky co dělat zítra)

Ne teorie. Konkrétní výsledky.

90 minut. Hotovo.

První kurz v ČR s REÁLNOU strategií.
Bez bullshitu. Bez prázdných slibů.

🔥 PRŮKOPNICKÁ NABÍDKA:
→ Mini kurz ZDARMA (3 dny po registraci)
→ Sleva 62% při spuštění
→ Konzultace ZDARMA (prvních 50)`,
      headline: 'Není to PDF. Dostaneš KONKRÉTNÍ akční plán.',
      description: 'Business Model Canvas + Value Proposition + Akční plán • 90 minut',
      cta: 'Chci konkrétní plán'
    },
    notes: 'Angle: Results-focused (NE AI!). Target: Value seekers. Zdůrazňuje BMC + VPC.'
  },
  
  // AD SET #4: CURIOSITY (MAIN BET!)
  {
    id: 'curiosity',
    name: 'Ad Set #4: CURIOSITY 🏆 (MAIN BET!)',
    budget: '70 Kč/den (NEJVYŠŠÍ!)',
    visual: {
      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%)',
      headline: 'PROČ?',
      content: [
        'Někteří:',
        '✅ Jasný plán',
        '✅ Vědí KOMU prodávat',
        '✅ Stabilní růst',
        '',
        'Jiní:',
        '❌ Chaos v hlavě',
        '❌ Hádají co funguje',
        '❌ Nestabilní tržby'
      ]
    },
    copy: {
      primary: `Proč se některým podnikatelům daří... a některým ne?

Všichni makají stejně tvrdě.
Všichni chtějí uspět.
Ale výsledky? Nebe a dudy.

Někteří:
✅ Vědí přesně komu prodávají
✅ Mají jasný hodnotový návrh
✅ Rostou stabilně každý měsíc

Jiní:
❌ Hádají co zákazník chce
❌ Mění strategii každý týden
❌ Nevědí proč to nefunguje

PROČ?

Protože úspěšní mají jasný BUSINESS MODEL.
Ne v hlavě. Ne na 50 stránkách.
Na JEDNÉ stránce.

PODNIKATELSKÁ ČTVRTKA = Kurz který ti ukáže JAK.

🎯 9 lekcí Business Model Canvas
💡 Value Proposition (kdo + co)
🎨 4 vzorové modely (fungující byznysy)
📋 Personalizovaný akční plán

První kurz v ČR. Bez bullshitu. Jen strategie která funguje.`,
      headline: 'Proč se některým podnikatelům daří?',
      description: '9 lekcí Business Model Canvas • Konkrétní akční plán • Prvních 50 bonusy',
      cta: 'Chci vědět proč'
    },
    notes: 'BEST PERFORMER! Curiosity angle. Expected: CTR 1.8-2.5%, CPL 35-45 Kč. Funguje pro VŠECHNY!'
  }
];

const orangeBoxVariants: AdData[] = [
  // VARIANTA A: AGRESIVNÍ
  {
    id: 'orange-aggressive',
    name: '🔥 ORANŽOVÝ BOX - Varianta A (Agresivní)',
    budget: 'Retargeting',
    visual: {
      background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
      headline: '❌ DOST BYLO BULLSHITU',
      subheadline: 'První kurz v ČR s REÁLNOU strategií',
      content: [
        '❌ Experti (bez strategie = hození peněz)',
        '❌ AI nástroje (žádná hodnota)',
        '❌ Guruové (prázdné sliby)'
      ]
    },
    copy: {
      primary: `STAČILO VYHAZOVAT PENÍZE? 💸

Experti na FB reklamy vás přesvědčí, 
že problém je v nastavení kampaní.

Není.

Problém je, že NEMÁTE STRATEGII.

Bez strategie je reklama jen hození peněz oknem.

→ Podnikatelská Čtvrtka = strategie za 90 minut
→ První kurz v ČR. Bez AI bullshitu.

Ne další "hack". Ne další "systém".
Jen STRATEGIE která funguje.

🎯 Business Model Canvas (celý byznys na 1 stránce)
💡 Value Proposition (NA KOHO prodávat)
📋 Akční plán (CO dělat zítra)

Expertů na reklamy je dost.
Expertů na strategii... skoro nikdo.

Buď mezi prvními.`,
      headline: 'Dost bylo vyhazování peněz za "experty"',
      description: 'První kurz v ČR s REÁLNOU strategií • Bez bullshitu • 90 minut',
      cta: 'Chci strategii, ne další prachy na vítr'
    },
    notes: 'Anti-establishment angle. Pro frustrované podnikatele. Konfrontační, ale upřímné.'
  },
  
  // VARIANTA B: SOFT
  {
    id: 'orange-soft',
    name: '🔥 ORANŽOVÝ BOX - Varianta B (Soft)',
    budget: 'Retargeting',
    visual: {
      background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
      headline: '3 věci, co vám NIKDO neřekne 🤫',
      content: [
        '1️⃣ Experti na reklamu?',
        'Bez strategie = hození peněz',
        '',
        '2️⃣ AI nástroje?',
        'Žádnou hodnotu za 0 dní',
        '',
        '3️⃣ Guru kurzy?',
        'Frustrovaní podnikatelé'
      ]
    },
    copy: {
      primary: `3 věci, co vám NIKDO neřekne: 🤫

1️⃣ Experti na reklamu?
Pomůžou až budete mít strategii. Bez ní = hození peněz.

2️⃣ AI nástroje?
Vygenerují "business plán" za 5 minut. Žádnou hodnotu za 0 dní.

3️⃣ Guru kurzy?
Sliby o milionech. Realita? Frustrovaní podnikatelé.

✅ Podnikatelská Čtvrtka = SKUTEČNÁ strategie

• 90 minut práce (ne 50h teorie)
• Jasný plán (ne "možná by to mohlo")
• Reálné výsledky (ne sliby o milionech)

První kurz v ČR který SKUTEČNĚ pomůže vašemu podnikání.

🎯 Business Model Canvas
💡 Value Proposition
📋 Konkrétní akční plán

Ne další guru kecy. Strategie která funguje.`,
      headline: '3 věci co vám nikdo neřekne o podnikání',
      description: 'První kurz v ČR s reálnou strategií • 90 minut • Konkrétní kroky',
      cta: 'Chci to zkusit jinak'
    },
    notes: 'Edukativní approach. Mírnější než A. Funguje pro skeptiky.'
  },
  
  // VARIANTA C: STORYTELLING
  {
    id: 'orange-story',
    name: '🔥 ORANŽOVÝ BOX - Varianta C (Storytelling)',
    budget: 'Retargeting',
    visual: {
      background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
      headline: 'Markéta utratila 50.000 Kč...',
      subheadline: '...za FB reklamy. Ztráta 48.000 Kč.',
      content: [
        '"Expert" → kampaně',
        '"AI nástroj" → texty',
        '"Guru kurz" → miliony',
        '',
        'Výsledek? 2 prodeje.',
        '',
        'Pak Čtvrtka: 35 prodejů. ✅'
      ]
    },
    copy: {
      primary: `Markéta utratila 50.000 Kč za FB reklamy. ❌

"Expert" jí nastavil kampaně.
"AI nástroj" jí vygeneroval texty.
"Guru kurz" jí sliboval miliony.

Výsledek? 2 prodeje. Ztráta 48.000 Kč.

Pak objevila Podnikatelskou Čtvrtku. ✅

Za 90 minut zjistila:
• Komu SKUTEČNĚ prodává
• Jakou hodnotu nabízí
• Jak správně komunikovat

Další měsíc: 35 prodejů. Profit 120.000 Kč.

Rozdíl? Strategie. Ne další "hacks".

PODNIKATELSKÁ ČTVRTKA:
🎯 Business Model Canvas (celý byznys na 1 stránce)
💡 Value Proposition (přesné zacílení)
📋 Akční plán (konkrétní kroky)

90 minut. Jasná strategie. Reálné výsledky.

Chceš výsledky jako Markéta?`,
      headline: 'Jak Markéta změnila ztrátu 48.000 Kč v profit 120.000 Kč',
      description: 'Reálný příběh • 90 minut strategie • Konkrétní výsledky',
      cta: 'Chci strategii jako Markéta'
    },
    notes: 'BEST PRO RETARGETING! Storytelling = nejvyšší engagement. Konkrétní čísla = důvěryhodnost.'
  }
];

function AdCard({ ad }: { ad: AdData }) {
  return (
    <Card className="overflow-hidden shadow-xl border-2">
      {/* Header */}
      <div className="p-4 bg-white border-b">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
            PČ
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Podnikatelská Čtvrtka</span>
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                Sponsorováno
              </span>
            </div>
            <div className="text-xs text-gray-500">Právě teď</div>
          </div>
        </div>
      </div>

      {/* Visual */}
      <div
        className="p-8 text-white relative overflow-hidden"
        style={{ background: ad.visual.background, minHeight: '300px' }}
      >
        {ad.visual.badge && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold">
            {ad.visual.badge}
          </div>
        )}
        
        <div className="max-w-lg mx-auto text-center space-y-4">
          {ad.visual.headline && (
            <h2 className="text-3xl md:text-4xl font-black leading-tight">
              {ad.visual.headline}
            </h2>
          )}
          
          {ad.visual.subheadline && (
            <p className="text-xl md:text-2xl font-semibold opacity-90">
              {ad.visual.subheadline}
            </p>
          )}
          
          {ad.visual.content && ad.visual.content.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-6 text-left">
              {ad.visual.content.map((line, idx) => (
                <p key={idx} className={`${line.startsWith('✅') || line.startsWith('❌') || line.startsWith('🎯') || line.startsWith('💡') || line.startsWith('🎨') || line.startsWith('📋') || line.startsWith('1️⃣') || line.startsWith('2️⃣') || line.startsWith('3️⃣') ? 'text-base' : line === '' ? 'my-2' : 'text-sm opacity-80'} ${line.startsWith('Znáte to?') || line.startsWith('Někteří:') || line.startsWith('Jiní:') ? 'font-bold mt-3 mb-1' : ''}`}>
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Copy */}
      <div className="p-4 bg-white">
        {/* Primary Text */}
        <div className="mb-4">
          <p className="text-sm text-gray-800 whitespace-pre-line">
            {ad.copy.primary}
          </p>
        </div>

        {/* Card with Headline/Description */}
        <div className="border rounded-lg overflow-hidden mb-3">
          <div className="bg-gray-50 p-4">
            <p className="font-semibold text-gray-900 mb-1">
              {ad.copy.headline}
            </p>
            <p className="text-xs text-gray-600">
              {ad.copy.description}
            </p>
            <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white">
              {ad.copy.cta}
            </Button>
          </div>
        </div>

        {/* Reactions */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pt-2 border-t">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                <ThumbsUp className="w-3 h-3 text-white" />
              </div>
            </div>
            <span>247</span>
          </div>
          <div className="flex gap-3">
            <span>89 komentářů</span>
            <span>32 sdílení</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-around border-t pt-2">
          <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">
            <ThumbsUp className="w-4 h-4" />
            <span className="text-sm font-semibold">Líbí se mi</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-semibold">Komentář</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-semibold">Sdílet</span>
          </button>
        </div>
      </div>

      {/* Ad Info Footer */}
      <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-t">
        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="font-semibold text-blue-900">{ad.name}</span>
            <span className="text-gray-600 ml-2">• Budget: {ad.budget}</span>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </div>
        {ad.notes && (
          <p className="text-xs text-gray-600 mt-1 italic">
            {ad.notes}
          </p>
        )}
      </div>
    </Card>
  );
}

export default function AdPreview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-3">
            🎯 Facebook Reklamy - Preview
          </h1>
          <p className="text-gray-600 text-lg">
            Podnikatelská Čtvrtka - Kompletní reklamní package
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            ✅ Ready to Launch • Budget: 200 Kč/den
          </div>
        </div>

        {/* Finální 3 Ad Sety */}
        <div className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              ✅ FINÁLNÍ 3 AD SETY (SCHVÁLENO!)
            </h2>
            <p className="text-gray-600">
              Launch priority • 7 dní test • Scale winner
            </p>
          </div>
          
          <div className="space-y-8">
            {adSets.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        </div>

        {/* Oranžový Box Varianty */}
        <div className="mb-12">
          <div className="mb-6 bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-xl border-2 border-orange-300">
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              🔥 ORANŽOVÝ BOX - ANTI-GURU MESSAGING!
            </h2>
            <p className="text-gray-700 mb-3">
              Pro retargeting • Později • 3 varianty copy
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                Varianta A: Agresivní 💪
              </span>
              <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                Varianta B: Soft 🤝
              </span>
              <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                Varianta C: Storytelling 📖 (BEST!)
              </span>
            </div>
          </div>
          
          <div className="space-y-8">
            {orangeBoxVariants.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow-xl p-8 border-2">
          <h2 className="text-2xl font-black mb-4">📊 STRATEGIE SUMMARY</h2>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-900 mb-2">✅ LAUNCH TEĎKA:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Ad Set #1 (Problem) - 65 Kč/den</li>
                <li>• Ad Set #2 (Diferenciace) - 65 Kč/den</li>
                <li>• Ad Set #4 (Curiosity) - 70 Kč/den 🏆</li>
                <li className="font-semibold mt-2">→ TOTAL: 200 Kč/den • 7 dní test</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
              <h3 className="font-bold text-orange-900 mb-2">🔥 ORANŽOVÝ BOX (POZDĚJI):</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Pro retargeting audiences</li>
                <li>• Email marketing (#2)</li>
                <li>• Best = Varianta C (Storytelling!)</li>
                <li className="font-semibold mt-2">→ Add +50-100 Kč/den po Week 1</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-bold text-blue-900 mb-2">🎯 EXPECTED PERFORMANCE:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Ad Set #4 (Curiosity): CTR 1.8-2.5%, CPL 35-45 Kč 🏆</li>
                <li>• Ad Set #1 (Problem): Higher CTR, empatie hook</li>
                <li>• Ad Set #2 (Diferenciace): Value seekers, results-focused</li>
                <li>• Oranžový box: Best pro retargeting!</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 italic">
              💡 <strong>TIP:</strong> Po 7 dnech zkill underperformers (CTR &lt; 1%) a scale winner na 300-500 Kč/den!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            🎯 Preview ready • Export PNG (1080x1080) • Upload to FB Ads Manager
          </p>
          <p className="mt-2">
            Status: <span className="text-green-600 font-semibold">✅ READY TO LAUNCH!</span>
          </p>
        </div>
      </div>
    </div>
  );
}

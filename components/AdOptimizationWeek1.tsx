import { Card } from './ui/card';
import { Button } from './ui/button';
import { ThumbsUp, MessageCircle, Share2, TrendingUp, AlertCircle, CheckCircle2, Zap } from 'lucide-react';

interface AdPerformance {
  clicks: number;
  impressions: number;
  cpc: number;
  ctr: number;
  status: 'winner' | 'underperformer' | 'new';
}

interface AdData {
  id: string;
  name: string;
  version: string;
  performance?: AdPerformance;
  visual: {
    background: string;
    headline: string;
    subheadline?: string;
    content?: string[];
    textColor?: string;
    headlineColor?: string;
    subheadlineColor?: string;
  };
  copy: {
    primary: string;
    headline: string;
    description: string;
    cta: string;
  };
  changes?: string[];
  reasoning?: string;
}

const currentAds: AdData[] = [
  {
    id: 'ztrata-improved',
    name: '🔥 ZTRÁTA - VYLEPŠENÁ VERZE',
    version: 'v2.0 - Čitelnější',
    performance: {
      clicks: 131,
      impressions: 7200,
      cpc: 5,
      ctr: 1.82,
      status: 'winner'
    },
    visual: {
      background: 'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)',
      headline: 'Markéta utratila 50.000 Kč...',
      subheadline: '...za FB reklamy.',
      content: [
        '❌ Expert → 0 výsledků',
        '❌ AI nástroj → 0 hodnoty', 
        '❌ Guru kurz → prázdné sliby',
        '',
        '📉 Výsledek: -48.000 Kč',
        '',
        '✅ Pak Čtvrtka: +120.000 Kč'
      ],
      textColor: 'text-white',
      headlineColor: 'text-yellow-300',
      subheadlineColor: 'text-yellow-200'
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

90 minut. Jasná strategie. Reálné výsledky.`,
      headline: 'Jak Markéta změnila ztrátu 48.000 Kč v profit 120.000 Kč',
      description: 'Reálný příběh • 90 minut strategie • Konkrétní výsledky',
      cta: 'Chci strategii jako Markéta'
    },
    changes: [
      '✅ Tmavší červené pozadí (#7f1d1d místo #b91c1c) = lepší kontrast',
      '✅ Rozdělený subheadline na 2 řádky = lépe čitelný',
      '✅ Žluté headline/subheadline (#fde047, #fef08a) = výrazný kontrast',
      '✅ Bílý text pro content (#ffffff) = maximální čitelnost',
      '✅ Strukturovanější obsah s emoji = snadnější skenování',
      '✅ Větší font size pro headline (text-5xl místo text-4xl)'
    ],
    reasoning: 'TÉTO REKLAMĚ VĚŘÍ FACEBOOK! 131 kliků = 73% všech kliků. Problém byla jen čitelnost. Vyřešeno kontrastem.'
  }
];

const newAds: AdData[] = [
  {
    id: 'breakthrough-numbers',
    name: '💡 BREAKTHROUGH - Konkrétní čísla',
    version: 'v1.0 - Nová',
    performance: {
      clicks: 0,
      impressions: 0,
      cpc: 0,
      ctr: 0,
      status: 'new'
    },
    visual: {
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      headline: '11 zákazníků denně.',
      subheadline: 'To je vše, co potřebujete.',
      content: [
        '☕ Kavárna: 50.000 Kč náklady/měsíc',
        '💰 Průměrný účet: 150 Kč',
        '📊 50.000 ÷ 150 = 334 zákazníků/měsíc',
        '',
        '✅ = 11 zákazníků DENNĚ',
        '',
        '⚡ Víte, jak jich získat 11?'
      ],
      textColor: 'text-white',
      headlineColor: 'text-yellow-300',
      subheadlineColor: 'text-green-100'
    },
    copy: {
      primary: `Majitelka kavárny na mě zírala: "To je vše?"

Ano. 11 zákazníků denně.

Většina podnikatelů si myslí, že potřebují MNOHO zákazníků.
Ne. Potřebujete SPRÁVNÝ POČET zákazníků.

PŘÍKLAD - KAVÁRNA:
💰 Náklady: 50.000 Kč/měsíc
💵 Průměrný účet: 150 Kč
📊 50.000 ÷ 150 = 334 zákazníků/měsíc

✅ To je 11 zákazníků DENNĚ.

Zvládnutelné? Ano.
Reálné? Absolutně.
Jen musíte vědět KOLIK potřebujete.

PODNIKATELSKÁ ČTVRTKA vás naučí:
🎯 Spočítat PŘESNĚ kolik zákazníků potřebujete
💡 Zjistit KDE tyto zákazníky najít
📋 Vytvořit plán JAK je získat

Většina podnikatelů hádá.
Úspěšní počítají.

90 minut. Konkrétní čísla. Jasný cíl.`,
      headline: 'Přestaňte hádat. Začněte počítat.',
      description: 'Spočítejte si přesně kolik zákazníků potřebujete • Konkrétní nástroje • 90 minut',
      cta: 'Chci vědět své číslo'
    },
    reasoning: 'ANGLE: Konkrétní čísla + Clarity. Target: Všichni (funguje i pro úspěšné). Trigger: "Je to tak jednoduché?" + FOMO z jasnosti.'
  },
  {
    id: 'invisible-enemy',
    name: '⚡ NEVIDITELNÝ NEPŘÍTEL - Pain recognition',
    version: 'v1.0 - Nová',
    performance: {
      clicks: 0,
      impressions: 0,
      cpc: 0,
      ctr: 0,
      status: 'new'
    },
    visual: {
      background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
      headline: 'Bojujete s neviditelným nepřítelem.',
      subheadline: 'A ani to netušíte.',
      content: [
        '❌ Dělám vše správně... Proč to nefunguje?',
        '❌ Mám produkt, marketing... Kde je problém?',
        '❌ Pracuju 12h denně... Kde jsou výsledky?',
        '',
        '💡 PROBLÉM:',
        'Nemáte strategii.',
        'A to NIKDO nevidí.'
      ],
      textColor: 'text-white',
      headlineColor: 'text-yellow-300',
      subheadlineColor: 'text-purple-200'
    },
    copy: {
      primary: `"Dělám přece všechno správně... Proč to nefunguje?"

Tomáš má produkt.
Tomáš má Instagram.
Tomáš posílá newslettery.
Tomáš dělá FB reklamy.

Ale výsledky? Mizerné.

PROČ?

Protože bojuje s neviditelným nepřítelem:
Nemá STRATEGII.

Má aktivity. Má "to-do" listy.
Ale nemá JASNÝ PLÁN.

• Neví PŘESNĚ komu prodává
• Nemá jasnou hodnotovou nabídku
• Tápe v prioritách co dělat první

Výsledek? 
Spálených 40.000 Kč na marketing.
0 reálných výsledků.

Pak zkusil Podnikatelskou Čtvrtku.

Za 90 minut:
✅ Zjistil PŘESNĚ komu prodává (target segment)
✅ Vytvořil jasnou hodnotovou nabídku (VPC)
✅ Dostal akční plán co dělat ZÍTRA

Další měsíc: První profit.
Další 3 měsíce: 3x růst.

Rozdíl? Strategie. Ne další "aktivity".

PODNIKATELSKÁ ČTVRTKA:
🎯 Business Model Canvas (strategie na 1 stránce)
💡 Value Proposition (komu a co prodávat)
📋 Akční plán (co dělat hned)

90 minut. Jasná strategie. Konec tápání.`,
      headline: 'Přestaňte bojovat s neviditelným nepřítelem',
      description: 'Získejte jasnou strategii • Ne další aktivity • 90 minut',
      cta: 'Chci jasnou strategii'
    },
    reasoning: 'ANGLE: Neviditelný problém (strategie). Target: Frustrated entrepreneurs. Trigger: Pain recognition + "Aha! To je ono!" moment.'
  }
];

export default function AdOptimizationWeek1() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* HEADER */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full border border-green-500/20">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">DEN 5 - OPTIMALIZACE KAMPANĚ</span>
          </div>
          <h1 className="text-4xl md:text-5xl text-white">
            Analýza + Akční plán 🎯
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            178 kliků • 5 Kč CPC • 0 konverzí → Co dělat teď?
          </p>
        </div>

        {/* PERFORMANCE SUMMARY */}
        <Card className="bg-slate-900/50 border-slate-800 p-8">
          <h2 className="text-2xl text-white mb-6">📊 AKTUÁLNÍ PERFORMANCE</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Kliků na odkaz</p>
              <p className="text-3xl text-white">178</p>
              <div className="text-xs text-green-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Dobré číslo!
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">CPC (cena za klik)</p>
              <p className="text-3xl text-white">5 Kč</p>
              <div className="text-xs text-green-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Vynikající! (průměr CZ: 8-12 Kč)
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Prodejů</p>
              <p className="text-3xl text-white">0</p>
              <div className="text-xs text-yellow-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Ještě brzy (průměr: 7-14 dní)
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Rozložení kliků</p>
              <div className="space-y-1">
                <p className="text-sm text-white">Ztráta: <span className="text-green-400">131</span> (73%)</p>
                <p className="text-sm text-gray-400">Ostatní: 47 (27%)</p>
              </div>
              <div className="text-xs text-blue-400 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Clear winner!
              </div>
            </div>
          </div>

          {/* DIAGNÓZA */}
          <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h3 className="text-lg text-blue-400 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              CO SE DĚJE?
            </h3>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✅</span>
                <span><strong className="text-white">Reklamy fungují:</strong> CPC 5 Kč je skvělé, 178 kliků = messaging rezonuje</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✅</span>
                <span><strong className="text-white">FB našel winner:</strong> "Ztráta" má 73% kliků → storytelling + konkrétní čísla = GOLD</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">⚠️</span>
                <span><strong className="text-white">0 konverzí je normální:</strong> Průměrný čas na rozhodnutí = 7-14 dní. Ale můžeme zlepšit...</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">💡</span>
                <span><strong className="text-white">Problém #1:</strong> Reklama "Ztráta" je špatně čitelná → ztrácíme část potenciálních zákazníků</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">💡</span>
                <span><strong className="text-white">Problém #2:</strong> Zbylé 2 reklamy jsou slabé (22, 25 kliků) → vyměnit za silnější</span>
              </p>
            </div>
          </div>
        </Card>

        {/* AKČNÍ PLÁN */}
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 p-8">
          <h2 className="text-2xl text-green-400 mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            AKČNÍ PLÁN (TERAZ!)
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <h3 className="text-lg text-white mb-2">Vylepšit reklamu "Ztráta" (IHNED)</h3>
                <p className="text-gray-300 mb-2">Lepší čitelnost = více kliků = více konverzí</p>
                <div className="text-sm text-green-400">→ Viz "VYLEPŠENÁ VERZE" níže</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <h3 className="text-lg text-white mb-2">Vyměnit slabé reklamy (ZA 2-3 DNY)</h3>
                <p className="text-gray-300 mb-2">22 a 25 kliků = underperformers → nahradit silnějšími angles</p>
                <div className="text-sm text-green-400">→ Viz "2 NOVÉ REKLAMY" níže</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <h3 className="text-lg text-white mb-2">Počkat 7 dní (DŮLEŽITÉ!)</h3>
                <p className="text-gray-300 mb-2">Průměrná doba rozhodnutí = 7-14 dní. Dej FB čas optimalizovat.</p>
                <div className="text-sm text-blue-400">→ První prodeje obvykle přicházejí den 7-10</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
              <div>
                <h3 className="text-lg text-white mb-2">Organický content (PARALELNĚ)</h3>
                <p className="text-gray-300 mb-2">1 post denně = podpora pro reklamy + důvěryhodnost</p>
                <div className="text-sm text-purple-400">→ Už máš připravený Post #1! Pokračuj stejně.</div>
              </div>
            </div>
          </div>
        </Card>

        {/* VYLEPŠENÁ REKLAMA "ZTRÁTA" */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl text-white mb-2">🔥 VYLEPŠENÁ REKLAMA "ZTRÁTA"</h2>
            <p className="text-gray-400">Lepší čitelnost → více konverzí</p>
          </div>

          {currentAds.map(ad => (
            <Card key={ad.id} className="bg-slate-900/50 border-slate-800 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-b border-green-500/20 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl text-white mb-1">{ad.name}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-green-400">{ad.version}</span>
                      {ad.performance && (
                        <span className="text-gray-400">
                          {ad.performance.clicks} kliků • {ad.performance.cpc} Kč CPC • {ad.performance.ctr}% CTR
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    WINNER 73%
                  </div>
                </div>
              </div>

              {/* Changes */}
              {ad.changes && (
                <div className="px-6 py-4 bg-blue-500/5 border-b border-slate-800">
                  <h4 className="text-sm text-blue-400 mb-3 uppercase tracking-wider">Co se změnilo:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {ad.changes.map((change, idx) => (
                      <p key={idx} className="text-sm text-gray-300">{change}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Reasoning */}
              {ad.reasoning && (
                <div className="px-6 py-4 bg-yellow-500/5 border-b border-slate-800">
                  <p className="text-sm text-yellow-400 flex items-start gap-2">
                    <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{ad.reasoning}</span>
                  </p>
                </div>
              )}

              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* VISUAL */}
                  <div>
                    <h4 className="text-sm text-gray-400 mb-4 uppercase tracking-wider">Vizuál (1080x1080)</h4>
                    <div 
                      className="aspect-square rounded-lg p-8 flex flex-col justify-center items-center text-center relative overflow-hidden"
                      style={{ background: ad.visual.background }}
                    >
                      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs text-white/80">Sponzorováno</span>
                      </div>
                      
                      <h2 className={`text-4xl md:text-5xl mb-4 ${ad.visual.headlineColor || 'text-white'}`}>
                        {ad.visual.headline}
                      </h2>
                      {ad.visual.subheadline && (
                        <p className={`text-2xl md:text-3xl mb-8 ${ad.visual.subheadlineColor || 'text-white/90'}`}>
                          {ad.visual.subheadline}
                        </p>
                      )}
                      {ad.visual.content && (
                        <div className={`space-y-2 text-left w-full max-w-md ${ad.visual.textColor || 'text-white'}`}>
                          {ad.visual.content.map((line, idx) => (
                            <p key={idx} className="text-base md:text-lg">
                              {line}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* COPY */}
                  <div>
                    <h4 className="text-sm text-gray-400 mb-4 uppercase tracking-wider">Copy (FB post text)</h4>
                    <div className="bg-slate-950/50 rounded-lg p-6 space-y-6">
                      <div>
                        <p className="text-sm text-blue-400 mb-2">PRIMARY TEXT:</p>
                        <p className="text-gray-300 whitespace-pre-line text-sm leading-relaxed">
                          {ad.copy.primary}
                        </p>
                      </div>
                      
                      <div className="border-t border-slate-800 pt-4 space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">HEADLINE:</p>
                          <p className="text-white">{ad.copy.headline}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">DESCRIPTION:</p>
                          <p className="text-gray-400 text-sm">{ad.copy.description}</p>
                        </div>
                        <div>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            {ad.copy.cta}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* NOVÉ REKLAMY */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl text-white mb-2">⚡ 2 NOVÉ SILNÉ REKLAMY</h2>
            <p className="text-gray-400">Náhrada za underperformery</p>
          </div>

          {newAds.map(ad => (
            <Card key={ad.id} className="bg-slate-900/50 border-slate-800 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b border-blue-500/20 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl text-white mb-1">{ad.name}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-blue-400">{ad.version}</span>
                    </div>
                  </div>
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    NOVÁ
                  </div>
                </div>
              </div>

              {/* Reasoning */}
              {ad.reasoning && (
                <div className="px-6 py-4 bg-purple-500/5 border-b border-slate-800">
                  <p className="text-sm text-purple-400 flex items-start gap-2">
                    <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span><strong>STRATEGIE:</strong> {ad.reasoning}</span>
                  </p>
                </div>
              )}

              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* VISUAL */}
                  <div>
                    <h4 className="text-sm text-gray-400 mb-4 uppercase tracking-wider">Vizuál (1080x1080)</h4>
                    <div 
                      className="aspect-square rounded-lg p-8 flex flex-col justify-center items-center text-center relative overflow-hidden"
                      style={{ background: ad.visual.background }}
                    >
                      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs text-white/80">Sponzorováno</span>
                      </div>
                      
                      <h2 className={`text-4xl md:text-5xl mb-4 ${ad.visual.headlineColor || 'text-white'}`}>
                        {ad.visual.headline}
                      </h2>
                      {ad.visual.subheadline && (
                        <p className={`text-2xl md:text-3xl mb-8 ${ad.visual.subheadlineColor || 'text-white/90'}`}>
                          {ad.visual.subheadline}
                        </p>
                      )}
                      {ad.visual.content && (
                        <div className={`space-y-2 text-left w-full max-w-md ${ad.visual.textColor || 'text-white'}`}>
                          {ad.visual.content.map((line, idx) => (
                            <p key={idx} className="text-base md:text-lg">
                              {line}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* COPY */}
                  <div>
                    <h4 className="text-sm text-gray-400 mb-4 uppercase tracking-wider">Copy (FB post text)</h4>
                    <div className="bg-slate-950/50 rounded-lg p-6 space-y-6">
                      <div>
                        <p className="text-sm text-blue-400 mb-2">PRIMARY TEXT:</p>
                        <p className="text-gray-300 whitespace-pre-line text-sm leading-relaxed">
                          {ad.copy.primary}
                        </p>
                      </div>
                      
                      <div className="border-t border-slate-800 pt-4 space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">HEADLINE:</p>
                          <p className="text-white">{ad.copy.headline}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">DESCRIPTION:</p>
                          <p className="text-gray-400 text-sm">{ad.copy.description}</p>
                        </div>
                        <div>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            {ad.copy.cta}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* TIMING & NEXT STEPS */}
        <Card className="bg-slate-900/50 border-slate-800 p-8">
          <h2 className="text-2xl text-white mb-6">⏰ TIMELINE & NEXT STEPS</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-500 text-white rounded-lg px-3 py-1 text-sm font-medium flex-shrink-0">
                IHNED
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-white mb-2">1. Upravit reklamu "Ztráta"</h3>
                <p className="text-gray-400 mb-3">Vyměnit vizuál za vylepšenou verzi (lepší čitelnost)</p>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-sm text-blue-400 mb-2">📋 JAK NA TO:</p>
                  <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                    <li>FB Ads Manager → najdi kampaň</li>
                    <li>Duplikuj reklamu "Ztráta"</li>
                    <li>Nahraď vizuál novou verzí (viz výše)</li>
                    <li>Vypni starou verzi</li>
                    <li>Zapni novou verzi</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-500 text-white rounded-lg px-3 py-1 text-sm font-medium flex-shrink-0">
                DEN 7-8
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-white mb-2">2. Vyměnit slabé reklamy</h3>
                <p className="text-gray-400 mb-3">Přidat 2 nové reklamy místo těch se 22 a 25 kliky</p>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-sm text-blue-400 mb-2">💡 PROČ POČKAT?</p>
                  <p className="text-sm text-gray-300">FB potřebuje 3-5 dní na optimalizaci. Pokud za týden stále 22/25 kliků = jasné underperformery → vyměnit.</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-500 text-white rounded-lg px-3 py-1 text-sm font-medium flex-shrink-0">
                DEN 7-14
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-white mb-2">3. První konverze</h3>
                <p className="text-gray-400 mb-3">Očekávaný první prodej mezi 7.-14. dnem</p>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-sm text-yellow-400 mb-2">⚠️ DŮLEŽITÉ:</p>
                  <p className="text-sm text-gray-300">Je normální, že první týden není prodej! FB se učí algoritmus. Většina konverzí přichází den 7-14. NEZDVOJUJ BUDGET! Jen počkej a sleduj metriky.</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-orange-500 text-white rounded-lg px-3 py-1 text-sm font-medium flex-shrink-0">
                DEN 14+
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-white mb-2">4. Scaling</h3>
                <p className="text-gray-400 mb-3">Po první konverzi → scale winner o 20-30%</p>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-sm text-green-400 mb-2">✅ SCALING PRAVIDLO:</p>
                  <p className="text-sm text-gray-300">Pokud reklama má ROI 2:1 nebo lepší → zvyš budget o 20-30% každé 3 dny. Nikdy víc! FB nenávidí velké změny.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* PROČ 0 KONVERZÍ? */}
        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20 p-8">
          <h2 className="text-2xl text-yellow-400 mb-6">🤔 PROČ ZATÍM 0 KONVERZÍ?</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">✓</div>
              <div>
                <h3 className="text-lg text-white mb-1">1. Je to normální (prvních 7 dní)</h3>
                <p className="text-gray-300">FB algoritmus se učí kdo má zájem. Konverze obvykle přicházejí den 7-14.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">✓</div>
              <div>
                <h3 className="text-lg text-white mb-1">2. Průměrná doba rozhodnutí = 7 dní</h3>
                <p className="text-gray-300">Lidé vidí reklamu → rozmýšlí → vrací se → kupují. Proces trvá.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">!</div>
              <div>
                <h3 className="text-lg text-white mb-1">3. Možné zlepšení: Landing page</h3>
                <p className="text-gray-300 mb-2">178 kliků ale 0 prodejů může znamenat problém v landing page. Zkontroluj:</p>
                <ul className="text-sm text-gray-400 space-y-1 ml-4 list-disc list-inside">
                  <li>Je CTA jasné? ("Koupit teď" vs "Zjistit více")</li>
                  <li>Funguje timer? (scarcity element)</li>
                  <li>Je cena viditelná hned? (transparentnost)</li>
                  <li>Jsou testimonials? (social proof)</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">!</div>
              <div>
                <h3 className="text-lg text-white mb-1">4. Možné zlepšení: Offer</h3>
                <p className="text-gray-300 mb-2">Je sleva 40% dostatečně atraktivní? Zvažte:</p>
                <ul className="text-sm text-gray-400 space-y-1 ml-4 list-disc list-inside">
                  <li>Přidat bonus (mini kurz ZDARMA)</li>
                  <li>Zesílit urgency (zbývá jen X míst)</li>
                  <li>Testimonial hned v hero sekci</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* FINAL RECOMMENDATION */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8">
          <h2 className="text-2xl mb-4">🎯 FINÁLNÍ DOPORUČENÍ</h2>
          <div className="space-y-3 text-lg">
            <p className="flex items-center gap-2">
              <span className="text-2xl">1️⃣</span>
              <span><strong>IHNED:</strong> Vyměň vizuál reklamy "Ztráta" (lepší čitelnost)</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-2xl">2️⃣</span>
              <span><strong>DEN 7:</strong> Vyměň 2 slabé reklamy za nové (pokud stále slabé)</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-2xl">3️⃣</span>
              <span><strong>DENNĚ:</strong> 1 organický post (už děláš! pokračuj!)</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-2xl">4️⃣</span>
              <span><strong>POČKEJ:</strong> První konverze den 7-14 je normální. Nepanikař!</span>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-xl">
              <strong>CPC 5 Kč je VÝBORNÝ!</strong> Reklamy fungují. Jen počkej na konverze. 🚀
            </p>
          </div>
        </Card>

        {/* EXPORT GUIDE */}
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <h3 className="text-lg text-white mb-4">📥 JAK EXPORTOVAT NOVÉ VIZUÁLY?</h3>
          <ol className="space-y-2 text-gray-300 list-decimal list-inside">
            <li>Scroll nahoru k reklamám</li>
            <li>Použij browser screenshot tool (celá reklama = 1080x1080)</li>
            <li>Nebo použij Figma/Canva s copyem z výše</li>
            <li>Upload do FB Ads Manager</li>
            <li>Done! ✅</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}

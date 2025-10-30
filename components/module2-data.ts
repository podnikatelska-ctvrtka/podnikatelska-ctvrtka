// Modul 2 - Vylepšení byznys modelu
export const MODULE_2 = {
  id: 2,
  title: "Vylepšení byznys modelu",
  description: "Zkontrolujte a optimalizujte váš byznys model",
  lessons: [
    {
      id: 10,
      title: "Pravidla dobrého modelu",
      canvasSection: undefined, // Module 2 nemá canvas sections
      videoUrl: "",
      description: "Zkontrolujte váš byznys model proti osvědčeným pravidlům",
      content: `
        <h3>✅ Co dělá dobrý byznys model?</h3>
        <p>Každý úspěšný byznys model má společné charakteristiky. Pojďme si zkontrolovat váš model!</p>
        <h4>✅ Checklist:</h4>
        <ul>
          <li><strong>Barvy:</strong> Má každý produkt/služba svou vlastní barvu?</li>
          <li><strong>Konkrétnost:</strong> Jsou zákaznické segmenty dost konkrétní?</li>
          <li><strong>Hodnota:</strong> Je jasné proč si vás zákazník vybere?</li>
          <li><strong>Souvislost:</strong> Propojují se barevné položky napříč sekcemi?</li>
          <li><strong>Reálnost:</strong> Jsou náklady realistické?</li>
        </ul>
      `,
      tips: [
        "Každá barva = jeden produkt/služba (napříč celým Canvas)",
        "🌐 Globální barva = pro celý byznys (nájem, energie...)",
        "Kontrolujte že vše dává smysl dohromady"
      ]
    },
    {
      id: 11,
      title: "Finanční analýza",
      canvasSection: undefined,
      videoUrl: "",
      description: "Vychází vám to finančně?",
      content: `
        <h3>💰 Finanční analýza vašeho modelu</h3>
        <p>Teď když máte hotový Canvas, pojďme se podívat <strong>jestli vám to vychází finančně</strong>.</p>
        
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 rounded-xl p-4 my-4">
          <p class="text-blue-900 flex items-start gap-2">
            <span class="text-2xl">💡</span>
            <span><strong>TOGGLE: Vyberte svůj přístup</strong></span>
          </p>
          <p class="text-sm text-gray-700 mt-3">🚀 <strong>Začínám</strong> = 3 SCÉNÁŘE (pesimistický, realistický, optimistický)</p>
          <p class="text-sm text-gray-700 mt-2">💰 <strong>Už podnikám</strong> = REÁLNÁ DATA z posledního měsíce</p>
        </div>
        
        <h4>🚀 PRO ZAČÍNAJÍCÍ: 3 SCÉNÁŘE</h4>
        <p>Když začínáte, <strong>NIKDY nevíte kolik zákazníků opravdu získáte!</strong> Proto je důležité připravit se na 3 možné varianty:</p>
        
        <div class="bg-red-50 border-2 border-red-300 rounded-xl p-4 my-4">
          <p class="text-red-900"><strong>😰 PESIMISTICKÝ SCÉNÁŘ</strong> (25% plánu)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Co když získáte jen <strong>čtvrtinu zákazníků</strong> než jste plánovali?</li>
            <li>Budete v <strong>ZTRÁTĚ?</strong> O kolik?</li>
            <li>Jak dlouho to vydržíte? Máte rezervy?</li>
          </ul>
        </div>
        
        <div class="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 my-4">
          <p class="text-yellow-900"><strong>🎯 REALISTICKÝ SCÉNÁŘ</strong> (50% plánu)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Získáte <strong>polovinu</strong> plánovaných zákazníků</li>
            <li>Jste v <strong>ZISKU nebo ZTRÁTĚ?</strong></li>
            <li>Kolik vám to vydělává měsíčně?</li>
          </ul>
        </div>
        
        <div class="bg-green-50 border-2 border-green-300 rounded-xl p-4 my-4">
          <p class="text-green-900"><strong>🚀 OPTIMISTICKÝ SCÉNÁŘ</strong> (100% plánu)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Získáte <strong>všechny plánované zákazníky</strong></li>
            <li>Kolik vám to <strong>VYDĚLÁVÁ?</strong></li>
            <li>Je to dost aby to stálo za to?</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>PROČ 3 SCÉNÁŘE?</strong></p>
        <p class="text-sm text-gray-600">Realita je <strong>VŽDY MEZI</strong> optimistickým a pesimistickým scénářem. Když budete připravení na nejhorší, příjemně vás překvapí když to dopadne lépe!</p>
        
        <h4>💰 PRO TY CO UŽ PODNIKAJÍ: REÁLNÁ DATA</h4>
        <p>Když už podnikáte, máte <strong>REÁLNÁ ČÍSLA</strong> z posledního měsíce:</p>
        
        <p class="mt-3"><strong>KROK 1: Celková bilance</strong></p>
        <ul class="text-sm text-gray-600 ml-4 mt-1">
          <li>💰 <strong>Celkové příjmy</strong> - kolik jste vydělali za měsíc?</li>
          <li>💸 <strong>Celkové náklady</strong> - kolik jste utratili za měsíc?</li>
          <li>📊 <strong>ZISK/ZTRÁTA</strong> = příjmy - náklady</li>
        </ul>
        
        <p class="mt-3"><strong>KROK 2: Breakdown po segmentech</strong></p>
        <p class="text-sm text-gray-600 ml-4">Který segment vám <strong>VYDĚLÁVÁ nejvíc?</strong></p>
        <ul class="text-sm text-gray-600 ml-4 mt-1">
          <li>🔵 <strong>Segment A:</strong> 45k příjmy - 20k náklady = <strong>25k zisk</strong></li>
          <li>🟢 <strong>Segment B:</strong> 30k příjmy - 25k náklady = <strong>5k zisk</strong></li>
        </ul>
        
        <p class="mt-3"><strong>KROK 3: Akční kroky</strong></p>
        <ul class="text-sm text-gray-600 ml-4 mt-1">
          <li>📈 <strong>Co škálovat?</strong> Který segment má nejvyšší ziskovost?</li>
          <li>💸 <strong>Kde ušetřit?</strong> Které náklady jsou zbytečně vysoké?</li>
          <li>❌ <strong>Co ukončit?</strong> Který segment je ve ztrátě?</li>
        </ul>
        
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 rounded-xl p-4 my-4">
          <p class="text-purple-900 flex items-start gap-2">
            <span class="text-2xl">🎯</span>
            <span><strong>CÍL</strong></span>
          </p>
          <p class="text-sm text-gray-700 mt-3"><strong>Začínám:</strong> Připravte se na všechny 3 scénáře. Mějte rezervy pro pesimistický případ!</p>
          <p class="text-sm text-gray-700 mt-2"><strong>Už podnikám:</strong> Analyzujte reálná data a zaměřte se na ziskové segmenty!</p>
        </div>
      `,
      tips: [
        "🚀 Začínající: Nikdy nevíte kolik zákazníků získáte - připravte se na 3 scénáře!",
        "💰 Už podnikám: Použijte reálná čísla z posledního měsíce",
        "📊 Zisk = Příjmy - Náklady (jednoduché!)",
        "🎯 Zaměřte se na ziskové segmenty a škálujte je"
      ]
    },
    {
      id: 12,
      title: "Řešení situací",
      canvasSection: undefined,
      videoUrl: "",
      description: "Jak řešit typické problémy pomocí Canvas",
      content: "",
      tips: [
        "Každý problém má řešení v Canvas - stačí vědět kde hledat",
        "Začněte se snadnými řešeními s vysokým dopadem",
        "Můžete použít více řešení najednou - kombinujte je!"
      ]
    },
    {
      id: 13,
      title: "Příklady úspěšných modelů",
      canvasSection: undefined,
      videoUrl: "",
      description: "Jak může vypadat Business Model v různých odvětvích",
      content: "",
    }
  ]
};

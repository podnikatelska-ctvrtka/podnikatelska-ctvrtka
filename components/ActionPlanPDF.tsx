import React from 'react';

interface ActionPlanPDFProps {
  category: 'critical' | 'unstable' | 'solid' | 'advanced' | 'beginner';
  score: number;
  name?: string;
}

export function ActionPlanPDF({ category, score, name }: ActionPlanPDFProps) {
  const userName = name || 'podnikateli';
  
  // Render based on category
  if (category === 'critical') {
    return <CriticalPlan userName={userName} score={score} />;
  } else if (category === 'unstable') {
    return <UnstablePlan userName={userName} score={score} />;
  } else if (category === 'solid') {
    return <SolidPlan userName={userName} score={score} />;
  } else if (category === 'advanced') {
    return <AdvancedPlan userName={userName} score={score} />;
  } else {
    return <BeginnerPlan userName={userName} score={score} />;
  }
}

// ═══════════════════════════════════════════════════════════
// SOFT SELL BOX - použito ve všech plánech
// ═══════════════════════════════════════════════════════════

function SellBox() {
  const handleClick = () => {
    window.open('https://podnikatelskactvrtka.cz/objednavka', '_blank');
  };

  return (
    <div className="mt-8 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-6 print:hidden">
      <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
        <span className="text-2xl">💡</span> 
        Potřebuješ pomoc s implementací?
      </h3>
      
      <p className="text-gray-700 mb-4 leading-relaxed">
        Tento plán ti ukázal <strong>co dělat</strong>. Ale možná si říkáš: "OK, ale <strong>JAK PŘESNĚ</strong> to mám udělat?"
      </p>
      
      <div className="bg-white rounded-lg p-4 mb-4 border border-blue-200">
        <p className="text-sm text-gray-600 mb-2">
          📧 <strong>Za 24 hodin ti pošleme email</strong> s dotazem jak ti jde akční plán a kde bychom ti mohli pomoci.
        </p>
        <p className="text-sm text-gray-700 mt-2">
          Když budeš chtít udělat svůj Model podnikání pomocí videa, příkladů a šablon — dáme ti vědět.
        </p>
      </div>
      
      <button 
        onClick={handleClick}
        className="w-full bg-blue-900 text-white rounded-lg p-4 text-center hover:bg-blue-800 transition-colors cursor-pointer"
      >
        <p className="text-sm mb-2">🎯 Chceš začít HNED?</p>
        <p className="font-bold text-lg mb-2">
          Podnikatelská Čtvrtka - Model podnikání za 90 minut
        </p>
        <p className="text-sm text-blue-200">
          Klikni pro více info →
        </p>
      </button>
      
      <p className="text-xs text-gray-500 mt-4 text-center italic">
        💪 Máš hotový plán. Teď ho jen naplnit životem. Jdeme do toho!
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// KRITICKÝ STAV (0-30%)
// ═══════════════════════════════════════════════════════════

function CriticalPlan({ userName, score }: { userName: string; score: number }) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-red-600">
        <h1 className="text-3xl font-bold text-red-600 mb-2">🚨 KRITICKÝ STAV - AKČNÍ PLÁN</h1>
        <p className="text-lg text-gray-600">Tvoje skóre: {score}%</p>
        <p className="text-sm text-gray-500 mt-2">Pro: {userName}</p>
      </div>

      {/* Urgentní zpráva */}
      <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
        <p className="text-red-800 font-semibold">
          ⚠️ Tvůj byznys je v kritickém stavu. Máš max. 30-60 dní na opravu, jinak riskuješ kolaps.
        </p>
      </div>

      {/* Tvá největší rizika */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-2xl">⚠️</span> TVÁ NEJVĚTŠÍ RIZIKA
        </h2>
        <div className="bg-gray-50 p-4 rounded space-y-2">
          <div className="flex gap-3">
            <span className="text-red-600">❌</span>
            <p>Chybí ti dlouhodobá strategie růstu</p>
          </div>
          <div className="flex gap-3">
            <span className="text-red-600">❌</span>
            <p>Řešíš jen to co hoří teď, místo prevence</p>
          </div>
          <div className="flex gap-3">
            <span className="text-red-600">❌</span>
            <p>Nemáš jasný plán co dělat příštích 6 měsíců</p>
          </div>
          <div className="flex gap-3">
            <span className="text-red-600">❌</span>
            <p>Nevíš kde přesně tratíš peníze v byznysu</p>
          </div>
        </div>
      </div>

      {/* 30denní plán */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">📋 30DENNÍ ZÁCHRANNÝ PLÁN</h2>
        
        {/* TÝDEN 1 */}
        <div className="mb-5">
          <h3 className="font-bold text-red-600 mb-3 text-lg">🔥 TÝDEN 1: STOP & ANALÝZA (nejdůležitější!)</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 1-2: Přestaň "hasit požáry" a udělej si pořádek</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Vezmi si notepad, sedni si s kávou a napiš si VŠECHNO co děláš v byznysu<br/>
                  → Urči co je URGENTNÍ (dělej hned) vs. DŮLEŽITÉ (plánuj)<br/>
                  → Zruš všechno co není ani urgentní ani důležité
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 3-4: Udělej si Model podnikání</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Stáhni si šablonu (Google: "business model canvas šablona")<br/>
                  → Vyplň všech 9 políček - uvidíš OKAMŽITĚ kde máš díry<br/>
                  → Červeně označ kde máš největší problém<br/>
                  💡 TIP: Podnikatelská Čtvrtka ti ukáže jak na to krok za krokem za 90 minut
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 5-7: Najdi si druhý zdroj příjmů okamžitě</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Napiš seznam 5 způsobů jak získat peníze do 14 dní<br/>
                  → Může to být: drobná zakázka, prodej něčeho co nepotřebuješ, půjčka od rodiny<br/>
                  → Cíl: Mít alespoň 1 měsíc nákladů jako polštář
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* TÝDEN 2 */}
        <div className="mb-5">
          <h3 className="font-bold text-orange-600 mb-3 text-lg">📊 TÝDEN 2: ČÍSLA & REALITY CHECK</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 8-10: Spočítej si přesně: cena získání zákazníka, marže, bod zvratu</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Cena získání zákazníka = Kolik tě stojí získat 1 zákazníka?<br/>
                  → Marže = Kolik ti zbyde po odečtení nákladů?<br/>
                  → Bod zvratu = Kolik musíš vydělat aby ses dostal na nulu?<br/>
                  💡 Pokud nevíš - začni DNES sledovat každou korunu
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 11-12: Analýza závislostí</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Napiš seznam VŠECH klientů/projektů<br/>
                  → Spočítej kolik % tržeb dělá každý<br/>
                  → Pokud 1-2 klienti dělají víc než 50% → ČERVENÝ ALARM<br/>
                  → Akce: Najdi 5-10 menších klientů jako pojistku
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 13-14: Začni si odkládat rezervu (i malou!)</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Otevři NOVÝ spořicí účet (oddělený od běžného)<br/>
                  → Zkus odkládat aspoň 5-10% z KAŽDÉ platby (i když je to málo)<br/>
                  → Cíl: Postupně si vytvořit polštář na nečekané výdaje
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* TÝDEN 3 */}
        <div className="mb-5">
          <h3 className="font-bold text-yellow-600 mb-3 text-lg">🔧 TÝDEN 3: PRVNÍ SYSTEMATIZACE</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 15-17: Zapiš si JEDEN proces</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Vyber proces který děláš nejčastěji (např. zapracování nového klienta)<br/>
                  → Napiš krok za krokem co děláš (v Google Docs nebo Notion)<br/>
                  → Teď to můžeš předat někomu jinému nebo automatizovat
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 18-20: Kontaktuj TOP 10 klientů</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Pošli email: "Jak se ti líbí naše spolupráce? Co bychom mohli zlepšit?"<br/>
                  → Zjistíš proč se nevrací nebo co chybí<br/>
                  → Možná získáš nové projekty
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 21: Týdenní přehled čísel (nastav si rutinu)</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Každý pátek 16:00 - 30 minut na čísla<br/>
                  → Sleduj: příjmy, výdaje, nové leady, konverze<br/>
                  → Tabulka v Google Sheets - nic složitého
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* TÝDEN 4 */}
        <div className="mb-5">
          <h3 className="font-bold text-green-600 mb-3 text-lg">🚀 TÝDEN 4: NOVÉ PŘÍLEŽITOSTI</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 22-24: Najdi nový kanál na získávání klientů</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Pokud děláš jen Facebook, zkus LinkedIn nebo partnerství<br/>
                  → Pokud jen doporučení, zkus reklamy<br/>
                  → Investuj 20% marketingového rozpočtu do testování
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 25-27: Revize nabídky a cen</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Kolik účtuješ vs. konkurence?<br/>
                  → Můžeš zvýšit ceny o 20-30% pro nové klienty?<br/>
                  → Vytvoř balíčky (základní, standard, premium)
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 28-30: Plán na další měsíc</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Co fungovalo? Co ne?<br/>
                  → Co udělat příští měsíc?<br/>
                  → Nastav si 3 klíčové ukazatele které budeš sledovat (např. tržby, nové klienty, zisk)
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Sell Box */}
      <SellBox />

      {/* Footer */}
      <div className="mt-6 pt-4 border-t text-center text-sm text-gray-500">
        <p>Tento akční plán je součástí kvízu "Jak zdravý je tvůj model podnikání?"</p>
        <p className="mt-1">Vytisknout a zatrhávat můžeš podle postupu ✓</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// NESTABILNÍ (31-55%)
// ═══════════════════════════════════════════════════════════

function UnstablePlan({ userName, score }: { userName: string; score: number }) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-yellow-600">
        <h1 className="text-3xl font-bold text-yellow-600 mb-2">🟡 NESTABILNÍ - AKČNÍ PLÁN</h1>
        <p className="text-lg text-gray-600">Tvoje skóre: {score}%</p>
        <p className="text-sm text-gray-500 mt-2">Pro: {userName}</p>
      </div>

      {/* Zpráva */}
      <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-6">
        <p className="text-yellow-800 font-semibold">
          ⚠️ Byznys funguje, ale visíš na vlásku. Pár konkrétních kroků a budeš stabilnější.
        </p>
      </div>

      {/* Tvá největší rizika */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-2xl">⚠️</span> TVÁ NEJVĚTŠÍ RIZIKA
        </h2>
        <div className="bg-gray-50 p-4 rounded space-y-2">
          <div className="flex gap-3">
            <span className="text-yellow-600">⚠️</span>
            <p>Nemáš plán B když něco selže</p>
          </div>
          <div className="flex gap-3">
            <span className="text-yellow-600">⚠️</span>
            <p>Spoléháš se víc na štěstí než na systém</p>
          </div>
          <div className="flex gap-3">
            <span className="text-yellow-600">⚠️</span>
            <p>Marketing je chaotický, ne systematický</p>
          </div>
          <div className="flex gap-3">
            <span className="text-yellow-600">⚠️</span>
            <p>Nemáš jasno kam chceš růst</p>
          </div>
        </div>
      </div>

      {/* 30denní plán */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">📋 30DENNÍ STABILIZAČNÍ PLÁN</h2>
        
        {/* TÝDEN 1 */}
        <div className="mb-5">
          <h3 className="font-bold text-yellow-600 mb-3 text-lg">🎯 TÝDEN 1: DIVERZIFIKACE PŘÍJMŮ</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 1-2: Analýza TOP 10 klientů</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Udělej seznam všech klientů<br/>
                  → Spočítej kolik % tržeb dělá každý<br/>
                  → Pokud 3 klienti dělají víc než 50% → najdi co nejdřív 5-10 menších klientů jako pojistku
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 3-5: Najdi nový kanál na získávání klientů</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Pokud máš jen doporučení, zkus LinkedIn nebo reklamy<br/>
                  → Pokud jen Facebook/Instagram, zkus Google reklamy nebo partnerství<br/>
                  → Investuj 20% marketingového rozpočtu do testování nového kanálu<br/>
                  💡 Cíl: Do 30 dní alespoň 1 nový klient z nového kanálu
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 6-7: Začni si odkládat rezervu (i malou!)</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Otevři spořicí účet ODDĚLENÝ od běžného<br/>
                  → Zkus odkládat aspoň 5-10% z každé platby (i když je to málo)<br/>
                  → Cíl: Postupně si vytvořit polštář na nečekané výdaje
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* TÝDEN 2 */}
        <div className="mb-5">
          <h3 className="font-bold text-orange-600 mb-3 text-lg">📊 TÝDEN 2: ČÍSLA & METRIKY</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 8-10: Spočítej si cenu získání zákazníka</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Kolik utratíš za získání 1 zákazníka? (reklamy, čas, náklady)<br/>
                  → Kolik ti průměrně utratí?<br/>
                  → Pokud nevíš → začni sledovat TEĎ (Excel stačí)<br/>
                  💡 Cíl: Zákazník by měl utratit alespoň 3x víc než tě stálo ho získat
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 11-12: Nastav si dashboard se 4 čísly</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Každý týden sleduj: cena získání zákazníka, průměrná platba, marže, % vracejících se klientů<br/>
                  → Tabulka v Google Sheets - 10 minut týdně<br/>
                  → Zjistíš trendy a uvidíš problémy DŘÍV než nastanou
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 13-14: Kontaktuj TOP 20 klientů - feedback</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Email: "Jak se ti líbí naše služby? Co bychom mohli zlepšit?"<br/>
                  → Zjistíš proč se nevrací<br/>
                  → Možná získáš nové projekty nebo doporučení
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* TÝDEN 3 */}
        <div className="mb-5">
          <h3 className="font-bold text-blue-600 mb-3 text-lg">🔧 TÝDEN 3: SYSTEMATIZACE & DELEGOVÁNÍ</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 15-17: Vytvoř tabulku všech procesů</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Co děláš častěji než 1x týdně? (zapracování klienta, fakturace, marketing...)<br/>
                  → Vyber 1 proces a napiš postup krok za krokem<br/>
                  → Teď to můžeš delegovat nebo automatizovat
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 18-20: Najdi 1 úkol který můžeš delegovat</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Co děláš co může dělat někdo jiný za míň peněz?<br/>
                  → Účetnictví, grafika, administriva?<br/>
                  → Najdi si freelancera nebo brigádníka (Freelo.cz, LinkedIn, nebo doporučení)<br/>
                  💡 Cíl: Uvolnit 5-10 hodin měsíčně na strategii
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 21: Nastav si šablony a automatizace</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Emailové šablony pro nejčastější komunikaci<br/>
                  → Automatické faktury (Fakturoid, Firmo)<br/>
                  → Social media scheduling (Buffer, Metricool)
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* TÝDEN 4 */}
        <div className="mb-5">
          <h3 className="font-bold text-green-600 mb-3 text-lg">🚀 TÝDEN 4: RŮST & OPTIMALIZACE</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 22-24: Revize cen a nabídky</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Můžeš zvýšit ceny o 20-30% pro nové klienty?<br/>
                  → Vytvoř balíčky (základní, standard, premium)<br/>
                  → Přidej upsell nebo cross-sell možnosti
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 25-27: Udělej si Model podnikání</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Stáhni si šablonu (Google: "business model canvas šablona")<br/>
                  → Vyplň všech 9 políček<br/>
                  → Uvidíš kde jsou mezery a příležitosti<br/>
                  💡 Podnikatelská Čtvrtka ti to projde krok za krokem za 90 minut
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 28-30: Plán na další měsíc</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Co fungovalo? Co ne?<br/>
                  → 3 priority na příští měsíc<br/>
                  → Nastav si týdenní rutinu sledování čísel
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Sell Box */}
      <SellBox />

      {/* Footer */}
      <div className="mt-6 pt-4 border-t text-center text-sm text-gray-500">
        <p>Tento akční plán je součástí kvízu "Jak zdravý je tvůj model podnikání?"</p>
        <p className="mt-1">Vytisknout a zatrhávat můžeš podle postupu ✓</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SOLIDNÍ (56-75%)
// ═══════════════════════════════════════════════════════════

function SolidPlan({ userName, score }: { userName: string; score: number }) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-green-600">
        <h1 className="text-3xl font-bold text-green-600 mb-2">✅ SOLIDNÍ ZÁKLAD - AKČNÍ PLÁN</h1>
        <p className="text-lg text-gray-600">Tvoje skóre: {score}%</p>
        <p className="text-sm text-gray-500 mt-2">Pro: {userName}</p>
      </div>

      {/* Zpráva */}
      <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6">
        <p className="text-green-800 font-semibold">
          ✅ Funguje to, ale necháváš peníze na stole. Pár úprav a budeš na úplně jiné úrovni.
        </p>
      </div>

      {/* Tvá největší rizika */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-2xl">⚠️</span> CO TĚ DRŽÍ ZPÁTKY
        </h2>
        <div className="bg-gray-50 p-4 rounded space-y-2">
          <div className="flex gap-3">
            <span className="text-orange-600">⚠️</span>
            <p>Funguje to, ale hodně tě to stojí čas a energii</p>
          </div>
          <div className="flex gap-3">
            <span className="text-orange-600">⚠️</span>
            <p>Necháváš peníze na stole - nevyužitý potenciál</p>
          </div>
          <div className="flex gap-3">
            <span className="text-orange-600">⚠️</span>
            <p>Chybí ti struktura pro efektivní škálování</p>
          </div>
          <div className="flex gap-3">
            <span className="text-orange-600">⚠️</span>
            <p>Marketing by mohl být mnohem efektivnější</p>
          </div>
        </div>
      </div>

      {/* 30denní plán */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">📋 30DENNÍ PLÁN NA DALŠÍ LEVEL</h2>
        
        {/* TÝDEN 1 */}
        <div className="mb-5">
          <h3 className="font-bold text-green-600 mb-3 text-lg">🎯 TÝDEN 1: NOVÉ KANÁLY</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 1-3: Identifikuj 2-3 nové kanály pro získávání zákazníků</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Pokud děláš jen Facebook/Instagram, zkus LinkedIn nebo Google reklamy<br/>
                  → Pokud jen doporučení, zkus partnerství nebo afiliační program<br/>
                  → Pokud jen online, zkus lokální networking nebo konference<br/>
                  💡 Investuj 20% marketingového rozpočtu do testování nového kanálu
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 4-5: Nastav tracking nových kanálů</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Použij speciální trackované odkazy pro každý kanál (ať víš odkud lidé přišli)<br/>
                  → Google Analytics nebo jednoduchá tabulka<br/>
                  → Sleduj: kolik stojí lead, kolik konvertuje, cena získání zákazníka
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 6-7: Analýza konkurence</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Kde se ukazuje konkurence?<br/>
                  → Jaké kanály používají?<br/>
                  → Co dělají jinak než ty?
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* TÝDEN 2 */}
        <div className="mb-5">
          <h3 className="font-bold text-blue-600 mb-3 text-lg">🔧 TÝDEN 2: AUTOMATIZACE & PROCESY</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 8-10: Vytvoř tabulku všech procesů (1x týdně+)</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Co děláš častěji než 1x týdně?<br/>
                  → Zapracování klienta, fakturace, marketing, reportování...<br/>
                  → Vyber 1 proces a napiš postup krok za krokem
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 11-13: Automatizuj 1 proces</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Zapier/Make pro propojení nástrojů<br/>
                  → Email automatizace (uvítací série, následné zprávy)<br/>
                  → Automatické faktury a připomínky<br/>
                  💡 Cíl: Ušetřit 3-5 hodin týdně
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 14: Najdi co můžeš delegovat</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Co děláš co může dělat někdo jiný levněji?<br/>
                  → Grafika, copywriting, administriva, účetnictví?<br/>
                  → Zkus najít freelancera nebo VA (virtual assistant)
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* TÝDEN 3 */}
        <div className="mb-5">
          <h3 className="font-bold text-purple-600 mb-3 text-lg">💰 TÝDEN 3: ZVÝŠENÍ TRŽEB ZE STÁVAJÍCÍCH</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 15-17: Kontaktuj TOP 20 klientů - feedback & upsell</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Email: "Jak se ti líbí naše služby? Co bychom mohli zlepšit?"<br/>
                  → Zjistíš proč se nevrací nebo co jim chybí<br/>
                  → Nabídni rozšíření služeb nebo premium balíček
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 18-20: Nastav program udržení zákazníků</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Email série pro stávající zákazníky (tipy, novinky, nabídky)<br/>
                  → Loyalty program nebo slevy pro opakované nákupy<br/>
                  → Měsíční newsletter s hodnotou<br/>
                  💡 Cíl: Zvýšit % vracejících se z 20% na 35%+
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 21: Nastav si tabulku se 4 klíčovými metrikami</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Cena získání zákazníka (kolik stojí získání zákazníka)<br/>
                  → Hodnota zákazníka (kolik ti průměrně utratí za celou dobu)<br/>
                  → Marže (kolik ti zbyde po nákladech)<br/>
                  → Míra návratnosti (kolik % se vrací)
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* TÝDEN 4 */}
        <div className="mb-5">
          <h3 className="font-bold text-indigo-600 mb-3 text-lg">🚀 TÝDEN 4: STRATEGICKÉ PLÁNOVÁNÍ</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 22-24: Revize cen a nabídky</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Můžeš zvýšit ceny o 20-30%?<br/>
                  → Vytvoř balíčky (základní, standard, prémiový)<br/>
                  → Přidej možnosti navýšení a doplňkového prodeje
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 25-27: Udělej si Model podnikání</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Stáhni si šablonu (Google: "business model canvas šablona")<br/>
                  → Celý byznys na 1 stránce - uvidíš přehled<br/>
                  → Uvidíš 3-5 způsobů jak zvýšit tržby ze stávajících<br/>
                  → Najdeš nové příležitosti (partnerství, nové trhy)<br/>
                  💡 Podnikatelská Čtvrtka ti to projde za 90 minut krok za krokem
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 28-30: Plán na Q4 (příští kvartál)</p>
                <p className="text-sm text-gray-600 mt-1">
                  → 3 hlavní cíle na příští 3 měsíce<br/>
                  → Co budeš testovat?<br/>
                  → Nastav si týdenní/měsíční rutinu sledování čísel
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Sell Box */}
      <SellBox />

      {/* Footer */}
      <div className="mt-6 pt-4 border-t text-center text-sm text-gray-500">
        <p>Tento akční plán je součástí kvízu "Jak zdravý je tvůj model podnikání?"</p>
        <p className="mt-1">Vytisknout a zatrhávat můžeš podle postupu ✓</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// POKROČILÝ (76-100%)
// ═══════════════════════════════════════════════════════════

function AdvancedPlan({ userName, score }: { userName: string; score: number }) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-purple-600">
        <h1 className="text-3xl font-bold text-purple-600 mb-2">💎 POKROČILÝ - AKČNÍ PLÁN</h1>
        <p className="text-lg text-gray-600">Tvoje skóre: {score}%</p>
        <p className="text-sm text-gray-500 mt-2">Pro: {userName}</p>
      </div>

      {/* Zpráva */}
      <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mb-6">
        <p className="text-purple-800 font-semibold">
          💎 Tvůj byznys je ve skvělém stavu! Teď jde o optimalizaci detailů a škálování.
        </p>
      </div>

      {/* Tvá největší rizika */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-2xl">⚠️</span> CO TĚ MŮŽE ZPOMALIT
        </h2>
        <div className="bg-gray-50 p-4 rounded space-y-2">
          <div className="flex gap-3">
            <span className="text-purple-600">⚠️</span>
            <p>Riziko stagnace - 90% úspěšných byznysů staguje po dosažení "komfortní" úrovně</p>
          </div>
          <div className="flex gap-3">
            <span className="text-purple-600">⚠️</span>
            <p>Podcenění konkurence - někdo mladší, hladovější může přijít a převzít tvůj trh</p>
          </div>
          <div className="flex gap-3">
            <span className="text-purple-600">⚠️</span>
            <p>Přílišná spokojenost - když to funguje, přestaneš experimentovat a inovovat</p>
          </div>
        </div>
      </div>

      {/* 30denní plán */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">📋 30DENNÍ PLÁN NA ŠKÁLOVÁNÍ</h2>
        
        {/* TÝDEN 1 */}
        <div className="mb-5">
          <h3 className="font-bold text-purple-600 mb-3 text-lg">🚀 TÝDEN 1: INOVACE & TESTOVÁNÍ</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 1-3: Vyhraď si "Čas na inovace" - 1 hodina týdně</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Testuj nové produkty, kanály, strategie<br/>
                  → Investuj 10-15% zisku do testování nových věcí<br/>
                  → Zkus AI nástroje, nové platformy, automatizace<br/>
                  💡 Zablokuj si v kalendáři každý týden - toto je tvůj čas na experimenty a testování
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 4-5: Analýza konkurence - deep dive</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Co dělají jinak? Kde jsou o 10% lepší než ty?<br/>
                  → Jaké mají nové produkty/služby?<br/>
                  → Zkus si objednat jejich službu jako "mystery shopper"
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 6-7: Nastav 3 experimenty na příští měsíc</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Nový kanál, nový produkt, nová cena?<br/>
                  → Nastav hypotézu a metriku úspěchu<br/>
                  → Alokuj rozpočet (čas + peníze)
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* TÝDEN 2 */}
        <div className="mb-5">
          <h3 className="font-bold text-indigo-600 mb-3 text-lg">👥 TÝDEN 2: DELEGOVÁNÍ & TÝM</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 8-10: Najmi někoho kdo může převzít část tvé role</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Cíl: Uvolnit 20% svého času na strategii místo běžné práce<br/>
                  → Co děláš co může dělat junior za míň peněz?<br/>
                  → Projektový manažer, obchodník, marketér, administrativa?<br/>
                  💡 Začni s part-time nebo freelancerem na zkoušku
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 11-13: Vytvoř playbook pro nejdůležitější procesy</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Sales proces (jak získáváš a uzavíráš klienty)<br/>
                  → Delivery proces (jak dodáváš službu/produkt)<br/>
                  → Support proces (jak řešíš problémy)<br/>
                  → Dokumentuj v Notion nebo Google Docs
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 14: Time audit - kam mizí tvůj čas?</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Sleduj 1 týden co děláš každou hodinu<br/>
                  → Kategorizuj: Strategie, Provoz, Plýtvání<br/>
                  → Cíl: 50%+ času na strategii, max 30% na provoz
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* TÝDEN 3 */}
        <div className="mb-5">
          <h3 className="font-bold text-blue-600 mb-3 text-lg">⚙️ TÝDEN 3: AUTOMATIZACE & OPTIMALIZACE</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 15-17: Projdi všechny procesy - najdi 3 co automatizovat</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Zapier/Make pro propojení nástrojů<br/>
                  → AI nástroje (ChatGPT, Jasper pro copywriting)<br/>
                  → Automatizace správy zákazníků (následné zprávy, hodnocení)<br/>
                  💡 Investuj do nástrojů které ti ušetří 10+ hodin měsíčně
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 18-20: Dashboard pro sledování klíčových metrik</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Propoj všechny zdroje dat (systém správy zákazníků, účetnictví, analytika)<br/>
                  → Dashboard v Notion, Google Data Studio nebo Tableau<br/>
                  → Sleduj: měsíční opakující se tržby, míra odchodu klientů, cena získání zákazníka, hodnota zákazníka za celou dobu, finanční rezerva, spokojenost klientů<br/>
                  → Denní pohled na čísla místo měsíčního reportu
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 21: Optimalizuj začátek prodejního procesu</p>
                <p className="text-sm text-gray-600 mt-1">
                  → A/B testuj vstupní stránky (10% zlepšení = obrovský dopad)<br/>
                  → Zkus různé nadpisy, výzvy k akci, prezentaci ceny<br/>
                  → Nastav retargeting na všechny návštěvníky
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* TÝDEN 4 */}
        <div className="mb-5">
          <h3 className="font-bold text-green-600 mb-3 text-lg">📈 TÝDEN 4: STRATEGICKÉ ŠKÁLOVÁNÍ</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 22-24: Udělej si Model podnikání - najdi škálovací příležitosti</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Model podnikání ti ukáže nové trhy, produkty, partnerství<br/>
                  → Kde můžeš 10x růst? (ne jen 10% improvement)<br/>
                  → Jaké jsou tvoje unfair advantages?<br/>
                  💡 Podnikatelská Čtvrtka ti pomůže najít skryté příležitosti
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 25-27: Identifikuj nové zdroje příjmů</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Můžeš vytvořit SaaS produkt z tvé služby?<br/>
                  → Můžeš licencovat know-how?<br/>
                  → Můžeš vytvořit affiliate/partner program?<br/>
                  → Cíl: Přidat 2. nebo 3. zdroj příjmů do 6 měsíců
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 28-30: Strategický plán na příští rok</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Kde chceš být za 12 měsíců? (tržby, tým, produkty)<br/>
                  → Co musí být pravda aby ses tam dostal? (plánuj odzadu)<br/>
                  → Nastav si cíle a klíčové výsledky na příští kvartál<br/>
                  → Sdílej vizi s týmem (nebo budoucím týmem)
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Sell Box */}
      <SellBox />

      {/* Footer */}
      <div className="mt-6 pt-4 border-t text-center text-sm text-gray-500">
        <p>Tento akční plán je součástí kvízu "Jak zdravý je tvůj model podnikání?"</p>
        <p className="mt-1">Vytisknout a zatrhávat můžeš podle postupu ✓</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ZAČÍNAJÍCÍ (beginner)
// ═══════════════════════════════════════════════════════════

function BeginnerPlan({ userName, score }: { userName: string; score: number }) {
  const categoryLabel = score >= 70 ? 'Připravený na start' : score >= 40 ? 'Máš základ, ale chybí ti části' : 'Potřebuješ se víc připravit';
  const color = score >= 70 ? 'green' : score >= 40 ? 'yellow' : 'orange';
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className={`text-center mb-6 pb-4 border-b-2 border-${color}-600`}>
        <h1 className={`text-3xl font-bold text-${color}-600 mb-2`}>🌱 ZAČÍNAJÍCÍ PODNIKATEL - AKČNÍ PLÁN</h1>
        <p className="text-lg text-gray-600">Tvoje skóre: {score}% - {categoryLabel}</p>
        <p className="text-sm text-gray-500 mt-2">Pro: {userName}</p>
      </div>

      {/* Zpráva */}
      <div className={`bg-${color}-50 border-l-4 border-${color}-600 p-4 mb-6`}>
        <p className={`text-${color}-800 font-semibold`}>
          {score >= 70 
            ? '✅ Máš solidní základ! Teď je čas přejít do akce a rozjet to.'
            : score >= 40
            ? '⚠️ Máš dobré základy, ale pár věcí ti chybí. Vyplň mezery před startem.'
            : '🚨 Ještě není čas startovat. Potřebuješ si udělat pořádek v plánu.'}
        </p>
      </div>

      {/* Tvá největší rizika */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-2xl">⚠️</span> NA CO SI DÁT POZOR
        </h2>
        <div className="bg-gray-50 p-4 rounded space-y-2">
          {score >= 70 ? (
            <>
              <div className="flex gap-3">
                <span className="text-green-600">⚠️</span>
                <p>Nedostatečné testování produktu před plným spuštěním</p>
              </div>
              <div className="flex gap-3">
                <span className="text-green-600">⚠️</span>
                <p>Podcenění marketingu v prvních měsících</p>
              </div>
            </>
          ) : score >= 40 ? (
            <>
              <div className="flex gap-3">
                <span className="text-yellow-600">⚠️</span>
                <p>Nejasná cílová skupina → promrhané peníze v marketingu</p>
              </div>
              <div className="flex gap-3">
                <span className="text-yellow-600">⚠️</span>
                <p>Chybějící finanční plán → nevíš kdy dojdou peníze</p>
              </div>
              <div className="flex gap-3">
                <span className="text-yellow-600">⚠️</span>
                <p>Neotestovaný nápad → možná nikdo nechce co nabízíš</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-3">
                <span className="text-orange-600">⚠️</span>
                <p>Žádný konkrétní plán → budeš váhat a prokrastinovat</p>
              </div>
              <div className="flex gap-3">
                <span className="text-orange-600">⚠️</span>
                <p>Neznáš své čísla → nevíš jestli děláš zisk nebo ztrátu</p>
              </div>
              <div className="flex gap-3">
                <span className="text-orange-600">⚠️</span>
                <p>Nemáš jasno v hodnotě → proč by si tě měli vybrat?</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 30denní plán */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">📋 30DENNÍ STARTOVACÍ PLÁN</h2>
        
        {/* TÝDEN 1 */}
        <div className="mb-5">
          <h3 className="font-bold text-blue-600 mb-3 text-lg">🎯 TÝDEN 1: ZÁKLAD - KOMU A CO?</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 1-2: Nadefinuj PŘESNĚ komu prodáváš</p>
                <p className="text-sm text-gray-600 mt-1">
                  → NE "všem" - musíš být konkrétní!<br/>
                  → Věk, pohlaví, kde pracují, kolik vydělávají, jaké mají problémy?<br/>
                  → Napiš si 3-5 konkrétních lidí které znáš a se hodí jako tvůj ideální klient<br/>
                  💡 Čím užší cílová skupina, tím lepší marketing a prodej
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 3-4: Co PŘESNĚ řešíš?</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Jaký problém má tvá cílová skupina?<br/>
                  → Jak to řešíš ty? (produkt/služba)<br/>
                  → Proč by si měli vybrat tebe a ne konkurenci?<br/>
                  → Napiš to do 2 vět (pitch)
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 5-7: Udělej si Model podnikání (ZÁKLAD!)</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Stáhni si šablonu (Google: "business model canvas šablona")<br/>
                  → Vyplň všech 9 políček - uvidíš mezery<br/>
                  → Neuděláš dobrý plán bez tohoto!<br/>
                  💡 TIP: Podnikatelská Čtvrtka ti ukáže jak na to krok za krokem
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* TÝDEN 2 */}
        <div className="mb-5">
          <h3 className="font-bold text-green-600 mb-3 text-lg">💰 TÝDEN 2: ČÍSLA & REALITA</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 8-10: Spočítej si minimální měsíční obrat na přežití</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Kolik potřebuješ na život? (nájem, jídlo, zálohy...)<br/>
                  → Kolik stojí provoz byznysu? (software, reklamy, dodavatelé...)<br/>
                  → TOTAL = tvůj minimální měsíční obrat<br/>
                  → Pokud nevíš kolik musíš vydělat, nikdy to nevyděláš
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 11-12: Kolik budeš účtovat?</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Zjisti ceny konkurence<br/>
                  → Spočítej: kolik ti zbyde po nákladech? (marže)<br/>
                  → Kolik klientů/projektů potřebuješ měsíčně na bod zvratu?<br/>
                  💡 Začátečníci často účtují příliš málo - nesoutěž cenou!
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 13-14: Finanční polštář</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Kolik máš našetřeno?<br/>
                  → Na kolik měsíců ti to vydrží?<br/>
                  → Pokud míň než 3 měsíce → NESPOUŠTĚJ ještě (nebo rozjeď při práci)
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* TÝDEN 3 */}
        <div className="mb-5">
          <h3 className="font-bold text-purple-600 mb-3 text-lg">🧪 TÝDEN 3: TESTOVÁNÍ NÁPADU</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 15-17: Testuj nápad s reálnými lidmi PŘED investicí</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Najdi 5-10 lidí z tvé cílové skupiny<br/>
                  → Řekni jim co chceš nabídnout a zeptej se: "Koupil bys to?"<br/>
                  → Pokud všichni říkají "super nápad!" ale nikdo nekupuje = problém<br/>
                  💡 Nejlepší validace = někdo ti za to zaplatí TEĎKA (předprodej)
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 18-20: Připrav si minimální verzi produktu</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Co nejrychleji - NE dokonalé!<br/>
                  → Základní verze produktu/služby<br/>
                  → Cíl: Do 14 dní mít něco co můžeš prodat<br/>
                  → Později vylepšíš podle feedbacku
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 21: Najdi si 3-5 beta testerů a získej feedback</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Nabídni slevu nebo zdarma výměnou za upřímný feedback<br/>
                  → Co se jim líbí? Co ne? Co chybí?<br/>
                  → Použij feedback k vylepšení PŘED plným spuštěním
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* TÝDEN 4 */}
        <div className="mb-5">
          <h3 className="font-bold text-orange-600 mb-3 text-lg">🚀 TÝDEN 4: PŘÍPRAVA NA START</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 22-24: Udělej si detailní akční plán na prvních 90 dní</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Co budeš dělat týden po týdnu?<br/>
                  → Kdy spustíš marketing? Kdy očekáváš první klienty?<br/>
                  → Kdy si najmeš první pomoc?<br/>
                  💡 Plán ti pomůže neváhat a neprokrastinovat
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 25-27: Založení firmy + administrativní záležitosti</p>
                <p className="text-sm text-gray-600 mt-1">
                  → OSVČ nebo s.r.o.? (na začátku většinou OSVČ)<br/>
                  → Bankovní účet, fakturační software (Fakturoid, Firmo)<br/>
                  → Daňový poradce nebo účetní? (alespoň konzultace)<br/>
                  → Pojištění? (alespoň základní)
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
              <input type="checkbox" className="mt-1 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">DEN 28-30: Marketing plán - KDE najdeš první klienty?</p>
                <p className="text-sm text-gray-600 mt-1">
                  → Osobní síť (rodina, kamarádi, LinkedIn kontakty)<br/>
                  → Facebook/Instagram reklamy na začátek (200-500 Kč/den)<br/>
                  → Kde se pohybuje tvá cílová skupina? (Facebook skupiny, fóra, eventy)<br/>
                  💡 První klienti MUSÍ být do 30 dní - jinak ztratíš momentum
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Sell Box */}
      <SellBox />

      {/* Footer */}
      <div className="mt-6 pt-4 border-t text-center text-sm text-gray-500">
        <p>Tento akční plán je součástí kvízu "Jak zdravý je tvůj model podnikání?"</p>
        <p className="mt-1">Vytisknout a zatrhávat můžeš podle postupu ✓</p>
      </div>
    </div>
  );
}

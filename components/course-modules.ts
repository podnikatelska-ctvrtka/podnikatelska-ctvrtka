// 📚 SDÍLENÁ DATA PRO DESKTOP I MOBILE VERZI KURZU
// Importuj tento soubor do CourseDemoV3.tsx a CourseDemoV3_Mobile.tsx

// 📚 MODUL 1: Základy byznys modelu (9 lekcí)
export const MODULE_1 = {
  id: 1,
  title: "Základy byznys modelu",
  description: "Naučte se všech 9 stavebních bloků Business Model Canvas",
  lessons: [
    {
      id: 1,
      title: "Zákaznické segmenty",
      canvasSection: "segments",
      videoUrl: "",
      description: "Kdo jsou vaši zákazníci? Naučte se je identifikovat.",
      content: `
        <h3>👥 Co je to Zákaznický segment?</h3>
        <p><strong>Zákaznický segment</strong> je konkrétní skupina lidí, která má <strong>stejný problém</strong> a za jeho řešení jsou ochotni <strong>platit</strong>.</p>
        
        <h4>🎯 Jak identifikovat vaše segmenty (krok za krokem):</h4>
        
        <p><strong>KROK 1: Zamyslete se nad problémem</strong></p>
        <p class="text-sm text-gray-600 ml-4">Jaký problém řešíte? Kdo ho pravděpodobně má?</p>
        
        <p class="mt-3"><strong>KROK 2: Máte už data?</strong></p>
        
        <div class="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 my-3">
          <p class="text-blue-900"><strong>✅ MÁM DATA</strong> (už prodávám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Podívejte se na tržby - <strong>komu prodáváte nejvíc?</strong></li>
            <li>Kdo nakupuje <strong>nejčastěji?</strong> Kdo utrácí <strong>nejvíc?</strong></li>
            <li>Příklad: "Profesionálky 30-50 let mi dělají 60% tržeb"</li>
          </ul>
        </div>
        
        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 my-3">
          <p class="text-amber-900"><strong>🚀 NEMÁM DATA</strong> (teprve začínám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Napište si <strong>2-3 hypotézy</strong> - kdo by mohl mít ten problém?</li>
            <li>Příklad: "Myslím že zaneprázdněné maminky (30-40 let) s dětmi"</li>
            <li><strong>Najděte je online</strong> (FB skupiny, fóra, Instagram)</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 3: Validujte to!</strong></p>
        <p class="text-sm text-gray-600 ml-4">Zeptejte se 10 lidí z té skupiny</p>
        <ul class="text-sm text-gray-600 ml-8 mt-1">
          <li>"Řešíte tento problém?"</li>
          <li>"Kolik vás to stojí času/peněz?"</li>
          <li>"Kolik byste byli ochotni zaplatit za řešení?"</li>
        </ul>
        
        <p class="mt-3"><strong>KROK 4: Buďte KONKRÉTNÍ!</strong></p>
        <p class="text-sm text-gray-600 ml-4">❌ Špatně: "Ženy", "Mladí lidé", "Firmy"</p>
        <p class="text-sm text-gray-600 ml-4">✅ Dobře: "Profesionálky 30-50 let které spěchají do práce a potřebují rychlé řešení"</p>
        
        <div class="bg-purple-50 border-2 border-purple-300 rounded-xl p-4 my-4">
          <p class="text-purple-900"><strong>💡 TIP:</strong> Začněte s <strong>1-2 segmenty</strong> a zaměřte se na ty co vám vydělávají (nebo budou vydělávat) nejvíc peněz. Lepší je dokonale obsloužit 2 segmenty než špatně 10!</p>
        </div>
        
        <h4>Proč je to důležité?</h4>
        <p>Nemůžete prodávat všem! Když budete mít <strong>2-3 konkrétní segmenty</strong> místo "všichni", dokážete:</p>
        <ul>
          <li>✅ <strong>Lépe cílit reklamu</strong> - víte kde je najít a co jim nabídnout</li>
          <li>✅ <strong>Vyšší cenu</strong> - konkrétní řešení = vyšší hodnota pro zákazníka</li>
          <li>✅ <strong>Rychlejší růst</strong> - zaměříte energii na ty správné lidi</li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ: Logika barev!</h4>
        <p><strong>Každý segment = jedna barva.</strong> Barva sleduje cestu: 🔵 Segment → 🔵 Hodnota → 🔵 Kanál → 🔵 Příjem</p>
        <p>Díky tomu <strong>na první pohled vidíte</strong> co prodáváte komu, kde a za kolik! 🎯</p>
      `,
      examples: {
        good: [
          "🍕 Pizzerie: Rodiny s dětmi 5-12 let (hledají rychlé rozvážky)",
          "🔧 Autoservis: Majitelé aut 5+ let starých (potřebují opravy)",
          "👗 E-shop: Ženy 25-40 let sledující módu (chtějí trendy oblečení)",
          "💇 Kadeřnice: Profesionálky 30-50 let (šetří čas, chtějí kvalitu)"
        ],
        bad: [
          "Všichni co mají hlad",
          "Lidé s auty",
          "Ženy",
          "Zákazníci"
        ]
      },
      tips: [
        "💡 Buďte KONKRÉTNÍ: věk, situace, bolest, kde je najdete",
        "🎨 Každý segment = JEDNA BARVA (např. 🔵 rodiny, 🟢 profesionálky)",
        "🚀 Začínající: Začněte s 1 segmentem, až budete mít data přidejte další",
        "💰 Už podnikám: Zaměřte se na top 2-3 segmenty co vydělávají nejvíc",
        "💬 Validujte! FB skupiny, fóra, Instagram - zjistěte jestli ten problém opravdu mají"
      ],
      showDemo: false
    },
    {
      id: 2,
      title: "Hodnotová nabídka",
      canvasSection: "values",
      videoUrl: "",
      description: "Co nabízíte a proč si vybrat právě vás?",
      content: `
        <h3>💎 Co je to Hodnotová nabídka?</h3>
        <p><strong>Hodnotová nabídka</strong> = produkt/služba + <strong>proč si vybrat právě VÁS</strong> místo konkurence.</p>
        
        <h4>⚠️ POZOR: Produkt ≠ Hodnota!</h4>
        <p>❌ <strong>Špatně:</strong> "Prodávám pizzu" (to prodává každý)</p>
        <p>✅ <strong>Správně:</strong> "Rodinná pizza XXL + dětské menu zdarma za 20 min" (proto si vyberou VÁS!)</p>
        
        <h4>🎯 Jak vytvořit hodnotu (krok za krokem):</h4>
        
        <p><strong>KROK 1: Začněte produktem</strong></p>
        <p class="text-sm text-gray-600 ml-4">Co konkrétně prodáváte? (pizza, servis, kurz, oblečení...)</p>
        
        <p class="mt-3"><strong>KROK 2: Máte už data?</strong></p>
        
        <div class="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 my-3">
          <p class="text-blue-900"><strong>✅ MÁM DATA</strong> (už prodávám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Zeptejte se TOP 10 zákazníků <strong>"Proč si nás vybíráte?"</strong></li>
            <li>Jejich odpověď = vaše hodnota!</li>
            <li>Příklad: "Protože mi to stihnete do večera" → Hodnota = Rychlost</li>
          </ul>
        </div>
        
        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 my-3">
          <p class="text-amber-900"><strong>🚀 NEMÁM DATA</strong> (teprve začínám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Napište si <strong>hypotézu</strong> - co by zákazníka motivovalo k nákupu?</li>
            <li>Příklad: "Myslím že rodiny chtějí rychlou rozvážku do 20 min"</li>
            <li>Zjistěte co nabízí konkurence a <strong>čím se lišíte</strong></li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 3: Přidejte benefit + unikátnost</strong></p>
        <p class="text-sm text-gray-600 ml-4"><strong>Produkt</strong> + Proč je to užitečné? + Proč právě VY?</p>
        <p class="text-sm text-gray-600 ml-4">Příklad: "Pizza XXL" + "nasytí celou rodinu" + "za 20 min u vás doma"</p>
        
        <p class="mt-3"><strong>KROK 4: Validujte to!</strong></p>
        <p class="text-sm text-gray-600 ml-4">Nabídněte pre-order nebo MVP - platí lidé za to? Pokud ano, máte hodnotu! ✅</p>
        
        <div class="bg-purple-50 border-2 border-purple-300 rounded-xl p-4 my-4">
          <p class="text-purple-900"><strong>💡 TIP:</strong> Stejný produkt (pizza) může mít <strong>různé hodnoty</strong> pro různé segmenty! 🔵 Rodiny chtějí rychlost + objem, 🟢 studenti chtějí cenu.</p>
        </div>
        
        <h4>Proč je to důležité?</h4>
        <p>Když víte <strong>PROČ si vás zákazníci vybírají</strong>, můžete:</p>
        <ul>
          <li>✅ <strong>Vidět CO prodáváte KOMU</strong> - každá hodnota má svou barvu = svého zákazníka</li>
          <li>✅ <strong>Zaměřit se na top příjmy</strong> - ne všechny produkty vydělávají stejně!</li>
          <li>✅ <strong>Jasně komunikovat</strong> - když víte "proč VY", snadno to sdělíte zákazníkům</li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ: Logika barev!</h4>
        <p><strong>Každá hodnota = barva segmentu</strong>, kterému ji prodáváte:</p>
        <ul>
          <li><strong>🔵 Modrý segment</strong> (Rodiny) → <strong>🔵 modrá hodnota</strong> (Pizza XXL + dětské menu zdarma za 20 min)</li>
          <li><strong>🟢 Zelený segment</strong> (Studenti) → <strong>🟢 zelená hodnota</strong> (Pizza slice 40 Kč + rozvoz do 15 min)</li>
        </ul>
        <p class="text-sm text-gray-600 mt-2">💡 Vidíte? Stejný produkt (pizza), ale <strong>jiná hodnota</strong> pro každý segment!</p>
      `,
      examples: {
        good: [
          "🍕 Pizzerie (🔵 Rodiny): Rodinná pizza XXL + dětské menu zdarma",
          "🔧 Autoservis (🟢 Majitelé starších aut): Servis za 1 den + náhradní vůz zdarma",
          "👗 E-shop (🟡 Módní ženy): Nové kolekce každý týden + vrácení do 60 dní",
          "💇 Kadeřnice (🟣 Profesionálky): Večerní termíny 18-21h + střih 30 min"
        ],
        bad: [
          "Kvalitní jídlo",
          "Rychlý servis",
          "Trendy oblečení",
          "Profesionální služby"
        ]
      },
      tips: [
        "🎨 Stejná barva jako segment (🔵 rodiny → 🔵 Pizza XXL + dětské menu zdarma za 20 min)",
        "💎 Hodnota NENÍ produkt! Je to produkt + BENEFIT + unikátnost",
        "🎯 Ptejte se: 'Proč právě MY?' - odpověď je vaše hodnota",
        "📊 Více hodnot pro jeden segment = diverzifikace příjmů"
      ]
    },
    {
      id: 3,
      title: "Kanály",
      canvasSection: "channels",
      videoUrl: "",
      description: "Jak se dostáváte k zákazníkům?",
      content: `
        <h3>📢 Co jsou to Kanály?</h3>
        <p><strong>Kanály</strong> jsou místa a způsoby, kterými <strong>oslovujete zákazníky</strong> a dodáváte jim hodnotu. Jednoduše: <strong>Kde zákazníky najdete?</strong></p>
        
        <h4>🎯 Jak najít správné kanály (krok za krokem):</h4>
        
        <p><strong>KROK 1: Kde se pohybují vaši zákazníci?</strong></p>
        <p class="text-sm text-gray-600 ml-4">Instagram? Facebook skupiny? Doporučení? Google?</p>
        
        <p class="mt-3"><strong>KROK 2: Máte už data?</strong></p>
        
        <div class="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 my-4">
          <p class="text-blue-900"><strong>✅ MÁM DATA</strong> (už prodávám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Zeptejte se 20 zákazníků: <strong>"Kde jste nás našli?"</strong></li>
            <li>Podívejte se do analytics (FB, Google, IG...)</li>
            <li>Příklad: "80% zákazníků nás našlo přes Instagram stories"</li>
          </ul>
        </div>
        
        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 my-4">
          <p class="text-amber-900"><strong>🚀 NEMÁM DATA</strong> (teprve začínám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li><strong>Hypotéza:</strong> Kde se pohybuje váš segment?</li>
            <li>Příklad: "Myslím že rodiny jsou v FB skupinách 'Maminky v Praze'"</li>
            <li><strong>Zjistěte kde je konkurence</strong> - tam jsou i zákazníci!</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 3: Testujte!</strong></p>
        <p class="text-sm text-gray-600 ml-4"><strong>Vyberte 2-3 kanály</strong> a testujte 2 týdny. Co přináší zákazníky?</p>
        <ul class="text-sm text-gray-600 ml-8 mt-1">
          <li>Měřte reakce (kliknutí, zprávy, objednávky)</li>
          <li>Pokud nefunguje → zkuste jiný kanál!</li>
        </ul>
        
        <p class="mt-3"><strong>KROK 4: ZAČNĚTE S JEDNÍM!</strong></p>
        <p class="text-sm text-gray-600 ml-4">❌ Chyba: být všude (vyhoříte!)</p>
        <p class="text-sm text-gray-600 ml-4">✅ Správně: 1 kanál dobře > 5 kanálů špatně</p>
        
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 rounded-xl p-4 my-4">
          <p class="text-purple-900 flex items-start gap-2">
            <span class="text-2xl">💡</span>
            <span><strong>TIP</strong></span>
          </p>
          <p class="text-sm text-gray-700 mt-3"><strong>Začínám:</strong> Začněte s organickými kanály (FB skupiny, doporučení, Google My Business). Reklamy až když víte CO FUNGUJE!</p>
          <p class="text-sm text-gray-700 mt-2"><strong>Už podnikám:</strong> Analyzujte data! Možná 80% zákazníků přichází z 20% kanálů. Zaměřte se na ty top!</p>
        </div>
        
        <h4>Proč jsou kanály důležité?</h4>
        <ul>
          <li>✅ <strong>Ušetříte čas</strong> - nebudete ztrácet čas tam, kde nejsou zákazníci</li>
          <li>✅ <strong>Ušetříte peníze</strong> - investujete jen do kanálů co fungují</li>
          <li>✅ <strong>Vidíte kde růst</strong> - když kanál funguje, můžete do něj víc investovat</li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ: Logika barev!</h4>
        <p><strong>Každý kanál = barva segmentu</strong>, který tam oslovujete:</p>
        <ul>
          <li><strong>🔵 Modrý segment</strong> (Rodiny) → <strong>🔵 modrý kanál</strong> (Instagram stories, FB skupiny Maminky)</li>
          <li><strong>🟢 Zelený segment</strong> (Studenti) → <strong>🟢 zelený kanál</strong> (TikTok, studentské slevy)</li>
        </ul>
        <p class="text-sm text-gray-600 mt-2">💡 Stejný kanál (Instagram) může oslovovat <strong>různé segmenty</strong> - použijte barvu podle toho!</p>
      `,
      examples: {
        good: [
          "🍕 Pizzerie (🔵 Rodiny): Instagram stories + Wolt/Foodora rozvoz",
          "🔧 Autoservis (🟢 Starší auta): Doporučení + lokální Facebook skupina",
          "👗 E-shop (🟡 Móda): Instagram + Pinterest + TikTok",
          "💇 Kadeřnice (🟣 Profesionálky): LinkedIn + Google (hledají večerní termíny)"
        ],
        bad: [
          "Internet",
          "Facebook",
          "Reklama",
          "Online marketing"
        ]
      },
      tips: [
        "🎨 BARVA = segment! (🔵 rodiny → 🔵 Instagram stories + FB skupiny Maminky)",
        "📍 Buďte tam KDE jsou zákazníci, ne kde chcete vy být!",
        "🚀 Začínající: ORGANICKÉ kanály (FB skupiny, doporučení) → levné a efektivní!",
        "💰 Už podnikám: Analyzujte data - investujte do top kanálů!",
        "🎯 ZAČNĚTE S JEDNÍM kanálem a perfektně ho zvládněte!"
      ]
    },
    {
      id: 4,
      title: "Vztahy se zákazníky",
      canvasSection: "relationships",
      videoUrl: "",
      description: "Jaký vztah budujete se zákazníky?",
      content: `
        <h3>❤️ Co jsou Vztahy se zákazníky?</h3>
        <p><strong>Vztahy</strong> určují jak <strong>získáváte, udržujete a motivujete</strong> zákazníky k opakovaným nákupům. Jednoduše: <strong>Jak je přimějete vrátit se ZNOVU?</strong></p>
        
        <h4>⚡ PROČ JE TO KLÍČOVÉ?</h4>
        <p><strong>Získat nového zákazníka stojí 5-10× více</strong> než udržet stávajícího! Opakovaný zákazník = <strong>základ vašeho byznysu</strong>.</p>
        
        <h4>🎯 Jak "zamknout" zákazníky (krok za krokem):</h4>
        
        <p><strong>KROK 1: Proč se vrací?</strong></p>
        <p class="text-sm text-gray-600 ml-4">Co je motivuje k opakovaným nákupům?</p>
        
        <p class="mt-3"><strong>KROK 2: Máte už data?</strong></p>
        
        <div class="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 my-3">
          <p class="text-blue-900"><strong>✅ MÁM DATA</strong> (už prodávám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Analyzujte <strong>kdo se vrací</strong> a kdo nakupuje jen jednou</li>
            <li>Zeptejte se TOP 10 opakovaných zákazníků: <strong>"Proč se vracíte právě k nám?"</strong></li>
            <li>Příklad: "Vrací se rodiny které využívají věrnostní kartu"</li>
          </ul>
        </div>
        
        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 my-3">
          <p class="text-amber-900"><strong>🚀 NEMÁM DATA</strong> (teprve začínám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li><strong>Hypotéza:</strong> Co by je mohlo motivovat k návratu?</li>
            <li>Příklad: "Myslím že rodiny se vrátí pokud budou spokojené s kvalitou a rychlostí"</li>
            <li><strong>Podívejte se na konkurence</strong> - proč zákazníci odcházejí?</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 3: Vyberte MECHANISMUS "zamčení"</strong></p>
        <p class="text-sm text-gray-600 ml-4">Jak si je "uzamknete" aby nemohli jít ke konkurenci?</p>
        
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-400 rounded-xl p-5 my-4">
          <p class="text-blue-900"><strong>🔒 7 OSVĚDČENÝCH ZPŮSOBŮ jak udržet zákazníky:</strong></p>
          <ul class="text-sm text-gray-700 ml-4 mt-3 space-y-2 no-bullet">
            <li><strong>1️⃣ NEJDŮLEŽITĚJŠÍ: Perfektní produkt/služba!</strong> → Když jste spokojení, vrátíte se sami! Bez toho nic nefunguje.</li>
            <li><strong>2️⃣ Personalizace a paměť</strong> → "Víme co máte rádi - máme to připravené!" (kadeřnice si pamatuje vaš styl)</li>
            <li><strong>3️⃣ Automatické připomínky</strong> → SMS/Email: "Čas na servis! Máme pro vás termín..." (ušetříte jim starosti)</li>
            <li><strong>4️⃣ Pravidelné rezervace</strong> → "Rezervace každých 6 týdnů automaticky" (pohodlí!)</li>
            <li><strong>5️⃣ Předplatné/členství</strong> → "Roční servisní balíček -30%" (motivace k dlouhodobé spolupráci)</li>
            <li><strong>6️⃣ Exkluzivní přístup pro stálé</strong> → "Early access k novinkám jen pro vás" (pocit výjimečnosti!)</li>
            <li><strong>7️⃣ Věrnostní program</strong> → (⚠️ POZOR: Funguje jen když máte už skvělý produkt! Sám o sobě nezachrání špatnou službu)</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 4: Implementujte a AUTOMATIZUJTE!</strong></p>
        <p class="text-sm text-gray-600 ml-4">Vztahy musí fungovat <strong>automaticky</strong>, jinak vyhoříte!</p>
        <ul class="text-sm text-gray-600 ml-8 mt-1">
          <li><strong>SMS/Email automatizace</strong> → připomínky, novinky (Smartemailing, Mailchimp...)</li>
          <li><strong>Jednoduchá databáze</strong> → Google Sheets, Excel... (jméno, telefon, co kupují)</li>
          <li><strong>Osobní přístup</strong> → "Ahoj Petře, máme pro tebe novou kolekci!" (personalizace!)</li>
        </ul>
        
        <p class="mt-3"><strong>KROK 5: Měřte a optimalizujte!</strong></p>
        <ul class="text-sm text-gray-600 ml-4 mt-1">
          <li>Kolik % zákazníků se vrací?</li>
          <li>Jak často nakupují?</li>
          <li>Pokud se nevracejí → zkuste jiný mechanismus!</li>
        </ul>
        
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 rounded-xl p-4 my-4">
          <p class="text-purple-900 flex items-start gap-2">
            <span class="text-2xl">💡</span>
            <span><strong>TIP</strong></span>
          </p>
          <p class="text-sm text-gray-700 mt-3"><strong>Začínám:</strong> Začněte s PERFEKTNÍ HODNOTOU! Když jsou spokojení, vrátí se sami. Pak přidejte jednoduché nástroje - SMS/Email připomínky, Google Sheets na zákazníky.</p>
          <p class="text-sm text-gray-700 mt-3"><strong>Už podnikám:</strong> Analyzujte své zákazníky! DATA jsou nejdůležitější:</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2 space-y-1">
            <li>Zákazník A: Co chce? Kupuje pravidelně? Jak mu více pomoci?</li>
            <li>Zákazník B: Nakoupil jednou? Proč už nenakoupil znovu?</li>
            <li>⚠️ Obecné slevy otravují! Segmentujte!</li>
          </ul>
        </div>
        
        <h4>Proč jsou vztahy klíčové?</h4>
        <ul class="no-bullet">
          <li>✅ <strong>10× levnější</strong> než získat nového zákazníka</li>
          <li>✅ <strong>Opakovaný zákazník = stabilní příjem</strong> (předvídatelné tržby!)</li>
          <li>✅ <strong>Doporučení</strong> - spokojení stálí zákazníci vás doporučí dalším!</li>
          <li>✅ <strong>"Zamčené" zákazníky = konkurence je neukradne</strong></li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ: Logika barev!</h4>
        <p><strong>Každý segment = jiný vztah!</strong> Co funguje pro rodiny, nemusí fungovat pro profesionálky.</p>
        <ul class="no-bullet">
          <li><strong>🔵 Modrý segment</strong> (Rodiny) → <strong>🔵 modrý vztah</strong> (Věrnostní karta: 5. pizza zdarma)</li>
          <li><strong>🟢 Zelený segment</strong> (Studenti) → <strong>🟢 zelený vztah</strong> (Studentská sleva -20% s ISIC kartou)</li>
        </ul>
        <p class="text-sm text-gray-600 mt-2">💡 <strong>Každý segment chce něco jiného!</strong> Rodiny chtějí slevy, profesionálky chtějí VIP přístup a rychlost.</p>
      `,
      examples: {
        good: [
          "🍕 Pizzerie (🔵 Rodiny): Perfektní kvalita za 20 min + email s novinkami a akční cenou pro stálé zákazníky",
          "🔧 Autoservis (🟢 Starší auta): Spolehlivost + SMS upozornění na STK + servisní balíčky",
          "👗 E-shop (🟡 Móda): Skvělá kvalita + VIP club s early access k novinkám",
          "💇 Kadeřnice (🟣 Profesionálky): Perfektní střih + pravidelné rezervace každé 6 týdnů automaticky"
        ],
        bad: [
          "Dobrý zákaznický servis",
          "Osobní přístup",
          "Komunikace",
          "Podpora"
        ]
      },
      tips: [
        "🎨 BARVA = segment! (🔵 rodiny → 🔵 SMS připomínky, 🟢 studenti → 🟢 sleva s ISIC)",
        "💎 NEJDŮLEŽITĚJŠÍ: Perfektní hodnota! Když jsou spokojení, vrátí se sami!",
        "🔄 Získat nového zákazníka stojí 5-10× více než udržet stávajícího!",
        "💡 Automatizujte! (SMS, emaily, Google Sheets) - jinak vyhoříte",
        "🚀 Začínající: Začněte s hodnotou, pak přidejte jednoduché nástroje",
        "💰 Už podnikám: DATA! Analyzujte kdo se vrací a proč. Segmentujte!",
        "⚠️ Obecné slevy otravují! Segmentujte místo paušálních akcí!"
      ]
    },
    {
      id: 5,
      title: "Zdroje příjmů",
      canvasSection: "revenue",
      videoUrl: "",
      description: "Jak vyděláváte peníze?",
      content: `
        <h3>💰 Zdroje příjmů</h3>
        <p><strong>Příjmy</strong> jsou konkrétní peníze které dostanete od zákazníků za hodnotu.</p>
        
        <h4>🎯 Jak na to (krok za krokem):</h4>
        
        <p><strong>KROK 1: Určete typ příjmu</strong></p>
        <p class="text-sm text-gray-600 ml-4"><strong>🎨 BAREVNÝ příjem</strong> = pro konkrétní segment (🔵 pizza pro rodiny)</p>
        <p class="text-sm text-gray-600 ml-4"><strong>🌐 GLOBÁLNÍ příjem</strong> = pro všechny segmenty (káva, nápoje...)</p>
        
        <p class="mt-3"><strong>KROK 2: Máte už data?</strong></p>
        
        <div class="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 my-3">
          <p class="text-blue-900"><strong>✅ MÁM DATA</strong> (už prodávám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Použijte <strong>reálná čísla</strong> z vašich tržeb</li>
            <li>Příklad: "🔵 50 rodin × 250 Kč/měsíc = 12 500 Kč/měsíc"</li>
            <li>Spočítejte pro každý segment zvlášť</li>
          </ul>
        </div>
        
        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 my-3">
          <p class="text-amber-900"><strong>🚀 NEMÁM DATA</strong> (teprve začínám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Použijte <strong>odhady</strong> - kolik zákazníků očekáváte?</li>
            <li>Příklad: "🔵 10 zákazníků × 65 Kč = 650 Kč/den"</li>
            <li>→ × 25 dní = 16 250 Kč/měsíc</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 3: Spočítejte příjmy</strong></p>
        <p class="text-sm text-gray-600 ml-4">Pro každý příjem zadejte <strong>Počet zákazníků × Cena = Celkový příjem</strong></p>
        
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 rounded-xl p-4 my-4">
          <p class="text-purple-900 flex items-start gap-2">
            <span class="text-2xl">💡</span>
            <span><strong>TIP</strong></span>
          </p>
          <p class="text-sm text-gray-700 mt-3">Většina byznysu má <strong>MIX barevných + globálních příjmů</strong>. Např. 🔵 Rodinná pizza (barevná) + 🌐 Nápoje (globální pro všechny).</p>
          <p class="text-sm text-yellow-800 mt-3 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <strong>⚠️ POZOR:</strong> Zaměřte se na DŮLEŽITÉ příjmy - ty co dělají byznys! Ne marginální (káva kolemjdoucím).
          </p>
        </div>
        
        <h4>Proč je to důležité?</h4>
        <p>Když víte <strong>ODKUD vám plynou peníze</strong>, můžete:</p>
        <ul>
          <li>✅ <strong>Optimalizovat nabídku</strong> - zaměřit se na nejvýnosnější produkty</li>
          <li>✅ <strong>Plánovat růst</strong> - víte kolik potřebujete zákazníků</li>
          <li>✅ <strong>Vidět souvislosti</strong> - barvy ukazují cestu od segmentu k příjmu</li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ: Logika barev!</h4>
        <p><strong>🎨 BAREVNÝ příjem</strong> = pro konkrétní segment (🔵 Segment A → 🔵 Hodnota A → 🔵 Příjem A)</p>
        <p><strong>🌐 GLOBÁLNÍ příjem</strong> = pro všechny segmenty (nápoje, doplňkové služby...)</p>
        <p class="text-sm text-gray-600 mt-2">⚠️ Ale pozor: Globální příjem musí být <strong>důležitý</strong>! Ne jen "marginální prodej kávy kolemjdoucím".</p>
      `,
      examples: {
        good: [
          "🍕 (🔵 Rodinná pizza): 50 rodin × 250 Kč/měsíc = 12 500 Kč/měsíc",
          "🔧 (🟢 Velký servis): 20 aut × 8000 Kč = 160 000 Kč/měsíc",
          "👗 (🟡 Trendy oblečení): 100 objednávek × 1500 Kč = 150 000 Kč/měsíc",
          "💇 (🌐 Nápoje): 200 nápojů × 50 Kč = 10 000 Kč/měsíc (pro všechny segmenty)"
        ],
        bad: [
          "Prodej produktů",
          "Tržby z služeb",
          "Příjmy",
          "Peníze od zákazníků"
        ]
      },
      tips: [
        "🎨 BARVA = segment! (🔵 Rodinná pizza → 🔵 příjem z rodinných pizz)",
        "🌐 GLOBÁLNÍ = příjem pro VŠECHNY segmenty (nápoje, doplňkové služby...)",
        "💰 ZADEJTE MĚSÍČNÍ ČÍSLO! Počet zákazníků × cena/měsíc (reálná data nebo odhad)",
        "⚠️ Jen DŮLEŽITÉ příjmy! Ne marginální prodeje (káva kolemjdoucím)",
        "🚀 Začínající: Použijte odhady, později je upravíte podle reality",
        "📊 Už podnikám: Použijte reálná čísla z vašich tržeb za poslední měsíc"
      ]
    },
    {
      id: 6,
      title: "Klíčové zdroje",
      canvasSection: "resources",
      videoUrl: "",
      description: "Co potřebujete k fungování?",
      content: `
        <h3>🏭 Co jsou Klíčové zdroje?</h3>
        <p><strong>Zdroje</strong> jsou věci které <strong>MUSÍTE mít</strong>, aby byznys vůbec fungoval. <strong>BEZ ČEHO to nejde?</strong></p>
        
        <h4>🎯 Jak najít klíčové zdroje (krok za krokem):</h4>
        
        <p><strong>KROK 1: Co MUSÍTE mít?</strong></p>
        <p class="text-sm text-gray-600 ml-4">Bez čeho váš byznys nemůže fungovat?</p>
        
        <p class="mt-3"><strong>KROK 2: Máte už data?</strong></p>
        
        <div class="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 my-3">
          <p class="text-blue-900"><strong>✅ MÁM DATA</strong> (už prodávám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Co používáte <strong>KAŽDÝ DEN</strong>? Bez čeho to nejde?</li>
            <li>Příklad: "Používám pec, prostor, 2 kuchaře, suroviny"</li>
            <li><strong>Co vám chybí pro růst?</strong> (další zaměstnanci, větší prostor...)</li>
          </ul>
        </div>
        
        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 my-3">
          <p class="text-amber-900"><strong>🚀 NEMÁM DATA</strong> (teprve začínám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li><strong>MVP přístup:</strong> Co potřebujete MINIMÁLNĚ na start?</li>
            <li>Příklad: "Na start potřebuji domácí pec, kuchyň, já sám"</li>
            <li><strong>Nemusíte vlastnit vše!</strong> (pronájem, sdílené prostory, outsourcing)</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 3: Rozdělte zdroje do 4 kategorií</strong></p>
        
        <div class="bg-white border-2 border-gray-300 rounded-xl p-4 my-4">
          <p><strong>🏗️ 1. FYZICKÉ zdroje</strong></p>
          <ul class="text-sm text-gray-700 ml-4 mt-1">
            <li>Budovy, prostory, stroje, zařízení, auta, materiál...</li>
            <li>Příklad: "Pec na pizzu, prostor 50m², dodávka"</li>
          </ul>
        </div>
        
        <div class="bg-white border-2 border-gray-300 rounded-xl p-4 my-4">
          <p><strong>👥 2. LIDSKÉ zdroje</strong></p>
          <ul class="text-sm text-gray-700 ml-4 mt-1">
            <li>Zaměstnanci, odbornost, certifikace, dovednosti...</li>
            <li>Příklad: "2 kuchaři, 1 rozvozce, můj management"</li>
          </ul>
        </div>
        
        <div class="bg-white border-2 border-gray-300 rounded-xl p-4 my-4">
          <p><strong>💰 3. FINANČNÍ zdroje</strong></p>
          <ul class="text-sm text-gray-700 ml-4 mt-1">
            <li>Hotovost, úvěr, investice, provozní kapitál...</li>
            <li>Příklad: "Investice 150k (pec) + provozní kapitál 50k (suroviny)"</li>
            <li>⚠️ <strong>POZOR:</strong> Ve Čtvrtce píšete co kupujete (pec, vybavení), ne částky! Částky = náklady.</li>
          </ul>
        </div>
        
        <div class="bg-white border-2 border-gray-300 rounded-xl p-4 my-4">
          <p><strong>🧠 4. INTELEKTUÁLNÍ zdroje</strong></p>
          <ul class="text-sm text-gray-700 ml-4 mt-1">
            <li>Značka, patenty, databáze zákazníků, know-how, recepty...</li>
            <li>Příklad: "Tajný recept na těsto, databáze 500 stálých zákazníků"</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 4: Vlastnit vs. Pronajímat?</strong></p>
        <ul class="text-sm text-gray-600 ml-4 mt-1">
          <li>❌ Nemusíte vlastnit vše! → Pronájem, sdílené prostory, outsourcing</li>
          <li>✅ Klíčové zdroje = to co vás odlišuje (know-how, značka...)</li>
          <li>Příklad: "Prostor pronajímám, ale recept na těsto je MŮJ!"</li>
        </ul>
        
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 rounded-xl p-4 my-4">
          <p class="text-purple-900 flex items-start gap-2">
            <span class="text-2xl">💡</span>
            <span><strong>TIP</strong></span>
          </p>
          <p class="text-sm text-gray-700 mt-3"><strong>Začínám:</strong> Začněte s minimem! Nemusíte mít dokonalou výbavu. Pronajměte si prostor nebo začněte z domova. Investujte až když víte že to funguje!</p>
          <p class="text-sm text-gray-700 mt-3"><strong>Už podnikám:</strong> Co vám chybí pro růst?</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2 space-y-1">
            <li>Analyzujte úzká místa - kde se zdržujete? Co vás omezuje?</li>
            <li>Zeptejte se zákazníků - co jim chybí?</li>
            <li>Prioritizujte - co když to vyřešíte? O kolik% poroste prodej?</li>
          </ul>
        </div>
        
        <h4>Proč jsou zdroje důležité?</h4>
        <ul class="no-bullet">
          <li>✅ <strong>Vidíte co potřebujete na start</strong> - jaká investice je nutná?</li>
          <li>✅ <strong>Plánujete růst</strong> - co budete potřebovat později?</li>
          <li>✅ <strong>Optimalizujete náklady</strong> - co můžete pronajímat místo vlastnit?</li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ: Logika barev!</h4>
        <p><strong>🌐 VĚTŠINOU GLOBÁLNÍ!</strong> Zdroje jsou sdílené pro celý byznys (pec, prostor, tým...).</p>
        <p class="text-sm text-gray-600 mt-2">💡 Pouze <strong>výjimečně</strong> může být zdroj specifický pro jeden segment (např. speciální vybavení pro VIP segment).</p>
      `,
      examples: {
        good: [
          "🍕 Pizzerie (🌐 globální): Pec na pizzu, prostor, 2 kuchaři",
          "🔧 Autoservis (🌐): Zvedák, diagnostika, mechanik s certifikátem",
          "👗 E-shop (🌐): Webová platforma, skladové prostory, kurýr",
          "💇 Kadeřnice (🌐): Salon v centru, profesionální vybavení, kadeřnice"
        ],
        bad: [
          "Zaměstnanci",
          "Vybavení",
          "Infrastruktura",
          "Technologie"
        ]
      },
      tips: [
        "🌐 VĚTŠINOU GLOBÁLNÍ! Sdílené pro celý byznys (pec, prostor, tým...)",
        "🔍 Ptejte se: BEZ ČEHO to nejde? (to je klíčový zdroj)",
        "💡 Nemusíte vlastnit vše - pronájem, sdílené prostory, outsourcing!",
        "🚀 Začínající: MVP - minimální zdroje na start, investujte až když víte že to funguje",
        "💰 Už podnikám: Analyzujte úzká místa! Co vás omezuje? Zeptejte se zákazníků!"
      ]
    },
    {
      id: 7,
      title: "Klíčové aktivity",
      canvasSection: "activities",
      videoUrl: "",
      description: "Co musíte dělat?",
      content: `
        <h3>⚙️ Co jsou Klíčové aktivity?</h3>
        <p>Každý podnikatel ví CO musí udělat, aby produkt/služba vznikla (uvařit kávu, upéct pizzu, opravit auto...). <strong>To je samozřejmost.</strong></p>
        
        <div class="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-400 rounded-xl p-4 my-4">
          <p class="text-red-900 text-lg"><strong>🎯 ALE NEJVĚTŠÍ PROBLÉM</strong></p>
          <p class="text-red-800 mt-2"><strong>Jak přimějete zákazníky, aby si váš produkt koupili?</strong></p>
        </div>
        
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 rounded-xl p-4 my-4">
          <p class="text-purple-900 flex items-start gap-2">
            <span class="text-2xl">💡</span>
            <span><strong>MARKETING = Pro 90% podnikatelů by měla být NEJVĚTŠÍ aktivita (a není!)</strong></span>
          </p>
          <p class="text-sm text-gray-700 mt-3 mb-2"><strong>Ptejte se konkrétně</strong></p>
          <ul class="text-sm text-gray-700 ml-4 space-y-1">
            <li>Instagram/Facebook posty každý den?</li>
            <li>Reklamy na Google/Facebook?</li>
            <li>Prezence na trzích, networking, doporučení?</li>
            <li>Nabídka na chodník, letáky, vizitky?</li>
          </ul>
          <p class="text-sm text-gray-600 mt-3 italic">
            💡 Vyberte si jeden segment a zkuste k němu vymyslet 2-3 aktivity!
          </p>
        </div>
        
        <h4>🎯 Jak najít klíčové aktivity</h4>
        
        <p class="mt-3"><strong>KROK 1</strong> Jaký segment chci přilákat?</p>
        <p class="text-sm text-gray-600 ml-4">Vyberte si konkrétní segment zákazníků z Čtvrtky</p>
        <p class="text-sm text-gray-600 ml-4">→ Příklad: 🔵 Kolemjdoucí (spěchají do práce)</p>
        
        <p class="mt-3"><strong>KROK 2</strong> CO KONKRÉTNĚ udělám, aby TENTO segment přišel?</p>
        <p class="text-sm text-gray-600 ml-4">Přemýšlejte - Co musím DĚLAT každý den/týden?</p>
        <p class="text-sm text-gray-600 ml-4">→ Příklad: Stihnout kávu za 2 min, Instagram stories v 7:00, stojan před kavárnou</p>
        
        <p class="mt-3"><strong>KROK 3</strong> Rozdělte na GLOBÁLNÍ vs. SPECIFICKÉ</p>
        <p class="text-sm text-gray-600 ml-4"><strong>🌐 Globální</strong> = kampaň pro více segmentů (Instagram pro rodiny + studenty)</p>
        <p class="text-sm text-gray-600 ml-4"><strong>🎨 Specifické</strong> = barva segmentu (🔵 Instagram stories v 7h pro kolemjdoucí)</p>
        
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 rounded-xl p-4 my-4">
          <p class="text-blue-900"><strong>💡 PŘÍKLAD Kavárna</strong></p>
          <p class="text-sm text-gray-700 mt-2"><strong>Segment:</strong> 🔵 Kolemjdoucí (spěchají do práce)</p>
          <p class="text-sm text-gray-700 mt-1"><strong>Otázka:</strong> Jak je přimějete, aby u mě nakoupili?</p>
          <p class="text-sm text-gray-700 mt-3 mb-2"><strong>CO MUSÍM KONKRÉTNĚ DĚLAT</strong></p>
          <ul class="text-sm text-gray-700 ml-4 space-y-1 no-bullet">
            <li>🔵 <strong>Stihnout kávu za 2 min</strong> každému (rychlá příprava)</li>
            <li>🔵 Instagram stories každé ráno v 7 hodin (denní speciál)</li>
            <li>🔵 Stojan s nabídkou před kavárnou (viditelnost)</li>
          </ul>
        </div>
        
        <h4>🎨 Logika barev</h4>
        <p><strong>🌐 Globální</strong> = kampaň funguje pro více segmentů (Instagram pro rodiny + studenty, Google reklamy pro všechny)</p>
        <p><strong>🔵 Specifické</strong> = aktivita jen pro JEDEN segment → použijte barvu segmentu! (🔵 modrý segment → 🔵 modrá aktivita)</p>
        
        <h4>Proč jsou aktivity důležité?</h4>
        <ul class="no-bullet">
          <li>✅ <strong>Víte CO DĚLAT</strong> - konkrétní marketingové činnosti, které vás posunou dopředu</li>
          <li>✅ <strong>Zaměříte se na to podstatné</strong> - marketing = 90% byznysu!</li>
          <li>✅ <strong>Plánujete růst</strong> - co budete muset dělat víc, když poroste poptávka?</li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ - Logika barev!</h4>
        <p><strong>Globální kampaň = 🌐 globální</strong> (funguje pro více segmentů)</p>
        <p><strong>Marketing pro segment = barva segmentu!</strong></p>
        <ul class="no-bullet">
          <li><strong>🌐 Globální -</strong> Instagram kampaň pro rodiny + studenty, Google reklamy pro všechny</li>
          <li><strong>🔵 Modrý segment</strong> (Kolemjdoucí) → <strong>🔵 modrá aktivita</strong> (Instagram stories v 7 hodin)</li>
          <li><strong>🟢 Zelený segment</strong> (Studenti) → <strong>🟢 zelená aktivita</strong> (TikTok videa o akcích)</li>
        </ul>
      `,
      examples: {
        good: [
          "🍕 Pizzerie: 🌐 Facebook kampaň pro rodiny + studenty, 🔵 Instagram stories pro rodiny",
          "🔧 Autoservis: 🌐 Google reklamy pro všechny, 🟢 Péče o náhradní vozy pro firemní",
          "👗 E-shop: 🌐 TikTok kampaň pro mladé + studenty, 🟡 Instagram Reels pro mladé",
          "💇 Kadeřnice: 🌐 Instagram kampaň pro více segmentů, 🟣 LinkedIn networking pro firmy"
        ],
        bad: [
          "Řízení firmy (příliš obecné)",
          "Poskytování služeb (co konkrétně?)",
          "Večerní provoz (to je HODNOTA, ne aktivita!)",
          "Rychlá rozvážka (to je HODNOTA, ne aktivita!)"
        ]
      },
      tips: [
        "🎯 PROBLÉM - Jak přimějete zákazníky, aby si váš produkt koupili?",
        "📢 MARKETING = Pro 90% by měla být největší aktivita (a není!)",
        "💡 Vyberte 1 segment a zkuste k němu vymyslet 2-3 aktivity",
        "🌐 Globální = kampaň pro více segmentů (IG pro rodiny + studenty)",
        "🎨 Specifické = barva segmentu (🔵 IG stories v 7h pro kolemjdoucí)"
      ]
    },
    {
      id: 8,
      title: "Klíčová partnerství",
      canvasSection: "partners",
      videoUrl: "",
      description: "S kým spolupracujete?",
      content: `
        <h3>🤝 Co jsou Klíčová partnerství?</h3>
        <p><strong>Partneři</strong> jsou firmy nebo lidé, <strong>kterým zadáváte práci externě</strong> nebo od nich <strong>kupujete klíčové zdroje</strong>. Jednoduše: <strong>Bez koho to nejde?</strong></p>
        
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 rounded-xl p-4 my-4">
          <p class="text-purple-900 flex items-start gap-2">
            <span class="text-2xl">💡</span>
            <span><strong>KLÍČOVÉ! Partneři = SPOLEHLIVOST + KVALITA</strong></span>
          </p>
          <ul class="text-sm text-gray-700 ml-4 mt-3 space-y-1">
            <li><strong>Dodávají včas</strong> - můžete se na ně spolehnout</li>
            <li><strong>Garantují kvalitu</strong> - i když jsou třeba dražší</li>
            <li><strong>Váš byznys stojí na nich</strong> - proto potřebujete tu kvalitu!</li>
          </ul>
        </div>
        
        <h4>⚡ PROČ MÍT PARTNERY?</h4>
        <p>Partner vám může <strong>nahradit investici do zdrojů!</strong> Místo kupovat vlastní dodávku, můžete použít rozvoz od Wolt. Místo vlastní účetní, najměte si účetní firmu.</p>
        
        <h4>🎯 Jak najít klíčové partnery (krok za krokem):</h4>
        
        <p><strong>KROK 1: Co NEDĚLÁTE sami?</strong></p>
        <p class="text-sm text-gray-600 ml-4">Co outsourcujete nebo od koho nakupujete?</p>
        
        <p class="mt-3"><strong>KROK 2: Máte už data?</strong></p>
        
        <div class="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 my-4">
          <p class="text-blue-900"><strong>✅ MÁM DATA</strong> (už prodávám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Kdo jsou vaši <strong>TOP dodavatelé/partneři</strong>?</li>
            <li>Bez koho byste <strong>nepřežili</strong>?</li>
            <li>Příklad: "Dodavatel mouky a sýrů, Wolt rozvoz, účetní firma"</li>
          </ul>
        </div>
        
        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 my-4">
          <p class="text-amber-900"><strong>🚀 NEMÁM DATA</strong> (teprve začínám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li><strong>Koho budete potřebovat?</strong> (dodavatelé, služby)</li>
            <li>Příklad: "Budu potřebovat dodavatele mouky, účetní, kurýra"</li>
            <li><strong>Kdo vám může pomoct začít levněji?</strong> (sdílené služby)</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 3: Partner vs. Dodavatel - jaký je rozdíl?</strong></p>
        
        <div class="bg-white border-2 border-gray-300 rounded-xl p-4 my-4">
          <p><strong>💡 Partner = někdo BEZ KOHO to NEJDE!</strong></p>
          <ul class="text-sm text-gray-700 ml-4 mt-1">
            <li>✅ <strong>Klíčový partner:</strong> Dodavatel mouky (bez mouky nemáte pizzu!)</li>
            <li>❌ <strong>Běžný dodavatel:</strong> Dodavatel krabic (můžete změnit kdykoli)</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 4: Může partner nahradit investici?</strong></p>
        <p class="text-sm text-gray-600 ml-4">Někdy je <strong>levnější zadat práci externě</strong> než vlastnit!</p>
        <ul class="text-sm text-gray-600 ml-4">→ Příklad: Rozvoz od Wolt (0 Kč investice) vs. vlastní dodávka (200 000 Kč)</ul>
        <ul class="text-sm text-gray-600 ml-4">→ Příklad: Účetní firma (3 000 Kč/měsíc) vs. vlastní účetní (30 000 Kč/měsíc)</ul>
        
        <p class="mt-3"><strong>KROK 5: Vyberte TOP 3-5 partnerů</strong></p>
        <p class="text-sm text-gray-600 ml-4">Napište jen ty <strong>nejdůležitější</strong> - bez kterých byznys nefunguje!</p>
        
        <div class="bg-purple-50 border-2 border-purple-300 rounded-xl p-4 my-4">
          <p class="text-purple-900"><strong>💡 TIP</strong></p>
          <p class="text-sm text-gray-700 mt-2">Kdo vám může pomoct <strong>začít levněji</strong> nebo ušetřit čas?</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2 space-y-1">
            <li>Místo vlastní dodávky použijte Wolt (úspora investice)</li>
            <li>Místo vlastní účetní najměte účetní firmu (úspora mzdy)</li>
            <li>Zaměřte se na to co umíte nejlépe, zbytek nechte na partnerech</li>
          </ul>
        </div>
        
        <h4>Proč jsou partnerství důležitá?</h4>
        <ul class="no-bullet">
          <li>✅ <strong>Ušetříte investice</strong> externí spolupráce místo vlastnictví</li>
          <li>✅ <strong>Ušetříte čas</strong> zaměřte se na to co umíte nejlépe</li>
          <li>✅ <strong>Spolehlivost a kvalita</strong> partner má know-how a dodává včas</li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ: Logika barev!</h4>
        <p><strong>🌐 VĚTŠINOU GLOBÁLNÍ!</strong> Partneři jsou sdílení pro celý byznys (dodavatelé surovin, účetní...).</p>
        <p class="text-sm text-gray-600 mt-2">💡 Pouze <strong>výjimečně</strong> může být partner specifický pro jeden segment (např. influencer marketing pouze pro mladé ženy).</p>
      `,
      examples: {
        good: [
          "🍕 Pizzerie (🌐): Dodavatel mouky a sýrů, účetní firma",
          "🔧 Autoservis (🌐): Velkoobchod s autodíly, pojišťovna",
          "👗 E-shop (🌐): Výrobce oblečení v Turecku, PPL doprava",
          "💇 Kadeřnice (🌐): Dodavatel kosmetiky, daňový poradce"
        ],
        bad: [
          "Dodavatelé",
          "Spolupracující firmy",
          "Business partneři",
          "Subdodavatelé"
        ]
      },
      tips: [
        "🌐 VĚTŠINOU GLOBÁLNÍ! Dodavatelé surovin, účetní, doprava...",
        "💡 Partner = SPOLEHLIVOST + KVALITA (dodává včas, stojí na nich byznys)",
        "🚀 Kdo vám může pomoct začít levněji? Externí spolupráce > vlastnictví!",
        "🔧 Partner může nahradit investici! (Wolt rozvoz vs. vlastní dodávka)"
      ]
    },
    {
      id: 9,
      title: "Struktura nákladů",
      canvasSection: "costs",
      videoUrl: "",
      description: "Kolik vás to stojí?",
      content: `
        <h3>💸 Co je Struktura nákladů?</h3>
        <p><strong>Náklady</strong> jsou peníze které <strong>MUSÍTE platit</strong>, aby byznys fungoval. <strong>Kolik vás to stojí měsíčně?</strong></p>
        
        <h4>⚡ PROČ JE TO KLÍČOVÉ?</h4>
        <p><strong>Náklady určují kolik musíte vydělat</strong> aby byl byznys ziskový! Pokud máte náklady 50 000 Kč/měsíc, musíte vydělat víc než 50 000 Kč aby byl byznys v zisku.</p>
        
        <h4>🎯 Jak spočítat náklady (krok za krokem):</h4>
        
        <p><strong>KROK 1: Co MUSÍTE platit?</strong></p>
        <p class="text-sm text-gray-600 ml-4">Jaké výdaje máte každý měsíc?</p>
        
        <p class="mt-3"><strong>KROK 2: Máte už data?</strong></p>
        
        <div class="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 my-4">
          <p class="text-blue-900"><strong>✅ MÁM DATA</strong> (už prodávám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Podívejte se na <strong>reálná čísla z posledního měsíce</strong></li>
            <li>Sečtěte VŠECHNY výdaje (nájem, mzdy, suroviny, energie)</li>
            <li>Příklad: "Nájem 25k + Mzdy 40k + Suroviny 15k = 80 000 Kč/měsíc"</li>
          </ul>
        </div>
        
        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 my-4">
          <p class="text-amber-900"><strong>🚀 NEMÁM DATA</strong> (teprve začínám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li><strong>Odhady:</strong> Co budete muset platit minimálně?</li>
            <li>Googlujte průměrné ceny, ptejte se dodavatelů na ceníky</li>
            <li>Příklad: "Odhad: Pronájem 20k + Suroviny 10k = 30 000 Kč/měsíc"</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 3: Rozdělte na GLOBÁLNÍ vs. SPECIFICKÉ</strong></p>
        
        <div class="bg-white border-2 border-gray-300 rounded-xl p-4 my-4">
          <p><strong>🌐 GLOBÁLNÍ náklady</strong> (pro celý byznys):</p>
          <ul class="text-sm text-gray-700 ml-4 mt-1">
            <li>Nájem, mzdy, suroviny, energie (sdílené pro všechny segmenty)</li>
            <li>Příklad: "Nájem 25k, Mzdy 40k, Suroviny 15k"</li>
          </ul>
        </div>
        
        <div class="bg-white border-2 border-purple-300 rounded-xl p-4 my-4">
          <p><strong>🎨 SPECIFICKÉ náklady</strong> (jen pro jeden segment):</p>
          <ul class="text-sm text-gray-700 ml-4 mt-1">
            <li>Reklama, marketing specifický pro segment - <strong>použijte barvu segmentu!</strong></li>
            <li>Příklad: "🔵 Instagram reklama pro rodiny 2 000 Kč"</li>
          </ul>
        </div>
        
        <div class="bg-purple-50 border-2 border-purple-300 rounded-xl p-4 my-4">
          <p class="text-purple-900"><strong>💡 TIP</strong></p>
          <p class="text-sm text-gray-700 mt-2"><strong>Už podnikám:</strong> Použijte reálná čísla z posledního měsíce! Sečtěte VŠECHNY výdaje.</p>
          <p class="text-sm text-gray-700 mt-2"><strong>Začínám:</strong> Googlujte průměrné ceny, ptejte se dodavatelů na ceníky. Později upravíte podle reality.</p>
        </div>
        
        <h4>Proč jsou náklady důležité?</h4>
        <ul>
          <li>✅ <strong>Víte kolik musíte vydělat</strong> aby byl byznys ziskový</li>
          <li>✅ <strong>Vidíte kde ušetřit</strong> můžete optimalizovat nejvyšší náklady</li>
          <li>✅ <strong>Plánujete cashflow</strong> víte kolik peněz potřebujete měsíčně</li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ: Logika barev!</h4>
        <p><strong>🌐 VĚTŠINOU GLOBÁLNÍ!</strong> Nájem, mzdy, suroviny = pro celý byznys.</p>
        <p><strong>🎨 Specifické náklady = barva segmentu!</strong></p>
        <ul class="no-bullet">
          <li><strong>🌐 Globální:</strong> Nájem 25k, Mzdy 40k, Suroviny 15k</li>
          <li><strong>🔵 Modrý segment</strong> (Rodiny) → <strong>🔵 modrý náklad</strong> (Instagram reklama 2 000 Kč)</li>
          <li><strong>🟢 Zelený segment</strong> (Studenti) → <strong>🟢 zelený náklad</strong> (TikTok reklama 1 500 Kč)</li>
        </ul>
      `,
      examples: {
        good: [
          "🍕 Pizzerie: 🌐 Nájem 25k, 🌐 Mzdy 40k, 🌐 Suroviny 15k, 🔵 IG reklama 2k",
          "🔧 Autoservis: 🌐 Nájem dílny 30k, 🌐 Mzdy 50k, 🌐 Autodíly 20k",
          "👗 E-shop: 🌐 Doprava 10k, 🌐 Skladování 5k, 🟡 Instagram ads 15k",
          "💇 Kadeřnice: 🌐 Nájem salonu 20k, 🌐 Přípravky 8k, 🌐 Energie 3k"
        ],
        bad: [
          "Provozní náklady",
          "Výdaje",
          "Investice",
          "Náklady na podnikání"
        ]
      },
      tips: [
        "🌐 VĚTŠINOU GLOBÁLNÍ! Nájem, mzdy, suroviny = pro celý byznys",
        "🎨 Specifické náklady = barva segmentu (🔵 IG reklama jen pro rodiny)",
        "💰 ZADEJTE ČÍSLO! Měsíční částka v Kč (např. Nájem 25 000 Kč)",
        "🚀 Začínající: Odhady OK! Googlujte ceny, ptejte se dodavatelů",
        "💰 Už podnikám: Reálná čísla z posledního měsíce - sečtěte VŠECHNY výdaje"
      ]
    }
  ]
};

// 📗 MODUL 2: Vylepšení modelu (4 lekce)  
export const MODULE_2 = {
  id: 2,
  title: "Vylepšení byznys modelu",
  description: "Naučte se vylepšit a optimalizovat váš Business Model Canvas",
  lessons: [
    {
      id: 10,
      title: "Pravidla dobrého modelu",
      canvasSection: undefined, // Celkový přehled
      videoUrl: "",
      description: "Zkontrolujte si, že váš model splňuje všechna pravidla",
      content: `
        <h3>Pravidla dobrého Business Model Canvas</h3>
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
        <p>Kalkulačka níže použije data z vašeho Canvasu a pomůže vám spočítat:</p>
        <ul class="no-bullet">
          <li>💵 <strong>Celkovou bilanci</strong> - příjmy vs. náklady</li>
          <li>📊 <strong>Bod zvratu (break-even)</strong> - kolik potřebujete zákazníků</li>
          <li>🎯 <strong>Ziskovost po segmentech</strong> - který segment vydělává nejvíc</li>
          <li>🚀 <strong>Scénáře růstu</strong> - co když přidáte +10, +25 nebo +50 zákazníků?</li>
        </ul>
      `,
      tips: [
        "📊 Zadejte kolik máte zákazníků a uvidíte celou finanční analýzu",
        "🎯 Zaměřte se na ziskové segmenty a škálujte je",
        "💡 TOP zdroje příjmů = tam investujte energii!"
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

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * 🎯 ORGANIC POSTS - 30 DNÍ SÉRIE
 * 
 * CLEAN verze - JEN posty co skutečně používáme:
 * - Post #1: Kdo je tvůj zákazník (static, pain+sol)
 * - Post #2: Animovaný BMC Model (animated, pain+sol)
 * - Post #3: Kalkulačka cíle (animated, pain+sol)
 * - Post #4: Proč vznikla Čtvrtka (behind-the-scenes)
 * - Post #5: Žádné guessing (Data-driven)
 * - Post #6: FAQ - Nejčastější otázky (static)
 * - Post #7: Case Study - Markéta a kavárna (static, storytelling)
 * - Post #8: Model vs Nápad (animated, split-screen)
 * - Post #9: Náklady odkládání (animated, cost of inaction)
 * - Post #10: Od nápadu k plánu (animated, carousel)
 * - Post #11: Víc zákazníků = menší peníze (animated, counterintuitive)
 * - Post #12: Nástroj - Velikost segmentu (animated, průzkum trhu + 3-5% realita)
 * - Post #13: ANTI-GURU (animated, proč nejsme jako ostatní kurzy)
 * - Post #14: CO NEMUSÍŠ (animated, nepodstatné vs podstatné)
 * - Post #15: KONKRÉTNÍ OUTCOME (animated, stack reveal - co všechno dostaneš)
 * - Post #16: MECHANISM (static, 4 karty - proč to funguje)
 * 
 * 📝 TODO - Připravené nápady:
 * - Post #17: MYTH BUSTER (static, karty - co NEPOTŘEBUJEŠ k úspěchu)
 * - Post #18: SIMPLICITY (Proč je to jednoduché)
 * - Post #19: COST/VALUE (Cena vs. hodnota, ušetřené tisíce)
 */

interface PostData {
  id: number;
  type: 'static' | 'animated';
  format: '1:1' | '4:5';
  title: string;
  copy: string;
}

const POSTS: PostData[] = [
  {
    id: 1,
    type: 'static',
    format: '1:1',
    title: 'Post #1: Kdo je tvůj zákazník?',
    copy: `Proč většina začínajících podnikatelů skončí ten samý rok?

━━━━━━━━━━━━━━━━━━━━━━━

❌ NEVÍ KDO je jejich zákazník.
❌ NEVÍ KDE ho najít.
❌ NEVÍ CO mu nabídnout.

━━━━━━━━━━━━━━━━━━━━━━━

Narozdíl od guru, co jen mluví...

✅ VEDEME TĚ KROK ZA KROKEM

Vyplníš si to SAM.
Pro TVÉ podnikání.
S DATY, ne domněnkami.

━━━━━━━━━━━━━━━━━━━━━━━

Ať máš kavárnu, e-shop nebo služby:

➡️ FIT VALIDTOR tě provede systematicky
➡️ Zjistíš PŘESNĚ komu prodáváš
➡️ Ověříš si to PŘED investicí

━━━━━━━━━━━━━━━━━━━━━━━

Žádné guessing.
Žádné bláboly.
REÁLNÁ VALIDACE.

👉 www.podnikatelskactvrtka.cz

#podnikani #zakaznik #validace #data`
  },
  {
    id: 2,
    type: 'animated',
    format: '1:1',
    title: 'Post #2: Model podnikání (BMC)',
    copy: `Znáš to:

❌ Nevíš kde začít
❌ Nechceš dalších 50 hodin videí
❌ Potřebuješ ŽIVÝ nástroj

━━━━━━━━━━━━━━━━━━━━━━━

✅ Model podnikání co ROSTE s tebou

Není to kurz co zahodíš.
Je to NÁSTROJ co používáš POŘÁD.

━━━━━━━━━━━━━━━━━━━━━━━

90 minut • Vyplníš si to SAM • Pracuješ s tím ROKY

👉 www.podnikatelskactvrtka.cz

#modelpodnikani #strategie #podnikani`
  },
  {
    id: 3,
    type: 'animated',
    format: '1:1',
    title: 'Post #3: Kalkulačka cíle',
    copy: `Zeptej se podnikatele:

"Kolik zákazníků měsíčně potřebuješ?"

━━━━━━━━━━━━━━━━━━━━━━━

95 % odpoví:

❌ "No... hodně" 🤷
❌ "Čím víc tím líp"
❌ "To nevím přesně"

━━━━━━━━━━━━━━━━━━━━━━━

Proč to nevdí?

→ Nemají čas to spočítat
→ Nechtějí tahat excely
→ Neví kde přesně hledat jak na to

━━━━━━━━━━━━━━━━━━━━━━━

A pak:

💸 Utrácejí slepo za reklamu
🎯 Nevědí jestli to stačí
📊 Nemají jasný cíl

━━━━━━━━━━━━━━━━━━━━━━━

Kalkulačka cíle v Podnikatelské Čtvrtce:

✅ Pár kliknutí
✅ Vyplníš za minutu
✅ Máš přesné číslo

━━━━━━━━━━━━━━━━━━━━━━━

Teď víš:

→ Kolik lidí musí projít dveřmi
→ Jestli má smysl investovat do reklamy
→ Jestli je lokace dobrá
→ Jestli ti vůbec může vyjít byznys

━━━━━━━━━━━━━━━━━━━━━━━

Kalkulačka cíle = jeden z mnoha užitečných nástrojů v Podnikatelské Čtvrtce.

Všechno pod jednou střechou.
90 minut • Praktické nástroje • Tvoje čísla

👉 www.podnikatelskactvrtka.cz

#podnikani #kalkulace #strategie #cile`
  },
  {
    id: 4,
    type: 'static',
    format: '1:1',
    title: 'Post #4: Proč vznikla Čtvrtka (behind-the-scenes)',
    copy: `Proč vznikla Podnikatelská čtvrtka?

━━━━━━━━━━━━━━━━━━━━━━━

Vždycky mě fascinovalo, že byznys jde neustále zlepšovat. Můžeš tam vydat svoji kreativitu, odlišit se, posunout se dál.

Začal jsem pozorovat podniky kolem sebe. Jednou tam bylo tohle, za půl roku tohle... a nakonec skončily.

━━━━━━━━━━━━━━━━━━━━━━━

Obdivoval jsem ty lidi. Šli proti proudu. Chtěli vybudovat něco svého. Něco, co je bavilo, naplňovalo, v čem byli dobří.

Pak jsem zjistil tu krutou statistiku:

⚠️ Víc než polovina podnikatelů končí ten samý rok.

A víš proč?

Kvůli kravině. Nemají efektivní plán.

━━━━━━━━━━━━━━━━━━━━━━━

Místo toho:
💸 Bezhlavě investují statisíce do nájmů
🏢 Řeší prostory ještě před tím, než vědí CO prodávat
📦 Sháněj produkty, zaměstnance...
😰 A pak teprve zjistí, že o to nikdo nestojí

━━━━━━━━━━━━━━━━━━━━━━━

Frustrovalo mě to.

━━━━━━━━━━━━━━━━━━━━━━━

A přišlo mi absurdní, že tady máme spoustu gigantů, velký poradenský firmy...

Ale pro lidi, co prostě jen chtějí dělat to, co je baví?

Pro ně tu nebylo nic.

━━━━━━━━━━━━━━━━━━━━━━���

Proto vznikla Podnikatelská čtvrtka.

90 minut. 4.999 Kč. Jasný plán ještě před investicí.

Aby ti lidi, co jdou proti proudu, nemuseli končit kvůli kravině.

👉 www.podnikatelskactvrtka.cz

#podnikani #pribeh #startupstory #podnikatelskactvrtka`
  },
  {
    id: 5,
    type: 'animated',
    format: '1:1',
    title: 'Post #5: Žádné guessing (Data-driven)',
    copy: `"Doufám, že to vyjde..." 🤞

━━━━━━━━━━━━━━━━━━━━━━━

Takto začíná 90 % podnikatelů.

A pak:
💸 Investují statisíce do prostoru
🏢 Podepíšou nájem na 3 roky
😰 Zjistí že o to nikdo nestojí

━━━━━━━━━━━━━━━━━━━━━━━

PROČ?

Protože DOUFAJÍ místo aby VĚDĚLI.

━━━━━━━━━━━━━━━━━━━━━━━

Co kdyby sis to mohl ověřit PŘEDEM?

━━━━━━━━━━━━━━━━━━━━━━━

Za 90 minut zjistíš:

📊 Kolik zákazníků PŘESNĚ potřebuješ
💰 Jestli je model ziskový nebo ztrátový
🎯 Kdo jsou tvoji zákazníci (konkrétně)
📍 Kde je najdeš a jak oslovíš
✅ Jestli má smysl vůbec pokračovat

━━━━━━━━━━━━━━━━━━━━━━━

Žádné "doufání"
Žádné "snad to vyjde"
Žádné "uvidíme"

VÍŠ. PŘEDEM. S DATY.

━━━��━━━━━━━━━━━━━━━━━━━

Ověř si nápad ještě PŘED tím, než investuješ statisíce.

90 minut • 4.999 Kč • Tvoje čísla

👉 www.podnikatelskactvrtka.cz

#podnikani #data #validace #zadneguessing`
  },
  {
    id: 6,
    type: 'static',
    format: '1:1',
    title: 'Post #6: FAQ - Nejčastější otázky',
    copy: `Nejčastější otázky o Podnikatelské Čtvrtce:

━━━━━━━━━━━━━━━━━━━━━━━

❓ "Musím mít hotový nápad?"

✅ Ne! Projdeme si možnosti společně. Můžeš přijít s "chci něco svého" a najdeme směr.

━━━━━━━━━━━━━━━━━━━━━━━

❓ "Je to pro mě i když nemám zkušenosti?"

✅ Ano. Stačí být podnikatel se zapálením zlepšit svůj byznys. Systém tě provede krok za krokem.

━━━━━━━━━━━━━━━━━━━━━━━

❓ "Co když zjistím, že mé podnikání je ztrátové?"

✅ Nevadí! Máme přímo lekci na řešení těchto situací. Naučíš se co upravit, aby to fungovalo.

━━━━━━━━━━━━━━━━━━━━━━━

❓ "Kolik to zabere času?"

✅ 90 minut. Pak máš živý model, ke kterému se vracíš a upravuješ ho jak rosteš.

━━━━━━━━━━━━━━━━━━━━━━━

❓ "Potřebuji k tomu něco dalšího?"

✅ Ne. Dostaneš přístup a vše máš na jednom místě - nástroje, know-how, kurz. Hotovo.

━━━━━━━━━━━━━━━━━━━━━━━

Další otázky? Napiš mi do DM 💬

90 minut • Jasné odpovědi • Tvůj plán

👉 www.podnikatelskactvrtka.cz

#podnikani #faq #otazky #validace`
  },
  {
    id: 7,
    type: 'static',
    format: '1:1',
    title: 'Post #7: Case Study - Markéta a kavárna',
    copy: `Většina lidí začne podnikat a pak zjišťuje co funguje.

Markéta to udělala obráceně.

━━━━━━━━━━━━━━━━━━━━━━━

90 minut ve Čtvrtce jí ukázalo PŘESNĚ:

💰 3 zdroje příjmů místo jednoho
→ Káva + snídaně + coworking prostor večer
→ Rozložené riziko (když nejde jedno, jdou ostatní)

🎯 Kam investovat (a kam NE)
→ Drahá kavová zrna? ANO (to je její diferenciace)
→ Fancy nábytek? NE (začne s IKEA, upgrade již později)

📍 Kde najít první zákazníky BEZ reklamy
→ Lokální FB skupiny freelancerů
→ Spolupráce s coworkingem 2 bloky dál
→ Partnerství s dětskou hernou

🚨 Jaká jsou rizika a jak je řešit
→ Co když je tam už jiná kavárna? → Má jasné zaměření: "Pro freelancery s WiFi"
→ Co když o ní nikdo neví? → Shání zákazníky 2 měsíce PŘEDEM (Instagram + firmy)

━━━━━━━━━━━━━━━━━━━━━━━

To všechno zjistila ZA 90 MINUT.

Než investovala 800k.
Než podepsala nájem na 3 roky.
Než riskovala všechno.

━━━━━━━━━━━━━━━━━━━━━━━

Teď má plán. Ne naději.

━━━━━━━━━━━━━━━━━━━━━━━

A ty?

Ověř si nápad PŘED tím, než investuješ statisíce.

90 minut • Tvoje čísla • Jasný plán

👉 www.podnikatelskactvrtka.cz

#podnikani #casestudy #kavarna #validace`
  },
  {
    id: 8,
    type: 'animated',
    format: '1:1',
    title: 'Post #8: Model vs Nápad (Split screen)',
    copy: `Tohle ukazuju každému klientovi první den. 📋

Dva podnikatelé.
Stejný start.
Stejný produkt.
Stejné peníze. 💰

Za 6 měsíců:

━━━━━━━━━━━━━━━━━━━━━━━

❌ První: Zavírám. Zpátky do práce. 😞
✅ Druhý: Najímám člověka. Škáluju. 🚀

━━━━━━━━━━━━━━━━━━━━━━━

Rozdíl není v množství práce. 💪
Rozdíl není v talentu. 🧠

Rozdíl je v Modelu. ✨

━━━━━━━━━━━━━━━━━━━━━━━

První střílí od boku. 🎲
Druhý ví přesně co testuje a proč. 🎯

První investuje "snad to zabere". 🤞
Druhý investuje kde ví že funguje. 💡

První se diví proč selhal. ❓
Druhý ví proč roste. 📈

━━━━━━━━━━━━━━━━━━━━━━━

To je Model podnikání.

A bez něj můžeš makat 12h denně - stejně skončíš vlevo. ⏰

━━━━━━━━━━━━━━━━━━━━━━━

Postav si Model za 90 minut. 👇

👉 www.podnikatelskactvrtka.cz

#modelpodnikani #podnikani #strategie #validace

#podnikani #modelPodnikani #strategie #napadVsModel`
  },
  {
    id: 9,
    type: 'animated',
    format: '1:1',
    title: 'Post #9: Náklady odkládání (Cost of inaction)',
    copy: `Kolik tě stojí jeden měsíc bez plánu? 💸

━━━━━━━━━━━━━━━━━━━━━━━

Říkáš si: "Ještě to promyslím."
"Ještě počkám."
"Není tak zle."

━━━━━━━━━━━━━━━━━━━━━━━

Ale zatímco odkládáš:

💼 Makáš víc a víc
   → Ale peníze nepřibývají

⏰ Trávíš čas na špatných věcech
   → 160h měsíčně bez jasného směru

😰 Čekáš že se to zlomí
   → Ale nic se nemění

━━━━━━━━━━━━━━━━━━━━━━━

JEDEN MĚSÍC ODKLÁDÁNÍ:

❌ 160h práce bez výsledků
❌ Ztracené potenciální zisky
❌ Stále stejný chaos
❌ Stále stejný stres

━━━━━━━━━━━━━━━━━━━━━━━

Co kdyby sis dal jasno JIŽ DNES?

✅ 90 minut
✅ Model na roky
✅ Víš přesně KAM investovat
✅ Víš přesně CO dělat

━━━━━━━━━━━━━━━━━━━━━━━

Za měsíc budeš stejně říkat:
"Už jsem to měl mít dávno hotovo."

Nebo budeš říkat:
"Nejlepší investice do byznysu." ✨

━━━━━━━━━━━━━━━━━━━━━━━

90 minut • 4.999 Kč • Jasný plán

👉 www.podnikatelskactvrtka.cz

#podnikani #plan #strategie #naklady #odkládání`
  },
  {
    id: 10,
    type: 'animated',
    format: '1:1',
    title: 'Post #10: Od nápadu k plánu (CourseV3 carousel)',
    copy: `Než spustíš byznys, zkontroluj si to ⚠️

━━━━━━━━━━━━━━━━━━━━━━━

✓ VALIDÁTOR

Otestuj si tvůj model podnikání:
✅ Jestli to sedí
✅ Kde jsou slabá místa
✅ Co opravit před startem

━━━━━━━━━━━━━━━━━━━━━━━

⚠️ 90% podnikatelů začne bez plánu.

Jen s nápadem v hlavě.
A pak se diví, proč zbytečně krachují.

Ty to můžeš udělat jinak.
S jasným plánem.

━━━━━━━━━━━━━━━━━━━━━━━

👉 CHCI JASNÝ PLÁN

www.podnikatelskactvrtka.cz

#podnikani #plan #validator #napad #uspech`
  },
  {
    id: 11,
    type: 'animated',
    format: '1:1',
    title: 'Post #11: Víc zákazníků = menší peníze? (Counterintuitive)',
    copy: `Proč víc zákazníků = menší peníze? 💸

━━━━━━━━━━━━━━━━━━━━━━━

❌ SCÉNÁŘ A: "Chci všechny"

→ 60 zákazníků (prodáváš všem levně)
→ 70 hodin týdně (makáš jako kůň)
→ 25 000 Kč (marže 12% = skoro nic)

Výsledek: Vyhoření + minimum peněz

━━━━━━━━━━━━━━━━━━━━━━━

✅ SCÉNÁŘ B: "Vím KOHO chci"

→ 20 zákazníků (správní lidé, správná cena)
→ 30 hodin týdně (máš čas žít)
→ 60 000 Kč (marže 45% = luxus)

Výsledek: Svoboda + velké peníze

━━━━━━━━━━━━━━━━━━━━━━━

🎯 Míň zákazníků = víc peněz + víc času

Problém není v počtu zákazníků...
Problém je, že nevíš NA KOHO se zaměřit.

━━━━━━━━━━━━━━━━━━━━━━━

Podnikatelská Čtvrtka ti ukáže:
→ Kdo jsou tví praví zákazníci
→ Proč ti zaplatí víc
→ Jak na ně cílit

90 minut • 4.999 Kč • jasno v byznysu

👉 www.podnikatelskactvrtka.cz

#podnikani #zamereni #strategie #marze`
  },
  {
    id: 12,
    type: 'animated',
    format: '1:1',
    title: 'Post #12: Nástroj - Velikost segmentu',
    copy: `"Je tam krajské město tam bude dostatečná kupní síla!"

Skvělé.

ALE...

To NEZNAMENÁ zaručený úspěch!

━━━━━━━━━━━━━━━━━━━━━━━

Většina podnikatelů:

❌ Vidí velké město = úspěch
❌ "Tam je dost lidí!"
❌ Skočí do toho
❌ Investuje peníze
❌ A pak se diví: "Proč to nefunguje?"

━━━━━━━━━━━━━━━━━━━━━━━

Protože si neověří reálné data!

━━━━━━━━━━━━━━━━━━━━━━━

REALITA:

❌ 12.000 lidí v segmentu
✅ 360 připravených koupit

To je ROZDÍL mezi hádáním a daty.

━━━━━━━━━━━━━━━━━━━━━━━

PŘÍKLAD:

Tvůj cíl: 50.000 Kč měsíčně
Produkt: 2.000 Kč
Potřebuješ: 25 zákazníků

Segment: 8.000 lidí
Reálně: 240-400 kupců (3-5%)

✅ JE TAM POTENCIÁL → GO!

━━━━━━━━━━━━━━━━━━━━━━━

Na Podnikatelské Čtvrtce se naučíš:

→ Jak zjistit velikost segmentu
→ Jak spočítat reálné %
→ Jestli tam je dost velký trh PRO TVŮJ BYZNYS

━━━━━━━━━━━━━━━━━━━━━━━

90 minut • Data, ne dojmy

👉 www.podnikatelskactvrtka.cz

#podnikani #segment #data #validace`
  },
  {
    id: 13,
    type: 'animated',
    format: '1:1',
    title: 'Post #13: ANTI-GURU',
    copy: `Znáš to:

"Začni podnikat! Budeš bohatý!"
"Musíš být na sociálních sítích!"
"Instagram je základ!"

━━━━━━━━━━━━━━━━━━━━━━━

Všechno jsou to obecné rady.

A problém je...

...že TVŮJ byznys není obecný.

━━━━━━━━━━━━━━━━━━━━━━━

Každý byznys je jiný:

→ Jiný zákazník
→ Jiný problém
→ Jiná cena
→ Jiná strategie

━━━━━━━━━━━━━━━━━━━━━━━

Co funguje pro někoho,
nemusí fungovat pro TEBE.

Proto "Jdi do toho!" nestačí.

━━━━━━━━━━━━━━━━━━━━━━━

Potřebuješ vědět:

"Funguje to konkrétně U MĚ?"

Ne obecně.
Ne u ostatních.
U TEBE.

━━━━━━━━━━━━━━━━━━━━━━━

A to zjistíš za 90 minut:

✅ Jestli existuje TVOJE cílovka
✅ Jestli jich je DOST na zisk
✅ Co TVOJI zákazníci potřebují nejvíc

━━━━━━━━━━━━━━━━━━━━━━━

Ne kurz o podnikání obecně.

Ale odpovědi o TVÉM byznysu konkrétně.

━━━━━━━━━━━━━━━━━━━━━━━

Protože rozdíl mezi:

"Vím rady o podnikání"
a
"Vím jak MŮJBYZNYS zpeněžit"

...je obrovský.

━━━━━━━━━━━━━━━━━━━━━━━

90 minut • Tvůj byznys • Konkrétní odpovědi

👉 www.podnikatelskactvrtka.cz

#podnikani #validace #antiGuru #konkretne`
  },
  {
    id: 14,
    type: 'animated',
    format: '1:1',
    title: 'Post #14: CO NEMUSÍŠ',
    copy: `Vidím to pořád dokola.

Podnikatel stráví měsíce laděním webu.
Investuje do loga, vizuálů, nástrojů.
Studuje "jak na marketing".

Pak to spustí.

A čeká.

━━━━━━━━━━━━━━━━━━━━━━━

Protože celou dobu řešil NEPODSTATNÉ věci.

Web? Ten potřebuješ až KDYŽ víš, že to někdo chce.
Logo? Až KDYŽ máš zákazníky.
Nástroje? Až KDYŽ máš co prodávat.

━━━━━━━━━━━━━━━━━━━━━━━

PODSTATNÉ je jenom jedno:

Chce to někdo?
Za kolik?

━━━━━━━━━━━━━━━━━━━━━━━

Kdyby tohle vyřešil PRVNÍ, ušetřil by:

→ Desítky tisíc za předčasné investice
→ Měsíce ztracenýho času
→ Frustraci z toho, že "to nefunguje"

━━━━━━━━━━━━━━━━━━━━━━━

Na Podnikatelské Čtvrtce ti ukážu, jak se zaměřit na to PODSTATNÉ.

90 minut • 0 zbytečných investic

👉 www.podnikatelskactvrtka.cz

#podnikani #validace #efektivita #priorita`
  },
  {
    id: 15,
    type: 'animated',
    format: '1:1',
    title: 'Post #15: KONKRÉTNÍ OUTCOME (Stack Reveal)',
    copy: `Podnikatelská Čtvrtka není "kurz".

Je to ZÁKLAD pro celej tvůj byznys.

━━━━━━━━━━━━━━━━━━━━━━━

Protože většina kurzů:

→ Naučí tě teorie
→ Dají ti šablonu
→ A pak zmizí

━━━━━━━━━━━━━━━━━━━━━━━

Tady dostaneš:

✅ Model TVÉHO podnikání (ne šablonu)
✅ Validaci TVÉHO trhu (ne "rady")
✅ Cenovou strategii PRO TEBE (ne vzorec)
✅ Plán na 90 dní (jasné kroky)
✅ Komunitní podporu (i po kurzu)
✅ Live konzultace (když si nevíš rady)

━━━━━━━━━━━━━━━━━━━━━━━

To není "projdeš kurz a čau".

To je základ na roky.

━━━━━━━━━━━━━━━━━━━━━━━

90 minut • 4.999 Kč • Základ na roky

👉 www.podnikatelskactvrtka.cz

#podnikani #plan #komunita #podpora`
  },
  {
    id: 16,
    type: 'static',
    format: '1:1',
    title: 'Post #16: MECHANISM (Proč to funguje)',
    copy: `❓ "Není to moc jednoduché na to, aby to fungovalo?"

━━━━━━━━━━━━━━━━━━━━━━━

Tohle slyším často.
A chápu to.

90 minut zní podezřele rychle.

━━━━━━━━━━━━━━━━━━━━━━━

Ale tady je PROČ to funguje:

━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ POZICOVÁNÍ ZABUDOVANÉ

Neříkáš jen "co prodávám".
Říkáš "PROČ si mě vybrat místo konkurence".

→ Vidíš jak se odlišit.

━━━━━━━━━━━━━━━━━━━━━━━

2️⃣ MARKETING JE TAM UŽ

Když víš CO tvůj segment chce...
...víš PŘESNĚ co jim říct v marketingu.

→ Není to extra práce. Je to výsledek modelu.

━━━━━━━━━━━━━━━━━━━━━━━

3️⃣ OVĚŘENÉ NA PRAXI

Není to školská teorie.
Je to splácané z reálných byznysů.

→ 27 podnikatelů. 1,4M Kč investic.

━━━━━━━━━━━━━━━━━━━━━━━

4️⃣ JEN TO PODSTATNÉ

Ne 50 stránek teorie.
Jen 9 polí co DOOPRAVDY potřebuješ.

→ Konkrétní. Použitelné. TEĎKA.

━━━━━━━━━━━━━━━━━━━━━━━

Model není zjednodušení.

Je to DESTILACE.

Všechno podstatné. Nic zbytečného.

━━━━━━━━━━━━━━━━━━━━━━━

Podnikatelská Čtvrtka
90 minut • Konkrétní výsledek

👉 www.podnikatelskactvrtka.cz

#podnikani #model #marketing #validace`
  }
];

// Container pro 1080x1080 nebo 1080x1350
function PostContainer({ children, format, id, title }: { children: React.ReactNode; format: '1:1' | '4:5'; id?: number; title?: string }) {
  return (
    <div 
      className="mx-auto bg-white shadow-2xl overflow-hidden"
      style={{
        width: '1080px',
        height: format === '1:1' ? '1080px' : '1350px'
      }}
    >
      {children}
    </div>
  );
}

// Post #1: Static (Kdo je tvůj zákazník)
function Post1Static() {
  return (
    <PostContainer format="1:1">
      <div className="h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center p-12 relative overflow-hidden">
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 text-9xl">🎯</div>
          <div className="absolute bottom-20 right-20 text-9xl">❓</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-5">👥</div>
        </div>

        <div className="relative z-10 bg-white/95 backdrop-blur rounded-3xl p-16 shadow-2xl max-w-4xl w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="text-5xl font-bold text-red-600">
              Proč většina začínajících podnikatelů
            </div>
            <div className="text-4xl text-slate-700">
              skončí ten samý rok? 😰
            </div>
          </div>

          {/* Problems */}
          <div className="space-y-4 text-3xl">
            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl">
              <span className="text-4xl">❌</span>
              <div className="flex-1">
                <span className="font-bold text-red-600">NEVÍ KDO</span>
                <span className="text-slate-700"> je jejich zákazník</span>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl">
              <span className="text-4xl">❌</span>
              <div className="flex-1">
                <span className="font-bold text-red-600">NEVÍ KDE</span>
                <span className="text-slate-700"> ho najít</span>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl">
              <span className="text-4xl">❌</span>
              <div className="flex-1">
                <span className="font-bold text-red-600">NEVÍ CO</span>
                <span className="text-slate-700"> mu nabídnout</span>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t-4 border-purple-200 my-6"></div>

          {/* Solution intro */}
          <div className="text-center space-y-4">
            <div className="text-2xl text-slate-600">
              Narozdíl od guru, co jen mluví...
            </div>
            <div className="text-4xl font-bold text-green-600">
              ✅ VEDEME TĚ KROK ZA KROKEM
            </div>
            <div className="space-y-2 text-2xl text-slate-700">
              <div>Vyplníš si to <span className="font-bold text-purple-600">SAM</span></div>
              <div>Pro <span className="font-bold text-purple-600">TVÉ</span> podnikání</div>
              <div>S <span className="font-bold text-purple-600">DATY</span>, ne domněnkami</div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t-4 border-purple-200 my-6"></div>

          {/* Features */}
          <div className="text-center space-y-3">
            <div className="text-2xl text-slate-600 mb-4">
              Ať máš kavárnu, e-shop nebo služby:
            </div>
            <div className="space-y-3 text-2xl">
              <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl">
                <span className="text-3xl">➡️</span>
                <div className="flex-1 text-left">
                  <span className="font-bold text-blue-600">FIT VALIDÁTOR</span>
                  <span className="text-slate-700"> tě provede systematicky</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl">
                <span className="text-3xl">➡️</span>
                <div className="flex-1 text-left">
                  Zjistíš <span className="font-bold text-blue-600">PŘESNĚ</span>
                  <span className="text-slate-700"> komu prodáváš</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl">
                <span className="text-3xl">➡️</span>
                <div className="flex-1 text-left">
                  Ověříš si to <span className="font-bold text-blue-600">PŘED</span>
                  <span className="text-slate-700"> investicí</span>
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t-4 border-purple-200 my-6"></div>

          {/* Final message */}
          <div className="text-center space-y-4">
            <div className="space-y-2 text-3xl text-slate-700">
              <div>Žádné guessing.</div>
              <div>��ádné bláboly.</div>
              <div className="text-4xl font-bold text-purple-600">REÁLNÁ VALIDACE.</div>
            </div>
            <div className="text-3xl font-bold text-blue-600 pt-4">
              👉 www.podnikatelskactvrtka.cz
            </div>
          </div>
        </div>
      </div>
    </PostContainer>
  );
}

// Post #2: Animovaný BMC
function Post2AnimatedBMC() {
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const blocks = [
    { id: 'partners', label: 'Partneři', color: 'from-blue-500 to-blue-600', step: 2 },
    { id: 'activities', label: 'Aktivity', color: 'from-purple-500 to-purple-600', step: 2 },
    { id: 'resources', label: 'Zdroje', color: 'from-pink-500 to-pink-600', step: 2 },
    { id: 'value', label: 'Hodnotová\nnabídka', color: 'from-orange-500 to-orange-600', step: 1 },
    { id: 'relations', label: 'Vztahy se\nzákazníky', color: 'from-yellow-500 to-yellow-600', step: 3 },
    { id: 'channels', label: 'Kanály', color: 'from-green-500 to-green-600', step: 3 },
    { id: 'segments', label: 'Segmenty\nzákazníků', color: 'from-teal-500 to-teal-600', step: 1 },
    { id: 'costs', label: 'Náklady', color: 'from-red-500 to-red-600', step: 2 },
    { id: 'revenue', label: 'Příjmy', color: 'from-emerald-500 to-emerald-600', step: 3 },
  ];

  return (
    <PostContainer format="1:1">
      <div className="h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col p-6 relative overflow-hidden">
        {/* Header */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ 
              type: "spring",
              stiffness: 150,
              damping: 20
            }}
            className="text-center mb-6 relative z-10"
          >
            <div className="text-4xl font-bold text-white mb-2">
              {step === 0 && "😰 Znáš to?"}
              {step === 1 && "✅ VYPLŇUJEŠ model"}
              {step === 2 && "🔄 Je ŽIVÝ, roste s tebou"}
              {step === 3 && "🚀 Pracuješ s ním POŘÁD"}
            </div>
            <div className="text-xl text-slate-300">
              {step === 0 && "Frustrace každého podnikatele"}
              {step === 1 && "Přidáváš TVOJE data"}
              {step === 2 && "Upravuješ, zlepšuješ"}
              {step === 3 && "STRATEGIE co žije"}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* BMC Grid */}
        <div className="flex-1 grid grid-cols-3 gap-3 p-4">
          {blocks.map((block, index) => {
            const isVisible = step === 0 ? false : step >= block.step;
            
            return (
              <motion.div
                key={block.id}
                animate={{ 
                  opacity: isVisible ? 1 : (step === 0 ? 0.4 : 0.3),
                  scale: isVisible ? 1 : 0.98,
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  mass: 0.8,
                  delay: isVisible ? index * 0.05 : 0,
                }}
                className={`
                  rounded-2xl border-2 flex flex-col items-center justify-center text-center p-2
                  ${isVisible 
                    ? `bg-gradient-to-br ${block.color} border-white/30 shadow-lg` 
                    : 'bg-slate-800/60 border-slate-700'
                  }
                `}
              >
                {step === 0 ? (
                  <motion.div 
                    className="text-white text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="text-4xl mb-2">😰</div>
                    <div className="text-xl leading-tight whitespace-pre-line font-bold drop-shadow-lg">
                      {index === 0 && "Kde\nzačít?"}
                      {index === 1 && "Co mám\ndělat?"}
                      {index === 2 && "Jak na\nmarketing?"}
                      {index === 3 && "Všechno\nje složité"}
                      {index === 4 && "Nechci\ndalší videa"}
                      {index === 5 && "Hodiny\nstudování"}
                      {index === 6 && "Kde jsou\nzákazníci?"}
                      {index === 7 && "Nemám\nsystém"}
                      {index === 8 && "Co\nvůbec?"}
                    </div>
                  </motion.div>
                ) : isVisible ? (
                  <motion.div 
                    className="text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                  >
                    <div className="text-lg font-bold leading-tight whitespace-pre-line">
                      {block.label}
                    </div>
                    <div className="text-4xl mt-2">
                      ✓
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-slate-600 text-xs">
                    ...
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 relative z-10">
          <AnimatePresence mode="wait">
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="text-2xl font-bold text-green-400">
                  Model co s tebou ROSTE
                </div>
                <div className="text-xl text-white">
                  Živá STRATEGIE • Neustálý rozvoj
                </div>
                <div className="text-lg text-slate-300">
                  90 minut • Systém na roky
                </div>
                <div className="text-xl text-white font-bold mt-4">
                  👉 www.podnikatelskactvrtka.cz
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i === step ? 'bg-white scale-125' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </PostContainer>
  );
}

// Post #3: Kalkulačka cíle (animace)
function Post3Calculator() {
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <PostContainer format="1:1">
      <div className="h-full bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 flex flex-col items-center justify-center p-12 relative overflow-hidden">
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 text-9xl">📊</div>
          <div className="absolute bottom-20 right-20 text-9xl">💰</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-5">🎯</div>
        </div>

        <div className="relative z-10 bg-white/95 backdrop-blur rounded-3xl p-16 shadow-2xl max-w-4xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {step === 0 && (
                <div className="space-y-8">
                  <div className="text-5xl font-bold text-red-600">
                    95 % podnikatelů
                  </div>
                  <div className="text-3xl text-slate-700">
                    dělá byznys "od oka" 🙈
                  </div>
                  <div className="space-y-4 text-2xl text-slate-600">
                    <div>❌ Doufají, že to vyjde</div>
                    <div>❌ Nemají přesný cíl</div>
                    <div>❌ Neví KOLIK zákazníků potřebují</div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-8">
                  <div className="text-5xl font-bold text-green-600">
                    ✅ To se dá SPOČÍTAT!
                  </div>
                  <div className="text-3xl text-slate-700">
                    Příklad: Tvoje kavárna ☕
                  </div>
                  <div className="space-y-4 text-2xl text-slate-600">
                    <div className="flex items-center justify-between border-b-2 pb-2">
                      <span>Nájem + náklady:</span>
                      <span className="font-bold">50.000 Kč/měsíc</span>
                    </div>
                    <div className="flex items-center justify-between border-b-2 pb-2">
                      <span>Průměrný účet:</span>
                      <span className="font-bold">150 Kč</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div className="text-4xl font-bold text-purple-600">
                    Kolik zákazníků potřebuješ?
                  </div>
                  <div className="bg-slate-100 rounded-2xl p-8 space-y-4">
                    <div className="text-3xl text-center font-mono">
                      50.000 Kč ÷ 150 Kč
                    </div>
                    <div className="text-6xl text-center font-bold text-purple-600">
                      = 334
                    </div>
                    <div className="text-2xl text-center text-slate-600">
                      zákazníků měsíčně
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div className="text-5xl font-bold text-orange-600 text-center">
                    334 zákazníků/měsíc
                  </div>
                  <div className="text-3xl text-slate-700 text-center">
                    To znamená:
                  </div>
                  <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl p-8">
                    <div className="text-7xl font-bold text-center text-orange-600 mb-4">
                      11
                    </div>
                    <div className="text-3xl text-center text-slate-700">
                      zákazníků DENNĚ
                    </div>
                  </div>
                  <div className="text-2xl text-center text-green-600 font-bold">
                    Teď víš přesně KAM míříš!
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8 text-center">
                  <div className="text-4xl font-bold text-blue-600">
                    ⚡ Kalkulačka cíle
                  </div>
                  <div className="text-2xl text-slate-700">
                    je součást Podnikatelské Čtvrtky
                  </div>
                  <div className="space-y-3 text-xl text-slate-600">
                    <div>⏱️ 90 minut</div>
                    <div>🎯 Přesná čísla</div>
                    <div>💡 Víš co dělat s těmito čísly</div>
                  </div>
                  <div className="text-3xl font-bold text-purple-600 pt-6">
                    👉 www.podnikatelskactvrtka.cz
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-3 mt-8 relative z-10">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all ${
                i === step ? 'bg-white scale-125 shadow-lg' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </PostContainer>
  );
}

// Post #4: Proč vznikla Čtvrtka (behind-the-scenes)
function Post4Static() {
  return (
    <PostContainer format="1:1">
      <div className="h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-12 relative overflow-hidden">
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 text-9xl">💡</div>
          <div className="absolute bottom-20 right-20 text-9xl">🚀</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-5">✨</div>
        </div>

        <div className="relative z-10 bg-white/95 backdrop-blur rounded-3xl p-12 shadow-2xl max-w-4xl w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Proč vznikla
            </div>
            <div className="text-5xl font-bold text-slate-800">
              Podnikatelská čtvrtka?
            </div>
          </div>

          {/* Separator */}
          <div className="border-t-4 border-purple-200"></div>

          {/* Three key points */}
          <div className="space-y-6">
            {/* Point 1 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-l-4 border-blue-500">
              <div className="text-2xl leading-relaxed text-slate-700">
                <span className="text-4xl mr-3">👀</span>
                Pozoroval jsem podniky - jak vznikaly a mizely
              </div>
            </div>

            {/* Point 2 */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border-l-4 border-red-500">
              <div className="text-2xl leading-relaxed text-slate-700">
                <span className="text-4xl mr-3">😰</span>
                Končí kvůli plánu, který nemají. Investují statisíce <span className="font-bold text-red-600">PŘED</span> validací.
              </div>
            </div>

            {/* Point 3 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-l-4 border-green-500">
              <div className="text-2xl leading-relaxed text-slate-700">
                <span className="text-4xl mr-3">💡</span>
                Pro běžné podnikatele není nic. <span className="font-bold text-purple-600">Proto je tu Čtvrtka.</span>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t-4 border-purple-200"></div>

          {/* Footer CTA */}
          <div className="text-center space-y-4">
            <div className="text-2xl text-slate-700">
              <span className="font-bold text-purple-600">90 minut</span> • Vše potřebné na jednom místě
            </div>
            <div className="text-3xl font-bold text-slate-800">
              PLÁN před investicí
            </div>
            <div className="text-3xl font-bold text-blue-600 pt-2">
              👉 www.podnikatelskactvrtka.cz
            </div>
          </div>
        </div>
      </div>
    </PostContainer>
  );
}

// Post #5: Žádné guessing (Data-driven)
function Post5Flow() {
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <PostContainer format="1:1">
      <div className="h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center p-12 relative overflow-hidden">
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 text-9xl">⚡</div>
          <div className="absolute bottom-20 right-20 text-9xl">🚀</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-5">✨</div>
        </div>

        <div className="relative z-10 bg-white/95 backdrop-blur rounded-3xl p-12 shadow-2xl max-w-4xl w-full">
          
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-slate-600">
                Krok {step + 1}/5
              </span>
              <span className="text-sm font-bold text-purple-600">
                90 minut
              </span>
            </div>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                animate={{ width: `${((step + 1) / 5) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* STEP 1: Vyplníš model */}
              {step === 0 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-3">📝</div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      Krok 1: Vyplníš model
                    </div>
                    <div className="text-xl text-slate-600">
                      Pár kliknutí. Žádné Excely.
                    </div>
                  </div>

                  {/* Simulated form fields being filled */}
                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-green-50 p-4 rounded-xl border-2 border-green-500"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-slate-700">Kdo je tvůj zákazník?</span>
                        <span className="text-2xl">✓</span>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-green-50 p-4 rounded-xl border-2 border-green-500"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-slate-700">Jaký problém řešíš?</span>
                        <span className="text-2xl">✓</span>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-green-50 p-4 rounded-xl border-2 border-green-500"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-slate-700">Kolik to stojí?</span>
                        <span className="text-2xl">✓</span>
                      </div>
                    </motion.div>
                  </div>

                  <div className="text-center text-xl text-green-600 font-bold pt-4">
                    ⚡ Intuitivní vyplňování
                  </div>
                </div>
              )}

              {/* STEP 2: Systém spočítá */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-3">💰</div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      Krok 2: Systém spočítá
                    </div>
                    <div className="text-xl text-slate-600">
                      Automaticky. Bez kalkulaček.
                    </div>
                  </div>

                  {/* Calculation animation */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center space-y-4"
                    >
                      <div className="text-2xl text-slate-600">Tvůj byznys model je:</div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="text-7xl font-bold text-green-600"
                      >
                        ✅ ZISKOVÝ
                      </motion.div>
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="bg-white p-4 rounded-xl">
                          <div className="text-sm text-slate-500">Potřebných zákazníků</div>
                          <div className="text-3xl font-bold text-purple-600">334/měsíc</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl">
                          <div className="text-sm text-slate-500">Zisk měsíčně</div>
                          <div className="text-3xl font-bold text-green-600">+25.000 Kč</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="text-center text-xl text-blue-600 font-bold">
                    ⚡ Okamžitě
                  </div>
                </div>
              )}

              {/* STEP 3: Feedback - REALISTIC */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-3">💡</div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      Krok 3: Dostaneš doporučení
                    </div>
                    <div className="text-xl text-slate-600">
                      Co zlepšit ve tvém modelu.
                    </div>
                  </div>

                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-yellow-50 p-6 rounded-2xl border-l-4 border-yellow-500"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">💭</span>
                        <div>
                          <div className="font-bold text-lg text-slate-800">Doplň informace</div>
                          <div className="text-slate-600">Máš několik nevyplněných částí modelu. Doplň je pro lepší přehled.</div>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">💡</span>
                        <div>
                          <div className="font-bold text-lg text-slate-800">Tip na zlepšení</div>
                          <div className="text-slate-600">Zvaž více distribučních kanálů - snížíš riziko závislosti na jednom.</div>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-green-50 p-6 rounded-2xl border-l-4 border-green-500"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">✅</span>
                        <div>
                          <div className="font-bold text-lg text-slate-800">Dobře rozpracováno</div>
                          <div className="text-slate-600">Máš jasně definovanou hodnotovou nabídku!</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* STEP 4: Segmentace */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-3">🎯</div>
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      Krok 4: Segmentace zákazníků
                    </div>
                    <div className="text-xl text-slate-600">
                      Přesně víš KOMU prodáváš.
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white text-center"
                    >
                      <div className="text-4xl mb-3">👨‍💼</div>
                      <div className="font-bold text-lg mb-2">Segment A</div>
                      <div className="text-sm opacity-90">Muži 25-35</div>
                      <div className="text-sm opacity-90">IT sektor</div>
                      <div className="text-2xl font-bold mt-3">40%</div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-gradient-to-br from-pink-500 to-pink-600 p-6 rounded-2xl text-white text-center"
                    >
                      <div className="text-4xl mb-3">👩‍💼</div>
                      <div className="font-bold text-lg mb-2">Segment B</div>
                      <div className="text-sm opacity-90">Ženy 30-45</div>
                      <div className="text-sm opacity-90">Marketing</div>
                      <div className="text-2xl font-bold mt-3">35%</div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white text-center"
                    >
                      <div className="text-4xl mb-3">👥</div>
                      <div className="font-bold text-lg mb-2">Segment C</div>
                      <div className="text-sm opacity-90">Rodiny</div>
                      <div className="text-sm opacity-90">Víkendy</div>
                      <div className="text-2xl font-bold mt-3">25%</div>
                    </motion.div>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-2xl text-center">
                    <div className="text-lg text-slate-700">
                      <span className="font-bold text-purple-600">PRO KAŽDÝ SEGMENT</span> víš:
                    </div>
                    <div className="text-sm text-slate-600 mt-2">
                      Kde je najít • Co mu nabídnout • Jak komunikovat
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Akční plán */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-3">🚀</div>
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      Krok 5: Akční plán
                    </div>
                    <div className="text-xl text-slate-600">
                      VÍŠ přesně co dělat.
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-500">
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                        <div className="text-lg text-slate-700">Validuj nápad s 10 lidmi z cílové skupiny</div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                        <div className="text-lg text-slate-700">Testuj přístup k zákazníkům - kde je najdeš</div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                        <div className="text-lg text-slate-700">Vytvoř MVP a získej prvních 10 zákazníků</div>
                      </motion.div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-2xl text-center text-white">
                    <div className="text-3xl font-bold mb-2">✅ HOTOVO!</div>
                    <div className="text-xl mb-4">90 minut • Kompletní plán</div>
                    <div className="space-y-2 text-lg">
                      <div>💡 KNOW-HOW: Víš jak podnikat</div>
                      <div>🔄 ŽIVÉ: Čísla se mění s tebou</div>
                      <div>📊 JASNÉ: Přesně víš KAM DÁL</div>
                    </div>
                  </div>

                  <div className="text-center text-2xl font-bold text-purple-600 pt-4">
                    👉 www.podnikatelskactvrtka.cz
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-3 mt-8 relative z-10">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all ${
                i === step ? 'bg-white scale-125 shadow-lg' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </PostContainer>
  );
}

// Post #6: FAQ (Static) - Gradient design bez boxů
function Post6FAQ() {
  return (
    <PostContainer format="1:1">
      <div className="h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center p-10 relative overflow-hidden">
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 text-8xl">❓</div>
          <div className="absolute bottom-10 left-10 text-8xl">💬</div>
        </div>

        <div className="relative z-10 max-w-2xl w-full space-y-7">
          
          {/* Header */}
          <div className="text-center space-y-2 pb-5">
            <div className="text-2xl text-white/70">FAQ</div>
            <div className="text-4xl font-bold text-white">
              Nejčastější otázky
            </div>
            <div className="text-xl text-white/80">
              o Podnikatelské Čtvrtce
            </div>
          </div>

          {/* FAQ Items - numbered with dividers */}
          <div className="space-y-5">
            
            {/* Q1 */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-xl font-bold">
                1
              </div>
              <div className="flex-1 space-y-1.5 pt-0.5">
                <div className="text-xl font-bold text-white">
                  "Musím mít hotový nápad?"
                </div>
                <div className="text-lg text-white/90 leading-snug">
                  Ne! Projdeme si možnosti společně. Můžeš přijít s "chci něco svého" a najdeme směr.
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-white/20"></div>

            {/* Q2 */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-xl font-bold">
                2
              </div>
              <div className="flex-1 space-y-1.5 pt-0.5">
                <div className="text-xl font-bold text-white">
                  "Je to pro mě i když nemám zkušenosti?"
                </div>
                <div className="text-lg text-white/90 leading-snug">
                  Ano. Stačí být podnikatel se zapálením zlepšit svůj byznys. Systém tě provede krok za krokem.
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-white/20"></div>

            {/* Q3 */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-xl font-bold">
                3
              </div>
              <div className="flex-1 space-y-1.5 pt-0.5">
                <div className="text-xl font-bold text-white">
                  "Co když zjistím, že mé podnikání je ztrátové?"
                </div>
                <div className="text-lg text-white/90 leading-snug">
                  Nevadí! Máme přímo lekci na řešení těchto situací. Naučíš se co upravit, aby to fungovalo.
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-white/20"></div>

            {/* Q4 */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-xl font-bold">
                4
              </div>
              <div className="flex-1 space-y-1.5 pt-0.5">
                <div className="text-xl font-bold text-white">
                  "Kolik to zabere času?"
                </div>
                <div className="text-lg text-white/90 leading-snug">
                  90 minut. Pak máš živý model, ke kterému se vracíš a upravuješ ho.
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-white/20"></div>

            {/* Q5 */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-xl font-bold">
                5
              </div>
              <div className="flex-1 space-y-1.5 pt-0.5">
                <div className="text-xl font-bold text-white">
                  "Potřebuji k tomu něco dalšího?"
                </div>
                <div className="text-lg text-white/90 leading-snug">
                  Ne. Dostaneš přístup a vše máš na jednom místě - nástroje, know-how, kurz.
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="text-center pt-6 space-y-3">
            <div className="text-lg text-white/80">
              Další otázky? <span className="font-bold">Napiš mi do DM 💬</span>
            </div>
            <div className="text-base text-white/70">
              90 minut • Jasné odpovědi • Tvůj plán
            </div>
            <div className="text-2xl font-bold text-white pt-1">
              👉 www.podnikatelskactvrtka.cz
            </div>
          </div>

        </div>
      </div>
    </PostContainer>
  );
}

// Post #7: Case Study - Markéta a kavárna (Static) - Gradient jako FAQ
function Post7CaseStudy() {
  return (
    <PostContainer format="1:1">
      <div className="h-full bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 flex flex-col items-center justify-center p-12 relative overflow-hidden">
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 text-9xl">☕</div>
          <div className="absolute bottom-10 left-10 text-9xl">✨</div>
        </div>

        <div className="relative z-10 max-w-3xl w-full space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4 pb-6">
            <div className="text-6xl">☕</div>
            <div className="text-4xl font-bold text-white leading-tight">
              Markéta chtěla otevřít kavárnu
            </div>
          </div>

          {/* Vertical Timeline with circles */}
          <div className="space-y-6">
            
            {/* BEFORE - neutral */}
            <div className="flex gap-5 items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/70 mt-2 shadow-lg shadow-white/30"></div>
              <div className="flex-1 space-y-2">
                <div className="text-2xl font-bold text-white">Měla:</div>
                <div className="text-xl text-white/90">
                  800k našetřeno + prostor za 35k/měsíc
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-white/20"></div>

            {/* PROBLEM - BLBÝ! červená */}
            <div className="flex gap-5 items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-600 mt-2 shadow-lg shadow-red-500/50"></div>
              <div className="flex-1 space-y-2">
                <div className="text-2xl font-bold text-white">Nevěděla:</div>
                <div className="text-xl text-white">
                  Jestli to vyjde ❌
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-white/20"></div>

            {/* SOLUTION */}
            <div className="flex gap-5 items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 mt-2 shadow-lg shadow-purple-500/50"></div>
              <div className="flex-1 space-y-2">
                <div className="text-2xl font-bold text-white">Než podepsala nájem:</div>
                <div className="text-xl text-white">
                  Vytvořila Čtvrtku (90 min)
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-white/20"></div>

            {/* RESULTS - DOBRÝ! zelená */}
            <div className="flex gap-5 items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-400 mt-2"></div>
              <div className="flex-1 space-y-3">
                <div className="text-2xl font-bold text-green-100">Zjistila:</div>
                <div className="text-xl text-white/90 space-y-1.5">
                  <div>✅ Může shánět zákazníky JEŠTĚ PŘED otevřením kavárny</div>
                  <div>✅ Otestovala poptávku s reálnými lidmi (ne domněnky)</div>
                  <div>✅ Věděla PŘESNĚ kolik potřebuje zákazníků - a kde je najít</div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-white/20"></div>

            {/* OUTCOME - DOBRÝ! zelená */}
            <div className="flex gap-5 items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-400 mt-2"></div>
              <div className="flex-1 space-y-2">
                <div className="text-2xl font-bold text-green-100">Výsledek:</div>
                <div className="text-xl text-white/90">
                  Podepsala nájem <span className="font-bold text-green-200">S JISTOTOU</span> 🎉<br/>
                  Měla plán <span className="font-bold text-purple-200">PŘED investicí</span>
                </div>
              </div>
            </div>

          </div>

          {/* CTA */}
          <div className="text-center pt-8 space-y-4">
            <div className="text-3xl font-bold text-white">
              A ty?
            </div>
            <div className="text-xl text-white/90">
              Ověř si nápad PŘED tím, než investuješ statisíce.
            </div>
            <div className="text-2xl font-bold text-white pt-3">
              👉 www.podnikatelskactvrtka.cz
            </div>
          </div>

        </div>
      </div>
    </PostContainer>
  );
}

// Post #8: Model vs Nápad (Animated Split Screen) - SLIDE STYLE
function Post8ModelVsNapad() {
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 8);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <PostContainer format="1:1">
      <div className="h-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex flex-col p-6 relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-3 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-2xl font-black text-white mb-1">
                {step === 0 && "Tohle ukazuju každému klientovi"}
                {step === 1 && "MĚSÍC 1"}
                {step === 2 && "MĚSÍC 2"}
                {step === 3 && "MĚSÍC 3"}
                {step === 4 && "MĚSÍC 4"}
                {step === 5 && "MĚSÍC 5"}
                {step === 6 && "MĚSÍC 6"}
                {step === 7 && "Jeden končí. Druhý začíná."}
              </div>
              <div className="text-sm text-slate-400">
                {step === 0 && "Sleduj kam vede náhoda vs systém"}
                {step === 7 && "To není náhoda. To je Model."}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content - split screen */}
        <div className="flex-1 grid grid-cols-2 gap-3 relative z-10 max-h-[420px]">
          {/* LEFT: NÁPAD */}
          <motion.div 
            className="bg-gradient-to-br from-red-900/50 to-red-950/50 backdrop-blur rounded-xl border-2 border-red-500/40 p-4 flex flex-col"
            animate={{
              borderColor: step === 7 ? 'rgba(239, 68, 68, 0.8)' : 'rgba(239, 68, 68, 0.4)',
              scale: step === 7 ? 0.97 : 1,
              opacity: step === 7 ? 0.9 : 1,
              backgroundColor: step === 7 ? 'rgba(127, 29, 29, 0.4)' : 'rgba(127, 29, 29, 0.5)'
            }}
          >
            {/* Header */}
            <div className="text-center pb-3 border-b-2 border-red-500/30">
              <div className="text-3xl mb-1">🔥</div>
              <div className="text-xl font-black text-red-400">NÁPAD</div>
              <div className="text-xs text-red-300/60">Reaktivní chaos</div>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center w-full"
                >
                  {step === 0 && (
                    <div className="text-white/70 text-xl italic">
                      "Zkusím to..."
                    </div>
                  )}
                  {step === 1 && (
                    <>
                      <div className="text-2xl mb-2">🚀</div>
                      <div className="text-base text-white font-bold leading-tight">
                        "Konečně vlastní šéf!"
                      </div>
                      <div className="text-sm text-red-300 mt-2">Investuju všechno</div>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <div className="text-2xl mb-2">😰</div>
                      <div className="text-base text-white font-bold leading-tight">
                        "Prodej!... pak 14 dní ticho"
                      </div>
                      <div className="text-sm text-red-300 mt-2">Kde jsou lidi?</div>
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <div className="text-2xl mb-2">😫</div>
                      <div className="text-base text-white font-bold leading-tight">
                        "Co je špatně??"
                      </div>
                      <div className="text-sm text-red-300 mt-2">Nevím proč nikdo nepřijde</div>
                    </>
                  )}
                  {step === 4 && (
                    <>
                      <div className="text-2xl mb-2">🔥</div>
                      <div className="text-base text-white font-bold leading-tight">
                        "Půjčka 80k! FB reklamy!"
                      </div>
                      <div className="text-sm text-red-300 mt-2">MUSÍ to fungovat!</div>
                    </>
                  )}
                  {step === 5 && (
                    <>
                      <div className="text-2xl mb-2">💔</div>
                      <div className="text-base text-white font-bold leading-tight">
                        "Účet prázdný"
                      </div>
                      <div className="text-sm text-red-300 mt-2">Úspory spálené</div>
                    </>
                  )}
                  {step === 6 && (
                    <>
                      <div className="text-2xl mb-2">😞</div>
                      <div className="text-base text-white font-bold leading-tight">
                        "Zavírám. Selhání."
                      </div>
                      <div className="text-sm text-red-300 mt-2">Zpátky do práce</div>
                    </>
                  )}
                  {step === 7 && (
                    <>
                      <div className="text-5xl mb-2">💀</div>
                      <div className="text-4xl text-red-400 font-black">
                        Zavřeno
                      </div>
                      <div className="text-base text-red-300 mt-2 font-bold">
                        Zpátky do práce
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RIGHT: MODEL */}
          <motion.div 
            className="bg-gradient-to-br from-green-900/50 to-emerald-950/50 backdrop-blur rounded-xl border-2 border-green-500/40 p-4 flex flex-col"
            animate={{
              borderColor: step === 7 ? 'rgba(34, 197, 94, 0.9)' : 'rgba(34, 197, 94, 0.4)',
              scale: step === 7 ? 1.03 : 1,
              boxShadow: step === 7 ? '0 0 30px rgba(34, 197, 94, 0.5)' : '0 0 0px rgba(34, 197, 94, 0)'
            }}
          >
            {/* Header */}
            <div className="text-center pb-3 border-b-2 border-green-500/30">
              <div className="text-3xl mb-1">💰</div>
              <div className="text-xl font-black text-green-400">MODEL</div>
              <div className="text-xs text-green-300/60">Systém a růst</div>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center w-full"
                >
                  {step === 0 && (
                    <div className="text-white/70 text-xl italic">
                      "Mám plán..."
                    </div>
                  )}
                  {step === 1 && (
                    <>
                      <div className="text-2xl mb-2">✅</div>
                      <div className="text-base text-white font-bold leading-tight">
                        První zákazníci připraveni
                      </div>
                      <div className="text-sm text-green-300 mt-2">Validoval jsem produkt</div>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <div className="text-2xl mb-2">📋</div>
                      <div className="text-base text-white font-bold leading-tight">
                        Zpětná vazba od zákazníků
                      </div>
                      <div className="text-sm text-green-300 mt-2">Upravuji podle nich</div>
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <div className="text-2xl mb-2">🎯</div>
                      <div className="text-base text-white font-bold leading-tight">
                        Cílím na další zákazníky
                      </div>
                      <div className="text-sm text-green-300 mt-2">Znám svůj segment</div>
                    </>
                  )}
                  {step === 4 && (
                    <>
                      <div className="text-2xl mb-2">💰</div>
                      <div className="text-base text-white font-bold leading-tight">
                        Investice do ověřeného
                      </div>
                      <div className="text-sm text-green-300 mt-2">Vím kam investovat</div>
                    </>
                  )}
                  {step === 5 && (
                    <>
                      <div className="text-2xl mb-2">📈</div>
                      <div className="text-base text-white font-bold leading-tight">
                        Cash flow pozitivní
                      </div>
                      <div className="text-sm text-green-300 mt-2">Optimalizuji dál</div>
                    </>
                  )}
                  {step === 6 && (
                    <>
                      <div className="text-2xl mb-2">🚀</div>
                      <div className="text-base text-white font-bold leading-tight">
                        Najímám člověka
                      </div>
                      <div className="text-sm text-green-300 mt-2">Rozšiřuju tým</div>
                    </>
                  )}
                  {step === 7 && (
                    <>
                      <div className="text-5xl mb-2">🚀</div>
                      <div className="text-4xl text-green-400 font-black">
                        V zisku
                      </div>
                      <div className="text-base text-green-300 mt-2 font-bold">
                        Roste dál
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Footer CTA */}
        <AnimatePresence>
          {step === 7 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center mt-4 relative z-10 space-y-1"
            >
              <div className="text-xl font-black text-white">
                Postav si Model za 90 minut
              </div>
              <div className="text-lg font-black text-blue-400">
                👉 www.podnikatelskactvrtka.cz
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-3 relative z-10">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === step ? 'bg-white scale-125' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </PostContainer>
  );
}

// Post #9: Náklady odkládání (Cost of inaction) - ANIMATED
function Post9CostOfInaction() {
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PostContainer format="1:1">
      <div className="h-full bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex flex-col items-center justify-center p-12 relative overflow-hidden">
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 text-9xl">💸</div>
          <div className="absolute bottom-20 right-20 text-9xl">⏰</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-30">😰</div>
        </div>

        <div className="relative z-10 max-w-4xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
            >
              {step === 0 && (
                <div className="space-y-8 text-center">
                  <div className="text-7xl font-black text-white leading-tight">
                    "POČKÁM SI NA TO..."
                  </div>
                  <div className="text-4xl text-gray-300">
                    ⏰
                  </div>
                  <div className="space-y-4 text-2xl text-gray-400">
                    <div>"Mám teď víc práce"</div>
                    <div>"Ještě to není nutný"</div>
                    <div>"Časem se to spraví"</div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-5xl font-black text-white text-center mb-8">
                    CO SE MEZITÍM DĚJE:
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-red-900/40 backdrop-blur border-2 border-red-500/50 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <span className="text-5xl">🔥</span>
                        <div>
                          <div className="text-3xl font-bold text-red-300 mb-2">
                            Ztrácíš pozici
                          </div>
                          <div className="text-2xl text-gray-300">
                            Konkurence posiluje
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-900/40 backdrop-blur border-2 border-red-500/50 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <span className="text-5xl">💸</span>
                        <div>
                          <div className="text-3xl font-bold text-red-300 mb-2">
                            Ztracené příjmy
                          </div>
                          <div className="text-2xl text-gray-300">
                            Co mohlo být tvoje
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-900/40 backdrop-blur border-2 border-red-500/50 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <span className="text-5xl">🎠</span>
                        <div>
                          <div className="text-3xl font-bold text-red-300 mb-2">
                            Stejný kolotoč
                          </div>
                          <div className="text-2xl text-gray-300">
                            Žádná změna k lepšímu
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div className="text-5xl font-black text-white text-center mb-8">
                    ZA MĚSÍC BUDEŠ ŘÍKAT:
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {/* VLEVO - BEZ PLÁNU */}
                    <div className="bg-red-900/40 backdrop-blur border-2 border-red-500/50 rounded-2xl p-8 space-y-4">
                      <div className="text-5xl text-center mb-4">😰</div>
                      <div className="text-3xl font-bold text-red-300 text-center mb-6">
                        BEZ PLÁNU
                      </div>
                      <div className="space-y-3 text-xl text-gray-300">
                        <div className="flex items-start gap-2">
                          <span className="text-red-400">❌</span>
                          <span>160h práce bez směru</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-red-400">❌</span>
                          <span>Ztracené příležitosti</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-red-400">❌</span>
                          <span>Pořád ten samý kolotoč</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-red-400">❌</span>
                          <span>Stres každý den</span>
                        </div>
                      </div>
                      <div className="text-center text-2xl text-red-400 font-bold mt-6 pt-6 border-t-2 border-red-500/30">
                        "Měl jsem to udělat..."
                      </div>
                    </div>

                    {/* VPRAVO - S PLÁNEM */}
                    <div className="bg-green-900/40 backdrop-blur border-2 border-green-500/50 rounded-2xl p-8 space-y-4">
                      <div className="text-5xl text-center mb-4">✨</div>
                      <div className="text-3xl font-bold text-green-300 text-center mb-6">
                        S PLÁNEM
                      </div>
                      <div className="space-y-3 text-xl text-gray-300">
                        <div className="flex items-start gap-2">
                          <span className="text-green-400">✅</span>
                          <span>90 minut investice</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-400">✅</span>
                          <span>Hotový model podnikání</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-400">✅</span>
                          <span>Jasný směr na roky</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-400">✅</span>
                          <span>Přesný plán co dělat</span>
                        </div>
                      </div>
                      <div className="text-center text-2xl text-green-400 font-bold mt-6 pt-6 border-t-2 border-green-500/30">
                        "Nejlepší investice!"
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 text-center">
                  <div className="text-6xl font-black text-white mb-6">
                    Řešení?<br/>Jasný plán
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-3xl p-8 space-y-4">
                    <div className="text-3xl text-gray-300">
                      📊 Model podnikání
                    </div>
                    <div className="text-3xl text-gray-300">
                      💰 Finanční analýza
                    </div>
                    <div className="text-3xl text-gray-300">
                      🎯 Akční plán
                    </div>
                  </div>

                  <div className="bg-white text-black px-12 py-6 rounded-2xl shadow-2xl inline-block">
                    <div className="text-4xl font-black">
                      CHCI PLÁN →
                    </div>
                  </div>

                  <div className="text-3xl font-bold text-blue-400 pt-4">
                    👉 www.podnikatelskactvrtka.cz
                  </div>

                  <div className="text-xl text-gray-400">
                    Online kurz • Model podnikání
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-8 relative z-10">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i === step ? 'bg-white scale-125' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </PostContainer>
  );
}

// POST #10: CAROUSEL - Od nápadu k plánu (CourseV3)
function Post10Carousel() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PostContainer id={10} title="POST #10: CAROUSEL - Od nápadu k plánu" format="1:1">
      <div className="relative h-full flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-3xl px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {step === 0 && (
                <div className="space-y-8">
                  <div className="text-7xl font-black text-white leading-tight">
                    OD NÁPADU<br/>K PLÁNU
                  </div>
                  
                  <div className="text-3xl text-gray-300 max-w-xl mx-auto leading-relaxed">
                    Nápad není model.<br/>
                    Model není byznys.<br/>
                    <span className="text-white font-bold">Potřebuješ systém.</span>
                  </div>

                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6 inline-block">
                    <div className="text-2xl text-blue-400 font-bold">
                      3 KROKY → HOTOVÝ PLÁN
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-3 inline-block">
                    <div className="text-3xl font-black text-white px-4">
                      KROK 1: ZÁKLAD
                    </div>
                  </div>

                  <div className="text-5xl font-black text-white mb-8">
                    Postav to správně
                  </div>

                  <div className="bg-white/10 backdrop-blur rounded-2xl p-8 space-y-5 text-left max-w-lg mx-auto">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">💡</div>
                      <div>
                        <div className="text-2xl font-bold text-white">Komu to prodáš</div>
                        <div className="text-xl text-gray-300">Zákazník, který ti zaplatí</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">🎯</div>
                      <div>
                        <div className="text-2xl font-bold text-white">Co přesně řešíš</div>
                        <div className="text-xl text-gray-300">Problém za který se platí</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">💰</div>
                      <div>
                        <div className="text-2xl font-bold text-white">Jak vyděláš</div>
                        <div className="text-xl text-gray-300">Peníze musí fungovat</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xl text-gray-400 pt-4">
                    9 lekcí • Pevný základ
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-3 inline-block">
                    <div className="text-3xl font-black text-white px-4">
                      KROK 2: VYLEPŠENÍ
                    </div>
                  </div>

                  <div className="text-5xl font-black text-white mb-8">
                    Udělej to silnější
                  </div>

                  <div className="bg-white/10 backdrop-blur rounded-2xl p-8 space-y-5 text-left max-w-lg mx-auto">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">🚀</div>
                      <div>
                        <div className="text-2xl font-bold text-white">Proč právě ty</div>
                        <div className="text-xl text-gray-300">Tvoje výhoda co tě odliší</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">🎁</div>
                      <div>
                        <div className="text-2xl font-bold text-white">Co dostávají navíc</div>
                        <div className="text-xl text-gray-300">Hodnota nad rámec</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">⚡</div>
                      <div>
                        <div className="text-2xl font-bold text-white">Jak přitáhneš zákazníky</div>
                        <div className="text-xl text-gray-300">Cesta k prvnímu prodeji</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xl text-gray-400 pt-4">
                    4 lekce • Konkurenční náskok
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-3 inline-block">
                    <div className="text-3xl font-black text-white px-4">
                      KROK 3: OVĚŘENÍ
                    </div>
                  </div>

                  <div className="text-5xl font-black text-white mb-8">
                    Zjisti jestli to sedí
                  </div>

                  <div className="bg-white/10 backdrop-blur rounded-2xl p-8 space-y-6 max-w-lg mx-auto">
                    <div className="text-6xl">✓</div>
                    <div className="text-3xl font-bold text-white">
                      Validátor
                    </div>
                    <div className="text-2xl text-gray-300 leading-relaxed">
                      Otestuj si tvůj model<br/>
                      Najdi slabá místa<br/>
                      Oprav je před startem
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur border-2 border-yellow-500/50 rounded-2xl p-6 mt-8 max-w-lg mx-auto">
                    <div className="text-2xl font-bold text-yellow-400 mb-2">
                      ⚠️ 90% podnikatelů začne bez plánu.
                    </div>
                    <div className="text-xl text-gray-300">
                      Jen s nápadem v hlavě.<br/>
                      A pak se diví, proč zbytečně krachují.
                    </div>
                  </div>

                  <div className="pt-6">
                    <div className="bg-white text-black px-10 py-5 rounded-2xl shadow-2xl inline-block">
                      <div className="text-3xl font-black">
                        CHCI JASNÝ PLÁN →
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-400 pt-4">
                      👉 www.podnikatelskactvrtka.cz
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 z-10">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all ${
                i === step ? 'bg-white scale-125' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </PostContainer>
  );
}

// POST #11: COUNTERINTUITIVE - Víc zákazníků = menší peníze
function Post11Counterintuitive() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timings = [2500, 3000, 3000, 3000, 3000, 4000]; // 6 stages
    const timer = setTimeout(() => {
      setStage((prev) => (prev + 1) % 6);
    }, timings[stage]);
    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <PostContainer id={11} title="POST #11: Counterintuitive - Víc zákazníků = menší peníze" format="1:1">
      <div className="relative h-full flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700" />
        <div className="absolute inset-0 bg-black/10" />

        {/* Stage 0: Hook */}
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div
              key="hook"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-16 text-white text-center"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-9xl mb-8"
              >
                🤔
              </motion.div>
              
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-6xl mb-6 leading-tight"
              >
                Proč víc zákazníků =<br/>
                <span className="text-yellow-300">menší peníze?</span>
              </motion.h1>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-3xl opacity-90"
              >
                (ano, čteš dobře)
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 1-2: Scénář A */}
        <AnimatePresence mode="wait">
          {(stage === 1 || stage === 2) && (
            <motion.div
              key="scenario-a"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-16 text-white"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 w-full max-w-4xl">
                <div className="bg-red-500 text-white px-8 py-4 rounded-2xl inline-block mb-10 text-3xl">
                  ❌ SCÉNÁŘ A: "Chci všechny"
                </div>

                {/* Stage 1: Setup */}
                {stage === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div className="text-4xl mb-8">
                      <div className="mb-4">→ <strong>60 zákazníků</strong></div>
                      <div className="text-2xl text-gray-200">Prodáváš všem levně</div>
                    </div>

                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.5 }}
                      className="grid grid-cols-10 gap-1.5 mt-8"
                    >
                      {[...Array(60)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + (i * 0.01) }}
                          className="w-full aspect-square bg-red-300 rounded"
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {/* Stage 2: Result */}
                {stage === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div className="text-3xl text-red-300 space-y-6">
                      <div>→ <strong>70 hodin týdně</strong><br/>
                        <span className="text-2xl">Makáš jako kůň</span>
                      </div>
                      <div>→ <strong>25 000 Kč</strong><br/>
                        <span className="text-2xl">Marže 12% = skoro nic</span>
                      </div>
                    </div>

                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="bg-red-400 text-white px-8 py-6 rounded-2xl text-center mt-10"
                    >
                      <div className="text-5xl mb-2">📉</div>
                      <div className="text-2xl">Vyhoření + minimum peněz</div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 3-4: Scénář B */}
        <AnimatePresence mode="wait">
          {(stage === 3 || stage === 4) && (
            <motion.div
              key="scenario-b"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-16 text-white"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 w-full max-w-4xl">
                <div className="bg-green-500 text-white px-8 py-4 rounded-2xl inline-block mb-10 text-3xl">
                  ✅ SCÉNÁŘ B: "Vím KOHO chci"
                </div>

                {/* Stage 3: Setup */}
                {stage === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div className="text-4xl mb-8">
                      <div className="mb-4">→ <strong>20 zákazníků</strong></div>
                      <div className="text-2xl text-gray-200">Správní lidé, správná cena</div>
                    </div>

                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.5 }}
                      className="grid grid-cols-5 gap-4 mt-8 max-w-xl mx-auto"
                    >
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + (i * 0.04) }}
                          className="w-full aspect-square bg-green-300 rounded-xl"
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {/* Stage 4: Result */}
                {stage === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div className="text-3xl text-green-300 space-y-6">
                      <div>→ <strong>30 hodin týdně</strong><br/>
                        <span className="text-2xl">Máš čas žít</span>
                      </div>
                      <div>→ <strong>60 000 Kč</strong><br/>
                        <span className="text-2xl">Marže 45% = luxus</span>
                      </div>
                    </div>

                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="bg-green-400 text-white px-8 py-6 rounded-2xl text-center mt-10"
                    >
                      <div className="text-5xl mb-2">📈</div>
                      <div className="text-2xl">Svoboda + velké peníze</div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 5: Punchline */}
        <AnimatePresence mode="wait">
          {stage === 5 && (
            <motion.div
              key="punchline"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-16 text-white text-center"
            >
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-10"
              >
                <div className="text-8xl mb-6">🎯</div>
                <h2 className="text-5xl mb-8 leading-tight">
                  Míň zákazníků =<br/>
                  víc peněz + víc času
                </h2>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-10 mb-10 max-w-3xl"
              >
                <p className="text-3xl mb-6">
                  Problém není v počtu zákazníků...
                </p>
                <p className="text-4xl text-yellow-300">
                  Problém je, že nevíš<br/><span className="underline">NA KOHO</span> se zaměřit
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-yellow-400 text-gray-900 px-10 py-8 rounded-2xl max-w-3xl"
              >
                <div className="text-xl opacity-80 mb-3">Podnikatelská Čtvrtka ti ukáže:</div>
                <div className="text-3xl leading-relaxed">
                  <strong>Kdo</strong> jsou tví praví zákazníci<br/>
                  a <strong>proč</strong> ti zaplatí víc
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-10 text-2xl opacity-80"
              >
                90 minut • 4.999 Kč • jasno v byznysu
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress dots */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 z-10">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-5 h-5 rounded-full transition-all ${
                i === stage ? 'bg-white scale-125' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </PostContainer>
  );
}

// POST #12: NÁSTROJ - Velikost segmentu
function Post12SegmentSize() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, [stage]);

  return (
    <PostContainer id={12} title="POST #12: Nástroj - Velikost segmentu" format="1:1">
      <div className="relative h-full flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700" />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl w-full px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
            >
              {/* Stage 0: Hook - Navázání na Post #3 */}
              {stage === 0 && (
                <div className="text-center space-y-10">
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-9xl mb-6"
                  >
                    🧮
                  </motion.div>
                  <h1 className="text-6xl font-black text-white leading-tight">
                    "Potřebuješ 47 zákazníků."
                  </h1>
                  <div className="bg-white/20 backdrop-blur rounded-2xl p-8 inline-block mt-8">
                    <p className="text-3xl text-white">
                      OK, máš číslo.
                    </p>
                    <p className="text-4xl text-yellow-300 font-bold mt-6">
                      ALE...
                    </p>
                    <p className="text-3xl text-white mt-6">
                      Je tam vůbec 47 lidí,<br/>
                      co by od tebe koupili?
                    </p>
                  </div>
                </div>
              )}

              {/* Stage 1: Problém - Většina hádá */}
              {stage === 1 && (
                <div className="text-center space-y-10">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="text-8xl mb-6"
                  >
                    ❌
                  </motion.div>
                  <h2 className="text-5xl font-black text-white mb-8">
                    Většina podnikatelů:
                  </h2>
                  <div className="space-y-6">
                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-red-500/30 backdrop-blur rounded-2xl p-6"
                    >
                      <p className="text-3xl text-white">"No... asi jo?"</p>
                    </motion.div>
                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-red-500/30 backdrop-blur rounded-2xl p-6"
                    >
                      <p className="text-3xl text-white">"Myslím, že tam bude dost lidí."</p>
                    </motion.div>
                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="bg-red-500/30 backdrop-blur rounded-2xl p-6"
                    >
                      <p className="text-3xl text-white">"Snad..."</p>
                    </motion.div>
                  </div>
                  <p className="text-4xl text-red-300 font-bold mt-8">
                    Hádání. Ne realita.
                  </p>
                </div>
              )}

              {/* Stage 2: Nástroj + Realita 3-5% */}
              {stage === 2 && (
                <div className="space-y-6">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="text-7xl text-center mb-4"
                  >
                    💡
                  </motion.div>
                  <h2 className="text-4xl font-black text-white text-center mb-6">
                    Existuje nástroj,<br/>
                    kterým to zjistíš <span className="text-green-300">PŘESNĚ</span>.
                  </h2>
                  
                  {/* Mock Interface - BEZ FB loga */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-2xl"
                  >
                    <div className="space-y-4">
                      <div className="pb-3 border-b-2 border-gray-200">
                        <div className="text-xl font-bold text-gray-800">Průzkum trhu</div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">📍</span>
                          <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-lg text-gray-700">Brno</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xl">👤</span>
                          <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-lg text-gray-700">Ženy, 30-40 let</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xl">💪</span>
                          <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-lg text-gray-700">Fitness, zdraví</div>
                        </div>
                      </div>

                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6, type: "spring" }}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-4 text-center mt-4"
                      >
                        <div className="text-white text-lg mb-1">Potenciální dosah:</div>
                        <div className="text-white text-5xl font-black">12.000</div>
                        <div className="text-white text-base mt-1">lidí</div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* ALE POZOR - 3-5% realita */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-yellow-500/20 backdrop-blur rounded-xl p-5 border-2 border-yellow-400"
                  >
                    <p className="text-2xl text-yellow-300 font-bold text-center mb-3">ALE POZOR:</p>
                    <p className="text-xl text-white text-center">
                      Z těch 12.000 je jen <span className="text-yellow-300 font-bold">3-5%</span><br/>
                      připraveno koupit TEĎKA.
                    </p>
                    <p className="text-3xl text-green-300 font-black text-center mt-4">
                      = 360-600 reálných kupců
                    </p>
                  </motion.div>
                </div>
              )}

              {/* Stage 3: CTA - Potřebuješ 47? Máš 360? GO! */}
              {stage === 3 && (
                <div className="text-center space-y-10">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <div className="text-8xl mb-6">🎯</div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-10 max-w-3xl mx-auto"
                  >
                    <div className="text-4xl text-white font-bold mb-4">
                      Potřebuješ 47?
                    </div>
                    <div className="text-4xl text-white font-bold mb-6">
                      Máš 360 možných?
                    </div>
                    <div className="text-7xl font-black text-white">
                      ✅ GO!
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/20 backdrop-blur rounded-2xl p-8 max-w-2xl mx-auto"
                  >
                    <div className="text-2xl text-yellow-300 font-bold mb-4">
                      Na Podnikatelské Čtvrtce ti ukážu:
                    </div>
                    <div className="text-2xl text-white space-y-2">
                      <div>→ Jak zjistit velikost segmentu</div>
                      <div>→ Jak spočítat reálné %</div>
                      <div>→ Jestli tam je dost peněz</div>
                    </div>
                  </motion.div>

                  <div className="text-3xl text-white/90 pt-4">
                    90 minut • Praktické nástroje
                  </div>
                  <div className="text-3xl font-bold text-blue-300">
                    👉 www.podnikatelskactvrtka.cz
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 z-10">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all ${
                i === stage ? 'bg-white scale-125' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </PostContainer>
  );
}

// POST #13: ANTI-GURU (SPLIT-SCREEN REDESIGN)
function Post13AntiGuru() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, [stage]);

  return (
    <PostContainer id={13} title="POST #13: ANTI-GURU" format="1:1">
      <div className="relative h-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Stage 0: SPLIT INTRO - Guru přístup vs Reality */}
            {stage === 0 && (
              <div className="h-full flex">
                {/* LEFT: GURU PŘÍSTUP */}
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-1/2 bg-gradient-to-br from-red-600 via-orange-500 to-red-600 flex flex-col items-center justify-center p-12 relative overflow-hidden"
                >
                  {/* Nabubřelé decoration */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 text-9xl animate-pulse">💰</div>
                    <div className="absolute bottom-10 right-10 text-9xl animate-pulse">🚀</div>
                    <div className="absolute top-1/2 left-1/3 text-7xl animate-pulse">⚡</div>
                  </div>
                  
                  <div className="relative z-10 text-center space-y-6">
                    <div className="text-6xl mb-4">🚨</div>
                    <h2 className="text-5xl font-black text-white drop-shadow-lg">
                      GURU PŘÍSTUP
                    </h2>
                    <div className="bg-yellow-400 text-red-900 font-black text-4xl px-8 py-4 rotate-2 shadow-2xl">
                      "ZBOHATNEŠ ZÍTRA!"
                    </div>
                    <p className="text-2xl text-yellow-100 font-bold">
                      Efektní. Sliby. Obecné.
                    </p>
                  </div>
                </motion.div>

                {/* RIGHT: NAŠE ŘEŠENÍ */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-1/2 bg-gradient-to-br from-teal-600 via-blue-500 to-teal-600 flex flex-col items-center justify-center p-12 relative overflow-hidden"
                >
                  {/* Clean decoration */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 text-8xl">📊</div>
                    <div className="absolute bottom-10 left-10 text-8xl">✓</div>
                  </div>
                  
                  <div className="relative z-10 text-center space-y-6">
                    <div className="text-6xl mb-4">💎</div>
                    <h2 className="text-5xl font-black text-white drop-shadow-lg">
                      NAŠE ŘEŠENÍ
                    </h2>
                    <div className="bg-white/95 text-blue-900 font-black text-4xl px-8 py-4 shadow-xl rounded-xl">
                      "OVĚŘ SI TO TEĎKA"
                    </div>
                    <p className="text-2xl text-blue-100 font-bold">
                      Čisté. Pravda. Data.
                    </p>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Stage 1: SPLIT PROMISES - Guru radí vs My říkáme */}
            {stage === 1 && (
              <div className="h-full flex">
                {/* LEFT: GURU RADÍ */}
                <div className="w-1/2 bg-gradient-to-br from-red-700 via-red-600 to-orange-600 flex flex-col items-center justify-center p-12">
                  <div className="space-y-6 w-full max-w-md">
                    <div className="text-center mb-8">
                      <div className="text-6xl mb-3">❌</div>
                      <h2 className="text-4xl font-black text-white">
                        GURU RADÍ:
                      </h2>
                    </div>

                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white/10 backdrop-blur rounded-xl p-5 border-2 border-yellow-400"
                    >
                      <p className="text-2xl text-white">• "Tahle strategie stopro funguje!"</p>
                    </motion.div>

                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white/10 backdrop-blur rounded-xl p-5 border-2 border-yellow-400"
                    >
                      <p className="text-2xl text-white">• "Zbohatneš za 3 měsíce!"</p>
                    </motion.div>

                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="bg-white/10 backdrop-blur rounded-xl p-5 border-2 border-yellow-400"
                    >
                      <p className="text-2xl text-white">• "Jdi do toho!"</p>
                    </motion.div>
                  </div>
                </div>

                {/* RIGHT: MY ŘÍKÁME */}
                <div className="w-1/2 bg-gradient-to-br from-teal-700 via-teal-600 to-blue-600 flex flex-col items-center justify-center p-12">
                  <div className="space-y-6 w-full max-w-md">
                    <div className="text-center mb-8">
                      <div className="text-6xl mb-3">✅</div>
                      <h2 className="text-4xl font-black text-white">
                        MY ŘÍKÁME:
                      </h2>
                    </div>

                    <motion.div
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white/90 backdrop-blur rounded-xl p-5 border-2 border-white shadow-lg"
                    >
                      <p className="text-2xl text-teal-900 font-bold">• "Ověříme jestli TVŮJ byznys funguje"</p>
                    </motion.div>

                    <motion.div
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white/90 backdrop-blur rounded-xl p-5 border-2 border-white shadow-lg"
                    >
                      <p className="text-2xl text-teal-900 font-bold">• "Za 90 minut máš jasno"</p>
                    </motion.div>

                    <motion.div
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="bg-white/90 backdrop-blur rounded-xl p-5 border-2 border-white shadow-lg"
                    >
                      <p className="text-2xl text-teal-900 font-bold">• "Naučíš se podstatné věci"</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}

            {/* Stage 2: SPLIT RESULTS - Po guru radách vs Po naší Čtvrtce */}
            {stage === 2 && (
              <div className="h-full flex">
                {/* LEFT: PO GURU RADÁCH */}
                <div className="w-1/2 bg-gradient-to-br from-gray-800 via-gray-700 to-red-900 flex flex-col items-center justify-center p-12">
                  <div className="space-y-8 w-full max-w-md">
                    <div className="text-center mb-6">
                      <div className="text-6xl mb-3">😵</div>
                      <h2 className="text-3xl font-black text-white leading-tight">
                        PO GURU RADÁCH:
                      </h2>
                    </div>

                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-red-500/20 backdrop-blur rounded-xl p-6 border-2 border-red-500/50"
                    >
                      <p className="text-2xl text-red-200 text-center">
                        "Vím obecné rady o podnikání..."
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-red-500/20 backdrop-blur rounded-xl p-6 border-2 border-red-500/50"
                    >
                      <p className="text-2xl text-red-200 text-center">
                        "...nevím co konkrétně s mým byznysem"
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="bg-gray-900/60 backdrop-blur rounded-xl p-5 border-2 border-gray-600"
                    >
                      <p className="text-3xl text-gray-400 text-center font-bold">
                        = BEZ VÝSLEDKU
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* RIGHT: PO NAŠÍ ČTVRTCE */}
                <div className="w-1/2 bg-gradient-to-br from-emerald-700 via-teal-600 to-blue-700 flex flex-col items-center justify-center p-12">
                  <div className="space-y-8 w-full max-w-md">
                    <div className="text-center mb-6">
                      <div className="text-6xl mb-3">✅</div>
                      <h2 className="text-3xl font-black text-white leading-tight">
                        PO NAŠÍ ČTVRTCE:
                      </h2>
                    </div>

                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white/95 backdrop-blur rounded-xl p-6 border-2 border-white shadow-xl"
                    >
                      <p className="text-2xl text-emerald-900 text-center font-bold">
                        "Vím jak z toho udělat zisk"
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white/95 backdrop-blur rounded-xl p-6 border-2 border-white shadow-xl"
                    >
                      <p className="text-2xl text-emerald-900 text-center font-bold">
                        "Mám plán jak to rozjet"
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="bg-yellow-400 backdrop-blur rounded-xl p-5 border-2 border-yellow-300 shadow-xl"
                    >
                      <p className="text-3xl text-emerald-900 text-center font-black">
                        = SPLNITELNÝ SEN
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}

            {/* Stage 3: FULL SCREEN CTA */}
            {stage === 3 && (
              <div className="h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center p-12">
                <div className="text-center space-y-10 max-w-3xl">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="text-8xl mb-6"
                  >
                    💎
                  </motion.div>

                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-6xl font-black text-white leading-tight"
                  >
                    KONEČNĚ JEDINEČNÉ<br/>
                    ŘEŠENÍ PRO PODNIKATELE
                  </motion.h2>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border-2 border-white/30 shadow-2xl"
                  >
                    <p className="text-4xl text-white font-bold">
                      90 minut • Pravda, ne sliby
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-4xl font-bold text-yellow-300 pt-4"
                  >
                    👉 www.podnikatelskactvrtka.cz
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 z-10">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all ${
                i === stage ? 'bg-white scale-125' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </PostContainer>
  );
}

// POST #14: CO NEMUSÍŠ
function Post14WhatYouDontNeed() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, [stage]);

  return (
    <PostContainer id={14} title="POST #14: CO NEMUSÍŠ" format="1:1">
      <div className="relative h-full flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900" />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl w-full px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
            >
              {/* Stage 0: MÝTY - Co NEMUSÍŠ */}
              {stage === 0 && (
                <div className="text-center space-y-8">
                  <motion.div
                    initial={{ rotate: -10, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring" }}
                    className="text-8xl mb-6"
                  >
                    ❌
                  </motion.div>
                  <h1 className="text-5xl font-black text-white leading-tight mb-10">
                    CO NEMUSÍŠ:
                  </h1>
                  <div className="space-y-6">
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="relative"
                    >
                      <div className="bg-red-500/20 backdrop-blur rounded-2xl p-6 border-2 border-red-500/50">
                        <p className="text-3xl text-white">"Musím mít všechno dokonalé."</p>
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 text-6xl"
                      >
                        ❌
                      </motion.div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="relative"
                    >
                      <div className="bg-red-500/20 backdrop-blur rounded-2xl p-6 border-2 border-red-500/50">
                        <p className="text-3xl text-white">"Musím znát všechny nástroje."</p>
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: "spring" }}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 text-6xl"
                      >
                        ❌
                      </motion.div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="relative"
                    >
                      <div className="bg-red-500/20 backdrop-blur rounded-2xl p-6 border-2 border-red-500/50">
                        <p className="text-3xl text-white">"Musím investovat tisíce do startu."</p>
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8, type: "spring" }}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 text-6xl"
                      >
                        ❌
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Stage 1: Co SKUTEČNĚ potřebuješ */}
              {stage === 1 && (
                <div className="text-center space-y-10">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="text-8xl mb-6"
                  >
                    ✅
                  </motion.div>
                  <h2 className="text-5xl font-black text-white mb-10">
                    CO SKUTEČNĚ POTŘEBUJEŠ:
                  </h2>
                  <div className="space-y-6">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="bg-green-500/30 backdrop-blur rounded-2xl p-8 border-2 border-green-400"
                    >
                      <p className="text-3xl text-white font-bold">
                        ✅ Vědět jestli tvá cílovka EXISTUJE
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, type: "spring" }}
                      className="bg-green-500/30 backdrop-blur rounded-2xl p-8 border-2 border-green-400"
                    >
                      <p className="text-3xl text-white font-bold">
                        ✅ Vědět jestli jich je DOSTATEK
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                      className="bg-green-500/30 backdrop-blur rounded-2xl p-8 border-2 border-green-400"
                    >
                      <p className="text-3xl text-white font-bold">
                        ✅ Zaměřit se na to, co považují za NEJDŮLEŽITĚJŠÍ
                      </p>
                    </motion.div>
                  </div>
                  <p className="text-4xl text-yellow-300 font-bold pt-6">
                    To je všechno.<br/>
                    Zbytek přijde.
                  </p>
                </div>
              )}

              {/* Stage 2: Většina dělá */}
              {stage === 2 && (
                <div className="text-center space-y-8">
                  <motion.div
                    initial={{ rotate: 10 }}
                    animate={{ rotate: 0 }}
                    transition={{ type: "spring" }}
                    className="text-8xl mb-6"
                  >
                    🤦‍♂️
                  </motion.div>
                  <h2 className="text-5xl font-black text-white mb-8">
                    VĚTŠINA PODNIKATELŮ:
                  </h2>
                  <div className="space-y-5">
                    <motion.div
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-orange-500/20 backdrop-blur rounded-xl p-6 border-2 border-orange-500/40"
                    >
                      <p className="text-3xl text-orange-200">
                        → Dělá dokonalý web <span className="text-orange-400 font-bold">(6 týdnů)</span>
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-orange-500/20 backdrop-blur rounded-xl p-6 border-2 border-orange-500/40"
                    >
                      <p className="text-3xl text-orange-200">
                        → Ladí produkt do detailu <span className="text-orange-400 font-bold">(3 měsíce)</span>
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="bg-orange-500/20 backdrop-blur rounded-xl p-6 border-2 border-orange-500/40"
                    >
                      <p className="text-3xl text-orange-200">
                        → Čeká na "dokonalý moment" <span className="text-orange-400 font-bold">(pořád)</span>
                      </p>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="pt-6"
                  >
                    <p className="text-4xl text-red-400 font-black">
                      A POŘÁD NEVÍ,<br/>
                      jestli tam je zákazník.
                    </p>
                  </motion.div>
                </div>
              )}

              {/* Stage 3: CTA */}
              {stage === 3 && (
                <div className="text-center space-y-10">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="text-8xl mb-6"
                  >
                    🎯
                  </motion.div>
                  <h2 className="text-5xl font-black text-white leading-tight mb-8">
                    Na Podnikatelské Čtvrtce<br/>
                    ti ukážu ty 3 věci.
                  </h2>
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-10 max-w-3xl mx-auto"
                  >
                    <p className="text-4xl text-white font-bold mb-4">
                      Za 90 minut.
                    </p>
                    <p className="text-4xl text-white font-bold">
                      Bez zbytečností.
                    </p>
                  </motion.div>
                  <div className="text-3xl text-white/90 pt-4">
                    90 minut • 3 odpovědi
                  </div>
                  <div className="text-3xl font-bold text-blue-300">
                    👉 www.podnikatelskactvrtka.cz
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 z-10">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all ${
                i === stage ? 'bg-white scale-125' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </PostContainer>
  );
}

// POST #15: KONKRÉTNÍ OUTCOME (Stack Reveal)
function Post15StackReveal() {
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    if (visibleItems < 6) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      // Po dokončení stacku, resetovat po pauze
      const resetTimer = setTimeout(() => {
        setVisibleItems(0);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }
  }, [visibleItems]);

  const items = [
    { icon: '📋', title: 'Model podnikání', subtitle: 'Tvůj vlastní, ne šablona' },
    { icon: '🎯', title: 'Validace trhu', subtitle: 'Konkrétní data, ne rady' },
    { icon: '💰', title: 'Cenová strategie', subtitle: 'Pro tvůj byznys' },
    { icon: '📊', title: 'Plán na 30 dní', subtitle: 'Jasné kroky vpřed' },
    { icon: '🤝', title: 'Komunitní podpora', subtitle: 'I po kurzu' },
    { icon: '💬', title: 'Live konzultace', subtitle: 'Když si nevíš rady' }
  ];

  return (
    <PostContainer id={15} title="POST #15: KONKRÉTNÍ OUTCOME" format="1:1">
      <div className="relative h-full flex items-start justify-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
        
        {/* Animated circles */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.1, 0.15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl w-full px-16 pt-6 pb-0">
          <div className="text-center space-y-6">
            {/* Header */}
            <div className="space-y-0">
              <motion.h1
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl font-black text-white leading-tight"
              >
                CO DOSTANEŠ?
              </motion.h1>
              <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl text-purple-200"
              >
                Víc než jen kurz.
              </motion.p>
            </div>

            {/* Stack of cards - vertical list */}
            <div className="space-y-2 max-w-2xl mx-auto">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ 
                    x: -300,
                    opacity: 0,
                    scale: 0.8
                  }}
                  animate={visibleItems > index ? {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                  } : {
                    x: -300,
                    opacity: 0,
                    scale: 0.8
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: index * 0.1
                  }}
                >
                  <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur rounded-2xl p-4 shadow-2xl border-2 border-white/50 hover:scale-105 transition-transform">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="text-left flex-1">
                        <div className="text-xl font-black text-gray-900 mb-0.5">
                          {item.title}
                        </div>
                        <div className="text-base text-gray-600">
                          {item.subtitle}
                        </div>
                      </div>
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={visibleItems > index ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                        transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 300 }}
                        className="text-3xl text-green-500 flex-shrink-0"
                      >
                        ✓
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA - ABSOLUTE positioning */}
        <AnimatePresence>
          {visibleItems >= 6 && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 150, damping: 20 }}
              className="absolute bottom-6 left-0 right-0 z-20"
            >
              <div className="text-center space-y-4 px-16">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-6 max-w-2xl mx-auto shadow-2xl">
                  <p className="text-3xl text-white font-black">
                    Základ na roky. 🚀
                  </p>
                </div>
                <div className="text-2xl text-white/90">
                  90 minut • 4.999 Kč
                </div>
                <div className="text-2xl font-bold text-purple-300">
                  👉 www.podnikatelskactvrtka.cz
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PostContainer>
  );
}

// POST #16: MECHANISM
function Post16Mechanism() {
  // Import the component
  const { OrganicPost16Mechanism } = require('./OrganicPost16Mechanism');
  return <OrganicPost16Mechanism />;
}

// Main component
export default function OrganicPosts() {
  const [currentPost, setCurrentPost] = useState(0);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = async (text: string, id: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderPost = () => {
    switch (currentPost) {
      case 0: return <Post1Static />;
      case 1: return <Post2AnimatedBMC />;
      case 2: return <Post3Calculator />;
      case 3: return <Post4Static />;
      case 4: return <Post5Flow />;
      case 5: return <Post6FAQ />;
      case 6: return <Post7CaseStudy />;
      case 7: return <Post8ModelVsNapad />;
      case 8: return <Post9CostOfInaction />;
      case 9: return <Post10Carousel />;
      case 10: return <Post11Counterintuitive />;
      case 11: return <Post12SegmentSize />;
      case 12: return <Post13AntiGuru />;
      case 13: return <Post14WhatYouDontNeed />;
      case 14: return <Post15StackReveal />;
      case 15: return <Post16Mechanism />;
      default: return <Post1Static />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            📱 Organic Posts - 30 dní série
          </h1>
          <p className="text-xl text-slate-300">
            Jeden post denně • Vysoká hodnota • Bez know-how
          </p>
        </div>

        {/* Quick Switcher - jako v Omnipresent */}
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentPost((prev) => Math.max(0, prev - 1))}
              disabled={currentPost === 0}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all text-white font-bold"
            >
              <ChevronLeft className="w-5 h-5" />
              Předchozí
            </button>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                Post #{currentPost + 1}
              </div>
              <div className="text-sm text-slate-300">
                {POSTS[currentPost].title}
              </div>
              <div className="mt-1 px-3 py-1 bg-white/10 rounded-full inline-block">
                <span className={`text-xs ${POSTS[currentPost].type === 'animated' ? 'text-green-400' : 'text-blue-400'}`}>
                  {POSTS[currentPost].type === 'animated' ? '🎬 Animovaný' : '📄 Static'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setCurrentPost((prev) => Math.min(POSTS.length - 1, prev + 1))}
              disabled={currentPost === POSTS.length - 1}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all text-white font-bold"
            >
              Další
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Quick number buttons */}
          <div className="flex gap-2 flex-wrap justify-center">
            {POSTS.map((post, index) => (
              <button
                key={post.id}
                onClick={() => setCurrentPost(index)}
                className={`px-4 py-2 rounded-lg font-bold transition-all text-sm ${
                  index === currentPost
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-110 shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                #{index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Copy button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => handleCopy(POSTS[currentPost].copy, POSTS[currentPost].id)}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg transition-all transform hover:scale-105"
          >
            {copiedId === POSTS[currentPost].id ? (
              <>
                <Check className="w-6 h-6" />
                <span className="text-xl">Zkopírováno! ✅</span>
              </>
            ) : (
              <>
                <Copy className="w-6 h-6" />
                <span className="text-xl">Zkopírovat copy</span>
              </>
            )}
          </button>
        </div>

        {/* Post preview */}
        <div className="flex justify-center">
          {renderPost()}
        </div>

        {/* Instructions */}
        <div className="mt-12 max-w-4xl mx-auto bg-white/10 backdrop-blur rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">📸 Jak exportovat:</h3>
          <ol className="space-y-3 text-lg text-slate-300">
            <li>1️⃣ Screenshot celé stránky (1080×1080 nebo 1080×1350)</li>
            <li>2️⃣ Zkopíruj copy tlačítkem výše</li>
            <li>3️⃣ Upload na FB/IG + vlož copy</li>
            <li>4️⃣ {POSTS[currentPost].type === 'animated' ? '🎬 Pro animaci: Screen record (15-30 sec)' : '📄 Hotovo!'}</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
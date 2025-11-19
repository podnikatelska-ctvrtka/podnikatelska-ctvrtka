import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Copy, Check, Video, Image as ImageIcon, Download,
  Calendar, Target, TrendingUp, AlertCircle, Sparkles
} from 'lucide-react';

/**
 * 🚀 30 POSTŮ CO GRÁLAJÍ - ORGANIC CONTENT BANK
 * 
 * Každý post pokrývá:
 * ✅ Konkrétní hodnotu z kurzu (ne obecnosti!)
 * ✅ Media type (video/static) + popis co natočit
 * ✅ Pain point/segment zákazníka
 * ✅ Mix: empatie, value, odbourání obav, urgence
 * 
 * = 1 POST DENNĚ PO DOBU 30 DNÍ
 */

// ═══════════════════════════════════════════════════════════
// 📝 30 POSTŮ - KOMPLETNÍ CONTENT BANK
// ═══════════════════════════════════════════════════════════

export const SOCIAL_POSTS = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // KATEGORIE 1: EMPATIE & PAIN (7 postů)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 1,
    type: 'video',
    videoFormat: 'animated-calculator',
    segment: 'universal',
    pain: 'Nevím kolik zákazníků potřebuju',
    copy: `💬 "Kolik máš sledujících?"

❌ ŠPATNÁ otázka.

━━━━━━━━━━━━━━━━━━━━━━━

Správná otázka:

✅ "Kolik zákazníků potřebuješ k 50.000 Kč/měsíc?"

━━━━━━━━━━━━━━━━━━━━━━━

Příklad:

Průměrná hodnota zákazníka: 2.500 Kč
Tvůj měsíční cíl: 50.000 Kč

50.000 ÷ 2.500 = 20 zákazníků/měsíc

= 5 zákazníků/týden
= 1 zákazník/den

━━━━━━━━━━━━━━━━━━━━━━━

Teď se ptám:

Co je snazší?

❌ "Musím mít 10.000 followerů!"
✅ "Potřebuju 1 zákazníka denně"

━━━━━━━━━━━━━━━━━━━━━━━

Tohle je přesně jeden z nástrojů v Podnikatelské Čtvrtce.

TARGET KALKULAČKA.

Žádné doufání. Jen matematika.

👉 www.podnikatelskactvrtka.cz

Zkusil jsi si spočítat svoje čísla? 👇

#podnikani #strategie #businesstips #matematika #podnikatel`,
    mediaDescription: 'VIDEO: Animace Target Kalkulačky - zadávání cíle (50.000 Kč), ceny produktu (2.500 Kč), automatický výpočet → 20 zákazníků/měsíc → 1 zákazník/den. Screen recording z kurzu.'
  },

  {
    id: 2,
    type: 'video',
    videoFormat: 'story-format',
    segment: 'beginner',
    pain: 'Investoval jsem, ale neprodává se',
    copy: `"Mám skvělý nápad!"

To říkají všichni.

━━━━━━━━━━━━━━━━━━━━━━━

Pak přijde realita:

MĚSÍC 1:
💸 Investoval jsi 50.000 Kč
⏰ Strávil 200 hodin
😰 Prodal si 3 kusy

MĚSÍC 2:
💸 Další 30.000 Kč do reklam
⏰ Další noci bez spánku
😓 Prodal si 5 kusů

MĚSÍC 3:
🤷 "Asi to není ten správný timing..."
😔 "Lidi to asi nepotřebují..."
💔 "Možná to vzdám..."

━━━━━━━━━━━━━━━━━━━━━━━

❓ PROBLÉM?

Nešlo o nápad.
Nešlo o timing.

Šlo o to, že jsi NEVĚDĚL:
→ Koho přesně oslovuješ
→ Jaký problém řešíš
→ Proč by měli koupit u tebe

━━━━━━━━━━━━━━━━━━━━━━━

✅ ŘEŠENÍ?

Než investuješ první korunu.
Udělej si Model podnikání.

90 minut. Jeden list. Jasno.

To je Podnikatelská Čtvrtka.

👉 www.podnikatelskactvrtka.cz

Už jsi tohle zažil? 👇

#podnikani #podnikatel #startup #businessmodel #reality`,
    mediaDescription: 'VIDEO: Story formát (vertikální) s textem přes obrázky - Měsíc 1/2/3 s emocemi (😰→😓→💔), pak přechod na ŘEŠENÍ s ukázkou Business Model Canvas na 1 listu.'
  },

  {
    id: 3,
    type: 'video',
    videoFormat: 'screen-recording',
    segment: 'struggling',
    pain: 'Googlit každý den, pořád nic',
    copy: `Pondělí večer. 22:37.

Sedíš u notebooku.

Před sebou:
→ 15 otevřených tabů
→ "Jak udělat FB reklamu"
→ "Jak najít zákazníky"
→ "Best marketing strategy 2025"

━━━━━━━━━━━━━━━━━━━━━━━

Scroll. Scroll. Scroll.

"Tohle vypadá dobře..."
"A taky tohle..."
"To taky zkusím..."

━━━━━━━━━━━━━━━━━━━━━━━

23:45. Zavíráš notebook.

❓ Co jsi udělal?

Nic.

Protože TY NEVÍŠ od čeho začít.

━━━━━━━━━━━━━━━━━━━━━━━

Existuje systém:

1. Zjistíš KDO je tvůj zákazník
2. Zjistíš CO mu nabízíš
3. Zjistíš KDE ho najdeš
4. Uděláš AKČNÍ PLÁN na zítra

90 minut. Jeden list. Hotovo.

To je Model podnikání.
To je Podnikatelská Čtvrtka.

👉 www.podnikatelskactvrtka.cz

Kolik hodin týdně progooglíš? 👇

#podnikani #produktivita #strategie #businessmodel #focus`,
    mediaDescription: 'VIDEO: Screen recording - otevřených 15 tabů v browseru, scroll, chaos → pak přechod na Business Model Canvas vyplněný → Akční plán Modul 3. Ukázat kontrast chaos vs. systém.'
  },

  {
    id: 4,
    type: 'static',
    segment: 'beginner',
    pain: 'Investoval bez strategie',
    copy: `"Prodal jsem všechno co jsem měl."
"Vzal jsem hypotéku."
"Investoval jsem do svého byznysu."

━━━━━━━━━━━━━━━━━━━━━━━

Rok 1: "Ještě to chce čas..."
Rok 2: "Asi změním strategii..."
Rok 3: "Možná to vzdám..."

━━━━━━━━━━━━━━━━━━━━━━━

💔 To bolí.

A víš co bolí ještě víc?

Že to nešlo o špatný nápad.
Že to nešlo o málo práce.

━━━━━━━━━━━━━━━━━━━━━━━

Šlo o to, že CHYBÍ STRATEGIE.

❌ Nevím koho oslovuju
❌ Nevím jakou hodnotu nabízím
❌ Nevím jak vydělám

= Makám. Investuju. Doufám.

━━━━━━━━━━━━━━━━━━━━━━━

✅ CO KDYBY...

Před tou hypotékou.
Před tou investicí.

...si udělal Model podnikání?

90 minut. Zjistíš JESTLI to má šanci.
NEŽ investuješ první korunu.

To je Podnikatelská Čtvrtka.

👉 www.podnikatelskactvrtka.cz

Investoval jsi do byznysu bez strategie? 👇

#podnikani #investice #startup #strategie #reality`,
    mediaDescription: 'STATIC: Infografika - Timeline Rok 1/2/3 s declining chart, pak vs. "90 minut PŘED investicí" s Business Model Canvas. Červená vs. zelená část.'
  },

  {
    id: 5,
    type: 'video',
    videoFormat: 'story-format',
    segment: 'struggling',
    pain: 'Prodělávám, nevím co dělám špatně',
    copy: `Tvoje máma se ptá:

💬 "Tak co, vydělal jsi už něco?"

━━━━━━━━━━━━━━━━━━━━━━━

TY:
😅 "Jo jo, běží to..."

REALITA:
📊 Tržby: 12.000 Kč
💸 Náklady: 35.000 Kč
💔 Zisk: -23.000 Kč

━━━━━━━━━━━━━━━━━━━━━━━

Pak jdeš spát a uvažuješ:

"Možná to není pro mě..."
"Možná jsem blbej..."
"Možná bych měl dělat co dělal..."

━━━━━━━━━━━━━━━━━━━━━━━

❌ NE.

Nejsi blbej.
Jen ti chybí SYSTÉM.

━━━━━━━━━━━━━━━━━━━━━━━

Model podnikání ti dá:

✅ Jasného zákazníka
✅ Jasnou nabídku
✅ Jasný plán jak vydělat
✅ Jasný plán co dělat ZÍTRA

90 minut. Jeden list.
Místo chaosu → jasno.

To je Podnikatelská Čtvrtka.

👉 www.podnikatelskactvrtka.cz

Poznáváš se? 👇

#podnikani #podnikatel #reality #strategie #businessmodel`,
    mediaDescription: 'VIDEO: Story s textem - čísla tržeb/nákladů/ztráty animovaně, smutný emoji, pak flip na ✅ systém s ukázkou Modulu 1 Business Model Canvas. Empatie → řešení.'
  },

  {
    id: 6,
    type: 'static',
    segment: 'universal',
    pain: 'Nevím jak vysvětlit co dělám',
    copy: `Představ si:

Sedíš v kavárně. Káva. Notebook.

Někdo se zeptá:

💬 "Čím se živíš?"

━━━━━━━━━━━━━━━━━━━━━━━

TY:

"No... ehm... mám takovej..."
"Vlastně dělám něco jako..."
"Je to složitý vysvětlit..."

━━━━━━━━━━━━━━━━━━━━━━━

❓ PROBLÉM?

Když TY SÁM nevíš.

Když nemáš jasný:
→ Koho oslovuješ
→ Co nabízíš
→ Proč by to měli koupit

Jak to chceš prodat?

━━━━━━━━━━━━━━━━━━━━━━━

✅ PŘEDSTAV SI MÍSTO TOHO:

💬 "Čím se živíš?"

TY:
"Pomáhám e-shop majitelům zvýšit konverze o 30% za 90 dní."

💬 "Wow, a jak?"

TY:
"Optimalizujem jejich checkout proces a email sekvence."

💬 "To potřebuju!"

━━━━━━━━━━━━━━━━━━━━━━━

Rozdíl?

Model podnikání.

90 minut. Jasná nabídka. Jasný pitch.

To je Podnikatelská Čtvrtka.

👉 www.podnikatelskactvrtka.cz

Umíš vysvětlit co děláš za 10 sekund? 👇

#podnikani #pitch #strategie #clarity #businessmodel`,
    mediaDescription: 'STATIC: Před/Po comparison - vlevo zmatený člověk s "ehm...", vpravo confident pitch v bublině. Jasný vizuální kontrast.'
  },

  {
    id: 7,
    type: 'video',
    videoFormat: 'animated-stats',
    segment: 'operational',
    pain: 'Makám 12h denně, žádné výsledky',
    copy: `6:30 ráno. Budík.

"Dnes to bude jiný..."

━━━━━━━━━━━━━━━━━━━━━━━

8:00 - Zkusím IG posty
10:00 - Možná FB reklamu?
12:00 - Nebo YouTube?
14:00 - Měl bych psát blog?
16:00 - TikTok prý funguje...
18:00 - LinkedIn také...

━━━━━━━━━━━━━━━━━━━━━━━

22:00. Unavený. Vyčerpaný.

❓ Co jsi udělal?

12 hodin práce. 0 výsledků.

━━━━━━━━━━━━━━━━━━━━━━━

PROBLÉM?

Nejde o "víc práce".

Jde o JASNÝ PLÁN.

━━━━━━━━━━━━━━━━━━━━━━━

Model podnikání ti řekne:

✅ PŘESNĚ které 2-3 kanály
✅ PŘESNĚ co tam říct
✅ PŘESNĚ komu to říct
✅ PŘESNĚ jak měřit výsledky

90 minut práce = 30 dní jasnosti.

To je Podnikatelská Čtvrtka.

👉 www.podnikatelskactvrtka.cz

Poznáváš se? 👇

#podnikani #focus #strategie #produktivita #chaos`,
    mediaDescription: 'VIDEO: Animovaný timeline dne (8:00→22:00) s různými platformami, vše rozmazaně → pak přechod na 2-3 jasné kanály v Business Model Canvas. Chaos vs. focus.'
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // KATEGORIE 2: HODNOTA KURZU - KONKRÉTNÍ (10 postů)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 8,
    type: 'video',
    videoFormat: 'screen-recording',
    segment: 'universal',
    pain: 'Nevím jak najít zákazníka',
    copy: `💬 "Udělej si profil ideálního zákazníka!"

To slyšíš všude.

━━━━━━━━━━━━━━━━━━━━━━━

❓ ALE JAK PŘESNĚ?

Většina guru ti řekne:

"Představ si kdo je tvůj zákazník..."
"Dej mu jméno..."
"Napiš jeho bolesti..."

= Doufání. Guessing.

━━━━━━━━━━━━━━━━━━━━━━━

❌ PROBLÉM:

Vymyslíš si "Petra, 35 let, má e-shop"

A pak zjistíš že tvoji REÁLNÍ zákazníci jsou úplně jiní.

━━━━━━━━━━━━━━━━━━━━━━━

✅ V PODNIKATELSKÉ ČTVRTCE:

Máme FIT VALIDÁTOR.

Ne abys SI VYMYSLEL zákazníka.
Ale abys ho NAŠEL a OVĚŘIL.

━━━━━━━━━━━━━━━━━━━━━━━

JAK TO FUNGUJE:

KROK 1: Segment Size Tool
→ Zadáš "e-shop majitelé v ČR"
→ Zjistíš: Přesně 8.500 lidí
→ Je to dost? ANO/NE

KROK 2: Customer Profile Canvas
→ Vyplníš 8 konkrétních otázek
→ NE guessing, ale DATA

KROK 3: FIT Validátor
→ 5 otázek validace
→ Každá musí být ANO
→ 1x NE = STOP, změň segment

━━━━━━━━━━━━━━━━━━━━━━━

= KONKRÉTNÍ nástroj
= KONKRÉTNÍ proces
= KONKRÉTNÍ výsledek

Ne teorie. Ne guessing.

To je Podnikatelská Čtvrtka.

👉 www.podnikatelskactvrtka.cz

Vymýšlíš si zákazníka nebo ho validuješ? 👇

#podnikani #customerprofile #validace #fitvalidator #strategie`,
    mediaDescription: 'VIDEO: Screen recording z kurzu - ukázka všech 3 kroků: 1) Segment Size Tool s čísly, 2) Customer Profile Canvas vyplňování, 3) FIT Validátor s ANO/NE odpověďmi.'
  },

  {
    id: 9,
    type: 'video',
    videoFormat: 'animated-calculator',
    segment: 'struggling',
    pain: 'Nevím jestli mám dost zákazníků',
    copy: `💬 "Je v ČR vůbec dost lidí pro můj byznys?"

Tomáš. 31 let. Kurz copywritingu.

━━━━━━━━━━━━━━━━━━━━━━━

JEHO OBAVY:

❓ "Copywriting je moc niche..."
❓ "Možná není dost lidí..."
❓ "Možná je trh malý..."

= Strach investovat. Strach začít.

━━━━━━━━━━━━━━━━━━━━━━━

Udělal Podnikatelskou Čtvrtku.

Použil SEGMENT SIZE TOOL:

━━━━━━━━━━━━━━━━━━━━━━━

ZADAL:
"Lidé v ČR, 25-45 let, kteří potřebují psát prodejní texty"

VÝSLEDEK:

✅ Marketing manažeři: ~12.000 lidí
✅ Freelanceři: ~3.500 lidí
✅ E-shop majitelé: ~8.500 lidí
✅ Podnikatelé: ~15.000 lidí

= CELKEM: 39.000 potenciálních zákazníků

━━━━━━━━━━━━━━━━━━━━━━━

POČÍTAL DÁL:

Cena kurzu: 2.500 Kč
Potřebuju k 50k/měsíc: 20 zákazníků

20 z 39.000 = 0,05% conversion

━━━━━━━━━━━━━━━━━━━━━━━

Tomáš: "Celou dobu jsem si myslel že je to malý trh. Přitom mi stačí oslovit 0,05% lidí..."

━━━━━━━━━━━━━━━━━━━━━━━

SEGMENT SIZE TOOL.

Přesná čísla místo guessingu.

To je Podnikatelská Čtvrtka.

👉 www.podnikatelskactvrtka.cz

Víš kolik je tvých zákazníků? 👇

#podnikani #segmentsize #data #matematika #strategie`,
    mediaDescription: 'VIDEO: Animace Segment Size Tool - zadání popisu zákazníka → animované počítání → výsledek 39.000 lidí → pak kalkulace 0,05% = REÁLNÉ. Ukázat nástroj v akci.'
  },

  {
    id: 10,
    type: 'static',
    segment: 'universal',
    pain: 'Nevím kde jsou moji zákazníci',
    copy: `📊 "Mám dát reklamy na FB nebo IG?"

❌ ŠPATNÁ otázka.

━━━━━━━━━━━━━━━━━━━━━━━

✅ SPRÁVNÁ otázka:

"Kde jsou moji zákazníci?"

━━━━━━━━━━━━━━━━━━━━━━━

PŘÍKLAD #1:
Zákazník: Majitelé firem, 45-60 let
✅ LinkedIn (ne IG!)

PŘÍKLAD #2:
Zákazník: Mladé mámy, 25-35 let
✅ IG + FB skupiny

PŘÍKLAD #3:
Zákazník: E-shop majitelé
✅ FB skupiny pro podnikatele

━━━━━━━━━━━━━━━━━━━━━━━

Není "nejlepší kanál".

Je jen kanál KDE JSOU TVOJI ZÁKAZNÍCI.

━━━━━━━━━━━━━━━━━━━━━━━

A jak to zjistíš?

Model podnikání → Sekce "Kanály"

90 minut. Budeš vědět PŘESNĚ kde je hledat.

To je Podnikatelská Čtvrtka.

👉 www.podnikatelskactvrtka.cz

Kde jsou tvoji zákazníci? 👇

#podnikani #marketing #kanaly #strategie #businessmodel`,
    mediaDescription: 'STATIC: Infografika - 3 různé zákazníky s ikonami platforem kde je najít. LinkedIn/IG/FB ikony. Visual rozdělení podle segmentu.'
  },

  {
    id: 11,
    type: 'video',
    videoFormat: 'screen-recording',
    segment: 'struggling',
    pain: 'Mluvím o sobě místo o zákazníkovi',
    copy: `Jana. 29 let. Fitness trenérka online.

"Nikomu se neprodává..."

━━━━━━━━━━━━━━━━━━━━━━━

JEJÍ NABÍDKA:

❌ "Online fitness koučink"
❌ "Individuální plány"
❌ "15 let zkušeností"

= 2 zákazníci za 3 měsíce

━━━━━━━━━━━━━━━━━━━━━━━

Udělala Podnikatelskou Čtvrtku.

Vyplnila VALUE PROPOSITION CANVAS:

1. Customer Jobs (Co zákazník chce?)
→ Zhubnout do léta bez hladovění

2. Pains (Co ho štve?)
→ Vyzkoušel 10 diet, nic nefunguje
→ Nemá čas na 2h denně v posilovně

3. Gains (Co chce získat?)
→ -10 kg za 90 dní
→ 30 min/den, z domova

━━━━━━━━━━━━━━━━━━━━━━━

NOVÁ NABÍDKA:

✅ "-10 kg za 90 dní program"
✅ "30 min/den, žádná posilovna"
✅ "Garantuji že to vydrží"

━━━━━━━━━━━━━━━━━━━━━━━

VÝSLEDEK za 60 dní:

💰 23 zákazníků
📈 57.500 Kč tržby
⭐ "Konečně vím CO nabízím"

━━━━━━━━━━━━━━━━━━━━━━━

Rozdíl?

VALUE PROPOSITION CANVAS.

Konkrétní nástroj v Podnikatelské Čtvrtce.

👉 www.podnikatelskactvrtka.cz

Mluvíš o sobě nebo o zákazníkovi? 👇

#podnikani #valueproposition #pribeh #realstory #strategie`,
    mediaDescription: 'VIDEO: Screen recording Value Proposition Canvas z kurzu - vyplňování Customer Jobs/Pains/Gains → ukázat PŘED (features) vs. PO (benefits). Transformace nabídky.'
  },

  {
    id: 12,
    type: 'video',
    videoFormat: 'screen-recording',
    segment: 'universal',
    pain: 'Nevím co dělat ZÍTRA',
    copy: `"Hotovo! Co mám dělat ZÍTRA?"

Tohle se ptá každý po dokončení Čtvrtky.

━━━━━━━━━━━━━━━━━━━━━━━

❌ VĚTŠINA KURZŮ:

"Teď to máš v hlavě, jdi dělat!"

= Zase chaos.

━━━━━━━━━━━━━━━━━━━━━━━

✅ PODNIKATELSKÁ ČTVRTKA:

MODUL 3: AKČNÍ PLÁN

Generuje ti PŘESNÝ plán na příštích 30 dní.

━━━━━━━━━━━━━━━━━━━━━━━

PŘÍKLAD - Máš e-shop s kosmetikou:

TÝDEN 1 (Validace):
→ Pondělí: Najdi 3 FB skupiny
→ Úterý: Napiš 5 lidí s dotazem
→ Středa: Updatuj Value Proposition
→ Čtvrtek: 1 post s value
→ Pátek: Test ceny

TÝDEN 2 (První prodeje):
→ Pondělí: Sežeň 10 emailů
→ Úterý: Pošli email s nabídkou
→ Středa: Follow-up
→ Čtvrtek: 2 organic posty
→ Pátek: Analyzuj výsledky

TÝDEN 3-4: Škálování
→ Konkrétní kroky podle výsledků

━━━━━━━━━━━━━━━━━━━━━━━

= ŽÁDNÉ "jdi to nějak rozjet"

= PŘESNÝ plán na každý den

━━━━━━━━━━━━━━━━━━━━━━━

To je Podnikatelská Čtvrtka.

Nejen strategie. Akční plán.

👉 www.podnikatelskactvrtka.cz

Víš co budeš dělat zítra? 👇

#podnikani #actionplan #konkretne #strategie #execution`,
    mediaDescription: 'VIDEO: Screen recording Modulu 3 - Akční plán - ukázka týdenního plánu s konkrétními kroky den po dni. Timeline vizualizace 30 dní.'
  },

  {
    id: 13,
    type: 'static',
    segment: 'universal',
    pain: 'Nevím co je v tom kurzu',
    copy: `Co je PŘESNĚ v Podnikatelské Čtvrtce?

(Protože "kurz o business modelu" zní vágně)

━━━━━━━━━━━━━━━━━━━━━━━

MODUL 1: MODEL PODNIKÁNÍ (40 min)
→ 9 bloků Business Model Canvas
→ Vyplníš interaktivně
→ Výstup: Kompletní model na 1 listu

━━━━━━━━━━━━━━━━━━━━━━━

MODUL 2: VALUE PROPOSITION (25 min)
→ Customer Profile Canvas
→ Value Map Canvas
→ FIT Validátor (GO/NO GO)
→ Výstup: Víš PŘESNĚ kdo, co, proč

━━━━━━━━━━━━━━━━━━━━━━━

MODUL 3: AKČNÍ PLÁN (25 min)
→ 30denní execution plán
→ Co dělat každý týden
→ Jak měřit výsledky
→ Výstup: Jasný plán na zítra

━━━━━━━━━━━━━━━━━━━━━━━

NÁSTROJE (interaktivní):

✅ TARGET KALKULAČKA
Input: Cíl + cena
Output: Kolik zákazníků potřebuješ

✅ SEGMENT SIZE TOOL
Input: Popis zákazníka
Output: Kolik jich je v ČR

✅ PROFIT KALKULAČKA
Input: Náklady + tržby
Output: Zisk na zákazníka

✅ FIT VALIDÁTOR
Input: 5 odpovědí
Output: GO / NO GO

━━━━━━━━━━━━━━━━━━━━━━━

= 90 minut
= 16 lekcí
= 4 nástroje
= 1 hotový business model

Žádná teorie. Jen výstupy.

👉 www.podnikatelskactvrtka.cz

Co z toho potřebuješ nejvíc? 👇

#podnikani #kurz #konkretne #nastroje #businessmodel`,
    mediaDescription: 'STATIC: Infografika - 3 moduly + 4 nástroje s ikonami. Přehledná struktura co přesně dostaneš. Screenshot z platformy.'
  },

  {
    id: 14,
    type: 'video',
    videoFormat: 'comparison',
    segment: 'struggling',
    pain: 'Ztrácím čas střílením naslepo',
    copy: `⚡ 90 minut vs 90 dní

━━━━━━━━━━━━━━━━━━━━━━━

BEZ STRATEGIE (90 dní):

Den 1-30:
"Zkusím IG posty"
Výsledek: 10 followerů

Den 31-60:
"Možná zkusím FB reklamy"
Výsledek: -5.000 Kč

Den 61-90:
"Asi to není pro mě..."
Výsledek: Chci to vzdát

━━━━━━━━━━━━━━━━━━━━━━━

SE STRATEGIÍ (90 minut):

✅ Jasný zákazník
✅ Jasná nabídka
✅ Jasný plán
✅ Jasné čísla

→ Pak 90 dní EXEKUCE

━━━━━━━━━━━━━━━━━━━━━━━

ROZDÍL?

90 minut na začátku = ušetří 90 dní chaosu

━━━━━━━━━━━━━━━━━━━━━━━

To je Model podnikání.
To je Podnikatelská Čtvrtka.

90 minut investice.
90 dní jasného směru.

👉 www.podnikatelskactvrtka.cz

Máš strategii nebo střílíš naslepo? 👇

#podnikani #strategie #timemanagement #businessmodel #efektivita`,
    mediaDescription: 'VIDEO: Split screen comparison - vlevo chaos 90 dní (declining chart), vpravo 90 minut strategie → pak ascending chart. Vizuální kontrast.'
  },

  {
    id: 15,
    type: 'video',
    videoFormat: 'animated-list',
    segment: 'universal',
    pain: 'Nevím jestli je to pro mě',
    copy: `🔥 Co se naučíš v Podnikatelské Čtvrtce:

━━━━━━━━━━━━━━━━━━━━━━━

MODUL 1: MODEL PODNIKÁNÍ
→ Kdo je tvůj zákazník
→ Co mu nabízíš
→ Jak vyděláš

━━━━━━━━━━━━━━━━━━━━━━━

MODUL 2: FIT VALIDÁTOR
→ Má to šanci?
→ Je tam dost lidí?
→ Zaplatí za to?

━━━━━━━━━━━━━━━━━━━━━━━

MODUL 3: AKČNÍ PLÁN
→ Konkrétní kroky
→ Co dělat zítra
→ Jak měřit výsledky

━━━━━━━━━━━━━━━━━━━━━━━

+ INTERAKTIVNÍ NÁSTROJE:
✅ Kalkulačka cílů
✅ Kalkulačka profitu
✅ FIT validátor
✅ Canvas šablony

━━━━━━━━━━━━━━━━━━━━━━━

VÝSLEDEK:

Kompletní strategie na 1 listu.
90 minut práce.
Žádná teorie.

👉 www.podnikatelskactvrtka.cz

Co z toho potřebuješ nejvíc? 👇

#podnikani #onlinekurz #businessmodel #strategie #vzdelavani`,
    mediaDescription: 'VIDEO: Animovaný list všech 3 modulů + nástrojů - objevují se postupně s ikonami. Motion graphics styl.'
  },

  {
    id: 16,
    type: 'static',
    segment: 'struggling',
    pain: 'Nevím jestli vydělávám nebo prodělávám',
    copy: `💸 "Kolik stojí zákazník?"

To je ta NEJDŮLEŽITĚJŠÍ otázka.

━━━━━━━━━━━━━━━━━━━━━━━

PŘÍKLAD:

FB reklama: 1.000 Kč
Kliklo: 100 lidí
Koupilo: 2 lidi

→ Cena 1 zákazníka = 500 Kč

Zákazník utratí: 2.500 Kč
Tvůj zisk: 1.000 Kč

━━━━━━━━━━━━━━━━━━━━━━━

ZISKOVOST:

Utratil jsi: 500 Kč
Vydělal jsi: 1.000 Kč

✅ PROFIT: +500 Kč na zákazníka

→ Můžeš škálovat! 🚀

━━━━━━━━━━━━━━━━━━━━━━━

90% podnikatelů tohle NEVÍ.

Investují do reklam.
Ale nevědí jestli prodělávají.

━━━━━━━━━━━━━━━━━━━━━━━

Tohle je basic.
Tohle musíš vědět.

A přesně tohle tě naučí Podnikatelská Čtvrtka.

90 minut. Včetně kalkulaček.

👉 www.podnikatelskactvrtka.cz

Víš kolik tě stojí 1 zákazník? 👇

#podnikani #matematika #profit #reklama #strategie`,
    mediaDescription: 'STATIC: Infografika - flow chart: 1.000 Kč reklama → 100 kliků → 2 prodeje → 500 Kč/zákazník → profit calculation. Zelená čísla pro zisk.'
  },

  {
    id: 17,
    type: 'video',
    videoFormat: 'screen-recording',
    segment: 'universal',
    pain: 'Nevím jestli to má šanci',
    copy: `3 věci které každý podnikatel potřebuje:

1️⃣ JASNÉHO ZÁKAZNÍKA
❌ "Všichni od 18 do 65"
✅ "E-shop majitel, 30-45, chce růst"

2️⃣ JASNOU HODNOTU
❌ "Dělám weby"
✅ "Web který přinese 10 objednávek týdně"

3️⃣ JASNÝ PLÁN
❌ "Zkusím to nějak rozjet..."
✅ "3 kroky které udělám zítra"

━━━━━━━━━━━━━━━━━━━━━━━

Tohle není rocket science.

Tohle je Model podnikání.

90 minut. Jeden list. Vyplníš a máš jasno.

To je Podnikatelská Čtvrtka.

👉 www.podnikatelskactvrtka.cz

Co ti chybí nejvíc - zákazník, hodnota nebo plán? 👇

#podnikani #strategie #businesstips #businessmodel #zaklady`,
    mediaDescription: 'VIDEO: Screen recording - 3 části Business Model Canvas: 1) Customer Segments, 2) Value Proposition, 3) Channels. Ukázat vyplňování v kurzu.'
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // KATEGORIE 3: SOCIAL PROOF & CASE STUDIES (5 postů)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 18,
    type: 'video',
    videoFormat: 'story-format',
    segment: 'struggling',
    pain: 'Dělám všechno pro všechny',
    copy: `Lukáš. 27 let. Grafik freelancer.

"Dělám všechno pro všechny. Neprodává se to."

━━━━━━━━━━━━━━━━━━━━━━━

PŘED:

💼 "Loga, letáky, weby, prezentace..."
👥 "Pro kohokoliv"
💸 3 zakázky/měsíc = 15.000 Kč
⏰ Makání 60h/týden

❌ "Kdybych měl víc zakázek..."

━━━━━━━━━━━━━━━━━━━━━━━

Udělal Podnikatelskou Čtvrtku.

Segment Size Tool ukázal:
→ Realitní kanceláře v ČR: 2.800

Target Kalkulačka:
→ K 50k potřebuju: 10 zakázek po 5.000 Kč
→ 10 z 2.800 = REÁLNÉ

━━━━━━━━━━━━━━━━━━━━━━━

NOVÁ NABÍDKA:

✅ "Prodejní prezentace pro realitky"
✅ "Balíček: 5 nemovitostí = 5.000 Kč"
✅ "Dodání za 48h"

━━━━━━━━━━━━━━━━━━━━━━━

VÝSLEDEK za 60 dní:

💰 14 zakázek = 70.000 Kč
⏰ Práce 30h/týden (ne 60h!)
📈 Opakující se klienti

━━━━━━━━━━━━━━━━━━━━━━━

Lukáš: "90 minut které změnily můj byznys. Místo 'všechno pro všechny' mám jasnou specializaci."

━━━━━━━━━━━━━━━━━━━━━━━

To je Podnikatelská Čtvrtka.

👉 www.podnikatelskactvrtka.cz

Děláš všechno pro všechny? 👇

#podnikani #pribeh #transformation #realstory #strategie`,
    mediaDescription: 'VIDEO: Story formát - PŘED (chaos mnoho služeb) → Čtvrtka → PO (focus 1 služba). Before/After stats animované. Ukázat transformaci.'
  },

  {
    id: 19,
    type: 'video',
    videoFormat: 'screen-recording',
    segment: 'struggling',
    pain: 'Mám produkt ale nekupují',
    copy: `David. 36 let. Konzultant pro e-shopy.

"Investoval jsem 25.000 Kč do reklam. 2 zakázky."

━━━━━━━━━━━━━━━━━━━━━━━

PŘED:

FB REKLAMY:
→ Cílení: "E-commerce, marketing"
→ 180.000 lidí v publiku
→ Text: "Pomůžu vám s e-shopem"

VÝSLEDEK:
💸 25.000 Kč investováno
👥 2 zakázky za 15.000 Kč
📉 -10.000 Kč ztráta

❌ "Reklamy nefungují..."

━━━━━━━━━━━━━━━━━━━━━━━

Udělal Podnikatelskou Čtvrtku.

BUSINESS MODEL CANVAS:
→ Zákazník: "E-shop 500k-2M Kč, stagnující"
→ Hodnota: "+30% tržby za 90 dní"

SEGMENT SIZE TOOL:
→ E-shopy 500k-2M v ČR: ~1.200 firem
→ Potřebuju: 4 zakázky po 20k
→ 4 z 1.200 = 0,3% = REÁLNÉ

━━━━━━━━━━━━━━━━━━━━━━━

NOVÝ PŘÍSTUP (BEZ REKLAM):

✅ LinkedIn outreach
✅ FB skupiny s case studies
✅ Positioning: "+30% tržby za 90 dní"
✅ Cena: 20.000 Kč

━━━━━━━━━━━━━━━━━━━━━━━

VÝSLEDEK za 60 dní:

💰 0 Kč do reklam
📈 7 zakázek = 140.000 Kč
⭐ "Místo 180k publika cílím 1.200 lidí"

━━━━━━━━━━━━━━━━━━━━━━━

David: "Celou dobu jsem řešil ŠÍŘKU. Potřeboval jsem HLOUBKU."

━━━━━━━━━━━━━━━━━━━━━━━

To je Business Model Canvas v Podnikatelské Čtvrtce.

👉 www.podnikatelskactvrtka.cz

Cílíš na tisíce nebo stovky? 👇

#podnikani #targeting #pribeh #realstory #strategie`,
    mediaDescription: 'VIDEO: Screen recording - ukázka změny v Business Model Canvas: široké cílení → úzké cílení. Comparison 180.000 vs. 1.200 s výsledky.'
  },

  {
    id: 20,
    type: 'video',
    videoFormat: 'animated-stats',
    segment: 'beginner',
    pain: 'Nevím co dělám špatně',
    copy: `💬 "Mám skvělý produkt, ale nevím jak ho dostat k lidem."

Slyšel jsem to stokrát.

━━━━━━━━━━━━━━━━━━━━━━━

PŘED:
→ Zkouším 10 věcí najednou
→ "Musím být všude!"
→ Makám 12h denně
→ Nevím co funguje
→ Žádné výsledky

━━━━━━━━━━━━━━━━━━━━━━━

PO:
→ 2-3 kanály (ne 10!)
→ Přesně vím kdo je zákazník
→ Vím co mu říct
→ Vím jak měřit výsledky
→ Výsledky viditelné do týdne

━━━━━━━━━━━━━━━━━━━━━━━

Rozdíl?

Model podnikání.

Strategie na jednom listu.
90 minut práce.
Žádná teorie.

To je Podnikatelská Čtvrtka.

16 interaktivních lekcí.
Vyplňuješ a máš hotovo.

👉 www.podnikatelskactvrtka.cz

Poznáváš se v "PŘED"? 👇

#podnikani #strategie #predpo #businessmodel #reseni`,
    mediaDescription: 'VIDEO: Animované stats - PŘED: 10 kanálů rozptýlené → PO: 2-3 kanály focused. Vizuální scatter → focus. Chart growth.'
  },

  {
    id: 21,
    type: 'static',
    segment: 'struggling',
    pain: 'Konec chaosu',
    copy: `🔄 KONEC CHAOSU

━━━━━━━━━━━━━━━━━━━━━━━

MINULÝ MĚSÍC:

📱 20 IG postů → 3 lajky
💸 5.000 Kč do FB reklam → 0 prodejů
⏰ 80 hodin práce → 0 výsledků

"Možná to není pro mě..."

━━━━━━━━━━━━━━━━━━━━━━━

TENTO MĚSÍC:

📊 Model podnikání hotový
🎯 Jasný zákazník
💡 Jasná nabídka
📈 Jasný plán

"Teď to dává smysl!"

━━━━━━━━━━━━━━━━━━━━━━━

CO SE ZMĚNILO?

90 minut práce.
Jedna Podnikatelská Čtvrtka.

━━━━━━━━━━━━━━━━━━━━━━━

Místo chaosu → systém.
Místo doufání → jasno.

👉 www.podnikatelskactvrtka.cz

Už tě to nebaví taky? 👇

#podnikani #chaos #system #strategie #zmena`,
    mediaDescription: 'STATIC: Před/Po kalendář - vlevo chaos (červené X), vpravo systém (zelené checkmarky). Visual contrast.'
  },

  {
    id: 22,
    type: 'video',
    videoFormat: 'story-format',
    segment: 'struggling',
    pain: 'Špatný messaging',
    copy: `Petra. 32 let. Online kurzy time managementu.

"Mám skvělý produkt ale nikdo to nekupuje."

━━━━━━━━━━━━━━━━━━━━━━━

PŘED:

📦 "Kurz o Time managementu"
💰 1.990 Kč
👥 "Mámy co nemají čas"
📊 3 měsíce = 4 prodané kurzy

❌ "Možná je to moc drahé..."

━━━━━━━━━━━━━━━━━━━━━━━

Udělala Podnikatelskou Čtvrtku.

VALUE PROPOSITION CANVAS odhalil:

Customer PAINS:
✅ Nestíhám ani dopsat zprávu
✅ Cítím se jako špatná máma

Customer GAINS:
✅ Chci mít čas NA SEBE
✅ Chci být dobrá máma A mít kariéru

━━━━━━━━━━━━━━━━━━━━━━━

NOVÁ NABÍDKA (stejný produkt!):

❌ "Time management pro mámy"
✅ "1 hodina denně JEN PRO SEBE"

❌ "Naučím tě organizovat čas"
✅ "90 dní: Kariéra + rodina + já"

❌ Features
✅ Transformation

━━━━━━━━━━━━━━━━━━━━━━━

VÝSLEDEK za 45 dní:

💰 31 prodaných kurzů
📈 61.690 Kč tržby
⭐ "Stejný produkt. Jiný messaging."

━━━━━━━━━━━━━━━━━━━━━━━

Petra: "Problém nebyl produkt. Problém byl že jsem nerozuměla zákazníkovi."

━━━━━━━━━━━━━━━━━━━━━━━

VALUE PROPOSITION CANVAS v Podnikatelské Čtvrtce.

👉 www.podnikatelskactvrtka.cz

Rozumíš svému zákazníkovi? 👇

#podnikani #valueproposition #pribeh #messaging #strategie`,
    mediaDescription: 'VIDEO: Story - PŘED nabídka (features) → Value Proposition Canvas → PO nabídka (transformation). Ukázat změnu copy.'
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // KATEGORIE 4: ODBOURÁNÍ OBAV (5 postů)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 23,
    type: 'static',
    segment: 'universal',
    pain: 'Je to drahý?',
    copy: `💬 "Je to drahý?"

Podnikatelská Čtvrtka: 1.990 Kč

━━━━━━━━━━━━━━━━━━━━━━━

POROVNEJ:

❌ FB Konzultant: 5.000-15.000 Kč
❌ Business kouč: 10.000-30.000 Kč
❌ 3denní workshop: 8.000-20.000 Kč

━━━━━━━━━━━━━━━━━━━━━━━

✅ Podnikatelská Čtvrtka: 1.990 Kč

+ DOSTANEŠ:
→ Kompletní business model
→ 4 interaktivní nástroje
→ 30denní akční plán
→ Lifetime přístup

━━━━━━━━━━━━━━━━━━━━━━━

ROI KALKULACE:

Získáš 1 zákazníka navíc = ZAPLACENO

Získáš jasno = UŠETŘÍŠ měsíce chaosu

━━━━━━━━━━━━━━━━━━━━━━━

1.990 Kč vs. měsíce ztraceného času?

To není náklad. To je investice.

👉 www.podnikatelskactvrtka.cz

#podnikani #investice #roi #hodnota #strategie`,
    mediaDescription: 'STATIC: Infografika - price comparison: konzultant/kouč/workshop vs. Čtvrtka. ROI calculation. Zelená vs. červená čísla.'
  },

  {
    id: 24,
    type: 'video',
    videoFormat: 'screen-recording',
    segment: 'universal',
    pain: 'Je to další teorie?',
    copy: `💬 "Je to další teoretický kurz?"

❌ NE.

━━━━━━━━━━━━━━━━━━━━━━━

CO TO NENÍ:

❌ Hodiny videokvízu
❌ "Teď si mysli o svém byznysu..."
❌ Obecné teorie
❌ PDF ke stažení

━━━━━━━━━━━━━━━━━━━━━━━

CO TO JE:

✅ VYPLŇUJEŠ, ne sleduješ
✅ NÁSTROJE, ne teorie
✅ VÝSTUPY, ne poznámky
✅ 90 MINUT, ne 20 hodin

━━━━━━━━━━━━━━━━━━━━━━━

PŘÍKLAD:

TARGET KALKULAČKA:
→ Zadáš: Cíl 50.000 Kč, produkt 2.500 Kč
→ Dostaneš: 20 zákazníků/měsíc
→ HOTOVO. POUŽITELNÉ. TEĎ.

━━━━━━━━━━━━━━━━━━━━━━━

BUSINESS MODEL CANVAS:
→ Vyplníš 9 bloků
→ Máš strategie na 1 listu
→ HOTOVO. POUŽITELNÉ. TEĎ.

━━━━━━━━━━━━━━━━━━━━━━━

Žádná teorie.
Jen konkrétní výstupy.

To je Podnikatelská Čtvrtka.

👉 www.podnikatelskactvrtka.cz

#podnikani #prakticke #nastroje #konkretne #businessmodel`,
    mediaDescription: 'VIDEO: Screen recording - ukázka vyplňování nástroje v real-time. Zadání → okamžitý výsledek. Practical, ne theoretical.'
  },

  {
    id: 25,
    type: 'static',
    segment: 'universal',
    pain: 'Nemám čas',
    copy: `💬 "Nemám čas na další kurz..."

Chápu.

━━━━━━━━━━━━━━━━━━━━━━━

POROVNEJ:

❌ Googlení každý večer: 2h × 30 dní = 60 hodin
❌ Zkoušení naslepo: 90 dní chaosu
❌ 3denní workshop: 24 hodin + cesta

━━━━━━━━━━━━━━━━━━━━━━━

✅ Podnikatelská Čtvrtka: 90 MINUT

━━━━━━━━━━━━━━━━━━━━━━━

CO ZÍSKÁŠ ZA 90 MINUT:

✅ Kompletní business model
✅ Jasný zákazník
✅ Jasná nabídka
✅ 30denní akční plán
✅ Víš co dělat ZÍTRA

━━━━━━━━━━━━━━━━━━━━━━━

OTÁZKA:

Máš čas na 90 dní chaosu?

NEBO

Máš 90 minut na jasno?

━━━━━━━━━━━━━━━━━━━━━━━

90 minut vs. 90 dní.

Ty rozhodneš.

👉 www.podnikatelskactvrtka.cz

#podnikani #cas #efektivita #strategie #businessmodel`,
    mediaDescription: 'STATIC: Infografika - časová osa: 60h googling vs. 90 minut Čtvrtka. Visual time comparison.'
  },

  {
    id: 26,
    type: 'video',
    videoFormat: 'screen-recording',
    segment: 'universal',
    pain: 'Je to pro můj obor?',
    copy: `💬 "Je to pro můj obor?"

ANO.

━━━━━━━━━━━━━━━━━━━━━━━

Model podnikání potřebuje:

✅ E-shop s oblečením
✅ Konzultant pro HR
✅ Fitness trenér online
✅ Grafik freelancer
✅ Realitní makléř
✅ Kouč pro podnikatele
✅ Výrobce svíček
✅ VA (virtuální asistent)
✅ Prodejce kurzů
✅ Každý kdo chce vydělávat

━━━━━━━━━━━━━━━━━━━━━━━

PROTOŽE:

Všichni potřebujete:
→ Vědět KDO je zákazník
→ Vědět CO mu nabízíte
→ Vědět JAK ho najdete
→ Vědět JAK vyděláte

━━━━━━━━━━━━━━━━━━━━━━━

To není specifické pro obor.

To je základ podnikání.

━━━━━━━━━━━━━━━━━━━━━━━

Podnikatelská Čtvrtka =
Framework pro KAŽDÝ byznys.

90 minut. Tvůj obor. Tvá strategie.

👉 www.podnikatelskactvrtka.cz

#podnikani #businessmodel #universal #strategie #vsechnyobory`,
    mediaDescription: 'VIDEO: Screen recording - ukázka různých oborů v Business Model Canvas. Různé segmenty, různé value proposition. Univerzálnost nástroje.'
  },

  {
    id: 27,
    type: 'video',
    videoFormat: 'comparison',
    segment: 'universal',
    pain: 'Je to složité?',
    copy: `💬 "Je to složité?"

❌ NE. Je to jednoduchý.

━━━━━━━━━━━━━━━━━━━━━━━

KLASICKÝ BUSINESS PLÁN:

❌ 50+ stran dokumentu
❌ Financial projections
❌ SWOT analýza
❌ Competitive landscape
❌ 20 hodin práce
❌ Nikdo to nečte

━━━━━━━━━━━━━━━━━━━━━━━

BUSINESS MODEL CANVAS:

✅ 1 list
✅ 9 bloků
✅ Vyplníš za 90 minut
✅ Používáš HNED

━━━━━━━━━━━━━━━━━━━━━━━

VEDEME TĚ ZA RUKU:

Krok 1: Odpověz na otázku
Krok 2: Vyplň pole
Krok 3: Další otázka

= Žádné "teď si mysli..."
= Konkrétní instrukce

━━━━━━━━━━━━━━━━━━━━━━━

To je Podnikatelská Čtvrtka.

Jednoduše. Rychle. Efektivně.

👉 www.podnikatelskactvrtka.cz

#podnikani #jednoduche #businessmodel #strategie #framework`,
    mediaDescription: 'VIDEO: Comparison - vlevo 50 stran business plánu (chaos), vpravo 1 list Canvas (jednoduchost). Split screen contrast.'
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // KATEGORIE 5: URGENCY & FOMO (2 posty)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 28,
    type: 'video',
    videoFormat: 'animated-countdown',
    segment: 'universal',
    pain: 'Urgence - sleva končí',
    copy: `⏰ 24 HODIN

━━━━━━━━━━━━━━━━━━━━━━━

Právě TEĎKA:

✅ Podnikatelská Čtvrtka
✅ Sleva 40%
✅ Místo 3.290 Kč → 1.990 Kč

━━━━━━━━━━━━━━━━━━━━━━━

ZA 24 HODIN:

❌ Sleva mizí
❌ Plná cena 3.290 Kč

━━━━━━━━━━━━━━━━━━━━━━━

CO ZÍSKÁŠ:

✅ Kompletní business model (40 min)
✅ FIT Validátor (25 min)
✅ 30denní akční plán (25 min)
✅ 4 interaktivní nástroje
✅ Lifetime přístup

= 90 minut do jasné strategie

━━━━━━━━━━━━━━━━━━━━━━━

OTÁZKA:

Máš 90 minut DNES?

NEBO

Další 90 dní chaosu?

━━━━━━━━━━━━━━━━━━━━━━━

⏰ Sleva platí 24 hodin

👉 www.podnikatelskactvrtka.cz

#podnikani #sleva #akce #limitovano #strategie`,
    mediaDescription: 'VIDEO: Animovaný countdown timer - 24:00:00 → odečítá se. Urgence. Červený akcent. Fake urgency ale efektivní.'
  },

  {
    id: 29,
    type: 'static',
    segment: 'struggling',
    pain: 'Ztráta času = ztráta peněz',
    copy: `💸 Kolik tě stojí čekání?

━━━━━━━━━━━━━━━━━━━━━━━

BEZ STRATEGIE (další měsíc):

→ 30 dní zkoušení naslepo
→ 5.000 Kč do FB reklam
→ 80 hodin práce
→ 0-3 zákazníky

= ZTRÁTA: 5.000 Kč + 80 hodin

━━━━━━━━━━━━━━━━━━━━━━━

SE STRATEGIÍ (90 minut):

→ 90 minut jasno
→ Pak 30 dní EFEKTIVNÍ exekuce
→ Víš KDE, KOMU, CO
→ Měřitelné výsledky

= ZISK: Jasnost + výsledky

━━━━━━━━━━━━━━━━━━━━━━━

Každý den bez strategie =
Další den ztráty.

━━━━━━━━━━━━━━━━━━━━━━━

OTÁZKA:

Kolik dní ještě budeš čekat?

━━━━━━━━━━━━━━━━━━━━━━━

Podnikatelská Čtvrtka: 1.990 Kč
Sleva 40% platí 24 hodin

👉 www.podnikatelskactvrtka.cz

#podnikani #urgence #ztrata #cas #strategie`,
    mediaDescription: 'STATIC: Infografika - cost of waiting: Každý den = ztráta X Kč. Timeline s declining money. Urgence vizuálně.'
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // KATEGORIE 6: FREE VALUE & TEASERS (3 posty)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 30,
    type: 'static',
    segment: 'universal',
    pain: 'Quick win - vzorec zdarma',
    copy: `🎁 FREE VZOREC

━━━━━━━━━━━━━━━━━━━━━━━

Chceš vědět KOLIK ZÁKAZNÍKŮ potřebuješ?

Tady je vzorec (ZDARMA):

━━━━━━━━━━━━━━━━━━━━━━━

📊 VZOREC:

Tvůj měsíční cíl ÷ Průměrná hodnota zákazníka = Počet zákazníků

━━━━━━━━━━━━━━━━━━━━━━━

PŘÍKLAD:

Cíl: 50.000 Kč/měsíc
Zákazník platí: 2.500 Kč

50.000 ÷ 2.500 = 20 zákazníků/měsíc

= 5 zákazníků/týden
= 1 zákazník/den

━━━━━━━━━━━━━━━━━━━━━━━

TEĎ OTÁZKA:

Co je snazší?

❌ "Musím mít 10k followerů"
✅ "Potřebuju 1 zákazníka denně"

━━━━━━━━━━━━━━━━━━━━━━━

Tohle je 1 z nástrojů v Podnikatelské Čtvrtce.

TARGET KALKULAČKA všechno počítá za tebe.

━━━━━━━━━━━━━━━━━━━━━━━

Chceš víc nástrojů?

👉 www.podnikatelskactvrtka.cz

Jaké jsou tvoje čísla? Napiš do komentářů 👇

#podnikani #free #vzorec #matematika #strategie`,
    mediaDescription: 'STATIC: Infografika - vzorec s příkladem. Clean design, sdílitelné. Gift box emoji nebo ikona. Free value.'
  }
];

// ═══════════════════════════════════════════════════════════
// 🎨 KOMPONENTA - PREVIEW & EXPORT
// ═══════════════════════════════════════════════════════════

export default function OrganicSocialPosts() {
  const [selectedPost, setSelectedPost] = useState(1);
  const [copiedPost, setCopiedPost] = useState<number | null>(null);

  const currentPost = SOCIAL_POSTS[selectedPost - 1];

  const copyToClipboard = (text: string, postId: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPost(postId);
    setTimeout(() => setCopiedPost(null), 2000);
  };

  const downloadSchedule = () => {
    const schedule = SOCIAL_POSTS.map((post, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POST #${post.id} - ${date.toLocaleDateString('cs-CZ')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TYPE: ${post.type.toUpperCase()}
${post.videoFormat ? `VIDEO FORMAT: ${post.videoFormat}` : ''}
SEGMENT: ${post.segment}
PAIN: ${post.pain}

MEDIA:
${post.mediaDescription}

COPY:
${post.copy}

`;
    }).join('\n\n');

    const blob = new Blob([schedule], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '30-dnu-organic-posts-schedule.txt';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl mb-2">
              🚀 30 Postů Co Grálají
            </h1>
            <p className="text-slate-300">
              Organic content bank - 1 post denně po 30 dní
            </p>
          </div>
          <button
            onClick={downloadSchedule}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <Download size={20} />
            Export All
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Video size={20} className="text-purple-400" />
              <span className="text-sm text-slate-300">Video Posts</span>
            </div>
            <div className="text-2xl">
              {SOCIAL_POSTS.filter(p => p.type === 'video').length}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <ImageIcon size={20} className="text-blue-400" />
              <span className="text-sm text-slate-300">Static Posts</span>
            </div>
            <div className="text-2xl">
              {SOCIAL_POSTS.filter(p => p.type === 'static').length}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Target size={20} className="text-green-400" />
              <span className="text-sm text-slate-300">Segments</span>
            </div>
            <div className="text-2xl">
              {new Set(SOCIAL_POSTS.map(p => p.segment)).size}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={20} className="text-orange-400" />
              <span className="text-sm text-slate-300">Total Days</span>
            </div>
            <div className="text-2xl">30</div>
          </div>
        </div>
      </div>

      {/* Post Selector */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Vyber Post:</h2>
            <div className="text-sm text-slate-300">
              Post {selectedPost} / 30
            </div>
          </div>

          <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
            {SOCIAL_POSTS.map((post) => (
              <button
                key={post.id}
                onClick={() => setSelectedPost(post.id)}
                className={`
                  aspect-square rounded-lg transition-all
                  ${selectedPost === post.id
                    ? 'bg-purple-600 scale-110 shadow-lg'
                    : 'bg-white/20 hover:bg-white/30'
                  }
                `}
              >
                {post.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Post Preview */}
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Post Details */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">Post #{currentPost.id}</h2>
              <div className="flex gap-2">
                {currentPost.type === 'video' ? (
                  <div className="flex items-center gap-2 px-3 py-1 bg-purple-600/50 rounded-full text-sm">
                    <Video size={16} />
                    Video
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-600/50 rounded-full text-sm">
                    <ImageIcon size={16} />
                    Static
                  </div>
                )}
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-3 mb-6">
              <div>
                <div className="text-sm text-slate-400 mb-1">Segment:</div>
                <div className="px-3 py-1 bg-green-600/30 rounded inline-block">
                  {currentPost.segment}
                </div>
              </div>

              <div>
                <div className="text-sm text-slate-400 mb-1">Pain Point:</div>
                <div className="text-orange-300">{currentPost.pain}</div>
              </div>

              {currentPost.videoFormat && (
                <div>
                  <div className="text-sm text-slate-400 mb-1">Video Format:</div>
                  <div className="text-purple-300">{currentPost.videoFormat}</div>
                </div>
              )}
            </div>

            {/* Media Description */}
            <div className="bg-black/30 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={16} className="text-yellow-400" />
                <span className="text-sm text-slate-300">Media Instructions:</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {currentPost.mediaDescription}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedPost(Math.max(1, selectedPost - 1))}
                disabled={selectedPost === 1}
                className="flex-1 px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                ← Předchozí
              </button>
              <button
                onClick={() => setSelectedPost(Math.min(30, selectedPost + 1))}
                disabled={selectedPost === 30}
                className="flex-1 px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                Další →
              </button>
            </div>
          </div>

          {/* Right: Copy Preview */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">Copy Preview</h3>
              <button
                onClick={() => copyToClipboard(currentPost.copy, currentPost.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                  ${copiedPost === currentPost.id
                    ? 'bg-green-600'
                    : 'bg-purple-600 hover:bg-purple-700'
                  }
                `}
              >
                {copiedPost === currentPost.id ? (
                  <>
                    <Check size={20} />
                    Zkopírováno!
                  </>
                ) : (
                  <>
                    <Copy size={20} />
                    Kopírovat
                  </>
                )}
              </button>
            </div>

            <div className="bg-black/30 rounded-lg p-6 max-h-[600px] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {currentPost.copy}
              </pre>
            </div>

            <div className="mt-4 p-3 bg-blue-600/20 border border-blue-400/30 rounded-lg">
              <div className="flex items-start gap-2">
                <Sparkles size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                <div className="text-sm text-slate-200">
                  <strong>Tip:</strong> Natočíš video/grafiku podle "Media Instructions" 
                  a přidáš tento text jako popisek na FB/IG.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publishing Schedule Preview */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl mb-4">📅 Publishing Schedule (Next 7 Days)</h2>
          <div className="space-y-2">
            {SOCIAL_POSTS.slice(0, 7).map((post, index) => {
              const date = new Date();
              date.setDate(date.getDate() + index);
              return (
                <div
                  key={post.id}
                  className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="text-sm text-slate-400 w-24">
                    {date.toLocaleDateString('cs-CZ', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </div>
                  <div className="flex items-center gap-2">
                    {post.type === 'video' ? (
                      <Video size={16} className="text-purple-400" />
                    ) : (
                      <ImageIcon size={16} className="text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1 text-sm truncate">
                    {post.copy.split('\n')[0]}
                  </div>
                  <div className="text-xs text-slate-400 px-2 py-1 bg-white/10 rounded">
                    {post.segment}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

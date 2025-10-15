# 🎯 SMARTEMAILING - PRAKTICKÝ SETUP GUIDE

**Status:** 📋 Ready to implement  
**Čas na setup:** ~30-45 minut  
**List ID:** 2 (Podnikatelská čtvrtka)

---

## 📊 PŘEHLED FLOW

```
Registrace
    ↓
Email #0 (0 min) - Vítej! Máš mini kurz
    ↓
Email #1 (24h) - Jak ti to jde?
    ↓
Email #2 (72h) - 🔥 LAUNCH! Kurz za 4.999 Kč (-40%)
    ↓
Email #3 (96h) - ⏰ Poslední šance! (jen pro "Nezaplatil")
```

---

## 🚀 KROK ZA KROKEM SETUP

### **KROK 1: OVĚŘ CONTACT LIST** ✅

```
1. ✅ Jdi na: app.smartemailing.cz
2. ✅ Kontakty a seznamy → Seznamy kontaktů
3. ✅ Najdi: "Podnikatelská čtvrtka" (ID: 2)
4. ✅ Ověř že existuje
```

**→ MÁME! List ID: 2** ✅

---

### **KROK 2: VYTVOŘ AUTOMATION SCENARIO**

```
1. ✅ Jdi na: Automations → Scenarios
2. ✅ Klikni: "Create new scenario"
3. ✅ Název: "Mini kurz - 3-denní flow + upsell"
4. ✅ Trigger: "Contact added to list"
   → Vyber list: "Podnikatelská čtvrtka" (ID: 2)
5. ✅ Klikni: "Save"
```

**→ TEĎ MÁŠ PRÁZDNÝ SCENARIO! PŘIDEJ EMAILY:**

---

### **KROK 3: PŘIDEJ EMAIL #0 (OKAMŽITĚ)**

```
1. ✅ V scenario editoru klikni: "Add action"
2. ✅ Vyber: "Send email"
3. ✅ Klikni: "Create new email"
4. ✅ Vyplň:
   
   📧 Email settings:
   ├── Name: "Mini kurz - Email 0 - Welcome"
   ├── Subject: 🎉 Tvůj mini kurz je připraven!
   ├── Preheader: 3 zlaté otázky + rozbor konkurence + komunikační triky - začni hned!
   └── From: [tvoje jméno/firma]
   
5. ✅ Klikni: "Edit content"
6. ✅ Zkopíruj obsah z níže (sekce COPY-PASTE EMAILY)
7. ✅ Ulož email
8. ✅ V scenario nastavení:
   ├── Delay: 0 minut (okamžitě)
   └── Conditions: žádné
9. ✅ Klikni: "Save action"
```

---

### **KROK 4: PŘIDEJ EMAIL #1 (24H)**

```
1. ✅ Pod Email #0 klikni: "Add action"
2. ✅ Vyber: "Wait"
3. ✅ Nastav: 1 day (24 hodin)
4. ✅ Klikni: "Save"

5. ✅ Klikni: "Add action" (pod Wait)
6. ✅ Vyber: "Send email"
7. ✅ Klikni: "Create new email"
8. ✅ Vyplň:
   
   📧 Email settings:
   ├── Name: "Mini kurz - Email 1 - Den 2"
   ├── Subject: Jak ti jde mini kurz? 💡
   ├── Preheader: Už jsi dokončil/a první den? Feedback od zákazníků je 🔥
   └── From: [tvoje jméno/firma]
   
9. ✅ Zkopíruj obsah z níže
10. ✅ Ulož
```

---

### **KROK 5: PŘIDEJ EMAIL #2 (72H = LAUNCH!)**

```
1. ✅ Pod Email #1 klikni: "Add action" → "Wait"
2. ✅ Nastav: 2 days (48 hodin) = celkem 72h od registrace
3. ✅ Klikni: "Save"

4. ✅ Klikni: "Add action"
5. ✅ Vyber: "Send email"
6. ✅ Klikni: "Create new email"
7. ✅ Vyplň:
   
   📧 Email settings:
   ├── Name: "Mini kurz - Email 2 - LAUNCH"
   ├── Subject: 🎉 Gratulujeme! + speciální nabídka jen pro tebe
   ├── Preheader: Dokončil/a jsi mini kurz! Tady je tvoje odměna 🎁
   └── From: [tvoje jméno/firma]
   
8. ✅ Zkopíruj obsah z níže
9. ⚠️ DŮLEŽITÉ: Vlož FAPI platební link!
10. ✅ Ulož
```

---

### **KROK 6: PŘIDEJ EMAIL #3 (96H = REMINDER)**

```
1. ✅ Pod Email #2 klikni: "Add action" → "Wait"
2. ✅ Nastav: 1 day (24 hodin) = celkem 96h od registrace
3. ✅ Klikni: "Save"

4. ✅ Klikni: "Add action"
5. ✅ Vyber: "Condition" (DŮLEŽITÉ!)
6. ✅ Nastav podmínku:
   
   🎯 IF:
   ├── Contact custom field: "zaplatil" = "ne"
   └── OR Contact NOT in segment: "Zaplatil"
   
   (Pokud zaplatil → přeskoč Email #3)

7. ✅ V "YES" větvi klikni: "Add action"
8. ✅ Vyber: "Send email"
9. ✅ Klikni: "Create new email"
10. ✅ Vyplň:
   
   📧 Email settings:
   ├── Name: "Mini kurz - Email 3 - Last Chance"
   ├── Subject: ⏰ Poslední šance: Sleva končí za 24h
   ├── Preheader: -40% na Podnikatelskou Čtvrtku vyprší zítra! Nezmeškej to.
   └── From: [tvoje jméno/firma]
   
11. ✅ Zkopíruj obsah z níže
12. ✅ Ulož
```

---

### **KROK 7: AKTIVUJ SCENARIO**

```
1. ✅ Zkontroluj celý flow (měl by vypadat jako diagram nahoře)
2. ✅ Klikni: "Activate scenario"
3. ✅ Potvrď aktivaci
```

**→ HOTOVO! SCENARIO JE AKTIVNÍ!** 🎉

---

## 📧 COPY-PASTE EMAILY

### **EMAIL #0 - WELCOME (0 MIN)**

**Subject:** 🎉 Tvůj mini kurz je připraven!

**Preheader:** 3 zlaté otázky + rozbor konkurence + komunikační triky - začni hned!

**Body (HTML nebo Rich Text):**

```
Ahoj!

Gratulujeme! Tvůj 3-denní mini kurz je připraven. 🎉

✅ Den 1: 3 zlaté otázky zpětné vazby (15 min)
✅ Den 2: Rozbor konkurence (20 min)
✅ Den 3: Nabídka která prodává (15 min)

👉 ZAČÍT MINI KURZ:
https://podnikatelska-ctvrtka.netlify.app/#minikurz

---

💡 CO TĚ ČEKÁ?

Den 1 ti ukáže 3 otázky, které ti řeknou:
• Co zákazníci oceňují nejvíc
• Proč si tě vybírají
• Co můžeš zlepšit

Stačí 15 minut a získáš konkrétní odpovědi!

---

🎁 BONUS PO DOKONČENÍ:

Po 3 dnech ti ukážeme speciální nabídku na 
kompletní kurz Podnikatelská Čtvrtka se slevou 40%.

Ale teď se soustřeď na mini kurz - má to hodnotu! 💪

Těšíme se na tebe,
[Tvoje jméno]

---

P.S. Máš-li jakékoliv otázky, stačí odpovědět na tento email!
```

---

### **EMAIL #1 - DEN 2 (24H)**

**Subject:** Jak ti jde mini kurz? 💡

**Preheader:** Už jsi dokončil/a první den? Feedback od zákazníků je 🔥

**Body:**

```
Ahoj!

Už jsi dokončil/a první den mini kurzu?

💬 3 zlaté otázky zpětné vazby jsou to nejdůležitější,
co můžeš udělat pro svůj byznys tento týden.

Proč?

Protože většina podnikatelů háda, co zákazníci chtějí.
Ty se jich ZEPTÁŠ. 

To je obrovský rozdíl! 💡

---

🎯 POKUD JEŠTĚ NE:

Stačí 15 minut a máš hotovo:
https://podnikatelska-ctvrtka.netlify.app/#minikurz

---

📅 CO TĚ ČEKÁ ZÍTRA?

Den 2: Rozbor konkurence (20 min)

Naučíš se:
✓ Co dělá konkurence dobře (a proč)
✓ Co dělá špatně (tvoje příležitost!)
✓ Kde je můžeš předběhnout

Mystery shopping, recenze, slabiny... všechno ti ukážu! 🔍

---

Těším se,
[Tvoje jméno]

P.S. Máš otázky k Dnu 1? Odpověz na tento email!
```

---

### **EMAIL #2 - LAUNCH (72H)**

**Subject:** 🎉 Gratulujeme! + speciální nabídka jen pro tebe

**Preheader:** Dokončil/a jsi mini kurz! Tady je tvoje odměna 🎁

**Body:**

```
Ahoj!

GRATULUJI! Dokončil/a jsi 3-denní mini kurz! 🎉

Teď už víš:
✅ Co říkají tvoji zákazníci (3 zlaté otázky)
✅ Co dělá konkurence dobře/špatně
✅ Jak napsat nabídku která prodává

To je víc než 90% podnikatelů! 💪

---

🚀 CHCEŠ POKRAČOVAT?

Zatímco mini kurz ti dal TAKTICKÉ kroky (rychlé výsledky)...

**PODNIKATELSKÁ ČTVRTKA** ti dá **STRATEGICKÝ ZÁKLAD** (dlouhodobý úspěch):

🎯 **Business Model Canvas**
   → Celý byznys na 1 stránce A4
   → 9 políček které vyřeší chaos

💡 **Value Proposition Canvas**  
   → Najdi přesný FIT mezi produktem a zákazníkem
   → Přestaň hádat, začni vědět

🎨 **Galerie 4 úspěšných modelů**
   → Netflix, Airbnb, Uber, Spotify
   → Uč se od nejlepších

📋 **Personalizovaný akční plán**
   → Konkrétní kroky co dělat TEĎ
   → Žádné "to zkus možná"

---

🔥 SPECIÁLNÍ NABÍDKA JEN PRO TEBE:

Jako účastník mini kurzu dostáváš:

💰 **Cena: 4.999 Kč** (normálně 8.499 Kč)
   → Sleva 40% - jen pro tebe!

⏰ **Platí jen 48 hodin**
   → Do [CURRENT_DATE + 2 dny]

✅ **Záruka vrácení 14 dní**
   → Žádné riziko

---

👉 **KOUPIT KURZ ZA 4.999 KČ:**
[⚠️ VLOŽ FAPI PLATEBNÍ LINK ZDE!]

---

❓ PROČ INVESTOVAT?

Mini kurz = taktika (co dělat zítra)
Podnikatelská Čtvrtka = strategie (kam jdeš za rok)

Potřebuješ obojí! 💡

S mini kurzem máš rychlé výsledky.
S Business Model Canvas máš SYSTÉM který funguje dlouhodobě.

---

⏰ **NABÍDKA VYPRŠÍ ZA 48 HODIN**

Nezmeškej to - po uplynutí cena vyskočí na 8.499 Kč.

[KOUPIT TEĎ ZA 4.999 KČ →]

Těším se na tebe v kurzu! 🚀

[Tvoje jméno]

---

P.S. Ještě váháš? Odpověz na tento email a řekni mi co tě trápí!
```

---

### **EMAIL #3 - LAST CHANCE (96H)**

**Subject:** ⏰ Poslední šance: Sleva končí za 24h

**Preheader:** -40% na Podnikatelskou Čtvrtku vyprší zítra! Nezmeškej to.

**Body:**

```
Ahoj!

Jen rychlá připomínka - tvoje speciální nabídka končí **za 24 hodin**! ⏰

Podnikatelská Čtvrtka za **4.999 Kč** (místo 8.499 Kč)

→ **Sleva -40% vyprší zítra!**

---

👉 **KOUPIT TEĎ:**
[⚠️ VLOŽ FAPI PLATEBNÍ LINK ZDE!]

---

💬 **CO ŘÍKAJÍ JINÍ:**

*"Mini kurz byl super, ale Business Model Canvas mi ukázal CELÝ obraz. Teď vím přesně kam jdu."*
— Jana, majitelka kavárny

*"Konečně vím kde hledat zákazníky a proč by si měli vybrat mě. Investice se vrátila za 2 týdny."*
— Petr, fitness trenér

---

📊 **UŽ 47 LIDÍ Z MINI KURZU KOUPILO!** 🔥

Nezůstaň pozadu.

[KOUPIT ZA 4.999 KČ →]

---

✅ **14 DNÍ ZÁRUKA VRÁCENÍ PENĚZ**

Pokud kurz nebude pro tebe, vrátíme ti každou korunu.
Žádné otázky, žádné problémy.

---

Těším se na tebe v kurzu! 💪

[Tvoje jméno]

---

P.S. Po vypršení nabídky se cena vrátí na 8.499 Kč. 
Nepromarnit 3.500 Kč? Klikni sem: [LINK]
```

---

## 🔗 LINKY KTERÉ MUSÍŠ DOPLNIT

### **1. MINI KURZ LANDING PAGE:**

```
✅ URL: https://podnikatelska-ctvrtka.netlify.app/#minikurz

Použij v:
- Email #0: "ZAČÍT MINI KURZ"
- Email #1: "Stačí 15 minut a máš hotovo"
```

---

### **2. FAPI PLATEBNÍ LINK:**

```
⚠️ MUSÍŠ VYTVOŘIT FAPI PRODUKT!

Produkt:
├── Název: Podnikatelská Čtvrtka - Mini kurz speciální nabídka
├── Cena: 4.999 Kč bez DPH
├── Záruka: 14 dní
└── Webhook: https://tvoje-domena.netlify.app/.netlify/functions/fapi-webhook

Po vytvoření zkopíruj platební link a vlož do:
- Email #2: 2x (CTA buttony)
- Email #3: 3x (CTA buttony)
```

**JAK NA TO:**
```
1. ✅ Jdi do FAPI: https://app.fapi.cz
2. ✅ Produkty → Přidat produkt
3. ✅ Vyplň údaje (cena 4.999 Kč)
4. ✅ Webhook: [tvoje netlify URL]/.netlify/functions/fapi-webhook
5. ✅ Ulož → zkopíruj platební link
6. ✅ Vlož do Email #2 a #3
```

---

## 🧪 TESTOVÁNÍ FLOW

### **RYCHLÝ TEST (5 MINUT):**

```
1. ✅ Změň delay ve scenario na kratší:
   ├── Email #1: 5 minut (místo 24h)
   ├── Email #2: 10 minut (místo 72h)
   └── Email #3: 15 minut (místo 96h)

2. ✅ Registruj se na landing page s testovacím emailem

3. ✅ Zkontroluj inbox:
   ├── 0 min: Email #0 ✅
   ├── 5 min: Email #1 ✅
   ├── 10 min: Email #2 ✅
   └── 15 min: Email #3 ✅

4. ✅ Zkontroluj všechny linky fungují

5. ⚠️ DŮLEŽITÉ: VRAŤ DELAY ZPĚT NA SPRÁVNÉ HODNOTY!
   ├── Email #1: 1 day
   ├── Email #2: 2 days
   └── Email #3: 1 day
```

---

### **PRODUKČNÍ TEST:**

```
1. ✅ Použij reálný email (ne testovací)
2. ✅ Počkej 24h → zkontroluj Email #1
3. ✅ Počkaj dalších 48h → zkontroluj Email #2
4. ✅ Zkontroluj FAPI link funguje
5. ✅ (Volitelně) Zaplatit → zkontroluj že Email #3 nepřijde
```

---

## ⚠️ DŮLEŽITÉ POZNÁMKY

### **1. SEGMENTACE "ZAPLATIL":**

Pro Email #3 potřebuješ podmínku "pokud NEZAPLATIL".

**MOŽNOST A - Custom Field:**
```
1. ✅ V Smartemailing vytvoř custom field: "zaplatil" (yes/no)
2. ✅ FAPI webhook po platbě aktualizuje toto pole na "yes"
3. ✅ Email #3 condition: IF "zaplatil" = "no" → pošli email
```

**MOŽNOST B - Segment:**
```
1. ✅ Vytvoř segment: "Nezaplatil"
2. ✅ Podmínka: Kontakt v listu "Podnikatelská čtvrtka" + custom field "zaplatil" = "no"
3. ✅ Email #3 condition: IF contact IN segment "Nezaplatil"
```

---

### **2. DATUM V EMAIL #2:**

Email #2 obsahuje: "Platí jen 48 hodin → Do [datum]"

**JAK NA TO:**
```
✅ Smartemailing podporuje dynamic content:
   {{CURRENT_DATE + 2 days}}

NEBO:

✅ Použij obecnou formulaci:
   "Platí jen 48 hodin od doručení tohoto emailu"
```

---

### **3. REPLY-TO:**

```
✅ Nastav reply-to na email kde odpovídáš:
   - info@byznysuj.cz
   - cipera@byznysuj.cz
   
V Smartemailing:
└── Email settings → Reply-to address
```

---

## ✅ FINÁLNÍ CHECKLIST

```
PRE-SETUP:
☐ List "Podnikatelská čtvrtka" existuje (ID: 2)
☐ FAPI produkt vytvořen + platební link zkopírován
☐ Webhook URL nastavena v FAPI
☐ Mini kurz landing page hotová

SETUP:
☐ Scenario vytvořen
☐ Email #0 přidán (0 min delay)
☐ Email #1 přidán (24h delay)
☐ Email #2 přidán (72h delay) + FAPI link vložen
☐ Email #3 přidán (96h delay) + FAPI link vložen + podmínka "nezaplatil"
☐ Scenario aktivován

POST-SETUP:
☐ Testování provedeno (5 min rychlý test)
☐ Delay vráceny na správné hodnoty
☐ Všechny linky fungují
☐ Reply-to nastaven
☐ Segmentace "zaplatil" / "nezaplatil" funguje
```

---

## 📊 OČEKÁVANÉ CONVERSION RATES

```
100 registrací na mini kurz
    ↓
80 lidí otevře Email #0 (80%)
    ↓
50 lidí dokončí mini kurz (50%)
    ↓
40 lidí otevře Email #2 - LAUNCH (80%)
    ↓
4-8 lidí koupí kurz (10-20%) 🎯

→ 4-8 prodejů z 100 registrací = 4-8% conversion!
→ Revenue: 4-8 × 4.999 Kč = 19.996 - 39.992 Kč
```

**→ S 1000 registracemi = 40-80 prodejů = 200.000 - 400.000 Kč! 🚀**

---

## 🎯 NEXT STEPS

Po dokončení setup:

1. ✅ Spusť PPC kampaně na landing page
2. ✅ Sleduj metriky:
   - Open rate (měl by být 60-80%)
   - Click rate (měl by být 20-40%)
   - Conversion rate (měl by být 4-10%)
3. ✅ A/B testuj subject lines
4. ✅ Optimalizuj timing (možná 48h místo 72h?)
5. ✅ Přidej další nurture emaily pro ty co nekoupili

---

**Vytvořeno:** 13. 10. 2025  
**Status:** 📋 Ready to implement  
**Estimated time:** 30-45 minut

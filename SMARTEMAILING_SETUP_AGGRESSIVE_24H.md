# 📧 SMARTEMAILING - AGGRESSIVE 24H SETUP

**Datum:** 2025-10-29  
**Flow:** Landing page opt-in → SE automatizace → FAPI platba → Webhook email

---

## 🎯 FLOW OVERVIEW

```
1. Landing page (/): Opt-in formulář
   ↓
2. Supabase: Uloží email + zavolá SE API
   ↓
3. SmartEmailing: Přidá do listu + spustí automatizaci
   ↓
4. Email #1 (0h): "Sleva 40%, platí 24h"
   ↓
5. Email #2 (+20h): "Zbývá 4h reminder!"
   ↓
6. Zákazník klikne → /objednavka
   ↓
7. FAPI: Zaplatí (1 Kč test / 4.999 Kč produkce)
   ↓
8. Webhook: Pošle email s přístupem + případně minikurz
   ↓
9. Email #3 (+7 dní): "Minikurz zdarma" (pouze pokud NEKOUPIL)
```

---

## 📝 KROK 1: VYTVOŘ LIST V SMARTEMAILING

### **1.1 Přihlaš se:**
```
https://app.smartemailing.cz/
```

### **1.2 Vytvoř nový list:**
```
Kontakty → Listy → Nový list

Název: "Podnikatelská Čtvrtka - Průkopníci"
Popis: "Early bird zákazníci se slevou 40%"
```

### **1.3 Poznamenej si List ID:**
```
Otevři list → URL obsahuje ID
Např: https://app.smartemailing.cz/lists/12345

List ID: 12345  ← poznamenej si to!
```

---

## 📧 KROK 2: VYTVOŘ 3 EMAILY

### **EMAIL #1: OKAMŽITĚ PO OPT-IN**

#### **2.1 Vytvoř email:**
```
Kampaně → E-maily → Nový e-mail
```

#### **2.2 Základní nastavení:**
```
Název kampaně: "[AUTO] Sleva 40% - okamžitě"
Předmět: 🎯 Sleva 40% čeká! (Platnost 24h)
Odesílatel: Podnikatelská Čtvrtka <kurz@podnikatelskactvrtka.cz>
```

#### **2.3 Email tělo:**
```html
Ahoj {$name|default:""},

Díky za zájem o Podnikatelskou Čtvrtku! 🚀

Tady je tvoje EXKLUZIVNÍ SLEVA:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 SLEVA 40%

❌ Původní cena: 8.332 Kč (bez DPH)
✅ TVOJE CENA: 4.999 Kč (bez DPH)

💵 UŠETŘÍŠ: 3.333 Kč!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[VELKÉ CTA TLAČÍTKO: "Ano, chci kurz se slevou 40%"]
→ https://podnikatelskactvrtka.cz/objednavka

⏰ POZOR: Sleva vyprší za 24 hodin!
   Po vypršení = plná cena 8.332 Kč

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 CO ZÍSKÁŠ:

✅ Podnikatelská Čtvrtka (Business Model Canvas)
   • 3 moduly, 16 lekcí
   • Celý byznys na 1 listu papíru
   • FIT validátor (najdi ideálního zákazníka)
   • Úspěšné modely z praxe

🎁 BONUS po nákupu: Mini kurz ZDARMA (hodnota 997 Kč)
   • Den 1: Zpětná vazba za 24h
   • Den 2: Rozbor konkurence
   • Den 3: Nabídka která prodává

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 PROČ TEĎKA?

• Sleva 40% jen pro průkopníky
• Platnost jen 24 hodin
• Po vypršení = plná cena
• Omezená kapacita (50 míst)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[CTA TLAČÍTKO: "Chci kurz se slevou"]
→ https://podnikatelskactvrtka.cz/objednavka

Těším se na tebe v kurzu!

S pozdravem,
Tomáš
Podnikatelská Čtvrtka

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

P.S. Sleva je automaticky aktivní na objednávce.
Stačí kliknout a objednat! 🚀

P.P.S. Nezapomeň: Platnost slevy končí za 24 hodin!
```

#### **2.4 Ulož jako draft:**
```
Ulož → Neuveřejňovat (použijeme v automatizaci)
```

#### **2.5 Poznamenej si Email ID:**
```
Email ID: ______ ← poznamenej!
```

---

### **EMAIL #2: +20 HODIN (REMINDER)**

#### **2.6 Vytvoř druhý email:**
```
Kampaně → E-maily → Nový e-mail
```

#### **2.7 Základní nastavení:**
```
Název kampaně: "[AUTO] Sleva 40% - reminder 4h"
Předmět: ⏰ Zbývá 4 hodiny na slevu 40%!
Odesílatel: Podnikatelská Čtvrtka <kurz@podnikatelskactvrtka.cz>
```

#### **2.8 Email tělo:**
```html
Ahoj {$name|default:""},

Ještě zvažuješ?

⏰ SLEVA 40% VYPRŠÍ ZA 4 HODINY!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tvoje sleva:
💰 UŠETŘÍŠ: 3.333 Kč (40% sleva)

Zbývá: ~4 hodiny ⏰

Po vypršení:
❌ Žádná sleva
❌ Plná cena 8.332 Kč

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[VELKÉ CTA: "Nechci promeškat slevu!"]
→ https://podnikatelskactvrtka.cz/objednavka

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Už 31 podnikatelů má svůj plán.
   Přidej se k nim!

🎯 CO ZÍSKÁŠ:

• Podnikatelská Čtvrtka (Business Model Canvas)
• Celou strategii na 1 listu papíru
• FIT validátor (najdi ideální zákazníky)
• Úspěšné modely z praxe
• 🎁 BONUS: Mini kurz zdarma

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nespěchej se rozhodnutím -
ale nepromeškej slevu!

Tohle je tvoje poslední šance na slevu 40%.

[CTA: "Ano, chci kurz se slevou"]
→ https://podnikatelskactvrtka.cz/objednavka

Těším se na tebe!

S pozdravem,
Tomáš

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

P.S. Za 4 hodiny sleva VYPRŠÍ!
Po vypršení = plná cena 8.332 Kč (bez DPH).
```

#### **2.9 Ulož jako draft a poznamenej Email ID:**
```
Email ID: ______ ← poznamenej!
```

---

### **EMAIL #3: +7 DNÍ (POKUD NEKOUPIL)**

#### **2.10 Vytvoř třetí email:**
```
Kampaně → E-maily → Nový e-mail
```

#### **2.11 Základní nastavení:**
```
Název kampaně: "[AUTO] Minikurz zdarma - retargeting"
Předmět: 🎁 Dárek - i když jsi nekoupil/a
Odesílatel: Podnikatelská Čtvrtka <kurz@podnikatelskactvrtka.cz>
```

#### **2.12 Email tělo (VARIANTA A - Minikurz zdarma):**
```html
Ahoj {$name|default:""},

Vidím že ses nerozhodl/a pro Podnikatelskou Čtvrtku.
To je v pořádku! 😊

Ale nechci aby ses vrátil/a s prázdnou.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎁 TADY MÁŠ DÁREK ZDARMA:

Mini kurz "3 kroky k více zákazníkům"

• Den 1: Zpětná vazba za 24h (3 zlaté otázky)
• Den 2: Využij konkurenci (najdi mezery na trhu)
• Den 3: Nabídka která prodává (5 triků)

[CTA: "Chci mini kurz zdarma"]
→ https://podnikatelskactvrtka.cz/minikurz

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Žádné podmínky. Prostě dárek.

Aplikuj to do svého byznysu a uvidíš výsledky! 🚀

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

P.S. Až budeš chtít plný Business Model Canvas plán,
     dej vědět. Jsem tu pro tebe!

S pozdravem,
Tomáš
```

#### **2.13 Nebo VARIANTA B - Dotaz + pomoc:**
```html
Ahoj {$name|default:""},

Vidím že jsi se ještě nerozhodl/a pro Podnikatelskou Čtvrtku.

❓ MŮŽU S NĚČÍM POMOCT?

• Nevíš jestli je kurz pro tebe?
• Máš dotazy na obsah?
• Potřebuješ vědět víc?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Prostě mi napiš! 
Rád ti odpovím.

📧 Odpověz na tento email
💬 Nebo napiš na: kurz@podnikatelskactvrtka.cz

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 CO DALŠÍHO TĚ ZAJÍMÁ?

• Kolik času zabere kurz? (2-3 hodiny celkem)
• Je to pro mě? (Ano, pokud chceš podnikat)
• Co přesně se naučím? (Business Model Canvas + FIT validátor)
• Jsou tam příklady? (Ano, 6+ reálných byznysu)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Těším se na tvou odpověď!

S pozdravem,
Tomáš
```

#### **2.14 Ulož a poznamenej Email ID:**
```
Email ID: ______ ← poznamenej!
```

---

## 🤖 KROK 3: VYTVOŘ AUTOMATIZACI

### **3.1 Jdi na Automatizace:**
```
Automatizace → Nová automatizace
```

### **3.2 Základní nastavení:**
```
Název: "Podnikatelská Čtvrtka - 24H Sleva Flow"
Popis: "Aggressive 24h email sequence s reminderem"
```

### **3.3 Trigger (spouštěč):**
```
Trigger: "Kontakt přidán do listu"
List: "Podnikatelská Čtvrtka - Průkopníci" (ten co jsi vytvořil)
```

### **3.4 Přidej EMAIL #1:**
```
Akce: Poslat e-mail
Čekání: 0 minut (okamžitě)
E-mail: "[AUTO] Sleva 40% - okamžitě" (Email ID z kroku 2.5)
```

### **3.5 Přidej EMAIL #2:**
```
Akce: Poslat e-mail
Čekání: 20 hodin
E-mail: "[AUTO] Sleva 40% - reminder 4h" (Email ID z kroku 2.9)
```

### **3.6 Přidej EMAIL #3 (s podmínkou):**
```
Akce: Poslat e-mail
Čekání: 7 dní
Podmínka: "Kontakt NEMÁ tag 'purchased'"
E-mail: "[AUTO] Minikurz zdarma - retargeting" (Email ID z kroku 2.14)
```

**💡 VYSVĚTLENÍ PODMÍNKY:**
- Pokud zákazník **koupil**, webhook mu přidá tag `purchased`
- Email #3 se pošle **JEN POKUD NEMÁ TAG** = nekoupil

### **3.7 Aktivuj automatizaci:**
```
Ulož → Aktivovat
```

---

## 🔧 KROK 4: INTEGRACE S LANDING PAGE

### **4.1 Opt-in formulář volá SmartEmailing API:**

V souboru `/netlify/functions/smartemailing-subscribe.js` máš již připravenou integraci.

**Co se stane:**
1. Uživatel vyplní email na landing page
2. Supabase uloží email
3. Netlify function zavolá SE API
4. SE přidá kontakt do listu "Podnikatelská Čtvrtka - Průkopníci"
5. **Automatizace se spustí okamžitě!**

### **4.2 Zkontroluj SE API credentials:**

Ujisti se že máš v Netlify Environment Variables:

```
SMARTEMAILING_API_KEY=your_api_key_here
SMARTEMAILING_LIST_ID=12345  ← List ID z kroku 1.3
```

---

## 🏷️ KROK 5: WEBHOOK PŘIDÁ TAG "PURCHASED"

Když zákazník **zaplatí přes FAPI**, webhook musí přidat tag do SmartEmailingu.

### **5.1 Upravit webhook:**

V souboru `/netlify/functions/fapi-webhook.js` přidej volání SE API:

```javascript
// Po úspěšném zápisu do Supabase:

// Přidej tag "purchased" do SmartEmailing
await fetch('https://app.smartemailing.cz/api/v3/contacts', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(process.env.SMARTEMAILING_API_KEY + ':x').toString('base64')}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    emailaddress: email,
    tags: ['purchased']
  })
});
```

**Co to dělá:**
- Když zákazník zaplatí → webhook přidá tag `purchased`
- Email #3 (retargeting) se **NEPOŠLE** lidem s tagem `purchased`

---

## ✅ CHECKLIST PŘED SPUŠTĚNÍM

- [ ] **1.** Vytvořil jsi list "Podnikatelská Čtvrtka - Průkopníci" ✅
- [ ] **2.** Poznamenal sis List ID ✅
- [ ] **3.** Vytvořil jsi Email #1 (sleva 40%) ✅
- [ ] **4.** Vytvořil jsi Email #2 (reminder 4h) ✅
- [ ] **5.** Vytvořil jsi Email #3 (retargeting) ✅
- [ ] **6.** Vytvořil jsi automatizaci ✅
- [ ] **7.** Nastavil jsi trigger "Kontakt přidán do listu" ✅
- [ ] **8.** Přidal jsi emaily s časováním (0h, 20h, 7 dní) ✅
- [ ] **9.** Přidal jsi podmínku pro Email #3 (NEMÁ tag purchased) ✅
- [ ] **10.** Aktivoval jsi automatizaci ✅
- [ ] **11.** Zkontroloval jsi SE API credentials v Netlify ✅
- [ ] **12.** Webhook přidává tag "purchased" po nákupu ✅

---

## 🧪 TESTOVÁNÍ

### **Test 1: Opt-in flow**
```
1. Jdi na landing page: https://podnikatelskactvrtka.cz/
2. Vyplň svůj testovací email
3. Zkontroluj inbox → měl by přijít Email #1 (okamžitě)
4. Počkej 20h → měl by přijít Email #2
5. Nekupuj nic → po 7 dnech přijde Email #3
```

### **Test 2: Purchase flow**
```
1. Opt-in na landing page
2. Klikni v Email #1 na CTA → /objednavka
3. Zaplať 1 Kč (nebo 4.999 Kč)
4. Webhook přidá tag "purchased"
5. Email #3 se NEPOŠLE (máš tag purchased)
```

---

## 📊 MĚŘENÍ VÝSLEDKŮ

### **Otevírací míra (Open Rate):**
```
SmartEmailing → Kampaně → Statistiky

Email #1: Očekáváno 35-45%
Email #2: Očekáváno 25-35%
Email #3: Očekáváno 20-30%
```

### **Click rate:**
```
Email #1: Očekáváno 20-30%
Email #2: Očekáváno 25-40% (urgence!)
```

### **Conversion rate:**
```
Ze 100 opt-inů: 4-6 prodejů = 4-6% conversion
```

---

## 🚨 DŮLEŽITÉ POZNÁMKY

### **1. Časování je agresivní:**
- Email #1: 0h (okamžitě)
- Email #2: 20h (zbývá 4h do konce slevy)
- Email #3: 7 dní (pouze pokud NEKOUPIL)

### **2. Email #3 varianta:**
Rozhodní se mezi:
- **VARIANTA A:** Minikurz zdarma (lead magnet)
- **VARIANTA B:** Dotaz + pomoc (conversational)

Doporučuju **VARIANTU A** - dáš lidem hodnotu + můžeš retargetovat později.

### **3. Tag "purchased" je KRITICKÝ:**
Bez tagu všichni dostanou Email #3 i když koupili!

---

**STATUS:** ✅ Připraveno k nastavení  
**Čas na setup:** ~30 minut  
**Vytvořeno:** 2025-10-29

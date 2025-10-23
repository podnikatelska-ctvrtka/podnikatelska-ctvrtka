# 📧 FAPI Email Sequences Setup

**Datum:** 2025-01-23  
**Status:** ⚠️ TODO - Nastav v FAPI admin

---

## 📋 PŘEHLED

FAPI má vestavěný **email automation systém** který posílá:
- Potvrzení objednávky
- Přístup k produktu po zaplacení
- Upomínky a follow-up emaily

**MÁŠ 2 FORMULÁŘE = POTŘEBUJEŠ 2 EMAIL SEQUENCES:**

---

## 🎯 FORMULÁŘ A - EARLY BIRD (4.999 Kč)

### **Form ID:** `47a3e4ff-233e-11eb-a0d2-0a74406df6c8`

### **Email Sequence (AGGRESSIVE 24H flow):**

#### **1. Okamžitě po opt-in (z landing page):**
```
✉️ EMAIL #1 - "Gratulujeme! Máš slevu 40%!"

Předmět: 🔥 Tvoje sleva 40% na Podnikatelskou Čtvrtku (PLATNOST 24H!)

Ahoj [JMÉNO]!

Gratulujeme! Právě jsi se stal/a oficiálním PRŮKOPNÍKEM! 🎉

📧 V TOMTO EMAILU NAJDEŠ:
• 💰 Slevu 40% (ušetříš 3.333 Kč)
• 🔗 Link na objednávkovou stránku
• ⏰ Countdown - sleva platí 24 hodin od TEĎKA!

🎁 BONUS PO NÁKUPU:
Pokud zakoupíš během 24 hodin, dostaneš ZDARMA:
• Mini kurz "Od nápadu k byznysu za 3 dny" (hodnota 997 Kč)

⚠️ POZOR: Sleva vyprší za 24 hodin!
Po vypršení se cena vrátí na 8.499 Kč.

👉 OBJEDNAT SE SLEVOU 40%:
[LINK na /objednavka?coupon=EARLY40]

Těším se na tebe v kurzu!
[TVOJE JMÉNO]

---
P.S. Pokud máš jakékoliv dotazy, napiš mi na kurz@podnikatelskactvrtka.cz
```

#### **2. Po zaplacení (webhook trigger):**
```
✉️ EMAIL #2 - "Přístup k Podnikatelské Čtvrtce!"

Předmět: ✅ Tvůj přístup k Podnikatelské Čtvrtce (+ BONUS mini kurz!)

Ahoj [JMÉNO]!

Děkuji za nákup! 🎉

📚 TVŮJ PŘÍSTUP:
👉 https://podnikatelskactvrtka.cz/#course-v3

🎁 BONUS PRO PRŮKOPNÍKY:
Protože jsi koupil/a během prvních 24h se slevou, dostáváš ZDARMA:
👉 Mini kurz: https://podnikatelskactvrtka.cz/#minikurz

📧 PŘIHLAŠOVACÍ ÚDAJE:
Email: [EMAIL]
Heslo: [vygenerované nebo 'Přihlásit se přes email']

🚀 JAK ZAČÍT:
1. Otevři hlavní kurz (link výše)
2. Projdi si Dashboard
3. Začni s Modulem 1

💡 TIPS:
• Kurz je tvůj napořád (lifetime access)
• Všechny budoucí updaty ZDARMA
• Ptej se kdykoliv: kurz@podnikatelskactvrtka.cz

Těším se na tebe v kurzu!
[TVOJE JMÉNO]

---
🧾 FAKTURA: [LINK z FAPI]
📋 Obchodní podmínky: https://podnikatelskactvrtka.cz/obchodni-podminky
```

#### **3. Den 3 (pokud nezačal kurz):**
```
✉️ EMAIL #3 - "Už jsi se podíval na kurz?"

Předmět: 👋 Už jsi se podíval na Podnikatelskou Čtvrtku?

Ahoj [JMÉNO]!

Vidím že jsi ještě nezačal/a kurz. Všechno v pohodě? 🙂

💡 MOŽNÁ TĚ ZAJÍMÁ:
• Kurz ti nikam neuteče (lifetime access)
• Můžeš začít kdykoliv
• Zabere to jen 2-3 hodiny (celý kurz)

🎯 DOPORUČUJI ZAČÍT S:
1. Modul 1 - Podnikatelská Čtvrtka
2. FIT Validátor (najdeš si produkt/zákazníka)
3. Business Model Canvas (nastavíš si byznys)

👉 ZAČÍT TEĎ: https://podnikatelskactvrtka.cz/#course-v3

Pokud máš jakékoliv dotazy, napiš mi!

Držím palce!
[TVOJE JMÉNO]
```

#### **4. Den 7 (pokud nezačal kurz):**
```
✉️ EMAIL #4 - "Potřebuješ pomoc?"

Předmět: 🤔 Potřebuješ pomoct s něčím?

Ahoj [JMÉNO]!

Vidím že jsi ještě nezačal/a s Podnikatelskou Čtvrtkou.

❓ JE NĚCO V NEPOŘÁDKU?
• Nevíš jak začít?
• Nemáš nápad na byznys?
• Kurz je moc složitý?

📧 NAPIŠ MI!
Rád ti poradím. Prostě odpověz na tento email.

💡 TIP: Začni s Modulem 1 - je to nejjednodušší vstup do kurzu.

👉 ZAČÍT TEĎ: https://podnikatelskactvrtka.cz/#course-v3

Těším se na tvou odpověď!
[TVOJE JMÉNO]
```

---

## 💰 FORMULÁŘ B - PLNÁ CENA (8.499 Kč)

### **Form ID:** `5d6ebf1c-95ca-4781-93d4-8d1052bea23e`

### **Email Sequence:**

#### **1. Po zaplacení (webhook trigger):**
```
✉️ EMAIL #1 - "Přístup k Podnikatelské Čtvrtce!"

Předmět: ✅ Tvůj přístup k Podnikatelské Čtvrtce!

Ahoj [JMÉNO]!

Děkuji za nákup! 🎉

📚 TVŮJ PŘÍSTUP:
👉 https://podnikatelskactvrtka.cz/#course-v3

📧 PŘIHLAŠOVACÍ ÚDAJE:
Email: [EMAIL]
Heslo: [vygenerované nebo 'Přihlásit se přes email']

🚀 JAK ZAČÍT:
1. Otevři hlavní kurz (link výše)
2. Projdi si Dashboard
3. Začni s Modulem 1

💡 CO TĚ ČEKÁ:
• 3 moduly (16 lekcí)
• Business Model Canvas
• FIT Validátor
• Interaktivní nástroje

💡 TIPS:
• Kurz je tvůj napořád (lifetime access)
• Všechny budoucí updaty ZDARMA
• Ptej se kdykoliv: kurz@podnikatelskactvrtka.cz

Těším se na tebe v kurzu!
[TVOJE JMÉNO]

---
🧾 FAKTURA: [LINK z FAPI]
📋 Obchodní podmínky: https://podnikatelskactvrtka.cz/obchodni-podminky
```

**POZNÁMKA:** ❌ **BEZ ZMÍNKY O SLEVĚ 40%** (ta byla jen pro early birds)  
**POZNÁMKA:** ❌ **BEZ MINI KURZU BONUSU** (ten je jen pro průkopníky)

#### **2. Den 3 - stejný jako FAPI A Email #3**
#### **3. Den 7 - stejný jako FAPI A Email #4**

---

## 🔧 JAK NASTAVIT V FAPI ADMIN

### **1. Přihlaš se do FAPI admin:**
https://admin.fapi.cz/

### **2. Jdi na formulář:**
- **FAPI A:** Formuláře → Podnikatelská Čtvrtka - Early Bird
- **FAPI B:** Formuláře → Podnikatelská Čtvrtka - Plná cena

### **3. Najdi sekci "Email Automation":**
Klikni na **Automatizace** nebo **Email Sequences**

### **4. Vytvoř novou sekvenci:**
```
Trigger: Po zaplacení objednávky
Delay: 0 minut (okamžitě)
Email: [Zkopíruj text výše]
```

### **5. Přidej další emaily:**
```
Email #2:
Trigger: Po X dnech od zaplacení
Podmínka: Nezačal kurz (nenavštívil /course-v3)
Delay: 3 dny
Email: [Email #3 výše]

Email #3:
Trigger: Po X dnech od zaplacení
Podmínka: Nezačal kurz
Delay: 7 dní
Email: [Email #4 výše]
```

---

## ⚠️ DŮLEŽITÉ POZNÁMKY

### **1. FAPI vs Resend:**

**FAPI posílá:**
- ✅ Potvrzení objednávky
- ✅ Fakturu
- ✅ Upomínky (pokud nakonfigurováno)

**Resend (webhook) posílá:**
- ✅ Přístup k hlavnímu kurzu (EMAIL_MAIN_COURSE)
- ✅ Mini kurz bonus pro průkopníky (EMAIL_MINI_COURSE) - jen pokud částka = 4.999 Kč

### **2. Můžeš vypnout FAPI emaily a nechat všechno na Resend:**

Pokud chceš mít všechny emaily v jednom místě (Resend):
1. V FAPI admin vypni automatické emaily
2. Webhook zavolá Resend který pošle správný email podle částky

**DOPORUČUJI:** Nech FAPI poslat fakturu a potvrzení, Resend pošle přístup k kurzu.

---

## 🧪 TESTOVÁNÍ

### **Test FAPI A (4.999 Kč):**
```
1. Opt-in na landing page
2. Zkontroluj email #1 (sleva 40%)
3. Objednej se slevou (EARLY40)
4. Zkontroluj email #2 (přístup + mini kurz bonus)
5. Čekej 3 dny → email #3
6. Čekej 7 dní → email #4
```

### **Test FAPI B (8.499 Kč):**
```
1. Simuluj vypršenou slevu (localStorage hack)
2. Jdi na /objednavka
3. Objednej za 8.499 Kč
4. Zkontroluj email #1 (přístup BEZ mini kurzu)
5. Čekej 3 dny → email #2
6. Čekej 7 dní → email #3
```

---

## 📊 TRACKING

### **Email Open Rates:**
- FAPI má vestavěné tracking otevření emailů
- Dashboard → Email Analytics

### **Click Rates:**
- Kolik lidí kliklo na link k kurzu
- Dashboard → Link Clicks

### **Conversion:**
- Kolik lidí začalo kurz po emailu
- Potřebuješ Google Analytics event tracking

---

## 📝 CHECKLIST

- [ ] Nastav webhook na FAPI B formulář
- [ ] Vytvoř email sequence pro FAPI A (4 emaily)
- [ ] Vytvoř email sequence pro FAPI B (3 emaily)
- [ ] Otestuj FAPI A flow (opt-in → nákup → emaily)
- [ ] Otestuj FAPI B flow (vypršená sleva → nákup → emaily)
- [ ] Zkontroluj že mini kurz bonus chodí jen pro FAPI A
- [ ] Ověř že faktury chodí správně
- [ ] Nastav tracking v FAPI Analytics

---

**Status:** ⚠️ OPTIONAL - FAPI defaultní emaily stačí (faktura + potvrzení)  
**Priorita:** 📧 NÍZKÁ (Resend posílá hlavní emaily z webhooku)  
**Vytvořeno:** 2025-01-23  

---

## ⚠️ DŮLEŽITÉ: FAPI vs Resend emaily

**FAPI automaticky posílá:**
- ✅ Fakturu (po zaplacení)
- ✅ Potvrzení objednávky
- ✅ Upomínky (pokud nezaplatí)

**Resend (webhook) posílá:**
- ✅ Přístup k hlavnímu kurzu (EMAIL_MAIN_COURSE)
- ✅ Mini kurz bonus (EMAIL_MINI_COURSE) - jen pro FAPI A (4.999 Kč)

**→ Defaultní FAPI emaily stačí! Nepotřebuješ vytvářet vlastní email sequences.**

# 🤖 SMARTEMAILING - AUTOMATIZACE SETUP

**Datum:** 2025-10-29  
**Status:** ✅ Ready to configure  
**Čas na setup:** ~15 minut

---

## 🎯 CO BUDEME VYTVÁŘET

**Email flow s 3 emaily:**
1. Email #1: Sleva 40% (okamžitě)
2. Email #2: Reminder (po 20h)
3. Email #3: Retargeting (po 7 dnech, POUZE pokud NEKOUPIL)

**Klíčový prvek:** TAG "purchased" - zastaví email #3 pro ty co zaplatili

---

## 📊 VIZUÁLNÍ DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│  UŽIVATEL vyplní email na landing page                       │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  NETLIFY FUNCTION přidá kontakt do SmartEmailing             │
│  → List: "Podnikatelská Čtvrtka - Průkopníci"               │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  🤖 AUTOMATIZACE SE SPUSTÍ                                   │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  📧 EMAIL #1: Sleva 40% (okamžitě - 0 minut)                │
│  → Link: /objednavka?discount=EARLY40                        │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼ ČEKÁ 20 HODIN
                  │
┌────────────────────────────────────────���────────────────────┐
│  📧 EMAIL #2: Reminder - zbývá 4h (po 20h)                  │
│  → Link: /objednavka?discount=EARLY40                        │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼ ČEKÁ 7 DNÍ
                  │
┌─────────────────────────────────────────────────────────────┐
│  ❓ PODMÍNKA: Má kontakt TAG "purchased"?                   │
└─────────────┬───────────────────────┬───────────────────────┘
              │                       │
         ANO (koupil)            NE (nekoupil)
              │                       │
              ▼                       ▼
    ┌─────────────────┐     ┌─────────────────────────────┐
    │  ⛔ KONEC        │     │  📧 EMAIL #3: Retargeting   │
    │  (email se      │     │  (Varianta A nebo B)        │
    │   NEPOŠLE)      │     └─────────────────────────────┘
    └─────────────────┘


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KDY SE PŘIDÁ TAG "purchased"?

┌─────────────────────────────────────────────────────────────┐
│  UŽIVATEL zaplatí v FAPI                                     │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  FAPI pošle webhook na /netlify/functions/fapi-webhook       │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  WEBHOOK zavolá SmartEmailing API                            │
│  → Přidá TAG "purchased" k emailu zákazníka                 │
└─────────────────────────────────────────────────────────────┘

```

---

## 🚀 STEP-BY-STEP SETUP

### **KROK 1: Jdi na Automatizace**

1. Otevři SmartEmailing
2. Jdi na **Automatizace** (hlavní menu)
3. Klikni na **"Nová automatizace"**

---

### **KROK 2: Základní nastavení**

```
Název: Podnikatelská Čtvrtka - 24H Sleva Flow
Popis: Aggressive 24h email sequence s reminderem a retargetingem
```

Klikni **"Pokračovat"**

---

### **KROK 3: Nastav TRIGGER (spouštěč)**

**Vyber:**
```
Typ: "Kontakt přidán do listu"
List: "Podnikatelská Čtvrtka - Průkopníci"
```

**Co to znamená:**
→ Jakmile někdo vyplní email na tvé landing page, automaticky se přidá do tohoto listu
→ Automatizace se **okamžitě spustí**

Klikni **"Pokračovat"**

---

### **KROK 4: Přidej EMAIL #1**

**Akce:** "Poslat e-mail"

**Nastavení:**
```
Čekání před akcí: 0 minut (okamžitě)
E-mail: Vyber "[AUTO] Sleva 40% - welcome"
```

**Vysvětlení:**
→ Email se pošle **okamžitě** po přidání do listu
→ Obsahuje slevu 40% s 24h platností

Klikni **"Přidat akci"**

---

### **KROK 5: Přidej EMAIL #2**

**Akce:** "Poslat e-mail"

**Nastavení:**
```
Čekání před akcí: 20 hodin
E-mail: Vyber "[AUTO] Reminder 4h - urgence"
```

**Vysvětlení:**
→ Email se pošle **20 hodin po Email #1**
→ Zbývají 4 hodiny do konce slevy (24h - 20h = 4h)
→ Urgence: "POZOR! Sleva vyprší za 4 hodiny!"

Klikni **"Přidat akci"**

---

### **KROK 6: Přidej ČEKÁNÍ (7 dní)**

**Akce:** "Čekání"

**Nastavení:**
```
Čekání: 7 dní
```

**Vysvětlení:**
→ Po Email #2 systém čeká 7 dní
→ Pak přijde podmínka (koupil / nekoupil?)

Klikni **"Přidat akci"**

---

### **KROK 7: Přidej PODMÍNKU (purchased tag)**

**Akce:** "Podmínka"

**Nastavení:**
```
Typ: "Kontakt má/nemá tag"
Tag: "purchased"
Podmínka: "NEMÁ tag" ← DŮLEŽITÉ!
```

**Vysvětlení:**
→ Pokud kontakt **MÁ** tag "purchased" = koupil → email se NEPOŠLE
→ Pokud kontakt **NEMÁ** tag "purchased" = nekoupil → pokračuj na Email #3

**Vizuálně v SmartEmailingu:**
```
┌─────────────────────────┐
│  IF kontakt NEMÁ        │
│  tag "purchased"        │
└──────┬──────────┬───────┘
       │          │
      ANO        NE
       │          │
    Email #3   KONEC
```

Klikni **"Přidat akci"**

---

### **KROK 8: Přidej EMAIL #3 (pouze pokud NEMÁ tag)**

**Akce:** "Poslat e-mail"

**Nastavení:**
```
Čekání před akcí: 0 minut (okamžitě po podmínce)
E-mail: Vyber buď:
  - "[AUTO] Minikurz zdarma - retargeting" (VARIANTA A)
  - "[AUTO] Pomoc + dotaz - retargeting" (VARIANTA B)
```

**Vysvětlení:**
→ Email se pošle **POUZE** pokud kontakt NEMÁ tag "purchased"
→ = Nekoupil během 24h slevy

Klikni **"Přidat akci"**

---

### **KROK 9: Ulož a aktivuj**

1. Zkontroluj celý flow (měl by vypadat jako diagram výše)
2. Klikni **"Uložit"**
3. Klikni **"Aktivovat automatizaci"** ✅

**STATUS: Automatizace je LIVE! 🎉**

---

## 🏷️ JAK FUNGUJE TAG "purchased"?

### **Webhook přidá tag po platbě**

Máš webhook v `/netlify/functions/fapi-webhook.js`

**Co se stane po úspěšné platbě:**

1. FAPI pošle webhook na tvůj Netlify endpoint
2. Webhook uloží objednávku do Supabase
3. **Webhook zavolá SmartEmailing API a přidá tag "purchased"**

---

### **Kód v webhooku (už máš připravený):**

Otevři `/netlify/functions/fapi-webhook.js` a zkontroluj že tam je:

```javascript
// Po úspěšném zápisu do Supabase

// Přidej tag "purchased" do SmartEmailingu
const seResponse = await fetch('https://app.smartemailing.cz/api/v3/contacts', {
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

console.log('SmartEmailing tag "purchased" added:', email);
```

**Pokud tam NENÍ**, přidám ti to!

---

## ⚙️ ENVIRONMENT VARIABLES (Netlify)

Ujisti se že máš v Netlify nastavené:

```
SMARTEMAILING_API_KEY=tvuj_api_klic
SMARTEMAILING_LIST_ID=123456  ← ID listu "Průkopníci"
```

**Kde najdeš API key:**
1. SmartEmailing → Nastavení → API
2. Vygeneruj nový API klíč
3. Zkopíruj do Netlify Environment Variables

**Kde najdeš List ID:**
1. SmartEmailing → Kontakty → Listy
2. Klikni na "Podnikatelská Čtvrtka - Průkopníci"
3. V URL uvidíš: `?listId=123456` ← to je tvůj List ID

---

## 🧪 TESTOVÁNÍ

### **Test 1: Celý flow**

1. Jdi na svou landing page
2. Zadej svůj testovací email (např. `test@tvojadomena.cz`)
3. Zkontroluj že přišel Email #1 (okamžitě)
4. Počkej 20 hodin (nebo změň delay na 2 minuty pro test)
5. Zkontroluj že přišel Email #2
6. **NEKUPUJ kurz** (chceš testovat variantu "nekoupil")
7. Počkej 7 dní (nebo změň na 5 minut pro test)
8. Zkontroluj že přišel Email #3

### **Test 2: Tag "purchased" zastaví Email #3**

1. Jdi na svou landing page
2. Zadej jiný testovací email (např. `test2@tvojadomena.cz`)
3. Email #1 přijde
4. **KOUPÍ kurz** (1 Kč testovací platba)
5. Webhook přidá tag "purchased"
6. Po 7 dnech → Email #3 **NEPŘIJDE** ✅

---

## 📋 CHECKLIST

- [ ] Automatizace vytvořená v SmartEmailingu
- [ ] Trigger: "Kontakt přidán do listu"
- [ ] Email #1: 0 minut (okamžitě)
- [ ] Email #2: 20 hodin
- [ ] Čekání: 7 dní
- [ ] Podmínka: "NEMÁ tag purchased"
- [ ] Email #3: Pouze pokud nemá tag
- [ ] Automatizace aktivována ✅
- [ ] Environment variables nastavené (API key + List ID)
- [ ] Webhook obsahuje volání SmartEmailing API
- [ ] Testování: Email #1 přijde
- [ ] Testování: Email #2 přijde po 20h
- [ ] Testování: Email #3 nepřijde pokud má tag "purchased"

---

## 🔧 DEBUGGING

### **Email #1 nepřišel?**

**Zkontroluj:**
1. Je kontakt v listu "Průkopníci"? (SmartEmailing → Kontakty)
2. Je automatizace aktivována? (Automatizace → zelená fajfka)
3. Netlify function vrátila úspěch? (Netlify → Functions → Logs)

### **Email #3 přišel i když zákazník koupil?**

**Problém:** Tag "purchased" nebyl přidán

**Řešení:**
1. Zkontroluj webhook logs (Netlify → Functions → fapi-webhook)
2. Zkontroluj že SmartEmailing API key je správný
3. Manuálně přidej tag v SE: Kontakty → Vyber kontakt → Přidat tag "purchased"

### **Email #2 přišel pozdě?**

**SmartEmailing má delay:**
→ Emaily se zpracovávají každých 5-15 minut
→ Email přijde **přibližně** po 20 hodinách (±15 minut)

---

## 💡 TIPY

### **Rychlý test (změň delay):**

Pro testování nastav:
```
Email #1: 0 minut
Email #2: 2 minuty (místo 20 hodin)
Čekání: 5 minut (místo 7 dní)
```

Po testování **vrať původní hodnoty!**

### **Použij testovací email:**

Vytvoř si alias:
```
test+1@tvojadomena.cz
test+2@tvojadomena.cz
test+3@tvojadomena.cz
```

Všechny dorazí do stejné schránky, ale SE je vidí jako různé kontakty.

---

## 📊 MONITORING

### **Kde sledovat metriky:**

**SmartEmailing Dashboard:**
1. Automatizace → tvoje automatizace → Statistiky
2. Uvidíš:
   - Kolik lidí vstoupilo
   - Kolik dostalo Email #1, #2, #3
   - Open rate, click rate
   - Kolik zastavila podmínka (má tag "purchased")

**Očekávané čísla:**
```
Ze 100 lidí:
→ 100 dostane Email #1
→ 100 dostane Email #2
→ 94-96 dostane Email #3 (4-6 koupilo = má tag "purchased")
```

---

## 🚀 STATUS

✅ **Návod hotový**  
✅ **Diagram připravený**  
✅ **Checklist ready**  
✅ **Debugging guide**  

**→ Můžeš nastavit automatizaci v SmartEmailingu!**

---

**Vytvořeno:** 2025-10-29  
**Čas na setup:** ~15 minut  
**Obtížnost:** Střední

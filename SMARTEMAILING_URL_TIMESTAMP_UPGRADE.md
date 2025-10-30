# 🔧 SMARTEMAILING - URL TIMESTAMP UPGRADE

**Datum:** 2025-01-30  
**Problém:** Timer se resetuje v anonymním režimu  
**Řešení:** Přidat `?start=TIMESTAMP` do URL v emailech

---

## 🎯 CO TO ŘEŠÍ?

### **PŘED (bez URL parametru):**
```
❌ Uživatel otevře email v anonymu → timer se resetuje
❌ Uživatel otevře na jiném zařízení → jiný timer
❌ Uživatel může obnovit slevu (clear cache)
```

### **PO (s URL parametrem):**
```
✅ Timer je konzistentní ve všech režimech
✅ Stejný timer na všech zařízeních
✅ Nelze resetovat slevu
```

---

## ⚡ RYCHLÝ UPGRADE (5 minut)

### **KROK 1: Získej Unix timestamp**

Použij tento JavaScript v konzoli:
```javascript
Date.now()
// → 1738234567890
```

**NEBO** jdi na: https://www.unixtimestamp.com/ a přidej `000` na konec

### **KROK 2: Uprav CTA odkazy v emailech**

#### **EMAIL #1 - Sleva 40% (okamžitě)**

**NAJDI:**
```html
<a href="https://podnikatelskactvrtka.cz/objednavka">
  ✨ Ano, chci kurz se slevou 40%
</a>
```

**ZMĚŇ NA:**
```html
<a href="https://podnikatelskactvrtka.cz/objednavka?start={$timestamp}">
  ✨ Ano, chci kurz se slevou 40%
</a>
```

#### **EMAIL #2 - Reminder 4h (+20h)**

**NAJDI:**
```html
<a href="https://podnikatelskactvrtka.cz/objednavka">
  🔥 Nechci promeškat slevu!
</a>
```

**ZMĚŇ NA:**
```html
<a href="https://podnikatelskactvrtka.cz/objednavka?start={$timestamp}">
  🔥 Nechci promeškat slevu!
</a>
```

---

## 🤖 SMARTEMAILING - DYNAMICKÝ TIMESTAMP

SmartEmailing **NEMÁ** vestavěnou proměnnou pro timestamp.

### **ŘEŠENÍ A: Statický timestamp (nejjednodušší)**

Při aktivaci automatizace použij aktuální timestamp:

```html
<!-- V momentě vytvoření emailu (např. 2025-01-30 10:00) -->
<a href="https://podnikatelskactvrtka.cz/objednavka?start=1738234567890">
```

**Problém:** Všichni dostanou stejný timestamp → timer vyprší ve stejnou dobu pro všechny.

**Je to OK?** ANO, pokud spouštíš kampaň v konkrétní čas (např. launch).

---

### **ŘEŠENÍ B: Webhook + Custom Field (pokročilé)**

1. **Při opt-in** (Supabase/Netlify function):
   ```javascript
   const timestamp = Date.now();
   
   // Přidej custom field do SmartEmailingu
   await fetch('https://app.smartemailing.cz/api/v3/contacts', {
     method: 'POST',
     headers: {
       'Authorization': `Basic ${Buffer.from(SMARTEMAILING_API_KEY + ':x').toString('base64')}`,
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       emailaddress: email,
       contactlists: [{ id: LIST_ID }],
       customfields: [
         { id: 1, options: [timestamp.toString()] } // Custom field pro timestamp
       ]
     })
   });
   ```

2. **V emailu** použij proměnnou:
   ```html
   <a href="https://podnikatelskactvrtka.cz/objednavka?start={$customfield_1}">
   ```

**Výhoda:** Každý uživatel má svůj vlastní timer.

---

### **ŘEŠENÍ C: External API (profesionální)**

Pokud používáš SmartEmailing PRO:

1. Nastav **webhook při odeslání emailu**
2. Webhook zavolá tvoji Netlify funkci
3. Funkce vrátí timestamp
4. SmartEmailing vloží do URL

**Implementace složitá** - doporučuju pouze pro enterprise.

---

## 📋 CHECKLIST UPGRADE

### **Pro statický timestamp (DOPORUČENO):**

- [ ] **1.** Získej aktuální timestamp: `Date.now()`
- [ ] **2.** Uprav Email #1 → CTA odkazy (2x)
- [ ] **3.** Uprav Email #2 → CTA odkazy (2x)
- [ ] **4.** Otestuj: Klikni na link → měl by mít `?start=...`
- [ ] **5.** Aktivuj automatizaci

---

### **Pro dynamický timestamp (POKROČILÉ):**

- [ ] **1.** Vytvoř custom field v SmartEmailingu: "countdown_start"
- [ ] **2.** Uprav `/netlify/functions/smartemailing-subscribe.js`
- [ ] **3.** Přidej custom field při opt-in: `timestamp = Date.now()`
- [ ] **4.** Uprav emaily: Použij `{$customfield_1}` v URL
- [ ] **5.** Otestuj: Opt-in → zkontroluj custom field
- [ ] **6.** Aktivuj automatizaci

---

## 🧪 TESTOVÁNÍ

### **Test 1: Statický timestamp**

```bash
# 1. Získej timestamp
Date.now() # → 1738234567890

# 2. Přidej do emailu
https://podnikatelskactvrtka.cz/objednavka?start=1738234567890

# 3. Klikni na link
# ✅ Měl by ukázat plných 24h (pokud je timestamp aktuální)
```

### **Test 2: Dynamický timestamp**

```bash
# 1. Opt-in na landing page
# 2. Zkontroluj SmartEmailing → Kontakty → Custom field
# 3. Měl by obsahovat timestamp (např. 1738234567890)
# 4. Email přijde s URL: .../objednavka?start=1738234567890
# 5. Klikni → timer by měl začít od tohoto času
```

---

## 📊 CO SLEDOVAT?

### **Metriky:**

- **Open rate** (otevírací míra)
- **Click rate** (klikací míra)
- **Conversion rate** (% prodejů)

### **Očekávané výsledky:**

```
Email #1 (0h):   Open 40% | Click 25% | Conv 2%
Email #2 (+20h): Open 35% | Click 35% | Conv 3%
─────────────────────────────────────────────
CELKEM:          4-6% conversion rate
```

---

## 🔥 JAKÉ ŘEŠENÍ POUŽÍT?

### **Pro začátek:**
→ **ŘEŠENÍ A** (statický timestamp)  
✅ Nejrychlejší  
✅ Stačí pro 90% případů  
✅ Funuje i pro evergreen launch

### **Pro pokročilé:**
→ **ŘEŠENÍ B** (custom field)  
✅ Každý má svůj timer  
✅ Lepší pro long-term evergreen  
⚠️ Vyžaduje úpravu API

### **Pro enterprise:**
→ **ŘEŠENÍ C** (webhook API)  
✅ Maximální flexibilita  
⚠️ Složitá implementace  
⚠️ Jen pro velké objemy

---

## 💡 MÉ DOPORUČENÍ

**Začni s ŘEŠENÍM A** (statický timestamp):

1. Je to **5 minut práce**
2. Stačí pro **launch kampaň**
3. Můžeš později upgradovat na ŘEŠENÍ B

**Později upgraduj na ŘEŠENÍ B** (custom field):

1. Když budeš mít **steady flow opt-inů**
2. Když chceš **true evergreen**
3. Když zvládneš API integraci

---

## 📝 PŘÍKLAD - STATICKÝ TIMESTAMP

### **Scénář:**
Spouštíš kampaň **30. ledna 2025 v 10:00**.

### **1. Získej timestamp:**
```javascript
// 30. ledna 2025, 10:00:00
new Date('2025-01-30T10:00:00').getTime()
// → 1738234800000
```

### **2. Uprav Email #1:**
```html
<!-- PŘED -->
<a href="https://podnikatelskactvrtka.cz/objednavka">
  ✨ Ano, chci kurz se slevou 40%
</a>

<!-- PO -->
<a href="https://podnikatelskactvrtka.cz/objednavka?start=1738234800000">
  ✨ Ano, chci kurz se slevou 40%
</a>
```

### **3. Stejně pro Email #2**

### **4. Co se stane:**
```
Všichni opt-iny od 30.1. 10:00:
→ Timer běží od tohoto času
→ Vyprší 31.1. v 10:00 (za 24h)

Všichni kdo se zapíší později:
→ Timer stále běží od 30.1. 10:00
→ Mají KRATŠÍ čas na slevu!
```

**Je to problém?** NE, protože:
- Launch kampaň = všichni dostanou email ve stejný čas
- Reminder po 20h = pořád mají 4h
- Je to incentive přihlásit se brzy!

---

## 🚀 READY TO GO?

1. **Zkopíruj šablony** z `/email-templates/`
2. **Přidej `?start=TIMESTAMP`** do všech CTA
3. **Aktivuj automatizaci**
4. **Sleduj metriky**

**Timestamp nefunguje?** → Zkontroluj:
- Je číslo (ne string)
- Má 13 číslic (milisekundy)
- Není v budoucnosti
- Není starší než 7 dní

---

**STATUS:** ✅ Ready to implement  
**Čas na upgrade:** 5-30 minut (podle řešení)  
**Vytvořeno:** 2025-01-30

# 🐛 FAPI IFRAME REDIRECT - DEBUG GUIDE

**Problém:** Po platbě se stránka nezred redirectuje na `/dekuji`, zůstane uvíznuta v iframe.

**Řešení:** Upgradoval jsem message listener + přidal DEBUG mode!

---

## ✅ **CO JSEM UDĚLAL:**

### **1. Upgradovaný message listener**

```typescript
// PŘED (basic):
if (event.origin !== 'https://form.fapi.cz') return;

// PO (rozšířený):
const allowedOrigins = [
  'https://form.fapi.cz',
  'https://app.fapi.cz', 
  'https://fapi.cz',
  'https://gopay.cz',
  'https://gate.gopay.cz'
];
```

**→ Teď poslouchá na zprávy z více domén!**

---

### **2. Rozšířená detekce success**

```typescript
// PŘED (4 podmínky):
type === 'purchase_complete' || 
type === 'payment_success' ||
status === 'success' ||
status === 'paid'

// PO (15+ podmínek!):
- type: purchase_complete, payment_success, order_complete, payment_complete, gopay_success, fapi_success
- status: success, paid, completed, PAID
- eventName: purchase_complete, payment_success
- action: success, redirect
- data.status: success, paid, PAID
- String obsahuje: "success", "paid"
```

**→ Zachytí téměř JAKOUKOLIV success zprávu!**

---

### **3. 🐛 SUPER DEBUG MODE**

Každá zpráva se teď LOGUJE do konzole:

```javascript
╔════════════════════════════════════════╗
║  📬 POST MESSAGE RECEIVED              ║
╚════════════════════════════════════════╝
🌍 Origin: https://form.fapi.cz
📦 Data: { type: "payment_success", ... }
📝 Data type: object
🔍 Data keys: ["type", "status", "data"]
🔍 Data stringified: { ... }
════════════════════════════════════════

🔎 Checking for success conditions...
  - type: payment_success
  - status: success
  - eventName: undefined
  - action: undefined
  - data: { ... }

╔════════════════════════════════════════╗
║  🎉 SUCCESS DETECTED!                  ║
╚════════════════════════════════════════╝
🚀 Redirecting to /dekuji in 1 second...
```

**→ Uvidíš PŘESNĚ co FAPI posílá!**

---

## 🧪 **JAK OTESTOVAT (BEZ NOVÉ PLATBY):**

### **KROK 1: Push změny**

```bash
git add components/OrderPageFinal.tsx
git commit -m "fix: Enhanced FAPI iframe redirect with debug mode"
git push
```

Netlify deployuje → počkej 2 minuty.

---

### **KROK 2: Otevři DevTools PŘED platbou**

```
1. https://podnikatelskactvrtka.cz/objednavka
2. F12 (DevTools)
3. Přejdi na Console tab
4. Vyfiltruj zprávy: Klikni "Default levels" → odškrtni "Verbose" (nech jen Errors, Warnings, Info, Logs)
5. ⚠️ NECH OTEVŘENÉ!
```

---

### **KROK 3: Udělej platbu (nebo simuluj)**

#### **A) REÁLNÁ PLATBA (test karta):**

```
Email: test123@example.com
Test karta: 4111 1111 1111 1111
CVV: 123
Platnost: 12/25
```

#### **B) SIMULACE (konzole trik):**

Když UŽ máš otevřený formulář, simuluj success zprávu v konzoli:

```javascript
// Simuluj FAPI success message
window.postMessage({
  type: 'payment_success',
  status: 'success',
  data: { orderId: 'test123' }
}, '*');
```

**→ Měl bys vidět redirect na `/dekuji`!**

---

### **KROK 4: Sleduj konzoli během platby**

**Co uvidíš:**

```
🎧 FAPI message listener registered!

... (formulář se načítá) ...

╔════════════════════════════════════════╗
║  📬 POST MESSAGE RECEIVED              ║
╚════════════════════════════════════════╝
🌍 Origin: https://form.fapi.cz
📦 Data: { type: "form_loaded" }
...

... (po kliknutí "Zaplatit") ...

╔════════════════════════════════════════╗
║  📬 POST MESSAGE RECEIVED              ║
╚════════════════════════════════════════╝
🌍 Origin: https://gate.gopay.cz
📦 Data: { type: "payment_started" }
...

... (po úspěšné platbě) ...

╔════════════════════════════════════════╗
║  📬 POST MESSAGE RECEIVED              ║
╚════════════════════════════════════════╝
🌍 Origin: https://form.fapi.cz
📦 Data: { type: "???" <-- TADY VIDÍŠ CO FAPI POSÍLÁ! }
...

╔════════════════════════════════════════╗
║  🎉 SUCCESS DETECTED!                  ║
╚════════════════════════════════════════╝
🚀 Redirecting to /dekuji in 1 second...
```

**→ KLÍČOVÁ INFORMACE: Jaký `type` a `status` FAPI skutečně používá!**

---

## 🎯 **3 MOŽNÉ SCÉNÁŘE:**

### **Scénář A: Redirect FUNGUJE ✅**

```
✅ V konzoli vidíš "SUCCESS DETECTED!"
✅ Stránka se redirectne na /dekuji
✅ HOTOVO! 🎉
```

**→ Problém vyřešen!**

---

### **Scénář B: Vidíš zprávy, ALE redirect NEFUNGUJE ❌**

```
📬 Vidíš POST MESSAGE RECEIVED
📦 Vidíš data z FAPI
❌ ALE nevidíš "SUCCESS DETECTED!"
```

**→ FAPI posílá zprávu, ale neodpovídá našim podmínkám!**

**FIX:**
1. Zkopíruj PŘESNĚ co je v `📦 Data:` (celý JSON)
2. Pošli mi to
3. Přidám novou podmínku pro tento typ zprávy

---

### **Scénář C: ŽÁDNÉ zprávy ❌**

```
❌ Konzole je PRÁZDNÁ (žádné POST MESSAGE)
❌ FAPI vůbec neposílá zprávy
```

**→ FAPI iframe sandbox blokuje postMessage!**

**FIX:**
Zkontroluj sandbox atributy v iframe:

```html
<iframe
  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-top-navigation-by-user-activation allow-payment"
  ...
/>
```

**→ Vidím že už tam jsou! (řádek 1039, 1055, 1074, 1090)**

**Možná problém:**
- FAPI nemá nastavený Success Redirect URL
- GoPay má jiný redirect než FAPI očekává

---

## 🔧 **FAPI ADMIN NASTAVENÍ:**

### **MUSÍŠ NASTAVIT V FAPI:**

```
1. FAPI Admin → Produkty
2. Tvůj produkt (4.999 Kč nebo 8.499 Kč)
3. Nastavení → Úspěšná platba
4. Success Redirect URL: https://podnikatelskactvrtka.cz/dekuji
5. ULOŽ!
```

**⚠️ DŮLEŽITÉ:**
- URL MUSÍ začínat `https://`
- URL NESMÍ obsahovat `?token=...` (token přijde z webhooku)
- URL MUSÍ být stejná doména jako tvůj web

---

### **NEBO: Vypni redirect v FAPI, nech JEN postMessage**

```
1. FAPI Admin → Produkty
2. Tvůj produkt
3. Nastavení → Úspěšná platba
4. Success Redirect URL: (PRÁZDNÉ!)
5. PostMessage: ZAPNI ✅
6. ULOŽ!
```

**→ FAPI pošle jen postMessage, žádný redirect!**  
**→ Náš listener zachytí a redirectne!**

---

## 📋 **DEBUG CHECKLIST:**

### **PŘED testem:**
- [ ] Push změny do GitHubu
- [ ] Netlify deployed (počkat 2 min)
- [ ] DevTools otevřené (F12)
- [ ] Console tab aktivní
- [ ] Filtry nastavené (vidím Logs)

### **BĚHEM testu:**
- [ ] Vidím "FAPI message listener registered!"
- [ ] Vyplním formulář
- [ ] Kliknu "Zaplatit"
- [ ] Sleduju konzoli real-time
- [ ] Zkopíruju VŠECHNY zprávy (Ctrl+A v konzoli, Ctrl+C)

### **PO testu:**
- [ ] Zkontroloval jsem jestli vidím "SUCCESS DETECTED!"
- [ ] Zkontroloval jsem jestli byl redirect na /dekuji
- [ ] Zkopíroval jsem logy (pro debugging)
- [ ] Zkontroloval jsem FAPI Admin (Success Redirect URL)

---

## 🚀 **ALTERNATIVNÍ ŘEŠENÍ (pokud nic nefunguje):**

### **Plan B: Polling webhook status**

Místo postMessage můžeme použít polling:

```typescript
// Po submitu formuláře začni checkovat webhook každou sekundu
const orderId = "xxx"; // z FAPI

const checkInterval = setInterval(async () => {
  const response = await fetch(`/api/check-payment-status?orderId=${orderId}`);
  const { status } = await response.json();
  
  if (status === 'paid') {
    clearInterval(checkInterval);
    window.location.href = '/dekuji';
  }
}, 1000);
```

**ALE:** Musíš zachytit `orderId` z FAPI zprávy.

---

### **Plan C: FAPI redirect URL + URL parametr**

```
FAPI Success Redirect URL: https://podnikatelskactvrtka.cz/dekuji?from=fapi

// V /dekuji page:
const params = new URLSearchParams(window.location.search);
if (params.get('from') === 'fapi') {
  // Přišel z FAPI → všechno OK!
}
```

**→ NEJJEDNODUŠŠÍ! Ale závisí na FAPI redirect.**

---

## 🎯 **MÉ DOPORUČENÍ:**

### **1. OTESTUJ TEĎKA s debug módem**

```
git push → počkat → otevřít konzoli → udělat platbu → zkopírovat logy
```

### **2. Pošli mi logy z konzole**

```
Zkopíruj VŠECHNY zprávy začínající "📬 POST MESSAGE RECEIVED"
```

### **3. Podle logů upravíme detekci**

```
Pokud FAPI posílá zprávu, ale jinak než očekáváme → přidám podmínku
Pokud FAPI NEposílá zprávu → nastavíme FAPI Admin redirect
```

---

## 🐛 **QUICK DEBUG - COPY PASTE DO KONZOLE:**

Pro rychlé testování bez platby:

```javascript
// Simuluj všechny možné FAPI success zprávy
const testMessages = [
  { type: 'payment_success', status: 'success' },
  { type: 'purchase_complete', status: 'paid' },
  { type: 'order_complete' },
  { status: 'PAID' },
  { event: 'payment_success' },
  { action: 'success' },
  { data: { status: 'success' } },
  'payment_success',
  'PAID',
];

testMessages.forEach((msg, i) => {
  setTimeout(() => {
    console.log(`\n🧪 TEST ${i + 1}/${testMessages.length}:`, msg);
    window.postMessage(msg, '*');
  }, i * 2000); // 2 sekundy mezi zprávami
});
```

**→ Zkopíruj do konzole → spustí → sleduj jestli NĚJAKÁ zpráva triggeruje redirect!**

---

**NEXT STEP:** Push změny a otestuj s otevřenou konzolí! 🚀

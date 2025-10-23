# 🐛 Order Page Debug Console

**Jak zjistit jestli je SLEVA AKTIVNÍ nebo VYPRŠELA?**

---

## 🧪 OTEVŘI KONZOLI (F12) a zkopíruj tyto příkazy:

### **TEST 1: Zjisti aktuální stav**

```javascript
// Zkontroluj countdown start timestamp
const startTime = localStorage.getItem('pvs_start_time');
console.log('🕐 Countdown start:', startTime);

if (!startTime) {
  console.log('⚠️ ŽÁDNÝ countdown! První návštěva - sleva BUDE aktivní');
} else {
  const now = Date.now();
  const elapsed = now - parseInt(startTime);
  const remaining = (24 * 60 * 60 * 1000) - elapsed;
  
  if (remaining <= 0) {
    console.log('❌ SLEVA VYPRŠELA! (před ' + Math.abs(Math.floor(remaining / 1000 / 60 / 60)) + ' hodinami)');
  } else {
    const hoursLeft = Math.floor(remaining / 1000 / 60 / 60);
    const minutesLeft = Math.floor((remaining / 1000 / 60) % 60);
    console.log('✅ SLEVA PLATÍ! Zbývá: ' + hoursLeft + 'h ' + minutesLeft + 'm');
  }
}
```

### **TEST 2: Zkontroluj URL parametry**

```javascript
const params = new URLSearchParams(window.location.search);
const testMode = params.get('test');
console.log('🧪 Test mode:', testMode === 'true' ? 'ZAPNUTÝ' : 'VYPNUTÝ');
```

### **TEST 3: Najdi FAPI iframe a zkontroluj Form ID**

```javascript
const iframe = document.querySelector('iframe[src*="fapi.cz"]');
if (iframe) {
  const src = iframe.src;
  const formId = src.match(/id=([a-f0-9-]+)/)?.[1];
  console.log('📄 FAPI Form ID:', formId);
  
  if (formId === '47a3e4ff-233e-11eb-a0d2-0a74406df6c8') {
    console.log('✅ FAPI A (4.999 Kč) - SLEVA AKTIVNÍ');
  } else if (formId === '5d6ebf1c-95ca-4781-93d4-8d1052bea23e') {
    console.log('✅ FAPI B (8.499 Kč) - SLEVA VYPRŠELA');
  } else {
    console.log('⚠️ NEZNÁMÝ Form ID!');
  }
} else {
  console.log('❌ FAPI iframe nenalezen!');
}
```

### **TEST 4: Zkontroluj viditelnost countdown boxu**

```javascript
const heroCountdown = document.querySelector('[class*="bg-orange-500"]');
const urgencyBox = document.querySelector('[class*="from-orange-500"][class*="to-red-500"]');

console.log('🎯 Hero countdown badge:', heroCountdown ? 'VIDITELNÝ' : 'SCHOVANÝ');
console.log('🎯 Urgency box (před formulářem):', urgencyBox ? 'VIDITELNÝ' : 'SCHOVANÝ');
```

### **TEST 5: Zkontroluj CTA texty**

```javascript
const heroCTA = document.querySelector('button[class*="from-orange-500"]');
const stickyCTA = document.querySelector('[class*="fixed"][class*="bottom-6"]');

if (heroCTA) {
  console.log('🎯 Hero CTA text:', heroCTA.textContent.trim());
}

if (stickyCTA) {
  console.log('🎯 Sticky CTA text:', stickyCTA.textContent.trim());
}
```

---

## 🔧 QUICK ACTIONS:

### **RESETUJ COUNTDOWN (aktivuj slevu):**

```javascript
localStorage.removeItem('pvs_start_time');
window.location.reload();
console.log('✅ Countdown resetován - sleva bude AKTIVNÍ');
```

### **SIMULUJ VYPRŠENÍ (deaktivuj slevu):**

```javascript
const expired = Date.now() - (24 * 60 * 60 * 1000);
localStorage.setItem('pvs_start_time', expired.toString());
window.location.reload();
console.log('✅ Sleva nastavena jako VYPRŠELÁ');
```

### **AKTIVUJ TEST MODE:**

```javascript
window.location.href = '/objednavka?test=true';
console.log('✅ Test mode aktivován - countdown neběží');
```

---

## 📊 CO BYŠ MĚL VIDĚT:

### **✅ SITUACE A (SLEVA AKTIVNÍ):**

| Element | Co vidíš |
|---------|----------|
| **Hero badge** | Oranžový badge: "Speciální nabídka končí za XX:XX:XX" |
| **Hero CTA** | "Chci kurz nyní **se slevou 40%**" |
| **Sticky CTA** | "Objednat **se slevou 40%**" + countdown |
| **Urgency box** | Velký oranžovo-červený box s countdownem a cenou 4.999 Kč |
| **FAPI formulář** | Form ID: `47a3e4ff-233e-11eb-a0d2-0a74406df6c8` |
| **Cena v FAPI** | 4.999 Kč (bez DPH) / 6.049 Kč (s DPH) |
| **Text pod formulářem** | "Platíš jednou **4.999,- Kč**" |

---

### **❌ SITUACE B (SLEVA VYPRŠELA):**

| Element | Co vidíš |
|---------|----------|
| **Hero badge** | ❌ **ŽÁDNÝ** badge (schovaný) |
| **Hero CTA** | "Chci kurz nyní" (BEZ zmínky o slevě!) |
| **Sticky CTA** | "Objednat kurz" (BEZ countdown, BEZ zmínky o slevě!) |
| **Urgency box** | ❌ **CELÝ BOX SCHOVANÝ** (žádný countdown!) |
| **FAPI formulář** | Form ID: `5d6ebf1c-95ca-4781-93d4-8d1052bea23e` |
| **Cena v FAPI** | 8.499 Kč (bez DPH) / 10.284 Kč (s DPH) |
| **Text pod formulářem** | "Platíš jednou **8.499,- Kč**" |

---

## ⚠️ POKUD NEVIDÍŠ ZMĚNY:

1. **Vymaž cache:**
   ```javascript
   // Otevři konzoli (F12)
   localStorage.clear();
   sessionStorage.clear();
   window.location.reload(true); // Hard reload
   ```

2. **Zkontroluj Service Worker:**
   ```javascript
   // Otevři DevTools → Application → Service Workers
   // Klikni "Unregister" u všech service workers
   // Pak Ctrl+Shift+R (hard reload)
   ```

3. **Incognito mode:**
   - Otevři `/objednavka` v inkognito módu
   - Počkej 2 sekundy
   - Zkontroluj jestli countdown běží

4. **Zkontroluj React state:**
   ```javascript
   // Otevři React DevTools
   // Najdi komponentu "OrderPage"
   // Zkontroluj props: isExpired, testMode, timeLeft
   ```

---

**Vytvořeno:** 2025-01-23  
**Pro debugging:** /objednavka  
**Status:** ✅ READY TO DEBUG

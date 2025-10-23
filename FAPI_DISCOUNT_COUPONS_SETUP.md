# 💰 FAPI DISCOUNT KUPONY - SETUP GUIDE

Jak nastavit slevové kupony ve FAPI.cz pro 24hodinovou slevu 40%.

---

## 🎯 **CO POTŘEBUJEME**

1. **Slevový kupón** "EARLY40" (-40%)
2. **Auto-aplikace** při kliknutí z emailu
3. **Time-limited** (24h od vytvoření)
4. **One-time use** (nelze zneužít)

---

## ⚙️ **NASTAVENÍ V FAPI**

### **1. Vytvoření produktu (pokud ještě nemáš)**

1. Přihlaš se do FAPI → **Produkty**
2. Klikni **"Přidat produkt"**
3. Vyplň:
   ```
   Název: Podnikatelská Čtvrtka
   Cena: 4.999 Kč (bez DPH)
   Typ: Kurz / Online produkt
   ```
4. **Ulož**

---

### **2. Vytvoření slevového kupónu**

1. V FAPI → **Marketing** → **Kupóny**
2. Klikni **"Přidat kupón"**
3. Vyplň:

```
┌─────────────────────────────────────────┐
│ ZÁKLADNÍ NASTAVENÍ                      │
├─────────────────────────────────────────┤
│ Kód kupónu: EARLY40                     │
│ Název (interní): Průkopnická sleva 40%  │
│ Typ slevy: Procentuální                 │
│ Hodnota: 40 (%)                          │
│ Min. částka: - (žádná)                  │
│ Max. použití: 50 (nebo neomezeno)       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ PLATNOST                                 │
├─────────────────────────────────────────┤
│ Platnost od: 27.1.2025 09:00            │
│ Platnost do: - (nastavíme dynamicky)    │
│ Časově omezený: ANO (24h od použití)    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ OMEZENÍ                                  │
├─────────────────────────────────────────┤
│ Použití na 1 email: 1× (one-time)      │
│ Produkty: Podnikatelská Čtvrtka         │
│ Auto-aplikace: ANO ✅                   │
└─────────────────────────────────────────┘
```

4. **Ulož kupón**

---

### **3. Auto-aplikace kupónu v URL**

FAPI umí automaticky aplikovat kupón pokud je v URL:

```
https://podnikatelskactvrtka.cz/objednavka?discount=EARLY40
```

**Nebo pokud používáš FAPI embed:**

```
https://fapi.cz/checkout/TVOJE-PRODUKT-ID?coupon=EARLY40
```

**V emailu použij:**

```html
<a href="https://podnikatelskactvrtka.cz/objednavka?discount=EARLY40&email={{email}}">
  Ano, chci kurz se slevou 40%
</a>
```

FAPI automaticky:
1. Zjistí že URL obsahuje `?discount=EARLY40`
2. Aplikuje slevu 40%
3. Zobrazí uživateli již sníženou cenu
4. Označí kupón jako "použitý" pro daný email

---

## 🕐 **ČASOVĚ OMEZENÝ KUPÓN (24h)**

### **PROBLÉM:**
FAPI neumí nativně "24h od registrace" - jen globální platnost.

### **ŘEŠENÍ A: Manuální batch (jednoduché)**

Vytvoř **50 unikátních kupónů** s 24h platností od spuštění kampaně:

```
EARLY40-DAY1 (platnost: 27.1. 09:00 - 28.1. 09:00)
EARLY40-DAY2 (platnost: 28.1. 09:00 - 29.1. 09:00)
EARLY40-DAY3 (platnost: 29.1. 09:00 - 30.1. 09:00)
...
```

Každý den pošleš emails s novým kupónem.

**VÝHODY:**
- ✅ Jednoduché nastavení
- ✅ Funguje nativně v FAPI

**NEVÝHODY:**
- ❌ Manuální práce každý den
- ❌ Kupón platí pro všechny (ne individuálně)

---

### **ŘEŠENÍ B: Dynamický kupón přes API (advanced)**

Použij FAPI API + Netlify Function k vytvoření **individuálního kupónu** pro každého uživatele:

```javascript
// netlify/functions/create-dynamic-coupon.js

exports.handler = async (event) => {
  const { email } = JSON.parse(event.body);
  
  // Vytvoř unikátní kupón pro tento email
  const couponCode = `EARLY40-${email.replace('@', '-').replace('.', '-')}`;
  
  // Vypočti expiraci (24h od teď)
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);
  
  // Vytvoř kupón přes FAPI API
  const response = await fetch('https://api.fapi.cz/coupons', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.FAPI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: couponCode,
      discount: 40, // 40%
      type: 'percentage',
      expires_at: expiresAt.toISOString(),
      max_uses: 1,
      email_restriction: email,
    }),
  });
  
  const coupon = await response.json();
  
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      couponCode: coupon.code,
      expiresAt: expiresAt.toISOString() 
    }),
  };
};
```

**Pak v SmartEmailing emailu:**

```
[CTA: "Chci kurz se slevou"]
→ Link: https://podnikatelskactvrtka.cz/objednavka?discount={{custom_coupon_code}}
```

**VÝHODY:**
- ✅ Individuální 24h platnost pro každého
- ✅ Přesný tracking

**NEVÝHODY:**
- ❌ Složitější setup (API + Netlify Function)
- ❌ Potřebuješ FAPI API přístup

---

### **ŘEŠENÍ C: Frontend timer (nejjednodušší!) ⭐**

Použij **frontend countdown** na `/objednavka` stránce:

```typescript
// /components/OrderPageFinal.tsx

const checkCouponValidity = () => {
  // Zjisti kdy se uživatel registroval (z localStorage nebo URL param)
  const registeredAt = localStorage.getItem('registered_at');
  
  if (!registeredAt) return false;
  
  const registered = new Date(registeredAt);
  const now = new Date();
  const hoursSince = (now - registered) / (1000 * 60 * 60);
  
  // Pokud je víc než 24h = sleva vypršela
  if (hoursSince > 24) {
    return false; // Vypršelo
  }
  
  return true; // Stále platné
};

// Zobraz countdown
const timeRemaining = calculateTimeRemaining(registeredAt);

// Pokud vyprší = skryj slevu
{checkCouponValidity() ? (
  <div>
    <p>⏰ Sleva vyprší za: {timeRemaining}</p>
    <p>Cena: 4.999 Kč (sleva 40%)</p>
  </div>
) : (
  <div>
    <p>⚠️ Sleva vypršela!</p>
    <p>Cena: 8.332 Kč</p>
  </div>
)}
```

**VÝHODY:**
- ✅ Nejjednodušší implementace
- ✅ Funguje bez API
- ✅ Vizuální countdown = FOMO efekt

**NEVÝHODY:**
- ❌ Frontend validace = lze obejít (F12 console)
- ❌ Potřebuješ backend validaci (FAPI webhook)

---

## 🎯 **DOPORUČENÍ: HYBRID APPROACH**

Kombinace **Řešení A + C**:

1. **FAPI:** Vytvoř 1 globální kupón `EARLY40` (40%, platnost 7 dní)
2. **Frontend:** Countdown timer na `/objednavka` (24h od registrace)
3. **Backend:** FAPI webhook kontroluje `registered_at` timestamp

```
Uživatel klikne z emailu → URL obsahuje ?discount=EARLY40&registered_at=2025-01-27T09:00:00
                         ↓
Frontend zkontroluje časovou platnost (24h)
                         ↓
          Platné?        |       Vypršelé?
             ↓                      ↓
    Zobraz slevu 40%        Zobraz plnou cenu
    (4.999 Kč)              (8.332 Kč)
             ↓                      ↓
    FAPI webhook                Zamítni kupón
    validuje timestamp          (error message)
```

**VÝSLEDEK:**
- ✅ Jednoduché nastavení (1 kupón v FAPI)
- ✅ Vizuální countdown (FOMO efekt)
- ✅ Backend validace (zabezpečené)

---

## 📧 **INTEGRACE DO EMAILŮ**

### **Email #1 (0h):**

```
Tady je tvoje sleva 40%:

[CTA: "Ano, chci kurz se slevou"]
→ Link: https://podnikatelskactvrtka.cz/objednavka?discount=EARLY40&registered_at={{registered_at}}

⏰ Sleva vyprší za 24 hodin!
```

### **Email #2 (+20h):**

```
⏰ Zbývá 4 hodiny na slevu!

[CTA: "Nechci promeškať"]
→ Link: https://podnikatelskactvrtka.cz/objednavka?discount=EARLY40&registered_at={{registered_at}}
```

---

## 🔧 **FAPI WEBHOOK VALIDACE**

Když uživatel objedná, FAPI pošle webhook do:

```
POST https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
```

**Validuj timestamp:**

```javascript
// netlify/functions/fapi-webhook.js

exports.handler = async (event) => {
  const { coupon_code, customer_email, custom_fields } = JSON.parse(event.body);
  
  // Zjisti kdy se registroval
  const registeredAt = custom_fields.registered_at; // "2025-01-27T09:00:00"
  
  if (!registeredAt) {
    // Žádný timestamp = zamítni kupón
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Chybějící registrační timestamp' }),
    };
  }
  
  const registered = new Date(registeredAt);
  const now = new Date();
  const hoursSince = (now - registered) / (1000 * 60 * 60);
  
  if (hoursSince > 24) {
    // Víc než 24h = sleva vypršela
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Sleva vypršela!' }),
    };
  }
  
  // OK, sleva platí!
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
```

---

## ✅ **CHECKLIST**

- [ ] Vytvořit produkt v FAPI (Podnikatelská Čtvrtka, 4.999 Kč)
- [ ] Vytvořit kupón `EARLY40` (40%, platnost 7 dní)
- [ ] Nastavit auto-aplikaci v URL (`?discount=EARLY40`)
- [ ] Přidat `registered_at` do URL parametrů
- [ ] Implementovat countdown timer na `/objednavka`
- [ ] Nastavit FAPI webhook validaci
- [ ] Otestovat celý flow (registrace → email → objednávka)

---

**READY TO SELL! 💰**

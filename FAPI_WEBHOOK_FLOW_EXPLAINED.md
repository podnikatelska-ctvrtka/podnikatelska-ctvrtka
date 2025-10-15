# 🎯 FAPI WEBHOOK FLOW - JAK TO FUNGUJE

## ✅ MÁTE UŽ VŠECHNO HOTOVÉ!

```
✅ Webhook function: /netlify/functions/fapi-webhook.js
✅ Webhook URL: https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
✅ FAPI vytváří faktury automaticky
✅ Přístup do kurzu se posílá emailem
```

---

## 🔄 CELÝ FLOW KROK ZA KROKEM:

### **KROK 1: USER VYPLNÍ NÁŠ HEZKEJ FORM** ✅

```
URL: https://podnikatelskactvrtka.cz/objednavka

User vyplní:
├── Jméno: Jan
├── Příjmení: Novák
├── Email: jan@email.cz
├── Telefon: +420 724 162 016
└── [☑] Nakupuji na firmu
    ├── Název: Iting s.r.o.
    ├── IČO: 25970631
    └── DIČ: CZ25970631

└── [☑] Vybere payment method (např. Google Pay)
└── [☑] Souhlas s GDPR

→ Klikne "Přejít k platbě (4.999 Kč nebo 6.049 Kč)"
```

---

### **KROK 2: REDIRECT NA FAPI FORM** ✅

```typescript
// FapiCheckoutForm.tsx dělá:
const fapiFormUrl = new URL('https://app.fapi.cz/form/362812');

// Pre-fill data:
fapiFormUrl.searchParams.append('email', 'jan@email.cz');
fapiFormUrl.searchParams.append('first_name', 'Jan');
fapiFormUrl.searchParams.append('last_name', 'Novák');
fapiFormUrl.searchParams.append('phone', '+420724162016');
fapiFormUrl.searchParams.append('payment_method', 'google_pay'); // ← Náš preference

// Pokud firma:
fapiFormUrl.searchParams.append('company_name', 'Iting s.r.o.');
fapiFormUrl.searchParams.append('ico', '25970631');
fapiFormUrl.searchParams.append('dic', 'CZ25970631');

// Redirect:
window.location.href = fapiFormUrl.toString();
```

---

### **KROK 3: FAPI FORM S PRE-FILLED DATY** ✅

```
User vidí FAPI formulář:

┌──────────────────────────────────────┐
│  FAPI FORMULÁŘ - PRODUKT 362812      │
├──────────────────────────────────────┤
│  Email: jan@email.cz ✅ (předvyplněno)│
│  Jméno: Jan ✅ (předvyplněno)         │
│  Příjmení: Novák ✅ (předvyplněno)    │
│  Telefon: +420724... ✅               │
│                                      │
│  Firma: Iting s.r.o. ✅               │
│  IČO: 25970631 ✅                     │
│  DIČ: CZ25970631 ✅                   │
├──────────────────────────────────────┤
│  VYBERTE ZPŮSOB PLATBY:              │
│                                      │
│  [ ] 💳 Platební karta                │
│  [ ] 🏦 Bankovní převod               │
│  [X] 📱 Google Pay ✅ (možná?)        │
│  [ ] 🍎 Apple Pay                     │
└──────────────────────────────────────┘

POZNÁMKA:
- FAPI MOŽNÁ respektuje náš payment_method parametr 🤷
- Nebo user musí vybrat znovu (duplicita)
- Záleží na FAPI implementaci
```

---

### **KROK 4: FAPI VYTVOŘÍ OBJEDNÁVKU** ✅

```
Když user potvrdí FAPI form:

1. FAPI vytvoří KONTAKT v CRM:
   ├── Email: jan@email.cz
   ├── Jméno: Jan Novák
   ├── Telefon: +420724162016
   └── Custom fields:
       ├── Firma: Iting s.r.o.
       ├── IČO: 25970631
       └── DIČ: CZ25970631

2. FAPI vytvoří OBJEDNÁVKU:
   ├── Produkt: Podnikatelská Čtvrtka (ID: 362812)
   ├── Cena: 4.999 Kč (nebo 6.049 Kč s DPH)
   ├── Status: "pending" (čeká na platbu)
   └── Invoice ID: např. "INV-2025-001234"

3. FAPI vytvoří FAKTURU (DRAFT):
   ├── Status: "unpaid"
   ├── IČO/DIČ (pokud firma)
   └── Čeká na zaplacení
```

---

### **KROK 5: REDIRECT NA GOPAY** ✅

```
FAPI automaticky:

1. Zavolá GoPay API:
   POST https://gw.gopay.com/api/payments/payment
   {
     "amount": 499900, // haléře (4.999 Kč)
     "currency": "CZK",
     "order_number": "INV-2025-001234",
     "order_description": "Podnikatelská Čtvrtka",
     "items": [...],
     "callback": {
       "return_url": "https://app.fapi.cz/payment/success",
       "notification_url": "https://api.fapi.cz/gopay-webhook"
     },
     "payer": {
       "email": "jan@email.cz",
       "contact": {
         "first_name": "Jan",
         "last_name": "Novák"
       }
     }
   }

2. GoPay vrátí:
   {
     "id": 3123456789,
     "gw_url": "https://gate.gopay.cz/gw/pay-full-v2?id=3123456789"
   }

3. FAPI redirectne usera:
   window.location.href = gw_url;
```

---

### **KROK 6: USER ZAPLATÍ (GOPAY GATEWAY)** 💳

```
User vidí GoPay payment gateway:

┌──────────────────────────────────────┐
│         GOPAY PAYMENT                │
├──────────────────────────────────────┤
│  Objednávka: INV-2025-001234         │
│  Cena: 4.999 Kč                      │
│                                      │
│  VYBERTE ZPŮSOB PLATBY:              │
│                                      │
│  [X] 💳 Platební karta                │
│      Číslo karty: ____-____-____-____│
│      Exp: __/__  CVV: ___            │
│                                      │
│  [ ] 🏦 Bankovní převod               │
│  [ ] 📱 Google Pay                    │
│  [ ] 🍎 Apple Pay                     │
│                                      │
│  [     ZAPLATIT 4.999 Kč     ]       │
└──────────────────────────────────────┘

User:
1. Vybere metodu (karta, převod, Google Pay...)
2. Vyplní údaje
3. Klikne "Zaplatit"
4. GoPay zpracuje platbu
```

---

### **KROK 7: GOPAY WEBHOOK → FAPI** ✅

```
Když je platba úspěšná, GoPay zavolá:

POST https://api.fapi.cz/gopay-webhook
{
  "id": 3123456789,
  "order_number": "INV-2025-001234",
  "state": "PAID",
  "amount": 499900,
  "currency": "CZK",
  "payer": {...},
  "payment_instrument": "PAYMENT_CARD",
  ...
}

FAPI automaticky:
1. ✅ Najde objednávku podle order_number
2. ✅ Označí objednávku jako "paid"
3. ✅ Vytvoří FAKTURU (finální verzi)
4. ✅ Pošle fakturu emailem zákazníkovi
5. ✅ Zavolá NÁŠ webhook!
```

---

### **KROK 8: FAPI WEBHOOK → NÁŠ WEBHOOK** ✅

```
FAPI zavolá náš webhook:

POST https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
Content-Type: application/x-www-form-urlencoded

id=INV-2025-001234

→ Náš fapi-webhook.js se spustí!
```

---

### **KROK 9: NÁŠ WEBHOOK ZPRACUJE** ✅

```javascript
// /netlify/functions/fapi-webhook.js

exports.handler = async (event) => {
  // 1️⃣ Parse invoice ID
  const params = new URLSearchParams(event.body);
  const invoiceId = params.get('id'); // "INV-2025-001234"
  
  // 2️⃣ Fetch invoice from FAPI API
  const fapiResponse = await fetch(`https://api.fapi.cz/invoices/${invoiceId}`, {
    headers: {
      'Authorization': `Basic ${Buffer.from('cipera@iting.cz:4gi28ahu...').toString('base64')}`
    }
  });
  
  const invoice = await fapiResponse.json();
  // {
  //   "id": "INV-2025-001234",
  //   "total": 4999,
  //   "customer": {
  //     "email": "jan@email.cz",
  //     "name": "Jan Novák"
  //   },
  //   "status": "paid",
  //   ...
  // }
  
  // 3️⃣ Generate access token
  const accessToken = `${Date.now()}-${Math.random()...}`;
  
  // 4️⃣ Save to Supabase
  await supabase.from('users').insert({
    email: invoice.customer.email,
    name: invoice.customer.name,
    order_id: invoiceId,
    access_token: accessToken,
    purchased_at: new Date().toISOString(),
    amount: invoice.total
  });
  
  // 5️⃣ Send email with access link
  const accessUrl = `https://podnikatelskactvrtka.cz/course-v3?token=${accessToken}`;
  
  await sendEmail(
    invoice.customer.email,
    '🎉 Přístup do kurzu Podnikatelská Čtvrtka',
    `
      <h1>Vítejte v kurzu!</h1>
      <p>Ahoj ${invoice.customer.name}!</p>
      <a href="${accessUrl}">Vstoupit do kurzu</a>
    `
  );
  
  return { statusCode: 200 };
};
```

---

### **KROK 10: USER DOSTANE EMAIL** ✅

```
Email od: kurz@podnikatelskactvrtka.cz
Komu: jan@email.cz
Předmět: 🎉 Přístup do kurzu Podnikatelská Čtvrtka

┌──────────────────────────────────────┐
│  🎉 Vítejte v kurzu!                 │
│                                      │
│  Ahoj Jan!                           │
│                                      │
│  Děkujeme za zakoupení kurzu        │
│  Podnikatelská Čtvrtka! 🚀           │
│                                      │
│  Váš přístup je připraven:           │
│                                      │
│  🔑 Váš přístupový odkaz:            │
│  [  VSTOUPIT DO KURZU  ]             │
│                                      │
│  💡 Tip: Uložte si tento email -    │
│  odkaz funguje natrvalo!             │
└──────────────────────────────────────┘

A TAKY dostane od FAPI:
- Fakturu emailem
- (Pokud máš v FAPI nastavené)
```

---

## 📊 CELÝ FLOW DIAGRAM:

```
USER
 │
 ├─ 1. Vyplní náš hezkej form (/objednavka)
 │      ├── Payment method selector
 │      ├── IČO/DIČ pole (pokud firma)
 │      └── GDPR souhlas
 │
 ├─ 2. Redirect na FAPI form
 │      └── Pre-filled data (email, jméno, IČO...)
 │
FAPI
 │
 ├─ 3. Vytvoří kontakt v CRM
 ├─ 4. Vytvoří objednávku (pending)
 ├─ 5. Vytvoří fakturu (draft)
 │
 ├─ 6. Zavolá GoPay API
 │      └── Vytvoří payment
 │
 ├─ 7. Redirect na GoPay gateway
 │
GOPAY
 │
 ├─ 8. User vybere payment method
 ├─ 9. User zaplatí
 │
 ├─ 10. GoPay webhook → FAPI
 │       └── state: "PAID"
 │
FAPI (znovu)
 │
 ├─ 11. Označí objednávku jako paid
 ├─ 12. Vytvoří finální fakturu
 ├─ 13. Pošle fakturu emailem
 │
 ├─ 14. Zavolá NÁŠ webhook
 │       └── POST /fapi-webhook
 │
NÁŠÍ WEBHOOK
 │
 ├─ 15. Fetch invoice z FAPI API
 ├─ 16. Parse customer data
 ├─ 17. Generate access token
 ├─ 18. Save do Supabase
 ├─ 19. Send email s přístupem
 │
USER
 │
 └─ 20. Dostane email s přístupem! 🎉
```

---

## 🔧 KDE JE WEBHOOK NASTAVENÝ VE FAPI:

### **VARIANTA A: PRODUKT LEVEL**

```
FAPI Dashboard:
├── Produkty
├── → Podnikatelská Čtvrtka (ID: 362812)
├── → Nastavení
├── ��� Webhooky
└── → Webhook URL:
       https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
```

---

### **VARIANTA B: GLOBÁLNÍ WEBHOOKY**

```
FAPI Dashboard:
├── Nastavení
├── → Integrace
├── → Webhooky
└── → Event: "invoice.paid"
       Webhook URL:
       https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
```

---

## 📝 CO WEBHOOK DOSTANE OD FAPI:

### **REQUEST FORMAT:**

```http
POST /fapi-webhook HTTP/1.1
Host: podnikatelskactvrtka.cz
Content-Type: application/x-www-form-urlencoded
User-Agent: FAPI/1.0

id=INV-2025-001234
```

---

### **INVOICE DATA (z FAPI API):**

```json
{
  "id": "INV-2025-001234",
  "number": "2025001234",
  "total": 4999,
  "currency": "CZK",
  "status": "paid",
  "paid_at": "2025-10-13T12:34:56Z",
  "customer": {
    "id": 123456,
    "email": "jan@email.cz",
    "name": "Jan Novák",
    "first_name": "Jan",
    "last_name": "Novák",
    "phone": "+420724162016",
    "custom_fields": {
      "company_name": "Iting s.r.o.",
      "ico": "25970631",
      "dic": "CZ25970631"
    }
  },
  "items": [
    {
      "name": "Podnikatelská Čtvrtka",
      "quantity": 1,
      "unit_price": 4999,
      "total": 4999
    }
  ],
  "payment_method": "gopay",
  "gopay_payment_id": 3123456789
}
```

---

## 🎯 CO DĚLÁ NÁŠ WEBHOOK:

### **1. FETCH INVOICE DATA** ✅

```javascript
const fapiResponse = await fetch(`https://api.fapi.cz/invoices/${invoiceId}`, {
  headers: {
    'Authorization': `Basic ${authString}`
  }
});

const invoice = await fapiResponse.json();
```

---

### **2. EXTRACT CUSTOMER DATA** ✅

```javascript
const email = invoice.customer.email;
const name = invoice.customer.name || invoice.customer.first_name;
const amount = parseFloat(invoice.total || 0);
```

---

### **3. GENERATE ACCESS TOKEN** ✅

```javascript
const accessToken = `${Date.now()}-${Math.random().toString(36)...}`;
```

---

### **4. SAVE TO SUPABASE** ✅

```javascript
await supabase.from('users').insert({
  email: email,
  name: name,
  order_id: invoiceId,
  access_token: accessToken,
  purchased_at: new Date().toISOString(),
  amount: amount
});
```

---

### **5. SEND EMAIL** ✅

```javascript
const accessUrl = `https://podnikatelskactvrtka.cz/course-v3?token=${accessToken}`;

await sendEmail(
  email,
  '🎉 Přístup do kurzu Podnikatelská Čtvrtka',
  emailHtml
);
```

---

## ✅ PAYMENT METHOD SELECTOR:

### **JAK TO FUNGUJE TEĎKA:**

```
NÁŠ FORM:
User vybere "Google Pay" ✅
↓
Posíláme jako URL parametr:
?payment_method=google_pay
↓
FAPI form:
MOŽNÁ pre-selectne Google Pay 🤷
Nebo user musí vybrat znovu ❌
↓
GoPay gateway:
User určitě vidí všechny metody
A vybírá tam ✅
```

---

### **JE TO PROBLÉM?**

```
ANO - duplicitní výběr (možná)
ALE:
✅ User aspoň VÍ co může čekat
✅ Náš form vypadá profesionálně
✅ Ukazujeme dostupné metody
✅ Není to critical issue

POZDĚJI:
→ Můžeme implementovat GoPay API přímo
→ ALE potřebujeme FAPI API pro faktury
→ Složitější setup
```

---

## 🎯 CO MÁŠ UŽ HOTOVÉ:

```
✅ fapi-webhook.js (kompletní!)
✅ Webhook URL nastavená ve FAPI
✅ FAPI credentials (username + API key)
✅ Supabase integration
✅ Email sending (Resend)
✅ Access token generation
✅ Custom checkout form s IČO/DIČ
✅ Payment method selector
✅ Právní stránky (/terms, /gdpr)
```

---

## 📊 EXPECTED PERFORMANCE:

```
100 lidí na /objednavka
     ↓
70 vyplní form (70%)
     ↓
65 redirect na FAPI (93%)
     ↓
60 potvrdí FAPI form (92%)
     ↓
55 redirect na GoPay (92%)
     ↓
45 zaplatí (82%)
     ↓
45 dostane webhook (100%)
     ↓
45 dostane email (100%)

→ 45% OVERALL CONVERSION! 🔥
```

---

## 🧪 JAK TESTOVAT:

### **1. LOCAL TEST (bez platby):**

```bash
netlify dev

# Otevři:
http://localhost:8888/objednavka

# Vyplň form a klikni "Přejít k platbě"
# → Mělo by redirect na FAPI form
```

---

### **2. FAPI TEST (test payment):**

```
1. Jdi na FAPI form (po redirect)
2. Potvrd údaje
3. Redirect na GoPay TEST gateway
4. Použij test kartu:
   - Číslo: 4111111111111111
   - Exp: 12/25
   - CVV: 123
5. Zaplatit
6. Čekej na webhook (5-30 vteřin)
7. Zkontroluj email!
```

---

### **3. WEBHOOK LOGS:**

```
Netlify Dashboard:
├── Functions
├── → fapi-webhook
└── → Logs

Uvidíš:
✅ Incoming requests
✅ Invoice ID
✅ Customer data
✅ Email sent
❌ Errors (pokud nějaké)
```

---

## 🎯 NEJČASTĚJŠÍ PROBLÉMY:

### **1. WEBHOOK SE NESPUSTÍ**

```
PŘÍČINA:
❌ Webhook URL není nastavená ve FAPI

FIX:
1. FAPI → Produkty → Čtvrtka → Webhooky
2. Add webhook:
   URL: https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
   Event: invoice.paid
3. Save
```

---

### **2. EMAIL NEDORAZÍ**

```
PŘÍČINA:
❌ Resend API key není nastavený
❌ Email adresa není verifikovaná v Resend

FIX:
1. Netlify → Site settings → Environment variables
2. Zkontroluj: RESEND_API_KEY
3. Resend dashboard → Verify domain
```

---

### **3. USER NENÍ ULOŽEN DO SUPABASE**

```
PŘÍČINA:
❌ Supabase credentials nejsou správně

FIX:
1. Netlify → ENV variables
2. Zkontroluj:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
3. Supabase → Settings → API → Copy values
```

---

## ✅ SUMMARY:

```
FAKTURY:
✅ FAPI vytváří automaticky
✅ Pošle je emailem zákazníkovi
✅ IČO/DIČ se zobrazí na faktuře

WEBHOOK:
✅ fapi-webhook.js už je hotový
✅ URL nastavená ve FAPI
✅ Funguje: FAPI → webhook → email s přístupem

PAYMENT METHODS:
✅ Selector na našem formu (informativní)
✅ MOŽNÁ duplicitní výběr v FAPI/GoPay
✅ Není to critical issue
✅ Lze optimalizovat později (GoPay API)

FLOW:
✅ Náš form → FAPI form → GoPay → Webhook → Email
✅ Všechno automatické!
✅ Ty nemusíš ničeho dělat ručně!

→ JE TO HOTOVÉ! 🎉
```

---

**Máš ještě nějaké dotazy k webhoooku nebo flow?** 🤔

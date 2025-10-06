# 💰 LMS - KOMPLETNÍ PLATEBNÍ SYSTÉM

## 🎯 CO POTŘEBUJEME VYŘEŠIT

1. ✅ **Zabezpečení** - přístup jen pro platící
2. ✅ **Česká fakturace** - Fakturoid
3. ✅ **Platební brána** - GoPay (máš zdarma!)
4. ✅ **Automatický přístup** - po zaplacení → okamžitý vstup do kurzu

---

## 🔧 TECHNICKÝ STACK

```
┌─────────────────────────────────────────────────┐
│  USER                                           │
│  Chce koupit kurz                               │
└──────────────┬──────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────┐
│  OBJEDNÁVKOVÝ FORMULÁŘ (náš web)                │
│  - Jméno, Email, IČO (optional)                 │
│  - Checkbox: "Chci fakturu"                     │
│  - Tlačítko: "Koupit kurz - 4.999 Kč"          │
└──────────────┬──────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────┐
│  GOPAY                                          │
│  - Platební brána (kartou/převodem)            │
│  - Bezpečná platba                              │
└──────────────┬──────────────────────────────────┘
               │ webhook po úspěšné platbě
               ▼
┌─────────────────────────────────────────────────┐
│  FAKTUROID API                                  │
│  - Vytvoří CZ fakturu                           │
│  - Pošle na email                               │
└──────────────┬──────────────────────────────────┘
               │ zároveň
               ▼
┌─────────────────────────────────────────────────┐
│  SUPABASE (database)                            │
│  - Uloží: email, payment_id, date               │
│  - Vytvoří access_token                         │
└──────────────┬──────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────┐
│  EMAIL AUTOMATIZACE                             │
│  - "Děkujeme za nákup!"                         │
│  - "Přístup do kurzu: [magic link]"             │
│  - "Faktura v příloze"                          │
└──────────────┬──────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────┐
│  USER klikne na magic link                      │
│  → Automaticky přihlášený do LMS! ✅            │
└─────────────────────────────────────────────────┘
```

---

## 📋 DETAIL: JAK TO BUDE FUNGOVAT

### **KROK 1: Objednávkový formulář (náš web)**

**URL:** `podnikatelskactvrtka.cz/order`

**Formulář:**
```tsx
┌─────────────────────────────────────┐
│ 🎓 Podnikatelská Čtvrtka            │
│ Online kurz                          │
│                                      │
│ Cena: 4.999 Kč (bez DPH)            │
│ ─────────────────────────────────   │
│                                      │
│ Email: [________________]            │
│ Jméno: [________________]            │
│                                      │
│ ☐ Potřebuji fakturu                 │
│   IČO:  [________]                   │
│   DIČ:  [________]                   │
│   Firma: [________________]          │
│                                      │
│ [💳 KOUPIT - 4.999 Kč]              │
│                                      │
│ 🔒 Bezpečná platba přes GoPay       │
└─────────────────────────────────────┘
```

**Po kliknutí:**
1. Validace formuláře
2. Odeslání dat do našeho API endpointu
3. API vytvoří GoPay platbu
4. Redirect na GoPay platební bránu

---

### **KROK 2: GoPay platba**

**GoPay webhook po úspěšné platbě:**
```json
POST https://tvuj-web.cz/api/gopay-webhook
{
  "id": "3456789012",
  "state": "PAID",
  "amount": 4999,
  "payer": {
    "email": "uzivatel@example.com"
  }
}
```

---

### **KROK 3: Náš webhook handler**

**Co se stane:**

```javascript
// 1. Ověř že platba je PAID
if (payment.state === "PAID") {
  
  // 2. Vytvoř fakturu přes Fakturoid API
  const invoice = await fakturoid.createInvoice({
    customer_name: userData.name,
    customer_email: userData.email,
    items: [{
      name: "Podnikatelská Čtvrtka - Online kurz",
      quantity: 1,
      unit_price: 4999
    }]
  });
  
  // 3. Ulož do Supabase
  const accessToken = generateRandomToken();
  await supabase.from('users').insert({
    email: userData.email,
    payment_id: payment.id,
    invoice_id: invoice.id,
    access_token: accessToken,
    purchased_at: new Date()
  });
  
  // 4. Pošli email s přístupem
  await sendEmail({
    to: userData.email,
    subject: "✅ Děkujeme za nákup!",
    body: `
      Váš kurz je připravený!
      
      Přístup do kurzu: 
      https://podnikatelskactvrtka.cz/course?token=${accessToken}
      
      Faktura v příloze.
    `,
    attachment: invoice.pdf_url
  });
}
```

---

## 🔐 ZABEZPEČENÍ LMS

### **VARIANTA A: Token-based (jednodušší)**

**Jak funguje:**
```
User dostane email s linkem:
https://podnikatelskactvrtka.cz/course?token=abc123xyz

CourseDemo.tsx zkontroluje:
1. Je token v URL parametru?
2. Existuje v Supabase databázi?
3. ANO → zobraz kurz ✅
4. NE → zobraz login screen nebo error ❌
```

**PROS:**
- ✅ Jednoduchý (15 minut implementace)
- ✅ Žádné hesla
- ✅ Magic link v emailu = okamžitý přístup

**CONS:**
- ⚠️ Token může sdílet (ale můžeme trackovat IP)
- ⚠️ Pokud ztratí email, musí kontaktovat support

---

### **VARIANTA B: Email magic link (profesionální)**

**Jak funguje:**
```
1. User jde na: podnikatelskactvrtka.cz/course/login
2. Zadá email
3. Zkontrolujeme v Supabase: Je platící zákazník?
4. ANO → pošleme magic link
5. User klikne na link → přihlášený!
6. Session uložena (30 dní)
```

**PROS:**
- ✅ Nelze sdílet
- ✅ Bezpečnější
- ✅ User může kdykoliv požádat o nový link

**CONS:**
- ⚠️ Trochu složitější implementace (1 hodina)

---

### **VARIANTA C: Username + Password (nedoporučuju)**

**Proč ne:**
- ❌ User musí pamatovat heslo
- ❌ Složitější UX
- ❌ Zbytečné pro kurz

---

## 💡 MÉ DOPORUČENÍ

### **POUŽIJ VARIANTU A + B HYBRID:**

1. **První přístup:** Token v emailu (okamžitý)
2. **Opakované přístupy:** Email magic link

**Implementace:**
```tsx
// CourseDemo.tsx

useEffect(() => {
  // Check URL token
  const urlToken = new URLSearchParams(window.location.search).get('token');
  
  if (urlToken) {
    // Verify token in Supabase
    const user = await supabase
      .from('users')
      .select('*')
      .eq('access_token', urlToken)
      .single();
    
    if (user) {
      // Save to session
      localStorage.setItem('course_access', urlToken);
      setIsAuthenticated(true);
    }
  } else {
    // Check if already logged in
    const savedToken = localStorage.getItem('course_access');
    if (savedToken) {
      // Verify still valid
      const user = await supabase
        .from('users')
        .select('*')
        .eq('access_token', savedToken)
        .single();
      
      if (user) {
        setIsAuthenticated(true);
      }
    }
  }
}, []);
```

---

## 📊 SUPABASE SCHEMA

**Table: `users`**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  payment_id TEXT NOT NULL,
  invoice_id TEXT,
  access_token TEXT NOT NULL UNIQUE,
  purchased_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  progress JSONB DEFAULT '{}',
  completed_modules INTEGER DEFAULT 0
);
```

**Table: `course_progress` (optional - pro tracking)**
```sql
CREATE TABLE course_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  module_id TEXT NOT NULL,
  completed_at TIMESTAMP DEFAULT NOW(),
  notes TEXT
);
```

---

## 🔗 INTEGRACE

### **1. GOPAY INTEGRACE**

**Knihovna:** `gopay-js` nebo REST API

**Vytvoření platby:**
```javascript
const gopay = new GoPay({
  goid: 'TVOJE_GOPAY_ID',
  clientId: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET'
});

const payment = await gopay.createPayment({
  amount: 4999,
  currency: 'CZK',
  order_number: `ORDER-${Date.now()}`,
  order_description: 'Podnikatelská Čtvrtka - Online kurz',
  payer: {
    email: userData.email,
    contact: {
      first_name: userData.name
    }
  },
  callback: {
    return_url: 'https://podnikatelskactvrtka.cz/order/success',
    notification_url: 'https://podnikatelskactvrtka.cz/api/gopay-webhook'
  }
});

// Redirect user to GoPay
window.location.href = payment.gw_url;
```

---

### **2. FAKTUROID INTEGRACE**

**Knihovna:** `fakturoid-js` nebo REST API

**Vytvoření faktury:**
```javascript
const fakturoid = new Fakturoid({
  accountSlug: 'tvuj-ucet',
  email: 'tvuj@email.cz',
  apiKey: 'API_KEY'
});

const invoice = await fakturoid.invoices.create({
  subject_id: customer.id, // nebo vytvoř nového
  lines: [{
    name: 'Podnikatelská Čtvrtka - Online kurz',
    quantity: 1,
    unit_price: 4999
  }],
  issued_on: new Date().toISOString().split('T')[0]
});

// Pošli fakturu emailem
await fakturoid.invoices.sendMessage(invoice.id, {
  email: userData.email
});
```

---

## 📧 EMAIL AUTOMATIZACE

**Tool:** Můžeš použít:
- **Nodemailer** (vlastní SMTP)
- **SendGrid** (FREE tier)
- **Resend** (moderní, easy to use)

**Email template po nákupu:**
```html
Ahoj {{name}}!

Děkujeme za nákup kurzu Podnikatelská Čtvrtka! 🎉

✅ OKAMŽITÝ PŘÍSTUP DO KURZU:
👉 https://podnikatelskactvrtka.cz/course?token={{access_token}}

📄 FAKTURA:
V příloze najdete fakturu.

🎓 CO DÁL?
1. Klikněte na odkaz výše
2. Začněte s Modulem 1
3. Postupujte svým tempem
4. Máte přístup na 12 měsíců!

💡 BONUS:
Prvních 50 kupujících dostává konzultaci ZDARMA!
Rezervujte si termín: https://calendly.com/tvuj-link

Máte otázky? Odpovězte na tento email!

S pozdravem,
{{your_name}}

---
Přístup ztracený? Požádejte o nový: 
https://podnikatelskactvrtka.cz/course/request-access
```

---

## 💰 NÁKLADY

**Měsíční provoz:**

| Service | Cena | Poznámka |
|---------|------|----------|
| **GoPay** | 0 Kč | Máš zdarma! ✅ |
| **Fakturoid** | ~300 Kč/měsíc | Start tarif |
| **Supabase** | 0 Kč | FREE tier (500MB) |
| **Netlify** | 0 Kč | Už máš! |
| **Email (SendGrid)** | 0 Kč | FREE tier (100/den) |
| **CELKEM** | **~300 Kč/měsíc** | 🎉 |

vs. Flowlance: ~800 Kč/měsíc

**ÚSPORA:** 500 Kč/měsíc = 6.000 Kč/rok! 💰

---

## 🚀 IMPLEMENTAČNÍ PLÁN

### **FÁZE 1: Backend API (4-5 hodin)**
- [ ] Supabase setup (databáze)
- [ ] GoPay integrace
- [ ] Fakturoid integrace
- [ ] Webhook handler
- [ ] Email automatizace

### **FÁZE 2: Frontend (2-3 hodiny)**
- [ ] Order page (`/order`)
- [ ] Success page (`/order/success`)
- [ ] Auth v CourseDemo.tsx
- [ ] Access request page

### **FÁZE 3: Testing (1 hodina)**
- [ ] Test platba (GoPay sandbox)
- [ ] Test faktura
- [ ] Test email
- [ ] Test přístup do kurzu

**CELKEM:** ~7-9 hodin práce

---

## ✅ CHECKLIST PRO TVŮJ SETUP

**Co potřebuješ:**

1. **GoPay účet:**
   - [ ] Máš! ✅ (zdarma na rok)
   - [ ] API credentials (clientId, clientSecret)

2. **Fakturoid účet:**
   - [ ] Vytvořit na fakturoid.cz
   - [ ] Získat API key

3. **Supabase účet:**
   - [ ] Vytvořit na supabase.com (FREE!)
   - [ ] Vytvořit projekt
   - [ ] Získat API URL + anon key

4. **Email service:**
   - [ ] SendGrid (FREE tier)
   - [ ] Nebo vlastní SMTP

---

## 🎯 ALTERNATIVNÍ ŘEŠENÍ (pokud chceš JEŠTĚ jednodušší)

### **MINIMAL VIABLE VERSION:**

```
1. GoPay platba
2. Po platbě → manuálně (ty):
   - Vytvoříš fakturu ve Fakturoid (2 min)
   - Pošleš email s přístupem (1 min)
3. User dostane access token
4. Přihlásí se do kurzu
```

**PROS:**
- ✅ Fastest setup (30 minut)
- ✅ Žádné webhooky potřeba
- ✅ Funguje okamžitě

**CONS:**
- ⚠️ Manuální práce (3 min/prodej)
- ⚠️ Neškáluje (OK pro <100 prodejů)

**DOPORUČUJU PRO START!**
→ Začni manuálně
→ Když budeš mít 20+ prodejů → automatizuj

---

## 💡 FINÁLNÍ DOPORUČENÍ

### **PRO START (první měsíc):**

1. ✅ **Order form** - jednoduchý formulář
2. ✅ **GoPay platba** - automatická
3. ✅ **Manuální faktura** - 2 min práce
4. ✅ **Manuální email** - copy-paste template
5. ✅ **Token přístup** - simple

**Čas:** 30 minut setup + 3 min/prodej

### **PRO ŠKÁLOVÁNÍ (po 20+ prodejích):**

1. ✅ **Automatické faktury** (Fakturoid API)
2. ✅ **Automatické emaily** (SendGrid)
3. ✅ **Webhook handling** (GoPay → Supabase)
4. ✅ **Magic link auth** (lepší UX)

**Upgrade čas:** 7-9 hodin (ale pak 0 min/prodej!)

---

## 🤔 CO ŘÍKÁŠ?

**Rozhodnutí:**

1. **Chceš SIMPLE START?** (manuální, fast setup)
2. **Nebo FULL AUTO?** (víc práce na začátku, ale pak 0 práce)

**A taky:**

3. **Zabezpečení:** Varianta A (token) nebo B (magic link)?
4. **Vylepšený Canvas:** Mám vytvořit verzi se štítky + kalkulací?

---

**Řekni mi co preferuješ a můžu začít! 🚀**
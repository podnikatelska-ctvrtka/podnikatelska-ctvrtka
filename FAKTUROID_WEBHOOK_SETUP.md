# 🔔 FAKTUROID WEBHOOK → SUPABASE SETUP

## ✅ CO MÁŠ TEĎ

- Fakturoid účet ✅
- GoPay propojení (máš návod) ✅
- Objednávkový formulář ve Fakturoidu ✅
- FREE tier (1500 API volání) ✅

---

## 🎯 CO POTŘEBUJEME DODAT

**WEBHOOK HANDLER:**
```
Fakturoid webhook → tvůj API endpoint → Supabase + Email
```

---

## 📋 KROK ZA KROKEM

### **KROK 1: Fakturoid webhook nastavení**

**V Fakturoidu:**
1. Jdi na: **Nastavení → Webhooks**
2. Klikni: **Přidat webhook**
3. Nastav:
   ```
   Událost: "Faktura zaplacena" (invoice.paid)
   URL: https://tvuj-web.cz/api/fakturoid-webhook
   ```
4. Ulož!

**Fakturoid pak pošle toto:**
```json
POST https://tvuj-web.cz/api/fakturoid-webhook

{
  "event_name": "invoice.paid",
  "invoice": {
    "id": 12345,
    "number": "2025001",
    "client_name": "Jan Novák",
    "client_email": "jan@example.com",
    "total": "4999.00",
    "paid_at": "2025-10-06T14:30:00Z"
  }
}
```

---

### **KROK 2: Webhook handler (tvoje API)**

**2 VARIANTY:**

#### **VARIANTA A: Netlify Function (jednodušší!)** ✅

**Vytvoř:** `/netlify/functions/fakturoid-webhook.js`

```javascript
// Supabase client
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Email sender (SendGrid/Resend)
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event, context) {
  // Parse webhook data
  const data = JSON.parse(event.body);
  
  // Verify it's "invoice.paid" event
  if (data.event_name !== 'invoice.paid') {
    return { statusCode: 200, body: 'OK' };
  }
  
  const invoice = data.invoice;
  
  try {
    // 1. Generate unique access token
    const accessToken = crypto.randomUUID();
    
    // 2. Save to Supabase
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        email: invoice.client_email,
        name: invoice.client_name,
        invoice_id: invoice.id,
        invoice_number: invoice.number,
        access_token: accessToken,
        purchased_at: invoice.paid_at,
        amount: parseFloat(invoice.total)
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // 3. Send access email
    await resend.emails.send({
      from: 'Podnikatelská Čtvrtka <kurz@podnikatelskactvrtka.cz>',
      to: invoice.client_email,
      subject: '✅ Váš přístup do kurzu je ready!',
      html: `
        <h1>Děkujeme za nákup!</h1>
        <p>Ahoj ${invoice.client_name}!</p>
        
        <p>Váš kurz Podnikatelská Čtvrtka je připravený! 🎉</p>
        
        <h2>🎓 Okamžitý přístup:</h2>
        <a href="https://podnikatelskactvrtka.cz/course?token=${accessToken}" 
           style="display: inline-block; background: #3b82f6; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold;">
          VSTOUPIT DO KURZU
        </a>
        
        <p>Nebo zkopírujte tento link:</p>
        <p><code>https://podnikatelskactvrtka.cz/course?token=${accessToken}</code></p>
        
        <hr/>
        
        <p><strong>📄 Faktura:</strong> Najdete v příloze.</p>
        
        <p><strong>💡 Co dál?</strong></p>
        <ul>
          <li>Začněte s Modulem 1</li>
          <li>Postupujte svým tempem</li>
          <li>Máte přístup na 12 měsíců!</li>
        </ul>
        
        <p><strong>🎁 BONUS:</strong> Prvních 50 kupujících dostává konzultaci ZDARMA!<br/>
        Rezervujte si termín: <a href="https://calendly.com/tvuj-link">Calendly</a></p>
        
        <p>Máte otázky? Odpovězte na tento email!</p>
        
        <p>S pozdravem,<br/>
        [Tvoje jméno]</p>
      `
    });
    
    // 4. Log success
    console.log('✅ User created and email sent:', user.email);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, user_id: user.id })
    };
    
  } catch (error) {
    console.error('❌ Webhook error:', error);
    
    // Alert admin (optional)
    await resend.emails.send({
      from: 'Alert <alert@podnikatelskactvrtka.cz>',
      to: 'tvuj@email.cz',
      subject: '⚠️ Webhook selhání!',
      text: `Error: ${error.message}\n\nInvoice: ${invoice.number}`
    });
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
```

**ENV variables (Netlify):**
```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJxxx...
RESEND_API_KEY=re_xxx...
```

---

#### **VARIANTA B: Make.com (no-code!)** ✅

**Ještě jednodušší!**

1. **Make.com scenario:**
   ```
   Trigger: Webhook (Fakturoid)
   ↓
   Filter: event_name === "invoice.paid"
   ↓
   Action 1: Supabase → Insert row
     Table: users
     Data: {
       email: {{invoice.client_email}},
       name: {{invoice.client_name}},
       access_token: {{random_uuid}},
       invoice_id: {{invoice.id}}
     }
   ↓
   Action 2: Email (Gmail/SendGrid)
     To: {{invoice.client_email}}
     Subject: "Přístup do kurzu"
     Body: "Link: ...?token={{access_token}}"
   ```

2. **Webhook URL z Make.com:**
   ```
   https://hook.eu1.make.com/xxx
   ```

3. **Nastav ve Fakturoidu:**
   ```
   Webhook URL: https://hook.eu1.make.com/xxx
   ```

**HOTOVO!** ✅

---

## 🎨 EMBEDDED FAKTUROID FORM NA WEB

**Na `/order` page:**

```tsx
// /components/OrderPage.tsx

export function OrderPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            🎓 Podnikatelská Čtvrtka
          </h1>
          <p className="text-xl text-gray-600">
            Online kurz - Kompletní obchodní model za 1 den
          </p>
        </div>
        
        {/* Price box */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">
              4.999,- Kč
            </div>
            <div className="text-gray-600 mb-4">(bez DPH)</div>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="font-bold text-blue-900 mb-2">
                🎁 CO DOSTANETE:
              </div>
              <div className="text-sm text-blue-800 space-y-1">
                <div>✅ 9 video modulů (4 hodiny obsahu)</div>
                <div>✅ Pracovní sešit + šablony</div>
                <div>✅ Business Model Canvas (interaktivní)</div>
                <div>✅ Přístup na 12 měsíců</div>
                <div>✅ Konzultace ZDARMA* (prvních 50)</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Fakturoid form (iframe nebo embedded) */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Objednávkový formulář
          </h2>
          
          {/* OPTION 1: Iframe */}
          <iframe 
            src="https://app.fakturoid.cz/TVUJ_UCET/orders/new?product_id=XXX"
            width="100%"
            height="600"
            frameBorder="0"
            style={{ border: 'none' }}
          />
          
          {/* OPTION 2: Redirect tlačítko */}
          {/* 
          <button 
            onClick={() => window.location.href = 'https://app.fakturoid.cz/...'}
            className="w-full bg-blue-600 text-white py-4 rounded-lg"
          >
            Pokračovat k platbě
          </button>
          */}
        </div>
        
        {/* Trust badges */}
        <div className="text-center mt-8 space-y-2 text-sm text-gray-600">
          <div>🔒 Bezpečná platba přes GoPay</div>
          <div>📄 Automatické vystavení faktury</div>
          <div>⚡ Okamžitý přístup po zaplacení</div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🔧 SUPABASE SCHEMA

```sql
-- Table: users (platící zákazníci)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  invoice_id INTEGER,
  invoice_number TEXT,
  access_token TEXT NOT NULL UNIQUE,
  purchased_at TIMESTAMP,
  amount DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  
  -- Progress tracking
  completed_modules INTEGER DEFAULT 0,
  progress JSONB DEFAULT '{}',
  
  -- Metadata
  ip_address TEXT,
  user_agent TEXT
);

-- Index pro rychlé vyhledávání
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_token ON users(access_token);

-- Table: course_progress (optional)
CREATE TABLE course_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  module_id TEXT NOT NULL,
  completed_at TIMESTAMP DEFAULT NOW(),
  notes TEXT,
  time_spent INTEGER -- sekundy
);
```

---

## 📧 EMAIL SETUP

**Použij Resend (doporučuju!):**

1. **Jdi na:** resend.com
2. **FREE tier:** 100 emailů/den (stačí!)
3. **Získej API key**
4. **Verify doménu:** podnikatelskactvrtka.cz
5. **Hotovo!**

**Nebo SendGrid:**
- FREE tier: 100 emailů/den
- Trochu složitější setup

**Nebo vlastní SMTP:**
- Seznam.cz / Gmail SMTP
- Ale limit 100-500 emailů/den

---

## 💰 NÁKLADY

| Service | Cena |
|---------|------|
| **Fakturoid** | 0-180 Kč/měsíc (FREE do 1500 API) ✅ |
| **GoPay** | 0 Kč (máš zdarma!) ✅ |
| **Supabase** | 0 Kč (FREE tier) ✅ |
| **Netlify** | 0 Kč (už máš) ✅ |
| **Resend** | 0 Kč (FREE tier 100/den) ✅ |
| **CELKEM** | **0-180 Kč/měsíc!** 🎉 |

**vs. Flowlance: 800 Kč/měsíc**

**ÚSPORA: 620-800 Kč/měsíc = 7.440-9.600 Kč/rok!** 💰

---

## 🚀 IMPLEMENTAČNÍ PLÁN

### **FÁZE 1: Fakturoid setup (30 min)**
- [ ] Propoj GoPay s Fakturoide (máš návod)
- [ ] Vytvoř produkt "Podnikatelská Čtvrtka"
- [ ] Nastav cenu 4.999 Kč
- [ ] Otestuj objednávkový form (sandbox)

### **FÁZE 2: Webhook handler (1 hodina)**
- [ ] **VARIANTA A:** Netlify Function
  - Vytvoř `/netlify/functions/fakturoid-webhook.js`
  - Nastav ENV variables
- [ ] **VARIANTA B:** Make.com scenario
  - Vytvoř scenario
  - Propoj s Fakturoide

### **FÁZE 3: Supabase (30 min)**
- [ ] Vytvoř účet (supabase.com)
- [ ] Vytvoř projekt
- [ ] Spusť SQL schema (vytvořit `users` table)
- [ ] Zkopíruj API URL + anon key

### **FÁZE 4: Email (15 min)**
- [ ] Vytvoř Resend účet
- [ ] Verify doménu
- [ ] Zkopíruj API key
- [ ] Test email send

### **FÁZE 5: Order page (30 min)**
- [ ] Vytvoř `/order` route v App.tsx
- [ ] Embed Fakturoid form (iframe)
- [ ] Design objednávkové stránky
- [ ] Test flow

### **FÁZE 6: Testing (30 min)**
- [ ] Test platba (GoPay sandbox)
- [ ] Zkontroluj webhook přijde
- [ ] Zkontroluj Supabase insert
- [ ] Zkontroluj email přijde
- [ ] Test přístup do kurzu (token)

**CELKEM: ~3-4 hodiny** (včetně testování!)

---

## ✅ VÝHODY TOHOTO ŘEŠENÍ

1. ✅ **Fakturoid dělá faktury** (CZ legislativa!)
2. ✅ **GoPay platební brána** (máš zdarma!)
3. ✅ **Automatický přístup** (webhook → email)
4. ✅ **Vlastní LMS** (plná kontrola!)
5. ✅ **Minimální náklady** (0-180 Kč/měsíc!)
6. ✅ **Škálovatelné** (zvládne tisíce prodejů)

---

## 💡 DOPORUČENÍ

### **PRO START:**

**Použij Make.com webhook handler:**
- ✅ No-code (visual editor)
- ✅ Setup 30 minut
- ✅ Spolehlivé (retry logic)
- ✅ FREE pro <1000 prodejů/měsíc

**Později (po 100+ prodejích):**
- Upgrade na Netlify Function
- Custom logic
- Better error handling

---

## 🎯 NEXT STEPS

**CO UDĚLAT TEĎ:**

1. **Propoj GoPay s Fakturoide** (máš návod!)
2. **Vytvoř produkt** ve Fakturoidu
3. **Test objednávkový form** (sandbox)
4. **Řekni mi když máš hotovo** → pomůžu s webhook!

**Nebo:**

5. **Chceš abych ti vytvořil:**
   - OrderPage.tsx komponentu?
   - Netlify Function pro webhook?
   - Email template?

---

**TOHLE JE MNOHEM JEDNODUŠŠÍ NEŽ JSEM MYSLEL! 🎉**

Fakturoid + GoPay integrace = většina práce hotová!

**Řekni mi co chceš udělat jako další krok! 🚀**

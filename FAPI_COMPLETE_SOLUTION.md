# 🎯 FAPI - KOMPLETNÍ ŘEŠENÍ

## ✅ PROČ FAPI?

### **FAPI vs. FAKTUROID:**

| Feature | FAPI | Fakturoid |
|---------|------|-----------|
| **Objednávkový formulář** | ✅ Hotový! | ❌ Nemá |
| **Platební brána** | ✅ Built-in | ⚠️ Propojení potřeba |
| **CZ fakturace** | ✅ Automatická | ✅ API |
| **Webhooks** | ✅ Ano | ✅ Ano |
| **Cena** | 200 Kč/měsíc (10 objednávek) | 180 Kč/měsíc |
| **Extra objednávky** | +20 Kč/ks | FREE do 1500 API |
| **Setup čas** | ⏱️ 15 minut | ⏱️ 1-2 hodiny |

**WINNER: FAPI!** 🏆

---

## 🚀 FAPI FLOW

```
┌─────────────────────────────────────────────┐
│ 1. EMAIL SEKVENCE                           │
│    User dostane link na prodejní page       │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│ 2. TVOJE PRODEJNÍ PAGE                      │
│    podnikatelskactvrtka.cz/order            │
│    → Tlačítko: "Koupit kurz"               │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│ 3. FAPI FORMULÁŘ                            │
│    - Email, jméno, IČO (optional)           │
│    - GoPay platba                           │
│    - Automatická faktura                    │
└──────────────┬──────────────────────────────┘
               │ po zaplacení
               ▼
┌─────────────────────────────────────────────┐
│ 4. FAPI WEBHOOK → Tvůj endpoint             │
│    POST /api/fapi-webhook                   │
│    {                                        │
│      "order_id": "12345",                   │
│      "status": "paid",                      │
│      "email": "user@example.com",           │
│      "name": "Jan Novák"                    │
│    }                                        │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│ 5. WEBHOOK HANDLER                          │
│    ┌─────────────────────────────────────┐  │
│    │ 1. GENERUJE UNIQUE TOKEN            │  │
│    │    token = crypto.randomUUID()      │  │
│    │    → "a7b2c3d4-e5f6-7890..."        │  │
│    └─────────────────────────────────────┘  │
│                                             │
│    ┌─────────────────────────────────────┐  │
│    │ 2. ULOŽÍ DO SUPABASE                │  │
│    │    users.insert({                   │  │
│    │      email: "user@example.com",     │  │
│    │      access_token: "a7b2c3d4...",   │  │
│    │      order_id: "12345"              │  │
│    │    })                                │  │
│    └─────────────────────────────────────┘  │
│                                             │
│    ┌─────────────────────────────────────┐  │
│    │ 3. POŠLE EMAIL S TOKENEM            │  │
│    │    "Váš přístup:"                   │  │
│    │    ...?token=a7b2c3d4...            │  │
│    └─────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│ 6. USER KLIKNE NA LINK                      │
│    course?token=a7b2c3d4...                 │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│ 7. COURSEDEMО.TSX                           │
│    - Ověří token v Supabase                 │
│    - Token existuje? → Přihlášen! ✅        │
│    - Token neexistuje? → Error ❌           │
└─────────────────────────────────────────────┘
```

---

## 💻 KÓD: WEBHOOK HANDLER (generuje token!)

### **Netlify Function: `/netlify/functions/fapi-webhook.js`**

```javascript
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize clients
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event, context) {
  // Parse FAPI webhook data
  const order = JSON.parse(event.body);
  
  // Verify order is paid
  if (order.status !== 'paid') {
    return { statusCode: 200, body: 'OK - not paid yet' };
  }
  
  try {
    // ──────────────────────────────────────────
    // 🔑 1. GENERUJ UNIQUE TOKEN (TADY!)
    // ──────────────────────────────────────────
    const accessToken = crypto.randomUUID();
    // Výsledek: "a7b2c3d4-e5f6-7890-abcd-ef1234567890"
    
    console.log('Generated token:', accessToken);
    
    // ─────────────────────────────────��────────
    // 💾 2. ULOŽ DO SUPABASE
    // ──────────────────────────────────────────
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        email: order.email,
        name: order.name,
        order_id: order.order_id,
        access_token: accessToken, // ← UNIQUE token!
        purchased_at: new Date().toISOString(),
        amount: order.amount
      })
      .select()
      .single();
    
    if (error) {
      // Pokud email už existuje (duplicitní nákup)
      if (error.code === '23505') {
        console.log('User already exists, skipping...');
        return { statusCode: 200, body: 'User exists' };
      }
      throw error;
    }
    
    console.log('User created:', user.id);
    
    // ──────────────────────────────────────────
    // 📧 3. POŠLI EMAIL S TOKENEM
    // ──────────────────────────────────────────
    await resend.emails.send({
      from: 'Podnikatelská Čtvrtka <kurz@podnikatelskactvrtka.cz>',
      to: order.email,
      subject: '✅ Váš přístup do kurzu je ready!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .button { 
              display: inline-block; 
              background: #3b82f6; 
              color: white; 
              padding: 16px 32px; 
              text-decoration: none; 
              border-radius: 8px; 
              font-weight: bold;
              margin: 20px 0;
            }
            .code { 
              background: #f3f4f6; 
              padding: 12px; 
              border-radius: 4px; 
              font-family: monospace; 
              font-size: 14px;
              word-break: break-all;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎉 Děkujeme za nákup!</h1>
            
            <p>Ahoj ${order.name}!</p>
            
            <p>Váš kurz <strong>Podnikatelská Čtvrtka</strong> je připravený!</p>
            
            <h2>🎓 Okamžitý přístup do kurzu:</h2>
            
            <a href="https://podnikatelskactvrtka.cz/course?token=${accessToken}" class="button">
              VSTOUPIT DO KURZU
            </a>
            
            <p>Nebo zkopírujte tento link:</p>
            <div class="code">
              https://podnikatelskactvrtka.cz/course?token=${accessToken}
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            
            <h3>📄 Faktura</h3>
            <p>Fakturu najdete ve FAPI administraci nebo vám přijde samostatným emailem.</p>
            
            <h3>💡 Co dál?</h3>
            <ul>
              <li>Začněte s Modulem 1</li>
              <li>Postupujte svým tempem</li>
              <li>Máte přístup na 12 měsíců!</li>
            </ul>
            
            <h3>🎁 BONUS</h3>
            <p>Prvních 50 kupujících dostává konzultaci ZDARMA!<br/>
            <a href="https://calendly.com/tvuj-link">Rezervujte si termín zde</a></p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            
            <p style="font-size: 14px; color: #6b7280;">
              Máte otázky? Odpovězte na tento email!
            </p>
            
            <p>S pozdravem,<br/>
            [Tvoje jméno]</p>
          </div>
        </body>
        </html>
      `
    });
    
    console.log('✅ Email sent to:', order.email);
    
    // ──────────────────────────────────────────
    // ✅ SUCCESS RESPONSE
    // ──────────────────────────────────────────
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        user_id: user.id,
        token_generated: true 
      })
    };
    
  } catch (error) {
    console.error('❌ Webhook error:', error);
    
    // Alert admin
    await resend.emails.send({
      from: 'Alert <alert@podnikatelskactvrtka.cz>',
      to: 'tvuj@email.cz',
      subject: '⚠️ FAPI webhook selhání!',
      text: `
        Error: ${error.message}
        
        Order ID: ${order.order_id}
        Email: ${order.email}
        
        Full error: ${JSON.stringify(error, null, 2)}
      `
    });
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
```

---

## 🔐 JAK FUNGUJE TOKEN OVĚŘENÍ V COURSEDEMО

### **V `/components/CourseDemo.tsx`:**

```typescript
useEffect(() => {
  const verifyAccess = async () => {
    // 1. Získej token z URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    
    // 2. Ověř token v Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('access_token', token) // ← Hledá TENTO konkrétní token
      .single();
    
    if (error || !user) {
      toast.error('Neplatný přístupový token');
      setIsAuthenticated(false);
      return;
    }
    
    // 3. Token existuje! → Přihlaš usera
    setIsAuthenticated(true);
    setCurrentUser(user);
    localStorage.setItem('course_token', token); // uložit pro příště
    
    // 4. Log login (tracking)
    await supabase.from('users').update({
      last_login: new Date().toISOString()
    }).eq('id', user.id);
    
    console.log('✅ User authenticated:', user.email);
  };
  
  verifyAccess();
}, []);
```

---

## 🎯 PROČ KAŽDÝ MÁ JINÝ TOKEN

**Protože `crypto.randomUUID()` generuje náhodný string!**

### **Příklad:**

```javascript
// User 1 zaplatí:
crypto.randomUUID() 
→ "a7b2c3d4-e5f6-7890-abcd-ef1234567890"

// User 2 zaplatí:
crypto.randomUUID() 
→ "f9d8c7b6-a5e4-d3c2-b1a0-9f8e7d6c5b4a"

// User 3 zaplatí:
crypto.randomUUID() 
→ "12ab34cd-56ef-78gh-90ij-klmnopqrstuv"
```

**Každý token je UNIQUE! Kolize je prakticky nemožná (1 z 10^36 šance!)**

---

## 📊 SUPABASE SCHEMA

```sql
-- Table: users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  order_id TEXT NOT NULL,
  access_token TEXT NOT NULL UNIQUE, -- ← UNIQUE token!
  purchased_at TIMESTAMP,
  amount DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  
  -- Progress tracking
  completed_modules INTEGER DEFAULT 0,
  progress JSONB DEFAULT '{}',
  
  -- Anti-sharing
  login_count INTEGER DEFAULT 0,
  ip_addresses TEXT[], -- array of IPs
  device_fingerprints TEXT[] -- array of device IDs
);

-- Indexy pro rychlé vyhledávání
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_token ON users(access_token);
CREATE INDEX idx_users_order ON users(order_id);

-- Security: Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Uživatelé můžou vidět jen svoje data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT
  USING (auth.uid() = id OR access_token = current_setting('request.jwt.claims')::json->>'token');
```

---

## 💰 FAPI CENY

**Tarify:**

| Tarif | Cena | Objednávky | Extra |
|-------|------|------------|-------|
| **Start** | 200 Kč/měsíc | 10 objednávek | +20 Kč/ks |
| **Standard** | 500 Kč/měsíc | 50 objednávek | +10 Kč/ks |
| **Pro** | 1000 Kč/měsíc | 200 objednávek | +5 Kč/ks |

**Pro tebe (start):**
- 200 Kč/měsíc = 10 prodejů
- Revenue z 10 prodejů = 49.990 Kč
- **ROI: 250×!** 🚀

**Když prodáš 11-20 kurzů:**
- 200 Kč základní + 10× 20 Kč = **400 Kč celkem**
- Revenue = 99.980 Kč
- **ROI: 250×!** 🎉

**vs. Flowlance: 800 Kč/měsíc (bez limitu objednávek)**

---

## 🔧 FAPI SETUP (KROK ZA KROKEM)

### **KROK 1: Vytvoř FAPI účet (5 min)**

1. Jdi na **fapi.cz**
2. Registrace
3. Vyber tarif **Start** (200 Kč/měsíc)

### **KROK 2: Vytvoř produkt (5 min)**

1. **Produkty → Nový produkt**
2. Nastav:
   ```
   Název: Podnikatelská Čtvrtka - Online kurz
   Cena: 4.999 Kč (bez DPH)
   Typ: Digitální produkt
   Popis: 9 stavebních prvků...
   ```

3. **Platební brána:**
   - Propoj GoPay (máš účet!)
   - Nebo jiná brána (Stripe, PayPal)

4. **Fakturace:**
   - Zapni automatickou fakturaci
   - Nastav IČO, DIČ

### **KROK 3: Webhook setup (5 min)**

1. **Nastavení → Webhooks**
2. **Přidat webhook:**
   ```
   Událost: "Objednávka zaplacena"
   URL: https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
   ```

3. **Test webhook** (FAPI má test button!)

### **KROK 4: Získej URL objednávkového formuláře**

FAPI ti dá URL typu:
```
https://fapi.cz/order/TVUJ_PRODUKT_ID
```

**Tuto URL použiješ na prodejní page!**

---

## 🎨 TVOJE PRODEJNÍ PAGE

### **`/components/OrderPage.tsx`:**

```tsx
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
        
        {/* Price & Features */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">
              4.999,- Kč
            </div>
            <div className="text-gray-600 mb-6">(bez DPH)</div>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-blue-900 mb-4">
                🎁 CO DOSTANETE:
              </h3>
              <div className="text-sm text-blue-800 space-y-2 text-left max-w-md mx-auto">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✅</span>
                  <span>9 video modulů (4 hodiny obsahu)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✅</span>
                  <span>Pracovní sešit + šablony</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✅</span>
                  <span>Business Model Canvas (interaktivní)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✅</span>
                  <span>Přístup na 12 měsíců</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✅</span>
                  <span>Konzultace ZDARMA* (prvních 50)</span>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <a 
              href="https://fapi.cz/order/TVUJ_PRODUKT_ID"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-xl text-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              🛒 KOUPIT KURZ - 4.999 Kč
            </a>
            
            <div className="mt-6 text-sm text-gray-600 space-y-1">
              <div>🔒 Bezpečná platba přes GoPay</div>
              <div>📄 Automatická faktura</div>
              <div>⚡ Okamžitý přístup po zaplacení</div>
            </div>
          </div>
        </div>
        
        {/* Trust section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-center mb-4">
            🛡️ 14-denní garance vrácení peněz
          </h3>
          <p className="text-center text-gray-600">
            Pokud do 14 dní nezjistíte alespoň 3 věci které můžete okamžitě změnit 
            ve vašem byznysu, vrátíme peníze. Bez otázek.
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

## ✅ CELÝ FLOW - SHRNUTÍ

### **1. User journey:**

```
Email sekvence 
  → "Koupit kurz" button
    → Redirect na FAPI formulář
      → Vyplní email, jméno, IČO
        → GoPay platba
          → FAPI webhook
            → Webhook GENERUJE TOKEN ← TADY!
              → Uloží do Supabase
                → Pošle email s tokenem
                  → User klikne na link
                    → CourseDemo ověří token
                      → PŘIHLÁŠEN! ✅
```

### **2. Token generation:**

```javascript
// V webhook handleru:
const token = crypto.randomUUID(); // ← KAŽDÝ MÁ JINÝ!

// Příklad výstupů:
User 1: "a7b2c3d4-e5f6-7890-abcd-ef1234567890"
User 2: "f9d8c7b6-a5e4-d3c2-b1a0-9f8e7d6c5b4a"
User 3: "12ab34cd-56ef-78gh-90ij-klmnopqrstuv"
```

### **3. Token verification:**

```typescript
// V CourseDemo.tsx:
const token = urlParams.get('token'); // z URL
const user = await supabase
  .from('users')
  .select('*')
  .eq('access_token', token) // ověří jestli existuje
  .single();

if (user) {
  setIsAuthenticated(true); // ✅
}
```

---

## 💡 VÝHODY FAPI ŘEŠENÍ

1. ✅ **Objednávkový formulář hotový** (nemusíš programovat!)
2. ✅ **GoPay integrace built-in** (už propojená!)
3. ✅ **CZ fakturace automatická**
4. ✅ **Webhook reliable** (retry logic)
5. ✅ **Token auto-generování** (webhook handler)
6. ✅ **Setup 30 minut!**
7. ✅ **Cena: 200 Kč/měsíc** (vs. Flowlance 800 Kč)

---

## 🎯 NEXT STEPS

### **CO UDĚLAT TEĎ:**

1. **Zaregistruj se na FAPI** (fapi.cz)
2. **Vytvoř produkt** (kurz za 4.999 Kč)
3. **Propoj GoPay** (máš účet!)
4. **Test objednávka** (sandbox)
5. **Řekni mi když máš hotovo** → Vytvořím webhook handler!

**Nebo:**

6. **Chceš abych vytvořil:**
   - OrderPage.tsx komponentu?
   - Netlify Function pro FAPI webhook?
   - Email template?
   - Supabase schema?

---

**FAPI JE BEST CHOICE! Jednodušší než Fakturoid! 🚀**
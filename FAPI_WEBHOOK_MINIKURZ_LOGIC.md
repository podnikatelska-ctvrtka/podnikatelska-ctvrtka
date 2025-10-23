# 🔐 FAPI WEBHOOK: Mini kurz jen pro průkopníky

Jak poslat **mini kurz token** JEN průkopníkům (první vlna), ale NE pozdějším zákazníkům.

---

## 🎯 **POŽADAVEK**

**Scénář A: PRŮKOPNÍCI (první 7 dní)**
- Koupí kurz do 7 dnů od launch
- Email obsahuje:
  - ✅ Hlavní kurz token
  - ✅ **Mini kurz token** (BONUS)

**Scénář B: POZDNÍ ZÁKAZNÍCI (po 7 dnech)**
- Koupí kurz později
- Email obsahuje:
  - ✅ Hlavní kurz token
  - ❌ **ŽÁDNÝ mini kurz** (už není bonus)

---

## 🔧 **IMPLEMENTACE: FAPI Webhook**

### **netlify/functions/fapi-webhook.js**

```javascript
const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');

exports.handler = async (event) => {
  // FAPI pošle POST request s daty objednávky
  const { customer_email, order_id, product_id, created_at } = JSON.parse(event.body);
  
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  
  // 🗓️ LAUNCH DATE - ZMĚŇ TOTO DATUM!
  const LAUNCH_DATE = new Date('2025-01-27T09:00:00Z'); // 27. ledna 2025 v 9:00
  const EARLY_BIRD_DAYS = 7; // Průkopnická nabídka trvá 7 dní
  
  // Zjisti kdy zákazník koupil
  const purchaseDate = new Date(created_at || Date.now());
  
  // Vypočti kolik dní od launchu
  const daysSinceLaunch = (purchaseDate - LAUNCH_DATE) / (1000 * 60 * 60 * 24);
  
  // 🎯 JE PRŮKOPNÍK?
  const isEarlyBird = daysSinceLaunch <= EARLY_BIRD_DAYS;
  
  console.log('📊 Purchase analysis:', {
    email: customer_email,
    purchase_date: purchaseDate.toISOString(),
    days_since_launch: daysSinceLaunch,
    is_early_bird: isEarlyBird
  });
  
  // 1️⃣ Vytvoř uživatele v Supabase Auth
  const { data: user, error: authError } = await supabase.auth.admin.createUser({
    email: customer_email,
    email_confirm: true,
    password: generateRandomPassword(), // Vygeneruj heslo
  });
  
  if (authError) {
    console.error('❌ Auth error:', authError);
    return { statusCode: 500, body: JSON.stringify({ error: authError.message }) };
  }
  
  // 2️⃣ Vytvoř hlavní kurz token (VŠICHNI dostanou)
  const courseToken = generateSecureToken();
  
  await supabase.from('course_access').insert({
    user_id: user.id,
    email: customer_email,
    token: courseToken,
    order_id: order_id,
    created_at: new Date().toISOString(),
  });
  
  // 3️⃣ Vytvoř mini kurz token (JEN PRŮKOPNÍCI!)
  let minikurzToken = null;
  
  if (isEarlyBird) {
    minikurzToken = generateSecureToken();
    
    await supabase.from('minikurz_access').insert({
      email: customer_email,
      token: minikurzToken,
      order_id: order_id,
      is_early_bird: true, // Označení že je průkopník
      created_at: new Date().toISOString(),
    });
    
    console.log('🎁 Mini kurz token vytvořen (PRŮKOPNÍK)');
  } else {
    console.log('⏭️ Mini kurz přeskočen (pozdní zákazník)');
  }
  
  // 4️⃣ Pošli email přes Resend
  const emailTemplate = isEarlyBird 
    ? getEarlyBirdEmailTemplate({ course_token: courseToken, minikurz_token: minikurzToken, email: customer_email })
    : getStandardEmailTemplate({ course_token: courseToken, email: customer_email });
  
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Podnikatelská Čtvrtka <kurz@podnikatelskactvrtka.cz>',
      to: customer_email,
      subject: isEarlyBird 
        ? '🎉 Vítejte v Podnikatelské Čtvrtce + BONUS!' 
        : '🎉 Vítejte v Podnikatelské Čtvrtce!',
      html: emailTemplate,
    }),
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      success: true,
      is_early_bird: isEarlyBird,
      has_minikurz: !!minikurzToken
    }),
  };
};

// Helper funkce
function generateSecureToken() {
  return require('crypto').randomBytes(32).toString('hex');
}

function generateRandomPassword() {
  return require('crypto').randomBytes(16).toString('hex');
}

function getEarlyBirdEmailTemplate({ course_token, minikurz_token, email }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Vítejte v kurzu!</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <h1 style="color: #1f2937;">🎉 Gratulujeme, PRŮKOPNÍČE!</h1>
  
  <p style="font-size: 16px; color: #374151;">
    Právě jste se stali členy <strong>Podnikatelské Čtvrtky</strong>! 🚀
  </p>
  
  <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 24px 0;">
    <p style="margin: 0; color: #92400e; font-weight: bold;">
      🎁 Jako průkopník dostáváte EXKLUZIVNÍ BONUS:
    </p>
    <p style="margin: 8px 0 0 0; color: #92400e;">
      Mini kurz "3 kroky k více zákazníkům" ZDARMA (hodnota 997 Kč)
    </p>
  </div>
  
  <hr style="border: 1px solid #e5e7eb; margin: 30px 0;">
  
  <!-- HLAVNÍ KURZ -->
  <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); border-radius: 12px; padding: 24px; margin-bottom: 20px;">
    <h2 style="color: #ffffff; margin-top: 0;">🎓 HLAVNÍ KURZ</h2>
    <p style="color: #dbeafe; font-size: 14px;">
      Podnikatelská Čtvrtka - Business Model Canvas
    </p>
    
    <a href="https://podnikatelskactvrtka.cz/course?token=${course_token}" 
       style="display: inline-block; background: #ffffff; color: #1e40af; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 16px;">
      🚀 ZAČÍT KURZ
    </a>
  </div>
  
  <!-- MINI KURZ BONUS -->
  <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; padding: 24px; margin-bottom: 20px;">
    <h2 style="color: #ffffff; margin-top: 0;">🎁 BONUS: MINI KURZ</h2>
    <p style="color: #d1fae5; font-size: 14px;">
      3 kroky k více zákazníkům (hodnota 997 Kč)
    </p>
    
    <a href="https://podnikatelskactvrtka.cz/minikurz?token=${minikurz_token}" 
       style="display: inline-block; background: #ffffff; color: #059669; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 16px;">
      🎁 OTEVŘÍT MINI KURZ
    </a>
  </div>
  
  <hr style="border: 1px solid #e5e7eb; margin: 30px 0;">
  
  <p style="color: #6b7280; font-size: 14px;">
    💡 <strong>TIP:</strong> Začněte hlavním kurzem a projděte si mini kurz jako doplněk!
  </p>
  
  <p style="color: #6b7280; font-size: 14px;">
    Těším se na vás v kurzu!<br>
    <strong>S pozdravem,<br>[TVOJE JMÉNO]</strong>
  </p>
  
</body>
</html>
  `;
}

function getStandardEmailTemplate({ course_token, email }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Vítejte v kurzu!</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <h1 style="color: #1f2937;">🎉 Gratulujeme!</h1>
  
  <p style="font-size: 16px; color: #374151;">
    Právě jste se stali členy <strong>Podnikatelské Čtvrtky</strong>! 🚀
  </p>
  
  <hr style="border: 1px solid #e5e7eb; margin: 30px 0;">
  
  <!-- HLAVNÍ KURZ -->
  <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); border-radius: 12px; padding: 24px; margin-bottom: 20px;">
    <h2 style="color: #ffffff; margin-top: 0;">🎓 VÁŠ KURZ</h2>
    <p style="color: #dbeafe; font-size: 14px;">
      Podnikatelská Čtvrtka - Business Model Canvas
    </p>
    
    <a href="https://podnikatelskactvrtka.cz/course?token=${course_token}" 
       style="display: inline-block; background: #ffffff; color: #1e40af; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 16px;">
      🚀 ZAČÍT KURZ
    </a>
  </div>
  
  <hr style="border: 1px solid #e5e7eb; margin: 30px 0;">
  
  <!-- CO DÁL -->
  <div style="background: #f9fafb; border-radius: 12px; padding: 20px;">
    <h3 style="color: #1f2937; margin-top: 0;">📋 Co dál?</h3>
    
    <ol style="color: #374151; line-height: 1.8;">
      <li><strong>Začněte kurzem</strong> - 3 moduly, 16 lekcí</li>
      <li><strong>Vytvořte si Business Model Canvas</strong> - strategie na 1 listu</li>
      <li><strong>Aplikujte do praxe</strong> - nástroje jsou připravené!</li>
    </ol>
  </div>
  
  <hr style="border: 1px solid #e5e7eb; margin: 30px 0;">
  
  <p style="color: #6b7280; font-size: 14px;">
    Těším se na vás v kurzu!<br>
    <strong>S pozdravem,<br>[TVOJE JMÉNO]</strong>
  </p>
  
</body>
</html>
  `;
}
```

---

## 📊 **SUPABASE: Přidej is_early_bird column**

```sql
-- Přidej sloupec pro označení průkopníků
ALTER TABLE minikurz_access 
ADD COLUMN is_early_bird BOOLEAN DEFAULT false;

-- Index pro rychlejší dotazy
CREATE INDEX idx_minikurz_early_bird ON minikurz_access(is_early_bird);
```

---

## 🧪 **TESTOVÁNÍ**

### **Test 1: Průkopník (první 7 dní)**

```bash
# Nastav LAUNCH_DATE na včera
const LAUNCH_DATE = new Date('2025-01-26T09:00:00Z');

# Vytvoř testovací objednávku
curl -X POST https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "customer_email": "test@example.com",
    "order_id": "TEST-001",
    "product_id": "podnikatelska-ctvrtka",
    "created_at": "2025-01-27T10:00:00Z"
  }'

# Očekávaný výsledek:
# ✅ is_early_bird: true
# ✅ Email obsahuje: Hlavní kurz + Mini kurz
```

### **Test 2: Pozdní zákazník (po 7 dnech)**

```bash
# Vytvoř testovací objednávku (8. den)
curl -X POST https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "customer_email": "late@example.com",
    "order_id": "TEST-002",
    "product_id": "podnikatelska-ctvrtka",
    "created_at": "2025-02-04T10:00:00Z"
  }'

# Očekávaný výsledek:
# ❌ is_early_bird: false
# ✅ Email obsahuje: Jen hlavní kurz (ŽÁDNÝ mini kurz)
```

---

## 🎯 **ALTERNATIVA: Použij FAPI custom field**

Pokud nechceš počítat datum, můžeš poslat `is_early_bird` přímo z FAPI:

### **FAPI Custom Field:**

1. V FAPI nastav **Custom field** na produktu:
   ```
   is_early_bird = true/false
   ```

2. V checkoutu předej hodnotu:
   ```
   https://app.fapi.cz/checkout/PRODUKT-ID?is_early_bird=true
   ```

3. Ve webhooku přečti hodnotu:
   ```javascript
   const { custom_fields } = JSON.parse(event.body);
   const isEarlyBird = custom_fields.is_early_bird === 'true';
   ```

---

## ✅ **CHECKLIST**

- [ ] Nastav `LAUNCH_DATE` ve FAPI webhooku
- [ ] Nastav `EARLY_BIRD_DAYS` (7 dní)
- [ ] Přidej `is_early_bird` column do `minikurz_access` tabulky
- [ ] Vytvořit 2 email template (průkopník vs. standardní)
- [ ] Otestovat oba scénáře (před/po 7 dnech)
- [ ] Nasadit do produkce

---

**READY! 🚀 Průkopníci dostanou bonus, ostatní ne!**

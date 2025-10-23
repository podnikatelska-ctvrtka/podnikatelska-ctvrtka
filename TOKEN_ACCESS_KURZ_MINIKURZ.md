# 🔐 TOKEN PŘÍSTUP: Kurz + Mini kurz

Jak nastavit token přístup aby uživatelé dostali odkaz na **hlavní kurz** i **mini kurz** přes email.

---

## 🎯 **CO POTŘEBUJEME**

Po nákupu pošleš uživateli **2 tokeny**:

1. **Hlavní kurz token:** Přístup na `/course?token=xxx`
2. **Mini kurz token:** Přístup na `/minikurz?token=yyy`

---

## 📧 **EMAIL PO NÁKUPU (Resend nebo SmartEmailing)**

### **Subject:**
```
🎉 Vítejte v Podnikatelské Čtvrtce!
```

### **Email body:**

```html
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
    <h2 style="color: #ffffff; margin-top: 0;">🎓 HLAVNÍ KURZ</h2>
    <p style="color: #dbeafe; font-size: 14px;">
      Podnikatelská Čtvrtka - Business Model Canvas
    </p>
    
    <a href="https://podnikatelskactvrtka.cz/course?token={{course_token}}" 
       style="display: inline-block; background: #ffffff; color: #1e40af; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 16px;">
      🚀 ZAČÍT KURZ
    </a>
    
    <p style="color: #dbeafe; font-size: 12px; margin-top: 16px;">
      Link: https://podnikatelskactvrtka.cz/course?token={{course_token}}
    </p>
  </div>
  
  <!-- MINI KURZ BONUS -->
  <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; padding: 24px; margin-bottom: 20px;">
    <h2 style="color: #ffffff; margin-top: 0;">🎁 BONUS: MINI KURZ</h2>
    <p style="color: #d1fae5; font-size: 14px;">
      3 kroky k více zákazníkům (hodnota 997 Kč)
    </p>
    
    <a href="https://podnikatelskactvrtka.cz/minikurz?token={{minikurz_token}}" 
       style="display: inline-block; background: #ffffff; color: #059669; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 16px;">
      🎁 OTEVŘÍT MINI KURZ
    </a>
    
    <p style="color: #d1fae5; font-size: 12px; margin-top: 16px;">
      Link: https://podnikatelskactvrtka.cz/minikurz?token={{minikurz_token}}
    </p>
  </div>
  
  <hr style="border: 1px solid #e5e7eb; margin: 30px 0;">
  
  <!-- CO DÁL -->
  <div style="background: #f9fafb; border-radius: 12px; padding: 20px;">
    <h3 style="color: #1f2937; margin-top: 0;">📋 Co dál?</h3>
    
    <ol style="color: #374151; line-height: 1.8;">
      <li><strong>Začněte hlavním kurzem</strong> - 3 moduly, 16 lekcí</li>
      <li><strong>Projděte si mini kurz</strong> - bonusové tipy zdarma</li>
      <li><strong>Vytvořte si Business Model Canvas</strong> - strategie na 1 listu</li>
      <li><strong>Aplikujte do praxe</strong> - nástroje jsou připravené!</li>
    </ol>
  </div>
  
  <hr style="border: 1px solid #e5e7eb; margin: 30px 0;">
  
  <!-- FOOTER -->
  <p style="color: #6b7280; font-size: 14px;">
    💡 <strong>TIP:</strong> Uložte si tento email - obsahuje vaše přístupové linky!
  </p>
  
  <p style="color: #6b7280; font-size: 14px;">
    Těším se na vás v kurzu!<br>
    <strong>S pozdravem,<br>[TVOJE JMÉNO]</strong>
  </p>
  
  <hr style="border: 1px solid #e5e7eb; margin: 30px 0;">
  
  <p style="color: #9ca3af; font-size: 12px; text-align: center;">
    © 2025 Podnikatelská Čtvrtka. Všechna práva vyhrazena.<br>
    <a href="https://podnikatelskactvrtka.cz/terms" style="color: #6b7280;">Obchodní podmínky</a> | 
    <a href="https://podnikatelskactvrtka.cz/gdpr" style="color: #6b7280;">GDPR</a>
  </p>
  
</body>
</html>
```

---

## 🔐 **GENEROVÁNÍ TOKENŮ**

### **VARIANTA A: Supabase (secure) ⭐**

Po nákupu vytvoř tokeny v Supabase:

```javascript
// netlify/functions/fapi-webhook.js

const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  
  const { customer_email, order_id } = JSON.parse(event.body);
  
  // 1. Vytvoř uživatele v Supabase Auth
  const { data: user, error: authError } = await supabase.auth.admin.createUser({
    email: customer_email,
    email_confirm: true,
  });
  
  if (authError) {
    console.error('Auth error:', authError);
    return { statusCode: 500, body: JSON.stringify({ error: authError.message }) };
  }
  
  // 2. Vytvoř course token (hlavní kurz)
  const courseToken = generateSecureToken(); // UUID nebo random string
  
  await supabase.from('course_access').insert({
    user_id: user.id,
    email: customer_email,
    token: courseToken,
    order_id: order_id,
    created_at: new Date().toISOString(),
  });
  
  // 3. Vytvoř minikurz token
  const minikurzToken = generateSecureToken();
  
  await supabase.from('minikurz_access').insert({
    email: customer_email,
    token: minikurzToken,
    order_id: order_id,
    created_at: new Date().toISOString(),
  });
  
  // 4. Pošli email s oběma tokeny (Resend)
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Podnikatelská Čtvrtka <kurz@podnikatelskactvrtka.cz>',
      to: customer_email,
      subject: '🎉 Vítejte v Podnikatelské Čtvrtce!',
      html: emailTemplate({
        course_token: courseToken,
        minikurz_token: minikurzToken,
        email: customer_email,
      }),
    }),
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};

function generateSecureToken() {
  return require('crypto').randomBytes(32).toString('hex');
}
```

---

### **VARIANTA B: Simple localStorage (insecure - NE!)**

❌ **NEDOPORUČUJI** - tokeny by měly být validované na backendu!

---

## 🎯 **VALIDACE TOKENU NA FRONTEND**

### **/course (Hlavní kurz):**

```typescript
// /components/CourseDemoV3.tsx

useEffect(() => {
  const checkAccess = async () => {
    // Zjisti token z URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (!token) {
      // Žádný token = redirect na landing
      window.location.href = '/';
      return;
    }
    
    // Validuj token v Supabase
    const { data, error } = await supabase
      .from('course_access')
      .select('*')
      .eq('token', token)
      .single();
    
    if (error || !data) {
      // Neplatný token
      toast.error('Neplatný přístupový token!');
      window.location.href = '/';
      return;
    }
    
    // OK, token platí!
    localStorage.setItem('course_token', token);
    setHasAccess(true);
    
    // Auto-login přes Supabase Auth
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.email, // Nebo generuj heslo při vytváření usera
    });
    
    if (signInError) {
      console.error('Auto-login error:', signInError);
    }
  };
  
  checkAccess();
}, []);
```

---

### **/minikurz (Mini kurz):**

```typescript
// /components/MiniCourse.tsx

useEffect(() => {
  const checkAccess = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    const hashParams = hash.includes('?') ? hash.split('?')[1] : '';
    const hashUrlParams = new URLSearchParams(hashParams);
    
    const token = urlParams.get('token') || hashUrlParams.get('token');
    
    if (!token) {
      setHasAccess(false);
      return;
    }
    
    // Validuj token v Supabase
    const { data, error } = await supabase
      .from('minikurz_access')
      .select('*')
      .eq('token', token)
      .single();
    
    if (error || !data) {
      setHasAccess(false);
      return;
    }
    
    // OK, token platí!
    localStorage.setItem('pvs_minicourse_token', token);
    setHasAccess(true);
  };
  
  checkAccess();
}, []);

// Pokud nemá přístup
if (!hasAccess) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1>🔒 Přístup zamítnut</h1>
        <p>Tento mini kurz je dostupný pouze pro zákazníky.</p>
        <a href="/">← Zpět na hlavní stránku</a>
      </div>
    </div>
  );
}
```

---

## 📊 **SUPABASE TABULKY**

### **course_access (Hlavní kurz):**

```sql
CREATE TABLE course_access (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  order_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pro rychlé vyhledávání
CREATE INDEX idx_course_access_token ON course_access(token);
CREATE INDEX idx_course_access_email ON course_access(email);
```

### **minikurz_access (Mini kurz):**

```sql
CREATE TABLE minikurz_access (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  order_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pro rychlé vyhledávání
CREATE INDEX idx_minikurz_access_token ON minikurz_access(token);
CREATE INDEX idx_minikurz_access_email ON minikurz_access(email);
```

---

## 🔄 **FLOW DIAGRAM**

```
Uživatel koupí kurz
        ↓
FAPI webhook → Netlify Function
        ↓
Vytvoř tokeny v Supabase:
• course_token (hlavní kurz)
• minikurz_token (mini kurz)
        ↓
Pošli email (Resend) s oběma linky:
• https://...cz/course?token=xxx
• https://...cz/minikurz?token=yyy
        ↓
Uživatel klikne na link
        ↓
Frontend validuje token v Supabase
        ↓
   Token platí?
        ↓
    ┌───┴────┐
  ANO       NE
    ↓         ↓
Zobraz     Redirect
kurz       na /
```

---

## ✅ **CHECKLIST**

- [ ] Vytvořit tabulky `course_access` a `minikurz_access` v Supabase
- [ ] Implementovat FAPI webhook (generování tokenů)
- [ ] Nastavit Resend API (posílání emailů)
- [ ] Přidat token validaci do `/course`
- [ ] Přidat token validaci do `/minikurz`
- [ ] Otestovat celý flow (nákup → email → přístup)
- [ ] Nastavit RLS pravidla v Supabase (zabezpečení)

---

## 🎁 **BONUS: Co když nekoupí kurz?**

Pro retargeting (Email #3 po 7 dnech) vytvoř **volný přístup** k mini kurzu:

```javascript
// Poslat mini kurz těm co NEKOUPILI

const minikurzToken = generateSecureToken();

await supabase.from('minikurz_access').insert({
  email: customer_email,
  token: minikurzToken,
  order_id: null, // Žádná objednávka = FREE přístup
  created_at: new Date().toISOString(),
});

// Pošli email
await sendEmail({
  to: customer_email,
  subject: '🎁 Dárek - Mini kurz ZDARMA',
  html: `
    <p>Tady máš mini kurz zdarma jako dárek!</p>
    <a href="https://podnikatelskactvrtka.cz/minikurz?token=${minikurzToken}">
      Začít mini kurz
    </a>
  `,
});
```

---

**READY TO GRANT ACCESS! 🔐**

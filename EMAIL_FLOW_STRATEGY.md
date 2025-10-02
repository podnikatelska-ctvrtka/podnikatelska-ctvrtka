# 📧 EMAIL FLOW - KOMPLETNÍ STRATEGIE

## **🎯 AKTUÁLNÍ STAV - Co máme:**

### **Frontend Flow (PrelaunchEmailCapture.tsx):**
```tsx
CURRENT IMPLEMENTATION:
1. User vidí CTA sekci ✅
2. User vyplní email ✅
3. User klikne "Chci být průkopník!" ✅
4. Validace: HTML5 email type ✅
5. Loading state: isLoading = true ✅
6. Mock submit: setTimeout 1s ✅
7. Success state: isSubmitted = true ✅
8. Success message: Zobrazí gratulace ✅
9. LocalStorage: availableSpots tracking ✅

CO CHYBÍ:
❌ Backend API integration
❌ Real email validation (regex)
❌ Duplicate check
❌ Error handling (network fail)
❌ Email confirmation workflow
❌ Database persistence
```

---

## **🚀 DOPORUČENÝ KOMPLETNÍ FLOW:**

### **FÁZE 1: FRONTEND (Immediate - Už máme základy)**

#### **Step 1: Email Input & Validation**
```tsx
User vyplní email:
✅ HTML5 type="email" validation
✅ Required field
✅ Placeholder: "vas@email.cz"

VYLEPŠENÍ:
□ Regex validace před submitem
□ Real-time validation (on blur)
□ Visual feedback (red border pro invalid)
□ Disable submit pokud invalid
```

#### **Step 2: Submit Button Click**
```tsx
User klikne CTA button:
✅ Loading state aktivuje se
✅ Button disabled během loading
✅ Spinner/loading text

VYLEPŠENÍ:
□ Optimistic UI update
□ Toast notification "Zpracováváme..."
□ Progress indicator
```

#### **Step 3: API Call (Mock → Real)**
```tsx
SOUČASNOST (Mock):
setTimeout(() => {
  setIsSubmitted(true);
  setIsLoading(false);
}, 1000);

BUDOUCNOST (Real API):
const response = await fetch('/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    email,
    source: 'prelaunch',
    timestamp: new Date().toISOString()
  })
});

if (response.ok) {
  setIsSubmitted(true);
  // Trigger analytics event
  // Trigger confirmation email
} else {
  setError(await response.json());
}
```

#### **Step 4: Success State**
```tsx
✅ Zobrazí success message
✅ Animated confetti/celebration
✅ Potvrzení #čísla průkopníka
✅ Co bude následovat

VYLEPŠENÍ:
□ Personalizace (Hello, {name}!)
□ Social share buttons
□ Referral link generation
□ Calendar reminder button
```

#### **Step 5: Error Handling**
```tsx
CHYBĚJÍCÍ:
❌ Network error handling
❌ Duplicate email handling
❌ Server error handling
❌ Timeout handling
❌ Retry mechanism

IMPLEMENTACE:
try {
  const response = await fetch(...);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  // Success
} catch (error) {
  if (error.message.includes('duplicate')) {
    toast.error('Tento email je už registrovaný!');
  } else if (error.message.includes('network')) {
    toast.error('Problém se sítí. Zkuste to znovu.');
  } else {
    toast.error('Něco se pokazilo. Zkuste to později.');
  }
  setIsLoading(false);
}
```

---

### **FÁZE 2: BACKEND (Requires Setup)**

#### **Option A: Supabase (Doporučené)**
```typescript
// Setup Supabase table: prelaunch_emails
CREATE TABLE prelaunch_emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  source TEXT DEFAULT 'prelaunch',
  ip_address TEXT,
  user_agent TEXT,
  confirmed BOOLEAN DEFAULT false,
  unsubscribed BOOLEAN DEFAULT false
);

// Frontend integration:
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  const { data, error } = await supabase
    .from('prelaunch_emails')
    .insert([
      { 
        email,
        source: 'prelaunch',
        ip_address: await fetch('https://api.ipify.org?format=json')
          .then(r => r.json())
          .then(d => d.ip)
      }
    ])
    .select();
    
  if (error) {
    if (error.code === '23505') { // Unique constraint
      toast.error('Tento email je už registrovaný!');
    } else {
      toast.error('Chyba při registraci. Zkuste to znovu.');
    }
    setIsLoading(false);
    return;
  }
  
  // Success!
  setIsSubmitted(true);
  setIsLoading(false);
  
  // Trigger confirmation email
  await fetch('/api/send-confirmation', {
    method: 'POST',
    body: JSON.stringify({ email })
  });
};
```

#### **Option B: Custom API (Alternative)**
```typescript
// Backend endpoint: /api/register
export async function POST(request: Request) {
  const { email } = await request.json();
  
  // Validate email
  if (!isValidEmail(email)) {
    return new Response('Invalid email', { status: 400 });
  }
  
  // Check duplicate
  const exists = await db.query(
    'SELECT * FROM emails WHERE email = $1',
    [email]
  );
  
  if (exists.rows.length > 0) {
    return new Response('Email already registered', { status: 409 });
  }
  
  // Save to database
  await db.query(
    'INSERT INTO emails (email, created_at) VALUES ($1, NOW())',
    [email]
  );
  
  // Send confirmation email
  await sendConfirmationEmail(email);
  
  // Return success
  return new Response(JSON.stringify({ 
    success: true,
    message: 'Registration successful'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
```

#### **Option C: Mailchimp Direct (Simplest for MVP)**
```typescript
// Frontend directly to Mailchimp
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    const response = await fetch(
      'https://YOURLIST.us1.list-manage.com/subscribe/post-json?u=XXX&id=YYY',
      {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          EMAIL: email,
          b_XXX_YYY: '' // Honeypot
        })
      }
    );
    
    // Note: no-cors means we can't read response
    // But we assume success if no error
    setIsSubmitted(true);
    
  } catch (error) {
    toast.error('Chyba při registraci');
  } finally {
    setIsLoading(false);
  }
};
```

---

### **FÁZE 3: EMAIL AUTOMATION**

#### **Email Sequence Design:**

##### **EMAIL #1: Okamžité potvrzení (0 minut)**
```
Subject: ✅ Vítejte mezi PRŮKOPNÍKY! Váš přístup je rezervován

Ahoj!

Děkujeme, že jste se připojili k revoluci v českém podnikání! 🚀

Právě jste se stali oficiálním PRŮKOPNÍKEM #247.

CO DÁL?
• Za 2-3 týdny spustíme kurz
• Dostanete exkluzivní slevu 41% (místo 8.499 Kč jen 4.999 Kč)
• BONUS: Osobní konzultace ZDARMA (hodnota 3.000 Kč)

DŮLEŽITÉ:
Sledujte inbox - do 48 hodin vám pošleme detaily o kurzu
a instrukce jak uplatnit vaši slevu.

Mezitím se můžete připravit tím, že si stáhnete n��š
ZDARMA checklist: "10 věcí které potřebujete před Čtvrtkou"
→ [LINK]

Těšíme se na vás!

P.S. Máte otázky? Odpovězte na tento email a my se ozveme do 24h.

---
Nechcete dostávat emaily? [Odhlásit se]
```

##### **EMAIL #2: Reminder + Value (2 dny)**
```
Subject: 🎯 Připomínka: Vaše sleva 3.500 Kč čeká

Ahoj!

Jen rychlá připomínka - vaše průkopnická sleva je stále aktivní!

VAŠE BENEFITY:
✅ Kurz za 4.999 Kč místo 8.499 Kč
✅ Osobní konzultace ZDARMA (3.000 Kč)
✅ Přístup k exkluzivní komunitě
✅ Celoživotní aktualizace

PROČ ČTVRTKA FUNGUJE?
Podívejte se na příběh Marie z My Coffee Praha,
která zvýšila tržby o 46% za 6 týdnů:
→ [LINK NA CASE STUDY]

Máme ještě 23 volných míst pro průkopníky.
Po naplnění cena skočí na plnou.

Těšíme se na vás v kurzu!

---
[Odhlásit se]
```

##### **EMAIL #3: Social Proof + Urgency (4 dny)**
```
Subject: ⚡ POZOR: Zbývá 15 míst pro průkopníky

Ahoj!

Rychlá aktualizace - průkopnická nabídka se blíží k naplnění!

AKTUÁLNÍ STAV:
• Registrováno: 35/50 průkopníků
• Zbývá: 15 míst
• Cena po naplnění: 8.499 Kč (o 3.500 Kč víc!)

CO ŘÍKAJÍ JINÍ PRŮKOPNÍCI:
"Přesně tohle mi chybělo! Konečně jasný plán." - Petr S., e-shop
"Za 90 minut jsem měla víc clarity než za rok podnikání." - Jana H., salon
"Worth every penny. Okamžitě aplikovatelné." - Martin N., autoservis

PŘIPRAVTE SE:
• Stáhněte si checklist (pokud jste ještě nestáhli)
• Připravte si 90 minut volna
• Mějte po ruce poznámky
• Čtvrtku papíru A4 :)

Za pár dní spouštíme!

---
[Odhlásit se]
```

##### **EMAIL #4: Last Chance (6 dní)**
```
Subject: 🚨 POSLEDNÍ DEN: Průkopnická sleva končí

Ahoj!

Toto je poslední email před spuštěním.

URGENTNÍ INFORMACE:
• Zbývá: 8 míst
• Deadline: Zítra 23:59
• Po deadline: Cena +3.500 Kč

Pokud chcete garantovat svou slevu,
musíte se zaregistrovat DNES.

Klikněte zde pro rezervaci:
→ [CTA BUTTON]

Těšíme se na vás!

P.S. Pokud si nejste jistí, podívejte se na FAQ:
→ [FAQ LINK]

---
[Odhlásit se]
```

##### **EMAIL #5: LAUNCH! (Launch day)**
```
Subject: 🎉 JE TO TADY! Váš kurz je LIVE

Ahoj!

MOMENT, NA KTERÝ JSME ČEKALI! 🚀

Kurz "Podnikatelská Čtvrtka" je OFICIÁLNĚ LIVE!

VÁŠ EXKLUZIVNÍ PŘÍSTUP:
→ [PŘIHLÁSIT SE - BIG CTA]

VAŠE PRŮKOPNICKÁ CENA: 4.999 Kč
(Normální cena: 8.499 Kč)

CO VÁS ČEKÁ UVNITŘ:
✅ 90min video kurz (7 modulů)
✅ Podnikatelská čtvrtka template (PDF)
✅ Workbook s cvičeními
✅ Bonus: Osobní konzultace
✅ Přístup k průkopnické komunitě

DŮLEŽITÉ:
Tato cena platí jen pro vás jako průkopníka.
Po prvních 50 kurzech skočí na plnou cenu.

Začněte hned:
→ [VELKÉ CTA TLAČÍTKO]

Gratulujeme k skvělému rozhodnutí!

---
[Odhlásit se]
```

---

## **📊 TECHNICKÁ IMPLEMENTACE**

### **Email Service Options:**

#### **Option 1: Mailchimp (Nejjednodušší)**
```
VÝHODY:
✅ No-code automation
✅ Drag & drop editor
✅ Built-in analytics
✅ GDPR compliant
✅ Czech templates

NEVÝHODY:
⚠️ Paid (od 10€/měsíc)
⚠️ Vendor lock-in
⚠️ Limited customization

SETUP:
1. Vytvoř Mailchimp account
2. Vytvoř Audience
3. Setup Automation workflow
4. Connect API nebo use form embed
5. Design emails
6. Test sequence
```

#### **Option 2: SendGrid (Flexibilní)**
```
VÝHODY:
✅ Transactional + Marketing
✅ API first
✅ Free tier (100 emails/day)
✅ Good deliverability
✅ Template system

NEVÝHODY:
⚠️ Requires coding
⚠️ More complex setup
⚠️ Need to build automation

SETUP:
1. SendGrid account
2. Verify domain (SPF/DKIM)
3. Create templates
4. Build automation logic (code)
5. Implement API calls
```

#### **Option 3: Loops.so (Modern)**
```
VÝHODY:
✅ Purpose-built for SaaS
✅ Beautiful templates
✅ Event-driven
✅ Good analytics
✅ Fair pricing

NEVÝHODY:
⚠️ Newer service
⚠️ Less features than Mailchimp

SETUP:
1. Loops account
2. Create campaign
3. Connect API
4. Design emails
5. Setup triggers
```

---

## **🧪 TESTING CHECKLIST**

### **Frontend Testing:**
```
□ Email validation works
  □ Valid email accepted
  □ Invalid email rejected
  □ Empty field blocked
  
□ Submit button works
  □ Disabled when invalid
  □ Shows loading state
  □ Re-enables after submit
  
□ Success state works
  □ Message displays
  □ Confetti/animation plays
  □ Can't submit again
  
□ Error handling works
  □ Network error shown
  □ Duplicate error shown
  □ Generic error shown
  □ Retry possible
```

### **Backend Testing:**
```
□ API endpoint works
  □ Accepts POST requests
  □ Validates email format
  □ Checks duplicates
  □ Saves to database
  
□ Database works
  □ Emails stored correctly
  □ Timestamps accurate
  □ Unique constraint works
  □ Query performance OK
  
□ Email sending works
  □ Confirmation sent
  □ Template renders
  □ Links work
  □ Unsubscribe works
```

### **Email Automation Testing:**
```
□ Sequence triggers correctly
  □ Email #1 immediate
  □ Email #2 after 2 days
  □ Email #3 after 4 days
  □ Email #4 after 6 days
  □ Email #5 on launch day
  
□ Content correct
  □ Personalization works
  □ Links functional
  □ Images display
  □ Mobile responsive
  
□ Unsubscribe works
  □ Link in footer
  □ Removes from list
  □ Confirmation message
```

---

## **📈 ANALYTICS & TRACKING**

### **Events to Track:**
```typescript
// Frontend events
analytics.track('Email_Input_Focused');
analytics.track('Email_Input_Filled');
analytics.track('Submit_Button_Clicked');
analytics.track('Registration_Success');
analytics.track('Registration_Error', { error: errorMessage });

// Email events (via email service)
analytics.track('Email_Sent', { email_id: 1 });
analytics.track('Email_Opened', { email_id: 1 });
analytics.track('Email_Link_Clicked', { email_id: 1, link: 'cta' });
analytics.track('Email_Unsubscribed');

// Conversion funnel
1. Visited CTA section: X users
2. Focused email input: X users (X% of #1)
3. Clicked submit: X users (X% of #2)
4. Successful registration: X users (X% of #3)
5. Opened confirmation email: X users (X% of #4)
6. Clicked CTA in email: X users (X% of #5)
```

### **Key Metrics:**
```
FRONTEND:
• CTA section views
• Email input focus rate
• Submit button click rate
• Success rate
• Error rate
• Average time to submit

EMAIL:
• Delivery rate (should be 99%+)
• Open rate (target: 40-50%)
• Click rate (target: 15-25%)
• Unsubscribe rate (acceptable: <2%)
• Conversion rate (email → purchase)

BUSINESS:
• Cost per lead (CPL)
• Email to customer conversion
• Customer lifetime value (LTV)
• Return on investment (ROI)
```

---

## **🚀 PHASE-BY-PHASE IMPLEMENTATION**

### **PHASE 1: MVP (Do Launch) - 2-3 hod**
```
✅ Current PrelaunchEmailCapture works
✅ LocalStorage tracking
✅ Success message

TODO:
□ Add better email validation (regex)
□ Add error states UI
□ Add duplicate check (localStorage)
□ Test on devices
□ Polish animations

DOPAD: Minimální, ale funkční
```

### **PHASE 2: Backend Integration (Week 1) - 4-6 hod**
```
□ Setup Supabase/Firebase
□ Create database table
□ Implement API endpoint
□ Connect frontend
□ Add proper error handling
□ Test thoroughly

DOPAD: Real data persistence
```

### **PHASE 3: Email Automation (Week 1-2) - 6-8 hod**
```
□ Choose email service (Mailchimp)
□ Design email templates
□ Setup automation workflow
□ Connect trigger (new signup)
□ Test sequence
□ Monitor deliverability

DOPAD: Automated nurture sequence
```

### **PHASE 4: Analytics & Optimization (Week 2+) - Ongoing**
```
□ Implement tracking events
□ Setup dashboards
□ Monitor metrics
□ A/B test emails
□ Optimize based on data
□ Iterate continuously

DOPAD: Data-driven improvements
```

---

## **💰 COST ESTIMATE**

### **MVP (Phase 1):**
```
Frontend only: FREE ✅
(Už máme)
```

### **Phase 2 (Backend):**
```
Option A: Supabase
• Free tier: 500 MB database, 2 GB bandwidth
• Cost: $0/month ✅

Option B: Firebase
• Free tier: 1 GB storage, 50K reads/day
• Cost: $0/month ✅

Option C: Custom API
• Hosting: $5-20/month
• Database: $5-10/month
• Cost: $10-30/month ⚠️
```

### **Phase 3 (Email):**
```
Option A: Mailchimp
• Free: Up to 500 contacts
• Paid: ~$10-20/month for 500-2500 contacts
• Cost: $0-20/month

Option B: SendGrid
• Free: 100 emails/day
• Paid: $20/month for 40K emails
• Cost: $0-20/month

Option C: Loops.so
• Paid: $30/month unlimited
• Cost: $30/month
```

### **Total Estimated Cost:**
```
MVP:              $0/month ✅
With Backend:     $0/month (Supabase free) ✅
With Email:       $10-30/month
Full Stack:       $10-30/month total

DOPORUČENÍ: Start with free tiers!
```

---

## **🎯 DOPORUČENÝ PLÁN**

### **PRO IMMEDIATE LAUNCH:**
```
1. ✅ Use current PrelaunchEmailCapture
2. ✅ LocalStorage tracking
3. ✅ Manual email collection review
4. □ Polish UI/UX
5. □ Add better validation
6. 🚀 LAUNCH!

PROČ: Funguje hned, zero cost
```

### **PO PRVNÍCH 10-20 REGISTRACÍCH:**
```
1. □ Setup Supabase (free)
2. □ Migrate to real database
3. □ Implement API endpoint
4. □ Add proper error handling

PROČ: Real data, scalable
```

### **PO PRVNÍCH 50 REGISTRACÍCH:**
```
1. □ Setup Mailchimp
2. □ Design email sequence
3. □ Automate confirmation
4. □ Monitor performance

PROČ: Professional, automated
```

### **KONTINUÁLNĚ:**
```
1. □ Monitor analytics
2. □ A/B test emails
3. □ Optimize conversion
4. □ Iterate based on data

PROČ: Continuous improvement
```

---

## **✅ FINAL RECOMMENDATIONS**

### **For Launch (Now):**
```
✅ Current implementation je DOSTATEČNÁ pro launch
✅ Přidej jen lepší email validaci
✅ Přidej duplicate check v localStorage
✅ Polish error states
✅ Test thoroughly

→ LAUNCH READY! 🚀
```

### **Week 1 Post-Launch:**
```
□ Setup Supabase
□ Migrate data
□ Implement real API
□ Setup Mailchimp
□ Send first confirmation emails

→ PROFESSIONAL SETUP 💎
```

### **Week 2+ Post-Launch:**
```
□ Full email automation
□ Analytics implementation
□ A/B testing
□ Optimization based on data

→ SCALING MODE 📈
```

---

**Status:** ✅ **KOMPLETNÍ EMAIL FLOW STRATEGIE READY!**

**Next Steps:**
1. Review této strategie
2. Rozhodnout phase (MVP vs Full Stack)
3. Implementovat vybranou fázi
4. Test & Launch! 🚀
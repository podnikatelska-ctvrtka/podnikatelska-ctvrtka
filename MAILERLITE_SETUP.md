# 📧 MailerLite Setup - Kompletní návod

## ✅ PROČ MAILERLITE:

1. 🆓 **ZDARMA pro 500 kontaktů!** (0-1000 subscribers)
2. 📧 **12,000 emailů/měsíc** (24 emailů na kontakt!)
3. 🏆 **95% doručitelnost** (nejlepší v kategorii!)
4. 🚀 **Advanced automation** (sekvence, triggery)
5. 🎨 **Landing pages ZDARMA** (bonus!)
6. 🔧 **API + integrace** (Netlify Function ready!)

---

## 📋 QUICK START (15 minut):

### **1. Registrace (2 min)**

**Jdi na:** https://www.mailerlite.com/

**Klikni:** "Sign up free"

**Vyplň:**
- Email
- Heslo
- Business name: "Podnikatelská Čtvrtka"
- Industry: "Education" nebo "Coaching"

**Ověř email** → HOTOVO! ✅

---

### **2. Vytvoř skupinu "Prelaunch" (1 min)**

**V Dashboard:**
```
Subscribers → Groups → Create a group
  ├─ Name: "Prelaunch"
  ├─ Description: "Early access list pro kurz"
  └─ Save
```

**Zkopíruj Group ID:**
```
Klikni na skupinu "Prelaunch"
→ V URL uvidíš: ...groups/12345/...
→ 12345 = to je tvoje Group ID!
→ Zkopíruj si ho! (budeš potřebovat!)
```

---

### **3. Získej API key (1 min)**

**V Dashboard:**
```
Settings → Integrations → MailerLite API
  ├─ Klikni "Generate new token"
  ├─ Name: "Netlify Function"
  ├─ Scopes: (všechny ✓)
  └─ Create token
```

**⚠️ DŮLEŽITÉ:**
- API key se **ukáže jen jednou!**
- Zkopíruj ho **HNED!**
- Uložsi ho někam bezpečně!

---

### **4. Přidej ENV variables do Netlify (2 min)**

**Otevři:**
```
https://app.netlify.com/sites/podnikatelskactvrtka/configuration/env
```

**Klikni:** "Add a variable" (2x)

**Přidej tyto 2 variables:**

```
Variable 1:
  Key: MAILERLITE_API_KEY
  Value: [tvůj-api-key-z-mailerlite]
  
Variable 2:
  Key: MAILERLITE_GROUP_ID
  Value: [12345] (ID skupiny "Prelaunch")
```

**Ulož!** ✅

**Měl bys mít celkem 9 ENV variables:**
- ADMIN_EMAIL
- FAPI_API_KEY
- FAPI_USERNAME
- RESEND_API_KEY
- SUPABASE_ANON_KEY
- SUPABASE_URL
- **MAILERLITE_API_KEY** ← NOVÉ!
- **MAILERLITE_GROUP_ID** ← NOVÉ!
- (možná ještě ECOMAIL pokud jsi testoval)

---

### **5. Commit + Push (2 min)**

**Soubory ke commit:**
```
✅ netlify/functions/mailerlite-subscribe.js (NOVÝ!)
✅ components/PrelaunchEmailCapture.tsx (UPRAVENÝ!)
✅ MAILERLITE_SETUP.md (NOVÝ!)
```

**V GitHub Desktop:**
```
Commit message:
  "feat: MailerLite integrace - 95% doručitelnost + free tier 1000 kontaktů"

Commit to main → Push origin
```

---

### **6. Počkej na Netlify deploy (2-3 min)**

**Sleduj:**
```
https://app.netlify.com/sites/podnikatelskactvrtka/deploys
```

**Čekej na:** "Published" ✅

---

### **7. TEST! (1 min)**

**Otevři landing page:**
```
https://podnikatelskactvrtka.cz/
```

**Klikni:**
- "Chci zdarma přípravu"
- Zadej svůj email
- Odešli

**Zkontroluj:**

**A) Browser console (F12):**
```
Console → Měl by vidět:
  "📧 Posílám data do MailerLite..."
  "✅ Email sent to MailerLite - SUCCESS!"
```

**B) MailerLite Dashboard:**
```
Subscribers → Groups → Prelaunch
  → Měl by tam být tvůj email! ✅
```

**C) Netlify Function Logs:**
```
https://app.netlify.com/sites/podnikatelskactvrtka/functions/mailerlite-subscribe
  → Real-time logs → Měl by vidět:
  "📧 MailerLite subscription request"
  "✅ Subscriber added to MailerLite"
```

---

## 🎨 BONUS: Vytvoř Welcome email automation (10 min)

### **1. Vytvoř automation**

**V MailerLite Dashboard:**
```
Automation → Create workflow
  ├─ Name: "Prelaunch Welcome Sequence"
  ├─ Trigger: "Subscriber joins a group"
  ├─ Select group: "Prelaunch"
  └─ Continue
```

### **2. Přidej kroky do sekvence**

**Step 1: Welcome email (ihned)**
```
+ Add step → Send email
  ├─ Subject: "🎉 Vítejte! První krok k úspěšnému byznysu"
  ├─ Preview text: "Začínáme s Podnikatelskou Čtvrtkou..."
  ├─ Content: [zkopíruj z EMAIL_SEKVENCE_MASTER.md - Email 0]
  └─ Save
```

**Step 2: Wait 1 day**
```
+ Add step → Delay
  ├─ Wait: 1 day
  └─ Save
```

**Step 3: První insight**
```
+ Add step → Send email
  ├─ Subject: "Den 1: Proč většina podnikatelů selhává (a jak to změnit)"
  ├─ Content: [zkopíruj z EMAIL_SEKVENCE_MASTER.md - Email 1]
  └─ Save
```

**Opakuj pro další emaily:** (Den 2, 3, 4, 5...)

### **3. Aktivuj workflow**

**Klikni:** "Enable workflow" ✅

---

## 📊 DORUČITELNOST - SPF/DKIM setup (důležité!)

### **Pro doručitelnost do hlavní schránky:**

**V MailerLite:**
```
Settings → Domains → Add domain
  ├─ Domain: podnikatelskactvrtka.cz
  ├─ Purpose: Sending emails
  └─ Continue
```

**MailerLite ti dá DNS záznamy:**
```
SPF (TXT záznam):
  Host: @
  Value: v=spf1 include:mailerlit...

DKIM (TXT záznam):
  Host: ml._domainkey
  Value: k=rsa; p=MIGfMA0...

DMARC (TXT záznam):
  Host: _dmarc
  Value: v=DMARC1; p=none...
```

**Přidej do Wedos DNS:**
1. Přihlas se do Wedos
2. DNS záznamy pro podnikatelskactvrtka.cz
3. Přidej všechny 3 záznamy
4. Ulož
5. Počkej 5-30 min na propagaci
6. Refresh MailerLite → Status "Verified" ✅

**= Emaily budou chodit z `noreply@podnikatelskactvrtka.cz`!**

---

## 💰 PRICING - Co je zdarma:

```
FREE (Forever):
├─ 0-1,000 subscribers ✅
├─ 12,000 emails/month ✅
├─ Unlimited email campaigns
├─ Automation workflows ✅
├─ Landing pages ✅
├─ Signup forms
├─ A/B testing ✅
├─ Email templates (100+)
├─ Analytics & reporting
├─ 24/7 email & chat support
└─ MailerLite branding (malé logo v footeru)

Growing Business ($9/měsíc):
├─ 1,001-2,500 subscribers
├─ Remove MailerLite logo
├─ Auto-resend campaigns
├─ Dynamic emails
└─ Všechno z Free

Advanced ($19/měsíc):
├─ 1,001-2,500 subscribers
├─ Multiple users (3+)
├─ Priority support
├─ Promocode generator
└─ Všechno z Growing Business
```

---

## 🎯 CO MÁŠ TEĎKA:

```
Landing page:
  ├─ podnikatelskactvrtka.cz ✅
  ├─ PrelaunchEmailCapture komponenta ✅
  └─ Email capture tlačítko ✅

Netlify Function:
  ├─ /netlify/functions/mailerlite-subscribe.js ✅
  ├─ Bezpečný proxy (API key hidden!) ✅
  └─ 125,000 calls/měsíc limit ✅

MailerLite:
  ├─ Free tier (1000 kontaktů) ✅
  ├─ 95% doručitelnost ✅
  ├─ Automation ready ✅
  └─ Landing pages bonus ✅

Email sekvence:
  ├─ Máš připravené v MD souborech! ✅
  ├─ Stačí zkopírovat do MailerLite ✅
  └─ Welcome + Den 1-5 + Sales ✅
```

---

## 🚀 DALŠÍ KROKY:

### **1. Vytvoř email šablony (20 min)**
- Zkopíruj emaily z `EMAIL_SEKVENCE_MASTER.md`
- Vytvoř v MailerLite automation
- Přidej svoje logo, barvy, CTA

### **2. Ověř doménu (10 min)**
- Přidej DNS záznamy do Wedos
- Počkej na ověření
- = Emaily z tvé domény! ✅

### **3. TEST kompletního flow (5 min)**
- Landing page → Email capture
- MailerLite přidá do seznamu
- Welcome email přijde automaticky!

### **4. LAUNCH! 🎉**
- Aktivuj automation
- Share landing page URL
- Sleduj růst seznamu!

---

## 🆘 TROUBLESHOOTING:

### **"API key invalid"**
✅ Zkontroluj že API key je správně zkopírovaný
✅ Zkontroluj že je v Netlify ENV variables
✅ Redeploy po přidání ENV variables!

### **"Group not found"**
✅ Zkontroluj že Group ID je správné (číslo!)
✅ Zkontroluj že skupina "Prelaunch" existuje v MailerLite
✅ Zkontroluj že Group ID je v ENV variables

### **Email nepřišel**
✅ Zkontroluj spam složku!
✅ Zkontroluj že automation je AKTIVNÍ (enabled)
✅ Zkontroluj MailerLite logs (Reports → Campaign activity)

### **Subscriber nebyl přidán**
✅ Zkontroluj browser console (F12) pro errory
✅ Zkontroluj Netlify Function logs
✅ Zkontroluj že email je validní formát

---

## 🎊 GRATULUJI!

**Máš kompletní email marketing stack:**
- ✅ **95% doručitelnost** (nejlepší v kategorii!)
- ✅ **1000 kontaktů zdarma** (5x víc než Ecomail!)
- ✅ **12,000 emailů/měsíc** (víc než dost!)
- ✅ **Landing pages ZDARMA** (bonus!)
- ✅ **Automation workflows** (advanced!)
- ✅ **125,000 Netlify function calls** (125x víc než Make.com!)

**Total cost: 0 Kč/měsíc!** 🎉

---

**Jsi připravený na prelaunch! 🚀**

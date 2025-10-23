# ✅ GoPay Implementation Checklist

## 📋 **PRE-DEPLOYMENT**

### **1. Netlify Environment Variables**
- [ ] `GOPAY_GOID` - GoID z GoPay emailu
- [ ] `GOPAY_CLIENT_ID` - Client ID z GoPay emailu
- [ ] `GOPAY_CLIENT_SECRET` - Client Secret z GoPay emailu
- [ ] `GOPAY_ENVIRONMENT` - `sandbox` pro testování, `production` pro ostré
- [ ] `GOPAY_RETURN_URL` - `https://podnikatelskactvrtka.cz/dekuji`
- [ ] `GOPAY_NOTIFY_URL` - `https://podnikatelskactvrtka.netlify.app/.netlify/functions/gopay-webhook`
- [ ] `VITE_SUPABASE_URL` - Supabase URL (už máš)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Supabase Service Role Key (pro webhook)
- [ ] `SMARTEMAILING_USERNAME` - Smartemailing username (volitelné)
- [ ] `SMARTEMAILING_API_KEY` - Smartemailing API key (volitelné)

**Jak nastavit:**
1. Netlify → Site settings → Environment variables
2. Přidej všechny proměnné výše
3. **DŮLEŽITÉ:** Po přidání udělej **REDEPLOY** (Deploys → Trigger deploy)

---

### **2. GoPay Admin Setup**
- [ ] Přihlaš se do GoPay admin (sandbox nebo production)
- [ ] Jdi na **Nastavení** → **Notifikace**
- [ ] Nastav **Notification URL:**
  ```
  https://podnikatelskactvrtka.netlify.app/.netlify/functions/gopay-webhook
  ```
- [ ] Vyber události:
  - [x] `PAYMENT_CREATED`
  - [x] `PAYMENT_PAID` ← **NEJDŮLEŽITĚJŠÍ!**
  - [x] `PAYMENT_CANCELED`
  - [x] `PAYMENT_TIMEOUTED`

---

### **3. Supabase Setup**
- [ ] Zkontroluj že máš tabulky `users` a `orders`
- [ ] Zkontroluj RLS policies (public.users má INSERT policy)
- [ ] Test vložení uživatele přes Supabase Studio (ručně)

---

## 🧪 **TESTING (SANDBOX)**

### **A) Test Flow:**
1. [ ] Jdi na `/objednavka`
2. [ ] Vyplň formulář (fake data OK pro sandbox)
3. [ ] Zvol "Platební karta"
4. [ ] Klikni "Zaplatit"
5. [ ] Měl by tě přesměrovat na GoPay sandbox bránu
6. [ ] Použij testovací kartu:
   ```
   Číslo: 4111 1111 1111 1111
   Expires: 12/25 (jakýkoliv budoucí)
   CVV: 123
   ```
7. [ ] Potvrď platbu
8. [ ] Měl by tě vrátit na `/dekuji?token=XXX`
9. [ ] Zkontroluj že vidíš "Platba proběhla úspěšně"
10. [ ] Klikni "Začít kurz" → měl by tě přihlásit automaticky

### **B) Check Supabase:**
- [ ] Otevři Supabase Studio
- [ ] Table Editor → `users` → měl by tam být nový uživatel
- [ ] Table Editor → `orders` → měl by tam být nová objednávka se statusem `paid`
- [ ] Zkontroluj že `access_token` je vyplněný

### **C) Check Netlify Functions Logs:**
- [ ] Netlify → Functions → `gopay-create-payment` → měla by být úspěšná response
- [ ] Netlify → Functions → `gopay-webhook` → měl by být call se statusem `PAID`
- [ ] Zkontroluj logy - neměly by být errory

---

## 🚀 **PRODUCTION DEPLOYMENT**

### **1. Přepni na Production GoPay:**
- [ ] Změň v Netlify environment variables:
  ```
  GOPAY_ENVIRONMENT=production
  GOPAY_GOID=[production GoID]
  GOPAY_CLIENT_ID=[production Client ID]
  GOPAY_CLIENT_SECRET=[production Client Secret]
  ```
- [ ] **REDEPLOY** site!

### **2. Nastav webhook v Production GoPay:**
- [ ] Přihlaš se do production GoPay admin
- [ ] Nastav notification URL (stejný jako pro sandbox)
- [ ] Vyber události (stejné jako pro sandbox)

### **3. Test s reálnou kartou:**
- [ ] Udělej testovací platbu s reálnou kartou (5 Kč)
- [ ] Zkontroluj celý flow funguje
- [ ] Zkontroluj že dostaneš email (až implementuješ)

---

## 📧 **EMAIL SETUP (TODO)**

### **Potřebuješ přidat email odesílání:**

**Option A: Smartemailing transactional email**
- V `gopay-webhook.js` přidej volání Smartemailing API pro odeslání transactional emailu
- Email by měl obsahovat:
  ```
  Ahoj {firstName},
  
  Platba proběhla úspěšně! 🎉
  
  Tvůj přístup ke kurzu:
  https://podnikatelskactvrtka.cz/course-v3?token={accessToken}
  
  Cheers,
  Josef
  ```

**Option B: Netlify Function + SendGrid/Mailgun**
- Vytvoř novou Netlify function pro odeslání emailu
- Volej ji z `gopay-webhook.js` po vytvoření uživatele

---

## 🐛 **TROUBLESHOOTING**

### **"Invalid credentials" error:**
- ✅ Zkontroluj že `GOPAY_ENVIRONMENT` odpovídá credentials (sandbox vs production)
- ✅ Credentials musí být pro správné prostředí

### **"Webhook nepřichází":**
- ✅ Zkontroluj Netlify Functions logs
- ✅ Ověř že URL v GoPay je správná (včetně https://)
- ✅ Test webhook ručně přes curl:
  ```bash
  curl -X POST https://podnikatelskactvrtka.netlify.app/.netlify/functions/gopay-webhook \
    -H "Content-Type: application/json" \
    -d '{"id": 123456789}'
  ```

### **"Platba se vytvoří ale uživatel nemá přístup":**
- ✅ Zkontroluj Supabase RLS policies (public.users INSERT)
- ✅ Zkontroluj že webhook správně vytváří `access_token`
- ✅ Zkontroluj Supabase logs

### **"Payment URL is undefined":**
- ✅ Zkontroluj response z `gopay-create-payment` function
- ✅ Mělo by být `gw_url` v response

---

## 📝 **POZNÁMKY**

### **Path `/objednavka` nevadí!**
✅ GoPay kontroluje pouze DOMÉNU (`podnikatelskactvrtka.cz`), ne path!

### **Testovací karty (sandbox):**
```
Visa: 4111 1111 1111 1111
Mastercard: 5500 0000 0000 0004
CVV: 123
Expires: jakýkoliv budoucí datum
```

### **Return URL flow:**
```
1. Uživatel zaplatí na GoPay → GoPay webhook se spustí
2. Webhook vytvoří uživatele + access_token
3. GoPay redirectne na: /dekuji?token={access_token}
4. ThankYouPage přečte token z URL
5. Uživatel klikne "Začít kurz" → /course-v3?token={token}
6. CourseDemoV3 ověří token a přihlásí uživatele
```

---

## ✅ **FINÁLNÍ CHECK PŘED LAUNCH**

- [ ] Všechny environment variables nastaveny
- [ ] GoPay webhook URL nastaven v admin
- [ ] Testovací platba v sandbox úspěšná
- [ ] Supabase users + orders tabulky fungují
- [ ] Email odesílání funguje (volitelné)
- [ ] Production credentials připravené
- [ ] Terms & GDPR odkazy fungují
- [ ] `/objednavka` stránka vypadá dobře
- [ ] `/dekuji` stránka vypadá dobře
- [ ] Mobile responsive ✅

---

**Autor:** Josef Čipera  
**Verze:** 1.0  
**Datum:** 22. ledna 2025

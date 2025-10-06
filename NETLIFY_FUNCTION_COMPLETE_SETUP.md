# ✅ NETLIFY FUNCTION - KOMPLETNÍ SETUP

## 🎉 CO JE HOTOVÉ:

```
✅ /netlify/functions/fapi-webhook.js vytvořena!
```

**Co dělá:**
1. Přijme FAPI webhook (po platbě)
2. Vygeneruje unique token (crypto.randomUUID())
3. Uloží do Supabase (user + token)
4. Pošle email s přístupem (Resend API)
5. Pošle alert při chybě

---

## 📋 CO MUSÍŠ TEĎKA UDĚLAT:

### **KROK 1: Supabase Setup (10 minut)**
### **KROK 2: Resend Setup (10 minut)**
### **KROK 3: Netlify ENV Variables (5 minut)**
### **KROK 4: FAPI Webhook URL (2 minuty)**
### **KROK 5: Test! (5 minut)**

---

## 🗄️ KROK 1: SUPABASE SETUP

### **A) Vytvoř účet:**

1. **Jdi na:** https://supabase.com
2. **Sign up with GitHub** (nebo email)
3. FREE tier - 0 Kč! ✅

### **B) Vytvoř projekt:**

1. **"New project"**
2. **Nastav:**
   ```
   Organization: Můj projekt (nebo vytvoř novou)
   Project name: podnikatelska-ctvrtka
   Database Password: [vygeneruj silné heslo - ULOŽ SI HO!]
   Region: Europe (Frankfurt)
   ```
3. **Create project** (počkej ~2 minuty)

### **C) Vytvoř tabulku:**

1. **Table Editor** (v levém menu)
2. **"New table"**
3. **Nastav:**
   ```
   Name: users
   ☑ Enable Row Level Security (RLS)
   ```

4. **Columns (smaž default, přidej tyto):**
   
   **Klikni "Add column" pro každý:**
   
   ```
   Column 1:
   Name: id
   Type: uuid
   ☑ Is Primary Key
   ☑ Is Unique
   Default value: uuid_generate_v4()
   
   Column 2:
   Name: email
   Type: text
   ☑ Is Unique
   
   Column 3:
   Name: name
   Type: text
   
   Column 4:
   Name: order_id
   Type: text
   
   Column 5:
   Name: access_token
   Type: text
   ☑ Is Unique
   
   Column 6:
   Name: purchased_at
   Type: timestamp with time zone
   Default value: now()
   
   Column 7:
   Name: amount
   Type: numeric
   
   Column 8:
   Name: created_at
   Type: timestamp with time zone
   Default value: now()
   
   Column 9:
   Name: last_login
   Type: timestamp with time zone
   (Nullable - nech prázdné)
   
   Column 10:
   Name: completed_modules
   Type: int4
   Default value: 0
   ```

5. **Save** (dole vpravo)

### **D) Zakáž RLS (pro testing):**

1. **V Table Editor** → Table `users`
2. **Klikni na "..." (tři tečky)**
3. **"Edit Table"**
4. **☐ Disable Row Level Security** (pro testing!)
5. **Save**

⚠️ **DŮLEŽITÉ:** Po launch zapni RLS a přidej policies!

### **E) Zkopíruj credentials:**

1. **Settings** (v levém menu, dole)
2. **API**
3. **Zkopíruj:**
   ```
   Project URL: https://xxxxx.supabase.co
   
   anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. **ULOŽ SI TO!** (potřebuješ v Netlify!)

---

## 📧 KROK 2: RESEND SETUP

### **A) Vytvoř účet:**

1. **Jdi na:** https://resend.com
2. **Sign up** (GitHub nebo email)
3. FREE tier - 0 Kč! (3000 emailů/měsíc) ✅

### **B) Vytvoř API key:**

1. **API Keys** (v levém menu)
2. **"Create API Key"**
3. **Nastav:**
   ```
   Name: Podnikatelská Čtvrtka Production
   Permission: Full access
   ```
4. **Create**
5. **ZKOPÍRUJ KEY:** `re_xxxxxxxxxxxxx`
6. **ULOŽ SI HO!** (ukáže se jen jednou!)

### **C) Verify doménu:**

1. **Domains** (v levém menu)
2. **"Add Domain"**
3. **Zadej:** `podnikatelskactvrtka.cz`
4. **Add Domain**

5. **Resend ti ukáže 3 DNS záznamy:**

```
┌──────────────────────────────────────────────┐
│ TXT record (SPF)                             │
├──────────────────────────────────────────────┤
│ Host: @                                      │
│ Value: v=spf1 include:resend.com ~all        │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ TXT record (DKIM)                            │
├──────────────────────────────────────────────┤
│ Host: resend._domainkey                      │
│ Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA... (dlouhý)│
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ TXT record (DMARC)                           │
├──────────────────────────────────────────────┤
│ Host: _dmarc                                 │
│ Value: v=DMARC1; p=none;                     │
└──────────────────────────────────────────────┘
```

6. **Jdi do Wedos:**
   - Přihlaš se na wedos.cz
   - Domény → podnikatelskactvrtka.cz → DNS záznamy
   - **Přidej všechny 3 TXT záznamy** (jeden po druhém)
   - Ulož

7. **Počkej 30-60 minut** (DNS propagace)

8. **Zpátky v Resend:**
   - Refresh stránku
   - Mělo by být: **✅ Verified**

⚠️ **PRO TESTING:** Můžeš zatím poslat z `onboarding@resend.dev` (funguje hned!)

---

## ⚙️ KROK 3: NETLIFY ENV VARIABLES

### **A) Jdi do Netlify:**

1. **Přihlaš se na:** app.netlify.com
2. **Vyber site:** podnikatelska-ctvrtka (nebo jak se jmenuje)
3. **Site settings**
4. **Build & deploy** (v levém menu)
5. **Environment variables**

### **B) Přidej 4 variables:**

**Variable 1:**
```
Key: SUPABASE_URL
Value: https://xxxxx.supabase.co
```

**Variable 2:**
```
Key: SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Variable 3:**
```
Key: RESEND_API_KEY
Value: re_xxxxxxxxxxxxx
```

**Variable 4 (optional):**
```
Key: ADMIN_EMAIL
Value: tvuj@email.cz
```

### **C) Ulož a Redeploy:**

1. **Save variables**
2. **Deploys** (v horním menu)
3. **Trigger deploy** → **Deploy site**
4. Počkej ~2 minuty

---

## 🔗 KROK 4: FAPI WEBHOOK URL

### **A) Zjisti Netlify URL:**

**Tvoje webhook URL je:**
```
https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
```

### **B) Nastav ve FAPI:**

1. **Přihlaš se do FAPI**
2. **Jdi na svůj produkt**
3. **Nastavení → Webhooks** (nebo Integration)
4. **Přidat webhook:**
   ```
   Událost: Objednávka zaplacena
   URL: https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
   ```
5. **Ulož!**

---

## 🧪 KROK 5: TEST!

### **A) Test platba (1 Kč):**

1. **V FAPI** vytvoř test objednávku (pokud ještě nemáš)
2. **Zaplatíš 1 Kč** přes GoPay sandbox:
   ```
   Karta: 4111 1111 1111 1111
   Expir: 12/25
   CVV: 123
   3D Secure: 1234
   ```

### **B) Co se stane:**

```
1. GoPay zpracuje platbu ✅
   ↓
2. FAPI pošle webhook na:
   podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
   ↓
3. Netlify Function:
   - Vygeneruje token ✅
   - Uloží do Supabase ✅
   - Pošle email ✅
   ↓
4. Email ti dorazí na email který jsi zadal!
```

### **C) Zkontroluj:**

**1. Supabase:**
- Jdi do Table Editor → `users`
- Měl by tam být nový řádek s:
  - email
  - access_token
  - order_id

**2. Email:**
- Zkontroluj inbox (i spam!)
- Měl přijít email: "✅ Váš přístup do kurzu je ready!"

**3. Link v emailu:**
- Klikni na tlačítko "VSTOUPIT DO KURZU"
- Mělo by tě to přesměrovat na: `podnikatelskactvrtka.cz/course?token=xxx`
- CourseDemo by měl ověřit token
- **PŘIHLÁŠEN! ✅**

### **D) Debug (pokud nefunguje):**

**Netlify Function Logs:**
1. Netlify → Functions → fapi-webhook
2. Logs (real-time)
3. Uvidíš errory (pokud jsou)

**Supabase Logs:**
1. Supabase → Logs
2. Postgres Logs
3. Uvidíš insert queries

---

## ✅ CHECKLIST

**Setup:**
- [ ] Supabase účet vytvořen
- [ ] Supabase projekt vytvořen
- [ ] Tabulka `users` vytvořena (10 sloupců)
- [ ] Supabase credentials zkopírovány
- [ ] Resend účet vytvořen
- [ ] Resend API key zkopírován
- [ ] Resend domain DNS záznamy přidány (Wedos)
- [ ] Netlify ENV variables nastaveny (4×)
- [ ] Netlify redeploy triggered
- [ ] FAPI webhook URL nastavena

**Test:**
- [ ] Test platba 1 Kč provedena
- [ ] Supabase obsahuje nový záznam
- [ ] Email dorazil
- [ ] Link v emailu funguje
- [ ] CourseDemo přihlásil usera ✅

---

## 💰 NÁKLADY

```
Supabase:  0 Kč (FREE tier) ✅
Resend:    0 Kč (FREE tier) ✅
Netlify:   0 Kč (už máš!) ✅
FAPI:      200 Kč/měsíc (10 objednávek)
GoPay:     0 Kč (máš zdarma!) ✅
────────────────────────────
CELKEM:    200 Kč/měsíc! 🎉
```

---

## 🚨 TROUBLESHOOTING

### **"Netlify Function nenajde dependencies"**

**Řešení:** Přidej `package.json` dependency:

1. **Otevři:** `/package.json`
2. **Přidej do `dependencies`:**
   ```json
   "@supabase/supabase-js": "^2.39.0"
   ```
3. **Commit & push**
4. Netlify automaticky nainstaluje!

### **"Supabase insert failed - permission denied"**

**Řešení:** Zakázal jsi RLS?
1. Supabase → Table Editor → users
2. Edit Table → ☐ Disable RLS
3. Save

### **"Email se neodeslal"**

**Možné příčiny:**
1. **Resend domain není verified:**
   - Počkej 60 minut na DNS propagaci
   - Zkontroluj DNS záznamy v Wedos

2. **Resend API key špatný:**
   - Zkontroluj v Netlify ENV variables
   - Měl by začínat `re_`

3. **Pro testing:**
   - Změň "from" v kódu na: `onboarding@resend.dev`
   - Pak funguje hned (bez domain verify)!

### **"Webhook se nespustil"**

**Zkontroluj:**
1. **FAPI webhook URL je správná?**
   ```
   https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
   ```

2. **Netlify deploy úspěšný?**
   - Netlify → Deploys
   - Poslední deploy: Published ✅

3. **Function existuje?**
   - Netlify → Functions
   - Měl by tam být: `fapi-webhook`

---

## 📊 CO DÁL?

**Po úspěšném testu:**

1. ✅ Změň cenu z 1 Kč na 4.999 Kč (v FAPI)
2. ✅ Přepni GoPay z test na production mode
3. ✅ Nahraj Vimeo videa do CourseDemo
4. ✅ Připrav worksheety
5. ✅ Email sekvence (FAPI automatizace)
6. ✅ **LAUNCH! 🚀**

---

## 💡 PRO TIPS

### **Email Template customizace:**

V `/netlify/functions/fapi-webhook.js` najdi:
```javascript
const emailHtml = `...`;
```

Můžeš upravit:
- Barvy
- Text
- Přidat obrázky
- Změnit layout

### **Admin alerts:**

Když webhook selže, dostaneš email alert na `ADMIN_EMAIL`!

### **Tracking:**

V Supabase můžeš sledovat:
- Kolik lidí se registrovalo
- Kdy
- Za kolik
- Kdo se přihlásil (last_login)
- Kolik modulů dokončili (completed_modules)

---

## ✅ HOTOVO!

**Máš kompletní systém:**

```
FAPI objednávka
  ↓
GoPay platba
  ↓
Netlify Function
  ↓
Supabase (user + token)
  ↓
Resend (email s přístupem)
  ↓
CourseDemo (token auth)
  ↓
USER PŘIHLÁŠEN! ✅
```

**Náklady:** 200 Kč/měsíc (jen FAPI!)  
**Límity:** ŽÁDNÉ! ♾️  
**Škálovatelné:** Zvládne tisíce prodejů! 🚀

---

**TEĎ POSTUPUJ PODLE KROKŮ 1-5 A PAK MI DAJ VĚDĚT JAK TO DOPADLO! 💪**
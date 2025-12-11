# ⚡ QUICK SETUP CHECKLIST - 15 MINUT

Rychlý checklist pro nastavení všeho potřebného.

---

## 1️⃣ SUPABASE DATABASE (5 minut)

### **KROK #1: Vytvoř tabulku `quiz_results`**

1. **Jdi do Supabase Dashboard:**
   - Dashboard URL: https://supabase.com/dashboard
   - Vyber projekt: `podnikatelska-ctvrtka`

2. **SQL Editor:**
   - Levé menu → **SQL Editor**
   - Click **+ New query**

3. **Zkopíruj a spusť tento SQL:**

```sql
-- Quiz Results Table
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  quiz_type TEXT NOT NULL,
  answers JSONB NOT NULL,
  score INTEGER NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT NOT NULL,
  risks TEXT[] NOT NULL,
  recommendations TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_quiz_type CHECK (quiz_type IN ('beginner', 'existing')),
  CONSTRAINT valid_category CHECK (category IN ('critical', 'unstable', 'solid', 'advanced', 'beginner')),
  CONSTRAINT valid_score CHECK (score >= 0 AND score <= 100)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_quiz_results_email ON public.quiz_results(email);
CREATE INDEX IF NOT EXISTS idx_quiz_results_category ON public.quiz_results(category);
CREATE INDEX IF NOT EXISTS idx_quiz_results_created_at ON public.quiz_results(created_at DESC);

-- RLS
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert
CREATE POLICY "Allow public insert" ON public.quiz_results
  FOR INSERT
  TO public
  WITH CHECK (true);
```

4. **Klikni "Run"**

5. **Zkontroluj:**
   - Levé menu → **Table Editor**
   - Měl bys vidět tabulku `quiz_results`

✅ **HOTOVO!**

---

## 2️⃣ NETLIFY ENVIRONMENT VARIABLES (3 minuty)

### **KROK #1: Otevři Netlify Dashboard**

1. Jdi na: https://app.netlify.com
2. Vyber site: `podnikatelska-ctvrtka`
3. **Site configuration** → **Environment variables**

---

### **KROK #2: Přidej tyto proměnné**

**SUPABASE:**
```
SUPABASE_URL = https://jdcpzswpecntlqiyzxac.supabase.co
SUPABASE_SERVICE_ROLE_KEY = [tvůj service role key]
```

**JAK NAJÍT:**
- Supabase Dashboard → Settings → API
- Project URL = SUPABASE_URL
- service_role key = SUPABASE_SERVICE_ROLE_KEY (⚠️ SECRET!)

---

**SMARTEMAILING:**
```
SMARTEMAILING_USERNAME = [tvůj username]
SMARTEMAILING_API_KEY = [tvůj API key]
SMARTEMAILING_LIST_KVIZ = [ID listu]
```

**JAK NAJÍT:**
- SmartEmailing → Nastavení → API
- Username + API key
- List ID = vytvoříš v kroku #3

---

**RESEND:**
```
RESEND_API_KEY = [tvůj API key]
```

**JAK NAJÍT:**
- resend.com → API Keys
- Vytvoř nový key pokud nemáš

---

**META PIXEL (OPTIONAL - pro TidyCal webhook):**
```
META_PIXEL_ID = [tvůj pixel ID]
META_CONVERSIONS_API_TOKEN = [tvůj access token]
```

**JAK NAJÍT:**
- Meta Events Manager → Data Sources → Pixels
- Pixel ID
- Conversions API Token: Settings → Conversions API → Generate Token

---

### **KROK #3: Ulož a redeploy**

1. **Ulož všechny env variables**
2. **Deploys** → **Trigger deploy** → **Clear cache and deploy site**
3. Počkej 2-3 minuty než build doběhne

✅ **HOTOVO!**

---

## 3️⃣ SMARTEMAILING SETUP (4 minuty)

### **KROK #1: Vytvoř kontaktní list**

1. **Login do SmartEmailing:**
   - https://app.smartemailing.cz

2. **Kontakty → Kontaktní listy:**
   - Klikni **+ Přidat list**

3. **Název listu:**
   ```
   Kvíz - Jak zdravý je tvůj model podnikání?
   ```

4. **Ulož**

5. **Zkopíruj ID listu:**
   - Po uložení uvidíš ID (např. `12345`)
   - Zkopíruj ho

---

### **KROK #2: Přidej ID do Netlify**

1. **Zpátky do Netlify:**
   - Site configuration → Environment variables

2. **Přidej proměnnou:**
   ```
   SMARTEMAILING_LIST_KVIZ = 12345
   ```
   (nahraď 12345 svým ID)

3. **Redeploy:**
   - Deploys → Trigger deploy

---

### **KROK #3: Vytvoř custom fields**

1. **SmartEmailing:**
   - Nastavení → Vlastní pole kontaktů

2. **Přidej tato pole:**

```
Název: source
Typ: Text
Popis: Zdroj kontaktu (např. quiz, landing)

Název: quiz_type
Typ: Text
Popis: Typ kvízu (beginner/existing)

Název: quiz_category
Typ: Text
Popis: Kategorie výsledku (critical/unstable/solid/advanced)

Název: quiz_score
Typ: Text
Popis: Skóre kvízu (0-100)
```

✅ **HOTOVO!**

---

## 4️⃣ RESEND EMAIL SETUP (2 minuty)

### **KROK #1: Verify domain**

1. **Login do Resend:**
   - https://resend.com

2. **Domains:**
   - Pokud ještě nemáš domain verified:
   - **Add Domain** → `podnikatelskactvrtka.cz`
   - Zkopíruj DNS records
   - Přidej je do svého DNS providera
   - Počkej 10-30 minut na ověření

---

### **KROK #2: Verify sender email**

1. **From email:**
   ```
   ahoj@podnikatelskactvrtka.cz
   ```

2. **Pokud domain není verified:**
   - Můžeš použít: `name@resend.dev` (temporary)
   - Ale doporučuji verifyovat vlastní domain

✅ **HOTOVO!**

---

## 5️⃣ TIDYCAL META PIXEL (1 minuta)

### **OPTION A: Custom Code (doporučené)**

1. **Login do TidyCal:**
   - https://tidycal.com

2. **Settings → Integrations:**
   - Najdi "Custom Code" nebo "Tracking Scripts"

3. **Přidej tento kód:**

```html
<script>
  // Track booking confirmation
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Lead', {
      content_name: 'Free Consultation Booking',
      value: 0,
      currency: 'CZK'
    });
    console.log('✅ TidyCal booking tracked');
  }
</script>
```

4. **Ulož**

---

### **OPTION B: Webhook (pokud custom code není k dispozici)**

1. **TidyCal → Settings → Webhooks:**
   - **Add webhook**

2. **URL:**
   ```
   https://podnikatelskactvrtka.cz/.netlify/functions/tidycal-webhook
   ```

3. **Event:**
   - `booking.created`

4. **Ulož**

5. **Pak přidej env variables do Netlify:**
   ```
   META_PIXEL_ID = [tvůj pixel ID]
   META_CONVERSIONS_API_TOKEN = [tvůj token]
   ```

✅ **HOTOVO!**

---

## ✅ FINÁLNÍ CHECKLIST

Po dokončení všech kroků, projdi tento checklist:

**SUPABASE:**
- [ ] Tabulka `quiz_results` vytvořena
- [ ] Má správné sloupce (11 sloupců)
- [ ] RLS policy je aktivní

**NETLIFY:**
- [ ] SUPABASE_URL nastaveno
- [ ] SUPABASE_SERVICE_ROLE_KEY nastaveno
- [ ] SMARTEMAILING_USERNAME nastaveno
- [ ] SMARTEMAILING_API_KEY nastaveno
- [ ] SMARTEMAILING_LIST_KVIZ nastaveno
- [ ] RESEND_API_KEY nastaveno
- [ ] Site redeploy hotový (všechny env vars načtené)

**SMARTEMAILING:**
- [ ] Kontaktní list "Kvíz..." vytvořený
- [ ] ID listu zkopírované do Netlify
- [ ] Custom fields vytvořená (source, quiz_type, quiz_category, quiz_score)

**RESEND:**
- [ ] Domain verified (nebo používáš resend.dev)
- [ ] Sender email ready (ahoj@podnikatelskactvrtka.cz)

**TIDYCAL:**
- [ ] Meta Pixel custom code přidán NEBO webhook nastaven
- [ ] Test booking proveden (vidíš Lead event v Meta?)

---

## 🧪 TEST FLOW (5 minut)

**QUICK TEST:**

1. **Otevři:**
   ```
   https://podnikatelskactvrtka.cz/kviz
   ```

2. **Vyplň kvíz:**
   - Klikni "Chci svůj akční plán zdarma"
   - Začít kvíz → Vyber "Už podnikám"
   - Vyplň 10 otázek
   - Email: `test+solid@gmail.com`
   - Jméno: `Test User`
   - Submit

3. **Zkontroluj:**
   - [ ] Completion modal se zobrazil
   - [ ] Browser console: `✅ Quiz submitted`
   - [ ] Supabase: Záznam v `quiz_results` tabulce
   - [ ] SmartEmailing: Kontakt přidán do listu
   - [ ] Gmail: Email dorazil s action plan linkem
   - [ ] Meta Events Manager: `CompleteRegistration` event

**POKUD ANO NA VŠECHNY** → ✅ **VŠE FUNGUJE!**

---

## 🚨 COMMON ISSUES

### **"Failed to save quiz results"**
→ Zkontroluj SUPABASE_SERVICE_ROLE_KEY v Netlify
→ Zkontroluj že tabulka `quiz_results` existuje

### **"Smartemailing error"**
→ Zkontroluj SMARTEMAILING credentials
→ Zkontroluj že list ID je správné

### **Email nedorazil**
→ Zkontroluj RESEND_API_KEY
→ Zkontroluj spam folder
→ Zkontroluj Resend Dashboard → Logs

### **Meta Pixel netrackuje**
→ Zkontroluj že Meta Pixel je inicializovaný (browser console)
→ Zkontroluj Meta Events Manager → Test Events

---

## 🎉 READY!

Pokud máš všechny checkboxy zaškrtnuté → **JDE SE TESTOVAT!**

**NEXT:**
1. `/TODO_DNES_KVIZ_CONVERSION.md` - Kompletní test + spuštění conversion kampaně
2. `/QUIZ_TESTING_GUIDE.md` - Detailní testovací průvodce

---

**GOOD LUCK!** 🚀


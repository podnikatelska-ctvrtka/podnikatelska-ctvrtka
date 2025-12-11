# 🧪 KVÍZ - KOMPLETNÍ TESTOVACÍ PRŮVODCE

## ✅ PŘEDBĚŽNÁ KONTROLA (před testováním)

### 1️⃣ **SUPABASE DATABÁZE**

**KROK #1: Zkontroluj že tabulka `quiz_results` existuje**

```sql
-- Jdi do Supabase Dashboard → SQL Editor
-- Spusť tento dotaz:

SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'quiz_results';
```

**POKUD NEEXISTUJE → Vytvoř ji:**

```sql
-- Zkopíruj obsah souboru /QUIZ_DATABASE_SCHEMA.sql
-- A spusť ho v SQL Editor
```

**KROK #2: Zkontroluj že tabulka má správné sloupce**

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'quiz_results'
ORDER BY ordinal_position;
```

**Očekáváné sloupce:**
- `id` (uuid)
- `email` (text)
- `name` (text)
- `quiz_type` (text)
- `answers` (jsonb)
- `score` (integer)
- `category` (text)
- `category_label` (text)
- `risks` (text[])
- `recommendations` (text[])
- `created_at` (timestamptz)

---

### 2️⃣ **NETLIFY FUNCTIONS - Environment Variables**

**KROK #1: Zkontroluj environment variables v Netlify**

Jdi do **Netlify Dashboard** → Tvůj site → **Site configuration** → **Environment variables**

**Potřebné proměnné:**

```
✅ SUPABASE_URL = https://jdcpzswpecntlqiyzxac.supabase.co
✅ SUPABASE_SERVICE_ROLE_KEY = [tvůj service role key]
✅ SMARTEMAILING_USERNAME = [tvůj username]
✅ SMARTEMAILING_API_KEY = [tvůj API key]
✅ SMARTEMAILING_LIST_KVIZ = [list ID pro kvíz]
✅ RESEND_API_KEY = [tvůj Resend API key]
```

**JAK ZJISTIT:**
- SUPABASE_URL: Supabase Dashboard → Settings → API → Project URL
- SUPABASE_SERVICE_ROLE_KEY: Supabase Dashboard → Settings → API → service_role key
- SMARTEMAILING: SmartEmailing → Settings → API
- RESEND_API_KEY: resend.com → API Keys

---

### 3️⃣ **SMARTEMAILING - Kontaktní list**

**KROK #1: Vytvoř kontaktní list pro kvíz**

1. Jdi do **SmartEmailing** → **Kontakty** → **Kontaktní listy**
2. Klikni **Přidat list**
3. Název: `Kvíz - Jak zdravý je tvůj model podnikání?`
4. Ulož → **Zkopíruj ID listu** (např. `12345`)

**KROK #2: Přidej ID do Netlify environment variables**

```
SMARTEMAILING_LIST_KVIZ = 12345
```

**KROK #3: Vytvoř custom pole (pokud ještě neexistují)**

SmartEmailing → **Nastavení** → **Vlastní pole kontaktů**

Přidej tyto pole:
- `source` (text)
- `quiz_type` (text)
- `quiz_category` (text)
- `quiz_score` (text)

---

## 🧪 TESTOVÁNÍ - KROK ZA KROKEM

### **TEST #1: Otevření kvízu**

**URL:** `https://podnikatelskactvrtka.cz/kviz` nebo `#kviz`

**OČEKÁVANÉ CHOVÁNÍ:**
- ✅ Zobrazí se QuizLandingPage s emotivním hero textem
- ✅ Vidíš CTA button "Chci svůj akční plán zdarma"
- ✅ Vidíš benefity (skóre, akční plán)
- ✅ Gradient pozadí (orange/pink/yellow)

**POKUD NEFUNGUJE:**
- Zkontroluj browser console (F12) pro chyby
- Zkontroluj že import QuizLandingPage je v App.tsx
- Zkontroluj routing v App.tsx (řádek cca 256)

---

### **TEST #2: Spuštění kvízu**

**AKCE:** Klikni na "Chci svůj akční plán zdarma"

**OČEKÁVANÉ CHOVÁNÍ:**
- ✅ Zobrazí se fullscreen modal s kvízem
- ✅ Vidíš INTRO step s textem "Jak zdravý je tvůj model podnikání?"
- ✅ Vidíš 3 zelené checkmarky (zdarma, okamžité výsledky, PDF)
- ✅ Vidíš button "Začít kvíz zdarma"

**POKUD NEFUNGUJE:**
- Zkontroluj že BusinessHealthQuiz.tsx se renderuje
- Zkontroluj state `showQuiz` v QuizLandingPage

---

### **TEST #3: Výběr typu podnikatele**

**AKCE:** Klikni "Začít kvíz zdarma"

**OČEKÁVANÉ CHOVÁNÍ:**
- ✅ Zobrazí se TYPE SELECTION screen
- ✅ Vidíš 2 karty: "Teprve začínám" + "Už podnikám"
- ✅ Můžeš kliknout na kteroukoli kartu

**AKCE:** Klikni na "Už podnikám"

**OČEKÁVANÉ CHOVÁNÍ:**
- ✅ Přejdeš na QUIZ screen
- ✅ Vidíš progress bar (Otázka 1 z 10)
- ✅ Vidíš první otázku: "Odkud získáváš většinu zákazníků?"
- ✅ Vidíš 3 možnosti odpovědí

---

### **TEST #4: Odpovídání na otázky**

**AKCE:** Vyplň všech 10 otázek (pro "Už podnikám")

**OČEKÁVANÉ CHOVÁNÍ:**
- ✅ Po kliknutí na odpověď se automaticky posune na další otázku
- ✅ Progress bar se postupně plní
- ✅ Můžeš se vrátit tlačítkem "Zpět"
- ✅ Po 10. otázce se zobrazí EMAIL FORM step

---

### **TEST #5: Email a jméno**

**AKCE:** 
1. Zadej test email: `test@example.com`
2. Zadej jméno: `Test User` (nepovinné)
3. Klikni "Zobrazit moje výsledky"

**OČEKÁVANÉ CHOVÁNÍ:**
- ✅ Zobrazí se loading state (button disabled)
- ✅ Po 1-2 sekundách se zavře kvíz modal
- ✅ Zobrazí se COMPLETION modal s textem "Výsledky jsou na cestě!"
- ✅ Vidíš 2 zelené checkmarky (skóre + akční plán)

**POKUD NEFUNGUJE:**
- Zkontroluj browser console pro chyby
- Zkontroluj Network tab → `quiz-submit` request
- Zkontroluj Response → mělo by být `200 OK`

---

### **TEST #6: Netlify Function**

**AKCE:** Zkontroluj že Netlify function funguje

**JAK:**
1. Jdi do **Netlify Dashboard** → **Functions** → **quiz-submit**
2. Klikni na poslední invocation (měl by být tvůj test)
3. Zkontroluj logs

**OČEKÁVANÉ LOGY:**
```
📝 Quiz submission: { email: 'test@example.com', quizType: 'existing', category: 'solid', score: 65 }
✅ Quiz results saved to Supabase: [uuid]
📤 Adding to Smartemailing list (category: solid, listId: 12345)
✅ Added to Smartemailing: ok
📨 Sending email via Resend...
✅ Email sent via Resend: [email_id]
```

**POKUD CHYBA:**
- Zkontroluj environment variables
- Zkontroluj že Supabase tabulka existuje
- Zkontroluj SmartEmailing credentials

---

### **TEST #7: Supabase - Uložený záznam**

**AKCE:** Zkontroluj že data jsou uložená v Supabase

**JAK:**
1. Jdi do **Supabase Dashboard** → **Table Editor** → `quiz_results`
2. Najdi svůj test email

**OČEKÁVANÉ DATA:**
- ✅ `email` = test@example.com
- ✅ `quiz_type` = existing
- ✅ `score` = [nějaké číslo 0-100]
- ✅ `category` = critical/unstable/solid/advanced
- ✅ `answers` = JSON objekt s odpověďmi
- ✅ `risks` = array rizik
- ✅ `recommendations` = array doporučení
- ✅ `created_at` = timestamp

---

### **TEST #8: SmartEmailing - Přidaný kontakt**

**AKCE:** Zkontroluj že email byl přidán do SmartEmailing listu

**JAK:**
1. Jdi do **SmartEmailing** → **Kontakty** → **Kontaktní listy**
2. Otevři list "Kvíz - Jak zdravý je tvůj model podnikání?"
3. Najdi svůj test email

**OČEKÁVANÉ DATA:**
- ✅ Email je v listu
- ✅ Status = "Potvrzený" (confirmed)
- ✅ Custom fields:
  - `source` = quiz
  - `quiz_type` = existing (nebo beginner)
  - `quiz_category` = solid (nebo critical/unstable/advanced)
  - `quiz_score` = 65 (nebo jiné číslo)

---

### **TEST #9: Resend - Odeslaný email**

**AKCE:** Zkontroluj že email byl odeslán přes Resend

**JAK:**
1. Jdi do **resend.com** → **Emails**
2. Najdi svůj test email

**OČEKÁVANÉ:**
- ✅ Email byl odeslán
- ✅ Status = "Delivered"
- ✅ Subject = "Tvoje výsledky: [categoryLabel] ([score]%)"
- ✅ From = "Podnikatelská Čtvrtka <ahoj@podnikatelskactvrtka.cz>"
- ✅ To = test@example.com

---

### **TEST #10: Email - Obsah**

**AKCE:** Zkontroluj email ve své schránce

**OČEKÁVANÝ OBSAH:**
- ✅ Hlavička s modrým gradientem + "Tvoje výsledky jsou tady! 🎉"
- ✅ Velké skóre v % (např. 65%)
- ✅ Category label (např. "Solidní základ")
- ✅ Popis kategorie
- ✅ Sekce "⚠️ Tvá největší rizika" s bullet pointy
- ✅ Sekce "✅ Co s tím" s doporučeními
- ✅ **NOVÉ:** CTA tlačítko "📥 Zobrazit můj akční plán"
- ✅ Link směřuje na: `https://podnikatelskactvrtka.cz/action-plans?category=solid&score=65&name=Test+User`

---

### **TEST #11: Akční plán PDF**

**AKCE:** Klikni na tlačítko "📥 Zobrazit můj akční plán" v emailu

**OČEKÁVANÉ CHOVÁNÍ:**
- ✅ Otevře se stránka `/action-plans` s URL parametry
- ✅ Vidíš personalizovaný PDF akční plán
- ✅ Má správné skóre a kategorii
- ✅ Má tvoje jméno (nebo "podnikateli" pokud jsi nezadal)
- ✅ Obsahuje konkrétní kroky pro tvou kategorii
- ✅ Má print button "🖨️ Vytisknout PDF"

**POKUD NEFUNGUJE:**
- Zkontroluj že ActionPlanPreview.tsx čte URL params správně
- Zkontroluj browser console pro chyby

---

### **TEST #12: Meta Pixel tracking**

**AKCE:** Zkontroluj že Meta Pixel trackuje dokončení kvízu

**JAK:**
1. Otevři Meta Events Manager
2. Jdi na **Test Events**
3. Najdi svůj test

**OČEKÁVANÉ UDÁLOSTI:**
- ✅ `PageView` = když otevřeš /kviz
- ✅ `CompleteRegistration` = když dokončíš kvíz
  - `content_name` = "Business Health Quiz"
  - `status` = [category]

---

## 🧪 TESTOVACÍ EMAILY (s override funkcionalitou)

Pro otestování všech kategorií máš v `quiz-submit.js` funkci, která FORCUJE kategorii podle emailu:

### **FORCE CRITICAL (0-30%)**
```
Email: test+critical@example.com
→ Dostaneš CRITICAL výsledky bez ohledu na odpovědi
```

### **FORCE UNSTABLE (31-55%)**
```
Email: test+unstable@example.com
→ Dostaneš UNSTABLE výsledky
```

### **FORCE SOLID (56-75%)**
```
Email: test+solid@example.com
→ Dostaneš SOLID výsledky
```

### **FORCE ADVANCED (76-100%)**
```
Email: test+advanced@example.com
→ Dostaneš ADVANCED výsledky
```

### **FORCE BEGINNER**
```
Email: test+beginner@example.com
→ Dostaneš BEGINNER výsledky
```

**POUŽITÍ:**
1. Vyplň kvíz s jakýmikoli odpověďmi
2. Zadej test email (např. `test+critical@gmail.com`)
3. Dostaneš VŽDY výsledky pro tuto kategorii
4. Super pro testování všech email variant!

---

## ✅ CHECKLIST - VŠE FUNGUJE?

Projdi tento checklist a zaškrtni vše co funguje:

**SUPABASE:**
- [ ] Tabulka `quiz_results` existuje
- [ ] Má správné sloupce
- [ ] Může zapisovat data (RLS policy)

**NETLIFY:**
- [ ] Function `quiz-submit` je deployed
- [ ] Všechny environment variables jsou nastavené
- [ ] Function vrací 200 OK

**SMARTEMAILING:**
- [ ] Kontaktní list existuje
- [ ] Custom fields jsou vytvořená
- [ ] API credentials fungují
- [ ] Kontakt se přidá do listu

**RESEND:**
- [ ] API key je nastavený
- [ ] Email se odešle
- [ ] Email dorazí do schránky
- [ ] Link na Action Plan funguje

**ACTION PLAN:**
- [ ] URL params se načítají správně
- [ ] PDF se zobrazuje
- [ ] Má správnou kategorii a skóre
- [ ] Print funguje

**META PIXEL:**
- [ ] PageView event trackuje
- [ ] CompleteRegistration event trackuje
- [ ] Data se zobrazují v Events Manager

**UX:**
- [ ] Kvíz se otevírá
- [ ] Otázky fungují
- [ ] Progress bar funguje
- [ ] Completion modal se zobrazuje
- [ ] Všechny animace jsou smooth

---

## 🚨 COMMON ISSUES & FIXES

### **PROBLÉM #1: "Failed to save quiz results"**
**FIX:**
- Zkontroluj SUPABASE_SERVICE_ROLE_KEY v Netlify
- Zkontroluj že tabulka existuje
- Zkontroluj RLS policy (musí povolit INSERT)

### **PROBLÉM #2: "Smartemailing API error"**
**FIX:**
- Zkontroluj SMARTEMAILING_USERNAME + API_KEY
- Zkontroluj že list ID existuje
- Zkontroluj že custom fields existují

### **PROBLÉM #3: Email se neodešle**
**FIX:**
- Zkontroluj RESEND_API_KEY
- Zkontroluj že email není ve spam
- Zkontroluj Resend dashboard pro chyby

### **PROBLÉM #4: Action Plan nefunguje**
**FIX:**
- Zkontroluj URL params v browseru (měly by být `?category=...&score=...`)
- Zkontroluj ActionPlanPreview.tsx (useEffect)
- Zkontroluj browser console

### **PROBLÉM #5: Meta Pixel netrackuje**
**FIX:**
- Zkontroluj že Meta Pixel je inicializovaný (`initMetaPixel()`)
- Zkontroluj že `fbq` existuje (`window.fbq`)
- Zkontroluj Meta Events Manager → Test Events

---

## 🎯 READY TO GO LIVE?

**Pokud ANO na všechny checklist položky** → JDE SE SPUSTIT! 🚀

**Pokud NE** → Oprav chyby a opakuj test.

**NEXT STEP:** Conversion reklama!


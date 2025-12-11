# 🎯 Kvíz Setup Návod

## ✅ Co jsme vytvořili

1. **Kvíz komponenta** (`/components/BusinessHealthQuiz.tsx`)
   - 2 verze otázek (začínající vs už podnikám)
   - Auto-scoring s 5 kategoriemi
   - Hezký responsive design
   - Automatické přesměrování na `/objednavka` podle výsledků

2. **Stránka `/kviz`** (`/App.tsx`)
   - Routing přidán
   - Funguje na `/#kviz` i `/kviz`

3. **Netlify funkce** (`/netlify/functions/quiz-submit.js`)
   - Ukládá výsledky do Supabase
   - Posílá emaily přes Resend
   - Přidává do Smartemailing listů podle kategorie

4. **Databáze schema** (`/QUIZ_DATABASE_SCHEMA.sql`)
   - Připravená tabulka `quiz_results`

---

## 🔧 Co musíš udělat

### 1. **Vytvořit Supabase tabulku**

1. Jdi do [Supabase Dashboard](https://supabase.com/dashboard)
2. Otevři SQL Editor
3. Zkopíruj obsah z `/QUIZ_DATABASE_SCHEMA.sql`
4. Spusť SQL

### 2. **Nastavit Environment Variables v Netlify**

Jdi do **Netlify Dashboard → Site Settings → Environment Variables** a přidej:

#### Smartemailing List IDs (vytvoř nové listy postupně):

```bash
SMARTEMAILING_LIST_KVIZ_KRITICKE=123456      # List pro "Kritický stav"
SMARTEMAILING_LIST_KVIZ_NESTABILNI=123457    # List pro "Nestabilní"
SMARTEMAILING_LIST_KVIZ_SOLIDNI=123458       # List pro "Solidní základ"
SMARTEMAILING_LIST_KVIZ_POKROCILY=123459     # List pro "Pokročilý"
SMARTEMAILING_LIST_KVIZ_ZACINAJICI=123460    # List pro "Začínající podnikatelé"
```

**Jak získat List IDs:**
1. Jdi do Smartemailingu → Kontakty → Kontaktní listy
2. Vytvoř nový list (např. "Kvíz - Kritický stav")
3. Klikni na list → v URL uvidíš ID (např. `?id=123456`)
4. Zkopíruj to číslo

#### Resend API Key (pro immediate email):

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

**Jak získat Resend API Key:**
1. Registruj se na [resend.com](https://resend.com)
2. Jdi do API Keys
3. Vytvoř nový klíč
4. **DŮLEŽITÉ:** Nastav "From" doménu na `ahoj@podnikatelskactvrtka.cz`

---

### 3. **Update landing page (nahradit konzultace)**

Najdi v kódu všechny odkazy na `/konzultace` a nahraď je za `/kviz`:

#### StickyConsultationButton.tsx
Změň tlačítko z "Free konzultace" na "Zjisti zdraví svého byznysu ZDARMA"

#### HeroSection.tsx  
Secondary CTA změň na kvíz

---

## 📧 Email Flow

### 1. Immediate email (Resend)
- Posíláme HNED po dokončení kvízu
- Obsahuje:
  - Skóre
  - Kategorie
  - Rizika
  - Doporučení
  - CTA na koupit Čtvrtku

### 2. Follow-up (Smartemailing)
Vytvoř v Smartemailingu pro každý list automatizaci:

**Kritický stav:**
- Den 1: Výsledky + PDF
- Den 2: "Takhle to dopadne, když to nevyřešíš" (fear)
- Den 3: Hard sell - Čtvrtka (4999 Kč)
- Den 5: Alternativa - konzultace

**Nestabilní:**
- Den 1: Výsledky + PDF
- Den 3: Case study (někdo podobný)
- Den 5: Soft sell - Čtvrtka
- Den 7: Konzultace jako safety net

**Solidní/Pokročilý:**
- Den 1: Výsledky + PDF
- Den 4: Value content
- Den 7: Community / Čtvrtka jako upgrade

**Začínající:**
- Den 1: Výsledky + checklist
- Den 3: "5 věcí před startem"
- Den 5: Soft sell - Čtvrtka

---

## 🧪 Testování

### 1. Lokální test
```bash
# Navštiv
http://localhost:5173/#kviz
```

### 2. Production test
```bash
# Navštiv
https://podnikatelskactvrtka.cz/#kviz
```

### 3. Zkontroluj:
- ✅ Kvíz se načte
- ✅ Otázky fungují
- ✅ Email přijde
- ✅ Data se uloží do Supabase
- ✅ Smartemailing list se updatuje

---

## 🚨 Troubleshooting

### Email se neposílá
- Zkontroluj `RESEND_API_KEY` v Netlify
- Zkontroluj "From" doménu v Resend dashboardu

### Smartemailing nefunguje
- Zkontroluj `SMARTEMAILING_USERNAME` a `SMARTEMAILING_API_KEY`
- Zkontroluj List IDs (jsou správná čísla?)

### Data se neukládají do Supabase
- Zkontroluj že tabulka `quiz_results` existuje
- Zkontroluj `SUPABASE_SERVICE_ROLE_KEY` v Netlify

---

## 📝 Next Steps

1. Vytvoř reklamy na kvíz:
   - "Zjisti ZDARMA, jak zdravý je tvůj byznys model"
   - "3 minuty a budeš vědět, kde tratíš peníze"
   - Target: Živnostníci, OSVČ, majitelé firem

2. Organic posty:
   - "Udělali jsme kvíz pro podnikatele"
   - "Kolik % jsi dostal ty?"
   - Social proof z výsledků

3. Retargeting podle kategorie:
   - Kritický → Aggressive hard sell
   - Nestabilní → Nurture + soft sell
   - Solidní/Pokročilý → Value content

---

**🎉 Hotovo! Máš plně funkční lead magnet s automatizovaným follow-upem!**

Otázky? Piš mi.

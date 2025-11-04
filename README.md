# Podnikatelská Čtvrtka

**Kompletní automatický systém pro online kurz s "Aggressive Flip" strategií.**

---

## 📁 Dokumentace

### 🎯 Marketing & Reklamy
**Složka:** `/docs/marketing/`

- `AKTUALNI_REKLAMY_PREHLED.md` - Přehled všech aktivních reklam
- `ULTIMATE_13_ADS_DEPLOYMENT_STRATEGY.md` - 13 ad setů strategie  
- `TOP_3_ADS_BRUTAL_COPY.md` - Top 3 nejsilnější copywriting
- `QUICK_START_FB_ADS.md` - Rychlý start s FB reklamami
- `EXPORT_REKLAM_NAVOD.md` - Export kreativ
- `SOCIAL_MEDIA_CONTENT_PLAN.md` - Social media plán

### ⚙️ Setup & Konfigurace
**Složka:** `/docs/setup/`

**Email Marketing:**
- `EMAIL_SEQUENCE_AGGRESSIVE_24H.md` - 24h email sekvence (Aggressive Flip)
- `SMARTEMAILING_*.md` - SmartEmailing automatizace

**Platby:**
- `FAPI_*.md` - Fakturoid API konfigurace a testování

**Databáze:**
- `SUPABASE_SCHEMA.sql` - Databázové schema

**Autentizace:**
- `SIMPLE_TOKEN_AUTH.md` - Token-based přístup
- `TOKEN_ACCESS_KURZ_MINIKURZ.md` - Logika přístupu
- `RLS_A_VERZE_KURZU_VYSVETLEN.md` - Row Level Security

**Timer systémy:**
- `TWO_TIMER_SYSTEMS_EXPLAINED.md` - Scarcity + Urgency timery

**Monitoring:**
- `SENTRY_*.md` - Error tracking

### 📝 Další
- `WORK_CONTEXT.md` - Poznámky k projektu
- `TODO_PO_TESTOVANI.md` - TODO po testování
- `DESIGN_SYSTEM.md` - Design system
- `ONBOARDING_NAVRH.md` - Onboarding návrh
- `ROADMAP_PAID_VERSION.md` - Roadmap
- `BUSINESS_INSIGHTS_UPGRADE.md` - Business insights
- `PROFIT_CALCULATOR_UX_PLAN.md` - Kalkulačka zisku plán
- `UNIVERSAL_LESSONS_PLAN.md` - Univerzální lekce

### 📧 Email Šablony
**Složka:** `/email-templates/`

- Všechny HTML šablony pro SmartEmailing
- Bloky pro sestavení emailů
- FAPI payment confirmed email

### 📦 Archiv
**Složka:** `/ARCHIVE/`

- `debugging/achievements/` - Achievement development (✅ hotovo)
- `debugging/mobile/` - Mobile development (✅ hotovo)
- `debugging/order-page/` - Order page fixes (✅ hotovo)
- `debugging/sql-fixes/` - SQL debugging (✅ hotovo)
- `ads/` - Staré ad strategie
- `emails/` - Staré email sekvence
- `course-components/` - Staré component verze

---

## 🚀 Aggressive Flip Strategie

**Flow:**
1. Landing page → Opt-in (email capture)
2. Email #1 **okamžitě** → Sleva 40% (4.999 Kč místo 8.333 Kč) + 24h countdown
3. Order page → 24h urgency timer
4. Email #2 po 20h → "Zbývá 4 hodiny!"
5. Email #3 po 7 dnech → Mini kurz zdarma (pouze pokud NEKOUPIL)

**Timery:**
- **Landing page (`/`):** Scarcity (místa ubývají 3/hod po 17h → waitlist)
- **Order page (`/objednavka`):** Urgency (24h countdown na slevu)

**Bonus pro průkopníky:**
- Prvních X zákazníků s 40% slevou (24h)
- Dostanou mini kurz jako BONUS po nákupu
- Ostatní mini kurz pouze jako lákadlo (email #3)

---

## 🛠️ Tech Stack

- **Frontend:** React + Tailwind v4
- **Backend:** Supabase (auth, database, storage)
- **Payments:** Fakturoid API (FAPI)
- **Email:** SmartEmailing (automatizace)
- **Monitoring:** Sentry
- **Hosting:** Netlify (+ serverless functions)

---

## ✅ Status: READY FOR TESTING

Všechny funkce jsou implementovány:
- ✅ Desktop verze kompletní
- ✅ Mobile verze kompletní
- ✅ Timery fungují (scarcity + urgency)
- ✅ FAPI platby nastaveny
- ✅ SmartEmailing sekvence připravena
- ✅ Achievement systém funkční
- ✅ Help tlačítko všude
- ✅ Support ticket systém

**Next:** Full flow testování (mobil + desktop)

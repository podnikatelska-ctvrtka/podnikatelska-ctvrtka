# 📚 Přehled Dokumentace - Podnikatelská Čtvrtka

**Last updated:** November 3, 2025  
**Status:** ✅ Ready for testing

---

## 🎯 REKLAMY (AKTUÁLNÍ)

Všechny reklamní materiály v `/docs/marketing/`:

- **`AKTUALNI_REKLAMY_PREHLED.md`** - Hlavní přehled všech reklam
- **`ULTIMATE_13_ADS_DEPLOYMENT_STRATEGY.md`** - 13 ad setů deployment
- **`TOP_3_ADS_BRUTAL_COPY.md`** - Top 3 nejsilnější copywriting
- **`QUICK_START_FB_ADS.md`** - Jak rychle spustit FB reklamy
- **`EXPORT_REKLAM_NAVOD.md`** - Návod na export kreativ
- **`SOCIAL_MEDIA_CONTENT_PLAN.md`** - Social media content strategie

---

## 📧 EMAIL MARKETING

- **`EMAIL_SEQUENCE_AGGRESSIVE_24H.md`** - Aggressive Flip strategie (24h)
  - Email #1: Okamžitě po opt-in (sleva 40%)
  - Email #2: Po 20h (reminder "zbývá 4h")
  - Email #3: Po 7 dnech (minikurz zdarma - pokud NEKOUPIL)

### Email Templates
Složka `/email-templates/`:
- `smartemailing-email-1-sleva-40.html`
- `smartemailing-email-2-reminder-4h.html`  
- `smartemailing-email-3-minikurz-zdarma.html`
- `smartemailing-email-3-pomoc-dotaz.html`
- `fapi-payment-confirmed.html`
- `smartemailing-blocks/` - Bloky pro builder

---

## 💳 PLATBY (FAPI)

Všechny FAPI dokumenty v rootu:

- **`FAPI_EMBED_QUICK_SETUP.md`** - Quick setup guide
- **`FAPI_TWO_PRICE_SETUP.md`** - Nastavení 2 cen (4.999 vs 8.333 Kč)
- **`FAPI_DISCOUNT_COUPONS_SETUP.md`** - Slevové kupóny
- **`FAPI_TESTING_GUIDE.md`** - Jak testovat platby
- **`FAPI_PAYMENT_SIMULATION_GUIDE.md`** - Simulace plateb
- **`FAPI_WEBHOOK_UPGRADE_COMPLETE.md`** - Webhook logika
- **`FAPI_WEBHOOK_MINIKURZ_LOGIC.md`** - Minikurz logika v webhooku
- **`FAPI_CURRENT_STATUS.md`** - Aktuální status integrace

---

## ✉️ SMARTEMAILING

Všechny SmartEmailing dokumenty v rootu:

- **`SMARTEMAILING_SETUP_AGGRESSIVE_24H.md`** - Setup pro 24h sekvenci
- **`SMARTEMAILING_AUTOMATIZACE_SETUP.md`** - Nastavení automatizací
- **`SMARTEMAILING_HTML_IMPORT_GUIDE.md`** - Import HTML šablon
- **`SMARTEMAILING_URL_TIMESTAMP_UPGRADE.md`** - URL s timestampy

---

## ⏱️ TIMERY

- **`TWO_TIMER_SYSTEMS_EXPLAINED.md`** - Vysvětlení obou timer systémů
  - **Scarcity Timer** (Landing page `/`): Místa ubývají 3/hod po 17h → waitlist
  - **Urgency Timer** (Order page `/objednavka`): 24h countdown na slevu 40%

---

## 🔐 AUTENTIZACE & PŘÍSTUPY

- **`SIMPLE_TOKEN_AUTH.md`** - Jak funguje token-based přístup
- **`TOKEN_ACCESS_KURZ_MINIKURZ.md`** - Logika přístupu ke kurzu vs minikurzu
- **`RLS_A_VERZE_KURZU_VYSVETLEN.md`** - Row Level Security vysvětlení
- **`DEV_MODE_SIMPLIFIED.md`** - Dev mode pro testování

---

## 🗄️ DATABÁZE

- **`SUPABASE_SCHEMA.sql`** - Aktu��lní databázové schema
  - Tables: users, purchases, user_achievements, user_progress, etc.

---

## 📊 MONITORING

- **`SENTRY_SETUP_COMPLETE.md`** - Sentry setup
- **`SENTRY_HOW_IT_WORKS.md`** - Jak funguje Sentry tracking
- **`SENTRY_QUICK_REFERENCE.md`** - Quick reference

---

## 🎨 DESIGN & UX

- **`DESIGN_SYSTEM.md`** - Design system (barvy, typografie, spacing)
- **`ONBOARDING_NAVRH.md`** - Onboarding flow návrh
- **`PROFIT_CALCULATOR_UX_PLAN.md`** - UX plán pro kalkulačku zisku
- **`BUSINESS_INSIGHTS_UPGRADE.md`** - Business insights upgrade

---

## 📝 STRATEGIE & ROADMAP

- **`ROADMAP_PAID_VERSION.md`** - Roadmap pro placenou verzi
- **`UNIVERSAL_LESSONS_PLAN.md`** - Plán univerzálních lekcí

---

## ✅ TESTOVÁNÍ

- **`TODO_PO_TESTOVANI.md`** - Checklist po testování full flow
  - Zítra test: mobil + desktop

---

## 📦 ARCHIV

Složka `/ARCHIVE/`:
- `debugging/` - Všechny hotové debugging dokumenty
  - `achievements/` - Achievement development (✅ hotovo)
  - `mobile/` - Mobile development (✅ hotovo)
  - `order-page/` - Order page fixes (✅ hotovo)
  - `sql-fixes/` - SQL debugging (✅ hotovo)
- `ads/` - Staré ad strategie
- `emails/` - Staré email sekvence
- `course-components/` - Staré component verze
- `minikurz/` - Minikurz dokumentace

---

## 🔥 TOP 5 DŮLEŽITÝCH SOUBORŮ

1. **`WORK_CONTEXT.md`** - Hlavní poznámky k projektu
2. **`EMAIL_SEQUENCE_AGGRESSIVE_24H.md`** - Email flow strategie
3. **`TWO_TIMER_SYSTEMS_EXPLAINED.md`** - Jak fungují timery
4. **`docs/marketing/AKTUALNI_REKLAMY_PREHLED.md`** - Reklamy overview
5. **`TODO_PO_TESTOVANI.md`** - Co testovat zítra

---

## 🚀 QUICK LINKS

**Chci spustit reklamy:**  
→ `/docs/marketing/QUICK_START_FB_ADS.md`

**Chci otestovat platbu:**  
→ `/FAPI_TESTING_GUIDE.md`

**Chci pochopit email flow:**  
→ `/EMAIL_SEQUENCE_AGGRESSIVE_24H.md`

**Chci debugovat error:**  
→ `/SENTRY_QUICK_REFERENCE.md`

**Chci přidat lekci:**  
→ `/UNIVERSAL_LESSONS_PLAN.md`

---

**Pro úplný overview struktury viz:** `/README.md`  
**Pro marketing dokumentaci viz:** `/docs/marketing/README.md`  
**Pro setup dokumentaci viz:** `/docs/setup/README.md`

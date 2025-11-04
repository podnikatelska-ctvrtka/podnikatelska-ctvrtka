# Setup Documentation

Aktuální setup dokumentace pro běžící systémy.

**Poznámka:** Většina setup souborů je přímo v rootu projektu (/).

---

## 📧 Email Marketing

**Složka:** `/` (root)

### SmartEmailing
- `SMARTEMAILING_SETUP_AGGRESSIVE_24H.md` - Setup pro 24h sekvenci
- `SMARTEMAILING_AUTOMATIZACE_SETUP.md` - Nastavení automatizací
- `SMARTEMAILING_HTML_IMPORT_GUIDE.md` - Import HTML šablon
- `SMARTEMAILING_URL_TIMESTAMP_UPGRADE.md` - URL s timestampy

### Email Strategie
- `EMAIL_SEQUENCE_AGGRESSIVE_24H.md` - Aggressive Flip 24h strategie

### Email Templates
Složka `/email-templates/`:
- HTML šablony pro SmartEmailing
- FAPI payment confirmation
- SmartEmailing bloky

---

## 💳 Platby (FAPI)

**Složka:** `/` (root)

- `FAPI_EMBED_QUICK_SETUP.md` - Quick setup
- `FAPI_TWO_PRICE_SETUP.md` - 2 ceny (4.999 vs 8.333 Kč)
- `FAPI_DISCOUNT_COUPONS_SETUP.md` - Slevové kupóny
- `FAPI_TESTING_GUIDE.md` - Testování plateb
- `FAPI_PAYMENT_SIMULATION_GUIDE.md` - Simulace
- `FAPI_WEBHOOK_UPGRADE_COMPLETE.md` - Webhook logika
- `FAPI_WEBHOOK_MINIKURZ_LOGIC.md` - Minikurz v webhooku
- `FAPI_CURRENT_STATUS.md` - Aktuální status

---

## 🗄️ Databáze

**Složka:** `/` (root)

- `SUPABASE_SCHEMA.sql` - Databázové schema
  - Tables: users, purchases, user_achievements, user_progress, etc.

---

## 🔐 Autentizace

**Složka:** `/` (root)

- `SIMPLE_TOKEN_AUTH.md` - Token-based přístup
- `TOKEN_ACCESS_KURZ_MINIKURZ.md` - Logika přístupu
- `RLS_A_VERZE_KURZU_VYSVETLEN.md` - Row Level Security
- `DEV_MODE_SIMPLIFIED.md` - Dev mode

---

## ⏱️ Timer Systémy

**Složka:** `/` (root)

- `TWO_TIMER_SYSTEMS_EXPLAINED.md` - Scarcity + Urgency
  - Landing page: Scarcity (místa ubývají)
  - Order page: Urgency (24h countdown)

---

## 📊 Monitoring

**Složka:** `/` (root)

- `SENTRY_SETUP_COMPLETE.md` - Setup
- `SENTRY_HOW_IT_WORKS.md` - Jak to funguje
- `SENTRY_QUICK_REFERENCE.md` - Quick reference

---

## 🔧 Netlify Functions

**Složka:** `/netlify/functions/`

- `fapi-webhook.js` - FAPI webhook handler
- `smartemailing-subscribe.js` - SmartEmailing subscribe
- `send-support-ticket.js` - Support ticket handler
- `README_SUPPORT_TICKET.md` - Support ticket docs

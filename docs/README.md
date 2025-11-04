# Dokumentace - Podnikatelská Čtvrtka

Centrální místo pro veškerou dokumentaci projektu.

---

## 📂 Struktura

### `/docs/marketing/` 
**Reklamy a marketing strategie**
- Facebook ads portfolio (13 ad setů)
- Copywriting strategie
- Social media plán
- Export a nasazení

### `/docs/setup/`
**Technické setup a konfigurace**
- Email marketing (SmartEmailing)
- Platby (Fakturoid API)
- Databáze (Supabase schema)
- Autentizace & přístupy
- Timer systémy
- Monitoring (Sentry)

---

## 🔥 Nejdůležitější soubory

### Pro testování zítra:
1. `/TODO_PO_TESTOVANI.md` - Checklist
2. `/TWO_TIMER_SYSTEMS_EXPLAINED.md` - Jak fungují timery
3. `/EMAIL_SEQUENCE_AGGRESSIVE_24H.md` - Email flow

### Pro reklamy:
1. `/docs/marketing/AKTUALNI_REKLAMY_PREHLED.md` - Co je kde
2. `/docs/marketing/ULTIMATE_13_ADS_DEPLOYMENT_STRATEGY.md` - Deployment plán
3. `/docs/marketing/TOP_3_ADS_BRUTAL_COPY.md` - Nejlepší kreativy

### Pro troubleshooting:
1. `/WORK_CONTEXT.md` - Poznámky a context
2. `/docs/setup/FAPI_*.md` - Platební systém
3. `/docs/setup/SMARTEMAILING_*.md` - Email systém
4. `/docs/setup/SENTRY_*.md` - Monitoring

---

## 📧 Email Templates

Všechny email šablony jsou v `/email-templates/`:
- `smartemailing-email-1-sleva-40.html` - První email se slevou
- `smartemailing-email-2-reminder-4h.html` - Reminder (zbývá 4h)
- `smartemailing-email-3-minikurz-zdarma.html` - Mini kurz (nekoupil)
- `smartemailing-email-3-pomoc-dotaz.html` - Alternativa (koupil)
- `fapi-payment-confirmed.html` - FAPI potvrzení platby

Bloky pro SmartEmailing builder jsou v `/email-templates/smartemailing-blocks/`.

---

## 🗄️ Archiv

Hotové debugging a development soubory jsou v `/ARCHIVE/`:
- Achievement development
- Mobile development  
- Order page fixes
- SQL debugging
- Staré ad strategie
- Staré email sekvence

---

## 🚀 Quick Links

**Chci spustit reklamy:**
→ `/docs/marketing/QUICK_START_FB_ADS.md`

**Chci otestovat platbu:**
→ `/docs/setup/FAPI_TESTING_GUIDE.md`

**Chci pochopit email flow:**
→ `/EMAIL_SEQUENCE_AGGRESSIVE_24H.md`

**Chci debugovat error:**
→ `/docs/setup/SENTRY_QUICK_REFERENCE.md`

**Chci přidat novou lekci:**
→ `/UNIVERSAL_LESSONS_PLAN.md`

---

**Last updated:** November 3, 2025  
**Status:** ✅ Ready for testing

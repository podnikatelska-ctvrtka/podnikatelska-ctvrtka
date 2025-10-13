# 📋 TODO - Podnikatelská Čtvrtka

**⚠️ DŮLEŽITÉ: NIKDY NEMAZAT SOUBORY BEZ POTVRZENÍ!**

Důvod: Některé soubory (reklamy, email flow, nastavení) nejdou do produkce,  
ale jsou potřeba pro referenci a budoucí použití.

**Aktualizováno: 12. 10. 2025**

---

## 🔴 KRITICKÉ (ASAP)

### 1. Email kurz@podnikatelskactvrtka.cz
- [ ] Vytvořit mailbox `kurz@podnikatelskactvrtka.cz` u poskytovatele domény
- [ ] Nastavit přesměrování nebo přidat do Gmail/Outlook
- [ ] Otestovat příjem odpovědí z uvítacích emailů

### 2. Encoding Issues (DEPLOY READY - zatím nedávat)
- [x] ✅ Opraveno: `encodeURIComponent(accessToken)` v webhook URL
- [x] ✅ Opraveno: Subject emailu "Podnikatelská Čtvrtka"
- [ ] Najít a opravit encoding na landing page (footer?)
- [ ] Opravit encoding v kurzu - finanční analýza (Module 3?)

---

## 🟡 HIGH PRIORITY (Tento týden)

### 3. Smartemailing Integrace
- [ ] Propojit všechny email capture formuláře na landingu
- [ ] Footer email form
- [ ] Hero section email form (pokud existuje)
- [ ] Modal email capture (QuickEmailCaptureModal?)
- [ ] Otestovat API connection

### 4. Prodejní Stránka s FAPI
- [ ] Rozhodnout: upravit stávající landing nebo vytvořit `/prodej`
- [ ] Implementovat FAPI formulář (ID: 63376)
- [ ] Design prodejní stránky
- [ ] Integrace FAPI embeded form
- [ ] Testovací nákup

### 5. Landing Page Review & Optimalizace
- [ ] Review textů na základě finálního kurzu
- [ ] Rozhodnout: konzultace zdarma ANO/NE
  - Pokud ANO: implementovat TidyCall kalendář
  - Pokud NE: odstranit nebo nahradit jiným CTA
- [ ] Optimalizace CTA buttons
- [ ] A/B test varianty (případně)

---

## 🟢 MEDIUM PRIORITY (Příští týden)

### 6. Reklamy - NOVÉ VIZUÁLY VYTVOŘENY! 🎨
- [x] ~~Review Facebook ad creatives~~ - DONE!
- [x] ~~Vytvořit nový Ad Set #2 (Diferenciace)~~ - DONE! ✅
- [x] ~~Vytvořit Ad Set #4 (Curiosity)~~ - DONE! ✅
- [x] ~~React komponenty~~ - `AdSet2Differentiation()` + `AdSet4Curiosity()`
- [ ] Screenshot Ad Set #1 (Problem) - keep původní
- [ ] Screenshot Ad Set #2 (NEW Diferenciace) - 1080×1080 PNG
- [ ] Screenshot Ad Set #4 (Curiosity) - 1080×1080 PNG
- [ ] Upload do FB Ads Manager
- [ ] Nastavit kampaň: 200 Kč/den (65+65+70 Kč)

**FINÁLNÍ 3 AD SETY:**
- ✅ Ad Set #1: Problem ("Makáte ale neroste") - 65 Kč/den
- ✅ Ad Set #2: Diferenciace ("Není to PDF - je to AI") - 65 Kč/den
- ✅ Ad Set #4: Curiosity ("Proč se daří?") - 70 Kč/den (main bet!)

**ŠKRTNUTO:**
- ❌ Ad Set #2 (starý cenový) - discount hunters
- ❌ Ad Set #3 (Social Proof) - fake testimonials

**NEXT ITERATION:**
- [ ] Testimonials: Nahradit fake reálnými!
- [ ] Update copy: Odstranit "konzultace ZDARMA"

### 7. Smartemailing - Email Flow
- [ ] **NOVÝ FLOW:** Po nákupu kurzu (viz návh v `/MARKETING_SETUP.md`)
- [ ] Email #1: Welcome + přístup do LMS (DONE v webhook!)
- [ ] Email #2: Reminder pokud neotevřel (den 2)
- [ ] Email #3: Engagement po Modulu 1 (den 4)
- [ ] Email #4: FIT Validator teaser (den 7)
- [ ] Email #5: Re-engagement pokud nedokončil (den 14)
- [ ] Email #6: Upsell/testimonial request po dokončení (den 21)
- [ ] Vytvořit HTML šablony v Smartemailingu
- [ ] Nastavit automatizace + triggery
- [ ] Propojit s tagy: "kurz_otevren", "modul1_done", "kurz_dokoncen"

### 8. Social Media - Založení
- [ ] Vytvořit Facebook stránku "Podnikatelská Čtvrtka"
- [ ] Vytvořit Instagram profil "Podnikatelská Čtvrtka"
- [ ] Brand guidelines (loga, barvy, tone of voice)
- [ ] Content plán - ukázky z kurzu
- [ ] První 10 postů (screenshots, testimonials, tips)

---

## 🟣 TESTING & QA

### FIT Validátor - Kompletní test
- [ ] Otestovat všechny 3 segmenty (Customer Profile vyplnění)
- [ ] Otestovat Value Map vyplnění
- [ ] Otestovat FIT scoring - všechny podmínky pokryté?
- [ ] Otestovat edge cases (prázdná data, 0 respondentů, atd.)
- [ ] Zkontrolovat auto-save funguje správně
- [ ] Otestovat na mobilu (responsivita)
- [ ] Otestovat export/download Business Action Plan

---

## 🔵 LOW PRIORITY (Budoucnost)

### 9. Marketing Content
- [ ] Screenshots z interaktivních částí kurzu
- [ ] Video ukázky (screen recording)
- [ ] Case studies studentů
- [ ] Blog posty / LinkedIn články
- [ ] Pinterest pins (vizuály Business Model Canvas)

### 10. Analytika & Optimalizace
- [ ] Google Analytics 4 - nastavení eventů
- [ ] Facebook Pixel - custom events
- [ ] Conversion tracking
- [ ] Heatmapy (Hotjar?)
- [ ] A/B testing landing variants

---

## ✅ DOKONČENO

- [x] ✅ FAPI webhook funkční (HTTP Basic Auth)
- [x] ✅ Email přístup do LMS (Resend)
- [x] ✅ Supabase databáze + uživatelé
- [x] ✅ LMS s 3 moduly live na Netlify
- [x] ✅ Achievement systém refactor
- [x] ✅ FIT validátor oprava
- [x] ✅ Tokenizace přístupu

---

## 📊 METRIKY K SLEDOVÁNÍ

- Conversion rate landing → prodej
- Email open rate (Smartemailing)
- Email click rate
- LMS completion rate (per module)
- Achievement unlock rate
- Customer satisfaction (NPS survey?)

---

## 💡 NÁPADY K DISKUZI

- Affiliate program?
- Upsell na konzultace?
- Community (Discord/Slack)?
- Certificate po dokončení kurzu?
- Gamifikace - leaderboard?

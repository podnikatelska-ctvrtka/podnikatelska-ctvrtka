# 📊 MARKETING SETUP - PODNIKATELSKÁ ČTVRTKA

**⚠️ TENTO SOUBOR NEMAZAT! OBSAHUJE DŮLEŽITÉ NASTAVENÍ PRO MARKETING**

---

## 🎯 FACEBOOK ADS - KOMPLETNÍ NASTAVENÍ

### 📈 CAMPAIGN STRUCTURE

**Campaign Objective:** Conversions (Lead)  
**Campaign Name:** "Podnikatelská Čtvrtka - Předprodej - Test"  
**Campaign Budget Optimization (CBO):** OFF (používáme ABO)

---

### 💰 BUDGET & TIMELINE

**Test Phase (7-14 dní):**
- **Total Budget:** 200 Kč/den
- **Split:** 3 Ad Sety × 67 Kč/den každý (zaokrouhlit na 65-70 Kč)
- **Billing:** CPC nebo CPM (nechat FB optimalizovat)

**Scale Phase (po 7 dnech):**
- **Winner Ad Set:** 200-300 Kč/den
- **Kill:** Ad Sety s CTR < 1%
- **Total Budget:** 300-400 Kč/den (scale postupně, +50% per week)

---

### 🎯 TARGETING (VŠECHNY 3 AD SETY STEJNÉ)

**Age:** 28-55 let (TVRDO! Důležité pro kvalitu leadů)  
**Gender:** All  
**Location:** Česká republika (všechny regiony)  

**Detailed Targeting (záj include ANY):**
- Small Business
- Entrepreneurship
- Business management
- Marketing
- E-commerce (optional)

**Exclude:**
- Studenti (není buying power)
- Job titles obsahující "student"

**Placement:**
- ✅ Facebook Feed
- ✅ Instagram Feed
- ❌ Stories (zatím NE - test first)
- ❌ Reels (zatím NE)
- ❌ Audience Network (NE!)
- ❌ Messenger (NE!)

**DŮLEŽITÉ:** Manual placement! Automatic dává špatné výsledky.

---

### 📱 AD SETY - 3 VARIANTY

#### **AD SET 1: PROBLEM-FOCUSED** 😰
**Name:** "Podnikatelská Čtvrtka - Problem - CZ 28-55"

**Angle:** Emocionální pain point  
**Hook:** "Makám od rána do večera... ale podnik neroste."

**Copy Headlines:**
- Primary: "Znáte to? Makáte, ale neroste to..."
- Description: "9 kroků k jasnému podnikání"

**Expected Results:**
- Higher CTR (warm audience)
- Empatie → důvěra
- Best pro: Burnout entrepreneurs

**File:** `/components/FinalAdSets.tsx` → `AdSet1Problem()`

---

#### **AD SET 2: VALUE-FOCUSED** 💰
**Name:** "Podnikatelská Čtvrtka - Value - CZ 28-55"

**Angle:** Exkluzivita + hodnota  
**Hook:** Badge "PRŮKOPNÍK #42" + "Ušetříte 7.999 Kč"

**Copy Headlines:**
- Primary: "Staňte se průkopníkem! Prvních 50 lidí"
- Description: "Mini kurz ZDARMA + sleva 62%"

**Expected Results:**
- Quick conversions (impulse buyers)
- Value seekers
- Best pro: Price-conscious segment

**File:** `/components/FinalAdSets.tsx` → `AdSet2Value()`

---

#### **AD SET 3: SOCIAL PROOF** ✓
**Name:** "Podnikatelská Čtvrtka - SocialProof - CZ 28-55"

**Angle:** "Funguje to. Už pro desítky lidí."  
**Hook:** Testimonials + důvěryhodnost

**Copy Headlines:**
- Primary: "Funguje to. Už pomohlo 47 podnikatelům."
- Description: "Přidejte se k úspěšným"

**Expected Results:**
- Lower CPL (skeptics need proof)
- Higher quality leads
- Best pro: Conservative buyers

**File:** `/components/FinalAdSets.tsx` → `AdSet3SocialProof()`

---

## 📧 SMARTEMAILING - EMAIL FLOW (PŘEDPRODEJ)

### 🎯 PŘEDPRODEJNÍ FLOW (STARÁ VERZE)

**⚠️ POZOR: Toto byl flow pro předprodej - NYní potřebujeme NOVÝ flow pro PO NÁKUPU!**

#### Email #1 - Confirmation (OKAMŽITĚ)
**Subject:** "🎉 Jste PRŮKOPNÍK #XX! Co bude dál?"

**Content:**
- Potvrzení registrace
- Badge "PRŮKOPNÍK #XX"
- Co dostanou HNED: Mini kurz (link)
- Co dostanou při launchi: Hlavní kurz + konzultace
- Timeline: "Kurz se spouští během 2-3 týdnů"

**CTA:** "Přejít na mini kurz →"

---

#### Email #2 - Mini Course Reminder (DEN 2 - pokud neotvřel)
**Subject:** "Zapomněli jste na mini kurz? 🎁"

**Content:**
- Upomínka na mini kurz
- "90% lidí dokončilo během 1 dne"
- Screenshot preview
- Link na kurz

**CTA:** "Začít kurz →"

---

#### Email #3 - Engagement (DEN 4)
**Subject:** "💡 Už víte kam směřuje váš byznys?"

**Content:**
- Tip z mini kurzu (value content)
- "Připravujeme pro vás něco velkého..."
- Teaser hlavního kurzu

**CTA:** "Dokončit mini kurz →"

---

#### Email #4 - Pre-Launch Hype (DEN 10)
**Subject:** "🚀 Za 7 dní se všechno změní..."

**Content:**
- Countdown do launche
- Sneak peek hlavního kurzu (screenshot)
- Připomenout: "Máte garantovanou průkopnickou cenu!"

**CTA:** "Přidat do kalendáře →"

---

#### Email #5 - Launch Day! (DEN LAUNCHE)
**Subject:** "🎉 JE TO TADY! Váš přístup k Podnikatelské Čtvrtce"

**Content:**
- "Vítejte v kurzu!"
- Přístupový link
- Co dělat jako první
- Reminder o konzultaci zdarma

**CTA:** "Vstoupit do kurzu →"

---

### 🆕 NOVÝ FLOW PO NÁKUPU (POTŘEBUJEME VYTVOŘIT!)

**Viz TODO.md - sekce Smartemailing**

---

## 🎨 AD CREATIVES - TECHNICKÉ SPECS

**Format:** Square (1080×1080 px)  
**File Type:** PNG (highest quality)  
**Design Tool:** Vizuálně v React komponentách  

**Fonts Used:**
- Headlines: System font-black
- Body: System font-semibold/font-bold

**Color Palette:**
- Problem: Dark gradient (gray-900 → slate-800)
- Value: Purple/blue gradient (indigo-900 → purple-900)
- Social Proof: Light gradient (blue-50 → purple-50)

**Files Location:**
- `/components/FinalAdSets.tsx` - 3 finální ad sety
- `/components/FacebookAdCreatives.tsx` - starší verze (backup)

---

## 📊 METRICS TO TRACK

**During Test Phase:**
- CTR (Click-Through Rate) - target: > 1%
- CPL (Cost Per Lead) - target: < 50 Kč
- Conversion Rate - target: > 20%
- CPC (Cost Per Click) - benchmark

**After 7 Days:**
- Analyze: Který má nejlepší CTR + CPL
- Kill: Underperformers
- Scale: Winner

**KPIs po scalování:**
- CAC (Customer Acquisition Cost) - target: < 200 Kč
- ROAS (Return on Ad Spend) - target: > 5x
- LTV (Lifetime Value) - měřit po 30/60/90 dnech

---

## 🔧 LANDING PAGE INTEGRATION

**Lead Destination:**
- **Test Phase:** `/` (homepage s PrelaunchEmailCapture modal)
- **Prodej:** `/prodej` (prodejní stránka s FAPI formulářem - TODO!)

**Pixel Events:**
- PageView - automaticky
- ViewContent - při otevření modalu
- Lead - při submit emailu
- Purchase - při dokončení platby (webhook)

**Facebook Pixel ID:** `YOUR_FACEBOOK_PIXEL_ID_HERE` (TODO: nahradit)  
**Google Analytics:** `GA_TRACKING_ID_HERE` (TODO: nahradit)

---

## ⚠️ DŮLEŽITÉ POZNÁMKY

1. **NEMAZAT tento soubor!** Obsahuje všechny reklamy + nastavení
2. **Ad creatives jsou v React komponentách** - stáhnout jako screenshot/PNG
3. **Manual Placement je MUST!** Automatic placement = vyhoření budgetu
4. **Věk 28-55 TVRDO!** Mladší = studenti = špatné leady
5. **Test 7 dní před scalem** - neuspěchat!

---

## 📞 POZNÁMKY K DISKUZI

**Konzultace zdarma:**
- ❌ ODSTRANIT z landingu (kurz je dost interaktivní)
- ✅ Nahradit: "Personalizovaný action plan v Modulu 3"

**TidyCall kalendář:**
- Pokud budeme chtít konzultace jako upsell (ne zdarma)
- Implementovat až PO launchi

**Prodejní stránka `/prodej`:**
- TODO: Vytvořit kratší, přímočařejší landing
- FAPI embed formulář
- FAQ sekce
- Záruka vrácení peněz 14 dní

---

**Aktualizováno:** 12. 10. 2025  
**Autor:** AI + Cipera  
**Status:** ✅ READY FOR ADS (vizuály hotové, targeting připravené)

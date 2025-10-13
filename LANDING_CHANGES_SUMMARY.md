# ✅ LANDING PAGE - ZMĚNY PRO 3-DENNÍ FLOW

## 🎯 CO JSME ZMĚNILI

### **1. HeroSection.tsx**

**CTA tlačítko (nahoře):**
```diff
- "Získat předběžný přístup + Bonus"
+ "Chci 3-denní mini kurz ZDARMA"

Popis pod tlačítkem:
- "🎁 3-denní mini kurz v hodnotě 2.999 Kč ZDARMA"
+ "🎁 Zpětná vazba + rozbor konkurence + komunikační triky"
```

---

### **2. QuickEmailCaptureModal.tsx**

**Email service:**
```diff
- Make.com webhook
+ Smartemailing (/.netlify/functions/smartemailing-subscribe)
```

---

### **3. PrelaunchEmailCapture.tsx (hlavní CTA dole)**

#### **A) Hlavní nadpis:**
```diff
- "STAŇTE SE PRŮKOPNÍKEM!"
- "První kurz s garancí výsledku"
+ "ZÍSKEJTE 3-DENNÍ MINI KURZ ZDARMA"
+ "První kroky k úspěšnému byznysu"

Podnázev:
- "Rezervujte si místo mezi prvními 50 lidmi"
+ "3 zlaté otázky + rozbor konkurence + komunikační triky"
+ "Okamžitá hodnota ZDARMA + speciální nabídka na hlavní kurz"
```

#### **B) Benefity sekce (levý sloupec):**
```diff
Nadpis:
- "PROČ BÝT PRŮKOPNÍK?"
+ "CO ZÍSKÁTE V MINI KURZU?"

Benefity:
- "Konečně vědět JAK"
- "Konečně kontrola nad byznysem"
- "Mini kurz HNED po registraci (2.999 Kč ZDARMA)"
- "Konzultace po koupi kurzu (1.500 Kč ZDARMA • Prvních 50)"

+ "Den 1: 3 zlaté otázky zpětné vazby (15 min • Okamžitá hodnota)"
+ "Den 2: Rozbor konkurence (20 min • Najděte příležitosti)"
+ "Den 3: Nabídka která prodává (15 min • Komunikační triky)"
+ "BONUS: Speciální nabídka (Po 3 dnech: Podnikatelská Čtvrtka -40%)"
```

#### **C) Urgency sekce (levý sloupec):**
```diff
Nadpis:
- "🔥 OMEZENÁ KAPACITA"
- "Konzultace ZDARMA jen pro prvních 50 kupujících"
+ "⚡ PROČ ZAČÍT TEĎ?"
+ "Mini kurz ZDARMA + speciální nabídka po 3 dnech"

Benefity:
- "Mini kurz HNED po registraci"
- "Průkopnická cena (62% sleva)"
- "Konzultace pro prvních 50 kupujících"
+ "3-denní mini kurz ZDARMA (okamžitě)"
+ "Zpětná vazba + konkurence + komunikace"
+ "Po 3 dnech: Hlavní kurz se slevou -40%"
```

#### **D) Cena box (pravý sloupec):**
```diff
Nadpis:
- "⚡ PRŮKOPNICKÁ VÝHODA"
+ "🎁 CO ZÍSKÁTE ZDARMA"

Cena:
- "4.999,- Kč (bez DPH)"
+ "ZDARMA" + "3-denní mini kurz okamžitě"

Obsah:
- "BALÍČEK OBSAHUJE:"
- "• Kurz Podnikatelská Čtvrtka (8.499 Kč)"
- "• 3-denní mini kurz (2.999 Kč)"
- "• 30min konzultace 50× (1.500 Kč)"
- "CELKOVÁ HODNOTA: 12.998 Kč"

+ "MINI KURZ OBSAHUJE:"
+ "✓ Den 1: 3 zlaté otázky zpětné vazby"
+ "✓ Den 2: Rozbor konkurence (20 min)"
+ "✓ Den 3: Komunikační triky"
+ "🎁 Speciální nabídka na hlavní kurz -40%"

Po registraci:
- "✅ Mini kurz ZDARMA HNED (2.999 Kč)"
- "🎁 Průkopnická cena kurzu (4.999 Kč)"
- "🔥 BONUS PO KOUPI: Konzultace (prvních 50)"

+ "📧 Link na mini kurz do emailu"
+ "🎯 Přístup ke všem 3 dnům"
+ "💡 Speciální nabídku po dokončení"
```

#### **E) Success screen (po registraci):**
```diff
Nadpis:
- "🔥 VÍTEJTE MEZI PRŮKOPNÍKY!"
+ "🎉 REGISTRACE ÚSPĚŠNÁ!"

Text:
- "Právě jste se stali oficiálním PRŮKOPNÍKEM české podnikatelské revoluce!"
- "• 🎁 3-denní mini kurz (2.999 Kč) - ZDARMA!"
- "• 🚀 Info o spuštění hlavního kurzu"
- "• 🎯 Průkopnická cena - ušetříte 7.999 Kč (62%)"
- "• 💎 Konzultace ZDARMA (prvních 50 kupujících)"

+ "Email jsme odeslali! Zkontrolujte svou schránku."
+ "Poslali jsme vám:"
+ "• 📧 Link na 3-denní mini kurz"
+ "• 🎁 Bonus materiály"
+ "• 💡 Informace o speciální nabídce"

Boxy:
- "🔥 PRŮKOPNÍK #XX (Mezi prvními!)"
- "🎁 BONUS (Mini kurz 2.999 Kč)"
- "💰 UŠETŘÍTE (7.999 Kč / 62%)"

+ "✅ DEN 1-3 (3-denní mini kurz ZDARMA)"
+ "🎁 BONUS (Hlavní kurz se slevou -40%)"

NOVÉ TLAČÍTKO:
+ "🚀 ZAČÍT MINI KURZ HNED" → redirect na /minikurz?email={email}
+ "(Nebo klikněte na link v emailu)"

Co dál:
- "Zkontrolujte email (i spam složku!)"
- "První email přijde do pár minut"
- "Mini kurz začíná hned po otevření!"

+ "Zkontrolujte email (Přijde do 5 minut, i spam!)"
+ "Začněte Den 1: 3 zlaté otázky (15 min • Okamžitá hodnota)"
+ "Po 3 dnech: Speciální nabídka (Podnikatelská Čtvrtka -40%)"
```

---

### **4. App.tsx**

**Nová route `/minikurz`:**
```tsx
if (path === '/priprava' || path === '/minikurz') {
  setShowChecklist(true); // MiniCourse komponenta
}
```

---

## 📁 NOVÉ SOUBORY

### **1. SMARTEMAILING_EMAIL_FLOW.md**
- 4 emaily (okamžitě, 24h, 72h, 96h)
- Setup instrukce pro Smartemailing
- ENV proměnné pro Netlify
- Segmentace (Nezaplatil / Zaplatil)
- Testing checklist

---

## 🚀 CO ZŮSTALO BEZE ZMĚNY

✅ **Žádné nové sekce na landing page** (zachováno 9/10!)  
✅ **Žádné UI změny** (jen copy a messaging)  
✅ **Všechny ostatní komponenty** (ProblemsSectionCompact, SolutionIntroSection, SwipeableTestimonials, OptimizedCombinedSectionV2, CompactCaseStudySection)  
✅ **Animace a UX** (beze změny)

---

## ⚙️ TECHNICKÁ IMPLEMENTACE

### **1. Netlify Functions**
- `/netlify/functions/smartemailing-subscribe.js` - už existuje ✅
- Potřebuje ENV proměnné (viz SMARTEMAILING_EMAIL_FLOW.md)

### **2. Routes**
- `/` - landing page (PrelaunchEmailCapture = email capture)
- `/minikurz` - MiniCourse komponenta (3-denní kurz)
- `/priprava` - alias pro `/minikurz` (compatibility)

### **3. Email flow**
- Registrace → Smartemailing list
- Automation: 4 emaily (0h, 24h, 72h, 96h)
- Segmentace podle platby (FAPI webhook)

---

## ✅ CHECKLIST PŘED SPUŠTĚNÍM

### **A) Netlify ENV proměnné:**
- [ ] `SMARTEMAILING_USERNAME` = [váš username]
- [ ] `SMARTEMAILING_API_KEY` = [váš api key]
- [ ] `SMARTEMAILING_LIST_ID` = [váš list id]

### **B) Smartemailing setup:**
- [ ] Vytvořit contact list "Mini kurz - Podnikatelská Čtvrtka"
- [ ] Zkopírovat List ID
- [ ] Vytvořit 4 emaily (viz SMARTEMAILING_EMAIL_FLOW.md)
- [ ] Nastavit automation (trigger + delay)
- [ ] Vytvořit segmenty (Nezaplatil / Zaplatil)

### **C) FAPI platební formulář:**
- [ ] Vytvořit produkt "Podnikatelská Čtvrtka" (4.999 Kč)
- [ ] Zkopírovat platební link
- [ ] Přidat do Email #2 a #3 (SMARTEMAILING_EMAIL_FLOW.md)

### **D) Testing:**
- [ ] Registrovat testovací email
- [ ] Ověřit že Email #0 přijde okamžitě
- [ ] Kliknout na tlačítko "ZAČÍT MINI KURZ" → `/minikurz` funguje?
- [ ] Zkontrolovat linky v emailech
- [ ] Otestovat platbu přes FAPI

---

## 🎯 FLOW DIAGRAM

```
Landing page (/)
    ↓
[Email formulář]
    ↓
Smartemailing (add to list)
    ↓
Email #0 (okamžitě) → Link na /minikurz
    ↓
Email #1 (24h) → Reminder Den 2
    ↓
Email #2 (72h) → LAUNCH! FAPI link (4.999 Kč)
    ↓
Email #3 (96h) → Reminder (jen pro ty co nekoupili)
    ↓
FAPI webhook → Supabase → Email s přístupem k hlavnímu kurzu
```

---

## 📊 EXPECTED RESULTS

### **Týden 1 (200 Kč/den reklamy):**

```
Budget: 1.400 Kč (7 dní × 200 Kč)
CPL: 30 Kč → 47 registrací (email capture)

Mini kurz completion: 70% → 33 lidí dokončí

Konverze na hlavní kurz: 25% → 8 prodejů
Revenue: 8 × 4.999 = 39.992 Kč

Profit: 40k - 1.4k = 38.6k Kč ✅
```

vs. Přímý prodej (bez mini kurzu):
```
Budget: 1.400 Kč
Direct conversion: 15% → 5 prodejů
Revenue: 5 × 4.999 = 24.995 Kč

Rozdíl: +15k Kč ve prospěch 3-day flow! 💰
```

---

## 📞 KONTAKT

- Email: info@podnikatelska-ctvrtka.cz
- Odpovědět na email (reply-to v Smartemailing)

---

**Poslední update:** 12.10.2025  
**Verze:** 1.0  
**Status:** ✅ READY TO LAUNCH!

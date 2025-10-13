# ✅ LAUNCH CHECKLIST - 3-DENNÍ MINI KURZ FLOW

## 📋 PŘED SPUŠTĚNÍM

### **1. NETLIFY SETUP**
- [x] ENV proměnná: `SMARTEMAILING_USERNAME` nastavená ✅
- [x] ENV proměnná: `SMARTEMAILING_API_KEY` nastavená ✅
- [x] ENV proměnná: `SMARTEMAILING_LIST_ID` = 2 ✅
- [x] Site re-deployed po přidání ENV proměnných ✅

### **2. SMARTEMAILING SETUP**
- [ ] Contact list vytvořený: "Mini kurz - Podnikatelská Čtvrtka"
- [ ] List ID zkopírovaný a použitý v ENV proměnné
- [ ] Email #0 (okamžitě) vytvořený a aktivovaný
- [ ] Email #1 (24h) vytvořený a aktivovaný
- [ ] Email #2 (72h) vytvořený a aktivovaný
- [ ] Email #3 (96h) vytvořený a aktivovaný
- [ ] Všechny emaily mají správné linky (`/minikurz`, FAPI)

### **3. FAPI SETUP**
- [ ] Produkt "Podnikatelská Čtvrtka" vytvořený
- [ ] Cena: 4.999 Kč (bez DPH) nastavená
- [ ] Produkt aktivní (publikovaný)
- [ ] Platební link zkopírovaný
- [ ] Link přidaný do Email #2 (72h)
- [ ] Link přidaný do Email #3 (96h)

### **4. LANDING PAGE**
- [ ] HeroSection CTA: "Chci 3-denní mini kurz ZDARMA" ✅
- [ ] PrelaunchEmailCapture nadpis: "ZÍSKEJTE 3-DENNÍ MINI KURZ ZDARMA" ✅
- [ ] Benefity aktualizované (Den 1, 2, 3) ✅
- [ ] Success screen s tlačítkem "ZAČÍT MINI KURZ HNED" ✅
- [ ] Route `/minikurz` funguje ✅

### **5. TESTING**
- [ ] Testovací email registrován
- [ ] Email #0 přišel do 5 minut
- [ ] Success screen zobrazený
- [ ] Tlačítko "ZAČÍT MINI KURZ" → `/minikurz` funguje
- [ ] MiniCourse komponenta se zobrazí (Den 1-3)
- [ ] Všechny linky v emailech fungují
- [ ] FAPI platební formulář se zobrazí

---

## 🚀 SPUŠTĚNÍ REKLAM

### **6. FACEBOOK REKLAMY**
- [ ] FB Pixel ověřený (Event: Lead tracking)
- [ ] 3 ad sety připravené (Problem, Diferenciace, Curiosity)
- [ ] Budget: 200 Kč/den nastavený
- [ ] Landing page URL: `https://podnikatelska-ctvrtka.cz/`
- [ ] Conversion event: Lead (email capture)
- [ ] Ad copy: viz `FINAL_AD_STRATEGY.md`
- [ ] Reklamy aktivované! 🔥

### **7. GOOGLE ANALYTICS**
- [ ] GA4 tracking code přítomný
- [ ] Event: `generate_lead` tracking funguje
- [ ] Conversion tracking nastavený

---

## 📊 MONITORING (DEN 1-7)

### **8. DENNÍ KONTROLA**
- [ ] Počet registrací (email captures)
- [ ] CPL (cost per lead) - cíl: 30 Kč
- [ ] Email delivery rate (Email #0)
- [ ] Mini kurz completion rate - cíl: 70%
- [ ] Email open rate (#0, #1, #2, #3)
- [ ] Click-through rate (FAPI link)
- [ ] Počet prodejů (konverze)

### **9. TÝDENNÍ REVIEW**
- [ ] Celkový počet registrací - cíl: 47
- [ ] Celkový počet prodejů - cíl: 8
- [ ] Revenue - cíl: ~40k Kč
- [ ] ROI - cíl: 2800%
- [ ] Adjustments (pokud potřeba)

---

## 🔧 TROUBLESHOOTING

### **Pokud email nepřichází:**
1. Zkontroluj ENV proměnné na Netlify
2. Zkontroluj spam složku
3. Smartemailing → Logs
4. Netlify Functions → Logs (`smartemailing-subscribe`)

### **Pokud konverze je nízká:**
1. Zkontroluj Email open rates
2. Zkontroluj Click-through rates na FAPI link
3. Upravit Email #2 copy (urgence, benefity)
4. A/B test různé subject lines

### **Pokud CPL je vysoký (>40 Kč):**
1. Upravit ad targeting
2. A/B test ad copy (3 varianty máte připravené)
3. Zkontroluj landing page (heatmap, scroll depth)

---

## ✅ SUCCESS CRITERIA

### **Týden 1:**
```
✅ 40+ email registrací
✅ CPL < 35 Kč
✅ Email #0 delivery rate > 95%
✅ Mini kurz completion > 60%
✅ 6+ prodejů (konverze > 20%)
✅ Revenue > 30k Kč
✅ Profit > 28k Kč (ROI > 2000%)
```

### **Pokud ANO → SCALE UP!**
- Zvýšit budget na 400 Kč/den
- Duplikovat winning ad
- Rozšířit targeting

### **Pokud NE → OPTIMALIZACE**
- Testovat jiné ad copy
- Upravit email flow
- A/B test landing page
- Prodloužit delay na Email #2 (5 dní?)

---

## 📞 KONTAKT & PODPORA

**Email:** info@podnikatelska-ctvrtka.cz  
**Reply-to:** Nastavit v Smartemailing pro všechny emaily

---

## 📚 DOKUMENTACE

- `QUICK_START_GUIDE.md` - Setup za 2 hodiny
- `SMARTEMAILING_EMAIL_FLOW.md` - 4 emaily + segmentace
- `LANDING_CHANGES_SUMMARY.md` - Co se změnilo
- `FINAL_AD_STRATEGY.md` - Facebook reklamy

---

**Poslední update:** 12.10.2025  
**Status:** ✅ READY TO LAUNCH!  
**Launch date:** ____ / ____ / 2025

---

## 🎉 GOOD LUCK!

*"The best time to plant a tree was 20 years ago. The second best time is now."*

**LET'S GO! 🚀**

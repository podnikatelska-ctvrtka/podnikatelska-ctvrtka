# 📊 PRVNÍ TÝDEN - MONITORING PLÁN

**Co sledovat, jak reagovat, kdy optimalizovat**

---

## 🎯 **REALISTICKÁ OČEKÁVÁNÍ:**

### **TÝDEN 1 (200 Kč/den = 1.400 Kč/týden):**

**Optimistický scénář:**
- 👥 Reach: 3.000-5.000 lidí
- 👆 Clicks: 100-150 (CTR ~2-3%)
- 📧 Leads (opt-ins): 20-40 (CPL ~35-70 Kč)
- 💰 Sales: 1-3 objednávky (conversion 5-10%)
- 💵 Revenue: 4.999-14.997 Kč
- 📈 ROAS: 3-10x

**Realistický scénář:**
- 👥 Reach: 2.000-3.000 lidí
- 👆 Clicks: 50-80 (CTR ~1.5-2%)
- 📧 Leads: 10-20 (CPL ~70-140 Kč)
- 💰 Sales: 0-2 objednávky
- 💵 Revenue: 0-9.998 Kč
- 📈 ROAS: 0-7x

**Pesimistický scénář (learning phase):**
- 👥 Reach: 1.000-2.000 lidí
- 👆 Clicks: 20-40 (CTR ~1%)
- 📧 Leads: 5-10 (CPL >140 Kč)
- 💰 Sales: 0-1 objednávka
- 💵 Revenue: 0-4.999 Kč
- 📈 ROAS: 0-3x

---

## ⏰ **ČASOVÁ OSA - CO SLEDOVAT KDY:**

### **DEN 1 (0-24h po spuštění):**

#### **PRVNÍ 4 HODINY:**
- [ ] **Ads Manager:** Kampaň běží? (status = Active)
- [ ] **Meta Events Manager:** PageView events trackují?
- [ ] **Budget:** Spend začal? (mělo by být ~8-10 Kč po 1h)

#### **KONEC DŇA 1:**
- [ ] **Impressions:** >500? (good sign)
- [ ] **Clicks:** >5? (znamená že reklamy nejsou spam)
- [ ] **CTR:** >0.5%? (minimum acceptable)
- [ ] **Lead events:** >0? (opt-in formulář funguje)

**❌ RED FLAGS DEN 1:**
- 🚨 Spend = 0 Kč po 4h → check payment method
- 🚨 Impressions < 100 po 8h → ad rejected? Check notifications
- 🚨 CTR < 0.3% → creative problem, ale wait 24h
- 🚨 Lead events = 0 but clicks >10 → pixel broken!

---

### **DEN 2-3 (Learning Phase):**

#### **CO SLEDOVAT:**
- [ ] **Spend:** ~200 Kč/den
- [ ] **Reach:** rostoucí
- [ ] **Frequency:** <2 (ideálně ~1.2-1.5)
- [ ] **CTR:** stabilizuje se (target >1%)
- [ ] **CPL:** stabilizuje se (target <100 Kč)
- [ ] **Lead count:** 5-10 leadů

#### **CO DĚLAT:**
✅ **NIČEHO!** Facebook učení, nech to běžet.

#### **CO NEDĚLAT:**
❌ Neměnit targeting
❌ Nepauzovat reklamy
❌ Neměnit creative
❌ Neměnit budget

**⚠️ YELLOW FLAGS DEN 2-3:**
- ⚠️ Frequency >3 → audience moc malý, ale wait
- ⚠️ CTR <1% → možná creative issue, ale wait do dne 4
- ⚠️ CPL >150 Kč → expensive, ale wait do dne 4

---

### **DEN 4-7 (Optimization Phase):**

#### **CO SLEDOVAT:**
- [ ] **CTR by Ad:** která reklama performuje best?
- [ ] **CPL by Ad:** která má nejlevnější leady?
- [ ] **Conversion rate:** kolik leadů → sales?
- [ ] **ROAS:** revenue / ad spend
- [ ] **Email open rate:** SmartEmailing analytics

#### **CO OPTIMALIZOVAT:**

**SCÉNÁŘ A: 1-2 reklamy fungují, 1 ne**
```
→ Pauzni špatnou reklamu
→ Duplikuj dobrou reklamu s novou creative
→ Keep budget stejný
```

**SCÉNÁŘ B: Všechny 3 reklamy fungují (CTR >1.5%)**
```
→ Nech běžet
→ Zvyš budget o 20% (200 → 240 Kč/den)
→ Připrav nové creative pro týden 2
```

**SCÉNÁŘ C: Žádná reklama nefunguje (CTR <0.8%)**
```
→ Pauzni kampaň na 1 den
→ Vytvoř 2-3 nové creative (jiný angle)
→ Testuj s 100 Kč/den
```

**SCÉNÁŘ D: Dobré CTR ale žádné sales**
```
→ Problem není v reklamách, ale v landing/order page
→ Check timer funguje?
→ Check FAPI form funguje?
→ Check email sekvence odesílá?
```

---

## 📊 **DAILY MONITORING ROUTINE:**

### **RÁNO (9-10h) - 5 MINUT:**

1. **Meta Ads Manager:**
   - Spend včera: ~200 Kč?
   - CTR včera: >1%?
   - Screenshot výsledků

2. **Meta Events Manager:**
   - Kolik Lead events včera?
   - Kolik InitiateCheckout včera?

3. **Supabase (opt-ins):**
   ```sql
   SELECT COUNT(*) FROM email_captures
   WHERE created_at > NOW() - INTERVAL '24 hours';
   ```

4. **FAPI (objednávky):**
   - Kontrola nových objednávek
   - Kontrola plateb

---

### **VEČER (18-20h) - 10 MINUT:**

1. **Celkový přehled:**
   - Spend today: kolik?
   - Leads today: kolik?
   - Sales today: kolik?

2. **Performance by Ad:**
   - Seřaď podle CTR (descending)
   - Která reklama best?
   - Která worst?

3. **Email analytics:**
   - SmartEmailing → Open rate
   - Kolik lidí otevřelo email?
   - Kolik lidí kliklo na CTA?

4. **Notes:**
   - Co fungovalo?
   - Co nefungovalo?
   - Co zkusit zítra?

---

## 📈 **METRICS DASHBOARD (EXCEL/GOOGLE SHEETS):**

### **TEMPLATE:**

| Den | Spend | Impressions | Clicks | CTR | Leads | CPL | Sales | Revenue | ROAS |
|-----|-------|------------|--------|-----|-------|-----|-------|---------|------|
| 1   | 200   | 1000       | 15     | 1.5%| 3     | 67  | 0     | 0       | 0x   |
| 2   | 200   | 1500       | 25     | 1.7%| 5     | 40  | 0     | 0       | 0x   |
| 3   | 200   | 2000       | 35     | 1.8%| 8     | 25  | 1     | 4999    | 25x  |
| ... |       |            |        |     |       |     |       |         |      |

### **KDE VZÍT DATA:**

- **Spend, Impressions, Clicks, CTR:** Meta Ads Manager
- **Leads:** Meta Events Manager (Lead events) nebo Supabase
- **CPL:** Spend / Leads
- **Sales:** FAPI dashboard
- **Revenue:** Sales × 4.999 Kč
- **ROAS:** Revenue / Spend

---

## 🎯 **BENCHMARKS - CO JE DOBRÝ VÝSLEDEK?**

### **CTR (Click-Through Rate):**
- ✅ **>2%** = excellent (scale up!)
- ✅ **1.5-2%** = good (keep running)
- ⚠️ **1-1.5%** = acceptable (monitor)
- 🚨 **<1%** = poor (optimize or pause)

### **CPL (Cost Per Lead):**
- ✅ **<50 Kč** = excellent (very profitable)
- ✅ **50-100 Kč** = good (profitable)
- ⚠️ **100-150 Kč** = acceptable (break-even)
- 🚨 **>150 Kč** = expensive (optimize)

### **CONVERSION RATE (Lead → Sale):**
- ✅ **>10%** = excellent
- ✅ **5-10%** = good
- ⚠️ **2-5%** = acceptable
- 🚨 **<2%** = problem (fix funnel)

### **ROAS (Return on Ad Spend):**
- ✅ **>5x** = excellent (scale!)
- ✅ **3-5x** = good (profitable)
- ⚠️ **1.5-3x** = acceptable (break-even)
- 🚨 **<1.5x** = losing money (pause/optimize)

---

## 🚨 **EMERGENCY SITUATIONS:**

### **SITUACE: Spend 400 Kč, 0 leads**

**PŘÍČINA:**
- Pixel nefunguje
- Targeting moc úzký
- Creative problem

**FIX:**
1. Check Meta Events Manager → Lead events?
2. Check landing page opt-in form → funguje?
3. Pauzni kampaň na 24h
4. Fix pixel tracking
5. Restart s 100 Kč/den

---

### **SITUACE: 20 leads, 0 sales**

**PŘÍČINA:**
- Email sekvence neodesílá
- Order page nefunguje
- Timer nefunguje (žádná urgency)
- Cena moc vysoká

**FIX:**
1. Check SmartEmailing → emails odesílají?
2. Check `/objednavka` → timer běží?
3. Check FAPI form → funguje?
4. Test celý flow sám (opt-in → email → order)

---

### **SITUACE: Frequency >5 po 3 dnech**

**PŘÍČINA:**
- Audience moc malý (same people vidí ad vícekrát)

**FIX:**
1. Rozšiř targeting:
   - Přidej další zájmy
   - Zvětši věkové rozmezí (20-65)
   - Přidej Slovensko + Rakousko
2. Nebo:
   - Sniž budget na 100 Kč/den
   - Počkej než frequency klesne <2

---

## 💡 **QUICK WINS - CO ZKUSIT POKUD TO NEJDE:**

### **DEN 3: CTR <1%, žádné leady**

**QUICK FIX:**
1. Vytvoř 1 novou reklamu:
   - Screenshot z kurzu (Model podnikání)
   - Copy: "Takhle vypadá Model podnikání za 90 minut"
   - CTA: "Zjistit víc"
2. Testuj s 50 Kč/den
3. Původní kampaň → pause

---

### **DEN 5: Leady jsou, sales nejsou**

**QUICK FIX:**
1. Pošli manuální email všem leadům:
   - Subject: "Zapomněl/a jsi něco? 24h sleva končí!"
   - Body: "Ahoj [Jméno], registroval/a ses k Podnikatelské Čtvrtce, ale ještě jsi nedokončil/a objednávku. Sleva 40% (4.999 Kč) platí jen dalších 24 hodin. Pak plná cena 8.333 Kč. → [link]"
2. Přidej testimonial na `/objednavka`
3. Zvýrazni Money-back guarantee

---

### **DEN 7: Všechno funguje ale málo**

**SCALE UP:**
1. Budget: 200 → 300 Kč/den (+50%)
2. Duplikuj best performing ad
3. Přidej nový angle (např. "Kolik zákazníků potřebuješ?")
4. Expand targeting: CZ+SK+AT

---

## 📅 **TÝDENNÍ SUMMARY REPORT:**

### **KONEC TÝDNE 1 - VYHODNOCENÍ:**

```
METRIKY:
- Total Spend: _____ Kč
- Total Impressions: _____
- Total Clicks: _____
- Average CTR: _____%
- Total Leads: _____
- Average CPL: _____ Kč
- Total Sales: _____
- Total Revenue: _____ Kč
- ROAS: _____x

TOP PERFORMING AD:
- Name: _____
- CTR: _____%
- CPL: _____ Kč

WORST PERFORMING AD:
- Name: _____
- CTR: _____%
- CPL: _____ Kč

LEARNINGS:
- Co fungovalo: _____
- Co nefungovalo: _____
- Co zkusit příští týden: _____

NEXT STEPS:
- [ ] _____
- [ ] _____
- [ ] _____
```

---

## 🎯 **REALISTIC EXPECTATIONS:**

### **TÝDEN 1 = LEARNING**
- Ne každá kampaň je instant success
- Facebook potřebuje 3-7 dní na naučení
- První prodej může přijít až den 4-5
- CPL může být vysoký první 3 dny

### **TÝDEN 2 = OPTIMIZATION**
- Metrics se stabilizují
- CPL klesá
- ROAS roste
- Začínáš vidět pattern

### **TÝDEN 3 = SCALING**
- Víš co funguje
- Můžeš zvýšit budget
- Přidat nové creative
- Expand targeting

---

## ✅ **SUCCESS CRITERIA - TÝDEN 1:**

**MINIMUM (PASS):**
- ✅ 5+ leads
- ✅ 1+ sale
- ✅ ROAS >1x (break-even)

**GOOD:**
- ✅ 15+ leads
- ✅ 2-3 sales
- ✅ ROAS 3-5x

**EXCELLENT:**
- ✅ 30+ leads
- ✅ 5+ sales
- ✅ ROAS >7x

---

**REMEMBER: I když týden 1 není perfektní, máš data co optimalizovat! 🚀**

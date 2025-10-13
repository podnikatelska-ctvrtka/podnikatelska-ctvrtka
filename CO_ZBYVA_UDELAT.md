# ✅ CO ZBÝVÁ UDĚLAT - FINÁLNÍ SETUP

## 🎯 STAV: 90% HOTOVO!

✅ Landing page upravená (Hero CTA teď táhne k placenému kurzu!)  
✅ Route `/minikurz` připravená  
✅ Smartemailing funkce připravená  
✅ ENV proměnné nastavené (List ID = 2)  
✅ 4 emaily napsané (copy ready)  

---

## 📋 ZBÝVÁ (60-90 MINUT):

### **KROK 1: VYTVOŘIT 4 EMAILY V SMARTEMAILING (40 min)**

Jděte do **Smartemailing → Campaigns → Automated emails**

#### **Email #0 - Okamžitě po registraci**

1. Klikněte **"Create new automation"**
2. **Název:** "Mini kurz - Email #0 - Welcome"
3. **Trigger:** "Contact added to list" → Vyberte list ID **2**
4. **Delay:** **0 minut** (okamžitě)
5. **Subject:** `🎉 Tvůj mini kurz je připraven!`
6. **Preheader:** `3 zlaté otázky + rozbor konkurence + komunikační triky - začni hned!`
7. **Body:** Zkopírujte z `SMARTEMAILING_EMAIL_FLOW.md` → Email #0
8. **Link:** Změňte na `https://podnikatelska-ctvrtka.cz/minikurz`
9. **Reply-to:** Nastavte svůj email (info@...)
10. ✅ **Aktivujte automation!**

---

#### **Email #1 - 24h reminder**

1. **Název:** "Mini kurz - Email #1 - Den 2 reminder"
2. **Trigger:** "Contact added to list" → List ID **2**
3. **Delay:** **1 den** (24 hodin)
4. **Subject:** `Jak ti jde mini kurz? 💡`
5. **Preheader:** `Už jsi dokončil/a první den? Feedback od zákazníků je 🔥`
6. **Body:** Zkopírujte z `SMARTEMAILING_EMAIL_FLOW.md` → Email #1
7. **Link:** `https://podnikatelska-ctvrtka.cz/minikurz`
8. ✅ **Aktivujte automation!**

---

#### **Email #2 - 72h LAUNCH (hlavní prodej)**

1. **Název:** "Mini kurz - Email #2 - LAUNCH nabídka"
2. **Trigger:** "Contact added to list" → List ID **2**
3. **Delay:** **3 dny** (72 hodin)
4. **Subject:** `🎉 Gratulujeme! + speciální nabídka jen pro tebe`
5. **Preheader:** `Dokončil/a jsi mini kurz! Tady je tvoje odměna 🎁`
6. **Body:** Zkopírujte z `SMARTEMAILING_EMAIL_FLOW.md` → Email #2
7. **DŮLEŽITÉ:** Přidejte **FAPI platební link** (viz Krok 2 níže)
8. ✅ **Aktivujte automation!**

---

#### **Email #3 - 96h reminder (last chance)**

1. **Název:** "Mini kurz - Email #3 - Last chance"
2. **Trigger:** "Contact added to list" → List ID **2**
3. **Delay:** **4 dny** (96 hodin)
4. **Podmínka (SEGMENTACE):** 
   - Pouze pro kontakty co **NEKOUPILI**
   - (Můžete nastavit později po prvních prodejích)
5. **Subject:** `⏰ Poslední šance: Sleva končí za 24h`
6. **Preheader:** `-40% na Podnikatelskou Čtvrtku vyprší zítra! Nezmeškej to.`
7. **Body:** Zkopírujte z `SMARTEMAILING_EMAIL_FLOW.md` → Email #3
8. **DŮLEŽITÉ:** Přidejte **FAPI platební link**
9. ✅ **Aktivujte automation!**

---

### **KROK 2: FAPI PLATEBNÍ FORMULÁŘ (20 min)**

#### **A) Vytvořte produkt**

1. Přihlaste se do **FAPI**
2. **Produkty → Vytvořit nový produkt**
3. **Nastavení:**

```
Název: Podnikatelská Čtvrtka
Popis: Business Model Canvas kurz - kompletní strategie pro tvůj byznys

Cena: 4.999 Kč (bez DPH)
Cena s DPH: 6.049 Kč (pokud jste plátce DPH)

Co obsahuje:
• 3 moduly (16 lekcí)
• Business Model Canvas (9 políček)
• Value Proposition Canvas
• FIT validátor
• Galerie 4 úspěšných modelů
• Personalizovaný akční plán
• Lifetime přístup
• 14 dní záruka vrácení peněz
```

4. **Uložte produkt**
5. **Publikujte** (aktivujte)

#### **B) Zkopírujte platební link**

1. FAPI → **Váš produkt → Platební odkaz**
2. **Zkopírujte link** (např. `https://platba.fapi.cz/XXXXX`)

#### **C) Přidejte link do emailů**

1. Smartemailing → **Email #2** → Edit
2. Najděte všechny instance `[FAPI PLATEBNÍ LINK]`
3. **Nahraďte** vaším linkem z FAPI
4. **Uložte**

5. Stejné pro **Email #3**

---

### **KROK 3: TESTING (15 min)**

#### **Test 1: Email capture**

1. Jděte na `https://podnikatelska-ctvrtka.cz/`
2. Scroll dolů na email formulář
3. **Zadejte testovací email** (váš vlastní)
4. Klikněte **"Získat mini kurz ZDARMA"**

**Očekávaný výsledek:**
- ✅ Success screen se zobrazí
- ✅ Tlačítko "ZAČÍT MINI KURZ HNED" funguje → `/minikurz`
- ✅ Email #0 přijde do **5 minut**

#### **Test 2: Mini kurz**

1. Klikněte **"ZAČÍT MINI KURZ HNED"** nebo
2. Jděte na `https://podnikatelska-ctvrtka.cz/minikurz`

**Zkontrolujte:**
- ✅ Den 1 se zobrazí (3 zlaté otázky)
- ✅ Můžete přepínat mezi Dny 1-3
- ✅ Formuláře fungují

#### **Test 3: Email flow (5 min testování)**

**PRO RYCHLÉ TESTOVÁNÍ:**

1. Smartemailing → Automation → Email #1
2. **Dočasně změňte delay na 5 minut** (místo 1 den)
3. Registrujte **nový testovací email**
4. Čekejte 5 minut → Email #1 by měl přijít
5. **PO TESTU:** Změňte delay zpět na **1 den**! ⚠️

6. Stejné pro Email #2 a #3 (volitelné)

#### **Test 4: FAPI platba**

1. Email #2 → Klikněte na platební link
2. FAPI formulář se zobrazí?
3. **NEPOKRAČUJTE V PLATBĚ** (nebo použijte testovací kartu)

---

## 🎉 HOTOVO! LAUNCH!

### **Checklist před spuštěním:**

- [ ] 4 emaily vytvořené a aktivované v Smartemailing
- [ ] FAPI produkt vytvořený (4.999 Kč)
- [ ] FAPI link přidaný do Email #2 a #3
- [ ] Testovací email capture funguje
- [ ] Email #0 přichází
- [ ] `/minikurz` route funguje
- [ ] Všechny linky v emailech fungují

### **🚀 SPUSŤTE REKLAMY!**

1. **Facebook Ads Manager**
2. **Budget:** 200 Kč/den
3. **Campaign objective:** Conversions (Lead)
4. **Ad sets:** 3 varianty (Problem, Diferenciace, Curiosity)
5. **Landing page:** `https://podnikatelska-ctvrtka.cz/`
6. **Launch!** 🔥

---

## 📊 SLEDUJTE METRIKY

### **První 3 dny:**

```
Registrace (email captures)
CPL (cost per lead) - cíl: 30 Kč
Email #0 delivery rate
Mini kurz completion rate
Email open rates (#0, #1, #2)
```

### **Den 4-7:**

```
Click-through rate (FAPI link)
Počet prodejů
Konverze rate - cíl: 20-25%
Revenue
ROI
```

---

## 📞 KONTAKT

**Email:** info@podnikatelska-ctvrtka.cz  
**Reply-to:** Nastavit v každém emailu v Smartemailing

---

## 🎯 EXPECTED RESULTS - TÝDEN 1

```
Budget: 1.400 Kč (7 dní × 200 Kč)
Registrace: 47 emailů (CPL 30 Kč)
Mini kurz completion: 70% (33 lidí dokončí)
Konverze na prodej: 25% (8 prodejů)

Revenue: 8 × 4.999 = 39.992 Kč
Profit: 39.992 - 1.400 = 38.592 Kč

ROI: 2.757% 🔥
```

---

## ✅ DOKUMENTACE

- `SMARTEMAILING_EMAIL_FLOW.md` - kompletní copy všech 4 emailů
- `LAUNCH_CHECKLIST.md` - detailní checklist
- `QUICK_START_GUIDE.md` - krok za krokem guide

---

**Poslední update:** 12.10.2025  
**Čas na dokončení:** 60-90 minut  
**Status:** 90% HOTOVO! 🚀

---

## 💪 LET'S GO!

*"Done is better than perfect."*

Máte všechno připravené - teď už jen vytvořit ty 4 emaily, nastavit FAPI a můžete spustit! 🚀

**Good luck!** 🍀

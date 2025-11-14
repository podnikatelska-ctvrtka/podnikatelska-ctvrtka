# 🎯 META PIXEL - NÁVOD NA TESTOVÁNÍ

## ✅ **PIXEL JE NAINSTALOVÁN!**

```
PIXEL ID: 1473814130395488
```

---

## 🧪 **JAK OTESTOVAT ŽE TO FUNGUJE:**

### **KROK 1: Otevři konzoli (F12)**

```
1. ☐ Otevři web: https://podnikatelskactvrtka.cz

2. ☐ Stiskni F12 (Console)

3. ☐ MĚLO BY SE ZOBRAZIT:
   ✅ Meta Pixel initialized: 1473814130395488
   🎯 Meta Pixel inicializován a PageView tracked!
```

---

### **KROK 2: Zkontroluj že Pixel funguje**

V konzoli (F12) napiš:

```javascript
window.fbq
```

**CO UVIDÍŠ:**

```
✅ ANO - Funkce se zobrazí:
   ƒ fbq() { ... }
   → FUNGUJE! ✅

❌ NE - undefined:
   → NEFUNGUJE! ❌
   → Zkontroluj že není AdBlock!
```

---

### **KROK 3: Otestuj Lead tracking**

```
1. ☐ Jdi na hlavní stránku: /

2. ☐ Zadej email do opt-in formuláře

3. ☐ Stiskni "CHCI SLEVU 40%"

4. ☐ V konzoli by se mělo zobrazit:
   🎯 Meta Pixel: Lead tracked! (email@example.com)
```

---

### **KROK 4: Zkontroluj v Events Manageru**

```
🔗 OTEVŘI EVENTS MANAGER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
https://business.facebook.com/events_manager
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ☐ Vlevo klikni na tvůj Pixel (1473814130395488)

2. ☐ Klikni na záložku "Test Events"

3. ☐ MĚLO BY SE ZOBRAZIT:
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ✅ PageView (čas: před chvílí)
   ✅ Lead (čas: před chvílí)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🎯 **CO SE TRACKUJE:**

### **1. PageView - Automaticky na všech stránkách**

```
📍 KDE: Všude (App.tsx)
📊 UDÁLOST: PageView
🎯 ÚČEL: Baseline tracking, Facebook ví že Pixel funguje
```

### **2. Lead - Po zadání emailu**

```
📍 KDE: PrelaunchEmailCapture.tsx
📊 UDÁLOST: Lead
🎯 ÚČEL: Facebook ví že user zadal email = kvalitní lead!
💰 HODNOTA: 0 Kč (lead nemá zatím hodnotu)
```

### **3. InitiateCheckout - Na order page**

```
📍 KDE: OrderPageFinal.tsx
📊 UDÁLOST: InitiateCheckout + ViewContent
🎯 ÚČEL: Facebook ví že user vidí nabídku
💰 HODNOTA: 4999 Kč
```

### **4. Purchase - Po úspěšné platbě**

```
📍 KDE: ThankYouPage.tsx
📊 UDÁLOST: Purchase
🎯 ÚČEL: Facebook ví že user koupil!
💰 HODNOTA: 4999 Kč
```

---

## 🚀 **JAK TO POUŽÍT V KAMPANI:**

### **KROK 1: Vytvoř kampaň s Conversion cílem**

```
☐ Ads Manager → Create Campaign

☐ Objective: "Conversions" ✅ (NE Traffic!)

☐ Campaign Name: "Podnikatelská Čtvrtka - Lead Gen"
```

---

### **KROK 2: Nastavení Ad Setu**

```
☐ Conversion Event: "Lead" ✅
   → Facebook optimalizuje na lidi kteří ZADAJÍ EMAIL!

☐ Pixel: 1473814130395488 ✅
   → Vyber tvůj Pixel!

☐ Website: https://podnikatelskactvrtka.cz

☐ Budget: 200 Kč/den (začni malým testem!)
```

---

### **KROK 3: Targeting**

```
☐ Location: Česká republika

☐ Age: 25-55 ✅
   → NE 18-65+ (to dává FB automaticky!)

☐ Gender: All

☐ Detailed Targeting:
   → Entrepreneurship
   → Small business
   → Business owner
   → Startup
```

---

### **KROK 4: VYPNI Advantage+ bullshit!**

```
☐ Advantage+ Audience: OFF ❌
☐ Advantage+ Placements: OFF ❌
☐ Advantage+ Creative: OFF ❌
☐ Advantage Campaign Budget: OFF ❌

→ VŠECHNO VYPNUTO! ✅
```

---

## 🎯 **PROČ TO FUNGUJE:**

### **PROBLÉM (předtím):**

```
❌ Traffic kampaně:
   → FB optimalizuje na KLIKNUTÍ
   → Posílá důchodce, lidi bez zájmu
   → Vysoká CTR, nízká konverze
   → Promarněný budget! 💸

❌ Advantage+ zapnuté:
   → FB ignoruje tvůj targeting
   → Posílá 65+ lidi
   → "Trust me bro" optimalizace
```

---

### **ŘEŠENÍ (teď):**

```
✅ Conversion kampaně s Lead eventem:
   → FB optimalizuje na LIDI KDO ZADÁVAJÍ EMAIL
   → Posílá kvalitní podnikatele 25-55
   → Nižší CTR, VYSOKÁ KONVERZE! 🎯
   → Efektivní budget! 💰

✅ Advantage+ vypnuté:
   → FB poslouchá tvůj targeting
   → Nedostávají důchodci 65+
   → Kontrola nad kampání! ✅
```

---

## 📊 **CO SLEDOVAT:**

### **Metriky Success:**

```
✅ GOOD:
   Lead Event: 5-10% conversion rate (z kliků)
   CPA (Cost Per Lead): 50-150 Kč
   Age breakdown: většina 25-55
   CTR: 1-3% (nižší než Traffic, ale OK!)

❌ BAD:
   Lead Event: <1% conversion rate
   CPA: >300 Kč
   Age breakdown: většina 65+
   CTR: <0.5%
```

---

## 🔥 **CHECKLIST PŘED SPUŠTĚNÍM:**

```
☐ Pixel ID nastavený (1473814130395488) ✅
☐ Otestováno v Console (window.fbq funguje) ✅
☐ Otestován Lead event (zadal jsem email) ✅
☐ Viděl jsem události v Events Manager ✅
☐ Kampaň vytvořena: Objective = "Conversions" ✅
☐ Conversion Event = "Lead" ✅
☐ Age: 25-55 ✅
☐ Advantage+ VŠECHNO VYPNUTÉ! ✅
☐ Budget: 200 Kč/den (testovací) ✅
```

---

## 🎯 **TROUBLESHOOTING:**

### **❌ PROBLÉM: Pixel se nenačítá (window.fbq undefined)**

```
ŘEŠENÍ:
1. Zkontroluj že nemáš AdBlock/Privacy Badger
2. Zkus Chrome Incognito mode
3. Zkontroluj Console errors (F12)
```

---

### **❌ PROBLÉM: Lead event se netrackuje**

```
ŘEŠENÍ:
1. F12 Console → mělo by se zobrazit:
   "🎯 Meta Pixel: Lead tracked!"
2. Zkontroluj že email je validní
3. Zkontroluj že formulář není duplicitní submit
```

---

### **❌ PROBLÉM: FB stále posílá 65+ lidi**

```
ŘEŠENÍ:
1. Zkontroluj že Advantage+ Audience je OFF
2. Zkontroluj že Age je nastavený 25-55 (NE 18-65+)
3. Pauznout kampaň a vytvořit novou (někdy FB "zapamatuje" staré nastavení)
```

---

### **❌ PROBLÉM: Vysoký CPA (>300 Kč per Lead)**

```
ŘEŠENÍ:
1. Zkontroluj targeting (moc úzký?)
2. Zkontroluj ad creative (dost atraktivní?)
3. Zkontroluj landing page (optimalizovaná?)
4. Počkej 2-3 dny (FB učící fáze)
```

---

## 🚀 **READY TO LAUNCH!**

```
✅ Pixel implementován!
✅ Tracking funguje!
✅ Events Manager vidí události!
✅ Kampaň může běžet! 🎯

→ SPUSŤ KAMPAŇ! 🔥
→ SLEDUJ METRIKY! 📊
→ OPTIMALIZUJ! 💪
```

---

**→ OTESTUJ PIXEL TEĎ! 🧪**

**→ PAK SPUSŤ KAMPAŇ! 🚀**

**→ A SLEDUJ KONVERZE! 💰**

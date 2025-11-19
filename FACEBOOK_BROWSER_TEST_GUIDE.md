# 🧪 FACEBOOK/INSTAGRAM IN-APP BROWSER - TEST GUIDE

**Jak otestovat že web funguje v FB/IG browseru**

---

## 📱 **METODA 1: REÁLNÝ TEST NA MOBILU (BEST!)**

### **ANDROID (5 MIN):**

#### **STEP 1: Pošli si link přes Messenger**
```
1. Otevři Facebook Messenger na mobilu
2. Pošli zprávu sám sobě (nebo kamarádovi)
3. Text: "Test: https://podnikatelskactvrtka.cz"
4. Odešli
```

#### **STEP 2: Klikni na link v Messengeru**
```
→ Link se otevře ve Facebook in-app browseru
→ ✅ MĚLO BY SE NAČÍST: Landing page normálně
→ ❌ NEMĚLO BY SE ZOBRAZIT: Error stránka
```

#### **STEP 3: Check console (optional)**
```
1. V Messenger klikni na link
2. Počkej až se načte
3. ✅ Landing page = funguje!
4. ❌ "Chvilku strpení..." error = stále problém
```

#### **STEP 4: Test opt-in formulář**
```
1. Na landing page → scroll dolů
2. Zadej email do formuláře
3. Submit
4. ✅ Redirect na /dakujem = funguje!
```

---

### **iOS (5 MIN):**

#### **STEP 1: Pošli si link přes FB/IG**
```
Facebook Messenger:
1. Otevři Messenger app
2. Pošli zprávu sám sobě
3. Text: https://podnikatelskactvrtka.cz
4. Klikni na link

Instagram DM:
1. Otevři Instagram app
2. Pošli DM sám sobě
3. Text: https://podnikatelskactvrtka.cz
4. Klikni na link
```

#### **STEP 2: Check jestli se načte**
```
✅ GOOD: Landing page s hero sekcí
✅ GOOD: Timer scarcity běží
✅ GOOD: Opt-in formulář viditelný

❌ BAD: Error stránka
❌ BAD: Blank white screen
❌ BAD: "Chvilku strpení..."
```

---

## 🔍 **METODA 2: FACEBOOK POST TEST (REALISTIC!)**

### **SIMULUJ REÁLNÝ CLICK Z REKLAMY:**

#### **STEP 1: Vytvoř FB post (private)**
```
1. Otevři Facebook (mobil app)
2. Vytvoř nový post
3. Privacy: "Only me" (jen já)
4. Text: "Test link"
5. Přidej link: https://podnikatelskactvrtka.cz
6. Publikuj
```

#### **STEP 2: Klikni na link v postu**
```
→ Otevře se FB in-app browser
→ ✅ Mělo by fungovat normálně
```

#### **STEP 3: Test flow**
```
1. Landing page načtena? ✅
2. Timer běží? ✅
3. Scroll funguje? ✅
4. Opt-in formulář? ✅
5. Submit → redirect? ✅
```

---

## 🎯 **METODA 3: INSTAGRAM STORY LINK (ADVANCED)**

### **POKUD MÁŠ IG ACCOUNT:**

#### **STEP 1: Přidej link do story**
```
1. Instagram → Create story
2. Add link sticker
3. URL: https://podnikatelskactvrtka.cz
4. Post to "Close Friends" (jen ty)
```

#### **STEP 2: Klikni na link**
```
→ Otevře se IG in-app browser
→ Test jestli funguje
```

---

## 📊 **METODA 4: SENTRY MONITORING (PASSIVE)**

### **CHECK SENTRY DASHBOARD:**

#### **STEP 1: Otevři Sentry**
```
https://sentry.io
→ Vyber projekt "podnikatelska-ctvrtka"
→ Issues
```

#### **STEP 2: Filter na FB browser errors**
```
→ Search: "enableAbortionListenerCatalogning"
→ Filter: Last 24 hours
```

#### **STEP 3: Check trend**
```
PŘED FIX (dnes ráno):
- 5-10 events/hour
- Browser: Facebook
- Device: Android 15

PO FIXU (za 1-2h):
- 0 events ✅
- Žádné nové chyby
```

---

## 🧪 **METODA 5: META PIXEL TEST EVENTS**

### **CHECK META EVENTS MANAGER:**

#### **STEP 1: Otevři Events Manager**
```
https://business.facebook.com/events_manager
→ Vyber pixel 891824089837992
→ Test Events
```

#### **STEP 2: Test PageView z FB browseru**
```
1. Pošli si link přes Messenger (mobil)
2. Klikni na link v Messengeru
3. Web se načte
4. Check Meta Events Manager → Test Events
5. ✅ Mělo by přijít: "PageView" event
```

#### **STEP 3: Verify event data**
```
Event: PageView
Browser: Facebook
Device: Android/iOS
Status: ✅ Received

= Web funguje v FB browseru!
```

---

## ⚡ **QUICK TEST CHECKLIST:**

### **5 MINUT TEST:**

- [ ] **1. Messenger test (Android)**
  ```
  Pošli link → Klikni → Landing page načtena?
  ```

- [ ] **2. FB post test (iOS)**
  ```
  Vytvoř post → Klikni → Landing page načtena?
  ```

- [ ] **3. Opt-in test**
  ```
  Zadej email → Submit → Redirect na /dakujem?
  ```

- [ ] **4. Sentry check**
  ```
  Sentry → Issues → "enableAbortionListenerCatalogning" = 0?
  ```

- [ ] **5. Meta Pixel check**
  ```
  Events Manager → Test Events → PageView z FB browseru?
  ```

---

## 🔍 **CO HLEDAT:**

### **✅ GOOD SIGNS:**
```
✅ Landing page se načte normálně
✅ Hero sekce viditelná
✅ Timer scarcity běží
✅ Opt-in formulář funguje
✅ Submit → redirect na /dakujem
✅ Meta Pixel trackuje PageView
✅ Žádné console errors
```

### **❌ RED FLAGS:**
```
🚨 Error stránka: "Chvilku strpení..."
🚨 Blank white screen
🚨 Stránka se nenačte
🚨 Console error: "enableAbortionListenerCatalogning"
🚨 Opt-in nefunguje
🚨 Meta Pixel netrackuje
```

---

## 📱 **RŮZNÉ BROWSERY - CO TESTOVAT:**

### **1. FACEBOOK IN-APP BROWSER:**
```
Android:
- Facebook app → Messenger → klik na link
- Facebook app → post → klik na link
- Facebook app → ad → klik (REAL TEST!)

iOS:
- Stejné jako Android
```

### **2. INSTAGRAM IN-APP BROWSER:**
```
Android + iOS:
- Instagram app → DM → klik na link
- Instagram app → story link → klik
- Instagram app → bio link → klik
```

### **3. NORMÁLNÍ BROWSERY (REFERENCE):**
```
Chrome Mobile, Safari iOS:
→ Mělo by fungovat vždy (kontrola)
```

---

## 🎯 **PROČ JE TO DŮLEŽITÉ:**

### **STATISTIKY:**
```
Clicks z reklam:
- 40-60% = Facebook in-app browser (Android)
- 20-30% = Instagram in-app browser
- 10-20% = Safari/Chrome mobile

= 60-80% trafficu je z FB/IG browserů!
```

### **DOPAD:**
```
Pokud FB browser nefunguje:
→ 60-80% clicků vidí error
→ 0% conversion z těchto clicků
→ Ztráta 60-80% revenue!
```

---

## 📊 **MONITORING PO FIXU:**

### **DEN 1 (DNES):**
```
→ Test Messenger link (5 min)
→ Check Sentry issues (5 min)
→ Check Meta Pixel events (5 min)
```

### **DEN 2-3:**
```
→ Monitor Sentry: žádné FB browser errors?
→ Monitor CTR: zlepšil se po fixu?
→ Monitor conversions: víc leadů?
```

### **DEN 7:**
```
→ Compare metrics před/po fixu
→ CTR by měl být vyšší
→ CPL by měl být nižší
```

---

## ✅ **EXPECTED RESULTS PO FIXU:**

### **PŘED FIX:**
```
CTR: ~1.0-1.5%
Bounce rate: 40-60% (FB browser crash)
Conversions: nižší
```

### **PO FIXU:**
```
CTR: ~1.5-2.5% (lepší!)
Bounce rate: 20-30% (normální)
Conversions: vyšší
```

---

## 🎯 **FINAL CHECKLIST:**

### **TESTING CHECKLIST:**

- [ ] ✅ Messenger link test (Android)
- [ ] ✅ Messenger link test (iOS)
- [ ] ✅ FB post link test
- [ ] ✅ IG DM link test
- [ ] ✅ Opt-in formulář funguje
- [ ] ✅ Redirect na /dakujem funguje
- [ ] ✅ Meta Pixel trackuje
- [ ] ✅ Sentry: žádné errors
- [ ] ✅ Landing page plně funkční

### **MONITORING CHECKLIST:**

- [ ] ✅ Sentry dashboard (každý den)
- [ ] ✅ Meta Events Manager (každý den)
- [ ] ✅ Ads Manager CTR (každý den)
- [ ] ✅ Conversion rate tracking
- [ ] ✅ Week 1 comparison (před/po fix)

---

**→ TESTUJ V MESSENGERU! 📱**  
**→ MĚLO BY FUNGOVAT! ✅**  
**→ SLEDUJ SENTRY! 👀**

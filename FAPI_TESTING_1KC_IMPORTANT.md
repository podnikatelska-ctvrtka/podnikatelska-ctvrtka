# ⚠️ DŮLEŽITÉ - TESTOVACÍ REŽIM WEBHOOK

**Datum:** 2025-10-29  
**Status:** 🧪 TESTOVACÍ REŽIM AKTIVNÍ

---

## 🚨 CO JE UPRAVENÉ

V souboru `/netlify/functions/fapi-webhook.js` na **řádku 114** je dočasně upravená logika detekce průkopníka:

### **PŮVODNÍ KÓD (PRODUKČNÍ):**
```javascript
const isEarlyBird = amount === 4999 || amount === 6049; // 4.999 bez DPH nebo 6.049 s DPH
```

### **AKTUÁLNÍ KÓD (TESTOVACÍ):**
```javascript
const isEarlyBird = amount === 4999 || amount === 6049 || amount === 1 || amount === 1.21; // TESTING: včetně 1 Kč!
```

---

## 🎯 ÚČEL ÚPRAVY

Umožnit testování celého flow za **1 Kč** (místo 4.999 Kč):

- ✅ Platba 1 Kč → Pošle PRŮKOPNICKÝ email (s minikurzem)
- ✅ Můžeme otestovat:
  - Email template průkopníka
  - Přístup do hlavního kurzu
  - Přístup do minikurzu
  - Supabase zápis
  - Token generování

---

## 🔄 JAK VRÁTIT ZPĚT (PO TESTOVÁNÍ)

### **KROK 1:** Otevři soubor
```
/netlify/functions/fapi-webhook.js
```

### **KROK 2:** Najdi řádek ~114
```javascript
const isEarlyBird = amount === 4999 || amount === 6049 || amount === 1 || amount === 1.21; // TESTING: včetně 1 Kč!
```

### **KROK 3:** Nahraď za PŮVODNÍ KÓD:
```javascript
const isEarlyBird = amount === 4999 || amount === 6049; // 4.999 bez DPH nebo 6.049 s DPH
```

### **KROK 4:** Commit a deploy
```bash
git add netlify/functions/fapi-webhook.js
git commit -m "Vrácení webhook logiky do produkčního režimu"
git push
```

### **KROK 5:** Smaž tento soubor
```bash
git rm FAPI_TESTING_1KC_IMPORTANT.md
git commit -m "Smazání testovací poznámky"
git push
```

---

## ✅ TESTOVACÍ CHECKLIST

Před vrácením do produkce ověř:

- [ ] Test 1: Platba 1 Kč → Email průkopník (s minikurzem) ✅
- [ ] Test 2: Přístup do hlavního kurzu funguje ✅
- [ ] Test 3: Přístup do minikurzu funguje ✅
- [ ] Test 4: Supabase záznam vytvořený ✅
- [ ] Test 5: Token funguje ✅
- [ ] **PO TESTECH: VRÁTIT WEBHOOK LOGIKU ZPĚT!** ⚠️

---

## 📋 JAK TESTOVAT

### **1. Sníž FAPI formulář A na 1 Kč:**
```
FAPI Dashboard → Produkty → Čtvrtka Early Bird → Změň cenu na 1 Kč
```

### **2. Proveď testovací platbu:**
```
1. Otevři: https://podnikatelskactvrtka.cz/objednavka
2. Vyplň formulář
3. Zaplať 1 Kč (GoPay test karta: 4111 1111 1111 1111)
4. Zkontroluj email
```

### **3. Zkontroluj výsledek:**
```
✅ Email přišel: "🔥 PRŮKOPNÍK! Přístup do kurzu + BONUS Mini Kurz"
✅ Obsahuje odkaz na hlavní kurz
✅ Obsahuje odkaz na mini kurz
✅ V Supabase je záznam s amount = 1
```

### **4. Vrať FAPI formulář zpět na 4.999 Kč:**
```
FAPI Dashboard → Produkty → Čtvrtka Early Bird → Změň cenu zpět na 4.999 Kč
```

### **5. VRAŤ WEBHOOK LOGIKU ZPĚT!** ⚠️
```
Viz instrukce výše v sekci "JAK VRÁTIT ZPĚT"
```

---

## 🚨 NEZAPOMEŇ!

**PO DOKONČENÍ TESTŮ MUSÍŠ:**

1. ✅ Vrátit FAPI formulář A na **4.999 Kč**
2. ✅ Vrátit webhook logiku do **produkčního režimu** (smazat `|| amount === 1 || amount === 1.21`)
3. ✅ Smazat tento soubor

---

**⚠️ POKUD TOHLE NECHÁŠ V PRODUKCI, KAŽDÁ PLATBA 1 Kč DOSTANE MINIKURZ! ⚠️**

---

Vytvořeno: 2025-10-29  
Účel: Testování FAPI flow za 1 Kč

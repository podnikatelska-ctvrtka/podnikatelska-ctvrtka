# ⚠️ DŮLEŽITÉ - TESTOVACÍ REŽIM WEBHOOK (DVĚ CENY)

**Datum:** 2025-10-30  
**Status:** 🧪 TESTOVACÍ REŽIM AKTIVNÍ

---

## 🚨 CO JE UPRAVENÉ

V souboru `/netlify/functions/fapi-webhook.js` na **řádku ~115** je dočasně upravená logika detekce průkopníka:

### **PŮVODNÍ KÓD (PRODUKČNÍ):**
```javascript
const isEarlyBird = amount === 4999 || amount === 6049; // 4.999 bez DPH nebo 6.049 s DPH
```

### **AKTUÁLNÍ KÓD (TESTOVACÍ):**
```javascript
// ⚠️ TESTOVACÍ REŽIM:
// 1 Kč (nebo 1.21 Kč s DPH) = Early Bird test → POŠLE MINIKURZ ✅
// 2 Kč (nebo 2.42 Kč s DPH) = Full Price test → NEPOŠLE MINIKURZ ❌
const isEarlyBird = amount === 4999 || amount === 6049 || amount === 1 || amount === 1.21;
```

---

## 🎯 ÚČEL ÚPRAVY

Umožnit testování **OBOU** verzí emailů:

### **TEST A: PRŮKOPNÍK (s minikurzem)**
- ✅ Platba **1 Kč** → Pošle PRŮKOPNICKÝ email (s minikurzem)
- ✅ Můžeme otestovat:
  - Email template průkopníka
  - Přístup do hlavního kurzu
  - Přístup do minikurzu
  - Supabase zápis
  - Token generování

### **TEST B: NORMÁLNÍ ZÁKAZNÍK (bez minikurzu)**
- ✅ Platba **2 Kč** → Pošle NORMÁLNÍ email (BEZ minikurzu)
- ✅ Můžeme otestovat:
  - Email template normálního zákazníka
  - Přístup do hlavního kurzu (BEZ minikurzu)
  - Ověřit že minikurz NEJDE zobrazit

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

## 📋 JAK TESTOVAT (DVA SCÉNÁŘE)

### **TEST A: PRŮKOPNÍK (1 Kč → S MINIKURZEM)**

#### **1. Sníž FAPI formulář A na 1 Kč:**
```
FAPI Dashboard → Produkty → Čtvrtka Early Bird (4.999 Kč) 
→ Změň cenu na 1 Kč (bez DPH) nebo 1,21 Kč (s DPH)
```

#### **2. Proveď testovací platbu:**
```
1. Otevři: https://podnikatelskactvrtka.cz/objednavka
2. Vyplň formulář
3. Zaplať 1 Kč (GoPay test karta: 4111 1111 1111 1111)
4. Zkontroluj email
```

#### **3. Zkontroluj výsledek:**
```
✅ Email přišel: "🔥 PRŮKOPNÍK! Přístup do kurzu + BONUS Mini Kurz"
✅ Obsahuje odkaz na hlavní kurz
✅ Obsahuje odkaz na mini kurz ← ← ← DŮLEŽITÉ!
✅ V Supabase je záznam s amount = 1
```

#### **4. Vrať FAPI formulář zpět na 4.999 Kč**

---

### **TEST B: NORMÁLNÍ ZÁKAZNÍK (2 Kč → BEZ MINIKURZU)**

#### **1. Sníž FAPI formulář B na 2 Kč:**
```
FAPI Dashboard → Produkty → Čtvrtka Full Price (8.499 Kč) 
→ Změň cenu na 2 Kč (bez DPH) nebo 2,42 Kč (s DPH)
```

#### **2. Proveď testovací platbu:**
```
1. Otevři: https://podnikatelskactvrtka.cz/objednavka
   (může být potřeba vytvořit dočasný druhý formulář)
2. Vyplň formulář
3. Zaplať 2 Kč
4. Zkontroluj email
```

#### **3. Zkontroluj výsledek:**
```
✅ Email přišel: "🎉 Vítejte v kurzu!"
✅ Obsahuje odkaz na hlavní kurz
❌ NEOBSAHUJE odkaz na mini kurz ← ← ← DŮLEŽITÉ!
✅ V Supabase je záznam s amount = 2
```

#### **4. Vrať FAPI formulář zpět na 8.499 Kč**

---

### **5. VRAŤ WEBHOOK LOGIKU ZPĚT!** ⚠️
```
Viz instrukce výše v sekci "JAK VRÁTIT ZPĚT"
```

---

## 🚨 NEZAPOMEŇ!

**PO DOKONČENÍ TESTŮ MUSÍŠ:**

1. ✅ Vrátit FAPI formulář A na **4.999 Kč**
2. ✅ Vrátit FAPI formulář B na **8.499 Kč**
3. ✅ Vrátit webhook logiku do **produkčního režimu** (smazat `|| amount === 1 || amount === 1.21`)
4. ✅ Smazat tento soubor

---

## 📊 PŘEHLED TESTOVACÍCH CEN

| Produkt | Normální cena | Testovací cena | Minikurz? |
|---------|---------------|----------------|-----------|
| **Formulář A** (Early Bird) | 4.999 Kč | **1 Kč** | ✅ ANO |
| **Formulář B** (Full Price) | 8.499 Kč | **2 Kč** | ❌ NE |

---

**⚠️ POKUD TOHLE NECHÁŠ V PRODUKCI:**
- Každá platba **1 Kč** dostane minikurz (průkopník)
- Každá platba **2 Kč** NEDOSTANE minikurz (normální)

**To NECHCEŠ v produkci!** ⚠️

---

Vytvořeno: 2025-10-30  
Účel: Testování OBOU verzí emailů (s i bez minikurzu)

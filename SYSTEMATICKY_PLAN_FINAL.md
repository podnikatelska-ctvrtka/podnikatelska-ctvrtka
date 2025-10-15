# 🎯 SYSTEMATICKÝ PLÁN - KONEČNÉ ŘEŠENÍ

## 📊 CO VÍME:

### **HISTORIE:**
1. ✅ **Včera:** Kurz + Dashboard funkční (s FAPI, GoPay, reklamami)
2. ❌ **Dnes:** Motion errory → začali jsme Motion odstraňovat
3. 🔄 **Cyklus:** Opravíme kurz → rozbije dashboard → opravíme dashboard → rozbije kurz
4. 📦 **ZIPy:** Máš ZIP z dnešního rána (ale staré názvy tabulek!)

### **AKTUÁLNÍ STAV (podle MOTION_FIX_FINAL_COMPLETE.md):**
- ✅ Motion ODSTRANĚN ze všech 7 komponent
- ✅ 26 motion.div nahrazeno CSS transitions
- ✅ Všechny komponenty MĚLY fungovat

### **CO SE STALO TEĎKA:**
- ❓ Kurz se zobrazuje? (nebo ne?)
- ❌ Dashboard nefunguje po návratu z kurzu

---

## 🔍 DIAGNÓZA: CO PŘESNĚ NEFUNGUJE?

### **POTŘEBUJU OD TEBE:**

**1. Spusť lokální verzi:**
```bash
npm run dev
```

**2. Otevři kurz:**
```
http://localhost:5173/course-v3?token=test-token-123
```

**3. Zkontroluj každý krok:**

#### **A) Dashboard se zobrazuje na začátku?**
- [ ] ANO - vidím moduly, progress, canvas preview
- [ ] NE - co vidím místo toho?

#### **B) Můžu spustit lekci?**
- [ ] ANO - kliknu "Pokračovat" → načte se lekce
- [ ] NE - co se stane?

#### **C) Lekce se zobrazuje?**
- [ ] ANO - vidím nadpis, obsah, CTA box, guided tour
- [ ] NE - co chybí?

#### **D) Můžu se vrátit na dashboard?**
- [ ] ANO - kliknu "← Přehled" → zobrazí dashboard
- [ ] NE - co se stane? (blank? error?)

**4. Pošli mi screenshot Console (F12) errorů:**
- Screenshot červených errorů
- Nebo zkopíruj text errorů

---

## 🎯 DVĚ MOŽNÁ ŘEŠENÍ:

### **ŘEŠENÍ A: PRODUKCE FUNGUJE → STÁHNOUT Z NETLIFY**

**Pokud produkce (`www.podnikatelskactvrtka.cz/course-v3`) FUNGUJE:**

1. ✅ Máš přístup do Netlify?
2. ✅ Můžu stáhnout deployed files z Netlify
3. ✅ Nahradit lokální verzi
4. ✅ HOTOVO!

**ČAS:** 15 minut  
**RIZIKO:** Nízké (kopírujeme funkční verzi)

---

### **ŘEŠENÍ B: NAJÍT PŘESNÝ PROBLÉM**

**Pokud dashboard crashuje kvůli konkrétnímu erroru:**

1. ✅ Zjistíme error z Console
2. ✅ Opravíme TEN konkrétní problém
3. ✅ Otestujeme kurz → dashboard → kurz
4. ✅ HOTOVO!

**ČAS:** 30-60 minut  
**RIZIKO:** Střední (záleží na erroru)

---

## 🚀 MŮJ NÁVRH:

### **KROK 1: TEST PRODUKCE (5 MIN)**

**Otevři produkci:**
```
https://www.podnikatelskactvrtka.cz/course-v3?token=TVUJ_TOKEN
```

**Zkontroluj:**
1. Dashboard se zobrazuje?
2. Můžu spustit lekci?
3. Lekce se zobrazuje správně?
4. Můžu se vrátit na dashboard?
5. Dashboard funguje po návratu?

**Pokud ANO → STÁHNEME Z NETLIFY!**  
**Pokud NE → HLEDÁME CHYBU!**

---

### **KROK 2A: STAŽENÍ Z NETLIFY (pokud produkce funguje)**

**Potřebuju:**
1. ✅ Přístup do Netlify (nebo mi dej login)
2. ✅ Stáhnu source files z posledního deploy
3. ✅ Nahradím lokální soubory:
   - `/components/CourseDemoV3.tsx`
   - `/components/SimpleDashboard.tsx`
   - `/components/BusinessModelCanvasSimple.tsx`
   - `/components/GuidedTour.tsx`
   - `/lib/supabase.ts`
   - `/lib/courseProgress.ts`

**NENAHRAZUJI:**
- `/netlify/functions/*` (FAPI)
- `/.env` (credentials)
- `/components/OrderPage.tsx` (GoPay)

---

### **KROK 2B: DEBUGGING (pokud produkce nefunguje)**

**Podle error message:**

#### **Error 1: "Cannot read properties of undefined"**
→ Problém s null/undefined daty  
→ Opravím null checks

#### **Error 2: "AnimatePresence key warning"**
→ Ještě nějaký Motion zbytek  
→ Najdu a odstraním

#### **Error 3: "404 business_canvas_sections"**
→ Staré názvy tabulek  
→ Změním na `user_canvas_data`

#### **Error 4: Blank screen (žádný error)**
→ CSS problém  
→ Zkontroluju display/visibility

---

## 📋 AKČNÍ KROKY:

### **TEĎKA HNED:**

**1. Otevři produkci a řekni mi:**
```
https://www.podnikatelskactvrtka.cz/course-v3?token=TVUJ_TOKEN
```

- [ ] Dashboard funguje?
- [ ] Kurz funguje?
- [ ] Návrat na dashboard funguje?

**2. Otevři lokální verzi a řekni mi:**
```
http://localhost:5173/course-v3?token=test
```

- [ ] Dashboard funguje?
- [ ] Kurz funguje?
- [ ] Návrat na dashboard funguje?
- [ ] Screenshot errorů z Console (F12)

**3. Řekni mi:**
- [ ] Máš přístup do Netlify?
- [ ] Jaký token používáš na produkci?

---

## 🎯 PODLE ODPOVĚDÍ ZVOLÍME ŘEŠENÍ:

### **SCÉNÁŘ 1: Produkce OK, lokál BROKEN**
→ ✅ Stáhneme z Netlify  
→ ✅ 15 minut  
→ ✅ HOTOVO!

### **SCÉNÁŘ 2: Produkce BROKEN, lokál OK**
→ ✅ Push lokální verzi na Netlify  
→ ✅ 10 minut  
→ ✅ HOTOVO!

### **SCÉNÁŘ 3: Oboje BROKEN**
→ ❌ Najdeme error  
→ ❌ Opravíme  
→ ❌ 30-60 minut

### **SCÉNÁŘ 4: Oboje OK (ale dashboard crashuje po návratu)**
→ ❌ Specifický error při navigaci  
→ ❌ Debugging state management  
→ ❌ 30 minut

---

**POČKÁM NA TVOJE ODPOVĚDI A PAK RYCHLE VYŘEŠÍME! 🔥**

**HLAVNĚ MI ŘEKNI:**
1. ✅ Funguje produkce?
2. ✅ Funguje lokál?
3. ✅ Screenshot errorů?

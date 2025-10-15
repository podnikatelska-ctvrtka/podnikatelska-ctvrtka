# 🔍 DIAGNÓZA AKTUÁLNÍHO STAVU

## 📊 CO MÁME LOKÁLNĚ TEĎKA:

### ✅ **FUNGUJÍCÍ KOMPONENTY (s Motion):**
- `/components/HeroSection.tsx` - MÁ Motion import ✅
- Landing page komponenty - pravděpodobně OK ✅

### ❌ **KURZ KOMPONENTY (BEZ Motion):**
- `/components/CourseDemoV3.tsx` - NEMÁ Motion import ❌
- `/components/GuidedTour.tsx` - NEMÁ Motion import ❌
- `/components/BusinessModelCanvasSimple.tsx` - NEMÁ Motion import ❌
- `/components/AchievementNotification.tsx` - ? (zkontrolovat)
- `/components/AutosaveIndicator.tsx` - ? (zkontrolovat)

### ✅ **DATABÁZE (SPRÁVNÉ názvy tabulek):**
- `user_canvas_data` ✅
- `user_progress` ✅
- `user_vpc_data` ✅

---

## 🎯 CO SE STALO:

### **TIMELINE:**

1. **DŘÍVE:** Kurz fungoval s Motion animacemi
2. **VČERA:** Dělali jsme FAPI, GoPay, reklamy (funkční)
3. **DNES:** Začaly Motion errory
4. **POKUS O FIX:** Odstranili Motion z kurz komponent
5. **VÝSLEDEK:** Kurz se nezobrazuje správně (chybí popupy, animace)
6. **POKUS 2:** Načetl starý ZIP
7. **NOVÝ PROBLÉM:** Starý ZIP má staré názvy tabulek (`business_canvas_sections`)

---

## 🚨 AKTUÁLNÍ PROBLÉMY:

### **A) Motion errory (původní problém):**
```
Warning: Encountered two children with the same key
at AnimatePresence
at GuidedTour
```

**Příčina:** Pravděpodobně duplicitní key v AnimatePresence

### **B) Starý ZIP má staré tabulky:**
```
404: business_canvas_sections (neexistuje!)
400: course_progress (špatný formát)
```

**Příčina:** ZIP je ze starší verze před změnou názvů tabulek

---

## 🎯 DVĚ MOŽNÁ ŘEŠENÍ:

### **ŘEŠENÍ A: OPRAVIT MOTION ERROR (DOPORUČUJI!)**

**Logika:**
1. ✅ Aktuální lokální verze má SPRÁVNÉ názvy tabulek
2. ✅ Problém je JEN Motion warning (ne chyba!)
3. ✅ Opravíme Motion warning → kurz bude fungovat
4. ✅ Push na Netlify → HOTOVO!

**Kroky:**
1. Vrátit Motion import do kurz komponent
2. Opravit duplicitní key v GuidedTour
3. Test lokálně
4. Push na Netlify

**ČAS:** 30 minut  
**RIZIKO:** Nízké (víme kde je problém)

---

### **ŘEŠENÍ B: NAJÍT NOVĚJŠÍ ZIP**

**Logika:**
1. Najít ZIP který má:
   - ✅ Motion funkční
   - ✅ SPRÁVNÉ názvy tabulek (`user_canvas_data`)
   - ✅ FAPI a GoPay nastavení
2. Obnovit z toho ZIPu

**Kroky:**
1. Prohlédnout všechny ZIPy
2. Najít ten správný
3. Extrahovat jen kurz komponenty
4. Nahradit lokálně
5. Test
6. Push

**ČAS:** 1-2 hodiny  
**RIZIKO:** Střední (nevíme který ZIP je ten pravý)

---

## ⚡ MŮJ NÁVRH: ŘEŠENÍ A

**PROČ:**
1. 🎯 Motion warning ≠ kritická chyba
2. 🎯 Víme přesně co je špatně (duplicitní key)
3. 🎯 Aktuální verze má správné tabulky
4. 🎯 Rychlejší než hledání ZIPu

**JAK:**
1. Podíváme se na GuidedTour kde je AnimatePresence
2. Najdeme duplicitní key
3. Opravíme
4. Vrátíme Motion do všech kurz komponent
5. Test → Push → HOTOVO!

---

## 🔧 CO POTŘEBUJU OD TEBE:

**VARIANTA A (DOPORUČUJI):**
- [ ] Souhlasíš s opravou Motion erroru?
- [ ] Máme jít tímto směrem?

**VARIANTA B:**
- [ ] Chceš raději hledat novější ZIP?
- [ ] Máš víc ZIPů na výběr?

---

**ŘEKNI MI CO ZVOLIT A PUSTÍME SE DO TOHO! 🚀**

# ✅ KURZ KOMPLETNÍ CHECKLIST - CO SE MÁ ZOBRAZIT

## 🎯 MODUL 1: Základy byznys modelu (9 lekcí)

Každá lekce v Modulu 1 MÁ:

### **Struktura každé lekce:**

1. ✅ **Lesson Header** (modrý gradient box)
   - Číslo lekce (např. "Lekce 1 z 9")
   - Název lekce (h2)
   - Popis lekce
   - Zelený checkmark pokud dokončeno

2. ✅ **Video Section** (pokud má videoUrl)
   - Play ikona
   - Nadpis "Výuková lekce"
   - Iframe s videem

3. ✅ **Text Content**
   - Buď LessonContentRenderer (s examples/tips)
   - Nebo plain HTML content
   - **VŠECHNY LEKCE MAJÍ CONTENT!**

4. ✅ **Examples** (v LessonContentRenderer)
   - ExampleComparison komponenta
   - Good/Bad příklady (zelené/červené)
   - **NEZÁVISLÉ NA MOTION!**

5. ✅ **Interactive Demo** (některé lekce)
   - InteractiveDemoSelector
   - **OPRAVENO - BEZ MOTION!**

6. ✅ **Tips Section** (collapsible)
   - Žluté pozadí
   - Lightbulb ikona
   - Rozbalovací tipy
   - **SKRYTÉ v Modulu 1** (hideTips=true)

7. ✅ **CTA Box "Teď to zkus!"** (fialový gradient)
   - Desktop verze (hidden md:block)
   - Text "Praktické cvičení"
   - Tlačítko "Začít cvičení →"
   - **OPRAVENO - BEZ MOTION!**

8. ✅ **Mobile Canvas Section**
   - MobileSingleSection komponenta
   - Umožňuje přidávat položky
   - **FUNGUJE!**

9. ✅ **GuidedTour Popup** (když se otevře Canvas)
   - Tmavý overlay
   - Bílý popup s tipy
   - Scrollovatelný content
   - **OPRAVENO - BEZ MOTION!**

10. ✅ **Canvas Fullscreen Mode**
    - BusinessModelCanvasSimple
    - Zelený completion banner když má položky
    - Tlačítka "Zpět na lekci" a "Pokračovat"
    - **OPRAVENO - BEZ MOTION!**

---

## 🎯 MODUL 2: Pokročilé nástroje (4 lekce)

### **Lekce 10: Canvas Validator** (id: 10)
✅ **Co se má zobrazit:**
- CanvasValidator komponenta
- Analýza všech 9 sekcí Canvas
- Bodování + doporučení
- Tlačítko "Pokračovat na další lekci"

### **Lekce 11: Profit Calculator** (id: 11)
✅ **Co se má zobrazit:**
- ProfitCalculator komponenta
- Zadávání příjmů a nákladů
- Výpočet zisku
- Graf příjmů/nákladů
- Tlačítko "Pokračovat na další lekci"

### **Lekce 12: Problem Solver** (id: 12)
✅ **Co se má zobrazit:**
- ProblemSolver komponenta
- Seznam běžných problémů
- Řešení s odkazem na Canvas sekce
- Tlačítko "Pokračovat na další lekci"

### **Lekce 13: Business Model Gallery** (id: 13)
✅ **Co se má zobrazit:**
- BusinessModelGallery komponenta
- Příklady úspěšných byznys modelů
- ReadOnlyBusinessModelCanvas pro každý příklad
- Tlačítko "Pokračovat na další lekci"

---

## 🎯 MODUL 3: Value Proposition Canvas (3 lekce)

### **Lekce 14: Customer Profile** (id: 14)
✅ **Co se má zobrazit:**
- VPCCustomerProfileStory komponenta
- Výběr segmentu (SegmentSelector)
- 3 kroky: Jobs, Pains, Gains
- Kruhový canvas s položkami
- Auto-přechod na další lekci po dokončení

### **Lekce 15: Value Map** (id: 15)
✅ **Co se má zobrazit:**
- VPCValueMapSquare komponenta
- Výběr hodnoty (produktu/služby)
- 3 kroky: Products, Pain Relievers, Gain Creators
- Čtvercový canvas s položkami
- Auto-přechod na další lekci po dokončení

### **Lekce 16: FIT Validator** (id: 16)
✅ **Co se má zobrazit:**
- FitValidatorV2 komponenta
- Propojení Customer Profile ↔ Value Map
- FIT Score (0-100%)
- Vizualizace FIT
- Achievement když FIT > 70%
- Dokončení celého kurzu! 🎉

---

## 🚫 CO BY NEMĚLO BÝT

### **Errory v Console:**
- ❌ `TypeError: Cannot read properties of null`
- ❌ `motion_react.js` errory
- ❌ 406 Supabase errory
- ❌ Blank screens
- ❌ "ReferenceError: motion is not defined"

### **Chybějící obsah:**
- ❌ Neviditelné headliny
- ❌ Prázdné CTA boxy
- ❌ Zmizející popupy
- ❌ Nefunkční interaktivní komponenty

---

## ✅ OPRAVENÉ KOMPONENTY (BEZ MOTION)

1. ✅ CourseDemoV3.tsx (10 motion.div odstraněno)
2. ✅ BusinessModelCanvasSimple.tsx
3. ✅ ExampleComparison.tsx
4. ✅ AutosaveIndicator.tsx
5. ✅ LessonContentRenderer.tsx (INCLUDING showDemo fix!)
6. ✅ SimpleDashboard.tsx
7. ✅ GuidedTour.tsx (popup s tipy!)

---

## 🧪 TESTOVACÍ SCÉNÁŘ

### **1. Modul 1 - Lekce 1:**
```
1. Otevři /kurz?dev=true
2. Vyber "Modul 1" → "Lekce 1"
3. MĚLO BY SE ZOBRAZIT:
   ✅ Modrý header s "Zákaznické segmenty"
   ✅ Video iframe
   ✅ Textový obsah
   ✅ Příklady (dobré/špatné)
   ✅ Fialový CTA box "Teď to zkus!"
4. Klikni "Začít cvičení"
5. MĚLO BY SE ZOBRAZIT:
   ✅ GuidedTour popup s tipy
   ✅ Tmavý overlay
6. Zavři popup (křížek)
7. MĚLO BY SE ZOBRAZIT:
   ✅ BusinessModelCanvas fullscreen
   ✅ Sekce "Zákaznické segmenty" zvýrazněna
8. Přidej položku
9. MĚLO BY SE ZOBRAZIT:
   ✅ Zelený completion banner
   ✅ Tlačítko "Pokračovat na další lekci"
```

### **2. Modul 2 - Lekce 10:**
```
1. Vyber "Modul 2" → "Lekce 1: Validátor"
2. MĚLO BY SE ZOBRAZIT:
   ✅ CanvasValidator komponenta
   ✅ Analýza všech 9 sekcí
   ✅ Bodování a doporučení
   ✅ Tlačítko "Pokračovat"
3. Žádné blank screens!
```

### **3. Modul 3 - Lekce 14:**
```
1. Vyber "Modul 3" → "Lekce 1: Customer Profile"
2. MĚLO BY SE ZOBRAZIT:
   ✅ VPCCustomerProfileStory
   ✅ Výběr segmentu
   ✅ 3 kroky (Jobs, Pains, Gains)
   ✅ Kruhový canvas
3. Vyplň všechny 3 kroky
4. MĚLO BY:
   ✅ Auto-přejít na další lekci
   ✅ Zobrazit achievement notification
```

---

## 🔧 POKUD NĚCO NEFUNGUJE

### **A) Hard refresh:**
```
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

### **B) Clear všechno:**
```javascript
// V Console (F12):
localStorage.clear();
sessionStorage.clear();
location.reload(true);
```

### **C) Zkontroluj Console:**
- Otevři F12
- Podívej se na červené errory
- Screenshot a pošli mi!

---

## ✅ VÝSLEDEK

**CELÝ KURZ BY MĚL FUNGOVAT OD ZAČÁTKU DO KONCE:**

- ✅ Všechny lekce se zobrazují
- ✅ Všechny interaktivní komponenty fungují
- ✅ Všechny popupy se otevírají
- ✅ Všechny CTA boxy jsou viditelné
- ✅ Canvas funguje
- ✅ Progress se ukládá
- ✅ Achievements se odemykají
- ✅ ŽÁDNÉ MOTION CRASHE! 🎉

---

**TEĎKA REFRESH A OTESTUJ KAŽDOU LEKCI! 🚀**

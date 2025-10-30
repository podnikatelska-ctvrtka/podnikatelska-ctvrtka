# 📱 Mobile Work Plan - Aktuální Status

**Datum:** 2025-01-24  
**Status:** ✅ Module 1 V2 COMPLETE - Single Lesson View (NO DUPLICATES!)  
**Pravidlo:** Desktop NESAHAT, makat čistě na mobilu, pravidelně kontrolovat že desktop žije

---

## ✅ CO MÁME HOTOVO

### Struktura:
```
/components/mobile-course/
├── README.md                      ✅ Complete docs
├── MobileCourseModule1.tsx        ✅ Module 1 (9 lekcí BMC)
├── MobileCourseDashboard.tsx      ✅ Dashboard & Overview
└── MobileCourseSidebar.tsx        ✅ Hamburger navigation
```

### Integrace:
- ✅ `CourseDemoV3.tsx` má conditional render (< 768px)
- ✅ Breakpoint detection (isMobile state)
- ✅ Import všech 3 mobile komponent
- ✅ Helper funkce pro canvas update
- ✅ Helper funkce pro lesson complete
- ✅ Data synchronizace (desktop ↔ mobile)
- ✅ Achievements support
- ✅ Progress tracking
- ✅ Navigation flow (Dashboard → Sidebar → Module)

---

## 🎯 CO TEĎKA UDĚLAT

### KROK 1: OTESTOVAT MODULE 1 ⬅️ JSME TADY!

**Desktop test (MUSÍ fungovat jako dřív):**
```bash
npm run dev
# Otevři: http://localhost:5173/#course-v3?dev=true
# Zkontroluj:
- [ ] Sidebar vlevo funguje
- [ ] Lekce se zobrazují
- [ ] Canvas funguje (při cvičení)
- [ ] Progress tracking funguje
- [ ] Achievements fungují
```

**Mobile test (NOVÁ funkcionalita - Module 1 complete):**
```bash
npm run dev
# F12 → Ctrl+Shift+M → iPhone 12 Pro
# Otevři: http://localhost:5173/#course-v3?dev=true

✅ Dashboard:
- [ ] Progress bar se zobrazí
- [ ] Continue button funguje
- [ ] Moduly jsou vidět s progress
- [ ] Hamburger menu otevře sidebar

✅ Sidebar:
- [ ] Slide-in animation funguje
- [ ] Dashboard button funguje
- [ ] Moduly jdou expandovat
- [ ] Lekce jdou vybrat

✅ Module 1:
- [ ] Menu/Home buttons fungují
- [ ] Lekce jdou rozbalit
- [ ] Canvas se zobrazí
- [ ] Add/Remove items funguje
- [ ] Complete button funguje

✅ Data Sync:
- [ ] Canvas změny se uloží
- [ ] Progress se uloží
- [ ] Achievements se odemykají
```

**Očekáváno:**
1. ✅ Dashboard jako default screen
2. ✅ Sidebar slide-in menu
3. ✅ Module 1 má všech 9 lekcí
4. ⚠️ Module 2/3 = "Coming Soon" (normální)

---

## 📋 WORK QUEUE (co dělat dál)

### Priorita 1: Testování Module 1 ⬅️ TEĎKA!
- [ ] Otestovat v browser dev tools
- [ ] Otestovat na reálném mobilu (ngrok/localtunnel)
- [ ] Zkontrolovat canvas data sync
- [ ] Zkontrolovat haptic feedback
- [ ] Zkontrolovat progress tracking
- [ ] Zkontrolovat achievement triggering
- [ ] Bug fixes (pokud nějaké jsou)

### Priorita 2: Module 2 (VPC)
- [ ] Vytvořit `MobileCourseModule2.tsx`
- [ ] Integrace VPC komponenty (CustomerProfile, ValueMap)
- [ ] Segment selection
- [ ] Value selection
- [ ] Testování

### Priorita 3: Module 3 (FIT)
- [ ] Vytvořit `MobileCourseModule3.tsx`
- [ ] Integrace FIT Validator
- [ ] Coverage matrix (interactive)
- [ ] Scoring system
- [ ] Testování

### Priorita 4: Tools Integration
- [ ] Target Calculator
- [ ] Segment Size Tool
- [ ] Profit Calculator
- [ ] Business Action Plan

### Priorita 5: UX Polish
- [ ] Swipe navigation mezi lekcemi
- [ ] Pull-to-refresh
- [ ] Loading states
- [ ] Error handling
- [ ] Offline support

---

## 🚨 DESKTOP KONTROLY

**Po každé větší změně:**
1. Otevři desktop verzi
2. Zkontroluj že všechno funguje
3. Commit změny

**Kontrolní seznam:**
- [ ] Sidebar funguje
- [ ] Lekce fungují
- [ ] Canvas funguje
- [ ] Progress tracking funguje
- [ ] Achievements fungují
- [ ] Tools fungují

---

## 🔧 DEBUG COMMANDS

### Zjistit breakpoint:
```javascript
console.log('Width:', window.innerWidth);
// Mělo by být < 768 pro mobile
```

### Zjistit mobile state:
```javascript
console.log({
  isMobile,
  showMainDashboard,
  currentModule: currentModuleNumber,
  canvasData
});
```

### Zkontroluj canvas data:
```javascript
// V Dev Tools Console
console.log('Canvas sections:', canvasSections);
// Mělo by obsahovat pole s objekty { id, items }
```

---

## 📝 CHANGELOG

### 2025-01-24 - Initial Setup
- ✅ Created `/components/mobile-course/` folder
- ✅ Created `MobileCourseModule1.tsx`
- ✅ Integrated conditional render in `CourseDemoV3.tsx`
- ✅ Created documentation
- 🔄 **NEXT: Testing**

---

## 🎯 SUCCESS CRITERIA

Mobile verze je úspěšná když:
- ✅ Desktop funguje BEZ ZMĚN
- ✅ Mobile zobrazí accordion view
- ✅ Canvas funguje (add/remove)
- ✅ Progress tracking funguje
- ✅ Data se ukládají
- ✅ UX je smooth

---

## 📞 QUICK HELP

### Problem: Mobile view se nezobrazuje
→ Check: `window.innerWidth < 768`?  
→ Check: `isMobile = true`?  
→ Check: Import exists?

### Problem: Canvas nefunguje
→ Check: `canvasData` prop populated?  
→ Check: Supabase save successful?  
→ Check: Console errors?

### Problem: Desktop se rozbil
→ Zakomentuj `if (isMobile)` block  
→ Desktop bude fungovat jako dřív  
→ Debug mobile samostatně

---

## 🚀 NEXT ACTION

**TEĎKA:**
1. ✅ npm run dev
2. ✅ Otestuj desktop
3. ✅ Otestuj mobile (Dev Tools)
4. 📝 Report bugs (pokud nějaké jsou)
5. 🔧 Fix bugs
6. ✅ Commit working state
7. 🎯 Pokračuj na Module 2

---

**Last Updated:** 2025-01-24  
**Status:** Ready for testing

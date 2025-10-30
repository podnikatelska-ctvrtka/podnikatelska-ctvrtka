# 📱 Mobile Quick Test Guide

**Vytvořeno:** 2025-01-24  
**Status:** ✅ Ready to test

## 🎯 Co jsme implementovali

✅ **Nová složka:** `/components/mobile-course/`  
✅ **Mobilní komponenta:** `MobileCourseModule1.tsx`  
✅ **Integrace v CourseDemoV3:** Conditional render na breakpoint < 768px  
✅ **Dokumentace:** README a integration plan  

## 🧪 Jak testovat

### 1. Desktop test (zůstává nezměněno)

```bash
# Spusť dev server
npm run dev

# Otevři v browseru
http://localhost:5173/#course-v3?dev=true
```

**Očekávané chování:**
- ✅ Vidíš SOUČASNOU desktop verzi (sidebar vlevo)
- ✅ Lekce v středu, canvas vpravo
- ✅ Všechny funkce fungují jako dřív
- ✅ Žádné změny!

### 2. Mobile test (v Dev Tools)

```bash
# Stejný server
npm run dev
```

**V browseru:**
1. Otevři Dev Tools (F12)
2. Klikni na "Toggle device toolbar" (Ctrl+Shift+M)
3. Vyber "iPhone 12 Pro" nebo jiný mobil
4. Otevři `http://localhost:5173/#course-v3?dev=true`

**Očekávané chování:**
- ✅ Vidíš NOVOU accordion verzi
- ✅ Dashboard se NEZOBRAZÍ (přeskočí se)
- ✅ Rovnou vidíš Module 1 v accordion view
- ✅ Každá lekce je rozbalovací sekce
- ✅ Canvas je integrovaný v lekci
- ✅ Bottom sheet pro přidávání položek

### 3. Real mobile test (s ngrok)

```bash
# Terminál 1: Dev server
npm run dev

# Terminál 2: ngrok
ngrok http 5173
```

**Na mobilu:**
1. Otevři URL z ngrok (např. `https://xxxx.ngrok.io`)
2. Přidej `/#course-v3?dev=true`
3. Testuj accordion view

## 🔍 Co kontrolovat

### Desktop checklist:
- [ ] Sidebar vlevo funguje
- [ ] Lekce se zobrazují správně
- [ ] Canvas funguje
- [ ] Progress tracking funguje
- [ ] Achievements fungují
- [ ] Autosave funguje

### Mobile checklist:
- [ ] Accordion view se zobrazí
- [ ] Dashboard se přeskočí
- [ ] Lekce jdou rozbalit/zabalit
- [ ] Canvas bottom sheet se otevře
- [ ] Položky jdou přidat/odstranit
- [ ] Checkmarks fungují (dokončené lekce)
- [ ] Lock funguje (zamčené lekce)

## 🚨 Known Issues

### 1. Dashboard se přeskakuje
**Očekávané:** Mobile verze rovnou otevře Module 1 (bez dashboardu).  
**Proč:** Dashboard ještě není implementovaný pro mobile.  
**Fix:** Budeme dělat později `MobileCourseDashboard.tsx`

### 2. Module 2 a 3 nejsou hotové
**Očekávané:** Zobrazí se "Coming Soon" placeholder.  
**Proč:** Zatím máme pouze Module 1.  
**Fix:** Postupně doplníme `MobileCourseModule2.tsx` a `MobileCourseModule3.tsx`

### 3. Canvas data se možná neloadují
**Možný problém:** `canvasSections` state může být prázdný na začátku.  
**Debug:** Zkontroluj console.log v `handleMobileCanvasUpdate`  
**Fix:** Možná budeme muset přidat `useEffect` pro loading dat

## 🐛 Debugging

### Pokud mobile view nefunguje:

1. **Zkontroluj breakpoint:**
```javascript
// V Dev Tools Console
console.log(window.innerWidth); // Mělo by být < 768
```

2. **Zkontroluj condition:**
```javascript
// V CourseDemoV3.tsx
console.log('isMobile:', isMobile);
console.log('showMainDashboard:', showMainDashboard);
console.log('showActionPlan:', showActionPlan);
console.log('showTool:', showTool);
```

3. **Zkontroluj import:**
```javascript
// Mělo by být v CourseDemoV3.tsx
import { MobileCourseModule1 } from "./mobile-course/MobileCourseModule1";
```

### Pokud canvas nefunguje:

1. **Zkontroluj data:**
```javascript
// V MobileCourseModule1.tsx handleCanvasUpdate
console.log('Canvas update:', { section, items });
```

2. **Zkontroluj Supabase:**
```javascript
// V Dev Tools → Network → XHR
// Měly by tam být POST requesty na /rest/v1/user_canvas_data
```

## 🎯 Next Steps

Po úspěšném testu Module 1:

### Priorita 1: Doladit Module 1
- [ ] Otestovat na reálném mobilu
- [ ] Zkontrolovat haptic feedback
- [ ] Zkontrolovat data persistence
- [ ] Zkontrolovat achievement triggering

### Priorita 2: Vytvořit Module 2
- [ ] `MobileCourseModule2.tsx` (VPC)
- [ ] Integrace VPC komponent
- [ ] Testování

### Priorita 3: Vytvořit Module 3
- [ ] `MobileCourseModule3.tsx` (FIT)
- [ ] Integrace FIT Validator
- [ ] Testování

### Priorita 4: Dashboard
- [ ] `MobileCourseDashboard.tsx`
- [ ] Overview všech modulů
- [ ] Progress tracking
- [ ] Quick actions

### Priorita 5: UX vylepšení
- [ ] Swipe navigation mezi lekcemi
- [ ] Pull-to-refresh
- [ ] Smooth animations
- [ ] Loading states

## 📚 Reference

- **Desktop code:** `/components/CourseDemoV3.tsx` (řádek 2063+)
- **Mobile code:** `/components/mobile-course/MobileCourseModule1.tsx`
- **Integration:** `/MOBILE_INTEGRATION_PLAN.md`
- **Architecture:** `/components/mobile-course/README.md`

## ✅ Success Criteria

Mobile verze je úspěšná když:
- ✅ Desktop verze funguje BEZ ZMĚN
- ✅ Mobile zobrazí accordion view
- ✅ Canvas funguje (add/remove items)
- ✅ Progress tracking funguje
- ✅ Data se ukládají do Supabase
- ✅ UX je plynulý (haptics, animations)

## 🚀 Deploy Checklist

Před nasazením na produkci:
- [ ] Desktop test prošel
- [ ] Mobile test prošel (Dev Tools)
- [ ] Real mobile test prošel (ngrok)
- [ ] Canvas data persistence funguje
- [ ] Achievements fungují
- [ ] Všechny 3 moduly hotové
- [ ] Dashboard hotový
- [ ] Error handling (offline, failed saves...)

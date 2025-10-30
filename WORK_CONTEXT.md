# 🎯 AKTUÁLNÍ PRACOVNÍ KONTEXT

**POSLEDNÍ UPDATE:** 24. ledna 2025 🎓 KURZ BACKUP VYTVOŘEN

---

## 🗂️ ARCHIVE SLOŽKA - SAFE ZONE!

**⚠️ KRITICKÉ PRAVIDLO:** `/ARCHIVE/` = NIKDY NEMAZAT!

### **CO JE V ARCHIVU:**
- `/ARCHIVE/course-components/` - 🎓 **NOVÉ!** Desktop kurz backup + mobile komponenty
  - `RESTORE_GUIDE.md` - JAK OBNOVIT desktop verzi
  - `QUICK_START.md` - Rychlý start pro práci s kurzem
  - `mobile/` - Mobile helper komponenty (accordion system)
- `/ARCHIVE/emails/` - Email sekvence (včetně placeholder pro ztracené!)
- `/ARCHIVE/ads/` - Reklamní strategie (ULTIMATE 13 ADS atd.)
- `/ARCHIVE/minikurz/` - Dokumentace 3-denního minikurzu
- `/ARCHIVE/strategy/` - Deployment strategie, roadmapy (TODO)
- `/ARCHIVE/docs/` - Důležité dokumenty a rozhodnutí (TODO)

### **PRAVIDLA:**
1. ❌ **NIKDY NEMAZAT** soubory z `/ARCHIVE/`
2. ❌ **NIKDY NEPŘEPISOVAT** existující soubory v archivu
3. ✅ **POUZE PŘIDÁVAT** nové verze s datem (např. `file_v2_2025-01-22.md`)
4. ✅ **AKTUALIZOVAT** `/ARCHIVE/INDEX.md` při přidání nových souborů

**Důvod:** Při cleanup byla ztracena původní email sekvence - to se už nesmí stát!

---

## ✅ CO SE PRÁVĚ TEĎ DĚLÁ

### **DESKTOP CANVAS LAYOUT - DOKONČENO ✅ + BACKUP VYTVOŘEN ✅**
- **Soubor:** `/components/CourseDemoV3.tsx` (2790 řádků) - **FUNKČNÍ VERZE!**
- **Úkol:** Optimalizace Business Model Canvas pro desktop view
- **Status:** 
  - ✅ Canvas width: `max-w-[1600px]` POUZE pro Lekce 16 - HOTOVO (2025-01-20)
  - ✅ Lekce 16 (Interaktivní cvičení): `max-w-[1600px]` wide layout - HOTOVO
  - ✅ Lekce 10 (CanvasValidator): `max-w-6xl` + scaled canvas (75%) - HOTOVO
  - ✅ Canvas grid: `min-w-[1200px]` + padding v cvičení - HOTOVO
  - ✅ Canvas preview: `scale(0.75)` ve validátorech - HOTOVO
  - ✅ Žádný horizontal scrollbar! - HOTOVO (2025-01-20)
  - 🎓 **BACKUP VYTVOŘEN!** - HOTOVO (2025-01-24)
    - ✅ `/ARCHIVE/course-components/RESTORE_GUIDE.md`
    - ✅ `/ARCHIVE/course-components/QUICK_START.md`
    - ✅ `/ARCHIVE/course-components/mobile/` - Mobile helper komponenty připraveny
- **Další kroky:**
  1. ✅ ~~Vytvořit zálohu~~ - **HOTOVO! (2025-01-24)**
  2. 🔄 Testovat `MobileModule1Canvas.tsx` helper component
  3. 🔄 Implementovat mobile accordion view (bez ničení desktop verze!)

---

## ❌ CO SE TEĎKA NEDĚLÁ (DŮLEŽITÉ!)

### **MOBILNÍ LEKCE - NE TEĎ!**
- ❌ **NETÝKAT SE** mobilních lekcí v `/components/CourseDemoV3.tsx`
- ❌ **NETÝKAT SE** `MobileSingleSection.tsx`
- ❌ **NETÝKAT SE** `MobileCanvasAccordion.tsx`
- ❌ **NETÝKAT SE** mobile-specific CSS
- **Důvod:** Nejdřív dokončit a zapečetit desktop, pak řešit mobil samostatně
- **Kdy:** Po dokončení desktop layoutu a vytvoření zálohy

### **LANDSCAPE MODE - VYŘAZENO**
- ❌ **LANDSCAPE MODE JEN PRO DASHBOARD PREVIEW!**
- ❌ Lekce kurzu = **VŽDYCKY MOBILE VIEW** (portrait i landscape)
- ❌ Canvas interaktivní cvičení = desktop layout s `max-w-[1400px]`
- **Soubor:** `/LANDSCAPE_MODE_DECISION.md`

---

## 🔒 CO JE HOTOVO A NESMÍ SE MĚNIT

### **DESKTOP LAYOUT - FREEZE LIST ❄️**
1. ✅ **Normal lekce**: `max-w-6xl` (1152px) wrapper
2. ✅ **Wide layout**: `max-w-[1600px]` POUZE pro Lekce 16 (interaktivní cvičení)
3. ✅ **Lekce 16** (Canvas cvičení): Wide layout + full canvas
4. ✅ **Lekce 10** (CanvasValidator): Normal layout + scaled canvas 75%
5. ✅ **Canvas grid v cvičení**: `min-w-[1200px]` + `p-4` = 1232px
6. ✅ **Canvas preview ve validátoru**: `transform: scale(0.75)` - vejde se!
7. ✅ **Sidebar**: Skrytý POUZE během Lekce 16 (isInteractiveExercise)
8. ✅ **Achievement systém**: Desktop notifications, 100% funkční
9. ✅ **PWA**: Manifest, service worker, install prompt
10. ✅ **Dev token**: Testování bez platby (`DEV_MODE_SIMPLIFIED.md`)
11. ✅ **Žádný horizontal scroll!**: Cvičení i Validator fit perfectly

### **SOUBORY KTERÉ JSOU HOTOVÉ**
- `/components/CourseDemoV3.tsx` - **Desktop layout HOTOVO**
- `/components/BusinessModelCanvasSimple.tsx` - **Canvas HOTOVO**
- `/components/CourseSidebar.tsx` - **Sidebar HOTOVO**
- `/components/SimpleDashboard.tsx` - **Dashboard HOTOVO**
- `/components/CanvasValidator.tsx` - **Validator HOTOVO**
- `/components/ProfitCalculator.tsx` - **Calculator HOTOVO**
- `/components/FitValidatorV2.tsx` - **FIT Validator HOTOVO**
- `/components/BusinessActionPlan.tsx` - **Action Plan HOTOVO**
- `/lib/achievements.ts` - **Achievement systém HOTOVO**

---

## 📅 CO SE BUDE DĚLAT PŘÍŠTĚ

### **PO DOKONČENÍ DESKTOPU:**
1. **Záloha:** Vytvořit Git commit s tagováním "desktop-freeze-v1"
2. **Dokumentace:** Updatovat `DESKTOP_ACHIEVEMENT_SYSTEM.md`
3. **Testing:** Kompletní test desktop flow od začátku do konce

### **PAK MOBILNÍ CANVAS:**
1. Vyřešit mobilní canvas layout (`MobileSingleSection.tsx`)
2. Zajistit aby mobilní změny NEOVLIVNILY desktop
3. Použít media queries pro oddělení desktop/mobile
4. Otestovat na reálných zařízeních

---

## 🎯 KLÍČOVÁ PRAVIDLA

### **KDYŽ PÍŠEŠ KÓD:**
1. ✅ **Desktop first** - pracujeme na desktop verzi
2. ❌ **Nemixovat** desktop a mobile změny ve stejném commitu
3. 🔒 **Freeze** - když je něco hotovo, nedělat cosmetic changes
4. 📝 **Update tento soubor** po každé větší změně

### **KDYŽ SI NEVÍM RADY:**
1. 🤔 Přečti si tento soubor znovu
2. 📖 Zkontroluj `/LANDSCAPE_MODE_DECISION.md`
3. 📖 Zkontroluj `/DESKTOP_ACHIEVEMENT_SYSTEM.md`
4. ❓ Zeptej se uživatele: "Pracujeme na desktop nebo mobile?"

---

## 📊 TECHNICKÉ PARAMETRY

### **WIDE LAYOUT - POUZE Lekce 16 Cvičení (FINAL)**
```
Parent wrapper:    max-w-[1600px]
Outer padding:     px-6 = 48px total  
Available width:   1600 - 48 = 1552px
Canvas grid:       min-w-[1200px]
Canvas padding:    p-4 = 32px total
Canvas total:      1200 + 32 = 1232px
Reserve:           1552 - 1232 = 320px ✅ PERFEKTNÍ!
```

### **NORMAL LEKCE - včetně Lekce 10 Validator (FINAL)**
```
Parent wrapper:    max-w-6xl (1152px)
Outer padding:     px-6 = 48px total
Available width:   1152 - 48 = 1104px
Content:           prose + forms + lists

VALIDATOR PREVIEW:
Canvas scale:      transform: scale(0.5) - zmenšený na 50% (jako produkce!)
Canvas width:      1200px → 600px (po scale)
Fits in:           1104px available ✅ PERFEKTNÍ!
Celý canvas:       Viditelný kompletně ✅
```

---

## 🚨 RED FLAGS - WARNINGS

Pokud vidíš:
- 🚫 "Změna mobilního layoutu" → STOP! Nejdřív freeze desktop!
- 🚫 "Landscape mode pro lekce" → STOP! Lekce = mobile view vždycky!
- 🚫 "Upravit global typography" → STOP! Může rozbít hotové komponenty!
- 🚫 "Přidat CSS do globals.css" → OPATRNĚ! Může ovlivnit všechno!

---

## 📝 CHANGELOG

### 2025-01-20 - DESKTOP CANVAS FREEZE ❄️
- ✅ Fixed canvas horizontal scrollbar (Lekce 16 - Cvičení)
- ✅ Fixed CanvasValidator horizontal scrollbar (Lekce 10)
- ✅ Created `requiresWideLayout` detection (POUZE pro cvičení)
- ✅ Parent wrapper: `max-w-[1600px]` POUZE pro Lekce 16
- ✅ Parent wrapper: `max-w-6xl` pro všechny ostatní lekce
- ✅ Canvas grid v cvičení: `min-w-[1200px]` + `p-4` = 1232px
- ✅ Canvas preview ve validátoru: `scale(0.5)` = 600px scaled width
- ✅ Lekce 10 má normální width, canvas je HODNĚ zmenšený (jako produkce!)
- ✅ Celý canvas viditelný v preview! 🎉
- ✅ Žádný horizontal scroll nikde! 🎉
- 📋 Created WORK_CONTEXT.md file for session memory
- ❄️ **DESKTOP LAYOUT FROZEN - DO NOT MODIFY!**

---

## 💡 JAK POUŽÍVAT TENTO SOUBOR

**Na začátku každé session:**
```
User: "Přečti si WORK_CONTEXT.md a řekni mi co máme na práci"
AI: *přečte soubor* "Pracujeme na DESKTOP canvas layoutu, 
     NEDOTÝKÁME SE mobilních lekcí..."
```

**Po větší změně:**
```
User: "Update WORK_CONTEXT.md - canvas layout je hotový"
AI: *updatuje Changelog a Status*
```

---

**KONEC KONTEXTU** ✅

# 📱 Mobile Course Components

**Vytvořeno:** 2025-01-24  
**Status:** ✅ Module 1 + Dashboard + Sidebar COMPLETE  
**Last Update:** 2025-01-24

## 📚 Quick Links
- [Integration Plan](/MOBILE_INTEGRATION_PLAN.md) - Jak integrovat
- [Quick Test Guide](/MOBILE_QUICK_TEST.md) - Jak testovat
- [Strategy](/MOBILE_STRATEGY_2025-01-24.md) - Celá strategie
- [Visual Flow](/MOBILE_VISUAL_FLOW.md) - Diagramy
- [Cheatsheet](/MOBILE_CHEATSHEET.md) - Quick reference
- [Summary](/HOTOVO_MOBILE_V1.md) - Co je hotovo

## 📋 Účel

Kompletně nové mobilní komponenty pro kurz "Podnikatelská Čtvrtka".
Desktop verze zůstává v `CourseDemoV3.tsx`, mobilní verze používá tyto komponenty.

## 🏗️ Struktura

```
mobile-course/
├── README.md                      (tento soubor)
├── MobileCourseDashboard.tsx      ✅ HOTOVO - Dashboard & Overview
├── MobileCourseSidebar.tsx        ✅ HOTOVO - Navigační menu + Tools
├── MobileCourseModule1.tsx        ✅ HOTOVO - BMC (9 lekcí)
├── MobileCourseModule2.tsx        ✅ HOTOVO - Optimalizace BMC (4 lekce)
├── MobileCourseModule3.tsx        ✅ HOTOVO - VPC + FIT (3 lekce)
├── MobileVPCCustomerProfile.tsx   ✅ HOTOVO - Lekce 14 (Zákaznický profil)
├── MobileVPCValueMap.tsx          ✅ HOTOVO - Lekce 15 (Hodnotová mapa)
├── MobileFitValidator.tsx         ✅ HOTOVO - Lekce 16 (FIT Validator) + CTA
├── MobileFitStepInstructions.tsx  ✅ HOTOVO - Instrukce pro FIT Validator (3 kroky)
├── MobileToolsSection.tsx         ✅ HOTOVO - Seznam nástrojů
└── MobileBusinessActionPlan.tsx   ✅ HOTOVO - Akční plán
```

## 📦 Komponenty

### 1. MobileCourseDashboard.tsx ✅ HOTOVO
Hlavní dashboard s přehledem pokroku.

**Features:**
- ✅ Celkový progress bar
- ✅ Continue button
- ✅ Achievements preview
- ✅ Seznam modulů s individuálním progress
- ✅ Locked/Unlocked moduly
- ✅ Motivační zprávy
- ✅ Hamburger menu button

**Props:**
```tsx
{
  userId: string;
  modules: Module[];
  completedLessons: Set<string>;
  currentModuleId: number;
  currentLessonIndex: number;
  onContinue: () => void;
  onSelectModule: (moduleId: number) => void;
  unlockedAchievements?: Set<string>;
  onOpenSidebar?: () => void;
}
```

### 2. MobileCourseSidebar.tsx ✅ HOTOVO
Slide-in navigační menu.

**Features:**
- ✅ Slide-in animation (overlay)
- ✅ Progress bar v headeru
- ✅ Dashboard button
- ✅ Expandable moduly
- ✅ Seznam lekcí s checkmarks
- ✅ Locked/Unlocked indikace
- ✅ Haptic feedback

**Props:**
```tsx
{
  isOpen: boolean;
  onClose: () => void;
  modules: Module[];
  currentModuleId: number;
  currentLessonIndex: number;
  completedLessons: Set<string>;
  onSelectLesson: (moduleId, lessonIndex) => void;
  onShowDashboard: () => void;
  showingDashboard?: boolean;
  totalLessons: number;
  completedCount: number;
}
```

### 3. MobileCourseModule1.tsx ✅ HOTOVO
Modul 1 - Business Model Canvas (zobrazuje JEDNU aktivní lekci).

**Features:**
- ✅ Single lesson view (ne accordion!)
- ✅ Integrovaný canvas pro aktivní lekci
- ✅ Progress tracking
- ✅ Complete button
- ✅ Previous/Next navigace
- ✅ Haptic feedback
- ✅ Header s Menu + Home buttons

**Props:**
```tsx
{
  moduleData: Module;
  canvasData: CanvasData;
  onCanvasUpdate: (section, items) => void;
  completedLessons: Set<string>;
  onLessonComplete: (lessonId) => void;
  currentLessonIndex: number;
  onLessonChange?: (index) => void;
  onOpenSidebar?: () => void;
  onOpenDashboard?: () => void;
}
```

## 🔗 Integrace v CourseDemoV3.tsx

```tsx
// 1. IMPORTS
import { MobileCourseModule1 } from "./mobile-course/MobileCourseModule1";
import { MobileCourseDashboard } from "./mobile-course/MobileCourseDashboard";
import { MobileCourseSidebar } from "./mobile-course/MobileCourseSidebar";

// 2. MOBILE DETECTION
const isMobile = window.innerWidth < 768;

// 3. CONDITIONAL RENDER
if (isMobile) {
  return (
    <>
      {/* SIDEBAR */}
      <MobileCourseSidebar
        isOpen={showMobileSidebar}
        onClose={() => setShowMobileSidebar(false)}
        {...props}
      />
      
      {/* DASHBOARD */}
      {showMainDashboard && (
        <MobileCourseDashboard
          onOpenSidebar={() => setShowMobileSidebar(true)}
          {...props}
        />
      )}
      
      {/* MODULE 1 */}
      {!showMainDashboard && currentModuleNumber === 1 && (
        <MobileCourseModule1
          onOpenSidebar={() => setShowMobileSidebar(true)}
          onOpenDashboard={() => setShowMainDashboard(true)}
          {...props}
        />
      )}
    </>
  );
}

// Desktop continues as normal...
```

## 🎯 Navigation Flow

```
📱 Mobile Navigation Flow:

START: Dashboard
    │
    ├── [Hamburger Menu] → Sidebar
    │   ├── [Dashboard] → Dashboard
    │   ├── [Module] → Expand lessons
    │   └── [Lesson] → Zobrazí obsah lekce
    │
    ├── [Continue Button] → Aktuální lekce
    │
    └── [Select Module] → První lekce modulu

LESSON VIEW (Single Lesson):
    │
    ├── [Menu Icon] → Sidebar
    ├── [Home Icon] → Dashboard
    ├── [Previous] → Předchozí lekce
    ├── [Next] → Další lekce
    └── Content:
        ├── Text lekce
        ├── Canvas sekce
        └── Complete button
```

## 📊 Data Synchronizace

### Canvas Data
- **Desktop i Mobile** používají **STEJNÝ STATE** (`canvasSections`)
- Update: `handleMobileCanvasUpdate()` callback
- Auto-save: Supabase (`user_canvas_data`)

### Progress Data
- **Desktop i Mobile** používají **STEJNÝ STATE** (`completedLessons`)
- Update: `handleMobileLessonComplete()` callback
- Auto-save: Supabase (`saveLessonProgress()`)

### Achievements
- Sdílené: `unlockedAchievements` state
- Zobrazení: `AchievementNotification` component
- Funguje na obou platformách

### Formát dat
Desktop používá: `completedLessons: Set<number>` (lesson IDs)
Mobile používá: `completedLessons: Set<string>` (format: "moduleId-lessonId")

**Konverze v CourseDemoV3:**
```tsx
const completedLessonsStrings = new Set(
  Array.from(completedLessons).map(id => {
    // Find module for this lesson
    for (const module of allModules) {
      const lesson = module.lessons.find(l => l.id === id);
      if (lesson) return `${module.id}-${id}`;
    }
    return '';
  }).filter(Boolean)
);
```

## 🎨 Design Pattern

### Status Icons
- 🔒 **Lock** - Lekce/modul zamčený
- ▶️ **Play** - Lekce dostupná
- ✅ **CheckCircle** - Lekce/modul dokončený

### Colors
- **Blue** - Primární akce, aktivní modul
- **Green** - Dokončeno, success
- **Gray** - Zamčeno, disabled
- **Amber** - Achievements, důležité
- **Purple** - Sekundární akce

### Haptic Feedback
- `haptic('light')` - Kliknutí, expand/collapse
- `haptic('medium')` - Navigace, select lesson
- `haptic('success')` - Complete lesson
- `haptic('error')` - Locked action attempt

## 🚀 Roadmap

### ✅ Dokončeno (Module 1)
- [x] MobileCourseModule1.tsx - BMC accordion
- [x] MobileCourseDashboard.tsx - Overview
- [x] MobileCourseSidebar.tsx - Navigation
- [x] Integrace do CourseDemoV3.tsx
- [x] Data synchronizace
- [x] Progress tracking
- [x] Canvas integration

### ✅ Dokončeno (Module 2 & 3)
- [x] MobileCourseModule2.tsx - Optimalizace BMC
- [x] MobileCourseModule3.tsx - VPC + FIT Validator
- [x] Tools integration (Validator, Profit Calculator, Problem Solver, Gallery)
- [x] VPC canvases (Customer Profile, Value Map)
- [x] FIT Validator integration

### ✅ Dokončeno (Tools & Action Plan)
- [x] MobileToolsSection.tsx - Seznam nástrojů
- [x] MobileBusinessActionPlan.tsx - Akční plán
- [x] MobileCourseSidebar - Tools sekce
- [x] MobileFitValidator - CTA button

### ⏳ TODO (Integration)
- [ ] Integrace tools do CourseDemoV3.tsx (viz `/MOBILE_TOOLS_QUICK_INTEGRATION.md`)

### 🔄 TODO (Enhancements)
- [ ] Swipe navigation mezi lekcemi
- [ ] Pull-to-refresh
- [ ] Better error handling
- [ ] Offline mode improvements

## 🧪 Testing

### Local Testing
```bash
# 1. Start dev server
npm run dev

# 2. Test v browseru
# Desktop: http://localhost:5173/#course-v3?dev=true
# Mobile: F12 → Ctrl+Shift+M → iPhone 12 Pro

# 3. Real device testing (ngrok)
ngrok http 5173
# Otevři ngrok URL na mobilu
```

### Test Checklist
```
✅ Dashboard:
  - [ ] Progress bar se zobrazuje
  - [ ] Continue button funguje
  - [ ] Moduly jdou vybrat
  - [ ] Hamburger menu otevírá sidebar
  - [ ] Achievements se zobrazují

✅ Sidebar:
  - [ ] Slide-in animation funguje
  - [ ] Overlay se zavírá při kliku
  - [ ] Dashboard button funguje
  - [ ] Moduly jdou expandovat
  - [ ] Lekce jdou vybrat
  - [ ] Progress se zobrazuje

✅ Module 1:
  - [ ] Header buttons (Menu + Home) fungují
  - [ ] Lekce jdou rozbalit
  - [ ] Canvas se zobrazuje
  - [ ] Add/Remove items funguje
  - [ ] Complete button funguje
  - [ ] Lock logika funguje

✅ Data Sync:
  - [ ] Canvas změny se ukládají
  - [ ] Progress se ukládá
  - [ ] Achievements se odemykají
  - [ ] Desktop a mobile sdílejí data
```

## 🐛 Known Issues

Žádné známé problémy v současné verzi.

## 📝 Notes

- **Mobile breakpoint:** `< 768px` (Tailwind md:)
- **Desktop zůstává nedotčený** - žádné změny v desktop kódu
- **Data jsou sdílená** - real-time sync mezi platformami
- **Auto-save vše** - canvas i progress
- **Sequential unlock** - lekce se odemykají postupně
- **Module unlock** - modul 2 se odemkne až po dokončení modulu 1

## 🎯 Cíl projektu

Mobilní verze kurzu která:
- ✅ Je rychlá a responzivní
- ✅ Používá accordion pattern (intuitivní UX)
- ✅ Sdílí 100% dat s desktop verzí
- ✅ Má stejnou funkcionalitu jako desktop
- ✅ Je optimalizovaná pro touch (haptic, swipe...)
- ✅ Má skvělý UX (smooth animations, clear navigation)
- ✅ Auto-save (žádné ztráty dat)

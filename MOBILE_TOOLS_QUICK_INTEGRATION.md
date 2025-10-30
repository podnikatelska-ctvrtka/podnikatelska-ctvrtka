# ⚡ MOBILE TOOLS - Quick Integration Guide

**Copy-paste ready kod pro CourseDemoV3.tsx**

## 📋 KROK 1: Imports

Přidej na začátek souboru (vedle ostatních mobile imports):

```typescript
import { MobileToolsSection } from "./mobile-course/MobileToolsSection";
import { MobileBusinessActionPlan } from "./mobile-course/MobileBusinessActionPlan";
```

## 📋 KROK 2: State

Přidej state pro currentTool (vedle ostatních useState):

```typescript
const [currentTool, setCurrentTool] = useState<string | null>(null);
```

## 📋 KROK 3: Handlers

Přidej tyto funkce (vedle ostatních handlers):

```typescript
// Handler pro výběr nástroje
const handleSelectTool = (toolId: string) => {
  setCurrentTool(toolId);
  setShowMainDashboard(false); // Hide dashboard
};

// Handler pro navigaci z Akčního plánu do lekce
const handleNavigateFromActionPlan = (lessonId: number) => {
  // Find module & lesson index by lessonId
  for (const module of allModules) {
    const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex !== -1) {
      setCurrentModuleNumber(module.id);
      setCurrentLessonIndex(lessonIndex);
      setCurrentTool(null); // Close tool
      setShowMainDashboard(false); // Go to lesson
      break;
    }
  }
};
```

## 📋 KROK 4: Update MobileCourseSidebar

Najdi kde renderuješ `<MobileCourseSidebar>` a přidej props:

```typescript
<MobileCourseSidebar
  isOpen={showMobileSidebar}
  onClose={() => setShowMobileSidebar(false)}
  modules={allModules}
  currentModuleId={currentModuleNumber}
  currentLessonIndex={currentLessonIndex}
  completedLessons={completedLessonsStrings}
  onSelectLesson={handleMobileSelectLesson}
  onShowDashboard={handleShowDashboard}
  showingDashboard={showMainDashboard}
  totalLessons={totalLessons}
  completedCount={completedLessons.size}
  onSelectTool={handleSelectTool}           // ← NOVÉ
  currentTool={currentTool}                  // ← NOVÉ
/>
```

## 📋 KROK 5: Render Tools

Najdi mobile render section (kde jsou MobileCourseModule1, MobileCourseModule2, atd.) a přidej PŘED moduly:

```typescript
{/* 🧮 TOOLS - Akční plán */}
{!showMainDashboard && currentTool === 'action-plan' && (
  <MobileBusinessActionPlan
    userId={userData?.id || ''}
    onNavigateToLesson={handleNavigateFromActionPlan}
    onAchievementUnlocked={triggerAchievement}
  />
)}

{/* 🧮 TOOLS - Kalkulačka zákazníků */}
{!showMainDashboard && currentTool === 'target-calculator' && (
  <div className="min-h-screen bg-gray-50 p-4">
    <div className="mb-4 flex items-center gap-3">
      <button
        onClick={() => setCurrentTool(null)}
        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <h1 className="text-xl font-bold">Kalkulačka zákazníků</h1>
    </div>
    <TargetCalculatorTool userId={userData?.id || ''} />
  </div>
)}

{/* 🧮 TOOLS - Velikost segmentu */}
{!showMainDashboard && currentTool === 'segment-size' && (
  <div className="min-h-screen bg-gray-50 p-4">
    <div className="mb-4 flex items-center gap-3">
      <button
        onClick={() => setCurrentTool(null)}
        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <h1 className="text-xl font-bold">Velikost segmentu</h1>
    </div>
    <SegmentSizeTool />
  </div>
)}
```

## 📋 KROK 6: Update MobileModule3 (optional)

Pokud chceš navigaci z FIT Validatoru do Akčního plánu, najdi kde renderuješ MobileCourseModule3 a přidej prop:

```typescript
<MobileCourseModule3
  moduleData={MODULE_3}
  // ... ostatní props
  onNavigateToTool={handleSelectTool}  // ← NOVÉ
/>
```

A v MobileCourseModule3.tsx přidej prop do MobileFitValidator:

```typescript
<MobileFitValidator
  // ... ostatní props
  onNavigateToTool={onNavigateToTool}  // ← NOVÉ
/>
```

## ✅ HOTOVO!

Teď máš:
- ✅ Nástroje v mobilním sidebaru
- ✅ Funkční Akční plán
- ✅ Navigaci mezi tools a lekcemi
- ✅ CTA button po dokončení FIT Validatoru

## 🧪 Quick Test

1. Otevři mobil (nebo DevTools → F12 → Ctrl+Shift+M)
2. Naviguj do kurzu: `/#course-v3?dev=true`
3. Otevři Menu (hamburger)
4. Rozbal "🧮 Nástroje"
5. Klikni na "🎯 Akční plán"
6. → Měl by se zobrazit MobileBusinessActionPlan

## 🐛 Troubleshooting

**Problem:** Sidebar nezobrazuje sekci Nástroje  
**Fix:** Zkontroluj že MobileCourseSidebar má prop `onSelectTool`

**Problem:** Akční plán je prázdný  
**Fix:** Potřebuješ mít dokončený FIT Validator (Lekce 16) s FIT data

**Problem:** Navigace do lekce nefunguje  
**Fix:** Zkontroluj `handleNavigateFromActionPlan` handler a `allModules` array

**Problem:** Tools se neukládají  
**Fix:** MobileBusinessActionPlan používá localStorage - zkontroluj userId

## 💡 Pro tips

- Použij `console.log('Current tool:', currentTool)` pro debugging
- Všechny tools sdílejí stejná data jako desktop verze
- Achievement system funguje automaticky
- Haptic feedback je zabudovaný ve všech mobilních komponentách

## 🎯 Next Level

Až bude základní integrace fungovat, můžeš přidat:
- Swipe-to-close gestures pro tools
- Progress persistence v tools
- More visual feedback
- Loading states pro data fetching

# 🔧 MOBILE SIDEBAR - Quick Fix

**Problém:** CourseDemoV3 má importované mobilní komponenty, ale nepoužívá je!  
**Řešení:** Potřebujeme najít kde se renderuje mobilní verze a vyměnit starý sidebar za nový.

## ✅ Co jsem opravil

### 1. MobileFitValidator - Tlačítko "Otevřít Akční plán"
- ✅ Přidán prop `onNavigateToTool?: (toolId: string) => void`
- ✅ Tlačítko nyní volá `onNavigateToTool('action-plan')` místo jen toast
- ✅ Fallback toast zůstává pokud prop není předán

## 🔍 Co potřebujeme najít

V `CourseDemoV3.tsx` musíme najít:

### 1. Kde se renderuje mobilní verze?
```typescript
// Hledáme něco jako:
if (isMobile) {
  return (...mobilní komponenty...)
}
// NEBO
{isMobile && (...mobilní komponenty...)}
// NEBO
<div className="md:hidden">...</div>
```

### 2. Kde se používá MobileSidebarContent?
```typescript
// Starý sidebar:
<MobileSidebarContent ... />

// Vyměnit za:
<MobileCourseSidebar ... />
```

## 🎯 Co přidat do CourseDemoV3.tsx

### KROK 1: State pro tools
```typescript
const [currentTool, setCurrentTool] = useState<string | null>(null);
```

### KROK 2: Handler pro výběr nástroje
```typescript
const handleSelectTool = (toolId: string) => {
  setCurrentTool(toolId);
  setShowMainDashboard(false); // nebo podobný state
};
```

### KROK 3: Vyměnit MobileSidebarContent za MobileCourseSidebar
```typescript
// ❌ STARÝ:
<MobileSidebarContent
  isOpen={showSidebar}
  onClose={() => setShowSidebar(false)}
  {...other props}
/>

// ✅ NOVÝ:
<MobileCourseSidebar
  isOpen={showSidebar}
  onClose={() => setShowSidebar(false)}
  modules={allModules}
  currentModuleId={currentModuleNumber}
  currentLessonIndex={currentLessonIndex}
  completedLessons={completedLessonsStrings}
  onSelectLesson={handleMobileSelectLesson}
  onShowDashboard={handleShowDashboard}
  showingDashboard={showMainDashboard}
  totalLessons={totalLessons}
  completedCount={completedLessons.size}
  onSelectTool={handleSelectTool}        // ← NOVÉ
  currentTool={currentTool}              // ← NOVÉ
/>
```

### KROK 4: Přidat render pro tools (před nebo za moduly)
```typescript
{/* TOOLS - Akční plán */}
{currentTool === 'action-plan' && (
  <MobileBusinessActionPlan
    userId={userData?.id || ''}
    onNavigateToLesson={handleNavigateFromActionPlan}
    onAchievementUnlocked={triggerAchievement}
  />
)}

{/* TOOLS - Ostatní */}
{currentTool === 'target-calculator' && (
  <div className="min-h-screen bg-gray-50 p-4">
    <div className="mb-4 flex items-center gap-3">
      <button onClick={() => setCurrentTool(null)} className="p-2">
        <ArrowLeft className="w-6 h-6" />
      </button>
      <h1>Kalkulačka zákazníků</h1>
    </div>
    <TargetCalculatorTool userId={userData?.id || ''} />
  </div>
)}
```

### KROK 5: Přidat onNavigateToTool do MobileModule3
```typescript
<MobileCourseModule3
  {...existing props}
  onNavigateToTool={handleSelectTool}  // ← NOVÉ
/>
```

A uvnitř MobileCourseModule3 předat do MobileFitValidator:
```typescript
<MobileFitValidator
  {...existing props}
  onNavigateToTool={onNavigateToTool}  // ← NOVÉ
/>
```

## 🔍 Debug pomocník

Pokud nevíš kde mobilní komponenty jsou, zkus:

### 1. Hledej "MobileSidebarContent" v CourseDemoV3.tsx
```bash
# V editoru:
Ctrl+F → "MobileSidebarContent"
```

### 2. Hledej conditional render pro mobil
```bash
# V editoru:
Ctrl+F → "isMobile"
Ctrl+F → "md:hidden"
Ctrl+F → "< 768"
```

### 3. Zkontroluj import
```bash
# Na začátku souboru by mělo být:
import { MobileCourseSidebar } from "./mobile-course/MobileCourseSidebar";
import { MobileBusinessActionPlan } from "./mobile-course/MobileBusinessActionPlan";
import { MobileToolsSection } from "./mobile-course/MobileToolsSection";
```

## 🎯 Očekávaný výsledek

Po opravě:
- ✅ Sidebar na mobilu má sekci "🧮 Nástroje"
- ✅ Po rozbalení vidíš 3 tools (Akční plán, Kalkulačka, Velikost)
- ✅ Kliknutí na "🎯 Akční plán" otevře MobileBusinessActionPlan
- ✅ Tlačítko "📋 Otevřít Akční plán" v FIT Validatoru přímo otevře Akční plán
- ✅ Jeden konzistentní sidebar (ne dva různé)

## 📸 Před vs. Po

**PŘED:**
- ❌ Sidebar bez nástrojů
- ❌ Dva různé sidebary
- ❌ Tlačítko "Otevřít Akční plán" jen ukazuje toast

**PO:**
- ✅ Sidebar se sekcí "🧮 Nástroje"
- ✅ Jeden konzistentní sidebar
- ✅ Tlačítko přímo otevře Akční plán

## 💡 Tip

Pokud nevíš kde přesně upravovat CourseDemoV3.tsx, pošli mi část kódu kde se renderuje mobilní verze a já ti pomohu!

---

**Status:** MobileFitValidator ✅ OPRAVENO  
**Zbývá:** Integrace do CourseDemoV3.tsx

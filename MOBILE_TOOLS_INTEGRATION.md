# 📱 MOBILE TOOLS - Integrace nástrojů a Akčního plánu

**Vytvořeno:** 2025-01-27  
**Status:** ✅ HOTOVO - Připraveno k integraci

## 🎯 Co bylo vytvořeno

### 1. ✅ MobileToolsSection.tsx
Mobilní seznam nástrojů (grid view).

**Features:**
- 🎯 Akční plán
- 🧮 Kalkulačka zákazníků  
- 📊 Velikost segmentu
- Haptic feedback
- Mobile-friendly design
- Color-coded cards

**Props:**
```tsx
{
  onSelectTool: (toolId: string) => void;
  onClose?: () => void;
}
```

### 2. ✅ MobileBusinessActionPlan.tsx
Mobilní verze Akčního plánu.

**Features:**
- ✅ Načítání TOP priorit z FIT data
- ✅ Generování action items
- ✅ Checkbox pro označení dokončení
- ✅ Progress tracking
- ✅ Collapsible backlog (TOP Pains, Gains, Jobs)
- ✅ Navigace do lekcí
- ✅ Achievement support
- ✅ LocalStorage persistence
- ✅ Haptic feedback

**Props:**
```tsx
{
  userId: string;
  onNavigateToLesson?: (lessonId: number) => void;
  onAchievementUnlocked?: (achievementId: string) => void;
}
```

### 3. ✅ MobileCourseSidebar - Tools sekce
Přidána sekce "Nástroje" do mobilního sidebaru.

**Features:**
- Collapsible tools list
- Active tool highlighting
- Smooth navigation
- Haptic feedback

**Nové props:**
```tsx
{
  onSelectTool?: (toolId: string) => void;
  currentTool?: string | null;
}
```

### 4. ✅ MobileFitValidator - CTA tlačítko
Přidán call-to-action po dokončení FIT Validace.

**Features:**
- Zobrazení CTA když fitScore > 0
- Toast s informací kde najít Akční plán
- Příprava na přímou navigaci (TODO prop)

## 📋 Co chybí k plné integraci

### V CourseDemoV3.tsx přidat:

```tsx
// 1. IMPORT mobilních tools komponent
import { MobileToolsSection } from "./mobile-course/MobileToolsSection";
import { MobileBusinessActionPlan } from "./mobile-course/MobileBusinessActionPlan";

// 2. STATE pro current tool
const [currentTool, setCurrentTool] = useState<string | null>(null);

// 3. Handler pro výběr nástroje
const handleSelectTool = (toolId: string) => {
  setCurrentTool(toolId);
  setShowMainDashboard(false); // Hide dashboard když zobrazujeme tool
};

// 4. Handler pro navigaci z Akčního plánu do lekce
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

// 5. V MobileCourseSidebar přidat props:
<MobileCourseSidebar
  // ... existing props
  onSelectTool={handleSelectTool}
  currentTool={currentTool}
/>

// 6. V mobile render section přidat conditional render pro tools:

{/* TOOLS - Akční plán */}
{!showMainDashboard && currentTool === 'action-plan' && (
  <MobileBusinessActionPlan
    userId={userData?.id || ''}
    onNavigateToLesson={handleNavigateFromActionPlan}
    onAchievementUnlocked={triggerAchievement}
  />
)}

{/* TOOLS - Seznam nástrojů */}
{!showMainDashboard && currentTool === 'tools-list' && (
  <MobileToolsSection
    onSelectTool={handleSelectTool}
    onClose={() => setCurrentTool(null)}
  />
)}

// NEBO kombinovaný view pro všechny tools
{!showMainDashboard && currentTool && (
  <div className="min-h-screen bg-gray-50">
    {currentTool === 'action-plan' && (
      <MobileBusinessActionPlan
        userId={userData?.id || ''}
        onNavigateToLesson={handleNavigateFromActionPlan}
        onAchievementUnlocked={triggerAchievement}
      />
    )}
    {currentTool === 'target-calculator' && (
      <div className="p-4">
        <TargetCalculatorTool userId={userData?.id || ''} />
      </div>
    )}
    {currentTool === 'segment-size' && (
      <div className="p-4">
        <SegmentSizeTool />
      </div>
    )}
  </div>
)}
```

### V MobileFitValidator.tsx přidat prop:

```tsx
// Props interface
interface MobileFitValidatorProps {
  // ... existing props
  onNavigateToTool?: (toolId: string) => void; // NEW
}

// V CTA button změnit onClick:
<button
  onClick={() => {
    haptic('medium');
    if (onNavigateToTool) {
      onNavigateToTool('action-plan');
    } else {
      toast.info('💡 Akční plán najdete v menu → Nástroje');
    }
  }}
  className="..."
>
  📋 Otevřít Akční plán
</button>
```

## 🎨 Tool IDs

```typescript
type ToolId = 
  | 'action-plan'          // MobileBusinessActionPlan
  | 'target-calculator'    // TargetCalculatorTool (desktop verze)
  | 'segment-size';        // SegmentSizeTool (desktop verze)
```

## 🔄 Navigation Flow

```
Dashboard
  ↓
[Menu] → Sidebar
  ↓
[🧮 Nástroje] → Expand
  ↓
[🎯 Akční plán] → MobileBusinessActionPlan
  ↓
[Přejít na Lekci 15] → Navigace do MobileCourseModule3
```

```
Lekce 16 (FIT Validator)
  ↓
[Dokončit lekci] → Achievement unlocked
  ↓
[📋 Otevřít Akční plán] → MobileBusinessActionPlan
  ↓
[Action Item] → Navigace do lekce
```

## 🧪 Testing Checklist

```
✅ MobileCourseSidebar:
  - [ ] Nástroje sekce se zobrazuje
  - [ ] Expanduje/collapse funguje
  - [ ] Kliknutí na nástroj otevře správný view
  - [ ] Active highlighting funguje
  - [ ] Haptic feedback funguje

✅ MobileBusinessActionPlan:
  - [ ] Načítá TOP priority z FIT data
  - [ ] Generuje action items
  - [ ] Checkbox označení funguje
  - [ ] Progress bar se aktualizuje
  - [ ] Backlog expand/collapse funguje
  - [ ] Navigace do lekcí funguje
  - [ ] Achievements se odemykají
  - [ ] LocalStorage persistence funguje

✅ MobileFitValidator:
  - [ ] CTA tlačítko se zobrazuje po validaci
  - [ ] Navigace do Akčního plánu funguje
  - [ ] Toast fallback funguje

✅ Tools Navigation:
  - [ ] Z dashboardu do sidebaru
  - [ ] Ze sidebaru do nástroje
  - [ ] Z nástroje zpět
  - [ ] Z FIT Validatoru do Akčního plánu
  - [ ] Z Akčního plánu do lekce
```

## 📊 Data Flow

```
FIT Validator (Lekce 16)
  ↓
Supabase: value_proposition_canvas.fit_validation_data
  ↓
MobileBusinessActionPlan.loadData()
  ↓
Extract TOP 3 Pains, Gains, Jobs
  ↓
Generate Action Items
  ↓
Display + Track Progress
```

## 🎯 Next Steps

1. ✅ **Vytvořeno:** Všechny mobilní komponenty
2. ⏳ **TODO:** Integrace do CourseDemoV3.tsx (použij code výše)
3. ⏳ **TODO:** Přidat prop `onNavigateToTool` do MobileModule3
4. ⏳ **TODO:** Testing na reálném zařízení

## 🐛 Known Issues

Žádné - komponenty jsou připravené k použití!

## 💡 Tips

- **Desktop Tools:** TargetCalculatorTool a SegmentSizeTool můžou použít desktop verze, jen je zabal do `<div className="p-4">` pro padding
- **Achievement System:** MobileBusinessActionPlan podporuje achievement callbacks - použij stejný `triggerAchievement` jako v ostatních lekcích
- **Data Sync:** Všechny tools používají stejná Supabase data jako desktop verze
- **LocalStorage:** Progress v Akčním plánu se ukládá per-user do localStorage s klíčem `action_plan_completed_${userId}`

## 📝 Summary

**Hotovo:**
- ✅ MobileToolsSection - seznam nástrojů
- ✅ MobileBusinessActionPlan - akční plán
- ✅ MobileCourseSidebar - tools sekce
- ✅ MobileFitValidator - CTA button

**Zbývá:**
- Integrace do CourseDemoV3.tsx (5 minut práce)
- Testing

**Impact:**
- Mobilní uživatelé budou mít přístup ke všem nástrojům
- Akční plán bude plně funkční na mobilu
- Seamless navigace mezi lekcemi a nástroji

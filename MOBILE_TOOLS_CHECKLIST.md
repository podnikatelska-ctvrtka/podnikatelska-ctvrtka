# ✅ MOBILE TOOLS - Integration Checklist

**Použij tento checklist při integraci do CourseDemoV3.tsx**

## 📋 KROK 1: Imports
```typescript
import { MobileToolsSection } from "./mobile-course/MobileToolsSection";
import { MobileBusinessActionPlan } from "./mobile-course/MobileBusinessActionPlan";
```
- [ ] Imports přidány na začátek souboru
- [ ] Žádné TypeScript errory

## 📋 KROK 2: State
```typescript
const [currentTool, setCurrentTool] = useState<string | null>(null);
```
- [ ] State přidán (vedle ostatních useState)
- [ ] TypeScript types jsou správné

## 📋 KROK 3: Handlers
```typescript
const handleSelectTool = (toolId: string) => {
  setCurrentTool(toolId);
  setShowMainDashboard(false);
};

const handleNavigateFromActionPlan = (lessonId: number) => {
  for (const module of allModules) {
    const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex !== -1) {
      setCurrentModuleNumber(module.id);
      setCurrentLessonIndex(lessonIndex);
      setCurrentTool(null);
      setShowMainDashboard(false);
      break;
    }
  }
};
```
- [ ] `handleSelectTool` přidán
- [ ] `handleNavigateFromActionPlan` přidán
- [ ] `allModules` existuje (nebo použij `[MODULE_1, MODULE_2, MODULE_3]`)
- [ ] Handlers fungují (otestuj console.log)

## 📋 KROK 4: Update MobileCourseSidebar
```typescript
<MobileCourseSidebar
  // ... existing props
  onSelectTool={handleSelectTool}
  currentTool={currentTool}
/>
```
- [ ] Props přidány do MobileCourseSidebar
- [ ] Žádné TypeScript errory
- [ ] Sidebar se renderuje

## 📋 KROK 5: Render Tools
```typescript
{/* TOOLS - Akční plán */}
{!showMainDashboard && currentTool === 'action-plan' && (
  <MobileBusinessActionPlan
    userId={userData?.id || ''}
    onNavigateToLesson={handleNavigateFromActionPlan}
    onAchievementUnlocked={triggerAchievement}
  />
)}

{/* TOOLS - Kalkulačka */}
{!showMainDashboard && currentTool === 'target-calculator' && (
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

{/* TOOLS - Velikost segmentu */}
{!showMainDashboard && currentTool === 'segment-size' && (
  <div className="min-h-screen bg-gray-50 p-4">
    <div className="mb-4 flex items-center gap-3">
      <button onClick={() => setCurrentTool(null)} className="p-2">
        <ArrowLeft className="w-6 h-6" />
      </button>
      <h1>Velikost segmentu</h1>
    </div>
    <SegmentSizeTool />
  </div>
)}
```
- [ ] Tools rendering přidán PŘED moduly
- [ ] `userData?.id` existuje
- [ ] `triggerAchievement` existuje
- [ ] `TargetCalculatorTool` a `SegmentSizeTool` jsou importované
- [ ] `ArrowLeft` icon je importován z lucide-react

## 📋 KROK 6: Optional - Update MobileModule3
```typescript
// V MobileCourseModule3.tsx
<MobileFitValidator
  // ... existing props
  onNavigateToTool={onNavigateToTool}
/>

// V CourseDemoV3.tsx
<MobileCourseModule3
  // ... existing props
  onNavigateToTool={handleSelectTool}
/>
```
- [ ] Prop přidán do MobileCourseModule3
- [ ] Prop předán do MobileFitValidator
- [ ] CTA button funguje

## 🧪 TESTING

### Basic Tests
- [ ] Aplikace se buildne bez errorů
- [ ] Aplikace běží na lokále
- [ ] Mobile view se zobrazuje (DevTools F12)
- [ ] Console nemá errory

### Sidebar Tests
- [ ] Hamburger menu otevírá sidebar
- [ ] Sekce "🧮 Nástroje" se zobrazuje
- [ ] Sekce lze expandovat/collapse
- [ ] 3 tools jsou vidět (Akční plán, Kalkulačka, Velikost)
- [ ] Kliknutí na tool zavře sidebar
- [ ] Active highlighting funguje

### Action Plan Tests
- [ ] Akční plán se otevře po kliknutí
- [ ] Progress bar se zobrazuje
- [ ] Action items se generují (pokud máš FIT data)
- [ ] Checkbox označení funguje
- [ ] LocalStorage ukládá progress
- [ ] Backlog lze expandovat
- [ ] TOP priority se zobrazují správně

### Navigation Tests
- [ ] Z Akčního plánu lze navigovat do lekce
- [ ] Z FIT Validatoru lze otevřít Akční plán
- [ ] Back navigation funguje
- [ ] Sidebar → Tool → Lesson flow funguje

### Achievement Tests
- [ ] První akce = achievement trigger
- [ ] 3 akce = achievement trigger  
- [ ] Všechny akce = achievement trigger
- [ ] Achievements se zobrazují (notification)

### Mobile Device Tests (Optional)
- [ ] Test na iPhone (Safari)
- [ ] Test na Android (Chrome)
- [ ] Haptic feedback funguje
- [ ] Touch targets jsou dost velké
- [ ] Smooth scrolling funguje

## 🐛 Common Issues

### Issue: Sidebar nezobrazuje nástroje
**Fix:** Zkontroluj že MobileCourseSidebar má props `onSelectTool` a `currentTool`

### Issue: Akční plán je prázdný
**Fix:** Potřebuješ dokončit FIT Validator (Lekce 16) s validními daty

### Issue: TypeError: Cannot read property 'id' of undefined
**Fix:** Zkontroluj že `userData` existuje před použitím `userData?.id`

### Issue: Navigace do lekce nefunguje
**Fix:** Zkontroluj že `allModules` obsahuje všechny moduly a `handleNavigateFromActionPlan` správně hledá lessonId

### Issue: Achievement se neodemyká
**Fix:** Zkontroluj že `triggerAchievement` je správně předán a že localStorage funguje

### Issue: Tools se neukládají
**Fix:** MobileBusinessActionPlan používá localStorage - zkontroluj browser permissions

## ✅ Final Check

Před commitem:
- [ ] Všechny TypeScript errory vyřešeny
- [ ] Console warnings vyřešeny
- [ ] Mobile view testován v DevTools
- [ ] Základní flow funguje (Sidebar → Tools → Action Plan)
- [ ] Code je formátovaný
- [ ] Comments jsou čitelné
- [ ] Dokumentace aktualizována

## 🚀 Ready to Deploy

Když všechny checkboxy výše jsou zaškrtnuté:
- [ ] Commit changes
- [ ] Push to repo
- [ ] Deploy to production
- [ ] Test na production URL
- [ ] Monitor Sentry errors
- [ ] Collect user feedback

## 📚 Reference

- Quick Guide: `/MOBILE_TOOLS_QUICK_INTEGRATION.md`
- Full Docs: `/MOBILE_TOOLS_INTEGRATION.md`
- Summary: `/MOBILE_TOOLS_COMPLETE_SUMMARY.md`
- Components: `/components/mobile-course/`

---

**Progress:** ☐☐☐☐☐☐ (0/6 kroků)  
**Status:** Not started  
**ETA:** 10-15 minut

**LET'S GO! 🚀**

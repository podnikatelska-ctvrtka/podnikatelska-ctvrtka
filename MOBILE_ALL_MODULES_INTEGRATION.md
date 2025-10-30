# 🚀 MOBILE MODULES INTEGRATION GUIDE

**Datum:** 2025-01-27  
**Status:** ✅ Všechny komponenty připravené, čeká integrace  
**Komponenty:** Module 1, 2, 3 + Dashboard + Sidebar

---

## ✅ CO MÁME HOTOVÉ

### Komponenty
- ✅ `MobileCourseDashboard.tsx` - Dashboard
- ✅ `MobileCourseSidebar.tsx` - Navigace
- ✅ `MobileCourseModule1.tsx` - BMC (9 lekcí)
- ✅ `MobileCourseModule2.tsx` - Optimalizace BMC (4 lekce)
- ✅ `MobileCourseModule3.tsx` - VPC + FIT (3 lekce)

### Features
- ✅ Single lesson view (žádný duplicitní accordion)
- ✅ Previous/Next navigace
- ✅ Canvas integration
- ✅ Tools integration (Validator, Calculator, atd.)
- ✅ VPC canvases (Customer Profile + Value Map)
- ✅ FIT Validator
- ✅ Progress tracking
- ✅ Haptic feedback

---

## 🔧 INTEGRACE DO CourseDemoV3.tsx

### KROK 1: Importy

Přidej na začátek `CourseDemoV3.tsx`:

```tsx
// Už máš:
import { MobileCourseModule1 } from "./mobile-course/MobileCourseModule1";
import { MobileCourseDashboard } from "./mobile-course/MobileCourseDashboard";
import { MobileCourseSidebar } from "./mobile-course/MobileCourseSidebar";

// PŘIDEJ TYTO 2:
import { MobileCourseModule2 } from "./mobile-course/MobileCourseModule2";
import { MobileCourseModule3 } from "./mobile-course/MobileCourseModule3";
```

### KROK 2: State pro VPC

V `CourseDemoV3.tsx` state sekci přidej (pokud tam ještě není):

```tsx
// VPC DATA (pro Module 3)
const [vpcCustomerData, setVpcCustomerData] = useState<any>({});
const [vpcValueData, setVpcValueData] = useState<any>({});
const [selectedVPCSegment, setSelectedVPCSegment] = useState<string>('');
const [selectedVPCValue, setSelectedVPCValue] = useState<string>('');
```

### KROK 3: VPC Update Handler

Přidej callback pro VPC update:

```tsx
const handleVPCUpdate = useCallback((section: 'customer' | 'value', data: any) => {
  if (section === 'customer') {
    setVpcCustomerData(data);
    // TODO: Save to Supabase
  } else {
    setVpcValueData(data);
    // TODO: Save to Supabase
  }
}, []);
```

### KROK 4: Conditional Render Mobile

V sekci kde renderuješ mobile (po `if (isMobile) {`), přidej Module 2 a 3:

```tsx
if (isMobile) {
  return (
    <>
      {/* SIDEBAR */}
      <MobileCourseSidebar
        isOpen={showMobileSidebar}
        onClose={() => setShowMobileSidebar(false)}
        modules={allModules}
        currentModuleId={currentModuleNumber}
        currentLessonIndex={currentLessonIndex}
        completedLessons={completedLessonsStrings}
        onSelectLesson={(moduleId, lessonIndex) => {
          setCurrentModuleNumber(moduleId);
          setCurrentLessonIndex(lessonIndex);
          setShowMainDashboard(false);
          setShowMobileSidebar(false);
        }}
        onShowDashboard={() => {
          setShowMainDashboard(true);
          setShowMobileSidebar(false);
        }}
        showingDashboard={showMainDashboard}
        totalLessons={totalLessons}
        completedCount={Array.from(completedLessons).length}
      />
      
      {/* DASHBOARD */}
      {showMainDashboard && (
        <MobileCourseDashboard
          userId={userData?.id || ''}
          modules={allModules.map(m => ({
            ...m,
            progress: calculateModuleProgress(m.id, completedLessons)
          }))}
          completedLessons={completedLessonsStrings}
          currentModuleId={currentModuleNumber}
          currentLessonIndex={currentLessonIndex}
          onContinue={() => {
            setShowMainDashboard(false);
          }}
          onSelectModule={(moduleId) => {
            setCurrentModuleNumber(moduleId);
            setCurrentLessonIndex(0);
            setShowMainDashboard(false);
          }}
          unlockedAchievements={unlockedAchievements}
          onOpenSidebar={() => setShowMobileSidebar(true)}
        />
      )}
      
      {/* MODULE 1: BMC */}
      {!showMainDashboard && currentModuleNumber === 1 && (
        <MobileCourseModule1
          moduleData={MODULE_1}
          canvasData={canvasData}
          onCanvasUpdate={handleMobileCanvasUpdate}
          completedLessons={completedLessonsStrings}
          onLessonComplete={handleMobileLessonComplete}
          currentLessonIndex={currentLessonIndex}
          onLessonChange={setCurrentLessonIndex}
          onOpenSidebar={() => setShowMobileSidebar(true)}
          onOpenDashboard={() => setShowMainDashboard(true)}
        />
      )}
      
      {/* MODULE 2: OPTIMALIZACE BMC */}
      {!showMainDashboard && currentModuleNumber === 2 && (
        <MobileCourseModule2
          moduleData={MODULE_2}
          canvasData={canvasData}
          onCanvasUpdate={handleMobileCanvasUpdate}
          completedLessons={completedLessonsStrings}
          onLessonComplete={handleMobileLessonComplete}
          currentLessonIndex={currentLessonIndex}
          onLessonChange={setCurrentLessonIndex}
          onOpenSidebar={() => setShowMobileSidebar(true)}
          onOpenDashboard={() => setShowMainDashboard(true)}
        />
      )}
      
      {/* MODULE 3: VPC + FIT */}
      {!showMainDashboard && currentModuleNumber === 3 && (
        <MobileCourseModule3
          moduleData={MODULE_3}
          vpcData={{
            customer: vpcCustomerData,
            value: vpcValueData
          }}
          onVPCUpdate={handleVPCUpdate}
          completedLessons={completedLessonsStrings}
          onLessonComplete={handleMobileLessonComplete}
          currentLessonIndex={currentLessonIndex}
          onLessonChange={setCurrentLessonIndex}
          onOpenSidebar={() => setShowMobileSidebar(true)}
          onOpenDashboard={() => setShowMainDashboard(true)}
          availableSegments={canvasData.segments || []}
          availableValues={canvasData.value || []}
          selectedSegment={selectedVPCSegment}
          onSelectSegment={setSelectedVPCSegment}
          selectedValue={selectedVPCValue}
          onSelectValue={setSelectedVPCValue}
        />
      )}
    </>
  );
}
```

### KROK 5: Calculate Module Progress

Přidej helper funkci (pokud tam ještě není):

```tsx
const calculateModuleProgress = (moduleId: number, completed: Set<number>) => {
  const module = allModules.find(m => m.id === moduleId);
  if (!module) return 0;
  
  const moduleLessons = module.lessons.map(l => l.id);
  const completedInModule = moduleLessons.filter(id => completed.has(id)).length;
  
  return Math.round((completedInModule / moduleLessons.length) * 100);
};
```

### KROK 6: All Modules Array

Ujisti se, že máš `allModules` array:

```tsx
const allModules = [MODULE_1, MODULE_2, MODULE_3];
const totalLessons = allModules.reduce((sum, m) => sum + m.lessons.length, 0);
```

---

## 🎯 TESTING CHECKLIST

Po integraci otestuj:

### Module 1 (BMC) ✅
```
- [ ] Dashboard → Continue → Module 1 se načte
- [ ] Lekce se zobrazí (single lesson view)
- [ ] Canvas funguje (add/remove items)
- [ ] Previous/Next navigace funguje
- [ ] Complete button označí lekci
- [ ] Menu button otevře sidebar
- [ ] Home button vrátí na dashboard
```

### Module 2 (Optimalizace) ✅
```
- [ ] Dashboard → Module 2 → První lekce se načte
- [ ] Lekce 1: CanvasValidator se zobrazí
- [ ] Lekce 2: ProfitCalculator se zobrazí a počítá
- [ ] Lekce 3: ProblemSolver se zobrazí
- [ ] Lekce 4: BusinessModelGallery se zobrazí
- [ ] Previous/Next funguje
- [ ] Complete button funguje
```

### Module 3 (VPC) ✅
```
- [ ] Dashboard → Module 3 → První lekce se načte
- [ ] Lekce 1: Customer Profile canvas se zobrazí
- [ ] Segment selector funguje
- [ ] Add/Remove items v Customer Profile
- [ ] Lekce 2: Value Map canvas se zobrazí
- [ ] Value selector funguje
- [ ] Add/Remove items v Value Map
- [ ] Lekce 3: FIT Validator se zobrazí
- [ ] FIT Validator počítá score
- [ ] Previous/Next funguje
```

### Navigation & State ✅
```
- [ ] Sidebar expanduje všechny 3 moduly
- [ ] Locked/Unlocked logic funguje
- [ ] Progress tracking funguje pro všechny moduly
- [ ] Data se ukládají (Supabase)
- [ ] Desktop verze zůstává nedotčená
```

---

## 🐛 COMMON ISSUES

### Issue 1: Module 2/3 se nezobrazí
**Příčina:** Chybí import nebo conditional render  
**Fix:** Zkontroluj importy a `currentModuleNumber === 2/3`

### Issue 2: VPC data nejsou vidět
**Příčina:** Chybí VPC state nebo handleVPCUpdate  
**Fix:** Přidej state a callback (viz KROK 2 & 3)

### Issue 3: Segment/Value selector nefunguje
**Příčina:** Chybí availableSegments/Values props  
**Fix:** Předej `canvasData.segments` a `canvasData.value`

### Issue 4: Tools se nezobrazují
**Příčina:** Lesson ID mismatch  
**Fix:** Zkontroluj `lesson.id` v renderToolContent()

---

## 📊 DATA FLOW

```
User Action              →  State Change              →  Effect
─────────────────────────────────────────────────────────────────
Dashboard: Continue      →  showDashboard = false     →  Show current lesson
Dashboard: Select Mod 2  →  currentModule = 2         →  Show Module 2 Lesson 1
                            currentLesson = 0
                            showDashboard = false

Module 2: Next          →  currentLesson++           →  Show next lesson
                                                         Scroll to top

Module 2: Complete      →  completedLessons.add()    →  ✅ Mark complete
                                                         Save to Supabase
                                                         Check achievements

Module 3: Select Seg    →  selectedVPCSegment = X    →  Filter VPC data
Module 3: Add Item      →  vpcCustomerData.push()    →  Update canvas
                                                         Save to Supabase
```

---

## 🚀 DEPLOYMENT CHECKLIST

Před nasazením zkontroluj:

- [ ] Všechny 3 moduly fungují na mobilu
- [ ] Desktop verze zůstává nedotčená
- [ ] Data sync funguje (Supabase)
- [ ] Progress tracking funguje
- [ ] Achievements se odemykají
- [ ] Locked/Unlocked logic správně
- [ ] Previous/Next navigace všude
- [ ] Complete buttons fungují
- [ ] Sidebar navigace funguje
- [ ] Canvas/Tools/VPC komponenty fungují
- [ ] Real device testing done (ngrok)

---

## 💡 QUICK TIPS

### Debugging VPC
```tsx
// V MobileCourseModule3.tsx přidej:
console.log('VPC Customer:', vpcData.customer);
console.log('VPC Value:', vpcData.value);
console.log('Selected Segment:', selectedSegment);
console.log('Available Segments:', availableSegments);
```

### Debugging Module Render
```tsx
// V CourseDemoV3.tsx přidej:
console.log('Is Mobile:', isMobile);
console.log('Current Module:', currentModuleNumber);
console.log('Show Dashboard:', showMainDashboard);
console.log('Current Lesson:', currentLessonIndex);
```

### Force Module
```tsx
// Pro testování konkrétního modulu:
setCurrentModuleNumber(3); // Force Module 3
setCurrentLessonIndex(0);  // First lesson
setShowMainDashboard(false);
```

---

## 📞 SUPPORT

Pokud něco nefunguje:

1. Zkontroluj console errors (F12)
2. Zkontroluj že máš všechny importy
3. Zkontroluj že předáváš všechny required props
4. Zkontroluj že state se updatuje (React DevTools)
5. Zkontroluj že data se ukládají (Supabase)

---

**Status:** ✅ Ready for integration!  
**Next:** Integrace + Testing + Zítra launch! 🚀

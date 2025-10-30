# 📱 Mobile Integration Plan

**Vytvořeno:** 2025-01-24  
**Status:** 🎯 Ready to implement

## 🎯 Cíl

Přidat mobilní verzi kurzu do `CourseDemoV3.tsx` bez ovlivnění desktop verze.

## 🏗️ Struktura

```
Desktop (zachováno):
CourseDemoV3.tsx → CourseSidebar + BusinessModelCanvasSimple + Tools

Mobile (nové):
CourseDemoV3.tsx → MobileCourseModule1/2/3 + MobileCourseDashboard
```

## 📝 Implementační kroky

### KROK 1: Přidat breakpoint detection

V `CourseDemoV3.tsx` přidat na začátek:

```tsx
// Přidat import
import { useState, useEffect } from "react";

// Přidat hook pro detekci mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}

// V komponenta CourseDemoV3:
const isMobile = useIsMobile();
```

### KROK 2: Importovat mobilní komponenty

```tsx
// Přidat na začátek CourseDemoV3.tsx
import { MobileCourseModule1 } from "./mobile-course/MobileCourseModule1";
// TODO: další moduly až budou hotové
// import { MobileCourseModule2 } from "./mobile-course/MobileCourseModule2";
// import { MobileCourseModule3 } from "./mobile-course/MobileCourseModule3";
```

### KROK 3: Conditional render

V return statement `CourseDemoV3.tsx`, PŘED současným return:

```tsx
// 📱 MOBILE VIEW
if (isMobile) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <AutosaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
      
      {/* ACHIEVEMENT NOTIFICATIONS */}
      {lastAchievement && (
        <AchievementNotification
          achievement={lastAchievement}
          onClose={() => setLastAchievement(null)}
        />
      )}
      
      {/* MOBILE MODULE VIEW */}
      {currentModuleNumber === 1 && (
        <MobileCourseModule1
          moduleData={MODULE_1}
          canvasData={canvasData}
          onCanvasUpdate={handleCanvasUpdate}
          completedLessons={completedLessons}
          onLessonComplete={handleLessonComplete}
          currentLessonIndex={currentLessonIndex}
          onLessonChange={(index) => setCurrentLessonIndex(index)}
        />
      )}
      
      {/* TODO: Module 2 a 3 */}
      {currentModuleNumber === 2 && (
        <div className="p-4">
          <h2>Module 2 - Coming Soon</h2>
          <Button onClick={() => setCurrentModuleNumber(1)}>
            Zpět na Module 1
          </Button>
        </div>
      )}
      
      {currentModuleNumber === 3 && (
        <div className="p-4">
          <h2>Module 3 - Coming Soon</h2>
          <Button onClick={() => setCurrentModuleNumber(1)}>
            Zpět na Module 1
          </Button>
        </div>
      )}
    </div>
  );
}

// 🖥️ DESKTOP VIEW (současný kód zůstává)
return (
  <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
    {/* ... současný desktop kód ... */}
  </div>
);
```

### KROK 4: Helper funkce pro canvas update

Přidat helper funkci v `CourseDemoV3.tsx`:

```tsx
// Přidat před return statement
const handleCanvasUpdate = (section: string, items: any[]) => {
  setCanvasData(prev => ({
    ...prev,
    [section]: items
  }));
};

const handleLessonComplete = (lessonId: number) => {
  const lessonKey = `${currentModuleNumber}-${lessonId}`;
  const newCompleted = new Set(completedLessons);
  newCompleted.add(lessonKey);
  setCompletedLessons(newCompleted);
  
  // Save to database
  if (userData?.id) {
    saveLessonProgress(userData.id, currentModuleNumber, lessonId);
  }
  
  // Check for achievements
  checkAchievements();
};
```

## ✅ Checklist před testováním

- [ ] Přidat `useIsMobile()` hook
- [ ] Importovat `MobileCourseModule1`
- [ ] Přidat conditional render `if (isMobile)`
- [ ] Přidat `handleCanvasUpdate()` funkci
- [ ] Přidat `handleLessonComplete()` funkci
- [ ] Otestovat na desktopu (mělo by fungovat jako dřív)
- [ ] Otestovat na mobilu (mělo by zobrazit novou verzi)

## 🧪 Testing

### Desktop test:
1. Otevři `http://localhost:5173/#course-v3?dev=true`
2. Zkontroluj že vidíš SOUČASNOU desktop verzi
3. Zkontroluj že sidebar funguje
4. Zkontroluj že canvas funguje

### Mobile test:
1. Zmenši okno na < 768px NEBO
2. Otevři Dev Tools → Toggle device toolbar → iPhone
3. Zkontroluj že vidíš NOVOU accordion verzi
4. Zkontroluj že lekce jdou rozbalit
5. Zkontroluj že canvas funguje

### Real mobile test:
```bash
# Spusť ngrok
ngrok http 5173

# Otevři URL na mobilu
https://xxxx-xx-xxx.ngrok.io/#course-v3?dev=true
```

## 🎯 Expected Behavior

### Desktop (< 768px):
- ✅ Sidebar vlevo
- ✅ Lesson content uprostřed
- ✅ Canvas vpravo (nebo tools)
- ✅ Všechny současné funkce fungují

### Mobile (< 768px):
- ✅ Accordion view (jedna lekce = jedna sekce)
- ✅ Canvas integrovaný v lekci
- ✅ Bottom sheet pro přidávání položek
- ✅ Haptic feedback
- ✅ Progress tracking (checkmarks)

## 🚨 Co NESMÍME rozbít

- ❌ Desktop verze (MUSÍ zůstat funkční)
- ❌ Data persistence (progress tracking)
- ❌ Achievements system
- ❌ Auth flow (token verification)
- ❌ Canvas data sync

## 🔄 Rollback plán

Pokud něco nefunguje:
1. Odstraň `if (isMobile)` block
2. Vrať pouze desktop verzi
3. Debug v mobile složce samostatně

## 📚 Reference

- Desktop code: `/components/CourseDemoV3.tsx`
- Mobile code: `/components/mobile-course/MobileCourseModule1.tsx`
- Canvas UI: `/components/MobileCanvasAccordion.tsx`
- Progress tracking: `/lib/courseProgress.ts`

## 🚀 Next Steps

Po úspěšném Module 1:
1. Vytvoř `MobileCourseModule2.tsx` (VPC)
2. Vytvoř `MobileCourseModule3.tsx` (FIT)
3. Vytvoř `MobileCourseDashboard.tsx` (Overview)
4. Přidej swipe navigation
5. Přidej pull-to-refresh
6. Optimalizace UX (haptics, animations...)

# 📱 Mobile Flow - Visual Diagram

**Datum:** 2025-01-24

## 🎯 Breakpoint Detection

```
User otevře /#course-v3?dev=true
           ↓
    CourseDemoV3.tsx
           ↓
    window.innerWidth?
       ↙       ↘
   < 768px    >= 768px
   MOBILE     DESKTOP
      ↓           ↓
   NOVÉ      SOUČASNÉ
```

## 📱 MOBILE FLOW (< 768px)

```
CourseDemoV3.tsx
    ↓
if (isMobile && !showMainDashboard && !showActionPlan && !showTool)
    ↓
MobileCourseModule1.tsx
    ↓
┌─────────────────────────────────┐
│  📱 MOBILE ACCORDION VIEW       │
├─────────────────────────────────┤
│                                 │
│  ✅ Lekce 1: Zákaznické segmenty│ ← Completed
│  ─────────────────────────────  │
│                                 │
│  ▼ Lekce 2: Hodnotová nabídka  │ ← Expanded
│  ┌───────────────────────────┐ │
│  │ 📝 Lesson content...      │ │
│  │                           │ │
│  │ ✍️ Vyplňte canvas:        │ │
│  │ ┌─────────────────────┐   │ │
│  │ │ 💎 Hodnotová nabídka│   │ │
│  │ │ ─────────────────── │   │ │
│  │ │ [+ Přidat položku]  │   │ │
│  │ │                     │   │ │
│  │ │ 🔵 První hodnota    │   │ │
│  │ │ 🟢 Druhá hodnota    │   │ │
│  │ └─────────────────────┘   │ │
│  │                           │ │
│  │ [Označit jako dokončené]  │ │
│  └───────────────────────────┘ │
│                                 │
│  🔒 Lekce 3: Kanály            │ ← Locked
│  ─────────────────────────────  │
│                                 │
│  🔒 Lekce 4: Vztahy...         │ ← Locked
│                                 │
└─────────────────────────────────┘
```

## 🖥️ DESKTOP FLOW (>= 768px)

```
CourseDemoV3.tsx
    ↓
return <div className="h-screen flex">
    ↓
┌─────────────────────────────────────────────────┐
│ 📋 SIDEBAR  │  📝 LESSON  │  🎨 CANVAS/TOOLS  │
├─────────────┼─────────────┼───────────────────┤
│             │             │                   │
│ • Dashboard │ # Lekce 2   │ ┌──────────────┐ │
│             │             │ │ 💎 Hodnoty:  │ │
│ Module 1:   │ Hodnotová   │ │              │ │
│ ✅ Lekce 1  │ nabídka     │ │ 🔵 První     │ │
│ ▶️ Lekce 2  │             │ │ 🟢 Druhá     │ │
│ 🔒 Lekce 3  │ Content...  │ │              │ │
│ ...         │             │ │ [+ Přidat]   │ │
│             │             │ └──────────────┘ │
│ Module 2:   │ [Začít      │                   │
│ 🔒 ...      │  cvičení →] │                   │
│             │             │                   │
└─────────────┴─────────────┴───────────────────┘
```

## 🔄 Data Flow

```
CourseDemoV3.tsx (STATE)
    ├─ canvasSections: CanvasSection[]
    ├─ completedLessons: Set<number>
    ├─ currentModuleNumber: number
    ├─ currentLessonIndex: number
    └─ userData: User
        ↓
    ┌───┴───┐
    ↓       ↓
DESKTOP   MOBILE
    ↓       ↓
 Sidebar  MobileCourseModule1
    │       │
    │       ├─ Dostává: moduleData, canvasData, completedLessons
    │       ├─ Volá: onCanvasUpdate(section, items)
    │       └─ Volá: onLessonComplete(lessonId)
    │           ↓
    └──────────┬────────────┘
               ↓
    handleMobileCanvasUpdate()
               ↓
    Update State + Save to Supabase
               ↓
    setCanvasSections(...)
               ↓
    supabase.from('user_canvas_data').upsert(...)
```

## 🎨 Component Hierarchy

```
App.tsx
 └─ CourseDemoV3
     ├─ MOBILE (< 768px)
     │   └─ MobileCourseModule1
     │       ├─ Props: moduleData, canvasData, callbacks
     │       ├─ Accordion struktura
     │       │   └─ Lekce 1..9
     │       │       ├─ Lesson header (title, description)
     │       │       ├─ Lesson content (HTML)
     │       │       └─ Canvas section
     │       │           └─ MobileCanvasAccordion
     │       │               └─ BottomSheet (add items)
     │       └─ Complete button
     │
     └─ DESKTOP (>= 768px)
         ├─ CourseSidebar
         │   ├─ Dashboard button
         │   ├─ Modules list
         │   └─ Tools list
         ├─ Lesson content
         │   ├─ Header
         │   ├─ Content
         │   └─ [Začít cvičení] button
         └─ Canvas/Tools panel
             ├─ BusinessModelCanvasSimple
             ├─ TargetCalculatorTool
             └─ SegmentSizeTool
```

## 🔀 Conditional Render Logic

```typescript
// CourseDemoV3.tsx (~line 2056)

// CHECKS
const isMobile = window.innerWidth < 768;
const isInLesson = !showMainDashboard && !showActionPlan && !showTool;

// MOBILE PATH
if (isMobile && isInLesson) {
  return (
    <MobileCourseModule1
      moduleData={MODULE_1}
      canvasData={...}
      onCanvasUpdate={handleMobileCanvasUpdate}
      onLessonComplete={handleMobileLessonComplete}
    />
  );
}

// DESKTOP PATH (default)
return (
  <div className="h-screen flex">
    <CourseSidebar ... />
    <LessonContent ... />
    <CanvasPanel ... />
  </div>
);
```

## 📊 Canvas Data Structure

```typescript
// State v CourseDemoV3
canvasSections: [
  { id: 'segments', items: [
    { text: 'Rodiny', color: 'blue', value: undefined },
    { text: 'Studenti', color: 'green', value: undefined }
  ]},
  { id: 'value', items: [
    { text: 'Rychlá káva', color: 'blue', value: undefined },
    { text: 'Levná káva', color: 'green', value: undefined }
  ]},
  { id: 'revenue', items: [
    { text: 'Káva', color: 'blue', value: 50 }
  ]},
  ...
]

// Transformace pro MobileCourseModule1
canvasData = {
  segments: canvasSections.find(s => s.id === 'segments')?.items || [],
  value: canvasSections.find(s => s.id === 'value')?.items || [],
  revenue: canvasSections.find(s => s.id === 'revenue')?.items || [],
  ...
}

// V MobileCourseModule1
getCanvasSectionsForLesson(lesson) {
  return [{
    id: lesson.canvasSection,  // 'segments'
    title: '👥 Zákaznické segmenty',
    items: canvasData.segments || [],
    valueLabel: undefined
  }]
}
```

## 🎯 User Journey - Mobile

```
1. User otevře /#course-v3?dev=true na mobilu
   ↓
2. CourseDemoV3 detekuje isMobile = true
   ↓
3. Zobrazí MobileCourseModule1 (accordion)
   ↓
4. User vidí seznam lekcí:
   - Lekce 1 (odemčená)
   - Lekce 2-9 (zamčené)
   ↓
5. User klikne na Lekci 1
   ↓
6. Lekce se rozbalí → vidí content + canvas
   ↓
7. User klikne [+ Přidat položku]
   ↓
8. Bottom sheet se otevře
   ↓
9. User zadá text, vybere barvu
   ↓
10. Klikne "Přidat"
    ↓
11. Item se přidá do canvasu
    ↓
12. onCanvasUpdate() → save to Supabase
    ↓
13. User klikne [Označit jako dokončené]
    ↓
14. onLessonComplete() → save progress
    ↓
15. Lekce 1 zobrazí ✅ checkmark
    ↓
16. Lekce 2 se odemkne 🔓
    ↓
17. User pokračuje...
```

## 🎨 Visual Comparison

```
DESKTOP                    MOBILE
┌──────────────────┐      ┌──────────────────┐
│ 3 COLUMNS        │      │ 1 COLUMN         │
│ (sidebar +       │      │ (accordion)      │
│  content +       │      │                  │
│  canvas)         │      │ Everything       │
│                  │      │ in one view      │
│ Complex layout   │      │ Simple layout    │
│ Multi-tasking    │      │ One task         │
│ Power user       │      │ Beginner         │
└──────────────────┘      └──────────────────┘
```

## 🚀 Summary

```
KONCEPT:
Desktop ≠ Mobile

IMPLEMENTACE:
Conditional render v CourseDemoV3

VÝHODA:
Žádné konflikty, čistý kód

VÝSLEDEK:
2 optimalizované verze pro 2 platformy
```

---

**Poznámka:** Tento diagram ukazuje logiku a flow. Pro code details viz skutečné soubory.

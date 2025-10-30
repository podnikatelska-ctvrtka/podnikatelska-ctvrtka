# 📱 MOBILE UX - CLEAN ARCHITECTURE

**Verze:** V2 - Single Lesson View  
**Datum:** 2025-01-24

---

## 🎯 PŘED vs. PO

### ❌ PŘED (Duplicitní accordion)
```
┌─────────────────┐  ┌──────────────────────────┐
│   SIDEBAR       │  │   MODULE VIEW            │
├─────────────────┤  ├──────────────────────────┤
│ 📚 Module 1     │  │ ▼ Lekce 1: Segmenty     │
│   ✅ Lekce 1    │  │   [Text...]             │
│   ○  Lekce 2    │  │   [Canvas]              │
│   🔒 Lekce 3    │  │                          │
│                 │  │ ▼ Lekce 2: Hodnota      │
│ 📚 Module 2     │  │   [Text...]             │
│   🔒 Lekce 1    │  │   [Canvas]              │
└─────────────────┘  │                          │
                     │ ▼ Lekce 3: Kanály       │
                     │   [Text...]             │
                     └──────────────────────────┘
                     ↑
                     DUPLICITA! Stejné lekce 2x!
```

### ✅ PO (Clean single lesson)
```
┌─────────────────┐  ┌──────────────────────────┐
│   SIDEBAR       │  │   LESSON VIEW            │
├─────────────────┤  ├──────────────────────────┤
│ 📚 Module 1     │  │ 👥 Zákaznické segmenty   │
│   ✅ Lekce 1 ←──┼──┼─ (Lekce 1/9)            │
│   ○  Lekce 2    │  │ ──────────────────────   │
│   🔒 Lekce 3    │  │ [Text lekce...]          │
│                 │  │                          │
│ 📚 Module 2     │  │ ✍️ Vyplňte canvas:       │
│   🔒 Lekce 1    │  │ 👥 Zákaznické segmenty   │
└─────────────────┘  │ ─────────────────        │
                     │ ○ Mladé maminky 25-35    │
                     │ ○ Studenti VŠ            │
                     │ + Přidat segment         │
                     │                          │
                     │ ✅ Označit dokončené     │
                     │                          │
                     │ [← Předchozí] [Další →] │
                     └──────────────────────────┘
                     ↑
                     CLEAN! Jen aktuální lekce!
```

---

## 🗺️ NAVIGATION FLOW

```
┌──────────────────────────────────────────────────────┐
│                    DASHBOARD                          │
│  ┌────────────────────────────────────────────┐     │
│  │ Celkový pokrok: ████████░░ 80%             │     │
│  │ 12/15 lekcí                                │     │
│  └────────────────────────────────────────────┘     │
│                                                       │
│  ┌────────────────────────────────────────────┐     │
│  │ ▶ Pokračovat v kurzu                       │     │
│  └────────────────────────────────────────────┘     │
│                                                       │
│  📚 Module 1: BMC                    ████████ 100%   │
│  📚 Module 2: VPC                    ████░░░░  50%   │
│  📚 Module 3: FIT                    ░░░░░░░░   0%   │
└──────────────────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
    [Continue]            [Select Module]
        │                       │
        ↓                       ↓
┌──────────────────┐    ┌──────────────────┐
│  LESSON VIEW     │    │  LESSON VIEW     │
│  (last position) │    │  (first lesson)  │
└──────────────────┘    └──────────────────┘
```

---

## 🎨 LESSON VIEW ANATOMY

```
┌─────────────────────────────────────────┐
│ [☰] Lekce 2/9            [🏠]           │ ← HEADER
│ ───────────────────────────────────     │
│ 💎 Hodnotová nabídka                    │
│ Co nabízíte a proč je to hodnotné      │
│ ✅ Lekce dokončena                      │
├─────────────────────────────────────────┤
│                                         │
│ ┌─────────────────────────────────────┐│
│ │ 📖 TEXT LEKCE                       ││ ← CONTENT
│ │                                     ││
│ │ <h3>Co je hodnotová nabídka?</h3>  ││
│ │ <p>Hodnotová nabídka je...</p>     ││
│ │                                     ││
│ │ [Celý formátovaný obsah]           ││
│ └─────────────────────────────────────┘│
│                                         │
│ ┌─────────────────────────────────────┐│
│ │ ✍️ Vyplňte svůj canvas              ││ ← CANVAS
│ │                                     ││
│ │ 💎 Hodnotová nabídka                ││
│ │ ─────────────────────               ││
│ │ ○ Káva za 2 minuty                 ││
│ │ ○ Vegánské možnosti                ││
│ │ ○ Příjemné prostředí               ││
│ │                                     ││
│ │ + Přidat hodnotu                   ││
│ └─────────────────────────────────────┘│
│                                         │
│ ┌─────────────────────────────────────┐│
│ │ ✅ Označit jako dokončené           ││ ← ACTION
│ └─────────────────────────────────────┘│
│                                         │
├─────────────────────────────────────────┤
│ [← Předchozí]        [Další →]         │ ← FOOTER
└─────────────────────────────────────────┘
```

---

## 📲 SIDEBAR DETAIL

```
┌─────────────────────────────────┐
│ [X]  Navigace kurzu             │ ← HEADER
│ ─────────────────────────       │
│ Progress: ████████░░ 80%        │
│ 12/15 lekcí (80%)               │
├─────────────────────────────────┤
│ [📊 Dashboard]                  │ ← QUICK ACTION
├─────────────────────────────────┤
│                                 │
│ ▼ 📚 Module 1: BMC        ✅    │ ← EXPANDABLE
│   ├─ ✅ Lekce 1: Segmenty      │
│   ├─ ✅ Lekce 2: Hodnota  ←──  │ ← ACTIVE
│   ├─ ○  Lekce 3: Kanály        │
│   ├─ 🔒 Lekce 4: Vztahy        │
│   └─ ...                        │
│                                 │
│ ▶ 📚 Module 2: VPC        50%  │ ← COLLAPSED
│                                 │
│ ▶ 📚 Module 3: FIT         0%  │ ← LOCKED
│                                 │
└─────────────────────────────────┘
```

---

## 🎭 STATE MANAGEMENT

```typescript
// PARENT (CourseDemoV3.tsx)
const [showMainDashboard, setShowMainDashboard] = useState(true);
const [showMobileSidebar, setShowMobileSidebar] = useState(false);
const [currentModuleNumber, setCurrentModuleNumber] = useState(1);
const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

// SCREENS
if (showMainDashboard) {
  return <MobileCourseDashboard />;
}

if (currentModuleNumber === 1) {
  return <MobileCourseModule1 
    currentLessonIndex={currentLessonIndex} // ← KTEROU LEKCI ZOBRAZIT
    onLessonChange={setCurrentLessonIndex}  // ← Previous/Next
  />;
}
```

---

## 🔄 USER JOURNEY

```
1️⃣ START
   User opens app
   ↓
   Dashboard (default)

2️⃣ CONTINUE
   Click "Pokračovat v kurzu"
   ↓
   Lesson View (currentLessonIndex)
   
3️⃣ NAVIGATE
   Click [☰] Menu
   ↓
   Sidebar opens
   ↓
   Click different lesson
   ↓
   Lesson View updates (new index)

4️⃣ PROGRESS
   Read lesson
   ↓
   Fill canvas
   ↓
   Click "Označit dokončené"
   ↓
   Lesson marked complete ✅
   
5️⃣ NEXT
   Click "Další →"
   ↓
   Next lesson loads
   ↓
   Scroll to top
   ↓
   Repeat from step 4
```

---

## 🎯 KEY PRINCIPLES

### ✅ DO
- Jedna lekce = jedna obrazovka
- Sidebar = navigace
- Canvas = aktuální sekce
- Previous/Next pro flow
- Scroll to top při změně

### ❌ DON'T
- Accordion view v modulu
- Duplicitní lekce
- Všechny lekce najednou
- Nested navigace
- Auto-scroll down

---

## 📊 DATA FLOW

```
User Action          State Change         Screen Update
────────────────────────────────────────────────────────
Click "Continue"  →  showDashboard=false  →  Lesson View
                     (keep index)

Click "Další"     →  index++              →  Next Lesson
                                              Scroll top

Click Sidebar     →  index=X              →  Specific Lesson
lesson                                       Scroll top

Click "Complete"  →  completedLessons.add →  ✅ indicator
                                              Unlock next

Canvas add item   →  canvasData.push      →  Update canvas
                     → Supabase save          Live sync
```

---

## 🚀 BENEFITS

**UX:**
- ✅ Čistší interface
- ✅ Méně scrollování
- ✅ Jasná navigace
- ✅ Focus na jednu lekci

**Technical:**
- ✅ Méně DOM elementů
- ✅ Rychlejší render
- ✅ Jednodušší state
- ✅ Lepší performance

**User:**
- ✅ Méně rozptýlení
- ✅ Jasný progress
- ✅ Intuitivní navigace
- ✅ Snadné dokončení

---

**Status:** ✅ Clean architecture implemented  
**Next:** Testing + Module 2

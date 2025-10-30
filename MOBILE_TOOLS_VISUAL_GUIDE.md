# 📱 MOBILE TOOLS - Visual Guide

## 🎨 Component Structure

```
┌─────────────────────────────────────┐
│      📱 MOBILE APP VIEW             │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐  │
│  │  🍔 Hamburger Menu           │  │
│  │  (otevírá sidebar)           │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  📊 Dashboard                │  │
│  │  nebo                        │  │
│  │  📚 Lekce                    │  │
│  │  nebo                        │  │
│  │  🧮 Tools ← NEW!             │  │
│  └──────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

## 🗂️ Sidebar Structure

```
┌─────────────────────────────────────┐
│   📱 MOBILE SIDEBAR                 │
├─────────────────────────────────────┤
│                                     │
│  📊 Dashboard                       │
│                                     │
│  ──────────────────────────────     │
│                                     │
│  🧮 Nástroje ▼  ← NEW!              │
│    ├─ 🎯 Akční plán                │
│    ├─ 🧮 Kalkulačka zákazníků      │
│    └─ 📊 Velikost segmentu         │
│                                     │
│  ──────────────────────────────     │
│                                     │
│  📚 Modul 1 ▼                       │
│    ├─ ✓ Lekce 1                    │
│    ├─ ✓ Lekce 2                    │
│    └─ ○ Lekce 3                    │
│                                     │
│  📚 Modul 2 ▼                       │
│  📚 Modul 3 ▼                       │
│                                     │
└─────────────────────────────────────┘
```

## 🎯 Akční plán View

```
┌─────────────────────────────────────┐
│   🎯 AKČNÍ PLÁN                     │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │  🏆 Váš pokrok              │   │
│  │  2/4 dokončeno (50%)        │   │
│  │  ████████░░░░░░░░           │   │
│  └─────────────────────────────┘   │
│                                     │
│  📋 Akce k provedení:              │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  ✓ 1. Vyřešit TOP obavu     │   │
│  │     ✅ DOKONČENO             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  ○ 2. Zajistit TOP přínos   │   │
│  │     ⏰ Do: 7 dní             │   │
│  │     💡 Tip: Zkontroluj...   │   │
│  │     → Přejít na Lekci 15    │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  ○ 3. Validovat FIT Score   │   │
│  │     ⏰ Do: 14 dní            │   │
│  │     → Přejít na Lekci 16    │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  📊 Vaše TOP priority ▼     │   │
│  │  (collapsible)              │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

## 🔄 User Flows

### Flow 1: FIT Validator → Akční plán

```
┌──────────────┐
│  Lekce 16    │
│ FIT Validator│
└──────┬───────┘
       │
       │ [Dokončit lekci]
       ↓
┌──────────────┐
│  ✅ Success  │
│  FIT Score   │
│  zobrazeno   │
└──────┬───────┘
       │
       │ [📋 Otevřít Akční plán]
       ↓
┌──────────────┐
│   Akční      │
│   plán       │
│  zobrazení   │
└──────┬───────┘
       │
       │ [Vybrat akci]
       ↓
┌──────────────┐
│  Action item │
│  detail      │
└──────┬───────┘
       │
       │ [Přejít na lekci]
       ↓
┌──────────────┐
│  Navigace    │
│  do lekce    │
└──────────────┘
```

### Flow 2: Sidebar → Tools → Akční plán

```
┌──────────────┐
│  Dashboard   │
│  nebo Lekce  │
└──────┬───────┘
       │
       │ [🍔 Menu]
       ↓
┌──────────────┐
│   Sidebar    │
│   otevřen    │
└──────┬───────┘
       │
       │ [🧮 Nástroje ▼]
       ↓
┌──────────────┐
│   Tools      │
│   expanded   │
└──────┬───────┘
       │
       │ [🎯 Akční plán]
       ↓
┌──────────────┐
│   Akční      │
│   plán       │
│  zobrazení   │
└──────────────┘
```

### Flow 3: Akční plán → Navigace do lekce

```
┌──────────────┐
│   Akční      │
│   plán       │
└──────┬───────┘
       │
       │ [Action item]
       ↓
┌──────────────┐
│  "Vyřešit    │
│  TOP obavu"  │
└──────┬───────┘
       │
       │ [→ Přejít na Lekci 15]
       ↓
┌──────────────┐
│  handler:    │
│  Navigate    │
│  ToLesson    │
└──────┬───────┘
       │
       │ setCurrentModule(3)
       │ setCurrentLesson(1)
       │ setCurrentTool(null)
       ↓
┌──────────────┐
│  Lekce 15    │
│  Value Map   │
│  zobrazena   │
└──────────────┘
```

## 📊 Data Flow

```
┌──────────────────────────────────────┐
│  USER COMPLETES FIT VALIDATOR        │
│  (Lekce 16)                          │
└────────────┬─────────────────────────┘
             │
             │ SAVE to Supabase
             ↓
┌──────────────────────────────────────┐
│  value_proposition_canvas            │
│  .fit_validation_data                │
│  {                                   │
│    jobs: [...]      // TOP 3        │
│    pains: [...]     // TOP 3        │
│    gains: [...]     // TOP 3        │
│    mappings: {...}  // Coverage     │
│  }                                   │
└────────────┬─────────────────────────┘
             │
             │ LOAD on mount
             ↓
┌──────────────────────────────────────┐
│  MobileBusinessActionPlan            │
│  .loadData()                         │
└────────────┬─────────────────────────┘
             │
             │ EXTRACT priorities
             ↓
┌──────────────────────────────────────┐
│  TOP Priorities extracted:           │
│  - topPains[0]   → Action #1        │
│  - topGains[0]   → Action #2        │
│  - All products  → Action #3        │
│  - Economics     → Action #4        │
└────────────┬─────────────────────────┘
             │
             │ DISPLAY + TRACK
             ↓
┌──────────────────────────────────────┐
│  UI renders action items             │
│  Progress tracked in LocalStorage    │
│  Achievements triggered              │
└──────────────────────────────────────┘
```

## 🎨 Component Hierarchy

```
CourseDemoV3.tsx
├── MobileCourseSidebar
│   └── Tools Section ← NEW!
│       ├── 🎯 Akční plán
│       ├── 🧮 Kalkulačka
│       └── 📊 Velikost
│
├── MobileCourseDashboard
│
├── MobileCourseModule1
├── MobileCourseModule2
├── MobileCourseModule3
│   ├── MobileVPCCustomerProfile (Lekce 14)
│   ├── MobileVPCValueMap (Lekce 15)
│   └── MobileFitValidator (Lekce 16)
│       └── CTA Button ← NEW!
│
└── Tools Rendering ← NEW!
    ├── MobileBusinessActionPlan
    ├── TargetCalculatorTool (desktop wrapper)
    └── SegmentSizeTool (desktop wrapper)
```

## 🔧 Props Flow

```
CourseDemoV3
  │
  ├─ currentTool: string | null
  │    │
  │    └─→ MobileCourseSidebar
  │         (highlighting)
  │
  ├─ handleSelectTool(toolId)
  │    │
  │    ├─→ MobileCourseSidebar
  │    │    (onClick handler)
  │    │
  │    └─→ MobileModule3 → MobileFitValidator
  │         (CTA button)
  │
  ├─ handleNavigateFromActionPlan(lessonId)
  │    │
  │    └─→ MobileBusinessActionPlan
  │         (lesson navigation)
  │
  └─ triggerAchievement(achievementId)
       │
       └─→ MobileBusinessActionPlan
            (achievement triggers)
```

## 📱 Screen States

### State 1: Dashboard
```
┌─────────────┐
│ [🍔]  [🏠]  │
├─────────────┤
│             │
│  Dashboard  │
│  Content    │
│             │
└─────────────┘
```

### State 2: Lekce
```
┌─────────────┐
│ [🍔]  [🏠]  │
├─────────────┤
│             │
│  Lesson     │
│  Content    │
│             │
└─────────────┘
```

### State 3: Tools (NEW!)
```
┌─────────────┐
│ [←]  Tools  │
├─────────────┤
│             │
│  Akční      │
│  plán       │
│             │
└─────────────┘
```

## 🎯 Integration Points

```
BEFORE:
  Dashboard → Lekce
       ↕
    Sidebar

AFTER:
  Dashboard → Lekce → Tools
       ↕        ↕       ↕
           Sidebar
           (with tools)
```

## ✅ Visual Checklist

```
UI Elements to verify:

✓ Sidebar:
  ☐ "🧮 Nástroje" sekce viditelná
  ☐ Expand/collapse chevron funguje
  ☐ 3 tools zobrazené
  ☐ Active highlighting (purple)

✓ Akční plán:
  ☐ Header s titulkem
  ☐ Progress card (purple gradient)
  ☐ Progress bar animovaný
  ☐ Action items jako cards
  ☐ Checkbox funkční
  ☐ Tip boxes (blue)
  ☐ Navigation buttons (blue text)
  ☐ Backlog collapsible
  ☐ Priority cards (red/green/yellow)

✓ FIT Validator CTA:
  ☐ Purple gradient card
  ☐ "📋 Otevřít Akční plán" button
  ☐ Zobrazuje se po validaci
  ☐ Button je full-width

✓ Haptic Feedback:
  ☐ Light - na kliknutí
  ☐ Medium - na navigaci
  ☐ Success - na dokončení akce
```

## 🎨 Color Coding

```
🟦 BLUE    - Primary actions, info
🟩 GREEN   - Success, completed, gains
🟥 RED     - Pains, warnings
🟨 YELLOW  - Jobs, important
🟪 PURPLE  - Tools, secondary actions
⬜ GRAY    - Disabled, locked
```

## 📐 Layout Specs

```
Mobile Breakpoint: < 768px

Touch Targets: 
  min-height: 44px
  min-width: 44px

Padding:
  Container: p-4 (16px)
  Cards: p-4 (16px)
  Buttons: py-2 px-4

Border Radius:
  Cards: rounded-xl (12px)
  Buttons: rounded-lg (8px)

Gaps:
  Card list: gap-3 (12px)
  Inline elements: gap-2 (8px)

Font Sizes:
  Headings: use global CSS defaults
  Body: use global CSS defaults
  Small: text-sm (14px)
  Tiny: text-xs (12px)
```

---

**TL;DR:** Visual guide pro pochopení struktury mobilních nástrojů! 🎨

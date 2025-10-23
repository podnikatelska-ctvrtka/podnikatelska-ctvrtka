# 🎓 DESKTOP KURZ - KOMPONENTY BACKUP

**⚠️ KRITICKÉ:** Tato složka obsahuje informace o FUNKČNÍ DESKTOP verzi kurzu!

**Datum zálohy:** 2025-01-21  
**Verze:** v1 - Desktop optimalizovaná verze (před mobilními úpravami)  
**Status:** ✅ FUNKČNÍ - Otestováno a schváleno

---

## 🚨 PROČ TATO ZÁLOHA?

Když jsme začali dělat mobilní verzi, rozesrali jsme desktop! 😅

**Tato dokumentace** obsahuje kompletní seznam komponent které tvoří funkční desktop verzi kurzu.

**Pokud mobilní verze přestane fungovat nebo rozesreme desktop:**
→ Vrátíme se k této verzi komponent!

---

## 📋 HLAVNÍ KOMPONENTY

### **🎯 CourseDemoV3.tsx**
- **Popis:** Hlavní komponenta kurzu (desktop + mobile)
- **Path:** `/components/CourseDemoV3.tsx`
- **Důležité features:**
  - Desktop: Sidebar vlevo, content vpravo
  - Mobile: Bottom nav, swipe navigation
  - Canvas layout: `max-w-[1600px]` pro Lekci 16
  - Canvas layout: `max-w-6xl` + scale(0.75) pro validátory
  - Auth: Token-based přístup
  - Progress: Auto-save do Supabase
  - Achievements: Gamifikace systém

### **📊 CourseSidebar.tsx**
- **Popis:** Desktop sidebar (vlevo)
- **Path:** `/components/CourseSidebar.tsx`
- **Features:**
  - Modul collapsed/expanded
  - Progress tracking
  - Smooth scroll to lesson
  - Achievement badges

### **🏠 SimpleDashboard.tsx**
- **Popis:** Úvodní dashboard kurzu
- **Path:** `/components/SimpleDashboard.tsx`
- **Features:**
  - Welcome screen
  - Progress overview
  - Canvas preview (scaled)
  - Quick start CTA

---

## 🎨 CANVAS KOMPONENTY

### **📐 BusinessModelCanvasSimple.tsx**
- **Popis:** Hlavní Business Model Canvas (9 bloků)
- **Path:** `/components/BusinessModelCanvasSimple.tsx`
- **Layout:**
  - Desktop: `grid-cols-5` + `min-w-[1200px]`
  - Mobile: Accordion view (MobileCanvasAccordion)
  - Sticky notes systém
  - Drag & drop (plánováno)

### **✅ CanvasValidator.tsx**
- **Popis:** Validátor pro BMC (červené/zelené checkmarky)
- **Path:** `/components/CanvasValidator.tsx`
- **Layout:**
  - Canvas: `scale(0.75)` preview
  - Validation rules: 9 bloků
  - Coverage percentage

### **📱 MobileCanvasAccordion.tsx**
- **Popis:** Mobile verze canvasu (accordion)
- **Path:** `/components/MobileCanvasAccordion.tsx`
- **Features:**
  - Sekce po sekci
  - Expand/collapse
  - Mobile optimized

---

## 🎯 VALUE PROPOSITION CANVAS

### **💎 ValuePropositionCanvas.tsx**
- **Popis:** VPC - Customer Profile + Value Map
- **Path:** `/components/ValuePropositionCanvas.tsx`
- **Layout:**
  - Desktop: 2 kolony (Customer | Value)
  - Mobile: Tabs nebo accordion

### **👤 VPCCustomerProfileCircle.tsx**
- **Popis:** Customer Profile (Jobs/Pains/Gains) - Kruhový design
- **Path:** `/components/VPCCustomerProfileCircle.tsx`
- **Features:**
  - Kruhový layout
  - 3 sekce (Jobs/Pains/Gains)
  - Sticky notes

### **🎁 VPCValueMapSquare.tsx**
- **Popis:** Value Map (Products/Pain Relievers/Gain Creators) - Čtvercový design
- **Path:** `/components/VPCValueMapSquare.tsx`
- **Features:**
  - Čtvercový layout
  - 3 sekce (Products/Pain Relievers/Gain Creators)
  - Sticky notes

### **📖 VPCCustomerProfileStory.tsx**
- **Popis:** Customer Profile jako story (alternativní view)
- **Path:** `/components/VPCCustomerProfileStory.tsx`
- **Features:**
  - Storytelling format
  - Persona builder

### **🔗 FitValidatorV2.tsx**
- **Popis:** Validátor FIT mezi Customer Profile a Value Map
- **Path:** `/components/FitValidatorV2.tsx`
- **Features:**
  - Match pains → pain relievers
  - Match gains → gain creators
  - Coverage percentage
  - Warnings & tips

---

## 🛠️ TOOLS & CALCULATORS

### **🎯 TargetCalculatorTool.tsx**
- **Popis:** Kalkulačka cílů (kolik zákazníků potřebuji?)
- **Path:** `/components/TargetCalculatorTool.tsx`
- **Features:**
  - Input: Měsíční cíl (Kč)
  - Input: Průměrná zakázka (Kč)
  - Output: Počet zákazníků

### **📊 SegmentSizeTool.tsx**
- **Popis:** Odhad velikosti segmentu
- **Path:** `/components/SegmentSizeTool.tsx`
- **Features:**
  - TAM/SAM/SOM kalkulace
  - Segment size estimator

### **💰 ProfitCalculator.tsx**
- **Popis:** Kalkulačka zisku (revenue - costs)
- **Path:** `/components/ProfitCalculator.tsx`
- **Features:**
  - Revenue calculator
  - Cost breakdown
  - Profit margin

### **🔧 ProblemSolver.tsx**
- **Popis:** Nástroj na identifikaci problémů zákazníka
- **Path:** `/components/ProblemSolver.tsx`
- **Features:**
  - Problem discovery
  - Solution mapping

### **📋 BusinessActionPlan.tsx**
- **Popis:** Automatický akční plán (3 kroky)
- **Path:** `/components/BusinessActionPlan.tsx`
- **Features:**
  - Generuje se z vyplněného canvasu
  - 3 kroky (Tento týden / Příští týden / Za měsíc)
  - Personalizovaný

---

## 📱 MOBILE KOMPONENTY

### **📲 MobileSidebarContent.tsx**
- **Popis:** Mobile verze sidebaru (bottom sheet)
- **Path:** `/components/MobileSidebarContent.tsx`
- **Features:**
  - Bottom drawer
  - Module navigation
  - Progress tracking

### **👆 SwipeLessonNavigation.tsx**
- **Popis:** Swipe between lessons (mobile)
- **Path:** `/components/SwipeLessonNavigation.tsx`
- **Features:**
  - Touch gestures
  - Smooth transitions

### **📱 MobileSingleSection.tsx**
- **Popis:** Single section view (mobile canvas)
- **Path:** `/components/MobileSingleSection.tsx`
- **Features:**
  - One section at a time
  - Navigation arrows
  - Optimized layout

---

## 🎨 UI & HELPERS

### **📝 LessonContentRenderer.tsx**
- **Popis:** Renderer pro markdown/HTML obsah lekcí
- **Path:** `/components/LessonContentRenderer.tsx`
- **Features:**
  - Markdown support
  - Code highlighting
  - Custom components

### **💾 AutosaveIndicator.tsx**
- **Popis:** Visual indicator pro auto-save
- **Path:** `/components/AutosaveIndicator.tsx`
- **Features:**
  - Saving / Saved states
  - Toast notifications

### **🏆 AchievementNotification.tsx**
- **Popis:** Achievement unlock notification
- **Path:** `/components/AchievementNotification.tsx`
- **Features:**
  - Pop-up notification
  - Confetti effect
  - Achievement details

### **🔄 PullToRefresh.tsx**
- **Popis:** Pull-to-refresh (mobile)
- **Path:** `/components/PullToRefresh.tsx`
- **Features:**
  - Touch gesture
  - Reload content

---

## 📚 DATA & EXAMPLES

### **🎨 BusinessModelGallery.tsx**
- **Popis:** Galerie vzorových business modelů
- **Path:** `/components/BusinessModelGallery.tsx`
- **Features:**
  - 4 vzorové modely
  - Carousel view
  - Clickable examples

### **💡 SimpleBusinessExamples.tsx**
- **Popis:** Jednoduché příklady byznysů
- **Path:** `/components/SimpleBusinessExamples.tsx`
- **Features:**
  - Real-world examples
  - Before/After

### **📊 module3-data.ts**
- **Popis:** Data pro Modul 3 (VPC)
- **Path:** `/components/module3-data.ts`
- **Features:**
  - Lesson content
  - Examples
  - Tips

---

## 🎯 SEGMENT SELECTOR

### **🎯 SegmentSelector.tsx**
- **Popis:** Výběr cílového segmentu
- **Path:** `/components/SegmentSelector.tsx`
- **Features:**
  - Multi-segment support
  - Toggle between segments
  - Saved to Supabase

---

## 🔐 LIBS & UTILS

### **📦 /lib/courseProgress.ts**
- **Popis:** Course progress management
- **Features:**
  - Load/save progress
  - Lesson completion
  - Module completion

### **🏆 /lib/achievements.ts**
- **Popis:** Achievement system
- **Features:**
  - Unlock achievements
  - Track progress
  - Gamification

### **🎊 /lib/confetti.ts**
- **Popis:** Confetti effects
- **Features:**
  - celebrateModuleComplete()
  - celebrateLessonComplete()

### **📱 /lib/useOrientation.ts**
- **Popis:** Device orientation hook
- **Features:**
  - Detect portrait/landscape
  - Mobile/desktop detection

---

## ⚙️ DESKTOP CANVAS LAYOUT SPECS

**✅ FUNGUJÍCÍ DESKTOP LAYOUT (2025-01-20):**

### **Lekce 16 (Interaktivní cvičení):**
```tsx
<div className="max-w-[1600px] mx-auto">
  <BusinessModelCanvasSimple />
</div>
```
- Canvas width: `max-w-[1600px]` (extra wide!)
- Canvas grid: `min-w-[1200px]`
- Padding: `px-6`
- No horizontal scrollbar! ✅

### **Lekce 10 (Canvas Validator):**
```tsx
<div className="max-w-6xl mx-auto">
  <div className="scale-75 origin-top">
    <BusinessModelCanvasSimple readOnly />
  </div>
</div>
```
- Container: `max-w-6xl`
- Canvas: `scale(0.75)` preview
- Read-only mode

### **Dashboard (Canvas Preview):**
```tsx
<div className="scale-75 origin-top">
  <BusinessModelCanvasSimple readOnly />
</div>
```
- Scaled canvas preview
- Read-only mode

---

## 🚨 KRITICKÁ PRAVIDLA

### **❌ CO NEDĚLAT:**
1. **NEMAZAT** žádnou z těchto komponent bez zálohy!
2. **NETESTOVAT** mobilní změny přímo na desktop verzi!
3. **NEMENŠIT** `max-w-[1600px]` pro Lekci 16 (rozesere se layout!)
4. **NEMENŠIT** canvas grid `min-w-[1200px]` (horizontal scrollbar!)

### **✅ CO DĚLAT:**
1. **TESTOVAT** desktop verzi před merge!
2. **VYTVOŘIT** separátní mobile komponenty!
3. **POUŽÍVAT** responsive conditional rendering!
4. **DOKUMENTOVAT** změny v WORK_CONTEXT.md!

---

## 📱 MOBILE VS DESKTOP

### **DESKTOP (works!):**
- Sidebar vlevo (fixed)
- Content vpravo (wide)
- Canvas: `max-w-[1600px]` (Lekce 16)
- Canvas: `min-w-[1200px]` grid
- No horizontal scrollbar ✅

### **MOBILE (separate!):**
- Bottom nav
- Swipe navigation
- Accordion canvas (MobileCanvasAccordion)
- Single section view (MobileSingleSection)

---

## 🎯 SNAPSHOT INFO

**Git commit:** (TODO: Add git commit hash když uděláme zálohu)  
**Funkční features:**
- ✅ Desktop layout (wide canvas)
- ✅ Canvas validator (scaled preview)
- ✅ VPC komponenty (circle + square)
- ✅ Tools & calculators
- ✅ Auto-save
- ✅ Achievements
- ✅ Progress tracking
- ✅ Token auth

**Známé problémy:**
- ⚠️ Mobile canvas accordion (work in progress)
- ⚠️ Landscape mode (disabled in lessons)

---

## 📞 KONTAKT

**Pokud potřebuješ obnovit desktop verzi:**
1. Podívej se do této dokumentace
2. Zkontroluj `/WORK_CONTEXT.md`
3. Otevři git historii (pokud máme)
4. V nouzi vrať komponenty z backupu

**Bottom line:** Tato dokumentace = SAFE ZONE pro desktop kurz! 🎓✅

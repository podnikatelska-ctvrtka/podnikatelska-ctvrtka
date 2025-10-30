# 📱 Mobile Cheatsheet - Quick Reference

**Vytvořeno:** 2025-01-24  
**Pro:** Rychlý přehled mobilní implementace

## 🎯 One-liner

**Vytvořili jsme novou složku `/mobile-course/` s accordion komponentami pro mobile verzi kurzu. Desktop zůstává nezměněný.**

---

## 📁 Soubory

```bash
# NOVÉ
/components/mobile-course/
  ├── README.md                   # Architecture docs
  ├── MobileCourseModule1.tsx     # ✅ Modul 1 (BMC)
  ├── MobileCourseModule2.tsx     # 🔄 TODO (VPC)
  ├── MobileCourseModule3.tsx     # 🔄 TODO (FIT)
  └── MobileCourseDashboard.tsx   # 🔄 TODO

# UPRAVENÉ
/components/CourseDemoV3.tsx      # Přidán conditional render

# DOKUMENTACE
/MOBILE_INTEGRATION_PLAN.md      # Jak integrovat
/MOBILE_QUICK_TEST.md             # Jak testovat
/MOBILE_STRATEGY_2025-01-24.md   # Strategie
/MOBILE_VISUAL_FLOW.md            # Visual diagramy
/HOTOVO_MOBILE_V1.md              # Summary
/MOBILE_CHEATSHEET.md             # Tento soubor
```

---

## 🧪 Testování

### Desktop (musí být BEZE ZMĚN):
```bash
npm run dev
# http://localhost:5173/#course-v3?dev=true
# Zkontroluj: sidebar vlevo, lekce uprostřed, canvas vpravo
```

### Mobile (Dev Tools):
```bash
npm run dev
# F12 → Ctrl+Shift+M → iPhone 12 Pro
# http://localhost:5173/#course-v3?dev=true
# Zkontroluj: accordion view, rozklikávací lekce
```

### Real Mobile (ngrok):
```bash
npm run dev                    # Terminál 1
ngrok http 5173                # Terminál 2
# Otevři ngrok URL na mobilu + /#course-v3?dev=true
```

---

## 🔧 Debug Commands

### Check breakpoint:
```javascript
console.log(window.innerWidth);  // Mělo by být < 768 pro mobile
```

### Check mobile state:
```javascript
console.log({
  isMobile,
  showMainDashboard,
  showActionPlan,
  showTool
});
// isMobile: true + ostatní false = mobile view
```

### Check canvas data:
```javascript
console.log(canvasData);
// Mělo by obsahovat sections (segments, value, etc.)
```

---

## 📝 Conditional Render

```typescript
// V CourseDemoV3.tsx (~line 2056)

// MOBILE (< 768px)
if (isMobile && !showMainDashboard && !showActionPlan && !showTool) {
  return <MobileCourseModule1 ... />
}

// DESKTOP (>= 768px nebo v dashboardu/tools)
return <div className="h-screen flex">...</div>
```

---

## 🎨 Props Pattern

```typescript
<MobileCourseModule1
  moduleData={MODULE_1}              // Lekce, content
  canvasData={{                       // Canvas items
    segments: [...],
    value: [...],
    ...
  }}
  onCanvasUpdate={(section, items) => ...}  // Update handler
  completedLessons={completedLessons}       // Set<number>
  onLessonComplete={(id) => ...}             // Complete handler
  currentLessonIndex={0}                     // Active lesson
  onLessonChange={(index) => ...}            // Navigation
/>
```

---

## 🔀 Data Flow

```
User action (add item)
  ↓
MobileCourseModule1.onCanvasUpdate()
  ↓
CourseDemoV3.handleMobileCanvasUpdate()
  ↓
Update local state (canvasSections)
  ↓
Save to Supabase (user_canvas_data)
  ↓
Re-render with new data
```

---

## ✅ Checklist

### Desktop test:
- [ ] Sidebar funguje
- [ ] Lekce fungují
- [ ] Canvas funguje
- [ ] Progress tracking funguje
- [ ] Nic se nezměnilo ✅

### Mobile test:
- [ ] Accordion view se zobrazí
- [ ] Lekce jdou rozbalit
- [ ] Canvas bottom sheet funguje
- [ ] Add items funguje
- [ ] Complete lesson funguje
- [ ] Lock/unlock funguje

---

## 🚨 Known Issues

### 1. Dashboard se přeskakuje
❌ **Expected:** Mobile rovnou Module 1  
✅ **Fix:** Later - `MobileCourseDashboard.tsx`

### 2. Module 2/3 = "Coming Soon"
❌ **Expected:** Placeholder  
✅ **Fix:** Create `MobileCourseModule2/3.tsx`

### 3. Canvas data možná prázdná
❌ **Possible:** Empty canvas na začátku  
✅ **Fix:** Add loading logic if needed

---

## 🎯 File Locations

```bash
# Main files
/components/CourseDemoV3.tsx                # Line ~2056 (mobile render)
/components/mobile-course/MobileCourseModule1.tsx

# Reused components
/components/MobileCanvasAccordion.tsx       # Accordion UI
/components/BottomSheet.tsx                  # Add item modal
/lib/courseProgress.ts                       # Progress tracking
/lib/haptics.ts                              # Touch feedback

# Docs
/components/mobile-course/README.md          # Architecture
/MOBILE_INTEGRATION_PLAN.md                  # Integration
/MOBILE_QUICK_TEST.md                        # Testing
```

---

## 🚀 Next Steps

```
Phase 1: Test Module 1         ← YOU ARE HERE
Phase 2: Create Module 2/3
Phase 3: Create Dashboard
Phase 4: UX Polish
Phase 5: Production
```

---

## 📞 Quick Help

### Problem: Mobile view not showing
```javascript
// Check:
1. window.innerWidth < 768? 
2. isMobile = true?
3. showMainDashboard/showActionPlan/showTool = false?
4. Import exists: MobileCourseModule1?
```

### Problem: Canvas not working
```javascript
// Check:
1. canvasData prop populated?
2. onCanvasUpdate callback working?
3. Supabase save successful?
4. Console errors?
```

### Problem: Desktop broken
```javascript
// Solution:
1. Remove mobile code temporarily
2. Comment out `if (isMobile)` block
3. Desktop should work again
4. Debug mobile separately
```

---

## 🏆 Success Criteria

✅ Desktop unchanged  
✅ Mobile shows accordion  
✅ Canvas works  
✅ Progress saves  
✅ UX smooth  

---

**Hotline:** Viz dokumentace v `/MOBILE_*.md` souborech

# 📱 MOBILE ISSUES TRACKER
**Date:** 2025-01-24  
**Goal:** Track mobile-specific issues a fixes

---

## **🚨 CURRENT STATUS:**

```
Desktop: ✅ READY FOR TESTING
Mobile:  🔧 IN PROGRESS
```

---

## **📋 ZNÁMÉ MOBILNÍ PROBLÉMY:**

### **🔴 PRIORITY 1 - CRITICAL (Blokují použití)**

#### **1. LANDSCAPE MODE - KURZ**
- **PROBLÉM:** Lekce v landscape režimu na mobilu nejsou optimalizované
- **STATUS:** ⚠️ ZNÁMÝ ISSUE
- **ŘEŠENÍ:** Force portrait mode pro lekce?
- **FILE:** `/components/CourseDemoV3.tsx`
- **DOCS:** `/LANDSCAPE_MODE_DECISION.md`

#### **2. TOUCH TARGETS - PŘÍLIŠ MALÉ**
- **PROBLÉM:** Některá tlačítka < 48px (špatné pro touch)
- **STATUS:** 🔧 TODO
- **ŘEŠENÍ:** Media query + min-height: 48px
- **FILES:** `/styles/globals.css`

#### **3. FONT SIZE - iOS ZOOM**
- **PROBLÉM:** Inputy < 16px způsobují auto-zoom na iOS
- **STATUS:** 🔧 TODO
- **ŘEŠENÍ:** Media query + font-size: 16px pro všechny inputy
- **FILES:** `/styles/globals.css`

---

### **🟡 PRIORITY 2 - IMPORTANT (Špatný UX)**

#### **4. SIDEBAR - PŘEKRÝVÁ OBSAH**
- **PROBLÉM:** Desktop sidebar je viditelný na mobilu?
- **STATUS:** ✅ MOŽNÁ UŽ OPRAVENO (MobileBottomNav)
- **VERIFY:** Testovat na reálném mobilu
- **FILES:** `/components/CourseDemoV3.tsx`

#### **5. KALKULAČKY - WIDE LAYOUT**
- **PROBLÉM:** Kalkulačky mají desktop layout na mobilu
- **STATUS:** 🔧 TODO
- **ŘEŠENÍ:** Media query + stacked layout
- **FILES:** 
  - `/components/TargetCalculatorTool.tsx`
  - `/components/ProfitCalculator.tsx`

#### **6. BUSINESS MODEL CANVAS - PŘÍLIŠ MALÝ**
- **PROBLÉM:** 9 boxů je moc na malé obrazovce
- **STATUS:** ✅ MOŽNÁ UŽ OPRAVENO (MobileCanvasAccordion)
- **VERIFY:** Testovat accordion mode
- **FILES:** `/components/MobileCanvasAccordion.tsx`

#### **7. ACHIEVEMENTS - MALÉ NOTIFIKACE**
- **PROBLÉM:** Toast notifications jsou malé na mobilu
- **STATUS:** 🔧 TODO
- **ŘEŠENÍ:** Větší toast nebo bottom sheet
- **FILES:** `/components/AchievementNotification.tsx`

---

### **🟢 PRIORITY 3 - NICE TO HAVE (Vylepšení UX)**

#### **8. SWIPE NAVIGATION**
- **PROBLÉM:** Není možné swipe mezi lekcemi
- **STATUS:** ⚠️ MOŽNÁ IMPLEMENTOVÁNO (SwipeLessonNavigation)
- **VERIFY:** Testovat na mobilu
- **FILES:** `/components/SwipeLessonNavigation.tsx`

#### **9. PULL TO REFRESH**
- **PROBLÉM:** Není pull-to-refresh funkce
- **STATUS:** ⚠️ MOŽNÁ IMPLEMENTOVÁNO (PullToRefresh)
- **VERIFY:** Testovat na mobilu
- **FILES:** `/components/PullToRefresh.tsx`

#### **10. HAPTIC FEEDBACK**
- **PROBLÉM:** Chybí haptická odezva (vibrace)
- **STATUS:** ⚠️ MOŽNÁ IMPLEMENTOVÁNO (haptics.ts)
- **VERIFY:** Testovat na mobilu
- **FILES:** `/lib/haptics.ts`

---

## **🛠️ PLÁNOVANÉ FIXES:**

### **FIX 1: TOUCH TARGETS**

**ŘEŠENÍ:**
```css
/* ✅ PŘIDAT do /styles/globals.css */

@media (max-width: 768px) {
  button,
  a[role="button"],
  input[type="submit"],
  input[type="button"] {
    min-height: 48px;
    min-width: 48px;
    padding: 12px 16px;
  }
}
```

**STATUS:** 📋 READY TO IMPLEMENT

---

### **FIX 2: INPUT FONT SIZE (iOS ZOOM FIX)**

**ŘEŠENÍ:**
```css
/* ✅ PŘIDAT do /styles/globals.css */

@media (max-width: 768px) {
  input,
  textarea,
  select {
    font-size: 16px !important;
  }
  
  /* Preserve number input styling */
  input[type="number"] {
    font-size: 16px;
  }
}
```

**STATUS:** 📋 READY TO IMPLEMENT

---

### **FIX 3: KALKULAČKY - STACKED LAYOUT**

**ŘEŠENÍ:**
```css
/* ✅ PŘIDAT do /styles/globals.css */

@media (max-width: 768px) {
  /* Target calculator grid */
  .calculator-grid {
    grid-template-columns: 1fr !important;
    gap: 1rem;
  }
  
  /* Profit calculator cards */
  .profit-cards {
    flex-direction: column;
  }
}
```

**STATUS:** 📋 READY TO IMPLEMENT

---

### **FIX 4: ACHIEVEMENTS - VĚTŠÍ NOTIFIKACE**

**ŘEŠENÍ:**
```css
/* ✅ PŘIDAT do /styles/globals.css */

@media (max-width: 768px) {
  /* Sonner toast (achievement notifications) */
  [data-sonner-toast] {
    width: 90vw !important;
    bottom: 80px !important; /* Nad bottom nav */
    left: 50% !important;
    transform: translateX(-50%) !important;
  }
}
```

**STATUS:** 📋 READY TO IMPLEMENT

---

### **FIX 5: LANDSCAPE MODE - FORCE PORTRAIT**

**OPTION A: CSS Warning**
```css
@media (max-width: 768px) and (orientation: landscape) {
  .landscape-warning {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: orange;
    padding: 8px;
    text-align: center;
    z-index: 9999;
  }
}
```

**OPTION B: JavaScript Lock**
```tsx
// Použít screen.orientation.lock() API
// POZOR: Funguje jen v PWA režimu!
```

**STATUS:** 🤔 DISCUSS - Chceme force portrait?

---

## **🧪 TESTING CHECKLIST:**

### **PŘED KAŽDOU ZMĚNOU:**
- [ ] Screenshot desktop verze
- [ ] Test v prohlížeči (>1200px)
- [ ] Verify že desktop vypadá stejně

### **PO KAŽDÉ ZMĚNĚ:**
- [ ] Test mobile view (375px)
- [ ] Test tablet view (768px)
- [ ] Porovnat desktop se screenshotem
- [ ] Verify že desktop je NEDOTČENÝ

### **TESTOVACÍ DEVICES:**
- [ ] iPhone SE (320px)
- [ ] iPhone 12/13/14 (375px)
- [ ] iPhone 12/13/14 Pro (390px)
- [ ] iPhone 12/13/14 Pro Max (414px)
- [ ] iPad (768px)
- [ ] Desktop (1200px+)

---

## **📊 PROGRESS TRACKER:**

```
CRITICAL FIXES:  0/3  (0%)
IMPORTANT FIXES: 0/4  (0%)
NICE TO HAVE:    0/3  (0%)

TOTAL: 0/10 (0%)
```

---

## **🔜 NEXT STEPS:**

1. **Deploy desktop** → Production
2. **Verify desktop works** → Live testing
3. **Start mobile fixes** → Priority 1 first
4. **Test každou změnu** → Desktop MUSÍ zůstat nedotčený
5. **Deploy mobile** → Postupně (1 fix at a time)

---

## **📝 NOTES:**

- Všechny mobile fixes použijí **media queries** v `/styles/globals.css`
- **ŽÁDNÉ** změny v desktop komponentách
- **POUZE** CSS overrides pro mobile
- Testovat po každé změně!

---

**Last Updated:** 2025-01-24  
**Status:** 📋 READY TO START  
**Rule:** ❌ NEVER TOUCH DESKTOP COMPONENTS

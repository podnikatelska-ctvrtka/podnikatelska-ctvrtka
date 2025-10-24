# 📱 MOBILE OPTIMIZATION STRATEGY
**Date:** 2025-01-24  
**Goal:** Optimalizovat mobilní UX BEZ OVLIVNĚNÍ desktopu

---

## **🎯 KLÍČOVÉ PRAVIDLO:**

```
❌ NIKDY nesahat na desktop logic/layout
✅ Použít media queries + separate components
```

---

## **🛠️ STRATEGIE A: MEDIA QUERIES (CSS ONLY)**

**PRO:** Layout, styling, spacing, visibility  
**PROTI:** Komplexní logika, různé komponenty

### **POUŽITÍ:**

```css
/* ✅ PŘIDEJ do /styles/globals.css */

/* 📱 MOBILE-ONLY STYLES */
@media (max-width: 768px) {
  /* Your mobile-specific styles here */
}

/* 🖥️ DESKTOP-ONLY STYLES */
@media (min-width: 769px) {
  /* Desktop stays untouched */
}
```

### **PŘÍKLAD - SIDEBAR:**

```css
@media (max-width: 768px) {
  /* Hide desktop sidebar on mobile */
  .course-sidebar {
    display: none;
  }
  
  /* Show mobile bottom nav instead */
  .mobile-bottom-nav {
    display: flex;
  }
}

@media (min-width: 769px) {
  /* Desktop sidebar stays visible */
  .course-sidebar {
    display: block;
  }
  
  /* Hide mobile nav on desktop */
  .mobile-bottom-nav {
    display: none;
  }
}
```

---

## **🛠️ STRATEGIE B: SEPARATE COMPONENTS**

**PRO:** Komplexní logika, různé komponenty, různé layouty  
**PROTI:** Duplicita kódu, více maintenance

### **POUŽITÍ:**

```tsx
// ✅ Vytvořit mobilní verzi komponenty
// /components/CourseDemoV3_Mobile.tsx

import { useMediaQuery } from './ui/use-mobile';

export default function SomeComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return isMobile ? <Component_Mobile /> : <Component_Desktop />;
}
```

### **STRUKTURA:**

```
/components
  ├── CourseDemoV3.tsx          // ← DESKTOP (nedotýkat se!)
  ├── CourseDemoV3_Mobile.tsx   // ← MOBILE (nová komponenta)
  ├── CourseSidebar.tsx         // ← DESKTOP
  └── MobileSidebarContent.tsx  // ← MOBILE (už existuje)
```

---

## **🛠️ STRATEGIE C: CONDITIONAL RENDERING**

**PRO:** Malé změny, rychlé iterace  
**PROTI:** Může znepřehlednit kód

### **POUŽITÍ:**

```tsx
import { useMediaQuery } from './ui/use-mobile';

export function SomeComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <div>
      {/* Desktop version */}
      {!isMobile && (
        <div className="desktop-layout">
          {/* Desktop-specific content */}
        </div>
      )}
      
      {/* Mobile version */}
      {isMobile && (
        <div className="mobile-layout">
          {/* Mobile-specific content */}
        </div>
      )}
    </div>
  );
}
```

---

## **📋 DOPORUČENÝ PŘÍSTUP PRO JEDNOTLIVÉ ČÁSTI:**

### **1. LESSONS (Lekce v kurzu)**

**PROBLÉM:**
- Desktop má prose styling
- Mobile potřebuje větší touch targets
- Mobile potřebuje jiný spacing

**ŘEŠENÍ:**
```css
/* ✅ Media queries v globals.css */

.prose {
  /* Desktop defaults */
}

@media (max-width: 768px) {
  .prose {
    /* Mobile overrides */
    font-size: 16px;
    line-height: 1.6;
  }
  
  .prose p {
    margin-bottom: 1rem;
  }
  
  .prose button {
    min-height: 48px; /* Touch target */
  }
}
```

---

### **2. SIDEBAR / NAVIGATION**

**PROBLÉM:**
- Desktop má fixed sidebar
- Mobile potřebuje bottom nav nebo hamburger

**ŘEŠENÍ:**
```tsx
// ✅ Už máme: MobileSidebarContent.tsx
// ✅ Už máme: MobileBottomNav.tsx
// ✅ Conditional rendering v CourseDemoV3.tsx

{isMobile ? (
  <MobileBottomNav />
) : (
  <CourseSidebar />
)}
```

**STATUS:** ✅ Už implementováno

---

### **3. BUSINESS MODEL CANVAS**

**PROBLÉM:**
- Desktop má velký grid (9 boxů)
- Mobile potřebuje accordion nebo single-section view

**ŘEŠENÍ:**
```tsx
// ✅ Už máme: MobileCanvasAccordion.tsx
// ✅ Už máme: MobileSingleSection.tsx

{isMobile ? (
  <MobileCanvasAccordion />
) : (
  <BusinessModelCanvas />
)}
```

**STATUS:** ✅ Už implementováno

---

### **4. KALKULAČKY (Tools)**

**PROBLÉM:**
- Desktop má wide layout
- Mobile potřebuje stacked layout + větší touch targets

**ŘEŠENÍ:**
```css
/* ✅ Media queries */

@media (max-width: 768px) {
  .calculator-grid {
    grid-template-columns: 1fr; /* Stack na mobilu */
  }
  
  .calculator-input {
    min-height: 48px; /* Touch target */
    font-size: 16px; /* iOS zoom prevention */
  }
}
```

---

### **5. ACHIEVEMENTS NOTIFICATIONS**

**PROBLÉM:**
- Desktop má toast v rohu
- Mobile potřebuje větší notification (bottom sheet?)

**ŘEŠENÍ:**
```css
/* ✅ Media queries */

@media (max-width: 768px) {
  .achievement-toast {
    width: 90vw;
    bottom: 80px; /* Nad bottom nav */
    left: 50%;
    transform: translateX(-50%);
  }
}
```

---

## **🚨 CO NEDĚLAT:**

### **❌ NIKDY:**

1. **Neměň desktop komponenty přímo**
   ```tsx
   // ❌ ŠPATNĚ:
   export function CourseDemoV3() {
     if (isMobile) {
       return <MobileVersion />;
     }
     // Desktop logic...
   }
   ```

2. **Nepoužívej inline conditions v desktop komponentách**
   ```tsx
   // ❌ ŠPATNĚ:
   <div className={isMobile ? "mobile" : "desktop"}>
   ```

3. **Nemazať desktop CSS**
   ```css
   /* ❌ ŠPATNĚ: */
   .some-class {
     /* Removing desktop styles */
   }
   ```

### **✅ SPRÁVNĚ:**

1. **Vytvoř novou komponentu pro mobile**
   ```tsx
   // ✅ SPRÁVNĚ:
   export function CourseDemoV3_Mobile() {
     // Mobile-specific logic
   }
   ```

2. **Použij media queries pro CSS**
   ```css
   /* ✅ SPRÁVNĚ: */
   @media (max-width: 768px) {
     .some-class {
       /* Mobile overrides */
     }
   }
   ```

3. **Conditional rendering na top level**
   ```tsx
   // ✅ SPRÁVNĚ:
   {isMobile ? <Component_Mobile /> : <Component_Desktop />}
   ```

---

## **📋 MOBILE OPTIMIZATION CHECKLIST:**

### **PRIORITY 1 - CRITICAL:**
- [ ] Touch targets min 48x48px
- [ ] Font size min 16px (iOS zoom prevention)
- [ ] Bottom nav funguje správně
- [ ] Lekce jsou scrollable
- [ ] Canvas má accordion view

### **PRIORITY 2 - IMPORTANT:**
- [ ] Achievements notifications větší
- [ ] Kalkulačky stacked layout
- [ ] Tools responsive
- [ ] Safe area insets (iPhone notch)

### **PRIORITY 3 - NICE TO HAVE:**
- [ ] Swipe gestures pro navigaci
- [ ] Pull to refresh
- [ ] Haptic feedback
- [ ] Offline mode optimalizace

---

## **🧪 TESTOVACÍ WORKFLOW:**

### **1. DESKTOP TESTING (nejprve!):**
```bash
# Otevři v browseru (>1200px width)
npm run dev

# Zkontroluj že NIČÍM se nezměnil desktop
# Porovnej s production / screenshots
```

### **2. MOBILE TESTING:**
```bash
# Otevři DevTools → Responsive mode (375px)
npm run dev

# NEBO použij lokální tunnel:
npx localtunnel --port 5173

# Test na reálném mobilu (iOS/Android)
```

### **3. BREAKPOINT TESTING:**
```
Testuj na šířkách:
- 320px (iPhone SE)
- 375px (iPhone 12/13/14)
- 390px (iPhone 12/13/14 Pro)
- 414px (iPhone 12/13/14 Pro Max)
- 768px (iPad portrait)
- 1024px (iPad landscape)
- 1200px+ (Desktop)
```

---

## **📂 RELATED FILES:**

### **MOBILE COMPONENTS (už existují):**
- `/components/MobileBottomNav.tsx`
- `/components/MobileSidebarContent.tsx`
- `/components/MobileCanvasAccordion.tsx`
- `/components/MobileSingleSection.tsx`
- `/components/MobileProgressBar.tsx`
- `/components/OptimizedMobileCTA.tsx`

### **DESKTOP COMPONENTS (nedotýkat!):**
- `/components/CourseDemoV3.tsx`
- `/components/CourseSidebar.tsx`
- `/components/BusinessModelCanvas.tsx`
- `/components/TargetCalculatorTool.tsx`

### **STYLING:**
- `/styles/globals.css` - Pro media queries

---

## **🔜 NEXT STEPS:**

1. **Identify specific mobile issues** → Co přesně nefunguje?
2. **Create mobile document** → Separate tracking
3. **Implement fixes one by one** → Test každou změnu
4. **Keep desktop untouched** → Verify po každé změně

---

**Last Updated:** 2025-01-24  
**Status:** 📋 READY TO START  
**Rule:** ❌ NEVER TOUCH DESKTOP

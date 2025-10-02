# 📱 DEVICE TESTING GUIDE & CHECKLIST

## **🎯 TESTOVACÍ STRATEGIE**

### **Priority Devices:**
```
1. iPhone SE (375px) - Nejmenší běžný displej
2. iPhone 12/13/14 (390px) - Nejběžnější iPhone
3. Android Medium (412px) - Google Pixel, Samsung
4. iPad/Tablet (768px+) - Tablet test
5. Desktop (1280px+) - Large screen
```

---

## **📋 MASTER CHECKLIST**

### **✅ CRITICAL ISSUES (MUSÍ FUNGOVAT)**

#### **1. EMAIL SUBMISSION (TOP PRIORITY)**
```
Test: PrelaunchEmailCapture
□ Email input viditelný na všech zařízeních
□ Email input má min 44px výšku (touch-friendly)
□ Placeholder text čitelný
□ Validace funguje (neplatný email)
□ Submit button klikatelný
□ Loading state zobrazuje se
□ Success message zobrazuje se
□ Error handling funguje
□ Keyboard nevykrývá input (mobile)
□ Focus state viditelný
```

#### **2. NAVIGATION & PROGRESS BAR**
```
Test: MobileProgressBar
□ Fixed position funguje
□ Progress animace smooth
□ Texty se nelámou
□ Click scrolluje na CTA
□ Neblokuje obsah
□ Správné sekce detekované
□ Gradient progress viditelný
□ Z-index správný (nad obsahem)
```

#### **3. STICKY CTA BUTTON**
```
Test: OptimizedMobileCTA
□ Zobrazuje se po solution sekci
□ Skrývá se v case study
□ Zobrazuje se znovu po case study
□ Click scrolluje na email input
□ Animations smooth
□ Rotující messages fungují
□ Progress dots viditelné
□ Neblokuje důležitý obsah
```

#### **4. TOOLTIP MODAL (Hero)**
```
Test: HeroSection - Mobile tooltip
□ Click na blok otevře modal
□ Modal centrovaný
□ Backdrop viditelný
□ Auto-dismiss po 4s funguje
□ Progress bar countdown viditelný
□ X button klikatelný
□ Click outside zavře modal
□ Smooth animations
□ Žádné scrollování pozadí
□ Text čitelný
```

---

### **⚠️ IMPORTANT ISSUES (MĚLO BY FUNGOVAT)**

#### **5. RESPONSIVE LAYOUT**
```
Test: Všechny sekce
□ Grid → Stack na mobilu správně
□ Images škálují se správně
□ No horizontal scroll
□ Padding konzistentní (px-4)
□ Max-width containery fungují
□ Flexbox layout neláme se
□ Cards mají správnou velikost
```

#### **6. TYPOGRAPHY & READABILITY**
```
Test: Všechny texty
□ Nadpisy čitelné (min 24px h2)
□ Body text min 16px
□ Line-height dostatečný (1.5+)
□ Kontrast dobrý (min 4.5:1)
□ Dlouhé texty se nelámou špatně
□ Mezery mezi odstavci OK
```

#### **7. TOUCH TARGETS**
```
Test: Všechny interaktivní elementy
□ Buttons min 44px výška
□ Links dostatečně velké
□ Spacing mezi buttons min 8px
□ Aktivní oblast dostatečná
□ Hover states fungují (desktop)
□ Active states fungují (mobile)
```

#### **8. ANIMATIONS & PERFORMANCE**
```
Test: Scroll animace
□ FadeInUp smooth
□ ScaleIn bez lagů
□ ProgressReveal funguje
□ Stagger animations OK
□ No jank při scrollu
□ Reduced motion respektováno
□ 60fps scroll
```

---

### **💡 NICE-TO-HAVE ISSUES**

#### **9. VISUAL POLISH**
```
Test: Visual consistency
□ Shadows rendering correctly
□ Gradients smooth
□ Border radius konzistentní
□ Colors správné
□ Icons správná velikost
□ Emoji rendering OK
```

#### **10. ACCESSIBILITY**
```
Test: A11y features
□ Keyboard navigation funguje
□ Tab order logický
□ Focus indicators viditelné
□ Alt texty na obrázcích
□ ARIA labels kde potřeba
□ Color contrast OK
```

---

## **🔍 DEVICE-SPECIFIC TESTS**

### **📱 IPHONE SE (375px) - SMALLEST**

#### **Critical Areas:**
```
1. HERO SECTION
   □ Interaktivní čtvrtka - 2 columns grid OK?
   □ Tooltip modal - fits na screen?
   □ CTA button viditelný?
   □ Benefity (2x2 grid) OK?

2. PROGRESS BAR
   □ Text nepřetéká? ("🎯 Úvod" viditelný?)
   □ "✨ Registrace" button viditelný?
   □ Progress gradient plná šířka?

3. PROBLEMS TIMELINE
   □ 2-column grid OK?
   □ Cards čitelné?
   □ Spacing dostatečný?
   □ Emotions emoji viditelné?

4. EMAIL CAPTURE
   □ Input celá šířka?
   □ Button celá šířka?
   □ Benefits stack vertically?
   □ Price dostatečně velká?
   □ Progress bar viditelný?

5. STICKY CTA
   □ Nepřekrývá důležitý obsah?
   □ Text čitelný?
   □ Icon + text fits?
```

#### **Known Issues to Check:**
```
⚠️ Text wrapping v progress baru
⚠️ Tooltip modal může být těsný
⚠️ Sticky CTA může zakrývat obsah
⚠️ Email input keyboard overlap
```

---

### **📱 IPHONE 12/13/14 (390px) - MOST COMMON**

#### **Should Be Perfect:**
```
✅ Progress bar má dostatek místa
✅ Tooltip modal komfortní
✅ Grid layouts ideální
✅ Touch targets dostatečné
✅ Typography perfektní
```

#### **Check:**
```
□ All animations smooth
□ No performance issues
□ Perfect spacing
□ Comfortable reading
```

---

### **📱 ANDROID (412px) - GOOGLE PIXEL**

#### **Android-Specific:**
```
□ Fonts rendering OK (Android font stack)
□ Shadows správně (různý rendering)
□ Touch ripple effects OK
□ Back button behavior
□ Chrome mobile menu nekonfliktuje
```

---

### **📱 TABLET (768px+) - iPAD**

#### **Breakpoint Test:**
```
□ md: breakpoint aktivuje se správně
□ Grid 2-column layout funguje
□ Desktop CTA zobrazuje se
□ Mobile progress bar skrývá se
□ Spacing má desktop hodnoty
□ Typography větší
```

---

### **💻 DESKTOP (1280px+)**

#### **Desktop Features:**
```
□ Hero desktop CTA viditelné
□ Interactive čtvrtka 3-column
□ Hover states fungují
□ Magnetic hover effects OK
□ Glow effects viditelné
□ Progress bar SKRYTÝ (md:hidden)
□ Sticky CTA SKRYTÝ (md:hidden)
```

---

## **🐛 COMMON BUGS TO CHECK**

### **1. Layout Breaks:**
```
❌ Horizontal scroll appears
❌ Content overflow z containeru
❌ Grid items different heights
❌ Flexbox wrapping špatně
❌ Fixed elements position wrong

Kde hledat:
- Hero section grid
- Problems timeline
- Testimonials cards
- Benefits grid
```

### **2. Typography Issues:**
```
❌ Text příliš malý (pod 16px)
❌ Nadpisy se lámou na divných místech
❌ Line-height příliš těsný
❌ Orphan words (jedno slovo na řádku)
❌ Emoji různé velikosti

Kde hledat:
- Progress bar labels
- CTA button text
- Problem thoughts
- Testimonial quotes
```

### **3. Touch Target Problems:**
```
❌ Buttons menší než 44px
❌ Links moc blízko sebe
❌ Tooltip trigger moc malý
❌ Close button (X) těžko klikatelný

Kde hledat:
- Tooltip modal X button
- Progress bar click area
- Hero čtvrtka blocks
- Email submit button
```

### **4. Animation Jank:**
```
❌ Stutter při scrollu
❌ FPS drops během animací
❌ Layout shift při load
❌ Tooltip modal lag

Kde hledat:
- Scroll animations (FadeInUp)
- Tooltip modal open/close
- Progress bar update
- Sticky CTA show/hide
```

### **5. Z-Index Conflicts:**
```
❌ Progress bar pod obsahem
❌ Tooltip modal pod jiným elementem
❌ Sticky CTA pod footrem
❌ Dropdown menu pod modal

Kde hledat:
- MobileProgressBar (z-50)
- Tooltip modal (z-50)
- OptimizedMobileCTA (z-40)
```

---

## **📊 PERFORMANCE METRICS**

### **Target Metrics:**
```
First Contentful Paint:  < 1.5s
Largest Contentful Paint: < 2.5s
Time to Interactive:      < 3.5s
Cumulative Layout Shift:  < 0.1
First Input Delay:        < 100ms

Mobile Score (Lighthouse): 85+
```

### **How to Test:**
```bash
# Chrome DevTools
1. Open DevTools (F12)
2. Lighthouse tab
3. Mobile mode
4. Run audit
5. Check scores

# Mobile throttling
1. Network: Fast 3G
2. CPU: 4x slowdown
3. Test all interactions
```

---

## **🧪 TESTING SCENARIOS**

### **Scenario 1: First-Time Visitor**
```
1. ✅ Load stránky
2. ✅ Scroll přes Hero
3. ✅ Click na čtvrtka blok (tooltip)
4. ✅ Zavřít tooltip (auto nebo manual)
5. ✅ Scroll přes Problems
6. ✅ Watch progress bar update
7. ✅ Scroll do Solutions
8. ✅ Sticky CTA se objeví
9. ✅ Click na sticky CTA
10. ✅ Scroll na email input
11. ✅ Vyplnit email
12. ✅ Submit form
13. ✅ See success message
```

### **Scenario 2: Quick Converter**
```
1. ✅ Load stránky
2. ✅ Click progress bar "✨ Registrace"
3. ✅ Jump na CTA
4. ✅ Email input autofocus?
5. ✅ Quick submit
6. ✅ Success immediate
```

### **Scenario 3: Researcher**
```
1. ✅ Load stránky
2. ✅ Explore všechny čtvrtka blocks
3. ✅ Read všechny timeline steps
4. ✅ Swipe testimonials
5. ✅ Read case study
6. ✅ Scroll na CTA
7. ✅ Read benefity
8. ✅ Submit email
```

### **Scenario 4: Skeptic**
```
1. ✅ Load stránky
2. ✅ Skip Hero
3. ✅ Read Problems (relatability)
4. ✅ Check Testimonials (trust)
5. ✅ Study Case Study (proof)
6. ✅ Back to CTA
7. ✅ Finally convert
```

---

## **🚨 CRITICAL BUGS (STOP LAUNCH)**

### **These Must Work:**
```
❌ Email submission nefunguje
❌ Form validace broken
❌ Success message nezobrazuje se
❌ Horizontal scroll na mobilu
❌ Content completely hidden
❌ JavaScript errors v console
❌ CSS not loading
❌ Images 404
❌ Critical layout break
❌ Touch targets menší než 40px
```

---

## **⚠️ HIGH PRIORITY BUGS**

### **Fix Before Launch:**
```
⚠️ Progress bar text overflow
⚠️ Tooltip modal off-center
⚠️ Sticky CTA timing špatný
⚠️ Animations laggy
⚠️ Poor contrast (text unreadable)
⚠️ Form error states missing
⚠️ Mobile keyboard overlap
```

---

## **💡 MEDIUM PRIORITY BUGS**

### **Fix Soon After Launch:**
```
💡 Hover states nekonzistentní
💡 Loading states missing
💡 Minor spacing issues
💡 Icon sizes vary
💡 Animation timing tweaks
💡 Color slight off
```

---

## **📝 TESTING CHECKLIST - PRINT & USE**

### **Mobile Testing (iPhone SE 375px):**
```
[ ] Hero section loads correctly
[ ] Tooltip modal opens and closes
[ ] Progress bar updates on scroll
[ ] Sticky CTA appears at right time
[ ] Email form submission works
[ ] Success message displays
[ ] All animations smooth
[ ] No horizontal scroll
[ ] Touch targets adequate
[ ] Text readable (min 16px)
[ ] No console errors
```

### **Mobile Testing (iPhone 12 390px):**
```
[ ] All above tests
[ ] Spacing comfortable
[ ] Grid layouts perfect
[ ] Typography ideal
[ ] Performance excellent
```

### **Tablet Testing (iPad 768px):**
```
[ ] Desktop layout activates
[ ] 2-column grids work
[ ] Mobile progress bar hidden
[ ] Desktop CTA visible
[ ] Hover states work
```

### **Desktop Testing (1280px+):**
```
[ ] Full desktop experience
[ ] 3-column layouts
[ ] All hover effects
[ ] Magnetic interactions
[ ] Glow effects
[ ] No mobile elements visible
```

---

## **🔧 DEBUG TOOLS**

### **Browser DevTools:**
```javascript
// Check current viewport
console.log('Viewport:', window.innerWidth, 'x', window.innerHeight);

// Check if mobile
console.log('Is Mobile:', window.innerWidth < 768);

// Force mobile view
// DevTools > Toggle Device Toolbar (Cmd/Ctrl + Shift + M)

// Check scroll position
console.log('Scroll Y:', window.scrollY);

// Check element in viewport
const elem = document.querySelector('.hero-section');
console.log('In viewport:', elem.getBoundingClientRect());

// Monitor progress bar
const progressBar = document.querySelector('[data-section]');
console.log('Current section:', progressBar?.getAttribute('data-section'));
```

### **Quick Visual Check:**
```javascript
// Highlight all touch targets
document.querySelectorAll('button, a, input').forEach(el => {
  const height = el.offsetHeight;
  if (height < 44) {
    el.style.outline = '2px solid red';
    console.warn('Small touch target:', el, height + 'px');
  }
});

// Check text contrast
// Use browser extension: axe DevTools, WAVE
```

---

## **📱 REAL DEVICE TESTING**

### **If You Have Access:**
```
1. iPhone (Safari)
   - Test native scrolling
   - Test keyboard behavior
   - Test touch gestures
   - Test auto-fill

2. Android (Chrome)
   - Test back button
   - Test scroll behavior
   - Test keyboard
   - Test different screen sizes

3. iPad (Safari)
   - Test tablet layout
   - Test landscape mode
   - Test split view
```

### **If No Real Devices:**
```
Use Chrome DevTools Device Simulation:
1. F12 → Toggle Device Toolbar
2. Select device preset
3. Test all interactions
4. Change orientation
5. Test different networks (3G/4G)
```

---

## **✅ FINAL CHECKLIST BEFORE LAUNCH**

### **Functional:**
```
[ ] Email submission: WORKS ✅
[ ] Form validation: WORKS ✅
[ ] Success message: DISPLAYS ✅
[ ] Error handling: WORKS ✅
[ ] Progress bar: UPDATES ✅
[ ] Sticky CTA: APPEARS/HIDES ✅
[ ] Tooltip modal: WORKS ✅
[ ] All sections: VISIBLE ✅
```

### **Visual:**
```
[ ] No horizontal scroll ✅
[ ] All text readable ✅
[ ] Images load ✅
[ ] Colors correct ✅
[ ] Spacing comfortable ✅
[ ] Typography good ✅
[ ] Animations smooth ✅
[ ] No layout breaks ✅
```

### **Performance:**
```
[ ] Page loads < 3s ✅
[ ] Smooth scroll 60fps ✅
[ ] Animations no lag ✅
[ ] No console errors ✅
[ ] Lighthouse score 85+ ✅
```

### **Accessibility:**
```
[ ] Keyboard navigation ✅
[ ] Focus states visible ✅
[ ] Color contrast OK ✅
[ ] Touch targets 44px+ ✅
[ ] Alt texts present ✅
```

---

## **🎯 PRIORITY ORDER**

### **Test in This Order:**
```
1. ✅ Email submission (CRITICAL)
2. ✅ Mobile layout (iPhone SE)
3. ✅ Progress bar & Sticky CTA
4. ✅ Tooltip modal
5. ✅ Animations & performance
6. ✅ Touch targets
7. ✅ Typography & readability
8. ✅ Visual polish
9. ✅ Accessibility
10. ✅ Desktop experience
```

---

## **📊 RESULTS TRACKING**

### **Test Results Template:**
```markdown
## Device: iPhone SE (375px)
Date: [DATE]
Browser: Safari

### Critical Issues:
- [ ] Issue 1: [DESCRIPTION]
- [ ] Issue 2: [DESCRIPTION]

### High Priority:
- [ ] Issue 1: [DESCRIPTION]

### Medium Priority:
- [ ] Issue 1: [DESCRIPTION]

### Notes:
[Additional observations]

### Overall Score: [PASS/FAIL]
```

---

## **🚀 LAUNCH DECISION**

### **Green Light Criteria:**
```
✅ All CRITICAL tests pass
✅ 90%+ HIGH PRIORITY tests pass
✅ No console errors
✅ Email submission 100% working
✅ Mobile experience good
✅ Performance acceptable (85+ score)

→ READY TO LAUNCH! 🎉
```

### **Yellow Light (Launch with Monitoring):**
```
⚠️ All CRITICAL pass
⚠️ 80%+ HIGH PRIORITY pass
⚠️ Minor issues logged
⚠️ Email submission works
⚠️ Mobile usable

→ LAUNCH but monitor closely
```

### **Red Light (DO NOT LAUNCH):**
```
❌ Any CRITICAL test fails
❌ Email submission broken
❌ Major layout breaks
❌ Unusable on mobile
❌ Console errors

→ FIX BEFORE LAUNCH!
```

---

**Status:** ✅ **TESTING GUIDE READY!**

**Next:** Run through checklist and report results! 📱
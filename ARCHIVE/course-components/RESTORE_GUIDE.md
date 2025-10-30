# 🚨 JAK OBNOVIT DESKTOP VERZI KURZU

**Datum vytvoření:** 2025-01-24  
**Status:** ✅ AKTUÁLNÍ a FUNKČNÍ

---

## 📋 QUICK START

Pokud se desktop verze rozbije, následuj tyto kroky:

### **KROK 1: Ověř aktuální stav**

Otevři `/components/CourseDemoV3.tsx` a zkontroluj:
- ✅ Funguje desktop sidebar?
- ✅ Funguje canvas layout (`max-w-[1600px]` v Lekci 16)?
- ✅ Fungují validátory se `scale(0.75)`?
- ✅ Funguje mobile bottom navigation?

### **KROK 2: Pokud je něco rozbité**

**Aktuální funkční verze je v:**
```
/components/CourseDemoV3.tsx
```

**Tento soubor obsahuje:**
- ✅ Funkční desktop verzi (2790 řádků)
- ✅ Mobile accordion system
- ✅ All helper components
- ✅ Authentication
- ✅ Progress tracking
- ✅ Achievements

**Pokud potřebuješ restore:**

1. Podívej se do git history (pokud máme):
   ```bash
   git log --oneline components/CourseDemoV3.tsx
   git checkout <commit-hash> -- components/CourseDemoV3.tsx
   ```

2. Nebo použij backup z této složky (pokud existuje)

---

## 📱 MOBILE VERZE - PLÁN

**Cíl:** Vytvořit separátní mobile verzi bez ničení desktop verze

### **Strategie:**

1. **AČKO (data extrakce):**
   - Data zůstávají v `CourseDemoV3.tsx` ✅
   - Canvas data: `mobileCanvasData` state
   - Progress data: Supabase `user_canvas_data`

2. **BČKO (mobile accordion system):**
   - Použít existující `MobileCanvasAccordion.tsx` ✅
   - Rozbalovací sekce se štítky
   - Mobile optimalizovaný layout

3. **Implementace:**
   ```
   /ARCHIVE/course-components/mobile/
   └── MobileModule1Canvas.tsx  ← Helper component pro mobile view
   ```

### **Helper Component: MobileModule1Canvas.tsx**

**Účel:**
- Zobrazí Module 1 canvas v mobile optimalizované podobě
- Používá `MobileCanvasAccordion.tsx`
- Nezávislý na desktop verzi

**Props:**
```tsx
interface Props {
  data: any[];              // Canvas data from CourseDemoV3
  onChange: (data: any[]) => void;
  highlightSection?: string;
  allowedSection?: string;
}
```

**Použití v CourseDemoV3.tsx:**
```tsx
// Desktop view (wide canvas)
{!isMobile && (
  <BusinessModelCanvasSimple 
    data={canvasData}
    onChange={setCanvasData}
  />
)}

// Mobile view (accordion)
{isMobile && (
  <MobileModule1Canvas 
    data={mobileCanvasData}
    onChange={setMobileCanvasData}
    highlightSection={currentLesson.canvasSection}
    allowedSection={currentLesson.canvasSection}
  />
)}
```

---

## 🎯 FUNKČNÍ SPECIFIKACE

### **Desktop Canvas Layout:**

**Lekce 16 (Interaktivní cvičení):**
```tsx
<div className="max-w-[1600px] mx-auto">
  <BusinessModelCanvasSimple />
</div>
```
- Canvas width: `max-w-[1600px]`
- Canvas grid: `min-w-[1200px]`
- No horizontal scrollbar ✅

**Lekce 10 (Canvas Validator):**
```tsx
<div className="max-w-6xl mx-auto">
  <div className="scale-75 origin-top">
    <BusinessModelCanvasSimple readOnly />
  </div>
</div>
```
- Container: `max-w-6xl`
- Canvas: `scale(0.75)` preview

**Dashboard (Canvas Preview):**
```tsx
<div className="scale-75 origin-top">
  <BusinessModelCanvasSimple readOnly />
</div>
```
- Scaled canvas preview

### **Mobile Canvas Layout:**

**Current (works):**
- Bottom navigation ✅
- Swipe navigation ✅
- Full canvas view (scrollable) ✅

**Plánované (WIP):**
- Accordion view per section ✅
- Mobile optimized layout
- Single section focus

---

## 🚨 KRITICKÁ PRAVIDLA

### **❌ CO NEDĚLAT:**

1. **NEMAZAT** `CourseDemoV3.tsx` bez zálohy
2. **NETESTOVAT** mobile změny přímo na desktop verzi
3. **NEMENŠIT** `max-w-[1600px]` pro Lekci 16
4. **NEMENŠIT** canvas grid `min-w-[1200px]`

### **✅ CO DĚLAT:**

1. **VYTVOŘIT** separátní mobile komponenty v `/ARCHIVE/course-components/mobile/`
2. **TESTOVAT** desktop verzi před každým merge
3. **POUŽÍVAT** conditional rendering (`{isMobile ? <Mobile /> : <Desktop />}`)
4. **DOKUMENTOVAT** změny v `WORK_CONTEXT.md`

---

## 📊 AKTUÁLNÍ STAV (2025-01-24)

**✅ Funguje:**
- Desktop layout (wide canvas)
- Canvas validator (scaled preview)
- VPC komponenty (circle + square)
- Tools & calculators
- Auto-save
- Achievements
- Progress tracking
- Token auth
- Mobile bottom navigation
- Swipe navigation

**🔄 Work in Progress:**
- Mobile accordion canvas view
- Helper component: `MobileModule1Canvas.tsx`

**❌ Známé problémy:**
- Žádné! (Po opravě syntax errors na řádku 2427)

---

## 📞 DALŠÍ KROKY

1. **✅ Vytvořit tento README** → Done!
2. **🔄 Vytvořit `MobileModule1Canvas.tsx`** → Next step
3. **🧪 Testovat mobile verzi** samostatně
4. **✅ Po ověření merge** zpět do `CourseDemoV3.tsx`

---

## 💡 BOTTOM LINE

**Máme funkční desktop verzi v `/components/CourseDemoV3.tsx`**

**Pokud se něco rozbije:**
1. Podívej se do git history
2. Podívej se do této dokumentace
3. Zkontroluj `WORK_CONTEXT.md`
4. V nouzi restore z backupu

**Pro mobile verzi:**
- Vytvoříme separátní helper component
- Nezničíme desktop verzi
- Používáme conditional rendering

🎓✅ **SAFE ZONE!**

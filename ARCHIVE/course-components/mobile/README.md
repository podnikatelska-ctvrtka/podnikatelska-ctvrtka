# 📱 MOBILE COURSE COMPONENTS

**Datum:** 2025-01-24  
**Status:** 🔄 WIP - Testování mobile accordion system  
**Strategie:** AČKO (data) + BČKO (UI)

---

## 🎯 ÚČEL

Tato složka obsahuje **separátní mobile helper komponenty** pro kurz, které:
- ✅ **Nezničí desktop verzi**
- ✅ **Používají centralizovaná data** z `CourseDemoV3.tsx`
- ✅ **Jsou nezávislé a testovatelné**

---

## 📁 STRUKTURA

```
/ARCHIVE/course-components/mobile/
├── README.md                      # TENTO SOUBOR
└── MobileModule1Canvas.tsx        # 📱 Mobile verze Module 1 canvas
```

---

## 🧩 KOMPONENTY

### **MobileModule1Canvas.tsx**

**Účel:**
Mobile optimalizovaný view pro Module 1 Business Model Canvas

**Props:**
```tsx
interface Props {
  data: {
    segments?: CanvasItem[];
    value?: CanvasItem[];
    channels?: CanvasItem[];
    relationships?: CanvasItem[];
    revenue?: CanvasItem[];
    partners?: CanvasItem[];
    activities?: CanvasItem[];
    resources?: CanvasItem[];
    costs?: CanvasItem[];
  };
  onChange: (section: string, items: CanvasItem[]) => void;
  highlightSection?: string;
  allowedSection?: string;
}
```

**Používá:**
- `MobileCanvasAccordion.tsx` - Accordion UI system

**Features:**
- ✅ Rozbalovací sekce (accordion)
- ✅ Mobile optimalizovaný layout
- ✅ Barevné štítky (sticky notes)
- ✅ Add/remove items
- ✅ Highlight current section
- ✅ Lock sections (allowedSection)

**Jak použít v CourseDemoV3.tsx:**

```tsx
import { MobileModule1Canvas } from "./ARCHIVE/course-components/mobile/MobileModule1Canvas";

// ... inside component

// Desktop view
{!isMobile && (
  <div className="max-w-[1600px] mx-auto">
    <BusinessModelCanvasSimple 
      data={canvasData}
      onChange={setCanvasData}
    />
  </div>
)}

// Mobile view
{isMobile && (
  <MobileModule1Canvas 
    data={mobileCanvasData}
    onChange={(section, items) => {
      setMobileCanvasData(prev => ({
        ...prev,
        [section]: items
      }));
    }}
    highlightSection={currentLesson.canvasSection}
    allowedSection={currentLesson.canvasSection}
  />
)}
```

---

## 🎨 DESIGN SYSTÉM

### **Accordion Layout:**

```
┌─────────────────────────────┐
│ 👥 Zákaznické segmenty   ▼  │ ← Collapsed
├─────────────────────────────┤
│ 💎 Hodnotová nabídka     ▲  │ ← Expanded
│ ┌─────────────────────────┐ │
│ │ 🔵 Položka 1          × │ │
│ │ 🟢 Položka 2          × │ │
│ │ [+ Přidat položku]      │ │
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ 📢 Kanály                ▼  │
└─────────────────────────────┘
```

### **Sticky Note Colors:**

- 🔵 **Blue** - Segment 1
- 🟢 **Green** - Segment 2
- 🟡 **Yellow** - Segment 3
- 🟣 **Purple** - Segment 4
- 🌐 **Global** - Pro všechny segmenty
- 🔒 **Gray** - Locked/disabled

---

## 🔄 DATA FLOW

```
CourseDemoV3.tsx (PARENT)
     │
     ├─ State: mobileCanvasData
     │   └─ { segments: [], value: [], ... }
     │
     ▼
MobileModule1Canvas.tsx (CHILD)
     │
     ├─ Props: data, onChange
     │
     ▼
MobileCanvasAccordion.tsx (UI)
     │
     └─ Renders accordion + handles UI
```

**Důležité:**
- Data jsou v **CourseDemoV3.tsx** ✅
- Mobile komponenty **jen zobrazují** a volají `onChange`
- Všechny změny se **ukládají do Supabase** v parent

---

## 🧪 TESTOVÁNÍ

### **Krok 1: Zkopíruj komponentu**

```bash
# Zkopíruj do components/
cp /ARCHIVE/course-components/mobile/MobileModule1Canvas.tsx /components/
```

### **Krok 2: Import v CourseDemoV3.tsx**

```tsx
import { MobileModule1Canvas } from "./MobileModule1Canvas";
```

### **Krok 3: Přidej conditional rendering**

```tsx
{/* MOBILE VIEW - Accordion */}
{isMobile && currentLesson.canvasSection && (
  <MobileModule1Canvas 
    data={mobileCanvasData}
    onChange={(section, items) => {
      setMobileCanvasData(prev => ({ ...prev, [section]: items }));
      // Auto-save to Supabase
      saveMobileCanvasData(section, items);
    }}
    highlightSection={currentLesson.canvasSection}
    allowedSection={currentLesson.canvasSection}
  />
)}
```

### **Krok 4: Testuj na mobilu**

1. Otevři `/#course-v3` na mobilu
2. Přejdi na Lekci 1 (Zákaznické segmenty)
3. Klikni na tlačítko "Vyzkoušet canvas"
4. Ověř že se zobrazí accordion
5. Přidej položku
6. Ověř že se uložila do Supabase

---

## 🚨 KRITICKÁ PRAVIDLA

### **❌ CO NEDĚLAT:**

1. **NEMĚNIT** desktop layout v `CourseDemoV3.tsx`
2. **NETESTOVAT** přímo v produkci
3. **NEMAZAT** desktop verzi bez zálohy

### **✅ CO DĚLAT:**

1. **TESTOVAT** mobile komponenty samostatně
2. **POUŽÍVAT** conditional rendering (`isMobile`)
3. **DOKUMENTOVAT** změny v WORK_CONTEXT.md
4. **BACKUP** před každým merge

---

## 📊 ROADMAP

### **✅ Done:**
- MobileCanvasAccordion.tsx (UI system)
- MobileModule1Canvas.tsx (helper component)
- ARCHIVE structure

### **🔄 Next:**
- Testovat MobileModule1Canvas v CourseDemoV3
- Přidat do production (conditional rendering)
- Vytvořit MobileModule3Canvas (VPC)

### **📝 Future:**
- Mobile optimalizované validátory
- Mobile dashboard preview
- Landscape mode optimizations

---

## 📞 KONTAKT

**Pokud potřebuješ pomoc:**
- Podívej se do `/ARCHIVE/course-components/RESTORE_GUIDE.md`
- Zkontroluj `/WORK_CONTEXT.md`
- Otevři tuto dokumentaci

**Bottom line:** Máme SAFE mobile komponenty bez rizika pro desktop! 📱✅

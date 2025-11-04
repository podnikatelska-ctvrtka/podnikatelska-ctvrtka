# 🔧 AKČNÍ PLÁN - OPRAVA VIDITELNOSTI NA DESKTOPU

**Datum:** 3. listopadu 2025  
**Status:** ✅ OPRAVENO

---

## ❌ PROBLÉM:

**Desktop:** Akční plán se zobrazuje v nástrojích hned na začátku kurzu  
**Mobile:** Funguje správně - akční plán se zobrazí pouze po dokončení celého kurzu (100%)

**Očekávané chování:**  
Akční plán by měl být viditelný **POUZE po dokončení celého kurzu** (16 lekce, krok 3 = 100%)

---

## 🔍 PŘÍČINA:

### **Mobile verze (SPRÁVNĚ) ✅:**

`/components/mobile-course/MobileCourseSidebar.tsx` **řádky 225-249:**

```tsx
const tools = [
  {
    id: 'action-plan',
    title: '🎯 Akční plán',
    icon: Target,
    requiresCompletion: true, // ✅ Zobrazit jen po dokončení kurzu
  },
  // ... další nástroje
]
.filter((tool) => {
  // ✅ Filtruj Akční plán - zobrazit pouze po dokončení celého kurzu
  if (tool.requiresCompletion) {
    return progressPercent === 100;
  }
  return true;
})
```

### **Desktop verze (ŠPATNĚ) ❌:**

`/components/ToolsSection.tsx` **PŘED opravou:**

```tsx
const tools = [
  {
    id: 'action-plan',
    title: '🎯 Akční plán',
    icon: Target,
    description: 'Vaše konkrétní další kroky',
    // ❌ CHYBÍ: requiresCompletion: true
  },
  // ... další nástroje
]
// ❌ CHYBÍ: .filter() logika
.map((tool) => { ... })
```

**Desktop verze neměla:**
1. ❌ Property `requiresCompletion: true`
2. ❌ `.filter()` logiku pro kontrolu `progressPercent === 100`
3. ❌ Prop `progressPercent` v interface

---

## ✅ ŘEŠENÍ:

### **1️⃣ Upravena `/components/ToolsSection.tsx`:**

#### **A) Přidán prop `progressPercent`:**

```tsx
interface ToolsSectionProps {
  onSelectTool: (toolId: string) => void;
  currentTool?: string | null;
  progressPercent?: number; // 🎯 Pro kontrolu dokončení kurzu
}

export function ToolsSection({ 
  onSelectTool, 
  currentTool, 
  progressPercent = 0 
}: ToolsSectionProps) {
```

#### **B) Přidán `requiresCompletion` flag:**

```tsx
const tools = [
  {
    id: 'action-plan',
    title: '🎯 Akční plán',
    icon: Target,
    description: 'Vaše konkrétní další kroky',
    requiresCompletion: true, // ✅ Zobrazit jen po dokončení kurzu (100%)
  },
  // ... další nástroje bez této property
];
```

#### **C) Přidán filter před `.map()`:**

```tsx
{tools
  .filter((tool) => {
    // ✅ Filtruj Akční plán - zobrazit pouze po dokončení celého kurzu
    if (tool.requiresCompletion) {
      return progressPercent === 100;
    }
    return true;
  })
  .map((tool) => {
    // ... render tool button
  })
}
```

### **2️⃣ Upravena `/components/CourseSidebar.tsx`:**

Přidán prop `progressPercent` do volání `ToolsSection`:

```tsx
{/* Tools Section */}
{onSelectTool && (
  <ToolsSection 
    onSelectTool={onSelectTool} 
    currentTool={currentTool}
    progressPercent={progressPercent} // ✅ Přidáno
  />
)}
```

`progressPercent` je vypočítáno na **řádku 46**:

```tsx
const progressPercent = Math.round((completedCount / totalLessons) * 100);
```

---

## 🎯 OČEKÁVANÉ CHOVÁNÍ:

### **Před dokončením kurzu (0% - 99%):**

**Desktop sidebar → Nástroje:**
```
🧮 Nástroje
  🧮 Kolik potřebuji zákazníků?
  📊 Velikost segmentu
```

**❌ Akční plán NENÍ vidět**

---

### **Po dokončení kurzu (100%):**

**Desktop sidebar → Nástroje:**
```
🧮 Nástroje
  🎯 Akční plán ← ✅ TEPRVE TEĎ se zobrazí!
  🧮 Kolik potřebuji zákazníků?
  📊 Velikost segmentu
```

**✅ Akční plán JE vidět**

---

## 🧪 TESTOVÁNÍ:

### **TEST 1: Začátek kurzu (0%)**

```bash
# 1. Přihlaš se s dev tokenem
# 2. Zkontroluj sidebar → Nástroje
# 3. ❌ Akční plán NESMÍ být vidět
```

### **TEST 2: Průběh kurzu (50%)**

```bash
# 1. Dokonči polovinu lekcí
# 2. Zkontroluj sidebar → Nástroje
# 3. ❌ Akční plán STÁLE nesmí být vidět
```

### **TEST 3: Dokončení kurzu (100%)**

```bash
# 1. Dokonči všechny lekce (16 lekcí)
# 2. Zkontroluj sidebar → Nástroje
# 3. ✅ Akční plán MUSÍ být vidět jako první
```

---

## 📊 LOGIKA ODEMYKÁNÍ:

```
Lekce 1-15: Akční plán skrytý ❌
            ↓
Lekce 16 dokončena (FIT Validator)
            ↓
Achievement: 'action-plan-unlocked' ✅
            ↓
progressPercent === 100 ✅
            ↓
Akční plán VIDITELNÝ v nástrojích 🎯
```

---

## 🔗 SOUVISEJÍCÍ SOUBORY:

```
✅ /components/ToolsSection.tsx
✅ /components/CourseSidebar.tsx
📄 /components/mobile-course/MobileCourseSidebar.tsx (referenční implementace)
📄 /components/FitValidatorV2.tsx (triggeruje achievement na řádku 3653)
📄 /components/BusinessActionPlan.tsx (samotný akční plán)
```

---

## 💡 PROČ TOTO ŘEŠENÍ:

1. **Konzistence:** Desktop i mobile mají **stejnou logiku**
2. **User Experience:** Akční plán je **odměna za dokončení** celého kurzu
3. **Motivace:** Uživatel vidí, že **ještě něco zajímavého čeká** po dokončení
4. **Ochrana:** Akční plán vyžaduje **dokončené všechny lekce**, aby byl relevantní

---

## ✅ CO FUNGUJE PO OPRAVĚ:

```
✅ Akční plán skrytý na začátku kurzu (desktop)
✅ Akční plán skrytý během kurzu (desktop)
✅ Akční plán viditelný po 100% dokončení (desktop)
✅ Mobile verze funguje stejně (už fungovala)
✅ Ostatní nástroje viditelné vždy (kalkulačka, segment)
✅ Žádné TypeScript errors
✅ Žádné console errors
```

---

**Chyba opravena! Desktop i mobile mají teď konzistentní chování. 🎉**

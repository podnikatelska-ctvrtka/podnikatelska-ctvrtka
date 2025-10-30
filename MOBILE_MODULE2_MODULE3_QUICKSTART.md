# 🚀 MODULE 2 + 3 MOBILE INTEGRATION - QUICK START

## 📋 RYCHLÝ PŘEHLED

### ✅ Máme hotové:
- ✅ `MobileCourseModule1.tsx` - BMC (9 lekcí) **LIVE**
- ✅ `MobileCourseModule2.tsx` - Optimalizace BMC (4 lekce) **PŘIPRAVENO**
- ✅ `MobileCourseModule3.tsx` - VPC + FIT (3 lekce) **PŘIPRAVENO**

### 🎯 Co potřebujeme:
1. Připojit Module 2 a 3 do `CourseDemoV3.tsx`
2. Vytvořit mobile verze pro speciální lekce:
   - `MobileValidator` (FIT Validator)
   - `MobileProfitCalculator`
   - `MobileVPCCanvas` (Customer Profile + Value Map)

---

## 🔧 KROK 1: Integrace Module 2+3 do CourseDemoV3

### 1️⃣ Přidej Importy

V `/components/CourseDemoV3.tsx` na začátek:

```tsx
// ✅ UŽ TAM JSOU:
import { MobileCourseModule1 } from "./mobile-course/MobileCourseModule1";
import { MobileCourseDashboard } from "./mobile-course/MobileCourseDashboard";
import { MobileCourseSidebar } from "./mobile-course/MobileCourseSidebar";

// 🆕 PŘIDEJ TYTO DVA:
import { MobileCourseModule2 } from "./mobile-course/MobileCourseModule2";
import { MobileCourseModule3 } from "./mobile-course/MobileCourseModule3";
```

### 2️⃣ Přidej VPC State (pokud tam není)

Najdi sekci se state (pod `useState` declarations):

```tsx
// VPC DATA (Module 3)
const [vpcCustomerData, setVpcCustomerData] = useState<any>({});
const [vpcValueData, setVpcValueData] = useState<any>({});
const [selectedVPCSegment, setSelectedVPCSegment] = useState<string>('');
const [selectedVPCValue, setSelectedVPCValue] = useState<string>('');
```

### 3️⃣ Přidej VPC Update Handler

Pod ostatní `useCallback` funkce:

```tsx
const handleVPCUpdate = useCallback((section: 'customer' | 'value', data: any) => {
  if (section === 'customer') {
    setVpcCustomerData(data);
  } else {
    setVpcValueData(data);
  }
  // TODO: Save to Supabase (later)
}, []);
```

### 4️⃣ Přidej Render pro Module 2 a 3

Najdi sekci kde je `if (isMobile) { return ( ... )}` a uvnitř najdi:

```tsx
{/* MODULE 1: BMC */}
{!showMainDashboard && currentModuleNumber === 1 && (
  <MobileCourseModule1 ... />
)}
```

Pod to přidej:

```tsx
{/* MODULE 2: OPTIMALIZACE BMC */}
{!showMainDashboard && currentModuleNumber === 2 && (
  <MobileCourseModule2
    moduleData={MODULE_2}
    canvasData={canvasData}
    onCanvasUpdate={handleMobileCanvasUpdate}
    completedLessons={completedLessonsStrings}
    onLessonComplete={handleMobileLessonComplete}
    currentLessonIndex={currentLessonIndex}
    onLessonChange={setCurrentLessonIndex}
    onOpenSidebar={() => setShowMobileSidebar(true)}
    onOpenDashboard={() => setShowMainDashboard(true)}
  />
)}

{/* MODULE 3: VPC + FIT */}
{!showMainDashboard && currentModuleNumber === 3 && (
  <MobileCourseModule3
    moduleData={MODULE_3}
    vpcData={{
      customer: vpcCustomerData,
      value: vpcValueData
    }}
    onVPCUpdate={handleVPCUpdate}
    completedLessons={completedLessonsStrings}
    onLessonComplete={handleMobileLessonComplete}
    currentLessonIndex={currentLessonIndex}
    onLessonChange={setCurrentLessonIndex}
    onOpenSidebar={() => setShowMobileSidebar(true)}
    onOpenDashboard={() => setShowMainDashboard(true)}
    availableSegments={canvasData.segments || []}
    availableValues={canvasData.value || []}
    selectedSegment={selectedVPCSegment}
    onSelectSegment={setSelectedVPCSegment}
    selectedValue={selectedVPCValue}
    onSelectValue={setSelectedVPCValue}
  />
)}
```

---

## 🎨 KROK 2: Mobile Komponenty pro Speciální Lekce

### Lekce které potřebují mobile verzi:

#### Module 2: Optimalizace BMC
1. **Lekce 2.2** - FIT Validator (desktop: `CanvasValidator`)
   - → Vytvořit: `MobileValidator.tsx`
   - Logika: Zkontroluj pokrytí segmentů v jednotlivých sekcích BMC
   - UI: Simple checklist s expansion pro každou sekci

2. **Lekce 2.3** - Profit Calculator (desktop: `ProfitCalculator`)
   - → Vytvořit: `MobileProfitCalculator.tsx`
   - Logika: Revenue - Costs = Profit
   - UI: Karty s čísly, simple math

#### Module 3: VPC + FIT
3. **Lekce 3.1** - Customer Profile (desktop: `VPCCustomerProfile`)
   - → Použít existující `MobileCanvasAccordion` (už funguje!)
   
4. **Lekce 3.2** - Value Map (desktop: `VPCValueMap`)
   - → Použít existující `MobileCanvasAccordion` (už funguje!)
   
5. **Lekce 3.3** - FIT Validator V2 (desktop: `FitValidatorV2`)
   - → Vytvořit: `MobileFitValidator.tsx`
   - Logika: Mapování Customer Jobs → Product Features
   - UI: Dropdown select + checklist

---

## 📝 TEMPLATE PRO MOBILE KOMPONENTY

### Obecný Pattern

Všechny mobile komponenty mají **stejnou strukturu**:

```tsx
// /components/mobile-course/MobileXXX.tsx
import { useState } from 'react';
import { Button } from '../ui/button';
import { haptic } from '../../lib/haptics';

interface Props {
  // Data z desktop verze
  canvasData: any;
  // Callbacks
  onUpdate?: (data: any) => void;
  onComplete?: () => void;
}

export function MobileXXX({ canvasData, onUpdate, onComplete }: Props) {
  // State
  const [localData, setLocalData] = useState(canvasData);
  
  // Handlers
  const handleChange = (newData: any) => {
    haptic('selection');
    setLocalData(newData);
    onUpdate?.(newData);
  };
  
  return (
    <div className="p-4 space-y-4">
      {/* MOBILE UI - simple, touch-friendly */}
      <h2 className="text-lg font-bold">Tool Title</h2>
      
      {/* Tool logic */}
      <div className="space-y-3">
        {/* ... */}
      </div>
      
      {/* Actions */}
      <Button 
        onClick={onComplete}
        className="w-full"
      >
        Pokračovat
      </Button>
    </div>
  );
}
```

---

## 🎯 PRIORITA

### Phase 1: Základní Integrace (TEĎ)
1. ✅ Přidat importy Module 2+3
2. ✅ Přidat VPC state
3. ✅ Přidat render pro Module 2+3
4. 🧪 **TEST:** Proklikej se všemi moduly na mobilu

### Phase 2: Speciální Komponenty
1. `MobileValidator.tsx` (FIT Validator pro Lekci 2.2)
2. `MobileProfitCalculator.tsx` (Profit Calculator pro Lekci 2.3)
3. `MobileFitValidator.tsx` (FIT Validator V2 pro Lekci 3.3)

### Phase 3: Polish
1. Haptic feedback všude
2. Loading states
3. Error handling
4. Supabase save/load

---

## 🧪 TESTING CHECKLIST

Po každém kroku testuj:

### ✅ Module 1 (BMC)
- [ ] Dashboard → Module 1
- [ ] Všech 9 lekcí funguje
- [ ] Canvas accordion funguje
- [ ] Simple tap (ne long press)
- [ ] Progress tracking

### ✅ Module 2 (Optimalizace)
- [ ] Dashboard → Module 2
- [ ] Lekce 2.1: Optimalizace (text only)
- [ ] Lekce 2.2: FIT Validator (MOBILE COMPONENT)
- [ ] Lekce 2.3: Profit Calculator (MOBILE COMPONENT)
- [ ] Lekce 2.4: Action Plan (text only)

### ✅ Module 3 (VPC + FIT)
- [ ] Dashboard → Module 3
- [ ] Lekce 3.1: Customer Profile (accordion)
- [ ] Lekce 3.2: Value Map (accordion)
- [ ] Lekce 3.3: FIT Validator V2 (MOBILE COMPONENT)

---

## 📚 RELATED DOCS

- `MOBILE_ALL_MODULES_INTEGRATION.md` - Detailní integrace guide
- `MOBILE_UX_SIMPLE.md` - Simple tap UX
- `MOBILE_MODULE1_COMPLETE.md` - Module 1 dokumentace
- `MOBILE_STRATEGY_2025-01-24.md` - Celková strategie

---

## 🚀 NEXT ACTION

**KDE TEĎKA JSME:**
1. ✅ Modul 1 hotový + Simple tap UX
2. ✅ Komponenty Module 2+3 vytvořeny
3. 🔄 **NEXT:** Integrovat Module 2+3 do `CourseDemoV3.tsx`

**CO UDĚLAT PŘÍŠTĚ:**
```bash
# 1. Otevři CourseDemoV3.tsx
# 2. Přidej importy (viz KROK 1)
# 3. Přidej state (viz KROK 2)
# 4. Přidej render (viz KROK 4)
# 5. Test na mobilu (localhost:5173/#course-v3)
```

Až to bude fungovat → vytvořím mobile komponenty pro speciální lekce! 🎨

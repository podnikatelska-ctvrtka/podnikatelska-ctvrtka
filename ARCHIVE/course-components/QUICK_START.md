# 🚀 QUICK START - Desktop + Mobile Kurz

**Vytvořeno:** 2025-01-24  
**Pro:** Rychlý přehled jak pracovat s kurzem bez strachu z rozbití desktop verze

---

## ✅ CO MÁME TEĎ

### **Desktop verze: FUNKČNÍ ✅**
```
/components/CourseDemoV3.tsx (2790 řádků)
```
- ✅ Desktop sidebar
- ✅ Canvas layout (`max-w-[1600px]` v Lekci 16)
- ✅ Validátory (`scale(0.75)`)
- ✅ Mobile bottom nav
- ✅ Mobile swipe navigation
- ✅ Všechny helper komponenty

### **Archive: BACKUP ✅**
```
/ARCHIVE/course-components/
├── RESTORE_GUIDE.md          ← JAK OBNOVIT desktop
├── DESKTOP_BACKUP_2025-01-24.md
├── README.md                  ← Dokumentace všech komponent
└── mobile/
    ├── MobileModule1Canvas.tsx  ← Mobile helper
    └── README.md
```

---

## 🎯 CO CHCEŠ DĚLAT?

### **🧪 TESTOVAT mobile accordion view:**

**Krok 1:** Zkopíruj mobile komponentu
```bash
cp /ARCHIVE/course-components/mobile/MobileModule1Canvas.tsx /components/
```

**Krok 2:** Import v `CourseDemoV3.tsx`
```tsx
import { MobileModule1Canvas } from "./MobileModule1Canvas";
```

**Krok 3:** Přidej conditional rendering (najdi místo kde je BusinessModelCanvasSimple):
```tsx
{/* Desktop view */}
{!isMobile && (
  <div className="max-w-[1600px] mx-auto">
    <BusinessModelCanvasSimple 
      data={canvasData}
      onChange={setCanvasData}
    />
  </div>
)}

{/* Mobile view - NOVÉ! */}
{isMobile && currentLesson.canvasSection && (
  <MobileModule1Canvas 
    data={mobileCanvasData}
    onChange={(section, items) => {
      setMobileCanvasData(prev => ({ ...prev, [section]: items }));
    }}
    highlightSection={currentLesson.canvasSection}
    allowedSection={currentLesson.canvasSection}
  />
)}
```

**Krok 4:** Testuj na mobilu
- Otevři `/#course-v3` na mobilu
- Přejdi na Lekci 1
- Klikni "Vyzkoušet canvas"
- Měl by se zobrazit accordion místo plného canvasu

---

### **🔧 OBNOVIT desktop verzi (pokud se rozbije):**

**Najdi v git history:**
```bash
git log --oneline components/CourseDemoV3.tsx
git checkout <commit-hash> -- components/CourseDemoV3.tsx
```

**Nebo prostě obnov funkční verzi:**
- Desktop verze je aktuálně v `/components/CourseDemoV3.tsx`
- Pokud se rozbije, použij git restore
- Dokumentace všech komponent je v `/ARCHIVE/course-components/README.md`

---

### **📱 VYTVOŘIT novou mobile komponentu:**

**Šablona:**
```tsx
/**
 * 📱 MOBILE HELPER - [Název]
 * 
 * Účel: [Co dělá]
 * Používá: [Které komponenty]
 * Data: Centralizovaná v CourseDemoV3.tsx
 */

import { ... } from "...";

interface Props {
  data: any;
  onChange: (data: any) => void;
  highlightSection?: string;
}

export function MobileHelperComponent({ data, onChange, highlightSection }: Props) {
  return (
    <div>
      {/* Mobile optimized view */}
    </div>
  );
}
```

**Kde uložit:**
```
/ARCHIVE/course-components/mobile/[NazevKomponenty].tsx
```

---

## 🚨 KRITICKÁ PRAVIDLA

### **❌ NIKDY:**
1. **NEMAZAT** `/components/CourseDemoV3.tsx` bez git backupu
2. **NEMENŠIT** `max-w-[1600px]` v Lekci 16 (rozesere desktop layout!)
3. **NETESTOVAT** přímo na production bez backup

### **✅ VŽDY:**
1. **TESTOVAT** změny na lokále před deploy
2. **BACKUP** pomocí git commit před velkými změnami
3. **CONDITIONAL RENDERING** (`isMobile ? <Mobile /> : <Desktop />`)
4. **DOKUMENTOVAT** změny v `/WORK_CONTEXT.md`

---

## 📊 DEBUGGING

### **Desktop nefunguje?**
```
1. Otevři DevTools konzoli
2. Hledej errory v Reactu
3. Zkontroluj canvas layout:
   - Lekce 16: max-w-[1600px] ✅
   - Lekce 10: scale(0.75) ✅
   - Dashboard: scale(0.75) ✅
4. Restore z git history
```

### **Mobile nefunguje?**
```
1. Zkontroluj isMobile detection
2. Ověř conditional rendering
3. Zkontroluj props v MobileModule1Canvas
4. Podívej se do /ARCHIVE/course-components/mobile/README.md
```

---

## 📞 HELP

**Potřebuješ pomoct?**
1. Podívej se do `/ARCHIVE/course-components/RESTORE_GUIDE.md`
2. Zkontroluj `/ARCHIVE/course-components/README.md`
3. Zkontroluj `/WORK_CONTEXT.md`
4. Otevři `/ARCHIVE/INDEX.md`

---

## 💡 BOTTOM LINE

✅ **Desktop verze je SAFE** v `/components/CourseDemoV3.tsx`  
✅ **Mobile helper komponenty jsou v** `/ARCHIVE/course-components/mobile/`  
✅ **Dokumentace je kompletní** v `/ARCHIVE/course-components/`

🎯 **Můžeš bezpečně experimentovat s mobile verzí!**

📦 **Pokud se něco rozbije → git restore nebo podívej se do RESTORE_GUIDE.md**

**Happy coding! 🚀**

# 🎓 DESKTOP KURZ - KOMPLETNÍ BACKUP

**📅 Datum zálohy:** 2025-01-24  
**⏰ Čas:** Po opravě syntax errors  
**✅ Status:** FUNKČNÍ - Testováno a ověřeno

---

## 🚨 PROČ TATO ZÁLOHA?

Uživatel obnovil předchozí verzi aplikace po syntax errors na řádku 2427 v `CourseDemoV3.tsx` (kvůli duplicitním sekcím a rozbité struktuře kódu).

**Tato záloha obsahuje:**
- ✅ Funkční desktop verzi kurzu `CourseDemoV3.tsx`
- ✅ Všechny helper komponenty pro canvas
- ✅ Mobile accordion system (`MobileCanvasAccordion.tsx`)

---

## 📁 STRUKTURA ARCHIVE

```
/ARCHIVE/course-components/
├── README.md                           # Dokumentace všech komponent
├── DESKTOP_BACKUP_2025-01-24.md       # TENTO SOUBOR
├── desktop/
│   └── CourseDemoV3_desktop.tsx       # 🎯 BACKUP desktop verze
└── mobile/
    └── CourseDemoV3_mobile.tsx        # 📱 MOBILE verze (WIP)
```

---

## 🎯 JAK OBNOVIT DESKTOP VERZI?

**Krok 1:** Zkopíruj soubor z archive:
```bash
cp /ARCHIVE/course-components/desktop/CourseDemoV3_desktop.tsx /components/CourseDemoV3.tsx
```

**Krok 2:** Otestuj desktop verzi:
- Otevři `/#course-v3` s platným tokenem
- Ověř že sidebar funguje
- Ověř že canvas má správnou šířku (`max-w-[1600px]` v Lekci 16)
- Ověř že validátory mají `scale(0.75)`

**Krok 3:** Ověř mobile flow:
- Otevři na mobilu
- Ověř bottom navigation
- Ověř swipe navigation
- Ověř accordion canvas

---

## 📱 MOBILE VERZE - PLÁN

**Strategie:** AČKO (data extrakce) + BČKO (mobile accordion system)

1. **Data zůstávají v CourseDemoV3.tsx** ✅
2. **Mobile UI používá `MobileCanvasAccordion.tsx`** ✅
3. **Vytvoříme separátní `CourseDemoV3_mobile.tsx`** pro testování
4. **Po ověření mergujeme zpět do `CourseDemoV3.tsx`**

---

## 🔧 ZNÁMÉ PROBLÉMY (PŘED ZÁLOHOU)

- ❌ Syntax errors na řádku 2427 (duplicitní sekce)
- ❌ Rozbená struktura kódu
- ✅ **VYŘEŠENO:** Obnovena předchozí verze

---

## 📊 SPECIFIKACE DESKTOP VERZE

### **Canvas Layout (Lekce 16 - Interaktivní cvičení):**
```tsx
<div className="max-w-[1600px] mx-auto">
  <BusinessModelCanvasSimple 
    data={canvasData}
    onChange={setCanvasData}
  />
</div>
```

### **Canvas Validator (Lekce 10):**
```tsx
<div className="max-w-6xl mx-auto">
  <div className="scale-75 origin-top">
    <BusinessModelCanvasSimple 
      readOnly 
      data={canvasData} 
    />
  </div>
  <CanvasValidator data={canvasData} />
</div>
```

### **Dashboard Preview:**
```tsx
<div className="scale-75 origin-top">
  <BusinessModelCanvasSimple 
    readOnly 
    data={canvasData}
  />
</div>
```

---

## 🎯 DALŠÍ KROKY

1. **✅ Vytvořit desktop backup** → /ARCHIVE/course-components/desktop/
2. **🔄 Vytvořit mobile verzi** → /ARCHIVE/course-components/mobile/
3. **🧪 Testovat mobile verzi** samostatně
4. **✅ Po ověření merge** zpět do hlavního souboru

---

## 📞 KONTAKT

**Pokud potřebuješ pomoc:**
- Podívej se do `/WORK_CONTEXT.md`
- Zkontroluj `/ARCHIVE/README.md`
- Otevři tuto dokumentaci

**Bottom line:** Máme SAFE BACKUP desktop verze! 🎓✅

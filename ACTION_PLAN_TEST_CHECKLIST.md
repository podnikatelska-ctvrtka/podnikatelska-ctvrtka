# ✅ AKČNÍ PLÁN - TEST CHECKLIST

**Datum:** 3. listopadu 2025  
**Oprava:** Desktop viditelnost Akčního plánu

---

## 🧪 QUICK TEST (2 minuty)

### **TEST 1: Začátek kurzu ❌**

```bash
1. Přihlaš se jako nový uživatel (nebo resetuj progress)
2. Otevři DESKTOP verzi kurzu
3. Podívej se do sidebaru → 🧮 Nástroje
```

**Očekávaný výsledek:**
```
🧮 Nástroje
  🧮 Kolik potřebuji zákazníků?
  📊 Velikost segmentu

❌ Akční plán NESMÍ být vidět
```

---

### **TEST 2: Dokončení kurzu ✅**

```bash
1. Dokonči všechny lekce (nebo použij dev mode)
2. Dokonči poslední lekci (16 - FIT Validator)
3. Podívej se do sidebaru → 🧮 Nástroje
```

**Očekávaný výsledek:**
```
🧮 Nástroje
  🎯 Akční plán ← ✅ TEPRVE TEĎ viditelný!
  🧮 Kolik potřebuji zákazníků?
  📊 Velikost segmentu

✅ Akční plán MUSÍ být vidět jako první
```

---

### **TEST 3: Mobile check ✅**

```bash
1. Otevři MOBILE verzi kurzu
2. Klikni na hamburger menu (☰)
3. Podívej se do sekce "Nástroje"
```

**Očekávaný výsledek:**
```
Na začátku kurzu:
❌ Akční plán NENÍ v seznamu

Po dokončení kurzu:
✅ Akční plán JE v seznamu
```

---

## 🔍 DEBUGGING TIPS

### **Pokud Akční plán stále vidět na začátku:**

```typescript
// ✅ Zkontroluj v CourseSidebar.tsx:
const progressPercent = Math.round((completedCount / totalLessons) * 100);
console.log('Progress:', progressPercent); // Mělo by být 0

// ✅ Zkontroluj v ToolsSection.tsx:
console.log('Tools before filter:', tools);
console.log('Progress percent:', progressPercent);
```

### **Pokud Akční plán NEvidět ani po dokončení:**

```typescript
// ✅ Zkontroluj podmínku:
if (tool.requiresCompletion) {
  console.log('Checking completion:', progressPercent === 100);
  return progressPercent === 100;
}
```

---

## 📊 DEV MODE TEST

### **Rychlý test s dev módem:**

```typescript
// V CourseDemoV3.tsx najdi:
const progressPercent = Math.round((completedCount / totalLessons) * 100);

// Dočasně nastav na 100 pro test:
const progressPercent = 100; // ✅ TESTOVACÍ MODE

// Pak obnov:
const progressPercent = Math.round((completedCount / totalLessons) * 100);
```

---

## ✅ EXPECTED STATES

### **State 1: Začátek (0% - 99%)**

```
Desktop sidebar:
├── 📊 Dashboard
├── 🧮 Nástroje (rozbalené)
│   ├── 🧮 Kolik potřebuji zákazníků?
│   └── 📊 Velikost segmentu
├── Modul 1: Základ podnikání
├── Modul 2: Business Model Canvas
└── Modul 3: Value Proposition Canvas

❌ Akční plán NENÍ vidět
```

### **State 2: Dokončení (100%)**

```
Desktop sidebar:
├── 📊 Dashboard
├── 🧮 Nástroje (rozbalené)
│   ├── 🎯 Akční plán ← ✅ NOVĚ VIDITELNÝ!
│   ├── 🧮 Kolik potřebuji zákazníků?
│   └── 📊 Velikost segmentu
├── Modul 1: Základ podnikání ✅
├── Modul 2: Business Model Canvas ✅
└── Modul 3: Value Proposition Canvas ✅

✅ Akční plán JE vidět
```

---

## 🎯 ACCEPTANCE CRITERIA

- [ ] Akční plán NENÍ vidět na začátku kurzu (desktop)
- [ ] Akční plán NENÍ vidět během kurzu (desktop)
- [ ] Akční plán JE vidět po 100% dokončení (desktop)
- [ ] Mobile verze funguje stejně
- [ ] Ostatní nástroje viditelné vždy
- [ ] Žádné console errors
- [ ] Žádné TypeScript errors

---

**Všechny testy prošly? ✅ Fix je hotový!**

# 🎨 FONT & COLOR ISOLATION FIX

**Datum:** 2025-01-23  
**Problém:** Globální h1/h2/h3 barvy v globals.css přepisovaly VŠECHNY stránky  
**Řešení:** Izolované styly pomocí `data-*` attributes

---

## ❌ STARÝ PROBLÉM

```css
/* globals.css - ŠPATNĚ! */
h1 {
  color: #ffffff; /* Bílé nadpisy VŠUDE! */
}

h2 {
  color: #ffffff; /* I na order page! */
}
```

**Důsledky:**
- ❌ Landing page měla BÍLÉ nadpisy (nebyly vidět)
- ❌ Order page měla BÍLÉ nadpisy (nebyly vidět)
- ❌ Každá změna v globals.css rozbila fonty všude

---

## ✅ NOVÉ ŘEŠENÍ: DATA-ATTRIBUTES

### **1️⃣ KURZ (CourseDemoV3)**

```css
/* Pouze pro kurz */
[data-course] h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff; /* Bílé nadpisy JEN V KURZU */
  line-height: 1.3;
}

[data-course] .prose h1 {
  color: #111827; /* Tmavé nadpisy v lekcích */
}
```

**Použití v komponentě:**
```tsx
// CourseDemoV3.tsx
return (
  <div data-course className="min-h-screen bg-gray-50 flex">
    {/* Vše uvnitř má BÍLÉ nadpisy */}
  </div>
);
```

---

### **2️⃣ ORDER PAGE**

```css
/* Pouze pro order page */
[data-order-page] h1,
[data-order-page] h2,
[data-order-page] h3 {
  color: #111827; /* Tmavé nadpisy */
}

/* Tmavé sekce - bílé texty */
[data-order-page] [data-dark-section] h1,
[data-order-page] [data-dark-section] h2,
[data-order-page] [data-dark-section] h3 {
  color: #ffffff; /* Bílé nadpisy JEN V TMAVÝCH SEKCÍCH */
}
```

**Použití v komponentě:**
```tsx
// OrderPageFinal.tsx
return (
  <div data-order-page className="min-h-screen bg-white">
    {/* Světlé sekce - tmavé nadpisy */}
    <div className="bg-white py-16">
      <h1>Tady je nadpis tmavý</h1>
    </div>
    
    {/* Tmavé sekce - bílé nadpisy */}
    <div data-dark-section className="bg-gray-900 py-16">
      <h1>Tady je nadpis bílý</h1>
    </div>
  </div>
);
```

---

### **3️⃣ LANDING PAGE**

```css
/* Pouze pro landing page */
[data-landing] h1,
[data-landing] h2,
[data-landing] h3 {
  color: #111827; /* Tmavé nadpisy */
}

/* Tmavé sekce - bílé texty */
[data-landing] [data-dark-section] h1,
[data-landing] [data-dark-section] h2,
[data-landing] [data-dark-section] h3 {
  color: #ffffff; /* Bílé nadpisy JEN V TMAVÝCH SEKCÍCH */
}
```

**Použití v komponentě:**
```tsx
// App.tsx
return (
  <div data-landing className="min-h-screen">
    {/* Světlé sekce - tmavé nadpisy */}
    <HeroSection />
    <ProblemsSection />
    
    {/* Pokud bys měl tmavou sekci: */}
    <div data-dark-section className="bg-gray-900">
      <h2>Tady by byl bílý nadpis</h2>
    </div>
  </div>
);
```

---

## 📁 UPRAVENÉ SOUBORY

### **1. `/styles/globals.css`**

✅ **ODSTRANĚNO:**
```css
/* ❌ SMAZÁNO - globální h1-h5 barvy */
h1 { color: #ffffff; }
h2 { color: #ffffff; }
h3 { color: #ffffff; }
```

✅ **PŘIDÁNO:**
```css
/* ✅ IZOLOVANÉ STYLY */
[data-course] h1 { color: #ffffff; }
[data-order-page] h1 { color: #111827; }
[data-landing] h1 { color: #111827; }
```

### **2. `/components/CourseDemoV3.tsx`**

```tsx
return (
  <div data-course className="min-h-screen bg-gray-50 flex">
    {/* ... */}
  </div>
);
```

### **3. `/components/OrderPageFinal.tsx`**

```tsx
return (
  <div data-order-page className="min-h-screen bg-white">
    {/* ... */}
    <div data-dark-section className="bg-gray-900">
      {/* Bílé texty */}
    </div>
  </div>
);
```

### **4. `/App.tsx`**

```tsx
return (
  <div data-landing className="min-h-screen">
    {/* ... */}
  </div>
);
```

---

## 🧪 TESTOVÁNÍ

### **Test 1: Kurz má bílé nadpisy**
1. Otevři `#course-v3`
2. Zkontroluj že h1/h2/h3 jsou **BÍLÉ** (na modrém pozadí)
3. Zkontroluj že lekce mají **TMAVÉ** nadpisy (na bílém pozadí)

### **Test 2: Order page má tmavé nadpisy**
1. Otevři `/objednavka`
2. Zkontroluj že h1/h2/h3 jsou **TMAVÉ** (na bílém pozadí)
3. Zkontroluj že hero sekce má **BÍLÉ** nadpisy (na tmavém pozadí)

### **Test 3: Landing page má tmavé nadpisy**
1. Otevři `/`
2. Zkontroluj že h1/h2/h3 jsou **TMAVÉ** (na bílém pozadí)

---

## 🚀 VÝHODY

1. ✅ **Žádné konflikty** - každá stránka má svoje barvy
2. ✅ **Snadné úpravy** - změna v kurzu neovlivní order page
3. ✅ **Přehledné** - víš přesně kde jsou styly aplikované
4. ✅ **Flexibilní** - můžeš mít tmavé sekce na jakékoliv stránce

---

## 📝 PRAVIDLA PRO BUDOUCNOST

1. **NIKDY nepřidávej globální h1-h5 barvy do globals.css**
2. **VŽDY použij data-attribute pro izolaci**
3. **Pro tmavé sekce použij `data-dark-section`**
4. **Pro nové stránky vytvoř nový data-attribute** (např. `data-mini-course`)

---

**Status:** ✅ HOTOVO  
**Testováno:** ⏸️ TODO  
**Vytvořeno:** 2025-01-23

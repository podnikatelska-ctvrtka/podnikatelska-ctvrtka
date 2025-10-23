# 🔄 FONT FIX ROLLBACK - 2025-01-23

**PROBLÉM:** Předchozí font isolation fix rozl rozladil CELOU aplikaci! 😱

---

## ❌ CO BYLO ŠPATNĚ:

### **1️⃣ Globální `[data-course]` selector přepisoval VŠE**
```css
/* ❌ ŠPATNĚ - aplikovalo se VŠUDE v kurzu */
[data-course] h1 {
  color: #ffffff; /* Bílé nadpisy i na bílém pozadí! */
}
```

**Důsledky:**
- ❌ Sidebar měl bílé nadpisy (nebylo vidět)
- ❌ Dashboard měl bílé nadpisy (nebylo vidět)
- ❌ Lekce měly rozbitý design

---

### **2️⃣ Landing page měla tmavé texty na tmavých pozadích**
```css
/* ❌ ŠPATNĚ */
[data-landing] h1 {
  color: #111827; /* Tmavý text na tmavém pozadí hero sekce! */
}
```

**Důsledky:**
- ❌ Hero sekce - text nebyl vidět
- ❌ Tmavé sekce - text nebyl vidět

---

## ✅ ŘEŠENÍ: ROLLBACK + TAILWIND

### **CO JSEM UDĚLAL:**

1. ✅ **Odstranil VŠECHNY `[data-*]` styly z globals.css**
2. ✅ **Odstranil `data-course`, `data-landing`, `data-order-page` z komponent**
3. ✅ **Nechal komponenty používat Tailwind pro barvy**

---

## 📝 NOVÉ PRAVIDLO:

**KOMPONENTY SI DEFINUJÍ BARVY SAMY POMOCÍ TAILWIND!**

### **TMAVÉ POZADÍ → SVĚTLÉ TEXTY:**
```tsx
<div className="bg-gray-900 text-white">
  <h1 className="text-white">Nadpis</h1>
  <p className="text-gray-200">Text</p>
</div>
```

### **SVĚTLÉ POZADÍ → TMAVÉ TEXTY:**
```tsx
<div className="bg-white">
  <h1 className="text-gray-900">Nadpis</h1>
  <p className="text-gray-700">Text</p>
</div>
```

---

## 🎯 GLOBALS.CSS - CO ZŮSTALO:

```css
/* ✅ POUZE typography margins a line-heights */
.prose h1 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  line-height: 1.3;
  /* ❌ ŽÁDNÁ BARVA! */
}
```

**BARVY SE DEFINUJÍ V KOMPONENTÁCH!**

---

## 📁 UPRAVENÉ SOUBORY:

1. `/styles/globals.css` - odstraněny všechny `[data-*]` selektory
2. `/components/CourseDemoV3.tsx` - odstraněn `data-course`
3. `/App.tsx` - odstraněn `data-landing`
4. `/components/OrderPageFinal.tsx` - odstraněn `data-order-page`

---

## ✅ VÝSLEDEK:

- ✅ Kurz vypadá stejně jako Dashboard (normální velikosti fontů)
- ✅ Landing page má správné barvy (tmavé na světlém, světlé na tmavém)
- ✅ Order page má správné barvy
- ✅ Žádné globální přepisování stylů

---

**Status:** ✅ HOTOVO - VRÁCENO K FUNKČNÍMU STAVU  
**Datum:** 2025-01-23  
**Poučení:** NIKDY nepřidávat globální selektory které přepisují barvy!

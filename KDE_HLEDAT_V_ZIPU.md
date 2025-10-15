# 🔍 KDE HLEDAT V ZIPU - KONTROLA

## 🎯 MUSÍŠ ZKONTROLOVAT:

### **SOUBOR: /components/BusinessModelCanvasSimple.tsx**

**Otevři ZIP → components → BusinessModelCanvasSimple.tsx**

**Hledej řádek cca 84-86:**

```tsx
// ✅ SPRÁVNÁ VERZE (NOVĚJŠÍ):
const { data, error } = await supabase
  .from('user_canvas_data')  // ← TOHLE MÁ BÝT!
  .select('*')

// ❌ ŠPATNÁ VERZE (STARŠÍ):
const { data, error } = await supabase
  .from('business_canvas_sections')  // ← TOHLE NE!
  .select('*')
```

---

## **JAK ZJISTIT:**

### **1. Otevři ZIP**
### **2. Najdi /components/BusinessModelCanvasSimple.tsx**
### **3. Vyhledej text: ".from('"**
### **4. Koukni co tam je:**

**Pokud vidíš:**
```
.from('user_canvas_data')
```
→ ✅ **SPRÁVNÝ ZIP!**

**Pokud vidíš:**
```
.from('business_canvas_sections')
```
→ ❌ **STARÝ ZIP! Potřebujeme novější!**

---

## **CO TO ZNAMENÁ:**

### **SCÉNÁŘ A: ZIP má user_canvas_data**
→ ✅ Je to NOVĚJŠÍ verze  
→ ✅ POUŽIJEME TENTO ZIP!  
→ ✅ Obnovíme lokální soubory  

### **SCÉNÁŘ B: ZIP má business_canvas_sections**
→ ❌ Je to STARŠÍ verze  
→ ❌ Potřebujeme NOVĚJŠÍ ZIP!  
→ ❓ Máš ještě jiný ZIP?  

---

## **POKUD MÁŠ VÍC ZIPů:**

Zkontroluj VŠECHNY podle tohoto postupu a najdi ten který má `user_canvas_data`.

Ten nejnovější použijeme!

---

## **ALE MOŽNÁ...**

**Errory které vidíš jsou z PRODUKCE (Netlify), ne z lokálního kódu!**

To znamená:
- ✅ Lokální kód je SPRÁVNÝ (user_canvas_data)
- ❌ Produkce je STARŠÍ (business_canvas_sections)
- 🎯 Stačí jen PUSH lokální verzi na Netlify!

---

**ŘEKNI MI CO NAŠEL V ZIPU!** 🔍

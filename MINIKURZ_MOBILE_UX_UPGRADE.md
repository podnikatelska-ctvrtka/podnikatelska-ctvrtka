# 📱 MINIKURZ - MOBILE UX UPGRADE

**Datum:** 3. listopadu 2025  
**Status:** ✅ HOTOVO

---

## 🎯 CO BYLO VYLEPŠENO:

### **1️⃣ DAY SELECTOR (Dny 1, 2, 3) - MOBILNÍ VERZE**

#### **PŘED:**
```
❌ Malá tlačítka v řádku
❌ Těsné vedle sebe (gap-2)
❌ Jen "Den 1", "Den 2", "Den 3"
❌ Málo informací
```

#### **PO:**
```
✅ Vertikální cards s ikonami
✅ Každá karta má:
   • Ikonu modulu (MessageCircle, TrendingUp, Sparkles)
   • "DEN X" badge
   • Plný název ("Získejte zpětnou vazbu...")
   • Indikátor stavu (Právě zde / Hotovo)
✅ Větší touch target (celá karta je klikací)
✅ Ring efekt na aktivním dni
✅ Smooth scroll na vrch po kliknutí
```

**KÓD:**
- Desktop: Horizontální tlačítka (původní design)
- Mobile: Vertikální cards (nový design)

---

### **2️⃣ VALIDACE - KONKRÉTNÍ CHYBY**

#### **PŘED:**
```
❌ "Vyplňte prosím všechny kroky před dokončením dne!"
❌ Nevíš CO konkrétně chybí
```

#### **PO:**
```
✅ "Před dokončením doplňte:

   • Krok 1: Email šablona - zkopírujte a pošlete
   • Krok 3: Akční plán - sběr zpětné vazby"

✅ Shake animace error boxu
✅ Auto-scroll k prvnímu chybějícímu poli
✅ Auto-focus na textarea
✅ Toast s počtem chybějících kroků
```

**UKÁZKA:**
```typescript
// Vytvoří seznam konkrétních chybějících kroků
const missingList = emptyFields
  .map(field => `Krok ${field.stepNumber}: ${field.title}`)
  .join('\n• ');

setValidationError(`Před dokončením doplňte:\n\n• ${missingList}`);
```

---

### **3️⃣ MOBILE TYPOGRAPHY & SPACING**

#### **Vylepšení po celé komponentě:**

**Problem/Solution/Why sekce:**
- Text: `text-xs md:text-sm` (menší na mobilu)
- Padding: `p-4 md:p-6` (menší padding)
- Icons: `w-5 h-5 md:w-6 md:h-6`
- Leading: `leading-relaxed` (lepší čitelnost)

**Action Steps:**
- Step číslo: `w-7 h-7 md:w-8 md:h-8`
- Title: `text-sm md:text-base`
- Gap: `gap-3 md:gap-4`
- Margin: `mb-6 md:mb-8`

**Template boxy:**
- Padding: `p-4 md:p-6`
- Font: `text-xs md:text-sm`
- Margin: `ml-0 md:ml-12` (žádný offset na mobilu)

**Textarea:**
- Padding: `px-3 py-2.5 md:px-4 md:py-3`
- Font: `fontSize: '16px'` (prevents iOS zoom!)
- Focus ring: `focus:ring-4` (větší pro touch)
- Shadow: `shadow-sm` (subtilní depth)

**Navigační tlačítka:**
- Text: "Zpět" na mobilu, "Předchozí" na desktopu
- Active: `active:scale-95` (haptic feedback)
- Responsive padding a font sizes

---

### **4️⃣ SHAKE ANIMACE**

**Nová CSS animace v globals.css:**

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
```

**Použití:** Validační error box při pokusu dokončit den bez vyplnění

---

## 📊 RESPONSIVE BREAKPOINTS:

```css
Mobile:  < 768px  (md breakpoint)
Desktop: ≥ 768px

Všude používáme md: prefix pro desktop verzi
```

---

## 🧪 TESTOVÁNÍ:

### **Mobile Chrome DevTools:**
```
1. F12 → Toggle Device Toolbar
2. iPhone 12 Pro / Pixel 5
3. Test:
   ✅ Day selector cards jsou klikací
   ✅ Scroll to top po změně dne
   ✅ Textarea má správnou velikost fontu (16px)
   ✅ Validace ukazuje konkrétní kroky
   ✅ Shake animace funguje
   ✅ Auto-scroll k chybějícímu poli
```

### **Reálný mobil:**
```
1. Otevři /#minikurz?token=test
2. Zkus dokončit den BEZ vyplnění
   → Měl by se ukázat seznam chybějících kroků
3. Klikni na jiný den v day selectoru
   → Měl by scrollnout nahoru
4. Vyplň textarea
   → Neměl by se zoomovat (16px font)
```

---

## 🎨 DESIGN DECISIONS:

### **Proč vertikální cards na mobilu?**
- Více místa pro název modulu (lepší kontext)
- Vizuální hierarchie jasná
- Lepší thumb reach (větší touch target)
- Ikony dávají vizuální hint co v modulu je

### **Proč konkrétní validace?**
- User nemusí hádat CO chybí
- Rychlejší flow (ví přesně kam jít)
- Auto-scroll šetří čas
- Profesionálnější UX

### **Proč 16px font v textarea?**
- iOS Safari automaticky zoomuje na input < 16px
- Prevents zoom = lepší mobile UX
- Industry standard (Google, Facebook, atd.)

---

## ✅ HOTOVO:

```
✅ Mobile day selector s ikonami
✅ Konkrétní validační hlášky
✅ Shake animace
✅ Auto-scroll k chybějícímu poli
✅ Responsive typography
✅ Touch-friendly spacing
✅ iOS zoom prevention
✅ Active states (scale-95)
✅ Smooth scrolling
```

---

**Teď to zkus! 🚀**

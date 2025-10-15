# ✅ PROBLÉM S FONTY VYŘEŠEN!

## 🔥 CO BYL PROBLÉM:

Včera jsme změnili `globals.css` aby nadpisy byly **BÍLÉ** (kvůli kurzu s tmavým pozadím).

DNES jsem to omylem změnil zpátky na tmavé → kurz by měl neviditelné texty!

## ✅ FINÁLNÍ ŘEŠENÍ:

### 1. **globals.css VRÁCENO zpět** (pro kurz)
- ✅ h1, h2, h3, h5 → `color: #ffffff` (bílá)
- ✅ p → `color: #374151` (tmavá šedá)

### 2. **Přidán SPECIFICKÝ CSS override pro objednávkovou stránku**

Do `globals.css` jsem přidal (řádky ~248-266):

```css
/* ⚠️ ORDER PAGE - override bílých nadpisů pro světlé pozadí */
[data-order-page] h1,
[data-order-page] h2,
[data-order-page] h3,
[data-order-page] h4,
[data-order-page] h5 {
  color: #111827 !important;
}

[data-order-page] p {
  color: #374151 !important;
}

/* Sekce s tmavým pozadím na order page potřebují bílé texty */
[data-order-page] [data-dark-section] h1,
[data-order-page] [data-dark-section] h2,
[data-order-page] [data-dark-section] h3,
[data-order-page] [data-dark-section] h4,
[data-order-page] [data-dark-section] h5,
[data-order-page] [data-dark-section] p {
  color: #ffffff !important;
}
```

### 3. **OrderPageFinal.tsx označen data atributy**

```tsx
<div className="min-h-screen bg-white" data-order-page>
  
  {/* Hero sekce - TMAVÉ pozadí */}
  <div className="bg-gradient-to-br from-slate-900..." data-dark-section>
    {/* Bílé texty */}
  </div>
  
  {/* Světlé sekce - SVĚTLÉ pozadí */}
  <div className="bg-gray-50...">
    {/* Tmavé texty */}
  </div>
  
  {/* Rekapitulace - TMAVÉ pozadí */}
  <div className="bg-gradient-to-br from-indigo-900..." data-dark-section>
    {/* Bílé texty */}
  </div>
  
  {/* Countdown - TMAVÉ pozadí */}
  <div className="bg-gradient-to-r from-orange-500..." data-dark-section>
    {/* Bílé texty */}
  </div>
  
</div>
```

---

## 🎯 JAK TO FUNGUJE:

### KURZ (bez `data-order-page`):
- ✅ h1, h2, h3, h5 → **BÍLÉ** (defaults z globals.css)
- ✅ Tmavé pozadí → PERFEKTNĚ VIDITELNÉ!

### OBJEDNÁVKA (s `data-order-page`):
- ✅ Světlé sekce → h1-h5 **TMAVÉ** (override)
- ✅ Tmavé sekce (s `data-dark-section`) → h1-h5 **BÍLÉ** (další override)

---

## 📊 ZMĚNĚNÉ SOUBORY:

1. ✅ `/styles/globals.css` - přidán override pro `[data-order-page]`
2. ✅ `/components/OrderPageFinal.tsx` - přidány data atributy:
   - `data-order-page` na root div
   - `data-dark-section` na 3× tmavé sekce (hero, rekapitulace, countdown)

---

## ✅ VÝSLEDEK:

- ✅ **KURZ** - bílé nadpisy (tmavé pozadí) → BEZE ZMĚNY!
- ✅ **OBJEDNÁVKA** - tmavé nadpisy (světlé pozadí) → VIDITELNÉ!
- ✅ **OBJEDNÁVKA tmavé sekce** - bílé nadpisy → VIDITELNÉ!

**Globální CSS se DOTÝKÁ jen kurzu, objednávka má VLASTNÍ pravidla!** 🎉

---

## 🚀 TEST CHECKLIST:

Po `npm run dev` zkontroluj:

### KURZ `/kurz`:
- [ ] Dashboard - h1, h2 bílé?
- [ ] Sidebar - h3 bílé?
- [ ] Lekce - nadpisy viditelné?

### OBJEDNÁVKA `/objednavka`:
- [ ] Hero sekce (tmavá) - nadpisy BÍLÉ?
- [ ] Problémy sekce (světlá) - nadpisy TMAVÉ?
- [ ] Rekapitulace (tmavá) - nadpisy BÍLÉ?
- [ ] Countdown (oranžový) - texty BÍLÉ?
- [ ] Checkout (světlý) - nadpisy TMAVÉ?

---

## 💡 PROČ TO TAKHLE:

1. **Neměnit globals.css** - ovlivňuje CELOU aplikaci (hlavně kurz)
2. **Specifické overridy** - jen pro objednávku přes `data-*` atributy
3. **`!important`** - zajistí že override vždy vyhraje nad defaults
4. **Nested overrides** - `[data-order-page] [data-dark-section]` = tmavé sekce UVNITŘ order page

**= PERFEKTNÍ SEPARACE! Kurz a objednávka mají NEZÁVISLÉ styly!** ✅

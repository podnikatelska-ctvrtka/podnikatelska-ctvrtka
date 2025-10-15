# 🔍 ANALÝZA VŠECH PROBLÉMOVÝCH FONTŮ

## NAJDENÉ PROBLÉMY S ČITELNOSTÍ:

### ✅ JIŽ OPRAVENO:
1. **Řádek 255** - `text-yellow-300` na fialovém → opraveno na `text-white` ✅
2. **Řádek 257** - `opacity-90` → opraveno na `text-white` ✅

---

### ⚠️ DALŠÍ POTENCIÁLNÍ PROBLÉMY:

#### **Hero sekce (řádky 102-130):**

**Řádek 121-123:**
```tsx
<p className="text-xl md:text-2xl lg:text-3xl mb-6 text-gray-200 leading-relaxed max-w-3xl mx-auto">
  Nájmy rostou. Konkurence nespí. Zákazníci mají na výběr.
</p>
```
- **Pozadí:** Tmavý gradient (slate-900 → indigo-900 → purple-900)
- **Text:** `text-gray-200` (#e5e7eb) - SVĚTLE ŠEDÁ
- **Hodnocení:** ✅ DOBŘE ČITELNÉ (světlá na tmavém)

**Řádek 125-127:**
```tsx
<p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
  Buď budeš dál zkoušet náhodné věci... nebo si konečně <strong className="text-white">uděláš jasnou strategii</strong>.
</p>
```
- **Pozadí:** Tmavý gradient
- **Text:** `text-gray-300` (#d1d5db) - SVĚTLE ŠEDÁ
- **Hodnocení:** ✅ DOBŘE ČITELNÉ (světlá na tmavém)

---

#### **Lifetime access box (řádky 353-360):**

**Řádek 357-359:**
```tsx
<p className="text-gray-300">
  Platíš jednou. Máš navždy. Včetně všech budoucích updatů a novinek.
</p>
```
- **Pozadí:** Tmavý gradient (gray-900 → gray-800)
- **Text:** `text-gray-300` (#d1d5db) - SVĚTLE ŠEDÁ
- **Hodnocení:** ✅ DOBŘE ČITELNÉ (světlá na tmavém)

---

#### **Rekapitulace před nákupem (řádky 498-538):**

**Řádek 512, 518, 524:**
```tsx
<p className="text-sm opacity-90">Vyplníš, validuješ, dostaneš plán</p>
<p className="text-sm opacity-90">Celý byznys na jednom listu</p>
<p className="text-sm opacity-90">Přesně víš co dělat zítra</p>
```
- **Pozadí:** Fialový gradient (indigo-900 → purple-900 → pink-900)
- **Text:** Bílý s `opacity-90`
- **Hodnocení:** ⚠️ MŮŽE BÝT LEPŠÍ
- **Doporučení:** Změnit na `text-white` bez opacity

**Řádek 528-530:**
```tsx
<p className="text-xl md:text-2xl opacity-90 mb-8">
  Platíš jednou <span className="text-yellow-300 font-black">4.999,- Kč</span>, máš lifetime přístup + všechny budoucí updaty zdarma
</p>
```
- **Pozadí:** Fialový gradient
- **Text hlavní:** Bílý s `opacity-90` - ⚠️ MŮŽE BÝT LEPŠÍ
- **Text ceny:** `text-yellow-300` (#fde047) - ⚠️ MŮŽE BÝT ŠPATNĚ VIDITELNÉ NA FIALOVÉM!
- **Doporučení:** 
  - Změnit hlavní text na `text-white` bez opacity
  - Změnit cenu na `text-white font-black` (nebo jiná výrazná barva)

---

#### **Checkout sekce (řádky 540-656):**

**Countdown timer řádky 557-574:**
```tsx
<p className="text-sm opacity-90 mb-1">Speciální cena končí za</p>
<div className="text-xs opacity-80">hod</div>
<div className="text-xs opacity-80">min</div>
<div className="text-xs opacity-80">sek</div>
```
- **Pozadí:** Orange/červený gradient
- **Text:** Bílý s opacity
- **Hodnocení:** ✅ PRAVDĚPODOBNĚ OK (ale může být lepší bez opacity)

**Řádek 580:**
```tsx
<div className="text-lg line-through opacity-60">8.499,- Kč</div>
```
- **Hodnocení:** ✅ OK (záměrně bledší protože je to stará cena)

---

## 📊 SHRNUTÍ PROBLÉMŮ:

### 🔴 KRITICKÉ (OPRAVIT HNED):
1. **Řádek 529:** `text-yellow-300` na fialovém - cena "4.999,- Kč"
   - **Fix:** `text-white font-black` nebo `text-yellow-400` (tmavší)

### 🟡 DOPORUČENÉ VYLEPŠENÍ:
2. **Řádek 528:** `opacity-90` na bílém textu před nákupem
   - **Fix:** `text-white` bez opacity
   
3. **Řádky 512, 518, 524:** `opacity-90` na description textech
   - **Fix:** `text-white/80` nebo `text-gray-100`

4. **Řádek 557:** `opacity-90` na "Speciální cena končí za"
   - **Fix:** `text-white/90` (nebo bez opacity)

### ✅ V POŘÁDKU:
- Všechny `text-gray-200` a `text-gray-300` na tmavých pozadích ✅
- Všechny `text-gray-700` na světlých pozadích ✅
- `text-white` bez opacity ✅

---

## 🔧 AKČNÍ PLÁN:

### MINIMÁLNÍ OPRAVA (JEN KRITICKÉ):
```tsx
// Řádek 529 - ZMĚNIT Z:
<span className="text-yellow-300 font-black">4.999,- Kč</span>

// NA:
<span className="text-white font-black" style={{ textShadow: '0 0 30px rgba(253,224,71,0.8)' }}>4.999,- Kč</span>
// NEBO:
<span className="text-yellow-400 font-black">4.999,- Kč</span>
```

### PLNÁ OPRAVA (KRITICKÉ + DOPORUČENÉ):
1. Opravit cenu (řádek 529)
2. Odstranit opacity z hlavního textu (řádek 528)
3. Odstranit opacity z description textů (řádky 512, 518, 524)

---

## ❓ CO DĚLAT?

**Volba 1:** Opravit JEN kritickou cenu (1 řádek)
**Volba 2:** Opravit vše (cena + opacity texty, ~5 řádků)

Řekni co preferuješ a udělám to!

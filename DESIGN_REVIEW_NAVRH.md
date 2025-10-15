# 🎨 DESIGN REVIEW - Návrh úprav velikostí fontů

## 📊 AKTUÁLNÍ STAV

### Problémy:
1. **FitValidatorV2** - Příklady odpovědí mají divné zarovnání (ani left, ani center není ideální)
2. **Nekonzistence** - Některé komponenty mají text-sm, jiné text-xs, jiné globální velikosti
3. **Info boxy** - Rozdílné velikosti nadpisů a textů napříč komponentami
4. **Číselné hodnoty** - Některé moc malé (text-xs), jiné moc velké

---

## ✅ NÁVRH ŘEŠENÍ

### 1. FitValidatorV2 - Příklady odpovědí

**PROBLÉM:** Texty s uvozovkami vypadají divně jak vlevo, tak na centru

**ŘEŠENÍ:**
```tsx
// MÍSTO:
<p className="text-yellow-700 bg-white p-3 rounded border-l-4 border-yellow-400 italic">
  {ex}
</p>

// POUŽÍT:
<div className="bg-white p-3 pl-4 rounded-lg border-l-4 border-yellow-400 shadow-sm">
  <p className="text-yellow-800 leading-relaxed">
    "{ex}"
  </p>
</div>
```

**DŮVOD:** 
- Menší padding vlevo (pl-4) + shadow vytvoří efekt "quote"
- Uvozovky zpět pro jasnost
- Normální font místo italic (čitelnější)
- Odstín tmavší (800 místo 700) pro lepší kontrast

---

### 2. GLOBÁLNÍ PRAVIDLA PRO FONTY

#### A) Info Boxy - JEDNOTNÉ VELIKOSTI

```tsx
// 🔵 Info Box (modrý, žlutý, zelený, červený, fialový)
<div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
  {/* Nadpis: VŽDY font-bold, BEZ text-* třída (= globální 17px) */}
  <h4 className="font-bold text-blue-900 mb-3">
    💡 Nadpis boxu
  </h4>
  
  {/* Primární text: BEZ text-* třída (= globální 17px) */}
  <p className="text-blue-800">
    Primární popis nebo instrukce
  </p>
  
  {/* Sekundární/detail text: text-sm (= 14px) */}
  <p className="text-sm text-blue-700 mt-2">
    Doplňující informace nebo detaily
  </p>
</div>
```

#### B) Číselné Hodnoty

```tsx
// Velké čísla (hlavní metriky)
<div className="text-3xl font-bold text-green-600">
  4 999 Kč
</div>

// Střední čísla (vedlejší metriky)
<div className="text-xl font-bold text-gray-900">
  127 zákazníků
</div>

// Malé čísla (labely pod velkými čísly)
<p className="text-sm text-gray-600">
  průměr/měsíc
</p>
```

#### C) Nadpisy v Komponentech

```tsx
// Hlavní nadpis komponenty (h3)
<h3 className="text-gray-900 mb-4">
  🎯 FIT Mapping
</h3>

// Podnadpis sekce (h4) 
<h4 className="text-lg font-bold text-gray-900 mb-3">
  📊 Rozdělení podle segmentů
</h4>

// Mini nadpis (h5) - pouze když NUTNÉ
<h5 className="font-bold text-gray-900 mb-2">
  Aktuální stav
</h5>
```

---

### 3. KONKRÉTNÍ ÚPRAVY PO KOMPONENTÁCH

#### FitValidatorV2.tsx

**KROK 1 - Discovery Boxy:**
```tsx
// Nadpis boxu (Jobs/Pains/Gains)
<h4 className="mb-3 text-yellow-900"> // ✅ globální velikost
  Cíle/Důvody (Jobs)
</h4>

// "Otázky k položení:"
<p className="font-bold text-yellow-800"> // ✅ globální velikost

// Samotné otázky
<p className="text-yellow-900"> // ✅ globální velikost

// "Příklady odpovědí:" 
<p className="font-bold text-yellow-800"> // ✅ globální velikost

// Samotné příklady - NOVÝ STYL
<div className="bg-white p-3 pl-4 rounded-lg border-l-4 border-yellow-400 shadow-sm">
  <p className="text-yellow-800 leading-relaxed">
    "{ex}"
  </p>
</div>
```

**KROK 2 - Prioritizace:**
```tsx
// Nadpis položky
<p className="text-yellow-900 mb-1"> // ✅ globální

// Počet respondentů
<p className="text-sm text-yellow-700"> // ✅ menší = 14px
```

**KROK 3 - Validace:**
```tsx
// Boxy už jsou OK (p-4, globální texty)
// Checkboxy už jsou OK (text bez text-xs)
```

---

#### ProfitCalculator.tsx

**Finanční Overview:**
```tsx
// Labely (Příjmy, Náklady, Zisk)
<div className="text-gray-600"> // ✅ globální 17px

// Čísla
<div className="text-xl font-bold text-gray-900"> // ✅ 20px

// Status badge
<span className="font-bold text-lg"> // ✅ 18px
  Prosperuje ✓
</span>
```

**Info Boxy:**
```tsx
// Všechny info boxy
p-5, nadpis text-lg, text globální
```

---

#### BusinessActionPlan.tsx

**Prioritní akce:**
```tsx
// Číslo kroků
<span className="text-xl"> // ✅ větší číslo = 20px
  1
</span>

// Nadpis akce
<strong className="text-gray-900"> // ✅ globální

// Text akce
<p className="text-gray-700"> // ✅ globální
```

---

#### CanvasValidator.tsx

**Validační zprávy:**
```tsx
// Nadpis pravidla
<h4 className="font-bold text-gray-900 mb-2"> // ✅ globální

// Zpráva
<p className="text-gray-700"> // ✅ globální

// Tip
<p className="text-sm text-gray-600 mt-2"> // ✅ menší = 14px
```

---

## 📐 HIERARCHIE VELIKOSTÍ

### Doporučená hierarchie (top → bottom):

```
1. Hlavní nadpis stránky/komponenty (H2/H3): globální 17px, font-bold
2. Čísla/metriky (velké): text-3xl (30px), font-bold
3. Sekce nadpis (H4): text-lg (18px), font-bold  
4. Čísla/metriky (střední): text-xl (20px), font-bold
5. Primární text/labely: globální 17px
6. Sekundární text/detaily: text-sm (14px)
7. Čísla (malé/labely): text-sm (14px)
```

### NIKDY NEPOUŽÍVAT:
- ❌ `text-xs` (12px) - příliš malé, špatná čitelnost
- ❌ `text-base` - zbytečné, to je default

---

## 🎯 PRIORITA ÚPRAV

### 🔴 Vysoká priorita (udělat hned):
1. ✅ **FitValidatorV2** - Oprav příklady odpovědí (nový quote styl)
2. **ProfitCalculator** - Zvětši text-sm na globální v info boxech
3. **BusinessActionPlan** - Sjednoť velikosti nadpisů

### 🟡 Střední priorita (udělat brzy):
4. **CanvasValidator** - Zkontroluj konzistenci
5. **VPCCustomerProfileStory** - Zkontroluj velikosti
6. **BusinessModelCanvas** - Zkontroluj sticky notes

### 🟢 Nízká priorita (udělat později):
7. Landing page komponenty (HeroSection, etc.)
8. Admin komponenty
9. Modaly a notifikace

---

## 🔧 IMPLEMENTAČNÍ CHECKLIST

- [ ] FitValidatorV2 - Nový styl pro příklady odpovědí
- [ ] FitValidatorV2 - Zkontroluj všechny font velikosti
- [ ] ProfitCalculator - Odstraň text-sm z info boxů
- [ ] BusinessActionPlan - Sjednoť nadpisy na text-lg nebo globální
- [ ] CanvasValidator - Zkontroluj konzistenci
- [ ] VPCCustomerProfileStory - Zkontroluj boxy
- [ ] VPCValueMapSquare - Zkontroluj boxy
- [ ] Aktualizuj DESIGN_SYSTEM.md s novými pravidly
- [ ] Otestuj na mobilu (čitelnost)
- [ ] Otestuj na desktopu (vizuální hierarchie)

---

## 💡 PRAVIDLA DO BUDOUCNA

1. **Info box** = p-6, nadpis bez text-*, text bez text-*
2. **Detail text** = text-sm (14px)
3. **Nikdy text-xs** (příliš malé)
4. **Čísla velké** = text-3xl nebo text-2xl
5. **Čísla střední** = text-xl
6. **Quote/příklad** = border-l-4 + shadow-sm + pl-4

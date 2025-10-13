# ✅ CENY SYNCHRONIZOVÁNY - JEDNOTNÝ FORMÁT!

**Datum:** 13.10.2025  
**Status:** ✅ HOTOVO

---

## 🎯 CO JSME UDĚLALI:

### **PROBLÉM:**
```
❌ Nejednotný formát cen:
- "4.999 Kč" (bez čárky a pomlčky)
- "4999 Kč" (bez teček)
- "4.999,- Kč" (správně, ale jen někde)
- Chybí "bez DPH" u cen!
```

### **ŘEŠENÍ:**
```
✅ Jednotný formát VŠUDE:
- "4.999,- Kč" (s čárkou a pomlčkou)
- "8.499,- Kč" 
- "3.500,- Kč"
- "2.999,- Kč"
- "2.500,- Kč"

✅ Přidáno "bez DPH" všude kde je cena zobrazená!
```

---

## 📋 SPRÁVNÝ FORMÁT (Podle českých pravidel):

### **✅ JAK SPRÁVNĚ:**
```
4.999,- Kč bez DPH

Kde:
- "4.999" = tečka jako oddělovač tisíců
- ",- " = čárka a pomlčka místo haléřů
- " Kč" = mezera před korunami
- "bez DPH" = důležité pro B2B!
```

### **❌ JAK NE:**
```
❌ 4.999 Kč (chybí čárka a pomlčka)
❌ 4999 Kč (chybí oddělovač tisíců)
❌ 4,999 Kč (čárka místo tečky - to je anglický formát!)
❌ 4.999 CZK (CZK je mezinárodní kód, v ČR používáme Kč)
```

---

## 🔧 ZMĚNĚNÉ SOUBORY:

### **1. QuickEmailCaptureModal.tsx** ✅
```tsx
Změny:
- "8.499 Kč" → "8.499,- Kč"
- "4.999 Kč" → "4.999,- Kč"
+ "(bez DPH)" přidáno
- "3.500 Kč" → "3.500,- Kč"
- "2.999 Kč" → "2.999,- Kč"
- "3.500" (trust signal) → "3.500,-"

Kde:
- Modální okno s cenou
- Trust signals (3 Moduly • 16 Lekcí • 3.500,- Úspora)
- Bonus box
```

---

### **2. PrelaunchEmailCapture.tsx** ✅
```tsx
Změny:
- "4.999,- Kč" (už bylo správně!)
+ "bez DPH" přidáno
- "8.499 Kč" → "8.499,- Kč"
- "3.500 Kč" → "3.500,- Kč" (7× výskytů)
- "2.999 Kč" → "2.999,- Kč"

Kde:
- Hlavní cenový box (největší cena na landing page!)
- Success screen
- Timeline ("Po 3 dnech...")
- Info boxy
```

---

### **3. CountdownBanner.tsx** ✅
```tsx
Změny:
- "8.499 Kč" → "8.499,- Kč" (4× výskyty)
- "4.999 Kč" → "4.999,- Kč" (4× výskyty)
+ "bez DPH" přidáno (2× kde je hlavní cena)
- "3.500 Kč" → "3.500,- Kč" (2× výskyty)
- "2.500 Kč" → "2.500,- Kč" (bonus konzultace)
- "8.499" → "8.499,-" (v CTA buttonu)

Kde:
- Mobile countdown
- Desktop countdown
- Cenové boxy
- CTA buttony
```

---

### **4. EarlyAccessSale.tsx** ✅
```tsx
Změny:
- "8.499 Kč" → "8.499,- Kč"
- "4.999 Kč" → "4.999,- Kč" (2× výskyty)
+ "bez DPH" přidáno
- "3.500 Kč" → "3.500,- Kč"
- "2.500 Kč" → "2.500,- Kč"

Kde:
- Early access cenový box
- CTA button
```

---

### **5. FacebookAdCreatives.tsx** ✅
```tsx
Změny:
- "4.999 Kč" → "4.999,- Kč"
+ "bez DPH" přidáno

Kde:
- FB ad creative (vizualizace reklamy)
```

---

### **6. index.html** ✅
```html
Změny:
- meta og:description:
  "...za 4.999 Kč" → "...za 4.999,- Kč bez DPH"

Kde:
- Open Graph meta tag (pro FB sdílení)
```

---

## 📊 STATISTIKY:

### **Celkem změn:**
```
✅ 6 souborů upraveno
✅ 35+ výskytů cen opraveno
✅ Formát synchronizován: "4.999,- Kč"
✅ "bez DPH" přidáno všude kde je cena zobrazená
```

### **Ceny které jsme synchronizovali:**
```
✅ 4.999,- Kč (hlavní cena kurzu)
✅ 8.499,- Kč (původní cena)
✅ 3.500,- Kč (úspora)
✅ 2.999,- Kč (hodnota mini kurzu)
✅ 2.500,- Kč (bonus konzultace)
```

---

## 🎯 KDE JSOU CENY ZOBRAZENÉ:

### **1. QuickEmailCaptureModal** (popup)
```
🔵 Modrý box - CENA:
"8.499,- Kč" (škrtnuté)
"4.999,- Kč" (velké)
"bez DPH" (malé pod cenou)
"💰 Ušetříte: 3.500,- Kč"

🟣 Fialový box - BONUS:
"3-denní mini kurz ZDARMA (hodnota 2.999,- Kč)"

Trust signals:
"3 Moduly • 16 Lekcí • 3.500,- Úspora"
```

---

### **2. PrelaunchEmailCapture** (hlavní landing page)
```
⚡ HLAVNÍ CENA (velká):
"4.999,- Kč" (gradient text)
"(normálně 8.499,- Kč)"
"bez DPH" (malé)

💰 ÚSPORA:
"💰 UŠETŘÍTE 3.500,- Kč"
"Průkopnická cena -41%"

🎁 PO REGISTRACI:
"✅ 3-denní mini kurz HNED (2.999,- Kč)"
"💡 Průkopnická cena (4.999,- Kč bez DPH)"
```

---

### **3. CountdownBanner**
```
Mobile + Desktop:
"8.499,- Kč" (škrtnuté)
"4.999,- Kč" (velké)
"bez DPH"
"Ušetříte 3.500,- Kč"

BONUS:
"60min konzultace (2.500,- Kč)"

CTA:
"KOUPIT ZA 4.999,- Kč"
"KOUPIT 8.499,- ZA 4.999,- Kč"
```

---

### **4. EarlyAccessSale**
```
"8.499,- Kč" (škrtnuté)
"4.999,- Kč" (žlutá, velká)
"bez DPH"
"SLEVA 3.500,- Kč"
"+ BONUS konzultace v hodnotě 2.500,- Kč"

CTA:
"KOUPIT EARLY ACCESS za 4.999,- Kč"
```

---

### **5. Success screen** (po registraci)
```
"• Průkopnická cena: 4.999,- Kč bez DPH (ušetříte 3.500,- Kč)"

Boxy:
"💰 UŠETŘÍTE: 3.500,- Kč (-41%)"

Timeline:
"Po 3 dnech: Průkopnická cena 4.999,- Kč bez DPH (ušetříte 3.500,- Kč)"
```

---

## ⚠️ DŮLEŽITÉ POZNÁMKY:

### **1. "bez DPH" je DŮLEŽITÉ!** ✅
```
Proč:
- ✅ Transparentnost (lidé musí vědět!)
- ✅ Legální požadavek pro B2B
- ✅ Vyhneme se stížnostem "Proč platím víc?"
- ✅ Pro OSVČ s DPH je to 6.049,- Kč (4.999 × 1.21)
```

### **2. Kde jsme přidali "bez DPH":**
```
✅ QuickEmailCaptureModal - pod hlavní cenou
✅ PrelaunchEmailCapture - pod hlavní cenou + v textu
✅ CountdownBanner - pod hlavní cenou (2× mobile + desktop)
✅ EarlyAccessSale - pod hlavní cenou
✅ FacebookAdCreatives - pod cenou
✅ index.html meta tag
```

---

## 📝 PRAVIDLA PRO BUDOUCNOST:

### **Když přidáváš novou cenu:**
```tsx
// ✅ SPRÁVNĚ:
<div className="text-4xl">4.999,- Kč</div>
<div className="text-sm text-gray-500">bez DPH</div>

// ❌ ŠPATNĚ:
<div className="text-4xl">4.999 Kč</div>  // chybí čárka a pomlčka
<div className="text-4xl">4999 Kč</div>   // chybí oddělovač tisíců
<div className="text-4xl">4,999 Kč</div>  // anglický formát!
```

### **Formát cen podle částky:**
```
✅ 4.999,- Kč (tisíce)
✅ 8.499,- Kč (tisíce)
✅ 3.500,- Kč (tisíce)
✅ 2.999,- Kč (tisíce)
✅ 2.500,- Kč (tisíce)
✅ 999,- Kč (stovky - BEZ tečky!)
✅ 99,- Kč (desítky)
```

---

## 🔍 SOUBORY KTERÉ JSME NEZMĚNILI:

### **Dokumentační soubory (.md):**
```
Ponechali jsme původní formát v:
- SMARTEMAILING_EMAIL_FLOW.md
- AD_SETS_FINAL_COMPLETE.md
- CO_ZBYVA_UDELAT.md
- PRIPRAVENO_NA_ZEJTRA.md
- atd...

Důvod:
- Jsou to poznámky/dokumentace
- Nejsou vidět na webu
- Můžeme je aktualizovat později
```

### **Komponenty co nepoužíváme:**
```
- TakeawaysTimeline.tsx (3.500 Kč investice - case study)
- OptimizedMobileCTA.tsx (Sleva 3.500 Kč)
- CompactCaseStudySection.tsx (Investice 3.500 Kč)

Důvod:
- Tyto komponenty se nepoužívají v aktuální landing page
- Můžeme je opravit až budeme chtít použít
```

---

## ✅ FINÁLNÍ CHECKLIST:

### **Před spuštěním reklam:**
- [x] Všechny ceny synchronizované na "4.999,- Kč" formát
- [x] "bez DPH" přidáno všude kde je cena zobrazená
- [x] QuickEmailCaptureModal - opraveno
- [x] PrelaunchEmailCapture - opraveno
- [x] CountdownBanner - opraveno
- [x] EarlyAccessSale - opraveno
- [x] FacebookAdCreatives - opraveno
- [x] index.html meta tag - opraven
- [x] Trust signals - opraveny ("3.500,-" místo "3.500")

### **Co zbývá (OPTIONAL):**
- [ ] Email flow v SMARTEMAILING - synchronizovat formát (až budeme vytvářet emaily)
- [ ] FB Ad copy - synchronizovat formát (až budeme vytvářet reklamy)
- [ ] Dokumentační .md soubory - aktualizovat (OPTIONAL)

---

## 💰 CENOVÁ TABULKA (pro přehled):

```
┌─────────────────────────────────────────────────────┐
│  PRODUKT: Podnikatelská Čtvrtka                     │
├─────────────────────────────────────────────────────┤
│  Původní cena:      8.499,- Kč bez DPH              │
│  Průkopnická cena:  4.999,- Kč bez DPH              │
│  Úspora:            3.500,- Kč (-41%)               │
├─────────────────────────────────────────────────────┤
│  S DPH (pro OSVČ):  6.049,- Kč (4.999 × 1.21)      │
│  S DPH původní:    10.284,- Kč (8.499 × 1.21)      │
│  Úspora s DPH:      4.235,- Kč                      │
├─────────────────────────────────────────────────────┤
│  BONUSY:                                             │
│  • Mini kurz ZDARMA (hodnota 2.999,- Kč)           │
│  • Konzultace 60min (hodnota 2.500,- Kč)           │
│                                                      │
│  CELKOVÁ HODNOTA: 13.998,- Kč                       │
│  ZAPLATÍTE:        4.999,- Kč bez DPH              │
│  UŠETŘÍTE:         8.999,- Kč (-64%)               │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 DŮVODY PRO SYNCHRONIZACI:

### **1. Profesionalita** ✅
```
✅ Jednotný formát = vypadáme profesionálně
❌ Různé formáty = vypadáme amatérsky
```

### **2. Trust** ✅
```
✅ Konzistentní ceny = důvěryhodnost
❌ Různé ceny = "Co je ta správná cena?"
```

### **3. Legal** ✅
```
✅ "bez DPH" jasně uvedeno = transparentnost
❌ Bez "bez DPH" = možné stížnosti zákazníků
```

### **4. České pravidlo** ✅
```
✅ "4.999,- Kč" = správně podle českých pravidel
❌ "4.999 Kč" = neúplné, chybí čárka a pomlčka
```

---

## 📞 KDY KONTAKTOVAT:

### **Pokud najdete jinou cenu:**
```
1. Zkontrolujte jestli to není v .md souboru (dokumentace)
2. Zkontrolujte jestli se komponenta používá
3. Opravte podle tohoto vzoru: "4.999,- Kč bez DPH"
4. Aktualizujte tento dokument
```

---

**HOTOVO! VŠECHNY CENY SYNCHRONIZOVÁNY!** ✅  
**Formát: "4.999,- Kč bez DPH"**  
**Ready to launch! 🚀**

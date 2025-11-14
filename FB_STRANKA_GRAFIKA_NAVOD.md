# 🎨 FB STRÁNKA - PROFILOVÁ + COVER NÁVOD

**Vytvořeno:** 28. ledna 2025  
**URL:** https://podnikatelskactvrtka.cz/#fb-assets

---

## ✅ **CO MÁŠ HOTOVÉ:**

### **1. Profilová fotka:**
- ✅ Rozměr: **512×512 px**
- ✅ Design: Oranžovo-fialový gradient + "PČ" logo
- ✅ FB automaticky ořízne na kruh

### **2. Cover Photo (Varianta 1):**
- ✅ Rozměr: **820×312 px**
- ✅ Design: Gradient + hlavní message + stats
- ✅ Text: "Business Model Canvas za 90 minut"

### **3. Cover Photo (Varianta 2 - jednodušší):**
- ✅ Rozměr: **820×312 px**
- ✅ Design: Jednoduchý gradient + centrovaný text
- ✅ Text: "Podnikatelská Čtvrtka"

---

## 🎯 **JAK NA TO:**

### **KROK 1: Otevři generátor**

```
URL: https://podnikatelskactvrtka.cz/#fb-assets
```

### **KROK 2: Export vizuálů**

#### **Metoda A: Screenshot (NEJRYCHLEJŠÍ)**

```
WINDOWS:
1. Win + Shift + S
2. Vyber area tool
3. Screenshotni přesně box s vizuálem
4. Ulož jako PNG

MAC:
1. Cmd + Shift + 4
2. Klikni a táhni přes vizuál
3. Uloží se na Desktop jako PNG
```

#### **Metoda B: Download tlačítko**

```
1. Klikni "Download PNG" pod vizuálem
2. Automaticky stáhne PNG soubor
3. (Vyžaduje html2canvas library - může selhat)
```

---

## 📸 **NAHRÁNÍ NA FB:**

### **A) PROFILOVÁ FOTKA:**

```
1. Jdi na FB stránku "Podnikatelská Čtvrtka"
   → https://facebook.com/[tvoje-stranka]

2. Klikni na profilovou fotku → "Změnit profilovou fotku"

3. Upload soubor:
   → podnikatelska-ctvrtka-profile.png (512×512)

4. FB automaticky ořízne na kruh
   → Zkontroluj že "PČ" je ve středu

5. Ulož změny ✅
```

### **B) COVER PHOTO:**

```
1. Jdi na FB stránku "Podnikatelská Čtvrtka"

2. Klikni na cover → "Změnit cover photo"

3. Upload soubor:
   → podnikatelska-ctvrtka-cover.png (820×312)
   → NEBO varianta 2 (jednodušší)

4. Reposition pokud potřeba:
   → Hlavní text MUSÍ být ve středu! (mobile view!)
   
5. Zkontroluj mobile preview:
   → Klikni "Preview" → Mobil
   → Na mobilu se cover ořízne na 640×360
   
6. Ulož změny ✅
```

---

## 🎨 **JAKOU VARIANTU VYBRAT:**

### **Cover Varianta 1 (Komplexní):**
```
PRO:
✅ Více informací (90 min, 16 lekcí)
✅ Profesionální look
✅ Stats boxy přitahují pozornost

PROTI:
❌ Složitější na mobilu
❌ Text vlevo může být oříznutý
```

### **Cover Varianta 2 (Jednoduchá):**
```
PRO:
✅ Jednodušší, čitelnější
✅ Funguje perfektně na mobilu
✅ Centrovaný text = bezpečné

PROTI:
❌ Méně info
❌ Méně "wow" faktoru
```

**💡 DOPORUČENÍ:** Začni s **Varianta 2** (jednoduchá).  
Je univerzálnější a funguje na všech zařízeních!

---

## 🔧 **CUSTOMIZACE:**

Pokud chceš změnit design:

1. Otevři `/components/FBPageAssets.tsx`
2. Najdi příslušnou sekci (Profilová / Cover)
3. Uprav:
   - Text (změň "PČ" na cokoliv)
   - Barvy (gradient hodnoty)
   - Layout (pozice elementů)
4. Refresh stránku
5. Export nový vizuál

---

## 📊 **TECHNICKÉ PARAMETRY:**

```
PROFILOVÁ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Rozměr: 512×512 px (high quality)
Format: PNG
FB zobrazí: 180×180 px (kruh)
Min rozměr: 180×180 px
Doporučený: 512×512 px nebo vyšší

COVER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Rozměr: 820×312 px
Format: PNG nebo JPG
Desktop view: 820×312 px (celé)
Mobile view: 640×360 px (ořízne strany!)
Min rozměr: 400×150 px
Doporučený: 820×312 px
```

---

## ⚠️ **DŮLEŽITÉ TIPY:**

### **1. Mobile-first přístup:**
```
✅ Hlavní text DAT DO STŘEDU!
✅ FB cover na mobilu ořízne ~90px z každé strany
✅ Preview VŽDY na mobilu před publikováním
```

### **2. Čitelnost:**
```
✅ Použij kontrastní barvy (bílá na tmavé)
✅ Velký font (min 24px na coveru)
✅ Krátké texty (max 2 řádky)
```

### **3. Brand konzistence:**
```
✅ Použij stejný gradient jako na webu
✅ Stejné barvy jako v reklamách
✅ Konzistentní messaging
```

---

## 📱 **PREVIEW PŘED PUBLIKOVÁNÍM:**

### **Desktop:**
```
1. FB Business Manager → Stránky
2. Preview stránky
3. Zkontroluj že profilová i cover sedí
```

### **Mobil:**
```
1. Otevři FB app na mobilu
2. Najdi svoji stránku
3. Zkontroluj jak vypadá cover
4. Ověř že text není oříznutý
```

---

## ✅ **CHECKLIST:**

```
PRE-UPLOAD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

□ Exportoval profilovku (512×512 px)
□ Exportoval cover (820×312 px)
□ Zkontroloval kvalitu PNG
□ File size <5 MB (ideálně <1 MB)

UPLOAD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

□ Nahrál profilovku
□ Zkontroloval preview v kruhu
□ Nahrál cover
□ Reposition pokud nutné
□ Preview na mobilu
□ Publikoval ✅

POST-UPLOAD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

□ Zkontroloval na desktopu
□ Zkontroloval na mobilu
□ Zkontroloval že text je čitelný
□ Zkontroloval brand konzistenci
```

---

## 🎯 **DALŠÍ KROKY:**

Po nastavení grafiky:

1. ✅ **About sekce:**
   - Popis kurzu
   - Website: podnikatelskactvrtka.cz
   - Kategorie: Vzdělávání

2. ✅ **První post:**
   - Uvítání na stránce
   - Co nabízíme
   - CTA na web

3. ✅ **CTA button:**
   - "Zjistit více" → podnikatelskactvrtka.cz
   - "Koupit kurz" → /objednavka

4. ✅ **Připoj k Business Manager:**
   - Pro reklamy
   - Pro insights
   - Pro messaging

---

## 🔗 **ODKAZY:**

```
Generátor grafiky:
→ https://podnikatelskactvrtka.cz/#fb-assets

FB stránka (po vytvoření):
→ https://facebook.com/podnikatelska-ctvrtka

Business Manager:
→ https://business.facebook.com/

FB Ads Setup návod:
→ /FB_ADS_SETUP_KROK_ZA_KROKEM.md
```

---

## 💡 **FAQ:**

**Q: Profilová je rozmazaná?**  
A: Upload ve vyšším rozlišení (min 512×512). FB škáluje dolů.

**Q: Cover text je oříznutý na mobilu?**  
A: Reposition text do středu. Mobil ořízne ~90px z každé strany.

**Q: Můžu použít jiné barvy?**  
A: Ano! Edituj gradient v `/components/FBPageAssets.tsx`

**Q: Formát JPG nebo PNG?**  
A: PNG pro profilovku (průhlednost). Cover = obojí OK.

**Q: Kdy změnit cover?**  
A: Pro speciální akce (Black Friday, launch, milník). Jinak nech stabilní.

---

**READY? HOTOVO! 🚀**

Máš krásnou FB stránku ready pro reklamy! 💪

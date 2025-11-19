# 📊 ANALYTICS SETUP GUIDE

## ✅ CO MÁŠ UŽ HOTOVÉ:

✅ **Meta Pixel** - funguje (ID: `891824089837992`)  
✅ **Google Analytics 4** - přidáno (potřebuješ nastavit ID)  
✅ **Microsoft Clarity** - přidáno (potřebuješ nastavit ID)

---

## 🚀 CO MUSÍŠ UDĚLAT (5 MINUT):

### **1️⃣ GOOGLE ANALYTICS 4 (GA4) - ZDARMA**

**Proč GA4:**
- Vidíš kolik lidí přišlo, odkud, jak dlouho zůstali
- Kolik % scrolluje dolů
- Které CTA nejvíc klikají
- Conversion tracking

**Jak nastavit (2 minuty):**

1. Jdi na: https://analytics.google.com/
2. Vytvoř účet (nebo použij existující)
3. Vytvoř novou **Měřenou položku (Property)**:
   - Název: "Podnikatelská Čtvrtka"
   - Časová zóna: "Česká republika"
   - Měna: "CZK"
4. Vyber **Web stream**:
   - URL webu: `https://www.podnikatelskactvrtka.cz`
5. **ZKOPÍRUJ Measurement ID** (formát: `G-XXXXXXXXXX`)
6. **VLOŽ HO DO KÓDU:**

**Soubor:** `/lib/analytics.ts`  
**Řádek:** `7`

```typescript
export const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // ← NAHRAĎ TÍMTO
```

**✅ HOTOVO!** GA4 bude automaticky trackovat všechno.

---

### **2️⃣ MICROSOFT CLARITY - ZDARMA**

**Proč Clarity:**
- **Session recordings** - vidíš PŘESNĚ co lidi dělají (jako bys se jim díval přes rameno)
- **Heatmapy** - kde klikají, kde scrollují
- **Frustrace detection** - kde se lidé zaseknou
- 100% ZDARMA, neomezený traffic!

**Jak nastavit (2 minuty):**

1. Jdi na: https://clarity.microsoft.com/
2. Zaregistruj se (Microsoft účet)
3. Klikni **Add New Project**:
   - Název: "Podnikatelská Čtvrtka"
   - URL: `https://www.podnikatelskactvrtka.cz`
4. **ZKOPÍRUJ Project ID** (formát: `XXXXXXXXXX`)
5. **VLOŽ HO DO KÓDU:**

**Soubor:** `/lib/analytics.ts`  
**Řádek:** `10`

```typescript
export const CLARITY_PROJECT_ID = 'XXXXXXXXXX'; // ← NAHRAĎ TÍMTO
```

**✅ HOTOVO!** Clarity začne nahrávat sessions.

---

## 🎯 CO UVIDÍŠ PO NASAZENÍ:

### **GA4 Dashboard:**
- **Realtime** - kolik lidí je teď na webu
- **Acquisition** - odkud lidi přišli (FB, Google, direct)
- **Engagement** - jak dlouho zůstali, co klikali
- **Conversions** - kolik leadů, kolik prodejů

### **Clarity Dashboard:**
- **Recordings** - přehrávaš si session jako video
- **Heatmaps** - kde lidi klikají, scrollují
- **Dead clicks** - kde klikají ale nic se nestane (bug!)
- **Rage clicks** - kde klikají opakovaně (frustrace!)

---

## 📊 KLÍČOVÉ METRIKY KTERÉ SLEDOVAT:

### **Z FB Ads:**
- **178 kliků** = lidi dorazí

### **Z GA4:**
- **Bounce rate** - kolik % odejde hned?
- **Avg. session duration** - jak dlouho zůstanou?
- **Scroll depth** - kolik % scrolluje dolů?
- **CTA clicks** - kolik % klikne na CTA?

### **Z Clarity:**
- **Kde odchází** - na kterém místě stránky?
- **Vidí vůbec timer?** - scrollují tak daleko?
- **Klikají na CTA?** - nebo ho přehlíží?

---

## 🔥 CO TO VYŘEŠÍ:

**Problém:** 178 kliků, 0 leadů

**Možné příčiny:**
1. ❌ **Špatný traffic** - lidi nejsou cílovka → GA4 ti ukáže demography, interests
2. ❌ **Slabý hook** - odchází hned → Clarity ti ukáže kde přesně
3. ❌ **CTA není vidět** - nescrollují dolů → GA4 scroll depth
4. ❌ **CTA není přesvědčivý** - scrollují ale neklikají → Clarity heatmapy

**Po 2-3 dnech budeš PŘESNĚ VĚDĚT kde je problém!**

---

## ✅ CHECKLIST:

- [ ] Vytvořil jsem GA4 účet
- [ ] Zkopíroval jsem GA4 Measurement ID
- [ ] Vložil jsem GA4 ID do `/lib/analytics.ts`
- [ ] Vytvořil jsem Clarity projekt
- [ ] Zkopíroval jsem Clarity Project ID
- [ ] Vložil jsem Clarity ID do `/lib/analytics.ts`
- [ ] Nasadil jsem změny na web
- [ ] Otevřel jsem web a zkontroloval Console (měly by být ✅ zprávy)
- [ ] Zkontroloval jsem GA4 Realtime (vidím svoji session?)
- [ ] Zkontroloval jsem Clarity Dashboard (nahrává se session?)

---

## 🆘 TROUBLESHOOTING:

**GA4 nevidí data:**
- Zkontroluj Console (F12) - mělo by být: `✅ GA4 initialized: G-XXXXXXXXXX`
- Zkontroluj AdBlock - může blokovat GA4
- Počkej 5-10 minut, GA4 má delay

**Clarity nevidí session recordings:**
- Zkontroluj Console (F12) - mělo by být: `✅ Clarity initialized: XXXXXXXXXX`
- Zkontroluj AdBlock - může blokovat Clarity
- Session se zobrazí po 1-2 minutách po dokončení

**Vidím chybovou zprávu v Console:**
- Ujisti se, že IDs jsou správně zkopírované
- GA4 ID začíná vždycky `G-`
- Clarity ID je jenom číslice

---

## 📞 DALŠÍ KROKY:

1. ✅ Nastav GA4 + Clarity IDs (2 minuty)
2. ✅ Nasaď na web
3. ⏳ Počkej 24-48h
4. 📊 Zkontroluj data:
   - GA4 → Engagement → Pages and screens
   - Clarity → Recordings → Filter by "Exit"
5. 🔍 Najdi problém:
   - Kde lidi odchází?
   - Proč neklikají na CTA?
6. 🛠️ Oprav stránku podle dat
7. 🔁 Testuj znovu

---

**🎯 TY DATA TI ŘEKNOU PŘESNĚ CO OPRAVIT!**

Místo hádání "co by mohlo být špatně" → uvidíš PŘESNĚ co je špatně! 💪

# 🎯 FLOWLANCE AUTOMATIZACE - FINÁLNÍ ŘEŠENÍ

## ✅ JAK TO FUNGUJE (SUPER JEDNODUŠE):

```
1. User zadá email na TVOJI stránku
   → Tvůj design ✅
              ↓
2. Zobrazí se TVOJE success stránka  
   → Tvůj design ✅
              ↓
3. Velké tlačítko: "🎁 CHCI MINI KURZ ZDARMA!"
              ↓
4. Redirect na Flowlance s předvyplněným emailem
   → URL: flowlance.cz/predprodej?email=xxx@xxx.cz
              ↓
5. Flowlance potvrdí email a spustí automatizaci
   → User dostane emaily automaticky ✅
```

---

## 🚀 SETUP (5 MINUT):

### **KROK 1: Vytvoř "Lead Free" produkt ve Flowlance**

1. Jdi na **Flowlance.cz**
2. Vytvoř nový produkt:
   - **Název:** "Podnikatelská čtvrtka - Předprodej + Mini kurz"
   - **Typ:** Lead Free (zdarma)
   - **Cena:** 0 Kč
3. Nastav **Email Optin** formulář
4. Zkopíruj **URL** této stránky (např. `https://flowlance.cz/predprodej-ctvrtka`)

---

### **KROK 2: Vlož URL do kódu**

1. **Otevři:** `/components/PrelaunchEmailCapture.tsx`
2. **Najdi řádek 11-16:**

```typescript
const FLOWLANCE_CONFIG = {
  enabled: true,
  url: '', // ← SEM VLOŽ FLOWLANCE URL!
  showSuccessFirst: true,
  successDelay: 0,
};
```

3. **Uprav na:**

```typescript
const FLOWLANCE_CONFIG = {
  enabled: true,
  url: 'https://flowlance.cz/predprodej-ctvrtka', // ← Tvoje Flowlance URL!
  showSuccessFirst: true,
  successDelay: 0,
};
```

4. **Ulož soubor!**

---

### **KROK 3: Nastav automatizaci ve Flowlance**

Ve Flowlance nastav email sekvenci:

#### **Email #1: Okamžitě po potvrzení**
- **Subject:** "🎉 Vítejte mezi průkopníky! Váš mini kurz je tady"
- **Content:**
  ```
  Ahoj [JMÉNO],
  
  Gratulujeme! Jste oficiální PRŮKOPNÍK české podnikatelské revoluce!
  
  🎁 VÁŠ MINI KURZ (3 DNY):
  👉 [ODKAZ NA MINI KURZ] 
  
  Co vás čeká:
  ✅ Den 1: Najděte svůj ideální segment
  ✅ Den 2: Testujte nejrychlejší win
  ✅ Den 3: Škálujte co funguje
  
  Hodnota: 2.999 Kč - Pro vás ZDARMA!
  
  Těšíme se,
  Tým Podnikatelská čtvrtka
  ```

#### **Email #2: +24 hodin**
- **Subject:** "📅 Hlavní kurz startuje [DATUM] - Průkopnická cena jen pro vás"
- **Content:**
  ```
  Už jste viděli mini kurz?
  
  Hlavní kurz "Podnikatelská čtvrtka" startuje: [DATUM]
  
  🎯 PRŮKOPNICKÁ CENA:
  Normálně: 12.999 Kč
  Pro průkopníky: 4.999 Kč
  
  💎 BONUS pro prvních 50:
  Konzultace ZDARMA (1.500 Kč)
  
  👉 [ODKAZ NA PŘEDOBJEDNÁVKU]
  ```

#### **Email #3: +48 hodin**
- **Subject:** "⏰ Průkopnická cena končí za 48 hodin!"
- **Content:**
  ```
  Poslední šance!
  
  Průkopnická cena 4.999 Kč končí za 48 hodin.
  
  Co získáte:
  ✅ Kompletní kurz Podnikatelská čtvrtka (8.499 Kč)
  ✅ 3-denní mini kurz (2.999 Kč) 
  ✅ Konzultace* (1.500 Kč)
  
  Celková hodnota: 12.998 Kč
  Vaše cena: 4.999 Kč
  
  Úspora: 7.999 Kč (62%)
  
  👉 [ODKAZ NA NÁKUP]
  
  *prvních 50 kupujících
  ```

---

## 🎨 CO VIDÍ USER:

### **1. Na tvé landing page:**
```
[Email input]
[Tlačítko: 🔥 CHCI BÝT PRŮKOPNÍK]
```

### **2. Po zadání emailu (TVŮJ DESIGN):**
```
✅ VÍTEJTE MEZI PRŮKOPNÍKY!

Gratulujeme! Právě jste se stali oficiálním PRŮKOPNÍKEM...

[Velké tlačítko: 🎁 CHCI MINI KURZ ZDARMA!]
```

### **3. Kliknutí na tlačítko:**
```
→ Redirect na Flowlance s předvyplněným emailem
```

### **4. Na Flowlance stránce:**
```
Email: xxx@xxx.cz ← PREFILLED!
[Tlačítko: Potvrdit a získat přístup]
```

### **5. Po potvrzení:**
```
→ Flowlance pošle Email #1 (okamžitě)
→ Spustí se celá automatizace
```

---

## 📊 URL PARAMETRY:

Předáváme Flowlance:

```
?email=user@example.com&ref=landing&spot=15
```

**Co to znamená:**
- `email` = předvyplněný email
- `ref=landing` = zdroj (tracking)
- `spot=15` = pořadové číslo průkopníka

---

## ✅ VÝHODY TOHOTO ŘEŠENÍ:

1. ✅ **Tvůj design** - user vidí tvou stránku co nejdéle
2. ✅ **Předvyplněný email** - user jen klikne "Potvrdit"
3. ✅ **Flowlance automatizace** - vše na autopilotu
4. ✅ **Tracking** - víš odkud user přišel
5. ✅ **Žádné API** - prostý redirect, funguje 100%

---

## 🔧 POKROČILÉ MOŽNOSTI:

### **Automatický redirect (bez potvrzení):**

Pokud Flowlance podporuje auto-confirm z URL parametru:

```typescript
successDelay: 2000, // Automatický redirect po 2 sekundách
```

### **Otevři v novém tabu:**

Místo `window.location.href` použij:
```typescript
window.open(flowlanceUrl, '_blank');
```

---

## 🆘 TROUBLESHOOTING:

### **Email se nepředvyplňuje?**
→ Zkontroluj že Flowlance podporuje `?email=` URL parametr

### **Tlačítko se nezobrazuje?**
→ Zkontroluj že `FLOWLANCE_CONFIG.enabled = true`

### **Chci otestovat bez Flowlance?**
→ Nastav `enabled: false` a testuj lokálně

---

## ✅ CHECKLIST PŘED SPUŠTĚNÍM:

- [ ] Flowlance "Lead Free" produkt vytvořený
- [ ] URL zkopírovaná do `FLOWLANCE_CONFIG.url`
- [ ] Email automatizace nastavená ve Flowlance
- [ ] Test: Zadej email → klikni tlačítko → ověř že redirect funguje
- [ ] Test: Email se předvyplní na Flowlance stránce
- [ ] Test: Po potvrzení přijde Email #1

---

## 🎉 HOTOVO!

Teď máš:
- ✅ Krásnou landing page (tvůj design)
- ✅ Email capture (tvůj design)
- ✅ Success screen (tvůj design)
- ✅ Automatizaci (Flowlance)
- ✅ Žádné ruční práce!

**Flowlance se stará o emaily, ty se staráš o marketing! 💪**

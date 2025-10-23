# 🧪 Order Page Testing Guide

**Datum:** 2025-01-23  
**Status:** ✅ READY TO TEST

---

## 📋 CO JSME OPRAVILI

### **5 dynamických změn při vypršení slevy:**

1. **Countdown badge v hero** (řádek 154)
   - ✅ Schová se když sleva vyprší
   - ✅ Zobrazí se jen když `!testMode && !isExpired`

2. **CTA button v hero** (řádek 189)
   - ✅ Se slevou: "Chci kurz nyní se slevou 40%"
   - ✅ Bez slevy: "Chci kurz nyní"

3. **Sticky floating CTA** (řádek 212)
   - ✅ Se slevou: "Objednat se slevou 40%" + countdown
   - ✅ Bez slevy: "Objednat kurz" + žádný countdown

4. **FAPI formulář** (řádky 869-891)
   - ✅ Se slevou: FAPI A (4.999 Kč) - ID: 47a3e4ff-233e-11eb-a0d2-0a74406df6c8
   - ✅ Bez slevy: FAPI B (8.499 Kč) - ID: 5d6ebf1c-95ca-4781-93d4-8d1052bea23e

5. **Text pod formulářem** (řádky 895-915)
   - ✅ Se slevou: "Platíš jednou 4.999,- Kč"
   - ✅ Bez slevy: "Platíš jednou 8.499,- Kč"

---

## 🧪 TEST 1: SLEVA AKTIVNÍ (FAPI A)

### **Jak testovat:**

```javascript
// 1. Otevři konzoli (F12)
// 2. Resetuj countdown
localStorage.removeItem('pvs_start_time');

// 3. Obnov stránku
window.location.reload();
```

### **Co by jsi měl vidět:**

#### **Hero sekce:**
- ✅ Oranžový badge: "Speciální nabídka končí za XX:XX:XX"
- ✅ CTA button: "Chci kurz nyní **se slevou 40%**"

#### **Sticky floating CTA:**
- ✅ Zobrazí se když scrolluješ dolů
- ✅ Text: "Objednat **se slevou 40%**"
- ✅ Malý countdown: "XX:XX:XX"

#### **Urgency box (před formulářem):**
- ✅ Velký **oranžovo-červený** box s countdownem
- ✅ Cena: ~~8.499 Kč~~ → **4.999 Kč** (-40%)
- ✅ "✅ Ušetříš 3.500 Kč"

#### **FAPI formulář:**
- ✅ Zobrazí se FAPI A formulář
- ✅ URL obsahuje: `id=47a3e4ff-233e-11eb-a0d2-0a74406df6c8`
- ✅ Cena v formuláři: **4.999 Kč** (bez DPH) / 6.049 Kč (s DPH)

#### **Text pod formulářem:**
- ✅ "Platíš jednou **4.999,- Kč**"
- ✅ "FO: 6.049,- Kč (s DPH) • Firma: 4.999,- Kč (bez DPH)"
- ✅ "Po vypršení se cena vrátí na 8.499,- Kč"

---

## 🧪 TEST 2: SLEVA VYPRŠELA (FAPI B)

### **Jak testovat:**

```javascript
// 1. Otevři konzoli (F12)
// 2. Simuluj vypršení (24h zpět)
const t = Date.now() - (24 * 60 * 60 * 1000);
localStorage.setItem('pvs_start_time', t.toString());

// 3. Obnov stránku
window.location.reload();
```

### **Co by jsi měl vidět:**

#### **Hero sekce:**
- ❌ **ŽÁDNÝ** oranžový countdown badge
- ✅ CTA button: "Chci kurz nyní" (BEZ zmínky o slevě!)

#### **Sticky floating CTA:**
- ✅ Zobrazí se když scrolluješ dolů
- ✅ Text: "Objednat kurz" (BEZ zmínky o slevě!)
- ❌ **ŽÁDNÝ** malý countdown

#### **Urgency box:**
- ✅ **ŠEDÝ BOX** se zobrazí místo oranžového!
- ✅ Text: "Běžná cena - Speciální sleva již vypršela"
- ✅ Cena: **8.499 Kč** (bez slevy, bez countdownu)

#### **FAPI formulář:**
- ✅ Zobrazí se FAPI B formulář
- ✅ URL obsahuje: `id=5d6ebf1c-95ca-4781-93d4-8d1052bea23e`
- ✅ Cena v formuláři: **8.499 Kč** (bez DPH) / 10.284 Kč (s DPH)

#### **Text pod formulářem:**
- ✅ "Platíš jednou **8.499,- Kč**"
- ✅ "FO: 10.284,- Kč (s DPH) • Firma: 8.499,- Kč (bez DPH)"
- ❌ **ŽÁDNÁ** zmínka o "po vypršení se cena vrátí..."

---

## 🧪 TEST 3: TEST MODE (?test=true)

### **Jak testovat:**

```
Jdi na URL:
/objednavka?test=true
```

### **Co by jsi měl vidět:**

#### **Hero sekce:**
- ✅ Modrý badge: "🧪 TEST MODE - Timer vypnutý"
- ✅ CTA button: "Chci kurz nyní **se slevou 40%**"

#### **Urgency box:**
- ✅ Zobrazí se (i kdyby sleva byla vypršelá)
- ✅ Countdown běží (ale neovlivňuje nic)
- ✅ Cena: **4.999 Kč** (-40%)

#### **FAPI formulář:**
- ✅ Zobrazí se FAPI A formulář (i kdyby sleva byla vypršelá)
- ✅ URL: `id=47a3e4ff-233e-11eb-a0d2-0a74406df6c8`

**DŮVOD:** Test mode je pro testování nákupního flow bez nutnosti resetovat countdown!

---

## 🔧 DALŠÍ TESTY

### **Test 4: Scroll behavior**

1. Načti `/objednavka`
2. Scrolluj pomalu dolů
3. ✅ Sticky CTA se **objeví** když hero zmizí z viewportu
4. Scrolluj k formuláři
5. ✅ Sticky CTA se **schová** když formulář je vidět

### **Test 5: CTA kliknutí**

1. Klikni na CTA v hero sekci
2. ✅ Stránka scrollne k formuláři (smooth)
3. ✅ Sticky CTA se **navždy schová** (i když scrolluješ zpět nahoru)

### **Test 6: FAPI webhook**

Po úspěšné platbě by měl webhook zavolat Resend:

**FAPI A (4.999 Kč):**
- ✅ Pošle EMAIL_MAIN_COURSE (přístup k hlavnímu kurzu)
- ✅ Pošle EMAIL_MINI_COURSE (bonus mini kurz) 🎁

**FAPI B (8.499 Kč):**
- ✅ Pošle EMAIL_MAIN_COURSE (přístup k hlavnímu kurzu)
- ❌ **NEPOŠLE** EMAIL_MINI_COURSE (bonus jen pro early birds!)

---

## 📊 COUNTDOWN TIMER SYSTÉM

### **Jak funguje:**

1. **První návštěva `/objednavka`:**
   ```javascript
   localStorage.setItem('pvs_start_time', Date.now());
   // Countdown začne běžet 24 hodin
   ```

2. **Opakovaná návštěva:**
   ```javascript
   const elapsed = Date.now() - startTime;
   const remaining = (24 * 60 * 60 * 1000) - elapsed;
   
   if (remaining <= 0) {
     // ❌ SLEVA VYPRŠELA → FAPI B
     setIsExpired(true);
   } else {
     // ✅ SLEVA PLATÍ → FAPI A
     setTimeLeft(remaining / 1000);
   }
   ```

3. **Test mode (`?test=true`):**
   ```javascript
   // Přeskočí timer úplně
   setIsExpired(false); // Vždy aktivní sleva
   setTimeLeft(24 * 60 * 60); // Zobrazí plný čas
   ```

---

## 🐛 MOŽNÉ PROBLÉMY

### **1. Countdown se nepřepíná**

**Řešení:**
```javascript
// Vymaž localStorage a obnov stránku
localStorage.removeItem('pvs_start_time');
window.location.reload();
```

### **2. FAPI formulář se nemění**

**Zkontroluj:**
- ✅ Otevři DevTools → Network tab
- ✅ Zkontroluj iframe src URL
- ✅ Měl by obsahovat správné Form ID

### **3. Webhook nefunguje**

**Zkontroluj FAPI admin:**
1. Jdi do FAPI → Formuláře → FAPI B
2. Najdi sekci "Webhooks"
3. Zkontroluj URL:
   ```
   https://podnikatelskactvrtka.netlify.app/.netlify/functions/fapi-webhook
   ```
4. Zkontroluj události:
   - ✅ `order.created`
   - ✅ `order.paid` ← **DŮLEŽITÉ!**

---

## ✅ CHECKLIST PŘED SPUŠTĚNÍM

- [ ] Test 1 úspěšný (sleva aktivní → FAPI A)
- [ ] Test 2 úspěšný (sleva vypršela → FAPI B)
- [ ] Test 3 úspěšný (test mode funguje)
- [ ] Webhook nastaven na FAPI B formulář
- [ ] Webhook testován (test purchase)
- [ ] Email sequence zkontrolována
- [ ] Mini kurz bonus chodí jen pro FAPI A
- [ ] Ceny na stránce se mění dynamicky
- [ ] Sticky CTA se chová správně

---

**Status:** ✅ READY TO TEST!  
**Poslední update:** 2025-01-23  
**Vytvořeno:** AI Assistant

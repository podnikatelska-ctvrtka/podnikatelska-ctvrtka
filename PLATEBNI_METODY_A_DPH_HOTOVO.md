# ✅ PLATEBNÍ METODY + DYNAMICKÉ CENY (S/BEZ DPH)!

## 🎯 CO BYLO UDĚLÁNO:

### **1. SELECTABLE PLATEBNÍ METODY** 💳

#### **PŘED:**
```
❌ Jen info ikony (dekorativní)
❌ User nemůže vybrat
❌ Všechny jen "ukázka co bude dostupné"
```

#### **PO:**
```
✅ 4 selectable cards:
   - 💳 Platební karta (Visa, Mastercard)
   - 🏦 Bankovní převod (Rychlý online převod)
   - 🍎 Apple Pay
   - 📱 Google Pay

✅ Click to select (jako FAPI!)
✅ Vizuálně zvýrazněná když vybraná
✅ Checkmark v rohu ✓
✅ Hover efekty
✅ Responzivní grid (2 sloupce na desktop, 1 na mobile)

✅ Validace:
   - Submit button DISABLED dokud nevybere
   - Toast error: "Vyberte prosím způsob platby"
   - Red warning text pod buttonem

✅ Předává se do FAPI:
   - URL param: payment_method=card/bank_transfer/apple_pay/google_pay
```

---

### **2. DYNAMICKÉ CENY (S/BEZ DPH)** 💰

#### **LOGIKA:**

```typescript
// Fyzická osoba (bez IČO):
priceWithoutVat = 4.999 Kč
VAT (21%) = 1.050 Kč
priceWithVat = 6.049 Kč
→ CELKEM: 6.049 Kč (včetně DPH)

// Firma (s IČO):
priceWithoutVat = 4.999 Kč
→ CELKEM: 4.999 Kč (bez DPH - firma odvede DPH sama)
```

---

#### **REAL-TIME UPDATE:**

```
✅ Toggle "Nakupuji na firmu" (checkbox)
✅ Cena se OKAMŽITĚ změní v price summary
✅ Submit button se aktualizuje s novou cenou
✅ Text pod cenou vysvětluje:
   - Fyzická osoba: "(včetně 21% DPH)"
   - Firma: "(bez DPH - firma odvede DPH sama)"
```

---

#### **PRICE SUMMARY - FYZICKÁ OSOBA:**

```
┌──────────────────────────────────────┐
│ Produkt: Podnikatelská Čtvrtka       │
│ Cena bez DPH: 4.999 Kč               │
│ DPH (21%): 1.050 Kč                  │
│ ─────────────────────────────────    │
│ Celkem k zaplacení: 6.049 Kč         │
│ (včetně 21% DPH)                     │
└──────────────────────────────────────┘
```

---

#### **PRICE SUMMARY - FIRMA:**

```
┌──────────────────────────────────────┐
│ Produkt: Podnikatelská Čtvrtka       │
│ Cena: 4.999 Kč                       │
│ ─────────────────────────────────    │
│ Celkem k zaplacení: 4.999 Kč         │
│ (bez DPH - firma odvede DPH sama)    │
└──────────────────────────────────────┘
```

---

### **3. UPDATED ORDER PAGE** 📄

```
PŘED:
"bez DPH"

PO:
"Fyzická osoba: 6.049 Kč (s DPH) • Firma: 4.999 Kč (bez DPH)"

→ Jasně vysvětlené pro obě skupiny!
```

---

## 🎨 UI/UX IMPROVEMENTS:

### **SELECTABLE CARDS:**

```css
/* Unselected */
border: 2px solid #E5E7EB (gray-200)
background: white
hover: border-blue-300

/* Selected */
border: 2px solid #3B82F6 (blue-500)
background: #EFF6FF (blue-50)
shadow: medium
checkmark: ✓ v pravém horním rohu
```

---

### **STRUKTURA KARTY:**

```
┌─────────────────────────────────┐
│  [Icon]  Platební karta      ✓  │
│          Visa, Mastercard        │
└─────────────────────────────────┘

Icon = barevný rounded background
Text = název + popisek
Checkmark = pouze když vybraná
```

---

### **RESPONSIVE:**

```
Desktop (md+):
├── Grid 2 columns
├── Cards vedle sebe
└── Kompaktní layout

Mobile:
├── Grid 1 column
├── Cards pod sebou
└── Full width cards
```

---

## 🧪 TESTOVÁNÍ:

### **TEST 1: Selectable Payment Methods**

```bash
# Spusť:
netlify dev

# Otevři:
http://localhost:8888/objednavka?bypass=true

# Scroll k platebním metodám

# Test:
1. ✅ Klikni na "Platební karta"
   → Border blue, background blue-50, checkmark ✓

2. ✅ Klikni na "Apple Pay"
   → Karta změní, Apple Pay je selected ✓

3. ✅ Zkus submit BEZ výběru metody
   → Button je disabled
   → Red warning: "Nejdřív vyber způsob platby výše"

4. ✅ Vyber metodu a submit
   → Toast error: "Vyberte prosím způsob platby" (pokud není vybraná)
   → Nebo redirect na FAPI (pokud je vybraná)
```

---

### **TEST 2: Dynamické ceny (Fyzická osoba)**

```bash
# Otevři stejnou stránku
http://localhost:8888/objednavka?bypass=true

# Default stav (fyzická osoba):

# Price Summary:
✅ "Cena bez DPH: 4.999 Kč"
✅ "DPH (21%): 1.050 Kč"
✅ "Celkem k zaplacení: 6.049 Kč"
✅ "(včetně 21% DPH)"

# Submit button:
✅ "Přejít k platbě (6.049 Kč)"
```

---

### **TEST 3: Dynamické ceny (Firma)**

```bash
# Na stejné stránce:

# Toggle checkbox:
☑ "Nakupuji na firmu (potřebuji fakturu s IČO/DIČ)"

# Price Summary OKAMŽITĚ změní:
✅ "Produkt: Podnikatelská Čtvrtka"
✅ "Cena: 4.999 Kč"
✅ "Celkem k zaplacení: 4.999 Kč"
✅ "(bez DPH - firma odvede DPH sama)"

# Submit button:
✅ "Přejít k platbě (4.999 Kč)"

# IČO/DIČ pole se zobrazí
✅ "Název firmy *"
✅ "IČO *"
✅ "DIČ (volitelné)"
```

---

### **TEST 4: Toggle mezi stavy**

```bash
# Přepínání:
☐ Fyzická osoba → ☑ Firma → ☐ Fyzická osoba

# Každé přepnutí:
✅ Cena se změní (6.049 ↔ 4.999)
✅ Text se změní ("včetně DPH" ↔ "bez DPH")
✅ Submit button cena se změní
✅ IČO pole se zobrazí/skryje
✅ Price breakdown se změní
```

---

## 📊 PRICE COMPARISON:

```
                    FYZICKÁ OSOBA    FIRMA
────────────────────────────────────────────
Base price (bez DPH)    4.999 Kč     4.999 Kč
DPH (21%)              +1.050 Kč         —
────────────────────────────────────────────
CELKEM K ZAPLACENÍ      6.049 Kč     4.999 Kč
                     (včetně DPH)   (bez DPH)

ROZDÍL: 1.050 Kč (= 21% DPH)
```

---

## 🎯 PROČ JE TO DŮLEŽITÉ:

### **1. LEGÁLNÍ POŽADAVEK:**

```
✅ Fyzická osoba MUSÍ platit cenu s DPH
✅ Firma platí bez DPH (odvede DPH sama do státního rozpočtu)
✅ Musel by ses vykázat DPH úřadu!

→ Správné účtování DPH! ✅
```

---

### **2. FAIR PRICING:**

```
FYZICKÁ OSOBA:
→ Vidí finální cenu co zaplatí (6.049 Kč)
→ Žádné skryté poplatky
→ Jasné: "včetně 21% DPH"

FIRMA:
→ Vidí cenu bez DPH (4.999 Kč)
→ Ví že DPH odvede sama
→ Jasné: "bez DPH - firma odvede DPH sama"

→ Transparentní pricing! ✅
```

---

### **3. LEPŠÍ UX:**

```
PŘED:
❌ "4.999 Kč bez DPH"
❌ Fyzická osoba: "Co to znamená? Kolik zaplatím?"
❌ Firma: "OK, ale musím přičíst DPH?"

PO:
✅ Fyzická osoba: "6.049 Kč včetně DPH" → JASNÉ!
✅ Firma: "4.999 Kč bez DPH - firma odvede sama" → JASNÉ!
✅ Real-time update při přepnutí
✅ Žádná konfuze! ✅
```

---

## 🔗 INTEGRACE S FAPI:

### **URL PARAMETRY:**

```typescript
// Základní data:
?id=47a3e4ff-233e-11eb-a0d2-0a74406df6c8
&email=jan@novak.cz
&first_name=Jan
&last_name=Novák

// Nové:
&payment_method=card                    // ← NOVÉ! ✅
&company_name=Moje%20firma%20s.r.o.
&ico=12345678
&dic=CZ12345678

→ FAPI může pre-select platební metodu! ✅
```

---

### **FAPI FLOW:**

```
1. User vyplní náš hezkej form ✅
2. Vybere platební metodu (card) ✅
3. Klikne "Přejít k platbě" ✅
4. Redirect na FAPI form ✅
5. FAPI form má pre-filled data + selected payment method ✅
6. User jen potvrdí a zaplatí ✅
7. Webhook → email → přístup! 🎉
```

---

## 🎨 VISUAL COMPARISON:

### **PŘED (info badges):**

```
┌────────────────────────────────────┐
│ 💳 Platební metody:                │
│                                    │
│ [💳 Platební karta]                │
│ [🏦 Bankovní převod]               │
│ [🍎 Apple Pay]                     │
│ [📱 Google Pay]                    │
│                                    │
│ Platba přes GoPay                  │
└────────────────────────────────────┘

→ Jen informace, ne selectable ❌
```

---

### **PO (selectable cards):**

```
┌────────────────────────────────────┐
│ 💳 Vyberte způsob platby: *        │
│                                    │
│ ┌──────────────┐ ┌──────────────┐ │
│ │ [💳] Karta ✓ │ │ [🏦] Převod  │ │
│ │ Visa, MC     │ │ Rychlý online│ │
│ └──────────────┘ └──────────────┘ │
│ ┌──────────────┐ ┌──────────────┐ │
│ │ [🍎] Apple   │ │ [📱] Google  │ │
│ │ Rychlá platba│ │ Rychlá platba│ │
│ └──────────────┘ └──────────────┘ │
│                                    │
│ 🔒 Platba přes GoPay               │
└────────────────────────────────────┘

→ Klikatelné karty s checkmarkem! ✅
```

---

## 📱 MOBILE RESPONSIVE:

```
Desktop:
┌────────────────────────────────────┐
│ [Card ✓]  [Transfer]               │
│ [Apple]   [Google]                 │
└────────────────────────────────────┘

Mobile:
┌────────────────────────────────────┐
│ [Card ✓]                           │
│                                    │
│ [Transfer]                         │
│                                    │
│ [Apple]                            │
│                                    │
│ [Google]                           │
└────────────────────────────────────┘

→ Full width cards, snadné klikání! ✅
```

---

## ✅ SUMMARY:

```
PLATEBNÍ METODY:
✅ 4 selectable cards (jako FAPI)
✅ Vizuální feedback (border, background, checkmark)
✅ Hover efekty
✅ Validace před submitem
✅ Disabled button dokud nevybere
✅ Red warning text
✅ Responzivní (2 cols → 1 col)

DYNAMICKÉ CENY:
✅ Fyzická osoba: 6.049 Kč (s DPH)
✅ Firma: 4.999 Kč (bez DPH)
✅ Real-time update při toggle
✅ Jasné vysvětlení textem
✅ Price breakdown (4.999 + 1.050 DPH)
✅ Aktualizace v submit buttonu

INTEGRACE:
✅ Payment method → FAPI URL param
✅ Firma data (IČO/DIČ) → FAPI
✅ Pre-filled form v FAPI
✅ Ready pro GoPay aktivaci!

UX:
✅ Jasné, transparentní pricing
✅ Žádná konfuze
✅ Fair pro obě skupiny
✅ Legálně správné (DPH)
```

---

## 🚀 READY TO TEST!

```bash
netlify dev

# Test všechno:
1. ✅ Selectable payment methods
2. ✅ Fyzická osoba cena (6.049 Kč)
3. ✅ Toggle na firmu (4.999 Kč)
4. ✅ Real-time price update
5. ✅ Disabled button validace
6. ✅ Responsive design
7. ✅ Submit → FAPI redirect

→ VŠECHNO BY MĚLO FUNGOVAT! 🎉
```

---

**Status:** ✅ Platební metody + DPH hotovo!  
**Payment methods:** 💳 Selectable cards (jako FAPI)  
**Dynamic pricing:** 💰 6.049 Kč (fyzická) / 4.999 Kč (firma)  
**Validace:** ✅ Must select payment method  
**Ready:** 🚀 Připraveno na testování!

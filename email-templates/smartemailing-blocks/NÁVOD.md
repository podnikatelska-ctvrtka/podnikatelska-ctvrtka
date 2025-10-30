# 📦 SMARTEMAILING BLOKY - NÁVOD

**Datum:** 2025-10-29  
**Účel:** Jak postavit pěkný email v SmartEmailing Magic Editor

---

## 🎯 JAK TO FUNGUJE

SmartEmailing **NECHCE CELÝ HTML** email - ale můžeš použít **HTML bloky** uvnitř Magic Editoru!

---

## 📋 POSTUP:

### **KROK 1: Vytvoř email v Magic Editor**

```
Kampaně → E-maily → Nový e-mail

✅ VYBER: "Magic Editor" (NE "HTML editor")
```

### **KROK 2: Struktura emailu**

V Magic Editoru přidej bloky v tomto pořadí:

```
1. HTML blok → HEADER (fialový gradient)
2. Text blok → "Ahoj {$name}! Díky za zájem..."
3. HTML blok → PRICE BOX (cenová tabulka)
4. HTML blok → CTA BUTTON (velké tlačítko)
5. HTML blok → URGENCY WARNING (červený box)
6. Text blok → "Co získáš:"
7. Bullet list blok → Features (Podnikatelská Čtvrtka, 3 moduly, atd.)
8. HTML blok → CTA BUTTON (druhé tlačítko)
9. Text blok → Podpis (S pozdravem, Tomáš)
```

---

## 🔧 JAK PŘIDAT HTML BLOK:

### **1. V levém sidebaru najdi "Obsah" nebo "Bloky"**

Měl bys vidět:
- Text
- Obrázek
- Tlačítko
- **HTML** ← tohle hledáš!
- Oddělovač
- atd.

### **2. Přetáhni "HTML" blok do emailu**

Drag & drop nebo klikni.

### **3. Dvakrát klikni na HTML blok**

Otevře se editor.

### **4. Vlož HTML kód z bloků**

Například pro HEADER vlož obsah z:
```
/email-templates/smartemailing-blocks/block-1-header.html
```

---

## 📦 BLOKY PRO EMAIL #1 (Sleva 40%)

### **BLOK 1: Header**
📄 Soubor: `block-1-header.html`

```html
<!-- Fialový gradient header -->
<table role="presentation"...>
  🎯 Sleva 40% čeká!
</table>
```

**Kde použít:** Úplně nahoře (první blok)

---

### **BLOK 2: Price Box**
📄 Soubor: `block-2-price-box.html`

```html
<!-- Cenová tabulka se slevou -->
<table role="presentation"...>
  💰 Sleva 40%
  ❌ 8.332 Kč → ✅ 4.999 Kč
</table>
```

**Kde použít:** Po úvodním textu

---

### **BLOK 3: CTA Button**
📄 Soubor: `block-3-cta-button.html`

```html
<!-- Velké CTA tlačítko -->
<table role="presentation"...>
  ✨ Ano, chci kurz se slevou 40%
</table>
```

**Kde použít:** Po price boxu (použij 2x v emailu)

---

### **BLOK 4: Urgency Warning**
📄 Soubor: `block-4-urgency-warning.html`

```html
<!-- Červený urgency box -->
<table role="presentation"...>
  ⏰ POZOR: Sleva vyprší za 24 hodin!
</table>
```

**Kde použít:** Po prvním CTA tlačítku

---

## 📝 TEXTOVÉ BLOKY (běžný text editor)

Pro běžný text použij **"Text" blok** v Magic Editoru:

### **Úvod:**
```
Ahoj {$name|default:""}!

Díky za zájem o Podnikatelskou Čtvrtku! 🚀

Tady je tvoje EXKLUZIVNÍ SLEVA:
```

### **Co získáš:**
```
🎯 Co získáš:

✅ Podnikatelská Čtvrtka (Business Model Canvas)
   • 3 moduly, 16 lekcí
   • Celý byznys na 1 listu papíru
   • FIT validátor
   • Úspěšné modely z praxe

🎁 BONUS: Mini kurz ZDARMA (hodnota 997 Kč)
   • Den 1: Zpětná vazba za 24h
   • Den 2: Rozbor konkurence
   • Den 3: Nabídka která prodává
```

### **Podpis:**
```
Těším se na tebe v kurzu!

S pozdravem,
Tomáš
Podnikatelská Čtvrtka

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

P.S. Sleva je automaticky aktivní na objednávce.
Stačí kliknout a objednat! 🚀

P.P.S. Nezapomeň: Platnost slevy končí za 24 hodin!
```

---

## 🎨 FINÁLNÍ STRUKTURA EMAILU #1:

```
┌──────────────────────────────────┐
│ HTML BLOK: Header (fialový)      │
├──────────────────────────────────┤
│ TEXT: Ahoj {$name}!              │
│       Díky za zájem...           │
├──────────────────────────────────┤
│ HTML BLOK: Price Box             │
├──────────────────────────────────┤
│ HTML BLOK: CTA Button            │
├──────────────────────────────────┤
│ HTML BLOK: Urgency Warning       │
├──────────────────────────────────┤
│ TEXT: Co získáš:                 │
│       • Features list            │
├──────────────────────────────────┤
│ HTML BLOK: CTA Button (druhý)    │
├──────────────────────────────────┤
│ TEXT: Podpis + P.S.              │
└──────────────────────────────────┘
```

---

## ⏱️ ČAS NA VYTVOŘENÍ:

- **EMAIL #1:** ~15 minut (první email trvá déle)
- **EMAIL #2:** ~10 minut (už znáš postup)
- **EMAIL #3:** ~10 minut

**CELKEM:** ~35 minut

---

## 🧪 TESTOVÁNÍ:

Po vytvoření emailu:

1. Klikni **"Náhled"** v SmartEmailing editoru
2. Zkontroluj že:
   - ✅ HTML bloky se zobrazují správně
   - ✅ Barvy jsou tam
   - ✅ Tlačítka fungují
   - ✅ Text je čitelný
3. Pošli **test email** sobě
4. Otevři na:
   - 📧 Gmail
   - 📧 Seznam.cz
   - 📱 Mobilu

---

## 🎯 OČEKÁVANÝ VÝSLEDEK:

Email bude vypadat **skoro stejně** jako čistý HTML, ale:
- ✅ Funguje v SmartEmailingu
- ✅ Lepší deliverability (CZ optimalizace)
- ✅ Snadnější úpravy (Magic Editor)

---

## 🚀 DALŠÍ KROKY:

1. ✅ Vytvoř EMAIL #1 podle tohoto návodu
2. ✅ Otestuj
3. ✅ Vytvoř EMAIL #2 (podobná struktura, jiné barvy)
4. ✅ Vytvoř EMAIL #3
5. ✅ Nastav automatizaci v SmartEmailingu

---

**STATUS:** ✅ Připraveno k použití  
**Čas:** ~35 minut na všechny 3 emaily  
**Vytvořeno:** 2025-10-29

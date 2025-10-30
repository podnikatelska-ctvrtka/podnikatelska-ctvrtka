# 🎯 SMARTEMAILING PERSONALIZACE

**Datum:** 2025-10-29  
**Status:** ✅ Připraveno

---

## 📝 JAK PŘIDAT JMÉNO DO EMAILU

V SmartEmailingu **NEJSOU** standardní placeholdery jako Mailchimp/Ecomail!

### ❌ NEFUNGUJE:
```html
Ahoj {$name}!
Ahoj {FIRSTNAME}!
Ahoj {NAME}!
```

---

## ✅ CO FUNGUJE:

### **ŘEŠENÍ 1: Bez personalizace (DOPORUČUJI)**

Prostě nepoužívej jméno:

```html
<p>Ahoj!</p>
<p>Díky za zájem o Podnikatelskou Čtvrtku! 🚀</p>
```

**Proč tohle:**
- ✅ Funguje vždy
- ✅ Žádné prázdné placeholdery
- ✅ Přátelský tón i bez jména
- ✅ V urgency emailech je to lepší (působí osobněji)

---

### **ŘEŠENÍ 2: Custom pole (POKUD OPRAVDU CHCEŠ JMÉNO)**

SmartEmailing používá **custom kontaktní pole**.

#### **1. Vytvoř custom pole v SmartEmailingu:**

```
Nastavení → Kontaktní pole → Nové pole

Název pole: "firstname"
Typ: Text
```

#### **2. V HTML použij:**

```html
<p>Ahoj<!--FIRSTNAME-->!</p>
```

**POZOR:** Syntaxe je **HTML komentář** `<!--NAZEV_POLE-->`!

#### **3. Import kontaktů s jménem:**

Když importuješ kontakty (nebo přes API), musíš poslat:
```json
{
  "emailaddress": "zakaznik@email.cz",
  "firstname": "Petr"
}
```

---

### **ŘEŠENÍ 3: Použij pole "name" (pokud ho máš)**

Pokud už máš v SmartEmailingu pole "name":

```html
<p>Ahoj<!--NAME-->!</p>
```

---

## 🎯 MÉ DOPORUČENÍ:

**NEPOUŽÍVEJ PERSONALIZACI!**

Proč:
1. ✅ **Jednodušší** - žádná konfigurace custom polí
2. ✅ **Spolehlivější** - žádné prázdné "Ahoj !"
3. ✅ **Přátelštější** - "Ahoj!" působí stejně osobně jako "Ahoj Petře!"
4. ✅ **Lepší pro urgency** - "Zbývá 4 hodiny!" je naléhavější než "Petře, zbývá 4 hodiny!"

---

## 📧 AKTUÁLNÍ STAV EMAILŮ:

### ✅ EMAIL #1 (Sleva 40%)
```html
<p>Ahoj!</p>
<p>Díky za zájem o Podnikatelskou Čtvrtku! 🚀</p>
```

### ✅ EMAIL #2 (Reminder 4h)
```html
<p>Ahoj!</p>
<p>Ještě zvažuješ? ⏰</p>
```

### ✅ EMAIL #3 (Mini kurz)
```html
<p>Ahoj!</p>
<p>Vrátil/a ses! 👋</p>
```

**→ Všechny fungují bez personalizace!**

---

## 🔍 JAK ZJISTIT SPRÁVNOU SYNTAXI:

Pokud OPRAVDU chceš personalizaci:

1. V SmartEmailingu jdi na **"Kampaně" → "Test email"**
2. Pošli testovací email
3. V editoru zkus různé syntaxe:
   - `<!--NAME-->`
   - `<!--FIRSTNAME-->`
   - `<!--EMAIL_NAME-->`
4. Podívej se co funguje

Nebo:
- Kontaktuj SmartEmailing podporu
- Zeptej se na **"syntaxi pro personalizaci v HTML emailech"**

---

## 💡 DALŠÍ TIPY:

### **Pokud děláš A/B test:**

Můžeš udělat 2 verze:
- **Verze A:** "Ahoj!" (bez jména)
- **Verze B:** "Ahoj Petře!" (s jménem)

A porovnat open rate / click rate.

**Tip:** Obvykle **není rozdíl** - zákazníka zajímá obsah, ne personalizace.

---

## 🚀 CO TEĎ:

1. ✅ Emaily jsou připravené **BEZ personalizace**
2. ✅ Fungují spolehlivě
3. ✅ Můžeš je nahrát do SmartEmailingu

**Jestli budeš chtít přidat jméno později, zkus <!--FIRSTNAME--> syntaxi!**

---

**STATUS:** ✅ Hotovo  
**Vytvořeno:** 2025-10-29

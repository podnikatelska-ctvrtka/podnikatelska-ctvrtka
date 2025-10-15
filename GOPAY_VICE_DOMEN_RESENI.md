# 🔥 GOPAY - JAK PŘIDAT PLATEBNÍ BRÁNU NA DALŠÍ PORTÁL

## 📖 CO ŘÍKÁ GOPAY HELP ČLÁNEK:

Z https://help.gopay.com/cs/tema/caste-dotazy-faqs/dotazy-k-platebni-brane/jak-pridam-platebni-branu-na-dalsi-portal

```
✅ MŮŽEŠ POUŽÍT STEJNÉ CREDENTIALS NA VÍCE DOMÉNÁCH!
✅ Není potřeba nový účet
✅ Není potřeba nové credentials

MUSÍŠ:
1. ✅ Přihlásit se do GoPay účtu
2. ✅ Jít do Integrace → Notifikační URL
3. ✅ PŘIDAT novou doménu do "Povolené domény" nebo "Notification URLs"
```

---

## 🎯 CO TO ZNAMENÁ PRO NÁS:

### **ŘEŠENÍ JE JEDNODUCHÝ!**

```
✅ MŮŽEŠ POUŽÍT STEJNÝ GOPAY ÚČET (GoID: 8519838725)
✅ MŮŽEŠ POUŽÍT STEJNÉ CREDENTIALS (Client ID + Secret)
✅ JEN MUSÍŠ PŘIDAT NOVOU DOMÉNU!

Kde:
GoPay → Integrace → Notification URL / Return URL
→ Přidej: https://podnikatelska-ctvrtka.netlify.app
→ Přidej: https://form.fapi.cz (pokud tam není)
```

---

## 📋 PŘESNÝ POSTUP:

### **KROK 1: GOPAY ACCOUNT - PŘIDAT DOMÉNY**

```
1. ✅ Přihlaš se: https://test.gopay.com
   GoID: 8519838725

2. ✅ Hlavní menu → "Integrace" (už tam jsi byl!)

3. ✅ Hledej sekce:
   
   A) "Notifikační URL" (Notification URL):
      → Přidej: https://form.fapi.cz/gopay-webhook
      → Přidej: https://podnikatelska-ctvrtka.netlify.app
   
   B) "Návratové URL" (Return URL):
      → Přidej: https://podnikatelska-ctvrtka.netlify.app/uspesna-platba
      → Přidej: https://form.fapi.cz/success
   
   C) "Povolené domény" (Allowed Origins):
      → Přidej: https://podnikatelska-ctvrtka.netlify.app
      → Přidej: https://form.fapi.cz
      → Nech tam: https://byznysuj.cz

4. ✅ Ulož všechny změny

5. ✅ Testuj!
```

---

### **KROK 2: FAPI - ZKONTROLOVAT NASTAVENÍ**

```
Credentials v FAPI ZŮSTÁVAJÍ STEJNÉ! ✅

FAPI → Platby → GoPay:
✅ Client ID: (stejný jako teď)
✅ Client Secret: (stejný jako teď)
✅ GoID: 8519838725 (stejný)
✅ Test mode: ON

→ NIC NEMĚŇ! Jen přidej domény v GoPay!
```

---

### **KROK 3: TEST**

```
1. ✅ Ulož změny v GoPay
2. ✅ Počkej 1-2 minuty (propagace)
3. ✅ Otevři: https://form.fapi.cz/?id=47a3e4ff-233e-11eb-a0d2-0a74406df6c8
4. ✅ Vyplň fake data (email + jméno)
5. ✅ Scroll dolů k platební sekci
6. ✅ MĚLY BY SE UKÁZAT VŠECHNY GOPAY METODY! 🎉
   ├── 💳 Platební karta
   ├── 🏦 Rychlý online převod
   ├── 🍎 Apple Pay
   └── 📱 Google Pay
```

---

## 🔍 CO HLEDAT V GOPAY INTEGRACE:

Z tvých screenshotů vidím že máš:

```
GoPay → Integrace:
✅ Client ID ✅
✅ Client Secret ✅
✅ GoID: 8519838725 ✅

ALE NEVIDÍM:
⚠️ Sekci "Notifikační URL" 
⚠️ Sekci "Návratové URL"
⚠️ Sekci "Povolené domény"
```

---

## 📸 KDE TO NAJÍT:

### **MOŽNOST 1: SCROLL DOLŮ**

```
Na stránce Integrace:
→ Máš nahoře Client ID, Secret, GoID ✅
→ SCROLL DOLŮ! ⬇️
→ Dole by měly být sekce:
   - Notification URL
   - Return URL
   - Allowed domains/origins
```

---

### **MOŽNOST 2: JINÁ ZÁLOŽKA**

```
GoPay menu:
→ Integrace → API Settings ✅
→ Integrace → Notification URLs ← ZKUS TOHLE!
→ Integrace → Return URLs ← NEBO TOHLE!
→ Nastavení → URLs ← NEBO TOHLE!
```

---

### **MOŽNOST 3: V NASTAVENÍ**

```
GoPay → Nastavení (menu)
→ Hledej:
   - "Domény" / "Domains"
   - "URLs"
   - "Webhooks"
   - "Notifications"
```

---

## 💡 CO KDYŽ TO NENAJDEŠ:

### **KONTAKTUJ GOPAY SUPPORT:**

```
☎️ Telefon: +420 228 224 267
📧 Email: podpora@gopay.cz

Řekni:
"Dobrý den,
mám testovací GoPay účet (GoID: 8519838725).
Potřebuji přidat novou doménu 
podnikatelska-ctvrtka.netlify.app
do povolených domén.

Kde v admin rozhraní to nastavím?
Nebo můžete přidat doménu za mě?"

→ Odpovědí do 5 minut telefonicky!
→ Nebo do 1 dne emailem!
```

---

## 🎯 PODLE GOPAY HELP:

```
CITACE:
"Pro přidání platební brány na další portál:
1. Přihlaste se do GoPay účtu
2. Přejděte do sekce Integrace
3. Přidejte novou doménu do seznamu povolených domén
4. Uložte změny
5. Credentials zůstávají stejné"

→ TAKŽE:
✅ Stejný účet ✅
✅ Stejné credentials ✅
✅ Jen přidat doménu ✅
```

---

## 📊 EXPECTED LOCATIONS:

### **V TEST.GOPAY.COM:**

```
Pravděpodobné umístění:

1. Integrace → (scroll dolů) → URLs
2. Integrace → API → URLs
3. Nastavení → Domény
4. Nastavení → Bezpečnost → Povolené domény
5. Účet → Integrace → Notification URLs
```

---

## 🧪 TESTING FLOW:

```
PŘED (teď):
FAPI form → GoPay sekce → Jen "bankovní převod (1-2 dny)" ❌

PO PŘIDÁNÍ DOMÉNY:
FAPI form → GoPay sekce:
├── 💳 Platební karta ✅
├── 🏦 Rychlý online převod ✅
├── 🍎 Apple Pay ✅
└── 📱 Google Pay ✅

→ 4-5 METOD MÍSTO 1! 🎉
```

---

## 🚀 POSTUP TEĎ:

### **AKCE 1: HLEDEJ V GOPAY**

```
1. ✅ test.gopay.com → přihlaš se
2. ✅ Integrace → scroll ÚPLNĚ DOLŮ ⬇️
3. ✅ Screenshot celé stránky (od shora až dolů)
4. ✅ Pošli mi screenshot

→ Společně najdeme kde přidat domény!
```

---

### **AKCE 2: ZKUS JINÉ MENU SEKCE**

```
V GoPay sidebar menu:
☐ Domů (zkus kliknout → možná submenu?)
☐ Úbty (zkus kliknout → možná tam jsou URLs?)
☐ Nastavení (zkus kliknout → možná Domény/URLs?)
☐ Integrace → jiné pod-sekce?

Screenshot každé sekce → pošli mi
```

---

### **AKCE 3: ZAVOLEJ GOPAY (NEJRYCHLEJŠÍ!)**

```
☎️ +420 228 224 267
Po-Pá: 8:00-17:00

"Ahoj, GoID: 8519838725,
potřebuju přidat doménu 
podnikatelska-ctvrtka.netlify.app
do povolených domén.
Kde to nastavím?"

→ Vyřešíš za 5 minut! ✅
```

---

## 💡 DOPORUČENÍ:

```
IMMEDIATE:
1. ✅ Scroll dolů v Integrace sekci
2. ✅ Screenshot celé stránky (shora dolů)
3. ✅ Pošli mi → najdeme to společně!

IF NOT FOUND:
4. ☎️ Zavolej GoPay support ráno
5. ✅ Nech je přidat doménu za tebe (2 minuty)

THEN:
6. ✅ Testuj FAPI form
7. ✅ Měly by se ukázat všechny metody!
8. ✅ FUNGUJE! 🎉
```

---

## 🎯 KLÍČOVÁ ZJIŠTĚNÍ:

```
✅ NENÍ potřeba nový GoPay účet
✅ NENÍ potřeba nové credentials
✅ JEN přidat doménu do "Povolených domén"

Credentials v FAPI:
✅ Client ID: stejný ✅
✅ Client Secret: stejný ✅
✅ GoID: 8519838725 ✅

→ FAPI NASTAVENÍ JE OK!
→ JEN GOPAY MUSÍ POVOLIT NOVOU DOMÉNU!
```

---

## 📞 DALŠÍ KROKY:

```
1. ✅ Screenshot: GoPay Integrace (celá stránka, scroll dolů)
2. ✅ Pošli mi
3. ✅ Najdeme sekci pro domény
4. ✅ Přidáme: podnikatelska-ctvrtka.netlify.app
5. ✅ Přidáme: form.fapi.cz
6. ✅ Uložíme
7. ✅ Testujeme
8. ✅ FUNGUJE! 🎉

TIME: 10-15 minut
```

---

**Status:** 🔍 Hledáme sekci pro povolené domény v GoPay  
**Action:** Screenshot GoPay Integrace (celá stránka)  
**Expected:** Najdeme kde přidat domény → přidáme → funguje!  
**Alternative:** Zavolat GoPay support (nejrychlejší!)

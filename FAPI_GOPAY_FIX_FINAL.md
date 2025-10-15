# 🔥 NAŠEL JSEM PROBLÉM! GOPAY NENÍ SPRÁVNĚ NASTAVENÝ!

## ⚠️ CO JSEM VIDĚL V OBRÁZKU:

```
❌ FAPI Produkt → Platby:
   - Platební brána: nějaký GoPay profil
   - Způsob platby: JEN "Běžná bankovní převod (1-2 dny)"

→ TO NENÍ GOPAY ONLINE PLATBA! ❌

GoPay online = karta + Apple Pay + Google Pay + okamžitý převod
Tohle = jen pomalý bankovní převod (1-2 dny)

→ PROTO SE NEUKAZUJÍ PLATEBNÍ METODY! 🎯
```

---

## ✅ ŘEŠENÍ - KROK ZA KROKEM:

### **KROK 1: JDI DO FAPI PLATEBNÍ PROPOJENÍ**

```
1. ✅ FAPI.cz → hlavní menu
2. ✅ Klikni na "Platby" (ikona peněz/karty)
3. ✅ Najdi sekci "Propojení aplikací" nebo "Payment gateways"
4. ✅ Najdi GoPay
5. ✅ Klikni na GoPay (upravit/nastavit)

→ POŠLI MI SCREENSHOT TEÉ STRÁNKY! 📸
```

---

### **KROK 2: CO HLEDAT V GOPAY NASTAVENÍ:**

V FAPI GoPay nastavení by mělo být:

```
☐ Test mode: ON ✅
☐ Client ID: (z GoPay Integrace)
☐ Client Secret: (z GoPay Integrace)
☐ GoID: 8519838725 ✅

☐ PLATEBNÍ METODY: ⭐ TOHLE JE KLÍČ!
   ☑️ Platební karta (online) ← MUSÍ BÝT!
   ☑️ Rychlý online převod ← MUSÍ BÝT!
   ☑️ Apple Pay ← MUSÍ BÝT!
   ☑️ Google Pay ← MUSÍ BÝT!
   ☐ Bankovní převod (1-2 dny) ← Tohle je optional

☐ Return URL / Success URL:
   https://podnikatelska-ctvrtka.netlify.app/uspesna-platba
   (nebo co FAPI používá)

☐ Notification URL / Webhook:
   (FAPI to spravuje automaticky)
```

---

### **KROK 3: POKUD TO TAM NENÍ:**

```
→ Vytvoř NOVÝ platební profil GoPay!

1. ✅ FAPI → Platby → Propojení aplikací
2. ✅ GoPay → "Přidat nový profil" nebo "+"
3. ✅ Název: "GoPay Online - Test"
4. ✅ Test mode: ON
5. ✅ Credentials:
   - Client ID: (zkopíruj z GoPay → Integrace)
   - Client Secret: (zkopíruj z GoPay → Integrace)
   - GoID: 8519838725
6. ✅ Platební metody - ZAŠKRTNI:
   ☑️ Platební karta
   ☑️ Rychlý online převod
   ☑️ Apple Pay
   ☑️ Google Pay
   ☐ Bankovní převod (volitelné)
7. ✅ Ulož
8. ✅ Test connection (pokud je tlačítko)
```

---

### **KROK 4: NASTAVIT V PRODUKTU:**

```
1. ✅ FAPI → Produkty → Podnikatelská Čtvrtka
2. ✅ Upravit → Platby
3. ✅ Platební brána: Vyber TEN NOVÝ profil "GoPay Online - Test"
4. ✅ Ulož
5. ✅ Testuj form:
   https://form.fapi.cz/?id=47a3e4ff-233e-11eb-a0d2-0a74406df6c8
```

---

## 🔗 ZMĚNIT URL PRODEJNÍHO MÍSTA:

```
V FAPI produktu vidím starou doménu:
❌ byznysuj.cz/objednavka

Změň na:
✅ https://podnikatelska-ctvrtka.netlify.app/objednavka

Kde:
1. ✅ FAPI → Produkty → Čtvrtka → Upravit
2. ✅ Najdi "URL prodejního místa" nebo "Sales URL"
3. ✅ Změň na: https://podnikatelska-ctvrtka.netlify.app/objednavka
4. ✅ Ulož
```

---

## 📸 POTŘEBUJU SCREENSHOTS:

### **SCREENSHOT 1: FAPI PLATBY - PROPOJENÍ**

```
1. ✅ FAPI → Platby (hlavní menu)
2. ✅ Screenshot celé stránky

Chci vidět:
- Seznam platebních bran (GoPay, stripe, etc)
- GoPay nastavení (pokud tam je)
- Platební profily
```

---

### **SCREENSHOT 2: FAPI GOPAY DETAIL**

```
1. ✅ FAPI → Platby → GoPay → Upravit/Detail
2. ✅ Screenshot celého nastavení

Chci vidět:
- Credentials (Client ID, Secret, GoID)
- Platební metody (checkboxy)
- URLs (return, notification)
- Test mode ON/OFF
```

---

## 🎯 PRAVDĚPODOBNÝ PROBLÉM:

### **TEORIE 1: ŠPATNÝ PROFIL** ⭐ (NEJPRAVDĚPODOBNĚJŠÍ)

```
❌ V produktu je vybraný profil pro "bankovní převody"
❌ Místo profilu pro "GoPay online platby"

Fix:
→ Vytvoř nový profil s online platbami
→ Nastav ho v produktu
```

---

### **TEORIE 2: PROFIL BEZ PAYMENT METHODS**

```
❌ GoPay profil existuje, ale nemá zaškrtnuté payment methods

Fix:
→ Edituj profil
→ Zaškrtni všechny metody (karta, Apple Pay, Google Pay)
→ Ulož
```

---

### **TEORIE 3: FAPI FORMÁT**

```
❌ FAPI má 2 typy GoPay integrací:
   1. GoPay standardní (jen převody)
   2. GoPay payment gate (online platby)

Fix:
→ Použij "GoPay payment gate" nebo podobný
→ Ne jen "GoPay"
```

---

## 🔍 JAK ZJISTIT:

```
FAPI → Platby → Propojení aplikací:

Hledej:
1. "GoPay" (možná jen převody)
2. "GoPay Payment Gate" (online platby)
3. "GoPay Online" (online platby)
4. Nebo jen "GoPay" s různými profily

→ Potřebujeme profil s ONLINE platbami!
```

---

## 📋 CHECKLIST:

```
☐ FAPI → Platby → Propojení aplikací (screenshot)
☐ Najít/vytvořit GoPay profil s online platbami
☐ Zaškrtnout payment methods:
   ☑️ Platební karta
   ☑️ Rychlý online převod
   ☑️ Apple Pay
   ☑️ Google Pay
☐ Test connection
☐ FAPI → Produkt → Platby → Změnit profil na nový
☐ Změnit URL prodejního místa na novou doménu
☐ Ulož
☐ Testuj form
```

---

## 🚀 POSTUP TEĎ:

```
1. ✅ FAPI → Platby (hlavní menu)
2. ✅ Screenshot celé stránky → pošli mi
3. ✅ Hledej GoPay sekci
4. ✅ Screenshot GoPay nastavení → pošli mi

→ PAK TI ŘEKNU PŘESNĚ CO UDĚLAT! 🎯
```

---

## 💡 ALTERNATIVA: GOPAY MENU V GOPAY ACCOUNTU

Vidím že GoPay má menu sekce:
- Domů ✅
- Povolení administrátora
- Úbty (nebo "Platby"?) ← ZKUS KLIKNOUT!
- Ceník
- Integrace ✅
- Nastavení

```
→ Klikni na "Úbty" nebo "Platby" sekci!
→ Možná tam najde�� payment methods nastavení!
→ Screenshot → pošli mi!
```

---

## 🎯 EXPECTED RESULT:

```
PO OPRAVĚ:

FAPI form:
├── Zadej email a jméno
├── Scroll dolů k platbě
└── GoPay sekce:
    ├── 💳 Platební karta ✅
    ├── 🏦 Rychlý online převod ✅
    ├── 🍎 Apple Pay ✅
    ├── 📱 Google Pay ✅
    └── (Bankovní převod 1-2 dny - volitelně)

→ 4-5 METOD MÍSTO 1! 🎉
```

---

## 📞 ACTION NOW:

```
1. ✅ FAPI → Platby → Screenshot
2. ✅ Najdi GoPay sekci → Screenshot  
3. ✅ GoPay → Úbty/Platby menu → Screenshot
4. ✅ Pošli mi všechny 3 screenshoty

→ SPOLEČNĚ TO VYŘEŠÍME! 💪
```

---

**Status:** 🔍 Našel jsem problém!  
**Problém:** GoPay profil nemá online payment methods  
**Fix:** Vytvořit/upravit profil s platební kartou + Apple/Google Pay  
**Time:** 10 minut po nalezení správné sekce

# 🔥 GOPAY - PŘIDAT NOVÝ OBCHOD (STEP-BY-STEP)

## ✅ CO NAŠEL JOSEF:

```
GoPay → Obchody → "Přidat nový obchod" ✅

→ MŮŽEŠ SI SÁM PŘIDAT NOVOU DOMÉNU!
→ ŽÁDNÝ EMAIL POTŘEBA!
→ 2 MINUTY HOTOVO! 🎉
```

---

## 📋 KROK ZA KROKEM:

### **KROK 1: VYPLŇ FORMULÁŘ**

```
1. ✅ "Adresa webové stránky":
   podnikatelskactvrtka.cz
   
   (BEZ https://, jen doména!)

2. ✅ "Webová stránka není veřejně dostupná":
   ☐ NEZAŠKRTÁVAT! (stránka JE veřejná)

3. ✅ "Očekávaný měsíční objem plateb":
   Dropdown - vyber:
   - "Do 50 000 Kč" (začínáš)
   - nebo "50 000 - 200 000 Kč" (pokud očekáváš víc)

4. ✅ Měny:
   ☑️ CZK (MUST!)
   ☐ EUR (optional, pro budoucnost)
   ☐ USD (optional)
   ☐ GBP (optional)
   ☐ PLN (optional)
   ☐ HUF (optional)
   ☐ BGN (optional)
   ☐ RON (optional)
   
   → Stačí jen CZK! Ostatní můžeš přidat později!

5. ✅ Klikni "Přidat obchod"
```

---

## 🎯 CO SE STANE:

### **VARIANTA A: NOVÉ GoID**

```
✅ GoPay vytvoří nový obchod
✅ Dostaneš nové GoID (např: 8519838726)
✅ Stejné Client ID + Secret (sdílené mezi obchody)

Pak v FAPI:
→ NIC NEMĚŇ! Stejné credentials fungují! ✅
→ FAPI automaticky použije správný obchod
```

---

### **VARIANTA B: PŘIDÁ DO STÁVAJÍCÍHO**

```
✅ GoPay přidá doménu k stávajícímu obchodu
✅ GoID zůstane stejné (8519838725)
✅ Credentials stejné

Pak v FAPI:
→ NIC NEDĚLÁŠ! Už to funguje! ✅
```

---

## 🧪 PO PŘIDÁNÍ OBCHODU:

### **ZKONTROLUJ:**

```
1. ✅ GoPay → Obchody → Seznam
   → Měl by tam být: podnikatelskactvrtka.cz ✅

2. ✅ Klikni na nový obchod
   → Zkontroluj GoID (může být stejné nebo nové)

3. ✅ Integrace sekce
   → Zkopíruj si:
      - Client ID (měl by být stejný)
      - Client Secret (měl by být stejný)
      - GoID (může být stejné nebo nové)
```

---

### **TESTUJ FAPI FORM:**

```
1. ✅ Počkej 2-3 minuty (propagace v GoPay)
2. ✅ Otevři: https://form.fapi.cz/?id=47a3e4ff-233e-11eb-a0d2-0a74406df6c8
3. ✅ Vyplň fake data (email + jméno)
4. ✅ Scroll dolů k platební sekci
5. ✅ MĚLY BY SE UKÁZAT VŠECHNY GOPAY METODY! 🎉
   ├── 💳 Platební karta
   ├── 🏦 Rychlý online převod
   ├── 🍎 Apple Pay
   └── 📱 Google Pay
```

---

## ⚠️ POKUD V FAPI STÁLE NEFUNGUJE:

### **MOŽNOST 1: AKTUALIZOVAT GoID V FAPI**

```
Pokud dostaneš NOVÉ GoID:

1. ✅ FAPI → Platby → Propojení aplikací → GoPay
2. ✅ Klikni "Upravit" nebo ikonu nastavení
3. ✅ Změň GoID na nové (pokud je jiné)
4. ✅ Client ID + Secret NECH STEJNÉ! ✅
5. ✅ Ulož
6. ✅ Test connection
7. ✅ Testuj znovu
```

---

### **MOŽNOST 2: ZKONTROLUJ PAYMENT METHODS**

```
V GoPay obchodu:

1. ✅ GoPay → Obchody → podnikatelskactvrtka.cz
2. ✅ Nastavení → Platební metody (nebo podobná sekce)
3. ✅ Aktivuj:
   ☑️ Platební karta
   ☑️ Rychlý online převod
   ☑️ Apple Pay
   ☑️ Google Pay
4. ✅ Ulož
5. ✅ Testuj znovu
```

---

## 📊 EXPECTED TIMELINE:

```
1. Vyplň formulář: 2 minuty ✅
2. GoPay vytvoří obchod: okamžitě ✅
3. Propagace: 2-3 minuty ✅
4. Test FAPI form: 1 minuta ✅
5. ✅ FUNGUJE! 🎉

→ CELKEM: 5-10 MINUT! ⚡
```

---

## 🎯 CHECKLIST:

```
☐ GoPay → Obchody → "Přidat nový obchod"
☐ Adresa: podnikatelskactvrtka.cz
☐ Objem: Do 50 000 Kč (nebo víc)
☐ Měny: ☑️ CZK
☐ Klikni "Přidat obchod"
☐ Počkej 2-3 minuty
☐ Testuj FAPI form
☐ Zkontroluj platební metody
☐ ✅ FUNGUJE!
```

---

## 💡 TIP:

```
Pokud dostaneš nové GoID:
→ Zapiš si ho!
→ Možná budeš muset aktualizovat v FAPI

Pokud GoID zůstane stejné:
→ NIC NEDĚLÁŠ! Už to funguje! ✅
```

---

## 📸 SCREENSHOT REQUEST:

Po přidání obchodu, pošli mi screenshot:

```
1. ✅ GoPay → Obchody → Seznam (vidím nový obchod?)
2. ✅ GoPay → Obchody → podnikatelskactvrtka.cz → Detail (GoID?)
3. ✅ FAPI form platební sekce (kolik metod se ukáže?)

→ Pak ti řeknu jestli je vše OK nebo co ještě upravit!
```

---

## 🚀 TESTOVACÍ FLOW:

### **LOKÁLNÍ TEST (po přidání obchodu):**

```
1. ✅ netlify dev
2. ✅ http://localhost:8888/objednavka
3. ✅ Vyplň hezkej form
4. ✅ Klikni "Přejít k platbě"
5. ✅ Redirect na FAPI form
6. ✅ FAPI form by měl ukázat všechny GoPay metody! ✅
7. ✅ Vyber metodu (např. karta)
8. ✅ Test payment (GoPay test card):
   Číslo: 4111 1111 1111 1111
   Exp: 12/25
   CVV: 123
9. ✅ Zaplatit
10. ✅ Webhook přijde
11. ✅ Email s přístupem! 🎉
```

---

## 🎯 EXPECTED RESULT:

```
PO PŘIDÁNÍ OBCHODU:

FAPI form → GoPay sekce:
├── 💳 Platební karta ✅
├── 🏦 Rychlý online převod ✅
├── 🍎 Apple Pay ✅
└── 📱 Google Pay ✅

→ 4-5 METOD MÍSTO 1! 🔥
```

---

## ⚠️ TROUBLESHOOTING:

### **PROBLÉM 1: Stále jen "bankovní převod"**

```
Fix:
1. ✅ GoPay → Obchody → podnikatelskactvrtka.cz
2. ✅ Nastavení → Platební metody
3. ✅ Aktivuj online platby (karta, Apple, Google)
4. ✅ Ulož
```

---

### **PROBLÉM 2: FAPI nevidí nový obchod**

```
Fix:
1. ✅ FAPI → Platby → GoPay → Upravit
2. ✅ Zkontroluj GoID (možná je nové?)
3. ✅ Zadej nové GoID (pokud je jiné)
4. ✅ Client ID + Secret NECH! ✅
5. ✅ Ulož + Test connection
```

---

### **PROBLÉM 3: Chyba při platbě**

```
Fix:
1. ✅ Vyčisti cache (Ctrl+Shift+Del)
2. ✅ Restartuj netlify dev
3. ✅ Testuj znovu
4. ✅ Koukni na Console (F12) pro errory
```

---

## 📞 POKUD STÁLE NEFUNGUJE:

```
Pak ano, kontaktuj GoPay:
☎️ +420 228 224 267
📧 podpora@gopay.cz

Řekni:
"Přidal jsem nový obchod podnikatelskactvrtka.cz,
ale platební metody se nezobrazují v FAPI.
GoID: [tvoje nové GoID]
Co mám zkontrolovat?"

→ Vyřešíš za 5 minut telefonicky!
```

---

## 🎉 SUCCESS CRITERIA:

```
✅ Nový obchod v GoPay: podnikatelskactvrtka.cz
✅ GoID: nové nebo stejné (both OK)
✅ FAPI form ukáže 4-5 platebních metod
✅ Test platba funguje (test card)
✅ Webhook přijde
✅ Email odešle

→ CELÝ SYSTÉM FUNGUJE! 🚀
```

---

**Status:** 🎯 Přidej obchod v GoPay TEĎ!  
**Action:** Vyplň formulář → Přidat obchod → Čekej 2-3 min → Test  
**Expected:** FAPI form ukáže všechny GoPay metody! ✅  
**Time:** 5-10 minut

# 🔍 DEBUG GOPAY + FAPI - PŘESNÝ POSTUP

## ✅ CO JSME ZJISTILI:

```
✅ GoPay Integrace je OK (ClientID, Secret, GoID)
✅ Test mode NEMÁ omezení domén (to je jen production)
✅ "Report a change" je jen pro změnu account info

→ PROBLÉM MUSÍ BÝT V FAPI NEBO GOPAY PAYMENT METHODS!
```

---

## 📸 POTŘEBUJU TYTO SCREENSHOTS:

### **1. FAPI PRODUKT NASTAVENÍ:**

```
1. ✅ Přihlaš se do FAPI
2. ✅ Produkty → Podnikatelská Čtvrtka (362812)
3. ✅ Klikni "Upravit" nebo ikonu nastavení
4. ✅ Jdi na záložku "Platby" / "Checkout" / "Payment"
5. ✅ Udělej screenshot CELÉ STRÁNKY

Co chci vidět:
- Platební brána (GoPay test?)
- Platební metody (checkboxy)
- Platební profil
- Jakékoli další nastavení
```

---

### **2. FAPI PLATEBNÍ PROFILY:**

```
1. ✅ FAPI → Platby (hlavní menu)
2. ✅ Najdi "Platební profily" nebo "Payment profiles"
3. ✅ Udělej screenshot seznamu profilů
4. ✅ Klikni na GoPay test profil (pokud existuje)
5. ✅ Udělaj screenshot CELÉHO nastavení

Co chci vidět:
- Které payment metody jsou aktivované
- Jaké má to nastavení (domény, URLs...)
- Test mode ON/OFF
```

---

### **3. GOPAY PAYMENT METHODS:**

```
1. ✅ GoPay test account (test.gopay.com)
2. ✅ Hlavní menu (sidebar vlevo)
3. ✅ Hledej sekci:
   - "Platby" nebo "Payments"
   - "Způsoby platby" nebo "Payment methods"
   - "Nastavení plateb" nebo "Payment settings"
4. ✅ Udělej screenshot

Možné umístění:
- GoPay → Domů → Způsoby platby
- GoPay → Nastavení → Platby
- GoPay → Úhty → Způsoby platby (možná "Úhty" v menu?)
- GoPay → Platby (v hlavním menu)
```

---

### **4. FAPI FORM PREVIEW:**

```
1. ✅ Otevři přímo FAPI form:
   https://form.fapi.cz/?id=47a3e4ff-233e-11eb-a0d2-0a74406df6c8

2. ✅ Scroll dolů k platební sekci
3. ✅ Udělej screenshot platebních metod

Co chci vidět:
- Kolik metod se zobrazuje (1? 2? 4?)
- Jaké metody (karta, převod, Apple, Google?)
- Jsou tam nějaké errory?
```

---

## 🧪 ZKUS TOTO V FAPI:

### **POSTUP 1: ZKONTROLUJ PRODUKT**

```
FAPI → Produkty → Podnikatelská Čtvrtka:

1. ✅ Základní info:
   - Název: Podnikatelská Čtvrtka ✅
   - Cena: 4.999 Kč ✅
   - Stav: Aktivní ✅

2. ✅ Záložka "Platby":
   Zkontroluj:
   ☐ Platební brána: GoPay test (ne jiná!)
   ☐ Povolit platbu kartou: ☑️
   ☐ Povolit bankovní převod: ☑️
   ☐ Povolit Apple Pay: ☑️
   ☐ Povolit Google Pay: ☑️
   
   Pokud některý není zaškrtlý → ZAŠKRTNI!
   
3. ✅ Ulož
4. ✅ Testuj znovu
```

---

### **POSTUP 2: VYTVOŘ NOVÝ PLATEBNÍ PROFIL**

```
Možná stávající GoPay profil je špatně nastavený.
Vytvoř nový:

1. ✅ FAPI → Platby → Platební profily
2. ✅ Tlačítko "Přidat nový profil" nebo "+"
3. ✅ Vyber GoPay
4. ✅ Název: "GoPay Test - Nový"
5. ✅ Test mode: ON
6. ✅ Client ID: (zkopíruj z Integrace)
7. ✅ Client Secret: (zkopíruj z Integrace)
8. ✅ GoID: 8519838725 (z obrázku)
9. ✅ Platební metody: ZAŠKRTNI VŠECHNY!
   ☑️ Platební karta
   ☑️ Bankovní převod
   ☑️ Apple Pay
   ☑️ Google Pay
10. ✅ Ulož
11. ✅ Test Connection (pokud je button)

PAK:
12. ✅ Produkty → Čtvrtka → Platby
13. ✅ Změň platební profil na tento nový
14. ✅ Ulož
15. ✅ Testuj!
```

---

## 🎯 MOŽNÉ PŘÍČINY:

### **1. FAPI PRODUCT NEMÁ AKTIVOVANÉ METODY**

```
❌ V produktu jsou aktivované jen některé metody
✅ Fix: FAPI → Produkt → Platby → Zaškrtni všechny
```

---

### **2. GOPAY PROFIL V FAPI JE ŠPATNÝ**

```
❌ Stávající GoPay profil nemá správné credentials
❌ Nebo nemá aktivované payment methods
✅ Fix: Vytvoř nový profil (Postup 2)
```

---

### **3. GOPAY TEST ACCOUNT - PAYMENT METHODS**

```
❌ V GoPay testu nejsou aktivované metody
✅ Fix: GoPay → Způsoby platby → Aktivuj všechny

(Ale pravděpodobně to není toto, protože v test mode 
jsou defaultně všechny aktivní)
```

---

### **4. FAPI FORM JE STARÝ**

```
❌ Form ID 63376 je starší verze
❌ Form UUID možná není správný
✅ Fix: Vytvoř nový FAPI form pro produkt
```

---

## 🚀 POSTUP TEĎ:

### **KROK 1: ZKONTROLUJ FAPI PRODUKT**

```
1. ✅ FAPI → Produkty → Čtvrtka → Upravit
2. ✅ Záložka "Platby"
3. ✅ Screenshot celé stránky
4. ✅ Pošli mi

→ Pak ti řeknu co změnit!
```

---

### **KROK 2: ZKONTROLUJ FAPI FORM PŘÍMO**

```
1. ✅ Otevři: https://form.fapi.cz/?id=47a3e4ff-233e-11eb-a0d2-0a74406df6c8
2. ✅ Vyplň email a jméno (fake data)
3. ✅ Scroll dolů k platební sekci
4. ✅ Co vidíš?
   - Kolik platebních metod?
   - Jsou tam všechny?
   - Nějaký error?
5. ✅ Screenshot
6. ✅ Pošli mi
```

---

### **KROK 3: GOPAY MENU EXPLORATION**

```
V GoPay test accountu (sidebar menu):

Zkus kliknout na každou sekci a řekni mi co tam je:
☐ Domů
☐ Povolení administrátora
☐ Domů (možná 2x?)
☐ Úbty (nebo "Úhrady"?)
☐ Platby (nebo "Payments"?)
☐ Ceník
☐ Integrace ✅ (už máme)
☐ Nastavení

Hledám sekci kde se dají aktivovat payment methods!
```

---

## 💡 ALTERNATIVE: DIRECT GOPAY INTEGRATION

Pokud FAPI nedokážeme nastavit, můžeme:

```
1. ✅ Použít GoPay API přímo
2. ✅ Netlify function: gopay-create-payment
3. ✅ Redirect na GoPay payment gateway
4. ✅ GoPay webhook → náš webhook
5. ✅ Email s přístupem

→ Ale preferuji to vyřešit přes FAPI! 
   (FAPI má payment handling built-in)
```

---

## 📞 POTŘEBUJU OD TEBE:

```
1. ✅ Screenshot: FAPI → Produkt → Platby (celá stránka)
2. ✅ Screenshot: FAPI → Platby → Platební profily (seznam)
3. ✅ Screenshot: FAPI form (platební sekce)
4. ✅ Info: Co vidíš v GoPay sidebar menu? (seznam sekcí)

→ S TÍMHLE TO VYŘEŠÍME! 🎯
```

---

## 🎬 QUICK TEST:

Než posíleš screenshots, zkus:

```
1. ✅ FAPI → Produkty → Čtvrtka
2. ✅ Najdi záložku "Platby" nebo "Checkout"
3. ✅ Zkontroluj že GoPay je vybraný
4. ✅ Zkontroluj že jsou zaškrtnuté všechny metody:
   ☑️ Karta
   ☑️ Převod
   ☑️ Apple Pay
   ☑️ Google Pay
5. ✅ Pokud ne → ZAŠKRTNI!
6. ✅ Ulož
7. ✅ Testuj form znovu:
   https://form.fapi.cz/?id=47a3e4ff-233e-11eb-a0d2-0a74406df6c8
```

**→ MOŽNÁ TO VYŘEŠÍ CELÝ PROBLÉM!** 🎉

---

**Status:** 🔍 Debugujeme  
**Next:** Pošli screenshots FAPI produktu nastavení  
**Expected:** Najdeme kde aktivovat payment methods!

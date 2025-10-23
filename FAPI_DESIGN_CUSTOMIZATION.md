# 🎨 FAPI Formulář - Úprava designu

## 📋 **SITUACE:**
- ✅ FAPI formulář funguje: `https://form.fapi.cz/?id=47a3e4ff-233e-11eb-a0d2-0a74406df6c8`
- ⚠️ Design je "hroznej" (default FAPI styl)
- 🎯 Chceš ho upravit aby vypadal líp

---

## 🎨 **JAK UPRAVIT DESIGN VE FAPI ADMIN:**

### **1. Přihlaš se do FAPI admin:**
1. Jdi na **https://admin.fapi.cz/**
2. Přihlaš se
3. Jdi na **Formuláře** → Najdi "Podnikatelská Čtvrtka"

---

### **2. Design settings:**

V editoru formuláře najdi sekci **"Design"** nebo **"Vzhled"**:

#### **A) Barvy:**
```
Primary color: #ea580c (oranžová)
Secondary color: #f59e0b (amber)
Background: #ffffff (bílá)
Text color: #111827 (tmavě šedá)
Button color: #ea580c (oranžová)
Button hover: #c2410c (tmavší oranžová)
```

#### **B) Typography:**
```
Font family: Inter, sans-serif
Heading size: 24px
Body size: 16px
Button size: 18px
```

#### **C) Spacing:**
```
Padding: 24px
Border radius: 12px
Input height: 48px
```

#### **D) Custom CSS (pokud FAPI podporuje):**
```css
/* Zaoblené inputy */
input, textarea, select {
  border-radius: 12px !important;
  border: 2px solid #e5e7eb !important;
  padding: 12px 16px !important;
  font-size: 16px !important;
}

/* Focus state */
input:focus, textarea:focus, select:focus {
  border-color: #ea580c !important;
  box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1) !important;
}

/* Submit button */
button[type="submit"] {
  background: linear-gradient(135deg, #ea580c 0%, #f59e0b 100%) !important;
  border: none !important;
  border-radius: 12px !important;
  padding: 16px 32px !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  color: white !important;
  box-shadow: 0 4px 14px rgba(234, 88, 12, 0.3) !important;
  transition: all 0.2s ease !important;
}

button[type="submit"]:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(234, 88, 12, 0.4) !important;
}

/* Labels */
label {
  font-weight: 600 !important;
  color: #374151 !important;
  margin-bottom: 8px !important;
}

/* Heading */
h1, h2 {
  color: #111827 !important;
  font-weight: 900 !important;
}

/* Remove default FAPI branding (pokud je to možné) */
.fapi-branding {
  display: none !important;
}
```

---

## 🚨 **ALTERNATIVA: Vlastní formulář + FAPI webhook**

Pokud FAPI nedovoluje dost customizace, můžeš:

### **Option 1: Použít náš hezkej `FapiCheckoutForm.tsx`**

Už máme hotový komponent s hezkým designem!

1. Vrátit se na `OrderPageFinal.tsx` (místo `OrderPageFapiEmbed`)
2. Používat `FapiCheckoutForm` který přesměruje na FAPI gateway

**Výhoda:**
- ✅ Tvůj hezkej design
- ✅ Kontrola nad UX
- ✅ Stejné FAPI funkce (webhook, platba, atd.)

**Jak na to:**

V `/App.tsx` změň zpět:
```tsx
// Show order page if URL has #objednavka
if (showOrderPage) {
  return (
    <>
      <CriticalCSS />
      <OrderPageFinal />  // ← Změň zpět z OrderPageFapiEmbed
      <Toaster position="top-right" />
    </>
  );
}
```

Hotovo! `OrderPageFinal.tsx` už používá `FapiCheckoutForm` s hezkým designem.

---

### **Option 2: Hybrid přístup**

1. Tvůj hezkej formulář na `/objednavka`
2. Uživatel vyplní data
3. Přesměrování na FAPI s pre-filled daty
4. FAPI zobrazí pouze platební metody (skip input fields)

**Výhoda:**
- ✅ Tvůj design pro inputs
- ✅ FAPI jen pro platbu
- ✅ Best of both worlds

---

## 💡 **MÉ DOPORUČENÍ:**

### **Scénář 1: FAPI dovoluje custom CSS**
→ Použij `OrderPageFapiEmbed` + custom CSS ve FAPI admin

### **Scénář 2: FAPI nedovoluje dost customizace**
→ Přepni zpět na `OrderPageFinal` s `FapiCheckoutForm` (náš hezkej design)

---

## 🔧 **PŘEPNUTÍ ZPĚT NA HEZKEJ FORMULÁŘ (1 minuta):**

### **1. Otevři `/App.tsx`:**

Najdi řádek ~365:
```tsx
if (showOrderPage) {
  return (
    <>
      <CriticalCSS />
      <OrderPageFapiEmbed />  // ← Tady
      <Toaster position="top-right" />
    </>
  );
}
```

Změň na:
```tsx
if (showOrderPage) {
  return (
    <>
      <CriticalCSS />
      <OrderPageFinal />  // ← Změněno!
      <Toaster position="top-right" />
    </>
  );
}
```

### **2. Hotovo!**

`OrderPageFinal` používá `FapiCheckoutForm` který má:
- ✅ Hezkej design (oranžová, zaoblené boxy)
- ✅ Trust badges
- ✅ Payment method ikony
- ✅ Responsive
- ✅ Přesměrování na FAPI gateway

---

## 📊 **POROVNÁNÍ:**

| Feature | OrderPageFapiEmbed (iframe) | OrderPageFinal (custom form) |
|---------|----------------------------|------------------------------|
| **Design** | ⚠️ FAPI default (basic) | ✅ Tvůj hezkej design |
| **Customizace** | ❌ Omezená (CSS pokud podporuje) | ✅ Plná kontrola |
| **Setup** | ✅ 2 minuty | ✅ Už hotovo |
| **Pre-fill data** | ⚠️ Složitější | ✅ Easy (query params) |
| **UX flow** | ⚠️ Uživatel vidí FAPI branding | ✅ Tvoje branding až do platby |
| **Platba** | ✅ FAPI gateway | ✅ FAPI gateway (stejné) |
| **Webhook** | ✅ Funguje | ✅ Funguje (stejný) |

---

## 🎯 **FLOW S `FapiCheckoutForm`:**

```
1. Uživatel jde na /objednavka
   → Vidí tvůj hezkej formulář (OrderPageFinal + FapiCheckoutForm)
   
2. Vyplní jméno, email, telefon
   → Tvůj design (oranžová, trust badges, atd.)
   
3. Vybere payment method
   → Ikony (karta, Apple Pay, Google Pay)
   
4. Klikne "Zaplatit 4.999,- Kč"
   → JavaScript přesměruje na FAPI:
   https://form.fapi.cz/?id=47a3e...&email=jan@email.cz&first_name=Jan&...
   
5. FAPI gateway
   → Zobrazí platební metody (GoPay)
   → Uživatel zaplatí
   
6. Webhook na Netlify
   → Vytvoří účet v Supabase
   → Pošle email
   
7. Redirect na /dekuji?token=XXX
   → Success screen
```

**Výhoda:** Uživatel vidí tvůj hezkej design až do momentu platby!

---

## 🚀 **QUICK FIX - POUŽIJ HEZKEJ FORMULÁŘ:**

```bash
# 1. Otevři App.tsx
# 2. Změň OrderPageFapiEmbed → OrderPageFinal (řádek ~365)
# 3. Ulož
# 4. Hotovo!
```

**Deploy:**
```bash
git add .
git commit -m "feat: switch to custom FAPI checkout form"
git push
```

---

## 🧪 **TESTOVÁNÍ:**

### **Test 1: Custom formulář (doporučeno)**
1. Změň App.tsx na `OrderPageFinal`
2. Jdi na `/objednavka`
3. Měl by vidět hezkej oranžový formulář
4. Vyplň a klikni "Zaplatit"
5. Měl by tě přesměrovat na FAPI s pre-filled daty

### **Test 2: FAPI iframe (pokud chceš zkusit custom CSS)**
1. Nech `OrderPageFapiEmbed` v App.tsx
2. Jdi do FAPI admin → Formulář → Design
3. Přidej custom CSS
4. Refresh `/objednavka`
5. Zkontroluj jestli se CSS aplikovalo

---

## ✅ **MÉ FINÁLNÍ DOPORUČENÍ:**

**→ POUŽIJ `OrderPageFinal` S `FapiCheckoutForm`!**

Proč?
- ✅ **Už to máš hotové!** Hezkej design, responsive, trust badges
- ✅ **Plná kontrola!** Můžeš měnit cokoliv
- ✅ **Better UX!** Uživatel zůstává na tvém designu déle
- ✅ **Stejný výsledek!** FAPI webhook funguje stejně

**Nevýhoda iframe:**
- ❌ Omezená customizace
- ❌ FAPI branding
- ❌ Horší UX (uživatel vidí cizí design)

---

## 📝 **TL;DR:**

**Scénář A: Chci rychlé řešení + plnou kontrolu**
→ Změň App.tsx na `OrderPageFinal` (už hotovo!)

**Scénář B: Chci zkoušet FAPI custom CSS**
→ Nech `OrderPageFapiEmbed` + přidej CSS ve FAPI admin

**Doporučení:** → **Scénář A** (jednodušší + lepší UX) ✅

---

**Dej vědět co chceš použít a můžem to nasadit!** 🚀

---

**Autor:** Josef Čipera  
**Verze:** 1.0  
**Datum:** 22. ledna 2025

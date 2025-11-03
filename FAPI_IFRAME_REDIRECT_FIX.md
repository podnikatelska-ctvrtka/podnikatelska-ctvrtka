# 🔧 FAPI IFRAME REDIRECT FIX

**Problém:** Po úspěšné platbě v FAPI iframe se stránka nezobrazí správně - zůstane prázdná obrazovka s textem "Váš podnikatelskactvrtka.cz odmítl připojení".

**Důvod:** Iframe nemůže provést full-page redirect kvůli browser security (cross-origin restrictions).

---

## ✅ ŘEŠENÍ #1: FAPI Success Redirect URL (DOPORUČENÉ)

### **1. Přihlaš se do FAPI Admin:**
```
https://admin.fapi.cz/
```

### **2. Najdi oba produkty:**
- **Product A:** Podnikatelská Čtvrtka - Early Bird (4.999 Kč)
- **Product B:** Podnikatelská Čtvrtka - Plná cena (8.499 Kč)

### **3. Pro KAŽDÝ produkt:**

#### **a) Otevři produkt → Nastavení → Platby**

#### **b) Najdi sekci "Úspěšná platba"**

#### **c) Nastav "Success URL" (Redirect po úspěšné platbě):**
```
https://podnikatelskactvrtka.cz/dekuji
```

#### **d) Nastav "Failure URL" (Redirect po neúspěšné platbě):**
```
https://podnikatelskactvrtka.cz/objednavka?error=payment_failed
```

#### **e) DŮLEŽITÉ: Zapni "Allow iframe redirect"**
Pokud FAPI má tuto možnost, musíš ji zapnout aby iframe mohl redirectnout parent window.

### **4. Ulož změny**

### **5. Otestuj:**
```
1. Jdi na /objednavka
2. Vyplň FAPI formulář
3. Zadej test kartu:
   Číslo: 4111 1111 1111 1111
   CVV: 123
   Platnost: 12/25
4. Potvrď platbu v GoPay
5. Měl by se zobrazit /dekuji (nebo redirect z webhooku na /kurz?token=xxx)
```

---

## ✅ ŘEŠENÍ #2: Sandbox Atribut (IMPLEMENTOVÁNO)

**Už je hotové!** ✅

Přidal jsem do všech iframe `sandbox` atribut:
```tsx
sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-top-navigation-by-user-activation allow-payment"
```

To umožňuje iframe:
- ✅ Spustit scripty (allow-scripts)
- ✅ Odeslat formulář (allow-forms)
- ✅ Otevřít platební popup (allow-popups)
- ✅ Redirectnout parent window (allow-top-navigation)
- ✅ Provést platbu (allow-payment)

---

## ✅ ŘEŠENÍ #3: Window Message Listener (BACKUP)

**Už je hotové!** ✅

Přidal jsem event listener který poslouchá na FAPI messages:
```tsx
window.addEventListener('message', (event) => {
  if (event.origin === 'https://form.fapi.cz') {
    if (event.data.type === 'payment_success') {
      window.location.href = '/dekuji';
    }
  }
});
```

**Ale:** FAPI možná tyto message eventy neposílá! Proto je řešení #1 (Success URL) nejdůležitější.

---

## 🧪 JAK TESTOVAT:

### **Test 1: Lokálně (bez platby)**
```bash
npm run dev
# Otevři http://localhost:5173/objednavka
# Zkontroluj že iframe se načte
```

### **Test 2: Na produkci (s platbou)**
```bash
# Po deploy:
https://podnikatelskactvrtka.cz/objednavka

# Použij test kartu:
Číslo: 4111 1111 1111 1111
CVV: 123
Platnost: 12/25
3D Secure: 1234

# Po platbě by mělo redirectnout na /dekuji
```

### **Test 3: Zkontroluj Console:**
```javascript
// Otevři Developer Tools (F12) → Console
// Měl bys vidět:
"📧 FAPI Message received: ..."
"✅ FAPI: Platba úspěšná! Redirecting..."
```

---

## 🔍 DEBUGGING:

### **Pokud redirect STÁLE nefunguje:**

#### **1. Zkontroluj Console Errors:**
```
F12 → Console
Hledej:
- "X-Frame-Options deny"
- "Content-Security-Policy"
- "Refused to display ... in a frame"
```

#### **2. Zkontroluj Network Tab:**
```
F12 → Network
Filtr: XHR
Hledej:
- FAPI API calls
- GoPay redirect
- Success/failure responses
```

#### **3. Zkontroluj FAPI Webhook:**
```
Netlify → Functions → fapi-webhook → Logs
Měl bys vidět:
✅ "Invoice fetched successfully"
✅ "Customer: { email, name, amount }"
✅ "Email sent!"
```

#### **4. Kontaktuj FAPI Support:**
Pokud žádné řešení nefunguje:
```
support@fapi.cz

Otázka:
"Dobrý den, mám iframe embed vašeho formuláře a po úspěšné platbě se nezobrazí správně děkovná stránka. 
Jak správně nastavit Success Redirect URL aby fungovalo v iframe? 
Máte možnost 'Allow iframe redirect' nebo podobnou?
Děkuji!"
```

---

## 🎯 ALTERNATIVA: Přímý Link (Fallback)

Pokud iframe VŮBEC nefunguje, použij přímý link:

### **V OrderPageFinal.tsx změň:**
```tsx
// MÍSTO iframe:
<iframe src="https://form.fapi.cz/?id=XXX" />

// POUŽIJ link:
<a 
  href="https://form.fapi.cz/?id=47a3e4ff-233e-11eb-a0d2-0a74406df6c8"
  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
>
  POKRAČOVAT NA OBJEDNÁVKU →
</a>
```

**Výhody:**
- ✅ Vždy funguje
- ✅ Žádné iframe problémy
- ✅ Lepší na mobilu

**Nevýhody:**
- ❌ Uživatel opouští tvou doménu
- ❌ Vypadá to méně profesionálně

---

## 📊 SOUČASNÝ STAV:

```
✅ Iframe má sandbox atribut (allow-top-navigation)
✅ Message listener přidán (backup)
⏳ FAPI Success URL musíš nastavit v admin
```

---

## 🚀 ACTION ITEMS:

- [ ] Přihlaš se do FAPI admin
- [ ] Nastav Success URL na oba produkty: `/dekuji`
- [ ] Zapni "Allow iframe redirect" (pokud existuje)
- [ ] Otestuj platbu na produkci
- [ ] Zkontroluj že redirect funguje
- [ ] Zkontroluj že webhook vytváří token
- [ ] Zkontroluj že email přijde

---

**Vytvořeno:** 2025-01-25  
**Status:** ✅ Kód upraven, čeká se na FAPI admin nastavení

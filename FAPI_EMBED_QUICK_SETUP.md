# 🚀 FAPI Embed - Rychlý setup

## ✅ **CO JSEM UDĚLAL:**

1. ✅ Vytvořil `/components/OrderPageFapiEmbed.tsx` - jednoduchý wrapper pro FAPI iframe
2. ✅ Změnil `App.tsx` aby používal nový component
3. ✅ Přidal trust badges (zabezpečená platba, okamžitý přístup, záruka)

---

## 🔧 **CO MUSÍŠ UDĚLAT (2 minuty):**

### **1. Získej FAPI Form ID:**

1. Přihlaš se do **FAPI admin**
2. Jdi na **Formuláře**
3. Najdi svůj formulář "Podnikatelská Čtvrtka"
4. Zkopíruj **Form ID** z URL

Form ID vypadá jako:
```
47a3e4ff-233e-11eb-a0d2-0a74406df6c8
```

---

### **2. Aktualizuj Form ID v kódu:**

Otevři `/components/OrderPageFapiEmbed.tsx` a najdi řádek **77**:

```tsx
<iframe 
  src="https://form.fapi.cz/?id=47a3e4ff-233e-11eb-a0d2-0a74406df6c8"
  ...
/>
```

Změň na tvůj Form ID:
```tsx
<iframe 
  src="https://form.fapi.cz/?id=TVUJ_FORM_ID_ZDE"
  ...
/>
```

---

### **3. (Volitelné) Nastav výšku iframe:**

Pokud formulář je delší/kratší, změň `height`:

```tsx
height="900"  // Změň na 700, 800, 1000, atd.
```

---

## 🧪 **TESTOVÁNÍ:**

### **1. Local test:**
```bash
npm run dev
# Jdi na http://localhost:5173/objednavka
```

### **2. Co by mělo fungovat:**
- ✅ Stránka `/objednavka` se načte
- ✅ Vidíš FAPI formulář v iframe
- ✅ Trust badges nahoře (zabezpečená platba, atd.)
- ✅ Legal links dole (obchodní podmínky, GDPR)

### **3. Testovací platba pro GoPay:**
1. Vyplň formulář na `/objednavka`
2. Klikni "Zaplatit"
3. FAPI tě přesměruje na platební bránu
4. Použij **testovací kartu** (pokud máš sandbox):
   ```
   Číslo: 4111 1111 1111 1111
   Expires: 12/25
   CVV: 123
   ```
5. Potvrď platbu
6. FAPI webhook by měl vytvořit účet v Supabase

---

## 📊 **STRUKTURA:**

```
/objednavka
├── Header (s názvem a back link)
├── Trust badges (3 boxy)
├── FAPI iframe embed ← TVÉ FAPI FORMULÁŘ
├── Info text (lifetime přístup)
└── Footer (legal links)
```

---

## 🎯 **CO FAPI FORMULÁŘ OBSAHUJE:**

FAPI formulář už má všechno:
- ✅ Input fields (jméno, email, telefon)
- ✅ Firma toggle (IČO, DIČ)
- ✅ Payment options (karta, Apple Pay, Google Pay, převod)
- ✅ GDPR checkbox
- ✅ Cena (4.999,- Kč nebo 8.499,- Kč podle toho jaký form použiješ)
- ✅ Submit tlačítko

**Nemusíš nic přidávat!** ✅

---

## 🔄 **FAPI WEBHOOK FLOW:**

```
1. Uživatel vyplní FAPI formulář
2. Klikne "Zaplatit"
3. FAPI přesměruje na GoPay bránu
4. Uživatel zaplatí
5. GoPay potvrdí platbu
6. FAPI pošle webhook na Netlify:
   /.netlify/functions/fapi-webhook
7. Webhook vytvoří účet v Supabase:
   - Email
   - Jméno
   - Access token
8. Webhook pošle email (Smartemailing)
9. Uživatel je přesměrován na /dekuji?token=XXX
```

---

## 🚨 **ALTERNATIVA: Přímý link místo iframe**

Pokud iframe nefunguje (některé browsery blokují), použij přímý link:

V `/components/OrderPageFapiEmbed.tsx` odkomentuj sekci na řádku **82-95**:

```tsx
{/* Alternativa: Přímý link pokud iframe nefunguje */}
<div className="text-center">
  <a 
    href="https://form.fapi.cz/?id=TVUJ_FORM_ID"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
  >
    Pokračovat na objednávku
    <svg>...</svg>
  </a>
</div>
```

A smaž iframe sekci.

---

## 💡 **PRO/CONS:**

### **✅ VÝHODY iframe embedu:**
- Uživatel zůstává na tvé doméně (`podnikatelskactvrtka.cz/objednavka`)
- Vypadá to profesionálněji
- Můžeš přidat vlastní branding okolo

### **⚠️ NEVÝHODY iframe embedu:**
- Některé browsery můžou blokovat iframe
- Scroll může být tricky na mobilu

### **✅ VÝHODY přímého linku:**
- Vždy funguje
- Rychlejší load
- Lepší na mobilu

### **⚠️ NEVÝHODY přímého linku:**
- Uživatel opouští tvou doménu
- Méně kontroly nad UX

---

## 🎯 **MÉ DOPORUČENÍ:**

**→ ZAČNI S IFRAME!** Pokud to nebude fungovat dobře, přepni na přímý link.

---

## 📝 **DVA FORMULÁŘE (LEVNÝ vs. DRAHÝ):**

Pokud máš 2 FAPI formuláře (sleva vs. plná cena):

### **Option 1: Dvě samostatné stránky**
- `/objednavka` → Form ID 1 (4.999,- Kč)
- `/objednavka-vyprsela` → Form ID 2 (8.499,- Kč)

Duplikuj `OrderPageFapiEmbed.tsx` → vytvoř `OrderPageFapiEmbedExpensive.tsx` s jiným Form ID.

### **Option 2: Conditional v App.tsx**
```tsx
if (showOrderPage) {
  const formId = timeLeft > 0 
    ? '47a3e4ff-233e-11eb-a0d2-0a74406df6c8' // Levný
    : 'NOVY_FORM_ID_DRAHY'; // Drahý
  
  return <OrderPageFapiEmbed formId={formId} />;
}
```

---

## ✅ **CHECKLIST:**

- [ ] Získán FAPI Form ID
- [ ] Form ID vložen do `OrderPageFapiEmbed.tsx` (řádek 77)
- [ ] Test na `localhost:5173/objednavka`
- [ ] Iframe se zobrazuje správně
- [ ] Formulář je vyplnitelný
- [ ] Test platba (sandbox)
- [ ] Webhook vytváří účty v Supabase
- [ ] Deploy na Netlify

---

## 🚀 **DEPLOY:**

```bash
git add .
git commit -m "feat: FAPI embed on /objednavka"
git push
```

Netlify automaticky nasadí! ✅

---

## 🎉 **HOTOVO!**

Stránka `/objednavka` je ready za **2 minuty**!

Just:
1. ✅ Změň Form ID v kódu
2. ✅ Deploy
3. ✅ Udělej testovací platbu
4. ✅ Profit! 🚀

---

**Autor:** Josef Čipera  
**Verze:** 1.0  
**Datum:** 22. ledna 2025

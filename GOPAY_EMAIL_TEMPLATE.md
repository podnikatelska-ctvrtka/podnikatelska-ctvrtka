# 📧 EMAIL PRO GOPAY SUPPORT

## ✅ KAM POSLAT:

```
Email: podpora@gopay.cz
Nebo: https://help.gopay.com/cs/contact
Předmět: Přidání nové domény k existujícímu GoPay účtu - GoID: 8519838725
```

---

## 📝 TEXT EMAILU (PŘIPRAVENÝ):

```
Dobrý den,

mám GoPay testovací účet (GoID: 8519838725) s propojenou doménou byznysuj.cz.

Nyní jsem vytvořil nový web na doméně:
https://podnikatelska-ctvrtka.netlify.app

Potřebuji využívat GoPay platby i na této nové doméně.

Jaký je postup?
1. Potřebuji nové credentials (Client ID, Client Secret) pro novou doménu?
2. Nebo můžete přidat novou doménu k existujícímu účtu?
3. Nebo je jiné řešení?

Platby integruji přes FAPI.cz a potřebuji zprovoznit následující platební metody:
- Platební karta (online)
- Rychlý online převod
- Apple Pay
- Google Pay

Doména byznysuj.cz zůstane aktivní, takže pokud jde přidat novou doménu k existujícímu účtu, bylo by to ideální.

Děkuji za rychlou odpověď!

S pozdravem,
Josef Čipera
+420 724 162 016
josef@iting.cz
```

---

## ⏱️ EXPECTED RESPONSE TIME:

```
GoPay Support obvykle odpovídá:
- Email: 1-2 pracovní dny
- Telefon: +420 228 224 267 (rychlejší!)

→ DOPORUČUJI ZAVOLAT! ☎️
```

---

## 🚀 MEZITÍM: WORKAROUND OPTIONS

Zatímco čekáš na GoPay:

### **OPTION 1: POUŽÍT STAROU DOMÉNU (NEJRYCHLEJŠÍ)** ⭐

Pokud máš ještě byznysuj.cz:

```
1. ✅ Nechat FAPI redirect na byznysuj.cz/objednavka
2. ✅ byznysuj.cz/objednavka redirect na FAPI form
3. ✅ Po platbě redirect zpět na podnikatelska-ctvrtka.netlify.app

Flow:
podnikatelska-ctvrtka.netlify.app/objednavka
→ Náš hezkej form
→ Redirect na: byznysuj.cz/gopay-redirect
→ byznysuj.cz/gopay-redirect redirect na FAPI form
→ GoPay platba (funguje, protože doména je byznysuj.cz)
→ Success redirect na: podnikatelska-ctvrtka.netlify.app/uspesna-platba

Potřebuješ:
- Vytvořit jednoduchou stránku na byznysuj.cz/gopay-redirect
- Ta jen dělá redirect na FAPI form
```

---

### **OPTION 2: POUŽÍT FAPI IFRAME MÍSTO REDIRECTU**

```
Změnit FapiCheckoutForm.tsx:

Místo:
window.location.href = fapiFormUrl;

Použít iframe:
<iframe 
  src="https://form.fapi.cz/?id=47a3e4ff..."
  style="width: 100%; height: 800px; border: none;"
/>

Výhoda:
- GoPay vidí že request jde z form.fapi.cz (ne z naší domény)
- Mělo by to fungovat i bez nových credentials

Nevýhoda:
- Místo redirectu zůstaneš na naší stránce
- Ale platba funguje!
```

---

### **OPTION 3: POČKAT NA GOPAY (NEJČISTŠÍ)**

```
1. ✅ Pošli email/zavolej GoPay
2. ✅ Dostaň nové credentials nebo přidání domény
3. ✅ Zadej do FAPI
4. ✅ Testuj
5. ✅ Funguje! 🎉

Time: 1-3 dny
```

---

## 💡 DOPORUČENÍ:

```
IMMEDIATE (dnes):
1. ✅ Zavolej GoPay support: +420 228 224 267
2. ✅ Řekni jim situaci (nová doména, potřebuješ credentials)
3. ✅ Zeptej se jestli můžou přidat doménu nebo potřebuješ nový účet

SHORT TERM (zatímco čekáš):
4. ✅ Implementuj Option 2 (iframe) jako dočasné řešení
5. ✅ Aspoň můžeš začít testovat platby

LONG TERM (až dostaneš credentials):
6. ✅ Zadej nové credentials do FAPI
7. ✅ Změň zpět na redirect (Option 1 původní)
8. ✅ Funguje perfektně! ✅
```

---

## 📞 GOPAY KONTAKT:

```
Telefon: +420 228 224 267
Email: podpora@gopay.cz
Web: https://help.gopay.com/cs/contact
Chat: https://www.gopay.com/cs (live chat)

Pracovní doba:
Po-Pá: 8:00 - 17:00

→ ZAVOLEJ RÁNO V 8:00! ☎️
```

---

## 🔧 IMPLEMENTACE OPTION 2 (IFRAME) - QUICK FIX

Chceš abych to implementoval teď?

```typescript
// FapiCheckoutForm.tsx:
// Místo redirectu zobrazíme iframe

const [showPaymentForm, setShowPaymentForm] = useState(false);

// Po submit:
setShowPaymentForm(true);

// Render:
{showPaymentForm ? (
  <div className="w-full">
    <iframe
      src={`https://form.fapi.cz/?id=47a3e4ff-233e-11eb-a0d2-0a74406df6c8&email=${formData.email}&first_name=${formData.firstName}...`}
      style={{ width: '100%', height: '800px', border: 'none' }}
      title="Platební formulář"
    />
  </div>
) : (
  // Náš hezkej form
)}
```

**Výhoda:** Funguje OKAMŽITĚ! Nemusíš čekat na GoPay!

---

## 🎯 SUMMARY:

```
PROBLÉM:
❌ GoPay má na tvrdo doménu byznysuj.cz
❌ Nová doména není povolená
❌ Proto se neukazují platební metody

ŘEŠENÍ:
1. ☎️ Zavolat GoPay (+420 228 224 267)
2. 📧 Nebo email (podpora@gopay.cz)
3. 🔧 Zatímco čekáš: iframe workaround

TIME:
- GoPay answer: 1-2 dny (telefon: okamžitě!)
- Iframe workaround: 10 minut (můžu to udělat teď!)
```

---

## 🚀 CO TEĎKA?

**OPTION A: ZAVOLEJ GOPAY TEĎ**
```
→ Telefon: +420 228 224 267
→ Řekni: "Potřebuju přidat novou doménu k GoPay účtu"
→ GoID: 8519838725
→ Nová doména: podnikatelska-ctvrtka.netlify.app
```

**OPTION B: IMPLEMENTUJ IFRAME (DOČASNÉ ŘEŠENÍ)**
```
→ Řekni mi a udělám to za 10 minut
→ Budeš moci testovat platby OKAMŽITĚ
→ Pak když dostaneš nové credentials, změníme zpět na redirect
```

---

**ŘEK MI CO CHCEŠ UDĚLAT! 💪**

Preferuju: **ZAVOLAT GOPAY RÁNO + IMPLEMENTOVAT IFRAME TEĎ**
→ Pak máš oboje covered!

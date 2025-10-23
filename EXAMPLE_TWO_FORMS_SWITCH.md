# 🔄 Příklad: Přepínání mezi 2 formuláři podle času

## 📋 **SCÉNÁŘ:**
- **Prvních 48 hodin:** Sleva 40% (4.999,- Kč) → `FapiCheckoutForm`
- **Po expiraci:** Plná cena (8.499,- Kč) → `FapiCheckoutFormExpensive`

---

## 🔧 **IMPLEMENTACE:**

### **1. Přidej import v `OrderPageFinal.tsx`:**

Na začátek souboru (cca řádek 5) přidej:

```tsx
import FapiCheckoutFormExpensive from './FapiCheckoutFormExpensive';
```

Takže budeš mít:
```tsx
import FapiCheckoutForm from './FapiCheckoutForm';
import FapiCheckoutFormExpensive from './FapiCheckoutFormExpensive';
```

---

### **2. Najdi checkout sekci (řádek ~744):**

Najdi tuhle část:
```tsx
<FapiCheckoutForm 
  productId="podnikatelska-ctvrtka"
  price={4999}
  productName="Online kurz Podnikatelská Čtvrtka"
/>
```

---

### **3. Změň na conditional render:**

Změň na:
```tsx
{/* Conditional checkout based on countdown */}
{!isExpired ? (
  // ⏰ SLEVA 40% - Prvních 48 hodin
  <>
    <FapiCheckoutForm 
      productId="podnikatelska-ctvrtka"
      price={4999}
      productName="Online kurz Podnikatelská Čtvrtka - Speciální nabídka"
    />
    
    {/* Dodatečné ujištění pod formulářem */}
    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
      <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '12px' }}>
        <strong>Platíš jednou 4.999,- Kč</strong>, máš lifetime přístup + všechny budoucí updaty zdarma
      </p>
      <p style={{ fontSize: '12px', color: '#6b7280' }}>
        FO: 6.049,- Kč (s DPH) • Firma: 4.999,- Kč (bez DPH) • Po vypršení se cena vrátí na 8.499,- Kč
      </p>
    </div>
  </>
) : (
  // 💰 PLNÁ CENA - Po expiraci (po 48 hodinách)
  <>
    <FapiCheckoutFormExpensive 
      productId="podnikatelska-ctvrtka"
      price={8499}
      productName="Online kurz Podnikatelská Čtvrtka"
    />
    
    {/* Dodatečné ujištění pod formulářem */}
    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
      <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '12px' }}>
        <strong>Platíš jednou 8.499,- Kč</strong>, máš lifetime přístup + všechny budoucí updaty zdarma
      </p>
      <p style={{ fontSize: '12px', color: '#6b7280' }}>
        FO: 10.284,- Kč (s DPH) • Firma: 8.499,- Kč (bez DPH) • Běžná cena bez slevy
      </p>
    </div>
  </>
)}
```

---

## 📊 **JAK TO FUNGUJE:**

### **Flow:**
```
1. První návštěva → localStorage uloží timestamp
2. Countdown běží 48 hodin
3. isExpired = false → zobrazí FapiCheckoutForm (4.999,- Kč)
4. Po 48 hodinách → isExpired = true
5. isExpired = true → zobrazí FapiCheckoutFormExpensive (8.499,- Kč)
```

### **Logika v `OrderPageFinal.tsx`:**
```tsx
// Line ~13
const [isExpired, setIsExpired] = useState(expired);

// Line ~37-40
if (remaining <= 0) {
  setIsExpired(true);
  setTimeLeft(0);
}
```

---

## 🎨 **VIZUÁLNÍ ROZDÍLY:**

### **Levný formulář (FapiCheckoutForm):**
- ✅ Oranžová barva (`border-orange-200`)
- ✅ Tlačítko: `from-orange-600 to-amber-600`
- ✅ Cena: `4.999,- Kč`
- ✅ Text: "Speciální nabídka"

### **Drahý formulář (FapiCheckoutFormExpensive):**
- ❌ Červená barva (`border-red-200`)
- ❌ Tlačítko: `from-red-600 to-orange-600`
- ❌ Cena: `8.499,- Kč`
- ⚠️ Warning box: "Speciální sleva vypršela!"
- ❌ Text: "Běžná cena"

---

## 🧪 **TESTOVÁNÍ:**

### **Test 1: Levný formulář (sleva):**
```bash
# 1. Otevři browser
# 2. Smaž localStorage (DevTools → Application → Local Storage → Clear)
# 3. Otevři /objednavka
# 4. Měl by se zobrazit FapiCheckoutForm (oranžový, 4.999,- Kč)
```

### **Test 2: Drahý formulář (plná cena):**
```bash
# Option A: Počkej 48 hodin 😅
# Option B: Manuálně změň localStorage timestamp:

# DevTools → Console:
localStorage.setItem('podnikatelska_ctvrtka_countdown_start', Date.now() - 50 * 60 * 60 * 1000);
# Refresh stránku
# Měl by se zobrazit FapiCheckoutFormExpensive (červený, 8.499,- Kč)
```

---

## 📝 **CELÝ KÓD SEKCE:**

```tsx
{/* Checkout formulář */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200"
>
  <div className="text-center mb-8">
    <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: '900', color: '#111827', marginBottom: '12px' }}>
      Zajisti si přístup teď
    </h2>
    <p style={{ fontSize: '16px', color: '#4b5563' }}>
      Vyplň objednávku a získej okamžitý přístup
    </p>
  </div>
  
  {/* Conditional checkout based on countdown */}
  {!isExpired ? (
    // ⏰ SLEVA 40% - Prvních 48 hodin
    <>
      <FapiCheckoutForm 
        productId="podnikatelska-ctvrtka"
        price={4999}
        productName="Online kurz Podnikatelská Čtvrtka - Speciální nabídka"
      />
      
      {/* Dodatečné ujištění pod formulářem */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '12px' }}>
          <strong>Platíš jednou 4.999,- Kč</strong>, máš lifetime přístup + všechny budoucí updaty zdarma
        </p>
        <p style={{ fontSize: '12px', color: '#6b7280' }}>
          FO: 6.049,- Kč (s DPH) • Firma: 4.999,- Kč (bez DPH) • Po vypršení se cena vrátí na 8.499,- Kč
        </p>
      </div>
    </>
  ) : (
    // 💰 PLNÁ CENA - Po expiraci (po 48 hodinách)
    <>
      <FapiCheckoutFormExpensive 
        productId="podnikatelska-ctvrtka"
        price={8499}
        productName="Online kurz Podnikatelská Čtvrtka"
      />
      
      {/* Dodatečné ujištění pod formulářem */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '12px' }}>
          <strong>Platíš jednou 8.499,- Kč</strong>, máš lifetime přístup + všechny budoucí updaty zdarma
        </p>
        <p style={{ fontSize: '12px', color: '#6b7280' }}>
          FO: 10.284,- Kč (s DPH) • Firma: 8.499,- Kč (bez DPH) • Běžná cena bez slevy
        </p>
      </div>
    </>
  )}
</motion.div>
```

---

## ✅ **CHECKLIST:**

- [ ] Import `FapiCheckoutFormExpensive` v `OrderPageFinal.tsx`
- [ ] Změn checkout sekci na conditional render
- [ ] Test levného formuláře (smaž localStorage)
- [ ] Test drahého formuláře (změň timestamp v localStorage)
- [ ] Zkontroluj vizuální rozdíly (oranžová vs. červená)
- [ ] Deploy!

---

## 💡 **ALTERNATIVA: Samostatné stránky**

Pokud nechceš podmínku v kódu, můžeš udělat:

**Option 1: Route based**
- `/objednavka` → vždy levný formulář
- `/objednavka-vyprsela` → vždy drahý formulář

**Option 2: Query param**
- `/objednavka?expired=true` → drahý formulář
- `/objednavka` → levný formulář

```tsx
const urlParams = new URLSearchParams(window.location.search);
const forceExpired = urlParams.get('expired') === 'true';

{(!isExpired && !forceExpired) ? (
  <FapiCheckoutForm ... />
) : (
  <FapiCheckoutFormExpensive ... />
)}
```

---

**Autor:** Josef Čipera  
**Verze:** 1.0  
**Datum:** 22. ledna 2025

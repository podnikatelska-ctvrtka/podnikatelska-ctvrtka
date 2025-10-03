# 🎯 VÍCE PRODUKTŮ VE FLOWLANCE - NÁVOD

## ✅ JAK TO FUNGUJE:

Když budeš mít více produktů ve Flowlance, můžeš jednoduše přiřadit zákazníky do správného produktu!

---

## 🚀 ŘEŠENÍ 1: RŮZNÉ LANDING PAGES (DOPORUČUJU!)

### **Máš 3 produkty:**
1. Podnikatelská čtvrtka - Předprodej
2. Podnikatelská čtvrtka - Pokročilý kurz
3. Konzultace 1:1

### **Udělej 3 landing pages:**
```
podnikatelska-ctvrtka.vercel.app → Produkt 1
pokrocily-kurz.vercel.app → Produkt 2
konzultace.vercel.app → Produkt 3
```

### **V kódu každé landing page změň:**

**Landing Page 1 (`/components/PrelaunchEmailCapture.tsx`):**
```typescript
const WEBHOOK_CONFIG = {
  enabled: true,
  url: 'https://hook.eu2.make.com/t4mtz2jjps6e2fgjoktqtotwgseuqmj2',
  productId: 'podnikatelska-ctvrtka-predprodej', // ← TOHLE!
};
```

**Landing Page 2:**
```typescript
productId: 'pokrocily-kurz', // ← JINÉ ID!
```

**Landing Page 3:**
```typescript
productId: 'konzultace-1-1', // ← JINÉ ID!
```

---

## 🔧 ŘEŠENÍ 2: JEDNA LANDING, VÍCE TLAČÍTEK

### **Na jedné landing page máš více CTA:**
```tsx
// Tlačítko pro Kurz A
<Button onClick={() => submitWithProduct('kurz-a')}>
  Chci Kurz A
</Button>

// Tlačítko pro Kurz B
<Button onClick={() => submitWithProduct('kurz-b')}>
  Chci Kurz B
</Button>
```

### **Upravíš handleSubmit:**
```typescript
const handleSubmit = async (productId: string) => {
  // ... validace emailu ...
  
  await fetch(WEBHOOK_CONFIG.url, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      productId: productId, // 'kurz-a' nebo 'kurz-b'
      // ...
    }),
  });
};
```

---

## 📊 CO SE POŠLE DO MAKE.COM:

### **Data z webhooku:**
```json
{
  "email": "user@example.com",
  "timestamp": "2025-01-02T20:00:00Z",
  "source": "landing_page_prelaunch",
  "spotNumber": 15,
  "productId": "podnikatelska-ctvrtka-predprodej" ← TOHLE!
}
```

---

## 🎯 V MAKE.COM - ROUTING PODLE PRODUKTU:

### **SCÉNÁŘ A: Router modul** ⭐ **DOPORUČUJU!**

```
Webhook
   ↓
Router (podle productId)
   ↓
├─ productId = "kurz-a" → Email na Flowlance Produkt A
├─ productId = "kurz-b" → Email na Flowlance Produkt B
└─ productId = "kurz-c" → Email na Flowlance Produkt C
```

**Jak nastavit Router v Make.com:**

1. **Přidej modul "Router"** (po webhooku)
2. **Vytvoř 3 routes:**
   - Route 1: Condition: `productId = podnikatelska-ctvrtka-predprodej`
   - Route 2: Condition: `productId = pokrocily-kurz`
   - Route 3: Condition: `productId = konzultace-1-1`
3. **Za každou route přidej Email/HTTP modul** s odpovídajícím Flowlance produktem

---

### **SCÉNÁŘ B: Filter na každém modulu**

```
Webhook
   ↓
├─ Email → Flowlance A (Filter: productId = "kurz-a")
├─ Email → Flowlance B (Filter: productId = "kurz-b")
└─ Email → Flowlance C (Filter: productId = "kurz-c")
```

**Jak nastavit:**

1. **Přidej 3 paralelní Email moduly**
2. **Na každém nastav Filter:**
   - Email 1: Filter: `{{1.productId}}` = `podnikatelska-ctvrtka-predprodej`
   - Email 2: Filter: `{{1.productId}}` = `pokrocily-kurz`
   - Email 3: Filter: `{{1.productId}}` = `konzultace-1-1`

---

## 📧 CO NAPSAT FLOWLANCE (KDYŽ ODPOVĚDÍ):

Až Flowlance odpoví na tvůj email, řekni jim:

> "Díky! Budu mít později více produktů. Jak bych měl posílat leady do různých produktů?
> 
> Můžu v emailu/requestu specifikovat ID produktu?
> 
> Např. productId: 'kurz-a' → přidá do Produkt A
>      productId: 'kurz-b' → přidá do Produkt B"

**Oni ti řeknou jak to udělat! Pak to nastavíme v Make.com!**

---

## ✅ AKTUÁLNÍ STAV:

**V kódu JE UŽ PŘIPRAVENO:**
- ✅ `productId` se posílá do Make.com webhooku
- ✅ Můžeš ho snadno změnit v `WEBHOOK_CONFIG`
- ✅ Make.com dostává tuto informaci
- ✅ Připraveno na routing do více Flowlance produktů!

**Aktuální productId:**
```
'podnikatelska-ctvrtka-predprodej'
```

---

## 🎯 KDY TO ZMĚNIT:

### **Pro jiný produkt - změň v kódu:**

**Soubor:** `/components/PrelaunchEmailCapture.tsx`

**Řádek 13:**
```typescript
productId: 'NOVY-PRODUKT-ID', // ← ZMĚŇ TADY!
```

**A stejně v:** `/components/QuickEmailCaptureModal.tsx` (řádek 14)

---

## 🚀 PŘÍKLAD: Pokročilý kurz

**Chceš spustit novou landing pro pokročilý kurz:**

1. **Zkopíruj celý projekt** (nová složka)
2. **V kódu změň:**
   ```typescript
   productId: 'pokrocily-kurz',
   ```
3. **Deploy na Vercel** (nová URL: `pokrocily-kurz.vercel.app`)
4. **V Make.com přidej Router** který podle `productId` routuje do správného Flowlance produktu
5. **HOTOVO!** ✅

---

## 💡 TIP PRO BUDOUCNOST:

**Až budeš mít více produktů, můžeš:**

### **Option 1: Jedna Make.com scenario pro všechny**
```
Webhook (jeden pro všechny)
   ↓
Router (podle productId)
   ↓
Různé Flowlance produkty
```

### **Option 2: Více Make.com scenarios**
```
Landing A → Webhook A → Flowlance A
Landing B → Webhook B → Flowlance B
Landing C → Webhook C → Flowlance C
```

**Doporučuju Option 1** - jednodušší správa! ✅

---

## ✅ SHRNUTÍ:

**JE TO UŽ PŘIPRAVENÉ!**

1. ✅ Kód posílá `productId` do Make.com
2. ✅ Stačí změnit `productId` v kódu pro jiný produkt
3. ✅ V Make.com přidáš Router podle `productId`
4. ✅ Každý produkt jde do správného Flowlance optin listu

**Až budeš mít odpověď od Flowlance, nastavíme routing v Make.com! 🚀**

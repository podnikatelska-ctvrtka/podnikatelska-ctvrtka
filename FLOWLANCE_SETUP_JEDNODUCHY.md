# 🎯 FLOWLANCE SETUP - SUPER JEDNODUCHÝ NÁVOD

## ✅ CO POTŘEBUJEŠ:
- Make.com účet (zdarma) - **DOPORUČUJU!**
- NEBO Zapier účet (zdarma)
- 10 minut času

---

## 🚀 SETUP (KROK ZA KROKEM):

### **KROK 1: Vytvoř Make.com účet**

1. Jdi na **make.com**
2. Zaregistruj se (email + heslo)
3. Je to ZDARMA!

---

### **KROK 2: Vytvoř nový Scenario**

1. Klikni **"Create a new scenario"**
2. Pojmenuj ho: "Podnikatelská čtvrtka - Email capture"

---

### **KROK 3: Přidej Webhook**

1. Klikni na **velké "+"** (Add module)
2. Vyhledej **"Webhooks"**
3. Vyber **"Custom webhook"**
4. Klikni **"Add"** (vytvoř nový webhook)
5. Pojmenuj ho: "Landing page email"
6. **ZKOPÍRUJ URL!** (vypadá jako: `https://hook.eu1.make.com/abc123xyz`)
7. Klikni **"OK"**

---

### **KROK 4: Přidej Email akci**

1. Klikni na **"+"** za webhookem
2. Vyhledej **"Email"**
3. Vyber **"Send an Email"**
4. Nastav:
   - **To:** tvůj email (nebo Flowlance email kam chceš posílat leady)
   - **Subject:** `Nový lead - Podnikatelská čtvrtka`
   - **Content:**
   ```
   Nový registrovaný email!
   
   Email: {{1.email}}
   Čas: {{1.timestamp}}
   Spot: #{{1.spotNumber}}
   ```
5. Klikni **"OK"**

---

### **KROK 5: Ulož a aktivuj**

1. Klikni **"Save"** (vlevo dole)
2. Přepni **switch vpravo dole na ON** (scenario se aktivuje)
3. **HOTOVO!** ✅

---

### **KROK 6: Propoj s tvou landing page**

1. **Otevři soubor:** `/components/PrelaunchEmailCapture.tsx`
2. **Najdi řádek 11-14:**

```typescript
const WEBHOOK_CONFIG = {
  enabled: false, // ← ZMĚŇ NA true
  url: '', // ← SEM VLOŽ WEBHOOK URL Z MAKE.COM!
};
```

3. **Uprav na:**

```typescript
const WEBHOOK_CONFIG = {
  enabled: true,
  url: 'https://hook.eu1.make.com/ABC123XYZ', // ← Tvoje webhook URL z kroku 3!
};
```

4. **Ulož soubor!**

---

## ✅ OTESTUJ TO:

### **1. Build & Preview:**
```bash
npm run build
npm run preview
```

### **2. Otevři:** `http://localhost:4173/`

### **3. Zadej testovací email a klikni na tlačítko**

### **4. Zkontroluj:**
- ✅ V Make.com uvidíš nový záznam (v "History")
- ✅ Dostaneš email s lead info!

---

## 🎯 JAK TO FUNGUJE:

```
1. User zadá email na tvé stránce
              ↓
2. Stránka pošle data do Make.com webhooku
              ↓
3. Make.com pošle email na tvůj email
              ↓
4. Můžeš ručně přidat do Flowlance
   NEBO
   Nastavit automatické přidání (pokročilé)
```

---

## 🔥 POKROČILÉ: Automatické přidání do Flowlance

Pokud Flowlance má email kam posílat leady:

### **V Make.com:**

1. Místo "Send an Email" přidej druhý modul
2. Pošli email přímo na Flowlance email
3. NEBO pokud Flowlance má Zapier integraci, propoj přes Zapier modul

---

## 📊 CO VŠECHNO DOSTANEŠ V EMAILU:

```
Email: uzivatel@example.com
Čas: 2025-01-02T15:30:00Z
Spot: #15
```

---

## 🆘 TROUBLESHOOTING:

### **Email se neposílá?**
→ Zkontroluj že `WEBHOOK_CONFIG.enabled = true`

### **Make.com neregistruje data?**
→ Zkontroluj webhook URL (musí začínat `https://hook`)

### **Chci to testovat bez Make.com?**
→ Nastav `enabled: false` a funguje to normálně

---

## 💡 TIP:

Později můžeš ve Make.com přidat více akcí:
- Poslat do Google Sheets
- Poslat do Mailchimp
- Poslat do CRM
- Spustit další automatizace

---

## ✅ TO JE VŠECHNO!

Prostě:
1. Vytvoř Make.com účet
2. Zkopíruj webhook URL
3. Vlož do PrelaunchEmailCapture.tsx
4. HOTOVO! 🎉

**Máš otázky? Ptej se!**

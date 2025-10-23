# ✅ PRELAUNCH OPT-IN LOGIKA - OPRAVENO

**Datum:** 2025-01-23  
**Status:** ✅ HOTOVO

---

## 🐛 PROBLÉM

Když countdown vypršel (`isCampaignFull() === true`), opt-in modal zobrazoval:

❌ **ŠPATNĚ:**
- Button: "📝 ČEKACÍ LISTINA" ✅ (správně)
- Success screen: "🔥 VÍTEJTE MEZI PRŮKOPNÍKY!" ❌ (špatně!)
- Nabídka slevy 40% ❌ (špatně!)
- BONUS mini kurz ❌ (špatně!)

✅ **MĚLO BÝT:**
- Button: "📝 ČEKACÍ LISTINA" ✅
- Success screen: "📝 PŘIDÁNI NA ČEKACÍ LISTINU!" ✅
- Bez slevy, bez bonusu ✅
- Info že dáme vědět až bude další běh ✅

---

## ✅ ŘEŠENÍ

### **1. Trackování stavu waitlist**

```typescript
const [wasWaitlist, setWasWaitlist] = useState(false);

// V handleSubmit:
const isWaitlist = isCampaignFull();
setWasWaitlist(isWaitlist);
```

### **2. Dva různé success screeny**

**A) EARLY BIRD SUCCESS (když stihne):**
```
🔥 VÍTEJTE MEZI PRŮKOPNÍKY!
- Slevu 40% do emailu
- Link na objednávku
- BONUS: Mini kurz
```

**B) WAITLIST SUCCESS (když nestihne):**
```
📝 PŘIDÁNI NA ČEKACÍ LISTINU!
- Dáme vědět až spustíme další běh
- Budete mezi prvními
- Možná exkluzivní sleva
```

### **3. Dynamický opt-in modal**

**Když JE místo (`!isCampaignFull()`):**
```
Headline: "STAŇTE SE PRŮKOPNÍKEM!"
Subline: "Jen 50 míst v prvním běhu"
Cena: 4.999 Kč (normálně 8.499 Kč)
Benefits: + BONUS Mini kurz
Button: "🔥 CHCI SLEVU 40%"
```

**Když NENÍ místo (`isCampaignFull()`):**
```
Headline: "MÍSTA OBSAZENA"
Subline: "Přihlaste se na čekací listinu"
Cena: 8.499 Kč (běžná cena)
Benefits: BEZ bonusu
Button: "📝 ČEKACÍ LISTINA"
```

---

## 🎯 CO SE MĚNÍ KDYŽ JE PLNO

### **Headline sekce:**
```diff
- "STAŇTE SE PRŮKOPNÍKEM! Jen 50 míst"
+ "MÍSTA OBSAZENA - Přihlaste se na čekací listinu"
```

### **Subline:**
```diff
- "Získejte Čtvrtku se slevou 40%"
+ "Dáme vám vědět až spustíme další běh"
```

### **Benefits heading:**
```diff
- "PROČ BÝT PRŮKOPNÍK?"
+ "CO KURZ OBSAHUJE?"
```

### **BONUS benefit:**
```diff
- Zobrazuje se ✅
+ Skrytý ❌
```

### **Cenová sekce:**
```diff
- Label: "⚡ PRŮKOPNICKÁ VÝHODA"
+ Label: "📋 INFORMACE O KURZU"

- Cena: 4.999 Kč (normálně 8.499 Kč)
+ Cena: 8.499 Kč (běžná cena)

- "💰 UŠETŘÍTE 3.333 Kč"
+ (skryto)
```

### **"Po registraci obdržíte":**
```diff
- 💰 Slevu 40% do emailu
- 🎯 Link na objednávku
- 🎁 BONUS: Mini kurz

+ 📝 Potvrzení registrace
+ 🔔 Upozornění na další běh
+ 💡 Možná exkluzivní sleva
```

### **Urgency box:**
```diff
- "🔥 OMEZENÁ KAPACITA - Zbývá X míst"
+ "⚠️ PLNÉ! - Přihlaste se na čekací listinu"
```

---

## 📧 EMAIL LOGIKA

Email se odesílá STEJNĚ pro oba stavy (do Smartemailing).

**Rozdíl je v toast notifikaci:**

```typescript
// EARLY BIRD
toast.success("🎉 Úspěšně! Sledujte svůj email pro slevu 40%!");

// WAITLIST
toast.success("📝 Přidáni na čekací listinu! Ozveme se až spustíme další běh.");
```

---

## 🧪 TESTOVÁNÍ

### **Test 1: Když JE místo (countdown běží)**

```
1. Otevři landing page
2. Zkontroluj že countdown běží (není 0:00:00)
3. Scroll na opt-in sekci
4. Ověř že vidíš:
   ✅ "STAŇTE SE PRŮKOPNÍKEM!"
   ✅ Cena 4.999 Kč (normálně 8.499 Kč)
   ✅ BONUS: Mini kurz
   ✅ Button "🔥 CHCI SLEVU 40%"
5. Zadej email a klikni submit
6. Ověř success screen:
   ✅ "🔥 VÍTEJTE MEZI PRŮKOPNÍKY!"
   ✅ Slevu 40% do emailu
   ✅ BONUS: Mini kurz
```

### **Test 2: Když NENÍ místo (countdown vypršel)**

```
1. Otevři DevTools Console
2. Zadej: localStorage.setItem('pvs_start_time', Date.now() - 18*60*60*1000)
3. Refresh stránku
4. Zkontroluj že countdown je 0:00:00
5. Scroll na opt-in sekci
6. Ověř že vidíš:
   ✅ "MÍSTA OBSAZENA"
   ✅ Cena 8.499 Kč (BEZ slevy)
   ✅ BEZ bonusu
   ✅ Button "📝 ČEKACÍ LISTINA"
7. Zadej email a klikni submit
8. Ověř success screen:
   ✅ "📝 PŘIDÁNI NA ČEKACÍ LISTINU!"
   ✅ BEZ slevy
   ✅ "Dáme vám vědět"
```

---

## 🔧 TECHNICKÉ DETAILY

### **Soubor:** `/components/PrelaunchEmailCapture.tsx`

### **Klíčové změny:**

1. **State tracking:**
   ```typescript
   const [wasWaitlist, setWasWaitlist] = useState(false);
   ```

2. **Detection in handleSubmit:**
   ```typescript
   const isWaitlist = isCampaignFull();
   setWasWaitlist(isWaitlist);
   ```

3. **Conditional rendering:**
   ```typescript
   if (isSubmitted) {
     if (wasWaitlist) {
       return <WaitlistSuccessScreen />;
     }
     return <EarlyBirdSuccessScreen />;
   }
   ```

4. **Dynamic content based on `isCampaignFull()`:**
   ```typescript
   {!isCampaignFull() ? (
     <EarlyBirdContent />
   ) : (
     <WaitlistContent />
   )}
   ```

---

## 📊 UX FLOW

### **SCÉNÁŘ A - STIHNE (countdown běží):**

```
1. User vidí landing page s countdownem
2. Countdown běží (např. "14:32:18")
3. Opt-in modal: "STAŇTE SE PRŮKOPNÍKEM!"
4. Cena: 4.999 Kč se slevou
5. User zadá email
6. Success: "🔥 VÍTEJTE MEZI PRŮKOPNÍKY!"
7. Email: Sleva 40% + BONUS mini kurz
```

### **SCÉNÁŘ B - NESTIHNE (countdown vypršel):**

```
1. User vidí landing page s "0:00:00"
2. Countdown vypršel
3. Opt-in modal: "MÍSTA OBSAZENA"
4. Cena: 8.499 Kč (běžná)
5. User zadá email
6. Success: "📝 PŘIDÁNI NA ČEKACÍ LISTINU!"
7. Email: Potvrzení čekací listiny
```

---

## ✅ CHECKLIST

- [x] Trackování waitlist stavu (`wasWaitlist`)
- [x] Dva různé success screeny
- [x] Dynamický headline (průkopník vs. plné)
- [x] Dynamický subline
- [x] Dynamická cena (se slevou vs. bez)
- [x] Skrytý BONUS když je plno
- [x] Dynamické "Po registraci obdržíte"
- [x] Dynamický button text
- [x] Různé toast notifikace
- [x] Benefits heading změna
- [x] Urgency box změna

---

## 🎉 VÝSLEDEK

✅ Opt-in modal teď správně rozlišuje mezi:
- **EARLY BIRD** (stihne countdown) → Sleva 40% + BONUS
- **WAITLIST** (nestihne countdown) → Čekací listina bez slevy

✅ Success screen je konzistentní s tím co user očekává

✅ UX je jasný a čestný - neposkytujeme slevu když už vypršela

---

**Status:** ✅ READY FOR TESTING  
**Vytvořeno:** 2025-01-23  
**Soubor:** `/components/PrelaunchEmailCapture.tsx`

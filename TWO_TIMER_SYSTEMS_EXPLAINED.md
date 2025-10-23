# 🎯 DVA ODDĚLENÉ TIMER SYSTÉMY

**Vytvořeno:** 2025-01-23  
**Status:** ✅ AKTIVNÍ

---

## 📊 PŘEHLED SYSTÉMŮ

```
┌─────────────────────────────────────────────────────────────┐
│                    USER JOURNEY                             │
└─────────────────────────────────────────────────────────────┘

1️⃣ LANDING PAGE (/)
   ↓
   [SCARCITY TIMER] → "zbývá X míst"
   ↓
   localStorage: 'pvs_scarcity_start'
   Timeline: 0h → 17h (50 míst → 0 míst)
   ↓
   STIHNE (0-17h):    Opt-in → EMAIL se slevou
   NESTIHNE (17h+):   Opt-in → EMAIL waitlist
   ↓
   
2️⃣ ORDER PAGE (/objednavka)
   ↓
   [URGENCY TIMER] → "sleva vyprší za X hodin"
   ↓
   localStorage: 'pvs_start_time'
   Timeline: 0h → 24h (sleva 40% → plná cena)
   ↓
   STIHNE (0-24h):    FAPI A (4.999 Kč)
   NESTIHNE (24h+):   FAPI B (8.499 Kč) nebo redirect
```

---

## 1️⃣ LANDING PAGE - SCARCITY TIMER

### **Účel:**
Vytvořit urgenci na **landing page** aby user zadal email

### **localStorage klíč:**
```javascript
'pvs_scarcity_start'
```

### **Timeline:**
```
0h  → 50 míst  → "STAŇTE SE PRŮKOPNÍKEM!"
6h  → 32 míst  → "Rychle! Ubývá míst!"
12h → 14 míst  → "Pozor! Skoro plné!"
17h → 0 míst   → "MÍSTA OBSAZENA" → WAITLIST
```

### **Nastavení:**
```typescript
INITIAL_SPOTS: 50
SPOTS_PER_HOUR: 3
DURATION: ~17 hodin
```

### **Soubor:**
```
/lib/scarcity.ts
```

### **Použití v komponentách:**
```typescript
import { getRemainingSpots, isCampaignFull } from '../lib/scarcity';

const spots = getRemainingSpots(); // 0-50
const isFull = isCampaignFull(); // true/false
```

---

## 2️⃣ ORDER PAGE - URGENCY TIMER

### **Účel:**
Vytvořit urgenci na **order page** aby user koupil během 24h

### **localStorage klíč:**
```javascript
'pvs_start_time'
```

### **Timeline:**
```
0h  → "Sleva vyprší za 24h" → FAPI A (4.999 Kč)
12h → "Sleva vyprší za 12h" → FAPI A (4.999 Kč)
24h → "Sleva vypršela"      → FAPI B (8.499 Kč)
```

### **Nastavení:**
```typescript
DURATION: 24 hodin
EARLY_PRICE: 4.999 Kč (sleva 40%)
NORMAL_PRICE: 8.499 Kč (plná cena)
```

### **Soubor:**
```
/components/OrderPageFinal.tsx
/components/CountdownBanner.tsx (pokud používáš)
```

### **Použití v komponentách:**
```typescript
const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

function calculateTimeLeft() {
  const startTime = localStorage.getItem('pvs_start_time');
  // ... countdown logika
}
```

---

## 🎯 KLÍČOVÉ ROZDÍLY

| Vlastnost | SCARCITY (landing) | URGENCY (order) |
|-----------|-------------------|-----------------|
| **Stránka** | `/` (landing page) | `/objednavka` |
| **localStorage** | `pvs_scarcity_start` | `pvs_start_time` |
| **Trvání** | 17 hodin | 24 hodin |
| **Co ubývá** | Místa (50 → 0) | Čas (24h → 0h) |
| **Konec** | Waitlist modal | Plná cena/redirect |
| **Začátek** | První návštěva landing | Opt-in email |
| **Soubor** | `/lib/scarcity.ts` | `/components/OrderPageFinal.tsx` |

---

## 🔄 USER FLOW - KROK ZA KROKEM

### **SCÉNÁŘ 1: Uživatel STIHNE oboje (ideální)**

```
DAY 0 - 10:00
├─ User přijde na landing page (/)
├─ localStorage: 'pvs_scarcity_start' = 10:00
├─ Vidí: "zbývá 50 míst"
└─ Timer běží...

DAY 0 - 14:00 (po 4h)
├─ User klikne opt-in
├─ Vidí: "STAŇTE SE PRŮKOPNÍKEM!" (míst ještě ~38)
├─ Zadá email
├─ Dostane: EMAIL se slevou 40%
└─ Email obsahuje: Link na /objednavka

DAY 0 - 14:05
├─ User klikne na link v emailu
├─ Otevře: /objednavka
├─ localStorage: 'pvs_start_time' = 14:05
├─ Vidí: "Sleva vyprší za 24h"
└─ Timer běží...

DAY 0 - 18:00 (po 4h na order page)
├─ User se rozhodne koupit
├─ Countdown: "Sleva vyprší za 20h"
├─ Vyplní: FAPI Formulář A
├─ Zaplatí: 4.999 Kč ✅
└─ HOTOVO!
```

### **SCÉNÁŘ 2: Uživatel NESTIHNE místa (po 17h)**

```
DAY 0 - 10:00
├─ User přijde na landing page (/)
├─ localStorage: 'pvs_scarcity_start' = 10:00
└─ Timer běží...

DAY 1 - 04:00 (po 18h)
├─ User se vrátí na landing
├─ Scarcity: 17h+ = PLNÉ!
├─ Vidí: "zbývá 0 míst"
├─ Klikne opt-in
├─ Vidí: "MÍSTA OBSAZENA" → WAITLIST modal
├─ Zadá email
├─ Dostane: EMAIL s potvrzením čekací listiny
└─ KONEC (žádný přístup na /objednavka)
```

### **SCÉNÁŘ 3: Uživatel NESTIHNE slevu (po 24h od emailu)**

```
DAY 0 - 10:00
├─ User přijde na landing (/)
├─ Opt-in (stihne, je 5. hodina)
├─ Dostane: EMAIL s linkem
├─ localStorage: 'pvs_start_time' = 10:00
└─ Email si nepřečte...

DAY 1 - 11:00 (po 25h)
├─ User konečně otevře email
├─ Klikne na: /objednavka
├─ Countdown: VYPRŠELO! (>24h)
├─ Vidí: FAPI Formulář B (8.499 Kč)
│   NEBO: Redirect na /objednavka-vyprsela
└─ Zaplatí: 8.499 Kč (nebo se vzdá)
```

---

## 🧪 DEBUG & TESTOVÁNÍ

### **Test Landing Page Scarcity:**

```javascript
// === LANDING PAGE (/) ===

// Reset (nová návštěva)
localStorage.removeItem('pvs_scarcity_start');
location.reload();
// ✅ Měl bys vidět: "zbývá ~50 míst"

// Simuluj 17h (místa došla)
const t = Date.now() - (17 * 60 * 60 * 1000);
localStorage.setItem('pvs_scarcity_start', t.toString());
location.reload();
// ✅ Měl bys vidět: "zbývá 0 míst" + WAITLIST modal
```

### **Test Order Page Urgency:**

```javascript
// === ORDER PAGE (/objednavka) ===

// Reset (nový opt-in)
localStorage.removeItem('pvs_start_time');
location.reload();
// ✅ Měl bys vidět: "Sleva vyprší za 24h" + FAPI A

// Simuluj 24h (sleva vypršela)
const t = Date.now() - (24 * 60 * 60 * 1000);
localStorage.setItem('pvs_start_time', t.toString());
location.reload();
// ✅ Měl bys vidět: FAPI B (8.499 Kč) nebo redirect
```

---

## ⚠️ DŮLEŽITÉ POZNÁMKY

### **1. Scarcity začíná DŘÍV než končí sleva:**

```
Scarcity:  [===== 17h =====] PLNÉ
Urgency:            [========== 24h ==========] VYPRŠELO
```

**Důvod:** 
- Scarcity má přimět usera zapsat email RYCHLE
- Urgency má přimět usera KOUPIT po opt-in
- Pokud user přijde po 17h → waitlist (nepotřebuje urgency timer)

### **2. Každý timer má vlastní localStorage:**

```javascript
// NIKDY NEPLEŤ!
'pvs_scarcity_start'  // Landing scarcity
'pvs_start_time'      // Order urgency
```

### **3. Timery jsou NEZÁVISLÉ:**

- Landing scarcity může být PLNÉ ale order urgency může běžet
- Order urgency může VYPRŠET ale scarcity může ještě běžet
- Každý má vlastní účel!

### **4. DŮLEŽITÉ: Random offset odstraněn (2025-01-23)**

```typescript
// ❌ PŘED - způsobovalo nesynchronizaci
const randomOffset = Math.floor(Math.random() * 3);
remaining = remaining - randomOffset;
// Result: Hero říká 48, CTA říká 49, Modal říká 50!

// ✅ PO - konzistentní číslo napříč stránkou
const remaining = Math.max(MIN_SPOTS, INITIAL_SPOTS - spotsTaken);
// Result: Všude stejné číslo!
```

**Důvod odstranění:**
- Každé volání `getRemainingSpots()` vracelo JINÉ číslo kvůli `Math.random()`
- Komponenty nebyly synchronizované (48 vs 49 vs 50)
- Fake scarcity nepotřebuje extra randomizaci - už je dost realistické

---

## 📝 RELATED FILES

### **Scarcity System:**
- `/lib/scarcity.ts` - Hlavní logika
- `/components/PrelaunchEmailCapture.tsx` - Opt-in modal
- `/SCARCITY_COUNTDOWN_SYNC_FIX.md` - Dokumentace fix
- `/PRELAUNCH_OPT_IN_FIX.md` - Waitlist modal fix

### **Urgency System:**
- `/components/OrderPageFinal.tsx` - Order page s countdown
- `/components/FapiCheckoutForm.tsx` - FAPI A (4.999 Kč)
- `/components/FapiCheckoutFormExpensive.tsx` - FAPI B (8.499 Kč)
- `/FAPI_TWO_PRICE_SETUP.md` - Setup dvou formulářů

---

## ✅ CHECKLIST

### **Landing Page:**
- [x] Scarcity timer běží od první návštěvy
- [x] Používá vlastní localStorage (`pvs_scarcity_start`)
- [x] Po 17h zobrazuje waitlist modal
- [x] Success screen se liší (early bird vs waitlist)

### **Order Page:**
- [x] Urgency timer běží od opt-in emailu
- [x] Používá vlastní localStorage (`pvs_start_time`)
- [x] Po 24h zobrazuje dražší formulář
- [x] Countdown viditelný na stránce

### **Nezávislost:**
- [x] Každý timer má vlastní localStorage klíč
- [x] Timery se neovlivňují
- [x] Jasné UX flow pro oba scénáře

---

**Status:** ✅ FULLY DOCUMENTED  
**Vytvořeno:** 2025-01-23  
**Testováno:** Ano

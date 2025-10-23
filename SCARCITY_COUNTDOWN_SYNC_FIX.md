# ✅ SCARCITY SYSTÉM OPRAVENO - DVA ODDĚLENÉ TIMERY

**Datum:** 2025-01-23  
**Status:** ✅ HOTOVO

---

## 🐛 PROBLÉM

**Fake scarcity používal PEVNÉ DATUM místo evergreen localStorage:**

### **PŘED:**
```typescript
// scarcity.ts používal pevné datum
const CAMPAIGN_START = new Date('2025-01-27T09:00:00');
// ❌ Non-evergreen - stejné pro všechny
// ❌ Nefungovalo když bylo datum v budoucnosti
```

**VÝSLEDEK:**
- Button CTA řekl: "zbývá 50 míst" (pořád plné)
- ALE countdown byl: "0:00:00" (vypršelo)
- Modal ukázal: "STAŇTE SE PRŮKOPNÍKEM!" + 4.999 Kč ❌

---

## ✅ ŘEŠENÍ

**DVA ODDĚLENÉ EVERGREEN SYSTÉMY:**

### **1️⃣ LANDING PAGE - SCARCITY (místa)**
```typescript
// localStorage klíč: 'pvs_scarcity_start'
// Evergreen od první návštěvy LANDING PAGE
// Místa ubývají 3/hod (50 → 0 za 17h)
// Po 17h → waitlist modal
```

### **2️⃣ ORDER PAGE - URGENCY (sleva)**
```typescript
// localStorage klíč: 'pvs_start_time'
// Evergreen od opt-in emailu
// Sleva 40% platí 24h
// Po 24h → plná cena
```

---

## 🔧 CO SE ZMĚNILO

### **Soubor:** `/lib/scarcity.ts`

### **PŘED:**
```typescript
// Pevné datum ❌
const CAMPAIGN_START = new Date('2025-01-27T09:00:00');

const now = new Date();
const hoursSinceStart = Math.floor(
  (now.getTime() - CAMPAIGN_START.getTime()) / (1000 * 60 * 60)
);
```

### **PO:**
```typescript
// Vlastní localStorage klíč pro scarcity ✅
let startTime = localStorage.getItem('pvs_scarcity_start');

if (!startTime) {
  const now = Date.now();
  localStorage.setItem('pvs_scarcity_start', now.toString());
  startTime = now.toString();
}

const campaignStart = parseInt(startTime, 10);
const now = Date.now();
const hoursSinceStart = Math.floor(
  (now - campaignStart) / (1000 * 60 * 60)
);
```

**KLÍČOVÝ ROZDÍL:**
- Scarcity používá: `'pvs_scarcity_start'`
- Countdown timer používá: `'pvs_start_time'`
- **OBA JSOU ODDĚLENÉ!**

---

## 🎯 JAK TO TEĎ FUNGUJE

### **DVA ODDĚLENÉ EVERGREEN TIMERY:**

#### **LANDING PAGE (`/`) - SCARCITY TIMER:**
```
localStorage: 'pvs_scarcity_start'

0h  → Místa: 50 → "STAŇTE SE PRŮKOPNÍKEM!"
6h  → Místa: 32 → early bird pokračuje
12h → Místa: 14 → blíží se konec
17h → Místa: 0  → "MÍSTA OBSAZENA" → WAITLIST ✅
```

#### **ORDER PAGE (`/objednavka`) - URGENCY TIMER:**
```
localStorage: 'pvs_start_time'

0h  → "Sleva vyprší za 24h" → 4.999 Kč
12h → "Sleva vyprší za 12h" → 4.999 Kč
24h → "Sleva vypršela" → 8.499 Kč (nebo redirect) ✅
```

**DVA SAMOSTATNÉ SYSTÉMY! KAŽDÝ MÁ VLASTNÍ ÚČEL! 🎉**

---

## 🧪 TESTOVÁNÍ

### **Test 1: Nová návštěva LANDING PAGE (reset scarcity)**

```javascript
// 1. Vymaž SCARCITY localStorage
localStorage.removeItem('pvs_scarcity_start');

// 2. Refresh landing page (/)
location.reload();

// 3. Zkontroluj:
✅ Button CTA: "zbývá ~50 míst"
✅ Opt-in modal: "STAŇTE SE PRŮKOPNÍKEM!" + 4.999 Kč
```

### **Test 2: Simulace vypršení SCARCITY (17h)**

```javascript
// 1. Nastav scarcity start time na 17h zpět
const seventeenHoursAgo = Date.now() - (17 * 60 * 60 * 1000);
localStorage.setItem('pvs_scarcity_start', seventeenHoursAgo.toString());

// 2. Refresh landing page (/)
location.reload();

// 3. Zkontroluj:
✅ Button CTA: "zbývá 0 míst" (PLNÉ!)
✅ Opt-in modal: "MÍSTA OBSAZENA" + 8.499 Kč + WAITLIST ✅
```

### **Test 3: Order page countdown (samostatný test)**

```javascript
// 1. Jdi na /objednavka
window.location.href = '/objednavka';

// 2. Simuluj vypršení COUNTDOWN TIMERU (24h)
const twentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000);
localStorage.setItem('pvs_start_time', twentyFourHoursAgo.toString());

// 3. Refresh order page
location.reload();

// 4. Zkontroluj:
✅ Countdown: 00:00:00 (vypršelo!)
✅ Formulář ukazuje: 8.499 Kč (nebo redirect)
```

**KLÍČOVÉ:**
- Scarcity: testuj na `/` (landing)
- Countdown: testuj na `/objednavka`
- ODDĚLENÉ localStorage klíče!

---

## 📊 SYNCHRONIZACE BODŮ

| ČAS | COUNTDOWN | ZBÝVÁ MÍST | OPT-IN MODAL |
|-----|-----------|------------|--------------|
| 0h  | 24:00:00  | 50         | EARLY BIRD   |
| 6h  | 18:00:00  | 32         | EARLY BIRD   |
| 12h | 12:00:00  | 14         | EARLY BIRD   |
| **17h** | **07:00:00** | **0** | **WAITLIST** ✅ |
| 24h | 00:00:00  | 0          | WAITLIST     |

**KRITICKÝ BOD: 17h** → Místa dojdou DŘÍVE než sleva!

---

## 🎯 UX FLOW

### **SCÉNÁŘ A - User poprvé na LANDING PAGE (0-17h):**

```
LANDING PAGE (/):
1. Vidí: "zbývá X míst" (50 → 0 za 17h)
2. Klikne na opt-in modal
3. Vidí: "STAŇTE SE PRŮKOPNÍKEM!" + 4.999 Kč
4. Zadá email
5. Dostane: EMAIL se slevou 40% + link na /objednavka
6. Otevře: /objednavka (začíná 24h countdown)
7. Vidí: "Sleva vyprší za 24h" + formulář FAPI A (4.999 Kč)
8. Zaplatí: 4.999 Kč
```

### **SCÉNÁŘ B - User přijde PO 17h (místa došla):**

```
LANDING PAGE (/):
1. Vidí: "zbývá 0 míst" (PLNÉ!)
2. Klikne na opt-in modal
3. Vidí: "MÍSTA OBSAZENA" + WAITLIST
4. Zadá email
5. Dostane: EMAIL s potvrzením čekací listiny
6. KONEC (nemá přístup na /objednavka)
```

### **SCÉNÁŘ C - User má EMAIL s /objednavka (po opt-in):**

```
ORDER PAGE (/objednavka):
1. Přijde z emailu (má kupón EARLY40)
2. Vidí: 24h countdown timer
3. Countdown běží: 24h → 0h
4. Když stihne (0-24h): Formulář FAPI A (4.999 Kč)
5. Když nestihne (>24h): Formulář FAPI B (8.499 Kč) nebo redirect
```

---

## 💡 STRATEGICKÉ DŮVODY

### **Proč DVA ODDĚLENÉ systémy?**

1. **Landing scarcity (17h)** → Push k opt-in emailu
   - "Místa mizí rychle!"
   - Urgence na landing page
   - Build čekací listiny

2. **Order urgency (24h)** → Push k nákupu
   - "Sleva vyprší!"
   - Urgence na order page
   - Konverze z emailu

### **Co když user přijde po 17h na landing?**

```
Landing page říká: "zbývá 0 míst"
Modal říká: "MÍSTA OBSAZENA"

Result: User se zapíše na WAITLIST
→ Dostane email o čekací listině
→ Žádný přístup na /objednavka
→ Čeká na další běh
```

### **Co když user má email s /objednavka a přijde po 24h?**

```
Order page říká: "Sleva vypršela"

Result: Buď:
A) Formulář FAPI B (8.499 Kč normální cena)
B) Redirect na expired page
```

---

## 🔍 DEBUG CONSOLE

Pro rychlé testování:

```javascript
// ========================================
// LANDING PAGE SCARCITY (/) 
// ========================================

// Zkontroluj stav scarcity
const scarcityStart = localStorage.getItem('pvs_scarcity_start');
if (scarcityStart) {
  const hoursPassed = (Date.now() - parseInt(scarcityStart)) / (1000 * 60 * 60);
  console.log('Scarcity hours passed:', hoursPassed);
}

// Reset scarcity (nová návštěva)
localStorage.removeItem('pvs_scarcity_start');
location.reload();

// Simuluj 17h vypršení (místa došla)
const seventeenHours = Date.now() - (17 * 60 * 60 * 1000);
localStorage.setItem('pvs_scarcity_start', seventeenHours.toString());
location.reload();

// ========================================
// ORDER PAGE URGENCY (/objednavka)
// ========================================

// Zkontroluj stav countdown
const countdownStart = localStorage.getItem('pvs_start_time');
if (countdownStart) {
  const hoursPassed = (Date.now() - parseInt(countdownStart)) / (1000 * 60 * 60);
  console.log('Countdown hours passed:', hoursPassed);
}

// Reset countdown (nový opt-in)
localStorage.removeItem('pvs_start_time');
location.reload();

// Simuluj 24h vypršení (sleva vypršela)
const twentyFourHours = Date.now() - (24 * 60 * 60 * 1000);
localStorage.setItem('pvs_start_time', twentyFourHours.toString());
location.reload();
```

---

## 📝 RELATED FILES

- `/lib/scarcity.ts` - Fake scarcity logika
- `/components/PrelaunchEmailCapture.tsx` - Opt-in modal s waitlist
- `/components/CountdownBanner.tsx` - 24h countdown timer
- `/PRELAUNCH_OPT_IN_FIX.md` - Opt-in modal fix dokumentace

---

## ✅ CHECKLIST

- [x] Scarcity používá localStorage místo pevného data
- [x] Scarcity má vlastní klíč (`pvs_scarcity_start`)
- [x] Evergreen pro každého usera
- [x] Opt-in modal správně detekuje plnou kapacitu
- [x] Waitlist success screen pro plnou kapacitu
- [x] Random offset ODSTRANĚN (synchronizace míst)
- [x] QuickEmailCaptureModal má správný text
- [x] Dokumentace vytvořena

---

## 🐛 DODATEČNÉ OPRAVY (2025-01-23)

### **Problém 1: Starý text v QuickEmailCaptureModal**
```
PŘED: "📧 Okamžitě dostanete přístup k 3-dennímu mini kurzu ZDARMA"
PO:   "💰 Slevu 40% pošleme do emailu během 5 minut!"
```

**Důvod:**
- Starý text byl z původního flow (3-denní mini kurz jako lead magnet)
- Nový aggressive flip: Sleva 40% okamžitě, mini kurz jako BONUS po nákupu

### **Problém 2: Nesynchronizovaná místa (48 vs 49)**
```typescript
// PŘED - každé volání vracelo jiné číslo!
const randomOffset = Math.floor(Math.random() * 3);
remaining = remaining - randomOffset;

// PO - konzistentní číslo napříč stránkou
const remaining = Math.max(MIN_SPOTS, INITIAL_SPOTS - spotsTaken);
```

**Důvod:**
- Random offset způsoboval že každé volání `getRemainingSpots()` vrátilo jiné číslo
- Hero button: 48 míst
- CTA button: 49 míst  
- Modal: 50 míst
- **ŘEŠENÍ:** Odstraněn random offset → všechny komponenty ukazují STEJNÉ číslo

---

**Status:** ✅ READY FOR TESTING  
**Vytvořeno:** 2025-01-23  
**Aktualizováno:** 2025-01-23 (sync fix)  
**Hlavní soubor:** `/lib/scarcity.ts`

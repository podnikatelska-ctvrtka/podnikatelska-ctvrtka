# 🎓 ONBOARDING SYSTÉM - NÁVRH

**Datum:** 3. listopadu 2025  
**Kontext:** Uživatel "skočí do kurzu" a měl by dostat efektivní úvod

---

## 🎯 CÍL ONBOARDINGU

**Základní myšlenka:**
> "Za 60 sekund by měl uživatel pochopit, CO dostane, JAK kurz funguje, a cítit se MOTIVOVANÝ začít."

---

## 💡 NAVRŽENÉ ŘEŠENÍ: "QUICK START MODAL"

### **🎬 Varianta A: Minimalistický Quick Start (DOPORUČUJI)**

**Zobrazit při prvním vstupu do kurzu:**

```
┌─────────────────────────────────────────────┐
│  🎓 Vítejte v kurzu Podnikatelská Čtvrtka  │
├─────────────────────────────────────────────┤
│                                             │
│  📚 16 praktických lekcí                    │
│  🎯 3 interaktivní nástroje                 │
│  ⏱️  Dokončíte za ~4 hodiny                 │
│                                             │
│  ✅ CO VÁS ČEKÁ:                            │
│                                             │
│  [1] Business Model Canvas                 │
│      → Vytvořte kompletní byznys model     │
│                                             │
│  [2] Value Proposition Canvas              │
│      → Najděte perfektní produkt-market fit│
│                                             │
│  [3] Akční plán                             │
│      → Konkrétní kroky na další měsíc      │
│                                             │
│  💡 TIP: Kurz si můžete kdykoliv           │
│      přerušit a pokračovat později.        │
│                                             │
│  [ Začít kurz →  ]  [ Projít si Dashboard ]│
└─────────────────────────────────────────────┘
```

**Implementace:**
- Modal při prvním načtení
- LocalStorage klíč: `onboarding_completed`
- Tlačítko "Začít kurz" → zavře modal + jde na Lekci 1
- Tlačítko "Projít si Dashboard" → zavře modal + zůstane na dashboardu

---

### **🎬 Varianta B: Storytelling Quick Start (Emocionální)**

**Pro ty, kdo chtějí víc motivace:**

```
┌─────────────────────────────────────────────┐
│         🚀 Začínáme vaši cestu              │
├─────────────────────────────────────────────┤
│                                             │
│  Máte skvělý nápad, ale nevíte:             │
│                                             │
│  ❓ Kdo by za něj platil?                   │
│  ❓ Jak ho prodat?                          │
│  ❓ Kolik zákazníků potřebujete?            │
│                                             │
│  Za 4 hodiny budete mít odpovědi.          │
│                                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │
│                                             │
│  📊 MODUL 1: Business Model Canvas         │
│     → Naučíte se všech 9 bloků             │
│                                             │
│  🎯 MODUL 2: Value Proposition Canvas      │
│     → Najdete produkt-market fit           │
│                                             │
│  ✅ MODUL 3: Akční plán                     │
│     → Dostanete konkrétní kroky            │
│                                             │
│  [ Pojďme na to! →  ]  [ Nejdřív dashboard ]│
└─────────────────────────────────────────────┘
```

---

### **🎬 Varianta C: Video Intro (Premium)**

**Pro pokročilé:**

```
┌─────────────────────────────────────────────┐
│  🎥 Rychlý úvod do kurzu (2 min)            │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  │   [▶️  Přehrát úvodní video]       │   │
│  │                                     │   │
│  │   "Ahoj, jsem [jméno] a za 2 min   │   │
│  │    vám ukážu, co vás čeká..."      │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ⏩ Chcete radši textový přehled?          │
│                                             │
│  📚 16 lekcí v 3 modulech                   │
│  🎯 Praktické nástroje a kalkulačky        │
│  ⏱️  ~4 hodiny s procvičováním             │
│                                             │
│  [ ▶️  Pusťte video ]  [ Přeskočit →  ]     │
└─────────────────────────────────────────────┘
```

---

## 🏗️ TECHNICKÁ IMPLEMENTACE

### **1️⃣ Vytvořit komponentu `OnboardingModal.tsx`:**

```tsx
interface OnboardingModalProps {
  onStart: () => void;           // Jde na Lekci 1
  onViewDashboard: () => void;   // Zůstane na dashboardu
  onSkip: () => void;            // Zavře modal
}

export function OnboardingModal({ onStart, onViewDashboard, onSkip }: OnboardingModalProps) {
  // ... implementace
}
```

**Features:**
- ✅ Responzivní (desktop + mobile)
- ✅ Animovaný vstup (fade-in)
- ✅ Dismissible (ESC nebo kliknutí mimo)
- ✅ LocalStorage persistence
- ✅ Lze resetovat v dev módu

---

### **2️⃣ Integrace do `CourseDemoV3.tsx`:**

```tsx
const [showOnboarding, setShowOnboarding] = useState(false);

useEffect(() => {
  // ✅ Zkontroluj, jestli už uživatel viděl onboarding
  const hasSeenOnboarding = localStorage.getItem('onboarding_completed');
  
  if (!hasSeenOnboarding) {
    setShowOnboarding(true);
  }
}, []);

function handleOnboardingComplete(action: 'start' | 'dashboard' | 'skip') {
  localStorage.setItem('onboarding_completed', 'true');
  setShowOnboarding(false);
  
  if (action === 'start') {
    // Jdi na první lekci
    handleLessonChange(MODULE_1.lessons[0]);
  } else if (action === 'dashboard') {
    // Zůstaň na dashboardu
    setShowMainDashboard(true);
  }
  // skip = nic nedělej
}
```

---

### **3️⃣ Reset onboardingu (dev mód):**

```tsx
// V DevModeBanner přidat tlačítko:
<button
  onClick={() => {
    localStorage.removeItem('onboarding_completed');
    toast.success('Onboarding resetován! Obnovte stránku.');
  }}
  className="px-2 py-1 bg-purple-600 text-white rounded text-xs"
>
  Reset Onboarding
</button>
```

---

## 📱 MOBILE vs DESKTOP

### **Desktop:**
```
Modal: 600px široký, vycentrovaný
Grafika: Ilustrace business canvasu (SVG)
Animace: Smooth fade-in + scale
```

### **Mobile:**
```
Modal: Full-screen bottom sheet
Grafika: Ikony místo ilustrací
Animace: Slide-up from bottom
```

---

## 🎨 DESIGN VARIACE

### **Option 1: Minimalistický (rychlý)**

```tsx
<div className="p-8 max-w-2xl">
  <h1>🎓 Vítejte v kurzu</h1>
  <p>3 moduly • 16 lekcí • ~4 hodiny</p>
  <div className="grid grid-cols-3 gap-4 mt-6">
    <div>📊 BMC</div>
    <div>🎯 VPC</div>
    <div>✅ Plán</div>
  </div>
  <Button onClick={onStart}>Začít kurz</Button>
</div>
```

**Čas na přečtení:** 15 sekund

---

### **Option 2: Story-driven (motivační)**

```tsx
<div className="p-8 max-w-3xl">
  <div className="text-center mb-6">
    <h1 className="text-3xl font-bold">🚀 Začínáme</h1>
    <p className="text-gray-600 mt-2">
      Za 4 hodiny budete mít jasno v byznysu
    </p>
  </div>
  
  <div className="space-y-4">
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3>📊 Modul 1: Business Model Canvas</h3>
      <p>Vytvořte kompletní byznys model za 90 minut</p>
    </div>
    <div className="bg-purple-50 p-4 rounded-lg">
      <h3>🎯 Modul 2: Value Proposition Canvas</h3>
      <p>Najděte perfektní produkt-market fit</p>
    </div>
    <div className="bg-green-50 p-4 rounded-lg">
      <h3>✅ Modul 3: Akční plán</h3>
      <p>Dostanete konkrétní kroky na další měsíc</p>
    </div>
  </div>
  
  <Button onClick={onStart}>Začít hned →</Button>
</div>
```

**Čas na přečtení:** 45 sekund

---

### **Option 3: Gamifikovaný (interaktivní)**

```tsx
<div className="p-8 max-w-3xl">
  <h1>🎮 Nastavte svůj cíl</h1>
  <p>Co chcete z kurzu získat?</p>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
    <button className="p-4 border-2 hover:border-blue-500 rounded-lg">
      <div className="text-4xl mb-2">💡</div>
      <h3>Ověřit nápad</h3>
      <p className="text-sm">Zjistit, jestli má můj nápad smysl</p>
    </button>
    
    <button className="p-4 border-2 hover:border-blue-500 rounded-lg">
      <div className="text-4xl mb-2">🚀</div>
      <h3>Spustit byznys</h3>
      <p className="text-sm">Naučit se, jak začít prodávat</p>
    </button>
    
    <button className="p-4 border-2 hover:border-blue-500 rounded-lg">
      <div className="text-4xl mb-2">📈</div>
      <h3>Zlepšit marketing</h3>
      <p className="text-sm">Najít správné zákazníky</p>
    </button>
    
    <button className="p-4 border-2 hover:border-blue-500 rounded-lg">
      <div className="text-4xl mb-2">🎯</div>
      <h3>Vytvořit plán</h3>
      <p className="text-sm">Mít konkrétní kroky na měsíc dopředu</p>
    </button>
  </div>
  
  <Button onClick={onStart}>Pokračovat →</Button>
</div>
```

**Features:**
- ✅ Ukládá si cíl uživatele do profilu
- ✅ Gamifikace: "Achievement unlocked" když dosáhne cíle
- ✅ Personalizované tipy podle cíle

**Čas na interakci:** 30 sekund

---

## 🎯 DOPORUČENÍ PRO "PODNIKATELSKÁ ČTVRTKA"

### **FINAL PICK: Varianta A + Gamifikace**

**Proč:**
1. ✅ **Rychlý** (30 sekund)
2. ✅ **Jasný** (co dostanu + jak dlouho to trvá)
3. ✅ **Motivující** (3 konkrétní výstupy)
4. ✅ **Actionable** (jasné CTA)

**Co zahrnout:**

```
┌─────────────────────────────────────────────┐
│  🎓 Vítejte v Podnikatelské Čtvrtce         │
├─────────────────────────────────────────────┤
│                                             │
│  Za ~4 hodiny dokončíte:                    │
│                                             │
│  ✅ Business Model Canvas                   │
│     → Kompletní mapa vašeho byznysu        │
│                                             │
│  ✅ Value Proposition Canvas                │
│     → Perfektní produkt pro zákazníky      │
│                                             │
│  ✅ Akční plán na 30 dní                    │
│     → Konkrétní kroky, co dělat            │
│                                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │
│                                             │
│  📊 16 lekcí • 3 nástroje • 100% praktické │
│                                             │
│  💡 Můžete kdykoliv přerušit a pokračovat  │
│     později - pokrok se automaticky uloží. │
│                                             │
│  [ 🚀 Začít kurz →  ]  [ 📊 Projít dashboard ]│
└─────────────────────────────────────────────┘
```

---

## 🧪 A/B TEST MOŽNOSTI

Pokud chcete testovat, co funguje lépe:

**Test A:** Minimalistický (rychlý)
- Čas: 15s
- Konverze na "Začít kurz": ?%

**Test B:** Story-driven (motivační)
- Čas: 45s
- Konverze na "Začít kurz": ?%

**Test C:** Gamifikovaný (interaktivní)
- Čas: 30s
- Konverze na "Začít kurz": ?%

**Metriky:**
- % uživatelů, kteří kliknou "Začít kurz"
- % uživatelů, kteří dokončí první lekci
- Průměrný čas na onboardingu

---

## 🎁 BONUS FEATURES

### **1️⃣ Progress Preview**

```
Ukaž vizuální timeline:

START → [●●●○○○○○○] Modul 1 → [○○○○○○○] Modul 2 → [○○○] Modul 3 → ✅ HOTOVO
```

### **2️⃣ Time Estimate**

```
Odhaduji čas dokončení podle rychlosti čtení:

"Pokud čtete rychle: ~3 hodiny"
"Pokud si to chcete pořádně vyzkoušet: ~6 hodin"
```

### **3️⃣ Social Proof**

```
"📈 Už 156 podnikatelů dokončilo kurz"
"⭐ Průměrné hodnocení: 4.8/5"
```

### **4️⃣ Quick Wins**

```
"🎉 První achievement už po 10 minutách!"
"🏆 Unlock 'První Canvas' achievement hned v lekci 1"
```

---

## 📋 IMPLEMENTAČNÍ CHECKLIST

- [ ] Vytvořit `OnboardingModal.tsx`
- [ ] Přidat do `CourseDemoV3.tsx`
- [ ] LocalStorage persistence
- [ ] Mobile responzivní verze
- [ ] Animace (fade-in + scale)
- [ ] Reset button v dev módu
- [ ] A/B test tracking (optional)
- [ ] Analytics events (optional)

---

## 🎯 MĚŘITELNÉ CÍLE

**Success metrics:**
- ✅ 80%+ uživatelů klikne "Začít kurz"
- ✅ 70%+ uživatelů dokončí první lekci
- ✅ 50%+ uživatelů dokončí první modul

**Timing:**
- ⏱️  Max 60 sekund na onboarding
- ⏱️  Max 3 kliknutí do první lekce

---

## 💬 CO MI NA TOM ŘEKNI?

**Otázky k rozhodnutí:**

1. **Jakou variantu preferuješ?**
   - A) Minimalistický (15s)
   - B) Story-driven (45s)
   - C) Gamifikovaný (30s)

2. **Chceš přidat video úvod?**
   - Ano / Ne

3. **Chceš ukládat cíl uživatele?**
   - Ano (gamifikace + personalizace)
   - Ne (jednodušší)

4. **Chceš A/B testovat?**
   - Ano (varianta A vs B)
   - Ne (jen jedna verze)

**Řekni mi, co se ti líbí, a hned to implementuji! 🚀**

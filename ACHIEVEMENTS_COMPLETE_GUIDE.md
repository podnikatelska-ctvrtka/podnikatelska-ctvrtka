# 🏆 Kompletní průvodce Achievementy

## Přehled všech Achievementů

### 📊 Statistiky
- **Celkem achievementů:** 20
- **Celkem bodů:** 1,795
- **Kategorie:** Module (4), Canvas (5), VPC (6), Special (5)

---

## 🎯 MODUL 1 - Business Model Canvas

### 1. 🎯 První zákazník
- **ID:** `first-segment`
- **Body:** 10
- **Kdy se odemyká:** Při přidání prvního zákaznického segmentu do BMC
- **Trigger:** `BusinessModelCanvasV2.tsx` (řádek ~800) - při kliknutí na "Přidat segment"
- **Notifikace:** ✅ ANO - popup vyjede okamžitě po přidání segmentu

### 2. 💎 Hodnota na stole
- **ID:** `first-value`
- **Body:** 10
- **Kdy se odemyká:** Při přidání první hodnotové nabídky do BMC
- **Trigger:** `BusinessModelCanvasV2.tsx` - při přidání první hodnoty
- **Notifikace:** ✅ ANO - popup vyjede okamžitě

### 3. 🏆 Kompletní model
- **ID:** `all-sections-filled`
- **Body:** 50
- **Kdy se odemyká:** Když uživatel vyplní všech 9 sekcí BMC (alespoň 1 položka v každé)
- **Trigger:** `CourseDemoV3.tsx` (řádek ~1530) - kontrola při každém uložení
- **Notifikace:** ✅ ANO - popup vyjede když je splněna podmínka

### 4. 🚀 Modul 1 dokončen
- **ID:** `module-1-complete`
- **Body:** 100
- **Kdy se odemyká:** Při dokončení poslední lekce Modulu 1 (Lekce 9)
- **Trigger:** `CourseDemoV3.tsx` (řádek ~1545) - při `completeLesson(9)`
- **Notifikace:** ✅ ANO - popup vyjede při dokončení lekce 9

---

## ⚙️ MODUL 2 - Interaktivní nástroje

### 5. ✅ První validace
- **ID:** `validator-used`
- **Body:** 20
- **Kdy se odemyká:** **PŘI DOKONČENÍ LEKCE 16** (FIT Validator, Step 3)
- **Trigger:** `FitValidatorV2.tsx` (řádek ~3624) - při kliknutí na "Uložit a dokončit"
- **Notifikace:** ✅ ANO - popup vyjede při dokončení validátoru

### 6. 💰 Počítač zisků
- **ID:** `profit-calculated`
- **Body:** 20
- **Kdy se odemyká:** Při prvním spočítání profitu v Profit Calculatoru (Lekce 10)
- **Trigger:** `ProfitCalculator.tsx` (řádek ~450) - při výpočtu zisku
- **Notifikace:** ✅ ANO - popup vyjede při prvním výpočtu

### 7. ⚙️ Modul 2 dokončen
- **ID:** `module-2-complete`
- **Body:** 100
- **Kdy se odemyká:** Při dokončení poslední lekce Modulu 2 (Lekce 11)
- **Trigger:** `CourseDemoV3.tsx` - při `completeLesson(11)`
- **Notifikace:** ✅ ANO - popup vyjede při dokončení lekce 11

---

## 🗺️ MODUL 3 - Value Proposition Canvas

### 8. 👥 Profil zákazníka hotov
- **ID:** `customer-profile-complete`
- **Body:** 30
- **Kdy se odemyká:** Když má uživatel alespoň 2 položky v KAŽDÉ kategorii (Jobs + Pains + Gains)
- **Trigger:** `VPCCustomerProfileStory.tsx` - při ukládání dat
- **Notifikace:** ✅ ANO - popup vyjede při splnění podmínky

### 9. 🗺️ Hodnotová mapa hotova
- **ID:** `value-map-complete`
- **Body:** 30
- **Kdy se odemyká:** Když má uživatel alespoň 2 položky v KAŽDÉ kategorii Value Map (Products + Pain Relievers + Gain Creators)
- **Trigger:** `VPCValueMapSquare.tsx` - při ukládání dat
- **Notifikace:** ✅ ANO - popup vyjede při splnění podmínky

### 10. 🔥 Skvělý FIT
- **ID:** `fit-70-percent`
- **Body:** 50
- **Kdy se odemyká:** Když FIT Score překročí 70%
- **Trigger:** `CourseDemoV3.tsx` (řádek ~1560) - kontrola FIT score při update
- **Notifikace:** ✅ ANO - popup vyjede při překročení 70%

### 11. 🌟 Mistr Product-Market Fit
- **ID:** `product-fit-master`
- **Body:** 75
- **Kdy se odemyká:** Když FIT Score překročí 80%
- **Trigger:** `CourseDemoV3.tsx` - kontrola FIT score
- **Notifikace:** ✅ ANO - popup vyjede při překročení 80%

### 12. ⚡ Perfektní soulad
- **ID:** `fit-90-percent`
- **Body:** 100
- **Kdy se odemyká:** Když FIT Score překročí 90%
- **Trigger:** `CourseDemoV3.tsx` - kontrola FIT score
- **Notifikace:** ✅ ANO - popup vyjede při překročení 90%

### 13. 🎓 Absolvent kurzu
- **ID:** `module-3-complete`
- **Body:** 300
- **Kdy se odemyká:** Při dokončení poslední lekce Modulu 3 (Lekce 16 - FIT Validator Step 3)
- **Trigger:** `CourseDemoV3.tsx` - při `completeLesson(16)`
- **Notifikace:** ✅ ANO - popup vyjede při dokončení lekce 16
- **Extra:** 🎉 Velká gratulace! Dokončení celého kurzu!

---

## 🎁 SPECIAL ACHIEVEMENTS

### 14. 📈 Ziskový byznys
- **ID:** `profitable-business`
- **Body:** 50
- **Kdy se odemyká:** Když příjmy > náklady v Profit Calculatoru
- **Trigger:** `CourseDemoV3.tsx` (řádek ~1575) - kontrola při update dat
- **Notifikace:** ✅ ANO - popup vyjede když je byznys poprvé v zisku

### 15. 🛠️ Mistr nástrojů
- **ID:** `master-of-tools`
- **Body:** 75
- **Kdy se odemyká:** Když uživatel použije VŠECHNY nástroje:
  - ✅ Canvas Validator (`validator-used`)
  - ✅ Profit Calculator (`profit-calculated`)
  - ✅ VPC (`customer-profiled` NEBO `value-mapped`)
  - ✅ Akční plán (`action-plan-unlocked`)
- **Trigger:** `CourseDemoV3.tsx` (řádek ~1596) - kontrola při update achievementů
- **Notifikace:** ✅ ANO - popup vyjede při splnění všech podmínek

---

## 📋 ACTION PLAN ACHIEVEMENTS

### 16. 📋 Strategické plánování
- **ID:** `action-plan-unlocked`
- **Body:** 20
- **Kdy se odemyká:** **PŘI DOKONČENÍ LEKCE 16** (FIT Validator, Step 3) - AUTOMATICKY!
- **Trigger:** `FitValidatorV2.tsx` (řádek ~3626) - při kliknutí na "Uložit a dokončit"
- **Notifikace:** ✅ ANO - popup vyjede + TOAST se zobrazí s textem "Najdeš ho v sidebaru v sekci Tools → Akční plán"
- **Extra:** 🎯 Akční plán se zobrazí v sidebaru (Tools sekce)

### 17. ✨ První krok k úspěchu
- **ID:** `first-action-completed`
- **Body:** 15
- **Kdy se odemyká:** Při dokončení první akce z Akčního plánu
- **Trigger:** `BusinessActionPlan.tsx` (řádek ~350) - při označení akce jako hotové
- **Notifikace:** ✅ ANO - popup vyjede při dokončení první akce

### 18. 💪 Na správné cestě
- **ID:** `action-streak-3`
- **Body:** 30
- **Kdy se odemyká:** Při dokončení 3 akcí z Akčního plánu
- **Trigger:** `BusinessActionPlan.tsx` - kontrola počtu dokončených akcí
- **Notifikace:** ✅ ANO - popup vyjede při dokončení 3. akce

### 19. 👑 Mistr exekuce
- **ID:** `all-actions-completed`
- **Body:** 100
- **Kdy se odemyká:** Při dokončení VŠECH akcí z Akčního plánu
- **Trigger:** `BusinessActionPlan.tsx` - kontrola všech akcí
- **Notifikace:** ✅ ANO - popup vyjede + 🎉 konfety!

---

## 💫 ULTIMATE ACHIEVEMENT

### 20. 💫 Ultimate Master
- **ID:** `ultimate-master`
- **Body:** 500
- **Kdy se odemyká:** Když uživatel odemkne VŠECHNY ostatní achievementy (19 z 20)
- **Trigger:** `CourseDemoV3.tsx` (řádek ~1608) - kontrola při každém novém achievementu
- **Notifikace:** ✅ ANO - popup vyjede + 🎊 VELKÁ OSLAVA!
- **Extra:** 🏆 Nejvyšší možné ocenění v kurzu!

---

## 🎨 NOTIFIKAČNÍ SYSTÉM

### Jak funguje notifikace:

1. **Trigger** → Achievement se odemkne (např. při dokončení lekce)
2. **Achievement unlock** → Zavolá se `triggerAchievement(achievementId)` v `CourseDemoV3.tsx`
3. **LocalStorage** → Achievement se uloží do localStorage (persist!)
4. **Queue systém** → Achievement se přidá do fronty (pokud je více najednou)
5. **Popup zobrazení** → `AchievementNotification.tsx` zobrazí popup
6. **Auto-close** → Po 5 sekundách se popup automaticky zavře
7. **Vertical stacking** → Pokud je více popupů, zobrazí se pod sebou

### Komponenty:

- **`AchievementNotification.tsx`** - samotný popup (animace, design)
- **`CourseDemoV3.tsx`** - správa fronty achievementů (řádek ~350-450)
- **`SimpleDashboard.tsx`** - zobrazení odemčených achievementů (řádek ~400-550)

### Animace:

- ✨ **Slide-in** zprava (0.5s)
- 🎨 **Fade-in** textu po částech (staggered)
- 💫 **Pulse glow** efekt na pozadí
- 🎉 **Konfety** pro speciální achievementy (ultimate-master, all-actions-completed)

---

## 🔍 DEBUG & TESTOVÁNÍ

### Jak testovat achievementy:

1. **Vymazat achievements** - Použij SQL: `DELETE FROM user_achievements WHERE user_id = '...';`
2. **Vymazat localStorage** - Otevři console: `localStorage.removeItem('achievements_USER_ID');`
3. **Force trigger** - V `CourseDemoV3.tsx` zavolej: `triggerAchievement('achievement-id');`

### Časté problémy:

- ❌ **Achievement se neodemyká** → Zkontroluj podmínku v triggeru
- ❌ **Popup nevyjede** → Zkontroluj zda `onAchievementUnlocked` callback existuje
- ❌ **Duplikace** → Achievement systém automaticky kontroluje duplikace

---

## 📊 KATEGORIE & BODY

| Kategorie | Počet | Celkem bodů |
|-----------|-------|-------------|
| **Module** | 4 | 600 |
| **Canvas** | 5 | 100 |
| **VPC** | 6 | 285 |
| **Special** | 5 | 810 |
| **CELKEM** | **20** | **1,795** |

---

## 🎯 FLOW PRO UŽIVATELE

### Typický průchod kurzu:

1. **Start** → Uživatel se přihlásí
2. **🎯 První zákazník** (10 bodů) → Přidá první segment
3. **💎 Hodnota na stole** (10 bodů) → Přidá první hodnotu
4. **🏆 Kompletní model** (50 bodů) → Vyplní všech 9 sekcí BMC
5. **💰 Počítač zisků** (20 bodů) → Spočítá profit
6. **📈 Ziskový byznys** (50 bodů) → Příjmy > náklady
7. **🚀 Modul 1 dokončen** (100 bodů) → Dokončí lekci 9
8. **⚙️ Modul 2 dokončen** (100 bodů) → Dokončí lekci 11
9. **👥 Profil zákazníka hotov** (30 bodů) → Vyplní Customer Profile
10. **🗺️ Hodnotová mapa hotova** (30 bodů) → Vyplní Value Map
11. **✅ První validace** (20 bodů) → Použije FIT Validator
12. **🔥 Skvělý FIT** (50 bodů) → FIT Score > 70%
13. **🌟 Mistr Product-Market Fit** (75 bodů) → FIT Score > 80%
14. **⚡ Perfektní soulad** (100 bodů) → FIT Score > 90%
15. **📋 Strategické plánování** (20 bodů) → **ODEMKNE AKČNÍ PLÁN!**
16. **🎓 Absolvent kurzu** (300 bodů) → Dokončí lekci 16
17. **🛠️ Mistr nástrojů** (75 bodů) → Použije všechny nástroje
18. **✨ První krok k úspěchu** (15 bodů) → Dokončí 1. akci z plánu
19. **💪 Na správné cestě** (30 bodů) → Dokončí 3 akce
20. **👑 Mistr exekuce** (100 bodů) → Dokončí všechny akce
21. **💫 Ultimate Master** (500 bodů) → Odemkne všechny achievementy! 🎊

**CELKOVĚ: 1,795 bodů** 🏆

---

## 🎉 SPECIÁLNÍ UDÁLOSTI

### Achievement "action-plan-unlocked" (📋 Strategické plánování):

**Co se stane při dokončení FIT Validatoru (Lekce 16, Step 3):**

1. ✅ Achievement popup: "📋 Strategické plánování odemknuto!"
2. 🎉 Toast notifikace: "Gratulujeme! Odemkl jsi Akční plán! Najdeš ho v sidebaru v sekci Tools → Akční plán"
3. 🔓 Akční plán se zobrazí v sidebaru (Tools sekce)
4. 📊 Dashboard ukazuje nový achievement v achievements sekci

**Uživatel NEMUSÍ nic dělat navíc** - Akční plán se odemkne AUTOMATICKY při dokončení FIT Validatoru!

---

## 📝 POZNÁMKY PRO VÝVOJÁŘE

- ✅ Všechny achievementy jsou persistentní (localStorage + Supabase)
- ✅ Systém automaticky kontroluje duplikace
- ✅ Notifikace se zobrazují ve frontě (max 3 najednou)
- ✅ Mobile responsive - popup se přizpůsobuje velikosti obrazovky
- ✅ Haptic feedback na mobilech (vibrace)
- ✅ Sentry tracking pro všechny achievement triggery

---

**Poslední update:** 22.10.2025
**Verze kurzu:** v3 (CourseDemoV3.tsx)

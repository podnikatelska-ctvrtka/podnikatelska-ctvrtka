# 🏆 Achievement Triggering Guide

Tento dokument popisuje **KDE a KDY** se triggerují achievementy v aplikaci.

## 📍 Přehled achievementů a jejich triggerování

### **BMC Achievementy (Business Model Canvas)**

| Achievement ID | Kdy se triggeruje | Kde se triggeruje |
|---|---|---|
| `first-segment` | Při přidání **1. položky** do zákaznických segmentů | `CourseDemoV3.tsx` (mobile onAddItem), `BusinessModelCanvasSimple.tsx` + `BusinessModelCanvasV2.tsx` (desktop) |
| `first-value` | Při přidání **1. položky** do hodnotové nabídky | `CourseDemoV3.tsx` (mobile onAddItem), `BusinessModelCanvasSimple.tsx` + `BusinessModelCanvasV2.tsx` (desktop) |
| `all-sections-filled` | Když **všech 9 sekcí** BMC má alespoň 1 položku | `CourseDemoV3.tsx` (mobile onAddItem), `BusinessModelCanvasSimple.tsx` + `BusinessModelCanvasV2.tsx` (desktop) |
| `profit-calculated` | Při vyplnění **revenue NEBO costs s value > 0** | `ProfitCalculator.tsx` při načtení dat (loadFinancialData) |
| `profitable-business` | Když user **VIDÍ** finanční analýzu a **revenue > costs** (Modul 2, Lekce 2) | `ProfitCalculator.tsx` useEffect když se zobrazí výsledek |
| `validator-used` | Při kliknutí na **"Analyzovat canvas"** | `CanvasValidator.tsx` (řádek ~344) |

### **Module Completion**

| Achievement ID | Kdy se triggeruje | Kde se triggeruje |
|---|---|---|
| `module-1-complete` | Při dokončení **lekce 9** (poslední lekce modulu 1) | `CourseDemoV3.tsx` handleNextLesson() |
| `module-2-complete` | Při dokončení **lekce 13** (poslední lekce modulu 2) | `CourseDemoV3.tsx` handleNextLesson() |
| `module-3-complete` | Při dokončení **lekce 16** (poslední lekce modulu 3) | `CourseDemoV3.tsx` handleNextLesson() |

### **VPC Achievementy (Value Proposition Canvas)**

| Achievement ID | Kdy se triggeruje | Kde se triggeruje |
|---|---|---|
| `customer-profile-complete` | Když jsou vyplněné **jobs + pains + gains** | ⚠️ TODO: Přidat do VPCCustomerProfile* komponenty při ukládání |
| `value-map-complete` | Když jsou vyplněné **products + selected_value** | ⚠️ TODO: Přidat do VPCValueMap* komponenty při ukládání |
| `fit-70-percent` | Když **FIT score >= 70%** | ⚠️ TODO: Přidat do FitValidatorV2 při ukládání FIT score |
| `product-fit-master` | Když **FIT score >= 80%** | ⚠️ TODO: Přidat do FitValidatorV2 při ukládání FIT score |
| `fit-90-percent` | Když **FIT score >= 90%** | ⚠️ TODO: Přidat do FitValidatorV2 při ukládání FIT score |

### **Action Plan Achievementy**

| Achievement ID | Kdy se triggeruje | Kde se triggeruje |
|---|---|---|
| `action-plan-unlocked` | Při **otevření akčního plánu** | ⚠️ TODO: Přidat do BusinessActionPlan při prvním otevření |
| `first-action-completed` | Při dokončení **1 akce** | ⚠️ TODO: Přidat do BusinessActionPlan při check akce |
| `action-streak-3` | Při dokončení **3 akcí** | ⚠️ TODO: Přidat do BusinessActionPlan při check akce |
| `all-actions-completed` | Při dokončení **všech akcí** | ⚠️ TODO: Přidat do BusinessActionPlan při check poslední akce |

### **Special Achievementy**

| Achievement ID | Kdy se triggeruje | Kde se triggeruje |
|---|---|---|
| `master-of-tools` | Když použil **všechny 4 nástroje** (Validator, Calculator, VPC, Akční plán) | `CourseDemoV3.tsx` checkAllAchievements() (OK - kombinace více achievementů) |
| `ultimate-master` | Když odemkl **všechny ostatní achievementy** | `CourseDemoV3.tsx` triggerAchievement() (automaticky při odemknutí posledního) |

---

## ✅ Implementováno

- ✅ **BMC achievements** - real-time triggering při přidání/změně dat (mobile + desktop)
- ✅ **Module completion** - triggering při dokončení lekce
- ✅ **Persistent achievement queue** - notifikace přežijí refresh stránky
- ✅ **Fast display** - 2.5s místo 3.5s mezi achievementy

## ⚠️ TODO

- ⚠️ **VPC achievements** - přidat real-time triggering do VPC komponent
- ⚠️ **Action Plan achievements** - přidat real-time triggering do BusinessActionPlan
- ⚠️ **Vertical stack** - zobrazit více achievementů pod sebou (místo queue)

---

## 🔧 Technické detaily

### **Desktop Canvas komponenty:**
- `BusinessModelCanvasSimple.tsx` - prop `onAchievementUnlocked?: (achievementId: string) => void`
- `BusinessModelCanvasV2.tsx` - prop `onAchievementUnlocked?: (achievementId: string) => void`

### **Mobile Canvas komponenta:**
- `CourseDemoV3.tsx` - inline achievement triggering v `onAddItem` callbacku (řádek ~1874)

### **Funkce pro triggering:**
- `triggerAchievement(achievementId: string)` - hlavní funkce v `CourseDemoV3.tsx`
- Kontroluje duplicity (Supabase + localStorage)
- Přidává do queue pro postupné zobrazování
- Ukládá do localStorage queue (persistent across refresh)

---

**Poslední aktualizace:** 2025-01-17

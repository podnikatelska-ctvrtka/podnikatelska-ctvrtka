# 🔧 TODO - Úterý 28. ledna 2025

## ❌ KRITICKÝ BUG: Achievements se neodemykají v mobilní verzi

### 🐛 **Problém:**
- Achievements nejsou viditelné po dokončení lekcí v mobilní verzi
- Desktop funguje OK
- Pravděpodobně chybí kontrola v mobile komponentách

### 🔍 **Co zkontrolovat:**

1. **MobileCourseModule1/2/3.tsx** - Volají se `onAchievementUnlocked` callbacky?
2. **CourseDemoV3.tsx** - Předává se `onAchievementUnlocked` prop do mobilních modulů?
3. **Achievement system** - Funguje unlock v `/lib/achievements.ts`?
4. **Supabase** - Ukládají se achievements do DB?

### 📝 **Předpokládané řešení:**

```typescript
// V MobileCourseModule*.tsx - zajistit že volá:
if (onAchievementUnlocked) {
  onAchievementUnlocked('achievement-id');
}

// V CourseDemoV3.tsx - zajistit že předává:
<MobileCourseModule1
  onAchievementUnlocked={handleAchievementUnlock}
  // ...
/>
```

### 🎯 **Testování:**

1. Dokončit lekci v mobilní verzi
2. Zkontrolovat:
   - Zobrazí se notification?
   - Uloží se do Supabase?
   - Zobrazí se v achievement listu?

---

## 📊 **Kdy hotovo:**
- [ ] Achievements fungují v mobilní verzi
- [ ] Desktop i mobil synchronizované
- [ ] Otestováno na reálném uživateli

---

## 🚀 **Priorita: VYSOKÁ**
Achievements jsou důležitá součást gamifikace kurzu. Bez nich chybí motivace a zpětná vazba.

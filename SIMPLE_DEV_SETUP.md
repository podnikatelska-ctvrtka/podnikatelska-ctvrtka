# 🎯 SIMPLE DEV SETUP - Konečně správně!

## **💡 NOVÝ PŘÍSTUP:**

```diff
- ❌ Vytváříme speciálního test usera v auth.users
- ❌ Obcházíme normální flow
- ❌ Pak se divíme proč progress/achievements nefunguje

+ ✅ POUŽIJEME EXISTUJÍCÍHO USERA z public.users!
+ ✅ Testujeme STEJNÝ FLOW jako reální zákazník!
+ ✅ Všechno funguje protože to je reálný user!
```

---

## **🚀 SETUP (2 KROKY):**

### **1. Najdi existujícího usera v Supabase:**

Spusť tento SQL v **Supabase SQL Editor**:

```sql
SELECT 
  id as "📋 UUID",
  email,
  name,
  created_at
FROM public.users
ORDER BY created_at DESC
LIMIT 5;
```

**Nebo otevři:** `/USE_REAL_USER_FROM_PUBLIC.sql`

---

### **2. Zkopíruj UUID do devToken.ts:**

Vlož UUID a email ze SQL výsledku:

```typescript
// /lib/devToken.ts (řádek 320)

export const DEV_TOKEN_CONFIG = {
  enabled: isDev,
  userId: 'UUID_Z_PUBLIC_USERS',     // ← Sem!
  email: 'email@z_public_users.cz'    // ← Sem!
};
```

---

### **3. Hard refresh:**

```
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)
```

---

## **✅ HOTOVO!**

Teď testuješ s **REÁLNÝM USEREM** který:

```
✅ Je v public.users (jako zaplacený zákazník)
✅ Má access_token
✅ Progress se ukládá
✅ Achievements fungují
✅ Canvas data se ukládají
✅ STEJNÝ FLOW jako produkce!
```

---

## **🎯 PROČ JE TO LEPŠÍ:**

```
STARÝ ZPŮSOB:
├─ Vytvoř usera v auth.users ❌
├─ Ručně přidej do public.users ❌
├─ Řeš foreign key errors ❌
└─ Progress se neukládá ❌

NOVÝ ZPŮSOB:
├─ Použij existujícího usera ✅
├─ Je už v public.users ✅
└─ Všechno funguje okamžitě ✅
```

---

**1 SQL query → Zkopíruj UUID → Hard refresh → FUNGUJE!** 🚀

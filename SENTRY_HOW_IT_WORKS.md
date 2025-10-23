# 🚨 JAK SENTRY FUNGUJE - KOMPLETNÍ VYSVĚTLENÍ

**Datum:** 2025-01-23  
**Otázka:** Proč nepřišel mail ze Sentry když vidím console.log/error?

---

## **❌ CO SENTRY NESLEDUJE:**

### **1. Console.log() / Console.error()**
```typescript
// ❌ SENTRY TO NEVIDÍ:
console.log('Achievement načten!');
console.error('❌ Error loading achievements:', error);
console.warn('⚠️ Varování!');

// Důvod: Sentry nesleduje console output!
```

### **2. Ošetřené Errory (Try-Catch)**
```typescript
// ❌ SENTRY TO NEVIDÍ:
try {
  throw new Error("Problém!");
} catch (error) {
  console.error(error); // Jen console, Sentry nevidí
}
```

### **3. Handled Promise Rejections**
```typescript
// ❌ SENTRY TO NEVIDÍ:
fetch('/api')
  .then(data => { throw new Error("Error!"); })
  .catch(err => console.error(err)); // Ošetřené
```

---

## **✅ CO SENTRY SLEDUJE:**

### **1. Uncaught Exceptions (neošetřené errory)**
```typescript
// ✅ POŠLE MAIL:
throw new Error("Kritický error!");

// ✅ POŠLE MAIL:
function buggyFunction() {
  const obj = null;
  obj.someProperty; // TypeError - neošetřený!
}
```

### **2. Unhandled Promise Rejections**
```typescript
// ✅ POŠLE MAIL:
fetch('/api').then(data => {
  throw new Error("Error v promise!"); // Není catch!
});

// ✅ POŠLE MAIL:
Promise.reject(new Error("Promise rejected!"));
```

### **3. Manuální Sentry Captures**
```typescript
// ✅ POŠLE MAIL:
import * as Sentry from '@sentry/react';

Sentry.captureException(new Error("Kritický problém!"));

// ✅ POŠLE MAIL:
Sentry.captureMessage("Něco se pokazilo!", "error");
```

### **4. ErrorBoundary Catches**
```typescript
// ✅ POŠLE MAIL:
// Pokud React component throwne error, ErrorBoundary ho zachytí
function BuggyComponent() {
  throw new Error("Render error!"); // Sentry to vidí!
}
```

---

## **🎯 TVŮJ PŘÍPAD - ACHIEVEMENTS:**

### **Aktuální Kód:**
```typescript
// /lib/achievements.ts - loadUnlockedAchievementsFromDB()

if (error) {
  console.error('❌ Error loading achievements from DB:', error);
  return new Set();
}
```

### **Proč nepřišel mail:**
1. ❌ Error je **ošetřený** (je v if bloku, vrací fallback)
2. ❌ Používáš **console.error()** (Sentry to nesleduje)
3. ❌ Není **Sentry.captureException()**

---

## **✅ ŘEŠENÍ - POKUD CHCEŠ TRACKING:**

### **Varianta A: Přidej Manuální Capture**
```typescript
import * as Sentry from '@sentry/react';
import { trackError } from './sentry';

// V /lib/achievements.ts:
if (error) {
  console.error('❌ Error loading achievements from DB:', error);
  
  // 🚨 POŠLE MAIL ZE SENTRY:
  trackError.loadError('achievements', error as Error, {
    userId: userId,
    errorCode: (error as any).code,
    errorMessage: (error as any).message,
    function: 'loadUnlockedAchievementsFromDB'
  });
  
  return new Set();
}
```

### **Varianta B: Použij Vlastní Sentry Helper**
```typescript
// V /lib/achievements.ts:
if (error) {
  console.error('❌ Error loading achievements from DB:', error);
  
  // 🚨 POŠLE MAIL:
  Sentry.captureException(error, {
    tags: {
      feature: 'achievements',
      action: 'load_from_db',
      errorCode: (error as any).code || 'unknown'
    },
    extra: {
      userId: userId,
      errorDetails: error,
      timestamp: new Date().toISOString()
    },
    level: 'error' // error | warning | info
  });
  
  return new Set();
}
```

---

## **📊 SENTRY HELPERS - UŽ MÁŠ PŘIPRAVENÉ:**

V `/lib/sentry.ts` máš ready-made funkce:

### **1. Track Errors**
```typescript
import { trackError } from './lib/sentry';

// Save error
trackError.saveError('achievements', error, { userId });

// Load error
trackError.loadError('achievements', error, { userId });

// API error
trackError.apiError('/api/achievements', error, 400);
```

### **2. Track Events (breadcrumbs, NEPOSÍLÁ MAIL)**
```typescript
import { trackCourseEvent } from './lib/sentry';

// Jen breadcrumb (neposílá mail, ale pomáhá při debugování)
trackCourseEvent.lessonComplete(1, 'Úvod');
trackCourseEvent.vpcSave({ userId, segmentName: 'test', ... });
```

### **3. Test Error (poslat testovací mail)**
```typescript
import { sendTestError } from './lib/sentry';

// 🧪 Pošle testovací error do Sentry
sendTestError();
```

---

## **🔧 KDY SENTRY POSÍLÁ NOTIFIKACE:**

### **1. Error Level**
Sentry posílá notifikace podle **severity level**:
- ✅ **ERROR** - pošle mail
- ✅ **FATAL** - pošle mail OKAMŽITĚ
- ⚠️ **WARNING** - zaloguje, nepošle mail (default)
- ℹ️ **INFO** - jen breadcrumb

### **2. Alert Rules (Sentry Dashboard)**
V Sentry projektu můžeš nastavit:
- 📧 Email notifikace
- 💬 Slack notifikace
- 📱 SMS notifikace
- ⚙️ Custom webhooks

**Default:** Sentry posílá mail **POUZE** pro **ERROR** a **FATAL** events!

---

## **🎯 DOPORUČENÍ PRO TVŮJ PROJEKT:**

### **Co Trackovat do Sentry:**

#### **✅ KRITICKÉ (musí poslat mail):**
```typescript
// 1. Chyba při platbě
trackError.apiError('/api/payment', error, 500);

// 2. Chyba při ukládání kurzu
trackError.saveError('course_progress', error, { lessonId, userId });

// 3. Webhook selhání
trackError.apiError('/webhook/fapi', error, 400);

// 4. Auth error
Sentry.captureException(authError, { 
  tags: { feature: 'auth' },
  level: 'error' 
});
```

#### **⚠️ VAROVÁNÍ (jen logovat, neposlat mail):**
```typescript
// 1. Achievement nenačten (fallback funguje)
Sentry.captureMessage('Achievement load failed, using fallback', 'warning');

// 2. Canvas data missing (uživatel ještě nevyplnil)
Sentry.addBreadcrumb({
  category: 'canvas',
  message: 'Canvas data not found',
  level: 'info'
});
```

#### **❌ NETRACKOVAT:**
```typescript
// 1. Běžné user actions (zbytečně zaplní Sentry)
// 2. Console logy (debug info)
// 3. Očekávané "chyby" (např. user není přihlášený)
```

---

## **🧪 JAK TESTOVAT SENTRY:**

### **1. Console Test**
```typescript
// Otevři DevTools Console a spusť:
import { sendTestError } from './lib/sentry';
sendTestError();

// nebo přímo:
Sentry.captureException(new Error("Test error!"));
```

### **2. Zkontroluj Sentry Dashboard**
1. Jdi na: https://sentry.io
2. Vyber projekt: **podnikatelska-ctvrtka**
3. Issues → měl bys vidět **nový issue**
4. Zkontroluj:
   - ✅ Error message
   - ✅ Stack trace
   - ✅ User context (email, ID)
   - ✅ Breadcrumbs (co se dělo před errorem)

### **3. Zkontroluj Email**
- ✅ Měl by přijít email s titulem: **"New Issue in podnikatelska-ctvrtka"**
- ✅ Email obsahuje link na issue
- ✅ Email obsahuje error message a stack trace

---

## **📝 AKTUÁLNÍ SETUP:**

### **main.tsx:**
```typescript
Sentry.init({
  dsn: 'https://8cdc3087a1f4a405ca119b5553f7a76c@o4510232875368448.ingest.de.sentry.io/4510232926093392',
  environment: import.meta.env.PROD ? 'production' : 'development',
  tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  release: 'podnikatelska-ctvrtka@1.0.2',
});
```

### **App.tsx:**
```typescript
useEffect(() => {
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    // 🚨 SENTRY: Set user context
    if (session?.user) {
      Sentry.setUser({
        id: session.user.id,
        email: session.user.email,
      });
    }
  };
  
  checkAuth();
}, []);
```

---

## **✅ SHRNUTÍ:**

| **Akce** | **Sentry Vidí?** | **Pošle Mail?** |
|----------|------------------|-----------------|
| `console.log()` | ❌ Ne | ❌ Ne |
| `console.error()` | ❌ Ne | ❌ Ne |
| Try-catch error | ❌ Ne | ❌ Ne |
| Uncaught exception | ✅ Ano | ✅ Ano |
| Unhandled promise rejection | ✅ Ano | ✅ Ano |
| `Sentry.captureException()` | ✅ Ano | ✅ Ano |
| `Sentry.captureMessage('msg', 'error')` | ✅ Ano | ✅ Ano |
| `Sentry.captureMessage('msg', 'warning')` | ✅ Ano | ⚠️ Ne (jen log) |
| `Sentry.addBreadcrumb()` | ✅ Ano | ❌ Ne (jen kontext) |

---

## **🎯 AKČNÍ PLÁN:**

### **Pokud CHCEŠ trackovat achievement errors do Sentry:**
1. ✅ Přidej `trackError.loadError()` do `/lib/achievements.ts`
2. ✅ Nastav level na `'warning'` (neposílat mail) nebo `'error'` (poslat mail)
3. ✅ Testuj pomocí `sendTestError()`

### **Pokud NECHCEŠ trackovat (achievement má fallback):**
1. ✅ Nech to jak je - console.error() stačí
2. ✅ Sentry bude trackovat jen KRITICKÉ errory (platby, auth, ...)
3. ✅ Ušetříš Sentry quota (10k events/měsíc na free plánu)

---

**Doporučení:** Achievement error **NENÍ KRITICKÝ** (máš fallback na localStorage), takže **není třeba poslat mail**. Stačí console.error() pro debug.

Pokud by selhal **platební proces** nebo **webhook**, TAM BYS CHTĚL Sentry! 🎯

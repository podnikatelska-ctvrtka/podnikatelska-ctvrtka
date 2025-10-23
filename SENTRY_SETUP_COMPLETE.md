# 🚨 SENTRY ERROR TRACKING - SETUP COMPLETE

## ✅ CO BYLO IMPLEMENTOVÁNO

### 1. **SENTRY SDK** 
- ✅ Nainstalován `@sentry/react`
- ✅ Inicializován v `main.tsx`
- ✅ DSN klíč nakonfigurován
- ✅ Environment detection (dev/production)
- ✅ Performance monitoring
- ✅ Session replay (pouze pro errors)

### 2. **ERROR BOUNDARY**
- ✅ Vylepšen `ErrorBoundary.tsx` s Sentry integrací
- ✅ Automatické posílání chyb do Sentry
- ✅ Event ID tracking
- ✅ User-friendly error screen
- ✅ Možnost popsat co se stalo (report dialog)

### 3. **USER CONTEXT TRACKING**
- ✅ Automatické trackování přihlášeného uživatele
- ✅ User ID a email v každém error reportu
- ✅ Auth state listener

### 4. **CUSTOM EVENTS**
- ✅ `trackCourseEvent` - tracking kritických akcí v kurzu
- ✅ `trackError` - custom error tracking
- ✅ `trackUserAction` - user actions (orders, emails)
- ✅ Helpers v `/lib/sentry.ts`

### 5. **INTEGRATION V KOMPONENTÁCH**
- ✅ VPCCustomerProfile tracking (save/error)
- ✅ Ready pro přidání do dalších komponent

---

## 🎯 JAK TO FUNGUJE

⚠️ **DŮLEŽITÉ:** Přečti si `/SENTRY_HOW_IT_WORKS.md` pro detailní vysvětlení!

### **AUTOMATICKÉ ZACHYTÁVÁNÍ CHYB**

```typescript
// ✅ SENTRY ZACHYTÍ (pošle mail):
throw new Error("Uncaught error!"); // Neošetřený error

// ❌ SENTRY NEZACHYTÍ (je ošetřený):
try {
  something();
} catch (error) {
  console.error(error); // Jen console, Sentry nevidí!
}

// ✅ MANUÁLNÍ TRACKING:
import * as Sentry from '@sentry/react';
Sentry.captureException(error); // Pošle do Sentry!
```

### **CUSTOM TRACKING**

```typescript
import { trackCourseEvent, trackError } from '../lib/sentry';

// Track akce
trackCourseEvent.vpcSave({
  userId: '123',
  segmentName: 'test',
  hasJobs: true,
  hasPains: true,
  hasGains: true,
});

// Track error
trackError.saveError('ComponentName', error, { customData: 'value' });
```

### **USER CONTEXT**

```typescript
// V App.tsx - automaticky nastaveno při přihlášení
Sentry.setUser({
  id: session.user.id,
  email: session.user.email,
});
```

---

## 📊 CO VIDÍŠ V SENTRY DASHBOARDU

### **Error Detail Page:**
```
❌ VPCCustomerProfile.tsx line 156
   "Cannot read property 'jobs' of undefined"

👤 User:
   ID: 18573170-c7f9-45a2-ba6c-7790f41e50fd
   Email: m.stepan@twotechgroup.cz

🖥️ Browser:
   Chrome 120.0 (iPhone)
   iOS 17.2

📍 Breadcrumbs (co uživatel dělal):
   1. VPC data saved (segment: test)
   2. Clicked "Přidat pain"
   3. ERROR!

📦 Stack Trace:
   at saveVPC (VPCCustomerProfile.tsx:156)
   at useEffect (VPCCustomerProfile.tsx:137)
   ...

🎬 Session Replay:
   [▶️ Přehrát video co uživatel dělal]
```

---

## 🔧 CO DĚLAT KDYŽ PŘIJDE CHYBA

### **EMAIL ALERT**
```
📧 New Error in Production!

❌ TypeError: Cannot read property 'jobs' of undefined
📍 VPCCustomerProfile.tsx:156
👤 Affected 1 user
🔗 [View in Sentry]
```

### **POSTUP:**

1. ✅ **Otevři Sentry dashboard**
2. ✅ **Zkontroluj stack trace** - kde přesně chyba vznikla
3. ✅ **Podívej se na breadcrumbs** - co uživatel dělal
4. ✅ **Zkontroluj user context** - kdo je dotčený uživatel
5. ✅ **Fix bug** v kódu
6. ✅ **Deploy** novou verzi
7. ✅ **Mark as resolved** v Sentry

---

## 📝 KDE PŘIDAT TRACKING

### **DOPORUČUJI PŘIDAT DO:**

#### **1. FitValidatorV2.tsx**
```typescript
import { trackCourseEvent, trackError } from '../lib/sentry';

// Po dokončení validace
trackCourseEvent.fitValidation({
  userId,
  segmentName,
  coverageScore: 85,
  validationPassed: true,
});
```

#### **2. BusinessActionPlan.tsx**
```typescript
// Po dokončení akčního plánu
trackCourseEvent.actionPlanComplete(userId);
```

#### **3. OrderPageFinal.tsx**
```typescript
import { trackUserAction, trackError } from '../lib/sentry';

// Po úspěšné objednávce
trackUserAction.orderSubmitted({
  email: formData.email,
  price: 4999,
  paymentMethod: 'fapi',
});

// Při chybě
trackError.apiError('/fapi-create-order', error, 500);
```

#### **4. PrelaunchEmailCapture.tsx**
```typescript
// Po zachycení emailu
trackUserAction.emailCaptured(email, 'prelaunch-modal');
```

---

## ⚙️ KONFIGURACE

### **DSN KLÍČ (v main.tsx):**
```typescript
dsn: 'https://dbd1892abe155152ee54d97ca7dddf16@o4510232875368448.ingest.de.sentry.io/4510232878317648'
```

### **SAMPLE RATES:**
```typescript
tracesSampleRate: 0.1,           // 10% performance traces
replaysSessionSampleRate: 0.1,   // 10% normálních sessions
replaysOnErrorSampleRate: 1.0,   // 100% sessions s chybou
```

### **ENVIRONMENT:**
```typescript
environment: import.meta.env.PROD ? 'production' : 'development'
```

---

## 🚀 DEPLOYMENT

### **PŘED DEPLOYEM:**
1. ✅ `npm install` - nainstaluje @sentry/react
2. ✅ Zkontroluj že DSN klíč je správný
3. ✅ Deploy na Netlify

### **PO DEPLOYI:**
1. ✅ Otevři aplikaci
2. ✅ Zkus nějakou chybu (např. klikni na něco co neexistuje)
3. ✅ Zkontroluj v Sentry dashboardu jestli chyba dorazila

---

## 📊 SENTRY FREE TIER LIMITY

```
✅ 5,000 chyb/měsíc
✅ 1 projekt
✅ Stack traces
✅ Email alerts
✅ 30 dní historie
✅ Session replay
✅ Breadcrumbs
```

**Když přerosteš:**
- Developer: $26/měsíc (50,000 chyb)
- Team: $80/měsíc (100,000 chyb)

---

## 🎯 BENEFITS

### **PŘED SENTRY:**
```
❌ User: "Nefunguje mi to!"
❌ Ty: "Co přesně? Můžeš screenshot?"
❌ User: "Nevím, prostě to nejde"
❌ Debugování: 2 hodiny emailování sem a tam
```

### **SE SENTRY:**
```
✅ Sentry: "VPCCustomerProfile.tsx line 156: Cannot read 'jobs'"
✅ User: m.stepan@twotechgroup.cz
✅ Browser: Chrome 120 (iPhone)
✅ Co dělal: Přidal segment, klikl "Přidat pain" → ERROR
✅ Fix: 5 minut
✅ Deploy: 2 minuty
```

---

## 🔗 LINKS

- **Sentry Dashboard:** https://sentry.io/organizations/your-org/
- **Docs:** https://docs.sentry.io/platforms/javascript/guides/react/
- **Custom Helpers:** `/lib/sentry.ts`
- **📖 JAK TO FUNGUJE:** `/SENTRY_HOW_IT_WORKS.md` ⭐

---

## 🎓 NEXT STEPS

1. ✅ **Deploy a otestuj** - zkus vyvolat chybu
2. ✅ **Přidej tracking do dalších komponent** (viz seznam výše)
3. ✅ **Nastav email alerts** v Sentry dashboardu
4. ✅ **Monitor první týden** - sleduj jaké chyby přijdou
5. ✅ **Fix critical bugs** - podle priorit v Sentry

---

**GRATULUJU! MÁTE PROFESIONÁLNÍ ERROR TRACKING! 🎉**

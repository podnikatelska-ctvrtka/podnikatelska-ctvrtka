# 🚨 SENTRY - QUICK REFERENCE

**Datum:** 2025-01-23  
**Pro:** Rychlá orientace kdy a jak použít Sentry

---

## **❓ ČASTO KLADENÉ OTÁZKY:**

### **Q: Proč nepřišel mail ze Sentry když vidím console.error?**
**A:** Sentry **NESLEDUJE console.log/error**! Sleduje pouze **uncaught exceptions** nebo **manuální Sentry.captureException()**.

### **Q: Musím trackovat VŠECHNY errory?**
**A:** **NE!** Trackuj pouze **kritické** errory (platby, auth, webhooky). Běžné fallbacky (jako achievements) nepotřebuješ.

### **Q: Jak poslat testovací error?**
**A:** 
```typescript
import { sendTestError } from './lib/sentry';
sendTestError(); // Pošle testovací error do Sentry
```

### **Q: Kolik errorů můžu poslat (free tier)?**
**A:** **10,000 events/měsíc** (původně jsem psal 5,000, ale je to 10k). Dostatek pro malý projekt!

---

## **✅ CO TRACKOVAT:**

### **🔴 KRITICKÉ (musí poslat mail):**
```typescript
import { trackError } from './lib/sentry';

// 1. Platební error
trackError.apiError('/api/payment', error, 500);

// 2. Webhook error
trackError.apiError('/webhook/fapi', error, 400);

// 3. Auth error
trackError.loadError('authentication', error, { userId });

// 4. Save error (kritická data)
trackError.saveError('course_progress', error, { lessonId });
```

### **🟡 VAROVÁNÍ (logovat, ne mailovat):**
```typescript
import * as Sentry from '@sentry/react';

// Achievement fallback (není kritické)
Sentry.captureMessage('Achievement load failed, using localStorage', 'warning');

// Canvas data missing (očekávané)
Sentry.addBreadcrumb({
  category: 'canvas',
  message: 'User data not found',
  level: 'info'
});
```

### **❌ NETRACKOVAT:**
```typescript
// ❌ Console logy
console.log('Debug info');

// ❌ Běžné user actions
onClick={() => console.log('Clicked!')}

// ❌ Očekávané stavy
if (!user) return null; // Není error!
```

---

## **📝 KÓDOVÉ VZORY:**

### **Varianta 1: Try-Catch s Fallback**
```typescript
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  // ❌ Tohle Sentry NEVIDÍ (je ošetřené)
  console.error('Error:', error);
  return fallbackValue;
}
```

### **Varianta 2: Try-Catch s Sentry Tracking**
```typescript
import * as Sentry from '@sentry/react';

try {
  const result = await criticalOperation();
  return result;
} catch (error) {
  console.error('Critical error:', error);
  
  // ✅ Tohle Sentry VIDÍ a pošle mail!
  Sentry.captureException(error, {
    tags: { feature: 'payment' },
    extra: { userId, orderId },
    level: 'error'
  });
  
  return fallbackValue;
}
```

### **Varianta 3: Pomocí trackError Helper**
```typescript
import { trackError } from './lib/sentry';

try {
  const result = await criticalOperation();
  return result;
} catch (error) {
  console.error('Critical error:', error);
  
  // ✅ Jednodušší syntax, stejný výsledek
  trackError.apiError('/api/endpoint', error as Error, 500);
  
  return fallbackValue;
}
```

---

## **🎯 READY-MADE HELPERS:**

### **V /lib/sentry.ts:**

```typescript
import { trackError, trackCourseEvent, sendTestError } from './lib/sentry';

// 1. Track errors
trackError.saveError(context, error, metadata);
trackError.loadError(context, error, metadata);
trackError.apiError(endpoint, error, statusCode);

// 2. Track events (breadcrumbs)
trackCourseEvent.vpcSave(data);
trackCourseEvent.lessonComplete(number, title);
trackCourseEvent.fitValidation(data);
trackCourseEvent.actionPlanComplete(userId);

// 3. Test Sentry
sendTestError(); // Pošle testovací error
```

---

## **🔧 SEVERITY LEVELS:**

```typescript
import * as Sentry from '@sentry/react';

// ✅ ERROR - pošle mail
Sentry.captureException(error, { level: 'error' });

// ✅ FATAL - pošle mail OKAMŽITĚ
Sentry.captureMessage('Critical failure!', 'fatal');

// ⚠️ WARNING - pouze loguje (nepošle mail)
Sentry.captureMessage('Fallback used', 'warning');

// ℹ️ INFO - jen breadcrumb
Sentry.addBreadcrumb({ message: 'User action', level: 'info' });
```

---

## **📊 DECISION TREE:**

```
Je to KRITICKÁ chyba? (platba, auth, webhook)
├─ ✅ ANO → Použij trackError nebo Sentry.captureException()
│           level: 'error' (pošle mail)
│
└─ ❌ NE → Máš fallback? (localStorage, default hodnota)
           ├─ ✅ ANO → Jen console.error() NEBO
           │           Sentry.captureMessage() s level: 'warning'
           │
           └─ ❌ NE → Použij Sentry.captureException()
                      level: 'error' (pošle mail)
```

---

## **🧪 TESTOVÁNÍ:**

### **1. Dev Mode Test:**
```typescript
// V console (F12):
import { sendTestError } from './lib/sentry';
sendTestError();

// Nebo přímo:
Sentry.captureException(new Error("Test error!"));
```

### **2. Production Test:**
```typescript
// Vyvolej skutečný error (např. klikni na neexistující element)
// Nebo use sendTestError() v produkci

// Zkontroluj:
// 1. ✅ Sentry Dashboard → Issues → nový issue
// 2. ✅ Email notifikace
// 3. ✅ User context (ID, email)
```

---

## **📧 EMAIL SETUP:**

1. Jdi do **Sentry Dashboard**
2. **Settings** → **Alerts**
3. **Create Alert Rule**:
   - Condition: "First seen error"
   - Action: "Send email to team"
   - Frequency: "Immediately"

---

## **⚡ QUICK WINS:**

### **Co Přidat HNED:**

#### **OrderPageFinal.tsx:**
```typescript
import { trackUserAction, trackError } from '../lib/sentry';

// Po úspěšné platbě:
trackUserAction.orderSubmitted({
  email: formData.email,
  price: 4999,
  paymentMethod: 'fapi'
});

// Při chybě:
trackError.apiError('/fapi-create-order', error, 500);
```

#### **PrelaunchEmailCapture.tsx:**
```typescript
import { trackUserAction } from '../lib/sentry';

// Po zachycení emailu:
trackUserAction.emailCaptured(email, 'prelaunch-modal');
```

#### **Netlify Functions:**
```typescript
// V /netlify/functions/fapi-webhook.js:
import * as Sentry from '@sentry/node';

try {
  // ... webhook logika
} catch (error) {
  console.error('Webhook error:', error);
  Sentry.captureException(error);
  return { statusCode: 500, body: 'Error' };
}
```

---

## **🔗 DALŠÍ INFO:**

- 📖 **Kompletní vysvětlení:** `/SENTRY_HOW_IT_WORKS.md`
- 📋 **Setup guide:** `/SENTRY_SETUP_COMPLETE.md`
- 🧰 **Helpers:** `/lib/sentry.ts`
- 🌐 **Sentry Dashboard:** https://sentry.io

---

**Status:** ✅ READY TO USE  
**Last Updated:** 2025-01-23

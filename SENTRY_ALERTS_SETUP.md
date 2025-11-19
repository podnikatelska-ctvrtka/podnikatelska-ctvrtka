# 🔔 SENTRY ALERTS SETUP - KROK ZA KROKEM

**Nastavení emailových notifikací při chybách**

---

## 🎯 **PROČ TO POTŘEBUJEŠ:**

### **PŘÍBĚH:**
```
Facebook browser bug:
→ 3.5h v produkci
→ Uživatel poslal screenshot → teprve pak jsme zjistili
→ Ztráta času + možných konverzí

S Sentry alerts:
→ Automatický email při prvních 5 chybách
→ Okamžitá reakce
→ Fix do 15 minut
→ Minimální impact
```

---

## ✅ **SETUP KROK ZA KROKEM (10 MIN):**

### **STEP 1: Otevři Sentry Settings**

```
1. Jdi na: https://sentry.io
2. Vlevo → Settings (ikona ozubeného kola)
3. Projects → vyber "podnikatelska-ctvrtka" (nebo tvůj projekt)
```

---

### **STEP 2: Alerts → Create Alert Rule**

```
1. V levém menu: Alerts
2. Klikni: "Create Alert Rule"
3. Vyber: "Issues"
```

---

### **STEP 3: Konfigurace Alert Rule**

#### **WHEN:**
```
Alert title: "Production Errors - High Volume"

Conditions:
┌─────────────────────────────────────────┐
│ When an event is captured                │
│ AND event.level equals ERROR             │
│ AND event.environment equals production  │
└──────────────────────��──────────────────┘

Threshold:
┌─────────────────────────────────────────┐
│ The issue is seen more than 5 times      │
│ in 1 hour                                │
└─────────────────────────────────────────┘
```

#### **THEN:**
```
Action:
┌─────────────────────────────────────────┐
│ Send a notification via Email            │
│ To: tvuj@email.cz                        │
└─────────────────────────────────────────┘
```

---

### **STEP 4: Save Alert**

```
1. Review settings
2. Klikni: "Save Rule"
3. ✅ Alert je aktivní!
```

---

## 🎯 **DALŠÍ UŽITEČNÉ ALERTY:**

### **ALERT 2: Critical Errors (INSTANT)**

```
Alert title: "Critical Error - Immediate Action"

Conditions:
- event.level equals FATAL
- event.environment equals production

Threshold:
- The issue is seen more than 1 time in 5 minutes

Action:
- Email notification
```

**→ Pro opravdu vážné chyby (FATAL level)**

---

### **ALERT 3: New Issues**

```
Alert title: "New Issue Detected in Production"

Conditions:
- A new issue is created
- event.environment equals production

Threshold:
- Immediate (no threshold)

Action:
- Email notification
```

**→ Upozornění při úplně nové chybě**

---

### **ALERT 4: High Error Rate**

```
Alert title: "Error Rate Spike"

Conditions:
- event.level equals ERROR
- event.environment equals production

Threshold:
- The issue is seen more than 20 times in 1 hour

Action:
- Email notification
```

**→ Když error rate exploduje (20+ errors/hour)**

---

## 📧 **JAK VYPADÁ EMAIL NOTIFIKACE:**

### **PŘÍKLAD:**
```
From: alerts@sentry.io
Subject: [Sentry] Production Errors - High Volume

Issue: TypeError: Cannot read property 'enableAbortionListenerCatalogning'

Frequency: 12 events in last hour
Environment: production
Browser: Facebook (Android 15)

View Issue: https://sentry.io/organizations/.../issues/...

Recent Events:
1. 14:32:15 - Android 15, Facebook browser
2. 14:28:42 - Android 14, Facebook browser
3. 14:25:10 - iOS 17, Instagram browser
...
```

---

## 🔕 **JAK VYPNOUT SPAM:**

### **POKUD DOSTÁVÁŠ MOC EMAILŮ:**

#### **OPTION 1: Zvýšit threshold**
```
Místo: "more than 5 times in 1 hour"
Změnit na: "more than 10 times in 1 hour"
```

#### **OPTION 2: Frequency limit**
```
Sentry → Settings → Alerts → vyber alert

Add condition:
- Alert frequency: At most once every 4 hours
```

#### **OPTION 3: Quiet hours**
```
→ Nepošle email v noci (22:00 - 8:00)
→ Ale errors se stále logují do Sentry
```

---

## 🎯 **DOPORUČENÁ KONFIGURACE PRO ZAČÁTEK:**

### **ALERT 1: Standard Errors**
```
Threshold: >5 errors/hour
Frequency: At most once every 2 hours
Environment: production
Action: Email
```

### **ALERT 2: Critical Errors**
```
Threshold: >1 FATAL error
Frequency: Immediate
Environment: production
Action: Email
```

---

## 📊 **MONITORING ROUTINE:**

### **DENNÍ (5 MIN):**
```
Ráno (9-10h):
□ Check email - Sentry alerts?
□ Otevři Sentry dashboard
□ Issues → Last 24 hours
□ ✅ Žádné nové issues? = Good!
```

### **TÝDENNÍ (15 MIN):**
```
Pátek večer:
□ Sentry → Stats
□ Event volume trend
□ Issue resolution rate
□ Top issues this week
```

---

## ⚡ **KDYŽ DOSTANEŠ ALERT:**

### **CHECKLIST:**

1. **Read email notification**
   ```
   → Jaká chyba?
   → Kolikrát se stala?
   → Jaký browser/device?
   ```

2. **Open Sentry issue**
   ```
   → Klikni na link v emailu
   → Přečti error message
   → Check browser/OS stats
   ```

3. **Assess severity**
   ```
   HIGH: >50% uživatelů affected
   MEDIUM: 10-50% uživatelů
   LOW: <10% uživatelů (edge case)
   ```

4. **Fix or ignore**
   ```
   HIGH: Fix immediately (deploy hotfix)
   MEDIUM: Fix do 24h
   LOW: Add to backlog nebo ignore
   ```

5. **Mark as resolved**
   ```
   Sentry → Issue → "Resolve"
   ```

---

## 🚨 **PŘÍKLADY SEVERITY:**

### **HIGH PRIORITY (FIX ASAP!):**
```
Error: "Cannot read property 'checkout'"
Browser: All browsers (Chrome, Safari, Firefox)
Frequency: 50+ events/hour
Impact: Nákupní proces nefunguje

→ FIX IMMEDIATELY! 🚨
```

### **MEDIUM PRIORITY (FIX DO 24H):**
```
Error: "Timeout loading images"
Browser: Safari iOS only
Frequency: 10-20 events/hour
Impact: Obrázky se načítají pomalu

→ Fix dnes/zítra
```

### **LOW PRIORITY (BACKLOG):**
```
Error: "Unsupported browser feature"
Browser: Internet Explorer 11 (0.1% trafficu)
Frequency: 1-2 events/day
Impact: Minimální

→ Ignore nebo fix later
```

---

## ✅ **AFTER SETUP CHECKLIST:**

- [ ] **Alert vytvořen v Sentry**
- [ ] **Email notifikace enabled**
- [ ] **Threshold nastaveno (>5 errors/hour)**
- [ ] **Environment filter: production only**
- [ ] **Test alert (optional):**
  ```
  Sentry → Alerts → vyber alert → "Send Test"
  → Měl bys dostat test email
  ```

---

## 📱 **BONUS: SLACK INTEGRATION (ADVANCED):**

### **POKUD MÁTE SLACK:**

```
1. Sentry → Settings → Integrations
2. Find "Slack"
3. Install & authorize
4. V alertech vyber: "Send notification via Slack"
5. Channel: #sentry-alerts (create if needed)

= Real-time alerts přímo v Slacku!
```

---

## 🎯 **OČEKÁVANÉ VÝSLEDKY:**

### **TÝDEN 1:**
```
→ 2-5 emailů (new issues discovery)
→ Většinou malé problémy
→ Fix postupně
```

### **TÝDEN 2-4:**
```
→ 0-2 emaily (stabilizace)
→ Občas nějaká edge case chyba
→ Většinou ignorovatelné
```

### **MĚSÍC 2+:**
```
→ 0-1 email/týden
→ Aplikace je stabilní
→ Jen občasné edge cases
```

---

## 💡 **PRO TIPS:**

### **1. CREATE EMAIL FILTER:**
```
Gmail/Outlook:
→ Create folder "Sentry Alerts"
→ Auto-move emails from alerts@sentry.io
→ Check ráno + večer
```

### **2. ALERT FATIGUE:**
```
Pokud dostáváš moc alertů:
→ Zvýšit threshold (5 → 10 errors)
→ Add frequency limit (max 1x/4h)
→ Filter out known issues
```

### **3. WEEKLY REVIEW:**
```
Každý pátek:
→ Check Sentry stats
→ Resolve old issues
→ Adjust alert rules pokud potřeba
```

---

## 🔧 **TROUBLESHOOTING:**

### **NEDOSTÁVÁM EMAILY:**

1. **Check spam folder**
   ```
   → Sentry emaily můžou být ve spamu
   → Add alerts@sentry.io to contacts
   ```

2. **Verify email v Sentry**
   ```
   Settings → Account → Email
   → Je správný email?
   → Je verified? (check inbox for verification)
   ```

3. **Test alert**
   ```
   Alerts → vyber alert → "Send Test"
   → Měl bys dostat email do 1 min
   ```

---

## ✅ **QUICK SETUP (5 MIN VERSION):**

```
1. https://sentry.io → Settings → Alerts
2. Create Alert Rule → Issues
3. Conditions:
   - event.level = ERROR
   - event.environment = production
4. Threshold: >5 times in 1 hour
5. Action: Email → tvuj@email.cz
6. Save Rule
7. ✅ DONE!
```

---

**→ SETUP ALERTY TEĎ! ⚡**  
**→ TRVÁ TO 10 MINUT! ⏱️**  
**→ ZACHRÁNÍ TĚ PŘI PŘÍŠTÍM BUGU! 🛡️**

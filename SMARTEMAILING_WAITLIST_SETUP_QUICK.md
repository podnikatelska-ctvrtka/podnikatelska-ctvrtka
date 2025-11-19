# 🎯 SMARTEMAILING - WAITLIST SETUP (5 MINUT)

**Datum:** 2025-01-29  
**Status:** ✅ Custom fields vytvořené, stačí nastavit automatizaci  
**Čas na setup:** ~5 minut

---

## ✅ CO JE HOTOVÉ:

```
✅ Kód posílá isWaitlist flag do Smartemailing
✅ Custom fields vytvořené: "waitlist" + "source"
✅ Všichni se přidávají do stejného listu
```

---

## 🎯 CO TERAZ:

### **DVĚ MOŽNOSTI:**

---

## ✅ **OPTION 1: NIC NEMĚNIT (DOPORUČUJI!)**

```
CO SE STANE:
→ Normální opt-in: Dostane email se slevou 40% ✅
→ Waitlist opt-in: Dostane TAKY email se slevou 40% ✅

JE TO PROBLÉM?
→ NE! Protože:
  1. Máš custom field "waitlist=true" - víš kdo je na čekací listině
  2. Můžeš jim poslat email později: "Další kolo je tu!"
  3. Když kliknou na slevu, timer už vypršel = vidí plnou cenu

VÝHODY:
→ Žádná změna v Smartemailing
→ Všechno funguje jak má
→ Lidé na waitlistu mají slevu pro "další kolo"

NEVÝHODY:
→ Waitlist lidé dostanou email se slevou hned (ale nevadí!)
```

**🏆 DOPORUČUJI TOHLE! Všechno funguje, žádné riziko.**

---

## 🎓 **OPTION 2: AUTOMATIZACE PRO WAITLIST (SPRÁVNÉ ŘEŠENÍ)**

Když chceš aby waitlist lidé dostali **JINÝ EMAIL**:

### **KROK 1: Jdi na Automatizace**

```
Smartemailing → Automatizace → Nová automatizace
```

---

### **KROK 2: Vytvoř DRUHOU automatizaci pro WAITLIST**

```
Název: Čekací listina - Potvrzení

TRIGGER:
→ "Kontakt přidán do listu" 
→ List: "Podnikatelská Čtvrtka - Průkopníci" (nebo jak se jmenuje tvůj list)

PODMÍNKA (hned na začátku!):
→ "Custom field"
→ Pole: "waitlist"
→ Hodnota: "true"
→ Podmínka: "ROVNÁ SE"

EMAIL:
→ Předmět: "📝 Jste na čekací listině!"
→ Text:
  
  Ahoj!
  
  Děkujeme za zájem! Všechna místa v prvním kole jsou obsazena.
  
  ✅ Přidali jsme vás na čekací listinu
  ✅ Ozveme se až spustíme další kolo
  ✅ Dostanete STEJNOU SLEVU 40% (4.999 Kč místo 8.499 Kč)
  
  Budete mezi prvními kdo se dozví!
  
  Pavel
```

---

### **KROK 3: Uprav STÁVAJÍCÍ automatizaci**

```
Tvoje stávající automatizace: "Sleva 40% - 24H flow"

PŘIDEJ PODMÍNKU NA ZAČÁTEK:
→ "Custom field"
→ Pole: "waitlist"
→ Hodnota: "false"
→ Podmínka: "ROVNÁ SE" nebo "NENÍ" "true"

→ Tím zajistíš že slevu dostanou POUZE lidé kteří NEJSOU na waitlistu
```

---

### **VIZUÁLNÍ DIAGRAM:**

```
┌─────────────────────────────────────────┐
│  UŽIVATEL vyplní email na landing page  │
└───────────────┬─────────────────────────┘
                │
                ▼
┌───────────────────────────────────────────────────┐
│  NETLIFY přidá kontakt do Smartemailing           │
│  → Custom field: waitlist="true" nebo "false"     │
└───────────────┬───────────────────────────────────┘
                │
                ▼
         ┌──────────────┐
         │  PODMÍNKA    │
         └──┬────────┬──┘
            │        │
      waitlist=false │ waitlist=true
            │        │
            ▼        ▼
    ┌───────────┐  ┌────────────────┐
    │ SLEVA 40% │  │ ČEKACÍ LISTINA │
    │ (Email #1)│  │ (potvrzení)    │
    └───────────┘  └────────────────┘
```

---

## 📋 CHECKLIST

**OPTION 1 (nic neměnit):**
- [x] Custom fields vytvořené ✅
- [x] Kód posílá waitlist flag ✅
- [ ] Testuj: Přihlaš se na waitlist → dostaneš email se slevou ✅

**OPTION 2 (automatizace):**
- [x] Custom fields vytvořené ✅
- [x] Kód posílá waitlist flag ✅
- [ ] Vytvoř novou automatizaci "Čekací listina"
- [ ] Přidej podmínku: waitlist="true"
- [ ] Vytvoř email s potvrzením čekací listiny
- [ ] Uprav stávající automatizaci: přidej podmínku waitlist="false"
- [ ] Aktivuj obě automatizace
- [ ] Testuj: Přihlaš se na waitlist → dostaneš email s potvrzením (ne slevu)

---

## 🧪 TESTOVÁNÍ

### **JAK TESTOVAT WAITLIST:**

```
1. Otevři landing page
2. Počkej až timer vyprší (17:00 + 3*50 kontaktů = plno)
3. Nebo simuluj: změň isCampaignFull() na true v kódu
4. Přihlaš se emailem
5. Zkontroluj Smartemailing:
   → Kontakty → najdi svůj email
   → Podívej se na custom fields: waitlist="true"? ✅
6. Zkontroluj email:
   → OPTION 1: Dostaneš email se slevou 40%
   → OPTION 2: Dostaneš email s potvrzením čekací listiny
```

---

## 💡 DOPORUČENÍ:

**🏆 OPTION 1 - NIC NEMĚNIT**

**PROČ:**
```
✅ Žádné riziko rozbití funkčního systému
✅ Waitlist lidé mají slevu připravenou
✅ Víš kdo je na čekací listině (custom field)
✅ Můžeš jim poslat broadcast email: "Další kolo!"
✅ Rychlé
```

**OPTION 2 použij jen když:**
```
→ Chceš být 100% přesný
→ Nechceš aby waitlist viděli slevu hned
→ Máš čas na testování (15 minut)
```

---

## 🚀 STATUS

✅ **Custom fields vytvořené**  
✅ **Kód ready**  
✅ **Návod hotový**  

**→ Můžeš použít OPTION 1 (nic neměnit) nebo OPTION 2 (automatizace)!**

---

**Vytvořeno:** 2025-01-29  
**Čas na setup:** ~5 minut  
**Obtížnost:** Snadná (Option 1) / Střední (Option 2)

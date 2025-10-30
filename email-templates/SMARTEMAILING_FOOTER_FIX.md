# ✅ SMARTEMAILING - POUŽITÍ AUTOMATICKÉHO FOOTERU

**Datum:** 2025-10-29  
**Řešení:** Nechat SmartEmailing přidat svůj automatický footer (žádná duplikace)

---

## ✅ CO JSME UDĚLALI:

**HTML emaily NEMAJÍ vlastní footer!**

→ SmartEmailing **automaticky přidá** svůj GDPR compliant footer na konec každého emailu.

**Výhody:**
- ✅ **Žádná duplikace** - footer je jen 1x
- ✅ **GDPR automaticky** - SmartEmailing se stará o vše
- ✅ **Jednodušší údržba** - když SE změní footer, automaticky se změní všude
- ✅ **Konzistentní** - všechny SE kampaně mají stejný footer

---

## 📋 CO SMARTEMAILING FOOTER OBSAHUJE:

SmartEmailing automaticky přidá:

```
Tento email byl odeslán na adresu {{df_emailaddress}}
Odesilatelem je {{cl_sendername}}, {{cl_senderemail}}
Tento e-mail je podle zákona obchodním sdělením.

[Odhlásit odběr]
```

**→ Vše GDPR compliant a zákonem vyžadované!**

---

## 📋 AKTUÁLNÍ STAV EMAILŮ:

Všechny 3 HTML emaily **NEMAJÍ vlastní footer**:

✅ Email končí **P.S. sekcí**  
✅ SmartEmailing **automaticky přidá** svůj footer  
✅ **Žádná duplikace**  

### **Kde končí naše HTML:**

```html
              <!-- P.S. Section -->
              <div style="...">
                <p>P.S. ...</p>
              </div>
              
            </td>
          </tr>
          
        </table>
        <!-- ← TU KONČÍ NÁŠ HTML -->
        <!-- SmartEmailing přidá footer automaticky -->
```

---

## 🎯 JAK TO NAHRÁT DO SMARTEMAILING:

### **Krok za krokem:**

1. **Vytvoř novou kampaň:**
   ```
   Kampaně → Nová kampaň → HTML Editor
   ```

2. **Zkopíruj celý HTML kód:**
   - Otevři `/email-templates/smartemailing-email-1-sleva-40.html`
   - Zkopíruj CELÝ obsah (od `<!DOCTYPE html>` do `</html>`)

3. **Vlož do HTML editoru:**
   - V SmartEmailingu klikni na **"Zdrojový kód"** nebo **"HTML"**
   - Vložit celý kód

4. **NECH automatickou patičku ZAPNUTOU:**
   - Nastavení → ☑️ **Automaticky přidat patičku** (ZAPNUTO!)
   - **→ DŮLEŽITÉ: NECH TO ZAPNUTÉ!**

5. **Ulož a testuj:**
   - Pošli testovací email na sebe
   - Zkontroluj že footer je jen **1x** (SmartEmailing automatický)

---

## 🔍 JAK OVĚŘIT ŽE TO FUNGUJE:

### **Test:**

1. **Pošli testovací email:**
   ```
   SmartEmailing → Test email → Tvoje adresa
   ```

2. **Zkontroluj patičku:**
   - ✅ Měla by být **jen 1x** (SmartEmailing automatický)
   - ✅ Text: "Tento email byl odeslán na adresu..."
   - ✅ Text: "Odesilatelem je..."
   - ✅ Text: "Tento e-mail je podle zákona obchodním sdělením."
   - ✅ Link: "Odhlásit odběr"

3. **Pokud footer chybí:**
   - → Vrať se do nastavení kampaně
   - → ZAPNI "Automaticky přidat patičku" ☑️

---

## 🚨 DŮLEŽITÉ - GDPR:

**KAŽDÝ EMAIL MUSÍ MÍT:**

1. ✅ **Identifikaci odesílatele** (Podnikatelská Čtvrtka)
2. ✅ **Důvod proč dostal email** ("přihlásil ses k odběru")
3. ✅ **Možnost odhlášení** (unsubscribe link)
4. ❌ **NEMUSÍŠ mít:** IČO, adresu (pokud nejsi plátce DPH nebo e-shop)

**→ Náš footer je GDPR compliant!** ✅

---

## 💡 ODHLAŠOVÁNÍ:

**Používáme SmartEmailing default unsubscribe!** ✅

SmartEmailing se **automaticky stará o:**
- ✅ Odhlašovací link
- ✅ Odhlašovací stránku
- ✅ Uložení preference do databáze
- ✅ GDPR compliance

**→ Nemusíš nic řešit! SmartEmailing dělá vše za tebe.**

---

## 📧 VŠECHNY 3 EMAILY:

- ✅ `smartemailing-email-1-sleva-40.html` - **BEZ** vlastního footeru
- ✅ `smartemailing-email-2-reminder-4h.html` - **BEZ** vlastního footeru
- ✅ `smartemailing-email-3-minikurz-zdarma.html` - **BEZ** vlastního footeru

**→ SmartEmailing přidá footer automaticky!**

---

## 🎯 CO TEĎ:

1. ✅ **Nahraj HTML do SmartEmailingu** (HTML editor)
2. ✅ **NECH automatickou patičku ZAPNUTOU** ☑️
3. ✅ **Pošli test email** a zkontroluj že je footer jen 1x
4. ✅ **Otestuj unsubscribe link** jestli funguje

**Pokud chybí footer:**
- → Zkontroluj že máš "Automaticky přidat patičku" **ZAPNUTÉ** ☑️

---

**STATUS:** ✅ Hotovo - Všechny 3 emaily připravené na import!  
**Řešení:** SmartEmailing automatický footer (žádná duplikace)  
**Aktualizováno:** 2025-10-29

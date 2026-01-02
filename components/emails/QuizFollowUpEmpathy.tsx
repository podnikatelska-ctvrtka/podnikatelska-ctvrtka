/**
 * 📧 QUIZ FOLLOW-UP EMAIL - Skupina B (EMPATIE VERSION)
 * 
 * Target: Lidé kteří UDĚLALI kvíz přes Vánoce
 * Framing: Empatie, pomoc, zájem o jejich progress
 * Tone: Warm, caring, no sales pressure
 * Goal: Zjistit jestli dělají akční plán, pomoct jim začít
 * 
 * ❌ BEZ prodeje 5k kurzu (moc velký skok!)
 * ✅ Focus na: Používáš plán? Co tě brzdí?
 * 
 * Subject: Ahoj {jméno}, podíváš se na ten plán? 👀
 * Preview: Včera ti přišly výsledky z kvízu. Měl/a jsi čas se na to podívat?
 */

export function QuizFollowUpEmpathyEmail() {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff'
    }}>
      
      {/* Header - Warm, přátelský */}
      <div style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        padding: '40px 20px',
        textAlign: 'center' as const
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '16px'
        }}>
          👋
        </div>
        <h1 style={{
          color: '#ffffff',
          fontSize: '24px',
          fontWeight: 'bold',
          margin: '0',
          lineHeight: '1.3'
        }}>
          Ahoj {'{jméno}'}!
        </h1>
      </div>

      {/* Body */}
      <div style={{
        padding: '40px 30px',
        color: '#1f2937',
        lineHeight: '1.7',
        fontSize: '16px'
      }}>
        
        {/* Opener - casual check-in */}
        <p style={{ margin: '0 0 20px 0' }}>
          Včera ti přišly výsledky z kvízu + ten personalizovaný akční plán.
        </p>

        <p style={{ margin: '0 0 32px 0', fontSize: '18px' }}>
          Měl/a jsi čas se na to podívat? 👀
        </p>

        {/* Empatie Box */}
        <div style={{
          background: '#fef3c7',
          border: '2px solid #fbbf24',
          borderRadius: '12px',
          padding: '20px',
          margin: '32px 0'
        }}>
          <p style={{
            color: '#78350f',
            fontSize: '16px',
            margin: '0 0 12px 0',
            fontWeight: 'bold'
          }}>
            💡 Vím, že to může být hodně na strávení...
          </p>
          <p style={{
            color: '#92400e',
            fontSize: '15px',
            margin: '0',
            lineHeight: '1.6'
          }}>
            Když vidíš svoje slabá místa napsaný <strong>černý na bílým</strong>, není to příjemný. 
          </p>
        </div>

        <p style={{ margin: '24px 0', fontSize: '16px' }}>
          Ale to je vlastně <strong style={{ color: '#10b981' }}>dobrý</strong> - znamená to, že víš <strong>ČÍM začít</strong>.
        </p>

        {/* Separator */}
        <div style={{
          width: '60px',
          height: '4px',
          background: 'linear-gradient(90deg, #10b981, #06b6d4)',
          margin: '32px 0',
          borderRadius: '2px'
        }} />

        {/* Questions - genuine interest */}
        <p style={{ 
          margin: '0 0 16px 0',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#1e3a8a'
        }}>
          Jsem zvědavý/á:
        </p>

        <ul style={{
          margin: '0 0 32px 0',
          padding: '0 0 0 20px',
          color: '#374151',
          lineHeight: '1.8'
        }}>
          <li style={{ marginBottom: '12px' }}>
            <strong>Narazil/a jsi na něco, co tě překvapilo?</strong>
          </li>
          <li style={{ marginBottom: '12px' }}>
            Nebo naopak - <strong>něco, co jsi věděl/a, ale teprve teď to máš potvrzený?</strong>
          </li>
          <li style={{ marginBottom: '12px' }}>
            <strong>Začal/a jsi ten plán dělat?</strong> Nebo nevíš kde začít?
          </li>
        </ul>

        {/* Callout - můžeš odpovědět */}
        <div style={{
          background: '#f0fdf4',
          border: '2px solid #86efac',
          borderRadius: '12px',
          padding: '20px',
          margin: '32px 0',
          textAlign: 'center' as const
        }}>
          <p style={{
            color: '#166534',
            fontSize: '16px',
            margin: '0 0 12px 0',
            fontWeight: 'bold'
          }}>
            💬 Klidně odepiš - čtu každý mail!
          </p>
          <p style={{
            color: '#15803d',
            fontSize: '14px',
            margin: '0',
            fontStyle: 'italic'
          }}>
            (Vážně. Nejsem robot. Odpovím ti osobně.)
          </p>
        </div>

        {/* What's blocking you section */}
        <div style={{
          borderLeft: '4px solid #f59e0b',
          paddingLeft: '20px',
          margin: '32px 0',
          background: '#fffbeb',
          padding: '20px'
        }}>
          <p style={{
            color: '#92400e',
            fontSize: '16px',
            margin: '0 0 12px 0',
            fontWeight: 'bold'
          }}>
            🤔 Co tě brzdí?
          </p>
          <p style={{
            color: '#78350f',
            fontSize: '15px',
            margin: '0',
            lineHeight: '1.6'
          }}>
            Většina lidí dostane plán a... <strong>nedělá nic</strong>.<br/><br/>
            
            Ne proto, že by nechtěli. Ale proto, že:
          </p>
          <ul style={{
            color: '#78350f',
            fontSize: '15px',
            margin: '12px 0 0 0',
            padding: '0 0 0 20px',
            lineHeight: '1.6'
          }}>
            <li style={{ marginBottom: '8px' }}>Nevědí <strong>JAK</strong> na ty kroky</li>
            <li style={{ marginBottom: '8px' }}>Mají pocit, že je to <strong>moc najednou</strong></li>
            <li style={{ marginBottom: '8px' }}>Bojí se udělat <strong>chybu</strong></li>
          </ul>
        </div>

        <p style={{ margin: '24px 0', fontSize: '16px' }}>
          Jestli tohle cítíš taky - <strong>je to normální</strong>. Nejsi v tom sám/sama.
        </p>

        {/* Soft nudge - co dál */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          borderRadius: '12px',
          padding: '24px',
          margin: '32px 0'
        }}>
          <p style={{
            color: '#1e40af',
            fontSize: '17px',
            margin: '0 0 16px 0',
            fontWeight: 'bold'
          }}>
            💪 Co s tím dál?
          </p>
          <p style={{
            color: '#1e3a8a',
            fontSize: '15px',
            margin: '0 0 16px 0',
            lineHeight: '1.6'
          }}>
            Ten akční plán ti ukázal <strong>CO</strong> opravit.<br/>
            Ale možná teď tápeš v tom, <strong>JAK</strong> na to, že?
          </p>
          <p style={{
            color: '#1e3a8a',
            fontSize: '15px',
            margin: '0',
            lineHeight: '1.6'
          }}>
            Přesně tohle řešíme v <strong>Podnikatelské Čtvrtce</strong> 🎯<br/>
            <span style={{ fontSize: '14px', color: '#3730a3' }}>
              (Ale neboj, nechci ti nic cpát - jen ti dávám vědět, že existuje, kdyby tě to zajímalo.)
            </span>
          </p>
        </div>

        {/* Closing - warm, no pressure */}
        <p style={{ margin: '32px 0 16px 0' }}>
          <strong>Tak co říkáš?</strong>
        </p>

        <p style={{ margin: '0 0 8px 0' }}>
          Podíváš se na ten plán?
        </p>

        <p style={{ margin: '0 0 32px 0', color: '#6b7280' }}>
          A pokud máš jakoukoliv otázku - <strong>klidně napiš</strong>. Jsem tu, abych pomohl.
        </p>

        {/* Signature */}
        <div style={{
          marginTop: '40px',
          paddingTop: '24px',
          borderTop: '2px solid #e5e7eb'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#1f2937' }}>
            Držím ti palce! 💪
          </p>
          <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', color: '#1f2937' }}>
            David
          </p>
          <p style={{ margin: '0', color: '#6b7280', fontSize: '14px' }}>
            Model Podnikání
          </p>
        </div>

        {/* P.S. - odkaz na kurz (velmi soft!) */}
        <div style={{
          marginTop: '32px',
          padding: '16px',
          background: '#f9fafb',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#6b7280',
          lineHeight: '1.6'
        }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong style={{ color: '#374151' }}>P.S.</strong> Jestli tě zajímá, jak vypadá Podnikatelská Čtvrtka:
          </p>
          <p style={{ margin: '0' }}>
            👉 <a href="https://podnikatelskactvrtka.cz" style={{ color: '#3b82f6', textDecoration: 'underline' }}>Koukni se sem</a> (není to nutný, jen kdyby tě to zajímalo)
          </p>
        </div>

      </div>

      {/* Footer */}
      <div style={{
        background: '#f9fafb',
        padding: '24px 30px',
        textAlign: 'center' as const,
        borderTop: '1px solid #e5e7eb'
      }}>
        <p style={{
          margin: '0 0 8px 0',
          fontSize: '12px',
          color: '#9ca3af'
        }}>
          Nebaví tě to? <a href="{'{unsubscribe_url}'}" style={{ color: '#6b7280', textDecoration: 'underline' }}>Odhlásit se</a>
        </p>
        <p style={{
          margin: '0',
          fontSize: '12px',
          color: '#9ca3af'
        }}>
          Model Podnikání • Podnikatelská Čtvrtka
        </p>
      </div>

    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 📋 COPY-PASTE PLAIN TEXT PRO AUTOMATIZACI
// ═══════════════════════════════════════════════════════════

export const QUIZ_FOLLOWUP_EMPATHY_PLAINTEXT = `
Ahoj {jméno}!

Včera ti přišly výsledky z kvízu + ten personalizovaný akční plán.

Měl/a jsi čas se na to podívat? 👀

━━━━━━━━━━━━━━━━━━━━━━

💡 Vím, že to může být hodně na strávení...

Když vidíš svoje slabá místa napsaný černý na bílým, není to příjemný. 

Ale to je vlastně dobrý - znamená to, že víš ČÍM začít.

━━━━━━━━━━━━━━━━━━━━━━

Jsem zvědavý/á:

• Narazil/a jsi na něco, co tě překvapilo?
• Nebo naopak - něco, co jsi věděl/a, ale teprve teď to máš potvrzený?
• Začal/a jsi ten plán dělat? Nebo nevíš kde začít?

💬 Klidně odepiš - čtu každý mail!
(Vážně. Nejsem robot. Odpovím ti osobně.)

━━━━━━━━━━━━━━━━━━━━━━

🤔 CO TĚ BRZDÍ?

Většina lidí dostane plán a... nedělá nic.

Ne proto, že by nechtěli. Ale proto, že:

• Nevědí JAK na ty kroky
• Mají pocit, že je to moc najednou
• Bojí se udělat chybu

Jestli tohle cítíš taky - je to normální. Nejsi v tom sám/sama.

━━━━━━━━━━━━━━━━━━━━━━

💪 CO S TÍM DÁL?

Ten akční plán ti ukázal CO opravit.
Ale možná teď tápeš v tom, JAK na to, že?

Přesně tohle řešíme v Podnikatelské Čtvrtce 🎯
(Ale neboj, nechcu ti nic cpát - jen ti dávám vědět, že existuje, kdyby tě to zajímalo.)

━━━━━━━━━━━━━━━━━━━━━━

Tak co říkáš?

Podíváš se na ten plán?

A pokud máš jakoukoliv otázku - klidně napiš. Jsem tu, abych pomohl.

Držím ti palce! 💪
David
Model Podnikání

P.S. Jestli tě zajímá, jak vypadá Podnikatelská Čtvrtka:
👉 https://podnikatelskactvrtka.cz
(není to nutný, jen kdyby tě to zajímalo)

---
Nebaví tě to? Odhlásit se: {unsubscribe_url}
`;

export const QUIZ_FOLLOWUP_EMPATHY_SUBJECT = "Ahoj {jméno}, podíváš se na ten plán? 👀";
export const QUIZ_FOLLOWUP_EMPATHY_PREVIEW = "Včera ti přišly výsledky z kvízu. Měl/a jsi čas se na to podívat?";

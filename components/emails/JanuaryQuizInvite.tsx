/**
 * 📧 JANUARY QUIZ INVITE EMAIL - Skupina A
 * 
 * Target: 14 lidí ze staré výzvy (listopad), kteří NEUDĚLALI kvíz
 * Framing: Leden = nová šance, čistý štít, začni správně
 * Tone: Empatie + urgency (ale ne tlak)
 * CTA: Udělat kvíz ZDARMA
 * 
 * Subject: Ahoj {jméno}, nový rok = nová šance začít správně
 * Preview: Tehdy jsi byl ve výzvě. Udělal jsem ti dárek - zjisti jaký model podnikání potřebuješ TY
 */

export function JanuaryQuizInviteEmail() {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff'
    }}>
      
      {/* Header - Minimal, čisté */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        padding: '40px 20px',
        textAlign: 'center' as const
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '16px'
        }}>
          🚀
        </div>
        <h1 style={{
          color: '#ffffff',
          fontSize: '24px',
          fontWeight: 'bold',
          margin: '0 0 8px 0',
          lineHeight: '1.3'
        }}>
          LEDEN 2026
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '16px',
          margin: '0'
        }}>
          Nový rok. Nová šance. Čistý štít.
        </p>
      </div>

      {/* Body */}
      <div style={{
        padding: '40px 30px',
        color: '#1f2937',
        lineHeight: '1.7',
        fontSize: '16px'
      }}>
        
        {/* Opener */}
        <p style={{ margin: '0 0 20px 0' }}>
          Ahoj <strong>{'{jméno}'}</strong>!
        </p>

        <p style={{ margin: '0 0 20px 0' }}>
          Vzpomínáš?
        </p>

        <p style={{ margin: '0 0 20px 0' }}>
          <strong>V listopadu jsi byl/a ve mé 5denní výzvě.</strong>
        </p>

        <p style={{ margin: '0 0 32px 0', color: '#6b7280' }}>
          Možná jsi neměl/a čas dokončit.<br/>
          Možná ti to nedávalo smysl.<br/>
          Možná jsi to prostě odložil/a.
        </p>

        {/* Separator */}
        <div style={{
          width: '60px',
          height: '4px',
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
          margin: '32px 0',
          borderRadius: '2px'
        }} />

        {/* New Year Hook */}
        <p style={{ 
          margin: '0 0 24px 0',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1e3a8a'
        }}>
          Ale teď je LEDEN 2026.
        </p>

        <p style={{ margin: '0 0 32px 0' }}>
          Nový rok. Nová šance. <strong>Čistý štít.</strong>
        </p>

        {/* Gift Section */}
        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          border: '2px solid #fbbf24',
          borderRadius: '12px',
          padding: '24px',
          margin: '32px 0'
        }}>
          <div style={{
            fontSize: '32px',
            textAlign: 'center' as const,
            marginBottom: '12px'
          }}>
            🎁
          </div>
          <h2 style={{
            color: '#92400e',
            fontSize: '20px',
            fontWeight: 'bold',
            margin: '0 0 16px 0',
            textAlign: 'center' as const
          }}>
            Udělal jsem ti dárek
          </h2>
          <p style={{
            color: '#78350f',
            fontSize: '16px',
            margin: '0',
            textAlign: 'center' as const,
            lineHeight: '1.6'
          }}>
            Vytvořil jsem rychlý kvíz (3 minuty), který ti řekne <strong>jaký model podnikání ti sedí</strong> a <strong>co přesně potřebuješ udělat TEĎ</strong>.
          </p>
        </div>

        {/* Value Props */}
        <p style={{ margin: '24px 0 12px 0', fontWeight: 'bold', color: '#1e3a8a' }}>
          Co dostaneš:
        </p>

        <ul style={{
          margin: '0 0 32px 0',
          padding: '0 0 0 20px',
          color: '#374151'
        }}>
          <li style={{ marginBottom: '8px' }}>
            ✅ <strong>Tvoje byznys skóre</strong> - pravda o tom, kde stojíš
          </li>
          <li style={{ marginBottom: '8px' }}>
            ✅ <strong>Personalizovaný akční plán</strong> - konkrétní kroky pro TVOU situaci
          </li>
          <li style={{ marginBottom: '8px' }}>
            ✅ <strong>První krok na příští týden</strong> - přesně co dělat
          </li>
          <li style={{ marginBottom: '8px' }}>
            ✅ <strong>Biggest risk analýza</strong> - co může položit tvůj byznys
          </li>
        </ul>

        {/* Not Theory Box */}
        <div style={{
          borderLeft: '4px solid #3b82f6',
          paddingLeft: '20px',
          margin: '32px 0',
          color: '#4b5563',
          fontStyle: 'italic'
        }}>
          Není to teorie. Není to bullshit.<br/>
          <strong style={{ color: '#1e3a8a' }}>Je to KONKRÉTNÍ odpověď na TVOJI situaci.</strong>
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: 'center' as const, margin: '40px 0' }}>
          <a 
            href="https://podnikatelskactvrtka.cz/kviz"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: '#ffffff',
              fontSize: '20px',
              fontWeight: 'bold',
              padding: '18px 48px',
              borderRadius: '9999px',
              textDecoration: 'none',
              boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
              transition: 'transform 0.2s'
            }}
          >
            🚀 Udělat kvíz ZDARMA
          </a>
          
          <p style={{
            margin: '16px 0 0 0',
            fontSize: '14px',
            color: '#6b7280'
          }}>
            ⚡ Zabere 3 minuty • 🎯 Výsledky okamžitě na email • 💯 100% zdarma
          </p>
        </div>

        {/* Closing - Direct, bez keců */}
        <p style={{ margin: '32px 0 16px 0' }}>
          <strong>Začni správně, nebo se budeš trápit celý rok.</strong>
        </p>

        <p style={{ margin: '0 0 32px 0', color: '#6b7280' }}>
          Tvoje volba.
        </p>

        {/* Urgency - soft */}
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '16px',
          margin: '32px 0',
          fontSize: '14px',
          color: '#991b1b'
        }}>
          ⏰ <strong>P.S.</strong> Kvíz končí 31. ledna. Po té zmizí (dělám rebrand na placenou verzi). Takže <strong>teď nebo nikdy</strong>.
        </div>

        {/* Signature */}
        <div style={{
          marginTop: '40px',
          paddingTop: '24px',
          borderTop: '2px solid #e5e7eb'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#1f2937' }}>
            David
          </p>
          <p style={{ margin: '0', color: '#6b7280', fontSize: '14px' }}>
            Model Podnikání
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
// 📋 COPY-PASTE PRO MAILCHIMP / KLAVIYO / NEBO COKOLIV
// ═══════════════════════════════════════════════════════════

export const JANUARY_QUIZ_EMAIL_PLAINTEXT = `
Ahoj {jméno}!

Vzpomínáš?

V listopadu jsi byl/a ve mé 5denní výzvě.

Možná jsi neměl/a čas dokončit.
Možná ti to nedávalo smysl.
Možná jsi to prostě odložil/a.

━━━━━━━━━━━━━━━━━━━━━━

Ale teď je LEDEN 2026.

Nový rok. Nová šance. Čistý štít.

━━━━━━━━━━━━━━━━━━━━━━

🎁 Udělal jsem ti dárek

Vytvořil jsem rychlý kvíz (3 minuty), který ti řekne:

✅ Jaký model podnikání ti sedí
✅ Proč tvoje nápady nefungovaly
✅ Co přesně potřebuješ udělat TEĎ

Není to teorie. Není to bullshit.
Je to KONKRÉTNÍ odpověď na TVOJI situaci.

━━━━━━━━━━━━━━━━━━━━━━

👉 Udělej kvíz ZDE: https://podnikatelskactvrtka.cz/kviz

⚡ Zabere 3 minuty
🎯 Výsledky okamžitě na email
💯 100% zdarma

━━━━━━━━━━━━━━━━━━━━━━

Začni správně, nebo se budeš trápit celý rok.

Tvoje volba.

David
Model Podnikání

⏰ P.S. Kvíz končí 31. ledna. Po té zmizí (dělám rebrand na placenou verzi). Takže teď nebo nikdy.

---
Nebaví tě to? Odhlásit se: {unsubscribe_url}
`;

export const JANUARY_QUIZ_EMAIL_SUBJECT = "Ahoj {jméno}, nový rok = nová šance začít správně";
export const JANUARY_QUIZ_EMAIL_PREVIEW = "Tehdy jsi byl/a ve výzvě. Udělal jsem ti dárek - zjisti jaký model podnikání potřebuješ TY";

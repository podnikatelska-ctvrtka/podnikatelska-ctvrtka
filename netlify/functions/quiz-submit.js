// Quiz submission function
// Saves quiz results to Supabase and sends emails

import { createClient } from '@supabase/supabase-js';

export async function handler(event, context) {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };
  
  // Handle OPTIONS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  try {
    const { email, name, quizType, answers, result } = JSON.parse(event.body);
    
    console.log('📝 Quiz submission:', { email, quizType, category: result.category, score: result.score });
    
    // Validate
    if (!email || !result || !answers) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }
    
    // ══════════════════════════════════════════════════════════
    // �� TEST MODE: Override category based on email
    // ═══════════════════════════════════════════════════════════
    let finalResult = { ...result };
    
    if (email.includes('test+critical@')) {
      console.log('🧪 TEST MODE: Forcing CRITICAL category');
      finalResult = {
        score: 25,
        category: 'critical',
        categoryLabel: 'Kritický stav',
        categoryDescription: 'Tvůj byznys potřebuje okamžitou pozornost!',
        risks: ['100% závislost na jednom klientovi', 'Nulové rezervy', 'Neznáš svá čísla'],
        recommendations: ['Diverzifikuj zdroje příjmů ASAP', 'Vytvoř finanční polštář', 'Nastav sledování metrik']
      };
    } else if (email.includes('test+unstable@')) {
      console.log('🧪 TEST MODE: Forcing UNSTABLE category');
      finalResult = {
        score: 45,
        category: 'unstable',
        categoryLabel: 'Nestabilní',
        categoryDescription: 'Tvůj byznys funguje, ale stojí na vratkých základech.',
        risks: ['Závislost na 2-3 klientech', 'Nedostatečné rezervy', 'Málo systematizace'],
        recommendations: ['Rozlož riziko', 'Navyš rezervy', 'Systematizuj procesy']
      };
    } else if (email.includes('test+solid@')) {
      console.log('🧪 TEST MODE: Forcing SOLID category');
      finalResult = {
        score: 65,
        category: 'solid',
        categoryLabel: 'Solidní základ',
        categoryDescription: 'Tvůj byznys má solidní základ! Teď je čas optimalizovat.',
        risks: ['Potenciál pro větší růst', 'Neoptimalizované procesy'],
        recommendations: ['Optimalizuj metriky', 'Automatizuj procesy', 'Škáluj']
      };
    } else if (email.includes('test+advanced@')) {
      console.log('🧪 TEST MODE: Forcing ADVANCED category');
      finalResult = {
        score: 85,
        category: 'advanced',
        categoryLabel: 'Pokročilý',
        categoryDescription: 'Tvůj byznys je na high level!',
        risks: ['Příležitosti pro expanzi'],
        recommendations: ['Strategic partnerships', 'Škálování', 'Systemizace']
      };
    } else if (email.includes('test+beginner@')) {
      console.log('🧪 TEST MODE: Forcing BEGINNER category');
      finalResult = {
        score: 75,
        category: 'beginner',
        categoryLabel: 'Začínám',
        categoryDescription: 'Jsi na začátku cesty!',
        risks: ['Neověřený model', 'Nejasná strategie'],
        recommendations: ['Validuj nápad', 'Najdi prvních zákazníků', 'Učení & iterace']
      };
    }
    
    // Use finalResult (which might be overridden) for the rest of the function
    const resultToSave = finalResult;
    
    // ──────────────────────────────────────────
    // 💾 SAVE TO SUPABASE
    // ──────────────────────────────────────────
    const supabaseUrl = process.env.SUPABASE_URL || 'https://jdcpzswpecntlqiyzxac.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseKey) {
      console.error('❌ Missing Supabase service role key');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Save quiz results
    const { data: quizData, error: quizError } = await supabase
      .from('quiz_results')
      .insert({
        email,
        name: name || '',
        quiz_type: quizType,
        answers,
        score: resultToSave.score,
        category: resultToSave.category,
        category_label: resultToSave.categoryLabel,
        risks: resultToSave.risks,
        recommendations: resultToSave.recommendations,
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (quizError) {
      console.error('❌ Error saving quiz results:', quizError);
      throw new Error('Failed to save quiz results');
    }
    
    console.log('✅ Quiz results saved to Supabase:', quizData.id);
    
    // ─────────────────────────────────────────
    // 📧 ADD TO SMARTEMAILING LIST
    // ──────────────────────────────────────────
    const SMARTEMAILING_USERNAME = process.env.SMARTEMAILING_USERNAME;
    const SMARTEMAILING_API_KEY = process.env.SMARTEMAILING_API_KEY;
    const SMARTEMAILING_LIST_ID = process.env.SMARTEMAILING_LIST_KVIZ; // ✅ Jeden list pro všechny kategorie
    
    if (SMARTEMAILING_USERNAME && SMARTEMAILING_API_KEY && SMARTEMAILING_LIST_ID) {
      try {
        const authToken = Buffer.from(`${SMARTEMAILING_USERNAME}:${SMARTEMAILING_API_KEY}`).toString('base64');
        
        console.log(`📤 Adding to Smartemailing list (category: ${resultToSave.category}, listId: ${SMARTEMAILING_LIST_ID})`);
        
        const smartemailingResponse = await fetch(`https://app.smartemailing.cz/api/v3/import`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            settings: {
              update: true,
              field_policy: 'FILL_IN_EMPTY'
            },
            data: [{
              emailaddress: email,
              name: name || '',
              surname: '',
              contactlists: [
                {
                  id: parseInt(SMARTEMAILING_LIST_ID),
                  status: 'confirmed'
                }
              ],
              customfields: {
                source: 'quiz',
                quiz_type: quizType,
                quiz_category: resultToSave.category,
                quiz_score: resultToSave.score.toString()
              }
            }]
          })
        });
        
        const smartemailingData = await smartemailingResponse.json();
        
        if (smartemailingResponse.ok && ['ok', 'created'].includes(smartemailingData.status)) {
          console.log('✅ Added to Smartemailing:', smartemailingData.status);
        } else {
          console.error('⚠️ Smartemailing API error:', smartemailingData);
        }
      } catch (seError) {
        console.error('⚠️ Smartemailing failed (non-critical):', seError.message);
      }
    } else {
      console.log('⚠️ Smartemailing not configured - skipping');
    }
    
    // ──────────────────────────────────────────
    // 📨 SEND IMMEDIATE EMAIL VIA RESEND
    // ──────────────────────────────────────────
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (RESEND_API_KEY) {
      try {
        console.log('📨 Sending email via Resend...');
        
        // ✅ CREATE ACTION PLAN URL
        const actionPlanUrl = `https://podnikatelskactvrtka.cz/action-plans?category=${resultToSave.category}&score=${resultToSave.score}&name=${encodeURIComponent(name || 'podnikateli')}`;
        
        // Create email HTML
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Výsledky kvízu - Zdraví tvého byznysu</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px;">Tvoje výsledky jsou tady! 🎉</h1>
            </td>
          </tr>
          
          <!-- Score -->
          <tr>
            <td style="padding: 40px; text-align: center;">
              <div style="font-size: 64px; font-weight: bold; color: ${resultToSave.score >= 70 ? '#16a34a' : resultToSave.score >= 40 ? '#eab308' : '#dc2626'}; margin-bottom: 16px;">
                ${resultToSave.score}%
              </div>
              <h2 style="margin: 0 0 16px 0; color: ${resultToSave.score >= 70 ? '#16a34a' : resultToSave.score >= 40 ? '#eab308' : '#dc2626'}; font-size: 24px;">
                ${resultToSave.categoryLabel}
              </h2>
              <p style="margin: 0; color: #64748b; font-size: 18px; line-height: 1.6;">
                ${resultToSave.categoryDescription}
              </p>
            </td>
          </tr>
          
          <!-- Risks -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 16px 0; color: #dc2626; font-size: 20px;">
                  ⚠️ Tvá největší rizika:
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #475569;">
                  ${resultToSave.risks.map(risk => `<li style="margin-bottom: 8px;">${risk}</li>`).join('')}
                </ul>
              </div>
              
              <!-- Recommendations -->
              <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 20px; border-radius: 4px;">
                <h3 style="margin: 0 0 16px 0; color: #16a34a; font-size: 20px;">
                  ✅ Co s tím:
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #475569;">
                  ${resultToSave.recommendations.map(rec => `<li style="margin-bottom: 8px;">${rec}</li>`).join('')}
                </ul>
              </div>
            </td>
          </tr>
          
          <!-- ═══════════════════════════════════════════ -->
          <!-- 📄 AKČNÍ PLÁN CTA -->
          <!-- ═══════════════════════════════════════════ -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <div style="background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); border-radius: 8px; padding: 32px; text-align: center;">
                <h3 style="margin: 0 0 16px 0; color: #ffffff; font-size: 24px;">
                  📄 Tvůj personalizovaný akční plán je připravený!
                </h3>
                <p style="margin: 0 0 24px 0; color: #e0e7ff; font-size: 16px;">
                  Konkrétní kroky a checklisty připravené přímo pro tvůj byznys.<br/>
                  Můžeš si ho vytisknout nebo uložit jako PDF.
                </p>
                <a href="${actionPlanUrl}" style="display: inline-block; background: #ffffff; color: #2563eb; padding: 16px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 18px;">
                  📥 Zobrazit můj akční plán
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px;">
                Díky za vyplnění kvízu! 🙏
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                Podnikatelská Čtvrtka | podnikatelskactvrtka.cz
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `;
        
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Podnikatelská Čtvrtka <ahoj@podnikatelskactvrtka.cz>',
            to: email,
            subject: `Tvoje výsledky: ${resultToSave.categoryLabel} (${resultToSave.score}%)`,
            html: emailHtml
          })
        });
        
        const resendData = await resendResponse.json();
        
        if (resendResponse.ok) {
          console.log('✅ Email sent via Resend:', resendData.id);
        } else {
          console.error('⚠️ Resend API error:', resendData);
        }
      } catch (emailError) {
        console.error('⚠️ Email sending failed (non-critical):', emailError.message);
      }
    } else {
      console.log('⚠️ Resend not configured - skipping email');
    }
    
    // ──────────────────────────────────────────
    // ✅ SUCCESS RESPONSE
    // ─────────────────────────────────────────
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Quiz results saved and emails sent',
        quizId: quizData.id
      })
    };
    
  } catch (error) {
    console.error('❌ Quiz submission error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to process quiz submission'
      })
    };
  }
}
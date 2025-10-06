import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Resend email sending function
async function sendEmail(to, subject, html) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Podnikatelská Čtvrtka <kurz@podnikatelskactvrtka.cz>',
      to: [to],
      subject: subject,
      html: html,
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Email failed: ${error}`);
  }
  
  return response.json();
}

// Main webhook handler
export async function handler(event, context) {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  try {
    // Parse FAPI webhook data
    const data = JSON.parse(event.body);
    
    console.log('📥 FAPI webhook received:', data);
    
    // Verify payment is completed
    if (data.status !== 'paid' && data.payment_status !== 'paid') {
      console.log('⚠️ Payment not completed yet, skipping...');
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Payment not completed' })
      };
    }
    
    // Extract user data
    const email = data.email || data.customer_email || data.buyer_email;
    const name = data.name || data.customer_name || data.buyer_name || 'Zákazník';
    const orderId = data.id || data.order_id || 'unknown';
    const amount = data.amount || data.total || 0;
    
    console.log('👤 User data:', { email, name, orderId, amount });
    
    // ──────────────────────────────────────────
    // 🔑 GENERATE UNIQUE ACCESS TOKEN
    // ──────────────────────────────────────────
    const accessToken = crypto.randomUUID();
    console.log('🔑 Generated token:', accessToken);
    
    // ──────────────────────────────────────────
    // 💾 SAVE TO SUPABASE
    // ──────────────────────────────────────────
    const { data: user, error: insertError } = await supabase
      .from('users')
      .insert({
        email: email,
        name: name,
        order_id: orderId,
        access_token: accessToken,
        purchased_at: new Date().toISOString(),
        amount: parseFloat(amount)
      })
      .select()
      .single();
    
    if (insertError) {
      // Check if user already exists (duplicate)
      if (insertError.code === '23505') {
        console.log('⚠️ User already exists, skipping...');
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'User already exists' })
        };
      }
      throw insertError;
    }
    
    console.log('✅ User saved to Supabase:', user.id);
    
    // ──────────────────────────────────────────
    // 📧 SEND ACCESS EMAIL
    // ──────────────────────────────────────────
    const courseUrl = `https://podnikatelskactvrtka.cz/course?token=${accessToken}`;
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; }
          .content { background: white; padding: 30px; }
          .button { 
            display: inline-block; 
            background: #3b82f6; 
            color: white; 
            padding: 16px 32px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: bold;
            margin: 20px 0;
          }
          .token { 
            background: #f3f4f6; 
            padding: 12px; 
            border-radius: 6px; 
            font-family: monospace; 
            font-size: 12px;
            word-break: break-all;
            margin: 15px 0;
          }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🎉 Děkujeme za nákup!</h1>
          </div>
          
          <div class="content">
            <p>Ahoj ${name}!</p>
            
            <p>Váš kurz <strong>Podnikatelská Čtvrtka</strong> je připravený! 🚀</p>
            
            <h2>🎓 Okamžitý přístup do kurzu:</h2>
            
            <div style="text-align: center;">
              <a href="${courseUrl}" class="button">
                VSTOUPIT DO KURZU
              </a>
            </div>
            
            <p>Nebo zkopírujte tento link:</p>
            <div class="token">${courseUrl}</div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            
            <h3>📄 Faktura</h3>
            <p>Fakturu najdete ve FAPI administraci nebo vám přijde samostatným emailem.</p>
            
            <h3>💡 Co dál?</h3>
            <ul>
              <li>Začněte s Modulem 1: Zákaznické segmenty</li>
              <li>Postupujte svým tempem</li>
              <li>Vyplňujte Business Model Canvas průběžně</li>
              <li>Máte přístup na 12 měsíců!</li>
            </ul>
            
            <h3>🎁 BONUS</h3>
            <p>Prvních 50 kupujících dostává konzultaci ZDARMA (hodnota 1.500 Kč)!<br/>
            <a href="https://calendly.com/tvuj-link" style="color: #3b82f6;">Rezervujte si termín zde</a></p>
            
            <div class="footer">
              <p>Máte otázky? Odpovězte na tento email!</p>
              <p>S pozdravem,<br/><strong>[Tvoje jméno]</strong></p>
              <p style="margin-top: 20px;">
                <small>
                  Podnikatelská Čtvrtka<br/>
                  [Tvoje adresa]<br/>
                  <a href="https://podnikatelskactvrtka.cz/unsubscribe?email=${email}" style="color: #6b7280;">Odhlásit se</a>
                </small>
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    await sendEmail(
      email,
      '✅ Váš přístup do kurzu je ready!',
      emailHtml
    );
    
    console.log('📧 Email sent to:', email);
    
    // ──────────────────────────────────────────
    // ✅ SUCCESS RESPONSE
    // ──────────────────────────────────────────
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        user_id: user.id,
        token_generated: true,
        email_sent: true
      })
    };
    
  } catch (error) {
    console.error('❌ Webhook error:', error);
    
    // Send alert email to admin
    try {
      await sendEmail(
        process.env.ADMIN_EMAIL || 'tvuj@email.cz',
        '⚠️ FAPI webhook selhání!',
        `
          <h2>Webhook Error</h2>
          <p><strong>Error:</strong> ${error.message}</p>
          <pre>${error.stack}</pre>
          <hr/>
          <p><strong>Webhook data:</strong></p>
          <pre>${event.body}</pre>
        `
      );
    } catch (emailError) {
      console.error('Failed to send alert email:', emailError);
    }
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        details: error.stack
      })
    };
  }
}

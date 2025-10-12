// ====================================
// FAPI WEBHOOK - PRODUCTION VERSION
// ====================================
// Webhook pro FAPI platební notifikace
// URL: https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
// Updated: 2025-10-12 - Fixed environment variables

// Supabase client helper
async function createSupabaseClient() {
  const { createClient } = await import('@supabase/supabase-js');
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );
}

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
    console.log('🎯 FAPI webhook received - v2.0');
    console.log('🔑 ENV check:', {
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasFapiKey: !!process.env.FAPI_API_KEY,
      supabaseUrlPrefix: process.env.SUPABASE_URL?.substring(0, 30)
    });
    
    // Parse FAPI webhook data (URL encoded format)
    const params = new URLSearchParams(event.body);
    const invoiceId = params.get('id');
    
    if (!invoiceId) {
      throw new Error('Missing invoice ID');
    }
    
    console.log('📋 Invoice ID:', invoiceId);
    
    // ──────────────────────────────────────────
    // 📞 FETCH INVOICE FROM FAPI API
    // ──────────────────────────────────────────
    console.log('📞 Fetching invoice from FAPI...');
    const fapiResponse = await fetch(`https://api.fapi.cz/invoices/${invoiceId}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${process.env.FAPI_API_KEY}`
      }
    });
    
    if (!fapiResponse.ok) {
      throw new Error(`FAPI API error: ${fapiResponse.status}`);
    }
    
    const invoice = await fapiResponse.json();
    console.log('✅ Invoice fetched');
    
    // Extract customer data
    const email = invoice.user?.email || invoice.email;
    const name = invoice.user?.name || invoice.name || 'Zákazník';
    const amount = parseFloat(invoice.total || 0);
    
    if (!email) {
      throw new Error('No email in invoice');
    }
    
    console.log('👤 Customer:', { email, name });
    
    // ──────────────────────────────────────────
    // 🔑 GENERATE ACCESS TOKEN
    // ──────────────────────────────────────────
    const accessToken = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
    
    // ──────────────────────────────────────────
    // 💾 SAVE TO SUPABASE
    // ──────────────────────────────────────────
    console.log('💾 Saving to Supabase...');
    const supabase = await createSupabaseClient();
    
    const { data: user, error: insertError } = await supabase
      .from('users')
      .insert({
        email: email,
        name: name,
        order_id: invoiceId,
        access_token: accessToken,
        purchased_at: new Date().toISOString(),
        amount: amount,
        last_login: null
      })
      .select()
      .single();
    
    if (insertError) {
      // User already exists
      if (insertError.code === '23505') {
        console.log('⚠️ User already exists');
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'User already exists' })
        };
      }
      throw insertError;
    }
    
    console.log('✅ User saved:', user.id);
    
    // ──────────────────────────────────────────
    // 📧 SEND EMAIL
    // ──────────────────────────────────────────
    const accessUrl = `https://podnikatelskactvrtka.cz/course-v3?token=${accessToken}`;
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Vítejte v kurzu!</h1>
          </div>
          
          <div style="background: white; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; margin-top: 0;">Ahoj ${name}!</p>
            
            <p>Děkujeme za zakoupení kurzu <strong>Podnikatelská Čtvrtka</strong>! 🚀</p>
            
            <p>Váš přístup do LMS systému je připraven:</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <p style="margin: 0 0 15px 0; font-weight: 600; color: #667eea;">🔑 Váš přístupový odkaz:</p>
              <a href="${accessUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Vstoupit do kurzu
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              💡 <strong>Tip:</strong> Uložte si tento email - odkaz funguje natrvalo a můžete se kdykoliv vrátit ke kurzu!
            </p>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <p style="color: #999; font-size: 13px; margin-bottom: 0;">
              Pokud máte jakékoliv dotazy, neváhejte odpovědět na tento email.<br>
              Přejeme hodně úspěchů! 💪
            </p>
          </div>
        </body>
      </html>
    `;
    
    console.log('📧 Sending email...');
    await sendEmail(
      email,
      '🎉 Přístup do kurzu Podnikatelská Čtvrtka',
      emailHtml
    );
    
    console.log('✅ Email sent!');
    
    // ──────────────────────────────────────────
    // ✅ SUCCESS
    // ──────────────────────────────────────────
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'User created and email sent',
        userId: user.id
      })
    };
    
  } catch (error) {
    console.error('❌ Webhook error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
}

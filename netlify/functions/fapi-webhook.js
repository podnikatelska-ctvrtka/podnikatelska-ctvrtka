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
    const fapiUsername = process.env.FAPI_USERNAME;
    const fapiApiKey = process.env.FAPI_API_KEY;
    
    console.log('📞 Fetching invoice from FAPI...');
    console.log('🔑 Username exists:', !!fapiUsername);
    console.log('🔑 API Key exists:', !!fapiApiKey);
    console.log('🌐 Request URL:', `https://api.fapi.cz/invoices/${invoiceId}`);
    
    // FAPI používá HTTP Basic Authentication
    const authString = Buffer.from(`${fapiUsername}:${fapiApiKey}`).toString('base64');
    console.log('🔐 Auth header prepared');
    
    const fapiResponse = await fetch(`https://api.fapi.cz/invoices/${invoiceId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${authString}`
      }
    });
    
    console.log('📡 FAPI Response Status:', fapiResponse.status);
    console.log('📡 FAPI Response OK:', fapiResponse.ok);
    console.log('📡 FAPI Response Headers:', Object.fromEntries(fapiResponse.headers.entries()));
    
    if (!fapiResponse.ok) {
      const errorText = await fapiResponse.text();
      console.log('❌ FAPI Error Response Body:', errorText);
      throw new Error(`FAPI API error: ${fapiResponse.status} - ${errorText}`);
    }
    
    const invoice = await fapiResponse.json();
    console.log('✅ Invoice fetched successfully');
    console.log('📄 Invoice data:', JSON.stringify(invoice, null, 2));
    
    // Extract customer data from invoice.customer
    const email = invoice.customer?.email;
    const name = invoice.customer?.name || invoice.customer?.first_name || 'Zákazník';
    const amount = parseFloat(invoice.total || 0);
    
    // 🎯 DETECT EARLY BIRD BY PRICE
    // 4.999 Kč = Early Bird (průkopník, dostane hlavní + mini kurz)
    // 8.499 Kč = Full Price (normální, dostane jen hlavní kurz)
    // 
    // ⚠️ TESTOVACÍ REŽIM:
    // 1 Kč (nebo 1.21 Kč s DPH) = Early Bird test → POŠLE MINIKURZ ✅
    // 2 Kč (nebo 2.42 Kč s DPH) = Full Price test → NEPOŠLE MINIKURZ ❌
    const isEarlyBird = amount === 4999 || amount === 6049 || amount === 1 || amount === 1.21; // TESTING: 2 Kč NENÍ v podmínce!
    
    if (!email) {
      throw new Error('No email in invoice.customer');
    }
    
    console.log('👤 Customer:', { email, name, amount, isEarlyBird });
    
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
    // 📧 SEND EMAIL - ROZDÍLNÉ TEMPLATY
    // ──────────────────────────────────────────
    const mainCourseUrl = `https://podnikatelskactvrtka.cz/course-v3?token=${encodeURIComponent(accessToken)}`;
    const miniCourseUrl = `https://podnikatelskactvrtka.cz/minikurz?token=MINICOURSE2025`;
    const invoiceUrl = `https://app.fapi.cz/invoice/${invoiceId}`;
    
    // 🎯 TEMPLATE A: PRŮKOPNÍK (s minikurzem)
    const earlyBirdEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px !important; width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">🔥 PRŮKOPNÍK! Vítejte v kurzu!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
              <p style="font-size: 18px; margin-top: 0;">Ahoj ${name}!</p>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 15px;">
                    <p style="margin: 0; font-weight: 700; color: #92400e;">🚀 GRATULUJEME! Jste mezi průkopníky!</p>
                    <p style="margin: 8px 0 0 0; font-size: 14px; color: #78350f;">Koupili jste během prvních 24 hodin a získáváte exkluzivní bonus! 🎁</p>
                  </td>
                </tr>
              </table>
              
              <p>Děkujeme za zakoupení kurzu <strong>Podnikatelská Čtvrtka</strong>! 🚀</p>
              <p><strong>Váš přístup je připraven:</strong></p>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #f8f9fa; border-radius: 8px; margin: 30px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 15px 0; font-weight: 600; color: #667eea;">📚 HLAVNÍ KURZ - Podnikatelská Čtvrtka</p>
                    <a href="${mainCourseUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin-bottom: 10px;">Vstoupit do hlavního kurzu</a>
                    <p style="margin: 10px 0 0 0; font-size: 13px; color: #666;">⏱️ 12 lekcí • 90 minut práce • Kompletní byznys plán</p>
                  </td>
                </tr>
              </table>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 8px; margin: 30px 0; border: 2px solid #f59e0b;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 15px 0; font-weight: 600; color: #92400e;">🎁 BONUS PRO PRŮKOPNÍKY - Mini Kurz</p>
                    <a href="${miniCourseUrl}" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin-bottom: 10px;">Vstoupit do mini kurzu</a>
                    <p style="margin: 10px 0 0 0; font-size: 13px; color: #78350f;">⚡ 3 praktické nástroje • Okamžité výsledky • Příprava na kurz</p>
                  </td>
                </tr>
              </table>
              
              <p style="color: #666; font-size: 14px;">💡 <strong>Tip:</strong> Uložte si tento email - odkazy fungují natrvalo a můžete se kdykoliv vrátit!</p>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #f0f9ff; border-radius: 8px; margin: 20px 0; border: 1px solid #bae6fd;">
                <tr>
                  <td style="padding: 15px;">
                    <p style="margin: 0 0 10px 0; font-weight: 600; color: #0369a1;">📄 Faktura</p>
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #0c4a6e;">Vaše faktura je připravena ke stažení:</p>
                    <a href="${invoiceUrl}" style="display: inline-block; background: #0ea5e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-size: 14px;">Stáhnout fakturu (PDF)</a>
                  </td>
                </tr>
              </table>
              
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
              
              <p style="color: #999; font-size: 13px; margin-bottom: 0;">Pokud máte jakékoliv dotazy, neváhejte odpovědět na tento email.<br>Přejeme hodně úspěchů! 💪</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
    
    // 📧 TEMPLATE B: NORMÁLNÍ ZÁKAZNÍK (jen hlavní kurz)
    const normalEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px !important; width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Vítejte v kurzu!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
              <p style="font-size: 18px; margin-top: 0;">Ahoj ${name}!</p>
              <p>Děkujeme za zakoupení kurzu <strong>Podnikatelská Čtvrtka</strong>! 🚀</p>
              <p>Váš přístup do LMS systému je připraven:</p>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #f8f9fa; border-radius: 8px; margin: 30px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 15px 0; font-weight: 600; color: #667eea;">🔑 Váš přístupový odkaz:</p>
                    <a href="${mainCourseUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Vstoupit do kurzu</a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #666; font-size: 14px;">💡 <strong>Tip:</strong> Uložte si tento email - odkaz funguje natrvalo a můžete se kdykoliv vrátit ke kurzu!</p>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: #f0f9ff; border-radius: 8px; margin: 20px 0; border: 1px solid #bae6fd;">
                <tr>
                  <td style="padding: 15px;">
                    <p style="margin: 0 0 10px 0; font-weight: 600; color: #0369a1;">📄 Faktura</p>
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #0c4a6e;">Vaše faktura je připravena ke stažení:</p>
                    <a href="${invoiceUrl}" style="display: inline-block; background: #0ea5e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-size: 14px;">Stáhnout fakturu (PDF)</a>
                  </td>
                </tr>
              </table>
              
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
              
              <p style="color: #999; font-size: 13px; margin-bottom: 0;">Pokud máte jakékoliv dotazy, neváhejte odpovědět na tento email.<br>Přejeme hodně úspěchů! 💪</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
    
    // 🎯 CHOOSE EMAIL TEMPLATE BASED ON EARLY BIRD STATUS
    const emailHtml = isEarlyBird ? earlyBirdEmailHtml : normalEmailHtml;
    const emailSubject = isEarlyBird 
      ? '🔥 PRŮKOPNÍK! Přístup do kurzu + BONUS Mini Kurz' 
      : '🎉 Přístup do kurzu Podnikatelská Čtvrtka';
    
    console.log(`📧 Sending ${isEarlyBird ? 'EARLY BIRD' : 'NORMAL'} email...`);
    await sendEmail(
      email,
      emailSubject,
      emailHtml
    );
    
    console.log('✅ Email sent!');
    
    // ──────────────────────────────────────────
    // 🏷️ ADD TAG TO SMARTEMAILING
    // ──────────────────────────────────────────
    console.log('🏷️ Adding "purchased" tag to SmartEmailing...');
    
    try {
      const seApiKey = process.env.SMARTEMAILING_API_KEY;
      if (seApiKey) {
        const seAuthString = Buffer.from(`${seApiKey}:x`).toString('base64');
        
        await fetch('https://app.smartemailing.cz/api/v3/contacts', {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${seAuthString}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailaddress: email,
            tags: ['purchased']
          })
        });
        
        console.log('✅ Tag "purchased" added to SmartEmailing');
      } else {
        console.log('⚠️ SmartEmailing API key not found - skipping tag');
      }
    } catch (seError) {
      console.error('⚠️ SmartEmailing tag failed (non-critical):', seError.message);
      // Don't fail the webhook if SE tagging fails
    }
    
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

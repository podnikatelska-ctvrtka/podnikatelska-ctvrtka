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
      from: 'Podnikatelská Čtvrtka <onboarding@resend.dev>',
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

// FAPI API helper - fetch invoice details
async function getInvoiceDetails(invoiceId) {
  // FAPI uses Basic Authentication: username + API key
  const username = process.env.FAPI_USERNAME; // cipera@iting.cz
  const apiKey = process.env.FAPI_API_KEY; // BWrfhdLmc0Z0APdn3XNAiExq0
  
  // Create Basic Auth token: Base64(username:password)
  const authToken = Buffer.from(`${username}:${apiKey}`).toString('base64');
  
  const response = await fetch(`https://api.fapi.cz/invoices/${invoiceId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${authToken}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`FAPI API failed: ${error}`);
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
    // Parse FAPI webhook data (URL encoded format: id=123&time=456&security=hash)
    const params = new URLSearchParams(event.body);
    const invoiceId = params.get('id');
    const webhookTime = params.get('time');
    const security = params.get('security');
    
    console.log('📥 FAPI webhook received:', { invoiceId, webhookTime, security });
    
    if (!invoiceId) {
      throw new Error('Missing invoice ID in webhook');
    }
    
    // ──────────────────────────────────────────
    // 🔍 FETCH INVOICE DETAILS FROM FAPI API
    // ──────────────────────────────────────────
    console.log('🔍 Fetching invoice details from FAPI API...');
    const invoice = await getInvoiceDetails(invoiceId);
    
    console.log('📄 Invoice details:', invoice);
    
    // Check if invoice is paid (FAPI uses boolean 'paid' field)
    const isPaid = invoice.paid === true;
    
    if (!isPaid) {
      console.log('⚠️ Invoice not paid yet, skipping...');
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Invoice not paid yet' })
      };
    }
    
    // Extract customer data from invoice (FAPI structure: customer.email, customer.first_name, etc.)
    const email = invoice.customer?.email;
    const firstName = invoice.customer?.first_name || '';
    const lastName = invoice.customer?.last_name || '';
    const name = `${firstName} ${lastName}`.trim() || 'Zákazník';
    const orderId = invoice.id || invoiceId;
    const amount = invoice.total || 0;
    const productName = invoice.items?.[0]?.name || 'Podnikatelská Čtvrtka';
    
    if (!email) {
      throw new Error('Missing customer email in invoice');
    }
    
    console.log('👤 Customer data:', { email, name, orderId, amount, productName });
    
    // ──────────────────────────────────────────
    // 🔑 GENERATE UNIQUE ACCESS TOKEN
    // ──────────────────────────────────────────
    const accessToken = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
    console.log('🔑 Generated token:', accessToken);
    
    // ──────────────────────────────────────────
    // 💾 SAVE TO SUPABASE
    // ──────────────────────────────────────────
    const supabase = await createSupabaseClient();
    const { data: user, error: insertError } = await supabase
      .from('users')
      .insert({
        email: email,
        name: name,
        order_id: orderId,
        access_token: accessToken,
        purchased_at: new Date().toISOString(),
        amount: parseFloat(amount),
        last_login: null // Webhook creates user, but they haven't logged in yet
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
    
    // Try to send email to customer
    try {
      await sendEmail(
        email,
        '✅ Váš přístup do kurzu je ready!',
        emailHtml
      );
      console.log('📧 Email sent to customer:', email);
    } catch (emailError) {
      console.error('⚠️ Failed to send email to customer, sending to admin instead:', emailError.message);
      
      // If Resend test mode blocks customer email, send to admin with customer info
      const adminEmail = process.env.ADMIN_EMAIL || 'cipera@byznysuj.cz';
      const adminNotification = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .alert { background: #fef2f2; border: 2px solid #fecaca; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
            .info { background: #dbeafe; border: 2px solid #93c5fd; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
            .token { background: #f3f4f6; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px; word-break: break-all; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="alert">
              <h2>⚠️ Email se nepodařilo poslat zákazníkovi</h2>
              <p><strong>Důvod:</strong> Resend test mód - může posílat jen na tvůj email</p>
              <p><strong>Řešení:</strong> Ověř doménu v Resend nebo pošli zákazníkovi link ručně</p>
            </div>
            
            <div class="info">
              <h3>📋 Informace o zákazníkovi:</h3>
              <p><strong>Jméno:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Objednávka:</strong> #${orderId}</p>
              <p><strong>Částka:</strong> ${amount} Kč</p>
              <p><strong>Produkt:</strong> ${productName}</p>
            </div>
            
            <div class="info">
              <h3>🔑 Přístupový link pro zákazníka:</h3>
              <p>Pošli tento link zákazníkovi na email <strong>${email}</strong>:</p>
              <div class="token">${courseUrl}</div>
            </div>
            
            <hr style="margin: 30px 0;">
            
            <h3>📧 Email který měl obdržet:</h3>
            ${emailHtml}
          </div>
        </body>
        </html>
      `;
      
      await sendEmail(
        adminEmail,
        `⚠️ Nový zákazník - pošli mu přístup ručně (${name})`,
        adminNotification
      );
      
      console.log('📧 Admin notification sent to:', adminEmail);
    }
    
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

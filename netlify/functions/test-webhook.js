/**
 * 🧪 TEST WEBHOOK ENDPOINT
 * 
 * Simuluje FAPI webhook pro testování email logiky
 * Použití: 
 * - POST /test-webhook?amount=4999  → Pošle PRŮKOPNÍK email
 * - POST /test-webhook?amount=8499  → Pošle NORMÁLNÍ email
 */

import fetch from 'node-fetch';

// RESEND API
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = 'Podnikatelská Čtvrtka <noreply@podnikatelskactvrtka.cz>';

async function sendEmail(to, subject, html) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [to],
      subject: subject,
      html: html
    })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${response.status} - ${error}`);
  }
  
  return await response.json();
}

export async function handler(event, context) {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  try {
    console.log('🧪 TEST WEBHOOK - Simulating FAPI payment');
    
    // Parse request
    const params = new URLSearchParams(event.body);
    const testEmail = params.get('email') || 'test@example.com';
    const testName = params.get('name') || 'Test Zákazník';
    const testAmount = parseFloat(params.get('amount') || '4999');
    
    console.log('📋 Test data:', { testEmail, testName, testAmount });
    
    // 🎯 DETECT EARLY BIRD BY PRICE
    const isEarlyBird = testAmount === 4999 || testAmount === 6049;
    
    console.log('🎯 Email type:', isEarlyBird ? 'EARLY_BIRD' : 'NORMAL');
    
    // Generate test token
    const accessToken = `TEST-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    
    // URLs
    const mainCourseUrl = `https://podnikatelskactvrtka.cz/course-v3?token=${encodeURIComponent(accessToken)}`;
    const miniCourseUrl = `https://podnikatelskactvrtka.cz/minikurz`;
    
    // 🎁 TEMPLATE A: PRŮKOPNÍK (s minikurzem)
    const earlyBirdEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🔥 PRŮKOPNÍK! Vítejte v kurzu!</h1>
          </div>
          
          <div style="background: white; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; margin-top: 0;">Ahoj ${testName}!</p>
            
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
              <p style="margin: 0; font-weight: 700; color: #92400e;">🚀 GRATULUJEME! Jste mezi průkopníky!</p>
              <p style="margin: 8px 0 0 0; font-size: 14px; color: #78350f;">Koupili jste během prvních 24 hodin a získáváte exkluzivní bonus! 🎁</p>
            </div>
            
            <p>Děkujeme za zakoupení kurzu <strong>Podnikatelská Čtvrtka</strong>! 🚀</p>
            
            <p><strong>Váš přístup je připraven:</strong></p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <p style="margin: 0 0 15px 0; font-weight: 600; color: #667eea;">📚 HLAVNÍ KURZ - Podnikatelská Čtvrtka</p>
              <a href="${mainCourseUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin-bottom: 10px;">
                Vstoupit do hlavního kurzu
              </a>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #666;">⏱️ 12 lekcí • 90 minut práce • Kompletní byznys plán</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 8px; margin: 30px 0; border: 2px solid #f59e0b;">
              <p style="margin: 0 0 15px 0; font-weight: 600; color: #92400e;">🎁 BONUS PRO PRŮKOPNÍKY - Mini Kurz</p>
              <a href="${miniCourseUrl}" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin-bottom: 10px;">
                Vstoupit do mini kurzu
              </a>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #78350f;">⚡ 5 interaktivních nástrojů • Okamžité výsledky • Praktická příprava</p>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              💡 <strong>Tip:</strong> Uložte si tento email - odkazy fungují natrvalo a můžete se kdykoliv vrátit!
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
    
    // 📧 TEMPLATE B: NORMÁLNÍ ZÁKAZNÍK (jen hlavní kurz)
    const normalEmailHtml = `
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
            <p style="font-size: 18px; margin-top: 0;">Ahoj ${testName}!</p>
            
            <p>Děkujeme za zakoupení kurzu <strong>Podnikatelská Čtvrtka</strong>! 🚀</p>
            
            <p>Váš přístup do LMS systému je připraven:</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <p style="margin: 0 0 15px 0; font-weight: 600; color: #667eea;">🔑 Váš přístupový odkaz:</p>
              <a href="${mainCourseUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
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
    
    // 🎯 CHOOSE EMAIL TEMPLATE
    const emailHtml = isEarlyBird ? earlyBirdEmailHtml : normalEmailHtml;
    const emailSubject = isEarlyBird 
      ? '🔥 PRŮKOPNÍK! Přístup do kurzu + BONUS Mini Kurz' 
      : '🎉 Přístup do kurzu Podnikatelská Čtvrtka';
    
    console.log(`📧 Sending ${isEarlyBird ? 'EARLY BIRD' : 'NORMAL'} email to ${testEmail}...`);
    
    // Send email via Resend
    const emailResult = await sendEmail(testEmail, emailSubject, emailHtml);
    
    console.log('✅ Test email sent!', emailResult);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Test email sent successfully',
        emailType: isEarlyBird ? 'EARLY_BIRD' : 'NORMAL',
        sentTo: testEmail,
        subject: emailSubject,
        accessToken: accessToken,
        emailId: emailResult.id
      })
    };
    
  } catch (error) {
    console.error('❌ Test webhook error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
}

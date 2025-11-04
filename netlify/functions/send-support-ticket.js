/**
 * NETLIFY FUNCTION: Send Support Ticket
 * 
 * Odešle support ticket na kurz@podnikatelskactvrtka.cz
 * Použito pro help tlačítko v kurzu.
 */

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only POST allowed
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    const { email, subject, message } = JSON.parse(event.body);

    // Validation
    if (!email || !subject || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Všechna pole jsou povinná' }),
      };
    }

    // Email validation
    if (!email.includes('@')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Neplatný email' }),
      };
    }

    // Import nodemailer (nebo použij Supabase Edge Functions pro posílání emailů)
    // Pro jednoduchost použijeme SMTP přes nodemailer
    const nodemailer = require('nodemailer');

    // SMTP config - použij env variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'kurz@podnikatelskactvrtka.cz',
      replyTo: email,
      subject: `[Support Ticket] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            🎫 Nový Support Ticket
          </h2>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Od:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Předmět:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #374151;">Zpráva:</h3>
            <p style="white-space: pre-wrap; color: #4b5563; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #dbeafe; border-radius: 8px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              💡 Pro odpověď stačí kliknout na "Odpovědět" - email zákazníka je v Reply-To
            </p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px;">
            <p>Odesláno z kurzu Podnikatelská Čtvrtka</p>
            <p style="margin: 5px 0;">
              Čas odeslání: ${new Date().toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })}
            </p>
          </div>
        </div>
      `,
      text: `
Nový Support Ticket

Od: ${email}
Předmět: ${subject}

Zpráva:
${message}

---
Odesláno: ${new Date().toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })}
      `.trim(),
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Zpráva odeslána',
      }),
    };

  } catch (error) {
    console.error('Error sending support ticket:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Chyba při odesílání zprávy',
        details: error.message,
      }),
    };
  }
};

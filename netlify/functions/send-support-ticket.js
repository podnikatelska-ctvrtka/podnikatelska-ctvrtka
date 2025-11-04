/**
 * NETLIFY FUNCTION: Send Support Ticket
 * 
 * Odešle support ticket na kurz@podnikatelskactvrtka.cz přes SMTP (Seznam.cz)
 * Použito pro help tlačítko v kurzu.
 */

const nodemailer = require('nodemailer');

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

    console.log('📧 Sending support ticket...');
    console.log('From:', email);
    console.log('Subject:', subject);

    // SMTP config from env variables
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = process.env.SMTP_PORT;
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;

    console.log('SMTP Config:');
    console.log('- Host:', SMTP_HOST);
    console.log('- Port:', SMTP_PORT);
    console.log('- User:', SMTP_USER);
    console.log('- Pass:', SMTP_PASS ? '***set***' : '***NOT SET***');

    // Check if all SMTP variables are set
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.error('❌ Missing SMTP credentials!');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Chybí SMTP konfigurace na serveru',
          details: {
            host: !!SMTP_HOST,
            port: !!SMTP_PORT,
            user: !!SMTP_USER,
            pass: !!SMTP_PASS,
          }
        }),
      };
    }

    // Create transporter
    // Pro Seznam.cz: port 465 používá SSL, port 587 používá TLS
    const isSSL = parseInt(SMTP_PORT) === 465;
    
    console.log('Creating SMTP transporter...');
    console.log('- SSL mode:', isSSL);

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: isSSL, // true pro port 465, false pro 587
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      // Debug logging
      logger: true,
      debug: true,
    });

    // Verify connection
    console.log('Verifying SMTP connection...');
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified!');
    } catch (verifyError) {
      console.error('❌ SMTP verification failed:', verifyError);
      throw new Error(`SMTP connection failed: ${verifyError.message}`);
    }

    // Email HTML content
    const emailHtml = `
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
    `;

    // Text version
    const emailText = `
Nový Support Ticket

Od: ${email}
Předmět: ${subject}

Zpráva:
${message}

---
Odesláno: ${new Date().toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })}
    `.trim();

    // Email options
    const mailOptions = {
      from: SMTP_USER, // Musí být tvůj Seznam.cz email
      to: 'kurz@podnikatelskactvrtka.cz',
      replyTo: email, // Reply půjde na zákazníka
      subject: `[Support Ticket] ${subject}`,
      html: emailHtml,
      text: emailText,
    };

    console.log('Sending email...');
    console.log('- From:', mailOptions.from);
    console.log('- To:', mailOptions.to);
    console.log('- Reply-To:', mailOptions.replyTo);

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);

    // Success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Zpráva odeslána',
        messageId: info.messageId,
      }),
    };

  } catch (error) {
    console.error('❌ Error sending support ticket:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Chyba při odesílání zprávy',
        details: error.message,
        type: error.name,
      }),
    };
  }
};

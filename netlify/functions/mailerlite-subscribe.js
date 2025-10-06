// MailerLite API subscription function
// Secure proxy to add subscribers to MailerLite

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
    // Parse request body
    const { email, name } = JSON.parse(event.body);
    
    console.log('📧 MailerLite subscription request:', { email, name });
    
    // Validate email
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }
    
    // MailerLite API credentials from environment variables
    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
    const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;
    
    if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
      console.error('❌ Missing MailerLite credentials in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }
    
    // ──────────────────────────────────────────
    // 📧 ADD SUBSCRIBER TO MAILERLITE
    // ──────────────────────────────────────────
    console.log('📤 Adding subscriber to MailerLite...');
    
    const mailerliteResponse = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        fields: {
          name: name || ''
        },
        groups: [MAILERLITE_GROUP_ID], // Add to "Prelaunch" group
        status: 'active', // Automatically confirm subscription
        subscribed_at: new Date().toISOString()
      })
    });
    
    const mailerliteData = await mailerliteResponse.json();
    
    if (!mailerliteResponse.ok) {
      console.error('❌ MailerLite API error:', mailerliteData);
      
      // Check for duplicate email (already subscribed)
      if (mailerliteData.message && mailerliteData.message.includes('already exists')) {
        console.log('⚠️ Subscriber already exists, returning success anyway');
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Email already subscribed',
            duplicate: true
          })
        };
      }
      
      throw new Error(`MailerLite API failed: ${JSON.stringify(mailerliteData)}`);
    }
    
    console.log('✅ Subscriber added to MailerLite:', mailerliteData.data);
    
    // ──────────────────────────────────────────
    // ✅ SUCCESS RESPONSE
    // ──────────────────────────────────────────
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Successfully subscribed to MailerLite',
        subscriber_id: mailerliteData.data.id
      })
    };
    
  } catch (error) {
    console.error('❌ Subscription error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to subscribe'
      })
    };
  }
}

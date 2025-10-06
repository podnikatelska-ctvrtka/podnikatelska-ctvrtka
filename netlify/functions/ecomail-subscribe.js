// Ecomail API subscription function
// Secure proxy to add subscribers to Ecomail list

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
    
    console.log('📧 Ecomail subscription request:', { email, name });
    
    // Validate email
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }
    
    // Ecomail API credentials from environment variables
    const ECOMAIL_API_KEY = process.env.ECOMAIL_API_KEY;
    const ECOMAIL_LIST_ID = process.env.ECOMAIL_LIST_ID;
    
    if (!ECOMAIL_API_KEY || !ECOMAIL_LIST_ID) {
      console.error('❌ Missing Ecomail credentials in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }
    
    // ──────────────────────────────────────────
    // 📧 ADD SUBSCRIBER TO ECOMAIL
    // ──────────────────────────────────────────
    console.log('📤 Adding subscriber to Ecomail...');
    
    const ecomailResponse = await fetch(`https://api2.ecomailapp.cz/lists/${ECOMAIL_LIST_ID}/subscribe`, {
      method: 'POST',
      headers: {
        'key': ECOMAIL_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subscriber_data: {
          email: email,
          name: name || '',
          surname: ''
        },
        trigger_autoresponders: true, // Spustí automation
        update_existing: true,
        resubscribe: true
      })
    });
    
    const ecomailData = await ecomailResponse.json();
    
    if (!ecomailResponse.ok) {
      console.error('❌ Ecomail API error:', ecomailData);
      
      // Check for duplicate email
      if (ecomailData.errors && ecomailData.errors.email) {
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
      
      throw new Error(`Ecomail API failed: ${JSON.stringify(ecomailData)}`);
    }
    
    console.log('✅ Subscriber added to Ecomail:', ecomailData);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Successfully subscribed to Ecomail'
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

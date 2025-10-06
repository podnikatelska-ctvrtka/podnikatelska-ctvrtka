// Smartemailing API subscription function
// Secure proxy to add subscribers to Smartemailing list

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
    
    console.log('📧 Smartemailing subscription request:', { email, name });
    
    // Validate email
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }
    
    // Smartemailing API credentials from environment variables
    const SMARTEMAILING_USERNAME = process.env.SMARTEMAILING_USERNAME;
    const SMARTEMAILING_API_KEY = process.env.SMARTEMAILING_API_KEY;
    const SMARTEMAILING_LIST_ID = process.env.SMARTEMAILING_LIST_ID;
    
    if (!SMARTEMAILING_USERNAME || !SMARTEMAILING_API_KEY || !SMARTEMAILING_LIST_ID) {
      console.error('❌ Missing Smartemailing credentials in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }
    
    // Create Basic Auth token
    const authToken = Buffer.from(`${SMARTEMAILING_USERNAME}:${SMARTEMAILING_API_KEY}`).toString('base64');
    
    // ──────────────────────────────────────────
    // 📧 ADD SUBSCRIBER TO SMARTEMAILING
    // ──────────────────────────────────────────
    console.log('📤 Adding subscriber to Smartemailing...');
    
    const smartemailingResponse = await fetch(`https://app.smartemailing.cz/api/v3/import`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        settings: {
          update: true, // Update existing contacts
          add_to_lists: [parseInt(SMARTEMAILING_LIST_ID)],
          field_policy: 'FILL_IN_EMPTY'
        },
        data: [{
          emailaddress: email,
          name: name || '',
          surname: '',
          // Custom fields podle potřeby
          customfields: {
            // source: 'landing_page_prelaunch'
          }
        }]
      })
    });
    
    const smartemailingData = await smartemailingResponse.json();
    
    if (!smartemailingResponse.ok) {
      console.error('❌ Smartemailing API error:', smartemailingData);
      
      // Check for duplicate (already exists = success)
      if (smartemailingData.status === 'ok' || smartemailingData.message?.includes('already exists')) {
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
      
      throw new Error(`Smartemailing API failed: ${JSON.stringify(smartemailingData)}`);
    }
    
    console.log('✅ Subscriber added to Smartemailing:', smartemailingData);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Successfully subscribed to Smartemailing',
        data: smartemailingData
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

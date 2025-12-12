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
    const { email, name, isWaitlist } = JSON.parse(event.body);
    
    console.log('📧 Smartemailing subscription request:', { email, name, isWaitlist });
    
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
    console.log('📤 Adding subscriber to Smartemailing:', email);
    
    const smartemailingResponse = await fetch(`https://app.smartemailing.cz/api/v3/import`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        settings: {
          update: true, // Update existing contacts
          field_policy: 'FILL_IN_EMPTY'
        },
        data: [{
          emailaddress: email,
          name: name || '',
          surname: '',
          contactlists: [
            {
              id: parseInt(SMARTEMAILING_LIST_ID),
              status: 'confirmed' // Důležité: status kontaktu v listu
            }
          ],
          // 🎯 Custom fields - tag pro waitlist
          customfields: [
            {
              id: 4, // source
              value: isWaitlist ? 'landing_page_waitlist' : 'landing_page_prelaunch'
            },
            {
              id: 2, // waitlist
              value: isWaitlist ? 'true' : 'false'
            },
            {
              id: 6, // purchased
              value: '' // Initialize for later webhook update
            }
          ]
        }]
      })
    });
    
    const smartemailingData = await smartemailingResponse.json();
    
    // ⚠️ DŮLEŽITÉ: Smartemailing vrací různé statusy při úspěchu!
    // "ok" = update existujícího kontaktu
    // "created" = nový kontakt vytvořen
    // "error" = chyba
    const successStatuses = ['ok', 'created'];
    
    if (!smartemailingResponse.ok || !successStatuses.includes(smartemailingData.status)) {
      console.error('❌ Smartemailing API error:', smartemailingData);
      throw new Error(`Smartemailing API failed: ${JSON.stringify(smartemailingData)}`);
    }
    
    console.log('✅ Subscriber added to Smartemailing:', smartemailingData);
    
    // Extract contact info from response
    const contactInfo = smartemailingData.data?.[0] || smartemailingData;
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: smartemailingData.status === 'created' 
          ? 'Email successfully added to Smartemailing list!'
          : 'Email updated in Smartemailing list!',
        status: smartemailingData.status,
        contactId: contactInfo.contact_id,
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
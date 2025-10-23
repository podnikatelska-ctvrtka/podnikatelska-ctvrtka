/**
 * GoPay Webhook - Netlify Function
 * 
 * Zpracovává notifikace z GoPay API po platbě
 * - PAYMENT_PAID → vytvoří uživatele v Supabase a pošle email
 */

const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

// Supabase setup
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// GoPay API credentials
const {
  GOPAY_CLIENT_ID,
  GOPAY_CLIENT_SECRET,
  GOPAY_ENVIRONMENT = 'sandbox',
} = process.env;

// GoPay API URL
const GOPAY_API_URL = GOPAY_ENVIRONMENT === 'production'
  ? 'https://gate.gopay.cz/api'
  : 'https://gw.sandbox.gopay.com/api';

// Smartemailing API
const SMARTEMAILING_USERNAME = process.env.SMARTEMAILING_USERNAME;
const SMARTEMAILING_API_KEY = process.env.SMARTEMAILING_API_KEY;

/**
 * Získá OAuth access token z GoPay API
 */
async function getAccessToken() {
  try {
    const response = await axios.post(
      `${GOPAY_API_URL}/oauth2/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'payment-all',
      }),
      {
        auth: {
          username: GOPAY_CLIENT_ID,
          password: GOPAY_CLIENT_SECRET,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('GoPay OAuth error:', error.response?.data || error.message);
    throw new Error('Failed to get GoPay access token');
  }
}

/**
 * Získá detaily platby z GoPay API
 */
async function getPaymentDetails(accessToken, paymentId) {
  try {
    const response = await axios.get(
      `${GOPAY_API_URL}/payments/payment/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('GoPay get payment error:', error.response?.data || error.message);
    throw new Error('Failed to get payment details');
  }
}

/**
 * Vygeneruje náhodný access token
 */
function generateAccessToken() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
}

/**
 * Přidá kontakt do Smartemailing
 */
async function addToSmartEmailing(email, firstName, lastName, tags = []) {
  if (!SMARTEMAILING_USERNAME || !SMARTEMAILING_API_KEY) {
    console.log('⚠️ Smartemailing credentials not configured, skipping...');
    return;
  }

  try {
    const response = await axios.post(
      'https://app.smartemailing.cz/api/v3/import',
      {
        settings: {
          update: true,
          add_namedays: false,
          add_birthdays: false,
        },
        data: [
          {
            emailaddress: email,
            name: firstName,
            surname: lastName,
            contactlists: [1], // Hlavní seznam (ID 1)
            tags: tags,
          },
        ],
      },
      {
        auth: {
          username: SMARTEMAILING_USERNAME,
          password: SMARTEMAILING_API_KEY,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ Added to Smartemailing:', email);
    return response.data;
  } catch (error) {
    console.error('❌ Smartemailing error:', error.response?.data || error.message);
  }
}

/**
 * Zpracuje úspěšnou platbu
 */
async function handleSuccessfulPayment(payment) {
  const email = payment.payer.contact.email;
  const firstName = payment.payer.contact.first_name;
  const lastName = payment.payer.contact.last_name;
  const amount = payment.amount / 100; // Convert halers to CZK
  const paymentId = payment.id;
  const orderNumber = payment.order_number;

  console.log(`💰 Processing successful payment for: ${email}`);

  // 1. Check if user already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) {
    console.log('ℹ️ User already exists:', email);
    
    // Update order record
    await supabase
      .from('orders')
      .update({
        payment_id: paymentId,
        status: 'paid',
        updated_at: new Date().toISOString(),
      })
      .eq('order_number', orderNumber);

    return {
      success: true,
      message: 'User already exists',
      access_token: existingUser.access_token,
    };
  }

  // 2. Generate access token
  const accessToken = generateAccessToken();

  // 3. Create user in Supabase
  const { data: newUser, error: userError } = await supabase
    .from('users')
    .insert([
      {
        email: email,
        first_name: firstName,
        last_name: lastName,
        access_token: accessToken,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (userError) {
    console.error('❌ Failed to create user:', userError);
    throw new Error('Failed to create user in database');
  }

  console.log('✅ User created:', newUser.id);

  // 4. Create order record
  const { error: orderError } = await supabase
    .from('orders')
    .insert([
      {
        email: email,
        payment_id: paymentId,
        order_number: orderNumber,
        amount: amount,
        currency: 'CZK',
        status: 'paid',
        created_at: new Date().toISOString(),
      },
    ]);

  if (orderError) {
    console.error('❌ Failed to create order:', orderError);
  } else {
    console.log('✅ Order created');
  }

  // 5. Add to Smartemailing with 'purchased' tag
  await addToSmartEmailing(email, firstName, lastName, ['purchased']);

  // 6. TODO: Send email with access link
  // Email by měl obsahovat link: https://podnikatelskactvrtka.cz/course-v3?token={accessToken}
  
  console.log('🎉 Payment processing complete!');
  console.log(`🔗 Access link: https://podnikatelskactvrtka.cz/course-v3?token=${accessToken}`);

  return {
    success: true,
    user_id: newUser.id,
    access_token: accessToken,
  };
}

/**
 * Netlify Function handler
 */
exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse webhook payload
    const body = JSON.parse(event.body);
    const { id: paymentId } = body;

    console.log('📥 GoPay webhook received for payment:', paymentId);

    // Get OAuth token
    const accessToken = await getAccessToken();

    // Get payment details
    const payment = await getPaymentDetails(accessToken, paymentId);

    console.log('💳 Payment state:', payment.state);

    // Process based on payment state
    if (payment.state === 'PAID') {
      const result = await handleSuccessfulPayment(payment);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Payment processed successfully',
          ...result,
        }),
      };
    } else if (payment.state === 'CANCELED') {
      console.log('❌ Payment canceled:', paymentId);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Payment canceled',
        }),
      };
    } else if (payment.state === 'TIMEOUTED') {
      console.log('⏰ Payment timed out:', paymentId);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Payment timed out',
        }),
      };
    } else {
      console.log('ℹ️ Payment state not processed:', payment.state);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Webhook received but not processed',
          state: payment.state,
        }),
      };
    }
  } catch (error) {
    console.error('❌ GoPay webhook error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Webhook processing failed',
        message: error.message,
      }),
    };
  }
};

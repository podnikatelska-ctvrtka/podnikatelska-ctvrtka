/**
 * GoPay Create Payment - Netlify Function
 * 
 * Vytvoří platbu v GoPay API a vrátí payment_url pro redirect
 */

const axios = require('axios');

// GoPay API credentials z environment variables
const {
  GOPAY_GOID,
  GOPAY_CLIENT_ID,
  GOPAY_CLIENT_SECRET,
  GOPAY_ENVIRONMENT = 'sandbox', // 'sandbox' nebo 'production'
  GOPAY_RETURN_URL,
  GOPAY_NOTIFY_URL,
} = process.env;

// GoPay API URL based on environment
const GOPAY_API_URL = GOPAY_ENVIRONMENT === 'production'
  ? 'https://gate.gopay.cz/api'
  : 'https://gw.sandbox.gopay.com/api';

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
 * Vytvoří platbu v GoPay API
 */
async function createPayment(accessToken, paymentData) {
  try {
    const response = await axios.post(
      `${GOPAY_API_URL}/payments/payment`,
      {
        payer: {
          default_payment_instrument: 'PAYMENT_CARD',
          allowed_payment_instruments: ['PAYMENT_CARD', 'BANK_ACCOUNT'],
          contact: {
            first_name: paymentData.firstName,
            last_name: paymentData.lastName,
            email: paymentData.email,
            phone_number: paymentData.phone || '',
          },
        },
        target: {
          type: 'ACCOUNT',
          goid: GOPAY_GOID,
        },
        amount: paymentData.amount * 100, // Amount in halers (1 Kč = 100 haléřů)
        currency: 'CZK',
        order_number: paymentData.orderNumber,
        order_description: paymentData.productName,
        items: [
          {
            name: paymentData.productName,
            amount: paymentData.amount * 100,
            count: 1,
          },
        ],
        callback: {
          return_url: GOPAY_RETURN_URL,
          notification_url: GOPAY_NOTIFY_URL,
        },
        lang: 'CS',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('GoPay create payment error:', error.response?.data || error.message);
    throw new Error('Failed to create GoPay payment');
  }
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
    // Parse request body
    const body = JSON.parse(event.body);
    const {
      firstName,
      lastName,
      email,
      phone,
      amount,
      productName,
      orderNumber,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !amount || !productName || !orderNumber) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields',
        }),
      };
    }

    // Get OAuth token
    console.log('🔐 Getting GoPay access token...');
    const accessToken = await getAccessToken();

    // Create payment
    console.log('💳 Creating GoPay payment...');
    const payment = await createPayment(accessToken, {
      firstName,
      lastName,
      email,
      phone,
      amount,
      productName,
      orderNumber,
    });

    console.log('✅ Payment created:', payment.id);

    // Return payment URL for redirect
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        payment_id: payment.id,
        payment_url: payment.gw_url, // URL pro redirect na GoPay bránu
        state: payment.state,
      }),
    };
  } catch (error) {
    console.error('❌ GoPay payment creation failed:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to create payment',
        message: error.message,
      }),
    };
  }
};

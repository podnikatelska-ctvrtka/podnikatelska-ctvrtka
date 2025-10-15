// FAPI Create Order Function
// Creates a contact and order in FAPI, returns payment URL

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { firstName, lastName, email, phone, productId, productName, price } = JSON.parse(event.body);

    // Validate required fields
    if (!firstName || !lastName || !email || !productId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // FAPI credentials from environment
    const FAPI_API_KEY = process.env.FAPI_API_KEY;
    const FAPI_ACCOUNT_ID = process.env.FAPI_ACCOUNT_ID;

    if (!FAPI_API_KEY || !FAPI_ACCOUNT_ID) {
      console.error('Missing FAPI credentials');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    // FAPI API endpoint
    const FAPI_API_URL = `https://app.fapi.cz/api/v1/accounts/${FAPI_ACCOUNT_ID}`;

    // 1. Create/Update Contact in FAPI
    const contactData = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      phone: phone || '',
    };

    const contactResponse = await fetch(`${FAPI_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FAPI_API_KEY}`,
      },
      body: JSON.stringify(contactData),
    });

    if (!contactResponse.ok) {
      const errorText = await contactResponse.text();
      console.error('FAPI contact creation failed:', errorText);
      throw new Error('Failed to create contact');
    }

    const contact = await contactResponse.json();

    // 2. Create Order in FAPI
    const orderData = {
      contact_id: contact.id,
      product_id: parseInt(productId),
      status: 'pending', // Order status before payment
      amount: price,
      currency: 'CZK',
      // Add UTM parameters if available
      utm_source: event.headers['x-utm-source'] || '',
      utm_medium: event.headers['x-utm-medium'] || '',
      utm_campaign: event.headers['x-utm-campaign'] || '',
    };

    const orderResponse = await fetch(`${FAPI_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FAPI_API_KEY}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!orderResponse.ok) {
      const errorText = await orderResponse.text();
      console.error('FAPI order creation failed:', errorText);
      throw new Error('Failed to create order');
    }

    const order = await orderResponse.json();

    // 3. Get Payment URL from FAPI
    // FAPI automatically generates payment URL for the order
    const paymentUrl = order.payment_url || `https://app.fapi.cz/payment/${order.id}`;

    // Return success with payment URL
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        orderId: order.id,
        paymentUrl: paymentUrl,
        message: 'Order created successfully',
      }),
    };

  } catch (error) {
    console.error('FAPI order error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to create order',
        message: error.message,
      }),
    };
  }
};

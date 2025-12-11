// TidyCal Webhook Handler
// Přijímá booking events z TidyCal a trackuje je do Meta Pixel

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
    const payload = JSON.parse(event.body);
    
    console.log('📅 TidyCal webhook received:', {
      event: payload.event,
      booking_id: payload.booking?.id,
      email: payload.booking?.email
    });
    
    // ──────────────────────────────────────────
    // 🎯 TRACK TO META PIXEL (Conversions API)
    // ──────────────────────────────────────────
    
    // NOTE: Toto je alternativa k přímému Meta Pixel trackovánímeta pixel code v TidyCal.
    // Pokud máš Meta Pixel přímo v TidyCal, tato funkce není nutná.
    
    const META_PIXEL_ID = process.env.META_PIXEL_ID;
    const META_ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN;
    
    if (META_PIXEL_ID && META_ACCESS_TOKEN && payload.event === 'booking.created') {
      const booking = payload.booking;
      
      // Vytvoř event data pro Meta Conversions API
      const eventData = {
        data: [{
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: 'https://podnikatelskactvrtka.cz/konzultace',
          user_data: {
            em: booking.email ? hashEmail(booking.email) : null,
            ph: booking.phone ? hashPhone(booking.phone) : null,
            fn: booking.first_name ? hashName(booking.first_name) : null,
            ln: booking.last_name ? hashName(booking.last_name) : null,
          },
          custom_data: {
            content_name: 'Free Consultation Booking',
            value: 0,
            currency: 'CZK'
          }
        }]
      };
      
      // Pošli do Meta Conversions API
      const metaResponse = await fetch(
        `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...eventData,
            access_token: META_ACCESS_TOKEN
          })
        }
      );
      
      const metaData = await metaResponse.json();
      
      if (metaResponse.ok) {
        console.log('✅ Meta Conversions API: Lead event tracked', metaData);
      } else {
        console.error('⚠️ Meta Conversions API error:', metaData);
      }
    }
    
    // ──────────────────────────────────────────
    // ✅ SUCCESS RESPONSE
    // ──────────────────────────────────────────
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Webhook received and processed'
      })
    };
    
  } catch (error) {
    console.error('❌ TidyCal webhook error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to process webhook'
      })
    };
  }
}

// ──────────────────────────────────────────
// HELPER FUNCTIONS - SHA256 Hashing
// ──────────────────────────────────────────
// Meta requires PII to be hashed with SHA256

function hashEmail(email) {
  // Normalize: lowercase, trim whitespace
  const normalized = email.toLowerCase().trim();
  return sha256(normalized);
}

function hashPhone(phone) {
  // Normalize: remove spaces, dashes, parentheses
  const normalized = phone.replace(/[\s\-()]/g, '');
  return sha256(normalized);
}

function hashName(name) {
  // Normalize: lowercase, trim, remove special chars
  const normalized = name.toLowerCase().trim().replace(/[^a-z]/g, '');
  return sha256(normalized);
}

async function sha256(str) {
  // Use Node.js crypto if available, otherwise Web Crypto API
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const msgBuffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } else {
    // Fallback for Node.js environment
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(str).digest('hex');
  }
}

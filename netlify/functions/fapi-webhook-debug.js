// ====================================
// FAPI WEBHOOK DEBUG VERSION
// ====================================
// Verze pro debugging - loguje VŠECHNO!
// URL: https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook-debug

export async function handler(event, context) {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║         🐛 FAPI WEBHOOK DEBUG - START                      ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1️⃣ REQUEST INFO
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n📥 REQUEST INFO:');
  console.log('Method:', event.httpMethod);
  console.log('Path:', event.path);
  console.log('Headers:', JSON.stringify(event.headers, null, 2));
  console.log('Query:', event.queryStringParameters);
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2️⃣ BODY DATA
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n📦 BODY:');
  console.log('Body (raw):', event.body);
  console.log('Body length:', event.body?.length || 0);
  
  // Parse jako URL params
  if (event.body) {
    try {
      const params = new URLSearchParams(event.body);
      console.log('\n🔑 PARSED PARAMS:');
      for (const [key, value] of params.entries()) {
        console.log(`  ${key}: ${value}`);
      }
    } catch (e) {
      console.log('❌ Failed to parse as URL params:', e.message);
    }
    
    // Parse jako JSON
    try {
      const json = JSON.parse(event.body);
      console.log('\n📄 PARSED JSON:');
      console.log(JSON.stringify(json, null, 2));
    } catch (e) {
      console.log('ℹ️ Not JSON format (OK pro FAPI)');
    }
  }
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3️⃣ ENV VARIABLES CHECK
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n🔐 ENV VARIABLES:');
  console.log('FAPI_USERNAME:', process.env.FAPI_USERNAME ? '✅ SET' : '❌ MISSING');
  console.log('FAPI_API_KEY:', process.env.FAPI_API_KEY ? '✅ SET' : '❌ MISSING');
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ SET' : '❌ MISSING');
  console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ SET' : '❌ MISSING');
  console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✅ SET' : '❌ MISSING');
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4️⃣ TIMESTAMP
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n⏰ TIMESTAMP:', new Date().toISOString());
  console.log('🌍 Timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
  
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║         🐛 FAPI WEBHOOK DEBUG - END                        ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  // Return success
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: '✅ Debug webhook received!',
      timestamp: new Date().toISOString(),
      method: event.httpMethod,
      bodyLength: event.body?.length || 0,
      env: {
        hasFapiUsername: !!process.env.FAPI_USERNAME,
        hasFapiApiKey: !!process.env.FAPI_API_KEY,
        hasSupabase: !!process.env.SUPABASE_URL,
        hasResend: !!process.env.RESEND_API_KEY
      }
    }, null, 2)
  };
}

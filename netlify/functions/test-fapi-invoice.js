// ====================================
// FAPI INVOICE TEST - Get invoice data
// ====================================
// URL: https://podnikatelskactvrtka.cz/.netlify/functions/test-fapi-invoice?id=INVOICE_ID

export async function handler(event, context) {
  // Only accept GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  try {
    // Get invoice ID from query params
    const invoiceId = event.queryStringParameters?.id;
    
    if (!invoiceId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Missing invoice ID',
          usage: '?id=INVOICE_ID'
        })
      };
    }
    
    console.log('🧪 Testing FAPI invoice fetch for ID:', invoiceId);
    
    // ──────────────────────────────────────────
    // 📞 FETCH INVOICE FROM FAPI API
    // ──────────────────────────────────────────
    const fapiUsername = process.env.FAPI_USERNAME;
    const fapiApiKey = process.env.FAPI_API_KEY;
    
    if (!fapiUsername || !fapiApiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'FAPI credentials not configured',
          hasUsername: !!fapiUsername,
          hasApiKey: !!fapiApiKey
        })
      };
    }
    
    console.log('🔐 Fetching invoice from FAPI API...');
    
    const authString = Buffer.from(`${fapiUsername}:${fapiApiKey}`).toString('base64');
    
    const fapiResponse = await fetch(`https://api.fapi.cz/invoices/${invoiceId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${authString}`
      }
    });
    
    console.log('📡 FAPI Response Status:', fapiResponse.status);
    
    if (!fapiResponse.ok) {
      const errorText = await fapiResponse.text();
      console.log('❌ FAPI Error:', errorText);
      
      return {
        statusCode: fapiResponse.status,
        body: JSON.stringify({
          error: `FAPI API error: ${fapiResponse.status}`,
          details: errorText,
          invoiceId: invoiceId
        })
      };
    }
    
    const invoice = await fapiResponse.json();
    console.log('✅ Invoice fetched successfully');
    
    // ──────────────────────────────────────────
    // 🔍 ANALYZE INVOICE DATA
    // ──────────────────────────────────────────
    const analysis = {
      invoiceId: invoiceId,
      rawInvoiceData: invoice,
      
      // Check for various PDF URL keys
      urlAnalysis: {
        pdf_url: invoice.pdf_url || null,
        invoice_url: invoice.invoice_url || null,
        pdf: invoice.pdf || null,
        download_url: invoice.download_url || null,
        file_url: invoice.file_url || null,
        document_url: invoice.document_url || null,
      },
      
      // All possible URL formats
      possibleUrls: {
        detailPageWithPlural: `https://app.fapi.cz/invoices/${invoiceId}`,
        detailPageSingular: `https://app.fapi.cz/invoice/${invoiceId}`,
        apiPdfEndpoint: `https://api.fapi.cz/invoices/${invoiceId}/pdf`,
        apiDownloadEndpoint: `https://api.fapi.cz/invoices/${invoiceId}/download`,
      },
      
      // Recommended URL
      recommendedUrl: null,
      hasDirectPdfUrl: false,
      
      // All top-level keys in response
      responseKeys: Object.keys(invoice)
    };
    
    // Determine recommended URL
    if (invoice.pdf_url) {
      analysis.recommendedUrl = invoice.pdf_url;
      analysis.hasDirectPdfUrl = true;
    } else if (invoice.invoice_url) {
      analysis.recommendedUrl = invoice.invoice_url;
    } else if (invoice.pdf) {
      analysis.recommendedUrl = invoice.pdf;
      analysis.hasDirectPdfUrl = true;
    } else if (invoice.download_url) {
      analysis.recommendedUrl = invoice.download_url;
      analysis.hasDirectPdfUrl = true;
    } else {
      analysis.recommendedUrl = `https://app.fapi.cz/invoices/${invoiceId}`;
    }
    
    console.log('✅ Analysis complete');
    console.log('📄 Recommended URL:', analysis.recommendedUrl);
    console.log('📄 Has direct PDF:', analysis.hasDirectPdfUrl);
    
    // ──────────────────────────────────────────
    // ✅ RETURN ANALYSIS
    // ──────────────────────────────────────────
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(analysis, null, 2)
    };
    
  } catch (error) {
    console.error('❌ Test error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        stack: error.stack
      })
    };
  }
}

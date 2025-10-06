import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function FAPITest() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testFAPIAPI = async () => {
    setTesting(true);
    setError(null);
    setResult(null);

    const invoiceId = '208254786'; // Test objednávka ID
    const username = 'cipera@iting.cz';
    const apiKey = 'BWrfhdLmc0Z0APdn3XNAiExq0';
    
    // Create Basic Auth token
    const authToken = btoa(`${username}:${apiKey}`);

    console.log('🔍 Testuji FAPI API...');
    console.log('📄 Invoice ID:', invoiceId);
    console.log('🔑 Auth: Basic Auth (username + API key)');

    try {
      const response = await fetch(`https://api.fapi.cz/invoices/${invoiceId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ FAPI API error:', errorText);
        setError(`HTTP ${response.status}: ${errorText}`);
        setTesting(false);
        return;
      }

      const invoice = await response.json();

      console.log('✅ Invoice details:', invoice);
      console.log('─────────────────────────────');
      console.log('📧 Email:', invoice.email || invoice.client_email || invoice.buyer_email);
      console.log('👤 Name:', invoice.name || invoice.client_name || invoice.buyer_name);
      console.log('💰 Amount:', invoice.total || invoice.amount);
      console.log('✔️ Status:', invoice.status);
      console.log('💳 Paid:', invoice.status === 'paid' || invoice.payment_status === 'paid' || invoice.paid === true);
      console.log('─────────────────────────────');

      setResult(invoice);
      setTesting(false);
    } catch (err: any) {
      console.error('❌ Error:', err);
      setError(err.message);
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2">🧪 FAPI API Test</h1>
            <p className="text-gray-600">Test FAPI API endpoint - získání detailů faktury</p>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">📋 Test parametry:</h3>
            <div className="space-y-1 text-sm font-mono">
              <div><span className="text-gray-600">Invoice ID:</span> 208254786</div>
              <div><span className="text-gray-600">Username:</span> cipera@iting.cz</div>
              <div><span className="text-gray-600">API Key:</span> BWrf...Exq0</div>
              <div><span className="text-gray-600">Auth Type:</span> Basic Authentication</div>
              <div><span className="text-gray-600">Endpoint:</span> https://api.fapi.cz/invoices/208254786</div>
            </div>
          </div>

          <Button 
            onClick={testFAPIAPI} 
            disabled={testing}
            className="w-full h-14 text-lg mb-6"
          >
            {testing ? '⏳ Testuji FAPI API...' : '🚀 SPUSTIT TEST'}
          </Button>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">❌ Chyba:</h3>
              <pre className="text-sm text-red-700 whitespace-pre-wrap">{error}</pre>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-3">✅ FAPI API odpověď:</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="p-3 bg-white rounded border">
                    <span className="text-gray-600 text-sm">📧 Email:</span>
                    <div className="font-mono font-semibold">
                      {result.email || result.client_email || result.buyer_email || '❌ NENALEZENO'}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white rounded border">
                    <span className="text-gray-600 text-sm">👤 Jméno:</span>
                    <div className="font-mono font-semibold">
                      {result.name || result.client_name || result.buyer_name || '❌ NENALEZENO'}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white rounded border">
                    <span className="text-gray-600 text-sm">💰 Částka:</span>
                    <div className="font-mono font-semibold">
                      {result.total || result.amount || '❌ NENALEZENO'}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white rounded border">
                    <span className="text-gray-600 text-sm">✔️ Status:</span>
                    <div className="font-mono font-semibold">
                      {result.status || result.payment_status || '❌ NENALEZENO'}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white rounded border">
                    <span className="text-gray-600 text-sm">💳 Zaplaceno?</span>
                    <div className="font-mono font-semibold">
                      {(result.status === 'paid' || result.payment_status === 'paid' || result.paid === true) ? '✅ ANO' : '❌ NE'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">📦 Celý JSON response:</h3>
                <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-96">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">📸 Další krok:</h3>
                <p className="text-sm text-blue-700">
                  Udělej <strong>screenshot této stránky</strong> a pošli mi ho! Podle toho doladím webhook function.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

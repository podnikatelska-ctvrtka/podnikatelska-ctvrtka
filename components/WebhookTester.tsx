import { useState } from 'react';
import { ArrowLeft, Send, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function WebhookTester() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState<'4999' | '8499'>('4999');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleTest = async () => {
    if (!email || !name) {
      setError('Vyplň email a jméno');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await fetch('/.netlify/functions/test-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email,
          name,
          amount,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Chyba při odesílání');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">🧪 Webhook Tester</h1>
              <p className="text-sm text-gray-600">Testování FAPI webhook logic bez reálné platby</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-blue-900 mb-2">ℹ️ Jak to funguje?</h2>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Vyber částku (4.999 Kč nebo 8.499 Kč)</li>
            <li>• Zadej svůj testovací email a jméno</li>
            <li>• Klikni "Odeslat test email"</li>
            <li>• Email přijde do tvé schránky během pár sekund</li>
          </ul>
        </div>
        
        {/* Test Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Testovací parametry:</h2>
          
          {/* Amount Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Částka (určuje typ emailu):
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setAmount('4999')}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  amount === '4999'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🔥</span>
                  <h3 className="font-bold text-gray-900">4.999 Kč</h3>
                </div>
                <p className="text-sm text-gray-600">Early Bird (Průkopník)</p>
                <div className="mt-2 space-y-1 text-xs text-gray-500">
                  <p>✅ Hlavní kurz</p>
                  <p>🎁 BONUS: Mini kurz</p>
                </div>
              </button>
              
              <button
                onClick={() => setAmount('8499')}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  amount === '8499'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🎉</span>
                  <h3 className="font-bold text-gray-900">8.499 Kč</h3>
                </div>
                <p className="text-sm text-gray-600">Full Price (Normální)</p>
                <div className="mt-2 space-y-1 text-xs text-gray-500">
                  <p>✅ Hlavní kurz</p>
                  <p>❌ Žádný bonus</p>
                </div>
              </button>
            </div>
          </div>
          
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Testovací email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tvuj@email.cz"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jméno zákazníka:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jan Novák"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Send Button */}
          <button
            onClick={handleTest}
            disabled={loading || !email || !name}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Odesílám email...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Odeslat test email
              </>
            )}
          </button>
        </div>
        
        {/* Result */}
        {result && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-lg font-semibold text-green-900">Email úspěšně odeslán!</h2>
            </div>
            <div className="space-y-2 text-sm text-green-800">
              <p><strong>Email typ:</strong> {result.emailType === 'EARLY_BIRD' ? '🔥 Průkopník' : '🎉 Normální'}</p>
              <p><strong>Odesláno na:</strong> {result.sentTo}</p>
              <p><strong>Subject:</strong> {result.subject}</p>
              <p><strong>Token:</strong> <code className="bg-green-100 px-2 py-1 rounded">{result.accessToken}</code></p>
              <p className="mt-4 text-xs text-green-700">✅ Zkontroluj svou emailovou schránku (včetně SPAMu)</p>
            </div>
          </div>
        )}
        
        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-6 h-6 text-red-600" />
              <h2 className="text-lg font-semibold text-red-900">Chyba</h2>
            </div>
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}
        
        {/* Debug Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2 text-sm">🔧 Debug Info:</h3>
          <div className="space-y-1 text-xs text-gray-600 font-mono">
            <p><strong>Endpoint:</strong> /.netlify/functions/test-webhook</p>
            <p><strong>Metoda:</strong> POST</p>
            <p><strong>Parametry:</strong> email, name, amount</p>
            <p><strong>Detekce:</strong> amount === 4999 → EARLY_BIRD | amount === 8499 → NORMAL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

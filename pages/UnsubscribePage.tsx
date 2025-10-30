import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';

export default function UnsubscribePage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already'>('loading');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    // Získáme email z URL parametrů
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email') || params.get('e') || '';
    setEmail(emailParam);

    // Simulace odhlášení (v reálu by šlo na SmartEmailing API)
    const handleUnsubscribe = async () => {
      try {
        // Počkáme chvíli (simulace API call)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // V reálné implementaci:
        // const response = await fetch('/netlify/functions/smartemailing-unsubscribe', {
        //   method: 'POST',
        //   body: JSON.stringify({ email: emailParam })
        // });
        
        // Pro teď jen označíme jako úspěšné
        setStatus('success');
      } catch (error) {
        console.error('Chyba při odhlašování:', error);
        setStatus('error');
      }
    };

    if (emailParam) {
      handleUnsubscribe();
    } else {
      setStatus('error');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        
        {/* Loading State */}
        {status === 'loading' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h1 className="mb-2 text-gray-900">
              Odhlašuji...
            </h1>
            <p className="text-gray-600">
              Probíhá odhlášení z odběru emailů.
            </p>
          </div>
        )}

        {/* Success State */}
        {status === 'success' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="mb-2 text-gray-900">
              Odhlášení proběhlo úspěšně
            </h1>
            <p className="text-gray-600 mb-6">
              Email <strong className="text-gray-900">{email}</strong> byl odhlášen z odběru.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-900">
                ✅ Od teďka už ti nebudeme posílat žádné další emaily.
              </p>
            </div>

            <div className="space-y-3">
              <a 
                href="https://podnikatelskactvrtka.cz"
                className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Zpět na úvodní stránku
              </a>
              
              <details className="text-left">
                <summary className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors">
                  Změnil jsi názor? ↓
                </summary>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-700 mb-3">
                    Pokud jsi si to rozmyslel a chceš se vrátit k odběru:
                  </p>
                  <a 
                    href="https://podnikatelskactvrtka.cz"
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
                  >
                    <Mail className="w-4 h-4" />
                    Přihlásit se znovu
                  </a>
                </div>
              </details>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="mb-2 text-gray-900">
              Něco se pokazilo
            </h1>
            <p className="text-gray-600 mb-6">
              Nepodařilo se odhlásit z odběru emailů.
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-900">
                Zkus to prosím znovu kliknutím na odkaz v emailu, nebo nás kontaktuj.
              </p>
            </div>

            <a 
              href="https://podnikatelskactvrtka.cz"
              className="block w-full bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Zpět na úvodní stránku
            </a>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Máš dotazy? Napiš na{' '}
            <a href="mailto:podpora@podnikatelskactvrtka.cz" className="text-indigo-600 hover:text-indigo-800">
              podpora@podnikatelskactvrtka.cz
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}

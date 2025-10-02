import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user already accepted cookies
    const consent = localStorage.getItem('pvs_cookie_consent');
    if (!consent) {
      // Show banner after 1 second delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('pvs_cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('pvs_cookie_consent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Text */}
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🍪</span>
                <div>
                  <h3 className="text-gray-900 font-semibold mb-1">
                    Používáme cookies
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Používáme pouze nezbytné cookies pro základní funkčnost webu (např. uložení vašeho pokroku v kurzu). 
                    Nesledujeme vás a neprodáváme vaše data třetím stranám.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 md:flex-shrink-0">
              <button
                onClick={rejectCookies}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Odmítnout
              </button>
              <button
                onClick={acceptCookies}
                className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg rounded-lg transition-all"
              >
                Souhlasím
              </button>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={rejectCookies}
            className="absolute top-3 right-3 md:hidden p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Zavřít"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

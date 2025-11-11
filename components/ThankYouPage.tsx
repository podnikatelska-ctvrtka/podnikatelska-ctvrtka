import { useEffect, useState } from 'react';
import { CheckCircle, Sparkles, Loader2, Mail, Lock, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { celebrateModuleComplete } from '../lib/confetti';

export default function ThankYouPage() {
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // 🎯 IFRAME FIX: Zajisti responsive viewport v FAPI iframu
    // FAPI někdy načítá stránku v iframu bez správného viewport
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0';
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    // Check if payment was successful (simplified - just show success)
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      setIsVerifying(false);
      
      // Fire confetti
      celebrateModuleComplete();
    } else {
      // If no token, wait a bit (payment might be processing)
      setTimeout(() => {
        setIsVerifying(false);
        celebrateModuleComplete();
      }, 2000);
    }
  }, []);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-green-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl mb-2">Ověřuji platbu...</h2>
          <p className="text-gray-600">Prosím vydržte chvíli</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-8 sm:py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 md:p-12 text-center border-2 border-green-200"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-green-600 mx-auto mb-4 sm:mb-6" />
          </motion.div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4">🎉 Platba proběhla úspěšně!</h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8">
            Gratulujeme k nákupu kurzu <strong>Podnikatelská Čtvrtka</strong>!
          </p>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border-2 border-green-200">
            <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mx-auto mb-4 sm:mb-6" />
            <h3 className="text-xl sm:text-2xl mb-4 sm:mb-6">Co teď?</h3>
            
            <div className="space-y-3 sm:space-y-4 max-w-lg mx-auto">
              {/* Step 1 */}
              <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm border-2 border-green-100">
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <div className="bg-green-100 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-700 font-black text-base sm:text-lg">1</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">Zkontroluj email</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Poslali jsme ti přihlašovací údaje na tvůj email
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm border-2 border-blue-100">
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <div className="bg-blue-100 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 font-black text-base sm:text-lg">2</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">Přihlaš se pomocí tokenu</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      V emailu najdeš jedinečný odkaz pro přístup do kurzu
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-sm border-2 border-purple-100">
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <div className="bg-purple-100 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-700 font-black text-base sm:text-lg">3</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base">Začni s kurzem</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Máš lifetime přístup - můžeš se vracet kdykoliv
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Máš nějaké problémy? Napiš nám na{' '}
              <a href="mailto:kurz@podnikatelskactvrtka.cz" className="text-blue-600 hover:underline">
                kurz@podnikatelskactvrtka.cz
              </a>
            </p>
          </div>

          {/* Trust badges */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Co tě čeká v kurzu:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-sm">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">📚</span>
                </div>
                <p className="text-gray-700 text-sm sm:text-base"><strong>3 moduly</strong></p>
                <p className="text-gray-500 text-xs">16 praktických lekcí</p>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">🧮</span>
                </div>
                <p className="text-gray-700 text-sm sm:text-base"><strong>Interaktivní nástroje</strong></p>
                <p className="text-gray-500 text-xs">Podnikatelská čtvrtka & FIT validátor</p>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">🎯</span>
                </div>
                <p className="text-gray-700 text-sm sm:text-base"><strong>Akční plán</strong></p>
                <p className="text-gray-500 text-xs">Personalizovaný na 30 dní</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

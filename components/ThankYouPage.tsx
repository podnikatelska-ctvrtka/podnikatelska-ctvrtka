import { useEffect, useState } from 'react';
import { CheckCircle, Sparkles, Loader2, Mail, Lock, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { celebrateModuleComplete } from '../lib/confetti';

export default function ThankYouPage() {
  const [isVerifying, setIsVerifying] = useState(true);

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
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-12 text-center border-2 border-green-200"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl mb-4">🎉 Platba proběhla úspěšně!</h1>
          
          <p className="text-xl text-gray-700 mb-8">
            Gratulujeme k nákupu kurzu <strong>Podnikatelská Čtvrtka</strong>!
          </p>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 mb-8 border-2 border-green-200">
            <Sparkles className="w-12 h-12 text-green-600 mx-auto mb-6" />
            <h3 className="text-2xl mb-6">Co teď?</h3>
            
            <div className="space-y-4 max-w-lg mx-auto">
              {/* Step 1 */}
              <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-green-100">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-700 font-black text-lg">1</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="w-5 h-5 text-green-600" />
                      <h4 className="font-bold text-gray-900">Zkontroluj email</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Poslali jsme ti přihlašovací údaje na tvůj email
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 font-black text-lg">2</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Lock className="w-5 h-5 text-blue-600" />
                      <h4 className="font-bold text-gray-900">Přihlaš se pomocí tokenu</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      V emailu najdeš jedinečný odkaz pro přístup do kurzu
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-purple-100">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-700 font-black text-lg">3</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <h4 className="font-bold text-gray-900">Začni s kurzem</h4>
                    </div>
                    <p className="text-sm text-gray-600">
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
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Co tě čeká v kurzu:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <p className="text-gray-700"><strong>3 moduly</strong></p>
                <p className="text-gray-500 text-xs">16 praktických lekcí</p>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🧮</span>
                </div>
                <p className="text-gray-700"><strong>Interaktivní nástroje</strong></p>
                <p className="text-gray-500 text-xs">Podnikatelská čtvrtka & FIT validátor</p>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <p className="text-gray-700"><strong>Akční plán</strong></p>
                <p className="text-gray-500 text-xs">Personalizovaný na 30 dní</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

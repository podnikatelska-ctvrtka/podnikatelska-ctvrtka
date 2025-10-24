import { useState, useEffect } from 'react';
import { X, Download, Share, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { 
  getInstallPlatform, 
  triggerInstallPrompt, 
  isAppInstalled 
} from '../lib/pwa';

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop' | 'unknown'>('unknown');
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (isAppInstalled()) {
      return;
    }

    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      return;
    }

    // Get platform
    const detectedPlatform = getInstallPlatform();
    setPlatform(detectedPlatform);

    // Listen for install prompt availability (Android/Desktop)
    const handleInstallAvailable = () => {
      setShowPrompt(true);
    };

    window.addEventListener('pwa-install-available', handleInstallAvailable);

    // iOS - show manual instructions after 5s
    if (detectedPlatform === 'ios') {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 5000);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('pwa-install-available', handleInstallAvailable);
      };
    }

    return () => {
      window.removeEventListener('pwa-install-available', handleInstallAvailable);
    };
  }, []);

  const handleInstall = async () => {
    if (platform === 'ios') {
      // Show iOS instructions (can't programmatically install on iOS)
      return;
    }

    const installed = await triggerInstallPrompt();
    
    if (installed) {
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setIsDismissed(true);
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!showPrompt || isDismissed) {
    return null;
  }

  // iOS Instructions
  if (platform === 'ios') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black to-transparent p-4 animate-in slide-in-from-bottom duration-300">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-6 relative">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-4">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-3">
              <Download className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-1">
              Nainstalujte si appku
            </h3>
            <p className="text-sm text-gray-600">
              Pro nejlepší zážitek použijte Podnikatelskou Čtvrtku jako aplikaci
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 space-y-3 text-sm text-gray-700">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                1
              </div>
              <p>
                Klikněte na tlačítko <Share className="inline w-4 h-4 mx-1" /> <strong>Sdílet</strong> v dolní liště Safari
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                2
              </div>
              <p>
                Vyberte <Plus className="inline w-4 h-4 mx-1" /> <strong>"Přidat na plochu"</strong>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                3
              </div>
              <p>
                Hotovo! Ikona se objeví na vaší domovské obrazovce
              </p>
            </div>
          </div>

          <Button
            onClick={handleDismiss}
            variant="outline"
            className="w-full mt-4"
          >
            Rozumím
          </Button>
        </div>
      </div>
    );
  }

  // Android / Desktop Install Prompt
  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-8 md:w-96 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-6 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-white/70 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">
                Nainstalovat appku
              </h3>
              <p className="text-sm text-blue-100">
                Rychlejší, pohodlnější, offline
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              onClick={handleInstall}
              className="flex-1 bg-white text-blue-600 hover:bg-blue-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Nainstalovat
            </Button>
            <Button
              onClick={handleDismiss}
              variant="ghost"
              className="bg-white/10 text-white hover:bg-white/20 border border-white/30"
            >
              Později
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

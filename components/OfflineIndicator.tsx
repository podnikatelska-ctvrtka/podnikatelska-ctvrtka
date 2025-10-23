import { useState, useEffect } from 'react';
import { WifiOff, Wifi, Cloud, CloudOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface OfflineIndicatorProps {
  showToast?: boolean; // Zobrazit toast notifikace?
  persistent?: boolean; // Zobrazit banner trvale nebo jen krátce?
}

export function OfflineIndicator({ 
  showToast = true,
  persistent = false 
}: OfflineIndicatorProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showBanner, setShowBanner] = useState(!navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      
      if (wasOffline && showToast) {
        toast.success('✅ Spojení obnoveno', {
          description: 'Jste znovu online',
          duration: 3000,
        });
      }
      
      // Skrýt banner po 3 sekundách (pokud není persistent)
      if (!persistent) {
        setTimeout(() => setShowBanner(false), 3000);
      } else {
        setShowBanner(false);
      }
      
      setWasOffline(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
      setWasOffline(true);
      
      if (showToast) {
        toast.error('📡 Ztráta spojení', {
          description: 'Jste offline. Aplikace funguje v omezeném režimu.',
          duration: 5000,
        });
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [showToast, persistent, wasOffline]);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none"
        >
          <div className="safe-top">
            <div
              className={`mx-auto max-w-2xl mx-4 mt-2 rounded-lg shadow-xl backdrop-blur-sm border-2 pointer-events-auto ${
                isOnline
                  ? 'bg-green-50/95 border-green-500'
                  : 'bg-orange-50/95 border-orange-500'
              }`}
            >
              <div className="flex items-center gap-3 px-4 py-3">
                {/* Icon */}
                <div
                  className={`flex-shrink-0 ${
                    isOnline ? 'text-green-600' : 'text-orange-600'
                  }`}
                >
                  {isOnline ? (
                    <Wifi className="w-5 h-5" />
                  ) : (
                    <WifiOff className="w-5 h-5" />
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold ${
                      isOnline ? 'text-green-900' : 'text-orange-900'
                    }`}
                  >
                    {isOnline ? 'Spojení obnoveno' : 'Jste offline'}
                  </p>
                  <p
                    className={`text-xs ${
                      isOnline ? 'text-green-700' : 'text-orange-700'
                    }`}
                  >
                    {isOnline
                      ? 'Všechny funkce jsou dostupné'
                      : 'Aplikace funguje v omezeném režimu'}
                  </p>
                </div>

                {/* Close button (pouze pokud není persistent) */}
                {!persistent && (
                  <button
                    onClick={() => setShowBanner(false)}
                    className={`flex-shrink-0 p-1 rounded-lg transition-colors ${
                      isOnline
                        ? 'hover:bg-green-100 text-green-700'
                        : 'hover:bg-orange-100 text-orange-700'
                    }`}
                    aria-label="Zavřít"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook pro offline status
 */
export function useOfflineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isOnline,
    isOffline: !isOnline,
  };
}

/**
 * Kompaktní offline badge (pro sidebar/header)
 */
export function OfflineBadge() {
  const { isOffline } = useOfflineStatus();

  if (!isOffline) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="inline-flex items-center gap-1.5 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
    >
      <CloudOff className="w-3 h-3" />
      Offline
    </motion.div>
  );
}

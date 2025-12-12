import { useState, useEffect } from 'react';
import { Gift, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StickyQuizButtonProps {
  onClick: () => void;
}

export function StickyQuizButton({ onClick }: StickyQuizButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show button after scrolling 400px
    const handleScroll = () => {
      if (isDismissed) return;
      
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 px-4 w-full max-w-sm md:max-w-md"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Desktop version */}
          <div className="hidden md:block relative">
            <button
              onClick={onClick}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all hover:scale-105 font-bold text-lg flex items-center justify-center gap-2 group"
            >
              <Gift className="w-5 h-5 animate-bounce" />
              <span>Spustit kvíz zdarma</span>
            </button>
            
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 hover:bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
              aria-label="Zavřít"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile version */}
          <div className="md:hidden relative">
            <button
              onClick={onClick}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-600 active:from-orange-600 active:to-pink-700 text-white px-5 py-3.5 rounded-full shadow-2xl font-bold text-base flex items-center justify-center gap-2"
            >
              <Gift className="w-5 h-5 animate-bounce" />
              <span>Kvíz zdarma</span>
            </button>
            
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg"
              aria-label="Zavřít"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
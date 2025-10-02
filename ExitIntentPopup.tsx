import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Clock, Users } from "lucide-react";

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger only when mouse leaves from top of screen
      if (e.clientY <= 0 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
      }
    };

    // Mobile: trigger on aggressive scroll up
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If user scrolled up more than 100px quickly on mobile
      if (window.innerWidth <= 768 && 
          lastScrollY - currentScrollY > 100 && 
          currentScrollY < 300 && 
          !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
      }
      
      lastScrollY = currentScrollY;
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [hasTriggered]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVisible(false);
    // Scroll to order section
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsVisible(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border-2 border-red-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-4">
              <div className="text-4xl">🚨</div>
              
              <h3 className="text-xl font-bold text-gray-900">
                Počkat! Neodcházej ještě...
              </h3>
              
              <p className="text-gray-600">
                Získej svou <strong>Podnikatelskou čtvrtku</strong> ještě dnes 
                s <span className="text-red-600 font-bold">41% slevou</span>!
              </p>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 text-red-600 mb-2">
                  <Clock size={16} />
                  <span className="font-semibold">Čas se krátí!</span>
                </div>
                <div className="text-2xl font-bold text-red-600">
                  4.999 Kč <span className="text-sm line-through text-gray-400">8.499 Kč</span>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-2 text-orange-600">
                <Users size={16} />
                <span className="text-sm">Zbývá jen 12 míst při této ceně</span>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="Tvůj email pro slevu"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  CHCI SLEVU 41% 🎯
                </button>
              </form>

              <p className="text-xs text-gray-500">
                Sleva platí jen dalších 24 hodin
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
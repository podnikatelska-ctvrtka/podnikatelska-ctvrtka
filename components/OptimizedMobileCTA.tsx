import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Zap, Users, Clock } from 'lucide-react';

export function OptimizedMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);

  const messages = [
    { 
      icon: <Zap className="w-4 h-4" />, 
      text: "Získat předběžný přístup",
      urgency: "Sleva 3.500 Kč"
    },
    { 
      icon: <Users className="w-4 h-4" />, 
      text: "Bonus: Konzultace zdarma",
      urgency: "Jen prvních 50 míst"
    },
    { 
      icon: <Clock className="w-4 h-4" />, 
      text: "90 min → hotová strategie",
      urgency: "Místo měsíců práce"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Najít benefits sekci
      const benefitsSection = document.querySelector('[data-section="benefits"]');
      const testimonialsSection = document.querySelector('[data-section="testimonials"]');
      const orderSection = document.getElementById('order');
      
      let shouldShow = false;
      
      if (benefitsSection) {
        const benefitsRect = benefitsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Zobrazit když benefits sekce je alespoň 30% viditelná
        const benefitsVisible = benefitsRect.top < windowHeight * 0.7 && benefitsRect.bottom > windowHeight * 0.3;
        
        // Skrýt když testimonials sekce začíná být viditelná
        let inTestimonials = false;
        if (testimonialsSection) {
          const testimonialsRect = testimonialsSection.getBoundingClientRect();
          inTestimonials = testimonialsRect.top < windowHeight * 0.8;
        }
        
        // Skrýt když order sekce je blízko
        let nearOrder = false;
        if (orderSection) {
          const orderRect = orderSection.getBoundingClientRect();
          nearOrder = orderRect.top < windowHeight + 300;
        }
        
        shouldShow = benefitsVisible && !inTestimonials && !nearOrder;
      }
      
      setIsVisible(shouldShow);
      setHasScrolledPastHero(window.scrollY > window.innerHeight * 0.8);
    };

    // Rotace zpráv každé 4 sekundy
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 4000);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const scrollToOrder = () => {
    const orderSection = document.getElementById('order');
    if (orderSection) {
      // Najít email input v order sekci
      const emailInput = orderSection.querySelector('input[type="email"]');
      if (emailInput) {
        // Scroll na email input s offsetem pro mobile keyboard
        const rect = emailInput.getBoundingClientRect();
        const scrollTop = window.pageYOffset + rect.top - (window.innerHeight * 0.3);
        
        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
        
        // Po scroll fokus na input (po 500ms kvůli animaci)
        setTimeout(() => {
          emailInput.focus();
        }, 500);
      } else {
        // Fallback - scroll na začátek order sekce
        orderSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
        >
          <motion.button
            onClick={scrollToOrder}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg 
                     border border-blue-500/20 overflow-hidden active:scale-95 transition-transform"
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 
                          animate-pulse opacity-50" />
            
            <div className="relative px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    key={currentMessage}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    {messages[currentMessage].icon}
                  </motion.div>
                  
                  <div className="text-left">
                    <motion.div
                      key={`text-${currentMessage}`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="font-semibold text-sm leading-tight"
                    >
                      {messages[currentMessage].text}
                    </motion.div>
                    <motion.div
                      key={`urgency-${currentMessage}`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-xs text-blue-100"
                    >
                      {messages[currentMessage].urgency}
                    </motion.div>
                  </div>
                </div>
                
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </div>
              
              {/* Progress dots */}
              <div className="flex justify-center gap-1 mt-3">
                {messages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentMessage 
                        ? 'bg-white w-6' 
                        : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
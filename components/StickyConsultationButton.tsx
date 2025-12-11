import { MessageCircle, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function StickyConsultationButton() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  // Rotující prodejní texty pro kvíz
  const rotatingTexts = [
    "Kde tratíš peníze?",
    "Jak zdravý je tvůj byznys?",
    "Co tě brzdí v růstu?",
    "Zjisti své slabiny ZDARMA"
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Rotace textu každých 4 sekundy
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    window.location.hash = 'kviz';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8,
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-50"
    >
      {/* Desktop version - expandable */}
      <motion.button
        onClick={handleClick}
        className="hidden md:flex flex-col items-start gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden max-w-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated background pulse */}
        <motion.div
          className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="relative z-10 flex items-center gap-3 w-full">
          <Sparkles className="w-5 h-5 flex-shrink-0" />
          
          <div className="text-left flex-1">
            {/* Rotující hlavní text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTextIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm font-medium whitespace-nowrap"
              >
                {rotatingTexts[currentTextIndex]}
              </motion.div>
            </AnimatePresence>
            
            {/* CTA text */}
            <div className="text-xs opacity-90 mt-0.5">
              Kvíz ZDARMA (3 minuty) →
            </div>
          </div>
        </div>
      </motion.button>

      {/* Mobile version - pulsing */}
      <motion.button
        onClick={handleClick}
        className="md:hidden relative flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-xl px-4 py-3"
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            "0 20px 25px -5px rgba(37, 99, 235, 0.3)",
            "0 20px 25px -5px rgba(37, 99, 235, 0.6)",
            "0 20px 25px -5px rgba(37, 99, 235, 0.3)",
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles className="w-6 h-6 mb-1" />
        <span className="text-xs font-medium whitespace-nowrap">Kvíz ZDARMA</span>
      </motion.button>
    </motion.div>
  );
}
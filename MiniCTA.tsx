import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowRight, Mail, Users } from 'lucide-react';

interface MiniCTAProps {
  variant?: 'after-testimonials'; // Optional since we only have one variant now
}

export function MiniCTA({ variant = 'after-testimonials' }: MiniCTAProps) {
  const handleClick = () => {
    // Scroll to email capture section
    document.getElementById('order')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
      <div className="py-12 relative overflow-hidden">
        
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          {/* Floating particles effect */}
          <motion.div
            className="absolute -top-6 left-1/2 transform -translate-x-1/2"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-60" />
          </motion.div>
          <motion.div
            className="absolute -top-4 left-1/3 transform -translate-x-1/2"
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="w-1 h-1 bg-blue-400 rounded-full opacity-40" />
          </motion.div>
          <motion.div
            className="absolute -top-8 right-1/3 transform translate-x-1/2"
            animate={{ y: [-5, 15, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block"
          >
            {/* Pulse ring animation */}
            <motion.div
              className="relative"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Animated rings */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-green-300/30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -inset-2 rounded-full border border-emerald-300/50"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 60px rgba(34, 197, 94, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-block"
              >
                <Button 
                  onClick={handleClick}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl transition-all duration-500 inline-flex items-center gap-3 border-2 border-white/20 backdrop-blur-sm relative overflow-hidden"
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-blue-400/20"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Users className="w-6 h-6 relative z-10" />
                  </motion.div>
                  <span className="relative z-10">Chci taky tyhle výsledky!</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-6 h-6 relative z-10" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
}
import { motion } from "motion/react";
import { Users, Eye, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export function SocialPressureBadge() {
  const [currentCount, setCurrentCount] = useState(247);
  const [recentSignups, setRecentSignups] = useState(12);

  // Simulace live aktivity
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCurrentCount(prev => prev + 1);
        setRecentSignups(prev => Math.max(1, prev + Math.floor(Math.random() * 3)));
      }
    }, 8000 + Math.random() * 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 z-50 max-w-xs"
    >
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="bg-white/95 backdrop-blur-sm border border-orange-200 rounded-xl p-4 shadow-lg"
      >
        {/* Live počítadlo */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">
            <strong className="text-gray-900">{currentCount} lidí</strong> už se registrovalo
          </span>
        </div>
        
        {/* Nedávné registrace */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{recentSignups} za posledních 24h</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
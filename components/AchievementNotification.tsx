import { motion, AnimatePresence } from "motion/react";
import { Trophy, X } from "lucide-react";
import { Achievement } from "../lib/achievements";
import { useState, useEffect } from "react";

interface AchievementNotificationProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      
      // Auto-close po 5 sekundách
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for exit animation
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  const bgGradient = {
    module: 'from-blue-500 to-indigo-600',
    canvas: 'from-green-500 to-emerald-600',
    vpc: 'from-purple-500 to-pink-600',
    special: 'from-yellow-400 to-orange-500'
  }[achievement.category];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 400, opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed top-32 right-4 z-50 max-w-sm"
        >
          <div className={`bg-gradient-to-r ${bgGradient} text-white rounded-xl shadow-2xl overflow-hidden`}>
            {/* Glow efekt */}
            <div className="absolute inset-0 bg-white/10 animate-pulse" />
            
            {/* Content */}
            <div className="relative p-5">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="flex-shrink-0"
                >
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-3xl backdrop-blur-sm">
                    {achievement.emoji}
                  </div>
                </motion.div>
                
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2 mb-1"
                  >
                    <Trophy className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wide opacity-90">
                      Odemčeno!
                    </span>
                  </motion.div>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-bold text-lg mb-1 leading-tight"
                  >
                    {achievement.title}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm opacity-90 leading-snug"
                  >
                    {achievement.description}
                  </motion.p>
                  
                  {achievement.points && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                      className="mt-2 inline-flex items-center gap-1 bg-white/20 rounded-full px-3 py-1 text-xs font-bold"
                    >
                      <span>+{achievement.points}</span>
                      <span className="opacity-75">bodů</span>
                    </motion.div>
                  )}
                </div>
                
                {/* Close button */}
                <button
                  onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 300);
                  }}
                  className="flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Progress bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-1 bg-white/30 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Queue system for multiple achievements
 */
export function AchievementQueue({ achievements }: { achievements: Achievement[] }) {
  const [queue, setQueue] = useState<Achievement[]>(achievements);
  const [current, setCurrent] = useState<Achievement | null>(null);

  useEffect(() => {
    if (queue.length > 0 && !current) {
      setCurrent(queue[0]);
      setQueue(queue.slice(1));
    }
  }, [queue, current]);

  const handleClose = () => {
    setCurrent(null);
  };

  return <AchievementNotification achievement={current} onClose={handleClose} />;
}

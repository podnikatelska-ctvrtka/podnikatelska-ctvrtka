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
    <>
      {isVisible && (
        <div
          style={{ 
            transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(400px) scale(0.8)',
            opacity: isVisible ? 1 : 0
          }}
          className="fixed top-32 right-4 z-50 max-w-sm transition-all duration-500 ease-out"
        >
          <div className={`bg-gradient-to-r ${bgGradient} text-white rounded-xl shadow-2xl overflow-hidden`}>
            {/* Glow efekt */}
            <div className="absolute inset-0 bg-white/10 animate-pulse" />
            
            {/* Content */}
            <div className="relative p-5">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 opacity-0 animate-[fadeIn_0.5s_0.2s_ease-out_forwards]">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-3xl backdrop-blur-sm">
                    {achievement.emoji}
                  </div>
                </div>
                
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 opacity-0 animate-[fadeIn_0.5s_0.3s_ease-out_forwards]">
                    <Trophy className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wide opacity-90">
                      Odemčeno!
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-1 leading-tight opacity-0 animate-[fadeIn_0.5s_0.4s_ease-out_forwards]">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-sm opacity-90 leading-snug opacity-0 animate-[fadeIn_0.5s_0.5s_ease-out_forwards]">
                    {achievement.description}
                  </p>
                  
                  {achievement.points && (
                    <div className="mt-2 inline-flex items-center gap-1 bg-white/20 rounded-full px-3 py-1 text-xs font-bold opacity-0 animate-[fadeIn_0.5s_0.6s_ease-out_forwards]">
                      <span>+{achievement.points}</span>
                      <span className="opacity-75">bodů</span>
                    </div>
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
            <div 
              className="h-1 bg-white/30 origin-left transition-transform duration-[5000ms] ease-linear"
              style={{ transform: 'scaleX(1)' }}
            />
          </div>
        </div>
      )}
    </>
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

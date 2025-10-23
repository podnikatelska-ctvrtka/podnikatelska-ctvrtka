import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Star, Trophy, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { haptic } from '../lib/haptics';

interface SuccessAnimationProps {
  show: boolean;
  onComplete?: () => void;
  type?: 'lesson' | 'module' | 'achievement' | 'custom';
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

/**
 * SuccessAnimation - Krásná animace po dokončení
 * 
 * Features:
 * - Confetti efekt (už existuje v confetti.ts)
 * - Success icon s animací
 * - Haptic feedback
 * - Auto-dismiss
 */
export function SuccessAnimation({
  show,
  onComplete,
  type = 'lesson',
  title,
  message,
  icon,
}: SuccessAnimationProps) {
  useEffect(() => {
    if (show) {
      haptic('success');
      
      // Auto dismiss po 3 sekundách
      const timer = setTimeout(() => {
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  const config = {
    lesson: {
      icon: <CheckCircle className="w-20 h-20 text-green-500" />,
      title: title || '🎉 Lekce dokončena!',
      message: message || 'Skvělá práce! Můžeš pokračovat dál.',
      color: 'from-green-500 to-emerald-600',
    },
    module: {
      icon: <Trophy className="w-20 h-20 text-yellow-500" />,
      title: title || '🏆 Modul dokončen!',
      message: message || 'Úžasné! Postupuješ skvěle!',
      color: 'from-yellow-500 to-orange-600',
    },
    achievement: {
      icon: <Star className="w-20 h-20 text-purple-500" />,
      title: title || '⭐ Úspěch odemčen!',
      message: message || 'Získal jsi nový achievement!',
      color: 'from-purple-500 to-pink-600',
    },
    custom: {
      icon: icon || <Zap className="w-20 h-20 text-blue-500" />,
      title: title || '✨ Skvělé!',
      message: message || '',
      color: 'from-blue-500 to-indigo-600',
    },
  };

  const current = config[type];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onComplete}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            className={`bg-gradient-to-br ${current.color} rounded-3xl p-8 shadow-2xl max-w-md mx-4 text-center text-white`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.2,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              className="mb-6 flex justify-center"
            >
              <div className="bg-white/20 rounded-full p-6 backdrop-blur-sm">
                {current.icon}
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold mb-3"
            >
              {current.title}
            </motion.h2>

            {/* Message */}
            {current.message && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-white/90 mb-6"
              >
                {current.message}
              </motion.p>
            )}

            {/* Dismiss hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1 }}
              className="text-sm text-white/70"
            >
              Klikni kamkoli pro zavření
            </motion.p>

            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-3xl border-4 border-white/30"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * QuickSuccessToast - Rychlý success toast (méně rušivý)
 */
export function QuickSuccessToast({
  show,
  message,
  icon,
}: {
  show: boolean;
  message: string;
  icon?: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999]"
        >
          <div className="bg-green-500 text-white rounded-full px-6 py-3 shadow-xl flex items-center gap-3">
            {icon || <CheckCircle className="w-5 h-5" />}
            <span className="font-medium">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * ProgressRing - Animovaný progress ring
 */
export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#3b82f6',
}: {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
        fill="none"
      />
      
      {/* Progress circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          strokeDasharray: `${circumference} ${circumference}`,
        }}
      />
    </svg>
  );
}

/**
 * CountUp - Animované počítání čísel
 */
export function CountUp({
  from = 0,
  to,
  duration = 1,
  className = '',
}: {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      const currentCount = Math.floor(from + (to - from) * progress);
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <span className={className}>{count}</span>;
}

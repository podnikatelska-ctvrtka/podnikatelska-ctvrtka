import { useState, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { haptic } from '../lib/haptics';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  threshold?: number; // Minimální pull distance pro trigger
  maxPull?: number; // Maximální pull distance
  enabled?: boolean; // Povolit/zakázat pull-to-refresh
}

export function PullToRefresh({
  onRefresh,
  children,
  threshold = 80,
  maxPull = 150,
  enabled = true
}: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: TouchEvent) => {
    if (!enabled || isRefreshing) return;
    
    // Pouze pokud je scroll na vrchu
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!enabled || isRefreshing || startY === 0) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;

    // Pouze pokud táhne dolů a je na vrchu
    if (diff > 0 && window.scrollY === 0) {
      // Exponential easing - čím víc táhneš, tím pomalejší
      const easedPull = Math.min(
        maxPull,
        diff * 0.5 // 50% resistance
      );
      setPullDistance(easedPull);

      // Haptic feedback při dosažení threshold
      if (easedPull >= threshold && pullDistance < threshold) {
        haptic('medium');
      }
    }
  };

  const handleTouchEnd = async () => {
    if (!enabled || isRefreshing) return;

    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      haptic('success');
      
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
        setStartY(0);
      }
    } else {
      // Vrať zpět
      setPullDistance(0);
      setStartY(0);
    }
  };

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled, startY, pullDistance, isRefreshing]);

  const pullProgress = Math.min(1, pullDistance / threshold);
  const showRefreshIndicator = pullDistance > 0 || isRefreshing;

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Refresh Indicator */}
      <AnimatePresence>
        {showRefreshIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
            style={{
              transform: `translateY(${Math.min(pullDistance, maxPull)}px)`,
            }}
          >
            <div className="bg-white shadow-lg rounded-full p-3 mt-4 flex items-center gap-2">
              <motion.div
                animate={{
                  rotate: isRefreshing ? 360 : pullProgress * 180,
                }}
                transition={{
                  duration: isRefreshing ? 1 : 0,
                  repeat: isRefreshing ? Infinity : 0,
                  ease: isRefreshing ? 'linear' : 'easeOut',
                }}
              >
                <RefreshCw
                  className={`w-5 h-5 ${
                    pullDistance >= threshold ? 'text-blue-600' : 'text-gray-400'
                  }`}
                />
              </motion.div>
              <span className="text-sm font-medium text-gray-700">
                {isRefreshing
                  ? 'Načítám...'
                  : pullDistance >= threshold
                  ? 'Pusť pro obnovení'
                  : 'Potáhni dolů'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: pullDistance === 0 ? 'transform 0.3s ease-out' : 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Hook pro pull-to-refresh
 */
export function usePullToRefresh(onRefresh: () => Promise<void>) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  return {
    isRefreshing,
    handleRefresh,
  };
}

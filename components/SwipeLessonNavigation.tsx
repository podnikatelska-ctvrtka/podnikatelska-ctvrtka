import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { haptic } from '../lib/haptics';
import { useIsMobile } from './ui/use-mobile';

interface SwipeLessonNavigationProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void; // Další lekce
  onSwipeRight?: () => void; // Předchozí lekce
  canSwipeLeft?: boolean; // Existuje další lekce?
  canSwipeRight?: boolean; // Existuje předchozí lekce?
  threshold?: number; // Minimální swipe distance
  enabled?: boolean; // Povolit/zakázat swipe
}

export function SwipeLessonNavigation({
  children,
  onSwipeLeft,
  onSwipeRight,
  canSwipeLeft = true,
  canSwipeRight = true,
  threshold = 50,
  enabled = true,
}: SwipeLessonNavigationProps) {
  const isMobile = useIsMobile();
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  
  // 🚫 DISABLE swipe na desktopu - pouze mobile!
  const swipeEnabled = enabled && isMobile;

  const handleDragStart = () => {
    if (!swipeEnabled) return;
    setIsDragging(true);
    haptic('light');
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!swipeEnabled) return;
    
    // Určit směr swipe
    if (Math.abs(info.offset.x) > 10) {
      setDirection(info.offset.x > 0 ? 'right' : 'left');
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!swipeEnabled) {
      setIsDragging(false);
      setDirection(null);
      return;
    }

    const distance = Math.abs(info.offset.x);
    const velocity = Math.abs(info.velocity.x);

    // Swipe triggered pokud:
    // 1. Uživatel swipnul dost daleko (distance > threshold)
    // 2. NEBO swipnul rychle (velocity > 500)
    const triggered = distance > threshold || velocity > 500;

    if (triggered) {
      if (info.offset.x > 0 && canSwipeRight && onSwipeRight) {
        // Swipe RIGHT → Předchozí lekce
        haptic('success');
        onSwipeRight();
      } else if (info.offset.x < 0 && canSwipeLeft && onSwipeLeft) {
        // Swipe LEFT → Další lekce
        haptic('success');
        onSwipeLeft();
      }
    }

    setIsDragging(false);
    setDirection(null);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Swipe Indicators - OPTIMIZED for low-end devices */}
      <AnimatePresence>
        {isDragging && direction === 'right' && canSwipeRight && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.7, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 pointer-events-none"
            style={{ willChange: 'opacity, transform' }}
          >
            <div className="bg-blue-600 text-white rounded-full p-4 shadow-xl">
              <ChevronLeft className="w-8 h-8" />
            </div>
          </motion.div>
        )}

        {isDragging && direction === 'left' && canSwipeLeft && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.7, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 pointer-events-none"
            style={{ willChange: 'opacity, transform' }}
          >
            <div className="bg-blue-600 text-white rounded-full p-4 shadow-xl">
              <ChevronRight className="w-8 h-8" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swipeable Content - OPTIMIZED drag performance */}
      <motion.div
        drag={swipeEnabled ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{
          left: canSwipeLeft ? 0.1 : 0,
          right: canSwipeRight ? 0.1 : 0,
        }}
        dragTransition={{ 
          power: 0.3, 
          timeConstant: 200,
          bounceStiffness: 300,
          bounceDamping: 20
        }}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        className={isDragging && swipeEnabled ? 'cursor-grabbing' : ''}
        style={{ willChange: isDragging ? 'transform' : 'auto' }}
      >
        {children}
      </motion.div>

      {/* Navigation Buttons - Hidden (swipe only) */}
    </div>
  );
}

/**
 * Hook pro swipe navigation
 */
export function useSwipeNavigation({
  currentIndex,
  maxIndex,
  onNavigate,
}: {
  currentIndex: number;
  maxIndex: number;
  onNavigate: (index: number) => void;
}) {
  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;

  const goNext = () => {
    if (canGoNext) {
      onNavigate(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (canGoPrev) {
      onNavigate(currentIndex - 1);
    }
  };

  return {
    canGoNext,
    canGoPrev,
    goNext,
    goPrev,
  };
}

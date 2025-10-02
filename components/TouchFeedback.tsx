import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface TouchFeedbackProps {
  children: React.ReactNode;
  className?: string;
  haptic?: boolean;
  glowColor?: string;
}

export function TouchFeedback({ 
  children, 
  className = "", 
  haptic = true,
  glowColor = "rgba(59, 130, 246, 0.5)"
}: TouchFeedbackProps) {
  const [touches, setTouches] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleTouch = (e: React.TouchEvent) => {
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate(10); // Gentle haptic feedback
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const newTouches = Array.from(e.touches).map((touch, index) => ({
      id: Date.now() + index,
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    }));

    setTouches(newTouches);
  };

  useEffect(() => {
    if (touches.length > 0) {
      const timer = setTimeout(() => setTouches([]), 300);
      return () => clearTimeout(timer);
    }
  }, [touches]);

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onTouchStart={handleTouch}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
      
      {/* Touch ripples */}
      {touches.map((touch) => (
        <motion.div
          key={touch.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: touch.x,
            top: touch.y,
            backgroundColor: glowColor,
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      ))}
    </motion.div>
  );
}

interface SwipeToActionProps {
  children: React.ReactNode;
  onSwipe: () => void;
  direction?: "left" | "right" | "up" | "down";
  threshold?: number;
  className?: string;
}

export function SwipeToAction({
  children,
  onSwipe,
  direction = "right",
  threshold = 50,
  className = ""
}: SwipeToActionProps) {
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  const handleDragEnd = (event: any, info: any) => {
    if (!dragStart) return;

    const deltaX = info.point.x - dragStart.x;
    const deltaY = info.point.y - dragStart.y;

    let triggered = false;
    switch (direction) {
      case "right":
        triggered = deltaX > threshold;
        break;
      case "left":
        triggered = deltaX < -threshold;
        break;
      case "down":
        triggered = deltaY > threshold;
        break;
      case "up":
        triggered = deltaY < -threshold;
        break;
    }

    if (triggered) {
      onSwipe();
      if ('vibrate' in navigator) {
        navigator.vibrate([10, 10, 10]); // Success pattern
      }
    }

    setDragStart(null);
  };

  return (
    <motion.div
      className={className}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={{ left: 0.2, right: 0.2, top: 0.2, bottom: 0.2 }}
      onDragStart={(event, info) => {
        setDragStart({ x: info.point.x, y: info.point.y });
      }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
    >
      {children}
    </motion.div>
  );
}
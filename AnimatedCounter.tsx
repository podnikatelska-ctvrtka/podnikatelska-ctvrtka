import { useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ from, to, duration = 2, suffix = '', className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      const currentCount = from + (to - from) * easeOutCubic;
      setCount(Math.floor(currentCount));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString('cs-CZ')}{suffix}
    </span>
  );
}
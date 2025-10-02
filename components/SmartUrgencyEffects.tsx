import { motion } from "motion/react";
import { ReactNode, useState, useEffect } from "react";

interface UrgencyEffectProps {
  children: ReactNode;
  className?: string;
  intensity?: "subtle" | "medium" | "high";
}

// Chytrý urgency efekt založený na čase na stránce
export function SmartUrgency({ children, className = "", intensity = "medium" }: UrgencyEffectProps) {
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [showEffect, setShowEffect] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setTimeOnPage(elapsed);
      
      // Postupně zvyšujeme urgency po 30s, 60s, 120s
      if (elapsed > 30 && elapsed < 40) {
        setShowEffect(true);
        setTimeout(() => setShowEffect(false), 3000);
      }
      
      if (elapsed > 60 && elapsed < 70) {
        setShowEffect(true);
        setTimeout(() => setShowEffect(false), 5000);
      }
      
      if (elapsed > 120) {
        setShowEffect(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const intensityConfig = {
    subtle: {
      boxShadow: "0 0 15px rgba(239, 68, 68, 0.3)",
      scale: 1.01
    },
    medium: {
      boxShadow: "0 0 25px rgba(239, 68, 68, 0.5)",
      scale: 1.02
    },
    high: {
      boxShadow: "0 0 35px rgba(239, 68, 68, 0.7)",
      scale: 1.03
    }
  };

  return (
    <motion.div
      className={className}
      animate={showEffect ? intensityConfig[intensity] : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// Attention-grabber pro CTA po scroll time
export function ScrollBasedAttention({ children, triggerAfter = 60 }: { 
  children: ReactNode; 
  triggerAfter?: number;
}) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldShow(true);
    }, triggerAfter * 1000);

    return () => clearTimeout(timer);
  }, [triggerAfter]);

  return (
    <motion.div
      animate={shouldShow ? {
        boxShadow: [
          "0 0 0 0 rgba(59, 130, 246, 0.4)",
          "0 0 0 15px rgba(59, 130, 246, 0)",
        ]
      } : {}}
      transition={{
        duration: 1.5,
        repeat: shouldShow ? Infinity : 0,
        repeatType: "loop"
      }}
    >
      {children}
    </motion.div>
  );
}

// Micro shake pro elementy které potřebují pozornost
export function AttentionShake({ children, trigger = false }: { 
  children: ReactNode; 
  trigger?: boolean;
}) {
  return (
    <motion.div
      animate={trigger ? {
        x: [0, -2, 2, -2, 2, 0],
      } : {}}
      transition={{
        duration: 0.5,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

// Gradual reveal pro testimonials/benefits
export function SequentialReveal({ 
  children, 
  stagger = 0.2 
}: { 
  children: ReactNode[]; 
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger
          }
        }
      }}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { 
              opacity: 0, 
              y: 30,
              filter: "blur(4px)" 
            },
            visible: { 
              opacity: 1, 
              y: 0,
              filter: "blur(0px)",
              transition: { 
                duration: 0.6,
                ease: "easeOut" 
              }
            }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
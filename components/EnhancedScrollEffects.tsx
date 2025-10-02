import { motion, useScroll, useTransform } from "motion/react";
import { ReactNode, useRef } from "react";

interface ScrollEffectProps {
  children: ReactNode;
  className?: string;
}

// Subtilní parallax efekt pro pozadí sekce
export function SubtleParallax({ children, className = "" }: ScrollEffectProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="relative z-10">
        {children}
      </motion.div>
    </div>
  );
}

// Staggered children animation pro seznamy/karty
export function StaggerContainer({ children, className = "" }: ScrollEffectProps) {
  return (
    <motion.div 
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Pro jednotlivé itemy ve StaggerContainer
export function StaggerItem({ children, className = "" }: ScrollEffectProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { 
          opacity: 0, 
          y: 20,
          scale: 0.95
        },
        visible: { 
          opacity: 1, 
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: "easeOut"
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Progress-based reveal pro dlouhé sekce
export function ProgressBasedReveal({ children, className = "" }: ScrollEffectProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.98]);
  
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity, scale }}>
        {children}
      </motion.div>
    </div>
  );
}

// Hover-activated content reveal
export function HoverReveal({ 
  trigger, 
  content, 
  className = "" 
}: { 
  trigger: ReactNode; 
  content: ReactNode; 
  className?: string;
}) {
  return (
    <motion.div 
      className={`relative ${className}`}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {trigger}
      <motion.div
        className="absolute inset-0 z-10"
        variants={{
          rest: { 
            opacity: 0, 
            scale: 0.95,
            pointerEvents: "none"
          },
          hover: { 
            opacity: 1, 
            scale: 1,
            pointerEvents: "auto"
          }
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {content}
      </motion.div>
    </motion.div>
  );
}

// Breath animation pro key elementy
export function BreathingEffect({ children, className = "" }: ScrollEffectProps) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      {children}
    </motion.div>
  );
}
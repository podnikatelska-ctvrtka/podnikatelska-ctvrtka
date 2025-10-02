import { motion } from "motion/react";
import { ReactNode, useState } from "react";

interface MicroInteractionProps {
  children: ReactNode;
  className?: string;
}

// 1. Subtilní hover glow efekt pro důležité prvky
export function HoverGlow({ children, className = "" }: MicroInteractionProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ 
        boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
        scale: 1.01
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// 2. Pulse efekt pro urgency elementy (countdown, limited time)
export function UrgencyPulse({ children, className = "" }: MicroInteractionProps) {
  return (
    <motion.div
      className={className}
      animate={{ 
        boxShadow: [
          "0 0 0 0 rgba(239, 68, 68, 0.7)",
          "0 0 0 10px rgba(239, 68, 68, 0)",
          "0 0 0 0 rgba(239, 68, 68, 0)"
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}

// 3. Magnetický efekt pro CTA tlačítka
export function MagneticHover({ children, className = "" }: MicroInteractionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    
    setMousePosition({ x: deltaX, y: deltaY });
  };

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      animate={{
        x: isHovered ? mousePosition.x : 0,
        y: isHovered ? mousePosition.y : 0,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 150, 
        damping: 15,
        mass: 0.1
      }}
    >
      {children}
    </motion.div>
  );
}

// 4. Loading skeleton s shimmer efektem
export function ShimmerLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="relative overflow-hidden bg-gray-200 rounded">
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_2s_infinite]" />
      </div>
    </div>
  );
}

// 5. Parallax pozadí pro hero sekci
export function ParallaxBackground({ children, className = "" }: MicroInteractionProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      style={{
        willChange: 'transform'
      }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

// 6. Typing animation pro klíčové texty
export function TypingText({ text, delay = 0, className = "" }: { 
  text: string; 
  delay?: number; 
  className?: string;
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: delay + index * 0.05,
            duration: 0.1
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// CSS pro shimmer animaci
const shimmerStyles = `
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
`;

// Inject styles if not already present
if (typeof document !== 'undefined' && !document.getElementById('shimmer-styles')) {
  const style = document.createElement('style');
  style.id = 'shimmer-styles';
  style.textContent = shimmerStyles;
  document.head.appendChild(style);
}
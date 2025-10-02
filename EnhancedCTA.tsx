import { motion } from "motion/react";
import { useState } from "react";
import { ArrowRight, Sparkles, Clock } from "lucide-react";

interface EnhancedCTAProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "urgent";
  size?: "sm" | "md" | "lg";
  className?: string;
  showSparkles?: boolean;
  urgencyText?: string;
}

export function EnhancedCTA({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md",
  className = "",
  showSparkles = false,
  urgencyText
}: EnhancedCTAProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white",
    secondary: "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white",
    urgent: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const sparklePositions = [
    { top: "10%", left: "15%" },
    { top: "20%", right: "10%" },
    { bottom: "15%", left: "20%" },
    { bottom: "25%", right: "15%" },
  ];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setIsPressed(false)}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-lg font-semibold transition-all duration-200 
        shadow-lg hover:shadow-xl transform-gpu
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ scale: 0, opacity: 0.3 }}
        animate={isPressed ? { scale: 1, opacity: 0 } : { scale: 0, opacity: 0.3 }}
        transition={{ duration: 0.4 }}
      />

      {/* Sparkles */}
      {showSparkles && sparklePositions.map((pos, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={pos}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={isHovered ? { 
            opacity: [0, 1, 0], 
            scale: [0, 1, 0], 
            rotate: 360 
          } : { opacity: 0, scale: 0 }}
          transition={{ 
            duration: 1.5, 
            delay: index * 0.1,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 2
          }}
        >
          <Sparkles className="w-3 h-3 text-yellow-300" />
        </motion.div>
      ))}

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "100%" } : { x: "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center space-x-2">
        <span>{children}</span>
        <motion.div
          animate={isHovered ? { x: 4 } : { x: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Urgency text */}
      {urgencyText && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-orange-600 whitespace-nowrap"
        >
          <Clock className="inline w-3 h-3 mr-1" />
          {urgencyText}
        </motion.div>
      )}
    </motion.button>
  );
}
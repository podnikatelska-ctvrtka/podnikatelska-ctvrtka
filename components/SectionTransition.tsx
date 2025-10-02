import { motion } from "motion/react";

interface SectionTransitionProps {
  variant?: "gradient" | "dots" | "wave";
  color?: "blue" | "purple" | "orange";
}

export function SectionTransition({ variant = "gradient", color = "blue" }: SectionTransitionProps) {
  const gradientColors = {
    blue: "from-blue-50 via-white to-purple-50",
    purple: "from-purple-50 via-white to-blue-50", 
    orange: "from-orange-50 via-white to-red-50"
  };

  if (variant === "gradient") {
    return (
      <div className={`h-6 bg-gradient-to-r ${gradientColors[color]} relative overflow-hidden`}>
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className="h-4 flex items-center justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-gray-300 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}
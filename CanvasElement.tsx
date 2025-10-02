import { motion } from "motion/react";
import { TouchFeedback } from "./TouchFeedback";

interface CanvasElementProps {
  id: string;
  className: string;
  emoji: string;
  title: string;
  delay?: number;
  onMouseEnter: (id: string, e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  onClick: (id: string, e: React.MouseEvent) => void;
  glowColor?: string;
  children?: React.ReactNode;
}

export function CanvasElement({
  id,
  className,
  emoji,
  title,
  delay = 0.5,
  onMouseEnter,
  onMouseLeave,
  onClick,
  glowColor = "rgba(59, 130, 246, 0.5)",
  children
}: CanvasElementProps) {
  return (
    <TouchFeedback glowColor={glowColor}>
      <motion.div
        className={`${className} text-white p-3 rounded-xl transition-all cursor-pointer hover:shadow-lg`}
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
        onMouseEnter={(e) => onMouseEnter(id, e)}
        onMouseLeave={onMouseLeave}
        onClick={(e) => onClick(id, e)}
      >
        {children || (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="text-2xl mb-1">{emoji}</div>
            <div className="text-xs font-semibold">{title}</div>
          </div>
        )}
      </motion.div>
    </TouchFeedback>
  );
}
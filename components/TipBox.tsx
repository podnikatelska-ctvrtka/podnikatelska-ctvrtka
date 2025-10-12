import { Lightbulb, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

interface TipBoxProps {
  children: React.ReactNode;
  variant?: 'default' | 'warning' | 'success';
}

export function TipBox({ children, variant = 'default' }: TipBoxProps) {
  const styles = {
    default: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-900',
      iconBg: 'bg-blue-500',
      icon: <Lightbulb className="w-4 h-4 text-white" />
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-900',
      iconBg: 'bg-yellow-500',
      icon: <AlertTriangle className="w-4 h-4 text-white" />
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-900',
      iconBg: 'bg-green-500',
      icon: <CheckCircle className="w-4 h-4 text-white" />
    }
  };

  const style = styles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${style.bg} border ${style.border} rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start gap-3">
        <div className={`${style.iconBg} rounded-lg p-2 flex-shrink-0`}>
          {style.icon}
        </div>
        <div className={`flex-1 text-sm ${style.text} leading-relaxed`}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

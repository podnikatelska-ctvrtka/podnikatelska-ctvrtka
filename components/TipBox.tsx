import { Lightbulb, AlertTriangle, CheckCircle, Edit2 } from "lucide-react";

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
      icon: <Lightbulb className="w-5 h-5 text-white" />
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-900',
      iconBg: 'bg-yellow-500',
      icon: <AlertTriangle className="w-5 h-5 text-white" />
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-900',
      iconBg: 'bg-green-500',
      icon: <CheckCircle className="w-5 h-5 text-white" />
    }
  };

  const style = styles[variant];

  return (
    <div
      className={`${style.bg} border-2 ${style.border} rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start gap-3">
        <div className={`${style.iconBg} rounded-lg p-2.5 flex-shrink-0`}>
          <div className="w-5 h-5 flex items-center justify-center">
            {style.icon}
          </div>
        </div>
        <div className={`flex-1 text-base ${style.text} leading-relaxed`}>
          {children}
        </div>
      </div>
    </div>
  );
}

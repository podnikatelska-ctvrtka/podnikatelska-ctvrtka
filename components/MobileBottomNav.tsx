import { Button } from './ui/button';
import { ArrowRight, Plus } from 'lucide-react';
import { haptic } from '../lib/haptics';

interface MobileBottomNavProps {
  primaryLabel: string;
  primaryIcon?: React.ReactNode;
  onPrimaryClick: () => void;
  primaryDisabled?: boolean;
  secondaryLabel?: string;
  secondaryIcon?: React.ReactNode;
  onSecondaryClick?: () => void;
  secondaryDisabled?: boolean;
  variant?: 'default' | 'success' | 'danger';
}

export function MobileBottomNav({
  primaryLabel,
  primaryIcon = <ArrowRight className="w-5 h-5" />,
  onPrimaryClick,
  primaryDisabled = false,
  secondaryLabel,
  secondaryIcon,
  onSecondaryClick,
  secondaryDisabled = false,
  variant = 'default'
}: MobileBottomNavProps) {
  const handlePrimaryClick = () => {
    haptic('medium');
    onPrimaryClick();
  };

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      haptic('light');
      onSecondaryClick();
    }
  };

  const variantStyles = {
    default: 'bg-blue-600 hover:bg-blue-700',
    success: 'bg-green-600 hover:bg-green-700',
    danger: 'bg-red-600 hover:bg-red-700'
  };

  return (
    <>
      {/* Spacer pro fixed nav (aby content nebyl zakrytý) */}
      <div className="h-20 md:hidden" />

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t-2 border-gray-200 shadow-lg safe-bottom">
        <div className="px-4 py-3 flex gap-2">
          {/* Secondary Button */}
          {secondaryLabel && onSecondaryClick && (
            <Button
              onClick={handleSecondaryClick}
              disabled={secondaryDisabled}
              variant="outline"
              className="flex-1 h-12 text-base"
            >
              {secondaryIcon && <span className="mr-2">{secondaryIcon}</span>}
              {secondaryLabel}
            </Button>
          )}

          {/* Primary Button */}
          <Button
            onClick={handlePrimaryClick}
            disabled={primaryDisabled}
            className={`${secondaryLabel ? 'flex-1' : 'w-full'} h-12 text-base ${variantStyles[variant]}`}
          >
            {primaryLabel}
            {primaryIcon && <span className="ml-2">{primaryIcon}</span>}
          </Button>
        </div>
      </div>
    </>
  );
}

// 🎯 Floating Action Button variant (pro přidávání items)
interface FloatingActionButtonProps {
  label?: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  color?: 'blue' | 'green' | 'purple';
}

export function FloatingActionButton({
  label,
  icon = <Plus className="w-6 h-6" />,
  onClick,
  disabled = false,
  color = 'blue'
}: FloatingActionButtonProps) {
  const handleClick = () => {
    haptic('medium');
    onClick();
  };

  const colorStyles = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    purple: 'bg-purple-600 hover:bg-purple-700'
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`fixed bottom-20 right-4 z-40 ${colorStyles[color]} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed md:hidden safe-bottom`}
      style={{
        width: label ? 'auto' : '56px',
        height: '56px',
        padding: label ? '0 20px' : '0'
      }}
    >
      <div className="flex items-center justify-center gap-2">
        {icon}
        {label && <span className="font-medium">{label}</span>}
      </div>
    </button>
  );
}

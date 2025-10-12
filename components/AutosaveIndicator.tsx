import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, Loader2 } from "lucide-react";

interface AutosaveIndicatorProps {
  isSaving: boolean;
  lastSaved?: Date;
  show?: boolean;
}

export function AutosaveIndicator({ isSaving, lastSaved, show = true }: AutosaveIndicatorProps) {
  if (!show) return null;

  const getTimeAgo = (date: Date | undefined) => {
    if (!date) return '';
    
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 5) return 'právě teď';
    if (seconds < 60) return `před ${seconds}s`;
    if (seconds < 3600) return `před ${Math.floor(seconds / 60)}m`;
    return `před ${Math.floor(seconds / 3600)}h`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="fixed bottom-4 right-4 z-50 pointer-events-none"
      >
        <motion.div 
          className="bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 border border-gray-200"
          animate={isSaving ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 1, repeat: isSaving ? Infinity : 0 }}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              <span className="text-xs text-gray-600 font-medium">Ukládám...</span>
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <CheckCircle className="w-4 h-4 text-green-500" />
              </motion.div>
              <span className="text-xs text-gray-600 font-medium">
                Uloženo {lastSaved && getTimeAgo(lastSaved)}
              </span>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

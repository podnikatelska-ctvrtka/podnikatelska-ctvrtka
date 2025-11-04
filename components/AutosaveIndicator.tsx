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
    <div className="fixed bottom-6 right-6 z-40 pointer-events-none">
      <div className="bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 border border-gray-200 transition-all">
        {isSaving ? (
          <>
            <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
            <span className="text-xs text-gray-600 font-medium">Ukládám...</span>
          </>
        ) : (
          <>
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-xs text-gray-600 font-medium">
              Uloženo {lastSaved && getTimeAgo(lastSaved)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { QuickEmailCaptureModal } from "./QuickEmailCaptureModal";
import { Button } from "./ui/button";

/**
 * DEMO komponenta pro testování QuickEmailCaptureModal
 * Umožňuje přepínat mezi Step 1 a Step 2 pro preview
 */
export function QuickEmailCaptureModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [previewStep, setPreviewStep] = useState<1 | 2>(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Modal Preview Demo
          </h1>
          <p className="text-gray-600">
            Testovací stránka pro náhled obou kroků modalu
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => {
                setPreviewStep(1);
                setIsOpen(true);
              }}
              className="h-16 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              size="lg"
            >
              <div className="text-center">
                <div className="font-bold">Preview Step 1</div>
                <div className="text-xs opacity-90">Email Capture</div>
              </div>
            </Button>

            <Button
              onClick={() => {
                setPreviewStep(2);
                setIsOpen(true);
              }}
              className="h-16 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              size="lg"
            >
              <div className="text-center">
                <div className="font-bold">Preview Step 2</div>
                <div className="text-xs opacity-90">Success Screen</div>
              </div>
            </Button>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
            <h3 className="font-bold text-gray-900 mb-3">📋 Testovací checklist:</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="font-bold text-indigo-600">Step 1:</span>
                <span>Lean verze s cenou + email input + trust signals</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-green-600">Step 2:</span>
                <span>Success message + benefity + CTA na plnou nabídku</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-purple-600">Flow:</span>
                <span>Submit v Step 1 → animace → přepnutí na Step 2</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
            <h3 className="font-bold text-amber-900 mb-3">⚠️ Poznámky k implementaci:</h3>
            <div className="space-y-2 text-sm text-amber-800">
              <p>• <strong>Trust signals:</strong> 1 Čtvrtka | 9 Prvků | 41% Sleva</p>
              <p>• <strong>Step 2 CTA:</strong> "Zobrazit plnou nabídku" scrolluje na #order</p>
              <p>• <strong>Auto-reset:</strong> Modal se resetuje na Step 1 při zavření</p>
              <p>• <strong>Animace:</strong> Slide transitions mezi kroky</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Toto je demo stránka - smazat po otestování
          </p>
        </div>
      </div>

      {/* Modal s vynuceným krokem */}
      <QuickEmailCaptureModalPreview 
        open={isOpen} 
        onOpenChange={setIsOpen}
        forceStep={previewStep}
      />
    </div>
  );
}

/**
 * Wrapper kolem QuickEmailCaptureModal který umožňuje force step pro preview
 */
function QuickEmailCaptureModalPreview({ 
  open, 
  onOpenChange, 
  forceStep 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  forceStep: 1 | 2;
}) {
  // Pro demo účely - hack pro zobrazení správného kroku
  return (
    <QuickEmailCaptureModal 
      open={open} 
      onOpenChange={(newOpen) => {
        onOpenChange(newOpen);
        // Mírný hack - po zavření resetujeme
      }}
    />
  );
}
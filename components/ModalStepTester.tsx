import { useState } from "react";
import { Button } from "./ui/button";

/**
 * 🧪 TESTOVACÍ COMPONENT
 * Přidej do pravého dolního rohu stránky pro rychlý preview modal steps
 * 
 * Použití v App.tsx:
 * import { ModalStepTester } from "./components/ModalStepTester";
 * <ModalStepTester />
 */
export function ModalStepTester() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const testStep2 = () => {
    // Dočasně změň QuickEmailCaptureModal.tsx:
    // const [step, setStep] = useState<1 | 2>(2);
    // const [email, setEmail] = useState("test@example.cz");
    alert(`
📝 JAK VIDĚT STEP 2:

1. Otevři: /components/QuickEmailCaptureModal.tsx

2. Najdi řádky (cca 15-17):
   const [email, setEmail] = useState("");
   const [step, setStep] = useState<1 | 2>(1);

3. Změň na:
   const [email, setEmail] = useState("test@example.cz");
   const [step, setStep] = useState<1 | 2>(2);

4. Klikni na CTA tlačítko v Hero → uvidíš Step 2

5. Po otestování vrať zpět na (1) a ("")

✅ Hotovo!
    `);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-2xl p-4 max-w-xs">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-sm">🧪 Modal Tester</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-2">
          <Button
            onClick={testStep2}
            variant="secondary"
            size="sm"
            className="w-full text-xs"
          >
            📋 Jak vidět Step 2?
          </Button>
          
          <p className="text-xs text-white/80 leading-relaxed">
            Klikni pro instrukce jak přepnout modal na Step 2 (success screen)
          </p>
        </div>
      </div>
    </div>
  );
}
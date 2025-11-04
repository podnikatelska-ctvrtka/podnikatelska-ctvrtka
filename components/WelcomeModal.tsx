import { useState, useEffect } from "react";
import { X, Send, Loader2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface WelcomeModalProps {
  isOpen?: boolean;
  onStart?: () => void; // Optional - pro kompatibilitu
  onClose: () => void;
  mode?: "welcome" | "support"; // "welcome" = první příchod, "support" = help tlačítko
}

export function WelcomeModal({ isOpen = true, onClose, mode = "welcome" }: WelcomeModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  
  // Form state
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    
    if (isOpen) {
      setShouldRender(true); // Start rendering
      // Fade-in animation
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false); // Fade-out
      // DON'T unmount here - wait for transition to finish
    }
  }, [isOpen]);

  const handleClose = () => {
    // Just call onClose immediately - parent sets isOpen=false
    // The unmounting will happen in onTransitionEnd
    onClose();
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email || !subject || !message) {
      toast.error("Vyplňte prosím všechna pole");
      return;
    }
    
    if (!email.includes("@")) {
      toast.error("Zadejte platný email");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/.netlify/functions/send-support-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          subject,
          message,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success("✅ Zpráva odeslána! Odpovíme co nejdříve.");
        
        // Reset form
        setEmail("");
        setSubject("");
        setMessage("");
        
        // Close modal after 1.5s
        setTimeout(() => {
          handleClose();
        }, 1500);
      } else {
        throw new Error(data.error || "Chyba při odesílání");
      }
    } catch (error) {
      console.error("Error sending support ticket:", error);
      toast.error("❌ Nepodařilo se odeslat zprávu. Zkuste to prosím znovu nebo napište přímo na kurz@podnikatelskactvrtka.cz");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render if not needed (but keep rendering during fade-out animation!)
  if (!shouldRender) return null;

  // 🎯 WELCOME MODE (První příchod)
  if (mode === "welcome") {
    return (
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleClose}
          onTransitionEnd={() => {
            // Unmount only after fade-out is complete
            if (!isVisible) {
              setShouldRender(false);
            }
          }}
        />

        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 pointer-events-none">
          <div
            className={`bg-white rounded-2xl shadow-2xl max-w-sm md:max-w-md w-full pointer-events-auto transform transition-all duration-300 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-4 md:p-6 pb-3 md:pb-4 border-b border-gray-100">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Zavřít"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-3 md:mb-4">
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
                  Vítejte v kurzu! 👋
                </h2>
                <p className="text-sm md:text-base text-gray-600">
                  Jste připraveni na transformaci vašeho podnikání?
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 space-y-4">
              <div className="space-y-3 text-sm md:text-base text-gray-700">
                <p>
                  <strong>Podnikatelská Čtvrtka</strong> vám pomůže najít vaši dokonalou zákaznickou skupinu a nastavit byznys, který funguje.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="font-medium text-blue-900 mb-2">✨ Co vás čeká:</p>
                  <ul className="space-y-1 text-blue-800">
                    <li>• 3 klíčové moduly s praktickými nástroji</li>
                    <li>• Byznys model + FIT Validátor</li>
                    <li>• Akční plán na míru vašemu byznysu</li>
                  </ul>
                </div>

                <p className="text-gray-600">
                  💡 Potřebujete pomoc? Klikněte kdykoliv na <strong className="text-blue-600">Help</strong> tlačítko v pravém dolním rohu (desktop) nebo v hlavičce (mobil).
                </p>
              </div>

              {/* Button */}
              <div className="pt-2">
                <Button
                  onClick={handleClose}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Rozumím, jdeme na to! 🚀
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // 🎫 SUPPORT MODE (Help tlačítko)
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
        onTransitionEnd={() => {
          // Unmount only after fade-out is complete
          if (!isVisible) {
            setShouldRender(false);
          }
        }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 pointer-events-none">
        <div
          className={`bg-white rounded-2xl shadow-2xl max-w-sm md:max-w-md w-full pointer-events-auto transform transition-all duration-300 ${
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-4 md:p-6 pb-3 md:pb-4 border-b border-gray-100">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Zavřít"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-2xl mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
                Potřebujete pomoc?
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Napište nám a my vám pomůžeme
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="support-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Váš email
              </label>
              <input
                id="support-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vas@email.cz"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="support-subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                Předmět
              </label>
              <input
                id="support-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Např. Problém s lekcí 5"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="support-message" className="block text-sm font-medium text-gray-700 mb-1.5">
                Váš dotaz nebo problém
              </label>
              <textarea
                id="support-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Popište váš problém nebo dotaz..."
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                💡 Odpovíme vám co nejdříve na váš email
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="button"
                onClick={handleClose}
                variant="outline"
                className="flex-1"
                disabled={isSubmitting}
              >
                Zavřít
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Odesílám...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Odeslat
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

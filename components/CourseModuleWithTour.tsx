import { useState } from "react";
import { motion } from "motion/react";
import { Play, CheckCircle2, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { BusinessModelCanvasSimple } from "./BusinessModelCanvasSimple";
import { GuidedTour, scrollToSection } from "./GuidedTour";
import { useCourseTour, TOUR_MODULES } from "./useCourseTour";

interface CourseModuleProps {
  userId: string;
  moduleId: keyof typeof TOUR_MODULES;
  videoUrl?: string;
  videoTitle: string;
  videoDescription: string;
  isLocked?: boolean;
  onUnlock?: () => void;
  onCanvasOpen?: () => void; // Callback když se Canvas otevře
  onNextModule?: () => void; // Callback pro další modul
  onClose?: () => void; // Callback pro zavření Canvas
  isLastModule?: boolean; // Je to poslední modul?
}

export function CourseModuleWithTour({
  userId,
  moduleId,
  videoUrl,
  videoTitle,
  videoDescription,
  isLocked = false,
  onUnlock,
  onCanvasOpen,
  onNextModule,
  onClose,
  isLastModule = false
}: CourseModuleProps) {
  const [videoWatched, setVideoWatched] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showTourPopup, _setShowTourPopup] = useState(false);
  const [highlightActive, _setHighlightActive] = useState(false);
  const [highlightedSectionId, _setHighlightedSectionId] = useState<string | undefined>();
  const [localCompleted, setLocalCompleted] = useState(false);
  
  // Wrapped setters s loggingem!
  const setShowTourPopup = (value: boolean) => {
    console.log('🔵 setShowTourPopup:', value, new Error().stack);
    _setShowTourPopup(value);
  };
  
  const setHighlightActive = (value: boolean) => {
    console.log('🟢 setHighlightActive:', value);
    _setHighlightActive(value);
  };
  
  const setHighlightedSectionId = (value: string | undefined) => {
    console.log('🟡 setHighlightedSectionId:', value);
    _setHighlightedSectionId(value);
  };
  
  const {
    tourActive,
    currentStep,
    moduleCompleted,
    module,
    currentStepData,
    totalSteps,
    startTour,
    nextStep,
    skipTour,
    completeTour,
  } = useCourseTour(userId, moduleId);

  const handleStartPractice = () => {
    const sectionId = currentStepData?.highlightSection;
    console.log('🚀 START PRACTICE:', { sectionId });
    
    setShowCanvas(true);
    setShowTourPopup(true);
    setHighlightActive(true);
    setHighlightedSectionId(sectionId);
    
    if (onCanvasOpen) onCanvasOpen();
    startTour();
    setTimeout(() => {
      scrollToSection(module.id);
    }, 300);
  };
  
  const handleCloseTourPopup = () => {
    console.log('❌ CLOSE POPUP - GLOW should stay:', { 
      highlightActive, 
      highlightedSectionId 
    });
    setShowTourPopup(false);
  };

  if (isLocked) {
    return (
      <div className="bg-gray-100 border-2 border-gray-300 rounded-xl p-8 text-center">
        <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-600 mb-2">{module.title}</h3>
        <p className="text-gray-500 mb-4">Dokončete předchozí modul pro odemčení</p>
        {onUnlock && (
          <Button variant="outline" disabled>
            Zamčeno
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{module.title}</h2>
            <p className="text-blue-100">{videoDescription}</p>
          </div>
          {moduleCompleted && (
            <div className="bg-green-500 rounded-full p-3">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-blue-100 rounded-lg p-3">
            <Play className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{videoTitle}</h3>
            <p className="text-gray-600">Sledujte video a naučte se koncept</p>
          </div>
        </div>

        {/* Video Player - Vimeo/YouTube embed */}
        {videoUrl ? (
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
            <iframe
              src={videoUrl}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              onLoad={() => setVideoWatched(true)}
            />
          </div>
        ) : (
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
            <p className="text-gray-500">Video bude brzy k dispozici</p>
          </div>
        )}

        {/* CTA - Vyzkoušet na Canvas */}
        {!showCanvas && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-300 rounded-xl p-6 text-center"
          >
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              🎯 TEĎ TO ZKUS!
            </h4>
            <p className="text-gray-700 mb-4">
              Aplikujte to, co jste se naučili, přímo ve vaší Podnikatelské Čtvrtce
            </p>
            <Button
              onClick={handleStartPractice}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold"
            >
              Začít cvičení
            </Button>
          </motion.div>
        )}
      </div>

      {/* Canvas Section - FULL SCREEN MODE! */}
      {showCanvas && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-50 bg-gray-100 overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white border-4 border-blue-500 rounded-xl p-8 shadow-2xl"
              data-canvas-section={module.id}
            >
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-5">
            <p className="text-blue-900 font-bold text-lg flex items-center gap-2">
              <span className="text-2xl">👇</span>
              <span>Vyplňte zvýrazněnou sekci. <strong>Tip:</strong> Klikněte 2x na položku pro úpravu textu</span>
            </p>
          </div>
          
          <BusinessModelCanvasSimple 
            userId={userId}
            highlightSection={highlightedSectionId}
            hideTips={true}
            onItemAdded={(sectionId) => {
              console.log('📝 ITEM ADDED:', { sectionId, highlightedSectionId });
              // Pokud přidal položku do highlighted sekce
              if (highlightedSectionId && sectionId === highlightedSectionId) {
                console.log('✅ CORRECT SECTION - COMPLETING!');
                setHighlightActive(false);
                setHighlightedSectionId(undefined);
                setLocalCompleted(true);
                completeTour();
              }
            }}
          />

          {localCompleted && (
            <div className="mt-6 bg-green-50 border-2 border-green-300 rounded-xl p-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-green-900 mb-2">
                ✅ Modul dokončen!
              </h4>
              <p className="text-green-700 mb-4">
                Skvělá práce! {!isLastModule && 'Můžete pokračovat na další modul.'}
              </p>
              
              {/* Tlačítka */}
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCanvas(false); // Zavři Canvas
                    setLocalCompleted(false); // Reset
                    if (onClose) onClose();
                  }}
                  size="lg"
                >
                  ← Zpět na přehled
                </Button>
                {!isLastModule && onNextModule && (
                  <Button
                    onClick={() => {
                      setShowCanvas(false); // Zavři Canvas
                      setLocalCompleted(false); // Reset pro další modul
                      setHighlightActive(false); // Reset highlight
                      setShowTourPopup(false); // Reset popup
                      onNextModule();
                    }}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Další modul →
                  </Button>
                )}
              </div>
            </div>
          )}
            </div>
          </div>
        </motion.div>
      )}

      {/* GLOW CSS - PERMANENT! (mimo popup) */}
      {highlightedSectionId && (
        <style>{`
          [data-canvas-section="${highlightedSectionId}"] {
            position: relative;
            z-index: 45 !important;
            animation: pulse-glow 2s ease-in-out infinite;
            border-width: 4px !important;
          }
          
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.8),
                          0 0 40px 15px rgba(59, 130, 246, 0.6),
                          inset 0 0 20px rgba(59, 130, 246, 0.2);
              border-color: rgb(59, 130, 246) !important;
              background-color: rgba(59, 130, 246, 0.05);
            }
            50% {
              box-shadow: 0 0 0 12px rgba(59, 130, 246, 0.3),
                          0 0 80px 30px rgba(59, 130, 246, 0.4),
                          inset 0 0 30px rgba(59, 130, 246, 0.15);
              border-color: rgb(96, 165, 250) !important;
              background-color: rgba(96, 165, 250, 0.08);
            }
          }
        `}</style>
      )}

      {/* Guided Tour Overlay - jen popup, GLOW zůstává! */}
      <GuidedTour
        step={currentStep + 1}
        totalSteps={totalSteps}
        isActive={showTourPopup}
        onNext={nextStep}
        onSkip={() => {
          console.log('🔴 KŘÍŽEK KLIKNUT!');
          handleCloseTourPopup();
        }}
        onComplete={() => {
          console.log('🔴 COMPLETE KLIKNUT!');
          handleCloseTourPopup();
        }}
        highlightSection={currentStepData?.highlightSection}
        title={currentStepData?.title || ''}
        description={currentStepData?.description || ''}
        tips={currentStepData?.tips}
      />
    </div>
  );
}

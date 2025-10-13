import { useState } from "react";
import { ArrowLeft, BookOpen, Trophy } from "lucide-react";
import { Button } from "./ui/button";
import { CourseModuleWithTour } from "./CourseModuleWithTour";
import { TOUR_MODULES } from "./useCourseTour";

export function InteractiveCourseDemo() {
  // Pro demo používáme userId 1 (v production by to bylo z auth)
  const userId = 1;
  const [currentModule, setCurrentModule] = useState<keyof typeof TOUR_MODULES>('module1');
  const [isCanvasOpen, setIsCanvasOpen] = useState(false); // Track kdy je Canvas full screen

  const modules: { id: keyof typeof TOUR_MODULES; title: string; description: string; videoUrl?: string }[] = [
    {
      id: 'module1',
      title: 'Zákaznické segmenty',
      description: 'Naučte se identifikovat a rozdělit vaše zákazníky',
      videoUrl: 'https://player.vimeo.com/video/YOUR_VIDEO_ID' // Nahraď svým Vimeo URL
    },
    {
      id: 'module2',
      title: 'Hodnotová nabídka',
      description: 'Definujte co nabízíte a za kolik',
      videoUrl: 'https://player.vimeo.com/video/YOUR_VIDEO_ID'
    },
    {
      id: 'module3',
      title: 'Kanály',
      description: 'Jak k vám zákazníci přijdou a jak s nimi komunikujete',
      videoUrl: 'https://player.vimeo.com/video/YOUR_VIDEO_ID'
    },
    {
      id: 'module4',
      title: 'Struktura nákladů',
      description: 'Spočítejte si kolik vás byznys skutečně stojí',
      videoUrl: 'https://player.vimeo.com/video/YOUR_VIDEO_ID'
    },
    {
      id: 'module5',
      title: 'Klíčové aktivity',
      description: 'Co musíte dělat každý den aby to fungovalo',
      videoUrl: 'https://player.vimeo.com/video/YOUR_VIDEO_ID'
    }
  ];

  const currentModuleData = modules.find(m => m.id === currentModule);
  const currentModuleIndex = modules.findIndex(m => m.id === currentModule);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header - CONDITIONAL RENDERING! */}
      {!isCanvasOpen && (
      <div className="bg-white border-b-2 border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => window.location.hash = ''}
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zpět
              </Button>
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Podnikatelská Čtvrtka - Interaktivní kurz</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span>Modul {currentModuleIndex + 1}/{modules.length}</span>
            </div>
          </div>
        </div>
      </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Module navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-4 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">📚 Moduly kurzu</h3>
              <div className="space-y-2">
                {modules.map((module, index) => (
                  <button
                    key={module.id}
                    onClick={() => setCurrentModule(module.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                      currentModule === module.id
                        ? 'bg-blue-500 text-white font-semibold'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{index + 1}.</span>
                      <span className="text-sm">{module.title}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Progress */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Celkový pokrok:</p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                    style={{ width: `${((currentModuleIndex + 1) / modules.length) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1 text-center">
                  {Math.round(((currentModuleIndex + 1) / modules.length) * 100)}%
                </p>
              </div>
            </div>
          </div>

          {/* Main content - Current module - FLEX-1 = zbyde veškerý prostor! */}
          <div className="flex-1 min-w-0">
            {currentModuleData && (
              <CourseModuleWithTour
                userId={userId}
                moduleId={currentModule}
                videoUrl={currentModuleData.videoUrl}
                videoTitle={currentModuleData.title}
                videoDescription={currentModuleData.description}
                isLastModule={currentModuleIndex === modules.length - 1}
                onCanvasOpen={() => setIsCanvasOpen(true)}
                onNextModule={() => {
                  setIsCanvasOpen(false);
                  const nextIndex = currentModuleIndex + 1;
                  if (nextIndex < modules.length) {
                    setCurrentModule(modules[nextIndex].id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                onClose={() => {
                  setIsCanvasOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  const prevIndex = currentModuleIndex - 1;
                  if (prevIndex >= 0) setCurrentModule(modules[prevIndex].id);
                }}
                disabled={currentModuleIndex === 0}
              >
                ← Předchozí modul
              </Button>
              <Button
                onClick={() => {
                  const nextIndex = currentModuleIndex + 1;
                  if (nextIndex < modules.length) setCurrentModule(modules[nextIndex].id);
                }}
                disabled={currentModuleIndex === modules.length - 1}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Další modul →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

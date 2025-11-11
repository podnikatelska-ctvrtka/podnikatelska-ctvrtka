/**
 * 📱 MOBILE COURSE - MODULE 2: Vylepšení byznys modelu
 * 
 * Zobrazuje JEDNU aktivní lekci z Module 2.
 * 
 * LEKCE:
 * - Lekce 1: Pravidla dobrého modelu (CanvasValidator)
 * - Lekce 2: Finanční analýza (ProfitCalculator)
 * - Lekce 3: Řešení situací (ProblemSolver)
 * - Lekce 4: Příklady úspěšných modelů (BusinessModelGallery)
 */

import { CheckCircle2, Menu, Home, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { haptic } from "../../lib/haptics";
import { CanvasValidator } from "../CanvasValidator";
import { ProfitCalculator } from "../ProfitCalculator";
import { ProblemSolver } from "../ProblemSolver";
import { MobileBusinessModelGallery } from "../MobileBusinessModelGallery";

interface CanvasItem {
  text: string;
  color: 'blue' | 'green' | 'yellow' | 'pink' | 'purple' | 'global' | 'gray';
  value?: number;
}

interface CanvasData {
  segments?: CanvasItem[];
  value?: CanvasItem[];
  channels?: CanvasItem[];
  relationships?: CanvasItem[];
  revenue?: CanvasItem[];
  partners?: CanvasItem[];
  activities?: CanvasItem[];
  resources?: CanvasItem[];
  costs?: CanvasItem[];
}

interface Lesson {
  id: number;
  title: string;
  canvasSection: undefined; // Module 2 nemá canvas sections
  description: string;
  content: string;
  tips?: string[];
}

interface Props {
  /** User ID pro načítání dat */
  userId: string;
  
  /** Data modulu */
  moduleData: {
    id: number;
    title: string;
    description: string;
    lessons: Lesson[];
  };
  
  /** Canvas data (z Module 1) */
  canvasData: CanvasData;
  
  /** Callback pro update canvas dat */
  onCanvasUpdate?: (section: string, items: CanvasItem[]) => void;
  
  /** Dokončené lekce */
  completedLessons: Set<number>;
  
  /** Callback pro označení lekce jako dokončené */
  onLessonComplete: (lessonId: number) => void;
  
  /** Aktuální otevřená lekce (index) */
  currentLessonIndex?: number;
  
  /** Callback pro změnu aktivní lekce */
  onLessonChange?: (index: number) => void;
  
  /** Callback pro otevření sidebaru */
  onOpenSidebar?: () => void;
  
  /** Callback pro otevření dashboardu */
  onOpenDashboard?: () => void;
  
  /** Callback pro zobrazení welcome modalu */
  onShowWelcomeModal?: () => void;
  
  /** Celkový počet lekcí ve všech modulech (pro progress bar) */
  totalLessons?: number;
  
  /** Callback pro odemknutí achievementu */
  onAchievementUnlocked?: (achievementId: string) => void;
  
  /** Callback pro přechod na další modul */
  onNavigateToNextModule?: () => void;
}

export function MobileCourseModule2({
  userId,
  moduleData,
  canvasData,
  onCanvasUpdate,
  completedLessons,
  onLessonComplete,
  currentLessonIndex = 0,
  onLessonChange,
  onOpenSidebar,
  onOpenDashboard,
  onShowWelcomeModal,
  totalLessons = 16,
  onAchievementUnlocked,
  onNavigateToNextModule,
}: Props) {
  // Current lesson
  const lesson = moduleData.lessons[currentLessonIndex];
  // ✅ POUŽÍVÁME GLOBÁLNÍ LESSON ID (ne moduleId-lessonId)
  const isCompleted = completedLessons.has(lesson.id);
  
  // 🐛 DEBUG: Log completion status
  console.log('📊 Module 2 - Lesson completion:', {
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    isCompleted,
    completedLessonsArray: Array.from(completedLessons)
  });
  
  // Navigation
  const hasPrevious = currentLessonIndex > 0;
  // ✅ BLOKACE: Další lekci lze otevřít JEN pokud je současná lekce dokončená!
  const hasNextLesson = currentLessonIndex < moduleData.lessons.length - 1;
  const hasNext = hasNextLesson && isCompleted;
  
  const handlePrevious = () => {
    if (hasPrevious && onLessonChange) {
      haptic('light');
      onLessonChange(currentLessonIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handleNext = () => {
    if (hasNextLesson && onLessonChange) {
      haptic('light');
      onLessonChange(currentLessonIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handleComplete = () => {
    haptic('success');
    onLessonComplete(lesson.id);
  };
  
  // Render content based on lesson
  const renderToolContent = () => {
    console.log('📱 [MobileCourseModule2] renderToolContent called', {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      userId
    });
    
    // LEKCE 1 (id: 10): Canvas Validator
    if (lesson.id === 10) {
      return (
        <div className="overflow-x-hidden max-w-full">
          <div className="w-full" style={{ maxWidth: '100vw' }}>
            <CanvasValidator 
              userId={userId}
              onComplete={handleComplete}
              onNavigateNext={handleNext}
              isLessonCompleted={isCompleted}
              onAchievementUnlocked={onAchievementUnlocked}
            />
          </div>
        </div>
      );
    }
    
    // LEKCE 2 (id: 11): Profit Calculator
    if (lesson.id === 11) {
      return (
        <div className="overflow-x-hidden max-w-full">
          <div className="w-full" style={{ maxWidth: '100vw' }}>
            <ProfitCalculator 
              userId={userId}
              onComplete={handleComplete}
              onNavigateNext={handleNext}
              onAchievementUnlocked={onAchievementUnlocked}
              isLessonCompleted={isCompleted}
            />
          </div>
        </div>
      );
    }
    
    // LEKCE 3 (id: 12): Problem Solver
    if (lesson.id === 12) {
      return (
        <div className="overflow-x-hidden max-w-full">
          <div className="w-full" style={{ maxWidth: '100vw' }}>
            <ProblemSolver
              userId={userId}
              onComplete={handleComplete}
              onNavigateNext={handleNext}
              isLessonCompleted={isCompleted}
              onAchievementUnlocked={onAchievementUnlocked}
            />
          </div>
        </div>
      );
    }
    
    // LEKCE 4 (id: 13): Business Model Gallery (MOBILE VERSION!)
    if (lesson.id === 13) {
      return (
        <div className="overflow-x-hidden max-w-full">
          <MobileBusinessModelGallery 
            onComplete={handleComplete}
            onNavigateNext={handleNext}
            isLessonCompleted={isCompleted}
          />
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 overflow-x-hidden">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => {
              haptic('light');
              if (onOpenSidebar) onOpenSidebar();
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors -ml-2"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="flex-1 px-2">
            <p className="text-xs text-gray-500 text-center mb-1">
              {Math.round((completedLessons.size / Math.max(1, totalLessons)) * 100)}% dokončeno
            </p>
            {/* Progress Bar - celkový progress kurzu */}
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(completedLessons.size / Math.max(1, totalLessons)) * 100}%` }}
              />
            </div>
          </div>
          
          {/* Help Button */}
          <button
            onClick={() => {
              haptic('light');
              if (onShowWelcomeModal) onShowWelcomeModal();
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Nápověda a kontakt"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          
          <button
            onClick={() => {
              haptic('light');
              if (onOpenDashboard) onOpenDashboard();
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors -mr-2"
          >
            <Home className="w-6 h-6 text-blue-600" />
          </button>
        </div>
        
        <h2 className="text-blue-600 mb-1">{lesson.title}</h2>
        <p className="text-sm text-gray-600">{lesson.description}</p>
        
        {/* Progress indicator */}
        {isCompleted && (
          <div className="mt-3 flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-800">Lekce dokončena</p>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-6">
        {/* LESSON TEXT CONTENT */}
        {lesson.content && (
          <div
            className="prose prose-sm max-w-none bg-white rounded-xl p-4 shadow-sm border border-gray-200"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
        )}

        {/* TIPS */}
        {lesson.tips && lesson.tips.length > 0 && (
          <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-4">
            <h4 className="text-purple-900 mb-2">💡 Tipy</h4>
            <ul className="space-y-2 ml-4">
              {lesson.tips.map((tip, i) => (
                <li key={i} className="text-sm text-gray-700">{tip}</li>
              ))}
            </ul>
          </div>
        )}

        {/* TOOL CONTENT (CanvasValidator, ProfitCalculator, atd.) */}
        {renderToolContent()}

        {/* COMPLETE BUTTON - POUZE pokud komponenta nemá vlastní */}
        {/* Lekce 10-13 mají vlastní complete buttony v nástrojích */}
        {!isCompleted && ![10, 11, 12, 13].includes(lesson.id) && (
          <Button
            onClick={handleComplete}
            className="w-full"
            size="lg"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Označit jako dokončené
          </Button>
        )}
      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex gap-3">
          <Button
            onClick={handlePrevious}
            disabled={!hasPrevious}
            variant="outline"
            className="flex-1"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Předchozí
          </Button>
          
          {/* ✅ POSLEDNÍ LEKCE MODULU: Povolit přechod na další modul */}
          {!hasNextLesson && isCompleted && onNavigateToNextModule ? (
            <Button
              onClick={() => {
                haptic('success');
                onNavigateToNextModule();
              }}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Další modul
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!hasNext}
              className="flex-1"
            >
              Další
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

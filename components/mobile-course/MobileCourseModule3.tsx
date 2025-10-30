/**
 * 📱 MOBILE COURSE - MODULE 3: Hodnotová nabídka
 * 
 * Zobrazuje JEDNU aktivní lekci z VPC modulu.
 * 
 * LEKCE:
 * - Lekce 14: Profil zákazníka
 * - Lekce 15: Mapa hodnoty
 * - Lekce 16: Testování fit skóre (FIT Validator)
 */

import { useState } from "react";
import { CheckCircle2, Menu, Home, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Button } from "../ui/button";
import { haptic } from "../../lib/haptics";
import { MobileVPCCustomerProfile } from "./MobileVPCCustomerProfile";
import { MobileVPCValueMap } from "./MobileVPCValueMap";
import { MobileFitValidator } from "./MobileFitValidator";

interface Lesson {
  id: number;
  title: string;
  canvasSection: string;
  description: string;
  content: string;
  tips?: string[];
}

interface Props {
  /** Data modulu z module3-data.ts */
  moduleData: {
    id: number;
    title: string;
    description: string;
    lessons: Lesson[];
  };
  
  /** VPC data (Customer Profile + Value Maps) */
  vpcData: {
    customer: any;
    value: any;
  };
  
  /** Callback pro update VPC dat */
  onVPCUpdate: (section: 'customer' | 'value', data: any) => void;
  
  /** Dokončené lekce */
  completedLessons: Set<string>;
  
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
  
  /** Dostupné segmenty z BMC (pro Segment Selector) */
  availableSegments?: Array<{ text: string; color: string }>;
  
  /** Dostupné hodnoty z BMC (pro Value Selector) */
  availableValues?: Array<{ text: string; color: string }>;
  
  /** Aktuálně vybraný segment */
  selectedSegment?: string;
  
  /** Callback pro změnu segmentu */
  onSelectSegment?: (segment: string) => void;
  
  /** Aktuálně vybraná hodnota */
  selectedValue?: string;
  
  /** Callback pro změnu hodnoty */
  onSelectValue?: (value: string) => void;
  
  /** Celkový počet lekcí ve všech modulech (pro progress bar) */
  totalLessons?: number;
  
  /** User data pro VPC komponenty */
  userData?: { id: string } | null;
  
  /** Callback pro navigaci na nástroj */
  onNavigateToTool?: (toolId: string) => void;
}

export function MobileCourseModule3({
  moduleData,
  vpcData,
  onVPCUpdate,
  completedLessons,
  onLessonComplete,
  currentLessonIndex = 0,
  onLessonChange,
  onOpenSidebar,
  onOpenDashboard,
  availableSegments = [],
  availableValues = [],
  selectedSegment,
  onSelectSegment,
  selectedValue,
  onSelectValue,
  totalLessons = 16, // Default: 9 + 4 + 3 lekce
  userData = null,
  onNavigateToTool,
}: Props) {
  // Current lesson
  const lesson = moduleData.lessons[currentLessonIndex];
  const isCompleted = completedLessons.has(`${moduleData.id}-${lesson.id}`);
  
  // Navigation
  const hasPrevious = currentLessonIndex > 0;
  const hasNext = currentLessonIndex < moduleData.lessons.length - 1;
  
  const handlePrevious = () => {
    if (hasPrevious && onLessonChange) {
      haptic('light');
      onLessonChange(currentLessonIndex - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleNext = () => {
    if (hasNext && onLessonChange) {
      haptic('light');
      onLessonChange(currentLessonIndex + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleComplete = () => {
    haptic('success');
    onLessonComplete(lesson.id);
  };
  
  // Render VPC content based on lesson
  const renderVPCContent = () => {
    const section = lesson.canvasSection;
    
    // LEKCE 14: Customer Profile (mobilní komponenta!)
    if (section === 'vpc-customer') {
      return (
        <MobileVPCCustomerProfile
          userId={userData?.id || "guest"}
          selectedSegment={selectedSegment || null}
          onSelectSegment={(seg) => {
            if (onSelectSegment) onSelectSegment(seg);
          }}
          onComplete={async () => {
            // Mark lesson as complete
            if (onLessonComplete) {
              onLessonComplete(14);
            }
            
            // Auto-navigate to next lesson
            setTimeout(() => {
              if (onLessonChange) {
                onLessonChange(1); // Next lesson index
              }
            }, 1000);
          }}
          onAchievementUnlocked={(achievementId) => {
            console.log('🎉 Achievement unlocked:', achievementId);
          }}
        />
      );
    }
    
    // LEKCE 15: Value Map (mobilní komponenta!)
    if (section === 'vpc-value') {
      return (
        <MobileVPCValueMap
          userId={userData?.id || "guest"}
          selectedSegment={selectedSegment || "Můj segment"}
          selectedValue={selectedValue || null}
          onSelectValue={(val) => {
            if (onSelectValue) onSelectValue(val);
          }}
          onComplete={async () => {
            // Mark lesson as complete
            if (onLessonComplete) {
              onLessonComplete(15);
            }
            
            // Auto-navigate to next lesson
            setTimeout(() => {
              if (onLessonChange) {
                onLessonChange(2); // Next lesson index
              }
            }, 1000);
          }}
          onAchievementUnlocked={(achievementId) => {
            console.log('🎉 Achievement unlocked:', achievementId);
          }}
        />
      );
    }
    
    // LEKCE 16: FIT Validator (mobilní komponenta!)
    if (section === 'vpc-fit') {
      return (
        <MobileFitValidator
          userId={userData?.id || "guest"}
          selectedSegment={selectedSegment || ""}
          onComplete={async (fitScore) => {
            if (onLessonComplete) {
              onLessonComplete(16);
            }
            console.log('FIT validation complete with score:', fitScore);
          }}
          onAchievementUnlocked={(achievementId) => {
            console.log('🎉 Achievement unlocked:', achievementId);
          }}
          onNavigateToTool={onNavigateToTool}
        />
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
        <div
          className="prose prose-sm max-w-none bg-white rounded-xl p-4 shadow-sm border border-gray-200"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />

        {/* TIPS */}
        {lesson.tips && lesson.tips.length > 0 && (
          <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-4">
            <div className="flex items-start gap-2 mb-2">
              <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <h4 className="text-purple-900">💡 Tipy</h4>
            </div>
            <ul className="space-y-2 ml-7">
              {lesson.tips.map((tip, i) => (
                <li key={i} className="text-sm text-gray-700">{tip}</li>
              ))}
            </ul>
          </div>
        )}

        {/* VPC CONTENT (Canvas nebo FIT Validator) */}
        {renderVPCContent()}

        {/* COMPLETE BUTTON */}
        {!isCompleted && (
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
          
          <Button
            onClick={handleNext}
            disabled={!hasNext}
            className="flex-1"
          >
            Další
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

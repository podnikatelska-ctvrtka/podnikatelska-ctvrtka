/**
 * 📱 MOBILE COURSE - MODULE 1: Podnikatelský model
 * 
 * Zobrazuje JEDNU aktivní lekci (ne accordion).
 * Navigace je přes MobileCourseSidebar.
 */

import { useState, useEffect } from "react";
import { CheckCircle2, Menu, Home, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { MobileCanvasAccordion } from "../MobileCanvasAccordion";
import { haptic } from "../../lib/haptics";

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
  canvasSection: string;
  description: string;
  content: string;
}

interface Props {
  /** Data modulu z CourseDemoV3 */
  moduleData: {
    id: number;
    title: string;
    description: string;
    lessons: Lesson[];
  };
  
  /** Canvas data */
  canvasData: CanvasData;
  
  /** Callback pro update canvas dat */
  onCanvasUpdate: (section: string, items: CanvasItem[]) => void;
  
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
  
  /** Callback pro zobrazení welcome modalu */
  onShowWelcomeModal?: () => void;
  
  /** Celkový počet lekcí ve všech modulech (pro progress bar) */
  totalLessons?: number;
}

export function MobileCourseModule1({
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
  
  // Transform canvas data to sections for accordion
  const getCanvasSections = () => {
    const section = lesson.canvasSection;
    
    // Map canvas section names to titles
    const sectionTitles: Record<string, string> = {
      segments: '👥 Zákaznické segmenty',
      value: '💎 Hodnotová nabídka',
      channels: '📢 Kanály',
      relationships: '❤️ Vztahy se zákazníky',
      revenue: '💰 Zdroje příjmů',
      partners: '🤝 Klíčoví partneři',
      activities: '⚡ Klíčové aktivity',
      resources: '🏗️ Klíčové zdroje',
      costs: '💸 Náklady',
    };
    
    return [{
      id: section,
      title: sectionTitles[section] || section,
      items: (canvasData as any)[section] || [],
      valueLabel: (section === 'revenue' || section === 'costs') ? 'Měsíční částka (Kč)' : undefined,
    }];
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
        <div
          className="prose prose-sm max-w-none bg-white rounded-xl p-4 shadow-sm border border-gray-200"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />

        {/* CANVAS SECTION */}
        <div>
          <h3 className="mb-3 px-1">✍️ Vyplňte svůj canvas</h3>
          <MobileCanvasAccordion
            sections={getCanvasSections()}
            highlightSection={lesson.canvasSection}
            allowedSection={lesson.canvasSection}
            onAddItem={(sectionId, text, color, value) => {
              const section = (canvasData as any)[sectionId] || [];
              const newItem: CanvasItem = {
                text,
                color: color as CanvasItem['color'],
                value,
              };
              onCanvasUpdate(sectionId, [...section, newItem]);
            }}
            onRemoveItem={(sectionId, index) => {
              const section = (canvasData as any)[sectionId] || [];
              onCanvasUpdate(
                sectionId,
                section.filter((_: any, i: number) => i !== index)
              );
            }}
            onUpdateItem={(sectionId, index, text, color, value) => {
              const section = (canvasData as any)[sectionId] || [];
              const updatedSection = section.map((item: CanvasItem, i: number) => {
                if (i === index) {
                  return {
                    text,
                    color: color as CanvasItem['color'],
                    value,
                  };
                }
                return item;
              });
              onCanvasUpdate(sectionId, updatedSection);
            }}
          />
        </div>

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

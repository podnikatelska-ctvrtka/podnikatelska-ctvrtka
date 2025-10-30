import { CheckCircle, Lock, ChevronRight, BookOpen, LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";
import { useOrientation } from "../lib/useOrientation";

interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Array<{ id: number; title: string; canvasSection?: string }>;
}

interface MobileSidebarContentProps {
  modules: Module[];
  currentModuleId: number;
  currentLessonIndex: number;
  completedLessons: Set<number>;
  onSelectLesson: (moduleId: number, lessonIndex: number) => void;
  onShowDashboard: () => void;
  showingDashboard?: boolean;
}

export function MobileSidebarContent({
  modules,
  currentModuleId,
  currentLessonIndex,
  completedLessons,
  onSelectLesson,
  onShowDashboard,
  showingDashboard = false
}: MobileSidebarContentProps) {
  const orientation = useOrientation();
  const isLandscape = orientation === 'landscape';
  // Calculate progress
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedCount = completedLessons.size;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);
  
  // Check if previous modules are completed
  const module1 = modules.find(m => m.id === 1);
  const module2 = modules.find(m => m.id === 2);
  const isModule1Complete = module1 ? module1.lessons.every(l => completedLessons.has(l.id)) : false;
  const isModule2Complete = module2 ? module2.lessons.every(l => completedLessons.has(l.id)) : false;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header - Kompaktnější v landscape */}
      <div className={`border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 ${
        isLandscape ? 'p-2' : 'p-4'
      }`}>
        <div className={`flex items-center gap-2 text-white ${isLandscape ? 'mb-1' : 'mb-3'}`}>
          <BookOpen className={isLandscape ? 'w-4 h-4' : 'w-6 h-6'} />
          <div className="flex-1">
            <h2 className={`font-bold ${isLandscape ? 'text-sm' : ''}`}>Podnikatelská Čtvrtka</h2>
            {!isLandscape && <p className="text-xs text-blue-100">Navigace kurzu</p>}
          </div>
        </div>
        
        {/* Progress */}
        <div className={`bg-white/20 rounded-full overflow-hidden ${isLandscape ? 'h-1' : 'h-2'}`}>
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className={`text-blue-100 ${isLandscape ? 'text-[10px] mt-0.5' : 'text-xs mt-1'}`}>
          {completedCount}/{totalLessons} lekcí ({progressPercent}%)
        </p>
      </div>

      {/* Dashboard Button - Kompaktnější v landscape */}
      <div className={`border-b border-gray-200 ${isLandscape ? 'p-1.5' : 'p-3'}`}>
        <button
          onClick={onShowDashboard}
          className={`w-full flex items-center gap-2 rounded-lg transition-all duration-200 ${
            isLandscape ? 'p-1.5' : 'p-3'
          } ${
            showingDashboard 
              ? 'bg-blue-50 border-2 border-blue-300 text-blue-700' 
              : 'hover:bg-blue-50 hover:border-blue-200 border-2 border-transparent'
          }`}
        >
          <LayoutDashboard className={isLandscape ? 'w-3 h-3' : 'w-4 h-4'} />
          <span className={`font-medium ${isLandscape ? 'text-xs' : ''}`}>📊 Dashboard</span>
        </button>
      </div>

      {/* Modules & Lessons - Scrollable, kompaktnější v landscape */}
      <div className={`flex-1 overflow-y-auto ${isLandscape ? 'p-1.5' : 'p-3'}`}>
        <div className={isLandscape ? 'space-y-2' : 'space-y-4'}>
          {modules.map((module) => {
            const moduleCompleted = module.lessons.every(l => completedLessons.has(l.id));
            const moduleLessonsCompleted = module.lessons.filter(l => completedLessons.has(l.id)).length;
            const isCurrentModule = module.id === currentModuleId;

            return (
              <div key={module.id} className={isLandscape ? 'space-y-1' : 'space-y-2'}>
                {/* Module Header - Kompaktnější v landscape */}
                <div className={`rounded-lg ${
                  isLandscape ? 'p-1.5' : 'p-3'
                } ${
                  isCurrentModule 
                    ? 'bg-blue-50 border-2 border-blue-300' 
                    : moduleCompleted 
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className={`flex items-center ${isLandscape ? 'gap-1.5' : 'gap-2'}`}>
                    {moduleCompleted ? (
                      <CheckCircle className={`text-green-600 flex-shrink-0 ${isLandscape ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    ) : moduleLessonsCompleted > 0 ? (
                      <div className={`rounded-full border-2 border-blue-500 flex-shrink-0 ${isLandscape ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    ) : (
                      <Lock className={`text-gray-400 flex-shrink-0 ${isLandscape ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold ${
                        isLandscape ? 'text-xs' : 'text-sm'
                      } ${
                        isCurrentModule ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        Modul {module.id}: {module.title}
                      </h3>
                      <p className={`text-gray-600 truncate ${isLandscape ? 'text-[10px]' : 'text-xs'}`}>
                        {moduleLessonsCompleted}/{module.lessons.length} lekcí
                      </p>
                    </div>
                  </div>
                </div>

                {/* Lessons - Kompaktnější v landscape */}
                <div className={isLandscape ? 'ml-1 space-y-0.5' : 'ml-2 space-y-1'}>
                  {module.lessons.map((lesson, lessonIndex) => {
                    const isCompleted = completedLessons.has(lesson.id);
                    const isCurrent = !showingDashboard && isCurrentModule && lessonIndex === currentLessonIndex;
                    
                    // SEKVENČNÍ LOGIKA
                    let isLocked = false;
                    if (module.id === 2 && !isModule1Complete) {
                      isLocked = true;
                    } else if (module.id === 3 && !isModule2Complete) {
                      isLocked = true;
                    } else if (lessonIndex > 0) {
                      const previousLesson = module.lessons[lessonIndex - 1];
                      if (!completedLessons.has(previousLesson.id)) {
                        isLocked = true;
                      }
                    }

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => !isLocked && onSelectLesson(module.id, lessonIndex)}
                        disabled={isLocked}
                        className={`w-full flex items-center rounded text-left transition-all ${
                          isLandscape ? 'gap-1.5 p-1' : 'gap-2 p-2'
                        } ${
                          isLocked
                            ? 'opacity-50 cursor-not-allowed'
                            : isCurrent
                            ? 'bg-blue-100 border-2 border-blue-400'
                            : isCompleted
                            ? 'bg-green-50 hover:bg-green-100'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className={`rounded-full flex items-center justify-center flex-shrink-0 ${
                          isLandscape ? 'w-4 h-4 text-[10px]' : 'w-5 h-5 text-xs'
                        } ${
                          isLocked
                            ? 'bg-gray-300 text-gray-500'
                            : isCompleted 
                            ? 'bg-green-500 text-white' 
                            : isCurrent
                            ? 'bg-blue-500 text-white font-bold'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {isLocked ? (
                            <Lock className={isLandscape ? 'w-2 h-2' : 'w-3 h-3'} />
                          ) : isCompleted ? (
                            <CheckCircle className={isLandscape ? 'w-2 h-2' : 'w-3 h-3'} />
                          ) : (
                            <span>{lessonIndex + 1}</span>
                          )}
                        </div>
                        
                        <span className={`flex-1 min-w-0 truncate ${
                          isLandscape ? 'text-[10px]' : 'text-xs'
                        } ${
                          isLocked ? 'text-gray-400' : isCurrent ? 'font-bold text-blue-900' : 'text-gray-700'
                        }`}>
                          {lesson.title}
                        </span>

                        {isLocked && (
                          <Lock className={`text-gray-400 flex-shrink-0 ${isLandscape ? 'w-2 h-2' : 'w-3 h-3'}`} />
                        )}
                        {isCurrent && !isLocked && (
                          <ChevronRight className={`text-blue-600 flex-shrink-0 ${isLandscape ? 'w-3 h-3' : 'w-4 h-4'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

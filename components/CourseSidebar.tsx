import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, Lock, ChevronRight, ChevronLeft, BookOpen, LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Array<{ id: number; title: string; canvasSection?: string }>;
}

interface CourseSidebarProps {
  modules: Module[];
  currentModuleId: number;
  currentLessonIndex: number;
  completedLessons: Set<number>;
  onSelectLesson: (moduleId: number, lessonIndex: number) => void;
  onShowDashboard: () => void;
  showingDashboard?: boolean;
}

export function CourseSidebar({
  modules,
  currentModuleId,
  currentLessonIndex,
  completedLessons,
  onSelectLesson,
  onShowDashboard,
  showingDashboard = false
}: CourseSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Calculate progress
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedCount = completedLessons.size;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);
  
  // Check if previous modules are completed (for unlocking next modules)
  const module1 = modules.find(m => m.id === 1);
  const module2 = modules.find(m => m.id === 2);
  const isModule1Complete = module1 ? module1.lessons.every(l => completedLessons.has(l.id)) : false;
  const isModule2Complete = module2 ? module2.lessons.every(l => completedLessons.has(l.id)) : false;

  return (
    <>
      {/* Sidebar */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isCollapsed ? -280 : 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="hidden md:flex fixed left-0 top-0 h-screen w-80 bg-white border-r border-gray-200 shadow-lg z-40 flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="flex items-center gap-3 text-white mb-3">
            <BookOpen className="w-6 h-6" />
            <div className="flex-1">
              <h2 className="font-bold">Podnikatelská Čtvrtka</h2>
              <p className="text-xs text-blue-100">Navigace kurzu</p>
            </div>
          </div>
          
          {/* Progress */}
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              className="h-full bg-white"
            />
          </div>
          <p className="text-xs text-blue-100 mt-1">
            {completedCount}/{totalLessons} lekcí ({progressPercent}%)
          </p>
        </div>

        {/* Dashboard Button */}
        <div className="p-3 border-b border-gray-200">
          <Button
            onClick={onShowDashboard}
            variant={showingDashboard ? "default" : "outline"}
            className={`w-full justify-start gap-2 ${
              showingDashboard 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'hover:bg-blue-50 hover:border-blue-300'
            }`}
            size="sm"
          >
            <LayoutDashboard className="w-4 h-4" />
            📊 Dashboard
          </Button>
        </div>

        {/* Modules & Lessons - Scrollable */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-4">
            {modules.map((module) => {
              const moduleCompleted = module.lessons.every(l => completedLessons.has(l.id));
              const moduleLessonsCompleted = module.lessons.filter(l => completedLessons.has(l.id)).length;
              const isCurrentModule = module.id === currentModuleId;

              return (
                <div key={module.id} className="space-y-2">
                  {/* Module Header */}
                  <div className={`p-3 rounded-lg ${
                    isCurrentModule 
                      ? 'bg-blue-50 border-2 border-blue-300' 
                      : moduleCompleted 
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      {moduleCompleted ? (
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      ) : moduleLessonsCompleted > 0 ? (
                        <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex-shrink-0" />
                      ) : (
                        <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-sm font-bold ${
                          isCurrentModule ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          Modul {module.id}
                        </h3>
                        <p className="text-xs text-gray-600 truncate">
                          {moduleLessonsCompleted}/{module.lessons.length} lekcí
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Lessons */}
                  <div className="ml-2 space-y-1">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = completedLessons.has(lesson.id);
                      const isCurrent = !showingDashboard && isCurrentModule && lessonIndex === currentLessonIndex;
                      
                      // SEKVENČNÍ LOGIKA: Lekce je zamčená pokud předchozí není dokončená
                      let isLocked = false;
                      
                      // Modul 2 zamčený dokud není Modul 1 hotový
                      if (module.id === 2 && !isModule1Complete) {
                        isLocked = true;
                      }
                      // Modul 3 zamčený dokud není Modul 2 hotový
                      else if (module.id === 3 && !isModule2Complete) {
                        isLocked = true;
                      }
                      // V rámci modulu: lekce N je zamčená pokud N-1 není dokončená
                      // ✅ VÝJIMKA: Lekce 16 (FIT Validator) je vždy odemčená pro přepínání segmentů!
                      else if (lessonIndex > 0 && lesson.id !== 16) {
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
                          className={`w-full flex items-center gap-2 p-2 rounded text-left transition-all ${
                            isLocked
                              ? 'opacity-50 cursor-not-allowed'
                              : isCurrent
                              ? 'bg-blue-100 border-2 border-blue-400'
                              : isCompleted
                              ? 'bg-green-50 hover:bg-green-100'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                            isLocked
                              ? 'bg-gray-300 text-gray-500'
                              : isCompleted 
                              ? 'bg-green-500 text-white' 
                              : isCurrent
                              ? 'bg-blue-500 text-white font-bold'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {isLocked ? (
                              <Lock className="w-3 h-3" />
                            ) : isCompleted ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <span>{lessonIndex + 1}</span>
                            )}
                          </div>
                          
                          <span className={`text-xs flex-1 min-w-0 truncate ${
                            isLocked ? 'text-gray-400' : isCurrent ? 'font-bold text-blue-900' : 'text-gray-700'
                          }`}>
                            {lesson.title}
                          </span>

                          {isLocked && (
                            <Lock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          )}
                          {isCurrent && !isLocked && (
                            <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0" />
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
      </motion.div>

      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:block fixed top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-r-lg p-2 shadow-lg z-50 hover:bg-gray-50 transition-all"
        style={{ 
          left: isCollapsed ? '0px' : '320px',
          transition: 'left 0.3s ease'
        }}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>
    </>
  );
}

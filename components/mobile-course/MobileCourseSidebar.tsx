/**
 * 📱 MOBILE COURSE SIDEBAR
 * 
 * Hamburger menu s navigací pro mobil.
 * Slide-in panel s moduly, lekcemi a tools.
 */

import { useState } from "react";
import { 
  X, 
  Home, 
  BookOpen, 
  CheckCircle, 
  Lock, 
  ChevronDown,
  ChevronUp,
  Trophy,
  Wrench,
  LogOut,
  Calculator,
  TrendingUp,
  Target
} from "lucide-react";
import { Button } from "../ui/button";
import { haptic } from "../../lib/haptics";

interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Array<{ id: number; title: string; canvasSection?: string }>;
}

interface Props {
  /** Je sidebar otevřený? */
  isOpen: boolean;
  
  /** Callback pro zavření */
  onClose: () => void;
  
  /** Moduly kurzu */
  modules: Module[];
  
  /** Aktuální modul ID */
  currentModuleId: number;
  
  /** Aktuální index lekce */
  currentLessonIndex: number;
  
  /** Dokončené lekce (Set of lesson IDs) */
  completedLessons: Set<number>;
  
  /** Callback pro výběr lekce */
  onSelectLesson: (moduleId: number, lessonIndex: number) => void;
  
  /** Callback pro zobrazení dashboardu */
  onShowDashboard: () => void;
  
  /** Je zobrazený dashboard? */
  showingDashboard?: boolean;
  
  /** Progress info */
  totalLessons: number;
  completedCount: number;
  
  /** Callback pro výběr nástroje */
  onSelectTool?: (toolId: string) => void;
  
  /** Aktuálně vybraný nástroj */
  currentTool?: string | null;
}

export function MobileCourseSidebar({
  isOpen,
  onClose,
  modules,
  currentModuleId,
  currentLessonIndex,
  completedLessons,
  onSelectLesson,
  onShowDashboard,
  showingDashboard = false,
  totalLessons,
  completedCount,
  onSelectTool,
  currentTool = null,
}: Props) {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([currentModuleId]));
  const [toolsExpanded, setToolsExpanded] = useState(true);
  
  const progressPercent = Math.round((completedCount / totalLessons) * 100);
  
  // Toggle module expansion
  const toggleModule = (moduleId: number) => {
    haptic('light');
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };
  
  // Check if module is unlocked
  const isModuleUnlocked = (moduleId: number) => {
    if (moduleId === 1) return true;
    
    const previousModule = modules.find(m => m.id === moduleId - 1);
    if (!previousModule) return false;
    
    // ✅ FIX: Používáme PŘÍMO lesson.id (number), ne string formát
    return previousModule.lessons.every(l => 
      completedLessons.has(l.id)
    );
  };
  
  // Handle lesson select
  const handleSelectLesson = (moduleId: number, lessonIndex: number) => {
    haptic('medium');
    onSelectLesson(moduleId, lessonIndex);
    onClose();
  };
  
  // Handle dashboard
  const handleShowDashboard = () => {
    haptic('medium');
    onShowDashboard();
    onClose();
  };

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        />
      )}

      {/* SIDEBAR PANEL */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              <div>
                <h2 className="text-white">Navigace kurzu</h2>
                <p className="text-xs text-blue-100">Podnikatelská Čtvrtka</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                haptic('light');
                onClose();
              }}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* PROGRESS */}
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-white transition-all duration-500"
            />
          </div>
          <p className="text-blue-100 text-xs mt-1">
            {completedCount}/{totalLessons} lekcí ({progressPercent}%)
          </p>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {/* DASHBOARD BUTTON */}
          <div className="p-3 border-b border-gray-200">
            <button
              onClick={handleShowDashboard}
              className={`
                w-full flex items-center gap-3 p-3 rounded-lg transition-all
                ${showingDashboard 
                  ? 'bg-blue-50 border-2 border-blue-300 text-blue-700' 
                  : 'hover:bg-gray-50 border-2 border-transparent'
                }
              `}
            >
              <Home className="w-5 h-5" />
              <span>📊 Dashboard</span>
            </button>
          </div>

          {/* TOOLS SECTION */}
          {onSelectTool && (
            <div className="border-b border-gray-200">
              {/* Tools Header */}
              <button
                onClick={() => {
                  haptic('light');
                  setToolsExpanded(!toolsExpanded);
                }}
                className="w-full p-3 flex items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <Wrench className="w-5 h-5 text-gray-600" />
                <span className="flex-1 text-left font-medium text-gray-900">🧮 Nástroje</span>
                {toolsExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                )}
              </button>

              {/* Tools List */}
              {toolsExpanded && (
                <div className="bg-gray-50 border-t border-gray-200 px-3 py-2 space-y-1">
                  {[
                    {
                      id: 'action-plan',
                      title: '🎯 Akční plán',
                      icon: Target,
                      requiresCompletion: true, // Zobrazit jen po dokončení kurzu
                    },
                    {
                      id: 'target-calculator',
                      title: '🧮 Kalkulačka zákazníků',
                      icon: Calculator,
                    },
                    {
                      id: 'segment-size',
                      title: '📊 Velikost segmentu',
                      icon: TrendingUp,
                    },
                  ]
                  .filter((tool) => {
                    // Filtruj Akční plán - zobrazit pouze po dokončení celého kurzu
                    if (tool.requiresCompletion) {
                      return progressPercent === 100;
                    }
                    return true;
                  })
                  .map((tool) => {
                    const Icon = tool.icon;
                    const isActive = currentTool === tool.id;
                    
                    return (
                      <button
                        key={tool.id}
                        onClick={() => {
                          haptic('medium');
                          onSelectTool(tool.id);
                          onClose();
                        }}
                        className={`
                          w-full flex items-center gap-2 p-2 rounded-lg text-left transition-all text-sm
                          ${isActive
                            ? 'bg-purple-100 border border-purple-300 text-purple-900'
                            : 'hover:bg-white border border-transparent'
                          }
                        `}
                      >
                        <Icon className={`w-4 h-4 flex-shrink-0 ${
                          isActive ? 'text-purple-600' : 'text-gray-600'
                        }`} />
                        <span>{tool.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* MODULES */}
          <div className="p-3 space-y-2">
            {modules.map((module) => {
              const isExpanded = expandedModules.has(module.id);
              const isUnlocked = isModuleUnlocked(module.id);
              // ✅ FIX: Používáme PŘÍMO lesson.id (number), ne string formát
              const completedInModule = module.lessons.filter(l => 
                completedLessons.has(l.id)
              ).length;
              const isModuleComplete = completedInModule === module.lessons.length;

              return (
                <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* MODULE HEADER */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    disabled={!isUnlocked}
                    className={`
                      w-full flex items-center gap-2 p-3 text-left transition-colors
                      ${isUnlocked ? 'hover:bg-gray-50' : 'opacity-60'}
                      ${isModuleComplete ? 'bg-green-50' : ''}
                    `}
                  >
                    {/* ICON */}
                    <div className={`
                      flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
                      ${isModuleComplete ? 'bg-green-100' : isUnlocked ? 'bg-blue-100' : 'bg-gray-100'}
                    `}>
                      {!isUnlocked ? (
                        <Lock className="w-3 h-3 text-gray-400" />
                      ) : isModuleComplete ? (
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      ) : (
                        <BookOpen className="w-3 h-3 text-blue-600" />
                      )}
                    </div>

                    {/* TITLE */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm truncate ${isModuleComplete ? 'text-green-700' : 'text-gray-900'}`}>
                        {module.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {completedInModule}/{module.lessons.length} lekcí
                      </p>
                    </div>

                    {/* CHEVRON */}
                    {isUnlocked && (
                      <ChevronDown
                        className={`
                          w-4 h-4 text-gray-400 flex-shrink-0 transition-transform
                          ${isExpanded ? 'rotate-180' : ''}
                        `}
                      />
                    )}
                  </button>

                  {/* LESSONS */}
                  {isExpanded && isUnlocked && (
                    <div className="bg-gray-50 border-t border-gray-200">
                      {module.lessons.map((lesson, lessonIndex) => {
                        // ✅ FIX: Používáme PŘÍMO lesson.id (number), ne string formát
                        const isCompleted = completedLessons.has(lesson.id);
                        // 🔧 FIX: Lekce je aktivní POUZE když není aktivní nástroj
                        const isActive = currentModuleId === module.id && currentLessonIndex === lessonIndex && !currentTool;
                        const isLocked = lessonIndex > 0 && !completedLessons.has(module.lessons[lessonIndex - 1].id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => !isLocked && handleSelectLesson(module.id, lessonIndex)}
                            disabled={isLocked}
                            className={`
                              w-full flex items-center gap-2 px-4 py-2 text-left text-sm
                              transition-colors
                              ${isActive ? 'bg-blue-100 text-blue-700' : ''}
                              ${!isLocked && !isActive ? 'hover:bg-gray-100' : ''}
                              ${isLocked ? 'opacity-50' : ''}
                            `}
                          >
                            {/* ICON */}
                            {isLocked ? (
                              <Lock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                            ) : isCompleted ? (
                              <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                            ) : (
                              <div className="w-3 h-3 border-2 border-gray-300 rounded-full flex-shrink-0" />
                            )}

                            {/* TITLE */}
                            <span className={`flex-1 truncate ${isCompleted ? 'text-green-700' : ''}`}>
                              {lesson.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-200 p-3 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            © 2025 Podnikatelská Čtvrtka
          </p>
        </div>
      </div>
    </>
  );
}

/**
 * 📱 MOBILE COURSE DASHBOARD
 * 
 * Mobilní dashboard pro Podnikatelskou Čtvrtku.
 * Zobrazuje progress, moduly, achievements a quick actions.
 */

import { useState, useEffect } from "react";
import { 
  Trophy, 
  BookOpen, 
  ArrowRight, 
  CheckCircle, 
  Lock, 
  Award, 
  Star, 
  Target,
  Play,
  ChevronRight,
  Menu
} from "lucide-react";
import { Button } from "../ui/button";
import { haptic } from "../../lib/haptics";
import { ACHIEVEMENTS, calculateTotalPoints } from "../../lib/achievements";
import type { Achievement } from "../../lib/achievements";

interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Array<{ id: number; title: string; canvasSection?: string }>;
}

interface Props {
  /** User ID */
  userId: string;
  
  /** Moduly kurzu */
  modules: Module[];
  
  /** Dokončené lekce (Set of lesson IDs) */
  completedLessons: Set<string>;
  
  /** Aktuální modul ID */
  currentModuleId: number;
  
  /** Aktuální index lekce */
  currentLessonIndex: number;
  
  /** Callback pro pokračování */
  onContinue: () => void;
  
  /** Callback pro výběr modulu */
  onSelectModule: (moduleId: number) => void;
  
  /** Odemčená achievements */
  unlockedAchievements?: Set<string>;
  
  /** Callback pro otevření sidebaru */
  onOpenSidebar?: () => void;
  
  /** Callback pro zobrazení welcome modalu */
  onShowWelcomeModal?: () => void;
}

export function MobileCourseDashboard({
  userId,
  modules,
  completedLessons,
  currentModuleId,
  currentLessonIndex,
  onContinue,
  onSelectModule,
  unlockedAchievements = new Set(),
  onOpenSidebar,
  onShowWelcomeModal,
}: Props) {
  // Calculate total progress
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedCount = completedLessons.size;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);
  
  // Calculate module completion
  const getModuleProgress = (module: Module) => {
    // ✅ POUŽÍVÁME GLOBÁLNÍ LESSON ID (ne moduleId-lessonId)
    const completed = module.lessons.filter(l => 
      completedLessons.has(l.id)
    ).length;
    return {
      completed,
      total: module.lessons.length,
      percent: Math.round((completed / module.lessons.length) * 100),
    };
  };
  
  // Check if module is unlocked
  const isModuleUnlocked = (moduleId: number) => {
    if (moduleId === 1) return true;
    
    const previousModule = modules.find(m => m.id === moduleId - 1);
    if (!previousModule) return false;
    
    const progress = getModuleProgress(previousModule);
    return progress.completed === progress.total;
  };
  
  // Calculate achievement points
  const totalPoints = calculateTotalPoints(unlockedAchievements);
  const maxPoints = ACHIEVEMENTS.reduce((sum, a) => sum + (a.points || 0), 0);
  
  // Latest achievements (last 3)
  const latestAchievements = Array.from(unlockedAchievements)
    .map(id => ACHIEVEMENTS.find(a => a.id === id))
    .filter((a): a is Achievement => Boolean(a))
    .slice(-3)
    .reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* HEADER - SHODNÝ SE SIDEBAR */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 border-b border-blue-700 sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            {onOpenSidebar && (
              <button
                onClick={() => {
                  haptic('light');
                  onOpenSidebar();
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
            )}
            
            <div className="flex items-center gap-2 flex-1">
              <BookOpen className="w-6 h-6 text-white" />
              <div>
                <h2 className="text-white">Dashboard kurzu</h2>
                <p className="text-xs text-blue-100">Podnikatelská Čtvrtka</p>
              </div>
            </div>
            
            {/* Help Button */}
            {onShowWelcomeModal && (
              <button
                onClick={() => {
                  haptic('light');
                  onShowWelcomeModal();
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
                title="Nápověda a kontakt"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            )}
          </div>
          
          {/* PROGRESS BAR */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-100">Celkový pokrok</span>
              <span className="text-white font-semibold">{completedCount}/{totalLessons} lekcí</span>
            </div>
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                style={{ width: `${progressPercent}%` }}
                className="h-full bg-white transition-all duration-500"
              />
            </div>
            <p className="text-sm text-blue-100 text-center">
              {progressPercent}% dokončeno
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* CONTINUE BUTTON - Skrytý po dokončení celého kurzu */}
        {progressPercent < 100 && (
          <Button
            onClick={() => {
              haptic('medium');
              onContinue();
            }}
            size="lg"
            className="w-full h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
          >
            <Play className="w-5 h-5 mr-2" />
            {completedCount === 0 ? 'Začít kurz' : 'Pokračovat v kurzu'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        )}
        
        {/* COURSE COMPLETED MESSAGE */}
        {progressPercent === 100 && (
          <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl p-6 text-center shadow-lg">
            <Trophy className="w-16 h-16 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">🎉 Gratulujeme!</h3>
            <p className="text-green-50 mb-4">
              Dokončili jste celý kurz Podnikatelské Čtvrtky!
            </p>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-sm">
                💡 Vaše další kroky najdete v <strong>Akčním plánu</strong> v menu
              </p>
            </div>
          </div>
        )}

        {/* ACHIEVEMENTS - VŠECHNY (ODEMČENÉ + ZAMČENÉ) */}
        <div className="bg-white rounded-xl p-4 border-2 border-amber-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="text-amber-900">Úspěchy</h3>
          </div>
          
          {/* Progress */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Tvůj pokrok</p>
              <p className="text-amber-600">{unlockedAchievements.size} / {ACHIEVEMENTS.length}</p>
            </div>
            <div className="bg-amber-100 rounded-full px-4 py-2">
              <Award className="w-5 h-5 text-amber-600 inline mr-1" />
              <span className="text-amber-900">{totalPoints} bodů</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                style={{ width: `${Math.round((unlockedAchievements.size / ACHIEVEMENTS.length) * 100)}%` }}
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"
              />
            </div>
          </div>
          
          {/* Achievements Grid - Show ALL (locked + unlocked) */}
          <div className="space-y-2 max-h-80 overflow-y-auto">
            <p className="text-sm text-gray-600 mb-2">🎯 K odemčení:</p>
            {ACHIEVEMENTS.map((achievement) => {
              const isUnlocked = unlockedAchievements.has(achievement.id);
              
              return (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-3 rounded-lg p-3 border transition-all ${
                    isUnlocked
                      ? 'bg-amber-50 border-amber-300'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <span className={`text-2xl ${isUnlocked ? '' : 'grayscale'}`}>
                    {achievement.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${isUnlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                      {achievement.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {achievement.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {isUnlocked ? (
                      <CheckCircle className="w-5 h-5 text-amber-600" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-400" />
                    )}
                    {achievement.points && (
                      <span className={`text-xs font-bold ${isUnlocked ? 'text-amber-600' : 'text-gray-400'}`}>
                        +{achievement.points}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MODULES */}
        <div className="space-y-3">
          <h3 className="text-gray-900 px-1">📚 Moduly</h3>
          
          {modules.map((module) => {
            const progress = getModuleProgress(module);
            const isUnlocked = isModuleUnlocked(module.id);
            const isActive = module.id === currentModuleId;
            const isComplete = progress.completed === progress.total;

            return (
              <button
                key={module.id}
                onClick={() => {
                  if (isUnlocked) {
                    haptic('medium');
                    onSelectModule(module.id);
                  } else {
                    haptic('error');
                  }
                }}
                disabled={!isUnlocked}
                className={`
                  w-full bg-white rounded-xl p-4 border-2 shadow-sm text-left
                  transition-all
                  ${isActive ? 'border-blue-500 shadow-md' : 'border-gray-200'}
                  ${!isUnlocked ? 'opacity-60' : 'hover:shadow-md'}
                  ${isComplete ? 'bg-green-50' : ''}
                `}
              >
                <div className="flex items-start gap-3">
                  {/* ICON */}
                  <div className={`
                    flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                    ${isComplete ? 'bg-green-100' : isUnlocked ? 'bg-blue-100' : 'bg-gray-100'}
                  `}>
                    {!isUnlocked ? (
                      <Lock className="w-5 h-5 text-gray-400" />
                    ) : isComplete ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 min-w-0">
                    <h4 className={isComplete ? 'text-green-700' : 'text-gray-900'}>
                      {module.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 mb-3">
                      {module.description}
                    </p>
                    
                    {/* PROGRESS */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">
                          {progress.completed}/{progress.total} lekcí
                        </span>
                        <span className={isComplete ? 'text-green-600' : 'text-blue-600'}>
                          {progress.percent}%
                        </span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          style={{ width: `${progress.percent}%` }}
                          className={`
                            h-full transition-all duration-500
                            ${isComplete ? 'bg-green-500' : 'bg-blue-500'}
                          `}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ARROW */}
                  {isUnlocked && (
                    <ChevronRight className={`
                      w-5 h-5 flex-shrink-0 mt-1
                      ${isComplete ? 'text-green-600' : 'text-blue-600'}
                    `} />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* MOTIVATIONAL MESSAGE */}
        {progressPercent < 100 && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 text-white text-center">
            <Target className="w-8 h-8 mx-auto mb-2" />
            <p className="mb-1">
              Už jen {totalLessons - completedCount} lekcí do dokončení! 💪
            </p>
            <p className="text-sm text-blue-100">
              Jste na skvělé cestě k úspěchu!
            </p>
          </div>
        )}

        {progressPercent === 100 && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white text-center">
            <Trophy className="w-12 h-12 mx-auto mb-3" />
            <h3 className="text-white mb-2">🎉 Gratulujeme!</h3>
            <p className="text-green-100">
              Dokončili jste celý kurz Podnikatelská Čtvrtka!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

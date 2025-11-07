import { Trophy, BookOpen, ArrowRight, CheckCircle, Menu, X, Lock, Award, Star, Target, RefreshCw, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import { BusinessModelCanvasSimple } from "./BusinessModelCanvasSimple";
import { CourseSidebar } from "./CourseSidebar";
import { MobileSidebarContent } from "./MobileSidebarContent";
import { useOrientation } from "../lib/useOrientation";
import { MobileCanvasPreview } from "./MobileCanvasPreview";
import { OfflineIndicator, OfflineBadge } from "./OfflineIndicator";
import { PullToRefresh } from "./PullToRefresh";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { ACHIEVEMENTS, calculateTotalPoints, loadUnlockedAchievements, loadUnlockedAchievementsFromDB, scanAndUnlockMissedAchievements } from "../lib/achievements";
import type { Achievement } from "../lib/achievements";
import { toast } from "sonner";

interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Array<{ id: number; title: string; canvasSection?: string }>;
}

interface SimpleDashboardProps {
  userId: string;
  modules: Module[];
  completedLessons: Set<number>;
  currentModuleId: number;
  currentLessonIndex: number;
  onContinue: () => void;
  onSelectLesson: (moduleId: number, lessonIndex: number) => void;
  onShowDashboard: () => void;
  onProgressUpdate?: (progress: Set<number>) => void;
  onCheckAchievements?: () => void;
  unlockedAchievements?: Set<string>;
  onSelectTool?: (toolId: string) => void;
  currentTool?: string | null;
  onShowWelcomeModal?: () => void;
}

export function SimpleDashboard({
  userId,
  modules,
  completedLessons,
  currentModuleId,
  currentLessonIndex,
  onContinue,
  onSelectLesson,
  onShowDashboard,
  onProgressUpdate,
  onCheckAchievements,
  unlockedAchievements: unlockedAchievementsProp,
  onSelectTool,
  currentTool = null,
  onShowWelcomeModal
}: SimpleDashboardProps) {
  // 📱 LAYOUT DETECTION - Používáme POUZE šířku okna (ne touch detection!)
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  const orientation = useOrientation();
  const isLandscape = orientation === 'landscape';
  
  // 🔍 DEBUG: Log help button rendering conditions
  console.log('🔍 SimpleDashboard render:', {
    isMobile,
    hasOnShowWelcomeModal: !!onShowWelcomeModal,
    willRenderHelpButton: !isMobile && !!onShowWelcomeModal,
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'N/A'
  });
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [canvasSections, setCanvasSections] = useState<any[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(unlockedAchievementsProp || new Set());
  const [hasError, setHasError] = useState(false);
  
  // 🔄 SYNC prop to state when parent updates
  useEffect(() => {
    if (unlockedAchievementsProp) {
      console.log('🔄 SimpleDashboard: Syncing achievements from prop:', unlockedAchievementsProp.size);
      setUnlockedAchievements(unlockedAchievementsProp);
    }
  }, [unlockedAchievementsProp, unlockedAchievementsProp?.size]); // Track size changes!
  
  // Listen for window resize to update isMobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // ✅ Error boundary
  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Něco se pokazilo
          </h1>
          <p className="text-gray-600 mb-6">
            Omlouváme se, dashboard se nepodařilo načíst. Zkuste obnovit stránku.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Obnovit stránku
          </button>
        </div>
      </div>
    );
  }
  
  // Calculate progress - ✅ SAFE: Check if modules array is valid
  const totalLessons = modules && modules.length > 0 ? modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) : 0;
  const completedCount = completedLessons?.size || 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  
  // 🏆 Achievement stats
  const totalPoints = calculateTotalPoints(unlockedAchievements);
  const achievementProgress = ACHIEVEMENTS.length > 0 ? Math.round((unlockedAchievements.size / ACHIEVEMENTS.length) * 100) : 0;
  const [isScanning, setIsScanning] = useState(false);
  const [hasAutoScanned, setHasAutoScanned] = useState(false);
  
  // 🔄 Handler: Re-scan achievements
  const handleRescanAchievements = async () => {
    if (!userId || isScanning) return;
    
    setIsScanning(true);
    toast.info('🔍 Kontroluji missované achievementy...');
    
    try {
      const { newlyUnlocked, totalChecked } = await scanAndUnlockMissedAchievements(userId, unlockedAchievements);
      
      if (newlyUnlocked.length > 0) {
        // ✅ Reload achievements FROM SUPABASE (not just localStorage)
        const updated = await loadUnlockedAchievementsFromDB(userId);
        setUnlockedAchievements(updated);
        
        toast.success(`🎉 Odemkl jsi ${newlyUnlocked.length} nových achievementů!`, {
          description: `Zkontrolováno: ${totalChecked} achievementů`
        });
        
        // Trigger achievement check callback
        if (onCheckAchievements) {
          onCheckAchievements();
        }
      } else {
        toast.info('✅ Všechny achievementy jsou odemčené!', {
          description: `Zkontrolováno: ${totalChecked} achievementů`
        });
      }
    } catch (error) {
      console.error('❌ Error rescanning achievements:', error);
      toast.error('Chyba při kontrole achievementů', {
        description: 'Zkuste to prosím znovu'
      });
    } finally {
      setIsScanning(false);
    }
  };
  
  // 🔄 Auto-scan achievements on mount (once per session)
  useEffect(() => {
    if (!userId || hasAutoScanned || unlockedAchievements.size === ACHIEVEMENTS.length) return;
    
    // Check sessionStorage to avoid multiple scans in same session
    const sessionKey = `achievement_scan_${userId}`;
    const hasScannedThisSession = sessionStorage.getItem(sessionKey);
    
    if (hasScannedThisSession) {
      setHasAutoScanned(true);
      return;
    }
    
    // Auto-scan in background - with DEBUG LOGGING
    (async () => {
      console.log('🔍 AUTO-SCAN STARTED for userId:', userId);
      console.log('📊 Currently unlocked achievements:', unlockedAchievements.size);
      
      try {
        const { newlyUnlocked, totalChecked } = await scanAndUnlockMissedAchievements(userId, unlockedAchievements);
        
        console.log(`📋 AUTO-SCAN COMPLETE: Checked ${totalChecked} achievements, found ${newlyUnlocked.length} new`);
        
        if (newlyUnlocked.length > 0) {
          console.log('🎉 Newly unlocked achievements:', newlyUnlocked);
          
          // ✅ Reload achievements FROM SUPABASE (not just localStorage)
          const updated = await loadUnlockedAchievementsFromDB(userId);
          setUnlockedAchievements(updated);
          
          console.log(`✅ Reloaded from Supabase: ${updated.size} total achievements`);
          
          // Trigger achievement check callback
          if (onCheckAchievements) {
            onCheckAchievements();
          }
        } else {
          console.log('ℹ️ No new achievements to unlock (všechny už máš odemčené)');
        }
        
        // Mark as scanned
        sessionStorage.setItem(sessionKey, 'true');
        setHasAutoScanned(true);
      } catch (error) {
        console.error('❌ Error auto-scanning achievements:', error);
      }
    })();
  }, [userId, unlockedAchievements, hasAutoScanned, onCheckAchievements]);
  
  // Load Canvas data for mobile preview
  useEffect(() => {
    const loadCanvasData = async () => {
      if (!userId) return;
      
      try {
        const { data, error } = await supabase
          .from('user_canvas_data')
          .select('*')
          .eq('user_id', userId);
        
        if (error) {
          console.warn('Supabase error loading canvas:', error);
          return;
        }
        
        if (data) {
          const formatted = [
            { id: 'segments', title: 'Zákaznické segmenty', items: [], valueLabel: undefined },
            { id: 'value', title: 'Hodnotová nabídka', items: [], valueLabel: undefined },
            { id: 'channels', title: 'Kanály', items: [], valueLabel: undefined },
            { id: 'relationships', title: 'Vztahy se zákazníky', items: [], valueLabel: undefined },
            { id: 'revenue', title: 'Zdroje příjmů', items: [], valueLabel: 'Cena v Kč' },
            { id: 'resources', title: 'Klíčové zdroje', items: [], valueLabel: undefined },
            { id: 'activities', title: 'Klíčové aktivity', items: [], valueLabel: undefined },
            { id: 'partners', title: 'Klíčová partnerství', items: [], valueLabel: undefined },
            { id: 'costs', title: 'Struktura nákladů', items: [], valueLabel: 'Náklady v Kč' },
          ];
          
          data.forEach(section => {
            const found = formatted.find(f => f.id === section.section_key);
            if (found && section.content) {
              found.items = section.content;
            }
          });
          
          setCanvasSections(formatted);
        }
      } catch (err) {
        console.error('❌ Failed to load canvas data:', err);
        toast.error('Nepodařilo se načíst data z Canvasu', {
          description: 'Zkuste obnovit stránku nebo nás kontaktujte',
          action: {
            label: 'Obnovit',
            onClick: () => window.location.reload()
          }
        });
        setHasError(true);
      }
    };
    
    loadCanvasData();
  }, [userId, completedLessons]);

  // 🏆 Sync achievements from prop or load from localStorage
  useEffect(() => {
    if (unlockedAchievementsProp) {
      // Use prop if provided (live updates from parent)
      setUnlockedAchievements(unlockedAchievementsProp);
    } else if (userId) {
      // Fallback: load from localStorage
      const achievements = loadUnlockedAchievements(userId);
      setUnlockedAchievements(achievements);
    }
  }, [userId, unlockedAchievementsProp, completedLessons]); // Reload when prop changes or lessons completed

  // 🔄 FORCE RELOAD progress from Supabase when dashboard opens
  const handleRefreshProgress = async () => {
    if (!userId) return;
    
    console.log('🔄 SimpleDashboard: Reloading fresh progress from Supabase...');
    const { data, error } = await supabase
      .from('user_progress')
      .select('lesson_id')
      .eq('user_id', userId);
    
    if (error) {
      console.error('❌ Failed to reload progress:', error);
      toast.error('Nepodařilo se načíst váš pokrok', {
        description: 'Zkuste to prosím znovu za chvíli',
        action: {
          label: 'Zkusit znovu',
          onClick: () => handleRefreshProgress()
        }
      });
      return;
    }
    
    if (data) {
      const freshProgress = new Set(data.map(item => item.lesson_id));
      console.log('✅ Fresh progress loaded:', freshProgress.size, 'lessons');
      
      // ✅ Update parent component state!
      if (onProgressUpdate && freshProgress.size !== completedLessons.size) {
        console.log('🔄 Updating parent state from', completedLessons.size, 'to', freshProgress.size);
        onProgressUpdate(freshProgress);
      }
    }
  };

  useEffect(() => {
    handleRefreshProgress();
  }, []); // Only on mount

  return (
    <>
    <div className="fixed inset-0 bg-gray-50 overflow-y-auto z-10">
      {/* 📡 Offline Indicator */}
      <OfflineIndicator showToast={true} persistent={false} />

      {/* Hamburger Button (pouze na mobile - portrait i landscape) */}
      {isMobile && (
        <button
          onClick={() => setShowMobileSidebar(true)}
          className="fixed top-4 left-4 z-30 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Sidebar Overlay (pouze na mobile - portrait i landscape) */}
      {isMobile && showMobileSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowMobileSidebar(false)}
        >
          <div 
            className={`fixed left-0 top-0 h-full bg-white shadow-xl overflow-y-auto ${
              isLandscape ? 'w-56 max-w-[60vw]' : 'w-72 max-w-[85vw]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowMobileSidebar(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg z-50"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            
            <MobileSidebarContent
              modules={modules}
              currentModuleId={currentModuleId}
              currentLessonIndex={currentLessonIndex}
              completedLessons={completedLessons}
              onSelectLesson={(moduleId, lessonIndex) => {
                onSelectLesson(moduleId, lessonIndex);
                setShowMobileSidebar(false);
              }}
              onShowDashboard={() => {
                onShowDashboard();
                setShowMobileSidebar(false);
              }}
              showingDashboard={true}
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar - skrytý na mobile (portrait i landscape) */}
      <div className="hidden md:block">
        {!isMobile && (
          <CourseSidebar
            modules={modules}
            currentModuleId={currentModuleId}
            currentLessonIndex={currentLessonIndex}
            completedLessons={completedLessons}
            onSelectLesson={onSelectLesson}
            onShowDashboard={onShowDashboard}
            showingDashboard={true}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            onSelectTool={onSelectTool}
            currentTool={currentTool}
          />
        )}
      </div>

      {/* Main Dashboard Content - Wrapped in Pull-to-Refresh */}
      <PullToRefresh
        onRefresh={async () => {
          await handleRefreshProgress();
          // Delay pro vizuální feedback
          await new Promise(resolve => setTimeout(resolve, 500));
        }}
        enabled={true}
        threshold={80}
      >
        <div className={`flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 py-12 transition-all duration-300 ${!sidebarCollapsed && !isMobile ? 'md:pl-80' : ''}`}>
        <div className="w-full md:mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1400px' }}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl mb-2 text-gray-900">
            📊 Dashboard
          </h1>
          <p className="text-lg text-gray-700">
            Váš pokrok v kurzu Podnikatelská Čtvrtka
          </p>
        </div>

        {/* 2-COLUMN GRID: Progress + Achievements */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Progress Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-gray-900">Celkový pokrok</h2>
              <p className="text-gray-600">
                Dokončeno {completedCount} z {totalLessons} lekcí
              </p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-blue-600">{progressPercent}%</div>
              <div className="text-sm text-gray-500">hotovo</div>
            </div>
          </div>
          
          <div className="h-6 bg-gray-200 rounded-full overflow-hidden mb-6">
            <div
              style={{ width: `${progressPercent || 0}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000 ease-out"
            />
          </div>

          {/* Modules Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {modules && modules.length > 0 ? (
              modules.map((module) => {
                if (!module || !module.lessons) return null;
                const moduleCompleted = module.lessons.filter(l => completedLessons.has(l.id)).length;
                const moduleProgress = module.lessons.length > 0 ? Math.round((moduleCompleted / module.lessons.length) * 100) : 0;
                
                return (
                  <div
                    key={module.id}
                    className={`p-4 rounded-lg border-2 ${
                      moduleCompleted === module.lessons.length
                        ? 'bg-green-50 border-green-300'
                        : moduleCompleted > 0
                        ? 'bg-blue-50 border-blue-300'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {moduleCompleted === module.lessons.length ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      )}
                      <h3 className="text-gray-900">Modul {module.id}</h3>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{module.title}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {moduleCompleted}/{module.lessons.length} lekcí
                      </span>
                      <span className="font-bold text-blue-600">{moduleProgress}%</span>
                    </div>
                  </div>
                );
              })
            ) : (
              /* Empty State */
              <div className="col-span-2 text-center py-8">
                <div className="text-5xl mb-3">📚</div>
                <h3 className="text-gray-900 mb-2">Žádné moduly nenalezeny</h3>
                <p className="text-sm text-gray-600">
                  Kurz se načítá... Pokud problém přetrvává, obnovte stránku.
                </p>
              </div>
            )}
          </div>



          {/* Continue Button - SKRYJ pokud je kurz dokončený (100%) */}
          {progressPercent < 100 && (
            <Button
              onClick={onContinue}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 gap-2"
            >
              {progressPercent === 0 ? 'Začít kurz' : 'Pokračovat tam kde jsem skončil'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          )}
          
          {/* Když je 100%, ukaž gratulaci */}
          {progressPercent === 100 && (
            <div className="w-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-center text-white">
              <div className="text-4xl mb-2">🎓</div>
              <h3 className="font-bold text-xl mb-1">Gratulujeme!</h3>
              <p className="text-green-100">Dokončil jsi celý kurz! 🎉</p>
            </div>
          )}
          </div>

          {/* 🏆 ACHIEVEMENTS SECTION */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-6 border-2 border-yellow-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-3">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">🏆 Úspěchy</h2>
                <p className="text-sm text-gray-600">
                  Odemčeno {unlockedAchievements.size} z {ACHIEVEMENTS.length}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-orange-600">{totalPoints}</div>
              <div className="text-xs text-gray-500">bodů</div>
            </div>
          </div>
          
          {/* 🔄 Re-scan Button - pokud user nemá všechny achievementy */}
          {unlockedAchievements.size < ACHIEVEMENTS.length && (
            <div className="mb-4">
              <Button
                onClick={handleRescanAchievements}
                variant="outline"
                size="sm"
                disabled={isScanning}
                className="w-full border-yellow-400 text-yellow-700 hover:bg-yellow-50 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
                {isScanning ? 'Kontroluji...' : '🔄 Zkontrolovat missované achievementy'}
              </Button>
            </div>
          )}

          {/* Achievement Progress Bar */}
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
            <div
              style={{ width: `${achievementProgress || 0}%` }}
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000 ease-out"
            />
          </div>

          {/* Achievement Grid - REDESIGNED */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {ACHIEVEMENTS.map((achievement) => {
              const isUnlocked = unlockedAchievements.has(achievement.id);
              
              return (
                <div
                  key={achievement.id}
                  className={`relative group rounded-lg p-3 transition-all aspect-square flex flex-col items-center justify-center ${
                    isUnlocked 
                      ? 'bg-gradient-to-br from-white to-yellow-50 border-2 border-yellow-300 shadow-md hover:shadow-lg cursor-pointer hover:scale-105' 
                      : 'bg-gray-100 border-2 border-dashed border-gray-300 opacity-50'
                  }`}
                  title={achievement.description}
                >
                  {/* Lock icon for locked */}
                  {!isUnlocked && (
                    <div className="absolute top-1.5 right-1.5">
                      <Lock className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  )}

                  {/* Emoji */}
                  <div className={`mb-1.5 text-center ${!isUnlocked && 'grayscale opacity-40'}`} style={{ fontSize: '30px' }}>
                    {achievement.emoji}
                  </div>

                  {/* Title */}
                  <div className={`mb-1.5 line-clamp-2 text-center leading-tight font-bold antialiased ${
                    isUnlocked ? 'text-gray-900' : 'text-gray-500'
                  }`} style={{ fontSize: '11px' }}>
                    {achievement.title}
                  </div>

                  {/* Points badge */}
                  {achievement.points && (
                    <div className={`flex items-center justify-center gap-0.5 ${
                      isUnlocked 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
                        : 'bg-gray-200 text-gray-400'
                    } rounded-full px-1.5 py-0.5 font-bold`} style={{ fontSize: '9px' }}>
                      <Star className="w-2.5 h-2.5" fill="currentColor" />
                      <span>{achievement.points}</span>
                    </div>
                  )}

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1.5 bg-gray-900 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-xl" style={{ fontSize: '11px' }}>
                    {achievement.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next achievement hint */}
          {unlockedAchievements.size < ACHIEVEMENTS.length && (
            <div className="mt-4 bg-white rounded-lg p-4 border border-yellow-300">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    💡 Další úspěch k odemčení:
                  </p>
                  <p className="text-xs text-gray-600">
                    Dokončete další lekce nebo dosáhněte vyššího FIT Score pro odemčení dalších achievementů!
                  </p>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Canvas Section */}
        <div className="bg-white rounded-2xl shadow-xl"
        >
          <div className="p-8 mb-6">
            <h2 className="text-2xl text-gray-900 mb-2">
              🎨 Můj Podnikatelský model
            </h2>
            <p className="text-gray-600 mb-3">
              Váš rozpracovaný byznys model - aktualizuje se automaticky během kurzu
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Canvas vyplňujte během lekcí v interaktivním módu. 
                Tady je pouze pro náhled.
              </p>
            </div>
          </div>

          {/* Canvas - Desktop: Grid, Mobile: Accordion */}
          <div className="hidden md:block pb-8">
            <BusinessModelCanvasSimple
              userId={userId}
              hideTips={true}
              allowedSection="__NONE__"
              previewMode={true}
            />
          </div>
          
          {/* Mobile Canvas Preview - Accordion */}
          <div className="md:hidden">
            <MobileCanvasPreview sections={canvasSections} defaultOpen={false} />
          </div>
        </div>
      </div>
      </div>
      </PullToRefresh>
    </div>
    
    {/* 💡 HELP BUTTON - Desktop only (fixed bottom-right, nad "Uloženo") - MIMO main div! */}
    {!isMobile && onShowWelcomeModal && (
      <button
        onClick={() => {
          console.log('🔵 SimpleDashboard Help button clicked!');
          onShowWelcomeModal();
        }}
        className="fixed bottom-20 right-6 z-[9999] w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        aria-label="Nápověda"
      >
        <HelpCircle className="w-6 h-6" />
        <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Potřebujete pomoc?
        </span>
      </button>
    )}
    </>
  );
}

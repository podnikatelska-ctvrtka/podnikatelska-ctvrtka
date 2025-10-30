/**
 * 📱 MOBILNÍ VERZE KURZU
 * 
 * ✅ Čistá separace od desktop verze
 * ✅ Full screen content (bez uříznutí)
 * ✅ Swipe navigace (místo bottom nav)
 * ✅ Hamburger menu → overlay sidebar
 * ✅ Portrait only (landscape vyřazen)
 * ✅ Bez čísel v zákaznických segmentech
 * ✅ Všechny moduly + nový obsah (nástroje, akční plán)
 */

import { useState, useEffect } from "react";
import { Menu, X, ChevronLeft, ChevronRight, Trophy, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { supabase, verifyAccessToken } from "../lib/supabase";
import { loadCourseProgress, saveLessonProgress, saveCanvasData } from "../lib/courseProgress";

// Components
import { BusinessModelCanvasSimple } from "./BusinessModelCanvasSimple";
import { SimpleDashboard } from "./SimpleDashboard";
import { BusinessActionPlan } from "./BusinessActionPlan";
import { ToolsSection } from "./ToolsSection";
import { TargetCalculatorTool } from "./TargetCalculatorTool";
import { SegmentSizeTool } from "./SegmentSizeTool";
import { MobileSingleSection } from "./MobileSingleSection";
import { LessonContentRenderer } from "./LessonContentRenderer";
import { ValuePropositionCanvas } from "./ValuePropositionCanvas";
import { FitValidatorV2 } from "./FitValidatorV2";
import { MODULE_3 } from "./module3-data";
import { MODULE_1, MODULE_2 } from "./course-modules";
import { SegmentSelector } from "./SegmentSelector";
import { VPCCustomerProfile } from "./VPCCustomerProfile";
import { VPCValueMap } from "./VPCValueMap";
import { unlockAchievement, loadUnlockedAchievementsFromDB } from "../lib/achievements";
import { celebrateModuleComplete, celebrateLessonComplete } from "../lib/confetti";

// Modul 2 komponenty
import { ProfitCalculator } from "./ProfitCalculator";
import { ProblemSolver } from "./ProblemSolver";
import { BusinessModelGallery } from "./BusinessModelGallery";
import { CanvasValidator } from "./CanvasValidator";

// Verify token
async function verifyToken(token: string) {
  const user = await verifyAccessToken(token);
  if (!user) return null;
  return user;
}

// ✅ MODULE_1 and MODULE_2 are imported from course-modules.ts (see imports at top)
// This ensures both desktop and mobile versions use the same complete 13-lesson content

export function CourseDemoV3_Mobile() {
  // ======================================================================
  // STATE: Authentication & User
  // ======================================================================
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ======================================================================
  // STATE: Navigation
  // ======================================================================
  const [currentModuleNumber, setCurrentModuleNumber] = useState(1);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showingDashboard, setShowingDashboard] = useState(false);
  const [showingTools, setShowingTools] = useState(false);

  // ======================================================================
  // STATE: Progress & Achievements
  // ======================================================================
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  // ======================================================================
  // STATE: Canvas Data
  // ======================================================================
  const [canvasData, setCanvasData] = useState<any>({
    segments: [],
    values: [],
    channels: [],
    relationships: [],
    revenue: [],
    resources: [],
    activities: [],
    partners: [],
    costs: []
  });

  // VPC Data
  const [selectedVPCSegment, setSelectedVPCSegment] = useState("");
  const [selectedVPCValue, setSelectedVPCValue] = useState("");
  const [vpcCustomerProfile, setVpcCustomerProfile] = useState<any>({
    jobs: [],
    pains: [],
    gains: []
  });
  const [vpcValueMap, setVpcValueMap] = useState<any>({
    products: [],
    painRelievers: [],
    gainCreators: []
  });

  // Tools state
  const [currentTool, setCurrentTool] = useState<string | null>(null);
  
  // ======================================================================
  // 📱 DEVICE DETECTION: Pro conditial rendering (sticky notes vs comparison)
  // ======================================================================
  const [isMobileWidth, setIsMobileWidth] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobileWidth(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ======================================================================
  // MODULES & LESSONS
  // ======================================================================
  const allModules = [MODULE_1, MODULE_2, MODULE_3];
  const safeModuleNumber = Math.min(Math.max(1, currentModuleNumber), 3);
  const currentModule = allModules[safeModuleNumber - 1];
  const safeLessonIndex = Math.min(Math.max(0, currentLessonIndex), currentModule.lessons.length - 1);
  const currentLesson = currentModule.lessons[safeLessonIndex];

  // Total lessons
  const totalLessons = MODULE_1.lessons.length + MODULE_2.lessons.length + MODULE_3.lessons.length;
  
  // Current lesson number (1-16)
  let currentLessonNumber = 0; // Start from 0
  for (let i = 1; i < currentModuleNumber; i++) {
    currentLessonNumber += allModules[i - 1].lessons.length;
  }
  currentLessonNumber += currentLessonIndex + 1; // +1 converts 0-based index to 1-based number

  // ======================================================================
  // AUTHENTICATION
  // ======================================================================
  useEffect(() => {
    const checkAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (!token) {
        toast.error("Chybí přístupový token");
        setIsLoading(false);
        return;
      }

      const verifiedUser = await verifyToken(token);
      if (!verifiedUser) {
        toast.error("Neplatný token");
        setIsLoading(false);
        return;
      }

      console.log('✅ User verified:', verifiedUser);
      setUser(verifiedUser);
      
      // Load progress
      console.log('🔄 [DEBUG MOBILE] Načítám progress pro userId:', verifiedUser.id);
      const progress = await loadCourseProgress(verifiedUser.id);
      console.log('📊 [DEBUG MOBILE] Canvas data načtena:', progress.canvasData);
      console.log('💎 [DEBUG MOBILE] Values sekce:', progress.canvasData?.values);
      console.log('🎯 [DEBUG MOBILE] Segments sekce:', progress.canvasData?.segments);
      console.log('📡 [DEBUG MOBILE] Channels sekce:', progress.canvasData?.channels);
      setCompletedLessons(new Set(progress.completedLessons));
      setCanvasData(progress.canvasData || {});
      console.log('✅ [DEBUG MOBILE] State updated with canvasData');

      // Load achievements
      const achievements = await loadUnlockedAchievementsFromDB(verifiedUser.id);
      setUnlockedAchievements(achievements);

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // ======================================================================
  // NAVIGATION HANDLERS
  // ======================================================================
  const goToNextLesson = async () => {
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else if (currentModuleNumber < 3) {
      setCurrentModuleNumber(currentModuleNumber + 1);
      setCurrentLessonIndex(0);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    } else if (currentModuleNumber > 1) {
      setCurrentModuleNumber(currentModuleNumber - 1);
      const prevModule = allModules[currentModuleNumber - 2];
      setCurrentLessonIndex(prevModule.lessons.length - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markLessonComplete = async () => {
    const lessonId = currentLesson.id;
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonId);
    setCompletedLessons(newCompleted);

    if (user?.id) {
      await saveLessonProgress(user.id, lessonId, canvasData);
      
      // Achievements
      if (newCompleted.size === 1) {
        await unlockAchievement(user.id, 'first_lesson', setUnlockedAchievements);
      }
      if (newCompleted.size === totalLessons) {
        await unlockAchievement(user.id, 'course_complete', setUnlockedAchievements);
      }
    }

    celebrateLessonComplete();
    toast.success("✅ Lekce dokončena!");
    
    // Auto navigate to next
    setTimeout(() => {
      goToNextLesson();
    }, 1500);
  };

  // ======================================================================
  // ACHIEVEMENT HANDLER
  // ======================================================================
  const handleAchievementUnlock = async (achievementId: string) => {
    if (user?.id) {
      await unlockAchievement(user.id, achievementId, setUnlockedAchievements);
    }
  };

  // ======================================================================
  // SWIPE NAVIGATION
  // ======================================================================
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left = next lesson
      goToNextLesson();
    }
    if (isRightSwipe) {
      // Swipe right = previous lesson
      goToPreviousLesson();
    }
  };

  // ======================================================================
  // CANVAS HANDLERS
  // ======================================================================
  const handleAddCanvasItem = (section: string, text: string, color: string, value?: number) => {
    console.log('➕ [DEBUG MOBILE] Adding canvas item:', { section, text, color, value });
    setCanvasData((prev: any) => {
      console.log('📋 [DEBUG MOBILE] Previous canvas data:', prev);
      console.log('📋 [DEBUG MOBILE] Previous section data:', prev[section]);
      
      const newData = {
        ...prev,
        [section]: [...(prev[section] || []), { text, color, value }]
      };
      
      console.log('💾 [DEBUG MOBILE] New canvas data:', newData);
      console.log('💾 [DEBUG MOBILE] New section data:', newData[section]);
      
      // Auto-save to Supabase
      if (user?.id) {
        console.log('💾 [DEBUG MOBILE] Saving to DB for userId:', user.id);
        saveCanvasData(user.id, newData);
      }
      
      return newData;
    });
  };

  const handleRemoveCanvasItem = (section: string, index: number) => {
    setCanvasData((prev: any) => {
      const newData = {
        ...prev,
        [section]: prev[section].filter((_: any, i: number) => i !== index)
      };
      
      // Auto-save to Supabase
      if (user?.id) {
        saveCanvasData(user.id, newData);
      }
      
      return newData;
    });
  };

  const handleEditCanvasItem = (section: string, index: number, text: string, color: string, value?: number) => {
    setCanvasData((prev: any) => {
      const newData = { ...prev };
      newData[section][index] = { text, color, value };
      
      // Auto-save to Supabase
      if (user?.id) {
        saveCanvasData(user.id, newData);
      }
      
      return newData;
    });
  };

  // ======================================================================
  // LOADING STATE
  // ======================================================================
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Načítám kurz...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Přístup odepřen</h1>
          <p className="text-gray-600">Nemáte platný přístupový token</p>
        </div>
      </div>
    );
  }

  // ======================================================================
  // RENDER: MOBILE LAYOUT
  // ======================================================================
  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* ============================================
          TOP BAR: Progress + Hamburger Menu
      ============================================ */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-blue-200 shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-transform"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Center: Progress */}
          <div className="flex-1 mx-4">
            <div className="text-center">
              <p className="text-sm font-bold text-gray-900">
                Lekce {currentLessonNumber} / {totalLessons}
              </p>
              <p className="text-xs text-gray-600">{currentModule.title}</p>
            </div>
            {/* Progress bar */}
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentLessonNumber / totalLessons) * 100}%` }}
              />
            </div>
          </div>

          {/* Right: Trophy (achievements) */}
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <Trophy className="w-6 h-6 text-yellow-600" />
            {unlockedAchievements.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {unlockedAchievements.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ============================================
          SIDEBAR OVERLAY: Navigation
      ============================================ */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 shadow-2xl overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">Lekce kurzu</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/20 active:scale-95 transition-transform"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Dashboard & Tools Buttons */}
            <div className="p-4 space-y-2 border-b-2 border-gray-200">
              <button
                onClick={() => {
                  setShowingDashboard(true);
                  setShowingTools(false);
                  setSidebarOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 ${
                  showingDashboard
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <span className="text-2xl">📊</span>
                <div>
                  <p className="font-medium text-gray-900">Dashboard</p>
                  <p className="text-xs text-gray-500">Přehled pokroku</p>
                </div>
              </button>

            </div>

            {/* Tools Section - Rozbalovací menu */}
            <div className="px-4 pb-4">
              <ToolsSection 
                onSelectTool={(toolId) => {
                  setCurrentTool(toolId);
                  setShowingDashboard(false);
                  setShowingTools(true);
                  setSidebarOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                currentTool={currentTool}
              />
            </div>

            {/* Lessons list */}
            <div className="p-4 space-y-3">
              {allModules.map((module, moduleIdx) => (
                <div key={module.id}>
                  <h3 className="font-bold text-sm text-gray-500 uppercase mb-2">
                    Modul {module.id}: {module.title}
                  </h3>
                  {module.lessons.map((lesson, lessonIdx) => {
                    const isCompleted = completedLessons.has(lesson.id);
                    const isCurrent = module.id === currentModuleNumber && lessonIdx === currentLessonIndex;
                    
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setCurrentModuleNumber(module.id);
                          setCurrentLessonIndex(lessonIdx);
                          setShowingDashboard(false);
                          setShowingTools(false);
                          setCurrentTool(null); // ✅ Reset currentTool když přejdu na lekci
                          setSidebarOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          isCurrent && !showingDashboard && !showingTools
                            ? 'bg-blue-100 border-2 border-blue-500' 
                            : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium truncate ${isCurrent ? 'text-blue-900' : 'text-gray-900'}`}>
                              {lesson.title}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{lesson.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ============================================
          MAIN CONTENT: Scrollable lesson area
      ============================================ */}
      <div className="pb-20 px-4 py-6">
        {/* ============================================
            DASHBOARD VIEW
        ============================================ */}
        {showingDashboard && (
          <div className="space-y-6">
            <SimpleDashboard
              userId={user!.id}
              modules={allModules}
              completedLessons={completedLessons}
              currentModuleId={currentModuleNumber}
              currentLessonIndex={currentLessonIndex}
              onContinue={() => {
                setShowingDashboard(false);
                setShowingTools(false);
              }}
              onSelectLesson={(moduleId, lessonIndex) => {
                setCurrentModuleNumber(moduleId);
                setCurrentLessonIndex(lessonIndex);
                setShowingDashboard(false);
                setShowingTools(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onShowDashboard={() => setShowingDashboard(true)}
              unlockedAchievements={new Set(unlockedAchievements)}
              onSelectTool={(toolId) => {
                setShowingDashboard(false);
                setShowingTools(true);
              }}
              currentTool={null}
            />
          </div>
        )}

        {/* ============================================
            TOOLS VIEW
        ============================================ */}
        {showingTools && currentTool && (
          <div className="space-y-6">
            {/* Tool Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg">
              <button
                onClick={() => {
                  setShowingTools(false);
                  setCurrentTool(null);
                }}
                className="text-white/80 hover:text-white mb-2 flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Zpět na kurz
              </button>
              <h2 className="font-bold text-2xl">
                {currentTool === 'action-plan' && '🎯 Akční plán'}
                {currentTool === 'target-calculator' && '📊 Kolik potřebuji zákazníků?'}
                {currentTool === 'segment-size' && '📈 Velikost segmentu'}
              </h2>
            </div>

            {/* Tool Content */}
            {currentTool === 'action-plan' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <BusinessActionPlan 
                  userId={user!.id}
                  onNavigateToLesson={(lessonId) => {
                    // Find lesson and navigate to it
                    const allLessons = [...MODULE_1.lessons, ...MODULE_2.lessons, ...MODULE_3.lessons];
                    const lesson = allLessons.find(l => l.id === lessonId);
                    if (lesson) {
                      const moduleNumber = lessonId <= 9 ? 1 : lessonId <= 13 ? 2 : 3;
                      setCurrentModuleNumber(moduleNumber);
                      const module = moduleNumber === 1 ? MODULE_1 : moduleNumber === 2 ? MODULE_2 : MODULE_3;
                      const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
                      setCurrentLessonIndex(lessonIndex);
                      setShowingTools(false);
                      setCurrentTool(null);
                      setShowingDashboard(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                />
              </div>
            )}

            {currentTool === 'target-calculator' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <TargetCalculatorTool />
              </div>
            )}

            {currentTool === 'segment-size' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <SegmentSizeTool />
              </div>
            )}
          </div>
        )}

        {/* ============================================
            LESSON CONTENT (když není Dashboard ani Tools)
        ============================================ */}
        {!showingDashboard && !showingTools && (
          <>
            {/* Lesson header */}
            <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {currentLesson.title}
          </h1>
          <p className="text-gray-600">
            {currentLesson.description}
          </p>
        </div>

        {/* Lesson content */}
        {currentLesson.content && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <LessonContentRenderer 
              content={currentLesson.content} 
              isMobile={isMobileWidth}
            />
          </div>
        )}

        {/* Interactive components based on lesson */}
        
        {/* 1. Zákaznické segmenty */}
        {currentLesson.canvasSection === 'segments' && (
          <MobileSingleSection
            sectionTitle="Zákaznické segmenty"
            items={canvasData.segments || []}
            allowGlobal={false}
            onAddItem={(text, color, value) => handleAddCanvasItem('segments', text, color, value)}
            onRemoveItem={(index) => handleRemoveCanvasItem('segments', index)}
            onEditItem={(index, text, color, value) => handleEditCanvasItem('segments', index, text, color, value)}
            onComplete={markLessonComplete}
          />
        )}

        {/* 2. Hodnotová nabídka */}
        {currentLesson.canvasSection === 'values' && (
          <MobileSingleSection
            sectionTitle="Hodnotová nabídka"
            items={canvasData.values || []}
            allowGlobal={false}
            onAddItem={(text, color, value) => handleAddCanvasItem('values', text, color, value)}
            onRemoveItem={(index) => handleRemoveCanvasItem('values', index)}
            onEditItem={(index, text, color, value) => handleEditCanvasItem('values', index, text, color, value)}
            onComplete={markLessonComplete}
          />
        )}

        {/* 3. Kanály */}
        {currentLesson.canvasSection === 'channels' && (
          <MobileSingleSection
            sectionTitle="Kanály"
            items={canvasData.channels || []}
            allowGlobal={false}
            onAddItem={(text, color, value) => handleAddCanvasItem('channels', text, color, value)}
            onRemoveItem={(index) => handleRemoveCanvasItem('channels', index)}
            onEditItem={(index, text, color, value) => handleEditCanvasItem('channels', index, text, color, value)}
            onComplete={markLessonComplete}
          />
        )}

        {/* 4. Vztahy se zákazníky */}
        {currentLesson.canvasSection === 'relationships' && (
          <MobileSingleSection
            sectionTitle="Vztahy se zákazníky"
            items={canvasData.relationships || []}
            allowGlobal={false}
            onAddItem={(text, color, value) => handleAddCanvasItem('relationships', text, color, value)}
            onRemoveItem={(index) => handleRemoveCanvasItem('relationships', index)}
            onEditItem={(index, text, color, value) => handleEditCanvasItem('relationships', index, text, color, value)}
            onComplete={markLessonComplete}
          />
        )}

        {/* 5. Zdroje příjmů */}
        {currentLesson.canvasSection === 'revenue' && (
          <MobileSingleSection
            sectionTitle="Zdroje příjmů"
            items={canvasData.revenue || []}
            allowGlobal={true}
            onAddItem={(text, color, value) => handleAddCanvasItem('revenue', text, color, value)}
            onRemoveItem={(index) => handleRemoveCanvasItem('revenue', index)}
            onEditItem={(index, text, color, value) => handleEditCanvasItem('revenue', index, text, color, value)}
            onComplete={markLessonComplete}
          />
        )}

        {/* 6. Klíčové zdroje */}
        {currentLesson.canvasSection === 'resources' && (
          <MobileSingleSection
            sectionTitle="Klíčové zdroje"
            items={canvasData.resources || []}
            allowGlobal={true}
            onAddItem={(text, color, value) => handleAddCanvasItem('resources', text, color, value)}
            onRemoveItem={(index) => handleRemoveCanvasItem('resources', index)}
            onEditItem={(index, text, color, value) => handleEditCanvasItem('resources', index, text, color, value)}
            onComplete={markLessonComplete}
          />
        )}

        {/* 7. Klíčové aktivity */}
        {currentLesson.canvasSection === 'activities' && (
          <MobileSingleSection
            sectionTitle="Klíčové aktivity"
            items={canvasData.activities || []}
            allowGlobal={true}
            onAddItem={(text, color, value) => handleAddCanvasItem('activities', text, color, value)}
            onRemoveItem={(index) => handleRemoveCanvasItem('activities', index)}
            onEditItem={(index, text, color, value) => handleEditCanvasItem('activities', index, text, color, value)}
            onComplete={markLessonComplete}
          />
        )}

        {/* 8. Klíčoví partneři */}
        {currentLesson.canvasSection === 'partners' && (
          <MobileSingleSection
            sectionTitle="Klíčoví partneři"
            items={canvasData.partners || []}
            allowGlobal={true}
            onAddItem={(text, color, value) => handleAddCanvasItem('partners', text, color, value)}
            onRemoveItem={(index) => handleRemoveCanvasItem('partners', index)}
            onEditItem={(index, text, color, value) => handleEditCanvasItem('partners', index, text, color, value)}
            onComplete={markLessonComplete}
          />
        )}

        {/* 9. Struktura nákladů */}
        {currentLesson.canvasSection === 'costs' && (
          <MobileSingleSection
            sectionTitle="Struktura nákladů"
            items={canvasData.costs || []}
            allowGlobal={true}
            onAddItem={(text, color, value) => handleAddCanvasItem('costs', text, color, value)}
            onRemoveItem={(index) => handleRemoveCanvasItem('costs', index)}
            onEditItem={(index, text, color, value) => handleEditCanvasItem('costs', index, text, color, value)}
            onComplete={markLessonComplete}
          />
        )}

        {/* Dashboard - Modul 2: Finanční přehled */}
        {currentLesson.canvasSection === 'finance' && (
          <div className="space-y-6">
            {/* Finanční přehled */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">💰 Finanční přehled</h3>
              
              {/* Příjmy */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-2">📈 Příjmy</h4>
                {canvasData.revenue && canvasData.revenue.length > 0 ? (
                  <div className="space-y-2">
                    {canvasData.revenue.map((item: any, index: number) => (
                      <div key={index} className={`p-3 rounded-lg ${item.color === 'global' ? 'bg-gray-100' : 'bg-blue-50'}`}>
                        <p className="text-sm text-gray-900">{item.text}</p>
                        {item.value && <p className="text-xs text-gray-600 mt-1">{item.value} Kč/měsíc</p>}
                      </div>
                    ))}
                    <div className="border-t-2 border-gray-300 pt-2 mt-3">
                      <p className="font-semibold text-gray-900">
                        Celkem: {canvasData.revenue.reduce((sum: number, item: any) => sum + (item.value || 0), 0).toLocaleString()} Kč/měsíc
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">Zatím nemáte definované příjmy</p>
                )}
              </div>
              
              {/* Náklady */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">📉 Náklady</h4>
                {canvasData.costs && canvasData.costs.length > 0 ? (
                  <div className="space-y-2">
                    {canvasData.costs.map((item: any, index: number) => (
                      <div key={index} className={`p-3 rounded-lg ${item.color === 'global' ? 'bg-gray-100' : 'bg-red-50'}`}>
                        <p className="text-sm text-gray-900">{item.text}</p>
                        {item.value && <p className="text-xs text-gray-600 mt-1">{item.value} Kč/měsíc</p>}
                      </div>
                    ))}
                    <div className="border-t-2 border-gray-300 pt-2 mt-3">
                      <p className="font-semibold text-gray-900">
                        Celkem: {canvasData.costs.reduce((sum: number, item: any) => sum + (item.value || 0), 0).toLocaleString()} Kč/měsíc
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">Zatím nemáte definované náklady</p>
                )}
              </div>
              
              {/* Zisk */}
              {(canvasData.revenue?.length > 0 || canvasData.costs?.length > 0) && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-300">
                  <h4 className="font-bold text-gray-900 mb-2">💎 Čistý zisk</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {(
                      (canvasData.revenue?.reduce((sum: number, item: any) => sum + (item.value || 0), 0) || 0) -
                      (canvasData.costs?.reduce((sum: number, item: any) => sum + (item.value || 0), 0) || 0)
                    ).toLocaleString()} Kč/měsíc
                  </p>
                </div>
              )}
            </div>
            
            <Button
              onClick={markLessonComplete}
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 h-14 text-lg"
            >
              ✅ Hotovo, další lekce
            </Button>
          </div>
        )}

        {/* Tools - Modul 3 - PLACEHOLDER (tools jsou v sidebaru) */}
        {currentLesson.canvasSection === 'tools' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🧮 Nástroje pro váš byznys</h3>
              <p className="text-gray-700 mb-4">Nástroje které vám pomohou s plánováním a růstem vašeho byznysu:</p>
              
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-1">🎯 Akční plán</h4>
                  <p className="text-sm text-gray-600">Konkrétní kroky co dělat dál na základě vašich dat</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-1">📊 Kalkulačka cílových zákazníků</h4>
                  <p className="text-sm text-gray-600">Spočítejte si kolik zákazníků potřebujete pro váš cíl</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-1">📈 Velikost segmentu</h4>
                  <p className="text-sm text-gray-600">Zjistěte jak velký je váš cílový trh</p>
                </div>
              </div>
              
              <p className="text-sm text-purple-700 mt-4 bg-purple-100 p-3 rounded-lg">
                💡 <strong>Tip:</strong> Tyto nástroje budou dostupné v desktop verzi kurzu nebo v dalších verzích aplikace!
              </p>
            </div>
            <Button
              onClick={markLessonComplete}
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 h-14 text-lg"
            >
              ✅ Hotovo, další lekce
            </Button>
          </div>
        )}

        {/* Action Plan - Modul 3 */}
        {currentLesson.canvasSection === 'action' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <BusinessActionPlan 
                userId={user!.id}
                onNavigateToLesson={(lessonId) => {
                  // Find lesson and navigate to it
                  const allLessons = [...MODULE_1.lessons, ...MODULE_2.lessons, ...MODULE_3.lessons];
                  const lesson = allLessons.find(l => l.id === lessonId);
                  if (lesson) {
                    const moduleNumber = lessonId <= 9 ? 1 : lessonId <= 13 ? 2 : 3;
                    setCurrentModuleNumber(moduleNumber);
                    const module = moduleNumber === 1 ? MODULE_1 : moduleNumber === 2 ? MODULE_2 : MODULE_3;
                    const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
                    setCurrentLessonIndex(lessonIndex);
                  }
                }}
                onAchievementUnlocked={handleAchievementUnlock}
              />
            </div>
            <Button
              onClick={markLessonComplete}
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 h-14 text-lg"
            >
              ✅ Hotovo, další lekce
            </Button>
          </div>
        )}

        {/* ============================================ */}
        {/* MODUL 2: VYLEPŠENÍ BYZNYS MODELU */}
        {/* ============================================ */}

        {/* Lekce 10: Pravidla dobrého modelu (Canvas Validator) */}
        {currentLesson.id === 10 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <CanvasValidator 
                userId={user!.id}
                onComplete={markLessonComplete}
              />
            </div>
          </div>
        )}

        {/* Lekce 11: Finanční analýza (Profit Calculator) */}
        {currentLesson.id === 11 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <ProfitCalculator 
                userId={user!.id}
                onComplete={markLessonComplete}
                onNavigateNext={goToNextLesson}
                onAchievementUnlocked={handleAchievementUnlock}
              />
            </div>
          </div>
        )}

        {/* Lekce 12: Řešení situací (Problem Solver) */}
        {currentLesson.id === 12 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <ProblemSolver 
                onComplete={markLessonComplete}
              />
            </div>
          </div>
        )}

        {/* Lekce 13: Příklady úspěšných modelů (Business Model Gallery) */}
        {currentLesson.id === 13 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <BusinessModelGallery 
                onComplete={markLessonComplete}
              />
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* MODUL 3: VALUE PROPOSITION CANVAS */}
        {/* ============================================ */}

        {/* Lekce 14: Zákaznický profil (VPC Customer) */}
        {currentLesson.canvasSection === 'vpc-customer' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <VPCCustomerProfile 
                userId={user!.id}
                onComplete={markLessonComplete}
                onAchievementUnlocked={handleAchievementUnlock}
              />
            </div>
          </div>
        )}

        {/* Lekce 15: Hodnotová mapa (VPC Value) */}
        {currentLesson.canvasSection === 'vpc-value' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <VPCValueMap 
                userId={user!.id}
                onComplete={markLessonComplete}
                onAchievementUnlocked={handleAchievementUnlock}
              />
            </div>
          </div>
        )}

        {/* Lekce 16: Kontrola souladu FIT (VPC Fit Validator) */}
        {currentLesson.canvasSection === 'vpc-fit' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <FitValidatorV2 
                userId={user!.id}
                onComplete={markLessonComplete}
                onAchievementUnlocked={handleAchievementUnlock}
              />
            </div>
          </div>
        )}

        {/* Complete button (if no interactive component) */}
        {!currentLesson.canvasSection && (
          <Button
            onClick={markLessonComplete}
            size="lg"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 h-14 text-lg"
          >
            ✅ Hotovo, další lekce
          </Button>
        )}

        {/* Navigation arrows */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={goToPreviousLesson}
            disabled={currentModuleNumber === 1 && currentLessonIndex === 0}
            className="flex-1 flex items-center justify-center gap-2 p-4 bg-white rounded-xl shadow border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Zpět</span>
          </button>
          
          <button
            onClick={goToNextLesson}
            disabled={currentModuleNumber === 3 && currentLessonIndex === MODULE_3.lessons.length - 1}
            className="flex-1 flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
          >
            <span className="font-medium">Další</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

            {/* Swipe hint */}
            <p className="text-center text-sm text-gray-500 mt-4">
              💡 Tip: Přejeďte prstem doleva/doprava pro navigaci
            </p>
          </>
        )}
      </div>
    </div>
  );
}

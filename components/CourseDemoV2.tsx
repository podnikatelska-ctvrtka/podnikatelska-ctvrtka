import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, CheckCircle, Lock, Play, Download, ArrowLeft, LogOut, Trophy } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { BusinessModelCanvasV2 } from "./BusinessModelCanvasV2";
import { toast } from "sonner";
import { supabase, verifyAccessToken } from "../lib/supabase";

// Verify token using shared supabase service
async function verifyToken(token: string) {
  console.log("🔐 CourseDemoV2 - verifyToken called with token:", token);
  
  // Use the shared verifyAccessToken from lib/supabase
  const user = await verifyAccessToken(token);
  
  if (!user) {
    console.log("❌ Token not found in database");
    return null;
  }
  
  console.log("✅ User verified:", user);
  return user;
}

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon?: string;
  order_number: number;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  module_id: number;
  title: string;
  description: string;
  duration: string;
  vimeo_id?: string;
  video_url?: string;
  content?: string;
  order_number: number;
  is_preview: boolean;
  completed?: boolean;
  time_spent?: number;
  notes?: string;
}

interface UserProgress {
  lesson_id: number;
  completed: boolean;
  time_spent: number;
  notes: string;
  last_position: number;
}

export function CourseDemoV2() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [authToken, setAuthToken] = useState("");
  
  // Course data from DB
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoadingCourse, setIsLoadingCourse] = useState(true);
  
  // User progress from DB
  const [userProgress, setUserProgress] = useState<Record<number, UserProgress>>({});
  
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentNotes, setCurrentNotes] = useState("");
  const [showCanvas, setShowCanvas] = useState(false);
  const [videoStartTime, setVideoStartTime] = useState<number>(0);

  // Check auth on mount - verify token with Supabase
  useEffect(() => {
    const checkAuth = async () => {
      setIsVerifying(true);
      
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      
      console.log("🔍 DEBUG - URL token:", token);
      console.log("🔍 DEBUG - Full URL:", window.location.href);
      
      // Try token from URL first
      if (token) {
        console.log("✅ Token found in URL:", token);
        try {
          console.log("🔄 Calling verifyToken...");
          const user = await verifyToken(token);
          console.log("📊 verifyToken response:", user);
          
          if (user) {
            console.log("✅ User verified successfully:", user);
            setIsAuthenticated(true);
            setUserData(user);
            setAuthToken(token);
            localStorage.setItem("course_access_token", token);
            localStorage.setItem("course_user_email", user.email);
            toast.success(`Vítejte zpět, ${user.name || 'v kurzu'}! 🎉`);
          } else {
            console.log("❌ verifyToken returned null");
            toast.error("Neplatný přístupový token!");
          }
        } catch (error) {
          console.error("❌ Auth error:", error);
          toast.error("Chyba při ověřování přístupu");
        }
      } 
      // Try saved token
      else {
        console.log("⚠️ No token in URL, checking localStorage...");
        const savedToken = localStorage.getItem("course_access_token");
        console.log("💾 Saved token:", savedToken);
        
        if (savedToken) {
          try {
            const user = await verifyToken(savedToken);
            if (user) {
              console.log("�� Saved token verified");
              setIsAuthenticated(true);
              setUserData(user);
              setAuthToken(savedToken);
            } else {
              console.log("❌ Saved token invalid, clearing...");
              // Token expired or invalid, clear localStorage
              localStorage.removeItem("course_access_token");
              localStorage.removeItem("course_user_email");
            }
          } catch (error) {
            console.error("❌ Saved token verification error:", error);
          }
        } else {
          console.log("⚠️ No saved token found");
        }
      }
      
      setIsVerifying(false);
    };
    
    checkAuth();
  }, []);

  // Load course content from Supabase
  useEffect(() => {
    if (!isAuthenticated || !userData) return;

    const loadCourseContent = async () => {
      console.log("📚 Loading course content for user:", userData);
      setIsLoadingCourse(true);

      try {
        // Fetch modules
        const { data: modulesData, error: modulesError } = await supabase
          .from('course_modules')
          .select('*')
          .eq('is_active', true)
          .order('order_number', { ascending: true });

        if (modulesError) throw modulesError;

        // Fetch lessons
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('course_lessons')
          .select('*')
          .eq('is_active', true)
          .order('order_number', { ascending: true });

        if (lessonsError) throw lessonsError;

        // Fetch user progress (optional - může selhat pokud tabulka neexistuje)
        let progressData = [];
        try {
          const { data, error } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', userData.id);

          if (!error && data) {
            progressData = data;
          } else {
            console.warn('⚠️ User progress not available:', error);
          }
        } catch (err) {
          console.warn('⚠️ User progress table might not exist yet:', err);
        }

        // Map progress to object
        const progressMap: Record<number, UserProgress> = {};
        progressData?.forEach((p: any) => {
          progressMap[p.lesson_id] = {
            lesson_id: p.lesson_id,
            completed: p.completed,
            time_spent: p.time_spent || 0,
            notes: p.notes || '',
            last_position: p.last_position || 0,
          };
        });
        setUserProgress(progressMap);

        // Combine modules with lessons
        const modulesWithLessons: Module[] = modulesData?.map((module: any) => ({
          id: module.id,
          title: module.title,
          description: module.description || '',
          duration: module.duration || '',
          icon: module.icon || 'BookOpen',
          order_number: module.order_number,
          lessons: lessonsData
            ?.filter((lesson: any) => lesson.module_id === module.id)
            .map((lesson: any) => ({
              id: lesson.id,
              module_id: lesson.module_id,
              title: lesson.title,
              description: lesson.description || '',
              duration: lesson.duration || '',
              vimeo_id: lesson.vimeo_id,
              video_url: lesson.video_url,
              content: lesson.content,
              order_number: lesson.order_number,
              is_preview: lesson.is_preview || false,
              completed: progressMap[lesson.id]?.completed || false,
              time_spent: progressMap[lesson.id]?.time_spent || 0,
              notes: progressMap[lesson.id]?.notes || '',
            })) || [],
        })) || [];

        setModules(modulesWithLessons);
      } catch (error) {
        console.error('Error loading course:', error);
        toast.error('Chyba při načítání kurzu');
      } finally {
        setIsLoadingCourse(false);
      }
    };

    loadCourseContent();
  }, [isAuthenticated, userData]);

  // Save progress to Supabase
  const saveProgress = async (lessonId: number, updates: Partial<UserProgress>) => {
    if (!userData) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userData.id,
          lesson_id: lessonId,
          ...updates,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,lesson_id'
        });

      if (error) throw error;

      // Update local state
      setUserProgress(prev => ({
        ...prev,
        [lessonId]: {
          ...prev[lessonId],
          lesson_id: lessonId,
          completed: updates.completed ?? prev[lessonId]?.completed ?? false,
          time_spent: updates.time_spent ?? prev[lessonId]?.time_spent ?? 0,
          notes: updates.notes ?? prev[lessonId]?.notes ?? '',
          last_position: updates.last_position ?? prev[lessonId]?.last_position ?? 0,
        }
      }));

      // Update modules state
      setModules(prev => prev.map(module => ({
        ...module,
        lessons: module.lessons.map(lesson =>
          lesson.id === lessonId
            ? { ...lesson, completed: updates.completed ?? lesson.completed }
            : lesson
        ),
      })));

    } catch (error) {
      console.error('Error saving progress:', error);
      toast.error('Chyba při ukládání postupu');
    }
  };

  // Loading state for completion
  const [isCompletingLesson, setIsCompletingLesson] = useState(false);

  // Handle lesson completion
  const markAsCompleted = async (lessonId: number) => {
    setIsCompletingLesson(true);
    
    try {
      await saveProgress(lessonId, {
        completed: true,
        completed_at: new Date().toISOString() as any,
      });
      
      // Small delay for better UX feedback
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success("Lekce dokončena! 🎉");
      
      // Check if module completed
      const currentModule = modules.find(m => m.lessons.some(l => l.id === lessonId));
      if (currentModule) {
        const allCompleted = currentModule.lessons.every(l => 
          l.id === lessonId ? true : userProgress[l.id]?.completed
        );
        
        if (allCompleted) {
          toast.success(`🏆 Gratulujeme! Dokončili jste modul "${currentModule.title}"!`, {
            duration: 5000,
          });
        }
      }
    } finally {
      setIsCompletingLesson(false);
    }
  };

  // Auto-save notes
  useEffect(() => {
    if (!currentLesson || !userData) return;

    const timeoutId = setTimeout(() => {
      if (currentNotes !== (userProgress[currentLesson.id]?.notes || '')) {
        saveProgress(currentLesson.id, { notes: currentNotes });
      }
    }, 1000); // Auto-save after 1 second of inactivity

    return () => clearTimeout(timeoutId);
  }, [currentNotes, currentLesson]);

  // Track time spent
  useEffect(() => {
    if (!currentLesson || !userData) return;

    const startTime = Date.now();

    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const previousTime = userProgress[currentLesson.id]?.time_spent || 0;
      saveProgress(currentLesson.id, { time_spent: previousTime + timeSpent });
    };
  }, [currentLesson]);

  // Calculate overall progress
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = Object.values(userProgress).filter(p => p.completed).length;
  const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem("course_access_token");
    localStorage.removeItem("course_user_email");
    toast.success("Odhlášení úspěšné");
  };

  // Loading screen while verifying token
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Ověřuji přístup...</p>
        </motion.div>
      </div>
    );
  }
  
  // Error screen - invalid or missing token
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Přístup zamčen
            </h1>
            <p className="text-gray-600">
              Pro přístup do kurzu potřebujete platný přístupový token.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">📧 Kde najdu token?</h3>
              <p className="text-sm text-blue-700">
                Token vám přišel emailem po zakoupení kurzu. Hledejte email s předmětem "Váš přístup do kurzu je ready!"
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-900 mb-2">❓ Nemáte přístup?</h3>
              <p className="text-sm text-amber-700 mb-3">
                Kurz si můžete zakoupit na naší landing page.
              </p>
              <Button
                onClick={() => window.location.href = "/"}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Přejít na objednávku
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={() => window.location.href = "mailto:cipera@byznysuj.cz"}
              className="w-full"
            >
              Kontaktovat podporu
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Loading course content
  if (isLoadingCourse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Načítám obsah kurzu...</p>
        </motion.div>
      </div>
    );
  }

  // Lesson detail view
  if (currentLesson) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => {
                setCurrentLesson(null);
                setCurrentNotes('');
              }}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Zpět na přehled
            </Button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {currentLesson.title}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Odhlásit
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
          {/* Video player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
              {currentLesson.vimeo_id ? (
                <iframe
                  src={`https://player.vimeo.com/video/${currentLesson.vimeo_id}?badge=0&autopause=0&player_id=0&app_id=58479`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  title={currentLesson.title}
                />
              ) : (
                <div className="text-white text-center">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-400">Video bude brzy dostupné</p>
                </div>
              )}
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {currentLesson.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {currentLesson.description}
              </p>

              <div className="flex items-center gap-4">
                <Button
                  onClick={() => markAsCompleted(currentLesson.id)}
                  disabled={currentLesson.completed}
                  className="bg-gradient-to-r from-green-600 to-emerald-600"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {currentLesson.completed ? "Dokončeno ✅" : "Označit jako dokončené"}
                </Button>

                {currentLesson.completed && (
                  <span className="text-sm text-green-600 flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    Hotovo!
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              📝 Vaše poznámky
            </h3>
            <textarea
              value={currentNotes}
              onChange={(e) => setCurrentNotes(e.target.value)}
              placeholder="Zapište si klíčové poznatky..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              ✅ Automaticky uloženo do databáze
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Dashboard view
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Podnikatelská Čtvrtka
                </h1>
                <p className="text-sm text-gray-600">
                  Vítejte, {userData?.name || 'v kurzu'}! 👋
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowCanvas(!showCanvas)}
              >
                {showCanvas ? "📚 Zobrazit lekce" : "🎨 Business Model Canvas"}
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Odhlásit
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {showCanvas ? (
            <motion.div
              key="canvas"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <BusinessModelCanvasV2 userId={userData?.id} />
            </motion.div>
          ) : (
            <motion.div
              key="modules"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Progress */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Váš postup
                    </h2>
                    <p className="text-sm text-gray-600">
                      {completedLessons} z {totalLessons} lekcí dokončeno
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">
                      {Math.round(progressPercent)}%
                    </div>
                  </div>
                </div>
                <Progress value={progressPercent} className="h-3" />
              </div>

              {/* Modules */}
              {modules.map((module, moduleIndex) => (
                <div key={module.id} className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {moduleIndex + 1}
                    </span>
                    {module.title}
                  </h3>
                  
                  <div className="grid gap-3">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isLocked = lessonIndex > 0 && !module.lessons[lessonIndex - 1].completed;
                      
                      return (
                        <motion.div
                          key={lesson.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: lessonIndex * 0.05 }}
                          className={`bg-white rounded-xl shadow-lg p-6 ${
                            isLocked ? "opacity-60" : "cursor-pointer hover:shadow-xl transition-shadow"
                          }`}
                          onClick={() => {
                            if (!isLocked) {
                              setCurrentLesson(lesson);
                              setCurrentNotes(lesson.notes || '');
                            }
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              lesson.completed
                                ? "bg-green-100 text-green-600"
                                : isLocked
                                ? "bg-gray-100 text-gray-400"
                                : "bg-blue-100 text-blue-600"
                            }`}>
                              {lesson.completed ? (
                                <CheckCircle className="w-6 h-6" />
                              ) : isLocked ? (
                                <Lock className="w-6 h-6" />
                              ) : (
                                <Play className="w-6 h-6" />
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                                    {lesson.title}
                                  </h3>
                                  <p className="text-gray-600 text-sm">
                                    {lesson.description}
                                  </p>
                                </div>
                                <span className="text-sm text-gray-500 flex-shrink-0 ml-4">
                                  {lesson.duration}
                                </span>
                              </div>

                              {isLocked && (
                                <p className="text-sm text-gray-500 mt-2">
                                  🔒 Odemkne se po dokončení předchozí lekce
                                </p>
                              )}
                              
                              {lesson.is_preview && !isLocked && (
                                <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                  🎁 Náhled zdarma
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

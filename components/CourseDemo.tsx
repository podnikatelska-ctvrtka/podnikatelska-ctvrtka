import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, CheckCircle, Lock, Play, Download, ArrowLeft, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { BusinessModelCanvas } from "./BusinessModelCanvas";
import { toast } from "sonner";

// Supabase client helper
async function createSupabaseClient() {
  const { createClient } = await import('@supabase/supabase-js');
  return createClient(
    'https://shxinaeqbyjxhqnhrlmb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoeGluYWVxYnlqeGhxbmhybG1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4ODE5NzgsImV4cCI6MjA0MzQ1Nzk3OH0.6U8VuP-Md3nP9bGx_7ZRphxCp7n-F3fqUNv3KlWkpfU'
  );
}

// Verify token in Supabase
async function verifyToken(token: string) {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('access_token', token)
    .single();
  
  if (error || !data) {
    return null;
  }
  
  // Update last_login
  await supabase
    .from('users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', data.id);
  
  return data;
}

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  vimeoId?: string; // Pro demo použijeme placeholder
}

export function CourseDemo() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [authToken, setAuthToken] = useState("");
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: "Zákaznické segmenty",
      description: "Zjistěte kdo jsou vaši ideální zákazníci a jak je oslovit",
      duration: "15 min",
      completed: false,
      locked: false,
      vimeoId: "76979871", // Demo video (replace with yours!)
    },
    {
      id: 2,
      title: "Hodnotová nabídka",
      description: "Definujte co nabízíte a proč si vybrat právě vás",
      duration: "20 min",
      completed: false,
      locked: true,
    },
    {
      id: 3,
      title: "Kanály",
      description: "Kde a jak oslovit své zákazníky",
      duration: "18 min",
      completed: false,
      locked: true,
    },
  ]);
  
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [notes, setNotes] = useState("");
  const [showCanvas, setShowCanvas] = useState(false);

  // Check auth on mount - verify token with Supabase
  useEffect(() => {
    const checkAuth = async () => {
      setIsVerifying(true);
      
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      
      // Try token from URL first
      if (token) {
        try {
          const user = await verifyToken(token);
          if (user) {
            setIsAuthenticated(true);
            setUserData(user);
            setAuthToken(token);
            localStorage.setItem("course_access_token", token);
            localStorage.setItem("course_user_email", user.email);
            toast.success(`Vítejte zpět, ${user.name || 'v kurzu'}! 🎉`);
          } else {
            toast.error("Neplatný přístupový token!");
          }
        } catch (error) {
          console.error("Auth error:", error);
          toast.error("Chyba při ověřování přístupu");
        }
      } 
      // Try saved token
      else {
        const savedToken = localStorage.getItem("course_access_token");
        if (savedToken) {
          try {
            const user = await verifyToken(savedToken);
            if (user) {
              setIsAuthenticated(true);
              setUserData(user);
              setAuthToken(savedToken);
            } else {
              // Token expired or invalid, clear localStorage
              localStorage.removeItem("course_access_token");
              localStorage.removeItem("course_user_email");
            }
          } catch (error) {
            console.error("Saved token verification error:", error);
          }
        }
      }
      
      setIsVerifying(false);
    };
    
    checkAuth();
  }, []);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("course_demo_progress");
    if (savedProgress) {
      setModules(JSON.parse(savedProgress));
    }
    
    const savedNotes = localStorage.getItem("course_demo_notes");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save progress
  const saveProgress = (updatedModules: Module[]) => {
    localStorage.setItem("course_demo_progress", JSON.stringify(updatedModules));
    setModules(updatedModules);
  };

  // Handle module completion
  const markAsCompleted = (moduleId: number) => {
    const updatedModules = modules.map(m => {
      if (m.id === moduleId) {
        return { ...m, completed: true };
      }
      // Unlock next module
      if (m.id === moduleId + 1) {
        return { ...m, locked: false };
      }
      return m;
    });
    saveProgress(updatedModules);
    toast.success("Modul dokončen! 🎉");
  };

  // Calculate progress
  const completedCount = modules.filter(m => m.completed).length;
  const progressPercent = (completedCount / modules.length) * 100;

  // Handle login
  const handleLogin = () => {
    if (authToken === AUTH_TOKEN) {
      setIsAuthenticated(true);
      localStorage.setItem("course_demo_auth", "true");
      toast.success("Přihlášení úspěšné! ✅");
    } else {
      toast.error("Neplatný přístupový token");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("course_demo_auth");
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

  // Module detail view
  if (currentModule) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setCurrentModule(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Zpět na přehled
            </Button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {currentModule.title}
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
              {currentModule.vimeoId ? (
                <iframe
                  src={`https://player.vimeo.com/video/${currentModule.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  title={currentModule.title}
                />
              ) : (
                <div className="text-white text-center">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-400">Video placeholder</p>
                </div>
              )}
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {currentModule.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {currentModule.description}
              </p>

              <div className="flex items-center gap-4">
                <Button
                  onClick={() => markAsCompleted(currentModule.id)}
                  disabled={currentModule.completed}
                  className="bg-gradient-to-r from-green-600 to-emerald-600"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {currentModule.completed ? "Dokončeno ✅" : "Označit jako dokončené"}
                </Button>

                <a
                  href="#worksheet"
                  download
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Stáhnout worksheet (PDF)
                </a>
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
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                localStorage.setItem("course_demo_notes", e.target.value);
              }}
              placeholder="Zapište si klíčové poznatky..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              ✅ Automaticky uloženo
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
              <BusinessModelCanvas />
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
                      {completedCount} z {modules.length} modulů dokončeno
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
              <div className="grid gap-4">
                {modules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white rounded-xl shadow-lg p-6 ${
                      module.locked ? "opacity-60" : "cursor-pointer hover:shadow-xl transition-shadow"
                    }`}
                    onClick={() => !module.locked && setCurrentModule(module)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        module.completed
                          ? "bg-green-100 text-green-600"
                          : module.locked
                          ? "bg-gray-100 text-gray-400"
                          : "bg-blue-100 text-blue-600"
                      }`}>
                        {module.completed ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : module.locked ? (
                          <Lock className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              Modul {module.id}: {module.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {module.description}
                            </p>
                          </div>
                          <span className="text-sm text-gray-500 flex-shrink-0 ml-4">
                            {module.duration}
                          </span>
                        </div>

                        {module.locked && (
                          <p className="text-sm text-gray-500 mt-2">
                            🔒 Odemkne se po dokončení předchozího modulu
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Demo info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-blue-900 mb-2">
                  ℹ️ Toto je DEMO verze
                </h3>
                <p className="text-blue-800 text-sm">
                  V plné verzi budete mít přístup ke všem 9 modulům, interaktivní Business Model Canvas, 
                  worksheety k vytisknutí, certifikát po dokončení a mnoho dalšího!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

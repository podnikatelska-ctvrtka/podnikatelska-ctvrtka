import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, CheckCircle, Lock, Play, Download, ArrowLeft, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { BusinessModelCanvas } from "./BusinessModelCanvas";
import { toast } from "sonner";

// HARDCODED TOKENS - NO SUPABASE!
const VALID_TOKENS: Record<string, { id: number; name: string; email: string }> = {
  "TEST123": { id: 1, name: "Test User", email: "test@example.com" },
  "CIPERA2024": { id: 2, name: "Josef Cipera", email: "cipera@byznysuj.cz" },
};

// Simple token verification - no external calls!
function verifyToken(token: string) {
  return VALID_TOKENS[token] || null;
}

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  vimeoId?: string;
}

export function CourseDemo() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: "Zákaznické segmenty",
      description: "Zjistěte kdo jsou vaši ideální zákazníci a jak je oslovit",
      duration: "15 min",
      completed: false,
      locked: false,
      vimeoId: "76979871",
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

  // Check auth on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    
    if (token) {
      const user = verifyToken(token);
      if (user) {
        setIsAuthenticated(true);
        setUserData(user);
        localStorage.setItem("course_access_token", token);
        toast.success(`Vítejte zpět, ${user.name}! 🎉`);
      }
    } else {
      const savedToken = localStorage.getItem("course_access_token");
      if (savedToken) {
        const user = verifyToken(savedToken);
        if (user) {
          setIsAuthenticated(true);
          setUserData(user);
        }
      }
    }
  }, []);

  // Load progress
  useEffect(() => {
    const saved = localStorage.getItem("course_demo_progress");
    if (saved) setModules(JSON.parse(saved));
    
    const savedNotes = localStorage.getItem("course_demo_notes");
    if (savedNotes) setNotes(savedNotes);
  }, []);

  const saveProgress = (updatedModules: Module[]) => {
    localStorage.setItem("course_demo_progress", JSON.stringify(updatedModules));
    setModules(updatedModules);
  };

  const markAsCompleted = (moduleId: number) => {
    const updated = modules.map(m => {
      if (m.id === moduleId) return { ...m, completed: true };
      if (m.id === moduleId + 1) return { ...m, locked: false };
      return m;
    });
    saveProgress(updated);
    toast.success("Modul dokončen! 🎉");
  };

  const completedCount = modules.filter(m => m.completed).length;
  const progressPercent = (completedCount / modules.length) * 100;

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem("course_access_token");
    toast.success("Odhlášení úspěšné");
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Přístup zamčen</h1>
            <p className="text-gray-600">Pro přístup do kurzu potřebujete platný přístupový token.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">📧 Kde najdu token?</h3>
              <p className="text-sm text-blue-700">Token vám přišel emailem po zakoupení kurzu.</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">🧪 Testovací tokeny:</h3>
              <p className="text-xs text-green-700 font-mono">TEST123<br/>CIPERA2024</p>
            </div>
            <Button onClick={() => window.location.href = "/"} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
              Přejít na objednávku
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentModule) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setCurrentModule(null)} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />Zpět na přehled
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />Odhlásit
            </Button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              {currentModule.vimeoId ? (
                <iframe src={`https://player.vimeo.com/video/${currentModule.vimeoId}`} className="w-full h-full" frameBorder="0" allow="autoplay; fullscreen" title={currentModule.title} />
              ) : (
                <div className="text-white text-center"><Play className="w-16 h-16 mx-auto mb-4 opacity-50" /><p className="text-gray-400">Video placeholder</p></div>
              )}
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentModule.title}</h2>
              <p className="text-gray-600 mb-4">{currentModule.description}</p>
              <Button onClick={() => markAsCompleted(currentModule.id)} disabled={currentModule.completed} className="bg-gradient-to-r from-green-600 to-emerald-600">
                <CheckCircle className="w-4 h-4 mr-2" />{currentModule.completed ? "Dokončeno ✅" : "Označit jako dokončené"}
              </Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📝 Vaše poznámky</h3>
            <textarea value={notes} onChange={(e) => { setNotes(e.target.value); localStorage.setItem("course_demo_notes", e.target.value); }} placeholder="Zapište si klíčové poznatky..." className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none" />
            <p className="text-sm text-gray-500 mt-2">✅ Automaticky uloženo</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Podnikatelská Čtvrtka</h1>
                <p className="text-sm text-gray-600">Vítejte, {userData?.name}! 👋</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setShowCanvas(!showCanvas)}>
                {showCanvas ? "📚 Zobrazit lekce" : "🎨 Business Model Canvas"}
              </Button>
              <Button variant="outline" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" />Odhlásit</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {showCanvas ? (
            <motion.div key="canvas" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <BusinessModelCanvas />
            </motion.div>
          ) : (
            <motion.div key="modules" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Váš postup</h2>
                    <p className="text-sm text-gray-600">{completedCount} z {modules.length} modulů dokončeno</p>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">{Math.round(progressPercent)}%</div>
                </div>
                <Progress value={progressPercent} className="h-3" />
              </div>
              <div className="grid gap-4">
                {modules.map((module, i) => (
                  <motion.div key={module.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`bg-white rounded-xl shadow-lg p-6 ${module.locked ? "opacity-60" : "cursor-pointer hover:shadow-xl transition-shadow"}`} onClick={() => !module.locked && setCurrentModule(module)}>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${module.completed ? "bg-green-100 text-green-600" : module.locked ? "bg-gray-100 text-gray-400" : "bg-blue-100 text-blue-600"}`}>
                        {module.completed ? <CheckCircle className="w-6 h-6" /> : module.locked ? <Lock className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Modul {module.id}: {module.title}</h3>
                            <p className="text-gray-600 text-sm">{module.description}</p>
                          </div>
                          <span className="text-sm text-gray-500 ml-4">{module.duration}</span>
                        </div>
                        {module.locked && <p className="text-sm text-gray-500 mt-2">🔒 Odemkne se po dokončení předchozího modulu</p>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

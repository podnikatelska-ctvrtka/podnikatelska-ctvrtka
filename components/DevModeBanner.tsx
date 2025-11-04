import { useState, useEffect } from 'react';
import { Code, LogIn, LogOut, User, Zap, X, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { isDev, DEV_TOKEN_CONFIG, quickLoginWithToken, quickLogout } from '../lib/devToken';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

/**
 * ✅ SIMPLE DEV BANNER - Stejný flow jako produkce!
 * 
 * Zobrazuje:
 *   - Current session status
 *   - Quick Login button (otevře URL s tokenem)
 *   - Quick Logout button
 */
export function DevModeBanner() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ id: string; email: string } | null>(null);

  // Check current session
  useEffect(() => {
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkSession();
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      setCurrentUser({
        id: session.user.id,
        email: session.user.email || 'No email'
      });
    } else {
      setCurrentUser(null);
    }
  };

  // Zobrazuj pouze v dev mode
  if (!isDev) return null;

  // Pokud je zavřený
  if (!isOpen) {
    return (
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-[9999] bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        title="Zobrazit Dev Tools"
      >
        <Code className="w-5 h-5" />
      </motion.button>
    );
  }

  const handleQuickLogin = () => {
    console.log('🔑 Quick Login → Opening URL with token...');
    quickLoginWithToken();
  };

  const handleLogout = () => {
    console.log('🚪 Logout...');
    quickLogout();
  };
  
  const handleResetWelcome = () => {
    localStorage.removeItem('course_welcome_seen');
    toast.success('👋 Welcome modal resetován! Obnovte stránku.');
    console.log('👋 Welcome modal resetován!');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left - Dev Mode Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 animate-pulse" />
                <span className="font-bold">DEV MODE</span>
              </div>

              {/* User Status */}
              <div className="hidden md:flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-sm">
                <User className="w-4 h-4" />
                {currentUser ? (
                  <span className="text-green-200">
                    ✓ {currentUser.email}
                  </span>
                ) : (
                  <span className="text-red-200">
                    ✗ Not logged in
                  </span>
                )}
              </div>
            </div>

            {/* Center - Quick Actions */}
            <div className="flex items-center gap-2">
              {!currentUser ? (
                <button
                  onClick={handleQuickLogin}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                  title="Otevře URL s tokenem (jako zákazník!)"
                >
                  <LogIn className="w-4 h-4" />
                  Quick Login
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              )}

              <button
                onClick={() => {
                  console.clear();
                  console.log('🧹 Console cleared');
                }}
                className="hidden md:flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                <Code className="w-4 h-4" />
                Clear Console
              </button>
              
              <button
                onClick={handleResetWelcome}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                title="Reset welcome modal (obnovte stránku)"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Welcome
              </button>
            </div>

            {/* Right - Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Skrýt banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile - User Info */}
          <div className="md:hidden mt-2 text-xs text-white/80 border-t border-white/20 pt-2">
            <div className="flex flex-col gap-1">
              <div><strong>Test User:</strong> {DEV_TOKEN_CONFIG.email}</div>
              {currentUser && <div><strong>Session:</strong> ✅ Active</div>}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Mini Dev Badge - malý badge v rohu
 * Kliknutím se otevře console help
 */
export function DevBadge() {
  if (!isDev) return null;

  const handleClick = () => {
    console.clear();
    console.log(`
%c🛠️ DEV TOOLS - QUICK COMMANDS

%cQuick Login:
  devTools.login()        → Otevře /course-v3?token=XXX (jako zákazník!)

%cNavigation:
  devTools.openCourse()   → Otevře kurz
  devTools.goHome()       → Landing page
  devTools.logout()       → Logout

%cInfo:
  devTools.config()       → Show config
  devTools.help()         → Full help

%cTest User:
  Email: ${DEV_TOKEN_CONFIG.email}
  Token: ${DEV_TOKEN_CONFIG.accessToken}
    `,
      'color: #a855f7; font-size: 16px; font-weight: bold;',
      'color: #10b981; font-weight: bold;',
      'color: #8b5cf6; font-weight: bold;',
      'color: #8b5cf6; font-weight: bold;',
      'color: #06b6d4;'
    );
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 left-4 z-[9999] bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transition-colors cursor-pointer"
      title="Klikni pro dev tools v console"
    >
      DEV
    </button>
  );
}

/**
 * Console Helper - zobrazí help v console
 */
export function logDevHelp() {
  if (!isDev || typeof window === 'undefined') return;

  console.log(`
%c🛠️ DEV TOOLS - SIMPLE TOKEN AUTH

%c✅ POUŽÍVÁME STEJNÝ SYSTÉM JAKO PRODUKCE:
   URL s tokenem → Přístup k kurzu

%cCommands:
  devTools.login()       → Quick login (otevře URL s tokenem)
  devTools.logout()      → Logout
  devTools.openCourse()  → Open course
  devTools.help()        → Show all commands

%cTest User:
  Email: ${DEV_TOKEN_CONFIG.email}
  Token: ${DEV_TOKEN_CONFIG.accessToken}

%cQuick Start:
  devTools.login()       ← Klikni Quick Login!
  `,
    'color: #a855f7; font-size: 16px; font-weight: bold;',
    'color: #8b5cf6; font-weight: bold;',
    'color: #8b5cf6; font-weight: bold;',
    'color: #8b5cf6; font-weight: bold;',
    'color: #06b6d4; font-style: italic;'
  );
}

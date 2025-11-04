/**
 * ✅ SIMPLE DEV TOKEN - Stejný princip jako produkce!
 * 
 * PRODUKCE:
 *   Zákazník → Email s linkem → /course-v3?token=XXX → Přístup
 * 
 * DEV MODE:
 *   Developer → URL s tokenem → /course-v3?token=XXX → Přístup
 *   STEJNÝ FLOW! 🎯
 */

// Dev mode detection
export const isDev = (typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || 
   window.location.hostname === '127.0.0.1' ||
   window.location.port === '5173'));

// Debug log (pouze v dev mode)
if (typeof window !== 'undefined' && isDev) {
  console.log('🛠️ DEV MODE:', {
    hostname: window.location.hostname,
    port: window.location.port
  });
}

/**
 * ✅ REÁLNÝ TEST USER CONFIG
 * 
 * Testujeme s REÁLNÝM USEREM z public.users!
 * Stejný flow jako zaplacený zákazník! 🎯
 * 
 * POUŽITÍ:
 *   1. Otevři URL: http://localhost:5173/course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk
 *   2. Token se načte automaticky
 *   3. Přístup k kurzu ✅
 * 
 * NEBO klikni "Quick Login" v Dev Banneru → otevře URL s tokenem
 */
export const DEV_TOKEN_CONFIG = {
  enabled: isDev,
  // ✅ REÁLNÝ USER z public.users
  userId: '18573170-c7f9-45a2-ba6c-7790f41e50fd',
  email: 'm.stepan@twotechgroup.cz',
  // ✅ Token z databáze (stejný jako v emailu pro zákazníky!)
  accessToken: '1759757068350-eyw8z2zo7t-4lrujeg6mkk',
  // ✅ Quick URL pro dev
  quickUrl: '/course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk'
};

/**
 * Quick Login - otevře URL s tokenem (jako kdyby zákazník kliknul na email link)
 */
export function quickLoginWithToken(): void {
  if (!isDev || typeof window === 'undefined') return;
  
  console.log('🔑 Opening course with token...');
  window.location.href = DEV_TOKEN_CONFIG.quickUrl;
}

/**
 * Quick Logout - smaže session a jde na homepage
 */
export function quickLogout(): void {
  if (typeof window === 'undefined') return;
  
  console.log('🚪 Logging out...');
  // Clear all auth-related data
  try {
    // Clear any cached session data
    Object.keys(localStorage).forEach(key => {
      if (key.includes('supabase') || key.includes('auth') || key.includes('session')) {
        localStorage.removeItem(key);
      }
    });
    
    // Redirect to homepage
    window.location.href = '/';
  } catch (e) {
    console.error('Failed to logout:', e);
    window.location.href = '/';
  }
}

/**
 * Dev Tools - globální funkce pro console
 */
if (isDev && typeof window !== 'undefined') {
  (window as any).devTools = {
    // Quick login - otevře URL s tokenem (jako zákazník!)
    login: () => {
      console.log('🔑 Quick Login → Opening URL with token...');
      quickLoginWithToken();
    },
    
    // Logout
    logout: () => {
      console.log('🚪 Quick Logout...');
      quickLogout();
    },
    
    // Open course s tokenem
    openCourse: () => {
      console.log('🎓 Opening course with token...');
      quickLoginWithToken();
    },
    
    // Go home
    goHome: () => {
      console.log('🏠 Going to landing page...');
      window.location.href = '/';
    },
    
    // Show config
    config: () => {
      console.log('⚙️ Dev Config:', DEV_TOKEN_CONFIG);
      return DEV_TOKEN_CONFIG;
    },
    
    // Clear storage
    clear: () => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.clear();
          sessionStorage.clear();
          console.log('✅ Storage cleared');
        } catch (e) {
          console.error('Failed to clear storage:', e);
        }
      }
    },
    
    // Help
    help: () => {
      console.log(`
🛠️ DEV TOOLS - SIMPLE TOKEN AUTH

✅ POUŽÍVÁME STEJNÝ SYSTÉM JAKO PRODUKCE:
   URL s tokenem → Přístup k kurzu (žádné auth.users!)

📋 COMMANDS:
  devTools.login()       → Quick login (otevře /course-v3?token=XXX)
  devTools.logout()      → Logout (smaže session)
  devTools.openCourse()  → Open course s tokenem
  devTools.goHome()      → Go to homepage
  devTools.config()      → Show config
  devTools.clear()       → Clear all storage

🎯 QUICK START:
  devTools.login()       ← Otevře kurz s tokenem!

📧 TESTOVACÍ USER:
  Email: ${DEV_TOKEN_CONFIG.email}
  UUID: ${DEV_TOKEN_CONFIG.userId}
  Token: ${DEV_TOKEN_CONFIG.accessToken}
  
💡 FLOW:
  1. devTools.login() → Otevře URL s tokenem
  2. Token se načte z URL
  3. Stejný flow jako zákazník! ✅
      `);
    },
  };

  // Welcome message
  console.log(`
🛠️ DEV MODE ACTIVE

Quick commands:
  devTools.login()        → Login s tokenem (jako zákazník!)
  devTools.openCourse()   → Open course
  devTools.help()         → Show all commands

Test User:
  ${DEV_TOKEN_CONFIG.email}

💡 URL s tokenem:
  ${DEV_TOKEN_CONFIG.quickUrl}
  `);
}

/**
 * Hook pro dev mode banner
 */
export function useDevMode() {
  return {
    isDev,
    config: DEV_TOKEN_CONFIG,
    quickLogin: quickLoginWithToken,
    logout: quickLogout,
  };
}

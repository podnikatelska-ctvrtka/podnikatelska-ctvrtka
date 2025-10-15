/**
 * Achievement systém pro gamifikaci kurzu
 */

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: 'module' | 'canvas' | 'vpc' | 'special';
  points?: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  // Modul 1 - Business Model Canvas
  {
    id: 'first-segment',
    title: 'První zákazník',
    description: 'Přidal jsi první zákaznický segment',
    emoji: '🎯',
    category: 'canvas',
    points: 10
  },
  {
    id: 'first-value',
    title: 'Hodnota na stole',
    description: 'Definoval jsi první hodnotovou nabídku',
    emoji: '💎',
    category: 'canvas',
    points: 10
  },
  {
    id: 'all-sections-filled',
    title: 'Kompletní model',
    description: 'Vyplnil jsi všech 9 sekcí Business Model Canvas',
    emoji: '🏆',
    category: 'canvas',
    points: 50
  },
  {
    id: 'module-1-complete',
    title: 'Modul 1 dokončen',
    description: 'Zvládl jsi všechny základy byznys modelu',
    emoji: '🚀',
    category: 'module',
    points: 100
  },
  
  // Modul 2 - Interactive
  {
    id: 'validator-used',
    title: 'První validace',
    description: 'Použil jsi Canvas Validator',
    emoji: '✅',
    category: 'canvas',
    points: 20
  },
  {
    id: 'profit-calculated',
    title: 'Počítač zisků',
    description: 'Spočítal jsi svůj potenciální profit',
    emoji: '💰',
    category: 'canvas',
    points: 20
  },
  {
    id: 'module-2-complete',
    title: 'Modul 2 dokončen',
    description: 'Procvičil jsi si interaktivní nástroje',
    emoji: '⚙️',
    category: 'module',
    points: 100
  },
  
  // Modul 3 - Value Proposition Canvas
  {
    id: 'customer-profile-complete',
    title: 'Profil zákazníka hotov',
    description: 'Vytvořil jsi kompletní zákaznický profil',
    emoji: '👥',
    category: 'vpc',
    points: 30
  },
  {
    id: 'value-map-complete',
    title: 'Hodnotová mapa hotova',
    description: 'Zmapoval jsi svou hodnotovou nabídku',
    emoji: '🗺️',
    category: 'vpc',
    points: 30
  },
  {
    id: 'fit-70-percent',
    title: 'Skvělý FIT',
    description: 'Dosáhl jsi FIT Score nad 70%',
    emoji: '🔥',
    category: 'vpc',
    points: 50
  },
  {
    id: 'product-fit-master',
    title: 'Mistr Product-Market Fit',
    description: 'Dosáhl jsi FIT score nad 80%',
    emoji: '🌟',
    category: 'vpc',
    points: 75
  },
  {
    id: 'fit-90-percent',
    title: 'Perfektní soulad',
    description: 'Dosáhl jsi FIT Score nad 90%',
    emoji: '⚡',
    category: 'vpc',
    points: 100
  },
  
  // Special achievements
  {
    id: 'profitable-business',
    title: 'Ziskový byznys',
    description: 'Tvůj model je v zisku (příjmy > náklady)',
    emoji: '📈',
    category: 'special',
    points: 50
  },
  {
    id: 'master-of-tools',
    title: 'Mistr nástrojů',
    description: 'Použil jsi všechny nástroje kurzu (Validator, Calculator, VPC, Akční plán)',
    emoji: '🛠️',
    category: 'special',
    points: 75
  },
  // 🏆 FINÁLNÍ ACHIEVEMENT - ABSOLVENT KURZU
  {
    id: 'module-3-complete',
    title: 'Absolvent kurzu',
    description: 'Dokončil jsi všechny 3 moduly - nyní ovládáš BMC i VPC 🚀',
    emoji: '🎓',
    category: 'module',
    points: 300
  },
  
  // 🗺️ Action Plan Achievements
  {
    id: 'action-plan-unlocked',
    title: 'Strategické plánování',
    description: 'Odemkl jsi svůj personalizovaný Akční plán',
    emoji: '📋',
    category: 'special',
    points: 20
  },
  {
    id: 'first-action-completed',
    title: 'První krok k úspěchu',
    description: 'Dokončil jsi první akci z plánu',
    emoji: '✨',
    category: 'special',
    points: 15
  },
  {
    id: 'action-streak-3',
    title: 'Na správné cestě',
    description: 'Dokončil jsi 3 akce z plánu',
    emoji: '💪',
    category: 'special',
    points: 30
  },
  {
    id: 'all-actions-completed',
    title: 'Mistr exekuce',
    description: 'Dokončil jsi všechny akce z plánu',
    emoji: '👑',
    category: 'special',
    points: 100
  },
  
  // 💫 ULTIMATE MASTER ACHIEVEMENT
  {
    id: 'ultimate-master',
    title: 'Ultimate Master',
    description: 'Odemkl jsi všechny ostatní achievementy!',
    emoji: '💫',
    category: 'special',
    points: 500
  }
];

/**
 * Check if achievement should be unlocked
 */
export function checkAchievement(
  achievementId: string,
  unlockedAchievements: Set<string>
): boolean {
  return !unlockedAchievements.has(achievementId);
}

/**
 * Get achievement by ID
 */
export function getAchievement(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find(a => a.id === id);
}

/**
 * Load unlocked achievements from localStorage
 */
export function loadUnlockedAchievements(userId: string): Set<string> {
  try {
    const stored = localStorage.getItem(`achievements_${userId}`);
    if (stored) {
      const unlocked = new Set(JSON.parse(stored));
      
      // Clean up invalid achievements (that don't exist in ACHIEVEMENTS array)
      const validAchievementIds = new Set(ACHIEVEMENTS.map(a => a.id));
      const validUnlocked = new Set(
        Array.from(unlocked).filter(id => validAchievementIds.has(id))
      );
      
      // If we cleaned some up, save the cleaned version
      if (validUnlocked.size !== unlocked.size) {
        console.log('🧹 Cleaned up invalid achievements:', unlocked.size - validUnlocked.size);
        localStorage.setItem(`achievements_${userId}`, JSON.stringify([...validUnlocked]));
      }
      
      return validUnlocked;
    }
  } catch (err) {
    console.warn('Failed to load achievements:', err);
  }
  return new Set();
}

/**
 * Save unlocked achievement to localStorage
 */
export function unlockAchievement(userId: string, achievementId: string): boolean {
  try {
    const unlocked = loadUnlockedAchievements(userId);
    
    if (unlocked.has(achievementId)) {
      return false; // Already unlocked
    }
    
    unlocked.add(achievementId);
    localStorage.setItem(`achievements_${userId}`, JSON.stringify([...unlocked]));
    return true;
  } catch (err) {
    console.error('Failed to unlock achievement:', err);
    return false;
  }
}

/**
 * Calculate total points
 */
export function calculateTotalPoints(unlockedAchievements: Set<string>): number {
  return ACHIEVEMENTS
    .filter(a => unlockedAchievements.has(a.id))
    .reduce((sum, a) => sum + (a.points || 0), 0);
}

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
 * 🔄 FALLBACK: Re-scan all achievements and unlock missing ones
 * This runs when user opens dashboard to catch any missed achievements
 */
export async function scanAndUnlockMissedAchievements(
  userId: string,
  unlockedAchievements: Set<string>
): Promise<{ newlyUnlocked: string[], totalChecked: number }> {
  const newlyUnlocked: string[] = [];
  let totalChecked = 0;

  try {
    // Import supabase
    const { supabase } = await import('./supabase');
    
    // Get user's canvas data
    const { data: canvasData } = await supabase
      .from('user_canvas_data')
      .select('*')
      .eq('user_id', userId);
    
    // Get user's completed lessons
    const { data: progressData } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);
    
    const completedLessons = new Set(progressData?.map(p => p.lesson_id) || []);
    
    // Check each achievement
    for (const achievement of ACHIEVEMENTS) {
      totalChecked++;
      
      // Skip if already unlocked
      if (unlockedAchievements.has(achievement.id)) continue;
      
      let shouldUnlock = false;
      
      // Check conditions based on achievement ID
      switch (achievement.id) {
        // BMC Achievements
        case 'first-segment': {
          const segments = canvasData?.find(d => d.section_key === 'segments');
          shouldUnlock = segments?.content?.length > 0;
          break;
        }
        
        case 'first-value': {
          const values = canvasData?.find(d => d.section_key === 'value');
          shouldUnlock = values?.content?.length > 0;
          break;
        }
        
        case 'all-sections-filled': {
          const requiredSections = ['segments', 'value', 'channels', 'relationships', 'revenue', 'resources', 'activities', 'partners', 'costs'];
          const filledSections = requiredSections.filter(section => {
            const data = canvasData?.find(d => d.section_key === section);
            return data?.content?.length > 0;
          });
          shouldUnlock = filledSections.length === 9;
          break;
        }
        
        case 'validator-used': {
          // Check if user has Canvas Validator data (any section)
          shouldUnlock = canvasData?.some(d => d.content?.length > 0) || false;
          break;
        }
        
        case 'profit-calculated': {
          // Check if revenue and costs are filled
          const revenue = canvasData?.find(d => d.section_key === 'revenue');
          const costs = canvasData?.find(d => d.section_key === 'costs');
          shouldUnlock = (revenue?.content?.length > 0 && costs?.content?.length > 0) || false;
          break;
        }
        
        case 'profitable-business': {
          // Check if profit > 0
          const revenue = canvasData?.find(d => d.section_key === 'revenue');
          const costs = canvasData?.find(d => d.section_key === 'costs');
          const totalRevenue = revenue?.content?.reduce((sum: number, item: any) => sum + (item.value || 0), 0) || 0;
          const totalCosts = costs?.content?.reduce((sum: number, item: any) => sum + (item.value || 0), 0) || 0;
          shouldUnlock = totalRevenue > totalCosts && totalRevenue > 0;
          break;
        }
        
        // Module Achievements
        case 'module-1-complete': {
          // Module 1 = lessons 1-9
          const module1Lessons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          shouldUnlock = module1Lessons.every(l => completedLessons.has(l));
          break;
        }
        
        case 'module-2-complete': {
          // Module 2 = lessons 10-13
          const module2Lessons = [10, 11, 12, 13];
          shouldUnlock = module2Lessons.every(l => completedLessons.has(l));
          break;
        }
        
        case 'module-3-complete': {
          // Module 3 = lessons 14-16
          const module3Lessons = [14, 15, 16];
          shouldUnlock = module3Lessons.every(l => completedLessons.has(l));
          break;
        }
        
        // VPC Achievements
        case 'customer-profile-complete': {
          // Check if VPC customer profile is complete
          const vpcData = canvasData?.find(d => d.section_key === 'vpc_customer_profile');
          const jobs = vpcData?.content?.jobs?.length > 0;
          const pains = vpcData?.content?.pains?.length > 0;
          const gains = vpcData?.content?.gains?.length > 0;
          shouldUnlock = jobs && pains && gains;
          break;
        }
        
        case 'value-map-complete': {
          // Check if VPC value map has at least 1 product
          const vpcData = canvasData?.find(d => d.section_key === 'vpc_value_map');
          shouldUnlock = vpcData?.content?.products?.length > 0 || false;
          break;
        }
        
        // FIT Achievements (we don't have FIT score in DB, skip for now)
        case 'fit-70-percent':
        case 'product-fit-master':
        case 'fit-90-percent':
          // Skip - these require real-time FIT calculation
          break;
        
        // Action Plan (skip - requires separate table)
        case 'action-plan-unlocked':
        case 'first-action-completed':
        case 'action-streak-3':
        case 'all-actions-completed':
          // Skip - not implemented yet
          break;
        
        // Master of Tools
        case 'master-of-tools': {
          // Check if user used Validator, Calculator, VPC, and Action Plan
          const hasCanvas = canvasData?.some(d => d.content?.length > 0);
          const hasRevenue = canvasData?.find(d => d.section_key === 'revenue')?.content?.length > 0;
          const hasCosts = canvasData?.find(d => d.section_key === 'costs')?.content?.length > 0;
          const hasVPC = canvasData?.some(d => d.section_key?.startsWith('vpc_'));
          shouldUnlock = hasCanvas && hasRevenue && hasCosts && hasVPC;
          break;
        }
        
        // Ultimate Master
        case 'ultimate-master': {
          // Check if all other achievements are unlocked
          const otherAchievements = ACHIEVEMENTS.filter(a => a.id !== 'ultimate-master');
          shouldUnlock = otherAchievements.every(a => unlockedAchievements.has(a.id));
          break;
        }
      }
      
      // Unlock if condition met
      if (shouldUnlock) {
        // Save to database - UPSERT to avoid 400 errors on duplicates
        const { error } = await supabase
          .from('user_achievements')
          .upsert({
            user_id: userId,
            achievement_type: achievement.id,
            unlocked_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,achievement_type',
            ignoreDuplicates: true
          });
        
        if (error) {
          console.error(`❌ SUPABASE ERROR - Failed to save achievement "${achievement.id}" for user ${userId}:`, error);
          console.error('Error details:', JSON.stringify(error, null, 2));
        } else {
          console.log(`✅ Successfully saved achievement "${achievement.id}" to Supabase`);
        }
        
        // Only count as newly unlocked if not already in the set
        if (!error && !unlockedAchievements.has(achievement.id)) {
          newlyUnlocked.push(achievement.id);
        }
      }
    }
    
    return { newlyUnlocked, totalChecked };
  } catch (error) {
    console.error('❌ Error scanning achievements:', error);
    return { newlyUnlocked: [], totalChecked: 0 };
  }
}

/**
 * Get achievement by ID
 */
export function getAchievement(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find(a => a.id === id);
}

/**
 * Load unlocked achievements from Supabase
 */
export async function loadUnlockedAchievementsFromDB(userId: string): Promise<Set<string>> {
  try {
    const { supabase } = await import('./supabase');
    
    const { data, error } = await supabase
      .from('user_achievements')
      .select('achievement_type')
      .eq('user_id', userId);
    
    if (error) {
      console.error('❌ Error loading achievements from DB:', error);
      return new Set();
    }
    
    const unlocked = new Set(data?.map(a => a.achievement_type) || []);
    
    // Clean up invalid achievements (that don't exist in ACHIEVEMENTS array)
    const validAchievementIds = new Set(ACHIEVEMENTS.map(a => a.id));
    const validUnlocked = new Set(
      Array.from(unlocked).filter(id => validAchievementIds.has(id))
    );
    
    // Sync to localStorage
    localStorage.setItem(`achievements_${userId}`, JSON.stringify([...validUnlocked]));
    
    return validUnlocked;
  } catch (err) {
    console.error('❌ Exception loading achievements from DB:', err);
    return new Set();
  }
}

/**
 * Load unlocked achievements from localStorage (fallback)
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
 * Save unlocked achievement to localStorage + Supabase
 */
export async function unlockAchievement(userId: string, achievementId: string): Promise<boolean> {
  try {
    const unlocked = loadUnlockedAchievements(userId);
    
    if (unlocked.has(achievementId)) {
      return false; // Already unlocked
    }
    
    // Add to localStorage
    unlocked.add(achievementId);
    localStorage.setItem(`achievements_${userId}`, JSON.stringify([...unlocked]));
    
    // 🔥 SYNC TO SUPABASE
    const { supabase } = await import('./supabase');
    const { error } = await supabase
      .from('user_achievements')
      .insert({
        user_id: userId,
        achievement_type: achievementId
      });
    
    if (error) {
      console.error(`❌ SUPABASE ERROR - Failed to save achievement "${achievementId}" for user ${userId}:`, error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      // ⚠️ Continue anyway - achievement is saved in localStorage
    } else {
      console.log(`✅ Successfully saved achievement "${achievementId}" to Supabase`);
    }
    
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

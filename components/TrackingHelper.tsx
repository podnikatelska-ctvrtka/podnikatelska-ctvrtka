/**
 * 📊 TRACKING HELPER
 * 
 * Pomocné funkce pro čtení tracking dat z minikurzu.
 * Můžeš tyto data použít v analytics nebo pro email retargeting.
 */

export interface MiniCourseTrackingData {
  currentDay: number;
  completedDays: number[];
  lastActivity: string; // ISO date string
  startedAt: string; // ISO date string
  isCompleted: boolean;
  progressPercent: number;
}

/**
 * Načte tracking data z localStorage
 */
export function getMiniCourseTracking(): MiniCourseTrackingData | null {
  try {
    const saved = localStorage.getItem('pvs_minicourse_progress');
    if (!saved) return null;

    const data = JSON.parse(saved);
    const completedDays = data.completed || [];
    const totalDays = 3;

    return {
      currentDay: data.currentDay || 1,
      completedDays: completedDays,
      lastActivity: data.lastActivity || '',
      startedAt: data.startedAt || '',
      isCompleted: completedDays.length >= totalDays,
      progressPercent: Math.round((completedDays.length / totalDays) * 100)
    };
  } catch (err) {
    console.error('Error reading tracking data:', err);
    return null;
  }
}

/**
 * Zkontroluje jestli uživatel začal kurz ale nedokončil ho
 */
export function isCoursAbandoned(daysSinceLastActivity: number = 2): boolean {
  const tracking = getMiniCourseTracking();
  if (!tracking || tracking.isCompleted) return false;

  const lastActivity = new Date(tracking.lastActivity);
  const now = new Date();
  const daysDiff = (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24);

  return daysDiff >= daysSinceLastActivity;
}

/**
 * Vrátí doporučený text pro email podle progressu
 */
export function getEmailMessage(): string {
  const tracking = getMiniCourseTracking();
  if (!tracking) return "Ještě jsi nezačal kurz? Začni hned!";

  if (tracking.isCompleted) {
    return "Gratulujeme! Dokončil jsi celý kurz! 🎉";
  }

  const nextDay = Math.max(...tracking.completedDays) + 1;
  if (nextDay <= 3) {
    return `Máš hotový den ${tracking.completedDays.length}/3. Pokračuj na Den ${nextDay}!`;
  }

  return `Jsi na ${tracking.progressPercent}% cesty. Dokončil jsi ${tracking.completedDays.length} z 3 dnů.`;
}

/**
 * Export dat pro analytics/tracking systémy
 */
export function sendTrackingToAnalytics() {
  const tracking = getMiniCourseTracking();
  if (!tracking) return;

  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'minicourse_progress', {
      current_day: tracking.currentDay,
      completed_days: tracking.completedDays.length,
      progress_percent: tracking.progressPercent,
      is_completed: tracking.isCompleted
    });
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('trackCustom', 'MiniCourseProgress', {
      day: tracking.currentDay,
      progress: tracking.progressPercent
    });
  }

  console.log('📊 Tracking data:', tracking);
}

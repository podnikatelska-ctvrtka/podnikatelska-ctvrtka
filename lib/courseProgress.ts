import { supabase } from './supabase';

/**
 * Load user's course progress from Supabase
 */
export async function loadCourseProgress(userId: string): Promise<Set<number>> {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('lesson_id')
      .eq('user_id', userId);
    
    if (error) {
      console.error('Could not load progress:', error);
      return new Set();
    }
    
    if (data) {
      const lessonIds = data.map(item => item.lesson_id);
      return new Set(lessonIds);
    }
    
    return new Set();
  } catch (err) {
    console.error('Failed to load progress:', err);
    return new Set();
  }
}

/**
 * Save completed lesson to Supabase
 */
export async function saveLessonProgress(userId: string, lessonId: number): Promise<boolean> {
  try {
    // First check if already exists
    const { data: existing } = await supabase
      .from('user_progress')
      .select('id')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .maybeSingle();
    
    if (existing) {
      // Already completed, skip
      console.log(`Lesson ${lessonId} already completed for user ${userId}`);
      return true;
    }
    
    // Insert new completion
    const { error } = await supabase
      .from('user_progress')
      .insert({
        user_id: userId,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('Could not save progress:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Failed to save progress:', err);
    return false;
  }
}

/**
 * Delete lesson progress (for testing/resetting)
 */
export async function deleteLessonProgress(userId: string, lessonId: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_progress')
      .delete()
      .eq('user_id', userId)
      .eq('lesson_id', lessonId);
    
    if (error) {
      console.warn('Could not delete progress:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.warn('Failed to delete progress:', err);
    return false;
  }
}

/**
 * Reset all progress for user (for testing)
 */
export async function resetAllProgress(userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_progress')
      .delete()
      .eq('user_id', userId);
    
    if (error) {
      console.warn('Could not reset progress:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.warn('Failed to reset progress:', err);
    return false;
  }
}

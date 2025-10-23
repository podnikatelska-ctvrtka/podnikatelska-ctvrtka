// 📳 HAPTIC FEEDBACK - Native-like touch feedback

/**
 * Haptic feedback types
 */
export type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection';

/**
 * Vibration patterns (iOS + Android compatible)
 */
const HAPTIC_PATTERNS = {
  light: 10,
  medium: 25,
  heavy: 50,
  success: [10, 50, 10],
  warning: [25, 50, 25],
  error: [25, 100, 25, 100],
  selection: 10
} as const;

/**
 * Trigger haptic feedback
 * 
 * @param type - Type of haptic feedback
 * 
 * @example
 * ```tsx
 * import { haptic } from '@/lib/haptics';
 * 
 * <button onClick={() => {
 *   haptic('light');
 *   // Do something
 * }}>
 *   Click me
 * </button>
 * ```
 */
export function haptic(type: HapticType = 'light') {
  // Check if vibration API is available
  if (!('vibrate' in navigator)) {
    return;
  }

  // Check if user has reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  try {
    const pattern = HAPTIC_PATTERNS[type];
    navigator.vibrate(pattern);
  } catch (error) {
    console.warn('Haptic feedback failed:', error);
  }
}

/**
 * Cancel all vibrations
 */
export function cancelHaptic() {
  if ('vibrate' in navigator) {
    navigator.vibrate(0);
  }
}

/**
 * Check if haptic feedback is supported
 */
export function isHapticSupported(): boolean {
  return 'vibrate' in navigator;
}

/**
 * Create a custom haptic pattern
 * 
 * @param pattern - Array of [vibrate, pause, vibrate, pause, ...]
 * 
 * @example
 * ```tsx
 * customHaptic([50, 100, 50]); // Vibrate 50ms, pause 100ms, vibrate 50ms
 * ```
 */
export function customHaptic(pattern: number[]) {
  if (!('vibrate' in navigator)) {
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  try {
    navigator.vibrate(pattern);
  } catch (error) {
    console.warn('Custom haptic failed:', error);
  }
}

/**
 * React hook for haptic feedback
 */
export function useHaptic() {
  const trigger = (type: HapticType = 'light') => {
    haptic(type);
  };

  const cancel = () => {
    cancelHaptic();
  };

  const custom = (pattern: number[]) => {
    customHaptic(pattern);
  };

  return {
    trigger,
    cancel,
    custom,
    isSupported: isHapticSupported()
  };
}

/**
 * Haptic-enhanced button wrapper
 */
export function withHaptic<T extends HTMLElement>(
  element: T,
  type: HapticType = 'light'
): T {
  element.addEventListener('click', () => haptic(type));
  return element;
}

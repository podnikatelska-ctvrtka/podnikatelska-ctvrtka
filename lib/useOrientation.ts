import { useState, useEffect } from 'react';

export type Orientation = 'portrait' | 'landscape' | null;

// Helper to detect if device is actually mobile (not desktop)
function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobileUA = mobileRegex.test(userAgent);
  
  return hasTouch && isMobileUA;
}

/**
 * Hook to detect device orientation
 * Returns orientation ONLY for mobile devices
 * Returns null for desktop (no orientation concept)
 */
export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(() => {
    if (typeof window === 'undefined') return null;
    
    // Desktop = no orientation concept
    if (!isTouchDevice()) return null;
    
    // Mobile = check orientation
    const screenOrientation = window.screen?.orientation?.type;
    const isLandscape = 
      screenOrientation?.includes('landscape') || 
      window.innerWidth > window.innerHeight;
    
    return isLandscape ? 'landscape' : 'portrait';
  });

  useEffect(() => {
    const handleOrientationChange = () => {
      // Desktop = no orientation
      if (!isTouchDevice()) {
        setOrientation(null);
        return;
      }
      
      // Mobile = check orientation
      const screenOrientation = window.screen?.orientation?.type;
      const isLandscape = 
        screenOrientation?.includes('landscape') || 
        window.innerWidth > window.innerHeight;
      
      setOrientation(isLandscape ? 'landscape' : 'portrait');
    };

    // Listen to both orientation and resize events for maximum compatibility
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
    
    // Also listen to screen orientation change if supported
    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener('change', handleOrientationChange);
    }

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
      
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener('change', handleOrientationChange);
      }
    };
  }, []);

  return orientation;
}

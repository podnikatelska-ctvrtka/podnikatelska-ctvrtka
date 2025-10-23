import * as React from "react";

const MOBILE_BREAKPOINT = 768;

// 📱 Detekuje SKUTEČNÉ mobilní zařízení (ne jen šířku okna)
function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for touch support
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Check user agent for mobile devices
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobileUA = mobileRegex.test(userAgent);
  
  return hasTouch && isMobileUA;
}

export function useIsMobile() {
  // 🎯 Check immediately to prevent hydration mismatch
  const checkIsMobile = () => {
    if (typeof window === 'undefined') return false; // SSR default to desktop
    
    const isRealMobileDevice = isTouchDevice();
    
    // If it's a real mobile device (touch + mobile UA), ALWAYS return true
    // This handles landscape mode correctly
    if (isRealMobileDevice) {
      return true;
    }
    
    // Desktop/tablet: use breakpoint based on width
    return window.innerWidth < MOBILE_BREAKPOINT;
  };
  
  // Initialize with actual value immediately
  const [isMobile, setIsMobile] = React.useState<boolean>(checkIsMobile());

  React.useEffect(() => {
    // Update on mount in case initial value was wrong
    setIsMobile(checkIsMobile());
    
    // Listen for resize events
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(checkIsMobile());
    };
    
    mql.addEventListener("change", onChange);
    window.addEventListener("resize", onChange);
    window.addEventListener("orientationchange", onChange);
    
    return () => {
      mql.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
      window.removeEventListener("orientationchange", onChange);
    };
  }, []);

  return isMobile;
}

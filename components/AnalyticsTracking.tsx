import { useEffect } from 'react';
import { trackScrollDepth } from '../lib/analytics';

/**
 * AnalyticsTracking Component
 * 
 * Automaticky trackuje scroll depth (25%, 50%, 75%, 100%)
 * Nemusíš nic dělat, jenom přidej do App.tsx
 */
export function AnalyticsTracking() {
  useEffect(() => {
    let ticking = false;
    const tracked = new Set<number>();
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          // Calculate scroll percentage
          const scrollPercent = Math.round(
            (scrollTop / (documentHeight - windowHeight)) * 100
          );
          
          // Track milestones (25%, 50%, 75%, 100%)
          const milestones = [25, 50, 75, 100];
          
          milestones.forEach((milestone) => {
            if (scrollPercent >= milestone && !tracked.has(milestone)) {
              trackScrollDepth(milestone);
              tracked.add(milestone);
              console.log(`📊 Scroll depth tracked: ${milestone}%`);
            }
          });
          
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // This component doesn't render anything
  return null;
}

import { ReactNode } from 'react';

interface LessonContentWrapperProps {
  children: ReactNode;
  /** Pokud true, wrapper bude full-width (pro canvas/dashboard) */
  fullWidth?: boolean;
  /** Pro debugging - zobrazí název komponenty */
  componentName?: string;
}

/**
 * 🎯 UNIVERZÁLNÍ WRAPPER PRO VŠECHNY LEKCE
 * 
 * Zajišťuje:
 * - Konzistentní šířku 1280px na desktopu (max-w-7xl)
 * - Full-width na mobilu s padding
 * - Všechny komponenty uvnitř budou mít w-full
 * 
 * Použití:
 * <LessonContentWrapper>
 *   <BusinessModelCanvas />
 * </LessonContentWrapper>
 */
export function LessonContentWrapper({ 
  children, 
  fullWidth = false,
  componentName 
}: LessonContentWrapperProps) {
  
  if (fullWidth) {
    // Pro canvas/dashboard - full-width bez omezení
    return (
      <div className="w-full" data-lesson-wrapper="full">
        {componentName && (
          <div className="sr-only" data-component={componentName} />
        )}
        {children}
      </div>
    );
  }
  
  // Standardní wrapper - 1280px na desktopu
  return (
    <div 
      className="w-full max-w-7xl mx-auto px-4 sm:px-6" 
      data-lesson-wrapper="standard"
      style={{
        // Force width na desktopu - žádná komponenta nemůže být užší
        maxWidth: '1280px'
      }}
    >
      {componentName && (
        <div className="sr-only" data-component={componentName} />
      )}
      
      {/* Inner wrapper - všechny děti budou w-full */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}

/**
 * 🎨 SECTION WRAPPER - Pro jednotlivé sekce uvnitř lekce
 * Zajišťuje konzistentní spacing mezi sekcemi
 */
export function LessonSection({ children }: { children: ReactNode }) {
  return (
    <div className="w-full mb-6 last:mb-0">
      {children}
    </div>
  );
}

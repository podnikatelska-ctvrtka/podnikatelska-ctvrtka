import { HeroSection } from "./components/HeroSection";
import { ProblemsSectionCompact } from "./components/ProblemsSectionCompact";
import { SolutionIntroSection } from "./components/SolutionIntroSection";
import { OptimizedCombinedSectionV2 } from "./components/OptimizedCombinedSectionV2";
import { SwipeableTestimonials } from "./components/SwipeableTestimonials";
import { CompactCaseStudySection } from "./components/CompactCaseStudySection";
import { CountdownBanner } from "./components/CountdownBanner";
import { PrelaunchEmailCapture } from "./components/PrelaunchEmailCapture";
import { EarlyAccessSale } from "./components/EarlyAccessSale";
import { MiniCourse } from "./components/MiniCourse";

import { Analytics } from "./components/Analytics";
import { CriticalCSS } from "./components/CriticalCSS";
import { MobileProgressBar } from "./components/MobileProgressBar";
import { OptimizedMobileCTA } from "./components/OptimizedMobileCTA";
import { CookieConsent } from "./components/CookieConsent";

// New UX enhancements
import { FadeInUp, ScaleIn, ProgressReveal, HoverScale } from "./components/ScrollAnimations";
import { SectionTransition } from "./components/SectionTransition";
import { HoverGlow, MagneticHover } from "./components/MicroInteractions";
import { StaggerContainer } from "./components/EnhancedScrollEffects";

import { Toaster } from "./components/ui/sonner";
import { useEffect, useState } from "react";

export default function App() {
  // Toggle between modes: early-access / prelaunch / normal-sale  
  const saleMode = "prelaunch"; // "early-access" | "prelaunch" | "normal-sale"
  
  // 🧪 DEMO MODE: Pro testování Step 2 v modalu (změň na true)
  const demoModalStep2 = false; // true = vidíš rovnou Step 2 success screen
  
  // 🎯 CHECKLIST PAGE MODE: Pro zobrazení checklist stránky
  const [showChecklist, setShowChecklist] = useState(false);
  
  useEffect(() => {
    // Check URL hash for #priprava
    const checkHash = () => {
      if (window.location.hash === '#priprava' || window.location.pathname === '/priprava') {
        setShowChecklist(true);
      } else {
        setShowChecklist(false);
      }
    };
    
    // Check on mount
    checkHash();
    
    // Listen for hash changes
    window.addEventListener('hashchange', checkHash);
    
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);
  
  // Show mini course if URL has #priprava
  if (showChecklist) {
    return (
      <>
        <CriticalCSS />
        <MiniCourse />
        <Toaster position="top-right" />
      </>
    );
  }
  
  return (
    <>
      {/* Critical CSS for performance */}
      <CriticalCSS />
      
      {/* Analytics tracking */}
      <Analytics />
      
      {/* Mobile UX Enhancements */}
      <MobileProgressBar />
      <OptimizedMobileCTA />
      
    <div className="min-h-screen">
      {/* 1. Úvod a hlavní nabídka */}
      <HeroSection />
      
      {/* 2. Problémy - budování pain pointů BEZ CTA */}
      <ProgressReveal delay={0.1}>
        <ProblemsSectionCompact />
      </ProgressReveal>
      
      {/* 3. První naděje - teaser řešení */}
      <FadeInUp delay={0.2}>
        <SolutionIntroSection />
      </FadeInUp>
      
      {/* 4. Social proof - budování důvěry */}
      <StaggerContainer>
        <SwipeableTestimonials />
      </StaggerContainer>
      
      {/* 5. Řešení a detailní benefity - soft pitch */}
      <FadeInUp delay={0.1}>
        <OptimizedCombinedSectionV2 />
      </FadeInUp>
      
      {/* 6. Konkrétní case study - detailní příklad */}
      <ProgressReveal delay={0.2}>
        <CompactCaseStudySection />
      </ProgressReveal>
      
      {/* 7. Finální nabídka - podle režimu */}
      <ScaleIn delay={0.1}>
        <div id="order">
          {saleMode === "early-access" && <EarlyAccessSale />}
          {saleMode === "prelaunch" && <HoverGlow><PrelaunchEmailCapture /></HoverGlow>}
          {saleMode === "normal-sale" && <CountdownBanner />}
        </div>
      </ScaleIn>
      
      {/* Toast notifikace */}
      <Toaster position="top-right" />
      
      {/* Cookie consent banner */}
      <CookieConsent />
    </div>
    </>
  );
}
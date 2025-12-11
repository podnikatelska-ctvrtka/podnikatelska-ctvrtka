import { HeroSection } from "./HeroSection";
import { ProblemsSectionCompact } from "./ProblemsSectionCompact";
import { SolutionIntroSection } from "./SolutionIntroSection";
import { OptimizedCombinedSectionV2 } from "./OptimizedCombinedSectionV2";
import { SwipeableTestimonials } from "./SwipeableTestimonials";
import { CompactCaseStudySection } from "./CompactCaseStudySection";
import { CountdownBanner } from "./CountdownBanner";
import { PrelaunchEmailCapture } from "./PrelaunchEmailCapture";
import { EarlyAccessSale } from "./EarlyAccessSale";
import { Analytics } from "./Analytics";
import { AnalyticsTracking } from "./AnalyticsTracking";
import { MobileProgressBar } from "./MobileProgressBar";
import { OptimizedMobileCTA } from "./OptimizedMobileCTA";
import { CookieConsent } from "./CookieConsent";

export function ZalohaLanding() {
  // Original sale mode from App.tsx
  const saleMode = "prelaunch"; // "early-access" | "prelaunch" | "normal-sale"
  
  return (
    <>
      {/* Analytics tracking */}
      <Analytics />
      
      {/* Scroll depth tracking */}
      <AnalyticsTracking />
      
      {/* Mobile UX Enhancements */}
      <MobileProgressBar />
      <OptimizedMobileCTA />
    <div className="min-h-screen">
      {/* 1. Úvod a hlavní nabídka */}
      <HeroSection />
      
      {/* 2. Problémy - budování pain pointů BEZ CTA */}
      <ProblemsSectionCompact />
      
      {/* 3. První naděje - teaser řešení */}
      <SolutionIntroSection />
      
      {/* 4. Social proof - budování důvěry */}
      <SwipeableTestimonials />
      
      {/* 5. Řešení a detailní benefity - soft pitch */}
      <OptimizedCombinedSectionV2 />
      
      {/* 6. Konkrétní case study - detailní příklad */}
      <CompactCaseStudySection />
      
      {/* 7. Finální nabídka - podle režimu */}
      <div id="order">
        {saleMode === "early-access" && <EarlyAccessSale />}
        {saleMode === "prelaunch" && <PrelaunchEmailCapture />}
        {saleMode === "normal-sale" && <CountdownBanner />}
      </div>
      
      {/* Cookie consent banner */}
      <CookieConsent />
    </div>
    </>
  );
}

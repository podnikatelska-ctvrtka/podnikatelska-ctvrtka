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
import { CourseDemo } from "./components/CourseDemo";
import { CourseDemoV2 } from "./components/CourseDemoV2";
import { CourseDemoV3 } from "./components/CourseDemoV3";
import { AdminCourse } from "./components/AdminCourse";
import { InteractiveCourseDemo } from "./components/InteractiveCourseDemo";
import { AdCreativesShowcase } from "./components/FacebookAdCreatives";
import { FinalAdSetsShowcase } from "./components/FinalAdSets";
import AdPreview from "./components/AdPreview";
import AdCreatives from "./components/AdCreatives";
import AdCreativesSimple from "./components/AdCreativesSimple";
import AdVariants from "./components/AdVariants";
import Final3AdSets from "./components/Final3AdSets";
import MyCreativeAdSetsFixed from "./components/MyCreativeAdSetsFixed";
import ThreeNewCreativeAds from "./components/ThreeNewCreativeAds";
import AntiGuruDarkVersion from "./components/AntiGuruDarkVersion";
import FinalAdPortfolio from "./components/FinalAdPortfolio";
import All6AdSets from "./components/All6AdSets";
import { AdComparison } from "./pages/AdComparison";
import OrderPage from "./components/OrderPage";
import OrderPageClean from "./components/OrderPageClean";
import TermsPage from "./components/TermsPage";
import GDPRPage from "./components/GDPRPage";

import { Analytics } from "./components/Analytics";
import { CriticalCSS } from "./components/CriticalCSS";
import { MobileProgressBar } from "./components/MobileProgressBar";
import { OptimizedMobileCTA } from "./components/OptimizedMobileCTA";
import { CookieConsent } from "./components/CookieConsent";

import { Toaster } from "./components/ui/sonner";
import { useEffect, useState } from "react";

export default function App() {
  // 🚀 READY TO DEPLOY - Fresh version with all ads and improvements!
  // Toggle between modes: early-access / prelaunch / normal-sale  
  const saleMode = "prelaunch"; // "early-access" | "prelaunch" | "normal-sale"
  
  // �� DEMO MODE: Pro testování Step 2 v modalu (změň na true)
  const demoModalStep2 = false; // true = vidíš rovnou Step 2 success screen
  
  // 🎨 AD CREATIVES MODE: Pro zobrazení FB reklam (změň na true)
  const showAdCreatives = false; // ✅ VYPNUTO - Landing page je aktivní!
  const showFinalAdSets = true; // 3 FINÁLNÍ AD SETY (Problem, Value, Social Proof)
  
  // 🎯 CHECKLIST PAGE MODE: Pro zobrazení checklist stránky
  const [showChecklist, setShowChecklist] = useState(false);
  // 🎓 COURSE DEMO MODE: Pro zobrazení LMS demo
  const [showCourseDemo, setShowCourseDemo] = useState(false);
  // 🎓 COURSE V2 MODE: Plná verze LMS se Supabase tracking
  const [showCourseV2, setShowCourseV2] = useState(false);
  // 🎓 COURSE V3 MODE: Interaktivní verze s guided tour
  const [showCourseV3, setShowCourseV3] = useState(false);
  // 🛠️ ADMIN MODE: Pro správu kurzu
  const [showAdmin, setShowAdmin] = useState(false);
  // 🎓 INTERACTIVE COURSE: Guided tour demo
  const [showInteractiveCourse, setShowInteractiveCourse] = useState(false);
  // 🛒 ORDER PAGE: Sales page
  const [showOrderPage, setShowOrderPage] = useState(false);
  // 🛒 ORDER EXPIRED: Expired offer page
  const [showOrderExpired, setShowOrderExpired] = useState(false);
  // 📄 LEGAL PAGES
  const [showTerms, setShowTerms] = useState(false);
  const [showGDPR, setShowGDPR] = useState(false);
  // 🎯 AD PREVIEW PAGE
  const [showAdPreview, setShowAdPreview] = useState(false);
  const [showCreativeAds, setShowCreativeAds] = useState(false);
  const [showAdComparison, setShowAdComparison] = useState(false);
  const [showNewCreativeAds, setShowNewCreativeAds] = useState(false);
  const [showAntiGuruDark, setShowAntiGuruDark] = useState(false);
  const [showFinalPortfolio, setShowFinalPortfolio] = useState(false);
  const [showAll6AdSets, setShowAll6AdSets] = useState(false);

  
  useEffect(() => {
    // Check URL hash for different modes
    const checkHash = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      
      if (hash.startsWith('#all-ads') || path === '/all-ads') {
        setShowAll6AdSets(true);
        setShowFinalPortfolio(false);
        setShowAntiGuruDark(false);
        setShowNewCreativeAds(false);
        setShowAdComparison(false);
        setShowCreativeAds(false);
        setShowAdPreview(false);
        setShowTerms(false);
        setShowGDPR(false);
        setShowOrderExpired(false);
        setShowOrderPage(false);
        setShowChecklist(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
        setShowAdmin(false);
        setShowInteractiveCourse(false);
      } else if (hash.startsWith('#final-portfolio') || path === '/final-portfolio') {
        setShowFinalPortfolio(true);
        setShowAll6AdSets(false);
        setShowAntiGuruDark(false);
        setShowNewCreativeAds(false);
        setShowAdComparison(false);
        setShowCreativeAds(false);
        setShowAdPreview(false);
        setShowTerms(false);
        setShowGDPR(false);
        setShowOrderExpired(false);
        setShowOrderPage(false);
        setShowChecklist(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
        setShowAdmin(false);
        setShowInteractiveCourse(false);
      } else if (hash.startsWith('#anti-guru-dark') || path === '/anti-guru-dark') {
        setShowAntiGuruDark(true);
        setShowFinalPortfolio(false);
        setShowNewCreativeAds(false);
        setShowAdComparison(false);
        setShowCreativeAds(false);
        setShowAdPreview(false);
        setShowTerms(false);
        setShowGDPR(false);
        setShowOrderExpired(false);
        setShowOrderPage(false);
        setShowChecklist(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
        setShowAdmin(false);
        setShowInteractiveCourse(false);
      } else if (hash.startsWith('#nove-reklamy') || path === '/nove-reklamy') {
        setShowNewCreativeAds(true);
        setShowAntiGuruDark(false);
        setShowAdComparison(false);
        setShowCreativeAds(false);
        setShowAdPreview(false);
        setShowTerms(false);
        setShowGDPR(false);
        setShowOrderExpired(false);
        setShowOrderPage(false);
        setShowChecklist(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
        setShowAdmin(false);
        setShowInteractiveCourse(false);
      } else if (hash.startsWith('#ad-porovnani') || path === '/ad-porovnani') {
        setShowAdComparison(true);
        setShowNewCreativeAds(false);
        setShowCreativeAds(false);
        setShowAdPreview(false);
        setShowTerms(false);
        setShowGDPR(false);
        setShowOrderExpired(false);
        setShowOrderPage(false);
        setShowChecklist(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
        setShowAdmin(false);
        setShowInteractiveCourse(false);
      } else if (hash.startsWith('#kreativni-reklamy') || path === '/kreativni-reklamy') {
        setShowCreativeAds(true);
        setShowAdPreview(false);
        setShowTerms(false);
        setShowGDPR(false);
        setShowOrderExpired(false);
        setShowOrderPage(false);
        setShowChecklist(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
        setShowAdmin(false);
        setShowInteractiveCourse(false);
      } else if (hash.startsWith('#reklamy') || path === '/reklamy') {
        setShowAdPreview(true);
        setShowCreativeAds(false);
        setShowTerms(false);
        setShowGDPR(false);
        setShowOrderExpired(false);
        setShowOrderPage(false);
        setShowChecklist(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
        setShowAdmin(false);
        setShowInteractiveCourse(false);
      } else if (hash.startsWith('#terms') || path === '/terms' || path === '/podminky' || path === '/obchodni-podminky') {
        setShowTerms(true);
        setShowGDPR(false);
        setShowAdPreview(false);
        setShowCreativeAds(false);
        setShowOrderExpired(false);
        setShowOrderPage(false);
        setShowChecklist(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
        setShowAdmin(false);
        setShowInteractiveCourse(false);
      } else if (hash.startsWith('#gdpr') || path === '/gdpr' || path === '/ochrana-udaju' || path === '/ochrana-osobnich-udaju') {
        setShowGDPR(true);
        setShowTerms(false);
        setShowAdPreview(false);
        setShowCreativeAds(false);
        setShowOrderExpired(false);
        setShowOrderPage(false);
        setShowChecklist(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
        setShowAdmin(false);
        setShowInteractiveCourse(false);
      } else if (hash.startsWith('#objednavka-vyprsela') || path === '/objednavka-vyprsela') {
        setShowOrderExpired(true);
        setShowOrderPage(false);
        setShowAdPreview(false);
        setShowCreativeAds(false);
        setShowTerms(false);
        setShowGDPR(false);
        setShowChecklist(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
        setShowAdmin(false);
        setShowInteractiveCourse(false);
      } else if (hash.startsWith('#objednavka') || path === '/objednavka') {
        setShowOrderPage(true);
        setShowOrderExpired(false);
        setShowAdPreview(false);
        setShowCreativeAds(false);
        setShowTerms(false);
        setShowGDPR(false);
        setShowChecklist(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
        setShowAdmin(false);
        setShowInteractiveCourse(false);
      } else if (hash.startsWith('#priprava') || path === '/priprava' || path === '/minikurz') {
        setShowChecklist(true);
        setShowOrderPage(false);
        setShowOrderExpired(false);
        setShowAdPreview(false);
        setShowCreativeAds(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
        setShowAdmin(false);
        setShowInteractiveCourse(false);
      } else if (hash.startsWith('#course') && !hash.startsWith('#course-v') || path === '/course') {
        setShowCourseDemo(true);
        setShowChecklist(false);
        setShowOrderPage(false);
        setShowOrderExpired(false);
        setShowAdPreview(false);
        setShowCreativeAds(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
        setShowAdmin(false);
        setShowInteractiveCourse(false);
      } else if (hash.startsWith('#course-v2') || path === '/course-v2') {
        setShowCourseV2(true);
        setShowChecklist(false);
        setShowOrderPage(false);
        setShowOrderExpired(false);
        setShowAdPreview(false);
        setShowCreativeAds(false);
        setShowCourseDemo(false);
        setShowCourseV3(false);
        setShowAdmin(false);
        setShowInteractiveCourse(false);
      } else if (hash.startsWith('#course-v3') || path === '/course-v3') {
        setShowCourseV3(true);
        setShowCourseV2(false);
        setShowChecklist(false);
        setShowOrderPage(false);
        setShowOrderExpired(false);
        setShowAdPreview(false);
        setShowCreativeAds(false);
        setShowCourseDemo(false);
        setShowAdmin(false);
        setShowInteractiveCourse(false);
      } else if (hash.startsWith('#admin-course') || path === '/admin-course') {
        setShowAdmin(true);
        setShowChecklist(false);
        setShowOrderPage(false);
        setShowOrderExpired(false);
        setShowAdPreview(false);
        setShowCreativeAds(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
        setShowInteractiveCourse(false);
      } else if (hash.startsWith('#interactive-course') || path === '/interactive-course') {
        setShowInteractiveCourse(true);
        setShowAdmin(false);
        setShowChecklist(false);
        setShowOrderPage(false);
        setShowOrderExpired(false);
        setShowAdPreview(false);
        setShowCreativeAds(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
      } else {
        setShowChecklist(false);
        setShowOrderPage(false);
        setShowOrderExpired(false);
        setShowAdPreview(false);
        setShowCreativeAds(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
        setShowAdmin(false);
        setShowInteractiveCourse(false);
      }
    };
    
    // Check on mount
    checkHash();
    
    // Listen for hash changes
    window.addEventListener('hashchange', checkHash);
    
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);
  
  // Show ad creatives if enabled
  if (showAdCreatives) {
    return (
      <>
        <CriticalCSS />
        {showFinalAdSets ? <FinalAdSetsShowcase /> : <AdCreativesShowcase />}
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show All 6 Ad Sets if URL has #all-ads
  if (showAll6AdSets) {
    return (
      <>
        <CriticalCSS />
        <All6AdSets />
        <Toaster position="top-right" />
      </>
    );
  }

  // Show Final Ad Portfolio if URL has #final-portfolio
  if (showFinalPortfolio) {
    return (
      <>
        <CriticalCSS />
        <FinalAdPortfolio />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show Anti-Guru Dark comparison if URL has #anti-guru-dark
  if (showAntiGuruDark) {
    return (
      <>
        <CriticalCSS />
        <AntiGuruDarkVersion />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show new creative ads if URL has #nove-reklamy (3 NOVÉ!)
  if (showNewCreativeAds) {
    return (
      <>
        <CriticalCSS />
        <ThreeNewCreativeAds />
        <Toaster position="top-right" />
      </>
    );
  }

  // Show ad comparison if URL has #ad-porovnani (POROVNÁNÍ!)
  if (showAdComparison) {
    return (
      <>
        <CriticalCSS />
        <AdComparison />
        <Toaster position="top-right" />
      </>
    );
  }

  // Show creative ads if URL has #kreativni-reklamy (MÉ KREATIVNÍ!)
  if (showCreativeAds) {
    return (
      <>
        <CriticalCSS />
        <MyCreativeAdSetsFixed />
        <Toaster position="top-right" />
      </>
    );
  }

  // Show final 3 ad sets if URL has #reklamy (3 FINÁLNÍ!)
  if (showAdPreview) {
    return (
      <>
        <CriticalCSS />
        <Final3AdSets />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show terms page if URL has #terms
  if (showTerms) {
    return (
      <>
        <CriticalCSS />
        <TermsPage />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show GDPR page if URL has #gdpr
  if (showGDPR) {
    return (
      <>
        <CriticalCSS />
        <GDPRPage />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show order page if URL has #objednavka
  if (showOrderPage) {
    return (
      <>
        <CriticalCSS />
        <OrderPage expired={false} />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show expired order page if URL has #objednavka-vyprsela
  if (showOrderExpired) {
    return (
      <>
        <CriticalCSS />
        <OrderPage expired={true} />
        <Toaster position="top-right" />
      </>
    );
  }
  
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
  
  // Show course demo if URL has #course
  if (showCourseDemo) {
    return (
      <>
        <CriticalCSS />
        <CourseDemo />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show course V2 if URL has #course-v2
  if (showCourseV2) {
    return (
      <>
        <CriticalCSS />
        <CourseDemoV2 />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show course V3 if URL has #course-v3
  if (showCourseV3) {
    return (
      <>
        <CriticalCSS />
        <CourseDemoV3 />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show admin if URL has #admin-course
  if (showAdmin) {
    return (
      <>
        <CriticalCSS />
        <AdminCourse />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show interactive course if URL has #interactive-course
  if (showInteractiveCourse) {
    return (
      <>
        <CriticalCSS />
        <InteractiveCourseDemo />
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
      
      {/* Toast notifikace */}
      <Toaster position="top-right" />
      
      {/* Cookie consent banner */}
      <CookieConsent />
    </div>
    </>
  );
}
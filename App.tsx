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
import { CourseDemoV3 as CourseDemo } from "./components/CourseDemoV3";

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
import TenNewAngles from "./components/TenNewAngles";
import Final6Angles from "./components/Final6Angles";
import Ultimate13Ads from "./components/Ultimate10Ads";
import { AdComparison } from "./pages/AdComparison";
import OrderPage from "./components/OrderPage";
import OrderPageFinal from "./components/OrderPageFinal";
import TermsPage from "./components/TermsPage";
import GDPRPage from "./components/GDPRPage";
import ThankYouPage from "./components/ThankYouPage";
import EmailPreview from "./components/EmailPreview";
import WebhookTester from "./components/WebhookTester";
import UnsubscribePage from "./pages/UnsubscribePage";

import { Analytics } from "./components/Analytics";
import { CriticalCSS } from "./components/CriticalCSS";
import { MobileProgressBar } from "./components/MobileProgressBar";
import { OptimizedMobileCTA } from "./components/OptimizedMobileCTA";
import { CookieConsent } from "./components/CookieConsent";
import { InstallPrompt } from "./components/InstallPrompt";
import { DevBadge } from "./components/DevModeBanner";

import { Toaster } from "./components/ui/sonner";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import * as Sentry from "@sentry/react";

export default function App() {
  // 🚀 READY TO DEPLOY - Fresh version with all ads and improvements!
  // Toggle between modes: early-access / prelaunch / normal-sale  
  const saleMode = "prelaunch"; // "early-access" | "prelaunch" | "normal-sale" - ✅ AGGRESSIVE FLIP!
  
  // 🔐 AUTH STATE: Check if user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  
  // 🎯 DEMO MODE: Pro testování Step 2 v modalu (změň na true)
  const demoModalStep2 = false; // true = vidíš rovnou Step 2 success screen
  
  // 🎨 AD CREATIVES MODE: Pro zobrazení FB reklam (změň na true)
  const showAdCreatives = false; // ✅ VYPNUTO - Landing page je aktivní!
  const showFinalAdSets = true; // 3 FINÁLNÍ AD SETY (Problem, Value, Social Proof)
  
  // 🎯 CHECKLIST PAGE MODE: Pro zobrazení checklist stránky
  const [showChecklist, setShowChecklist] = useState(false);
  // 🎓 COURSE MODE: Hlavní kurz (CourseDemoV3)
  const [showCourseDemo, setShowCourseDemo] = useState(false);
  const [showCourseV2, setShowCourseV2] = useState(false);
  const [showCourseV3, setShowCourseV3] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showInteractiveCourse, setShowInteractiveCourse] = useState(false);

  // 🛒 ORDER PAGE: Sales page
  const [showOrderPage, setShowOrderPage] = useState(false);
  // 🛒 ORDER EXPIRED: Expired offer page
  const [showOrderExpired, setShowOrderExpired] = useState(false);
  // 🧪 TEST MODE: Pro vypnutí timeru (použij ?test=true v URL)
  const [orderPageTestMode, setOrderPageTestMode] = useState(false);
  // 📄 LEGAL PAGES
  const [showTerms, setShowTerms] = useState(false);
  const [showGDPR, setShowGDPR] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  // 🎯 AD PREVIEW PAGE
  const [showAdPreview, setShowAdPreview] = useState(false);
  const [showCreativeAds, setShowCreativeAds] = useState(false);
  const [showAdComparison, setShowAdComparison] = useState(false);
  const [showNewCreativeAds, setShowNewCreativeAds] = useState(false);
  const [showAntiGuruDark, setShowAntiGuruDark] = useState(false);
  const [showFinalPortfolio, setShowFinalPortfolio] = useState(false);
  const [showAll6AdSets, setShowAll6AdSets] = useState(false);
  const [showTenAngles, setShowTenAngles] = useState(false);
  const [showFinal6Angles, setShowFinal6Angles] = useState(false);
  const [showUltimate10Ads, setShowUltimate10Ads] = useState(false);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [showWebhookTester, setShowWebhookTester] = useState(false);
  const [showUnsubscribe, setShowUnsubscribe] = useState(false);

  
  // 📱 PWA AUTO-REDIRECT: Pokud user otevře PWA z desktopu a má uložený token
  useEffect(() => {
    // Zjisti jestli jsme v PWA režimu
    const isPWA = window.matchMedia('(display-mode: standalone)').matches ||
                   (window.navigator as any).standalone === true;
    
    // Zjisti jestli jsme na landing page
    const isLandingPage = window.location.pathname === '/' && 
                          (!window.location.hash || window.location.hash === '#');
    
    // Zjisti jestli máme uložený token
    const savedToken = localStorage.getItem('course_access_token');
    
    // Pokud VŠECHNY 3 podmínky platí → redirect do kurzu!
    if (isPWA && isLandingPage && savedToken) {
      console.log('📱 PWA otevřena z desktopu → redirect do kurzu s tokenem:', savedToken);
      window.location.href = `/#course-v3?token=${savedToken}`;
    }
  }, []);
  
  useEffect(() => {
    // 🔐 Check authentication state
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setAuthChecked(true);
      
      // 🚨 SENTRY: Set user context
      if (session?.user) {
        Sentry.setUser({
          id: session.user.id,
          email: session.user.email,
        });
        
        console.log('🚨 Sentry user set:', session.user.email);
      } else {
        Sentry.setUser(null);
      }
    };
    
    checkAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      
      // Update Sentry user context
      if (session?.user) {
        Sentry.setUser({
          id: session.user.id,
          email: session.user.email,
        });
      } else {
        Sentry.setUser(null);
      }
    });
    
    return () => subscription.unsubscribe();
  }, []);
  
  useEffect(() => {
    // Check URL hash for different modes
    const checkHash = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      
      // 🧪 Check for test mode query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const isTestMode = urlParams.get('test') === 'true';
      setOrderPageTestMode(isTestMode);
      
      if (hash.startsWith('#odhlasit-odber') || path === '/odhlasit-odber') {
        setShowUnsubscribe(true);
        setShowWebhookTester(false);
        setShowEmailPreview(false);
        setShowUltimate10Ads(false);
        setShowFinal6Angles(false);
        setShowTenAngles(false);
        setShowAll6AdSets(false);
        setShowFinalPortfolio(false);
        setShowAntiGuruDark(false);
        setShowNewCreativeAds(false);
        setShowAdComparison(false);
        setShowCreativeAds(false);
        setShowAdPreview(false);
        setShowTerms(false);
        setShowGDPR(false);
        setShowThankYou(false);
        setShowOrderExpired(false);
        setShowOrderPage(false);
        setShowChecklist(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
      } else if (hash.startsWith('#test-webhook') || path === '/test-webhook') {
        setShowWebhookTester(true);
        setShowUnsubscribe(false);
        setShowEmailPreview(false);
        setShowUltimate10Ads(false);
        setShowFinal6Angles(false);
        setShowTenAngles(false);
        setShowAll6AdSets(false);
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
      } else if (hash.startsWith('#test-emails') || path === '/test-emails') {
        setShowEmailPreview(true);
        setShowWebhookTester(false);
        setShowUltimate10Ads(false);
        setShowFinal6Angles(false);
        setShowTenAngles(false);
        setShowAll6AdSets(false);
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
      } else if (hash.startsWith('#ultimate-10-ads') || path === '/ultimate-10-ads') {
        setShowUltimate10Ads(true);
        setShowEmailPreview(false);
        setShowFinal6Angles(false);
        setShowTenAngles(false);
        setShowAll6AdSets(false);
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
      } else if (hash.startsWith('#final-6-angles') || path === '/final-6-angles') {
        setShowFinal6Angles(true);
        setShowUltimate10Ads(false);
        setShowTenAngles(false);
        setShowAll6AdSets(false);
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
      } else if (hash.startsWith('#ten-angles') || path === '/ten-angles') {
        setShowTenAngles(true);
        setShowFinal6Angles(false);
        setShowAll6AdSets(false);
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
      } else if (hash.startsWith('#all-ads') || path === '/all-ads') {
        setShowAll6AdSets(true);
        setShowFinal6Angles(false);
        setShowTenAngles(false);
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
      } else if (hash.startsWith('#final-portfolio') || path === '/final-portfolio') {
        setShowFinalPortfolio(true);
        setShowFinal6Angles(false);
        setShowTenAngles(false);
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
      } else if (hash.startsWith('#anti-guru-dark') || path === '/anti-guru-dark') {
        setShowAntiGuruDark(true);
        setShowFinal6Angles(false);
        setShowTenAngles(false);
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
      } else if (hash.startsWith('#dekuji') || path === '/dekuji') {
        setShowThankYou(true);
        setShowGDPR(false);
        setShowTerms(false);
        setShowAdPreview(false);
        setShowCreativeAds(false);
        setShowOrderExpired(false);
        setShowOrderPage(false);
        setShowChecklist(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
      } else if (hash.startsWith('#gdpr') || path === '/gdpr' || path === '/ochrana-udaju' || path === '/ochrana-osobnich-udaju') {
        setShowGDPR(true);
        setShowThankYou(false);
        setShowTerms(false);
        setShowAdPreview(false);
        setShowCreativeAds(false);
        setShowOrderExpired(false);
        setShowOrderPage(false);
        setShowChecklist(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
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
      } else if (hash.startsWith('#priprava') || hash.startsWith('#minikurz') || path === '/priprava' || path === '/minikurz') {
        setShowChecklist(true);
        setShowOrderPage(false);
        setShowOrderExpired(false);
        setShowAdPreview(false);
        setShowCreativeAds(false);
        setShowCourseDemo(false);
        setShowCourseV2(false);
        setShowCourseV3(false);
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
      } else {
        setShowChecklist(false);
        setShowOrderPage(false);
        setShowOrderExpired(false);
        setShowAdPreview(false);
        setShowCreativeAds(false);
        setShowCourseDemo(false);
      }
    };
    
    // Check on mount
    checkHash();
    
    // Listen for hash changes
    window.addEventListener('hashchange', checkHash);
    
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);
  
  // 🔐 AUTO-REDIRECT: If user is authenticated and on landing page, redirect to course
  useEffect(() => {
    if (authChecked && isAuthenticated) {
      // Check if we're on landing page (no special routes)
      const hash = window.location.hash;
      const path = window.location.pathname;
      
      // If on landing page, auto-redirect to course
      if ((!hash || hash === '#') && (path === '/' || path === '')) {
        console.log('🔐 User authenticated, redirecting to course...');
        window.location.hash = '#course-v3';
      }
    }
  }, [authChecked, isAuthenticated]);
  
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
  
  // Show Webhook Tester if URL has #test-webhook
  if (showWebhookTester) {
    return (
      <>
        <CriticalCSS />
        <WebhookTester />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show Unsubscribe Page if URL has #odhlasit-odber
  if (showUnsubscribe) {
    return (
      <>
        <CriticalCSS />
        <UnsubscribePage />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show Email Preview if URL has #test-emails
  if (showEmailPreview) {
    return (
      <>
        <CriticalCSS />
        <EmailPreview />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show Ultimate 13 Ads if URL has #ultimate-10-ads
  if (showUltimate10Ads) {
    return (
      <>
        <CriticalCSS />
        <Ultimate13Ads />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show Final 6 Angles if URL has #final-6-angles
  if (showFinal6Angles) {
    return (
      <>
        <CriticalCSS />
        <Final6Angles />
        <Toaster position="top-right" />
      </>
    );
  }

  // Show Ten New Angles if URL has #ten-angles
  if (showTenAngles) {
    return (
      <>
        <CriticalCSS />
        <TenNewAngles />
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
  
  // Show thank you page if URL has #dekuji or /dekuji
  if (showThankYou) {
    return (
      <>
        <CriticalCSS />
        <ThankYouPage />
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
        <OrderPageFinal testMode={orderPageTestMode} />
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
  
  // Show course if URL has #course, #kurz, /course, /kurz, or /course-v3
  if (showCourseDemo || showCourseV3) {
    return (
      <>
        <DevBadge />
        <CriticalCSS />
        <CourseDemo />
        <InstallPrompt />
        <Toaster position="top-right" />
      </>
    );
  }
  
  return (
    <>
      {/* Dev Badge - malý badge v rohu (pouze v dev mode) */}
      <DevBadge />
      
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
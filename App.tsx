import { ChristmasRemarketingAd } from "./components/ChristmasRemarketingAd"; // ✅ CHRISTMAS AD
import { RemarketingAdsPreview } from "./components/RemarketingAdsPreview"; // ✅ REMARKETING ADS PREVIEW
import { QuizLandingPage } from "./components/QuizLandingPage"; // ✅ QUIZ LANDING PAGE
import { QuizResultsPage } from "./components/QuizResultsPage"; // ✅ QUIZ RESULTS PAGE
import { ActionPlanPreview } from "./components/ActionPlanPreview"; // ✅ ACTION PLAN PDF
import { KonzultacePage } from "./components/KonzultacePage"; // ✅ FREE KONZULTACE PAGE
import { StickyQuizButton } from "./components/StickyQuizButton"; // ✅ STICKY QUIZ BUTTON
import { ZasilkovnaBusinessModel } from "./components/ZasilkovnaBusinessModel"; // ✅ ZASILKOVNA BUSINESS MODEL
import { QuizTestPage } from "./components/QuizTestPage"; // ✅ QUIZ TEST PAGE

import { HeroSection } from "./components/HeroSection";
import { ProblemsSectionCompact } from "./components/ProblemsSectionCompact";
import { SolutionIntroSection } from "./components/SolutionIntroSection";
import { OptimizedCombinedSectionV2 } from "./components/OptimizedCombinedSectionV2";
import { SwipeableTestimonials } from "./components/SwipeableTestimonials";
import { CompactCaseStudySection } from "./components/CompactCaseStudySection";
import { CountdownBanner } from "./components/CountdownBanner";
import { PrelaunchEmailCapture } from "./components/PrelaunchEmailCapture";
import { EarlyAccessSale } from "./components/EarlyAccessSale";

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
import ExportAds from "./components/ExportAds";
import { AdComparison } from "./pages/AdComparison";
import OrderPage from "./components/OrderPage";
import OrderPageFinal from "./components/OrderPageFinal";
import TermsPage from "./components/TermsPage";
import GDPRPage from "./components/GDPRPage";
import ThankYouPage from "./components/ThankYouPage";
import EmailPreview from "./components/EmailPreview";
import WebhookTester from "./components/WebhookTester";
import UnsubscribePage from "./pages/UnsubscribePage";
import FBPageAssets from "./components/FBPageAssets";
import OrganicPosts from "./components/OrganicPosts";
import { OrganicPostsVideos } from "./components/OrganicPostsVideos";
import AdOptimizationWeek1 from "./components/AdOptimizationWeek1";
import StoriesAds from "./components/StoriesAds";
import { Value3AdsPreview } from "./components/Value3AdsPreview";
import { Omnipresent10AdsPreview } from "./components/Omnipresent10AdsPreview";
import { Value3Versions } from "./components/Value3Versions";
import { Value3NewDesigns } from "./components/Value3NewDesigns";
import { Value3MediumDesigns } from "./components/Value3MediumDesigns";

import { Analytics } from "./components/Analytics";
import { AnalyticsTracking } from "./components/AnalyticsTracking";
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
import { initMetaPixel, trackPageView } from "./lib/metaPixel";
import { initAllAnalytics } from "./lib/analytics";

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
  const [showFBAssets, setShowFBAssets] = useState(false);
  const [showExportAds, setShowExportAds] = useState(false);
  const [showOrganicPosts, setShowOrganicPosts] = useState(false);
  const [showAdOptimization, setShowAdOptimization] = useState(false);
  const [showStoriesAds, setShowStoriesAds] = useState(false);
  const [showValue3Ads, setShowValue3Ads] = useState(false);
  const [showOmnipresent10, setShowOmnipresent10] = useState(false);
  const [showOrganicVideos, setShowOrganicVideos] = useState(false);
  const [showValue3Versions, setShowValue3Versions] = useState(false);
  const [showValue3NewDesigns, setShowValue3NewDesigns] = useState(false);
  const [showValue3MediumDesigns, setShowValue3MediumDesigns] = useState(false);
  const [showKonzultace, setShowKonzultace] = useState(false);
  const [showZasilkovnaModel, setShowZasilkovnaModel] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showQuizResults, setShowQuizResults] = useState(false); // ✅ NOVÝ - kvíz výsledky
  const [showActionPlans, setShowActionPlans] = useState(false); // ✅ PDF Preview
  const [showZaloha, setShowZaloha] = useState(false); // ✅ BACKUP: Original landing page
  const [showRemarketingAds, setShowRemarketingAds] = useState(false); // ✅ REMARKETING ADS
  const [showQuizTest, setShowQuizTest] = useState(false); // ✅ QUIZ TEST PAGE
  
  // 📊 META PIXEL: Inicializace
  useEffect(() => {
    initMetaPixel();
    trackPageView();
    console.log('🎯 Meta Pixel inicializován a PageView tracked!');
  }, []);
  
  // 📊 ANALYTICS: Inicializace GA4 + Clarity
  useEffect(() => {
    initAllAnalytics();
  }, []);
  
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
    
    // Pokud VŠECHNY 3 podmínky platí  redirect do kurzu!
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
      
      if (hash.startsWith('#action-plans') || path === '/action-plans') {
        setShowActionPlans(true);
        setShowQuiz(false);
        setShowZasilkovnaModel(false);
        setShowKonzultace(false);
      } else if (hash.startsWith('#quiz-test') || path === '/quiz-test') {
        setShowQuizTest(true);
        setShowActionPlans(false);
        setShowQuiz(false);
        setShowZasilkovnaModel(false);
        setShowKonzultace(false);
      } else if (hash.startsWith('#zaloha') || path === '/zaloha') {
        setShowZaloha(true);
      } else if (hash.startsWith('#zasilkovna') || path === '/zasilkovna' || hash.startsWith('#business-model-zasilkovna') || path === '/business-model-zasilkovna') {
        setShowZasilkovnaModel(true);
        setShowKonzultace(false);
        setShowQuiz(false);
        setShowAdOptimization(false);
        setShowStoriesAds(false);
        setShowOrganicPosts(false);
        setShowFBAssets(false);
        setShowUnsubscribe(false);
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
      } else if (hash.startsWith('#kviz') || path === '/kviz') {
        setShowQuiz(true);
        setShowQuizResults(false); // ✅ Vypnout výsledky když se zobrazuje kvíz
        setShowZasilkovnaModel(false);
        setShowKonzultace(false);
        setShowAdOptimization(false);
        setShowStoriesAds(false);
        setShowOrganicPosts(false);
        setShowFBAssets(false);
        setShowUnsubscribe(false);
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
      } else if (path === '/kviz/vysledky') {
        // ✅ NOVÝ ROUTING pro výsledkovou stránku
        setShowQuizResults(true);
        setShowQuiz(false);
        setShowZasilkovnaModel(false);
        setShowKonzultace(false);
      } else if (hash.startsWith('#konzultace') || path === '/konzultace') {
        setShowKonzultace(true);
        setShowQuiz(false);
        setShowZasilkovnaModel(false);
        setShowAdOptimization(false);
        setShowStoriesAds(false);
        setShowOrganicPosts(false);
        setShowFBAssets(false);
        setShowUnsubscribe(false);
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
      } else if (hash.startsWith('#ad-optimization') || path === '/ad-optimization') {
        setShowAdOptimization(true);
        setShowStoriesAds(false);
        setShowOrganicPosts(false);
        setShowFBAssets(false);
        setShowUnsubscribe(false);
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
      } else if (hash.startsWith('#stories-ads') || path === '/stories-ads') {
        setShowStoriesAds(true);
        setShowAdOptimization(false);
        setShowOrganicPosts(false);
        setShowValue3Ads(false);
      } else if (hash.startsWith('#value-ads') || path === '/value-ads') {
        setShowValue3Ads(true);
        setShowStoriesAds(false);
        setShowAdOptimization(false);
        setShowOrganicPosts(false);
        setShowFBAssets(false);
        setShowOmnipresent10(false);
      } else if (hash.startsWith('#omnipresent-10') || path === '/omnipresent-10') {
        setShowOmnipresent10(true);
        setShowValue3Ads(false);
        setShowStoriesAds(false);
        setShowAdOptimization(false);
        setShowOrganicPosts(false);
        setShowFBAssets(false);
        setShowValue3Versions(false);
      } else if (hash.startsWith('#value3-versions') || path === '/value3-versions') {
        setShowValue3Versions(true);
        setShowOmnipresent10(false);
        setShowValue3Ads(false);
        setShowStoriesAds(false);
        setShowAdOptimization(false);
        setShowOrganicPosts(false);
        setShowFBAssets(false);
      } else if (hash.startsWith('#value3-new-designs') || path === '/value3-new-designs') {
        setShowValue3NewDesigns(true);
        setShowValue3Versions(false);
        setShowOmnipresent10(false);
        setShowValue3Ads(false);
        setShowStoriesAds(false);
        setShowAdOptimization(false);
        setShowOrganicPosts(false);
        setShowFBAssets(false);
      } else if (hash.startsWith('#value3-medium-designs') || path === '/value3-medium-designs') {
        setShowValue3MediumDesigns(true);
        setShowValue3NewDesigns(false);
        setShowValue3Versions(false);
        setShowOmnipresent10(false);
        setShowValue3Ads(false);
        setShowStoriesAds(false);
        setShowAdOptimization(false);
        setShowOrganicPosts(false);
        setShowFBAssets(false);
      } else if (hash.startsWith('#remarketing') || path === '/remarketing') {
        setShowRemarketingAds(true);
        setShowValue3MediumDesigns(false);
        setShowValue3NewDesigns(false);
        setShowValue3Versions(false);
        setShowOmnipresent10(false);
        setShowValue3Ads(false);
        setShowStoriesAds(false);
        setShowAdOptimization(false);
        setShowOrganicPosts(false);
        setShowFBAssets(false);
      } else if (hash.startsWith('#organic-posts') || path === '/organic-posts') {
        setShowOrganicPosts(true);
        setShowOrganicVideos(false);
        setShowStoriesAds(false);
        setShowAdOptimization(false);
        setShowFBAssets(false);
        setShowUnsubscribe(false);
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
      } else if (hash.startsWith('#organic-videos') || path === '/organic-videos') {
        setShowOrganicVideos(true);
        setShowOrganicPosts(false);
        setShowStoriesAds(false);
        setShowAdOptimization(false);
        setShowFBAssets(false);
        setShowUnsubscribe(false);
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
      } else if (hash.startsWith('#export-ads') || path === '/export-ads') {
        setShowExportAds(true);
        setShowOrganicPosts(false);
        setShowFBAssets(false);
        setShowUnsubscribe(false);
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
      } else if (hash.startsWith('#fb-assets') || path === '/fb-assets') {
        setShowFBAssets(true);
        setShowUnsubscribe(false);
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
      } else if (hash.startsWith('#odhlasit-odber') || path === '/odhlasit-odber') {
        setShowUnsubscribe(true);
        setShowFBAssets(false);
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
  
  // 🔐 AUTO-REDIRECT: DISABLED - User can see landing page even when authenticated
  // useEffect(() => {
  //   if (authChecked && isAuthenticated) {
  //     // Check if we're on landing page (no special routes)
  //     const hash = window.location.hash;
  //     const path = window.location.pathname;
  //     
  //     // If on landing page, auto-redirect to course
  //     if ((!hash || hash === '#') && (path === '/' || path === '')) {
  //       console.log('🔐 User authenticated, redirecting to course...');
  //       window.location.hash = '#course-v3';
  //     }
  //   }
  // }, [authChecked, isAuthenticated]);
  
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
  
  // Show Export Ads if URL has #export-ads
  if (showExportAds) {
    return (
      <>
        <CriticalCSS />
        <ExportAds />
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
  
  // Show Organic Posts if URL has #organic-posts
  if (showOrganicPosts) {
    return (
      <>
        <CriticalCSS />
        <OrganicPosts />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show Organic Videos if URL has #organic-videos
  if (showOrganicVideos) {
    return (
      <>
        <CriticalCSS />
        <OrganicPostsVideos />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show Ad Optimization if URL has #ad-optimization
  if (showAdOptimization) {
    return (
      <>
        <CriticalCSS />
        <AdOptimizationWeek1 />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show Stories Ads if URL has #stories-ads
  if (showStoriesAds) {
    return (
      <>
        <CriticalCSS />
        <StoriesAds />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show VALUE 3 Ads if URL has #value-ads
  if (showValue3Ads) {
    return (
      <>
        <CriticalCSS />
        <Value3AdsPreview />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show OMNIPRESENT 10 Ads if URL has #omnipresent-10
  if (showOmnipresent10) {
    return (
      <>
        <CriticalCSS />
        <Omnipresent10AdsPreview />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show VALUE 3 Design Versions if URL has #value3-versions
  if (showValue3Versions) {
    return (
      <>
        <CriticalCSS />
        <Value3Versions />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show VALUE 3 New Designs if URL has #value3-new-designs
  if (showValue3NewDesigns) {
    return (
      <>
        <CriticalCSS />
        <Value3NewDesigns />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show VALUE 3 Medium Designs if URL has #value3-medium-designs
  if (showValue3MediumDesigns) {
    return (
      <>
        <CriticalCSS />
        <Value3MediumDesigns />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show FB Assets if URL has #fb-assets
  if (showFBAssets) {
    return (
      <>
        <CriticalCSS />
        <FBPageAssets />
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

  // Show creative ads if URL has #kreativni-reklamy (MÉ KREATIVN!)
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
  
  // Show Konzultace page if URL has #konzultace or /konzultace
  if (showKonzultace) {
    return (
      <>
        <CriticalCSS />
        <KonzultacePage />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show Quiz page if URL has #kviz or /kviz
  if (showQuiz) {
    return (
      <>
        <CriticalCSS />
        <QuizLandingPage />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // ✅ Show Quiz Results page if URL has /kviz/vysledky
  if (showQuizResults) {
    return (
      <>
        <CriticalCSS />
        <QuizResultsPage />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show Action Plans Preview if URL has #action-plans
  if (showActionPlans) {
    return (
      <>
        <CriticalCSS />
        <ActionPlanPreview />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show Zásilkovna Business Model if URL has #zasilkovna or /zasilkovna
  if (showZasilkovnaModel) {
    return (
      <>
        <CriticalCSS />
        <ZasilkovnaBusinessModel />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show Remarketing Ads if URL has #remarketing or /remarketing
  if (showRemarketingAds) {
    return (
      <>
        <CriticalCSS />
        <RemarketingAdsPreview />
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
        <CourseDemoV3 /> {/* ✅ FIXED: Changed from CourseDemo to CourseDemoV3 */}
        <InstallPrompt />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // Show Zaloha landing page if URL has #zaloha or /zaloha (BACKUP ORIGINAL HOMEPAGE)
  if (showZaloha) {
    return (
      <>
        <CriticalCSS />
        <ZalohaLanding />
        <Toaster position="top-right" />
      </>
    );
  }
  
  // ✅ DEFAULT HOMEPAGE: Původní landing page (omnipresent kampaň běží s CTA na koupi)
  const handleQuizComplete = async (result: any, email: string, answers: Record<string, number>) => {
    try {
      const response = await fetch('/.netlify/functions/quiz-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: '',
          quizType: result.category === 'beginner' ? 'beginner' : 'existing',
          answers,
          result
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }
      
      console.log('✅ Quiz submitted successfully');
    } catch (error) {
      console.error('❌ Quiz submission error:', error);
    }
  };
  
  return (
    <>
      {/* Dev Badge - malý badge v rohu (pouze v dev mode) */}
      <DevBadge />
      
      {/* Critical CSS for performance */}
      <CriticalCSS />
      
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
      
      {/* Toast notifikace */}
      <Toaster position="top-right" />
      
      {/* Cookie consent banner */}
      <CookieConsent />
      
      {/* ✅ STICKY QUIZ BUTTON - Shows after scrolling 400px */}
      <StickyQuizButton onClick={() => {
        // Open quiz modal (need to add state and handler)
        window.location.href = '/kviz';
      }} />
    </div>
    </>
  );
}
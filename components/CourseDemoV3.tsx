import { useState, useEffect, useMemo, useCallback } from "react";
import { BookOpen, ArrowLeft, Trophy, Lock, CheckCircle2, Play, Menu, X, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import { supabase, verifyAccessToken } from "../lib/supabase";
import { loadCourseProgress, saveLessonProgress, resetAllProgress } from "../lib/courseProgress";
import { trackCourseEvent } from "../lib/sentry";
import { BusinessModelCanvasSimple } from "./BusinessModelCanvasSimple";
import { GuidedTour, scrollToSection } from "./GuidedTour";
import { SimpleDashboard } from "./SimpleDashboard";
import { BusinessActionPlan } from "./BusinessActionPlan";
import { CourseSidebar } from "./CourseSidebar";
import { MobileSidebarContent } from "./MobileSidebarContent";
import { TargetCalculatorTool } from "./TargetCalculatorTool";
import { SegmentSizeTool } from "./SegmentSizeTool";
import { MobileCanvasAccordion } from "./MobileCanvasAccordion";
import { MobileSingleSection } from "./MobileSingleSection";
import { CanvasValidator } from "./CanvasValidator";
import { ProfitCalculator } from "./ProfitCalculator";
import { ProblemSolver } from "./ProblemSolver";
import { LessonContentRenderer } from "./LessonContentRenderer";
import { BusinessModelGallery } from "./BusinessModelGallery";
import { SimpleBusinessExamples } from "./SimpleBusinessExamples";
import { ValuePropositionCanvas } from "./ValuePropositionCanvas";
import { FitValidatorV2 } from "./FitValidatorV2";
import { MODULE_3 } from "./module3-data";
import { SegmentSelector } from "./SegmentSelector";
import { VPCCustomerProfile } from "./VPCCustomerProfile";
import { VPCValueMap } from "./VPCValueMap";
import { VPCValueMapSquare } from "./VPCValueMapSquare";
import { VPCCustomerProfileCircle } from "./VPCCustomerProfileCircle";
import { VPCCustomerProfileStory } from "./VPCCustomerProfileStory";
import { AutosaveIndicator } from "./AutosaveIndicator";
import { AchievementNotification } from "./AchievementNotification";
import { PullToRefresh } from "./PullToRefresh";
import { SwipeLessonNavigation, useSwipeNavigation } from "./SwipeLessonNavigation";
import { celebrateModuleComplete, celebrateLessonComplete } from "../lib/confetti";
import { getAchievement, unlockAchievement, loadUnlockedAchievements, loadUnlockedAchievementsFromDB, ACHIEVEMENTS } from "../lib/achievements";
import type { Achievement } from "../lib/achievements";
import { useOrientation } from "../lib/useOrientation";
import { MobileCourseModule1 } from "./mobile-course/MobileCourseModule1";
import { MobileCourseModule2 } from "./mobile-course/MobileCourseModule2";
import { MobileCourseModule3 } from "./mobile-course/MobileCourseModule3";
import { MobileCourseDashboard } from "./mobile-course/MobileCourseDashboard";
import { MobileCourseSidebar } from "./mobile-course/MobileCourseSidebar";
import { MobileTargetCalculatorTool } from "./mobile-course/MobileTargetCalculatorTool";
import { MobileSegmentSizeTool } from "./mobile-course/MobileSegmentSizeTool";
import { MobileBusinessActionPlan } from "./mobile-course/MobileBusinessActionPlan";
import { WelcomeModal } from "./WelcomeModal";

// 📱 MOBILE DETECTION HOOK
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768; // Tailwind md breakpoint
      console.log('📱 Mobile check:', { width: window.innerWidth, isMobile: mobile });
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}

// Verify token
async function verifyToken(token: string) {
  const user = await verifyAccessToken(token);
  if (!user) return null;
  return user;
}

// 📚 MODUL 1: Základy byznys modelu (9 lekcí)
const MODULE_1 = {
  id: 1,
  title: "Základy byznys modelu",
  description: "Naučte se všech 9 stavebních bloků byznys modelu",
  lessons: [
    {
      id: 1,
      title: "Zákaznické segmenty",
      canvasSection: "segments",
      videoUrl: "",
      description: "Kdo jsou vaši zákazníci? Naučte se je identifikovat.",
      content: `
        <h3>👥 Co je to Zákaznický segment?</h3>
        <p><strong>Zákaznický segment</strong> je konkrétní skupina lidí, která má <strong>stejný problém</strong> a za jeho řešení jsou ochotni <strong>platit</strong>.</p>
        
        <h4>🎯 Jak identifikovat vaše segmenty (krok za krokem):</h4>
        
        <p><strong>KROK 1: Zamyslete se nad problémem</strong></p>
        <p class="text-sm text-gray-600 ml-4">Jaký problém řešíte? Kdo ho pravděpodobně má?</p>
        
        <p class="mt-3"><strong>KROK 2: Máte už data?</strong></p>
        
        <div class="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 my-3">
          <p class="text-blue-900"><strong>✅ MÁM DATA</strong> (už prodávám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Podívejte se na tržby - <strong>komu prodáváte nejvíc?</strong></li>
            <li>Kdo nakupuje <strong>nejčastěji?</strong> Kdo utrácí <strong>nejvíc?</strong></li>
            <li>Příklad: "Profesionálky 30-50 let mi dělají 60% tržeb"</li>
          </ul>
        </div>
        
        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 my-3">
          <p class="text-amber-900"><strong>🚀 NEMÁM DATA</strong> (teprve začínám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Napište si <strong>2-3 hypotézy</strong> - kdo by mohl mít ten problém?</li>
            <li>Příklad: "Myslím že zaneprázdněné maminky (30-40 let) s dětmi"</li>
            <li><strong>Najděte je online</strong> (FB skupiny, fóra, Instagram)</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 3: Validujte to!</strong></p>
        <p class="text-sm text-gray-600 ml-4">Zeptejte se 10 lidí z té skupiny</p>
        <ul class="text-sm text-gray-600 ml-8 mt-1">
          <li>"Řešíte tento problém?"</li>
          <li>"Kolik vás to stojí času/peněz?"</li>
          <li>"Kolik byste byli ochotni zaplatit za řešení?"</li>
        </ul>
        
        <p class="mt-3"><strong>KROK 4: Buďte KONKRÉTNÍ!</strong></p>
        <p class="text-sm text-gray-600 ml-4">❌ Špatně: "Ženy", "Mladí lidé", "Firmy"</p>
        <p class="text-sm text-gray-600 ml-4">✅ Dobře: "Profesionálky 30-50 let které spěchají do práce a potřebují rychlé řešení"</p>
        
        <div class="bg-purple-50 border-2 border-purple-300 rounded-xl p-4 my-4">
          <p class="text-purple-900"><strong>💡 TIP:</strong> Začněte s <strong>1-2 segmenty</strong> a zaměřte se na ty co vám vydělávají (nebo budou vydělávat) nejvíc peněz. Lepší je dokonale obsloužit 2 segmenty než špatně 10!</p>
        </div>
        
        <h4>Proč je to důležité?</h4>
        <p>Nemůžete prodávat všem! Když budete mít <strong>2-3 konkrétní segmenty</strong> místo "všichni", dokážete:</p>
        <ul>
          <li>✅ <strong>Lépe cílit reklamu</strong> - víte kde je najít a co jim nabídnout</li>
          <li>✅ <strong>Vyšší cenu</strong> - konkrétní řešení = vyšší hodnota pro zákazníka</li>
          <li>✅ <strong>Rychlejší růst</strong> - zaměříte energii na ty správné lidi</li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ: Logika barev!</h4>
        <p><strong>Každý segment = jedna barva.</strong> Barva sleduje cestu: 🔵 Segment → 🔵 Hodnota → 🔵 Kanál → 🔵 Příjem</p>
        <p>Díky tomu <strong>na první pohled vidíte</strong> co prodáváte komu, kde a za kolik! 🎯</p>
      `,
      examples: {
        good: [
          "🍕 Pizzerie: Rodiny s dětmi 5-12 let (hledají rychlé rozvážky)",
          "🔧 Autoservis: Majitelé aut 5+ let starých (potřebují opravy)",
          "👗 E-shop: Ženy 25-40 let sledující módu (chtějí trendy oblečení)",
          "💇 Kadeřnice: Profesionálky 30-50 let (šetří čas, chtějí kvalitu)"
        ],
        bad: [
          "Všichni co mají hlad",
          "Lidé s auty",
          "Ženy",
          "Zákazníci"
        ]
      },
      tips: [
        "💡 Buďte KONKRÉTNÍ: věk, situace, bolest, kde je najdete",
        "🎨 Každý segment = JEDNA BARVA (např. 🔵 rodiny, 🟢 profesionálky)",
        "🚀 Začínající: Začněte s 1 segmentem, až budete mít data přidejte další",
        "💰 Už podnikám: Zaměřte se na top 2-3 segmenty co vydělávají nejvíc",
        "💬 Validujte! FB skupiny, fóra, Instagram - zjistěte jestli ten problém opravdu mají"
      ],
      showDemo: false
    },
    {
      id: 2,
      title: "Hodnotová nabídka",
      canvasSection: "value",
      videoUrl: "",
      description: "Co nabízíte a proč si vybrat právě vás?",
      content: `
        <h3>💎 Co je to Hodnotová nabídka?</h3>
        <p><strong>Hodnotová nabídka</strong> = produkt/služba + <strong>proč si vybrat právě VÁS</strong> místo konkurence.</p>
        
        <h4>⚠️ POZOR: Produkt ≠ Hodnota!</h4>
        <p>❌ <strong>Špatně:</strong> "Prodávám pizzu" (to prodává každý)</p>
        <p>✅ <strong>Správně:</strong> "Rodinná pizza XXL + dětské menu zdarma za 20 min" (proto si vyberou VÁS!)</p>
        
        <h4>🎯 Jak vytvořit hodnotu (krok za krokem):</h4>
        
        <p><strong>KROK 1: Začněte produktem</strong></p>
        <p class="text-sm text-gray-600 ml-4">Co konkrétně prodáváte? (pizza, servis, kurz, oblečení...)</p>
        
        <p class="mt-3"><strong>KROK 2: Máte už data?</strong></p>
        
        <div class="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 my-3">
          <p class="text-blue-900"><strong>✅ MÁM DATA</strong> (už prodávám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Zeptejte se TOP 10 zákazníků <strong>"Proč si nás vybíráte?"</strong></li>
            <li>Jejich odpověď = vaše hodnota!</li>
            <li>Příklad: "Protože mi to stihnete do večera" → Hodnota = Rychlost</li>
          </ul>
        </div>
        
        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 my-3">
          <p class="text-amber-900"><strong>🚀 NEMÁM DATA</strong> (teprve začínám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Napište si <strong>hypotézu</strong> - co by zákazníka motivovalo k nákupu?</li>
            <li>Příklad: "Myslím že rodiny chtějí rychlou rozvážku do 20 min"</li>
            <li>Zjistěte co nabízí konkurence a <strong>čím se lišíte</strong></li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 3: Přidejte benefit + unikátnost</strong></p>
        <p class="text-sm text-gray-600 ml-4"><strong>Produkt</strong> + Proč je to užitečné? + Proč právě VY?</p>
        <p class="text-sm text-gray-600 ml-4">Příklad: "Pizza XXL" + "nasytí celou rodinu" + "za 20 min u vás doma"</p>
        
        <p class="mt-3"><strong>KROK 4: Validujte to!</strong></p>
        <p class="text-sm text-gray-600 ml-4">Nabídněte pre-order nebo MVP - platí lidé za to? Pokud ano, máte hodnotu! ✅</p>
        
        <div class="bg-purple-50 border-2 border-purple-300 rounded-xl p-4 my-4">
          <p class="text-purple-900"><strong>💡 TIP:</strong> Stejný produkt (pizza) může mít <strong>různé hodnoty</strong> pro různé segmenty! 🔵 Rodiny chtějí rychlost + objem, 🟢 studenti chtějí cenu.</p>
        </div>
        
        <h4>Proč je to důležité?</h4>
        <p>Když víte <strong>PROČ si vás zákazníci vybírají</strong>, můžete:</p>
        <ul>
          <li>✅ <strong>Vidět CO prodáváte KOMU</strong> - každá hodnota má svou barvu = svého zákazníka</li>
          <li>✅ <strong>Zaměřit se na top příjmy</strong> - ne všechny produkty vydělávají stejně!</li>
          <li>✅ <strong>Jasně komunikovat</strong> - když víte "proč VY", snadno to sdělíte zákazníkům</li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ: Logika barev!</h4>
        <p><strong>Každá hodnota = barva segmentu</strong>, kterému ji prodáváte:</p>
        <ul>
          <li><strong>🔵 Modrý segment</strong> (Rodiny) → <strong>🔵 modrá hodnota</strong> (Pizza XXL + dětské menu zdarma za 20 min)</li>
          <li><strong>🟢 Zelený segment</strong> (Studenti) → <strong>🟢 zelená hodnota</strong> (Pizza slice 40 Kč + rozvoz do 15 min)</li>
        </ul>
        <p class="text-sm text-gray-600 mt-2">💡 Vidíte? Stejný produkt (pizza), ale <strong>jiná hodnota</strong> pro každý segment!</p>
      `,
      examples: {
        good: [
          "🍕 Pizzerie (🔵 Rodiny): Rodinná pizza XXL + dětské menu zdarma",
          "🔧 Autoservis (🟢 Majitelé starších aut): Servis za 1 den + náhradní vůz zdarma",
          "👗 E-shop (🟡 Módní ženy): Nové kolekce každý týden + vrácení do 60 dní",
          "💇 Kadeřnice (🟣 Profesionálky): Večerní termíny 18-21h + střih 30 min"
        ],
        bad: [
          "Kvalitní jídlo",
          "Rychlý servis",
          "Trendy oblečení",
          "Profesionální služby"
        ]
      },
      tips: [
        "🎨 Stejná barva jako segment (🔵 rodiny → 🔵 Pizza XXL + dětské menu zdarma za 20 min)",
        "💎 Hodnota NENÍ produkt! Je to produkt + BENEFIT + unikátnost",
        "🎯 Ptejte se: 'Proč právě MY?' - odpověď je vaše hodnota",
        "📊 Více hodnot pro jeden segment = diverzifikace příjmů"
      ]
    },
    {
      id: 3,
      title: "Kanály",
      canvasSection: "channels",
      videoUrl: "",
      description: "Jak se dostáváte k zákazníkům?",
      content: `
        <h3>📢 Co jsou to Kanály?</h3>
        <p><strong>Kanály</strong> jsou místa a způsoby, kterými <strong>oslovujete zákazníky</strong> a dodáváte jim hodnotu. Jednoduše: <strong>Kde zákazníky najdete?</strong></p>
        
        <h4>🎯 Jak najít správné kanály (krok za krokem):</h4>
        
        <p><strong>KROK 1: Kde se pohybují vaši zákazníci?</strong></p>
        <p class="text-sm text-gray-600 ml-4">Instagram? Facebook skupiny? Doporučení? Google?</p>
        
        <p class="mt-3"><strong>KROK 2: Máte už data?</strong></p>
        
        <div class="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 my-4">
          <p class="text-blue-900"><strong>✅ MÁM DATA</strong> (už prodávám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Zeptejte se 20 zákazníků: <strong>"Kde jste nás našli?"</strong></li>
            <li>Podívejte se do analytics (FB, Google, IG...)</li>
            <li>Příklad: "80% zákazníků nás našlo přes Instagram stories"</li>
          </ul>
        </div>
        
        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 my-4">
          <p class="text-amber-900"><strong>🚀 NEMÁM DATA</strong> (teprve začínám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li><strong>Hypotéza:</strong> Kde se pohybuje váš segment?</li>
            <li>Příklad: "Myslím že rodiny jsou v FB skupinách 'Maminky v Praze'"</li>
            <li><strong>Zjistěte kde je konkurence</strong> - tam jsou i zákazníci!</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 3: Testujte!</strong></p>
        <p class="text-sm text-gray-600 ml-4"><strong>Vyberte 2-3 kanály</strong> a testujte 2 týdny. Co přináší zákazníky?</p>
        <ul class="text-sm text-gray-600 ml-8 mt-1">
          <li>Měřte reakce (kliknutí, zprávy, objednávky)</li>
          <li>Pokud nefunguje → zkuste jiný kanál!</li>
        </ul>
        
        <p class="mt-3"><strong>KROK 4: ZAČNĚTE S JEDNÍM!</strong></p>
        <p class="text-sm text-gray-600 ml-4">❌ Chyba: být všude (vyhoříte!)</p>
        <p class="text-sm text-gray-600 ml-4">✅ Správně: 1 kanál dobře > 5 kanálů špatně</p>
        
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 rounded-xl p-4 my-4">
          <p class="text-purple-900 flex items-start gap-2">
            <span class="text-2xl">💡</span>
            <span><strong>TIP</strong></span>
          </p>
          <p class="text-sm text-gray-700 mt-3"><strong>Začínám:</strong> Začněte s organickými kanály (FB skupiny, doporučení, Google My Business). Reklamy až když víte CO FUNGUJE!</p>
          <p class="text-sm text-gray-700 mt-2"><strong>Už podnikám:</strong> Analyzujte data! Možná 80% zákazníků přichází z 20% kanálů. Zaměřte se na ty top!</p>
        </div>
        
        <h4>Proč jsou kanály důležité?</h4>
        <ul>
          <li>✅ <strong>Ušetříte čas</strong> - nebudete ztrácet čas tam, kde nejsou zákazníci</li>
          <li>✅ <strong>Ušetříte peníze</strong> - investujete jen do kanálů co fungují</li>
          <li>✅ <strong>Vidíte kde růst</strong> - když kanál funguje, můžete do něj víc investovat</li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ: Logika barev!</h4>
        <p><strong>Každý kanál = barva segmentu</strong>, který tam oslovujete:</p>
        <ul>
          <li><strong>🔵 Modrý segment</strong> (Rodiny) → <strong>🔵 modrý kanál</strong> (Instagram stories, FB skupiny Maminky)</li>
          <li><strong>🟢 Zelený segment</strong> (Studenti) → <strong>🟢 zelený kanál</strong> (TikTok, studentské slevy)</li>
        </ul>
        <p class="text-sm text-gray-600 mt-2">💡 Stejný kanál (Instagram) může oslovovat <strong>různé segmenty</strong> - použijte barvu podle toho!</p>
      `,
      examples: {
        good: [
          "🍕 Pizzerie (🔵 Rodiny): Instagram stories + Wolt/Foodora rozvoz",
          "🔧 Autoservis (🟢 Starší auta): Doporučení + lokální Facebook skupina",
          "👗 E-shop (🟡 Móda): Instagram + Pinterest + TikTok",
          "💇 Kadeřnice (🟣 Profesionálky): LinkedIn + Google (hledají večerní termíny)"
        ],
        bad: [
          "Internet",
          "Facebook",
          "Reklama",
          "Online marketing"
        ]
      },
      tips: [
        "🎨 BARVA = segment! (🔵 rodiny → 🔵 Instagram stories + FB skupiny Maminky)",
        "📍 Buďte tam KDE jsou zákazníci, ne kde chcete vy být!",
        "🚀 Začínající: ORGANICKÉ kanály (FB skupiny, doporučení) → levné a efektivní!",
        "💰 Už podnikám: Analyzujte data - investujte do top kanálů!",
        "🎯 ZAČNĚTE S JEDNÍM kanálem a perfektně ho zvládněte!"
      ]
    },
    {
      id: 4,
      title: "Vztahy se zákazníky",
      canvasSection: "relationships",
      videoUrl: "",
      description: "Jaký vztah budujete se zákazníky?",
      content: `
        <h3>❤️ Co jsou Vztahy se zákazníky?</h3>
        <p><strong>Vztahy</strong> určují jak <strong>získáváte, udržujete a motivujete</strong> zákazníky k opakovaným nákupům. Jednoduše: <strong>Jak je přimějete vrátit se ZNOVU?</strong></p>
        
        <h4>⚡ PROČ JE TO KLÍČOVÉ?</h4>
        <p><strong>Získat nového zákazníka stojí 5-10× více</strong> než udržet stávajícího! Opakovaný zákazník = <strong>základ vašeho byznysu</strong>.</p>
        
        <h4>🎯 Jak "zamknout" zákazníky (krok za krokem):</h4>
        
        <p><strong>KROK 1: Proč se vrací?</strong></p>
        <p class="text-sm text-gray-600 ml-4">Co je motivuje k opakovaným nákupům?</p>
        
        <p class="mt-3"><strong>KROK 2: Máte už data?</strong></p>
        
        <div class="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 my-3">
          <p class="text-blue-900"><strong>✅ MÁM DATA</strong> (už prodávám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Analyzujte <strong>kdo se vrací</strong> a kdo nakupuje jen jednou</li>
            <li>Zeptejte se TOP 10 opakovaných zákazníků: <strong>"Proč se vracíte právě k nám?"</strong></li>
            <li>Příklad: "Vrací se rodiny které využívají věrnostní kartu"</li>
          </ul>
        </div>
        
        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 my-3">
          <p class="text-amber-900"><strong>🚀 NEMÁM DATA</strong> (teprve začínám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li><strong>Hypotéza:</strong> Co by je mohlo motivovat k návratu?</li>
            <li>Příklad: "Myslím že rodiny se vrátí pokud budou spokojené s kvalitou a rychlostí"</li>
            <li><strong>Podívejte se na konkurenci</strong> - proč zákazníci odcházejí?</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 3: Vyberte MECHANISMUS "zamčení"</strong></p>
        <p class="text-sm text-gray-600 ml-4">Jak si je "uzamknete" aby nemohli jít ke konkurenci?</p>
        
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-400 rounded-xl p-5 my-4">
          <p class="text-blue-900"><strong>🔒 7 OSVĚDČENÝCH ZPŮSOBŮ jak udržet zákazníky:</strong></p>
          <ul class="text-sm text-gray-700 ml-4 mt-3 space-y-2 no-bullet">
            <li><strong>1️⃣ NEJDŮLEŽITĚJŠÍ: Perfektní produkt/služba!</strong> → Když jste spokojení, vrátíte se sami! Bez toho nic nefunguje.</li>
            <li><strong>2️⃣ Personalizace a paměť</strong> → "Víme co máte rádi - máme to připravené!" (kadeřnice si pamatuje vaš styl)</li>
            <li><strong>3️⃣ Automatické připomínky</strong> → SMS/Email: "Čas na servis! Máme pro vás termín..." (ušetříte jim starosti)</li>
            <li><strong>4️⃣ Pravidelné rezervace</strong> → "Rezervace každých 6 týdnů automaticky" (pohodlí!)</li>
            <li><strong>5️⃣ Předplatné/členství</strong> → "Roční servisní balíček -30%" (motivace k dlouhodobé spolupráci)</li>
            <li><strong>6️⃣ Exkluzivní přístup pro stálé</strong> → "Early access k novinkám jen pro vás" (pocit výjimečnosti!)</li>
            <li><strong>7️⃣ Věrnostní program</strong> → (⚠️ POZOR: Funguje jen když máte už skvělý produkt! Sám o sobě nezachrání špatnou službu)</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 4: Implementujte a AUTOMATIZUJTE!</strong></p>
        <p class="text-sm text-gray-600 ml-4">Vztahy musí fungovat <strong>automaticky</strong>, jinak vyhoříte!</p>
        <ul class="text-sm text-gray-600 ml-8 mt-1">
          <li><strong>SMS/Email automatizace</strong> → připomínky, novinky (Smartemailing, Mailchimp...)</li>
          <li><strong>Jednoduchá databáze</strong> → Google Sheets, Excel... (jméno, telefon, co kupují)</li>
          <li><strong>Osobní přístup</strong> → "Ahoj Petře, máme pro tebe novou kolekci!" (personalizace!)</li>
        </ul>
        
        <p class="mt-3"><strong>KROK 5: Měřte a optimalizujte!</strong></p>
        <ul class="text-sm text-gray-600 ml-4 mt-1">
          <li>Kolik % zákazníků se vrací?</li>
          <li>Jak často nakupují?</li>
          <li>Pokud se nevracejí → zkuste jiný mechanismus!</li>
        </ul>
        
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 rounded-xl p-4 my-4">
          <p class="text-purple-900 flex items-start gap-2">
            <span class="text-2xl">💡</span>
            <span><strong>TIP</strong></span>
          </p>
          <p class="text-sm text-gray-700 mt-3"><strong>Začínám:</strong> Začněte s PERFEKTNÍ HODNOTOU! Když jsou spokojení, vrátí se sami. Pak přidejte jednoduché nástroje - SMS/Email připomínky, Google Sheets na zákazníky.</p>
          <p class="text-sm text-gray-700 mt-3"><strong>Už podnikám:</strong> Analyzujte své zákazníky! DATA jsou nejdůležitější:</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2 space-y-1">
            <li>Zákazník A: Co chce? Kupuje pravidelně? Jak mu více pomoci?</li>
            <li>Zákazník B: Nakoupil jednou? Proč už nenakoupil znovu?</li>
            <li>⚠️ Obecné slevy otravují! Segmentujte!</li>
          </ul>
        </div>
        
        <h4>Proč jsou vztahy klíčové?</h4>
        <ul class="no-bullet">
          <li>✅ <strong>10× levnější</strong> než získat nového zákazníka</li>
          <li>✅ <strong>Opakovaný zákazník = stabilní příjem</strong> (předvídatelné tržby!)</li>
          <li>✅ <strong>Doporučení</strong> - spokojení stálí zákazníci vás doporučí dalším!</li>
          <li>✅ <strong>"Zamčené" zákazníky = konkurence je neukradne</strong></li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ: Logika barev!</h4>
        <p><strong>Každý segment = jiný vztah!</strong> Co funguje pro rodiny, nemusí fungovat pro profesionálky.</p>
        <ul class="no-bullet">
          <li><strong>🔵 Modrý segment</strong> (Rodiny) → <strong>🔵 modrý vztah</strong> (Věrnostní karta: 5. pizza zdarma)</li>
          <li><strong>🟢 Zelený segment</strong> (Studenti) → <strong>🟢 zelený vztah</strong> (Studentská sleva -20% s ISIC kartou)</li>
        </ul>
        <p class="text-sm text-gray-600 mt-2">💡 <strong>Každý segment chce něco jiného!</strong> Rodiny chtějí slevy, profesionálky chtějí VIP přístup a rychlost.</p>
      `,
      examples: {
        good: [
          "🍕 Pizzerie (🔵 Rodiny): Perfektní kvalita za 20 min + email s novinkami a akční cenou pro stálé zákazníky",
          "🔧 Autoservis (🟢 Starší auta): Spolehlivost + SMS upozornění na STK + servisní balíčky",
          "👗 E-shop (🟡 Móda): Skvělá kvalita + VIP club s early access k novinkám",
          "💇 Kadeřnice (🟣 Profesionálky): Perfektní střih + pravidelné rezervace každé 6 týdnů automaticky"
        ],
        bad: [
          "Dobrý zákaznický servis",
          "Osobní přístup",
          "Komunikace",
          "Podpora"
        ]
      },
      tips: [
        "🎨 BARVA = segment! (🔵 rodiny → 🔵 SMS připomínky, 🟢 studenti → 🟢 sleva s ISIC)",
        "💎 NEJDŮLEŽITĚJŠÍ: Perfektní hodnota! Když jsou spokojení, vrátí se sami!",
        "🔄 Získat nového zákazníka stojí 5-10× více než udržet stávajícího!",
        "💡 Automatizujte! (SMS, emaily, Google Sheets) - jinak vyhoříte",
        "🚀 Začínající: Začněte s hodnotou, pak přidejte jednoduché nástroje",
        "💰 Už podnikám: DATA! Analyzujte kdo se vrací a proč. Segmentujte!",
        "⚠️ Obecné slevy otravují! Segmentujte místo paušálních akcí!"
      ]
    },
    {
      id: 5,
      title: "Zdroje příjmů",
      canvasSection: "revenue",
      videoUrl: "",
      description: "Jak vyděláváte peníze?",
      content: `
        <h3>💰 Zdroje příjmů</h3>
        <p><strong>Příjmy</strong> jsou konkrétní peníze které dostanete od zákazníků za hodnotu.</p>
        
        <h4>🎯 Jak na to (krok za krokem):</h4>
        
        <p><strong>KROK 1: Určete typ příjmu</strong></p>
        <p class="text-sm text-gray-600 ml-4"><strong>🎨 BAREVNÝ příjem</strong> = pro konkrétní segment (🔵 pizza pro rodiny)</p>
        <p class="text-sm text-gray-600 ml-4"><strong>🌐 GLOBÁLNÍ příjem</strong> = pro všechny segmenty (káva, nápoje...)</p>
        
        <p class="mt-3"><strong>KROK 2: Máte už data?</strong></p>
        
        <div class="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 my-3">
          <p class="text-blue-900"><strong>✅ MÁM DATA</strong> (už prodávám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Použijte <strong>reálná čísla</strong> z vašich tržeb</li>
            <li>Příklad: "🔵 50 rodin × 250 Kč/měsíc = 12 500 Kč/měsíc"</li>
            <li>Spočítejte pro každý segment zvlášť</li>
          </ul>
        </div>
        
        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 my-3">
          <p class="text-amber-900"><strong>🚀 NEMÁM DATA</strong> (teprve začínám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Použijte <strong>odhady</strong> - kolik zákazníků očekáváte?</li>
            <li>Příklad: "🔵 10 zákazníků × 65 Kč = 650 Kč/den"</li>
            <li>→ × 25 dní = 16 250 Kč/měsíc</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 3: Spočítejte příjmy</strong></p>
        <p class="text-sm text-gray-600 ml-4">Pro každý příjem zadejte <strong>Počet zákazníků × Cena = Celkový příjem</strong></p>
        
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 rounded-xl p-4 my-4">
          <p class="text-purple-900 flex items-start gap-2">
            <span class="text-2xl">💡</span>
            <span><strong>TIP</strong></span>
          </p>
          <p class="text-sm text-gray-700 mt-3">Většina byznysu má <strong>MIX barevných + globálních příjmů</strong>. Např. 🔵 Rodinná pizza (barevná) + 🌐 Nápoje (globální pro všechny).</p>
          <p class="text-sm text-yellow-800 mt-3 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <strong>⚠️ POZOR:</strong> Zaměřte se na DŮLEŽITÉ příjmy - ty co dělají byznys! Ne marginální (káva kolemjdoucím).
          </p>
        </div>
        
        <h4>Proč je to důležité?</h4>
        <p>Když víte <strong>ODKUD vám plynou peníze</strong>, můžete:</p>
        <ul>
          <li>✅ <strong>Optimalizovat nabídku</strong> - zaměřit se na nejvýnosnější produkty</li>
          <li>✅ <strong>Plánovat růst</strong> - víte kolik potřebujete zákazníků</li>
          <li>✅ <strong>Vidět souvislosti</strong> - barvy ukazují cestu od segmentu k příjmu</li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ: Logika barev!</h4>
        <p><strong>🎨 BAREVNÝ příjem</strong> = pro konkrétní segment (🔵 Segment A → 🔵 Hodnota A → 🔵 Příjem A)</p>
        <p><strong>🌐 GLOBÁLNÍ příjem</strong> = pro všechny segmenty (nápoje, doplňkové služby...)</p>
        <p class="text-sm text-gray-600 mt-2">⚠️ Ale pozor: Globální příjem musí být <strong>důležitý</strong>! Ne jen "marginální prodej kávy kolemjdoucím".</p>
      `,
      examples: {
        good: [
          "🍕 (🔵 Rodinná pizza): 50 rodin × 250 Kč/měsíc = 12 500 Kč/měsíc",
          "🔧 (🟢 Velký servis): 20 aut × 8000 Kč = 160 000 Kč/měsíc",
          "👗 (🟡 Trendy oblečení): 100 objednávek × 1500 Kč = 150 000 Kč/měsíc",
          "💇 (🌐 Nápoje): 200 nápojů × 50 Kč = 10 000 Kč/měsíc (pro všechny segmenty)"
        ],
        bad: [
          "Prodej produktů",
          "Tržby z služeb",
          "Příjmy",
          "Peníze od zákazníků"
        ]
      },
      tips: [
        "🎨 BARVA = segment! (🔵 Rodinná pizza → 🔵 příjem z rodinných pizz)",
        "🌐 GLOBÁLNÍ = příjem pro VŠECHNY segmenty (nápoje, doplňkové služby...)",
        "💰 ZADEJTE MĚSÍČNÍ ČÍSLO! Počet zákazníků × cena/měsíc (reálná data nebo odhad)",
        "⚠️ Jen DŮLEŽITÉ příjmy! Ne marginální prodeje (káva kolemjdoucím)",
        "🚀 Začínající: Použijte odhady, později je upravíte podle reality",
        "📊 Už podnikám: Použijte reálná čísla z vašich tržeb za poslední měsíc"
      ]
    },
    {
      id: 6,
      title: "Klíčové zdroje",
      canvasSection: "resources",
      videoUrl: "",
      description: "Co potřebujete k fungování?",
      content: `
        <h3>🏭 Co jsou Klíčové zdroje?</h3>
        <p><strong>Zdroje</strong> jsou věci které <strong>MUSÍTE mít</strong>, aby byznys vůbec fungoval. <strong>BEZ ČEHO to nejde?</strong></p>
        
        <h4>🎯 Jak najít klíčové zdroje (krok za krokem):</h4>
        
        <p><strong>KROK 1: Co MUSÍTE mít?</strong></p>
        <p class="text-sm text-gray-600 ml-4">Bez čeho váš byznys nemůže fungovat?</p>
        
        <p class="mt-3"><strong>KROK 2: Máte už data?</strong></p>
        
        <div class="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 my-3">
          <p class="text-blue-900"><strong>✅ MÁM DATA</strong> (už prodávám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Co používáte <strong>KAŽDÝ DEN</strong>? Bez čeho to nejde?</li>
            <li>Příklad: "Používám pec, prostor, 2 kuchaře, suroviny"</li>
            <li><strong>Co vám chybí pro růst?</strong> (další zaměstnanci, větší prostor...)</li>
          </ul>
        </div>
        
        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 my-3">
          <p class="text-amber-900"><strong>🚀 NEMÁM DATA</strong> (teprve začínám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li><strong>MVP přístup:</strong> Co potřebujete MINIMÁLNĚ na start?</li>
            <li>Příklad: "Na start potřebuji domácí pec, kuchyň, já sám"</li>
            <li><strong>Nemusíte vlastnit vše!</strong> (pronájem, sdílené prostory, outsourcing)</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 3: Rozdělte zdroje do 4 kategorií</strong></p>
        
        <div class="bg-white border-2 border-gray-300 rounded-xl p-4 my-4">
          <p><strong>🏗️ 1. FYZICKÉ zdroje</strong></p>
          <ul class="text-sm text-gray-700 ml-4 mt-1">
            <li>Budovy, prostory, stroje, zařízení, auta, materiál...</li>
            <li>Příklad: "Pec na pizzu, prostor 50m², dodávka"</li>
          </ul>
        </div>
        
        <div class="bg-white border-2 border-gray-300 rounded-xl p-4 my-4">
          <p><strong>👥 2. LIDSKÉ zdroje</strong></p>
          <ul class="text-sm text-gray-700 ml-4 mt-1">
            <li>Zaměstnanci, odbornost, certifikace, dovednosti...</li>
            <li>Příklad: "2 kuchaři, 1 rozvozce, můj management"</li>
          </ul>
        </div>
        
        <div class="bg-white border-2 border-gray-300 rounded-xl p-4 my-4">
          <p><strong>💰 3. FINANČNÍ zdroje</strong></p>
          <ul class="text-sm text-gray-700 ml-4 mt-1">
            <li>Hotovost, úvěr, investice, provozní kapitál...</li>
            <li>Příklad: "Investice 150k (pec) + provozní kapitál 50k (suroviny)"</li>
            <li>⚠️ <strong>POZOR:</strong> Ve Čtvrtce píšete co kupujete (pec, vybavení), ne částky! Částky = náklady.</li>
          </ul>
        </div>
        
        <div class="bg-white border-2 border-gray-300 rounded-xl p-4 my-4">
          <p><strong>🧠 4. INTELEKTUÁLNÍ zdroje</strong></p>
          <ul class="text-sm text-gray-700 ml-4 mt-1">
            <li>Značka, patenty, databáze zákazníků, know-how, recepty...</li>
            <li>Příklad: "Tajný recept na těsto, databáze 500 stálých zákazníků"</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 4: Vlastnit vs. Pronajímat?</strong></p>
        <ul class="text-sm text-gray-600 ml-4 mt-1">
          <li>❌ Nemusíte vlastnit vše! → Pronájem, sdílené prostory, outsourcing</li>
          <li>✅ Klíčové zdroje = to co vás odlišuje (know-how, značka...)</li>
          <li>Příklad: "Prostor pronajímám, ale recept na těsto je MŮJ!"</li>
        </ul>
        
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 rounded-xl p-4 my-4">
          <p class="text-purple-900 flex items-start gap-2">
            <span class="text-2xl">💡</span>
            <span><strong>TIP</strong></span>
          </p>
          <p class="text-sm text-gray-700 mt-3"><strong>Začínám:</strong> Začněte s minimem! Nemusíte mít dokonalou výbavu. Pronajměte si prostor nebo začněte z domova. Investujte až když víte že to funguje!</p>
          <p class="text-sm text-gray-700 mt-3"><strong>Už podnikám:</strong> Co vám chybí pro růst?</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2 space-y-1">
            <li>Analyzujte úzká místa - kde se zdržujete? Co vás omezuje?</li>
            <li>Zeptejte se zákazníků - co jim chybí?</li>
            <li>Prioritizujte - co když to vyřešíte? O kolik% poroste prodej?</li>
          </ul>
        </div>
        
        <h4>Proč jsou zdroje důležité?</h4>
        <ul class="no-bullet">
          <li>✅ <strong>Vidíte co potřebujete na start</strong> - jaká investice je nutná?</li>
          <li>✅ <strong>Plánujete růst</strong> - co budete potřebovat později?</li>
          <li>✅ <strong>Optimalizujete náklady</strong> - co můžete pronajímat místo vlastnit?</li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ: Logika barev!</h4>
        <p><strong>🌐 VĚTŠINOU GLOBÁLNÍ!</strong> Zdroje jsou sdílené pro celý byznys (pec, prostor, tým...).</p>
        <p class="text-sm text-gray-600 mt-2">💡 Pouze <strong>výjimečně</strong> může být zdroj specifický pro jeden segment (např. speciální vybavení pro VIP segment).</p>
      `,
      examples: {
        good: [
          "🍕 Pizzerie (🌐 globální): Pec na pizzu, prostor, 2 kuchaři",
          "🔧 Autoservis (🌐): Zvedák, diagnostika, mechanik s certifikátem",
          "👗 E-shop (🌐): Webová platforma, skladové prostory, kurýr",
          "💇 Kadeřnice (🌐): Salon v centru, profesionální vybavení, kadeřnice"
        ],
        bad: [
          "Zaměstnanci",
          "Vybavení",
          "Infrastruktura",
          "Technologie"
        ]
      },
      tips: [
        "🌐 VĚTŠINOU GLOBÁLNÍ! Sdílené pro celý byznys (pec, prostor, tým...)",
        "🔍 Ptejte se: BEZ ČEHO to nejde? (to je klíčový zdroj)",
        "💡 Nemusíte vlastnit vše - pronájem, sdílené prostory, outsourcing!",
        "🚀 Začínající: MVP - minimální zdroje na start, investujte až když víte že to funguje",
        "💰 Už podnikám: Analyzujte úzká místa! Co vás omezuje? Zeptejte se zákazníků!"
      ]
    },
    {
      id: 7,
      title: "Klíčové aktivity",
      canvasSection: "activities",
      videoUrl: "",
      description: "Co musíte dělat?",
      content: `
        <h3>⚙️ Co jsou Klíčové aktivity?</h3>
        <p>Každý podnikatel ví CO musí udělat, aby produkt/služba vznikla (uvařit kávu, upéct pizzu, opravit auto...). <strong>To je samozřejmost.</strong></p>
        
        <div class="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-400 rounded-xl p-4 my-4">
          <p class="text-red-900 text-lg"><strong>🎯 ALE NEJVĚTŠÍ PROBLÉM</strong></p>
          <p class="text-red-800 mt-2"><strong>Jak přimějete zákazníky, aby si váš produkt koupili?</strong></p>
        </div>
        
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 rounded-xl p-4 my-4">
          <p class="text-purple-900 flex items-start gap-2">
            <span class="text-2xl">💡</span>
            <span><strong>MARKETING = Pro 90% podnikatelů by měla být NEJVĚTŠÍ aktivita (a není!)</strong></span>
          </p>
          <p class="text-sm text-gray-700 mt-3 mb-2"><strong>Ptejte se konkrétně</strong></p>
          <ul class="text-sm text-gray-700 ml-4 space-y-1">
            <li>Instagram/Facebook posty každý den?</li>
            <li>Reklamy na Google/Facebook?</li>
            <li>Prezence na trzích, networking, doporučení?</li>
            <li>Nabídka na chodník, letáky, vizitky?</li>
          </ul>
          <p class="text-sm text-gray-600 mt-3 italic">
            💡 Vyberte si jeden segment a zkuste k němu vymyslet 2-3 aktivity!
          </p>
        </div>
        
        <h4>🎯 Jak najít klíčové aktivity</h4>
        
        <p class="mt-3"><strong>KROK 1</strong> Jaký segment chci přilákat?</p>
        <p class="text-sm text-gray-600 ml-4">Vyberte si konkrétní segment zákazníků z Čtvrtky</p>
        <p class="text-sm text-gray-600 ml-4">→ Příklad: 🔵 Kolemjdoucí (spěchají do práce)</p>
        
        <p class="mt-3"><strong>KROK 2</strong> CO KONKRÉTNĚ udělám, aby TENTO segment přišel?</p>
        <p class="text-sm text-gray-600 ml-4">Přemýšlejte - Co musím DĚLAT každý den/týden?</p>
        <p class="text-sm text-gray-600 ml-4">→ Příklad: Stihnout kávu za 2 min, Instagram stories v 7:00, stojan před kavárnou</p>
        
        <p class="mt-3"><strong>KROK 3</strong> Rozdělte na GLOBÁLNÍ vs. SPECIFICKÉ</p>
        <p class="text-sm text-gray-600 ml-4"><strong>🌐 Globální</strong> = kampaň pro více segmentů (Instagram pro rodiny + studenty)</p>
        <p class="text-sm text-gray-600 ml-4"><strong>🎨 Specifické</strong> = barva segmentu (🔵 Instagram stories v 7h pro kolemjdoucí)</p>
        
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 rounded-xl p-4 my-4">
          <p class="text-blue-900"><strong>💡 PŘÍKLAD Kavárna</strong></p>
          <p class="text-sm text-gray-700 mt-2"><strong>Segment:</strong> 🔵 Kolemjdoucí (spěchají do práce)</p>
          <p class="text-sm text-gray-700 mt-1"><strong>Otázka:</strong> Jak je přimějete, aby u mě nakoupili?</p>
          <p class="text-sm text-gray-700 mt-3 mb-2"><strong>CO MUSÍM KONKRÉTNĚ DĚLAT</strong></p>
          <ul class="text-sm text-gray-700 ml-4 space-y-1 no-bullet">
            <li>🔵 <strong>Stihnout kávu za 2 min</strong> každému (rychlá příprava)</li>
            <li>🔵 Instagram stories každé ráno v 7 hodin (denní speciál)</li>
            <li>🔵 Stojan s nabídkou před kavárnou (viditelnost)</li>
          </ul>
        </div>
        
        <h4>🎨 Logika barev</h4>
        <p><strong>🌐 Globální</strong> = kampaň funguje pro více segmentů (Instagram pro rodiny + studenty, Google reklamy pro všechny)</p>
        <p><strong>🔵 Specifické</strong> = aktivita jen pro JEDEN segment → použijte barvu segmentu! (🔵 modrý segment → 🔵 modrá aktivita)</p>
        
        <h4>Proč jsou aktivity důležité?</h4>
        <ul class="no-bullet">
          <li>✅ <strong>Víte CO DĚLAT</strong> - konkrétní marketingové činnosti, které vás posunou dopředu</li>
          <li>✅ <strong>Zaměříte se na to podstatné</strong> - marketing = 90% byznysu!</li>
          <li>✅ <strong>Plánujete růst</strong> - co budete muset dělat víc, když poroste poptávka?</li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ - Logika barev!</h4>
        <p><strong>Globální kampaň = 🌐 globální</strong> (funguje pro více segmentů)</p>
        <p><strong>Marketing pro segment = barva segmentu!</strong></p>
        <ul class="no-bullet">
          <li><strong>🌐 Globální -</strong> Instagram kampaň pro rodiny + studenty, Google reklamy pro všechny</li>
          <li><strong>🔵 Modrý segment</strong> (Kolemjdoucí) → <strong>🔵 modrá aktivita</strong> (Instagram stories v 7 hodin)</li>
          <li><strong>🟢 Zelený segment</strong> (Studenti) → <strong>🟢 zelená aktivita</strong> (TikTok videa o akcích)</li>
        </ul>
      `,
      examples: {
        good: [
          "🍕 Pizzerie: 🌐 Facebook kampaň pro rodiny + studenty, 🔵 Instagram stories pro rodiny",
          "🔧 Autoservis: 🌐 Google reklamy pro všechny, 🟢 Péče o náhradní vozy pro firemní",
          "👗 E-shop: 🌐 TikTok kampaň pro mladé + studenty, 🟡 Instagram Reels pro mladé",
          "💇 Kadeřnice: 🌐 Instagram kampaň pro více segmentů, 🟣 LinkedIn networking pro firmy"
        ],
        bad: [
          "Řízení firmy (příliš obecné)",
          "Poskytování služeb (co konkrétně?)",
          "Večerní provoz (to je HODNOTA, ne aktivita!)",
          "Rychlá rozvážka (to je HODNOTA, ne aktivita!)"
        ]
      },
      tips: [
        "🎯 PROBLÉM - Jak přimějete zákazníky, aby si váš produkt koupili?",
        "📢 MARKETING = Pro 90% by měla být největší aktivita (a není!)",
        "💡 Vyberte 1 segment a zkuste k němu vymyslet 2-3 aktivity",
        "🌐 Globální = kampaň pro více segmentů (IG pro rodiny + studenty)",
        "🎨 Specifické = barva segmentu (🔵 IG stories v 7h pro kolemjdoucí)"
      ]
    },
    {
      id: 8,
      title: "Klíčová partnerství",
      canvasSection: "partners",
      videoUrl: "",
      description: "S kým spolupracujete?",
      content: `
        <h3>🤝 Co jsou Klíčová partnerství?</h3>
        <p><strong>Partneři</strong> jsou firmy nebo lidé, <strong>kterým zadáváte práci externě</strong> nebo od nich <strong>kupujete klíčové zdroje</strong>. Jednoduše: <strong>Bez koho to nejde?</strong></p>
        
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 rounded-xl p-4 my-4">
          <p class="text-purple-900 flex items-start gap-2">
            <span class="text-2xl">💡</span>
            <span><strong>KLÍČOVÉ! Partneři = SPOLEHLIVOST + KVALITA</strong></span>
          </p>
          <ul class="text-sm text-gray-700 ml-4 mt-3 space-y-1">
            <li><strong>Dodávají včas</strong> - můžete se na ně spolehnout</li>
            <li><strong>Garantují kvalitu</strong> - i když jsou třeba dražší</li>
            <li><strong>Váš byznys stojí na nich</strong> - proto potřebujete tu kvalitu!</li>
          </ul>
        </div>
        
        <h4>⚡ PROČ MÍT PARTNERY?</h4>
        <p>Partner vám může <strong>nahradit investici do zdrojů!</strong> Místo kupovat vlastní dodávku, můžete použít rozvoz od Wolt. Místo vlastní účetní, najměte si účetní firmu.</p>
        
        <h4>🎯 Jak najít klíčové partnery (krok za krokem):</h4>
        
        <p><strong>KROK 1: Co NEDĚLÁTE sami?</strong></p>
        <p class="text-sm text-gray-600 ml-4">Co outsourcujete nebo od koho nakupujete?</p>
        
        <p class="mt-3"><strong>KROK 2: Máte už data?</strong></p>
        
        <div class="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 my-4">
          <p class="text-blue-900"><strong>✅ MÁM DATA</strong> (už prodávám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Kdo jsou vaši <strong>TOP dodavatelé/partneři</strong>?</li>
            <li>Bez koho byste <strong>nepřežili</strong>?</li>
            <li>Příklad: "Dodavatel mouky a sýrů, Wolt rozvoz, účetní firma"</li>
          </ul>
        </div>
        
        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 my-4">
          <p class="text-amber-900"><strong>🚀 NEMÁM DATA</strong> (teprve začínám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li><strong>Koho budete potřebovat?</strong> (dodavatelé, služby)</li>
            <li>Příklad: "Budu potřebovat dodavatele mouky, účetní, kurýra"</li>
            <li><strong>Kdo vám může pomoct začít levněji?</strong> (sdílené služby)</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 3: Partner vs. Dodavatel - jaký je rozdíl?</strong></p>
        
        <div class="bg-white border-2 border-gray-300 rounded-xl p-4 my-4">
          <p><strong>💡 Partner = někdo BEZ KOHO to NEJDE!</strong></p>
          <ul class="text-sm text-gray-700 ml-4 mt-1">
            <li>✅ <strong>Klíčový partner:</strong> Dodavatel mouky (bez mouky nemáte pizzu!)</li>
            <li>❌ <strong>Běžný dodavatel:</strong> Dodavatel krabic (můžete změnit kdykoli)</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 4: Může partner nahradit investici?</strong></p>
        <p class="text-sm text-gray-600 ml-4">Někdy je <strong>levnější zadat práci externě</strong> než vlastnit!</p>
        <ul class="text-sm text-gray-600 ml-4">→ Příklad: Rozvoz od Wolt (0 Kč investice) vs. vlastní dodávka (200 000 Kč)</ul>
        <ul class="text-sm text-gray-600 ml-4">→ Příklad: Účetní firma (3 000 Kč/měsíc) vs. vlastní účetní (30 000 Kč/měsíc)</ul>
        
        <p class="mt-3"><strong>KROK 5: Vyberte TOP 3-5 partnerů</strong></p>
        <p class="text-sm text-gray-600 ml-4">Napište jen ty <strong>nejdůležitější</strong> - bez kterých byznys nefunguje!</p>
        
        <div class="bg-purple-50 border-2 border-purple-300 rounded-xl p-4 my-4">
          <p class="text-purple-900"><strong>💡 TIP</strong></p>
          <p class="text-sm text-gray-700 mt-2">Kdo vám může pomoct <strong>začít levněji</strong> nebo ušetřit čas?</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2 space-y-1">
            <li>Místo vlastní dodávky použijte Wolt (úspora investice)</li>
            <li>Místo vlastní účetní najměte účetní firmu (úspora mzdy)</li>
            <li>Zaměřte se na to co umíte nejlépe, zbytek nechte na partnerech</li>
          </ul>
        </div>
        
        <h4>Proč jsou partnerství důležitá?</h4>
        <ul class="no-bullet">
          <li>✅ <strong>Ušetříte investice</strong> externí spolupráce místo vlastnictví</li>
          <li>✅ <strong>Ušetříte čas</strong> zaměřte se na to co umíte nejlépe</li>
          <li>✅ <strong>Spolehlivost a kvalita</strong> partner má know-how a dodává včas</li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ: Logika barev!</h4>
        <p><strong>🌐 VĚTŠINOU GLOBÁLNÍ!</strong> Partneři jsou sdílení pro celý byznys (dodavatelé surovin, účetní...).</p>
        <p class="text-sm text-gray-600 mt-2">💡 Pouze <strong>výjimečně</strong> může být partner specifický pro jeden segment (např. influencer marketing pouze pro mladé ženy).</p>
      `,
      examples: {
        good: [
          "🍕 Pizzerie (🌐): Dodavatel mouky a sýrů, účetní firma",
          "🔧 Autoservis (🌐): Velkoobchod s autodíly, pojišťovna",
          "👗 E-shop (🌐): Výrobce oblečení v Turecku, PPL doprava",
          "💇 Kadeřnice (🌐): Dodavatel kosmetiky, daňový poradce"
        ],
        bad: [
          "Dodavatelé",
          "Spolupracující firmy",
          "Business partneři",
          "Subdodavatelé"
        ]
      },
      tips: [
        "🌐 VĚTŠINOU GLOBÁLNÍ! Dodavatelé surovin, účetní, doprava...",
        "💡 Partner = SPOLEHLIVOST + KVALITA (dodává včas, stojí na nich byznys)",
        "🚀 Kdo vám může pomoct začít levněji? Externí spolupráce > vlastnictví!",
        "🔧 Partner může nahradit investici! (Wolt rozvoz vs. vlastní dodávka)"
      ]
    },
    {
      id: 9,
      title: "Struktura nákladů",
      canvasSection: "costs",
      videoUrl: "",
      description: "Kolik vás to stojí?",
      content: `
        <h3>💸 Co je Struktura nákladů?</h3>
        <p><strong>Náklady</strong> jsou peníze které <strong>MUSÍTE platit</strong>, aby byznys fungoval. <strong>Kolik vás to stojí měsíčně?</strong></p>
        
        <h4>⚡ PROČ JE TO KLÍČOVÉ?</h4>
        <p><strong>Náklady určují kolik musíte vydělat</strong> aby byl byznys ziskový! Pokud máte náklady 50 000 Kč/měsíc, musíte vydělat víc než 50 000 Kč aby byl byznys v zisku.</p>
        
        <h4>🎯 Jak spočítat náklady (krok za krokem):</h4>
        
        <p><strong>KROK 1: Co MUSÍTE platit?</strong></p>
        <p class="text-sm text-gray-600 ml-4">Jaké výdaje máte každý měsíc?</p>
        
        <p class="mt-3"><strong>KROK 2: Máte už data?</strong></p>
        
        <div class="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 my-4">
          <p class="text-blue-900"><strong>✅ MÁM DATA</strong> (už prodávám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li>Podívejte se na <strong>reálná čísla z posledního měsíce</strong></li>
            <li>Sečtěte VŠECHNY výdaje (nájem, mzdy, suroviny, energie)</li>
            <li>Příklad: "Nájem 25k + Mzdy 40k + Suroviny 15k = 80 000 Kč/měsíc"</li>
          </ul>
        </div>
        
        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 my-4">
          <p class="text-amber-900"><strong>🚀 NEMÁM DATA</strong> (teprve začínám)</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2">
            <li><strong>Odhady:</strong> Co budete muset platit minimálně?</li>
            <li>Googlujte průměrné ceny, ptejte se dodavatelů na ceníky</li>
            <li>Příklad: "Odhad: Pronájem 20k + Suroviny 10k = 30 000 Kč/měsíc"</li>
          </ul>
        </div>
        
        <p class="mt-3"><strong>KROK 3: Rozdělte na GLOBÁLNÍ vs. SPECIFICKÉ</strong></p>
        
        <div class="bg-white border-2 border-gray-300 rounded-xl p-4 my-4">
          <p><strong>🌐 GLOBÁLNÍ náklady</strong> (pro celý byznys):</p>
          <ul class="text-sm text-gray-700 ml-4 mt-1">
            <li>Nájem, mzdy, suroviny, energie (sdílené pro všechny segmenty)</li>
            <li>Příklad: "Nájem 25k, Mzdy 40k, Suroviny 15k"</li>
          </ul>
        </div>
        
        <div class="bg-white border-2 border-purple-300 rounded-xl p-4 my-4">
          <p><strong>🎨 SPECIFICKÉ náklady</strong> (jen pro jeden segment):</p>
          <ul class="text-sm text-gray-700 ml-4 mt-1">
            <li>Reklama, marketing specifický pro segment - <strong>použijte barvu segmentu!</strong></li>
            <li>Příklad: "🔵 Instagram reklama pro rodiny 2 000 Kč"</li>
          </ul>
        </div>
        
        <div class="bg-purple-50 border-2 border-purple-300 rounded-xl p-4 my-4">
          <p class="text-purple-900"><strong>💡 TIP</strong></p>
          <p class="text-sm text-gray-700 mt-2"><strong>Už podnikám:</strong> Použijte reálná čísla z posledního měsíce! Sečtěte VŠECHNY výdaje.</p>
          <p class="text-sm text-gray-700 mt-2"><strong>Začínám:</strong> Googlujte průměrné ceny, ptejte se dodavatelů na ceníky. Později upravíte podle reality.</p>
        </div>
        
        <h4>Proč jsou náklady důležité?</h4>
        <ul>
          <li>✅ <strong>Víte kolik musíte vydělat</strong> aby byl byznys ziskový</li>
          <li>✅ <strong>Vidíte kde ušetřit</strong> můžete optimalizovat nejvyšší náklady</li>
          <li>✅ <strong>Plánujete cashflow</strong> víte kolik peněz potřebujete měsíčně</li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ: Logika barev!</h4>
        <p><strong>🌐 VĚTŠINOU GLOBÁLNÍ!</strong> Nájem, mzdy, suroviny = pro celý byznys.</p>
        <p><strong>���� Specifické náklady = barva segmentu!</strong></p>
        <ul class="no-bullet">
          <li><strong>🌐 Globální:</strong> Nájem 25k, Mzdy 40k, Suroviny 15k</li>
          <li><strong>🔵 Modrý segment</strong> (Rodiny) → <strong>🔵 modrý náklad</strong> (Instagram reklama 2 000 Kč)</li>
          <li><strong>🟢 Zelený segment</strong> (Studenti) → <strong>🟢 zelený náklad</strong> (TikTok reklama 1 500 Kč)</li>
        </ul>
      `,
      examples: {
        good: [
          "🍕 Pizzerie: 🌐 Nájem 25k, 🌐 Mzdy 40k, 🌐 Suroviny 15k, 🔵 IG reklama 2k",
          "🔧 Autoservis: 🌐 Nájem dílny 30k, 🌐 Mzdy 50k, 🌐 Autodíly 20k",
          "👗 E-shop: 🌐 Doprava 10k, 🌐 Skladování 5k, 🟡 Instagram ads 15k",
          "💇 Kadeřnice: 🌐 Nájem salonu 20k, 🌐 Přípravky 8k, 🌐 Energie 3k"
        ],
        bad: [
          "Provozní náklady",
          "Výdaje",
          "Investice",
          "Náklady na podnikání"
        ]
      },
      tips: [
        "🌐 VĚTŠINOU GLOBÁLNÍ! Nájem, mzdy, suroviny = pro celý byznys",
        "🎨 Specifické náklady = barva segmentu (🔵 IG reklama jen pro rodiny)",
        "💰 ZADEJTE ČÍSLO! Měsíční částka v Kč (např. Nájem 25 000 Kč)",
        "🚀 Začínající: Odhady OK! Googlujte ceny, ptejte se dodavatelů",
        "💰 Už podnikám: Reálná čísla z posledního měsíce - sečtěte VŠECHNY výdaje"
      ]
    }
  ]
};

// 📗 MODUL 2: Vylepšení modelu (4 lekce) - PRO DESKTOP
const MODULE_2 = {
  id: 2,
  title: "Vylepšení byznys modelu",
  description: "Naučte se vylepšit a optimalizovat váš byznys model",
  lessons: [
    {
      id: 10,
      title: "Pravidla dobrého modelu",
      canvasSection: undefined,
      videoUrl: "",
      description: "Zkontrolujte si, že váš model splňuje všechna pravidla",
      content: `
        <h3>Pravidla dobré Podnikatelské Čtvrtky</h3>
        <p>Každý úspěšný byznys model má společné charakteristiky. Pojďme si zkontrolovat váš model!</p>
        <h4>✅ Checklist:</h4>
        <ul>
          <li><strong>Barvy:</strong> Má každý produkt/služba svou vlastní barvu?</li>
          <li><strong>Konkrétnost:</strong> Jsou zákaznické segmenty dost konkrétní?</li>
          <li><strong>Hodnota:</strong> Je jasné proč si vás zákazník vybere?</li>
          <li><strong>Souvislost:</strong> Propojují se barevné položky napříč sekcemi?</li>
          <li><strong>Reálnost:</strong> Jsou náklady realistické?</li>
        </ul>
      `,
      tips: [
        "Každá barva = jeden produkt/služba (napříč celým Canvas)",
        "🌐 Globální barva = pro celý byznys (nájem, energie...)",
        "Kontrolujte že vše dává smysl dohromady"
      ]
    },
    {
      id: 11,
      title: "Finanční analýza",
      canvasSection: undefined,
      videoUrl: "",
      description: "Vychází vám to finančně?",
      content: `
        <h3>💰 Finanční analýza vašeho modelu</h3>
        <p>Máte vyplněné příjmy a náklady v modelu. Teď zjistíte <strong>jestli vám to vychází finančně</strong>.</p>
        
        <h4>🎯 DVA PŘÍSTUPY</h4>
        
        <div class="bg-blue-50 border-2 border-blue-400 rounded-xl p-4 my-4">
          <p class="text-blue-900"><strong>🚀 ZAČÍNÁM - nemám data</strong></p>
          <p class="text-sm text-gray-700 mt-2">Připravte se na <strong>3 scénáře</strong> - nikdy nevíte kolik zákazníků získáte!</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2 space-y-1 no-bullet">
            <li><strong>😰 Pesimistický:</strong> Získáte 25% plánovaných zákazníků</li>
            <li><strong>🎯 Realistický:</strong> Získáte 50% plánovaných zákazníků</li>
            <li><strong>🚀 Optimistický:</strong> Získáte 100% plánovaných zákazníků</li>
          </ul>
          <p class="text-sm text-gray-600 mt-3">💡 Komponenta vypočítá <strong>aktuální stav</strong> z vašeho modelu. Pro scénáře si představte různé počty zákazníků a klikněte přepočítat!</p>
        </div>
        
        <div class="bg-green-50 border-2 border-green-400 rounded-xl p-4 my-4">
          <p class="text-green-900"><strong>💰 UŽ PODNIKÁM - mám reálná data</strong></p>
          <p class="text-sm text-gray-700 mt-2">Použijte reálná čísla z posledního měsíce!</p>
          <ul class="text-sm text-gray-700 ml-4 mt-2 space-y-1 no-bullet">
            <li>✅ Zadejte příjmy + náklady do Canvas (Lekce 4 + 9)</li>
            <li>✅ Nástroj vám ukáže aktuální zisk/ztrátu</li>
            <li>📊 Analyzujte TOP zdroje příjmů</li>
          </ul>
        </div>
        
        <h4>📊 CO KOMPONENTA UKÁŽE</h4>
        <ul class="text-sm text-gray-600 no-bullet">
          <li>✅ Aktuální zisk/ztráta z vašeho modelu</li>
          <li>✅ TOP příjmové zdroje (řazeno od největšího)</li>
          <li>✅ Break-even analýza (kolik zákazníků potřebujete)</li>
          <li>✅ Roční projekce zisku</li>
        </ul>
        
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 rounded-xl p-4 my-4">
          <p class="text-purple-900 flex items-start gap-2">
            <span class="text-2xl">🎯</span>
            <span><strong>JAK NA TO</strong></span>
          </p>
          <p class="text-sm text-gray-700 mt-3"><strong>Začínám:</strong> Připravte si 3 scénáře manuálně (pesimistický, realistický, optimistický). Mějte rezervy!</p>
          <p class="text-sm text-gray-700 mt-2"><strong>Už podnikám:</strong> Zadejte reálná čísla do Canvas a analyzujte TOP zdroje příjmů. Škálujte co funguje!</p>
        </div>
      `,
      tips: [
        "🚀 Začínající: Komponenta ukáže aktuální stav. Pro scénáře si představte různé počty zákazníků!",
        "💰 Už podnikám: Zadejte reálná čísla z posledního měsíce do vašeho modelu",
        "📊 Analyzujte TOP příjmové zdroje - jaký segment vydělává nejvíc?",
        "🎯 Break-even = kolik zákazníků potřebujete aby jste nevydělávali ani neprodělávali"
      ]
    },
    {
      id: 12,
      title: "Řešení situací",
      canvasSection: undefined,
      videoUrl: "",
      description: "Jak řešit typické problémy",
      content: `
        <h3>🚨 Řešení běžných situací</h3>
        <p>Máte problém s byznysem? <strong>Podnikatelská Čtvrtka vám ukáže řešení!</strong> Každá situace má své místo v modelu.</p>
        
        <h4>🎯 Jak to funguje?</h4>
        <p>Vyberte si situaci z nabídky níže a Canvas vám ukáže:</p>
        <ul>
          <li>✅ <strong>Co upravit</strong> - které sekce modelu potřebujete změnit</li>
          <li>✅ <strong>Jak na to</strong> - konkrétní kroky řešení</li>
          <li>✅ <strong>Příklady</strong> - jak to řeší ostatní byznesy</li>
        </ul>
        
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 rounded-xl p-4 my-4">
          <p class="text-purple-900 flex items-start gap-2">
            <span class="text-2xl">🎯</span>
            <span><strong>JAK POSTUPOVAT</strong></span>
          </p>
          <p class="text-sm text-gray-700 mt-3">1. Vyberte situaci která vás trápí</p>
          <p class="text-sm text-gray-700 mt-1">2. Přečtěte si doporučení</p>
          <p class="text-sm text-gray-700 mt-1">3. Vraťte se na příslušnou lekci a upravte model</p>
          <p class="text-sm text-gray-700 mt-1">4. Můžete kombinovat více řešení najednou!</p>
        </div>
        
        <h4>Proč je to důležité?</h4>
        <ul>
          <li>✅ <strong>Rychlá diagnostika</strong> - okamžitě víte kde hledat řešení</li>
          <li>✅ <strong>Konkrétní kroky</strong> - víte přesně co udělat</li>
          <li>✅ <strong>Ověřené postupy</strong> - inspirujte se příklady z praxe</li>
        </ul>
      `,
      tips: [
        "Každý problém má řešení v Canvas - stačí vědět kde hledat",
        "Začněte se snadnými řešeními s vysokým dopadem",
        "Můžete použít více řešení najednou - kombinujte je!"
      ]
    },
    {
      id: 13,
      title: "Příklady úspěšných modelů",
      canvasSection: undefined,
      videoUrl: "",
      description: "Jak může vypadat podnikatelský model v různých odvětvích",
      content: `
        <h3>🏆 Galerie úspěšných byznys modelů</h3>
        <p>Pojďme se podívat na <strong>reálné příklady</strong> vyplněné Podnikatelské Čtvrtky z různých odvětví!</p>
        
        <h4>🎯 Co uvidíte?</h4>
        <p>Pro každý byznys uvidíte:</p>
        <ul>
          <li>✅ <strong>Kompletní model</strong> - všech 9 sekcí vyplněných</li>
          <li>✅ <strong>Barevné propojení</strong> - jak souvisí segmenty, hodnoty a příjmy</li>
          <li>✅ <strong>Reálná čísla</strong> - skutečné ceny a náklady</li>
          <li>✅ <strong>Klíčové poznatky</strong> - co dělá tento model úspěšný</li>
        </ul>
        
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-400 rounded-xl p-4 my-4">
          <p class="text-purple-900 flex items-start gap-2">
            <span class="text-2xl">💡</span>
            <span><strong>JAK VYUŽÍT PŘÍKLADY</strong></span>
          </p>
          <p class="text-sm text-gray-700 mt-3"><strong>1. Inspirujte se strukturou:</strong> Kolik segmentů mají? Jak je barevně propojují?</p>
          <p class="text-sm text-gray-700 mt-2"><strong>2. Přizpůsobte si to:</strong> Vezměte nápady a upravte je pro vaše podnikání</p>
          <p class="text-sm text-gray-700 mt-2"><strong>3. Kombinujte:</strong> Můžete vzít nápady z více příkladů najednou!</p>
          <p class="text-sm text-yellow-800 mt-3 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <strong>⚠️ POZOR:</strong> Nekopírujte slepě! Každý byznys je unikátní. Použijte příklady jako inspiraci, ne šablonu.
          </p>
        </div>
        
        <h4>Proč je to užitečné?</h4>
        <ul>
          <li>✅ <strong>Vidíte co funguje</strong> - ověřené modely z praxe</li>
          <li>✅ <strong>Rychlejší start</strong> - inspirace místo vymýšlení od nuly</li>
          <li>✅ <strong>Pochopíte souvislosti</strong> - jak se propojují sekce modelu</li>
        </ul>
      `,
      tips: [
        "📱 Swipujte mezi reálnými příklady businessů",
        "🔍 Použijte FILTR pro zobrazení konkrétní kategorie",
        "🔑 KLÍČOVÉ insight = co je nejdůležitější v daném businessu",
        "💡 PROČ TO FUNGUJE = poučení které si můžete vzít pro svůj byznys"
      ]
    }
  ]
};

export function CourseDemoV3() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  
  const [currentModuleNumber, setCurrentModuleNumber] = useState(1); // 1, 2, nebo 3
  const [showMainDashboard, setShowMainDashboard] = useState(true); // Hlavní přehled (DEFAULT!)
  const [showActionPlan, setShowActionPlan] = useState(false);
  const [showTool, setShowTool] = useState<string | null>(null); // 🧮 Nástroje: 'target-calculator' | 'segment-size' | null
  const [actionPlanRefreshTrigger, setActionPlanRefreshTrigger] = useState(0); // ✅ Business Action Plan
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [showCanvas, setShowCanvas] = useState(false);
  const [showTourPopup, setShowTourPopup] = useState(false);
  const [highlightedSectionId, setHighlightedSectionId] = useState<string | undefined>();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false); // Mobile menu
  const [mobileCanvasData, setMobileCanvasData] = useState<any[]>([]); // Mobile Canvas data (array!)
  const [canvasSections, setCanvasSections] = useState<any[]>([]); // Canvas sections for dashboard
  const [isLoadingCanvas, setIsLoadingCanvas] = useState(false);
  const [selectedVPCSegment, setSelectedVPCSegment] = useState<string | null>(null); // VPC segment selection
  const [selectedVPCValue, setSelectedVPCValue] = useState<string | null>(null); // VPC value selection
  
  // 🎨 VPC DATA STORAGE (Module 3)
  const [vpcCustomerData, setVpcCustomerData] = useState<any>({});
  const [vpcValueData, setVpcValueData] = useState<any>({});
  
  // 🎉 ACHIEVEMENTS & GAMIFICATION
  const [visibleAchievements, setVisibleAchievements] = useState<Achievement[]>([]); // 🎨 VERTICAL STACK - všechny achievementy najednou!
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  
  // 💾 AUTOSAVE INDICATOR
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | undefined>();
  
  // 👋 WELCOME MODAL
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [welcomeMode, setWelcomeMode] = useState<"welcome" | "support">("welcome");
  
  // Inicializace Welcome Modal - zobraz pokud není v localStorage
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('course_welcome_seen');
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true);
      setWelcomeMode("welcome");
      console.log('👋 Welcome Modal → První návštěva, zobrazuji welcome message');
    }
  }, []);
  
  // 📱 MOBILE DETECTION - Používáme POUZE šířku okna pro layout (ne touch detection!)
  // Touch detection je důležitá pro GESTA (swipe), ale ne pro LAYOUT!
  // ⚠️ DŮLEŽITÉ: 768px = Tailwind md: breakpoint = desktop layout začíná od 768px+
  const isMobile = useIsMobile();
  const orientation = useOrientation();
  
  // 🐛 DEBUG: Log mobile detection
  useEffect(() => {
    console.log('📱 MOBILE DETECTION:', { isMobile, width: window.innerWidth, threshold: 768 });
  }, [isMobile]);

  // 💾 PERSIST VPC SELECTIONS - Load from localStorage
  useEffect(() => {
    const savedSegment = localStorage.getItem('vpc_selected_segment');
    const savedValue = localStorage.getItem('vpc_selected_value');
    
    if (savedSegment) setSelectedVPCSegment(savedSegment);
    if (savedValue) setSelectedVPCValue(savedValue);
  }, []);

  // 🚫 ZAMKNI SCROLL NA BODY když je Canvas otevřený (oprava double scrollbar)
  useEffect(() => {
    if (showCanvas) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = '';
    };
  }, [showCanvas]);

  // 💾 PERSIST VPC SELECTIONS - Save to localStorage when changed
  useEffect(() => {
    if (selectedVPCSegment) {
      localStorage.setItem('vpc_selected_segment', selectedVPCSegment);
    }
  }, [selectedVPCSegment]);

  useEffect(() => {
    if (selectedVPCValue) {
      localStorage.setItem('vpc_selected_value', selectedVPCValue);
    }
  }, [selectedVPCValue]);

  // All modules
  const allModules = [MODULE_1, MODULE_2, MODULE_3];
  
  // ✅ SAFE: Ensure currentModuleNumber is valid
  const safeModuleNumber = Math.min(Math.max(1, currentModuleNumber), 3);
  const currentModule = safeModuleNumber === 1 ? MODULE_1 : safeModuleNumber === 2 ? MODULE_2 : MODULE_3;
  
  // ✅ SAFE: Ensure currentLessonIndex is within bounds
  const safeLessonIndex = Math.min(Math.max(0, currentLessonIndex), currentModule.lessons.length - 1);
  const currentLesson = currentModule.lessons[safeLessonIndex];
  
  const isLastLesson = safeLessonIndex === currentModule.lessons.length - 1;
  const moduleCompleted = completedLessons.size === currentModule.lessons.length;
  const totalLessons = allModules.reduce((sum, m) => sum + m.lessons.length, 0);
  
  // 📱 MOBILE: Convert Set<number> to Set<string> for mobile components
  const completedLessonsStrings = new Set(
    Array.from(completedLessons).map(id => {
      // Find which module this lesson belongs to
      for (const module of allModules) {
        if (module.lessons.some(l => l.id === id)) {
          return `${module.id}-${id}`;
        }
      }
      return `1-${id}`; // Fallback to module 1
    })
  );

  // 🔥 SWIPE NAVIGATION - Pomocné funkce
  const canGoPreviousLesson = currentModuleNumber > 1 || currentLessonIndex > 0;
  // ✅ NEXT LESSON: Povolit jen když je aktuální lekce dokončená
  const isCurrentLessonCompleted = completedLessons.has(currentLesson.id);
  const hasNextLesson = currentModuleNumber < 3 || currentLessonIndex < currentModule.lessons.length - 1;
  const canGoNextLesson = isCurrentLessonCompleted && hasNextLesson;

  const handleSwipeToNextLesson = () => {
    if (!canGoNextLesson) return;
    
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      // Další lekce v aktuálním modulu
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else if (currentModuleNumber < 3) {
      // Přejít na další modul
      setCurrentModuleNumber(currentModuleNumber + 1);
      setCurrentLessonIndex(0);
    }
  };

  const handleSwipeToPreviousLesson = () => {
    if (!canGoPreviousLesson) return;
    
    if (currentLessonIndex > 0) {
      // Předchozí lekce v aktuálním modulu
      setCurrentLessonIndex(currentLessonIndex - 1);
    } else if (currentModuleNumber > 1) {
      // Přejít na předchozí modul (poslední lekce)
      const prevModule = currentModuleNumber === 2 ? MODULE_1 : MODULE_2;
      setCurrentModuleNumber(currentModuleNumber - 1);
      setCurrentLessonIndex(prevModule.lessons.length - 1);
    }
  };

  // Auth check
  // Handle redirect to specific Canvas section from Problem Solver
  useEffect(() => {
    const handleOpenCanvasSection = (e: any) => {
      const { lessonId, solutionTitle } = e.detail;
      
      // Switch to Module 1
      setCurrentModuleNumber(1);
      setShowMainDashboard(false);
      
      // Find lesson index by ID
      const lessonIndex = MODULE_1.lessons.findIndex((l: any) => l.id === lessonId);
      if (lessonIndex >= 0) {
        setCurrentLessonIndex(lessonIndex);
      }
      
      // Toast removed - zobrazuje se už v ProblemSolver
    };
    
    window.addEventListener('open-canvas-section', handleOpenCanvasSection);
    
    return () => {
      window.removeEventListener('open-canvas-section', handleOpenCanvasSection);
    };
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      // Parse token from URL query params
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      const isDev = urlParams.get('dev') === 'true';
      
      // DEV MODE: Allow access without token (add ?dev=true to URL)
      if (isDev) {
        const devUser = { id: 'dev-user-999', email: 'dev@admin.cz', name: 'Dev User' };
        setIsAuthenticated(true);
        setUserData(devUser);
        setIsVerifying(false);
        // Load progress for dev user
        const progress = await loadCourseProgress(devUser.id);
        setCompletedLessons(progress);
        
        // 👋 Check if first time visit
        const hasSeenWelcome = localStorage.getItem('course_welcome_seen');
        if (!hasSeenWelcome) {
          setShowWelcomeModal(true);
          setWelcomeMode("welcome");
        }
        
        return;
      }
      
      // 🔐 NEW: Check Supabase Auth session (for logged in users)
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        console.log('✅ Supabase Auth session found:', session.user.email);
        const user = {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || session.user.email || 'User'
        };
        setIsAuthenticated(true);
        setUserData(user);
        setIsVerifying(false);
        // Load progress for authenticated user
        const progress = await loadCourseProgress(user.id);
        setCompletedLessons(progress);
        
        // 🎯 Load achievements from SUPABASE (ne localStorage!)
        const achievements = await loadUnlockedAchievementsFromDB(user.id);
        setUnlockedAchievements(achievements);
        
        // 👋 Check if first time visit
        const hasSeenWelcome = localStorage.getItem('course_welcome_seen');
        if (!hasSeenWelcome) {
          setShowWelcomeModal(true);
          setWelcomeMode("welcome");
        }
        
        return;
      }
      
      // Real token verification (for users with access token from email)
      if (token) {
        const user = await verifyAccessToken(token);
        
        if (user) {
          setIsAuthenticated(true);
          setUserData(user);
          setIsVerifying(false);
          
          // 📱 PWA: Uložit token do localStorage (pro auto-login po otevření z desktopu)
          if (token) {
            localStorage.setItem('course_access_token', token);
            console.log('📱 Token uložen do localStorage pro PWA');
          }
          
          // Load progress for real user
          const progress = await loadCourseProgress(user.id);
          setCompletedLessons(progress);
          
          // 🎯 Load achievements from SUPABASE (ne localStorage!)
          const achievements = await loadUnlockedAchievementsFromDB(user.id);
          setUnlockedAchievements(achievements);
          
          // 👋 Check if first time visit
          const hasSeenWelcome = localStorage.getItem('course_welcome_seen');
          if (!hasSeenWelcome) {
            setShowWelcomeModal(true);
            setWelcomeMode("welcome");
          }
          
          return;
        }
      }
      
      // No valid token - deny access
      setIsAuthenticated(false);
      setIsVerifying(false);
    };
    
    checkAuth();
  }, []);
  
  // Load Canvas data for mobile - CURRENT SECTION
  useEffect(() => {
    const loadMobileCanvas = async () => {
      // ✅ SAFE: Check if currentLesson exists and has canvasSection
      if (!userData?.id || !currentLesson || !currentLesson.canvasSection) return;
      
      setIsLoadingCanvas(true);
      try {
        const { data, error } = await supabase
          .from('user_canvas_data')
          .select('*')
          .eq('user_id', userData.id)
          .eq('section_key', currentLesson.canvasSection)
          .maybeSingle(); // ✅ Use maybeSingle() instead of single() - doesn't error if no rows
        
        if (data && data.content) {
          setMobileCanvasData(data.content);
        } else {
          setMobileCanvasData([]);
        }
      } catch (err) {
        console.warn('Failed to load mobile canvas:', err);
        setMobileCanvasData([]);
      } finally {
        setIsLoadingCanvas(false);
      }
    };
    
    loadMobileCanvas();
  }, [userData, currentLesson?.canvasSection]);
  
  // Load ALL Canvas data for preview
  useEffect(() => {
    const loadAllCanvasData = async () => {
      if (!userData?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('user_canvas_data')
          .select('*')
          .eq('user_id', userData.id);
        
        if (data) {
          // Format pro MiniCanvasPreview
          const formatted = [
            { id: 'partners', title: 'Klíčová partnerství', items: [] },
            { id: 'activities', title: 'Klíčové aktivity', items: [] },
            { id: 'resources', title: 'Klíčové zdroje', items: [] },
            { id: 'value', title: 'Hodnotová nabídka', items: [] },
            { id: 'relationships', title: 'Vztahy se zákazníky', items: [] },
            { id: 'channels', title: 'Kanály', items: [] },
            { id: 'segments', title: 'Zákaznické segmenty', items: [] },
            { id: 'costs', title: 'Struktura nákladů', items: [] },
            { id: 'revenue', title: 'Zdroje příjmů', items: [] },
          ];
          
          // Naplnit data ze Supabase
          data.forEach(section => {
            const found = formatted.find(f => f.id === section.section_key);
            if (found && section.content) {
              found.items = section.content;
            }
          });
          
          setCanvasSections(formatted);
        }
      } catch (err) {
        console.warn('Failed to load all canvas data:', err);
      }
    };
    
    loadAllCanvasData();
  }, [userData, completedLessons]); // Reload when lesson completed

  // 🎉 Achievement helper
  const triggerAchievement = useCallback(async (achievementId: string) => {
    if (!userData?.id) return;
    
    console.log('🎯 Triggering achievement:', achievementId);
    
    // ✅ FIRST: Check Supabase to avoid duplicates
    try {
      const { data: existing } = await supabase
        .from('user_achievements')
        .select('id')
        .eq('user_id', userData.id)
        .eq('achievement_type', achievementId)
        .maybeSingle();
      
      if (existing) {
        console.log('⏭️ Achievement already in Supabase:', achievementId);
        // Unlock in localStorage (sync state) but DON'T show notification
        unlockAchievement(userData.id, achievementId);
        return; // ⚠️ EXIT - no notification!
      }
    } catch (err) {
      console.error('❌ Error checking existing achievement:', err);
    }
    
    // SECOND: Unlock in localStorage
    const wasUnlocked = unlockAchievement(userData.id, achievementId);
    if (wasUnlocked) {
      console.log('🎉 NEW ACHIEVEMENT UNLOCKED:', achievementId);
      const achievement = getAchievement(achievementId);
      if (achievement) {
        // ✅ ADD TO VISIBLE STACK (zobrazení okamžitě!)
        setVisibleAchievements(prev => [...prev, achievement]);
        
        // 🔥 SHOW TOAST NOTIFICATION
        toast.success(`🎉 ${achievement.title}`, {
          description: achievement.description,
          duration: 4000,
        });
        
        // Update local state
        setUnlockedAchievements(prev => new Set([...prev, achievementId]));
        
        // 💾 SAVE TO SUPABASE
        try {
          const { error } = await supabase
            .from('user_achievements')
            .insert({
              user_id: userData.id,
              achievement_type: achievementId,
              title: achievement.title,
              description: achievement.description,
              icon: achievement.emoji,
              metadata: { points: achievement.points, category: achievement.category }
            });
          
          if (error) {
            // ✅ Ignoruj duplicate key error (23505) - může nastat při race condition
            if (error.code === '23505') {
              console.log('⏭️ Achievement already exists in DB (race condition prevented)');
            } else {
              console.error('❌ Failed to save achievement to Supabase:', error);
            }
          } else {
            console.log('✅ Achievement saved to Supabase!', achievementId);
          }
        } catch (err) {
          console.error('❌ Exception saving achievement:', err);
        }
        
        // 💫 CHECK FOR ULTIMATE MASTER: Po každém novém achievementu zkontroluj jestli má všechny
        // Reload from Supabase to get fresh data
        const currentUnlocked = await loadUnlockedAchievementsFromDB(userData.id);
        setUnlockedAchievements(currentUnlocked);
        
        const totalAchievements = ACHIEVEMENTS.length; // 20
        const unlockedWithoutUltimate = Array.from(currentUnlocked).filter(id => id !== 'ultimate-master').length;
        
        console.log('💫 Ultimate Master check:', {
          unlocked: unlockedWithoutUltimate,
          needed: totalAchievements - 1,
          hasUltimate: currentUnlocked.has('ultimate-master')
        });
        
        // Pokud má všech 19 (kromě ultimate-master) A ještě nemá ultimate-master
        if (unlockedWithoutUltimate >= totalAchievements - 1 && !currentUnlocked.has('ultimate-master')) {
          console.log('💫 TRIGGERING ULTIMATE MASTER!');
          // Zavolej znovu triggerAchievement (rekurzivně)
          setTimeout(() => {
            triggerAchievement('ultimate-master');
          }, 100);
        }
      }
    } else {
      console.log('⏭️ Achievement already unlocked in localStorage:', achievementId);
    }
  }, [userData?.id]);

  // 🎨 AUTO-CLOSE ACHIEVEMENTS - všechny achievementy zmizí po 3s
  useEffect(() => {
    if (visibleAchievements.length > 0) {
      const timer = setTimeout(() => {
        console.log('⏰ Auto-closing achievements:', visibleAchievements.length);
        setVisibleAchievements([]);
      }, 3000); // 3s = dost času na přečtení všech
      
      return () => clearTimeout(timer);
    }
  }, [visibleAchievements]);

  // 🔍 Check all achievements based on current data
  const checkAllAchievements = useCallback(async () => {
    if (!userData?.id) return;

    console.log('🔍 Checking all achievements...', {
      userId: userData.id,
      completedLessons: Array.from(completedLessons),
      completedCount: completedLessons.size
    });

    try {
      // FALLBACK LOGIKA: Retroaktivne odemkni achievementy pro stavajici uzivatele
      const { data: canvasData } = await supabase
        .from('user_canvas_data')
        .select('*')
        .eq('user_id', userData.id);

      // 🔄 FALLBACK: Odemkni achievementy které byly missované (silent)
      if (canvasData) {
        const allSections = ['segments', 'value', 'channels', 'relationships', 'revenue', 'resources', 'activities', 'partners', 'costs'];
        const filledSections = canvasData.filter((s: any) => 
          allSections.includes(s.section_key) && s.content?.length > 0
        );
        
        const hasLesson10Complete = completedLessons.has(10); // Lekce 10 = Canvas Validator
        const hasLesson11Complete = completedLessons.has(11);
        
        // validator-used FALLBACK - POUZE pokud user dokončil lekci 10 (Canvas Validator)
        if (!unlockedAchievements.has('validator-used') && hasLesson10Complete) {
          triggerAchievement('validator-used');
        }
        
        // profit-calculated FALLBACK
        const revenue = canvasData.find((s: any) => s.section_key === 'revenue');
        const costs = canvasData.find((s: any) => s.section_key === 'costs');
        const hasFinancialData = (revenue?.content?.length > 0 && revenue.content.some((i: any) => i.value > 0)) ||
                                 (costs?.content?.length > 0 && costs.content.some((i: any) => i.value > 0));
        
        if (!unlockedAchievements.has('profit-calculated') && hasFinancialData && hasLesson11Complete) {
          triggerAchievement('profit-calculated');
        }
        
        // ❌ profitable-business FALLBACK ODSTRANĚN!
        // Achievement se nyní odemyká POUZE v ProfitCalculator.tsx,
        // kde uživatel VIDÍ kompletní finanční analýzu (příjmy - náklady = zisk)
      }
      
      // ✅ RELOAD achievements from DB (po fallbacku)
      const currentUnlocked = await loadUnlockedAchievementsFromDB(userData.id);
      setUnlockedAchievements(currentUnlocked);
      
      // 🛠️ master-of-tools: Check if all tools used
      const hasValidator = currentUnlocked.has('validator-used');
      const hasCalculator = currentUnlocked.has('profit-calculated');
      const hasVPC = currentUnlocked.has('customer-profile-complete') || currentUnlocked.has('value-map-complete');
      const hasActionPlan = currentUnlocked.has('action-plan-unlocked');
      
      if (!currentUnlocked.has('master-of-tools') && hasValidator && hasCalculator && hasVPC && hasActionPlan) {
        triggerAchievement('master-of-tools');
        
        // Reload again after triggering master-of-tools
        const updated = await loadUnlockedAchievementsFromDB(userData.id);
        setUnlockedAchievements(updated);
      }
      
      // 💫 ultimate-master: Final reload and check
      const finalUnlocked = await loadUnlockedAchievementsFromDB(userData.id);
      setUnlockedAchievements(finalUnlocked);
      
      const totalAchievements = 20; // Total including ultimate-master
      const achievementsWithoutUltimate = totalAchievements - 1; // 19
      const unlockedWithoutUltimate = Array.from(finalUnlocked).filter(id => id !== 'ultimate-master').length;
      
      if (!finalUnlocked.has('ultimate-master') && unlockedWithoutUltimate >= achievementsWithoutUltimate) {
        triggerAchievement('ultimate-master');
      }

    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  }, [userData?.id, completedLessons, triggerAchievement]);

  // 🔍 Auto-check achievements when data is loaded + SYNC to Supabase
  useEffect(() => {
    const syncAchievementsToSupabase = async () => {
      if (!userData?.id) return;
      
      console.log('🔄 Syncing achievements from localStorage to Supabase...');
      
      // Load achievements from localStorage
      const localAchievements = loadUnlockedAchievements(userData.id);
      
      if (localAchievements.size === 0) {
        console.log('⏭️ No local achievements to sync');
        return;
      }
      
      try {
        // Load existing achievements from Supabase
        const { data: existingAchievements } = await supabase
          .from('user_achievements')
          .select('achievement_type')
          .eq('user_id', userData.id);
        
        const existingIds = new Set(existingAchievements?.map((a: any) => a.achievement_type) || []);
        
        // Find achievements that are in localStorage but NOT in Supabase
        const toSync = Array.from(localAchievements).filter(id => !existingIds.has(id));
        
        if (toSync.length === 0) {
          console.log('✅ All achievements already in Supabase');
        } else {
          console.log(`📤 Syncing ${toSync.length} achievements to Supabase...`);
          
          // Insert missing achievements
          for (const achievementId of toSync) {
            const achievement = getAchievement(achievementId);
            if (achievement) {
              const { error } = await supabase
                .from('user_achievements')
                .insert({
                  user_id: userData.id,
                  achievement_type: achievementId,
                  title: achievement.title,
                  description: achievement.description,
                  icon: achievement.emoji,
                  metadata: { points: achievement.points, category: achievement.category }
                });
              
              if (error) {
                console.error(`❌ Failed to sync achievement ${achievementId}:`, error);
              } else {
                console.log(`✅ Synced achievement: ${achievementId}`);
              }
            }
          }
          
          console.log('✅ Achievement sync complete!');
        }
      } catch (err) {
        console.error('❌ Failed to sync achievements:', err);
      }
      
      // After sync, check for NEW achievements
      const timer = setTimeout(() => {
        checkAllAchievements();
      }, 1000);
      return () => clearTimeout(timer);
    };
    
    if (userData?.id) {
      syncAchievementsToSupabase();
    }
  }, [userData?.id, checkAllAchievements]);

  // 🏆 PROFIT-CALCULATED Achievement: Trigger když user přejde na Lekci 11 (Finanční analýza)
  useEffect(() => {
    const checkProfitCalculatorAchievement = async () => {
      if (!userData?.id || !currentLesson) return;
      
      // ✅ Kontrola: Jsme na Lekci 11 (Finanční analýza)?
      if (currentLesson.id === 11) {
        console.log('💰 User navigated to Lesson 11 (Finanční anal��za) - checking profit data...');
        
        try {
          // Načti finanční data z Supabase
          const { data: canvasData } = await supabase
            .from('user_canvas_data')
            .select('*')
            .eq('user_id', userData.id);
          
          if (canvasData) {
            const revenue = canvasData.find(s => s.section_key === 'revenue');
            const costs = canvasData.find(s => s.section_key === 'costs');
            
            // ✅ Má user vyplněné Revenue NEBO Costs s hodnotou > 0?
            const hasRevenueData = revenue?.content?.length > 0 && revenue.content.some((i: any) => i.value > 0);
            const hasCostsData = costs?.content?.length > 0 && costs.content.some((i: any) => i.value > 0);
            
            if (hasRevenueData || hasCostsData) {
              console.log('💰 User has financial data - triggering profit-calculated achievement');
              triggerAchievement('profit-calculated');
            } else {
              console.log('⏭️ User on Lesson 11 but no financial data yet');
            }
          }
        } catch (error) {
          console.error('❌ Failed to check profit data:', error);
        }
      }
    };
    
    checkProfitCalculatorAchievement();
  }, [userData?.id, currentLesson, triggerAchievement]);

  const handleStartPractice = () => {
    // ✅ SAFE: Check if currentLesson exists
    if (!currentLesson) {
      console.error('❌ Cannot start practice: currentLesson is undefined');
      return;
    }
    
    // Check if mobile
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      toast.warning("⚠️ Canvas je optimalizovaný pro desktop. Pro nejlepší zkušenost použijte PC nebo tablet.", {
        duration: 5000
      });
    }
    
    setShowCanvas(true);
    setShowTourPopup(true);
    setHighlightedSectionId(currentLesson.canvasSection);
    
    setTimeout(() => {
      scrollToSection("canvas-wrapper");
    }, 300);
  };

  const handleCloseTourPopup = () => {
    setShowTourPopup(false);
  };

  const handleItemAdded = async () => {
    // ✅ SAFE: Check if currentLesson exists
    if (!currentLesson) {
      console.error('❌ Cannot add item: currentLesson is undefined');
      return;
    }
    
    // Po přidání první položky → označ jako "může pokračovat"
    const newCompleted = new Set(completedLessons);
    newCompleted.add(currentLesson.id);
    setCompletedLessons(newCompleted);
    
    // Save to Supabase
    if (userData?.id) {
      await saveLessonProgress(userData.id, currentLesson.id);
    }
    
    // Vypni GLOW (může přidat další položky)
    setHighlightedSectionId(undefined);
    
    // 🎉 Trigger achievements based on ACTUAL DATA (ne hned, musíme počkat na save)
    // Achievements se triggerují ve funkci která ukládá data do Supabase
    // (MobileSingleSection.tsx nebo MobileCanvasAccordion.tsx)
    
    // ❌ Odstraněno - duplicitní toast (achievement se zobrazuje vpravo)
  };
  
  const handleNextLesson = async () => {
    // Pokud to byla poslední lekce modulu → pokračuj na další modul
    if (isLastLesson) {
      if (currentModuleNumber < allModules.length) {
        // 🎉 KONFETTI + ACHIEVEMENT!
        celebrateModuleComplete();
        triggerAchievement(`module-${currentModuleNumber}-complete`);
        
        setCurrentModuleNumber(prev => prev + 1);
        setCurrentLessonIndex(0);
        setShowCanvas(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // ❌ Odstraněno - duplicitní toast (konfetti + achievement stačí)
      } else {
        // Poslední lekce posledního modulu - MEGA KONFETTI!
        celebrateModuleComplete();
        setTimeout(() => celebrateModuleComplete(), 500); // Double konfetti!
        // ✅ course-complete už neexistuje - achievements se triggerují v lekci 16
        
        setShowCanvas(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // �� Odstraněno - duplicitní toast (MEGA konfetti stačí)
      }
    } else {
      setCurrentLessonIndex(prev => prev + 1);
      setShowCanvas(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // 📱 MOBILE CANVAS UPDATE HANDLER
  const handleMobileCanvasUpdate = async (sectionKey: string, items: any[]) => {
    // Update canvas sections
    setCanvasSections(prev => {
      const newSections = [...prev];
      const sectionIndex = newSections.findIndex(s => s.id === sectionKey);
      
      if (sectionIndex >= 0) {
        newSections[sectionIndex] = { ...newSections[sectionIndex], items };
      } else {
        newSections.push({ id: sectionKey, items });
      }
      
      return newSections;
    });
    
    // Save to Supabase if authenticated
    if (userData?.id) {
      try {
        const { error } = await supabase
          .from('user_canvas_data')
          .upsert({
            user_id: userData.id,
            section_key: sectionKey,
            content: items,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'user_id,section_key'
          });
        
        if (error) throw error;
        console.log('✅ Mobile canvas updated:', sectionKey);
      } catch (error) {
        console.error('❌ Failed to save mobile canvas:', error);
      }
    }
  };
  
  // 🎨 VPC UPDATE HANDLER (Module 3)
  const handleVPCUpdate = (section: 'customer' | 'value', data: any) => {
    if (section === 'customer') {
      setVpcCustomerData(data);
    } else {
      setVpcValueData(data);
    }
    
    // TODO: Save to Supabase
    console.log('VPC Update:', section, data);
  };
  
  // 📝 MOBILE LESSON COMPLETE HANDLER
  const handleMobileLessonComplete = async (lessonId: number) => {
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonId);
    setCompletedLessons(newCompleted);
    
    // Save to Supabase
    if (userData?.id) {
      await saveLessonProgress(userData.id, lessonId);
    }
  };

  const handleShowDashboard = async () => {
    // Reload progress from Supabase
    if (userData?.id) {
      const freshProgress = await loadCourseProgress(userData.id);
      setCompletedLessons(freshProgress);
    }
    
    setShowMainDashboard(true);
    setShowCanvas(false);
    setShowTool(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSelectTool = (toolId: string) => {
    setShowTool(toolId);
    setShowMainDashboard(false);
    setShowCanvas(false);
    setShowActionPlan(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSelectLesson = (moduleId: number, lessonIndex: number) => {
    console.log('🔍 handleSelectLesson CALLED:', { moduleId, lessonIndex });
    console.log('🔍 showMainDashboard BEFORE:', showMainDashboard);
    
    // Check if trying to access Module 2+ without completing Module 1
    if (moduleId > 1) {
      const module1 = allModules.find(m => m.id === 1);
      const isModule1Complete = module1 ? module1.lessons.every(l => completedLessons.has(l.id)) : false;
      
      if (!isModule1Complete) {
        toast.error("🔒 Nejprve dokončete Modul 1 pro odemčení dalších modulů!");
        return;
      }
    }
    
    console.log('✅ Setting states...');
    setCurrentModuleNumber(moduleId);
    setCurrentLessonIndex(lessonIndex);
    setShowMainDashboard(false);
    setShowCanvas(false);
    setShowTool(null);
    console.log('✅ States set! showMainDashboard should be FALSE now');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleContinueFromMainDashboard = () => {
    // Najdi první nedokončenou lekci
    for (const module of allModules) {
      for (let i = 0; i < module.lessons.length; i++) {
        const lesson = module.lessons[i];
        if (!completedLessons.has(lesson.id)) {
          setCurrentModuleNumber(module.id);
          setCurrentLessonIndex(i);
          setShowMainDashboard(false);
          setShowCanvas(false);
          setShowTool(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
    }
    // Všechno hotovo
    // ❌ Odstraněno - duplicitní toast (achievement se zobrazuje vpravo)
  };

  const handleBackToLesson = () => {
    setShowCanvas(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // 👋 WELCOME MODAL HANDLERS
  const handleWelcomeStart = () => {
    localStorage.setItem('course_welcome_seen', 'true');
    setShowWelcomeModal(false);
    handleContinueFromMainDashboard(); // Start first lesson
  };
  
  const handleWelcomeClose = () => {
    localStorage.setItem('course_welcome_seen', 'true');
    setShowWelcomeModal(false);
    // Stay on dashboard
  };
  
  const handleOpenHelp = () => {
    setWelcomeMode("support"); // Help tlačítko = support formulář
    setShowWelcomeModal(true);
    console.log('🎫 Support Modal → Otevřeno help tlačítkem');
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ověřuji přístup...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Přístup odepřen
          </h1>
          <p className="text-gray-600 mb-6">
            Pro přístup ke kurzu potřebujete platný přístupový odkaz.
          </p>
          <Button
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Zpět na hlavní stránku
          </Button>
        </div>
      </div>
    );
  }

  // Show Action Plan
  if (showActionPlan) {
    return (
      <>
        <BusinessActionPlan
          userId={userData?.id || "guest"}
          onNavigateToLesson={(lessonId) => {
            // Find module and lesson index for this lesson ID
            for (const module of allModules) {
              const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
              if (lessonIndex !== -1) {
                setCurrentModuleNumber(module.id);
                setCurrentLessonIndex(lessonIndex);
                setShowActionPlan(false);
                setShowMainDashboard(false);
                break;
              }
            }
          }}
          onBack={() => {
            setShowActionPlan(false);
            setShowMainDashboard(true);
          }}
          refreshTrigger={actionPlanRefreshTrigger}
          onAchievementUnlocked={triggerAchievement}
        />
        
        {/* 🎉 ACHIEVEMENT NOTIFICATIONS - VERTICAL STACK */}
        {visibleAchievements.map((achievement, index) => (
          <AchievementNotification 
            key={achievement.id}
            achievement={achievement}
            index={index}
            onClose={() => {
              // Remove tento konkrétní achievement z visible listu
              setVisibleAchievements(prev => prev.filter(a => a.id !== achievement.id));
            }}
          />
        ))}
      </>
    );
  }

  // Show Tool - když je vybraný nástroj (POUZE DESKTOP)
  if (showTool && isAuthenticated && userData && !isMobile) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <CourseSidebar
              modules={allModules}
              currentModuleId={safeModuleNumber}
              currentLessonIndex={safeLessonIndex}
              completedLessons={completedLessons}
              onSelectLesson={handleSelectLesson}
              onShowDashboard={handleShowDashboard}
              showingDashboard={false}
              onSelectTool={handleSelectTool}
              currentTool={showTool}
            />
          </div>

          {/* Tool Content */}
          <div className="flex-1">
            {showTool === 'action-plan' && userData && (
              <BusinessActionPlan
                userId={userData.id}
                onBack={() => {
                  setShowTool(null);
                  setShowMainDashboard(true);
                }}
                onNavigateToLesson={(lessonId) => {
                  // Find the lesson and navigate to it
                  allModules.forEach((module) => {
                    const lessonIdx = module.lessons.findIndex(l => l.id === lessonId);
                    if (lessonIdx !== -1) {
                      setCurrentModuleNumber(module.id);
                      setCurrentLessonIndex(lessonIdx);
                      setShowTool(null);
                      setShowMainDashboard(false);
                    }
                  });
                }}
                refreshTrigger={actionPlanRefreshTrigger}
                onAchievementUnlocked={triggerAchievement}
              />
            )}
            {showTool === 'target-calculator' && <TargetCalculatorTool />}
            {showTool === 'segment-size' && <SegmentSizeTool />}
          </div>
        </div>
        
        {/* 👋 WELCOME MODAL (Support Ticket) */}
        <WelcomeModal 
          isOpen={showWelcomeModal}
          onClose={handleWelcomeClose}
          mode={welcomeMode}
        />
        
        {/* 💡 HELP BUTTON - Desktop (fixed bottom-right) */}
        <button
          onClick={handleOpenHelp}
          className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
          aria-label="Nápověda"
        >
          <HelpCircle className="w-6 h-6" />
          <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Potřebujete pomoc?
          </span>
        </button>
      </>
    );
  }

  // Show Main Dashboard (with sidebar) - pouze když je user autentizovaný A modules jsou načtené A není mobil
  if (showMainDashboard && isAuthenticated && userData && allModules.length > 0 && !isMobile) {
    return (
      <>
        <SimpleDashboard
          userId={userData.id}
          modules={allModules}
          completedLessons={completedLessons}
          currentModuleId={safeModuleNumber}
          currentLessonIndex={safeLessonIndex}
          onContinue={handleContinueFromMainDashboard}
          onSelectLesson={handleSelectLesson}
          onShowDashboard={handleShowDashboard}
          onProgressUpdate={(freshProgress) => {
            setCompletedLessons(freshProgress);
          }}
          onShowActionPlan={() => {
            setShowActionPlan(true);
            setShowMainDashboard(false);
          }}
          onCheckAchievements={checkAllAchievements}
          unlockedAchievements={unlockedAchievements}
          onSelectTool={handleSelectTool}
          currentTool={showTool}
          onShowWelcomeModal={handleOpenHelp}
        />
        
        {/* 💡 WELCOME/SUPPORT MODAL */}
        {showWelcomeModal && (
          <WelcomeModal
            isOpen={showWelcomeModal}
            onClose={handleWelcomeClose}
            mode={welcomeMode}
          />
        )}
      </>
    );
  }

  // ✅ SAFETY CHECK: Don't render if currentLesson is invalid
  if (!currentLesson || !currentModule) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Načítám kurz...</p>
        </div>
      </div>
    );
  }

  // 🔍 CHECK: Je uživatel AKTIVNĚ V CVIČENÍ? (klikl "Začít cvičení")
  const isInteractiveExercise = showCanvas; // TRUE jen když uživatel cvičí (Modul 1)
  const shouldShowDesktopSidebar = !isInteractiveExercise; // 🔥 DESKTOP FIRST - žádné isMobile
  
  // 📏 WIDE LAYOUT: POUZE pro interaktivní cvičení (Modul 1, lekce 1-9)
  const requiresWideLayout = isInteractiveExercise;

  // 📱 MOBILE VIEW - Dashboard, Sidebar & Module Components
  if (isMobile) {
    console.log('🎯 RENDERING MOBILE VERSION!', { currentModuleNumber, showMainDashboard, showTool });
    
    // Helper funkce pro canvas update z mobile komponent
    const handleMobileCanvasUpdate = (section: string, items: any[]) => {
      // Update canvasSections state
      setCanvasSections(prev => {
        const newSections = [...prev];
        const sectionIndex = newSections.findIndex(s => s.id === section);
        if (sectionIndex >= 0) {
          newSections[sectionIndex] = { ...newSections[sectionIndex], items };
        }
        return newSections;
      });
      
      // Save to Supabase if user is authenticated
      if (userData?.id) {
        supabase
          .from('user_canvas_data')
          .upsert({
            user_id: userData.id,
            section_key: section,
            content: items
          }, {
            onConflict: 'user_id,section_key'
          })
          .then(({ error }) => {
            if (error) {
              console.error('Canvas save error:', error);
              toast.error('⚠️ Nepodařilo se uložit změny');
            }
          });
      }
    };
    
    const handleMobileLessonComplete = async (lessonId: number) => {
      const newCompleted = new Set(completedLessons);
      newCompleted.add(lessonId);
      setCompletedLessons(newCompleted);
      
      // Save to database
      if (userData?.id) {
        await saveLessonProgress(userData.id, lessonId);
      }
      
      // Achievements are checked automatically via handleCheckAchievements
    };
    
    // Convert completedLessons to string format for mobile components
    const completedLessonsStrings = new Set(
      Array.from(completedLessons).map(id => {
        // Find which module this lesson belongs to
        for (const module of allModules) {
          const lesson = module.lessons.find(l => l.id === id);
          if (lesson) {
            return `${module.id}-${id}`;
          }
        }
        return '';
      }).filter(Boolean)
    );
    
    return (
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <Toaster position="top-right" />
        <AutosaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
        
        {/* 👋 WELCOME MODAL */}
        <WelcomeModal
          isOpen={showWelcomeModal}
          onStart={handleWelcomeStart}
          onClose={handleWelcomeClose}
          mode={welcomeMode}
        />
        
        {/* ACHIEVEMENT NOTIFICATIONS */}
        {visibleAchievements.map((achievement, index) => (
          <AchievementNotification
            key={achievement.id}
            achievement={achievement}
            index={index}
            onClose={() => {
              setVisibleAchievements(prev => prev.filter(a => a.id !== achievement.id));
            }}
          />
        ))}
        
        {/* MOBILE SIDEBAR */}
        <MobileCourseSidebar
          isOpen={showMobileSidebar}
          onClose={() => setShowMobileSidebar(false)}
          modules={allModules}
          currentModuleId={currentModuleNumber}
          currentLessonIndex={currentLessonIndex}
          completedLessons={completedLessonsStrings}
          onSelectLesson={(moduleId, lessonIndex) => {
            setCurrentModuleNumber(moduleId);
            setCurrentLessonIndex(lessonIndex);
            setShowMainDashboard(false);
            setShowTool(null); // 🔧 VYNULUJ NÁSTROJ při přechodu na lekci
            setShowMobileSidebar(false);
          }}
          onShowDashboard={() => {
            setShowMainDashboard(true);
            setShowTool(null); // 🔧 VYNULUJ NÁSTROJ při zobrazení dashboardu
            setShowMobileSidebar(false);
          }}
          showingDashboard={showMainDashboard}
          totalLessons={totalLessons}
          completedCount={completedLessons.size}
          onSelectTool={(toolId) => {
            setShowTool(toolId);
            setShowMainDashboard(false);
            setShowMobileSidebar(false);
          }}
          currentTool={showTool}
        />
        
        {/* MOBILE DASHBOARD */}
        {showMainDashboard && (
          <MobileCourseDashboard
            userId={userData?.id || 'guest'}
            modules={allModules}
            completedLessons={completedLessonsStrings}
            currentModuleId={currentModuleNumber}
            currentLessonIndex={currentLessonIndex}
            onContinue={() => {
              setShowMainDashboard(false);
              setShowTool(null); // 🔧 VYNULUJ NÁSTROJ při pokračování
            }}
            onSelectModule={(moduleId) => {
              setCurrentModuleNumber(moduleId);
              setCurrentLessonIndex(0);
              setShowMainDashboard(false);
              setShowTool(null); // 🔧 VYNULUJ NÁSTROJ při výběru modulu
            }}
            unlockedAchievements={unlockedAchievements}
            onOpenSidebar={() => setShowMobileSidebar(true)}
            onShowWelcomeModal={handleOpenHelp}
          />
        )}
        
        {/* MOBILE MODULE VIEW */}
        {!showMainDashboard && !showTool && currentModuleNumber === 1 && (
          <MobileCourseModule1
            moduleData={MODULE_1}
            canvasData={{
              segments: canvasSections.find(s => s.id === 'segments')?.items || [],
              value: canvasSections.find(s => s.id === 'value')?.items || [],
              channels: canvasSections.find(s => s.id === 'channels')?.items || [],
              relationships: canvasSections.find(s => s.id === 'relationships')?.items || [],
              revenue: canvasSections.find(s => s.id === 'revenue')?.items || [],
              partners: canvasSections.find(s => s.id === 'partners')?.items || [],
              activities: canvasSections.find(s => s.id === 'activities')?.items || [],
              resources: canvasSections.find(s => s.id === 'resources')?.items || [],
              costs: canvasSections.find(s => s.id === 'costs')?.items || [],
            }}
            onCanvasUpdate={handleMobileCanvasUpdate}
            completedLessons={completedLessonsStrings}
            onLessonComplete={handleMobileLessonComplete}
            currentLessonIndex={currentLessonIndex}
            onLessonChange={(index) => setCurrentLessonIndex(index)}
            onOpenSidebar={() => setShowMobileSidebar(true)}
            onOpenDashboard={() => {
              setShowMainDashboard(true);
              setShowTool(null); // 🔧 VYNULUJ NÁSTROJ
            }}
            onShowWelcomeModal={handleOpenHelp}
            totalLessons={totalLessons}
            onAchievementUnlocked={triggerAchievement}
          />
        )}
        
        {/* MODULE 2: OPTIMALIZACE BMC */}
        {!showMainDashboard && !showTool && currentModuleNumber === 2 && (
          <MobileCourseModule2
            userId={userData?.id || "guest"}
            moduleData={MODULE_2}
            canvasData={{
              segments: canvasSections.find(s => s.id === 'segments')?.items || [],
              value: canvasSections.find(s => s.id === 'value')?.items || [],
              channels: canvasSections.find(s => s.id === 'channels')?.items || [],
              relationships: canvasSections.find(s => s.id === 'relationships')?.items || [],
              revenue: canvasSections.find(s => s.id === 'revenue')?.items || [],
              partners: canvasSections.find(s => s.id === 'partners')?.items || [],
              activities: canvasSections.find(s => s.id === 'activities')?.items || [],
              resources: canvasSections.find(s => s.id === 'resources')?.items || [],
              costs: canvasSections.find(s => s.id === 'costs')?.items || [],
            }}
            onCanvasUpdate={handleMobileCanvasUpdate}
            completedLessons={completedLessonsStrings}
            onLessonComplete={handleMobileLessonComplete}
            currentLessonIndex={currentLessonIndex}
            onLessonChange={(index) => setCurrentLessonIndex(index)}
            onOpenSidebar={() => setShowMobileSidebar(true)}
            onOpenDashboard={() => {
              setShowMainDashboard(true);
              setShowTool(null); // 🔧 VYNULUJ NÁSTROJ
            }}
            onShowWelcomeModal={handleOpenHelp}
            totalLessons={totalLessons}
            onAchievementUnlocked={triggerAchievement}
          />
        )}
        
        {/* MODULE 3: VPC + FIT */}
        {!showMainDashboard && !showTool && currentModuleNumber === 3 && (
          <MobileCourseModule3
            moduleData={MODULE_3}
            vpcData={{
              customer: vpcCustomerData,
              value: vpcValueData,
            }}
            onVPCUpdate={handleVPCUpdate}
            completedLessons={completedLessonsStrings}
            onLessonComplete={handleMobileLessonComplete}
            currentLessonIndex={currentLessonIndex}
            onLessonChange={(index) => setCurrentLessonIndex(index)}
            onOpenSidebar={() => setShowMobileSidebar(true)}
            onOpenDashboard={() => {
              setShowMainDashboard(true);
              setShowTool(null); // 🔧 VYNULUJ NÁSTROJ
            }}
            availableSegments={canvasSections.find(s => s.id === 'segments')?.items || []}
            availableValues={canvasSections.find(s => s.id === 'value')?.items || []}
            selectedSegment={selectedVPCSegment || undefined}
            onSelectSegment={(seg) => {
              setSelectedVPCSegment(seg);
            }}
            selectedValue={selectedVPCValue || undefined}
            onSelectValue={(val) => {
              setSelectedVPCValue(val);
            }}
            onShowWelcomeModal={handleOpenHelp}
            totalLessons={totalLessons}
            userData={userData}
            onNavigateToTool={(toolId) => {
              setShowTool(toolId);
              setShowMainDashboard(false);
            }}
            onAchievementUnlocked={triggerAchievement}
          />
        )}
        
        {/* MOBILE TOOLS - Direct render without extra wrapper */}
        {!showMainDashboard && showTool === 'action-plan' && userData && (
          <MobileBusinessActionPlan
            userId={userData.id}
            onOpenSidebar={() => setShowMobileSidebar(true)}
            onNavigateToLesson={(lessonId) => {
              allModules.forEach((module) => {
                const lessonIdx = module.lessons.findIndex(l => l.id === lessonId);
                if (lessonIdx !== -1) {
                  setCurrentModuleNumber(module.id);
                  setCurrentLessonIndex(lessonIdx);
                  setShowTool(null);
                  setShowMainDashboard(false);
                }
              });
            }}
            onAchievementUnlocked={triggerAchievement}
            onShowWelcomeModal={handleOpenHelp}
          />
        )}
        
        {!showMainDashboard && showTool === 'target-calculator' && (
          <MobileTargetCalculatorTool
            onOpenSidebar={() => setShowMobileSidebar(true)}
            onShowWelcomeModal={handleOpenHelp}
          />
        )}
        
        {!showMainDashboard && showTool === 'segment-size' && (
          <MobileSegmentSizeTool
            onOpenSidebar={() => setShowMobileSidebar(true)}
            onShowWelcomeModal={handleOpenHelp}
          />
        )}
      </div>
    );
  }

  // 🖥️ DESKTOP VIEW - Současný kód zůstává
  return (
    <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
      {/* 👋 WELCOME MODAL (Support Ticket) */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={handleWelcomeClose}
        mode={welcomeMode}
      />
      
      {/* 🖥️ DESKTOP SIDEBAR - ALWAYS VISIBLE (except during exercise) */}
      {shouldShowDesktopSidebar && (
        <div className="w-80 flex-shrink-0">
          <CourseSidebar
            modules={allModules}
            currentModuleId={currentModuleNumber}
            currentLessonIndex={currentLessonIndex}
            completedLessons={completedLessons}
            onSelectLesson={handleSelectLesson}
            onShowDashboard={handleShowDashboard}
            showingDashboard={showMainDashboard}
            onSelectTool={handleSelectTool}
            currentTool={showTool}
          />
        </div>
      )}

      {/* 🖥️ MAIN CONTENT - DESKTOP FIRST, FULL WIDTH */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* 🖥️ DESKTOP HEADER - Sticky, Centered with Content */}
        <div className="bg-white border-b-2 border-gray-200 sticky top-0 z-20">
          <div className="w-full px-4 md:px-6 py-3">
            {/* Centered wrapper - STEJNÁ ŠÍŘKA jako content! */}
            <div className={`mx-auto ${requiresWideLayout ? 'max-w-[1600px]' : 'max-w-6xl'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-base font-semibold text-gray-900">
                      Modul {currentModuleNumber}: {currentModule.title}
                    </div>
                    <p className="text-xs text-gray-500">
                      Lekce {currentLessonIndex + 1}/{currentModule.lessons.length}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Progress Info */}
                  <div className="text-right">
                    <div className="text-sm font-semibold text-blue-600">
                      {Math.round((completedLessons.size / Math.max(1, totalLessons)) * 100)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {completedLessons.size}/{totalLessons}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  style={{ width: `${Math.round((completedLessons.size / Math.max(1, totalLessons)) * 100)}%` }}
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 ease-out"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 🖥️ DESKTOP CONTENT - 6xl pro lekce, 1600px pro cvičení A CanvasValidator */}
        <div className="w-full px-4 md:px-6 py-8">
          <div className={`flex flex-col gap-6 w-full mx-auto ${requiresWideLayout ? 'max-w-[1600px]' : 'max-w-6xl'}`}>
            {/* 🖥️ DESKTOP LESSON HEADER */}
            {currentLesson.id !== 16 && (
              <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white rounded-2xl p-8 shadow-md relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-24 translate-y-24" />
                </div>
                
                <div className="relative flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="inline-block px-4 py-1.5 bg-white/20 rounded-full mb-3 backdrop-blur-sm">
                      Lekce {currentLessonIndex + 1} z {currentModule.lessons.length}
                    </div>
                    <h2 className="font-bold mb-2">{currentLesson.title}</h2>
                    <p className="text-blue-100 leading-relaxed">{currentLesson.description}</p>
                  </div>
                  {completedLessons.has(currentLesson.id) && (
                    <div className="bg-green-500 rounded-xl p-4 shadow-lg flex-shrink-0">
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Content Section */}
            <div className="space-y-6">
              {/* Video (pouze pokud existuje URL) */}
              {currentLesson.videoUrl && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-3 shadow-lg">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Výuková lekce</h3>
                      <p className="text-gray-600">Sledujte video a naučte se koncept</p>
                    </div>
                  </div>

                  <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      src={currentLesson.videoUrl}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Text Content - Rich or Plain */}
              <div className="w-full">
                {/* MODUL 2 - Lekce 1: Canvas Validator */}
                {currentLesson.id === 10 && userData?.id && (
                  <>
                    {/* Text content before tool */}
                    {currentLesson.content && (
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <div
                          className="prose"
                          style={{ maxWidth: 'none' }}
                          dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                        />
                      </div>
                    )}
                    <CanvasValidator
                      userId={userData.id}
                      onAchievementUnlocked={triggerAchievement}
                      onComplete={async () => {
                        const newCompleted = new Set(completedLessons);
                        newCompleted.add(currentLesson.id);
                        setCompletedLessons(newCompleted);
                        
                        if (userData?.id) {
                          await saveLessonProgress(userData.id, currentLesson.id);
                        }
                      }}
                      onNavigateNext={() => handleNextLesson()}
                      isLessonCompleted={completedLessons.has(currentLesson.id)}
                    />
                  </>
                )}
                
                {/* MODUL 2 - Lekce 2: Profit Calculator */}
                {currentLesson.id === 11 && userData?.id && (
                  <>
                    {/* Text content before tool */}
                    {currentLesson.content && (
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <div
                          className="prose"
                          style={{ maxWidth: 'none' }}
                          dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                        />
                      </div>
                    )}
                    <ProfitCalculator
                      userId={userData.id}
                      onComplete={async () => {
                        const newCompleted = new Set(completedLessons);
                        newCompleted.add(currentLesson.id);
                        setCompletedLessons(newCompleted);
                        
                        if (userData?.id) {
                          await saveLessonProgress(userData.id, currentLesson.id);
                        }
                      }}
                      onNavigateNext={() => handleNextLesson()}
                      isLessonCompleted={completedLessons.has(currentLesson.id)}
                    />
                  </>
                )}
                
                {/* MODUL 2 - Lekce 3: Problem Solver - VŽDY VIDITELNÝ! */}
                {currentLesson.id === 12 && userData?.id && (
                  <>
                    {/* Text content before tool */}
                    {currentLesson.content && (
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <div
                          className="prose"
                          style={{ maxWidth: 'none' }}
                          dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                        />
                      </div>
                    )}
                    <ProblemSolver
                      userId={userData.id}
                      onAchievementUnlocked={triggerAchievement}
                      onComplete={async () => {
                        const newCompleted = new Set(completedLessons);
                        newCompleted.add(currentLesson.id);
                        setCompletedLessons(newCompleted);
                        
                        if (userData?.id) {
                          await saveLessonProgress(userData.id, currentLesson.id);
                        }
                      }}
                      onNavigateNext={() => handleNextLesson()}
                      isLessonCompleted={completedLessons.has(currentLesson.id)}
                    />
                  </>
                )}
                
                {/* MODUL 2 - Lekce 4: Galerie podnikatelských modelů */}
                {currentLesson.id === 13 && currentModuleNumber === 2 && (
                  <>
                    {/* Text content before tool */}
                    {currentLesson.content && (
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <div
                          className="prose"
                          style={{ maxWidth: 'none' }}
                          dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                        />
                      </div>
                    )}
                    <BusinessModelGallery
                      onComplete={async () => {
                        const newCompleted = new Set(completedLessons);
                        newCompleted.add(currentLesson.id);
                        setCompletedLessons(newCompleted);
                        
                        if (userData?.id) {
                          await saveLessonProgress(userData.id, currentLesson.id);
                        }
                      }}
                      onNavigateNext={() => handleNextLesson()}
                      isLessonCompleted={completedLessons.has(currentLesson.id)}
                    />
                  </>
                )}
                
                {/* MODUL 3 - Lekce 1: Customer Profile */}
                {currentLesson.id === 14 && (
                  <>
                    {/* Text content before tool */}
                    {currentLesson.content && (
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <div
                          className="prose"
                          style={{ maxWidth: 'none' }}
                          dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                        />
                      </div>
                    )}
                    <VPCCustomerProfileStory
                        userId={userData?.id || "guest"}
                        selectedSegment={selectedVPCSegment}
                        onSelectSegment={(newSegment) => {
                          setSelectedVPCSegment(newSegment);
                          setSelectedVPCValue(null);
                        }}
                        onAchievementUnlocked={triggerAchievement}
                        onComplete={async () => {
                          const newCompleted = new Set([...completedLessons, currentLesson.id]);
                          setCompletedLessons(newCompleted);
                          
                          if (userData?.id) {
                            await saveLessonProgress(userData.id, currentLesson.id);
                          }
                          
                          triggerAchievement('customer-profile-complete');
                          
                          setTimeout(() => {
                            setCurrentLessonIndex(prev => prev + 1);
                          }, 1000);
                        }}
                      />
                  </>
                )}
                
                {currentLesson.id === 15 && (
                  <>
                    {/* Text content before tool */}
                    {currentLesson.content && (
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <div
                          className="prose"
                          style={{ maxWidth: 'none' }}
                          dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                        />
                      </div>
                    )}
                    <VPCValueMapSquare
                        userId={userData?.id || "guest"}
                        selectedSegment={selectedVPCSegment || "Můj segment"}
                        selectedValue={selectedVPCValue}
                        onSelectValue={setSelectedVPCValue}
                        onAchievementUnlocked={triggerAchievement}
                        onComplete={async () => {
                          console.log('🎯 Lekce 15 onComplete called!', { userId: userData?.id, lessonId: currentLesson.id });
                        
                        // 🎉 Achievement za hodnotovou mapu
                        triggerAchievement('value-map-complete');
                        
                        // ✅ Označ lekci jako dokončenou (local + DB)
                        const newCompleted = new Set([...completedLessons, currentLesson.id]);
                        setCompletedLessons(newCompleted);
                        
                        // 💾 Ulož do Supabase
                        if (userData?.id) {
                          const success = await saveLessonProgress(userData.id, currentLesson.id);
                          console.log('💾 saveLessonProgress result:', success);
                          
                          if (!success) {
                            toast.error('⚠️ Nepodařilo se uložit progress.');
                          }
                        }
                        // ❌ SMAZÁNO - duplicitní toast (achievement stačí)
                        // toast.success(`✅ Lekce "${currentLesson.title}" dokončena!`);
                        
                        // ✅ Automaticky přejdi na další lekci (Krok 3 - FIT Validator)
                        setTimeout(() => {
                          setCurrentLessonIndex(prev => prev + 1);
                        }, 1000); // 1s delay pro toast message
                      }}
                    />
                  </>
                )}
                
                {currentLesson.id === 16 && (
                  <FitValidatorV2 
                        key={`fit-validator-${currentLessonIndex}-${selectedVPCSegment}`}
                        userId={userData?.id || "guest"} 
                        selectedSegment={selectedVPCSegment || ""}
                        onSegmentChange={setSelectedVPCSegment}
                        onValueChange={setSelectedVPCValue}
                        isLessonCompleted={completedLessons.has(16)}
                        onAchievementUnlocked={triggerAchievement}
                        onNavigateToLesson={(lessonId) => {
                          // Navigate to Modul 3, Lesson with specific ID
                          const lessonIndex = MODULE_3.lessons.findIndex(l => l.id === lessonId);
                          if (lessonIndex !== -1) {
                            // Přepni na danou lekci v Modulu 3
                            handleLessonChange(MODULE_3.lessons[lessonIndex]);
                            // 📜 Scroll nahoru
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        onNavigateToTool={(tool) => {
                          // Navigate to tools (action-plan)
                          if (tool === 'action-plan') {
                            setShowMainDashboard(false);
                            setShowActionPlan(true);
                            setShowTool(null);
                          }
                        }}
                        onComplete={async (fitScore) => {
                          console.log('🎯 Lekce 16 onComplete called!', { userId: userData?.id, lessonId: currentLesson.id, fitScore });
                          
                          // ✅ Check jestli už není dokončená
                          const wasAlreadyCompleted = completedLessons.has(currentLesson.id);
                          
                          // ✅ Označ lekci jako dokončenou (local + DB)
                          const newCompleted = new Set([...completedLessons, currentLesson.id]);
                          setCompletedLessons(newCompleted);
                          
                          // 💾 Ulož do Supabase
                          if (userData?.id) {
                            const success = await saveLessonProgress(userData.id, currentLesson.id);
                            console.log('💾 saveLessonProgress result:', success);
                            
                            if (!success) {
                              toast.error('⚠️ Nepodařilo se uložit progress.');
                            }
                          }
                          
                          // 🎉 Achievements a konfety JEN když se NOVĚ dokončuje!
                          if (!wasAlreadyCompleted) {
                            // 🎉 Achievement podle FIT Score - POSTUPNĚ!
                            if (fitScore >= 70) {
                              triggerAchievement('fit-70-percent');
                            }
                            if (fitScore >= 80) {
                              triggerAchievement('product-fit-master');
                            }
                            if (fitScore >= 90) {
                              triggerAchievement('fit-90-percent');
                            }
                            
                            // 🎓 Achievement za dokončení Modulu 3 = ABSOLVENT KURZU!
                            triggerAchievement('module-3-complete');
                            
                            // 🎊 Konfety!
                            celebrateModuleComplete();
                            
                            // ✅ ŽÁDNÝ TOAST - jen achievement notifikace!
                          } else {
                            // Už bylo dokončené - jen ulož progress, ŽÁDNÝ toast!
                            console.log('✅ FIT Validace uložena (již dokončeno)');
                          }
                        }}
                      />
                )}
                
                {/* Ostatní lekce (Modul 1) */}
                {![10, 11, 12, 13, 14, 15, 16].includes(currentLesson.id) && (
                  currentLesson.examples || currentLesson.tips || currentLesson.showDemo ? (
                    <LessonContentRenderer
                      content={currentLesson.content}
                      examples={currentLesson.examples}
                      tips={currentLesson.tips}
                      showDemo={currentLesson.showDemo}
                      hideTips={currentModuleNumber === 1}
                    />
                  ) : currentLesson.content ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all">
                      <div
                        className="prose"
                        style={{ maxWidth: 'none' }}
                        dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                      />
                    </div>
                  ) : null
                )}
              </div>

              {/* Mobile Warning - Modul 1 není podporován na mobilu */}
              {!showCanvas && currentModuleNumber === 1 && (
                <>
                  {/* Desktop - Modern CTA */}
                  {!isMobile && (
                    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-center shadow-xl relative overflow-hidden transition-all">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-2xl" />
                      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full blur-2xl" />
                    </div>
                    
                    <div className="relative">
                      <div className="inline-block mb-3">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-bold">
                          🎯 PRAKTICKÉ CVIČENÍ
                        </div>
                      </div>
                      <h4 className="text-3xl font-bold text-white mb-3">
                        Teď to zkus!
                      </h4>
                      <p className="text-purple-100 text-lg mb-6 max-w-2xl mx-auto">
                        Aplikujte to, co jste se naučili, přímo na vaší Podnikatelské čtvrtce
                      </p>
                      <Button
                        onClick={handleStartPractice}
                        size="lg"
                        className="bg-white text-purple-600 hover:bg-purple-50 font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                      >
                        Začít cvičení →
                      </Button>
                    </div>
                  </div>
                  )}

                  {/* Mobile - Jednoduchá sekce (jen aktuální Canvas sekce) */}
                  {isMobile && (
                    <div className="space-y-4 transition-all">
                    <div className="text-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-lg">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 inline-block mb-2 text-xs text-white font-bold">
                        📱 MOBIL
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">
                        {currentLesson.title}
                      </h4>
                      <p className="text-sm text-blue-100">
                        Přidejte položky do Canvas
                      </p>
                    </div>
                    
                    {/* Canvas Preview - ODSTRANĚNO (způsobovalo chyby s canvasSections.map) */}
                    
                    {/* Jednoduchá sekce - jen aktuální */}
                    <MobileSingleSection
                      sectionTitle={currentLesson.title}
                      items={mobileCanvasData || []}
                      valueLabel={
                        currentLesson.canvasSection === 'revenue' || currentLesson.canvasSection === 'costs'
                          ? 'Kč / měsíc'
                          : undefined
                      }
                      allowGlobal={
                        // Globální JEN pro: partners, activities, resources, costs, revenue
                        // ❌ NE pro: segments, value, channels, relationships
                        currentLesson.canvasSection === 'partners' ||
                        currentLesson.canvasSection === 'activities' ||
                        currentLesson.canvasSection === 'resources' ||
                        currentLesson.canvasSection === 'costs' ||
                        currentLesson.canvasSection === 'revenue'
                      }
                      onAddItem={async (text, color, value) => {
                        if (!userData?.id || !currentLesson.canvasSection) return;
                        
                        try {
                          const newItem = { text, color, value };
                          const currentData = Array.isArray(mobileCanvasData) ? mobileCanvasData : [];
                          const updatedItems = [...currentData, newItem];
                          
                          console.log('Saving:', { userId: userData.id, section: currentLesson.canvasSection, items: updatedItems });
                          
                          // Save to Supabase (UPSERT with conflict resolution!)
                          const { error } = await supabase
                            .from('user_canvas_data')
                            .upsert({
                              user_id: userData.id,
                              section_key: currentLesson.canvasSection,
                              content: updatedItems
                            }, {
                              onConflict: 'user_id,section_key'
                            });
                          
                          if (error) {
                            console.error('Supabase error:', error);
                            toast.error("Chyba: " + error.message);
                          } else {
                            setMobileCanvasData(updatedItems);
                            
                            // 🎉 ACHIEVEMENT TRIGGERING (real-time)
                            const section = currentLesson.canvasSection;
                            const itemCount = updatedItems.length;
                            
                            // First segment/value
                            if (section === 'segments' && itemCount === 1) {
                              triggerAchievement('first-segment');
                            } else if (section === 'value' && itemCount === 1) {
                              triggerAchievement('first-value');
                            }
                            
                            // Profit calculated (revenue/costs s value > 0)
                            if ((section === 'revenue' || section === 'costs') && updatedItems.some((i: any) => i.value && i.value > 0)) {
                              triggerAchievement('profit-calculated');
                            }
                            
                            // Check if all 9 sections filled
                            const { data: allSections } = await supabase
                              .from('user_canvas_data')
                              .select('section_key, content')
                              .eq('user_id', userData.id);
                            
                            if (allSections) {
                              const requiredSections = ['segments', 'value', 'channels', 'relationships', 'revenue', 'resources', 'activities', 'partners', 'costs'];
                              const filledSections = allSections.filter(s => 
                                requiredSections.includes(s.section_key) && s.content?.length > 0
                              );
                              
                              if (filledSections.length === 9) {
                                triggerAchievement('all-sections-filled');
                              }
                              
                              // ❌ "profitable-business" achievement SE NETRIGGERUJE ZDE!
                              // Triggeruje se v ProfitCalculator (Modul 2, Lekce 2) když user VIDÍ finanční analýzu
                            }
                          }
                        } catch (err) {
                          console.error('Error adding item:', err);
                          toast.error("Chyba při přidávání");
                        }
                      }}
                      onRemoveItem={async (index) => {
                        if (!userData?.id || !currentLesson.canvasSection) return;
                        
                        const updatedItems = (mobileCanvasData || []).filter((_: any, i: number) => i !== index);
                        
                        // Save to Supabase (UPSERT with conflict resolution!)
                        const { error } = await supabase
                          .from('user_canvas_data')
                          .upsert({
                            user_id: userData.id,
                            section_key: currentLesson.canvasSection,
                            content: updatedItems
                          }, {
                            onConflict: 'user_id,section_key'
                          });
                        
                        if (!error) {
                          setMobileCanvasData(updatedItems);
                          // ❌ Odstraněno - duplicitní toast
                        }
                      }}
                      onEditItem={async (index, text, color, value) => {
                        if (!userData?.id || !currentLesson.canvasSection) return;
                        
                        // ✅ IN-PLACE editace jako na desktopu
                        const updatedItems = (mobileCanvasData || []).map((item: any, i: number) => {
                          if (i === index) {
                            return { ...item, text, color, value };
                          }
                          return item;
                        });
                        
                        // Save to Supabase (UPSERT with conflict resolution!)
                        const { error } = await supabase
                          .from('user_canvas_data')
                          .upsert({
                            user_id: userData.id,
                            section_key: currentLesson.canvasSection,
                            content: updatedItems
                          }, {
                            onConflict: 'user_id,section_key'
                          });
                        
                        if (!error) {
                          setMobileCanvasData(updatedItems);
                          toast.success("✅ Štítek upraven!");
                        }
                      }}
                      onComplete={async () => {
                        const newCompleted = new Set(completedLessons);
                        newCompleted.add(currentLesson.id);
                        setCompletedLessons(newCompleted);
                        if (userData?.id) {
                          await saveLessonProgress(userData.id, currentLesson.id);
                        }
                        // ❌ Odstraněno - duplicitní toast
                        
                        // REDIRECT na další lekci
                        setTimeout(() => {
                          handleNextLesson();
                        }, 500);
                      }}
                    />
                    
                    <p className="text-xs text-gray-600 text-center">
                      💡 Tip: Na PC uvidíte celý Canvas najednou
                    </p>
                  </div>
                  )}
                </>
              )}
              
              {/* CTA - Modul 2 (Interaktivní lekce) - PRÁZDNÉ (lekce 10-13 jsou výše) */}
              {!showCanvas && currentModuleNumber === 2 && (
                <div className="transition-all">
                  {/* ✅ Lekce 10-13 jsou renderované výše (řádky 2499-2616) s textovým obsahem */}
                </div>
              )}
              

            </div>

            {/* Canvas Section - FULL SCREEN MODE! */}
            {showCanvas && (
              <div
                id="canvas-wrapper"
                className="fixed inset-0 z-50 bg-gray-100 overflow-y-auto transition-all"
              >
                {/* Canvas Header - Floating */}
                <div className="sticky top-0 z-10 bg-white border-b-2 border-gray-200 shadow-sm">
                  <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-16 py-3">
                    <div className="flex items-center justify-between">
                      <Button
                        onClick={handleBackToLesson}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Zpět na lekci
                      </Button>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span>Úprava Canvas</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-[1400px] mx-auto px-6 py-8">
                  <div className="bg-white border-4 border-blue-500 rounded-xl p-6 shadow-2xl">
                      <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-5">
                        <p className="text-blue-900 font-bold text-lg flex items-center gap-2">
                          <span className="text-2xl">👇</span>
                          <span>Vyplňte zvýrazněnou sekci. <strong>Tip:</strong> Klikněte 2x na štítek pro editaci</span>
                        </p>
                      </div>

                      {/* GLOW CSS */}
                      {highlightedSectionId && (
                        <style>{`
                    [data-canvas-section="${highlightedSectionId}"] {
                      position: relative;
                      z-index: 45 !important;
                      animation: pulse-glow 2s ease-in-out infinite;
                      border-width: 4px !important;
                    }
                    
                    @keyframes pulse-glow {
                      0%, 100% {
                        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.8),
                                    0 0 40px 15px rgba(59, 130, 246, 0.6),
                                    inset 0 0 20px rgba(59, 130, 246, 0.2);
                        border-color: rgb(59, 130, 246) !important;
                        background-color: rgba(59, 130, 246, 0.05);
                      }
                      50% {
                        box-shadow: 0 0 0 12px rgba(59, 130, 246, 0.3),
                                    0 0 80px 30px rgba(59, 130, 246, 0.4),
                                    inset 0 0 30px rgba(59, 130, 246, 0.15);
                        border-color: rgb(96, 165, 250) !important;
                        background-color: rgba(96, 165, 250, 0.08);
                      }
                    }
                        `}</style>
                      )}

                      <BusinessModelCanvasSimple
                  userId={userData?.id || "guest"}
                  highlightSection={highlightedSectionId}
                  hideTips={true}
                  allowedSection={currentLesson.canvasSection}
                  onAchievementUnlocked={triggerAchievement}
                  onItemAdded={(sectionId) => {
                    if (highlightedSectionId && sectionId === highlightedSectionId) {
                      handleItemAdded();
                    }
                  }}
                />

                {completedLessons.has(currentLesson.id) && (
                  <div className="mt-6 bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 rounded-2xl p-8 text-white shadow-xl">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <CheckCircle2 className="w-8 h-8 text-white flex-shrink-0" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold mb-2 text-white">
                          ✅ Skvělá práce!
                        </h4>
                        <p className="text-purple-50 text-lg">
                          Přidali jste alespoň jednu položku. Můžete přidat další nebo pokračovat na další lekci.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 mb-6">
                      <p className="text-sm text-white">
                        💡 <strong>Tip:</strong> Máte více zdrojů/aktivit/kanálů? Klidně přidejte více položek! 
                        Např. "Budova (kavárna)" + "Zaměstnanci" + "Zařízení"
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowCanvas(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        size="lg"
                        className="flex-1 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
                      >
                        ← Zpět na lekci
                      </Button>
                      {!isLastLesson && (
                        <Button
                          onClick={handleNextLesson}
                          size="lg"
                          className="flex-1 bg-white text-purple-600 hover:bg-purple-50"
                        >
                          Pokračovat na další lekci →
                        </Button>
                      )}
                      {isLastLesson && (
                        <Button
                          onClick={handleNextLesson}
                          size="lg"
                          className="flex-1 bg-white text-purple-600 hover:bg-purple-50"
                        >
                          {currentModuleNumber < allModules.length ? 'Dokončit modul →' : '🎉 Dokončit kurz'}
                        </Button>
                      )}
                    </div>
                  </div>
                )}
                  </div>
                </div>
              </div>
            )}
          </div> {/* Konec flex flex-col gap-6 */}
        </div> {/* Konec lesson content wrapper */}
          
        {/* Guided Tour Popup */}
        <GuidedTour
          step={1}
          totalSteps={1}
          isActive={showTourPopup}
          onNext={handleCloseTourPopup}
          onSkip={handleCloseTourPopup}
          onComplete={handleCloseTourPopup}
          highlightSection={currentLesson.canvasSection}
          title={currentLesson.title}
          description={currentLesson.description}
          tips={currentLesson.tips}
        />
        
        {/* 💾 AUTOSAVE INDICATOR */}
        <AutosaveIndicator 
          isSaving={isSaving} 
          lastSaved={lastSaved}
          show={!showMainDashboard}
        />
        
        {/* 🎉 ACHIEVEMENT NOTIFICATIONS - VERTICAL STACK */}
        {visibleAchievements.map((achievement, index) => (
          <AchievementNotification 
            key={achievement.id}
            achievement={achievement}
            index={index}
            onClose={() => {
              // Remove tento konkrétní achievement z visible listu
              setVisibleAchievements(prev => prev.filter(a => a.id !== achievement.id));
            }}
          />
        ))}
        
        {/* 👋 WELCOME MODAL (Support Ticket) */}
        <WelcomeModal 
          isOpen={showWelcomeModal}
          onClose={handleWelcomeClose}
          mode={welcomeMode}
        />
        
        {/* 💡 HELP BUTTON - Desktop (fixed bottom-right) */}
        <button
          onClick={handleOpenHelp}
          className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
          aria-label="Nápověda"
        >
          <HelpCircle className="w-6 h-6" />
          <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Potřebujete pomoc?
          </span>
        </button>
      </div>
    </div>
  );
}

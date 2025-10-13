import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, ArrowLeft, Trophy, Lock, CheckCircle2, Play, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import { supabase, verifyAccessToken } from "../lib/supabase";
import { loadCourseProgress, saveLessonProgress, resetAllProgress } from "../lib/courseProgress";
import { BusinessModelCanvasSimple } from "./BusinessModelCanvasSimple";
import { GuidedTour, scrollToSection } from "./GuidedTour";
import { SimpleDashboard } from "./SimpleDashboard";
import { BusinessActionPlan } from "./BusinessActionPlan";
import { CourseSidebar } from "./CourseSidebar";
import { MobileSidebarContent } from "./MobileSidebarContent";
import { MobileCanvasAccordion } from "./MobileCanvasAccordion";
import { MobileSingleSection } from "./MobileSingleSection";
import { CanvasValidator } from "./CanvasValidator";
import { ProfitCalculator } from "./ProfitCalculator";
import { ProblemSolver } from "./ProblemSolver";
import { LessonContentRenderer } from "./LessonContentRenderer";
import { BusinessModelGallery } from "./BusinessModelGallery";
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
import { celebrateModuleComplete, celebrateLessonComplete } from "../lib/confetti";
import { getAchievement, unlockAchievement, loadUnlockedAchievements } from "../lib/achievements";
import type { Achievement } from "../lib/achievements";

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
  description: "Naučte se všech 9 stavebních bloků Business Model Canvas",
  lessons: [
    {
      id: 1,
      title: "Zákaznické segmenty",
      canvasSection: "segments",
      videoUrl: "",
      description: "Kdo jsou vaši zákazníci? Naučte se je identifikovat.",
      content: `
        <p><strong>Zákaznický segment</strong> je skupina lidí nebo firem, kteří mají společné potřeby, chování nebo charakteristiky.</p>
        
        <h4>Proč je to důležité?</h4>
        <p>Nemůžete prodávat všem! Čím konkrétnější je váš segment, tím:</p>
        <ul>
          <li>✅ Lépe cílíte marketing</li>
          <li>✅ Snáze oslovujete zákazníky</li>
          <li>✅ Přesněji vytváříte hodnotu</li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ: Logika barev!</h4>
        <p><strong>Každý segment = jedna barva štítku.</strong> Tuto barvu pak použijete ve všech sekcích Canvas (hodnota, kanály, příjmy) pro tento segment.</p>
        
        <h4>Klíčové otázky:</h4>
        <ul>
          <li><strong>Pro koho</strong> vytváříme hodnotu?</li>
          <li><strong>Kdo</strong> konkrétně platí za náš produkt?</li>
          <li><strong>Kde</strong> tyto lidi najdeme?</li>
        </ul>
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
        "💡 Buďte KONKRÉTNÍ: věk, situace, bolest, místo",
        "🎨 Každý segment = JEDNA BARVA (např. 🔵 rodiny, 🟢 profesionálky)",
        "📊 Potenciál musí být velký (závisí na ceně - dražší = stačí méně zákazníků)"
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
        <p><strong>Hodnotová nabídka</strong> je konkrétní produkt nebo služba, která <strong>řeší problém zákazníka</strong> a za kterou vám platí peníze.</p>
        
        <h4>Proč je to důležité?</h4>
        <ul>
          <li>✅ Jasně vidíte <strong>CO přesně prodáváte</strong> a KOMU</li>
          <li>✅ Můžete se zaměřit na <strong>nejvýdělečnější produkty</strong></li>
          <li>✅ Zjistíte, jestli nabídka <strong>opravdu řeší problém</strong> vašich zákazníků</li>
        </ul>
        
        <h4>🎨 DŮLEŽITÉ: Logika barev!</h4>
        <p>Každý produkt má <strong>barvu podle segmentu</strong>, kterému ho prodáváte:</p>
        <ul>
          <li><strong>🔵 Modrý segment</strong> (Rodiny) → <strong>🔵 modrá hodnota</strong> (Rodinná pizza XXL)</li>
          <li><strong>🟢 Zelený segment</strong> (Studenti) → <strong>🟢 zelená hodnota</strong> (Pizza slice 40 Kč)</li>
        </ul>
        
        <h4>Klíčové otázky:</h4>
        <ul>
          <li><strong>Co konkrétně</strong> prodáváte a KOMU?</li>
          <li><strong>Kolik</strong> z toho vyděláváte? (zaměřte se na hlavní příjmy!)</li>
          <li><strong>Proč</strong> si zákazník vybere právě VÁS?</li>
        </ul>
      `,
      examples: {
        good: [
          "🍕 Pizzerie (🔵 Rodiny): Rodinná pizza XXL + dětské menu zdarma",
          "🔧 Autoservis (🟢 Majitelé starších aut): Servis za 1 den + náhradní vůz zdarma",
          "👗 E-shop (🟡 Módní ženy): Nové kolekce každý týden + vrácení do 60 dní",
          "💇 Kadeřnice (🟣 Profesionálky): Večerní termíny 18-21h + express strih 30 min"
        ],
        bad: [
          "Kvalitní jídlo",
          "Rychlý servis",
          "Trendy oblečení",
          "Profesionální služby"
        ]
      },
      tips: [
        "🎨 Stejná barva jako segment (🔵 rodiny → 🔵 pizza) - uvidíte co prodáváte komu",
        "💎 Hodnota NENÍ produkt! Je to BENEFIT pro zákazníka",
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
        <h3>📢 Kanály</h3>
        <p><strong>Kanály</strong> jsou místa a způsoby, kterými oslovujete zákazníky a dodáváte jim hodnotu.</p>
        
        <h4>🎨 PRAVIDLO: Kde jsou VAŠI zákazníci?</h4>
        <p>Zjistěte kde vaše segmenty tráví čas a tam je oslovte! <strong>Stejná barva</strong> jako segment.</p>
        
        <h4>Klíčové otázky:</h4>
        <ul>
          <li><strong>Kde</strong> se pohybují vaši zákazníci?</li>
          <li><strong>Jak</strong> si u vás objednají?</li>
          <li><strong>Kde</strong> vás najdou když vás hledají?</li>
        </ul>
      `,
      examples: {
        good: [
          "🍕 Pizzerie (🔵 Rodiny): Instagram stories + Google rozvoz",
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
        "🎨 BARVA = stejná jako segment! (🔵 rodiny → 🔵 Instagram)",
        "📍 Buďte tam KDE jsou zákazníci, ne kde chcete vy být!",
        "🎯 Jeden segment může mít více kanálů - diverzifikujte!"
      ]
    },
    {
      id: 4,
      title: "Vztahy se zákazníky",
      canvasSection: "relationships",
      videoUrl: "",
      description: "Jaký vztah budujete se zákazníky?",
      content: `
        <h3>❤️ Vztahy se zákazníky</h3>
        <p><strong>Vztahy</strong> určují jak zákazníky získáváte, udržujete a motivujete k nákupům.</p>
        
        <h4>🎨 PRAVIDLO: Jak je udržíte?</h4>
        <p>Každý segment potřebuje jiný přístup! <strong>Barva = segment</strong>.</p>
        
        <h4>Klíčové otázky:</h4>
        <ul>
          <li><strong>Jak</strong> získáváte nové zákazníky?</li>
          <li><strong>Jak</strong> si je udržujete aby se vraceli?</li>
          <li><strong>Co</strong> je motivuje k opakovaným nákupům?</li>
        </ul>
      `,
      examples: {
        good: [
          "🍕 Pizzerie (🔵 Rodiny): Věrnostní karta 5. pizza zdarma",
          "🔧 Autoservis (🟢 Starší auta): SMS upozornění na STK + servisní balíčky",
          "👗 E-shop (🟡 Móda): VIP club + early access k novinkám",
          "💇 Kadeřnice (🟣 Profesionálky): Pravidelné rezervace každé 6 týdnů + SMS připomínka"
        ],
        bad: [
          "Dobrý zákaznický servis",
          "Osobní přístup",
          "Komunikace",
          "Podpora"
        ]
      },
      tips: [
        "🎨 BARVA = segment! (🔵 rodiny → 🔵 věrnostní karta)",
        "🔄 Zaměřte se na OPAKOVANÉ nákupy - to je klíč k růstu!",
        "💡 Automatizujte co můžete (SMS připomínky, emaily...)"
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
        
        <h4>🎨 PRAVIDLO: Barva = hodnota!</h4>
        <p>Pokud prodáváte <strong>🔵 modrou hodnotu</strong>, příjem z ní musí být také <strong>🔵 modrý</strong>!</p>
        
        <h4>Klíčové otázky:</h4>
        <ul>
          <li><strong>Kolik</strong> vám zákazník zaplatí za hodnotu?</li>
          <li><strong>Jak často</strong> platí? (jednorázově, měsíčně...)</li>
          <li><strong>Kolik</strong> zákazníků × cena = celkový příjem?</li>
        </ul>
      `,
      examples: {
        good: [
          "🍕 (🔵 Rodinná pizza): 50 rodin × 250 Kč/týden = 12 500 Kč/týden",
          "🔧 (🟢 Velký servis): 20 aut × 8000 Kč = 160 000 Kč/měsíc",
          "👗 (🟡 Trendy oblečení): 100 objednávek × 1500 Kč = 150 000 Kč/měsíc",
          "💇 (🟣 Express strih): 80 profesionálek × 800 Kč = 64 000 Kč/měsíc"
        ],
        bad: [
          "Prodej produktů",
          "Tržby z služeb",
          "Příjmy",
          "Peníze od zákazníků"
        ]
      },
      tips: [
        "🎨 BARVA = hodnota! (🔵 pizza → 🔵 příjem z pizzy)",
        "💰 ZADEJTE ČÍSLO! Počet zákazníků × cena",
        "🌐 Globální = příjmy pro celý byznys (káva, nápoje...)"
      ]
    },
    {
      id: 6,
      title: "Klíčové zdroje",
      canvasSection: "resources",
      videoUrl: "",
      description: "Co potřebujete k fungování?",
      content: `
        <h3>🏭 Klíčové zdroje</h3>
        <p><strong>Zdroje</strong> jsou věci které MUSÍTE mít, aby byznys fungoval.</p>
        
        <h4>🌐 VĚTŠINOU GLOBÁLNÍ BARVA!</h4>
        <p>Zdroje jsou obvykle <strong>sdílené pro celý byznys</strong> (pec, prostor, tým...).</p>
        
        <h4>4 typy zdrojů:</h4>
        <ul>
          <li><strong>Fyzické:</strong> budovy, zařízení, auta...</li>
          <li><strong>Lidské:</strong> zaměstnanci, odbornost...</li>
          <li><strong>Finanční:</strong> hotovost, úvěr...</li>
          <li><strong>Intelektuální:</strong> značka, patenty, data...</li>
        </ul>
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
        "🌐 VĚTŠINOU GLOBÁLNÍ! Sdílené pro celý byznys",
        "🔍 Ptejte se: BEZ ČEHO to nejde? (to je klíčový zdroj)",
        "💡 Nemusíte vlastnit vše - můžete pronajímat/outsourcovat"
      ]
    },
    {
      id: 7,
      title: "Klíčové aktivity",
      canvasSection: "activities",
      videoUrl: "",
      description: "Co musíte dělat?",
      content: `
        <h3>⚙️ Klíčové aktivity</h3>
        <p><strong>Aktivity</strong> jsou činnosti které MUSÍTE dělat, aby byznys fungoval.</p>
        
        <h4>🎨 BARVY: Většinou globální + někdy specifické!</h4>
        <p>Základní činnosti <strong>🌐 globální</strong> (vaření, opravy). Specifické pro segment <strong>barevné</strong> (🔵 marketing na IG pro rodiny).</p>
        
        <h4>Klíčové otázky:</h4>
        <ul>
          <li><strong>Co</strong> děláte každý den?</li>
          <li><strong>Bez čeho</strong> by to nefungovalo?</li>
          <li><strong>Co</strong> vás odlišuje od konkurence?</li>
        </ul>
      `,
      examples: {
        good: [
          "🍕 Pizzerie: 🌐 Příprava jídla, 🔵 Instagram marketing pro rodiny",
          "🔧 Autoservis: 🌐 Opravy a diagnostika, 🟢 Péče o náhradní vozy",
          "👗 E-shop: 🌐 Správa objednávek, 🟡 Vyhledávání nových trendů",
          "💇 Kadeřnice: 🌐 Stříhání a barvení, 🟣 Večerní provoz 18-21h"
        ],
        bad: [
          "Řízení firmy",
          "Poskytování služeb",
          "Práce",
          "Obchodní činnost"
        ]
      },
      tips: [
        "🌐 Základní činnosti = globální (vaření, opravy, stříhání)",
        "🎨 Specifické pro segment = barva segmentu (🔵 IG marketing)",
        "💡 Ptejte se: Co dělám DENNĚ? To je klíčová aktivita!"
      ]
    },
    {
      id: 8,
      title: "Klíčová partnerství",
      canvasSection: "partners",
      videoUrl: "",
      description: "S kým spolupracujete?",
      content: `
        <h3>🤝 Klíčová partnerství</h3>
        <p><strong>Partneři</strong> jsou firmy/lidé kterým outsourcujete činnosti nebo od nich kupujete zdroje.</p>
        
        <h4>🎨 BARVY: Většinou globální!</h4>
        <p>Partneři jsou obvykle <strong>🌐 globální</strong> (dodavatel surovin). Někdy <strong>specifičtí</strong> pro segment.</p>
        
        <h4>Klíčové otázky:</h4>
        <ul>
          <li><strong>Co</strong> NEKUPUJEME, ale dostáváme od partnerů?</li>
          <li><strong>Co</strong> NEDĚLÁME sami, ale outsourcujeme?</li>
          <li><strong>Kdo</strong> nám dodává klíčové suroviny/služby?</li>
        </ul>
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
        "🌐 VĚTŠINOU GLOBÁLNÍ! Dodavatelé surovin a služeb",
        "🎨 Specifičtí partneři = barva produktu (pokud dělají jen pro jeden segment)",
        "💡 Partner = někdo bez koho to NEJDE (ne jen známost)"
      ]
    },
    {
      id: 9,
      title: "Struktura nákladů",
      canvasSection: "costs",
      videoUrl: "",
      description: "Kolik vás to stojí?",
      content: `
        <h3>💸 Struktura nákladů</h3>
        <p><strong>Náklady</strong> jsou peníze které MUSÍTE platit, aby byznys fungoval.</p>
        
        <h4>🎨 BARVY: Většinou globální + občas specifické!</h4>
        <p><strong>🌐 Globální</strong> = pro celý byznys (nájem, mzdy). <strong>Barevné</strong> = specifické pro segment (🔵 IG reklama).</p>
        
        <h4>2 typy nákladů:</h4>
        <ul>
          <li><strong>Fixní:</strong> Platíte vždy (nájem, mzdy, energie...)</li>
          <li><strong>Variabilní:</strong> Platíte když prodáváte (suroviny, doprava...)</li>
        </ul>
      `,
      examples: {
        good: [
          "🍕 Pizzerie: 🌐 Nájem 25k, 🌐 Mzdy 40k, 🌐 Suroviny 15k, 🔵 IG reklama 2k",
          "🔧 Autoservis: 🌐 Nájem dílny 30k, 🌐 Mzdy 50k, 🌐 Autodíly 20k",
          "👗 E-shop: 🌐 Doprava 10k, 🌐 Skladování 5k, 🟡 Instagram ads 15k",
          "💇 Kadeřnice: 🌐 Nájem salonu 20k, 🌐 Kosmetika 8k, 🌐 Energie 3k"
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
        "💰 ZADEJTE ČÍSLO! Měsíční částka v Kč"
      ]
    }
  ]
};

// 📗 MODUL 2: Vylepšení modelu (4 lekce)
const MODULE_2 = {
  id: 2,
  title: "Vylepšení byznys modelu",
  description: "Naučte se vylepšit a optimalizovat váš Business Model Canvas",
  lessons: [
    {
      id: 10,
      title: "Pravidla dobrého modelu",
      canvasSection: undefined, // Celkový přehled
      videoUrl: "",
      description: "Zkontrolujte si, že váš model splňuje všechna pravidla",
      content: `
        <h3>Pravidla dobrého Business Model Canvas</h3>
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
      title: "Prosperuje váš model?",
      canvasSection: undefined,
      videoUrl: "",
      description: "GAP analýza - porovnejte TEĎ vs CÍL",
      content: `
        <h3>Finanční zdraví vašeho modelu</h3>
        <p>Teď když máte hotový Canvas, pojďme se podívat jestli vám to vychází finančně.</p>
        <h4>Klíčové otázky:</h4>
        <ul>
          <li>Kolik máte zákazníků TEĎ?</li>
          <li>Kolik potřebujete zákazníků aby to bylo ziskové?</li>
          <li>Jaký je rozdíl (GAP)?</li>
          <li>Jak ho překlenete?</li>
        </ul>
      `,
      tips: [
        "Kalkulačka vše spočítá automaticky z vašeho Canvas",
        "Bod zvratu = kolik zákazníků potřebujete aby příjmy = náklady",
        "Zaměřte se na strategická doporučení - konkrétní kroky co udělat"
      ]
    },
    {
      id: 12,
      title: "Řešení situací",
      canvasSection: undefined,
      videoUrl: "",
      description: "Jak řešit typické problémy pomocí Canvas",
      content: "",
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
      description: "Jak může vypadat Business Model v různých odvětvích",
      content: "",
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
  
  // 🎉 ACHIEVEMENTS & GAMIFICATION
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  
  // 💾 AUTOSAVE INDICATOR
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | undefined>();

  // 💾 PERSIST VPC SELECTIONS - Load from localStorage
  useEffect(() => {
    const savedSegment = localStorage.getItem('vpc_selected_segment');
    const savedValue = localStorage.getItem('vpc_selected_value');
    
    if (savedSegment) setSelectedVPCSegment(savedSegment);
    if (savedValue) setSelectedVPCValue(savedValue);
  }, []);

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
  
  const currentModule = currentModuleNumber === 1 ? MODULE_1 : currentModuleNumber === 2 ? MODULE_2 : MODULE_3;
  const currentLesson = currentModule.lessons[currentLessonIndex];
  const isLastLesson = currentLessonIndex === currentModule.lessons.length - 1;
  const moduleCompleted = completedLessons.size === currentModule.lessons.length;
  const totalLessons = allModules.reduce((sum, m) => sum + m.lessons.length, 0);

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
        return;
      }
      
      // Real token verification
      if (token) {
        const user = await verifyAccessToken(token);
        
        if (user) {
          setIsAuthenticated(true);
          setUserData(user);
          setIsVerifying(false);
          // Load progress for real user
          const progress = await loadCourseProgress(user.id);
          setCompletedLessons(progress);
          // Load achievements
          const achievements = loadUnlockedAchievements(user.id);
          setUnlockedAchievements(achievements);
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
      if (!userData?.id || !currentLesson.canvasSection) return;
      
      setIsLoadingCanvas(true);
      try {
        const { data, error } = await supabase
          .from('business_canvas_sections')
          .select('*')
          .eq('user_id', userData.id)
          .eq('section_key', currentLesson.canvasSection)
          .single();
        
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
  }, [userData, currentLesson.canvasSection]);
  
  // Load ALL Canvas data for preview
  useEffect(() => {
    const loadAllCanvasData = async () => {
      if (!userData?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('business_canvas_sections')
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
  const triggerAchievement = useCallback((achievementId: string) => {
    if (!userData?.id) return;
    
    console.log('🎯 Triggering achievement:', achievementId);
    const wasUnlocked = unlockAchievement(userData.id, achievementId);
    if (wasUnlocked) {
      console.log('🎉 NEW ACHIEVEMENT UNLOCKED:', achievementId);
      const achievement = getAchievement(achievementId);
      if (achievement) {
        setCurrentAchievement(achievement);
        
        // Update local state
        setUnlockedAchievements(prev => new Set([...prev, achievementId]));
      }
    } else {
      console.log('⏭️ Achievement already unlocked:', achievementId);
    }
  }, [userData?.id]);

  // 🔍 Check all achievements based on current data
  const checkAllAchievements = useCallback(async () => {
    if (!userData?.id) return;

    console.log('🔍 Checking all achievements...', {
      userId: userData.id,
      completedLessons: Array.from(completedLessons),
      completedCount: completedLessons.size
    });

    try {
      // Check BMC achievements
      const { data: canvasData } = await supabase
        .from('business_canvas_sections')
        .select('*')
        .eq('user_id', userData.id);

      if (canvasData) {
        console.log('📊 Canvas data:', canvasData.length, 'sections');
        const segments = canvasData.find(s => s.section_key === 'segments');
        const values = canvasData.find(s => s.section_key === 'value');
        
        // First segment
        if (segments?.content?.length > 0) {
          console.log('✅ Has segments:', segments.content.length);
          triggerAchievement('first-segment');
        }
        
        // First value
        if (values?.content?.length > 0) {
          console.log('✅ Has values:', values.content.length);
          triggerAchievement('first-value');
        }
        
        // All sections filled
        const allSections = ['segments', 'value', 'channels', 'relationships', 'revenue', 'resources', 'activities', 'partners', 'costs'];
        const filledSections = canvasData.filter(s => 
          allSections.includes(s.section_key) && s.content?.length > 0
        );
        
        console.log('📋 Filled sections:', filledSections.length, '/ 9');
        if (filledSections.length === 9) {
          triggerAchievement('all-sections-filled');
        }
        
        // 🏆 profit-calculated: Check if user has financial data
        const revenue = canvasData.find(s => s.section_key === 'revenue');
        const costs = canvasData.find(s => s.section_key === 'costs');
        if ((revenue?.content?.length > 0 && revenue.content.some((i: any) => i.value > 0)) ||
            (costs?.content?.length > 0 && costs.content.some((i: any) => i.value > 0))) {
          console.log('💰 Has financial data - triggering profit-calculated');
          triggerAchievement('profit-calculated');
        }
        
        // 🏆 validator-used: If user has completed Canvas (all 9 sections), assume they used validator
        if (filledSections.length >= 6) {
          console.log('✅ Has 6+ filled sections - triggering validator-used');
          triggerAchievement('validator-used');
        }
        
        // 🏆 profitable-business: Check if revenue > costs
        const totalRevenue = revenue?.content?.reduce((sum: number, item: any) => sum + (item.value || 0), 0) || 0;
        const totalCosts = costs?.content?.reduce((sum: number, item: any) => sum + (item.value || 0), 0) || 0;
        if (totalRevenue > 0 && totalCosts > 0 && totalRevenue > totalCosts) {
          console.log('📈 Business is profitable - triggering profitable-business');
          triggerAchievement('profitable-business');
        }
      }

      // Check module completion achievements
      console.log('📚 Checking modules:', {
        module1: completedLessons.has(9),
        module2: completedLessons.has(13),
        module3: completedLessons.has(16)
      });
      
      if (completedLessons.has(9)) {
        triggerAchievement('module-1-complete');
      }
      if (completedLessons.has(13)) {
        triggerAchievement('module-2-complete');
      }
      if (completedLessons.has(16)) {
        triggerAchievement('module-3-complete');
      }

      // Check VPC achievements
      const { data: vpcData } = await supabase
        .from('value_proposition_canvas')
        .select('*')
        .eq('user_id', userData.id);

      if (vpcData && vpcData.length > 0) {
        vpcData.forEach(vpc => {
          // Customer profile complete
          if (vpc.jobs?.length > 0 && vpc.pains?.length > 0 && vpc.gains?.length > 0) {
            triggerAchievement('customer-profile-complete');
          }

          // Value map complete (check selected_value record)
          if (vpc.selected_value && vpc.products?.length > 0) {
            triggerAchievement('value-map-complete');
          }

          // FIT score achievements
          const fitScore = vpc.fit_validation_data?.fitScore || 0;
          if (fitScore >= 70) {
            triggerAchievement('fit-70-percent');
          }
          if (fitScore >= 80) {
            triggerAchievement('product-fit-master');
          }
          if (fitScore >= 90) {
            triggerAchievement('fit-90-percent');
          }
        });
      }

      // 🏆 action-plan-unlocked: Check if action plan exists
      const savedActions = localStorage.getItem(`action_plan_completed_${userData.id}`);
      const hasActionPlan = savedActions !== null;
      
      if (hasActionPlan) {
        console.log('📋 Action plan exists - triggering action-plan-unlocked');
        triggerAchievement('action-plan-unlocked');
        
        try {
          const completedActions = new Set(JSON.parse(savedActions));
          console.log('📋 Completed actions:', completedActions.size);
          
          // Check achievements based on completed actions count
          if (completedActions.size >= 1) {
            triggerAchievement('first-action-completed');
          }
          if (completedActions.size >= 3) {
            triggerAchievement('action-streak-3');
          }
          
          // For all-actions-completed, we need to know total action count
          // This will be checked in BusinessActionPlan itself
        } catch (err) {
          console.error('Failed to parse completed actions:', err);
        }
      }
      
      // 🏆 master-of-tools: Check if user used all tools
      // Tools: Validator (6+ sections), Calculator (financial data), VPC (has VPC data), Action Plan (has saved actions)
      const hasValidator = canvasData && canvasData.filter((s: any) => s.content?.length > 0).length >= 6;
      const hasCalculator = canvasData && canvasData.some((s: any) => 
        (s.section_key === 'revenue' || s.section_key === 'costs') && 
        s.content?.some((i: any) => i.value > 0)
      );
      const hasVPC = vpcData && vpcData.length > 0;
      
      if (hasValidator && hasCalculator && hasVPC && hasActionPlan) {
        console.log('🛠️ Used all tools - triggering master-of-tools');
        triggerAchievement('master-of-tools');
      }
      
      // 💫 ultimate-master: Check if user has all other achievements (19 out of 20)
      // Load from localStorage (not Supabase!)
      const currentUnlocked = loadUnlockedAchievements(userData.id);
      const totalAchievements = 20; // Total including ultimate-master
      const achievementsWithoutUltimate = totalAchievements - 1; // 19
      
      // Filter out ultimate-master from count
      const unlockedWithoutUltimate = Array.from(currentUnlocked).filter(id => id !== 'ultimate-master').length;
      
      if (unlockedWithoutUltimate >= achievementsWithoutUltimate) {
        console.log('💫 Has all 19 achievements - triggering ultimate-master');
        triggerAchievement('ultimate-master');
      }

      console.log('✅ Achievement check complete');

    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  }, [userData?.id, completedLessons, triggerAchievement]);

  // 🔍 Auto-check achievements when data is loaded
  useEffect(() => {
    if (userData?.id) {
      // Wait a bit for all data to settle
      const timer = setTimeout(() => {
        checkAllAchievements();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [userData?.id, checkAllAchievements]);

  const handleStartPractice = () => {
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
    
    // 🎉 Trigger achievements based on section
    if (currentLesson.canvasSection === 'segments') {
      triggerAchievement('first-segment');
    } else if (currentLesson.canvasSection === 'value') {
      triggerAchievement('first-value');
    }
    
    // ❌ Odstraněno - duplicitní toast (achievement se zobrazuje vpravo)
  };
  
  const handleNextLesson = () => {
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
        // ❌ Odstraněno - duplicitní toast (MEGA konfetti stačí)
      }
    } else {
      setCurrentLessonIndex(prev => prev + 1);
      setShowCanvas(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSelectLesson = (moduleId: number, lessonIndex: number) => {
    // Check if trying to access Module 2+ without completing Module 1
    if (moduleId > 1) {
      const module1 = allModules.find(m => m.id === 1);
      const isModule1Complete = module1 ? module1.lessons.every(l => completedLessons.has(l.id)) : false;
      
      if (!isModule1Complete) {
        toast.error("🔒 Nejprve dokončete Modul 1 pro odemčení dalších modulů!");
        return;
      }
    }
    
    setCurrentModuleNumber(moduleId);
    setCurrentLessonIndex(lessonIndex);
    setShowMainDashboard(false);
    setShowCanvas(false);
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
      <BusinessActionPlan
        userId={userData?.id || 1}
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
        onAchievementUnlocked={triggerAchievement}
      />
    );
  }

  // Show Main Dashboard (with sidebar)
  if (showMainDashboard) {
    return (
      <>
        <SimpleDashboard
          userId={userData?.id || 1}
          modules={allModules}
          completedLessons={completedLessons}
          currentModuleId={currentModuleNumber}
          currentLessonIndex={currentLessonIndex}
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
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <CourseSidebar
        modules={allModules}
        currentModuleId={currentModuleNumber}
        currentLessonIndex={currentLessonIndex}
        completedLessons={completedLessons}
        onSelectLesson={handleSelectLesson}
        onShowDashboard={handleShowDashboard}
        showingDashboard={showMainDashboard}
      />
      
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setShowMobileSidebar(true)}
        className="md:hidden fixed top-4 left-4 z-30 bg-white p-2 rounded-lg shadow-lg border-2 border-gray-200 hover:bg-gray-50"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowMobileSidebar(false)}
        >
          <div 
            className="w-80 h-full bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowMobileSidebar(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Mobile Sidebar content */}
            <MobileSidebarContent
              modules={allModules}
              currentModuleId={currentModuleNumber}
              currentLessonIndex={currentLessonIndex}
              completedLessons={completedLessons}
              onSelectLesson={(moduleId, lessonIndex) => {
                handleSelectLesson(moduleId, lessonIndex);
                setShowMobileSidebar(false); // Close after selection
              }}
              onShowDashboard={() => {
                handleShowDashboard();
                setShowMobileSidebar(false);
              }}
              showingDashboard={showMainDashboard}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-80">
        {/* Header */}
        <div className="bg-white border-b-2 border-gray-200 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 py-3">
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* Mobile spacer for hamburger */}
                <div className="md:hidden w-10"></div>
                <BookOpen className="w-5 h-5 text-blue-600" />
                <div>
                  <h1 className="text-sm font-bold text-gray-900">
                    Modul {currentModuleNumber}: {currentModule.title}
                  </h1>
                  <p className="text-xs text-gray-500">
                    Lekce {currentLessonIndex + 1}/{currentModule.lessons.length}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Progress Info */}
                <div className="text-right">
                  <div className="text-sm font-bold text-blue-600">
                    {Math.round((completedLessons.size / allModules.reduce((sum, m) => sum + m.lessons.length, 0)) * 100)}%
                  </div>
                  <div className="text-xs text-gray-500">
                    {completedLessons.size}/{allModules.reduce((sum, m) => sum + m.lessons.length, 0)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ 
                  width: `${(completedLessons.size / allModules.reduce((sum, m) => sum + m.lessons.length, 0)) * 100}%` 
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-green-500"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 w-full">
          <div className="flex flex-col gap-6">
            {/* Lesson Header - Modern design */}
            {currentLesson.id !== 16 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white rounded-2xl p-8 shadow-lg relative overflow-hidden"
              >
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-24 translate-y-24" />
                </div>
                
                <div className="relative flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-3 backdrop-blur-sm">
                      Lekce {currentLessonIndex + 1} z {currentModule.lessons.length}
                    </div>
                    <h2 className="text-3xl font-bold mb-3">{currentLesson.title}</h2>
                    <p className="text-blue-100 text-lg leading-relaxed">{currentLesson.description}</p>
                  </div>
                  {completedLessons.has(currentLesson.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-green-500 rounded-2xl p-4 shadow-lg flex-shrink-0"
                    >
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Content Section */}
            <div className="space-y-6">
              {/* Video (pouze pokud existuje URL) */}
              {currentLesson.videoUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                >
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
                </motion.div>
              )}

              {/* Text Content - Rich or Plain */}
              <div>
                {/* MODUL 2 - Lekce 3: Problem Solver - VŽDY VIDITELNÝ! */}
                {currentLesson.id === 12 && userData?.id && (
                  <ProblemSolver
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
                  />
                )}
                
                {/* MODUL 2 - Lekce 4: Business Model Gallery - VŽDY VIDITELNÁ! */}
                {currentLesson.id === 13 && currentModuleNumber === 2 && (
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
                  />
                )}
                
                {currentLesson.id === 14 ? (
                  <VPCCustomerProfileStory
                      userId={userData?.id || 0}
                      selectedSegment={selectedVPCSegment}
                      onSelectSegment={(newSegment) => {
                        setSelectedVPCSegment(newSegment);
                        setSelectedVPCValue(null);
                      }}
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
                ) : currentLesson.id === 15 ? (
                  <VPCValueMapSquare
                      userId={userData?.id || 0}
                      selectedSegment={selectedVPCSegment || "Můj segment"}
                      selectedValue={selectedVPCValue}
                      onSelectValue={setSelectedVPCValue}
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
                ) : currentLesson.id === 16 ? (
                  <FitValidatorV2 
                        userId={userData?.id || 0} 
                        selectedSegment={selectedVPCSegment || ""}
                        onSegmentChange={setSelectedVPCSegment}
                        onValueChange={setSelectedVPCValue}
                        isLessonCompleted={completedLessons.has(16)}
                        onNavigateToLesson={(lessonId) => {
                          // Navigate to Modul 3, Lesson with specific ID
                          const lessonIndex = MODULE_3.lessons.findIndex(l => l.id === lessonId);
                          if (lessonIndex !== -1) {
                            // Přepni na danou lekci v Modulu 3
                            handleLessonChange(MODULE_3.lessons[lessonIndex]);
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
                            // 🎉 Achievement podle FIT Score
                            if (fitScore >= 70) {
                              triggerAchievement('fit-70-percent');
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
                ) : (
                  ![10, 11, 12, 13, 14, 15, 16].includes(currentLesson.id) && (
                    currentLesson.examples || currentLesson.tips || currentLesson.showDemo ? (
                      <LessonContentRenderer
                        content={currentLesson.content}
                        examples={currentLesson.examples}
                        tips={currentLesson.tips}
                        showDemo={currentLesson.showDemo}
                        hideTips={currentModuleNumber === 1}
                      />
                    ) : currentLesson.content ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                      >
                        <div
                          className="prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                        />
                      </motion.div>
                    ) : null
                  )
                )}
              </div>

              {/* Mobile Warning - Modul 1 není podporován na mobilu */}
              {!showCanvas && currentModuleNumber === 1 && (
                <>
                  {/* Desktop - Modern CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="hidden md:block bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-center shadow-xl relative overflow-hidden"
                  >
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
                  </motion.div>

                  {/* Mobile - Jednoduchá sekce (jen aktuální Canvas sekce) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden space-y-4"
                  >
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
                      onAddItem={async (text, color, value) => {
                        if (!userData?.id || !currentLesson.canvasSection) return;
                        
                        try {
                          const newItem = { text, color, value };
                          const currentData = Array.isArray(mobileCanvasData) ? mobileCanvasData : [];
                          const updatedItems = [...currentData, newItem];
                          
                          console.log('Saving:', { userId: userData.id, section: currentLesson.canvasSection, items: updatedItems });
                          
                          // Save to Supabase (UPSERT with conflict resolution!)
                          const { error } = await supabase
                            .from('business_canvas_sections')
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
                            // ❌ Odstraněno - duplicitní toast
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
                          .from('business_canvas_sections')
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
                  </motion.div>
                </>
              )}
              
              {/* CTA - Modul 2 (Interaktivní lekce) */}
              {!showCanvas && currentModuleNumber === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Lekce 1: Canvas Validator - VŽDY VIDITELNÝ! */}
                  {currentLesson.id === 10 && userData?.id && (
                    <CanvasValidator
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
                      onAchievementUnlocked={triggerAchievement}
                    />
                  )}
                  
                  {/* Lekce 2: Profit Calculator - VŽDY VIDITELNÁ! */}
                  {currentLesson.id === 11 && userData?.id && (
                    <ProfitCalculator
                      userId={userData.id}
                      onAchievementUnlocked={triggerAchievement}
                      onComplete={async () => {
                        console.log('✅ Lekce 11 dokončena - ukládám progress');
                        
                        // ✅ Stejná logika jako handleLessonComplete
                        const newCompleted = new Set(completedLessons);
                        newCompleted.add(currentLesson.id);
                        setCompletedLessons(newCompleted);
                        
                        if (userData?.id) {
                          const success = await saveLessonProgress(userData.id, currentLesson.id);
                          console.log('💾 saveLessonProgress result:', success);
                          
                          if (!success) {
                            toast.error('⚠️ Nepodařilo se uložit progress.');
                          }
                        }
                        
                        // 🔄 Refresh action plan
                        setActionPlanRefreshTrigger(prev => prev + 1);
                        
                        // ✅ Lekce dokončena! (ŽÁDNÝ toast - banner to zobrazí)
                        console.log('✅ Lekce 11 označena jako dokončená');
                      }}
                      onNavigateNext={() => {
                        console.log('➡️ Navigating to next lesson');
                        handleNextLesson();
                      }}
                    />
                  )}
                </motion.div>
              )}
              

            </div>

            {/* Canvas Section - FULL SCREEN MODE! */}
            {showCanvas && (
              <motion.div
                id="canvas-wrapper"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed inset-0 z-50 bg-gray-100 overflow-y-auto"
              >
                {/* Canvas Header - Floating */}
                <div className="sticky top-0 z-10 bg-white border-b-2 border-gray-200 shadow-sm">
                  <div className="max-w-7xl mx-auto px-4 py-3">
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

                <div className="max-w-7xl mx-auto px-4 py-8">
                  <div className="bg-white border-4 border-blue-500 rounded-xl p-8 shadow-2xl"
              >
                <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-5">
                  <p className="text-blue-900 font-bold text-lg">
                    👇 Vyplňte tuto sekci podle instrukcí z videa
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
                  userId={userData?.id || 1}
                  highlightSection={highlightedSectionId}
                  hideTips={true}
                  allowedSection={currentLesson.canvasSection}
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
                        <h4 className="text-2xl font-bold mb-2">
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
              </motion.div>
            )}
          </div>
        </div>

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
        
        {/* 🎉 ACHIEVEMENT NOTIFICATION */}
        <AchievementNotification 
          achievement={currentAchievement}
          onClose={() => setCurrentAchievement(null)}
        />
      </div>
    </div>
  );
}

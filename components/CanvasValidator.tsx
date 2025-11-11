import { useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, Lightbulb, ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { MobileCanvasPreview } from "./MobileCanvasPreview";
import { BusinessModelCanvasSimple } from "./BusinessModelCanvasSimple";
import { hexToColorName } from "../lib/colorUtils";

interface CanvasItem {
  text: string;
  color: 'blue' | 'green' | 'yellow' | 'pink' | 'purple' | 'global' | 'gray';
  value?: number; // Pro segmenty: průměrná útrata, Pro příjmy/náklady: hodnota v Kč
  currentValue?: number; // TEĎ - pro segmenty
  targetValue?: number; // CÍL - pro segmenty
}

interface ValidationRule {
  id: string;
  title: string;
  description: string;
  check: (data: any) => { passed: boolean; message: string; tip?: string };
  severity: 'error' | 'warning' | 'success';
}

// Helper function for color names (podporuje HEX i názvy)
const getColorName = (color: string): string => {
  // Převeď HEX → název
  const colorName = hexToColorName(color);
  
  // Přidej emoji
  const names: Record<string, string> = {
    blue: '🔵 Modrá',
    green: '🟢 Zelená',
    yellow: '🟡 Žlutá',
    purple: '🟣 Fialová',
    pink: '🔴 Růžová',
    global: '🌐 Globální',
    gray: '⚫ Šedá',
    red: '🔴 Červená',
    orange: '🟠 Oranžová'
  };
  return names[colorName] || color;
};

const VALIDATION_RULES: ValidationRule[] = [

  {
    id: 'has-segments',
    title: '✅ Zákaznické segmenty',
    description: 'Musíte mít alespoň 1 konkrétní segment',
    check: (data) => {
      const segments = data.segments || [];
      if (segments.length === 0) {
        return { passed: false, message: '❌ Chybí zákaznické segmenty!', tip: 'Přidejte alespoň 1 konkrétní skupinu zákazníků (např. "Rodiče s dětmi 3-6 let")' };
      }
      if (segments.length >= 2) {
        return { passed: true, message: '🎉 Máte více segmentů - skvělé!', tip: 'Diverzifikace zákazníků snižuje riziko' };
      }
      return { passed: true, message: '✅ Máte definovaný segment' };
    },
    severity: 'error'
  },
  {
    id: 'color-usage',
    title: '🎨 Použití barev',
    description: 'Barvy pomáhají rozlišit různé produkty/segmenty',
    check: (data) => {
      const allColors = new Set<string>();
      let totalItems = 0;
      
      Object.values(data).forEach((items: any) => {
        if (Array.isArray(items)) {
          items.forEach((item: CanvasItem) => {
            totalItems++;
            if (item.color && item.color !== 'white') {
              allColors.add(item.color);
            }
          });
        }
      });
      
      if (totalItems === 0) {
        return { passed: false, message: '⚠️ Canvas je prázdný', tip: 'Začněte přidáváním zákaznických segmentů' };
      }
      
      if (allColors.size === 0) {
        return { 
          passed: true, 
          message: '💡 Tip: Zkuste použít barvy', 
          tip: 'Každá barva = jeden produkt/služba. 🌐 Globální = pro celý byznys. Pomůže vám to lépe vidět návaznosti!' 
        };
      }
      
      if (allColors.size === 1) {
        return { passed: true, message: '✅ Používáte barvy pro rozlišení', tip: 'Máte jeden hlavní produkt/službu' };
      }
      
      return { 
        passed: true, 
        message: `🎨 Skvělé! Rozlišujete ${allColors.size} produkty/služby barvami`, 
        tip: 'Barvy vám pomáhají vidět které segmenty, hodnoty a příjmy k sobě patří' 
      };
    },
    severity: 'success'
  },
  {
    id: 'optional-sections',
    title: '📋 Volitelné sekce',
    description: 'Kontrola sekcí které nemusí být vždy vyplněné',
    check: (data) => {
      const partners = data.partners || [];
      const relationships = data.relationships || [];
      const activities = data.activities || [];
      const resources = data.resources || [];
      
      const warnings: string[] = [];
      
      // Partnerství - není kritické, ale doporučené
      if (partners.length === 0) {
        warnings.push('⚠️ Žádná partnerství - OK pokud vše děláte sami, ale partneři mohou ušetřit náklady');
      }
      
      // Vztahy - doporučené pro udržení zákazníků
      if (relationships.length === 0) {
        warnings.push('💡 Žádné vztahy se zákazníky - přidejte jak je budete udržovat (věrnostní program, osobní servis...)');
      }
      
      // Aktivity - měly by být
      if (activities.length === 0) {
        warnings.push('⚠️ Žádné klíčové aktivity - co děláte každý den?');
      }
      
      // Zdroje - měly by být
      if (resources.length === 0) {
        warnings.push('⚠️ Žádné klíčové zdroje - co potřebujete k fungování?');
      }
      
      if (warnings.length > 0) {
        return {
          passed: true,
          message: `⚠️ ${warnings.length} doporučení pro vylepšení`,
          tip: warnings.slice(0, 2).join(' • ')
        };
      }
      
      return { 
        passed: true, 
        message: `✅ Všechny volitelné sekce vyplněné!`
      };
    },
    severity: 'success'
  },
  {
    id: 'value-numbers',
    title: '💰 Finanční data',
    description: 'Příjmy a náklady musí mít čísla',
    check: (data) => {
      const revenue = data.revenue || [];
      const costs = data.costs || [];
      
      const revenueWithNumbers = revenue.filter((item: CanvasItem) => item.value !== undefined);
      const costsWithNumbers = costs.filter((item: CanvasItem) => item.value !== undefined);
      
      if (revenue.length === 0 || costs.length === 0) {
        return { passed: false, message: '❌ Chybí příjmy nebo náklady', tip: 'Vyplňte sekce Revenue a Costs' };
      }
      
      // ✅ ODSTRANĚNO: Kontrola částek (data se ukládají na pozadí)
      // if (revenueWithNumbers.length === 0 || costsWithNumbers.length === 0) {
      //   return { passed: false, message: '⚠️ Chybí částky u příjmů/nákladů', tip: 'Klikněte na položku a přidejte číselnou hodnotu' };
      // }
      
      const totalRevenue = revenueWithNumbers.reduce((sum: number, item: CanvasItem) => sum + (item.value || 0), 0);
      const totalCosts = costsWithNumbers.reduce((sum: number, item: CanvasItem) => sum + (item.value || 0), 0);
      
      if (totalRevenue < totalCosts) {
        return { 
          passed: false, 
          message: `📉 Náklady (${totalCosts.toLocaleString()} Kč) > Příjmy (${totalRevenue.toLocaleString()} Kč)`, 
          tip: 'Váš model je zatím ztrátový! Zvyšte příjmy nebo snižte náklady.' 
        };
      }
      
      const profit = totalRevenue - totalCosts;
      return { 
        passed: true, 
        message: `💰 Zisk: ${profit.toLocaleString()} Kč/měsíc`, 
        tip: `Příjmy: ${totalRevenue.toLocaleString()} Kč - Náklady: ${totalCosts.toLocaleString()} Kč` 
      };
    },
    severity: 'error'
  },
  {
    id: 'channels-exist',
    title: '📢 Kanály komunikace',
    description: 'Musíte mít způsob jak oslovit zákazníky',
    check: (data) => {
      const segments = data.segments || [];
      const channels = data.channels || [];
      
      if (segments.length > 0 && channels.length === 0) {
        return { passed: false, message: '⚠️ Máte segmenty, ale žádné kanály', tip: 'Jak oslovíte své zákazníky? Přidejte kanály (Facebook ads, email, osobní kontakt...)' };
      }
      
      if (channels.length >= 1) {
        return { 
          passed: true, 
          message: `✅ Máte ${channels.length} kanálů komunikace`, 
          tip: 'Více kanálů = stejné segmenty můžou sdílet kanály (např. Instagram pro maminky i tatínky)' 
        };
      }
      
      return { passed: true, message: '💡 Přidejte kanály jak oslovíte zákazníky' };
    },
    severity: 'success'
  },
  {
    id: 'color-cross-validation',
    title: '🔗 Propojení barev napříč sekcemi',
    description: 'Segment → Hodnota → Kanál → Př��jem/Náklad (stejná barva nebo 🌐 global)',
    check: (data) => {
      const segments = data.segments || [];
      const values = data.value || [];
      const channels = data.channels || [];
      const revenue = data.revenue || [];
      const costs = data.costs || [];
      const relationships = data.relationships || [];
      
      if (segments.length === 0) {
        return { passed: true, message: '💡 Nejprve přidejte zákaznické segmenty' };
      }
      
      // Get colors (excluding global)
      const segmentColors = new Set(segments.filter((s: any) => s.color !== 'global').map((s: any) => s.color));
      const valueColors = new Set(values.filter((v: any) => v.color !== 'global').map((v: any) => v.color));
      const channelColors = new Set(channels.filter((c: any) => c.color !== 'global').map((c: any) => c.color));
      const revenueColors = new Set(revenue.filter((r: any) => r.color !== 'global').map((r: any) => r.color));
      const costColors = new Set(costs.filter((c: any) => c.color !== 'global').map((c: any) => c.color));
      const relationshipColors = new Set(relationships.filter((r: any) => r.color !== 'global').map((r: any) => r.color));
      
      // 🐛 DEBUG: Log barvy pro diagnostiku
      console.log('🎨 Canvas Validator Debug:', {
        segmentColors: Array.from(segmentColors),
        valueColors: Array.from(valueColors),
        channelColors: Array.from(channelColors),
        revenueColors: Array.from(revenueColors),
        costColors: Array.from(costColors)
      });
      
      // 🐛 DEBUG: Log RAW data ze Supabase
      console.log('🔍 RAW Segments:', segments.map((s: any) => ({ 
        text: s.text, 
        color: s.color,
        converted: hexToColorName(s.color)
      })));
      
      // Check if there are ANY global items (they're OK)
      const hasGlobalRevenue = revenue.some((r: any) => r.color === 'global');
      const hasGlobalCosts = costs.some((c: any) => c.color === 'global');
      
      const issues: string[] = [];
      const warnings: string[] = [];
      
      // ✅ PRAVIDLO 1: Každý segment MUSÍ mít hodnotu (stejná barva)
      segmentColors.forEach(color => {
        if (!valueColors.has(color)) {
          issues.push(`${getColorName(color)}: Segment BEZ hodnoty!`);
        }
      });
      
      // ✅ PRAVIDLO 2: Každá hodnota MUSÍ mít segment (stejná barva)
      valueColors.forEach(color => {
        if (!segmentColors.has(color)) {
          issues.push(`${getColorName(color)}: Hodnota BEZ segmentu! Komu to prodáváte?`);
        }
      });
      
      // ✅ PRAVIDLO 3: Každá hodnota MUSÍ mít alespoň 1 kanál (stejná barva)
      valueColors.forEach(color => {
        if (!channelColors.has(color)) {
          issues.push(`${getColorName(color)}: Hodnota BEZ kanálu! Jak oslovíte zákazníky?`);
        }
      });
      
      // ✅ PRAVIDLO 4: Každá hodnota MUSÍ mít příjem (stejná barva NEBO global)
      valueColors.forEach(color => {
        const hasColorRevenue = revenueColors.has(color);
        if (!hasColorRevenue && !hasGlobalRevenue) {
          issues.push(`${getColorName(color)}: Hodnota BEZ příjmu! Jak na tom vyděláváte?`);
        }
      });
      
      // ✅ PRAVIDLO 5: Každá hodnota MUSÍ mít náklad (stejná barva NEBO global)
      valueColors.forEach(color => {
        const hasColorCost = costColors.has(color);
        if (!hasColorCost && !hasGlobalCosts) {
          issues.push(`${getColorName(color)}: Hodnota BEZ nákladů! Kolik to stojí?`);
        }
      });
      
      // ⚠️ WARNING: Příjem/náklad má barvu, která NENÍ v hodnotách (a není global)
      revenueColors.forEach(color => {
        if (!valueColors.has(color)) {
          warnings.push(`${getColorName(color)}: Příjem bez hodnoty → Doporučujeme začít od segmentů a hodnot`);
        }
      });
      
      costColors.forEach(color => {
        if (!valueColors.has(color)) {
          warnings.push(`${getColorName(color)}: Náklad bez hodnoty → Doporučujeme začít od segmentů a hodnot`);
        }
      });
      
      // ⚠️ WARNING: Vztah je doporučený (ne kritický)
      valueColors.forEach(color => {
        if (!relationshipColors.has(color)) {
          warnings.push(`${getColorName(color)}: Hodnota bez vztahů - jak si zákazníky udržíte?`);
        }
      });
      
      if (issues.length > 0) {
        // Zobraz VŠECHNY chyby (ne jen 3)
        const allIssues = issues.map((issue, i) => `${i + 1}. ${issue}`).join('\n');
        return {
          passed: false,
          message: `❌ ${issues.length} ${issues.length === 1 ? 'kritická chyba' : issues.length <= 4 ? 'kritické chyby' : 'kritických chyb'} v propojení barev!`,
          tip: allIssues
        };
      }
      
      if (warnings.length > 0) {
        // Zobraz všechna varování (ne jen 2)
        const allWarnings = warnings.map((w, i) => `${i + 1}. ${w}`).join('\n');
        return {
          passed: true,
          message: `⚠️ ${warnings.length} ${warnings.length === 1 ? 'doporučení' : 'doporučení'} pro vylepšení`,
          tip: `${allWarnings}\n\n💡 Správné pořadí:\n1) Zákaznické segmenty →\n2) Hodnotová nabídka →\n3) Kanály →\n4) Příjmy a náklady`
        };
      }
      
      return {
        passed: true,
        message: `✅ Barvy perfektně propojené! (${segmentColors.size} produktů)`,
        tip: `Segment → Hodnota → Kanál → Příjem/Náklad ✓`
      };
    },
    severity: 'error'
  },
  {
    id: 'revenue-cost-must-have-segment-value',
    title: '💸 Příjmy/náklady musí mít základ',
    description: 'Každý barevný příjem/náklad musí mít odpovídající segment + hodnotu',
    check: (data) => {
      const segments = data.segments || [];
      const values = data.value || [];
      const revenue = data.revenue || [];
      const costs = data.costs || [];
      
      if (revenue.length === 0 && costs.length === 0) {
        return { passed: true, message: '💡 Přidejte příjmy a náklady' };
      }
      
      // Get colors (excluding global - global je OK, kontrolujeme jen barevné!)
      const segmentColors = new Set(segments.filter((s: any) => s.color !== 'global').map((s: any) => s.color));
      const valueColors = new Set(values.filter((v: any) => v.color !== 'global').map((v: any) => v.color));
      
      const issues: string[] = [];
      
      // ✅ PRAVIDLO 7A: Každý barevný příjem MUSÍ mít segment + hodnotu (stejná barva)
      revenue.forEach((item: CanvasItem) => {
        const color = item.color;
        
        // Global je OK (platí pro celý byznys)
        if (color === 'global') return;
        
        // Barevný příjem → MUSÍ mít segment + hodnotu!
        const hasSegment = segmentColors.has(color);
        const hasValue = valueColors.has(color);
        
        if (!hasSegment && !hasValue) {
          issues.push(`${getColorName(color)}: Příjem "${item.text}" nemá ani segment, ani hodnotu!`);
        } else if (!hasSegment) {
          issues.push(`${getColorName(color)}: Příjem "${item.text}" nemá segment! Pro koho je to?`);
        } else if (!hasValue) {
          issues.push(`${getColorName(color)}: Příjem "${item.text}" nemá hodnotu! Co přesně prodáváte?`);
        }
      });
      
      // ✅ PRAVIDLO 7B: Každý barevný náklad MUSÍ mít segment + hodnotu (stejná barva)
      costs.forEach((item: CanvasItem) => {
        const color = item.color;
        
        // Global je OK (platí pro celý byznys)
        if (color === 'global') return;
        
        // Barevný náklad → MUSÍ mít segment + hodnotu!
        const hasSegment = segmentColors.has(color);
        const hasValue = valueColors.has(color);
        
        if (!hasSegment && !hasValue) {
          issues.push(`${getColorName(color)}: Náklad "${item.text}" nemá ani segment, ani hodnotu!`);
        } else if (!hasSegment) {
          issues.push(`${getColorName(color)}: Náklad "${item.text}" nemá segment! Pro koho je to?`);
        } else if (!hasValue) {
          issues.push(`${getColorName(color)}: Náklad "${item.text}" nemá hodnotu! K čemu se to váže?`);
        }
      });
      
      if (issues.length > 0) {
        const allIssues = issues.map((issue, i) => `${i + 1}. ${issue}`).join('\n');
        return {
          passed: false,
          message: `❌ ${issues.length} ${issues.length === 1 ? 'problém' : issues.length <= 4 ? 'problémy' : 'problémů'} s příjmy/náklady!`,
          tip: `${allIssues}\n\n💡 Řešení:\n- Buď změňte barvu na 🌐 Globální (pokud platí pro celý byznys)\n- Nebo přidejte odpovídající segment + hodnotu se STEJNOU barvou`
        };
      }
      
      return {
        passed: true,
        message: '✅ Všechny příjmy/náklady mají základ!',
        tip: 'Každý barevný příjem/náklad má odpovídající segment + hodnotu ✓'
      };
    },
    severity: 'error'
  },
  {
    id: 'orphaned-colors',
    title: '🎨 Barvy bez základu',
    description: 'Barvy v ostatních sekcích musí mít segment NEBO hodnotu',
    check: (data) => {
      const segments = data.segments || [];
      const values = data.value || [];
      const partners = data.partners || [];
      const activities = data.activities || [];
      const resources = data.resources || [];
      const channels = data.channels || [];
      const relationships = data.relationships || [];
      const revenue = data.revenue || [];
      const costs = data.costs || [];
      
      // Get foundation colors (segment OR value)
      const segmentColors = new Set(segments.filter((s: any) => s.color !== 'global').map((s: any) => s.color));
      const valueColors = new Set(values.filter((v: any) => v.color !== 'global').map((v: any) => v.color));
      const foundationColors = new Set([...segmentColors, ...valueColors]);
      
      if (foundationColors.size === 0) {
        return { passed: true, message: '💡 Začněte od segmentů a hodnot' };
      }
      
      // Check all other sections for "orphaned" colors
      const otherSections = [
        { name: 'Partnerství', items: partners },
        { name: 'Aktivity', items: activities },
        { name: 'Zdroje', items: resources },
        { name: 'Kanály', items: channels },
        { name: 'Vztahy', items: relationships },
        { name: 'Příjmy', items: revenue },
        { name: 'Náklady', items: costs }
      ];
      
      const orphanedColorWarnings: string[] = [];
      const colorUsage: Map<string, string[]> = new Map();
      
      // Collect all color usage
      otherSections.forEach(section => {
        section.items.forEach((item: any) => {
          const color = item.color;
          if (color && color !== 'global') {
            if (!colorUsage.has(color)) {
              colorUsage.set(color, []);
            }
            colorUsage.get(color)!.push(section.name);
          }
        });
      });
      
      // Check if colors have foundation
      colorUsage.forEach((usedIn, color) => {
        if (!foundationColors.has(color)) {
          const uniqueSections = [...new Set(usedIn)];
          orphanedColorWarnings.push(
            `${getColorName(color)}: Používáte v ${uniqueSections.join(', ')}, ale CHYBÍ segment nebo hodnota!`
          );
        }
      });
      
      if (orphanedColorWarnings.length > 0) {
        const allWarnings = orphanedColorWarnings.map((w, i) => `${i + 1}. ${w}`).join('\n');
        return {
          passed: true, // WARNING, ne ERROR
          message: `⚠️ ${orphanedColorWarnings.length} ${orphanedColorWarnings.length === 1 ? 'barva bez základu' : 'barvy bez základu'}`,
          tip: `${allWarnings}\n\n💡 Řešení:\n- Každá barva MUSÍ začínat od SEGMENTU nebo HODNOTY\n- Barvy v ostatních sekcích bez základu jsou k ničemu!\n- Buď přidejte segment/hodnotu, nebo změňte na 🌐 Globální`
        };
      }
      
      return {
        passed: true,
        message: '✅ Všechny barvy mají základ!',
        tip: 'Každá barva má segment nebo hodnotu ✓'
      };
    },
    severity: 'warning'
  }
];

interface Props {
  userId: string;
  onComplete: () => void;
  onNavigateNext?: () => void;
  onAchievementUnlocked?: (achievementId: string) => void;
  isLessonCompleted?: boolean;
}

// DEMO DATA ODSTRANĚNA - BYLY NEBEZPEČNÉ!
// Přepisovala uživatelova data v kurzu bez varování.

export function CanvasValidator({ userId, onComplete, onNavigateNext, onAchievementUnlocked, isLessonCompleted = false }: Props) {
  const [canvasData, setCanvasData] = useState<any>({});
  const [results, setResults] = useState<any[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showCanvasPreview, setShowCanvasPreview] = useState(true);

  // 🧹 CLEANUP: Remove old localStorage keys on mount
  useEffect(() => {
    const oldKey = `canvas_validator_${userId}`;
    if (localStorage.getItem(oldKey)) {
      console.log('🧹 Removing old localStorage key:', oldKey);
      localStorage.removeItem(oldKey);
    }
  }, [userId]);

  // Load Canvas data FIRST, THEN check if we need to clear localStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await supabase
          .from('user_canvas_data')
          .select('*')
          .eq('user_id', userId);
        
        if (data) {
          const formatted: any = {};
          data.forEach(section => {
            formatted[section.section_key] = section.content || [];
          });
          setCanvasData(formatted);
          
          // 🔍 Check if canvas data changed - compare with previous validation
          // ⚡ VERZE 2: Přidán canvas hash pro detekci změn!
          const VALIDATOR_VERSION = 'v2';
          const storageKey = `canvas_validator_${VALIDATOR_VERSION}_${userId}`;
          const savedValidation = localStorage.getItem(storageKey);
          
          if (savedValidation) {
            try {
              const parsed = JSON.parse(savedValidation);
              
              // Create hash of current canvas data to compare
              const currentHash = JSON.stringify(formatted);
              
              // If canvas data is different, CLEAR old validation results
              if (parsed.canvasHash && parsed.canvasHash !== currentHash) {
                console.log('🔄 Canvas data changed - clearing old validation results');
                localStorage.removeItem(storageKey);
                setResults([]);
                setShowResults(false);
              } else {
                // Canvas hasn't changed, load previous results
                setResults(parsed.results || []);
                setShowResults(true);
                console.log('✅ Loaded previous validation from localStorage');
              }
            } catch (err) {
              console.error('Failed to parse saved validation:', err);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load canvas:', err);
      }
    };
    
    loadData();
  }, [userId]);

  const runValidation = () => {
    setIsValidating(true);
    
    // 🏆 Trigger achievement - First validation
    if (onAchievementUnlocked) {
      onAchievementUnlocked('validator-used');
    }
    
    // Simulate validation delay for effect
    setTimeout(() => {
      try {
        const validationResults = VALIDATION_RULES.map(rule => {
          try {
            const result = rule.check(canvasData);
            return {
              ...rule,
              ...result
            };
          } catch (ruleError: any) {
            console.error(`❌ Error in validation rule "${rule.id}":`, ruleError);
            return {
              ...rule,
              passed: false,
              message: '❌ Chyba při validaci',
              tip: `Chyba v pravidle "${rule.title}". Kontaktujte podporu.`
            };
          }
        });
        
        setResults(validationResults);
        setShowResults(true);
        setIsValidating(false);
        
        // 💾 Save validation results to localStorage WITH canvas hash
        const VALIDATOR_VERSION = 'v2';
        const storageKey = `canvas_validator_${VALIDATOR_VERSION}_${userId}`;
        const canvasHash = JSON.stringify(canvasData);
        localStorage.setItem(storageKey, JSON.stringify({
          results: validationResults,
          canvasHash: canvasHash,
          timestamp: new Date().toISOString()
        }));
        console.log('💾 Saved validation to localStorage with canvas hash');
        
        // 🏆 ACHIEVEMENT: validator-used (stejně jako desktop)
        if (onAchievementUnlocked) {
          onAchievementUnlocked('validator-used');
        }
        
        const errorCount = validationResults.filter(r => !r.passed && r.severity === 'error').length;
        
        if (errorCount === 0) {
          // ❌ Odstraněno - duplicitní toast (vizuální validace stačí)
        } else {
          // ❌ Odstraněno - duplicitní toast (vizuální validace stačí)
        }
      } catch (err: any) {
        console.error('❌ Critical error in runValidation:', err);
        toast.error('❌ Chyba při validaci', {
          description: 'Zkuste to znovu nebo kontaktujte podporu'
        });
        setIsValidating(false);
      }
    }, 1500);
  };

  // DEMO FUNKCE ODSTRANĚNY - BYLY NEBEZPEČNÉ!
  // Přepisovaly uživatelova data bez varování.

  // 🎯 3 KATEGORIE - CO SE SKUTEČNĚ ZOBRAZÍ UŽIVATELI (podle rendering logiky na řádku 768-773):
  // ❌ Chyby (červené) = !passed + severity='error'
  const errorCount = results.filter(r => !r.passed && r.severity === 'error').length;
  // ⚠️ Varování (žluté) = severity='warning' 
  const warningCount = results.filter(r => r.severity === 'warning').length;
  // ✅ Výborné (zelené) = VŠECHNY které NEJSOU error nebo warning (podle rendering logiky)
  // Logika: zobrazí se zelená pokud NENÍ (error && !passed) A NENÍ warning
  const successCount = results.filter(r => {
    const isError = r.severity === 'error' && !r.passed;
    const isWarning = r.severity === 'warning';
    return !isError && !isWarning; // Vše ostatní je zelené
  }).length;

  // Format canvas data for preview
  const canvasSectionsForPreview = [
    { id: 'segments', title: 'Zákaznické segmenty', items: canvasData.segments || [] },
    { id: 'value', title: 'Hodnotová nabídka', items: canvasData.value || [] },
    { id: 'channels', title: 'Kanály', items: canvasData.channels || [] },
    { id: 'relationships', title: 'Vztahy se zákazníky', items: canvasData.relationships || [] },
    { id: 'revenue', title: 'Zdroje příjmů', items: canvasData.revenue || [], valueLabel: 'Cena v Kč' },
    { id: 'resources', title: 'Klíčové zdroje', items: canvasData.resources || [] },
    { id: 'activities', title: 'Klíčové aktivity', items: canvasData.activities || [] },
    { id: 'partners', title: 'Klíčová partnerství', items: canvasData.partners || [] },
    { id: 'costs', title: 'Struktura nákladů', items: canvasData.costs || [], valueLabel: 'Náklady v Kč' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h2 className="mb-2">🔍 Validace Canvas</h2>
            <p className="text-blue-100 mb-3">
              Zkontrolujeme váš Canvas podle osvědčených pravidel
            </p>
            <div className="bg-white/10 border border-white/20 rounded-lg p-3">
              <p className="text-blue-50 mb-2">
                <strong>🎨 Logika barev:</strong>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-blue-100">
                <div>• Každá barva = jeden produkt/segment</div>
                <div>• Segment → Hodnota → Kanál (stejná barva)</div>
                <div>• Hodnota → Příjem/Náklad (stejná barva nebo 🌐 global)</div>
                <div>• 🌐 Globální = sdílené náklady/příjmy pro všechny</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas Preview - Toggle */}
      <div className="border-2 border-blue-200 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50">
        <button
          onClick={() => setShowCanvasPreview(!showCanvasPreview)}
          className="w-full bg-white/80 hover:bg-white p-4 flex items-center justify-between transition-colors group"
        >
          <div className="flex items-center gap-3">
            {showCanvasPreview ? (
              <EyeOff className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            ) : (
              <Eye className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            )}
            <div className="text-left">
              <h4 className="font-bold text-gray-900">
                {showCanvasPreview ? '🙈 Skrýt Canvas' : '👁️ Zobrazit váš Canvas'}
              </h4>
              <p className="text-xs text-gray-600 hidden md:block">
                {showCanvasPreview ? 'Zavřít náhled' : 'Desktop: Grid 3×3 | Mobile: Seznam sekcí'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-blue-600">
              {canvasSectionsForPreview.reduce((sum, s) => sum + s.items.length, 0)} položek
            </span>
            <p className="text-xs text-gray-500 hidden md:block">
              {canvasSectionsForPreview.filter(s => s.items.length > 0).length} / 9 sekcí
            </p>
          </div>
        </button>
        
          {showCanvasPreview && (
            <div
              className="border-t-2 border-gray-200 transition-all duration-300 ease-out"
            >
              {/* Desktop - Full Grid Canvas */}
              <div className="hidden md:block p-6 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="mb-4 text-center">
                  <h5 className="text-sm font-bold text-gray-700 mb-1">
                    📊 Vaše Podnikatelská Čtvrtka
                  </h5>
                  <p className="text-xs text-gray-600">
                    Toto budeme validovat podle osvědčených pravidel
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
                  <BusinessModelCanvasSimple
                    userId={userId}
                    hideTips={true}
                    allowedSection="__NONE__"
                  />
                </div>
              </div>
              
              {/* Mobile - Accordion Preview */}
              <div className="md:hidden p-4 bg-white max-h-96 overflow-y-auto">
                <MobileCanvasPreview 
                  sections={canvasSectionsForPreview} 
                  defaultOpen={false}
                />
              </div>
            </div>
          )}
      </div>

      {/* Validation Button */}
      {!showResults && (
        <div className="text-center py-8">
          <Button
            onClick={runValidation}
            disabled={isValidating}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 gap-2"
          >
            {isValidating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Kontroluji Canvas...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Spustit validaci
              </>
            )}
          </Button>
        </div>
      )}

      {/* Results */}
        {showResults && (
          <div
            className="space-y-4 transition-all duration-300 ease-out"
          >
            {/* Summary */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-green-50 border-2 border-green-300 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-700">{successCount}</div>
                <div className="text-sm text-green-600">✅ Výborné</div>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-300 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-yellow-700">{warningCount}</div>
                <div className="text-sm text-yellow-600">⚠️ Varování</div>
              </div>
              <div className="bg-red-50 border-2 border-red-300 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-red-700">{errorCount}</div>
                <div className="text-sm text-red-600">❌ Chyby</div>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-3">
              {results.map((result, index) => (
                <div
                  key={result.id}
                  className={`border-2 rounded-lg p-4 transition-all duration-300 ease-out ${
                    result.severity === 'error' && !result.passed
                      ? 'bg-red-50 border-red-300'
                      : result.severity === 'warning'
                      ? 'bg-yellow-50 border-yellow-300'
                      : 'bg-green-50 border-green-300'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-3">
                    {result.severity === 'error' && !result.passed ? (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    ) : result.severity === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    )}
                    
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">{result.title}</h4>
                      <p className={`mb-2 ${
                        result.severity === 'error' && !result.passed ? 'text-red-700' : result.severity === 'warning' ? 'text-yellow-700' : 'text-green-700'
                      }`}>
                        {result.message}
                      </p>
                      {result.tip && (
                        <div className="bg-white/50 rounded p-3 flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="text-gray-700 whitespace-pre-line flex-1">{result.tip}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            {!isCompleted && !isLessonCompleted && (
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => {
                    setShowResults(false);
                    setResults([]);
                    // Smaž uložený stav - nechceme starou validaci
                    localStorage.removeItem(`canvas_validator_${userId}`);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  🔄 Zkontrolovat znovu
                </Button>
                <Button
                  onClick={() => {
                    // ✅ Označ dokončení
                    onComplete();
                    
                    // 🎉 Toast s potvrzením
                    toast.success('✅ Lekce dokončena! Skvělá práce!', {
                      duration: 2000,
                    });
                    
                    // 🚀 Automatický redirect po 500ms (rychlejší UX)
                    if (onNavigateNext) {
                      setTimeout(() => {
                        onNavigateNext();
                      }, 500);
                    }
                  }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 gap-2"
                >
                  {errorCount > 0 ? '⚠️ Pokračovat i přesto' : '✅ Hotovo - Dokončit lekci'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {errorCount > 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mt-4">
                <p className="text-yellow-800">
                  💡 <strong>Můžete pokračovat i s chybami!</strong> Doporučujeme ale model vylepšit před použitím.
                </p>
              </div>
            )}

            {errorCount === 0 && warningCount > 0 && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4">
                <p className="text-blue-800">
                  💡 <strong>Tip:</strong> Vraťte se do předchozích lekcí a doplňte chybějící položky.
                  Můžete použít navigaci v postranním menu.
                </p>
              </div>
            )}
          </div>
        )}
    </div>
  );
}

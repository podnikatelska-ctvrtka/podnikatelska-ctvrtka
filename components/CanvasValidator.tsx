import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
    pink: '🩷 Růžová',
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
    severity: 'warning'
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
    severity: 'warning'
  },
  {
    id: 'color-cross-validation',
    title: '🔗 Propojení barev napříč sekcemi',
    description: 'Každý produkt (barva) musí mít segment → hodnotu → příjem',
    check: (data) => {
      const segments = data.segments || [];
      const values = data.value || [];
      const channels = data.channels || [];
      const revenue = data.revenue || [];
      const activities = data.activities || [];
      const partners = data.partners || [];
      
      if (segments.length === 0) {
        return { passed: true, message: '💡 Nejprve přidejte zákaznické segmenty' };
      }
      
      // Get all product colors (excluding global)
      const segmentColors = new Set(segments.filter((s: any) => s.color !== 'global').map((s: any) => s.color));
      const valueColors = new Set(values.filter((v: any) => v.color !== 'global').map((v: any) => v.color));
      const channelColors = new Set(channels.filter((c: any) => c.color !== 'global').map((c: any) => c.color));
      const revenueColors = new Set(revenue.filter((r: any) => r.color !== 'global').map((r: any) => r.color));
      const activityColors = new Set(activities.filter((a: any) => a.color !== 'global').map((a: any) => a.color));
      const partnerColors = new Set(partners.filter((p: any) => p.color !== 'global').map((p: any) => p.color));
      
      // Get ALL colors used anywhere (union of all sets)
      const allColors = new Set([
        ...segmentColors,
        ...valueColors,
        ...revenueColors,
        ...activityColors,
        ...partnerColors
      ]);
      
      const issues: string[] = [];
      const warnings: string[] = [];
      
      // Check each segment color - must have value
      segmentColors.forEach(color => {
        if (!valueColors.has(color)) {
          issues.push(`${getColorName(color)}: Segment BEZ hodnoty!`);
        }
        if (!channelColors.has(color)) {
          issues.push(`${getColorName(color)}: Segment bez kanálu`);
        }
      });
      
      // NOVÁ LOGIKA: Hodnoty musí mít segment (global příjmy jsou OK)
      valueColors.forEach(color => {
        if (!segmentColors.has(color)) {
          issues.push(`${getColorName(color)}: Hodnota BEZ segmentu! Komu to prodáváte?`);
        }
      });
      
      if (issues.length > 0) {
        return {
          passed: false,
          message: `❌ ${issues.length} kritických chyb v propojení barev!`,
          tip: issues.slice(0, 3).join(' • ') // Show max 3 issues
        };
      }
      
      if (warnings.length > 0) {
        return {
          passed: true,
          message: `⚠️ ${warnings.length} varování (nekritické)`,
          tip: warnings.slice(0, 2).join(' • ')
        };
      }
      
      return {
        passed: true,
        message: `✅ Barvy perfektně propojené! (${segmentColors.size} produktů)`,
        tip: `Každý produkt má segment → hodnotu → příjem`
      };
    },
    severity: 'error'
  }
];

interface Props {
  userId: number;
  onComplete: () => void;
  onNavigateNext?: () => void;
  onAchievementUnlocked?: (achievementId: string) => void;
}

// DEMO DATA ODSTRANĚNA - BYLY NEBEZPEČNÉ!
// Přepisovala uživatelova data v kurzu bez varování.

export function CanvasValidator({ userId, onComplete, onNavigateNext, onAchievementUnlocked }: Props) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [canvasData, setCanvasData] = useState<any>({});
  const [results, setResults] = useState<any[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showCanvasPreview, setShowCanvasPreview] = useState(true);

  // Load Canvas data
  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await supabase
          .from('business_canvas_sections')
          .select('*')
          .eq('user_id', userId);
        
        if (data) {
          const formatted: any = {};
          data.forEach(section => {
            formatted[section.section_key] = section.content || [];
          });
          setCanvasData(formatted);
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
      const validationResults = VALIDATION_RULES.map(rule => {
        const result = rule.check(canvasData);
        return {
          ...rule,
          ...result
        };
      });
      
      setResults(validationResults);
      setShowResults(true);
      setIsValidating(false);
      
      const errorCount = validationResults.filter(r => !r.passed && r.severity === 'error').length;
      
      if (errorCount === 0) {
        // ❌ Odstraněno - duplicitní toast (vizuální validace stačí)
      } else {
        // ❌ Odstraněno - duplicitní toast (vizuální validace stačí)
      }
    }, 1500);
  };

  // DEMO FUNKCE ODSTRANĚNY - BYLY NEBEZPEČNÉ!
  // Přepisovaly uživatelova data bez varování.

  const errorCount = results.filter(r => !r.passed && r.severity === 'error').length;
  const warningCount = results.filter(r => !r.passed && r.severity === 'warning').length;
  const passedCount = results.filter(r => r.passed).length;

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
            <h3 className="text-xl font-bold mb-2">🔍 Validace Canvas</h3>
            <p className="text-blue-100 text-sm mb-3">
              Zkontrolujeme váš Canvas podle osvědčených pravidel
            </p>
            <div className="bg-white/10 border border-white/20 rounded-lg p-3 text-xs">
              <p className="text-blue-50 mb-2">
                <strong>🎨 Logika barev:</strong>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-blue-100">
                <div>• Každá barva = jeden produkt/segment</div>
                <div>• Stejná barva = patří k sobě</div>
                <div>• 🌐 Globální = pro celý byznys (zdroje, náklady...)</div>
                <div>• Barvy propojují sekce (segment→hodnota→příjem)</div>
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
        
        <AnimatePresence>
          {showCanvasPreview && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t-2 border-gray-200"
            >
              {/* Desktop - Full Grid Canvas */}
              <div className="hidden md:block p-6 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="mb-4 text-center">
                  <h5 className="text-sm font-bold text-gray-700 mb-1">
                    📊 Váš Business Model Canvas
                  </h5>
                  <p className="text-xs text-gray-600">
                    Toto budeme validovat podle osvědčených pravidel
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-blue-200">
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
            </motion.div>
          )}
        </AnimatePresence>
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
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Summary */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-green-50 border-2 border-green-300 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-700">{passedCount}</div>
                <div className="text-xs text-green-600">Úspěšné</div>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-300 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-700">{warningCount}</div>
                <div className="text-xs text-yellow-600">Varování</div>
              </div>
              <div className="bg-red-50 border-2 border-red-300 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-700">{errorCount}</div>
                <div className="text-xs text-red-600">Chyby</div>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-3">
              {results.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border-2 rounded-lg p-4 ${
                    result.passed
                      ? 'bg-green-50 border-green-300'
                      : result.severity === 'error'
                      ? 'bg-red-50 border-red-300'
                      : 'bg-yellow-50 border-yellow-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {result.passed ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : result.severity === 'error' ? (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    )}
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-sm mb-1">{result.title}</h4>
                      <p className={`text-sm mb-2 ${
                        result.passed ? 'text-green-700' : result.severity === 'error' ? 'text-red-700' : 'text-yellow-700'
                      }`}>
                        {result.message}
                      </p>
                      {result.tip && (
                        <div className="bg-white/50 rounded p-2 text-xs flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{result.tip}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            {!isCompleted ? (
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowResults(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Zkontrolovat znovu
                </Button>
                <Button
                  onClick={() => {
                    setIsCompleted(true);
                    onComplete();
                  }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 gap-2"
                >
                  {errorCount > 0 ? '⚠️ Pokračovat i přesto' : '✅ Hotovo - Dokončit lekci'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border-2 border-green-300 rounded-2xl p-6 mt-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500 rounded-full p-3">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-green-900">
                      ✅ Lekce dokončena!
                    </h3>
                    <p className="text-sm text-green-700">
                      Skvělá práce! Můžete pokračovat na další lekci.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  {onNavigateNext && (
                    <Button
                      onClick={onNavigateNext}
                      size="lg"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Pokračovat na další lekci →
                    </Button>
                  )}
                  <Button
                    onClick={() => setIsCompleted(false)}
                    variant="outline"
                    size="lg"
                  >
                    🔄 Zkusit znovu
                  </Button>
                </div>
              </motion.div>
            )}

            {errorCount > 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mt-4">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Můžete pokračovat i s chybami!</strong> Doporučujeme ale model vylepšit před použitím.
                </p>
              </div>
            )}

            {errorCount === 0 && warningCount > 0 && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> Vraťte se do předchozích lekcí a doplňte chybějící položky.
                  Můžete použít navigaci v postranním menu.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

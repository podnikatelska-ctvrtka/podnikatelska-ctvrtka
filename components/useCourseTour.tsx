import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

// Definice kroků pro každý modul
export const TOUR_MODULES = {
  module1: {
    id: 'segments',
    title: 'Modul 1: Zákaznické segmenty',
    steps: [
      {
        title: 'Kdo jsou vaši zákazníci?',
        description: 'Teď si vyzkoušíte první část Business Model Canvas. Přidejte alespoň jeden zákaznický segment.',
        tips: [
          'Buďte konkrétní: "Mladé maminky 25-35 let" místo "ženy"',
          'Rozdělte podle potřeb, ne jen demografie',
          'Popište KDO konkrétně kupuje váš produkt/službu'
        ],
        highlightSection: 'segments',
        requiredItems: 1
      }
    ]
  },
  module2: {
    id: 'value',
    title: 'Modul 2: Hodnotová nabídka',
    steps: [
      {
        title: 'Co nabízíte?',
        description: 'Definujte vaši hodnotovou nabídku. Co přesně prodáváte a za kolik?',
        tips: [
          'Uveďte konkrétní produkt/službu',
          'Přidejte cenu (např. Káva 65 Kč)',
          'Použijte barvu pro seskupení (modrá = produkt A)'
        ],
        highlightSection: 'value',
        requiredItems: 1
      }
    ]
  },
  module3: {
    id: 'channels',
    title: 'Modul 3: Kanály',
    steps: [
      {
        title: 'Jak k vám zákazníci přijdou?',
        description: 'Přidejte kanály, kterými získáváte a komunikujete se zákazníky.',
        tips: [
          'Kde vás zákazníci najdou? (web, Instagram, reklama...)',
          'Jak si objednají? (e-shop, telefon, osobně...)',
          'Jak s nimi komunikujete? (email, FB, WhatsApp...)'
        ],
        highlightSection: 'channels',
        requiredItems: 1
      }
    ]
  },
  module4: {
    id: 'costs',
    title: 'Modul 4: Struktura nákladů',
    steps: [
      {
        title: 'Kolik vás to stojí?',
        description: 'Přidejte vaše měsíční náklady. Buďte realisté!',
        tips: [
          'Fixní náklady: nájem, energie, mzdy...',
          'Variabilní náklady: materiál, doprava...',
          'Uvádějte měsíční částky v Kč'
        ],
        highlightSection: 'costs',
        requiredItems: 1
      }
    ]
  },
  module5: {
    id: 'activities',
    title: 'Modul 5: Klíčové aktivity',
    steps: [
      {
        title: 'Co musíte dělat?',
        description: 'Jaké aktivity jsou klíčové pro fungování vašeho byznysu?',
        tips: [
          'Co děláte každý den? (vaření kávy, marketing...)',
          'Bez čeho by to nefungovalo?',
          'Co vás odlišuje od konkurence?'
        ],
        highlightSection: 'activities',
        requiredItems: 1
      }
    ]
  }
};

export function useCourseTour(userId: number, moduleId: keyof typeof TOUR_MODULES) {
  const [tourActive, setTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [moduleCompleted, setModuleCompleted] = useState(false);

  const module = TOUR_MODULES[moduleId];

  // Load progress from Supabase
  useEffect(() => {
    loadProgress();
  }, [userId, moduleId]);

  const loadProgress = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('course_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('module_id', moduleId)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // Ignore "not found" error
      
      if (data) {
        setModuleCompleted(data.completed);
      }
    } catch (err) {
      console.error('Failed to load tour progress:', err);
    }
  };

  const saveProgress = async (completed: boolean) => {
    if (!userId) return;

    try {
      await supabase
        .from('course_progress')
        .upsert({
          user_id: userId,
          module_id: moduleId,
          completed,
          completed_at: completed ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,module_id'
        });

      setModuleCompleted(completed);
    } catch (err) {
      console.error('Failed to save tour progress:', err);
    }
  };

  const startTour = () => {
    setTourActive(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < module.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const skipTour = () => {
    setTourActive(false);
  };

  const completeTour = () => {
    setTourActive(false);
    saveProgress(true);
  };

  const checkRequirement = (sectionId: string, itemCount: number): boolean => {
    const step = module.steps[currentStep];
    if (step.highlightSection !== sectionId) return true;
    
    return itemCount >= (step.requiredItems || 1);
  };

  return {
    tourActive,
    currentStep,
    moduleCompleted,
    module,
    currentStepData: module.steps[currentStep],
    totalSteps: module.steps.length,
    startTour,
    nextStep,
    skipTour,
    completeTour,
    checkRequirement,
  };
}

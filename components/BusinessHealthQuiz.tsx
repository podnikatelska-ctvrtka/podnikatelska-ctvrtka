import { Card } from './ui/card';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, TrendingUp, TrendingDown, Minus, ArrowRight, Mail, User, ChevronLeft, Sparkles, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { trackQuizCompleted, trackQuizStarted } from '../lib/analytics';
import { Progress } from './ui/progress';

// Typy pro kvíz
type QuizType = 'beginner' | 'existing' | null;

interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'scale';
  options?: { value: number; label: string }[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: { min: string; max: string };
}

interface QuizResult {
  score: number;
  category: 'critical' | 'unstable' | 'solid' | 'advanced' | 'beginner';
  categoryLabel: string;
  categoryDescription: string;
  categoryColor: string;
  risks: string[];
  recommendations: string[];
  subScores?: { // ✅ NOVÝ - detailní rozpad skóre
    label: string;
    score: number;
    icon: string;
  }[];
}

// Otázky pro začínající podnikatele
const beginnerQuestions: QuizQuestion[] = [
  {
    id: 'b1',
    question: 'Máš jasnou představu, komu přesně chceš prodávat?',
    type: 'single',
    options: [
      { value: 0, label: 'Ne, vůbec nevím' },
      { value: 33, label: 'Mám hrubou představu' },
      { value: 66, label: 'Ano, mám definovanou cílovou skupinu' },
      { value: 100, label: 'Ano, znám je detailně (věk, problémy, potřeby)' }
    ]
  },
  {
    id: 'b2',
    question: 'Víš, jak budeš získávat první zákazníky?',
    type: 'single',
    options: [
      { value: 0, label: 'Nemám plán' },
      { value: 33, label: 'Mám pár nápadů' },
      { value: 66, label: 'Mám konkrétní plán (FB ads, networking...)' },
      { value: 100, label: 'Mám otestovaný plán s prvními kontakty' }
    ]
  },
  {
    id: 'b3',
    question: 'Spočítal sis, kolik minimálně potřebuješ vydělat měsíčně?',
    type: 'single',
    options: [
      { value: 0, label: 'Vůbec jsem to nepočítal' },
      { value: 50, label: 'Mám hrubý odhad' },
      { value: 100, label: 'Ano, vím přesně včetně nákladů' }
    ]
  },
  {
    id: 'b4',
    question: 'Máš napsaný konkrétní plán na prvních 90 dní?',
    type: 'single',
    options: [
      { value: 0, label: 'Ne, zatím ne' },
      { value: 50, label: 'Mám v hlavě' },
      { value: 100, label: 'Ano, mám napsaný krok za krokem' }
    ]
  },
  {
    id: 'b5',
    question: 'Víš, čím se budeš lišit od konkurence?',
    type: 'single',
    options: [
      { value: 0, label: 'Nevím, asi ničím' },
      { value: 33, label: 'Budu levnější/rychlejší' },
      { value: 66, label: 'Mám unikátní řešení konkrétního problému' },
      { value: 100, label: 'Mám jasnou hodnotovou nabídku, kterou konkurence nemá' }
    ]
  },
  {
    id: 'b6',
    question: 'Kolik peněz máš k dispozici na start?',
    type: 'single',
    options: [
      { value: 0, label: 'Žádné nebo velmi málo' },
      { value: 50, label: 'Na 3-6 měsíců provozu' },
      { value: 100, label: 'Na 6+ měsíců nebo mám zajištěný příjem' }
    ]
  },
  {
    id: 'b7',
    question: 'Máš právní věci vyřešené? (živnost/s.r.o., bankovní účet, pojištění)',
    type: 'single',
    options: [
      { value: 0, label: 'Vůbec jsem to neřešil' },
      { value: 50, label: 'Částečně (mám živnost, ale nic dalšího)' },
      { value: 100, label: 'Ano, vše vyřešeno' }
    ]
  },
  {
    id: 'b8',
    question: 'Testoval jsi už svůj nápad s reálnými lidmi?',
    type: 'single',
    options: [
      { value: 0, label: 'Ne, zatím ne' },
      { value: 50, label: 'Ano, s rodinou/přáteli' },
      { value: 100, label: 'Ano, s reálnými potenciálními zákazníky' }
    ]
  }
];

// Otázky pro podnikající
const existingQuestions: QuizQuestion[] = [
  {
    id: 'e1',
    question: 'Odkud získáváš většinu zákazníků?',
    type: 'single',
    options: [
      { value: 0, label: 'Z jednoho hlavního kanálu' },
      { value: 50, label: 'Ze 2 kanálů' },
      { value: 100, label: 'Z 3+ různých kanálů' }
    ]
  },
  {
    id: 'e2',
    question: 'Kolik % tržeb ti dělají TOP 3 klienti?',
    type: 'single',
    options: [
      { value: 0, label: 'Více než 50%' },
      { value: 50, label: '30-50%' },
      { value: 75, label: '20-30%' },
      { value: 100, label: 'Méně než 20%' },
      { value: 25, label: 'Nevím přesně' }
    ]
  },
  {
    id: 'e3',
    question: 'Znáš přesně, kolik tě stojí získání JEDNOHO zákazníka (CAC)?',
    type: 'single',
    options: [
      { value: 0, label: 'Vůbec to nesleduju' },
      { value: 50, label: 'Mám hrubý odhad' },
      { value: 100, label: 'Ano, vím to přesně' }
    ]
  },
  {
    id: 'e4',
    question: 'Kolik měsíců vydrží byznys bez příjmů (rezervy)?',
    type: 'single',
    options: [
      { value: 0, label: 'Méně než 1 měsíc' },
      { value: 33, label: '1-3 měsíce' },
      { value: 66, label: '3-6 měsíců' },
      { value: 100, label: 'Více než 6 měsíců' }
    ]
  },
  {
    id: 'e5',
    question: 'Jak dlouho funguje byznys bez tebe?',
    type: 'single',
    options: [
      { value: 0, label: 'Vůbec, všechno dělám sám' },
      { value: 33, label: 'Pár dní max' },
      { value: 66, label: '1-2 týdny' },
      { value: 100, label: 'Klidně měsíc, mám systémy a lidi' }
    ]
  },
  {
    id: 'e6',
    question: 'Kolik % zákazníků se k tobě vrací opakovaně?',
    type: 'single',
    options: [
      { value: 0, label: 'Skoro žádní (jen jednorázové zakázky)' },
      { value: 50, label: '20-40%' },
      { value: 100, label: 'Více než 50%' }
    ]
  },
  {
    id: 'e7',
    question: 'Jaká je tvoje průměrná zisková marže?',
    type: 'single',
    options: [
      { value: 0, label: 'Nevím / pod 10%' },
      { value: 50, label: '10-30%' },
      { value: 100, label: 'Více než 30%' }
    ]
  },
  {
    id: 'e8',
    question: 'Co tě brzdí v růstu nejvíc?',
    type: 'single',
    options: [
      { value: 0, label: 'Nevím, všechno najednou' },
      { value: 33, label: 'Nemám čas' },
      { value: 66, label: 'Nemám správný systém/proces' },
      { value: 100, label: 'Nic zásadního, rostu stabilně' }
    ]
  },
  {
    id: 'e9',
    question: 'Co se stane, když přijdeš o hlavního dodavatele/partnera?',
    type: 'single',
    options: [
      { value: 0, label: 'Byznys by se zastavil' },
      { value: 50, label: 'Měl bych velký problém' },
      { value: 100, label: 'Mám záložní řešení / víc dodavatelů' }
    ]
  },
  {
    id: 'e10',
    question: 'Má napsané procesy pro hlavní činnosti v byznysu?',
    type: 'single',
    options: [
      { value: 0, label: 'Ne, všechno mám jen v hlavě' },
      { value: 50, label: 'Částečně, něco mám zdokumentované' },
      { value: 100, label: 'Ano, vše je zdokumentované' }
    ]
  }
];

// Funkce pro výpočet výsledku
function calculateResult(answers: Record<string, number>, quizType: QuizType): QuizResult {
  const values = Object.values(answers);
  const score = Math.round(values.reduce((sum, val) => sum + val, 0) / values.length);
  
  // ✅ CALCULATE SUB-SCORES based on quiz type
  let subScores: { label: string; score: number; icon: string }[] = [];
  
  if (quizType === 'existing') {
    // Pro podnikající - 5 kategorií
    const finance = Math.round(((answers.e3 || 0) + (answers.e4 || 0) + (answers.e7 || 0)) / 3);
    const diverzifikace = Math.round(((answers.e1 || 0) + (answers.e2 || 0) + (answers.e9 || 0)) / 3);
    const systematizace = Math.round(((answers.e5 || 0) + (answers.e10 || 0)) / 2);
    const customerValue = answers.e6 || 0;
    const rust = answers.e8 || 0;
    
    subScores = [
      { label: 'Finance & Čísla', score: finance, icon: '💰' },
      { label: 'Diverzifikace', score: diverzifikace, icon: '🎯' },
      { label: 'Systematizace', score: systematizace, icon: '⚙️' },
      { label: 'Loajalita zákazníků', score: customerValue, icon: '❤️' },
      { label: 'Růst', score: rust, icon: '📈' }
    ];
  } else if (quizType === 'beginner') {
    // Pro začínající - 4 kategorie
    const priprava = Math.round(((answers.b1 || 0) + (answers.b2 || 0) + (answers.b4 || 0)) / 3);
    const finance = Math.round(((answers.b3 || 0) + (answers.b6 || 0)) / 2);
    const produkt = Math.round(((answers.b5 || 0) + (answers.b8 || 0)) / 2);
    const administrativa = answers.b7 || 0;
    
    subScores = [
      { label: 'Příprava & Plán', score: priprava, icon: '📋' },
      { label: 'Finance', score: finance, icon: '💰' },
      { label: 'Produkt & Hodnota', score: produkt, icon: '🎁' },
      { label: 'Administrativa', score: administrativa, icon: '📄' }
    ];
  }
  
  if (quizType === 'beginner') {
    return {
      score,
      category: 'beginner',
      categoryLabel: score >= 70 ? 'Připravený na start' : score >= 40 ? 'Máš základ, ale chybí ti části' : 'Potřebuješ se víc připravit',
      categoryDescription: score >= 70 
        ? 'Máš solidní základ! Teď je čas přejít do akce a rozjet to.'
        : score >= 40
        ? 'Máš dobré základy, ale pár věcí ti chybí. Vyplň mezery před startem.'
        : 'Ještě není čas startovat. Potřebuješ si udělat pořádek v plánu.',
      categoryColor: score >= 70 ? 'text-green-600' : score >= 40 ? 'text-yellow-600' : 'text-red-600',
      risks: score >= 70 
        ? ['Nedostatečné testování produktu před plným spuštěním', 'Podcenění marketingu v prvních měsících']
        : score >= 40
        ? ['Nejasná cílová skupina → promrhané peníze v marketingu', 'Chybějící finanční plán → nevíš kdy dojdou peníze', 'Neotestovaný nápad → možná nikdo nechce co nabízí']
        : ['Žádný konkrtní plán → budeš váhat a prokrastinovat', 'Neznáš své čísla → nevíš jestli děláš zisk nebo ztrátu', 'Nemáš jasno v hodnotě → proč by si tě měli vybrat?'],
      recommendations: score >= 70
        ? ['Udělej si detailní akční plán na prvních 90 dní', 'Připrav si MVP (minimum viable product) co nejrychleji', 'Najdi si 3-5 beta testerů a získej feedback']
        : score >= 40
        ? ['Udělej si Business Model Canvas → uvidíš mezery', 'Nadefinuj přesně KOMU prodáváš (ne "všem")', 'Spočítej si minimální měsíční obrat na přežití']
        : ['STOP. Než uděláš cokoli dalšího, udělej si pořádný plán', 'Začni s Business Model Canvas → Podnikatelská Čtvrtka ti ukáže jak', 'Testuj nápad s reálnými lidmi PŘED investicí'],
      subScores
    };
  }
  
  // Pro podnikající
  let category: 'critical' | 'unstable' | 'solid' | 'advanced' = 'critical';
  let categoryLabel = '';
  let categoryDescription = '';
  let categoryColor = '';
  let risks: string[] = [];
  let recommendations: string[] = [];
  
  if (score >= 76) {
    category = 'advanced';
    categoryLabel = 'Pokročilý 💎';
    categoryDescription = 'Tvůj byznys je ve skvělém stavu! Teď jde o optimalizaci detailů a škálování.';
    categoryColor = 'text-purple-600';
    risks = [
      'Riziko stagnace - 90% úspěšných byznysů staguje po dosažení "komfortní" úrovně',
      'Podcenění konkurence - někdo mladší, hladovější a chytřejší může přijít a převzít tvůj trh',
      'Přílišná spokojenost - když to funguje, přestaneš experimentovat a inovovat'
    ];
    recommendations = [
      '💡 Vyhraď si 1 hodinu týdně na inovace - testuj nové produkty, kanály, strategie',
      '💡 Najmi někoho kdo převezme část tvé role - uvolni 20% času na strategii',
      '💡 Udělej analýzu konkurence - kde jsou lepší než ty? Co můžeš zkopírovat?'
    ];
  } else if (score >= 56) {
    category = 'solid';
    categoryLabel = 'Solidní základ ';
    categoryDescription = 'Funguje to, ale necháváš peníze na stole. Pár úprav a budeš na úplně jiné úrovni.';
    categoryColor = 'text-green-600';
    risks = [
      'Chybějící diverzifikace příjmů - co když přijdeš o hlavní kanál? (50% byznysů zkrachuje kvůli závislosti na jednom zdroji)',
      'Nízká škálovatelnost - musíš být "v byznysu" místo "na byznysu" → nemůžeš růst',
      'Neoptimalizované procesy - tratíš 20-30% času na věci které by mohly být automatizované',
      'Nízké % opakovaných zákazníků - získání nového zákazníka stojí 5-7x víc než udržení stávajícího'
    ];
    recommendations = [
      '💡 Najdi 2-3 nové kanály pro zákazníky - diverzifikace je klíč k růstu',
      '💡 Zapiš si hlavní procesy které opakuješ - pak můžeš delegovat',
      '💡 Sleduj 3 čísla každý týden: CAC (náklady na zákazníka), marže, % opakovaných zákazníků'
    ];
  } else if (score >= 31) {
    category = 'unstable';
    categoryLabel = 'Nestabilní 🟡';
    categoryDescription = 'Byznys funguje, ale visíš na vlásku. Pár konkrétních kroků a budeš stabilnější.';
    categoryColor = 'text-yellow-600';
    risks = [
      'Kritická závislost na 1-2 klientech/kanálech - pokud zmizí, tratíš 50%+ tržeb',
      'Žádné finanční rezervy - jeden výpadek (nemoc, problém s dodavatelem) a jsi v existenčním problému',
      'Všechno dělá majitel - když onemocníš nebo chceš dovolenou, byznys stojí',
      'Neznáš svoje čísla - nevíš kolik tě stojí získání zákazníka a kolik ti průměrně utratí'
    ];
    recommendations = [
      '💡 Udělej seznam TOP 10 klientů a analyzuj závislost - najdi nové zákazníky jako pojistku',
      '💡 Dávej 10% z každé platby stranou - cíl je mít 3 měsíce nákladů jako rezervu',
      '💡 Začni sledovat 2 čísla: kolik tě stojí získání 1 zákazníka a kolik ti průměrně utratí'
    ];
  } else {
    category = 'critical';
    categoryLabel = 'Kritický stav 🔴';
    categoryDescription = 'Tvůj model má vážné trhliny. Pokud to nevyřešíš TEĎ, může to skončit krachem.';
    categoryColor = 'text-red-600';
    risks = [
      '⚠️ 100% závislost na jednom kanálu/klientovi - když padne, padáš s ním',
      '⚠️ Nulové rezervy - jeden výpadek a jsi v existenčním problému',
      '⚠️ Neznáš svá čísla - nevíš jestli děláš zisk nebo ztrátu',
      '⚠️ Žádná systematizace - vše závisí jen na tobě'
    ];
    recommendations = [
      '🚨 Přestaň \"hasit požáry\" - udělej si pořádek v modelu podnikání (Business Model Canvas)',
      '🚨 Zjisti přesně svoje čísla: kolik tě stojí získání zákazníka, jaká je tvá marže',
      '🚨 Najdi si druhý zdroj příjmů OKAMŽITĚ - diverzifikace zachraňuje byznysy'
    ];
  }
  
  return { score, category, categoryLabel, categoryDescription, categoryColor, risks, recommendations, subScores };
}

interface BusinessHealthQuizProps {
  onComplete?: (result: QuizResult, email: string, name: string, answers: Record<string, number>) => void;
  open?: boolean; // ✅ NOVÝ - pro dialog control
  onOpenChange?: (open: boolean) => void; // ✅ NOVÝ - pro zavření dialogu
}

export function BusinessHealthQuiz({ onComplete, open = false, onOpenChange }: BusinessHealthQuizProps) {
  const [step, setStep] = useState<'intro' | 'type-selection' | 'quiz' | 'email' | 'result'>('intro');
  const [quizType, setQuizType] = useState<QuizType>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = quizType === 'beginner' ? beginnerQuestions : existingQuestions;
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  // ✅ NOVÝ - Load quiz state from localStorage on mount
  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem('quiz_answers');
      const savedQuizType = localStorage.getItem('quiz_type');
      const savedEmail = localStorage.getItem('quiz_email');
      const savedName = localStorage.getItem('quiz_name');
      const savedCurrentQuestion = localStorage.getItem('quiz_current_question');
      
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
      if (savedQuizType) {
        setQuizType(savedQuizType as QuizType);
      }
      if (savedEmail) {
        setEmail(savedEmail);
      }
      if (savedName) {
        setName(savedName);
      }
      if (savedCurrentQuestion && savedQuizType) {
        setCurrentQuestion(parseInt(savedCurrentQuestion, 10));
        // Pokud má uložené odpovědi, začni rovnou v kvízu
        if (savedAnswers && JSON.parse(savedAnswers) && Object.keys(JSON.parse(savedAnswers)).length > 0) {
          setStep('quiz');
        }
      }
    } catch (error) {
      console.error('❌ Error loading quiz from localStorage:', error);
    }
  }, []);
  
  // ✅ NOVÝ - Save answers to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('quiz_answers', JSON.stringify(answers));
    }
  }, [answers]);
  
  // ✅ NOVÝ - Save quizType to localStorage
  useEffect(() => {
    if (quizType) {
      localStorage.setItem('quiz_type', quizType);
    }
  }, [quizType]);
  
  // ✅ NOVÝ - Save email to localStorage
  useEffect(() => {
    if (email) {
      localStorage.setItem('quiz_email', email);
    }
  }, [email]);
  
  // ✅ NOVÝ - Save name to localStorage
  useEffect(() => {
    if (name) {
      localStorage.setItem('quiz_name', name);
    }
  }, [name]);
  
  // ✅ NOVÝ - Save currentQuestion to localStorage
  useEffect(() => {
    if (quizType) {
      localStorage.setItem('quiz_current_question', currentQuestion.toString());
    }
  }, [currentQuestion, quizType]);
  
  // ✅ NOVÝ - Reset state při zavření
  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
    // Reset state po zavření
    setTimeout(() => {
      setStep('intro');
      setQuizType(null);
      setCurrentQuestion(0);
      setAnswers({});
      setEmail('');
      setName('');
      setResult(null);
      setIsSubmitting(false);
    }, 300);
  };
  
  // ✅ NOVÝ - Pokud není open, nerender nic
  if (!open) return null;
  
  const handleAnswer = (questionId: string, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
    
    // Auto-pokračuj na další otázku
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Konec kvízu - přejdi na email
        setStep('email');
      }
    }, 300);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔍 DEBUG: handleEmailSubmit called');
    console.log('🔍 DEBUG: email =', email);
    console.log('🔍 DEBUG: name =', name);
    console.log('🔍 DEBUG: answers =', answers);
    console.log('🔍 DEBUG: quizType =', quizType);
    
    setIsSubmitting(true);
    
    try {
      const calculatedResult = calculateResult(answers, quizType);
      console.log('🔍 DEBUG: calculatedResult =', calculatedResult);
      setResult(calculatedResult);
      
      // 📊 Track quiz completion
      trackQuizCompleted(
        quizType || 'existing',
        calculatedResult.score,
        calculatedResult.category
      );
      
      // Zavolej callback pro uložení do DB a odeslání emailu
      if (onComplete) {
        console.log('🔍 DEBUG: Calling onComplete callback...');
        try {
          await onComplete(calculatedResult, email, name, answers);
          console.log('✅ DEBUG: onComplete finished successfully!');
        } catch (callbackError) {
          console.error('❌ ERROR in onComplete callback:', callbackError);
          toast.error(`Chyba při ukládání: ${callbackError.message || 'Neznámá chyba'}`, {
            duration: 8000,
          });
          setIsSubmitting(false);
          return; // ⚠️ STOP - nezavírej kvíz, ať user vidí error
        }
      } else {
        console.log('⚠️ DEBUG: No onComplete callback provided!');
      }
      
      setIsSubmitting(false);
      
      // ✅ Parent (QuizLandingPage) se postará o redirect na /kviz/hotovo
      // ✅ Ukládáme, že uživatel dokončil kvíz, pro změnu CTA
      localStorage.setItem('quiz_completed', 'true');
      
      // ⚠️ NEMĚŇ step na 'result' - parent dělá redirect na /kviz/hotovo!
      // Kdyby se změnil step, uživatel by viděl probliknutí result page před redirectem
    } catch (error) {
      console.error('❌ CRITICAL ERROR in handleEmailSubmit:', error);
      toast.error(`Kritická chyba: ${error.message || 'Neznámá chyba'}`, {
        duration: 10000,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-start justify-center overflow-y-auto"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 py-12 px-4"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur hover:bg-white transition-colors shadow-lg"
              aria-label="Zavřít"
            >
              <span className="text-2xl text-slate-600">×</span>
            </button>
            
            <div className="max-w-3xl mx-auto">
              
              {/* INTRO */}
              {step === 'intro' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-8"
                >
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl text-slate-900">
                      Jak zdravý je tvůj <span className="text-blue-600">model podnikání</span>?
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                      Zjisti za <strong>3 minuty</strong> kde ztrácíš peníze a jak to vyřešit
                    </p>
                  </div>
                  
                  <Card className="p-8 bg-white/80 backdrop-blur border-slate-200">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span className="text-slate-700">100% ZDARMA - žádné kreditky, ždné závazky</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span className="text-slate-700">Okamžité výsledky s konkrétními doporučeními</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span className="text-slate-700">Detailní PDF rozbor na email</span>
                      </div>
                    </div>
                  </Card>
                  
                  <Button 
                    size="lg" 
                    onClick={() => setStep('type-selection')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
                  >
                    Začít kvíz zdarma <ArrowRight className="ml-2" />
                  </Button>
                  
                  <p className="text-sm text-slate-500">
                    ⏱️ Zabere ti to jen 3 minuty
                  </p>
                </motion.div>
              )}

              {/* TYPE SELECTION */}
              {step === 'type-selection' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl text-slate-900">
                      Vyber, co tě popisuje nejvíc
                    </h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card 
                      className="p-8 cursor-pointer hover:border-blue-500 transition-all hover:shadow-lg bg-white/80 backdrop-blur"
                      onClick={() => {
                        setQuizType('beginner');
                        setStep('quiz');
                        // 📊 Track quiz start
                        trackQuizStarted('beginner');
                      }}
                    >
                      <div className="space-y-4">
                        <Sparkles className="w-12 h-12 text-blue-600" />
                        <h3 className="text-2xl text-slate-900">Teprve začínám</h3>
                        <p className="text-slate-600">
                          Plánuji rozjet byznys nebo jsem začal před nedávnem
                        </p>
                      </div>
                    </Card>
                    
                    <Card 
                      className="p-8 cursor-pointer hover:border-blue-500 transition-all hover:shadow-lg bg-white/80 backdrop-blur"
                      onClick={() => {
                        setQuizType('existing');
                        setStep('quiz');
                        // 📊 Track quiz start
                        trackQuizStarted('existing');
                      }}
                    >
                      <div className="space-y-4">
                        <TrendingUp className="w-12 h-12 text-green-600" />
                        <h3 className="text-2xl text-slate-900">Už podnikám</h3>
                        <p className="text-slate-600">
                          Mám živnost/s.r.o. a aktivně podnikám
                        </p>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              )}

              {/* QUIZ */}
              {step === 'quiz' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Otázka {currentQuestion + 1} z {questions.length}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  {/* Question */}
                  <Card className="p-8 bg-white/80 backdrop-blur">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl text-slate-900">
                          {questions[currentQuestion].question}
                        </h3>
                        
                        <div className="space-y-3">
                          {questions[currentQuestion].options?.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                              className={`w-full p-4 text-left rounded-lg border-2 transition-all hover:border-blue-500 hover:bg-blue-50 ${
                                answers[questions[currentQuestion].id] === option.value
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-slate-200 bg-white'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </Card>
                  
                  {/* Navigation */}
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (currentQuestion > 0) {
                          setCurrentQuestion(currentQuestion - 1);
                        } else {
                          setStep('type-selection');
                        }
                      }}
                    >
                      <ChevronLeft className="mr-2" /> Zpět
                    </Button>
                    
                    {currentQuestion === questions.length - 1 && answers[questions[currentQuestion].id] !== undefined && (
                      <Button
                        onClick={() => setStep('email')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Zobrazit výsledky <ChevronRight className="ml-2" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* EMAIL FORM */}
              {step === 'email' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <Card className="p-8 bg-white/80 backdrop-blur">
                    <form onSubmit={handleEmailSubmit} className="space-y-6">
                      <div className="text-center space-y-4">
                        <h2 className="text-3xl text-slate-900">
                          Skoro hotovo! 🎉
                        </h2>
                        <p className="text-slate-600">
                          Kam ti máme poslat detailní výsledky?
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-slate-700 mb-2">
                            Tvé jméno
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Jak ti máme říkat?"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm text-slate-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tvuj@email.cz"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                          />
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? 'Zpracovávám...' : 'Zobrazit výsledky'} <ArrowRight className="w-5 h-5" />
                      </button>
                      
                      <p className="text-xs text-center text-slate-500">
                        Pošleme ti detailní rozbor + konkrétní doporučení. Žádný spam.
                      </p>
                    </form>
                  </Card>
                </motion.div>
              )}

              {/* RESULTS */}
              {step === 'result' && result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Score */}
                  <Card className="p-8 bg-white/80 backdrop-blur text-center">
                    <div className="space-y-4">
                      <div className={`text-6xl ${result.categoryColor}`}>
                        {result.score}%
                      </div>
                      <h2 className={`text-3xl ${result.categoryColor}`}>
                        {result.categoryLabel}
                      </h2>
                      <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        {result.categoryDescription}
                      </p>
                    </div>
                  </Card>
                  
                  {/* Risks */}
                  <Card className="p-8 bg-white/80 backdrop-blur">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                        <h3 className="text-2xl text-slate-900">
                          Tvá největší rizika:
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {result.risks.map((risk, i) => (
                          <li key={i} className="flex gap-3 text-slate-700">
                            <span className="text-red-600 flex-shrink-0">•</span>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                  
                  {/* Recommendations */}
                  <Card className="p-8 bg-white/80 backdrop-blur">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <h3 className="text-2xl text-slate-900">
                          Co s tím:
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {result.recommendations.map((rec, i) => (
                          <li key={i} className="flex gap-3 text-slate-700">
                            <span className="text-green-600 flex-shrink-0">✓</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                  
                  {/* CTA */}
                  <Card className="p-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                    <div className="text-center space-y-6">
                      <h3 className="text-3xl">
                        {result.category === 'critical' || result.category === 'unstable'
                          ? 'Vyřeš to TEĎ - než bude pozdě'
                          : 'Posuň svůj byznys na další level'}
                      </h3>
                      <p className="text-lg opacity-90 max-w-2xl mx-auto">
                        Podnikatelská Čtvrtka ti ukáže krok za krokem, jak si udělat pořádek v modelu podnikání a najít skryté příležitosti.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          size="lg"
                          onClick={() => window.location.hash = 'objednavka'}
                          className="bg-white text-blue-600 hover:bg-slate-100"
                        >
                          Koupit Podnikatelskou Čtvrtku (4999 Kč)
                        </Button>
                        {(result.category === 'critical' || result.category === 'unstable') && (
                          <Button
                            size="lg"
                            variant="outline"
                            onClick={() => window.location.href = '/konzultace'}
                            className="border-white text-white hover:bg-white/10"
                          >
                            Nebo si zabuokuj konzultaci
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                  
                  <div className="text-center">
                    <p className="text-slate-600">
                      ✅ Detailní výsledky jsme ti poslali na <strong>{email}</strong>
                    </p>
                  </div>
                </motion.div>
              )}
              
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
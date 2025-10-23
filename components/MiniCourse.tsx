import { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, Copy, Check, MessageCircle, TrendingUp, Sparkles, Download, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Lesson {
  day: number;
  title: string;
  subtitle: string;
  icon: any;
  problem: string;
  solution: string;
  why: string;
  action: {
    title: string;
    steps: {
      step: number;
      title: string;
      description: string;
      template?: string;
      templateType?: 'copy' | 'inspiration' | 'checklist';
      input?: string;
      placeholder?: string;
      defaultValue?: string;
    }[];
  };
  bonus?: {
    title: string;
    items: string[];
  };
}

const lessons: Lesson[] = [
  {
    day: 1,
    title: "Získejte zpětnou vazbu za 24h",
    subtitle: "3 zlaté otázky + hotové nástroje",
    icon: MessageCircle,
    problem: "Nemáte zpětnou vazbu od zákazníků → nevíte co zlepšit, co dělá konkurence líp.",
    solution: "Zeptejte se na 3 zlaté otázky které vám řeknou VŠECHNO. Použijte hotové šablony - email (5 min) nebo offline dotazník (10 min).",
    why: "Firmy bez zpětné vazby krachují protože nevědí co zákazníci SKUTEČNĚ chtějí. 3 správné otázky vám ukážou vaši největší sílu a kde ztracíte zákazníky.",
    action: {
      title: "AKCE: Získejte zpětnou vazbu dnes",
      steps: [
        {
          step: 0,
          title: "3 zlaté otázky zpětné vazby",
          description: "Tyto 3 otázky vám řeknou všechno co potřebujete vědět.",
          templateType: 'inspiration',
          template: `🎯 3 ZLATÉ OTÁZKY:

---

1️⃣ CO BYLO ROZHODUJÍCÍ?
"Co vás přivedlo k nám? Co bylo rozhodující?"

→ Zjistíte PROČ si vás zákazníci vybrali
→ Vaše největší konkurenční výhoda


2️⃣ CO VÁS NEJVÍC BAVÍ?
"Co vám u nás nejvíc pomáhá?"

→ Vaše největší SÍLA
→ Co funguje a měli byste zdůraznit


3️⃣ CO BYCHOM MOHLI ZLEPŠIT?
"Co bychom mohli zlepšit?"

→ Kde ZTRACÍTE zákazníky
→ Co vás brzdí v růstu

---

💡 PROČ TO FUNGUJE:

Tyto 3 otázky pokrývají celou cestu zákazníka:
• Před nákupem (proč si vás vybrali)
• Během používání (co oceňují)
• Po zkušenosti (co chybí)

---

✅ POUŽIJTE TYTO OTÁZKY:

V emailu níže jsou již připravené.
V offline dotazníku také.

Stačí poslat/vytisknout a čekat na odpovědi!`
        },
        {
          step: 1,
          title: "Email šablona - zkopírujte a pošlete",
          description: "Pošlete 5-10 zákazníkům. Odpovědí: 40-60%. Trvá to 5 minut.",
          templateType: 'copy',
          template: `Předmět: Rychlá otázka - vaše zkušenost s námi

Ahoj [JMÉNO],

Díky moc, že jste náš zákazník! Velmi si toho vážím.

Můžu vás poprosit o malou pomoc? 

Zajímalo by mě:
• Co vás přivedlo k nám? (co bylo rozhodující?)
• Co vám u nás nejvíc pomáhá?
• Co bychom mohli zlepšit?
• Doporučili byste nás dál? Proč ano/ne?

Stačí krátká odpověď - i 2 věty pomohou!

Za vaši zpětnou vazbu dostanete [DOPLŇTE ODMĚNU].

Děkuji!
[VAŠE JMÉNO]`
        },
        {
          step: 2,
          title: "Akční plán - sběr zpětné vazby",
          description: "Vyplňte váš konkrétní plán. Offline dotazník si stáhněte tlačítkem níže.",
          templateType: 'copy',
          template: `POMŮŽETE NÁM BÝT LEPŠÍ?

Vyplňte prosím 4 krátké otázky (2 minuty)

---

1. Co vás k nám dnes přivedlo?
   □ Doporučení    □ Prošel/a jsem kolem    
   □ Jiné: _________________________

2. Co oceňujete u nás nejvíc?
   _________________________________
   _________________________________

3. Co bychom mohli zlepšit?
   _________________________________
   _________________________________

4. Doporučili byste nás dál?
   □ Ano, určitě    □ Možná    □ Ne

---

DĚKUJEME!`,
          input: "plan-zpetna-vazba",
          placeholder: "",
          defaultValue: "📧 EMAIL:\n• Komu pošlu: \n• Kdy: \n• Motivace: \n\n📄 OFFLINE:\n• Komu/Kde: \n• Kdy: \n• Motivace: "
        }
      ]
    },
    bonus: {
      title: "TIPY PRO ZPĚTNOU VAZBU",
      items: [
        "Pošlete email osobně, ne hromadně. Osobní email = 3× víc odpovědí.",
        "Offline dotazník dejte na přehledné místo - na stoly, k produktům, viditelně u pokladny.",
        "Zaměřte se na spokojené zákazníky (ti dají nejlepší odpovědi).",
        "Odpovědi přečtěte za 2-3 dny a hledejte opakující se věci. Co zmiňuje 3+ lidí = důležité."
      ]
    }
  },
  {
    day: 2,
    title: "Využijte konkurenci ke svému prospěchu",
    subtitle: "Rychlý rozbor - co dělají dobře/špatně",
    icon: TrendingUp,
    problem: "Nevíte co dělá konkurence → kopírujete jejich chyby nebo je ignorujete (oboje špatně).",
    solution: "Rychlý rozbor 2-3 konkurentů (co dělají dobře/špatně) → najdete příležitosti kde je můžete předběhnout.",
    why: "90% podnikatelů ignoruje konkurenci nebo je slepě kopíruje. Vy ji VYUŽIJETE - najdete mezery na trhu a víte přesně jak se odlišit.",
    action: {
      title: "AKCE: Rozbor konkurence za 20 minut",
      steps: [
        {
          step: 1,
          title: "Krok 1: Vyberte 2-3 přímé konkurenty (3 min)",
          description: "Kdo cílí na stejné zákazníky jako vy? Napište je pod sebe.",
          input: "konkurenti",
          placeholder: "",
          defaultValue: "1. \n2. \n3. "
        },
        {
          step: 2,
          title: "Krok 2: Co dělají DOBŘE? (7 min)",
          description: "Prohlédněte si jejich web, sociální sítě, recenze. Co vás zaujalo pozitivně? (Pokud něco nemají, napište 'Nic' nebo přeskočte)",
          templateType: 'checklist',
          template: `Inspirace - co sledovat:

✅ PRODUKT/SLUŽBA:
• Mají něco unikátního?
• Jaké varianty nabízí?
• Kvalita?

✅ CENA:
• Dražší/levnější než vy?
• Nabízí balíčky, slevy?

✅ KOMUNIKACE:
• Jak mluví se zákazníky?
• Co slibují?
• Reagují rychle?

✅ BONUS (pokud mají):
• Dávají dárky, vzorky?
• Věrnostní program?
• (Pokud nemají, napište "Nic")

✅ RECENZE:
• Co chválí zákazníci?
• Kolik hvězdiček?`,
          input: "konkurence-dobre",
          placeholder: "",
          defaultValue: ""
        },
        {
          step: 3,
          title: "Krok 3: Co dělají ŠPATNĚ? (7 min)",
          description: "Hledejte slabiny - špatné recenze, pomalá komunikace, zastaralý web... (Co zákazníci kritizují?)",
          templateType: 'checklist',
          template: `Hledejte mezery (příležitosti pro vás):

❌ PRODUKT/SLUŽBA:
• Chybí jim něco?
• Omezené možnosti?
• Kvalita?

❌ CENA:
• Moc drahé?
• Nejasné ceny?
• Skryté poplatky?

❌ KOMUNIKACE:
• Nereagují na zprávy?
• Nejasný web?
• Složitá objednávka?

❌ CO NENABÍZÍ:
• Žádná záruka?
• Žádné bonusy?
• Pomalé dodání?

❌ RECENZE:
• Co kritizují zákazníci?
• Opakující se stížnosti?`,
          input: "konkurence-spatne",
          placeholder: "",
          defaultValue: ""
        },
        {
          step: 4,
          title: "Krok 4: Vaše příležitosti (3 min)",
          description: "Využijte slabiny konkurence! Kde je můžete předběhnout?",
          input: "prilezitosti",
          placeholder: "",
          defaultValue: "✅ V ČEM MŮŽEME BÝT LEPŠÍ:\n\n\n\n✅ CO NAVÍC MŮŽEME NABÍDNOUT:\n\n\n\n✅ KDE A JAK TO ŘÍCT ZÁKAZNÍKŮM:\n\n"
        }
      ]
    },
    bonus: {
      title: "TIPY PRO ROZBOR KONKURENCE",
      items: [
        "Sledujte recenze na Google, Facebooku - tam najdete pravdu co zákazníci OPRAVDU řeší.",
        "Objednejte si u konkurence jejich produkt/službu (mystery shopping). Zažijete zákaznickou cestu na vlastní kůži - od prvního kontaktu až po dodání.",
        "Nekopírujte konkurenci slepě. Hledejte co DĚLAJÍ ŠPATNĚ a tam je předběhněte.",
        "Opakující se stížnosti = váš zlatý důl. Např. 'neodpovídají na zprávy' - vy odpovídáte do 2 hodin."
      ]
    }
  },
  {
    day: 3,
    title: "Napište nabídku která prodává",
    subtitle: "Jasná komunikace + 5 marketingových triků",
    icon: Sparkles,
    problem: "Zákazníci nevědí CO nabízíte a PROČ si vybrat právě vás → prodeje stagnují.",
    solution: "Jasná šablona na nabídku + 5 komunikačních triků které fungují. 15 minut práce = okamžitě lepší komunikace.",
    why: "90% podnikatelů mluví obecně ('kvalita, zkušenost'). Vy budete konkrétní = vynikáte a prodáváte víc.",
    action: {
      title: "AKCE: Jasná nabídka + komunikační triky",
      steps: [
        {
          step: 1,
          title: "Krok 1: Napište jasnou nabídku (7 min)",
          description: "Použijte šablonu + 10 příkladů níže jako inspiraci.",
          templateType: 'inspiration',
          template: `ŠABLONA:

"Pomáhám [KOMU] [DĚLAT CO] bez [PROBLÉM]"

---

10 PŘÍKLADŮ:

1. Fitness: "Pomáhám zaneprázdněným manažerům zhubnout 10 kg bez hladovění"
2. Účetní: "Pomáhám živnostníkům zvládnout daně bez stresu a pokut"
3. Kavárna: "Pomáháme milovníkům kávy začít den skvěle bez čekání"
4. Web: "Pomáhám podnikatelům získat zákazníky z webu bez technických znalostí"
5. Kosmetička: "Pomáhám ženám 40+ vypadat mladší bez botoxu"
6. Autoservis: "Pomáháme řidičům udržet auto v kondici bez překvapení"
7. Realitka: "Pomáháme rodinám najít vysněný byt bez měsíců hledání"
8. Copy: "Pomáhám firmám prodávat víc bez snižování cen"
9. Fotograf: "Pomáhám rodinám zachytit vzpomínky bez nepřirozených póz"
10. Angličtina: "Pomáháme profesionálům mluvit anglicky bez ostychu"`,
          input: "nabidka",
          placeholder: "",
          defaultValue: "Moje nabídka:\n"
        },
        {
          step: 2,
          title: "Krok 2: 5 komunikačních triků (5 min)",
          description: "Vyberte alespoň 3 triky z těch nahoře a napište jak je použijete.",
          templateType: 'checklist',
          template: `5 TRIKŮ KTERÉ PRODÁVAJÍ:

---

1. MLUVTE K JEDNOMU

❌ "Pomáháme firmám..."
✅ "Pomáhám vám..."

---

2. KONKRÉTNÍ ČÍSLA

❌ "Rychlé dodání"
✅ "Dodání za 2 dny"

---

3. VÝSLEDEK > PROCES

❌ "30 lekcí angličtiny"
✅ "Mluvte anglicky za 3 měsíce"

---

4. ODSTRAŇTE RIZIKO

✅ "První úklid zdarma"
✅ "14 dní vrácení peněz"

---

5. DŮVOD KOUPIT TEĎKA

❌ "Sleva!"
✅ "Sleva 20% jen do neděle"`,
          input: "komunikacni-triky",
          placeholder: "",
          defaultValue: "✅ TRIK #...\n• Co změním: \n• Kde to použiju: \n\n✅ TRIK #...\n• Co změním: \n• Kde to použiju: "
        },
        {
          step: 3,
          title: "Krok 3: Akční plán (3 min)",
          description: "Co konkrétně změníte dnes? Kde to použijete?",
          input: "akcni-plan",
          placeholder: "",
          defaultValue: "✅ CO ZMĚNÍM DNES:\n\n\n\n✅ KDE TO POUŽIJU:\n- Web\n- Facebook/Instagram\n- Letáky\n- Email\n- Faktury\n(Smažte co nepoužijete)"
        }
      ]
    },
    bonus: {
      title: "TIPY PRO LEPŠÍ KOMUNIKACI",
      items: [
        "Testujte! Pošlete novou nabídku cílovému zákazníkovi - rozumí jí hned?",
        "Čtěte nahlas - zní to přirozeně nebo jako robot?",
        "Inspirujte se konkurencí (z Dne 2) - co dělají dobře v komunikaci?",
        "Méně = víc. Kratší věty = silnější dopad."
      ]
    }
  }
];

export function MiniCourse() {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null); // null = checking, true = allowed, false = denied

  const currentLesson = lessons.find(l => l.day === currentDay) || lessons[0];
  const totalDays = 3;
  const progress = Math.round((completedDays.size / totalDays) * 100);

  // 🔐 ACCESS CONTROL - Zkontroluj token při načtení
  useEffect(() => {
    // Načti token z URL - může být buď /#minikurz?token=abc nebo ?token=abc
    const hash = window.location.hash; // např. "#minikurz?token=abc123"
    const hashParams = hash.includes('?') ? hash.split('?')[1] : '';
    const hashUrlParams = new URLSearchParams(hashParams);
    const hashToken = hashUrlParams.get('token');
    const hashReset = hashUrlParams.get('reset');
    
    // Fallback na klasický query string (pro podporu obou variant)
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = hashToken || urlParams.get('token');
    const resetParam = hashReset || urlParams.get('reset');
    
    // 🔄 RESET FUNKCIONALITA (pro testování) - ?reset=true
    if (resetParam === 'true') {
      localStorage.removeItem('pvs_minicourse_progress');
      localStorage.removeItem('pvs_minicourse_started');
      // Nechej token aby zůstal přístup
      // localStorage.removeItem('pvs_minicourse_token'); 
      
      // Refresh stránky bez ?reset parametru
      const newUrl = window.location.pathname + '?token=' + (urlToken || localStorage.getItem('pvs_minicourse_token') || 'minicourse2025');
      window.location.href = newUrl;
      return;
    }
    
    // Načti uložený token z localStorage
    const savedToken = localStorage.getItem('pvs_minicourse_token');
    
    // Pokud je token v URL, ulož ho
    if (urlToken) {
      localStorage.setItem('pvs_minicourse_token', urlToken);
      setHasAccess(true);
      
      // Odstranění tokenu z URL (aby nebyl viditelný)
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, '', newUrl);
    } 
    // Pokud není v URL ale je uložený
    else if (savedToken) {
      setHasAccess(true);
    } 
    // Žádný token = přístup odepřen
    else {
      setHasAccess(false);
    }
  }, []);

  // Load from localStorage + set default values
  useEffect(() => {
    const saved = localStorage.getItem('pvs_minicourse_progress');
    if (saved) {
      try {
        const { completed, data, onboardingDone } = JSON.parse(saved);
        setCompletedDays(new Set(completed));
        setFormData(data);
        setShowOnboarding(!onboardingDone);
      } catch (err) {
        console.error('Error loading progress:', err);
      }
    } else {
      setShowOnboarding(true);
    }
    
    // Set default values for fields that have them
    const defaults: Record<string, string> = {};
    lessons.forEach(lesson => {
      lesson.action.steps.forEach(step => {
        if (step.input && step.defaultValue) {
          const key = `day${lesson.day}-${step.input}`;
          if (!formData[key]) {
            defaults[key] = step.defaultValue;
          }
        }
      });
    });
    
    if (Object.keys(defaults).length > 0) {
      setFormData(prev => ({ ...prev, ...defaults }));
    }
  }, []);

  // Save to localStorage with auto-save indicator + tracking
  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      const data = {
        completed: Array.from(completedDays),
        data: formData,
        onboardingDone: !showOnboarding,
        // 📊 TRACKING DATA
        currentDay: currentDay,
        lastActivity: new Date().toISOString(),
        startedAt: localStorage.getItem('pvs_minicourse_started') || new Date().toISOString()
      };
      
      // Ulož kdy začal kurz (jen jednou)
      if (!localStorage.getItem('pvs_minicourse_started')) {
        localStorage.setItem('pvs_minicourse_started', new Date().toISOString());
      }
      
      localStorage.setItem('pvs_minicourse_progress', JSON.stringify(data));
      setIsSaving(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [completedDays, formData, showOnboarding, currentDay]);
  

  const updateFormData = (key: string, value: string) => {
    // Ochrana struktury - zabraňuje smazání důležitých nadpisů a struktury
    
    // Day 1 - Plan zpětné vazby
    if (key === 'day1-plan-zpetna-vazba') {
      const requiredParts = ['📧 EMAIL:', '📄 OFFLINE:'];
      const missingParts = requiredParts.filter(part => !value.includes(part));
      if (missingParts.length > 0) {
        // Pokusí se smazat strukturu - zabraň tomu
        return;
      }
    }
    
    // Day 2 - Konkurenti
    if (key === 'day2-konkurenti') {
      const requiredStructure = /1\.\s*[\s\S]*2\.\s*[\s\S]*3\.\s*/;
      if (!requiredStructure.test(value)) {
        // Pokusí se smazat čísla - zabraň tomu
        return;
      }
    }
    
    // Day 2 - Konkurence dobré stránky
    if (key === 'day2-konkurence-dobre') {
      // Pokud má nějaký obsah (není prázdné), kontroluj strukturu
      if (value.trim().length > 0) {
        // Kontroluj strukturu - všech 5 aspektů musí být přítomno
        const requiredAspects = ['Produkt:', 'Cena:', 'Komunikace:', 'Bonus:', 'Recenze:'];
        const missingAspects = requiredAspects.filter(aspect => !value.includes(aspect));
        if (missingAspects.length > 0) {
          return; // Pokusí se smazat strukturu
        }
        // Kontroluj minimálně 10 checkmarků (2 konkurenti × 5 aspektů)
        const matches = value.match(/✅/g);
        if (!matches || matches.length < 10) {
          return;
        }
      }
    }
    
    // Day 2 - Konkurence špatné stránky
    if (key === 'day2-konkurence-spatne') {
      // Pokud má nějaký obsah (není prázdné), kontroluj strukturu
      if (value.trim().length > 0) {
        // Kontroluj strukturu - všech 5 aspektů musí být přítomno
        const requiredAspects = ['Produkt:', 'Cena:', 'Komunikace:', 'Bonus:', 'Recenze:'];
        const missingAspects = requiredAspects.filter(aspect => !value.includes(aspect));
        if (missingAspects.length > 0) {
          return; // Pokusí se smazat strukturu
        }
        // Kontroluj minimálně 10 křížků (2 konkurenti × 5 aspektů)
        const matches = value.match(/❌/g);
        if (!matches || matches.length < 10) {
          return;
        }
      }
    }
    
    // Day 2 - Příležitosti
    if (key === 'day2-prilezitosti') {
      const requiredHeaders = value.includes('V ČEM MŮŽEME BÝT LEPŠÍ:') && 
                              value.includes('CO NAVÍC MŮŽEME NABÍDNOUT:') && 
                              value.includes('KDE A JAK TO ŘÍCT ZÁKAZNÍKŮM:');
      if (!requiredHeaders) {
        // Pokusí se smazat nadpisy - zabraň tomu
        return;
      }
    }
    
    // Day 3 - Nabídka
    if (key === 'day3-nabidka') {
      if (!value.includes('Moje nabídka:')) {
        // Pokusí se smazat nadpis - zabraň tomu
        return;
      }
    }
    
    // Day 3 - Komunikační triky
    if (key === 'day3-komunikacni-triky') {
      // Kontrola že obsahuje minimálně 2 výskyty "✅ TRIK #"
      const matches = value.match(/✅ TRIK #/g);
      if (!matches || matches.length < 2) {
        // Pokusí se smazat strukturu - zabraň tomu
        return;
      }
    }
    
    // Day 3 - Akční plán
    if (key === 'day3-akcni-plan') {
      const requiredParts = ['✅ CO ZMĚNÍM DNES:', '✅ KDE TO POUŽIJU:'];
      const missingParts = requiredParts.filter(part => !value.includes(part));
      if (missingParts.length > 0) {
        // Pokusí se smazat strukturu - zabraň tomu
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, [key]: value }));
    
    // Auto-fill Step 2 and 3 when konkurenti changes
    if (key === 'day2-konkurenti' && value.trim()) {
      setTimeout(() => {
        autoFillKonkurenti(value);
      }, 100);
    }
  };
  
  const autoFillKonkurenti = (konkurentiText: string) => {
    const lines = konkurentiText.split('\n');
    const konkurenti: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/^(\d+)\.\s*(.+)$/);
      if (match) {
        const num = parseInt(match[1]);
        if (num >= 1 && num <= 3) {
          const name = match[2].trim();
          if (name && name.length > 0) {
            konkurenti.push(name);
          }
        }
      }
    }
    
    if (konkurenti.length > 0) {
      // Vždy přepiš Step 2 a 3 s novými konkurenty
      const dobreContent = konkurenti.map(name => 
        `${name.toUpperCase()}:\n✅ Produkt: \n✅ Cena: \n✅ Komunikace: \n✅ Bonus: \n✅ Recenze: `
      ).join('\n\n');
      
      const spatneContent = konkurenti.map(name => 
        `${name.toUpperCase()}:\n❌ Produkt: \n❌ Cena: \n❌ Komunikace: \n❌ Bonus: \n❌ Recenze: `
      ).join('\n\n');
      
      setFormData(prev => ({
        ...prev,
        'day2-konkurence-dobre': dobreContent,
        'day2-konkurence-spatne': spatneContent
      }));
    }
  };

  const copyTemplate = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTemplate(id);
      toast.success('Šablona zkopírována!', {
        description: 'Text byl zkopírován do schránky'
      });
      setTimeout(() => setCopiedTemplate(null), 2000);
    } catch (err) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        setCopiedTemplate(id);
        toast.success('Šablona zkopírována!', {
          description: 'Text byl zkopírován do schránky'
        });
        setTimeout(() => setCopiedTemplate(null), 2000);
      } catch (fallbackErr) {
        toast.error('Chyba!', {
          description: 'Nepodařilo se zkopírovat text'
        });
      }
    }
  };

  const downloadDayData = (dayNumber?: number) => {
    const targetDay = dayNumber || currentDay;
    const lesson = lessons.find(l => l.day === targetDay);
    if (!lesson) return;
    
    let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Akční plán - Den ${targetDay}</title>
  <style>
    @page { 
      size: A4; 
      margin: 10mm;
    }
    body { 
      font-family: 'Segoe UI', Arial, sans-serif; 
      margin: 0;
      padding: 0; 
      line-height: 1.4;
      color: #1F2937;
      font-size: 9pt;
    }
    h1 { 
      color: #4F46E5; 
      border-bottom: 2px solid #4F46E5; 
      padding-bottom: 6px;
      margin: 0 0 12px 0;
      font-size: 16pt;
      page-break-after: avoid;
    }
    h2 { 
      color: #6366F1; 
      margin: 0 0 10px 0;
      font-size: 13pt;
      page-break-after: avoid;
      border-left: 3px solid #6366F1;
      padding-left: 8px;
    }
    h3 { 
      color: #4F46E5;
      margin: 12px 0 6px 0;
      font-size: 10pt;
      font-weight: 600;
      page-break-after: avoid;
    }
    .content { 
      background: #F9FAFB; 
      padding: 8px;
      border-radius: 3px; 
      margin: 6px 0 12px 0;
      white-space: pre-wrap;
      border-left: 2px solid #4F46E5;
      page-break-inside: avoid;
      font-size: 8.5pt;
      line-height: 1.5;
    }
    .section {
      page-break-inside: avoid;
      margin-bottom: 12px;
    }
    @media print { 
      h1 { font-size: 15pt; margin-bottom: 10px; }
      h2 { font-size: 12pt; margin-bottom: 8px; }
      h3 { font-size: 9.5pt; margin: 10px 0 5px 0; }
      .content { 
        padding: 6px;
        margin: 5px 0 10px 0;
        font-size: 8pt;
      }
    }
  </style>
</head>
<body>
  <h1>🎯 ZÍSKEJTE VÍC ZÁKAZNÍKŮ - AKČNÍ PLÁN</h1>
  <h2>DEN ${targetDay}: ${lesson.title}</h2>
`;
    
    lesson.action.steps.forEach(step => {
      // Zobraz v PDF jen stepy které mají input field (= jsou k vyplnění)
      if (!step.input) return;
      
      const fieldKey = `day${targetDay}-${step.input}`;
      const value = formData[fieldKey] || '';
      
      html += `  <div class="section">\n`;
      html += `    <h3>${step.title}</h3>\n`;
      if (value.trim()) {
        html += `    <div class="content">${value.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>\n`;
      } else {
        html += `    <div class="content empty">(Nevyplněno)</div>\n`;
      }
      html += `  </div>\n`;
    });
    
    html += `</body></html>`;
    
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AkcniPlan_Den${targetDay}_${new Date().toISOString().slice(0,10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Staženo!', {
      description: `Den ${targetDay} - otevřete v prohlížeči a vytiskněte (Ctrl+P)`
    });
  };

  const downloadAllData = () => {
    // Helper funkce - odstraní texty jako "(Smažte co nepoužijete)" a podobné
    const cleanText = (text: string) => {
      // Odstraň řádky obsahující "Smažte"
      return text
        .split('\n')
        .filter(line => !line.includes('Smažte') && !line.includes('smažte'))
        .join('\n')
        .trim();
    };
    
    // Extrahuj všechny klíčové výstupy a očisti je
    const day1Plan = cleanText(formData['day1-plan-zpetna-vazba'] || '');
    const day1Answers = formData['day1-odpovedi'] || '';
    const day2Konkurenti = formData['day2-konkurenti'] || '';
    const day2KonkurenceDobre = formData['day2-konkurence-dobre'] || '';
    const day2KonkurenceSpatne = formData['day2-konkurence-spatne'] || '';
    const day2Prilezitosti = cleanText(formData['day2-prilezitosti'] || '');
    const day3Nabidka = formData['day3-nabidka'] || '';
    const day3Triky = cleanText(formData['day3-komunikacni-triky'] || '');
    const day3AkcniPlan = cleanText(formData['day3-akcni-plan'] || '');
    
    // Kompaktní stručný PDF - dvousloupcový layout
    let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Akční plán</title>
  <style>
    @page { 
      size: A4; 
      margin: 8mm;
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body { 
      font-family: 'Segoe UI', Arial, sans-serif; 
      line-height: 1.3;
      color: #1F2937;
      font-size: 8pt;
    }
    .header { 
      text-align: center;
      margin-bottom: 8px;
      padding-bottom: 6px;
      border-bottom: 2px solid #4F46E5;
    }
    h1 { 
      color: #4F46E5; 
      font-size: 14pt;
      margin-bottom: 2px;
    }
    .date {
      color: #6B7280;
      font-size: 7pt;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 8px;
    }
    .box {
      background: #F9FAFB;
      padding: 8px;
      border-radius: 3px;
      border-left: 2px solid #4F46E5;
      page-break-inside: avoid;
    }
    .box.full {
      grid-column: 1 / -1;
    }
    .sub-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      margin-top: 6px;
    }
    .sub-box {
      background: white;
      padding: 6px;
      border-radius: 2px;
      border: 1px solid #E5E7EB;
    }
    h2 { 
      color: #4F46E5;
      font-size: 10pt;
      margin-bottom: 4px;
      font-weight: 600;
    }
    .content { 
      white-space: pre-wrap;
      font-size: 7.5pt;
      line-height: 1.3;
      color: #374151;
    }
    .label {
      font-weight: 600;
      color: #4F46E5;
      font-size: 8pt;
      margin-bottom: 3px;
    }
    @media print {
      @page { margin: 6mm; }
      body { font-size: 7.5pt; line-height: 1.25; }
      h1 { font-size: 13pt; margin-bottom: 1px; }
      h2 { font-size: 9pt; margin-bottom: 3px; }
      .header { margin-bottom: 6px; padding-bottom: 4px; }
      .grid { gap: 6px; margin-top: 6px; }
      .box { padding: 6px; }
      .sub-grid { gap: 5px; margin-top: 5px; }
      .sub-box { padding: 5px; }
      .content { font-size: 7pt; line-height: 1.2; }
      .label { font-size: 7.5pt; margin-bottom: 2px; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎯 VÁŠ AKČNÍ PLÁN</h1>
    <div class="date">${new Date().toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
  </div>
  
  <div class="grid">`;
    
    // ŘÁDEK 1: Den 1 vlevo, Den 3 vpravo (vedle sebe na 1. řádku)
    
    // Den 1: Plán zpětné vazby (levý sloupec)
    if (day1Plan.trim()) {
      html += `
    <div class="box">
      <h2>📧 Plán: Zpětná vazba</h2>
      <div class="label">Komu a kdy pošlu:</div>
      <div class="content">${day1Plan.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    </div>`;
    }
    
    // Den 3: Finální nabídka (pravý sloupec - HNED vedle Dne 1)
    if (day3Nabidka.trim()) {
      html += `
    <div class="box">
      <h2>🎁 Moje nabídka</h2>
      <div class="label">Co říkám zákazníkům:</div>
      <div class="content">${day3Nabidka.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`;
      
      // Přidej triky pokud jsou
      if (day3Triky.trim()) {
        html += `
      <div class="label" style="margin-top: 10px;">💡 Komunikační triky:</div>
      <div class="content">${day3Triky.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`;
      }
      
      // Přidej akční plán pokud je
      if (day3AkcniPlan.trim()) {
        html += `
      <div class="label" style="margin-top: 10px;">📅 Akční plán:</div>
      <div class="content">${day3AkcniPlan.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`;
      }
      
      html += `
    </div>`;
    }
    
    // ŘÁDEK 2: Den 1 odpovědi full width (pokud má)
    if (day1Answers.trim()) {
      html += `
    <div class="box full">
      <h2>💬 Odpovědi zákazníků</h2>
      <div class="label">Co mi řekli:</div>
      <div class="content">${day1Answers.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    </div>`;
    }
    
    // ŘÁDEK 3: Den 2 konkurence (full width nebo normální box)
    if (day2Konkurenti.trim()) {
      const konkurenti = day2Konkurenti
        .split('\n')
        .filter(l => l.match(/^\d+\./))
        .map(l => l.replace(/^\d+\.\s*/, '• '))
        .join('\n');
      
      html += `
    <div class="box">
      <h2>🔍 Konkurence</h2>
      <div class="label">Koho sleduji:</div>
      <div class="content">${konkurenti.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`;
      
      // Sub-grid pro dobře/špatně vedle sebe
      const hasDobre = day2KonkurenceDobre.trim();
      const hasSpatne = day2KonkurenceSpatne.trim();
      
      if (hasDobre || hasSpatne) {
        html += `
      <div class="sub-grid">`;
        
        if (hasDobre) {
          html += `
        <div class="sub-box">
          <div class="label">✅ V čem jsou dobří:</div>
          <div class="content">${day2KonkurenceDobre.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
        </div>`;
        }
        
        if (hasSpatne) {
          html += `
        <div class="sub-box">
          <div class="label">❌ V čem jsou slabí:</div>
          <div class="content">${day2KonkurenceSpatne.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
        </div>`;
        }
        
        html += `
      </div>`;
      }
      
      // Přidej příležitosti hned pod analýzu
      if (day2Prilezitosti.trim()) {
        html += `
      <div class="label" style="margin-top: 10px;">💡 Kde je můžu předběhnout:</div>
      <div class="content">${day2Prilezitosti.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`;
      }
      
      html += `
    </div>`;
    }
    
    html += `
  </div>
</body>
</html>`;
    
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AkcniPlan_${new Date().toISOString().slice(0,10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Akční plán stažen! 📄', {
      description: 'Otevři v prohlížeči → Ctrl+P → Uložit jako PDF'
    });
  };

  const completeDay = () => {
    // Validace - zkontroluj jestli jsou vyplněné důležité fieldy
    const requiredFields = currentLesson.action.steps
      .filter(step => step.input)
      .map(step => `day${currentLesson.day}-${step.input}`);
    
    const emptyFields = requiredFields.filter(field => {
      const value = formData[field] || '';
      const defaultValue = currentLesson.action.steps.find(s => `day${currentLesson.day}-${s.input}` === field)?.defaultValue || '';
      
      // Pokud je hodnota prázdná nebo stejná jako default (= nevyplněno)
      return !value.trim() || value.trim() === defaultValue.trim();
    });
    
    if (emptyFields.length > 0) {
      setValidationError('Vyplňte prosím všechny kroky před dokončením dne!');
      toast.error('Ještě ne!', {
        description: 'Vyplňte prosím všechny kroky před dokončením dne'
      });
      setTimeout(() => setValidationError(null), 3000);
      return;
    }
    
    // Pokud je tento den už hotový, nedělej nic
    if (completedDays.has(currentDay)) {
      toast.info('Tento den už máte hotový!', {
        description: 'Pokračujte na další den'
      });
      if (currentDay < 3) {
        setCurrentDay(currentDay + 1);
      }
      return;
    }
    
    setIsAnimating(true);
    
    // Spočítej progress PŘED setState
    const totalDays = 3;
    const newCompletedCount = completedDays.size + 1;
    const progressPercent = Math.round((newCompletedCount / totalDays) * 100);
    const isComplete = newCompletedCount >= totalDays;
    
    setTimeout(() => {
      setCompletedDays(prev => new Set([...prev, currentDay]));
      
      if (currentDay < 3) {
        setCurrentDay(currentDay + 1);
      }
      setIsAnimating(false);
      setValidationError(null);
      
      // 🚀 SCROLL NAHORU po dokončení dne (KROMĚ Dne 3)
      // U Dne 3 zůstaneme dole aby viděli gratulaci + tlačítko stažení
      if (currentDay < 3) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      
      // Gamifikovaný toast podle progressu
      if (isComplete) {
        toast.success('🎉 Gratulujeme!', {
          description: 'Dokončili jste celý akční plán!'
        });
      } else {
        toast.success(`✅ Den ${currentDay} hotov!`, {
          description: `Jste na ${progressPercent}% cesty. Pokračujte!`
        });
      }
    }, 300);
  };

  const Icon = currentLesson.icon;
  const isLastDay = currentDay === 3;
  const isDayCompleted = completedDays.has(currentDay);

  // 🔐 ACCESS DENIED SCREEN
  if (hasAccess === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-gray-900 mb-3">Přístup odepřen</h2>
            <p className="text-gray-600 mb-6">
              Tento kurz je dostupný pouze pro registrované uživatele. 
              Pokud jste se zaregistrovali, použijte odkaz z emailu.
            </p>
            <a 
              href="/#order"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
            >
              Zaregistrovat se →
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ⏳ LOADING SCREEN (během kontroly)
  if (hasAccess === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Ověřuji přístup...</p>
        </div>
      </div>
    );
  }

  // Onboarding screen
  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 md:py-12 px-3 md:px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 md:p-8 text-center">
              <Sparkles className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4" />
              <h1 className="text-white mb-2">Akční plán na 3 dny</h1>
              <p className="text-indigo-100 text-sm md:text-base">Získejte víc zákazníků - krok po kroku</p>
            </div>

            {/* Content */}
            <div className="p-5 md:p-8">
              <div className="mb-6 md:mb-8">
                <h2 className="text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                  🎯 Co vás čeká:
                </h2>
                <div className="space-y-2 md:space-y-3 text-gray-700 text-sm md:text-base">
                  <div className="flex items-start gap-2 md:gap-3">
                    <span className="text-xl md:text-2xl">⏱️</span>
                    <div>
                      <strong>Čas:</strong> 45 minut celkem (3× 15 minut)
                    </div>
                  </div>
                  <div className="flex items-start gap-2 md:gap-3">
                    <span className="text-xl md:text-2xl">📅</span>
                    <div>
                      <strong>Struktura:</strong> 3 dny, 3 klíčové kroky
                    </div>
                  </div>
                  <div className="flex items-start gap-2 md:gap-3">
                    <span className="text-xl md:text-2xl">💾</span>
                    <div>
                      <strong>Auto-save:</strong> Váš pokrok se automaticky ukládá
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
                <h3 className="text-green-900 mb-2 md:mb-3 flex items-center gap-2">
                  ✅ Dostanete:
                </h3>
                <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-green-800">
                  <li>• Zpětnou vazbu od zákazníků (hotová šablona)</li>
                  <li>• Analýzu konkurence (systematický rozbor)</li>
                  <li>• Jasnou nabídku která prodává</li>
                  <li>• PDF ke stažení a vytisknutí</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2 md:gap-3">
                <button
                  onClick={() => setShowOnboarding(false)}
                  className="w-full flex items-center justify-center gap-2 px-5 md:px-6 py-3 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg md:rounded-xl hover:shadow-lg transition-all font-bold text-sm md:text-base"
                >
                  Začít hned
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <p className="text-xs text-center text-gray-500">
                  Můžete kdykoliv přerušit a vrátit se později
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 md:py-12 px-3 md:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Auto-save indicator */}
        <div className="fixed top-2 right-2 md:top-4 md:right-4 z-50">
          <div className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg transition-all ${
            isSaving 
              ? 'bg-yellow-100 border border-yellow-300 text-yellow-800' 
              : 'bg-green-100 border border-green-300 text-green-800'
          }`}>
            <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-semibold">
              {isSaving ? (
                <>
                  <div className="w-3 h-3 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" />
                  <span>Ukládám...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Uloženo</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Akční plán ZDARMA</span>
            </div>
          </div>
          <h1 className="text-gray-900 mb-3 md:mb-4 px-2 text-3xl md:text-5xl">
            Získejte víc zákazníků za 3 dny
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            Tři dny, tři klíčové kroky. Získejte zpětnou vazbu, analyzujte konkurenci a napište nabídku která prodává.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <span className="text-xs md:text-sm text-gray-600">Váš pokrok</span>
            <span className="text-xs md:text-sm font-bold text-indigo-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-center mt-3 md:mt-4 gap-2 md:gap-2">
            {lessons.map((lesson) => (
              <button
                key={lesson.day}
                onClick={() => {
                  if (lesson.day <= currentDay || completedDays.has(lesson.day - 1)) {
                    setCurrentDay(lesson.day);
                  }
                }}
                disabled={lesson.day > currentDay && !completedDays.has(lesson.day - 1)}
                className={`flex-1 max-w-[120px] px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all ${
                  completedDays.has(lesson.day)
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                    : lesson.day === currentDay
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : lesson.day < currentDay || completedDays.has(lesson.day - 1)
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                {completedDays.has(lesson.day) ? (
                  <div className="flex items-center justify-center gap-1.5 md:gap-2">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>Den {lesson.day}</span>
                  </div>
                ) : (
                  <span>Den {lesson.day}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Current Day Content */}
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6 md:mb-8">
            {/* Day Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5 md:p-8">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="bg-white/20 p-2 md:p-3 rounded-lg md:rounded-xl">
                  <Icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className="flex-1">
                  <div className="text-xs md:text-sm font-bold text-indigo-200 mb-1 md:mb-2">DEN {currentDay}</div>
                  <h2 className="text-white mb-1 md:mb-2">{currentLesson.title}</h2>
                  <p className="text-indigo-100 text-xs md:text-sm">{currentLesson.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Problem + Solution */}
            <div className="p-5 md:p-8 space-y-4 md:space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-red-900 mb-1">PROBLÉM:</h3>
                    <p className="text-red-800 text-sm">{currentLesson.problem}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-green-900 mb-1">ŘEŠENÍ:</h3>
                    <p className="text-green-800 text-sm">{currentLesson.solution}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-blue-900 mb-1">PROČ TO FUNGUJE:</h3>
                    <p className="text-blue-800 text-sm">{currentLesson.why}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Steps */}
            <div className="p-8 pt-0">
              <h3 className="text-gray-900 mb-6">{currentLesson.action.title}</h3>
              
              {currentLesson.action.steps.map((step, index) => {
                const fieldKey = step.input ? `day${currentLesson.day}-${step.input}` : null;
                const hasValue = fieldKey ? (formData[fieldKey] && formData[fieldKey].trim().length > 0) : false;
                
                // Spočítej pořadí jen pro stepy s inputem
                const stepsWithInput = currentLesson.action.steps.filter(s => s.input);
                const totalInputSteps = stepsWithInput.length;
                const inputStepIndex = stepsWithInput.findIndex(s => s.input === step.input);
                const inputStepNumber = inputStepIndex >= 0 ? inputStepIndex + 1 : null;

                return (
                  <div key={index} className="mb-8 last:mb-0">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-gray-900">{step.title}</h4>
                          {/* Zobraz progress jen u akčního plánu (Den 1 Step 2) */}
                          {currentLesson.day === 1 && step.input === 'plan-zpetna-vazba' && (
                            <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2 py-1 rounded">
                              Krok 1/1
                            </span>
                          )}
                          {/* Zobraz u ostatních dnů kde má smysl */}
                          {currentLesson.day > 1 && step.input && inputStepNumber && (
                            <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2 py-1 rounded">
                              Krok {inputStepNumber}/{totalInputSteps}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>

                    {/* Template */}
                    {step.template && (
                      <div className="ml-12 mb-4">
                        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 relative">
                          {step.templateType === 'copy' && (
                            <button
                              onClick={() => copyTemplate(step.template!, `step-${step.step}`)}
                              className="absolute top-4 right-4 p-2 bg-white border-2 border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all"
                            >
                              {copiedTemplate === `step-${step.step}` ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-600" />
                              )}
                            </button>
                          )}
                          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans pr-12">
                            {step.template}
                          </pre>
                          
                          {/* TIP pro Den 1 Step 1 - motivace odměnou */}
                          {currentLesson.day === 1 && step.step === 1 && (
                            <div className="mt-4 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border-2 border-amber-300">
                              <p className="text-sm text-amber-900 font-bold mb-2">⚡ DŮLEŽITÝ TIP - UPRAVTE ODMĚNU:</p>
                              <p className="text-sm text-amber-800 mb-3">
                                V emailu nahoře je připravená věta s odměnou. Vyberte co sedí vašemu byznysu:
                              </p>
                              <div className="text-xs text-amber-700 bg-white/50 p-3 rounded space-y-1">
                                <p>• <strong>E-shop:</strong> Sleva 15% na příští nákup</p>
                                <p>• <strong>Kavárna:</strong> Sleva 20% teď při vyplnění</p>
                                <p>• <strong>Služby:</strong> Malý dárek nebo sleva 10%</p>
                                <p>• <strong>Software/SaaS:</strong> Měsíc zdarma nebo bonus funkce</p>
                              </div>
                            </div>
                          )}
                          
                          {/* PDF Download pro offline dotazník */}
                          {currentLesson.day === 1 && step.step === 2 && (
                            <div className="mt-4 pt-4 border-t-2 border-gray-200">
                              <button
                                onClick={() => {
                                  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Dotazník - zpětná vazba od zákazníků</title>
  <style>
    @page { size: A4; margin: 20mm; }
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; line-height: 1.6; }
    .header { text-align: center; margin-bottom: 50px; border-bottom: 3px solid #4F46E5; padding-bottom: 20px; }
    h1 { color: #4F46E5; margin: 0 0 15px 0; font-size: 28px; }
    .intro { font-size: 14px; color: #6B7280; margin: 0; }
    .question { margin: 35px 0; page-break-inside: avoid; }
    .question-title { font-weight: bold; margin-bottom: 15px; color: #374151; font-size: 16px; }
    .checkbox-group { display: flex; gap: 25px; margin: 15px 0; flex-wrap: wrap; }
    .checkbox { display: inline-flex; align-items: center; }
    .checkbox-box { width: 22px; height: 22px; border: 2px solid #4F46E5; border-radius: 3px; display: inline-block; margin-right: 10px; }
    .text-line { border-bottom: 2px solid #D1D5DB; min-height: 45px; margin: 8px 0; }
    .other-field { margin-top: 15px; }
    .other-label { font-size: 14px; color: #6B7280; margin-bottom: 8px; display: block; }
    .footer { margin-top: 60px; padding-top: 25px; border-top: 2px solid #E5E7EB; text-align: center; }
    .footer-text { font-size: 18px; font-weight: bold; color: #374151; margin: 0 0 25px 0; }
    .bonus-box { background: #FEF3C7; padding: 20px; border-radius: 8px; border: 2px solid #F59E0B; margin-top: 20px; }
    .bonus-text { font-size: 16px; color: #92400E; margin: 0; font-weight: bold; }
    @media print { 
      body { padding: 20px; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Pomůžete nám být lepší?</h1>
    <p class="intro">Vyplnění zabere jen 2 minuty. Děkujeme!</p>
  </div>
  
  <div class="question">
    <div class="question-title">1. Co vás k nám dnes přivedlo?</div>
    <div class="checkbox-group">
      <div class="checkbox"><span class="checkbox-box"></span> Doporučení kamaráda/kolegy</div>
      <div class="checkbox"><span class="checkbox-box"></span> Prošel/a jsem náhodou kolem</div>
    </div>
    <div class="other-field">
      <label class="other-label">Jiné:</label>
      <div class="text-line"></div>
    </div>
  </div>
  
  <div class="question">
    <div class="question-title">2. Co se vám u nás líbí nejvíc?</div>
    <div class="text-line"></div>
  </div>
  
  <div class="question">
    <div class="question-title">3. Co bychom mohli zlepšit?</div>
    <div class="text-line"></div>
  </div>
  
  <div class="question">
    <div class="question-title">4. Doporučili byste nás svým známým?</div>
    <div class="checkbox-group">
      <div class="checkbox"><span class="checkbox-box"></span> Ano, určitě</div>
      <div class="checkbox"><span class="checkbox-box"></span> Možná</div>
      <div class="checkbox"><span class="checkbox-box"></span> Spíše ne</div>
    </div>
  </div>
  
  <div class="footer">
    <p class="footer-text">DĚKUJEME ZA VÁŠ ČAS!</p>
    <div class="bonus-box">
      <p class="bonus-text">🎁 Za vyplnění dotazníku obdržíte bonus.</p>
    </div>
  </div>
</body>
</html>`;
                                  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
                                  const url = URL.createObjectURL(blob);
                                  const a = document.createElement('a');
                                  a.href = url;
                                  a.download = `Offline_Dotaznik_${new Date().toISOString().slice(0,10)}.html`;
                                  document.body.appendChild(a);
                                  a.click();
                                  document.body.removeChild(a);
                                  URL.revokeObjectURL(url);
                                  toast.success('Dotazník stažen!', { description: 'Otevřete a vytiskněte (Ctrl+P)' });
                                }}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold text-sm"
                              >
                                <Download className="w-4 h-4" />
                                📄 Stáhnout dotazník (ready to print)
                              </button>
                              <p className="text-xs text-gray-500 text-center mt-2">
                                Otevřete v prohlížeči → Ctrl+P (nebo ⌘+P) → Vytisknout
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Input Field */}
                    {step.input && (
                      <div className="ml-12 md:ml-12 ml-0">
                        <textarea
                          value={formData[fieldKey!] || ''}
                          onChange={(e) => updateFormData(fieldKey!, e.target.value)}
                          placeholder={step.placeholder}
                          rows={8}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none text-sm md:text-sm text-base touch-manipulation"
                          style={{ WebkitTextSizeAdjust: '100%' }}
                        />
                        
                        {/* Hint o ochraně struktury */}
                        {(step.input === 'plan-zpetna-vazba' || 
                          step.input === 'konkurenti' || 
                          step.input === 'konkurence-dobre' ||
                          step.input === 'konkurence-spatne' ||
                          step.input === 'prilezitosti' || 
                          step.input === 'nabidka' || 
                          step.input === 'komunikacni-triky' || 
                          step.input === 'akcni-plan') && (
                          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                            <span>💡</span>
                            <span>Předvyplněné nadpisy nelze smazat (jsou potřeba pro export do PDF)</span>
                          </p>
                        )}
                        

                        {/* Helper text pro Den 1 Step 2 */}
                        {currentLesson.day === 1 && step.input === 'plan-zpetna-vazba' && (
                          <div className="mt-2 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                            <p className="text-xs text-blue-700 font-semibold mb-2">💡 Příklady:</p>
                            <div className="text-xs text-blue-600 space-y-2">
                              <div>
                                <p className="font-semibold">EMAIL:</p>
                                <p>• Komu: 10 nejlepších zákazníků</p>
                                <p>• Kdy: dnes večer</p>
                                <p>• Motivace: sleva 15%</p>
                              </div>
                              <div>
                                <p className="font-semibold">OFFLINE:</p>
                                <p>• Komu/Kde: u kasy, na stolech</p>
                                <p>• Kdy: od zítřka</p>
                                <p>• Motivace: káva zdarma</p>
                              </div>
                              <div className="pt-2 border-t border-blue-200">
                                <p>• Cíl: 5-10 odpovědí za týden</p>
                                <p>• Offline: Odměnu dejte hned při vyplnění</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Helper text pro Den 2 Step 4 */}
                        {currentLesson.day === 2 && step.input === 'prilezitosti' && (
                          <div className="mt-2 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                            <p className="text-xs text-blue-700 font-semibold mb-2">💡 Příklady (použijte slabiny konkurence z kroku 3):</p>
                            <div className="text-xs text-blue-600 space-y-2">
                              <div>
                                <p className="font-semibold">V ČEM LEPŠÍ:</p>
                                <p>• Rychlejší odpovědi (oni za 2 dny, my do 2 hodin)</p>
                                <p>• Osobní přístup, víc variant produktu...</p>
                              </div>
                              <div>
                                <p className="font-semibold">CO NAVÍC:</p>
                                <p>• Doprava zdarma (oni účtují 100 Kč)</p>
                                <p>• První zkouška/vzorek zdarma, servis zdarma...</p>
                              </div>
                              <div>
                                <p className="font-semibold">KDE/JAK TO ŘÍCT:</p>
                                <p>• Web: velký banner "Odpovídáme do 2 hodin!"</p>
                                <p>• Instagram: každý post + profil</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Helper text pro Den 3 Step 2 */}
                        {currentLesson.day === 3 && step.input === 'komunikacni-triky' && (
                          <div className="mt-2 p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                            <p className="text-xs text-purple-700 font-semibold mb-2">💡 Příklady:</p>
                            <div className="text-xs text-purple-600 space-y-1">
                              <p>• Trik #1: Změním "Pomáháme" na "Pomáhám vám"</p>
                              <p>• Trik #2: Místo "Rychlé dodání" napíšu "Dodání za 2 dny"</p>
                              <p>• Trik #3: Místo "30 lekcí" napíšu "Mluvte anglicky za 3 měsíce"</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Helper text pro Den 3 Step 3 */}
                        {currentLesson.day === 3 && step.input === 'akcni-plan' && (
                          <div className="mt-2 p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                            <p className="text-xs text-green-700 font-semibold mb-2">💡 Příklady:</p>
                            <div className="text-xs text-green-600 space-y-2">
                              <div>
                                <p className="font-semibold">CO ZMĚNÍM:</p>
                                <p>• Přepíšu nadpis na webu na: "Pomáhám firmám..."</p>
                                <p>• Změním email podpis</p>
                              </div>
                              <div>
                                <p className="font-semibold">KDE POUŽIJU:</p>
                                <p>• Smažte řádky které nepoužijete</p>
                                <p>• Nebo přidejte další kam všude to dáte</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {hasValue && (
                          <div className="flex items-center gap-2 mt-2 text-green-600 text-sm font-semibold">
                            <CheckCircle className="w-4 h-4" />
                            Vyplněno ✓
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bonus Tips - NAHORU (praktické tipy před gratulací) */}
          {currentLesson.bonus && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-8 mb-8">
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                {currentLesson.bonus.title}
              </h3>
              <ul className="space-y-3">
                {currentLesson.bonus.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-amber-600 font-bold flex-shrink-0 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Motivační zpráva - DOLŮ (závěrečná gratulace po tipech) */}
          {currentLesson.day === 3 && isDayCompleted && (
            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-300 rounded-xl p-8 mb-8">
              <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                  🎉 SKVĚLÁ PRÁCE!
                </div>
                <h3 className="text-gray-900 mb-3">Akční plán máte hotový</h3>
                <div className="text-gray-700 max-w-2xl mx-auto space-y-4">
                  <p>
                    Doufáme, že vám tyto 3 dny pomohly získat jasno v byznysu. Máte teď konkrétní kroky co dělat.
                  </p>
                  <div className="bg-white/50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-green-800 mb-2">📅 Co vás čeká dál:</p>
                    <p className="text-sm text-gray-700">
                      <strong>Podnikatelská Čtvrtka</strong> - kompletní kurz na vytvoření prodejní stránky která skutečně prodává - 
                      brzy startuje! V emailu vám přijde speciální nabídka s exkluzivní slevou.
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Stáhněte si vyplněná data níže a dejte nám vědět jak se vám daří! 💪
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Validation Error */}
          {validationError && (
            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-8">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-sm text-red-800 font-semibold">{validationError}</p>
              </div>
            </div>
          )}

          {/* Export Data - zobrazí se AŽ PO DOKONČENÍ Dne 3 */}
          {currentDay === 3 && completedDays.has(3) && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="text-gray-900 mb-3 flex items-center gap-2">
                <Download className="w-5 h-5 text-blue-600" />
                Stáhnout kompletní plán
              </h3>
              <button
                onClick={() => downloadAllData()}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                <Download className="w-5 h-5" />
                Stáhnout všechny 3 dny
              </button>
              <p className="text-xs text-gray-600 mt-3 text-center">
                📄 Otevřete v prohlížeči a vytiskněte (Ctrl+P)
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            {currentDay > 1 && (
              <button
                onClick={() => setCurrentDay(prev => Math.max(1, prev - 1))}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Předchozí</span>
              </button>
            )}
            {currentDay === 1 && <div></div>}

            {!isLastDay && !isDayCompleted && (
              <button
                onClick={completeDay}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-bold"
              >
                <span>Dokončit den {currentDay}</span>
                <CheckCircle className="w-5 h-5" />
              </button>
            )}
            
            {!isLastDay && isDayCompleted && (
              <div className="flex items-center gap-3 px-6 py-3 bg-green-100 border-2 border-green-300 rounded-xl text-green-800 font-bold">
                <CheckCircle className="w-5 h-5" />
                <span>Den {currentDay} dokončen!</span>
              </div>
            )}
            
            {isLastDay && !isDayCompleted && (
              <button
                onClick={completeDay}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all font-bold"
              >
                <span>Dokončit kurz</span>
                <CheckCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
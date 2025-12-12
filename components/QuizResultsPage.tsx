import { useEffect, useState } from 'react';
import { Printer, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { ActionPlanPDF } from './ActionPlanPDF';

interface QuizResultsPageProps {
  email?: string;
  score?: number;
  category?: string;
  subScores?: { label: string; score: number; icon: string }[];
  name?: string;
}

export function QuizResultsPage({ 
  email: propsEmail, 
  score: propsScore, 
  category: propsCategory, 
  subScores: propsSubScores,
  name: propsName
}: QuizResultsPageProps = {}) {
  const [email, setEmail] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [subScores, setSubScores] = useState<{ label: string; score: number; icon: string }[]>([]);
  const [name, setName] = useState('');

  useEffect(() => {
    // ✅ PRIORITA 1: Props (když se volá z QuizLandingPage)
    if (propsEmail) setEmail(propsEmail);
    if (propsScore !== undefined) setScore(propsScore);
    if (propsCategory) setCategory(propsCategory);
    if (propsSubScores) setSubScores(propsSubScores);
    if (propsName) setName(propsName);
    
    // ✅ PRIORITA 2: URL params (když se naviguje přímo na /kviz/vysledky)
    if (!propsEmail) {
      const urlParams = new URLSearchParams(window.location.search);
      const emailParam = urlParams.get('email');
      const scoreParam = urlParams.get('score');
      const categoryParam = urlParams.get('category');
      const subScoresParam = urlParams.get('subScores');
      const nameParam = urlParams.get('name');

      if (emailParam) setEmail(emailParam);
      if (scoreParam) setScore(parseInt(scoreParam));
      if (categoryParam) setCategory(categoryParam);
      if (nameParam) setName(decodeURIComponent(nameParam));
      if (subScoresParam) {
        try {
          setSubScores(JSON.parse(decodeURIComponent(subScoresParam)));
        } catch (e) {
          console.error('Failed to parse subScores:', e);
        }
      }
    }
  }, [propsEmail, propsScore, propsCategory, propsSubScores, propsName]);

  // Emoji podle kategorie
  const getCategoryEmoji = () => {
    if (!category) return '🎯';
    if (category === 'critical') return '🔴';
    if (category === 'unstable') return '🟡';
    if (category === 'solid') return '🟢';
    if (category === 'advanced') return '🚀';
    if (category === 'beginner') return '🌱';
    return '🎯';
  };

  const getCategoryLabel = () => {
    if (category === 'critical') return 'Kritický stav';
    if (category === 'unstable') return 'Nestabilní';
    if (category === 'solid') return 'Solidní základ';
    if (category === 'advanced') return 'Pokročilý';
    if (category === 'beginner') return 'Začínáš';
    return 'Výsledky';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* 🎯 HEADER - NEVIDITELNÝ PŘI TISKU */}
        <div className="print:hidden mb-8">
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zpět na hlavní stránku
          </button>
          
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl text-slate-900 mb-2">
                  {getCategoryEmoji()} Tvé výsledky
                </h1>
                <p className="text-slate-600">
                  Detailní analýza tvého modelu podnikání
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                <Printer className="w-5 h-5" />
                Vytisknout
              </button>
            </div>
          </div>
        </div>

        {/* 📊 PROGRESS BARY - NEVIDITELNÉ PŘI TISKU */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 mb-8 print:hidden"
        >
          <h2 className="text-2xl text-slate-900 mb-6">
            📊 Detailní rozpad skóre
          </h2>
          
          {/* Overall Score */}
          {score !== null && (
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 px-8 py-6 rounded-2xl border border-indigo-200/50">
                <span className="text-5xl">{getCategoryEmoji()}</span>
                <div className="text-left">
                  <p className="text-sm text-slate-600 uppercase tracking-wide">Celkové skóre</p>
                  <p className="text-4xl text-slate-900">{score}/100</p>
                  <p className="text-sm text-indigo-600 mt-1">{getCategoryLabel()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Scores Progress Bars */}
          {subScores.length > 0 && (
            <div className="space-y-6">
              {subScores.map((sub, idx) => {
                const color = sub.score >= 70 ? 'bg-green-500' : sub.score >= 40 ? 'bg-yellow-500' : 'bg-red-500';
                const bgColor = sub.score >= 70 ? 'bg-green-50' : sub.score >= 40 ? 'bg-yellow-50' : 'bg-red-50';
                const textColor = sub.score >= 70 ? 'text-green-700' : sub.score >= 40 ? 'text-yellow-700' : 'text-red-700';
                const borderColor = sub.score >= 70 ? 'border-green-200' : sub.score >= 40 ? 'border-yellow-200' : 'border-red-200';
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (idx * 0.1), duration: 0.5 }}
                    className={`${bgColor} rounded-xl p-5 border ${borderColor}`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{sub.icon}</span>
                        <span className="text-slate-900 font-medium">
                          {sub.label}
                        </span>
                      </div>
                      <span className={`text-2xl ${textColor}`}>
                        {sub.score}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-white rounded-full h-3 overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${sub.score}%` }}
                        transition={{ delay: 0.2 + (idx * 0.1), duration: 0.8, ease: 'easeOut' }}
                        className={`h-3 rounded-full ${color}`}
                      />
                    </div>
                    
                    {sub.score < 40 && (
                      <p className="text-sm text-red-700 mt-3 font-medium">
                        ⚠️ POZOR! Tohle potřebuješ urgentně vyřešit
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* 🎁 AKČNÍ PLÁN - VIDITELNÝ PŘI TISKU */}
        {category && score !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-2xl p-6 mb-6 border-2 border-red-600/20 print:hidden">
              <h2 className="text-2xl text-slate-900 mb-2">
                🎁 Tvůj personalizovaný akční plán
              </h2>
              <p className="text-sm text-slate-600">
                📋 Konkrétní kroky, které potřebuješ udělat PRVNÍ. Vytiskni si to nebo ulož jako PDF.
              </p>
            </div>
            
            {/* ✅ AKČNÍ PLÁN - JEN JEDEN PRO TVOJI KATEGORII */}
            <ActionPlanPDF 
              category={category as 'critical' | 'unstable' | 'solid' | 'advanced' | 'beginner'} 
              score={score} 
              name={name || email.split('@')[0] || 'podnikateli'} 
            />
          </motion.div>
        )}

      </div>

      {/* 🖨️ PRINT STYLES - TISKNE SE JEN AKČNÍ PLÁN! */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          /* Hide everything except ActionPlanPDF */
          @page {
            margin: 0;
            size: A4;
          }
        }
      ` }} />
    </div>
  );
}
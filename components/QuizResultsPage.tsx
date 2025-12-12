import { useEffect, useState } from 'react';
import { CheckCircle, Mail, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function QuizResultsPage() {
  const [email, setEmail] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [subScores, setSubScores] = useState<{ label: string; score: number; icon: string }[]>([]);

  useEffect(() => {
    // Získej data z URL query parametrů
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    const scoreParam = urlParams.get('score');
    const categoryParam = urlParams.get('category');
    const subScoresParam = urlParams.get('subScores');

    if (emailParam) setEmail(emailParam);
    if (scoreParam) setScore(parseInt(scoreParam));
    if (categoryParam) setCategory(categoryParam);
    if (subScoresParam) {
      try {
        setSubScores(JSON.parse(decodeURIComponent(subScoresParam)));
      } catch (e) {
        console.error('Failed to parse subScores:', e);
      }
    }
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <CheckCircle className="w-10 h-10 text-green-500" />
            </motion.div>
            
            <h1 className="text-4xl mb-3 text-white">
              Skvělá práce! 🎉
            </h1>
            <p className="text-xl text-indigo-100">
              Kvíz máš za sebou
            </p>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-8">
            
            {/* Score Preview (mini) */}
            {score !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 rounded-2xl border border-indigo-200/50">
                  <span className="text-3xl">{getCategoryEmoji()}</span>
                  <div className="text-left">
                    <p className="text-sm text-slate-600">Tvé skóre</p>
                    <p className="text-2xl text-slate-900">{score}/100 bodů</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ✅ SUB-SCORES Progress Bars */}
            {subScores.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-gradient-to-br from-slate-50 to-indigo-50/50 rounded-2xl p-6 border border-slate-200/50"
              >
                <h3 className="text-lg text-slate-900 mb-4 text-center">
                  📊 Detailní rozpad skóre
                </h3>
                <div className="space-y-4">
                  {subScores.map((sub, idx) => {
                    const color = sub.score >= 70 ? 'bg-green-500' : sub.score >= 40 ? 'bg-yellow-500' : 'bg-red-500';
                    const textColor = sub.score >= 70 ? 'text-green-700' : sub.score >= 40 ? 'text-yellow-700' : 'text-red-700';
                    
                    return (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-700">
                            <span className="mr-2">{sub.icon}</span>
                            {sub.label}
                          </span>
                          <span className={`font-bold ${textColor}`}>
                            {sub.score}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${sub.score}%` }}
                            transition={{ delay: 0.4 + (idx * 0.1), duration: 0.6, ease: 'easeOut' }}
                            className={`h-2.5 rounded-full ${color}`}
                          />
                        </div>
                        {sub.score < 40 && (
                          <p className="text-xs text-red-600 mt-1">
                            ⚠️ POZOR! Tohle potřebuješ urgentně vyřešit
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Email Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg text-slate-900 mb-2">
                    Výsledky posíláme na tvůj email
                  </h3>
                  {email && (
                    <p className="text-sm text-blue-700 mb-3">
                      📧 {email}
                    </p>
                  )}
                  <p className="text-sm text-slate-700 leading-relaxed">
                    V emailu najdeš detailní analýzu, konkrétní rizika a doporučení jak zlepšit své podnikání
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Sparkles Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-3 text-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-600 max-w-md">
                Personalizované doporučení ti pomohou posunout se dál – ať už teprve začínáš nebo už máš zákazníky
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full py-4 px-8 text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Mezitím si můžeš přečíst o čem je Podnikatelská Čtvrtka
              </button>
            </motion.div>

            {/* Subtle note */}
            <p className="text-center text-xs text-slate-500">
              Email by měl dorazit do 2 minut. Nezapomeň zkontrolovat i spam složku 📬
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
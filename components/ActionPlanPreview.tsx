import React, { useState, useEffect } from 'react';
import { ActionPlanPDF } from './ActionPlanPDF';
import { Button } from './ui/button';

export function ActionPlanPreview() {
  // ✅ READ URL PARAMS
  const [category, setCategory] = useState<'critical' | 'unstable' | 'solid' | 'advanced' | 'beginner'>('critical');
  const [score, setScore] = useState(20);
  const [userName, setUserName] = useState('podnikateli');

  useEffect(() => {
    // Parse URL params
    const params = new URLSearchParams(window.location.search);
    const urlCategory = params.get('category') as 'critical' | 'unstable' | 'solid' | 'advanced' | 'beginner' | null;
    const urlScore = params.get('score');
    const urlName = params.get('name');

    if (urlCategory && ['critical', 'unstable', 'solid', 'advanced', 'beginner'].includes(urlCategory)) {
      setCategory(urlCategory);
    }
    if (urlScore) {
      setScore(parseInt(urlScore, 10));
    }
    if (urlName) {
      setUserName(decodeURIComponent(urlName));
    }
  }, []);

  const categories = [
    { value: 'critical' as const, label: 'Kritický (0-30%)', score: 20 },
    { value: 'unstable' as const, label: 'Nestabilní (31-55%)', score: 45 },
    { value: 'solid' as const, label: 'Solidní (56-75%)', score: 65 },
    { value: 'advanced' as const, label: 'Pokročilý (76-100%)', score: 85 },
    { value: 'beginner' as const, label: 'Začínající (high)', score: 75 },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8 print:hidden">
          <h2 className="text-2xl font-bold mb-4">Preview akčních plánů</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                onClick={() => {
                  setCategory(cat.value);
                  setScore(cat.score);
                }}
                variant={category === cat.value ? 'default' : 'outline'}
              >
                {cat.label}
              </Button>
            ))}
          </div>
          <Button onClick={handlePrint} className="mt-4">
            🖨️ Vytisknout PDF
          </Button>
        </div>

        {/* PDF Preview */}
        <div className="bg-white rounded-lg shadow">
          <ActionPlanPDF category={category} score={score} name={userName} />
        </div>
      </div>

      {/* Print styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { margin: 0; }
          .print\\:hidden { display: none !important; }
        }
      ` }} />
    </div>
  );
}
import React, { useState } from 'react';
import { OrganicPost17MythBusterVisual } from './OrganicPost17MythBusterVisual';
import { OrganicPost17MythBusterCopy } from './OrganicPost17MythBusterCopy';
import { Copy, Check } from 'lucide-react';

export function OrganicPost17MythBuster() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const copyText = OrganicPost17MythBusterCopy();
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-red-600 text-white px-6 py-3 rounded-full mb-4">
            POST #17: MYTH BUSTER
          </div>
          <h1 className="text-[48px] mb-4">❌ Co NEPOTŘEBUJEŠ k úspěchu</h1>
          <p className="text-[20px] text-gray-700">
            Organic • Engagement • Trust Building
          </p>
        </div>

        {/* Visual Preview - ČISTÝ vizuál na foto! */}
        <div className="flex justify-center mb-8">
          <div className="shadow-2xl">
            <OrganicPost17MythBusterVisual />
          </div>
        </div>

        {/* Copy Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 flex justify-between items-center">
            <div>
              <h2 className="text-[28px]">✍️ PRIMARY TEXT</h2>
              <p className="text-red-100 mt-2">Story o zbytečných investicích před validací</p>
            </div>
            <button
              onClick={handleCopy}
              className="bg-white text-red-600 px-6 py-3 rounded-xl hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check size={20} />
                  <span>Zkopírováno!</span>
                </>
              ) : (
                <>
                  <Copy size={20} />
                  <span>Kopírovat text</span>
                </>
              )}
            </button>
          </div>
          <div className="p-8">
            <pre className="whitespace-pre-wrap text-[18px] leading-relaxed text-gray-800">
              {OrganicPost17MythBusterCopy()}
            </pre>
          </div>
        </div>

        {/* Strategy Notes */}
        <div className="mt-8 bg-white rounded-3xl shadow-2xl p-8">
          <h3 className="text-[24px] mb-6 text-red-600">🎯 STRATEGIE POSTU:</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-[18px] mb-3">💡 KONCEPT:</h4>
              <ul className="text-gray-700 space-y-2 text-[16px]">
                <li>✅ 4 běžné mýty o podnikání</li>
                <li>✅ Zbytečné investice PŘED validací</li>
                <li>✅ Co doopravdy potřebuješ na startu</li>
                <li>✅ Model = validace před investicí</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[18px] mb-3">🎨 VIZUÁLNÍ PRVKY:</h4>
              <ul className="text-gray-700 space-y-2 text-[16px]">
                <li>❌ Červená = mýty/špatné rozhodnutí</li>
                <li>📦 Ikony z lucide-react</li>
                <li>🔵 Modrý footer = řešení (Model)</li>
                <li>📊 Social proof: 27 + 1,4M Kč BEZPEČNĚ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

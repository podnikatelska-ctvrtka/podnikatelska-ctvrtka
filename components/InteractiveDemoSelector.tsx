import { useState } from "react";
import { motion } from "motion/react";
import { Coffee, ShoppingBag, Laptop, Store } from "lucide-react";
import { Button } from "./ui/button";

interface DemoData {
  id: string;
  name: string;
  icon: any;
  gradient: string;
  segments: Array<{ text: string; color: string }>;
  values: Array<{ text: string; color: string }>;
  channels: Array<{ text: string; color: string }>;
}

const DEMOS: DemoData[] = [
  {
    id: 'cafe',
    name: '☕ Kavárna',
    icon: Coffee,
    gradient: 'from-amber-500 to-orange-600',
    segments: [
      { text: 'Studenti', color: 'blue' },
      { text: 'Freelanceři', color: 'green' },
      { text: 'Turisté', color: 'yellow' }
    ],
    values: [
      { text: 'Rychlá káva', color: 'blue' },
      { text: 'Workspace + WiFi', color: 'green' },
      { text: 'Atmosféra', color: 'yellow' }
    ],
    channels: [
      { text: 'Instagram', color: 'blue' },
      { text: 'LinkedIn', color: 'green' },
      { text: 'Google Maps', color: 'yellow' }
    ]
  },
  {
    id: 'eshop',
    name: '🛍️ E-shop',
    icon: ShoppingBag,
    gradient: 'from-purple-500 to-pink-600',
    segments: [
      { text: 'Mladé maminky', color: 'blue' },
      { text: 'Gift-shoppers', color: 'green' }
    ],
    values: [
      { text: 'Rychlá dodávka', color: 'blue' },
      { text: 'Dárkové balení', color: 'green' }
    ],
    channels: [
      { text: 'Facebook Ads', color: 'blue' },
      { text: 'Instagram Shop', color: 'green' }
    ]
  },
  {
    id: 'saas',
    name: '💻 SaaS',
    icon: Laptop,
    gradient: 'from-blue-500 to-cyan-600',
    segments: [
      { text: 'Malé firmy', color: 'blue' },
      { text: 'Freelanceři', color: 'green' }
    ],
    values: [
      { text: 'Automatizace', color: 'blue' },
      { text: 'Jednoduchý nástroj', color: 'green' }
    ],
    channels: [
      { text: 'Google Ads', color: 'blue' },
      { text: 'LinkedIn', color: 'green' }
    ]
  },
  {
    id: 'store',
    name: '🏪 Prodejna',
    icon: Store,
    gradient: 'from-green-500 to-emerald-600',
    segments: [
      { text: 'Místní obyvatelé', color: 'blue' },
      { text: 'Kolemjdoucí', color: 'green' }
    ],
    values: [
      { text: 'Osobní servis', color: 'blue' },
      { text: 'Rychlý nákup', color: 'green' }
    ],
    channels: [
      { text: 'Výloha', color: 'green' },
      { text: 'Místní FB skupiny', color: 'blue' }
    ]
  }
];

interface Props {
  onSelect?: (demo: DemoData) => void;
  compact?: boolean;
}

export function InteractiveDemoSelector({ onSelect, compact = false }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (demo: DemoData) => {
    setSelected(demo.id);
    if (onSelect) {
      onSelect(demo);
    }
  };

  const selectedDemo = DEMOS.find(d => d.id === selected);

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h4 className="font-bold text-gray-900 mb-2">
          🎨 Vyber typ byznysu a uvidíš příklad
        </h4>
        <p className="text-sm text-gray-600">
          Klikni na kartu a prozkoumej jak vypadá Canvas
        </p>
      </div>

      {/* Demo cards */}
      <div className={`grid ${compact ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'} gap-3`}>
        {DEMOS.map((demo, index) => {
          const Icon = demo.icon;
          const isSelected = selected === demo.id;

          return (
            <motion.button
              key={demo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelect(demo)}
              className={`p-4 rounded-xl text-center transition-all bg-gradient-to-br ${demo.gradient} ${
                isSelected
                  ? 'ring-4 ring-blue-500 scale-105'
                  : 'hover:scale-105'
              }`}
            >
              <Icon className="w-8 h-8 mx-auto mb-2 text-white" />
              <p className="text-sm font-bold text-white">
                {demo.name}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Selected demo details */}
      {selectedDemo && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white border-2 border-gray-200 rounded-xl p-4 space-y-3"
        >
          <h5 className="font-bold text-gray-900 flex items-center gap-2">
            {selectedDemo.name} - Příklad Canvas
          </h5>

          <div className="space-y-2">
            <div>
              <p className="text-xs font-bold text-gray-600 mb-1">Zákaznické segmenty:</p>
              <div className="flex flex-wrap gap-2">
                {selectedDemo.segments.map((seg, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-1 rounded ${
                      seg.color === 'blue' ? 'bg-blue-100 text-blue-900' :
                      seg.color === 'green' ? 'bg-green-100 text-green-900' :
                      seg.color === 'yellow' ? 'bg-yellow-100 text-yellow-900' :
                      'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {seg.text}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-600 mb-1">Hodnotová nabídka:</p>
              <div className="flex flex-wrap gap-2">
                {selectedDemo.values.map((val, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-1 rounded ${
                      val.color === 'blue' ? 'bg-blue-100 text-blue-900' :
                      val.color === 'green' ? 'bg-green-100 text-green-900' :
                      val.color === 'yellow' ? 'bg-yellow-100 text-yellow-900' :
                      'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {val.text}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-600 mb-1">Kanály:</p>
              <div className="flex flex-wrap gap-2">
                {selectedDemo.channels.map((ch, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-1 rounded ${
                      ch.color === 'blue' ? 'bg-blue-100 text-blue-900' :
                      ch.color === 'green' ? 'bg-green-100 text-green-900' :
                      ch.color === 'yellow' ? 'bg-yellow-100 text-yellow-900' :
                      'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {ch.text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <TipBox variant="success">
            ✅ Vidíš jak barvy propojují segmenty → hodnoty → kanály?
          </TipBox>
        </motion.div>
      )}
    </div>
  );
}

// Import TipBox
import { TipBox } from "./TipBox";

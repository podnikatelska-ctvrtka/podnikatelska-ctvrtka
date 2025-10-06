import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Save, Download, Plus, X, Edit2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface CanvasBox {
  id: string;
  title: string;
  description: string;
  color: string;
  items: string[];
  placeholder: string;
}

const CANVAS_STRUCTURE: CanvasBox[] = [
  {
    id: "key-partners",
    title: "Klíčová partnerství",
    description: "S kým spolupracujete?",
    color: "from-purple-500 to-pink-500",
    items: [],
    placeholder: "Např. dodavatelé, distributori...",
  },
  {
    id: "key-activities",
    title: "Klíčové aktivity",
    description: "Co děláte?",
    color: "from-blue-500 to-cyan-500",
    items: [],
    placeholder: "Např. výroba, marketing...",
  },
  {
    id: "key-resources",
    title: "Klíčové zdroje",
    description: "Co potřebujete?",
    color: "from-green-500 to-emerald-500",
    items: [],
    placeholder: "Např. tým, nástroje...",
  },
  {
    id: "value-proposition",
    title: "Hodnotová nabídka",
    description: "Co nabízíte?",
    color: "from-orange-500 to-red-500",
    items: [],
    placeholder: "Např. řešení problému X...",
  },
  {
    id: "customer-relationships",
    title: "Vztahy se zákazníky",
    description: "Jak komunikujete?",
    color: "from-indigo-500 to-purple-500",
    items: [],
    placeholder: "Např. osobní, automatizované...",
  },
  {
    id: "channels",
    title: "Kanály",
    description: "Kde oslovujete?",
    color: "from-teal-500 to-green-500",
    items: [],
    placeholder: "Např. web, sociální sítě...",
  },
  {
    id: "customer-segments",
    title: "Zákaznické segmenty",
    description: "Pro koho?",
    color: "from-yellow-500 to-orange-500",
    items: [],
    placeholder: "Např. malé firmy, freelanceři...",
  },
  {
    id: "cost-structure",
    title: "Nákladová struktura",
    description: "Co vás stojí peníze?",
    color: "from-red-500 to-pink-500",
    items: [],
    placeholder: "Např. mzdy, nástroje...",
  },
  {
    id: "revenue-streams",
    title: "Zdroje příjmů",
    description: "Jak vyděláváte?",
    color: "from-green-500 to-teal-500",
    items: [],
    placeholder: "Např. prodej produktů...",
  },
];

export function BusinessModelCanvas() {
  const [canvasData, setCanvasData] = useState<CanvasBox[]>(CANVAS_STRUCTURE);
  const [editingBox, setEditingBox] = useState<string | null>(null);
  const [newItem, setNewItem] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem("business_model_canvas");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCanvasData(parsed);
        setLastSaved(new Date());
      } catch (e) {
        console.error("Failed to load canvas data", e);
      }
    }
  }, []);

  // Auto-save
  const saveCanvas = (data: CanvasBox[]) => {
    localStorage.setItem("business_model_canvas", JSON.stringify(data));
    setCanvasData(data);
    setLastSaved(new Date());
    toast.success("✅ Automaticky uloženo");
  };

  // Add item to box
  const addItem = (boxId: string) => {
    if (!newItem.trim()) return;

    const updated = canvasData.map(box => {
      if (box.id === boxId) {
        return {
          ...box,
          items: [...box.items, newItem.trim()],
        };
      }
      return box;
    });

    saveCanvas(updated);
    setNewItem("");
    setEditingBox(null);
  };

  // Remove item from box
  const removeItem = (boxId: string, itemIndex: number) => {
    const updated = canvasData.map(box => {
      if (box.id === boxId) {
        return {
          ...box,
          items: box.items.filter((_, i) => i !== itemIndex),
        };
      }
      return box;
    });

    saveCanvas(updated);
  };

  // Export as PDF (simple version - just trigger print)
  const exportPDF = () => {
    toast.success("📄 Připravuji PDF export...", {
      duration: 2000,
    });
    
    setTimeout(() => {
      window.print();
    }, 500);
  };

  // Clear all data
  const clearCanvas = () => {
    if (confirm("Opravdu chcete smazat všechna data?")) {
      setCanvasData(CANVAS_STRUCTURE);
      localStorage.removeItem("business_model_canvas");
      toast.success("🗑️ Canvas vymazán");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              🎨 Business Model Canvas
            </h2>
            <p className="text-gray-600">
              Interaktivní šablona - klikněte na box a přidejte své informace
            </p>
            {lastSaved && (
              <p className="text-sm text-gray-500 mt-2">
                Naposledy uloženo: {lastSaved.toLocaleTimeString("cs-CZ")}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={clearCanvas}
              size="sm"
            >
              <X className="w-4 h-4 mr-2" />
              Vymazat
            </Button>
            <Button
              onClick={exportPDF}
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportovat PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {canvasData.map((box, index) => (
          <motion.div
            key={box.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-white rounded-xl shadow-lg overflow-hidden ${
              box.id === "value-proposition" ? "lg:col-span-1 lg:row-span-2" : ""
            }`}
          >
            {/* Box header */}
            <div className={`bg-gradient-to-r ${box.color} p-4`}>
              <h3 className="font-bold text-white text-lg mb-1">
                {box.title}
              </h3>
              <p className="text-white/90 text-sm">
                {box.description}
              </p>
            </div>

            {/* Box content */}
            <div className="p-4 space-y-3 min-h-[200px]">
              {/* Items list */}
              {box.items.length > 0 ? (
                <div className="space-y-2">
                  {box.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg group hover:bg-gray-100 transition-colors"
                    >
                      <span className="flex-1 text-gray-700 text-sm">
                        • {item}
                      </span>
                      <button
                        onClick={() => removeItem(box.id, itemIndex)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-sm italic">
                  Zatím žádné položky...
                </div>
              )}

              {/* Add item form */}
              {editingBox === box.id ? (
                <div className="space-y-2 mt-4">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder={box.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addItem(box.id);
                      }
                    }}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => addItem(box.id)}
                      size="sm"
                      className="flex-1"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Přidat
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingBox(null);
                        setNewItem("");
                      }}
                      size="sm"
                    >
                      Zrušit
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setEditingBox(box.id)}
                  size="sm"
                  className="w-full mt-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Přidat položku
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 mb-3">
          💡 Tipy pro vyplnění
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <strong>• Buďte konkrétní:</strong> Místo "marketing" pište "Facebook reklamy, email marketing"
          </div>
          <div>
            <strong>• Myslete na čísla:</strong> U nákladů a příjmů uvádějte i odhady
          </div>
          <div>
            <strong>• Prioritizujte:</strong> Začněte nejdůležitějšími položkami
          </div>
          <div>
            <strong>• Aktualizujte:</strong> Canvas by měl růst s vaším byznysem
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          
          .grid.grid-cols-1 {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 1rem !important;
            visibility: visible;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          
          .grid.grid-cols-1 * {
            visibility: visible;
          }
          
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

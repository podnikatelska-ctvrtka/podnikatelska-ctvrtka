import { motion } from "motion/react";
import { useState } from "react";
import { Target, Users, DollarSign, Lightbulb, Zap, Eye, Heart, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface CanvasBox {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  example: string;
  color: string;
}

const canvasBoxes: CanvasBox[] = [
  {
    id: "problem",
    title: "Problém zákazníka",
    icon: <Target className="w-5 h-5" />,
    description: "Hlavní bolest, kterou řešíte",
    example: "Nedostatek zákazníků, nejasný směr",
    color: "red"
  },
  {
    id: "solution", 
    title: "Vaše řešení",
    icon: <Lightbulb className="w-5 h-5" />,
    description: "Jak problém konkrétně řešíte", 
    example: "Konzultace, kurzy, produkty",
    color: "blue"
  },
  {
    id: "customer",
    title: "Cílový zákazník", 
    icon: <Users className="w-5 h-5" />,
    description: "Kdo přesně je váš ideální klient",
    example: "Malí podnikatelé, služby, 2-10 let",
    color: "green"
  },
  {
    id: "value",
    title: "Hodnota pro zákazníka",
    icon: <Heart className="w-5 h-5" />,
    description: "Proč si vás zákazník vybere",
    example: "Rychlé výsledky, osobní přístup",
    color: "purple"
  },
  {
    id: "channels",
    title: "Kanály oslovení",
    icon: <Eye className="w-5 h-5" />,
    description: "Kde zákazníky najdete",
    example: "LinkedIn, Google, doporučení",
    color: "orange"
  },
  {
    id: "revenue",
    title: "Zdroje příjmů",
    icon: <DollarSign className="w-5 h-5" />,
    description: "Jak z toho vyděláváte peníze",
    example: "Kurzy, konzultace, produkty",
    color: "emerald"
  },
  {
    id: "resources",
    title: "Klíčové zdroje",
    icon: <Zap className="w-5 h-5" />,
    description: "Co potřebujete k fungování",
    example: "Znalosti, čas, nástroje",
    color: "indigo"
  },
  {
    id: "activities",
    title: "Klíčové aktivity",
    icon: <ArrowRight className="w-5 h-5" />,
    description: "Co hlavně děláte každý den",
    example: "Tvorba obsahu, prodej, dodávka",
    color: "pink"
  },
  {
    id: "costs",
    title: "Náklady",
    icon: <Target className="w-5 h-5" />,
    description: "Hlavní výdaje na provoz",
    example: "Nástroje, marketing, čas",
    color: "gray"
  }
];

export function InteractiveBusinessCanvas() {
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);

  const getColorClasses = (color: string, isSelected: boolean, isHovered: boolean) => {
    const colors = {
      red: {
        bg: isSelected ? "bg-red-100" : isHovered ? "bg-red-50" : "bg-white",
        border: isSelected ? "border-red-400" : isHovered ? "border-red-300" : "border-gray-200",
        icon: isSelected ? "bg-red-500" : "bg-red-400",
        text: isSelected ? "text-red-900" : "text-gray-900"
      },
      blue: {
        bg: isSelected ? "bg-blue-100" : isHovered ? "bg-blue-50" : "bg-white",
        border: isSelected ? "border-blue-400" : isHovered ? "border-blue-300" : "border-gray-200",
        icon: isSelected ? "bg-blue-500" : "bg-blue-400",
        text: isSelected ? "text-blue-900" : "text-gray-900"
      },
      green: {
        bg: isSelected ? "bg-green-100" : isHovered ? "bg-green-50" : "bg-white",
        border: isSelected ? "border-green-400" : isHovered ? "border-green-300" : "border-gray-200",
        icon: isSelected ? "bg-green-500" : "bg-green-400", 
        text: isSelected ? "text-green-900" : "text-gray-900"
      },
      purple: {
        bg: isSelected ? "bg-purple-100" : isHovered ? "bg-purple-50" : "bg-white",
        border: isSelected ? "border-purple-400" : isHovered ? "border-purple-300" : "border-gray-200",
        icon: isSelected ? "bg-purple-500" : "bg-purple-400",
        text: isSelected ? "text-purple-900" : "text-gray-900"
      },
      orange: {
        bg: isSelected ? "bg-orange-100" : isHovered ? "bg-orange-50" : "bg-white",
        border: isSelected ? "border-orange-400" : isHovered ? "border-orange-300" : "border-gray-200", 
        icon: isSelected ? "bg-orange-500" : "bg-orange-400",
        text: isSelected ? "text-orange-900" : "text-gray-900"
      },
      emerald: {
        bg: isSelected ? "bg-emerald-100" : isHovered ? "bg-emerald-50" : "bg-white",
        border: isSelected ? "border-emerald-400" : isHovered ? "border-emerald-300" : "border-gray-200",
        icon: isSelected ? "bg-emerald-500" : "bg-emerald-400",
        text: isSelected ? "text-emerald-900" : "text-gray-900"
      },
      indigo: {
        bg: isSelected ? "bg-indigo-100" : isHovered ? "bg-indigo-50" : "bg-white",
        border: isSelected ? "border-indigo-400" : isHovered ? "border-indigo-300" : "border-gray-200",
        icon: isSelected ? "bg-indigo-500" : "bg-indigo-400",
        text: isSelected ? "text-indigo-900" : "text-gray-900"
      },
      pink: {
        bg: isSelected ? "bg-pink-100" : isHovered ? "bg-pink-50" : "bg-white",
        border: isSelected ? "border-pink-400" : isHovered ? "border-pink-300" : "border-gray-200",
        icon: isSelected ? "bg-pink-500" : "bg-pink-400",
        text: isSelected ? "text-pink-900" : "text-gray-900"
      },
      gray: {
        bg: isSelected ? "bg-gray-100" : isHovered ? "bg-gray-50" : "bg-white",
        border: isSelected ? "border-gray-400" : isHovered ? "border-gray-300" : "border-gray-200",
        icon: isSelected ? "bg-gray-500" : "bg-gray-400",
        text: isSelected ? "text-gray-900" : "text-gray-900"
      }
    };
    
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Lightbulb className="w-4 h-4" />
            <span>Interaktivní ukázka</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl mb-6 text-gray-900 font-black leading-tight">
            Takhle vypadá <span className="text-blue-600">Podnikatelská čtvrtka</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            <strong className="text-gray-900">9 polí na jedné stránce.</strong> Klikněte na libovolné pole a prohlédněte si, jak funguje.
          </p>
        </motion.div>

        {/* Canvas Grid */}
        <motion.div
          className="grid grid-cols-3 gap-4 max-w-6xl mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {canvasBoxes.map((box, index) => {
            const isSelected = selectedBox === box.id;
            const isHovered = hoveredBox === box.id;
            const colorClasses = getColorClasses(box.color, isSelected, isHovered);
            
            return (
              <motion.div
                key={box.id}
                className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 shadow-sm hover:shadow-lg ${colorClasses.bg} ${colorClasses.border}`}
                onMouseEnter={() => setHoveredBox(box.id)}
                onMouseLeave={() => setHoveredBox(null)}
                onClick={() => setSelectedBox(selectedBox === box.id ? null : box.id)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Icon */}
                <div className={`w-10 h-10 ${colorClasses.icon} rounded-lg flex items-center justify-center text-white mb-3 shadow-sm`}>
                  {box.icon}
                </div>
                
                {/* Title */}
                <h3 className={`font-bold mb-2 ${colorClasses.text}`}>
                  {box.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                  {box.description}
                </p>
                
                {/* Example */}
                {(isSelected || isHovered) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200 pt-2 mt-2"
                  >
                    <p className="text-xs text-gray-500 italic">
                      Příklad: {box.example}
                    </p>
                  </motion.div>
                )}
                
                {/* Selected indicator */}
                {isSelected && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    ✓
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-gray-600 mb-4">
            💡 <strong>Tip:</strong> Každý úspěšný podnikatel má tyto věci vyřešené. A vy?
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.4 }}
        >
          <Button
            size="lg"
            onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span>Chci si vytvořit svou čtvrtku!</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
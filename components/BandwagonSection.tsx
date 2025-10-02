import { motion } from "motion/react";

export function BandwagonSection() {
  return (
    <motion.div 
      className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
    >
      <p className="text-sm text-gray-600 mb-3 text-center">
        <span className="font-bold text-green-700">🎯 Připojte se k 12+ podnikatelům, kteří už transformovali svůj byznys!</span><br/>
        <span className="text-xs text-gray-500 mt-1 block">Podnikatelskou čtvrtku používají i nejúspěšnější firmy světa:</span>
      </p>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <div className="text-sm font-medium text-gray-700 bg-white px-3 py-1.5 rounded-lg shadow-sm">
          🏢 Google
        </div>
        <div className="text-sm font-medium text-gray-700 bg-white px-3 py-1.5 rounded-lg shadow-sm">
          📘 Facebook
        </div>
        <div className="text-sm font-medium text-gray-700 bg-white px-3 py-1.5 rounded-lg shadow-sm">
          🚀 Spotify
        </div>
        <div className="text-sm font-medium text-gray-700 bg-white px-3 py-1.5 rounded-lg shadow-sm">
          ✈️ Airbnb
        </div>
      </div>
      <p className="text-xs text-center text-gray-500 mt-3">
        ⚡ Průměrný čas na vytvoření: <strong>90 minut</strong>
      </p>
    </motion.div>
  );
}
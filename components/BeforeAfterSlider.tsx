import { useState } from 'react';
import { motion } from 'motion/react';
import { AnimatedCounter } from './AnimatedCounter';

interface BeforeAfterSliderProps {
  beforeRevenue: number;
  afterRevenue: number;
  beforeCustomers: number;
  afterCustomers: number;
}

export function BeforeAfterSlider({ 
  beforeRevenue, 
  afterRevenue, 
  beforeCustomers, 
  afterCustomers 
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h4 className="font-semibold mb-4 text-center">📊 Změna za 6 měsíců</h4>
      
      <div 
        className="relative h-32 rounded-lg overflow-hidden cursor-ew-resize select-none"
        onMouseMove={handleMouseMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* Before side */}
        <div className="absolute inset-0 bg-red-50 border border-red-200 flex flex-col items-center justify-center">
          <div className="text-red-600 font-medium mb-1">❌ Před</div>
          <div className="text-xl font-bold text-red-700">
            <AnimatedCounter from={0} to={beforeRevenue} suffix=" Kč/měsíc" />
          </div>
          <div className="text-red-600 text-xs">
            ~<AnimatedCounter from={0} to={beforeCustomers} /> zákazníků
          </div>
        </div>

        {/* After side */}
        <motion.div 
          className="absolute inset-0 bg-green-50 border border-green-200 flex flex-col items-center justify-center"
          style={{
            clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`
          }}
        >
          <div className="text-green-600 font-medium mb-1">✅ Po</div>
          <div className="text-xl font-bold text-green-700">
            <AnimatedCounter from={0} to={afterRevenue} suffix=" Kč/měsíc" />
          </div>
          <div className="text-green-600 text-xs">
            ~<AnimatedCounter from={0} to={afterCustomers} /> zákazníků
          </div>
        </motion.div>

        {/* Slider handle */}
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-300 flex items-center justify-center">
            <div className="w-1 h-4 bg-gray-400 rounded-full mx-0.5"></div>
            <div className="w-1 h-4 bg-gray-400 rounded-full mx-0.5"></div>
          </div>
        </motion.div>
      </div>

      {/* Instructions */}
      <p className="text-center text-xs text-gray-500 mt-2">
        👆 Přetáhněte pro porovnání výsledků
      </p>

      {/* Growth metrics */}
      <div className="mt-4 text-center p-3 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg">
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <div className="text-lg font-bold text-green-600">
              +<AnimatedCounter from={0} to={46} />%
            </div>
            <div className="text-gray-600 text-xs">Tržby</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              <AnimatedCounter from={0} to={4} />x
            </div>
            <div className="text-gray-600 text-xs">Zdroje</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">
              <AnimatedCounter from={0} to={3} />x
            </div>
            <div className="text-gray-600 text-xs">Kanály</div>
          </div>
        </div>
      </div>
    </div>
  );
}
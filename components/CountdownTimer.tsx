import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Timer, Zap, TrendingDown } from "lucide-react";

interface CountdownTimerProps {
  onExpired: () => void;
}

export function CountdownTimer({ onExpired }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const STORAGE_KEY = "visitTimestamp";
    const COUNTDOWN_DURATION = 24 * 60 * 60 * 1000; // 24 hodin v milisekundách

    // Zkontrolujeme, zda už máme uložený čas první návštěvy
    let startTime = localStorage.getItem(STORAGE_KEY);
    
    if (!startTime) {
      // První návštěva - uložíme aktuální čas
      startTime = Date.now().toString();
      localStorage.setItem(STORAGE_KEY, startTime);
    }

    const updateCountdown = () => {
      const now = Date.now();
      const elapsed = now - parseInt(startTime!);
      const remaining = Math.max(0, COUNTDOWN_DURATION - elapsed);

      if (remaining === 0 && !isExpired) {
        setIsExpired(true);
        onExpired();
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeLeft({
        hours,
        minutes,
        seconds,
        total: remaining
      });
    };

    // Okamžitě aktualizujeme a pak každou sekundu
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [onExpired, isExpired]);

  if (isExpired) {
    return (
      <motion.div 
        className="bg-gradient-to-r from-gray-600 to-slate-700 rounded-2xl p-6 text-center shadow-2xl border border-gray-400"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center mb-3">
          <TrendingDown className="w-6 h-6 text-gray-300 mr-2" />
          <span className="text-gray-200 font-medium">Akční nabídka skončila</span>
        </div>
        <div className="text-gray-300 text-lg font-semibold mb-2">Nyní platí standardní cena</div>
        <div className="text-gray-400 text-sm">7.499 Kč</div>
      </motion.div>
    );
  }

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  // Vypočítáme procenta pro progress bar
  const totalInitial = 24 * 60 * 60 * 1000;
  const percentRemaining = (timeLeft.total / totalInitial) * 100;

  return (
    <motion.div 
      className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl p-4 text-white shadow-lg relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: [-100, 200] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10">
        {/* Progress bar */}
        <div className="mb-3">
          <div className="bg-white/20 rounded-full h-1.5 overflow-hidden">
            <motion.div 
              className="bg-gradient-to-r from-yellow-400 to-red-400 h-full rounded-full"
              style={{ width: `${percentRemaining}%` }}
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>
        
        {/* Time display */}
        <div className="flex justify-center gap-2 mb-3">
          {[
            { value: timeLeft.hours, label: "H", color: "from-red-400 to-red-600" },
            { value: timeLeft.minutes, label: "M", color: "from-orange-400 to-orange-600" },
            { value: timeLeft.seconds, label: "S", color: "from-yellow-400 to-yellow-600" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-b ${item.color} rounded-lg p-2 min-w-[50px] shadow-md`}
              animate={{ 
                scale: item.label === "S" && timeLeft.seconds % 2 === 0 ? 1.05 : 1
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-xl font-bold text-white text-center">
                {formatTime(item.value)}
              </div>
              <div className="text-xs text-white/90 text-center font-medium">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Warning message */}
        <motion.div 
          className="flex items-center justify-center bg-white/10 backdrop-blur rounded-lg p-2"
          animate={{ 
            backgroundColor: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"] 
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Zap className="w-4 h-4 text-yellow-300 mr-1" />
          <span className="text-white font-medium text-xs">
            Poté 7.499 Kč
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
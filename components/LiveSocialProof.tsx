import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { CheckCircle, Users, Star } from "lucide-react";

export function LiveSocialProof() {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const notifications = [
    {
      name: "Jana K.",
      location: "Praha",
      action: "si právě koupila kurz",
      time: "před 3 minutami",
      icon: <CheckCircle className="w-4 h-4 text-green-500" />
    },
    {
      name: "Tomáš M.",
      location: "Brno", 
      action: "dokončil kurz",
      time: "před 8 minutami",
      icon: <Star className="w-4 h-4 text-yellow-500" />
    },
    {
      name: "Petra S.",
      location: "Ostrava",
      action: "si právě rezervovala konzultaci",
      time: "před 12 minutami", 
      icon: <Users className="w-4 h-4 text-blue-500" />
    },
    {
      name: "Martin K.",
      location: "České Budějovice",
      action: "si právě koupila kurz",
      time: "před 15 minutami",
      icon: <CheckCircle className="w-4 h-4 text-green-500" />
    }
  ];

  useEffect(() => {
    // Zobrazit první notifikaci po 3 sekundách
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Rotovat notifikace každých 8 sekund
    const interval = setInterval(() => {
      setCurrentNotification(prev => (prev + 1) % notifications.length);
    }, 8000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-20 md:bottom-24 left-4 z-30 max-w-xs"
        >
          <motion.div
            key={currentNotification}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-3"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {notifications[currentNotification].icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900 text-sm">
                    {notifications[currentNotification].name}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({notifications[currentNotification].location})
                  </span>
                </div>
                
                <p className="text-xs text-gray-600 mt-1">
                  {notifications[currentNotification].action}
                </p>
                
                <p className="text-xs text-gray-400 mt-1">
                  {notifications[currentNotification].time}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import React from 'react';
import { motion } from 'motion/react';

/**
 * 🎨 YOUTUBE LOGO - "PročToFunguje"
 * 
 * Minimalist, bold, memorable
 * Use for: Profile pic, watermark
 */

export function YouTubeLogo() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center p-8">
      <div className="relative">
        {/* Main Question Mark */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative"
        >
          {/* Question mark circle background */}
          <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl" />
          
          {/* Question mark */}
          <div className="relative bg-white rounded-3xl p-12 shadow-2xl">
            <div className="text-[240px] font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-red-600 leading-none">
              ?
            </div>
          </div>
        </motion.div>

        {/* Text below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="text-white text-4xl tracking-wider font-black">
            PROČ TO FUNGUJE
          </div>
        </motion.div>
      </div>

      {/* Download instructions */}
      <div className="absolute bottom-8 left-8 right-8 text-white/60 text-sm text-center">
        📸 Screen record this (square crop for profile pic)
      </div>
    </div>
  );
}

/**
 * 🎨 SIMPLE VERSION - Just the "?" 
 * For profile pic (800x800)
 */
export function YouTubeLogoSimple() {
  return (
    <div className="w-[800px] h-[800px] bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="text-white text-[420px] font-black leading-none"
      >
        ?
      </motion.div>
    </div>
  );
}

/**
 * 🎨 ALTERNATIVE - "PTF" monogram
 */
export function YouTubeLogoPTF() {
  return (
    <div className="w-[800px] h-[800px] bg-black flex items-center justify-center">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-orange-500 rounded-full blur-3xl opacity-50" />
        
        {/* Letters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative text-[280px] font-black leading-none tracking-tighter"
        >
          <span className="text-white">P</span>
          <span className="text-orange-500">T</span>
          <span className="text-white">F</span>
        </motion.div>
      </div>
    </div>
  );
}

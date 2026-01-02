import React from 'react';
import { motion } from 'motion/react';

/**
 * 🎨 YOUTUBE LOGO - "Model Podnikání"
 * 
 * Minimalist, bold, memorable
 * Use for: Profile pic, watermark
 */

export function YouTubeLogo() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center p-8">
      <div className="relative">
        {/* Main Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative"
        >
          {/* Glow background */}
          <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl" />
          
          {/* Logo container */}
          <div className="relative bg-white rounded-3xl p-12 shadow-2xl">
            <div className="text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-red-600 leading-none">
              M
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
          <div className="text-white text-3xl tracking-wider font-black">
            MODEL PODNIKÁNÍ
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
 * 🎨 SIMPLE VERSION - Just the "M" 
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
        M
      </motion.div>
    </div>
  );
}

/**
 * 🎨 ALTERNATIVE - "MP" monogram (Model Podnikání)
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
          <span className="text-white">M</span>
          <span className="text-orange-500">P</span>
        </motion.div>
      </div>
    </div>
  );
}
import React from 'react';
import { motion } from 'motion/react';

/**
 * 🎨 YOUTUBE BANNER - "Model Podnikání"
 * 
 * Dimensions: 2560x1440 (YouTube recommended)
 * Safe area: Center 1546x423
 */

export function YouTubeBanner() {
  return (
    <div className="w-[2560px] h-[1440px] bg-gradient-to-r from-gray-900 via-black to-gray-900 flex items-center justify-center relative overflow-hidden">
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `repeating-linear-gradient(
                 45deg,
                 transparent,
                 transparent 100px,
                 rgba(255,255,255,0.03) 100px,
                 rgba(255,255,255,0.03) 200px
               )`
             }}
        />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-500 rounded-full blur-[200px] opacity-20" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-red-500 rounded-full blur-[200px] opacity-20" />

      {/* Main content (safe area) */}
      <div className="relative z-10 text-center max-w-[1546px]">
        
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-8 inline-block"
        >
          <div className="text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 leading-none">
            M
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-white text-[120px] font-black tracking-tight mb-6 leading-none">
            MODEL PODNIKÁNÍ
          </h1>
          
          {/* Subtitle */}
          <p className="text-white/60 text-[48px] tracking-wide">
            Rozebírám byznysy za 60 sekund
          </p>
        </motion.div>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 mx-auto w-[400px] h-2 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"
        />
      </div>

      {/* Corner badge */}
      <div className="absolute bottom-12 right-12 text-white/40 text-3xl tracking-widest">
        ZAČNI SPRÁVNĚ • BEZ KECŮ
      </div>
    </div>
  );
}

/**
 * 🎨 ALTERNATIVE BANNER - Minimal
 */
export function YouTubeBannerMinimal() {
  return (
    <div className="w-[2560px] h-[1440px] bg-black flex items-center justify-center relative">
      
      {/* Simple gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      {/* Text */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="text-[100px] font-black text-orange-500">M</div>
          <div className="text-white text-[100px] font-black tracking-tight">
            MODEL PODNIKÁNÍ
          </div>
        </div>
        
        <div className="text-white/50 text-[42px] tracking-widest">
          BYZNYSY ZA 60 SEKUND
        </div>
      </div>
    </div>
  );
}

/**
 * 🎨 BOLD BANNER - High contrast
 */
export function YouTubeBannerBold() {
  return (
    <div className="w-[2560px] h-[1440px] bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 flex items-center justify-center relative overflow-hidden">
      
      {/* Geometric shapes */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/10 rounded-full translate-y-1/2 -translate-x-1/4" />

      {/* Main text */}
      <div className="relative z-10 text-center">
        <div className="text-white text-[140px] font-black tracking-tight leading-none mb-8">
          MODEL PODNIKÁNÍ
        </div>
        
        <div className="text-white/90 text-[52px] font-bold tracking-wide">
          Rozebírám byznysy • Ukazuju jak fungují • Bez keců
        </div>
      </div>
    </div>
  );
}
// Temporary file - jen nový Post8ModelVsNapad komponent

          {/* LEFT: NÁPAD */}
          <div className="bg-gradient-to-br from-red-900/50 to-red-950/50 backdrop-blur rounded-2xl border-2 border-red-500/40 p-4 flex flex-col">
            {/* Header */}
            <div className="text-center mb-3 pb-3 border-b-2 border-red-500/30">
              <div className="text-3xl mb-1">🎲</div>
              <div className="text-xl font-bold text-red-400">NÁPAD</div>
              <div className="text-xs text-red-300/60">Reaktivní chaos</div>
            </div>

            {/* Timeline měsíců */}
            <div className="space-y-1.5 text-sm flex-1">
              <motion.div 
                className="bg-red-950/50 p-2 rounded-lg border border-red-500/20"
                animate={{ 
                  opacity: step >= 0 ? 1 : 0.3,
                  scale: step === 0 ? 1.02 : 1 
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-red-300">M1</span>
                  <span className="text-white text-xs">"Zkusím levněji"</span>
                  <span className="text-red-400 font-bold">-8k</span>
                </div>
              </motion.div>

              <motion.div 
                className="bg-red-950/50 p-2 rounded-lg border border-red-500/20"
                animate={{ 
                  opacity: step >= 1 ? 1 : 0.3,
                  scale: step === 1 ? 1.02 : 1 
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-red-300">M2</span>
                  <span className="text-white text-xs">"Víc reklamy?"</span>
                  <span className="text-red-400 font-bold">-15k</span>
                </div>
              </motion.div>

              <motion.div 
                className="bg-red-950/50 p-2 rounded-lg border border-red-500/20"
                animate={{ 
                  opacity: step >= 2 ? 1 : 0.3,
                  scale: step === 2 ? 1.02 : 1 
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-red-300">M3</span>
                  <span className="text-white text-xs">"Proč nekupují??"</span>
                  <span className="text-red-400 font-bold">-23k</span>
                </div>
              </motion.div>

              <motion.div 
                className="bg-red-950/50 p-2 rounded-lg border border-red-500/20"
                animate={{ 
                  opacity: step >= 3 ? 1 : 0.3,
                  scale: step === 3 ? 1.02 : 1 
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-red-300">M4</span>
                  <span className="text-white text-xs">"Nemám cash..."</span>
                  <span className="text-red-400 font-bold">-28k</span>
                </div>
              </motion.div>

              <motion.div 
                className="bg-red-950/50 p-2 rounded-lg border border-red-500/20"
                animate={{ 
                  opacity: step >= 3 ? 1 : 0.3,
                  scale: step === 3 ? 1.02 : 1 
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-red-300">M5</span>
                  <span className="text-white text-xs">"Půjčím si..."</span>
                  <span className="text-red-400 font-bold">-35k</span>
                </div>
              </motion.div>

              <motion.div 
                className="bg-red-950/50 p-2 rounded-lg border border-red-500/20"
                animate={{ 
                  opacity: step >= 3 ? 1 : 0.3,
                  scale: step === 3 ? 1.02 : 1 
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-red-300">M6</span>
                  <span className="text-white text-xs">"Končím"</span>
                  <span className="text-red-400 font-bold">-40k</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom result */}
            <motion.div 
              className="mt-3 pt-3 border-t-2 border-red-500/30 text-center space-y-1"
              animate={{ scale: step === 4 ? 1.05 : 1 }}
            >
              <div className="text-4xl">💀</div>
              <div className="text-lg font-bold text-red-400">ZTRÁTA -40k</div>
              <div className="text-xs text-red-300/70">Nevíš proč selhal</div>
            </motion.div>
          </div>

          {/* RIGHT: MODEL */}
          <div className="bg-gradient-to-br from-green-900/50 to-emerald-950/50 backdrop-blur rounded-2xl border-2 border-green-500/40 p-4 flex flex-col">
            {/* Header */}
            <div className="text-center mb-3 pb-3 border-b-2 border-green-500/30">
              <div className="text-3xl mb-1">♟️</div>
              <div className="text-xl font-bold text-green-400">MODEL</div>
              <div className="text-xs text-green-300/60">Systém a růst</div>
            </div>

            {/* Timeline měsíců */}
            <div className="space-y-1.5 text-sm flex-1">
              <motion.div 
                className="bg-green-950/50 p-2 rounded-lg border border-green-500/20"
                animate={{ 
                  opacity: step >= 0 ? 1 : 0.3,
                  scale: step === 0 ? 1.02 : 1 
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-green-300">M1</span>
                  <span className="text-white text-xs">"Test 2 ceny"</span>
                  <span className="text-green-400 font-bold">+3k</span>
                </div>
              </motion.div>

              <motion.div 
                className="bg-green-950/50 p-2 rounded-lg border border-green-500/20"
                animate={{ 
                  opacity: step >= 1 ? 1 : 0.3,
                  scale: step === 1 ? 1.02 : 1 
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-green-300">M2</span>
                  <span className="text-white text-xs">"70% na IG"</span>
                  <span className="text-green-400 font-bold">+7k</span>
                </div>
              </motion.div>

              <motion.div 
                className="bg-green-950/50 p-2 rounded-lg border border-green-500/20"
                animate={{ 
                  opacity: step >= 2 ? 1 : 0.3,
                  scale: step === 2 ? 1.02 : 1 
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-green-300">M3</span>
                  <span className="text-white text-xs">"Upravím text"</span>
                  <span className="text-green-400 font-bold">+12k</span>
                </div>
              </motion.div>

              <motion.div 
                className="bg-green-950/50 p-2 rounded-lg border border-green-500/20"
                animate={{ 
                  opacity: step >= 3 ? 1 : 0.3,
                  scale: step === 3 ? 1.02 : 1 
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-green-300">M4</span>
                  <span className="text-white text-xs">"Škáluju co funguje"</span>
                  <span className="text-green-400 font-bold">+18k</span>
                </div>
              </motion.div>

              <motion.div 
                className="bg-green-950/50 p-2 rounded-lg border border-green-500/20"
                animate={{ 
                  opacity: step >= 3 ? 1 : 0.3,
                  scale: step === 3 ? 1.02 : 1 
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-green-300">M5</span>
                  <span className="text-white text-xs">"Najmu člověka"</span>
                  <span className="text-green-400 font-bold">+25k</span>
                </div>
              </motion.div>

              <motion.div 
                className="bg-green-950/50 p-2 rounded-lg border border-green-500/20"
                animate={{ 
                  opacity: step >= 3 ? 1 : 0.3,
                  scale: step === 3 ? 1.02 : 1 
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-green-300">M6</span>
                  <span className="text-white text-xs">"Plánuju Q2"</span>
                  <span className="text-green-400 font-bold">+35k</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom result */}
            <motion.div 
              className="mt-3 pt-3 border-t-2 border-green-500/30 text-center space-y-1"
              animate={{ scale: step === 4 ? 1.05 : 1 }}
            >
              <div className="text-4xl">🚀</div>
              <div className="text-lg font-bold text-green-400">ZISK +100k</div>
              <div className="text-xs text-green-300/70">Víš přesně proč roste</div>
            </motion.div>
          </div>

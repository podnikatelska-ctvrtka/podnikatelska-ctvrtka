import { useState, useEffect } from 'react';
import { Smartphone, Monitor, Tablet } from 'lucide-react';
import { useOrientation } from '../lib/useOrientation';

export function OrientationDebugPanel() {
  const orientation = useOrientation();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Only show in development (check for localhost or dev token)
  const isDev = window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1' ||
                localStorage.getItem('dev-token');
  
  if (!isDev) return null;
  
  const isMobile = dimensions.width < 768;
  const isTablet = dimensions.width >= 768 && dimensions.width < 1024;
  const isDesktop = dimensions.width >= 1024;
  
  // Calculate mobile landscape (for debug purposes only)
  const isMobileLandscape = isMobile && orientation === 'landscape';
  
  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-indigo-600 text-white px-3 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          title="Orientation Debug"
        >
          {orientation === 'portrait' ? '📱' : orientation === 'landscape' ? '📱↔️' : '💻'}
          <span className="text-xs font-bold">{dimensions.width}x{dimensions.height}</span>
        </button>
      ) : (
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-2xl max-w-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm">📐 Orientation Debug</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2 text-xs">
            {/* Device Type */}
            <div className="flex items-center gap-2">
              {isMobile && <Smartphone className="w-4 h-4 text-blue-400" />}
              {isTablet && <Tablet className="w-4 h-4 text-green-400" />}
              {isDesktop && <Monitor className="w-4 h-4 text-purple-400" />}
              <span className="text-gray-400">Device:</span>
              <span className="font-bold">
                {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
              </span>
            </div>
            
            {/* Orientation */}
            <div className="flex items-center gap-2">
              <span className={orientation === 'portrait' ? 'text-2xl' : 'text-2xl rotate-90 inline-block'}>
                📱
              </span>
              <span className="text-gray-400">Orientation:</span>
              <span className={`font-bold ${orientation === 'landscape' ? 'text-green-400' : orientation === 'portrait' ? 'text-blue-400' : 'text-gray-500'}`}>
                {orientation || 'N/A (Desktop)'}
              </span>
            </div>
            
            {/* Mobile Landscape Detection */}
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {isMobileLandscape ? '✅' : '❌'}
              </span>
              <span className="text-gray-400">Mobile Landscape:</span>
              <span className={`font-bold ${isMobileLandscape ? 'text-green-400' : 'text-red-400'}`}>
                {isMobileLandscape ? 'YES' : 'NO'}
              </span>
            </div>
            
            {/* Dimensions */}
            <div className="border-t border-gray-700 pt-2 mt-2">
              <div className="text-gray-400">Viewport:</div>
              <div className="font-mono text-white">
                {dimensions.width} × {dimensions.height}
              </div>
              <div className="text-gray-500 text-[10px] mt-1">
                Smaller: {Math.min(dimensions.width, dimensions.height)}px
              </div>
            </div>
            
            {/* Screen Orientation API */}
            <div className="border-t border-gray-700 pt-2 mt-2">
              <div className="text-gray-400">Screen API:</div>
              <div className="font-mono text-xs text-white">
                {window.screen?.orientation?.type || 'Not supported'}
              </div>
            </div>
            
            {/* Breakpoints */}
            <div className="border-t border-gray-700 pt-2 mt-2">
              <div className="text-gray-400 mb-1">Tailwind Breakpoints:</div>
              <div className="space-y-1">
                <div className={`flex justify-between ${isMobile ? 'text-green-400' : 'text-gray-600'}`}>
                  <span>Mobile:</span>
                  <span>&lt; 768px</span>
                </div>
                <div className={`flex justify-between ${isTablet ? 'text-green-400' : 'text-gray-600'}`}>
                  <span>Tablet:</span>
                  <span>768-1023px</span>
                </div>
                <div className={`flex justify-between ${isDesktop ? 'text-green-400' : 'text-gray-600'}`}>
                  <span>Desktop:</span>
                  <span>&ge; 1024px</span>
                </div>
              </div>
            </div>
            
            {/* Hint Status */}
            <div className="border-t border-gray-700 pt-2 mt-2">
              <div className="text-gray-400 mb-1">Hint Status:</div>
              <div className="text-xs">
                <div>Dismissed: {localStorage.getItem('landscape-hint-dismissed') === 'true' ? '✅' : '❌'}</div>
                <button
                  onClick={() => {
                    localStorage.removeItem('landscape-hint-dismissed');
                    window.location.reload();
                  }}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs w-full"
                >
                  Reset Hint
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

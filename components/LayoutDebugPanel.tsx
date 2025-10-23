import { useState, useEffect } from 'react';
import { useIsMobile } from './ui/use-mobile';
import { X, Maximize2 } from 'lucide-react';

export function LayoutDebugPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useIsMobile();
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [contentWidth, setContentWidth] = useState(0);
  const [computedStyles, setComputedStyles] = useState<any>({});

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      
      // Find main content wrapper - měříme VNĚJŠÍ wrapper (flex-1)
      const contentElement = document.querySelector('[data-lesson-content]') as HTMLElement;
      if (contentElement) {
        setContentWidth(contentElement.offsetWidth);
        const styles = window.getComputedStyle(contentElement);
        
        // 🔍 DEBUG: Log to console
        console.log('🎯 DEBUG PANEL MEASUREMENTS:', {
          element: contentElement,
          className: contentElement.className,
          inlineMaxWidth: contentElement.style.maxWidth,
          computedMaxWidth: styles.maxWidth,
          offsetWidth: contentElement.offsetWidth,
          parent: contentElement.parentElement?.className,
          grandparent: contentElement.parentElement?.parentElement?.className,
        });
        
        setComputedStyles({
          paddingLeft: styles.paddingLeft,
          paddingRight: styles.paddingRight,
          maxWidth: styles.maxWidth,
          width: styles.width,
          inlineMaxWidth: contentElement.style.maxWidth || 'none',
          className: contentElement.className.substring(0, 50),
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-4 z-[100] bg-purple-600 text-white p-2 rounded-lg shadow-xl hover:bg-purple-700"
      >
        <Maximize2 className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed top-20 right-4 z-[100] bg-purple-900 text-white p-4 rounded-lg shadow-2xl max-w-sm text-xs font-mono">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm">🔍 Layout Debug</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-purple-800 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {/* Breakpoint */}
        <div className="bg-purple-800 p-2 rounded">
          <div className="text-purple-300">Breakpoint:</div>
          <div className="font-bold text-lg">
            {isMobile ? '📱 MOBILE' : '🖥️ DESKTOP'}
          </div>
        </div>

        {/* Viewport */}
        <div className="bg-purple-800 p-2 rounded">
          <div className="text-purple-300">Viewport Width:</div>
          <div className="font-bold">{viewportWidth}px</div>
        </div>

        {/* Content Container */}
        <div className="bg-purple-800 p-2 rounded">
          <div className="text-purple-300">Content Container:</div>
          <div className="font-bold">{contentWidth}px</div>
        </div>

        {/* Computed Styles */}
        <div className="bg-purple-800 p-2 rounded">
          <div className="text-purple-300 mb-1">Computed Styles:</div>
          <div className="space-y-1 text-[10px]">
            <div>Class: <span className="font-bold text-yellow-300">{computedStyles.className}</span></div>
            <div>Inline: <span className="font-bold text-green-300">{computedStyles.inlineMaxWidth}</span></div>
            <div>Computed: <span className="font-bold text-red-300">{computedStyles.maxWidth}</span></div>
            <div>PL: <span className="font-bold text-yellow-300">{computedStyles.paddingLeft}</span></div>
            <div>PR: <span className="font-bold text-yellow-300">{computedStyles.paddingRight}</span></div>
            <div>Width: <span className="font-bold text-yellow-300">{computedStyles.width}</span></div>
          </div>
        </div>

        {/* Expected Values */}
        <div className="bg-green-900 p-2 rounded">
          <div className="text-green-300 mb-1">✅ RESPONSIVE 50/50:</div>
          <div className="space-y-1">
            <div>Max-W: <span className="font-bold">max-w-5xl (1024px)</span></div>
            <div>Padding: <span className="font-bold">lg:px-8 / xl:px-12</span></div>
            <div>@1536px (open): <span className="font-bold">1216px area → 96px margins</span></div>
            <div>@1536px (closed): <span className="font-bold">1536px area → 256px margins</span></div>
            <div>@1920px (open): <span className="font-bold">1600px area → 288px margins</span></div>
            <div>@1920px (closed): <span className="font-bold">1920px area → 448px margins</span></div>
            <div className="text-green-400 mt-2">🎯 Works on all screens!</div>
          </div>
        </div>

        {/* DOM Path */}
        <div className="bg-purple-800 p-2 rounded">
          <div className="text-purple-300 mb-1">🎯 Inspect Element:</div>
          <div className="text-[10px] break-all">
            [data-lesson-content]
          </div>
        </div>
      </div>
    </div>
  );
}

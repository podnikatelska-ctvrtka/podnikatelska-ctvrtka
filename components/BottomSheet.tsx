import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  snapPoints?: number[]; // [0.5, 0.9] = 50% a 90% výšky
  defaultSnap?: number; // Index výchozího snap pointu
  maxWidth?: string; // Pro desktop: 'max-w-lg', 'max-w-xl', 'max-w-2xl' atd.
}

export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  snapPoints = [0.5, 0.9],
  defaultSnap = 0,
  maxWidth = 'w-full' // Default plná šířka (pro prioritizační modaly)
}: BottomSheetProps) {
  const [currentSnap, setCurrentSnap] = useState(defaultSnap);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);

  // Zavři sheet při ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Zamkni scroll při otevřeném sheetu + preserve scroll position
  useEffect(() => {
    if (isOpen) {
      // ✅ OKAMŽITĚ uložit a zmrazit - BEFORE cokoliv jiného!
      const currentScroll = window.scrollY;
      scrollPositionRef.current = currentScroll;
      
      // Prevent jakékoliv scrollování (včetně browser auto-scroll)
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScroll}px`;
      document.body.style.width = '100%';
      document.body.style.left = '0';
      document.body.style.right = '0';
    } else {
      // OBNOVIT scroll pozici (instant restore)
      const scrollY = scrollPositionRef.current;
      
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.left = '';
      document.body.style.right = '';
      
      // ✅ INSTANT restore - FORCE instant behavior (no animation!)
      if (scrollY !== undefined) {
        window.scrollTo({ top: scrollY, behavior: 'instant' as ScrollBehavior });
      }
    }

    return () => {
      // Cleanup při unmount
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.left = '';
      document.body.style.right = '';
    };
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const diff = currentY - startY;
    const threshold = 100; // Minimální swipe distance

    if (diff > threshold) {
      // Swipe down
      if (currentSnap > 0) {
        setCurrentSnap(currentSnap - 1);
      } else {
        onClose();
      }
    } else if (diff < -threshold) {
      // Swipe up
      if (currentSnap < snapPoints.length - 1) {
        setCurrentSnap(currentSnap + 1);
      }
    }

    setIsDragging(false);
    setStartY(0);
    setCurrentY(0);
  };

  if (!isOpen) return null;

  const currentHeight = snapPoints[currentSnap] * 100;
  const dragOffset = isDragging ? Math.max(0, currentY - startY) : 0;

  const sheetContent = (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className={`relative ${maxWidth} bg-white rounded-t-3xl shadow-2xl transition-all duration-300 ease-out`}
        style={{
          height: `${currentHeight}vh`,
          transform: `translateY(${dragOffset}px)`,
          maxHeight: '95vh'
        }}
      >
        {/* Handle */}
        <div
          className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
            <h2 className="font-bold text-lg">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto overscroll-contain" style={{ maxHeight: 'calc(95vh - 80px)' }}>
          <div className="px-6 py-4 pb-safe">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  // Render v portalu (mimo React tree)
  return createPortal(sheetContent, document.body);
}

// 🎯 Hook pro Bottom Sheet
export function useBottomSheet() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  return {
    isOpen,
    open,
    close,
    toggle
  };
}

import { useState, useEffect } from 'react';

export function MobileProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { id: 'hero', label: '🎯 Úvod' },
    { id: 'problems', label: '😤 Problémy' },
    { id: 'solution', label: '💡 Řešení' },
    { id: 'testimonials', label: '⭐ Úspěchy' },
    { id: 'benefits', label: '🎁 Co získáte' },
    { id: 'case-study', label: '📈 Příklad' },
    { id: 'order', label: '✨ Registrace' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Určení aktuální sekce
      const sectionElements = sections.map(section => 
        document.querySelector(`[data-section="${section.id}"]`) || 
        document.getElementById(section.id) ||
        document.querySelector(`.${section.id}`)
      ).filter(Boolean);

      let current = 0;
      sectionElements.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            current = index;
          }
        }
      });
      setCurrentSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToRegistration = () => {
    document.getElementById('order')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center' // Vycentruje sekci pro lepší viditelnost tlačítka
    });
  };

  return (
    <>
      {/* Progress Bar - jen na mobile */}
      <div 
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm md:hidden cursor-pointer"
        onClick={scrollToRegistration}
      >
        <div className="flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse flex-shrink-0"></div>
            <span className="text-xs font-semibold text-gray-700 truncate">
              {sections[currentSection]?.label || '🎯 Úvod'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold flex-shrink-0 ml-2 overflow-hidden">
            <span className="flex-shrink-0">✨</span>
            <span className="hidden xs:inline">Registrace</span>
          </div>
        </div>
        
        {/* Progress line */}
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-100 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Spacer pro fixed header */}
      <div className="h-12 md:hidden" />
    </>
  );
}
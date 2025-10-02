export function CriticalCSS() {
  return (
    <style dangerouslySetInnerHTML={{
        __html: `
          /* CLS Prevention */
          * {
            box-sizing: border-box;
          }
          
          /* Prevent layout shifts from fonts */
          html {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
          }
          
          /* Prevent layout shifts from animations */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
          
          /* Reserve space for dynamic content to prevent CLS */
          .hero-section {
            min-height: 600px;
          }
          
          .countdown-banner {
            min-height: 400px;
          }
          
          .compact-testimonials {
            min-height: 300px;
          }
          
          .problems-section {
            min-height: 200px;
          }
          
          .solution-intro {
            min-height: 200px;
          }
          
          .case-study-section {
            min-height: 300px;
          }
          
          .combined-section {
            min-height: 400px;
          }
          
          .sticky-button-container {
            position: fixed;
            right: 1.5rem;
            bottom: 1.5rem;
            width: auto;
            height: auto;
            pointer-events: none;
            z-index: 50;
          }
          
          .sticky-button-container > * {
            pointer-events: auto;
          }
          
          /* Prevent font swap CLS */
          body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            font-display: swap;
          }
          
          /* Critical CSS for above-the-fold content */
          .hero-gradient {
            background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #dbeafe 100%);
          }
          
          .hero-text-gradient {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .bandwagon-box {
            background: linear-gradient(135deg, #f0fdf4 0%, #dbeafe 100%);
            border: 1px solid #bbf7d0;
          }
          
          .social-proof-badge {
            background: #dcfce7;
            color: #15803d;
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            font-weight: 700;
            font-size: 0.875rem;
          }
          
          /* Animation optimizations */
          .motion-reduce {
            animation: none !important;
            transition: none !important;
          }
          
          /* Prevent layout shifts from images and icons */
          img, svg {
            height: auto;
            max-width: 100%;
          }
          
          /* Stable containers for dynamic content */
          .stable-container {
            min-height: 1px;
            position: relative;
          }
          
          /* Tooltip container - reserve space */
          .tooltip-container {
            position: absolute;
            width: 256px;
            min-height: 80px;
            pointer-events: none;
          }
          
          /* Preload critical fonts */
          .font-black {
            font-weight: 900;
          }
          
          .font-bold {
            font-weight: 700;
          }
        `
      }} />
  );
}
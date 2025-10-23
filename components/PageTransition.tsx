import { motion, AnimatePresence } from 'motion/react';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  transitionKey: string | number; // Unikátní key pro each page
  type?: 'fade' | 'slide' | 'scale' | 'blur';
  duration?: number;
}

/**
 * PageTransition - Smooth přechody mezi stránkami
 * 
 * Usage:
 * <PageTransition transitionKey={currentPage} type="slide">
 *   <YourPage />
 * </PageTransition>
 */
export function PageTransition({
  children,
  transitionKey,
  type = 'fade',
  duration = 0.3,
}: PageTransitionProps) {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
    blur: {
      initial: { opacity: 0, filter: 'blur(10px)' },
      animate: { opacity: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, filter: 'blur(10px)' },
    },
  };

  const selectedVariants = variants[type];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        initial={selectedVariants.initial}
        animate={selectedVariants.animate}
        exit={selectedVariants.exit}
        transition={{ duration }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * LessonTransition - Speciální transition pro lekce
 */
export function LessonTransition({
  children,
  lessonId,
}: {
  children: ReactNode;
  lessonId: number;
}) {
  return (
    <PageTransition transitionKey={lessonId} type="slide" duration={0.4}>
      {children}
    </PageTransition>
  );
}

/**
 * ScrollFadeIn - Fade in při scrollování
 */
export function ScrollFadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerChildren - Staggered animace pro child elementy
 */
export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  className = '',
}: {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem - Item pro StaggerChildren
 */
export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

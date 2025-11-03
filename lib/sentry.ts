/**
 * 🚨 SENTRY CUSTOM EVENTS & HELPERS
 * 
 * Helpers pro tracking kritických akcí v aplikaci
 */

import * as Sentry from '@sentry/react';

/**
 * Track kritické akce v kurzu
 */
export const trackCourseEvent = {
  /**
   * Uložení dat do VPC (Lekce 1)
   */
  vpcSave: (data: {
    userId: string;
    segmentName: string;
    hasJobs: boolean;
    hasPains: boolean;
    hasGains: boolean;
  }) => {
    Sentry.addBreadcrumb({
      category: 'course',
      message: 'VPC data saved',
      level: 'info',
      data,
    });
  },

  /**
   * Dokončení lekce
   */
  lessonComplete: (lessonNumber: number, lessonTitle: string) => {
    Sentry.addBreadcrumb({
      category: 'course',
      message: `Lesson ${lessonNumber} completed: ${lessonTitle}`,
      level: 'info',
      data: { lessonNumber, lessonTitle },
    });
  },

  /**
   * FIT Validator validace (Lekce 16)
   */
  fitValidation: (data: {
    userId: string;
    segmentName: string;
    coverageScore: number;
    validationPassed: boolean;
  }) => {
    Sentry.addBreadcrumb({
      category: 'course',
      message: 'FIT Validation completed',
      level: data.validationPassed ? 'info' : 'warning',
      data,
    });
  },

  /**
   * Akční plán dokončen
   */
  actionPlanComplete: (userId: string) => {
    Sentry.addBreadcrumb({
      category: 'course',
      message: 'Action Plan completed',
      level: 'info',
      data: { userId },
    });
  },

  /**
   * Payment failed redirect - business event (ne error!)
   */
  paymentFailedRedirect: (errorType: string) => {
    Sentry.addBreadcrumb({
      category: 'ecommerce',
      message: 'Payment failed redirect',
      level: 'warning',
      data: { 
        errorType,
        timestamp: new Date().toISOString(),
        context: 'OrderPage - Payment Failed URL'
      },
    });
  },
};

/**
 * Track kritické chyby
 */
export const trackError = {
  /**
   * Chyba při ukládání dat
   */
  saveError: (context: string, error: Error, metadata?: Record<string, any>) => {
    Sentry.captureException(error, {
      tags: {
        errorType: 'save_error',
        context,
      },
      extra: metadata,
    });
  },

  /**
   * Chyba při načítání dat
   */
  loadError: (context: string, error: Error, metadata?: Record<string, any>) => {
    Sentry.captureException(error, {
      tags: {
        errorType: 'load_error',
        context,
      },
      extra: metadata,
    });
  },

  /**
   * Chyba v API volání
   */
  apiError: (endpoint: string, error: Error, statusCode?: number) => {
    Sentry.captureException(error, {
      tags: {
        errorType: 'api_error',
        endpoint,
        statusCode: statusCode?.toString(),
      },
    });
  },
};

/**
 * Track user actions
 */
export const trackUserAction = {
  /**
   * Order page - objednávka odeslána
   */
  orderSubmitted: (data: {
    email: string;
    price: number;
    paymentMethod: string;
  }) => {
    Sentry.addBreadcrumb({
      category: 'ecommerce',
      message: 'Order submitted',
      level: 'info',
      data,
    });
  },

  /**
   * Email capture
   */
  emailCaptured: (email: string, source: string) => {
    Sentry.addBreadcrumb({
      category: 'marketing',
      message: 'Email captured',
      level: 'info',
      data: { email, source },
    });
  },
};

/**
 * Set custom tags pro filtering v Sentry
 */
export const setCustomTags = (tags: Record<string, string>) => {
  Object.entries(tags).forEach(([key, value]) => {
    Sentry.setTag(key, value);
  });
};

/**
 * Set custom context
 */
export const setCustomContext = (contextName: string, data: Record<string, any>) => {
  Sentry.setContext(contextName, data);
};

/**
 * 🧪 TEST EVENT - pro testování Sentry v produkci
 */
export const sendTestError = () => {
  try {
    throw new Error('🧪 TEST ERROR - Sentry is working! This is a test from the application.');
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        errorType: 'test_error',
        source: 'manual_test',
      },
      extra: {
        message: 'This is a test error to verify Sentry integration',
        timestamp: new Date().toISOString(),
      },
    });
    
    console.log('🚨 Test error sent to Sentry!');
  }
};

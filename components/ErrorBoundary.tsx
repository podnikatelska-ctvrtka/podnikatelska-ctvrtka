import React, { Component, ReactNode } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import * as Sentry from '@sentry/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  eventId: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, eventId: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, eventId: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // 🚨 POŠLI DO SENTRY
    const eventId = Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
    
    this.setState({ eventId });
    
    console.log('🚨 Error sent to Sentry. Event ID:', eventId);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-6"
              >
                <span className="text-5xl">🔧</span>
              </motion.div>
              
              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Chvilku strpení...
              </h2>
              
              {/* Message */}
              <p className="text-gray-600 mb-2">
                Narazili jsme na technický problém, ale už na tom pracujeme!
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Chyba byla automaticky nahlášena našemu týmu a opravíme ji co nejdříve.
              </p>
              
              {/* Reassurance box */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <p className="text-blue-900 text-sm">
                  ✅ <strong>Vaše data jsou v bezpečí</strong>
                  <br />
                  <span className="text-blue-700">Žádná vaše práce nebyla ztracena.</span>
                </p>
              </div>
              
              {/* Dev mode: Show error details */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg text-left">
                  <p className="text-xs font-mono text-red-800 break-all">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              
              {/* Action buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={this.handleReset}
                  className="w-full gap-2"
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4" />
                  Zkusit znovu
                </Button>
                
                <Button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Obnovit stránku
                </Button>
                
                <a
                  href="/"
                  className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Zpět na hlavní stránku
                </a>
              </div>
              
              {/* Help text - NO SENTRY DIALOG! */}
              <p className="text-gray-400 text-xs mt-6">
                Problémy přetrvávají? Napište nám na{' '}
                <a 
                  href="mailto:kurz@podnikatelskactvrtka.cz" 
                  className="text-blue-600 hover:underline"
                >
                  kurz@podnikatelskactvrtka.cz
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook pro použití error boundary v function components
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return setError;
}

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4"
              >
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Něco se pokazilo
              </h2>
              
              <p className="text-gray-600 mb-4">
                Aplikace narazila na neočekávanou chybu. Zkuste stránku obnovit.
              </p>
              
              {this.state.eventId && (
                <p className="text-sm text-gray-500 mb-6">
                  Chyba byla automaticky nahlášena. ID: {this.state.eventId.substring(0, 8)}
                </p>
              )}
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg text-left">
                  <p className="text-xs font-mono text-red-800 break-all">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              
              <div className="flex gap-3">
                <Button
                  onClick={this.handleReset}
                  className="flex-1 gap-2"
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4" />
                  Zkusit znovu
                </Button>
                
                <Button
                  onClick={() => window.location.reload()}
                  className="flex-1"
                >
                  Obnovit stránku
                </Button>
              </div>
              
              {this.state.eventId && (
                <button
                  onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId || undefined })}
                  className="mt-4 text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  Popsat co se stalo
                </button>
              )}
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

import { Component } from 'react';

import type { ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean, error?: Error };

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
          <div className="max-w-md w-full">
            {/* Card principale */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 text-center space-y-6">
              
              {/* Icône d'erreur animée */}
              <div className="relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <svg 
                    className="w-10 h-10 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z" 
                    />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-400 rounded-full animate-bounce"></div>
              </div>

              {/* Titre principal */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Oups ! Une erreur est survenue
                </h2>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
              </div>

              {/* Message descriptif */}
              <p className="text-gray-600 leading-relaxed text-lg">
                Nous rencontrons un problème technique temporaire. 
                <br />
                <span className="text-sm text-gray-500 mt-2 block">
                  Nos équipes travaillent à résoudre ce problème.
                </span>
              </p>

              {/* Actions */}
              <div className="space-y-3 pt-4">
                <button 
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 active:scale-95"
                  onClick={() => this.setState({ hasError: false, error: undefined })}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Réessayer
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button 
                  className="w-full text-gray-500 hover:text-gray-700 py-3 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:bg-gray-50"
                  onClick={() => window.location.reload()}
                >
                  Recharger la page
                </button>
              </div>

              {/* Informations de développement (optionnel) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 font-medium">
                    Détails techniques
                  </summary>
                  <div className="mt-2 p-4 bg-red-50 border border-red-200 rounded-xl text-xs font-mono text-red-800 max-h-32 overflow-auto">
                    {this.state.error.message}
                    {this.state.error.stack && (
                      <pre className="mt-2 text-red-600">{this.state.error.stack}</pre>
                    )}
                  </div>
                </details>
              )}
            </div>

            {/* Support contact */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Problème persistant ? 
                <a 
                  href="mailto:support@votre-site.com" 
                  className="ml-1 text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
                >
                  Contactez-nous
                </a>
              </p>
            </div>

            {/* Éléments décoratifs */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

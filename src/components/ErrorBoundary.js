'use client';

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-orange-50 p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 border border-teal-200">
            <div className="text-center mb-6">
              <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
                <svg
                  className="w-12 h-12 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-teal-900 mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 mb-6">
                We encountered an unexpected error. Please try refreshing the page.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-orange-400 text-teal-900 py-3 px-4 rounded-lg font-semibold hover:bg-orange-500 transition duration-300"
              >
                Refresh Page
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-teal-100 text-teal-800 py-3 px-4 rounded-lg font-semibold hover:bg-teal-200 transition duration-300"
              >
                Go to Home
              </button>
            </div>

            {/* Show error details in development mode */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-sm">
                <summary className="cursor-pointer font-semibold text-teal-800 mb-2">
                  Error Details (Dev Mode)
                </summary>
                <div className="bg-red-50 border border-red-200 rounded p-3 overflow-auto">
                  <p className="font-mono text-red-800 mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <pre className="text-xs text-red-700 whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

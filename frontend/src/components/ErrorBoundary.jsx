import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page" style={{ textAlign: 'center', paddingTop: 80 }}>
          <div style={{ fontSize: 80, marginBottom: 16 }}>⚠️</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 12, color: '#ff3859', marginTop: 0 }}>Something went wrong</h1>
          <div style={{ color: '#64748b', marginBottom: 32, maxWidth: '600px', margin: '0 auto' }}>
            We've encountered an unexpected error. Please try refreshing the page or contact support if the issue persists.
          </div>
          <button 
            onClick={() => window.location.reload()} 
            style={{ padding: '16px 32px', background: 'linear-gradient(135deg,#ff3859,#ff9800)', color: 'white', border: 'none', borderRadius: 16, cursor: 'pointer', fontWeight: 800, fontSize: 16, boxShadow: '0 10px 20px rgba(255,56,89,0.3)' }}
          >
            Reload Page 🔄
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

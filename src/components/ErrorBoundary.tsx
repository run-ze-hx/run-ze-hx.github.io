import { Component, type ErrorInfo, type ReactNode } from 'react';

interface BoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface BoundaryState {
  error: Error | null;
}

export default class ErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (error) {
      if (this.props.fallback) return this.props.fallback(error, this.reset);
      return (
        <div className="min-h-screen grid place-items-center px-6">
          <div className="max-w-md text-center">
            <div className="font-mono text-xs text-magenta tracking-[0.4em] mb-4 animate-flicker">
              SIGNAL · LOST
            </div>
            <h1 className="font-display text-3xl text-cyan neon-text mb-4">
              COMPONENT_ERROR
            </h1>
            <p className="text-white/60 text-sm mb-6 font-mono break-words">
              {error.message}
            </p>
            <button onClick={this.reset} className="term-btn">
              [ RETRY ]
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

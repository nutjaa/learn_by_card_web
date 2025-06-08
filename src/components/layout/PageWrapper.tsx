import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from '../providers';
import { LoadingSpinner } from '../ui';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = "min-h-screen bg-gray-50" }: PageWrapperProps) {
  return (
    <div className={className}>
      <div className="mx-auto">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
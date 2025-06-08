import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from '../providers';
import { LoadingSpinner } from '../ui';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

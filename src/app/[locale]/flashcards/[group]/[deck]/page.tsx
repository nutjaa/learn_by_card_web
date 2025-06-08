import { Suspense } from 'react';
import { ErrorBoundary } from '../../../../../components/providers';
import { LoadingSpinner } from '../../../../../components/ui';
import { trackPageView } from '../../../../../lib/analytics';

export default async function DeckPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  console.log(locale);

  trackPageView('deck');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>xxxx</Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

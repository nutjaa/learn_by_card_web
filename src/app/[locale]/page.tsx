import { GroupsClient, RunningNavbar } from '@/components/groups/index';
import { ErrorBoundary } from '../../components/providers';
import { Suspense } from 'react';
import { LoadingSpinner } from '../../components/ui';
import { trackPageView } from '../../lib/analytics';
import { safeFetch } from '../../lib/data-fetcher';
import { getCachedGroups } from '../../services/cached-services';

// Simplified fetch function using the cached service
const fetchInitialGroups = (locale: string) =>
  safeFetch(() => getCachedGroups(locale), 'Failed to fetch groups');

// Separate component for the main content
async function HomeContent({ locale }: { locale: string }) {
  const { data: initialGroupsData, error } = await fetchInitialGroups(locale);

  return (
    <>
      <RunningNavbar initialData={initialGroupsData} />
      <main className="p-3">
        <GroupsClient initialData={initialGroupsData} initialError={error} />
      </main>
    </>
  );
}

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = await params;

  trackPageView('home');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <HomeContent locale={locale} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

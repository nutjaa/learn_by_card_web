import { serviceProvider } from '@/services';
import { GroupsClient } from '@/components/groups/index';
import { GroupsData } from '../../types/api';
import { ErrorBoundary } from '../../components/providers';
import { Suspense } from 'react';
import { LoadingSpinner } from '../../components/ui';
import { unstable_cache } from 'next/cache';
import { trackPageView } from '../../lib/analytics';

// Cache the groups fetching for better performance
const getCachedGroups = unstable_cache(
  async (locale: string) => {
    const response = await serviceProvider.groupsApi.fetchGroups(1, locale);
    return {
      ...response,
      groups: response.member,
    } as GroupsData;
  },
  ['initial-groups'],
  {
    revalidate: 300, // 5 minutes
    tags: ['groups-${locale}', 'groups'],
  }
);

async function fetchInitialGroups(locale: string): Promise<{
  data: GroupsData | null;
  error: string | null;
}> {
  try {
    const data = await getCachedGroups(locale);
    return { data, error: null };
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Failed to fetch groups';
    console.error('Failed to fetch groups:', err);
    return { data: null, error };
  }
}

// Separate component for the main content
async function HomeContent({ locale }: { locale: string }) {
  const { data: initialGroupsData, error } = await fetchInitialGroups(locale);

  return (
    <main>
      <GroupsClient initialData={initialGroupsData} initialError={error} />
    </main>
  );
}

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  // Track page view
  trackPageView('home');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <HomeContent locale={locale} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

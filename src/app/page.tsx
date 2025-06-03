import { serviceProvider } from '@/services';
import { GroupsClient } from '@/components/groups/index';
import { GroupsData } from '../types/api';
import { ErrorBoundary } from '../components/providers';
import { Suspense } from 'react';
import { LoadingSpinner } from '../components/ui';
import { unstable_cache } from 'next/cache';
import { trackPageView } from '../lib/analytics';

// Cache the groups fetching for better performance
const getCachedGroups = unstable_cache(
  async () => {
    const response = await serviceProvider.groupsApi.fetchGroups(1);
    return {
      ...response,
      groups: response.member,
    } as GroupsData;
  },
  ['initial-groups'],
  {
    revalidate: 300, // 5 minutes
    tags: ['groups'],
  }
);

async function fetchInitialGroups(): Promise<{
  data: GroupsData | null;
  error: string | null;
}> {
  try {
    const data = await getCachedGroups();
    return { data, error: null };
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Failed to fetch groups';
    console.error('Failed to fetch groups:', err);
    return { data: null, error };
  }
}

// Separate component for the main content
async function HomeContent() {
  const { data: initialGroupsData, error } = await fetchInitialGroups();

  return (
    <main>
      <GroupsClient initialData={initialGroupsData} initialError={error} />
    </main>
  );
}

export default function Home() {
  // Track page view
  trackPageView('home');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <HomeContent />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

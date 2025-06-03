import { APP_CONFIG } from '@/lib/constants';
import { serviceProvider } from '@/services';
import { GroupsClient } from '@/components/groups/index';
import { GroupsData } from '../types/api';

async function fetchInitialGroups(): Promise<{
  data: GroupsData | null;
  error: string | null;
}> {
  try {
    const response = await serviceProvider.groupsApi.fetchGroups(1);
    const data = {
      ...response,
      groups: response.member,
    } as GroupsData;
    return { data, error: null };
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Failed to fetch groups';
    console.error('Failed to fetch groups:', err);
    return { data: null, error };
  }
}

export default async function Home() {
  const { data: initialGroupsData, error } = await fetchInitialGroups();

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">{APP_CONFIG.name}</h1>
        <p className="text-gray-600">{APP_CONFIG.description}</p>
        <p className="text-sm text-gray-500">Version: {APP_CONFIG.version}</p>
      </header>

      <main>
        <GroupsClient initialData={initialGroupsData} initialError={error} />
      </main>
    </div>
  );
}

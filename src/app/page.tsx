import { APP_CONFIG } from '@/lib/constants';
import { serviceProvider } from '@/services';
import { GroupsClient } from '@/components/groups/index';
import { GroupsData } from '../types/api';

export default async function Home() {
  let initialGroupsData: GroupsData | null = null;
  let error: string | null = null;

  try {
    const response = await serviceProvider.groupsApi.fetchGroups(1);
    initialGroupsData = {
      ...response,
      groups: response.member,
    } as GroupsData;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch groups';
  }

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

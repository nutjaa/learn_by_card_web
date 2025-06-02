'use client';

import { APP_CONFIG } from '@/lib/constants';
import { useEffect } from 'react';
import { serviceProvider } from '../services';

export default function Home() {
  useEffect(() => {
    const testGroupsApi = async () => {
      try {
        console.log('Testing Groups API...');

        // Test fetching groups
        console.log('Fetching groups...');
        const groupsResponse = await serviceProvider.groupsApi.fetchGroups(1);
        console.log('Groups Response:', groupsResponse);
        console.log('Total Items:', groupsResponse.totalItems);
        console.log('Groups Data:', groupsResponse.member);

        // Test fetching a specific group (using the first group from the response)
        if (groupsResponse.member.length > 0) {
          const firstGroupId = groupsResponse.member[0].id;
          console.log(`Fetching group with ID: ${firstGroupId}...`);

          const groupResponse = await serviceProvider.groupsApi.fetchGroup(
            firstGroupId
          );
          console.log('Single Group Response:', groupResponse);
        }
      } catch (error) {
        console.error('API Test Error:', error);
      }
    };

    testGroupsApi();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{APP_CONFIG.name}</h1>
      <p className="text-gray-600">{APP_CONFIG.description}</p>
      <p className="text-sm text-gray-500">Version: {APP_CONFIG.version}</p>
    </div>
  );
}

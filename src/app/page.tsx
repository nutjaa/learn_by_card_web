'use client';

import { APP_CONFIG } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { useGroups, useGroup } from '@/hooks/useGroups';

export default function Home() {
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  // React Query hooks
  const {
    data: groupsData,
    isLoading: groupsLoading,
    error: groupsError,
    refetch: refetchGroups,
  } = useGroups(1);

  const {
    data: selectedGroup,
    isLoading: groupLoading,
    error: groupError,
  } = useGroup(selectedGroupId || 0);

  // React Query test
  useEffect(() => {
    if (groupsData) {
      console.log('=== React Query Results ===');
      console.log('Groups from React Query:', groupsData);
      console.log('Processed Groups:', groupsData.groups);

      // Auto-select first group to test individual group query
      if (groupsData.groups.length > 0 && !selectedGroupId) {
        setSelectedGroupId(groupsData.groups[0].id!);
      }
    }
  }, [groupsData, selectedGroupId]);

  useEffect(() => {
    if (selectedGroup) {
      console.log('Selected Group from React Query:', selectedGroup);
    }
  }, [selectedGroup]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{APP_CONFIG.name}</h1>
      <p className="text-gray-600">{APP_CONFIG.description}</p>
      <p className="text-sm text-gray-500">Version: {APP_CONFIG.version}</p>

      <div className="mt-8 space-y-6">
        <div>
          <h2 className="text-lg font-semibold">API Testing</h2>
          <p className="text-gray-600">
            Check the console for API test results
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">React Query Testing</h2>

          {/* Groups List */}
          <div className="mt-4">
            <h3 className="text-md font-medium">Groups List</h3>
            {groupsLoading && (
              <p className="text-blue-600">Loading groups...</p>
            )}
            {groupsError && (
              <p className="text-red-600">Error: {String(groupsError)}</p>
            )}
            {groupsData && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  Total: {groupsData.totalItems} groups
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {groupsData.groups.map((group) => (
                    <div
                      key={group.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedGroupId === group.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedGroupId(group.id!)}
                    >
                      <h4 className="font-medium">{group.name}</h4>
                      <p className="text-2xl">{group.emojis}</p>
                      <p className="text-sm text-gray-500">
                        {group.numActiveThings} things
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Selected Group Details */}
          {selectedGroupId && (
            <div className="mt-6">
              <h3 className="text-md font-medium">Selected Group Details</h3>
              {groupLoading && (
                <p className="text-blue-600">Loading group details...</p>
              )}
              {groupError && (
                <p className="text-red-600">Error: {String(groupError)}</p>
              )}
              {selectedGroup && (
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold">{selectedGroup.name}</h4>
                  <p className="text-2xl my-2">{selectedGroup.emojis}</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>ID: {selectedGroup.id}</p>
                    <p>Sort Order: {selectedGroup.sortOrder}</p>
                    <p>Active Things: {selectedGroup.numActiveThings}</p>
                    <p>Active Decks: {selectedGroup.numActiveDecks}</p>
                    <p>
                      Translations:{' '}
                      {selectedGroup.groupTranslations?.length || 0}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="mt-6">
            <button
              onClick={() => refetchGroups()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refetch Groups
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

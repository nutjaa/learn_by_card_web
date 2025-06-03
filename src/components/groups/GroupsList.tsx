// src/components/groups/GroupsList.tsx
'use client';

import { UseQueryResult } from '@tanstack/react-query';
import { GroupCard } from './GroupCard';
import { LoadingSpinner, ErrorMessage } from '@/components/ui';
import { GroupsData } from '../../types/api';

interface GroupsListProps {
  query: UseQueryResult<GroupsData, Error>;
  initialError: string | null;
  selectedGroupId: number | null;
  onGroupSelect: (id: number) => void;
}

export function GroupsList({
  query,
  initialError,
  selectedGroupId,
  onGroupSelect,
}: GroupsListProps) {
  const { data, isLoading, error, refetch } = query;
  const displayError = error || initialError;

  if (isLoading && !data) {
    return <LoadingSpinner />;
  }

  if (displayError) {
    return <ErrorMessage message={displayError} onRetry={() => refetch()} />;
  }

  if (!data?.groups?.length) {
    return <div className="text-gray-500">No groups found</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">Total: {data.totalItems} groups</p>
        <button
          onClick={() => refetch()}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            isSelected={selectedGroupId === group.id}
            onClick={() => onGroupSelect(group.id)}
          />
        ))}
      </div>
    </div>
  );
}

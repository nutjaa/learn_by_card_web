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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {data.groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            isSelected={selectedGroupId === group.id}
            onClick={() => onGroupSelect(group.id)}
          />
        ))}
      </div>
    </>
  );
}

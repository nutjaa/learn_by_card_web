// src/components/groups/GroupsList.tsx
'use client';

import { UseQueryResult } from '@tanstack/react-query';
import { GroupCard } from './GroupCard';
import { LoadingSpinner, ErrorMessage } from '@/components/ui';
import { GroupsResponse } from '../../services';

interface GroupsListProps {
  query: UseQueryResult<GroupsResponse, Error>;
  initialError: string | null;
}

export function GroupsList({ query, initialError }: GroupsListProps) {
  const { data, isLoading, error, refetch } = query;
  const displayError = error || initialError;

  if (isLoading && !data) {
    return <LoadingSpinner />;
  }

  if (displayError) {
    return <ErrorMessage message={displayError} onRetry={() => refetch()} />;
  }

  if (!data?.member?.length) {
    return <div className="text-gray-500">No groups found</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {data.member.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            isSelected={false} // Replace with actual selection logic if needed
          />
        ))}
      </div>
    </>
  );
}

import { LoadingSpinner, ErrorMessage } from '@/components/ui/index';
import { UseQueryResult } from '@tanstack/react-query';
import { Group } from '../../types';

interface GroupDetailsProps {
  query: UseQueryResult<Group, Error>;
  groupId: number;
}

export function GroupDetails({ query }: GroupDetailsProps) {
  const { data: group, isLoading, error } = query;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={String(error)} />;
  }

  if (!group) {
    return <div className="text-gray-500">Group not found</div>;
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h4 className="font-semibold">{group.name}</h4>
      <p className="text-2xl my-2">{group.emojis}</p>
      <div className="text-sm text-gray-600 space-y-1">
        <p>ID: {group.id}</p>
        <p>Sort Order: {group.sortOrder}</p>
        <p>Active Things: {group.numActiveThings}</p>
        <p>Active Decks: {group.numActiveDecks}</p>
        <p>Translations: {group.groupTranslations?.length || 0}</p>
      </div>
    </div>
  );
}

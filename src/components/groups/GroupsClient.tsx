// src/components/groups/GroupsClient.tsx
'use client';

import { GroupsList } from './GroupsList';
import { useGroups } from '@/hooks/useGroups';
import { useLocale } from '../providers/LocaleProvider';
import { GroupsResponse } from '../../services';

interface GroupsClientProps {
  initialData: GroupsResponse | null;
  initialError: string | null;
}

export function GroupsClient({ initialData, initialError }: GroupsClientProps) {
  const locale = useLocale();

  const groupsQuery = useGroups(1, initialData, locale);

  return (
    <div className="space-y-6">
      <section>
        <GroupsList query={groupsQuery} initialError={initialError} />
      </section>
    </div>
  );
}

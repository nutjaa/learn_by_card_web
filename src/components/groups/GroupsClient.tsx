// src/components/groups/GroupsClient.tsx
'use client';

import { GroupsList } from './GroupsList';
import { useGroups } from '@/hooks/useGroups';
import { GroupsData } from '../../types/api';
import { useLocale } from '../providers/LocaleProvider';

interface GroupsClientProps {
  initialData: GroupsData | null;
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

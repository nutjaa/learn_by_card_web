// src/components/groups/GroupsClient.tsx
'use client';

import { useState } from 'react';
import { GroupsList } from './GroupsList';
import { GroupDetails } from './GroupDetails';
import { useGroups, useGroup } from '@/hooks/useGroups';
import { GroupsData } from '../../types/api';
import { useLocale } from '../providers/LocaleProvider';

interface GroupsClientProps {
  initialData: GroupsData | null;
  initialError: string | null;
}

export function GroupsClient({ initialData, initialError }: GroupsClientProps) {
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  const locale = useLocale();

  const groupsQuery = useGroups(1, initialData, locale);
  const groupQuery = useGroup(selectedGroupId || 0);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold mb-4">Groups</h2>
        <GroupsList
          query={groupsQuery}
          initialError={initialError}
          selectedGroupId={selectedGroupId}
          onGroupSelect={setSelectedGroupId}
        />
      </section>

      {selectedGroupId && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Group Details</h2>
          <GroupDetails query={groupQuery} groupId={selectedGroupId} />
        </section>
      )}
    </div>
  );
}

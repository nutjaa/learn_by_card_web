import { useQuery } from '@tanstack/react-query';
import { serviceProvider } from '@/services';
import { Group } from '@/types/group';

// Query keys
export const groupsQueryKeys = {
  all: ['groups'] as const,
  lists: () => [...groupsQueryKeys.all, 'list'] as const,
  list: (page: number) => [...groupsQueryKeys.lists(), page] as const,
  details: () => [...groupsQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...groupsQueryKeys.details(), id] as const,
};

// Fetch groups with pagination
export function useGroups(page: number = 1) {
  return useQuery({
    queryKey: groupsQueryKeys.list(page),
    queryFn: () => serviceProvider.groupsApi.fetchGroups(page),
    select: (data) => ({
      ...data,
      groups: data.member.map((group) => Group.fromJSON(group)),
    }),
  });
}

// Fetch single group
export function useGroup(id: number) {
  return useQuery({
    queryKey: groupsQueryKeys.detail(id),
    queryFn: () => serviceProvider.groupsApi.fetchGroup(id),
    select: (data) => Group.fromJSON(data),
    enabled: !!id, // Only run query if id exists
  });
}

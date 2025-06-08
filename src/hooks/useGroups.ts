import { useQuery } from '@tanstack/react-query';
import { GroupsResponse, serviceProvider } from '@/services';
import { Group } from '@/types/group';

// Query keys
export const groupsQueryKeys = {
  all: ['groups'] as const,
  lists: () => [...groupsQueryKeys.all, 'list'] as const,
  list: (page: number, locale: string) =>
    [...groupsQueryKeys.lists(), page, locale] as const,
  details: () => [...groupsQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...groupsQueryKeys.details(), id] as const,
};

// Fetch groups with pagination
export function useGroups(
  page: number = 1,
  initialData: GroupsResponse | null = null,
  locale: string
) {
  return useQuery<GroupsResponse, Error, GroupsResponse>({
    queryKey: groupsQueryKeys.list(page, locale),
    queryFn: () => serviceProvider.groupsApi.fetchGroups(page, locale),
    select: (data: GroupsResponse): GroupsResponse => ({
      ...data,
      member: data.member.map((group) => Group.fromJSON(group)),
    }),
    // Convert GroupsData back to GroupsResponse format if initialData exists
    initialData: initialData
      ? {
          ...initialData,
          member: initialData.member.map((group) => Group.fromJSON(group)),
        }
      : undefined,
    staleTime: 1000 * 60 * 5,
  });
}

// Fetch single group
export function useGroup(id: number) {
  return useQuery({
    queryKey: groupsQueryKeys.detail(id),
    queryFn: () => serviceProvider.groupsApi.fetchGroup(id),
    select: (data) => Group.fromJSON(data),
    enabled: !!id,
  });
}

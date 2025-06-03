/* eslint-disable @typescript-eslint/no-explicit-any */
import { Group } from './group';
import { GroupsResponse } from '@/services/api/interfaces';

// Utility type to transform API response to client-ready data
export type TransformGroupsResponse<T extends { member: any[] }> = Omit<
  T,
  'member'
> & {
  groups: Group[];
};

export type GroupsData = TransformGroupsResponse<GroupsResponse>;

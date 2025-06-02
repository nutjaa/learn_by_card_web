import { Group } from '../../types/group';

export interface GroupsResponse {
  '@context': string;
  '@id': string;
  '@type': string;
  totalItems: number;
  member: Group[];
}

export interface IGroupsApiService {
  fetchGroups(page?: number): Promise<GroupsResponse>;
  fetchGroup(id: number): Promise<Group>;
}

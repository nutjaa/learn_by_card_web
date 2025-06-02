import { BaseApiService } from './base';
import { Group } from '../../types/group';
import { IGroupsApiService, GroupsResponse } from './interfaces';

export class GroupsApiService
  extends BaseApiService
  implements IGroupsApiService
{
  // Public API methods
  async fetchGroups(page: number = 1): Promise<GroupsResponse> {
    return this.request<GroupsResponse>(`/groups?page=${page}`);
  }

  async fetchGroup(id: number): Promise<Group> {
    return this.request<Group>(`/group/${id}`);
  }
}

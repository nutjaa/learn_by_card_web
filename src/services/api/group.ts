import { BaseApiService } from './base';
import { Group } from '../../types/group';
import { IGroupsApiService, GroupsResponse } from './interfaces';
import { getLanguageIdLocale } from '../../lib/language-utils';

export class GroupsApiService
  extends BaseApiService
  implements IGroupsApiService
{
  // Public API methods
  async fetchGroups(page: number, locale: string): Promise<GroupsResponse> {
    const languageId = getLanguageIdLocale(locale);
    return this.request<GroupsResponse>(
      `/groups?page=${page}&language=${languageId}`
    );
  }

  async fetchGroup(id: number): Promise<Group> {
    return this.request<Group>(`/group/${id}`);
  }
}

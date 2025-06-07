import { Group, Language } from '../../types';

export interface GroupsResponse {
  '@context': string;
  '@id': string;
  '@type': string;
  totalItems: number;
  member: Group[];
}

export interface IGroupsApiService {
  fetchGroups(page: number, locale: string): Promise<GroupsResponse>;
  fetchGroup(id: number): Promise<Group>;
}

export interface LanguagesResponse {
  '@context': string;
  '@id': string;
  '@type': string;
  totalItems: number;
  member: Language[];
}

export interface ILanguagesApiService {
  fetchLanguages(): Promise<LanguagesResponse>;
}

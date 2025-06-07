import { Deck, Group, Language, Style } from '../../types';

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

export interface StylesResponse {
  '@context': string;
  '@id': string;
  '@type': string;
  totalItems: number;
  member: Style[];
}

export interface IStylesApiService {
  fetchStyles(page: number, locale: string): Promise<StylesResponse>;
}

export interface IDecksApiService {
  fetchDecks(page: number, groupId: number): Promise<DecksResponse>;
}

export interface DecksResponse {
  '@context': string;
  '@id': string;
  '@type': string;
  totalItems: number;
  member: Deck[];
}

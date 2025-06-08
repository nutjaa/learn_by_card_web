import { Deck, Flashcard, Group, Language, Style } from '../../types';

export interface ApiCollectionResponse<T> {
  '@context': string;
  '@id': string;
  '@type': string;
  totalItems: number;
  member: T[];
}

export type GroupsResponse = ApiCollectionResponse<Group>;
export type LanguagesResponse = ApiCollectionResponse<Language>;
export type StylesResponse = ApiCollectionResponse<Style>;
export type DecksResponse = ApiCollectionResponse<Deck>;
export type FlashcardsResponse = ApiCollectionResponse<Flashcard>;

export interface IGroupsApiService {
  fetchGroups(page: number, locale: string): Promise<GroupsResponse>;
  fetchGroup(id: number): Promise<Group>;
}

export interface ILanguagesApiService {
  fetchLanguages(): Promise<LanguagesResponse>;
}

export interface IStylesApiService {
  fetchStyles(page: number, locale: string): Promise<StylesResponse>;
}

export interface IDecksApiService {
  fetchDecks(page: number, groupId: number): Promise<DecksResponse>;
}

export interface IFlashcardsApiService {
  fetchFlashcards(
    page: number,
    deckId: number,
    locale: string
  ): Promise<FlashcardsResponse>; 
}
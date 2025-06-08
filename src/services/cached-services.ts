import { serviceProvider } from './index';
import { createCachedFetcher } from '../lib/cache';

export const getCachedStyles = createCachedFetcher(
  async (locale: string) => serviceProvider.stylesApi.fetchStyles(1, locale),
  'initial-styles',
  ['styles']
);

export const getCachedDecks = createCachedFetcher(
  async (groupId: number) => serviceProvider.decksApi.fetchDecks(1, groupId),
  'initial-decks',
  ['decks']
);

export const getCachedGroups = createCachedFetcher(
  async (locale: string) => {
    return await serviceProvider.groupsApi.fetchGroups(1, locale);
  },
  'initial-groups',
  ['groups'] // Note: you had duplicate 'groups' tags, kept as is
);

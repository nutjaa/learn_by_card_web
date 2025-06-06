export const APP_CONFIG = {
  name: 'Learn by Card',
  description: 'A flashcard learning application',
  version: '1.0.0',
} as const;

export const ROUTES = {
  home: '/',
  cards: '/cards',
  learn: '/learn',
  api: {
    cards: '/api/cards',
  },
} as const;

export const SUPPORTED_LOCALES = ['en', 'fi', 'th', 'ms'];
export const DEFAULT_LOCALE = 'en';

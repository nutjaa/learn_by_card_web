import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './constants';

export function getLanguageCodeFromUrl(pathname?: string): string {
  // For SSR, use provided pathname; for client, use window.location
  let currentPathname: string;

  if (pathname) {
    currentPathname = pathname;
  } else if (typeof window !== 'undefined') {
    currentPathname = window.location.pathname;
  } else {
    return DEFAULT_LOCALE;
  }

  const segments = currentPathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // Check if first segment is a valid language code
  if (firstSegment && SUPPORTED_LOCALES.includes(firstSegment)) {
    return firstSegment;
  }

  return DEFAULT_LOCALE;
}

export function getLanguageIdLocale(locale?: string): number {
  switch (locale) {
    case 'fi':
      return 160;
    case 'th':
      return 557;
    case 'ms':
      return 332;
    default:
      return 147; // English
  }
}

export function buildUrlWithLanguage(
  path: string,
  languageCode: string
): string {
  // Remove leading slash and any existing language code
  const cleanPath = path.replace(/^\/[a-z]{2}(\/|$)/, '/').replace(/^\/+/, '');
  return `/${languageCode}${cleanPath ? `/${cleanPath}` : ''}`;
}

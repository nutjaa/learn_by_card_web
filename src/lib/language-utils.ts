export const SUPPORTED_LOCALES = ['en', 'fi', 'th', 'ms'];
export const DEFAULT_LOCALE = 'en';

export function getLanguageCodeFromUrl(): string {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  const pathname = window.location.pathname;
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // Check if first segment is a valid language code
  if (firstSegment && SUPPORTED_LOCALES.includes(firstSegment)) {
    return firstSegment;
  }

  return DEFAULT_LOCALE;
}

export function buildUrlWithLanguage(
  path: string,
  languageCode: string
): string {
  // Remove leading slash and any existing language code
  const cleanPath = path.replace(/^\/[a-z]{2}(\/|$)/, '/').replace(/^\/+/, '');
  return `/${languageCode}${cleanPath ? `/${cleanPath}` : ''}`;
}

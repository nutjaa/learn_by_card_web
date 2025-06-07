import { Suspense } from 'react';
import { ErrorBoundary } from '../../../../components/providers';
import { trackPageView } from '../../../../lib/analytics';
import { LoadingSpinner } from '../../../../components/ui';
import { safeFetch } from '../../../../lib/data-fetcher';
import {
  getCachedStyles,
  getCachedDecks,
} from '../../../../services/cached-services';

// Simplified fetch functions
const fetchInitialStyles = (locale: string) =>
  safeFetch(() => getCachedStyles(locale), 'Failed to fetch styles');

const fetchInitialDecks = (groupId: number) =>
  safeFetch(() => getCachedDecks(groupId), 'Failed to fetch decks');

function extractStyleId(styleUrl: string): number | null {
  const match = styleUrl.match(/\/style\/(\d+)$/);
  return match ? parseInt(match[1]) : null;
}

async function GroupPageContent({
  locale,
  group,
}: {
  locale: string;
  group: string;
}) {
  const [
    { data: stylesData, error: stylesError },
    { data: decksData, error: decksError },
  ] = await Promise.all([
    fetchInitialStyles(locale),
    fetchInitialDecks(parseInt(group.split('-')[0])),
  ]);

  // Handle errors
  if (stylesError || decksError) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="mt-2 text-gray-600">{stylesError || decksError}</p>
      </div>
    );
  }

  const firstDeck = decksData?.member[0];
  if (firstDeck && stylesData) {
    const styleId = extractStyleId(firstDeck.style as string);
    const style = stylesData.member.find((s) => s.id === styleId);

    if (style) {
      const deckUrl = `/${locale}/flashcards/deck/${firstDeck.id}`;
      const styleUrl = `/${locale}/flashcards/style/${style.id}`;

      return (
        <div className="p-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 className="text-xl font-semibold mb-4">
              Redirecting to deck...
            </h1>
            <div className="space-y-3">
              <div>
                <a
                  href={deckUrl}
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  Go to Deck
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Style: {style.name}
                </p>
                <a
                  href={styleUrl}
                  className="inline-block bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  Go to Style
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold">Group Not Found</h1>
        <p className="mt-2 text-gray-600">
          The group you are looking for does not exist or has no decks
          available.
        </p>
      </div>
    </div>
  );
}

export default async function GroupPage({
  params,
}: {
  params: { locale: string; group: string };
}) {
  const { locale, group } = await params;

  console.log('GroupPage params:', { locale, group });
  trackPageView('group detail');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <GroupPageContent locale={locale} group={group} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

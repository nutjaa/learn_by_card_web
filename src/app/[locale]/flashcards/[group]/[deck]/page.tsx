import { trackPageView } from '../../../../../lib/analytics';
import { PageWrapper } from '../../../../../components/layout';
import { safeFetch } from '../../../../../lib/data-fetcher';
import {
  getCachedFlashcards,
  getCachedGroups,
} from '../../../../../services/cached-services';
import { RunningNavbar } from '../../../../../components/groups';
import { FlashcardsClient } from '../../../../../components/flashcards/FlashcardsClient';

const fetchInitialFlashcards = (locale: string, deckId: number) =>
  safeFetch(
    () => getCachedFlashcards(deckId, locale),
    'Failed to fetch flashcards'
  );

const fetchInitialGroups = (locale: string) =>
  safeFetch(() => getCachedGroups(locale), 'Failed to fetch groups');

async function DeckPageContent({
  locale,
  deck,
}: {
  locale: string;
  deck: string;
}) {
  const deckId = parseInt(deck.split('-')[0]);

  const [
    { data: flashcardsData, error: flashcardsError },
    { data: groupsData },
  ] = await Promise.all([
    fetchInitialFlashcards(locale, deckId),
    fetchInitialGroups(locale),
  ]);

  return (
    <>
      <RunningNavbar initialData={groupsData} />
      <main>
        <FlashcardsClient
          deckId={deckId}
          initialData={flashcardsData}
          initialError={flashcardsError}
        />
      </main>
    </>
  );
}

export default async function DeckPage({
  params,
}: {
  params: { locale: string; deck: string };
}) {
  const { locale, deck } = await params;

  trackPageView('deck');

  return (
    <PageWrapper>
      <DeckPageContent locale={locale} deck={deck} />
    </PageWrapper>
  );
}

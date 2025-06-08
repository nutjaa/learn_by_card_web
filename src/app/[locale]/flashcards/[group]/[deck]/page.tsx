import { trackPageView } from '../../../../../lib/analytics';
import { PageWrapper } from '../../../../../components/layout';
import { safeFetch } from '../../../../../lib/data-fetcher';
import {
  getCachedFlashcards,
  getCachedGroups,
} from '../../../../../services/cached-services';
import { RunningNavbar } from '../../../../../components/groups';

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
  const [
    { data: flashcardsData, error: flashcardsError },
    { data: groupsData, error: groupsError },
  ] = await Promise.all([
    fetchInitialFlashcards(locale, parseInt(deck.split('-')[0])),
    fetchInitialGroups(locale),
  ]);

  return (
    <>
      <RunningNavbar initialData={groupsData} />
      <main className="p-3">xxxx</main>
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

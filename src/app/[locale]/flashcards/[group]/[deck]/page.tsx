import { trackPageView } from '../../../../../lib/analytics';
import { PageWrapper } from '../../../../../components/layout';
import { safeFetch } from '../../../../../lib/data-fetcher';
import {
  getCachedFlashcards,
  getCachedGroups,
} from '../../../../../services/cached-services';
import { RunningNavbar } from '../../../../../components/groups';
import { FlashcardsClient } from '../../../../../components/flashcards/FlashcardsClient';

export async function generateStaticParams() {
  return [
    { locale: 'locale', group: 'group', deck: 'deck' }, // Single route that handles all client-side routing
  ];
}

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
  group,
}: {
  locale: string;
  deck: string;
  group: string;
}) {
  const deckId = parseInt(deck.split('-')[0]);
  const groupId = parseInt(group.split('-')[0]);
  const [
    { data: flashcardsData, error: flashcardsError },
    { data: groupsData },
  ] = await Promise.all([
    fetchInitialFlashcards(locale, deckId),
    fetchInitialGroups(locale),
  ]);

  const groupData = groupsData?.member?.find((g) => g.id === groupId);

  return (
    <>
      <RunningNavbar initialData={groupsData} />
      <FlashcardsClient
        deckId={deckId}
        group={groupData}
        initialData={flashcardsData}
        initialError={flashcardsError}
      />
    </>
  );
}

export default async function DeckPage({
  params,
}: {
  params: Promise<{ locale: string; group: string; deck: string }>;
}) {
  // Await params before destructuring its properties
  const resolvedParams = await params;
  const { locale, deck, group } = resolvedParams;

  trackPageView('deck');

  return (
    <PageWrapper>
      <DeckPageContent locale={locale} deck={deck} group={group} />
    </PageWrapper>
  );
}

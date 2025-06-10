import { trackPageView } from '../../../../../lib/analytics';
import { PageWrapper } from '../../../../../components/layout';
import { safeFetch } from '../../../../../lib/data-fetcher';
import {
  getCachedDecks,
  getCachedFlashcards,
  getCachedGroups,
  getCachedStyles,
} from '../../../../../services/cached-services';
import { RunningNavbar } from '../../../../../components/groups';
import { FlashcardsClient } from '../../../../../components/flashcards/FlashcardsClient';
import { SUPPORTED_LOCALES } from '../../../../../lib/constants';
import { createSlug } from '../../../../../utils/string';

function extractStyleId(styleUrl: string): number | null {
  const match = styleUrl.match(/\/style\/(\d+)$/);
  return match ? parseInt(match[1]) : null;
}

export async function generateStaticParams() {
  // Get all supported locales from your constants
  const locales = SUPPORTED_LOCALES;
  const paths = [];

  // For each locale, fetch all groups
  for (const locale of locales) {
    try {
      const { data: groupsData } = await safeFetch(
        () => getCachedGroups(locale),
        'Failed to fetch groups for static paths'
      );

      // If we have groups data, process each group
      if (groupsData?.member) {
        for (const group of groupsData.member) {
          const groupId = group.id;
          const groupSlug = createSlug(group.name);
          
          // For each group, fetch its decks
          const { data: decksData } = await safeFetch(
            () => getCachedDecks(groupId),
            `Failed to fetch decks for group ${groupId}`
          );
          
          if (decksData?.member) {
            // For each deck, fetch style information to create proper slugs
            const { data: stylesData } = await safeFetch(
              () => getCachedStyles(locale),
              'Failed to fetch styles'
            );
            
            for (const deck of decksData.member) {
              const deckId = deck.id;
              
              // Extract style ID and find matching style for deck name/slug
              const styleId = extractStyleId(deck.style as string);
              const style = stylesData?.member?.find(s => s.id === styleId);
              
              const deckSlug = style ? createSlug(style.name) : '';
              
              paths.push({
                locale,
                group: `${groupId}-${groupSlug}`,
                deck: `${deckId}-${deckSlug}`
              });
            }
          }
        }
      }
    } catch (error) {
      console.error(`Failed to generate paths for locale ${locale}:`, error);
    }
  }

  return paths;
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
 
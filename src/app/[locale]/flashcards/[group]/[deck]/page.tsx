import { Suspense } from 'react';
import { ErrorBoundary } from '../../../../../components/providers';
import { LoadingSpinner } from '../../../../../components/ui';
import { trackPageView } from '../../../../../lib/analytics';
import { PageWrapper } from '../../../../../components/layout';
import { safeFetch } from '../../../../../lib/data-fetcher';
import { getCachedFlashcards } from '../../../../../services/cached-services';

const fetchInitialFlashcards = (locale: string, deckId: number) =>
  safeFetch(() => getCachedFlashcards(deckId, locale), 'Failed to fetch flashcards');


async function DeckPageContent({
  locale,
  deck,
}: {
  locale: string;
  deck: string;
}) {
  const {  data: flashcardsData, error: error } = await fetchInitialFlashcards(locale, parseInt(deck.split('-')[0]));

  console.log(flashcardsData);

  return (
   <>xxxx</>
  );
}

export default async function DeckPage({
  params,
}: {
  params: { locale: string , deck: string };
}) {
  const { locale, deck } = await params; 

  trackPageView('deck');

  return (
    <PageWrapper><DeckPageContent locale={locale} deck={deck}/></PageWrapper>
  );
}

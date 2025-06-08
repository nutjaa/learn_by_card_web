'use client';

import { useFlashcards } from '../../hooks/useFlashcards';
import { FlashcardsResponse } from '../../services';
import { useLocale } from '../providers/LocaleProvider';

interface FlashcardsClientProps {
  initialData: FlashcardsResponse | null;
  deckId: number;
  initialError: string | null;
}

export function FlashcardsClient({
  initialData,
  deckId,
}: FlashcardsClientProps) {
  const locale = useLocale();

  const flashcardsQuery = useFlashcards(1, deckId, locale, initialData);

  console.log('FlashcardsClient', flashcardsQuery);

  return <></>;
}

import { useQuery } from '@tanstack/react-query';
import { FlashcardsResponse, serviceProvider } from '@/services';
import { Flashcard } from '@/types/index';

// Query keys
export const flashcardsQueryKeys = {
  all: ['groups'] as const,
  lists: () => [...flashcardsQueryKeys.all, 'list'] as const,
  list: (page: number, locale: string) =>
    [...flashcardsQueryKeys.lists(), page, locale] as const,
  details: () => [...flashcardsQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...flashcardsQueryKeys.details(), id] as const,
};

export function useFlashcards(
  page: number = 1,
  deckId: number,
  locale: string,
  initialData: FlashcardsResponse | null = null
) {
  return useQuery<FlashcardsResponse, Error, FlashcardsResponse>({
    queryKey: flashcardsQueryKeys.list(page, locale),
    queryFn: () =>
      serviceProvider.flashcardsApi.fetchFlashcards(page, deckId, locale),
    select: (data: FlashcardsResponse): FlashcardsResponse => ({
      ...data,
      member: data.member.map((flashcard) => Flashcard.fromJSON(flashcard)),
    }),
    initialData: initialData
      ? {
          ...initialData,
          member: initialData.member.map((flashcard) =>
            Flashcard.fromJSON(flashcard)
          ),
        }
      : undefined,
    staleTime: 1000 * 60 * 5,
  });
}

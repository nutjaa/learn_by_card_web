import { BaseApiService } from './base';
import { IFlashcardsApiService, FlashcardsResponse } from './interfaces';
import { getLanguageIdLocale } from '../../lib/language-utils';

export class FlashcardsApiService
  extends BaseApiService
  implements IFlashcardsApiService
{
  // Public API methods
  async fetchFlashcards(
    page: number,
    deckId: number,
    locale: string
  ): Promise<FlashcardsResponse> {
    const languageId = getLanguageIdLocale(locale);
    return this.request<FlashcardsResponse>(
      `/flashcards/full?page=${page}&deck.id=${deckId}&language=${languageId}`
    );
  }
}

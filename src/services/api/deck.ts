import { BaseApiService } from './base';
import { IDecksApiService, DecksResponse } from './interfaces';

export class DecksApiService
  extends BaseApiService
  implements IDecksApiService
{
  // Public API methods
  async fetchDecks(page: number, groupId: number): Promise<DecksResponse> {
    return this.request<DecksResponse>(
      `/decks?page=${page}&group.id=${groupId}`
    );
  }
}

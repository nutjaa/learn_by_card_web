import { BaseApiService } from './base';
import { ILanguagesApiService, LanguagesResponse } from './interfaces';

export class LanguageApiService
  extends BaseApiService
  implements ILanguagesApiService
{
  // Public API methods
  async fetchLanguages(): Promise<LanguagesResponse> {
    return this.request<LanguagesResponse>(`/languages`);
  }
}

import { BaseApiService } from './base';
import { StylesResponse, IStylesApiService } from './interfaces';
import { getLanguageIdLocale } from '../../lib/language-utils';

export class StylesApiService
  extends BaseApiService
  implements IStylesApiService
{
  // Public API methods
  async fetchStyles(page: number, locale: string): Promise<StylesResponse> {
    const languageId = getLanguageIdLocale(locale);
    return this.request<StylesResponse>(
      `/styles?page=${page}&language=${languageId}`
    );
  }
}

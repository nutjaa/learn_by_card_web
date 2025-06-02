/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseModel } from './base';

export class Language extends BaseModel {
  alpha3?: string;
  englishName?: string;
  localName?: string;
  unicode?: string;

  constructor(data: Partial<Language>) {
    super(data);
    this.alpha3 = data.alpha3 || '';
    this.englishName = data.englishName || '';
    this.localName = data.localName || '';
    this.unicode = data.unicode || '';
  }

  static fromJSON(json: Record<string, any>): Language {
    return new Language({
      id: json.id,
      alpha3: json.alpha3 || '',
      englishName: json.englishName || '',
      localName: json.localName || '',
      unicode: json.unicode || '',
      created: json.created ? new Date(json.created) : undefined,
      updated: json.updated ? new Date(json.updated) : undefined,
    });
  }

  protected getSerializableFields(): Record<string, any> {
    return {
      alpha3: this.alpha3,
      englishName: this.englishName,
      localName: this.localName,
      unicode: this.unicode,
    };
  }

  getIri(): string {
    return this.generateIri('/api/languages');
  }

  protected getEqualityProperties(): string[] {
    return ['id', 'alpha3', 'englishName', 'localName', 'unicode'];
  }
}

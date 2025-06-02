/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseModel } from './base';
import { Media } from './index';

export class StyleTranslation extends BaseModel {
  translation?: string;
  audio?: Media; // URL to the audio file

  constructor(data: Partial<StyleTranslation>) {
    super(data);
    this.translation = data.translation || '';
    this.audio = data.audio ? new Media(data.audio) : undefined;
  }

  static fromJSON(json: Record<string, any>): StyleTranslation {
    return new StyleTranslation({
      id: json.id,
      translation: json.translation,
      audio: json.audio,
      created: json.created ? new Date(json.created) : undefined,
      updated: json.updated ? new Date(json.updated) : undefined,
    });
  }

  protected getSerializableFields(): Record<string, any> {
    return {
      translation: this.translation,
      audio: this.audio,
    };
  }

  getIri(): string {
    return this.generateIri('/api/style-translations');
  }
}

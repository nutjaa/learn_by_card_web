/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseModel } from './base';
import { Media } from './media';

export class ThingTranslation extends BaseModel {
  translation?: string;
  audio?: Media;

  constructor(data: Partial<ThingTranslation>) {
    super(data);
    this.translation = data.translation || '';
    this.audio = data.audio ? new Media(data.audio) : undefined;
  }

  static fromJSON(json: Record<string, any>): ThingTranslation {
    return new ThingTranslation({
      id: json.id,
      translation: json.translation || '',
      audio: json.audio ? Media.fromJSON(json.audio) : undefined,
    });
  }

  protected getSerializableFields(): Record<string, any> {
    return {
      translation: this.translation,
      audio: this.audio ? this.audio.toJSON() : undefined,
    };
  }

  getIri(): string {
    return this.generateIri('/api/thing-translations');
  }

  protected getEqualityProperties(): string[] {
    return ['id', 'translation', 'audio'];
  }
}

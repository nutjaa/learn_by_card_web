/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseModel } from './base';
import { Media } from './index';

export class GroupTranslation extends BaseModel {
  translation?: string;
  audio?: Media;

  constructor(data: Partial<GroupTranslation>) {
    super(data);
    this.translation = data.translation || '';
    this.audio = data.audio ? new Media(data.audio) : undefined;
  }

  static fromJSON(json: Record<string, any>): GroupTranslation {
    return new GroupTranslation({
      id: json.id,
      translation: json.translation,
      audio: json.audio ? Media.fromJSON(json.audio) : undefined,
      created: json.created ? new Date(json.created) : undefined,
      updated: json.updated ? new Date(json.updated) : undefined,
    });
  }

  protected getSerializableFields(): Record<string, any> {
    return {
      translation: this.translation,
      audio: this.audio ? this.audio.toJSON() : undefined,
    };
  }

  getIri(): string {
    return this.generateIri('/api/group-translations');
  }
}

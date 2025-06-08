/* eslint-disable @typescript-eslint/no-explicit-any */

import { ColorHelper } from '../utils/color';
import { BaseModel } from './base';
import { Media } from './index';

export class FlashcardMedia extends BaseModel {
  backgroundColor?: string;
  media?: Media;
  optimized?: Media;
  transparency?: boolean;

  constructor(data: Partial<FlashcardMedia>) {
    super(data);
    this.backgroundColor =
      data.backgroundColor || ColorHelper.getRandomHexBackgroundColor();
    this.media = data.media ? new Media(data.media) : undefined;
    this.optimized = data.optimized ? new Media(data.optimized) : undefined;
  }

  static fromJSON(json: Record<string, any>): FlashcardMedia {
    return new FlashcardMedia({
      id: json.id,
      backgroundColor: json.backgroundColor || '',
      media: json.media ? Media.fromJSON(json.media) : undefined,
      optimized: json.optimized ? Media.fromJSON(json.optimized) : undefined,
      transparency: json.transparency || false,
      created: json.created ? new Date(json.created) : undefined,
      updated: json.updated ? new Date(json.updated) : undefined,
    });
  }

  protected getSerializableFields(): Record<string, any> {
    return {
      backgroundColor: this.backgroundColor,
      media: this.media ? this.media.toJSON() : undefined,
      optimized: this.optimized ? this.optimized.toJSON() : undefined,
      transparency: this.transparency,
    };
  }

  getIri(): string {
    return this.generateIri('/api/flashcard_media');
  }

  protected getEqualityProperties(): string[] {
    return ['id', 'backgroundColor', 'media', 'optimized', 'transparency'];
  }
}

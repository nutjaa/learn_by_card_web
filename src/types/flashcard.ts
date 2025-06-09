/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseModel } from './base';
import { FlashcardMedia, Thing } from './index';

export class Flashcard extends BaseModel {
  thing?: Thing;
  flashcardMedia?: FlashcardMedia;

  constructor(data: Partial<Flashcard>) {
    super(data);
    this.thing = data.thing ? new Thing(data.thing) : undefined;
    this.flashcardMedia = data.flashcardMedia
      ? new FlashcardMedia(data.flashcardMedia)
      : undefined;
  }

  static fromJSON(json: Record<string, any>): Flashcard {
    return new Flashcard({
      id: json.id,
      thing: json.thing ? Thing.fromJSON(json.thing) : undefined,
      flashcardMedia: json.flashcardMedia
        ? FlashcardMedia.fromJSON(json.flashcardMedia)
        : undefined,
    });
  }

  protected getSerializableFields(): Record<string, any> {
    return {
      thing: this.thing ? this.thing.toJSON() : undefined,
      flashcardMedia: this.flashcardMedia
        ? this.flashcardMedia.toJSON()
        : undefined,
    };
  }

  getIri(): string {
    return this.generateIri('/api/flashcards');
  }

  protected getEqualityProperties(): string[] {
    return ['id', 'thing', 'flashcardMedia'];
  }

  // Computed properties
  get name(): string | undefined {
    if (
      !this.thing?.thingTranslations ||
      this.thing?.thingTranslations?.length === 0
    ) {
      return this.thing?.name;
    }
    return this.thing?.thingTranslations?.[0]?.translation;
  }

  get imageUrl(): string | undefined {
    return this.flashcardMedia?.media?.url;
  }

  get optimizedImageUrl(): string | undefined {
    return this.flashcardMedia?.optimized?.url;
  }

  get audioUrl(): string | undefined {
    return this.thing?.thingTranslations?.[0]?.audio?.url;
  }

  get backgroundColor(): string | undefined {
    return this.flashcardMedia?.backgroundColor;
  }

  get transparency(): boolean | undefined {
    return this.flashcardMedia?.transparency;
  }
}

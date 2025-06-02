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
      flashcardMedia: json.flashcardMedia,
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
}

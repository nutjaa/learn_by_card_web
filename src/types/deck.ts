/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseModel } from './base';
import { Group, Style } from './index';

export class Deck extends BaseModel {
  numActiveFlashcards?: number;
  group?: Group | string;
  style?: Style | string;

  constructor(data: Partial<Deck>) {
    super(data);
    this.numActiveFlashcards = data.numActiveFlashcards || 0;
    // Handle group as either string URI or object
    if (data.group) {
      if (typeof data.group === 'string') {
        this.group = data.group;
      } else {
        this.group = new Group(data.group);
      }
    }

    // Handle style as either string URI or object
    if (data.style) {
      if (typeof data.style === 'string') {
        this.style = data.style;
      } else {
        this.style = new Style(data.style);
      }
    }
  }

  static fromJSON(json: Record<string, any>): Deck {
    return new Deck({
      id: json.id,
      numActiveFlashcards: json.numActiveFlashcards || 0,
      group: json.group
        ? typeof json.group === 'string'
          ? json.group
          : Group.fromJSON(json.group)
        : undefined,
      style: json.style
        ? typeof json.style === 'string'
          ? json.style
          : Style.fromJSON(json.style)
        : undefined,
      created: json.created ? new Date(json.created) : undefined,
      updated: json.updated ? new Date(json.updated) : undefined,
    });
  }

  protected getSerializableFields(): Record<string, any> {
    return {
      numActiveFlashcards: this.numActiveFlashcards,
      group: this.group
        ? typeof this.group === 'string'
          ? this.group
          : this.group.toJSON()
        : undefined,
      style: this.style
        ? typeof this.style === 'string'
          ? this.style
          : this.style.toJSON()
        : undefined,
    };
  }

  getIri(): string {
    return this.generateIri('/api/decks');
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlug } from '../utils/string';
import { BaseModel } from './base';
import { GroupTranslation } from './index';

export class Group extends BaseModel {
  name?: string;
  emojis?: string;
  emoji1?: string;
  emoji2?: string;
  groupTranslations?: GroupTranslation[];
  sortOrder?: number;
  numActiveThings?: number;
  numActivePremiumThings?: number;
  numActiveDecks?: number;

  constructor(data: Partial<Group>) {
    super(data);
    this.name = data.name;
    this.emojis = data.emojis;
    this.emoji1 = data.emoji1;
    this.emoji2 = data.emoji2;
    this.groupTranslations = data.groupTranslations;
    this.sortOrder = data.sortOrder;
    this.numActiveThings = data.numActiveThings;
    this.numActivePremiumThings = data.numActivePremiumThings;
    this.numActiveDecks = data.numActiveDecks;
  }

  static fromJSON(json: Record<string, any>): Group {
    return new Group({
      id: json.id,
      name: json.name,
      emojis: json.emojis,
      emoji1: json.emoji1,
      emoji2: json.emoji2,
      sortOrder: json.sortOrder,
      numActiveThings: json.numActiveThings,
      numActiveDecks: json.numActiveDecks,
      groupTranslations: json.groupTranslations
        ? json.groupTranslations.map((gt: Record<string, any>) =>
            GroupTranslation.fromJSON(gt)
          )
        : [],
      created: json.created ? new Date(json.created) : undefined,
      updated: json.updated ? new Date(json.updated) : undefined,
    });
  }

  protected getSerializableFields(): Record<string, any> {
    return {
      name: this.name,
      emojis: this.emojis,
      emoji1: this.emoji1,
      emoji2: this.emoji2,
      sortOrder: this.sortOrder,
      numActiveThings: this.numActiveThings,
      numActiveDecks: this.numActiveDecks,
      groupTranslations: this.groupTranslations?.map((gt) => gt.toJSON()),
    };
  }

  getIri(): string {
    return this.generateIri('/api/public/v1/group');
  }

  getNameTranslation(): string {
    // If no translations available, return the default name
    if (!this.groupTranslations || this.groupTranslations.length === 0) {
      return this.name || '';
    }

    return this.groupTranslations[0].translation || this.name || '';
  }

  getSlug(): string {
    return createSlug(this.name);
  }
}

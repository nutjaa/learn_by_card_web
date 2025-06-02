/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseModel } from './base';
import { GroupTranslation } from './index';

export class Group extends BaseModel {
  name?: string;
  emojis?: string;
  sortOrder?: number;
  numActiveThings?: number;
  numActiveDecks?: number;
  groupTranslations?: GroupTranslation[];

  constructor(data: Partial<Group>) {
    super(data);
    this.name = data.name || '';
    this.emojis = data.emojis || '';
    this.sortOrder = data.sortOrder || 0;
    this.numActiveThings = data.numActiveThings || 0;
    this.numActiveDecks = data.numActiveDecks || 0;
    this.groupTranslations = data.groupTranslations
      ? data.groupTranslations.map((gt) => new GroupTranslation(gt))
      : [];
  }

  static fromJSON(json: Record<string, any>): Group {
    return new Group({
      id: json.id,
      name: json.name,
      emojis: json.emojis,
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
      sortOrder: this.sortOrder,
      numActiveThings: this.numActiveThings,
      numActiveDecks: this.numActiveDecks,
      groupTranslations: this.groupTranslations?.map((gt) => gt.toJSON()),
    };
  }

  getIri(): string {
    return this.generateIri('/api/groups');
  }
}

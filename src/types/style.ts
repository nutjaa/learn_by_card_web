/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlug } from '../utils/string';
import { BaseModel } from './base';
import { StyleTranslation } from './index';

export class Style extends BaseModel {
  name?: string; // Name of the style
  styleTranslations?: StyleTranslation[]; // Array of translations for the style

  constructor(data: Partial<Style>) {
    super(data);
    this.name = data.name || '';
    this.styleTranslations = data.styleTranslations
      ? data.styleTranslations.map((st) => new StyleTranslation(st))
      : [];
  }

  static fromJSON(json: Record<string, any>): Style {
    return new Style({
      id: json.id,
      name: json.name,
      styleTranslations: json.groupTranslations
        ? json.groupTranslations.map((gt: Record<string, any>) =>
            StyleTranslation.fromJSON(gt)
          )
        : [],
      created: json.created ? new Date(json.created) : undefined,
      updated: json.updated ? new Date(json.updated) : undefined,
    });
  }

  protected getSerializableFields(): Record<string, any> {
    return {
      name: this.name,
      styleTranslations: this.styleTranslations?.map((st) => st.toJSON()),
    };
  }

  getIri(): string {
    return this.generateIri('/api/styles');
  }

  getSlug(): string {
    return createSlug(this.name);
  }
}

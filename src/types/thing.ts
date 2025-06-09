/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseModel } from './base';
import { Group, ThingTranslation } from './index';

export class Thing extends BaseModel {
  name?: string;
  group?: Group;
  thingTranslations?: ThingTranslation[];

  constructor(data: Partial<Thing>) {
    super(data);
    this.name = data.name || '';
    this.group = data.group ? new Group(data.group) : undefined;
    this.thingTranslations = data.thingTranslations
      ? data.thingTranslations.map((tt) => new ThingTranslation(tt))
      : [];
  }

  static fromJSON(json: Record<string, any>): Thing {
    return new Thing({
      id: json.id,
      name: json.name,
      group: json.group ? Group.fromJSON(json.group) : undefined,
      thingTranslations: json.thingTranslations
        ? json.thingTranslations.map((tt: Record<string, any>) =>
            ThingTranslation.fromJSON(tt)
          )
        : [],
      created: json.created ? new Date(json.created) : undefined,
      updated: json.updated ? new Date(json.updated) : undefined,
    });
  }

  protected getSerializableFields(): Record<string, any> {
    return {
      name: this.name,
      group: this.group ? this.group.toJSON() : undefined,
      thingTranslations: this.thingTranslations?.map((tt) => tt.toJSON()),
    };
  }

  getIri(): string {
    return this.generateIri('/api/things');
  }

  getEqualityProperties(): string[] {
    return ['id', 'name', 'group', 'thingTranslations'];
  }
}

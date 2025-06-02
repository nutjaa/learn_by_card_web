/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseModel } from './base';

export class Media extends BaseModel {
  uuid?: string;
  url?: string; // URL to the media file

  constructor(data: Partial<Media>) {
    super(data);
    this.uuid = data.uuid || '';
    this.url = data.url || '';
  }

  protected getSerializableFields(): Record<string, any> {
    return {
      url: this.url,
      uuid: this.uuid,
    };
  }

  static fromJSON(json: Record<string, any>): Media {
    return new Media({
      id: json.id,
      uuid: json.uuid,
      url: json.url,
      created: json.created ? new Date(json.created) : undefined,
      updated: json.updated ? new Date(json.updated) : undefined,
    });
  }

  static fromIri(iri: string, additionalData?: Partial<Media>): Media {
    const id = this.extractIdFromIri(iri);
    return new Media({
      id: parseInt(id, 10),
      ...additionalData,
    });
  }

  getIri(): string {
    return this.generateIri('/api/media');
  }
}

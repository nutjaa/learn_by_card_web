/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class BaseModel<T = any> {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<T & BaseModel>) {
    this.id = data.id || '';
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      ...this.getSerializableFields(),
    };
  }

  static extractIdFromIri(iri: string): string {
    const parts = iri.split('/');
    return parts[parts.length - 1];
  }

  generateIri(resourcePath: string): string {
    return `${resourcePath}/${this.id}`;
  }

  protected abstract getSerializableFields(): Record<string, any>;
}
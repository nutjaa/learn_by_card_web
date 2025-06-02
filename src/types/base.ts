/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class BaseModel<T = any> {
  id: number;
  created: Date;
  updated: Date;

  constructor(data: Partial<T & BaseModel>) {
    this.id = data.id || 0;
    this.created = data.created ? new Date(data.created) : new Date();
    this.updated = data.updated ? new Date(data.updated) : new Date();
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      created: this.created.toISOString(),
      updated: this.updated.toISOString(),
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

  // Properties to compare for equality (subclasses can override)
  protected getEqualityProperties(): string[] {
    return ['id'];
  }

  equals(other: any): boolean {
    if (!other || this.constructor !== other.constructor) {
      return false;
    }

    const props = this.getEqualityProperties();
    return props.every((prop) => (this as any)[prop] === (other as any)[prop]);
  }

  protected abstract getSerializableFields(): Record<string, any>;
}

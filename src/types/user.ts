/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseModel } from './base';

export class User extends BaseModel {
  name: string;
  email: string;
  avatar?: string;

  constructor(data: Partial<User>) {
    super(data);
    this.name = data.name || '';
    this.email = data.email || '';
    this.avatar = data.avatar;
  }

  static fromJSON(json: Record<string, any>): User {
    return new User({
      id: json.id,
      name: json.name,
      email: json.email,
      avatar: json.avatar,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    });
  }

  static fromIri(iri: string, additionalData?: Partial<User>): User {
    const id = this.extractIdFromIri(iri);
    return new User({ id, ...additionalData });
  }

  protected getSerializableFields(): Record<string, any> {
    return {
      name: this.name,
      email: this.email,
      avatar: this.avatar,
    };
  }

  getIri(): string {
    return this.generateIri('/api/users');
  }
}
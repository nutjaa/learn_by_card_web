/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseModel } from './base';

export class User extends BaseModel {
  email?: string;
  name?: string;
  avatar?: string;
  isVerified?: boolean;
  roles?: string[];

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
      isVerified: json.isVerified,
      roles: json.roles || [],
      created: json.created ? new Date(json.created) : undefined,
      updated: json.updated ? new Date(json.updated) : undefined,
    });
  }

  static fromIri(iri: string, additionalData?: Partial<User>): User {
    const id = this.extractIdFromIri(iri);
    return new User({
      id: parseInt(id, 10),
      ...additionalData,
    });
  }

  protected getSerializableFields(): Record<string, any> {
    return {
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      isVerified: this.isVerified,
      roles: this.roles || [],
    };
  }

  getIri(): string {
    return this.generateIri('/api/users');
  }
}
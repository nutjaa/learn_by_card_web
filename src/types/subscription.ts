/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseModel } from './base';

export class Subscription extends BaseModel {
  name?: string;
  price?: number;
  duration?: string;
  googlePlayStoreProductId?: string;
  appleAppStoreProductId?: string;

  constructor(data: Partial<Subscription>) {
    super(data);
    this.name = data.name || '';
    this.price = data.price || 0;
    this.duration = data.duration || '';
    this.googlePlayStoreProductId = data.googlePlayStoreProductId || '';
    this.appleAppStoreProductId = data.appleAppStoreProductId || '';
  }

  static fromJSON(json: Record<string, any>): Subscription {
    return new Subscription({
      id: json.id,
      name: json.name || '',
      price: json.price || 0,
      duration: json.duration || '',
      googlePlayStoreProductId: json.googlePlayStoreProductId || '',
      appleAppStoreProductId: json.appleAppStoreProductId || '',
    });
  }

  protected getSerializableFields(): Record<string, any> {
    return {
      name: this.name,
      price: this.price,
      duration: this.duration,
      googlePlayStoreProductId: this.googlePlayStoreProductId,
      appleAppStoreProductId: this.appleAppStoreProductId,
    };
  }

  getIri(): string {
    return this.generateIri('/api/subscriptions');
  }
}

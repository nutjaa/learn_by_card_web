/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  IDecksApiService,
  IGroupsApiService,
  ILanguagesApiService,
  IStylesApiService,
} from '../api/interfaces';

export interface ServiceContainer {
  groupsApi: IGroupsApiService;
  languagesApi: ILanguagesApiService;
  stylesApi: IStylesApiService;
  decksApi: IDecksApiService;
}

export class ServiceRegistry {
  private services = new Map<string, any>();

  register<T>(key: keyof ServiceContainer, factory: () => T): void {
    this.services.set(key, factory);
  }

  get<T>(key: keyof ServiceContainer): T {
    const factory = this.services.get(key);
    if (!factory) {
      throw new Error(`Service ${key} not registered`);
    }
    return factory();
  }

  set<T>(key: keyof ServiceContainer, instance: T): void {
    this.services.set(key, () => instance);
  }
}

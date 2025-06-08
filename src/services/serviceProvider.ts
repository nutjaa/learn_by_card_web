import { ServiceRegistry } from './registry/serviceRegistry';
import {
  GroupsApiService,
  IGroupsApiService,
  ILanguagesApiService,
  IStylesApiService,
  LanguageApiService,
  FlashcardsApiService
} from './api/index';
import { StylesApiService } from './api/style';
import { DecksApiService } from './api/deck';

const registry = new ServiceRegistry();

// Register default implementations
registry.register('groupsApi', () => new GroupsApiService());
registry.register('languagesApi', () => new LanguageApiService());
registry.register('stylesApi', () => new StylesApiService());
registry.register('decksApi', () => new DecksApiService()); 
registry.register('flashcardsApi', () => new FlashcardsApiService());  

export const serviceProvider = {
  get groupsApi() {
    return registry.get<IGroupsApiService>('groupsApi');
  },

  get languagesApi() {
    return registry.get<ILanguagesApiService>('languagesApi');
  },

  get stylesApi() {
    return registry.get<IStylesApiService>('stylesApi');
  },

  get decksApi() {
    return registry.get<DecksApiService>('decksApi');
  },

  get flashcardsApi() {
    return registry.get<FlashcardsApiService>('flashcardsApi');
  },

  // For testing
  setGroupsApi(service: IGroupsApiService) {
    registry.set('groupsApi', service);
  },

  setLanguagesApi(service: ILanguagesApiService) {
    registry.set('languagesApi', service);
  },

  setStylesApi(service: StylesApiService) {
    registry.set('stylesApi', service);
  },

  setDecksApi(service: DecksApiService) {
    registry.set('decksApi', service);
  },

  setFlashcardsApi(service: FlashcardsApiService) {
    registry.set('flashcardsApi', service);
  }
};

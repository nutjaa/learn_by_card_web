import { IGroupsApiService, ILanguagesApiService } from './api/interfaces';
import { GroupsApiService, LanguageApiService } from './api/index';

class ServiceProvider {
  private _groupsApi?: IGroupsApiService;
  private _languagesApi?: ILanguagesApiService;

  get groupsApi(): IGroupsApiService {
    if (!this._groupsApi) {
      this._groupsApi = new GroupsApiService();
    }
    return this._groupsApi;
  }

  get languagesApi(): ILanguagesApiService {
    if (!this._languagesApi) {
      this._languagesApi = new LanguageApiService();
    }
    return this._languagesApi;
  }

  // For testing or different implementations
  setGroupsApi(service: IGroupsApiService): void {
    this._groupsApi = service;
  }

  // For testing or different implementations
  setLanguagesApi(service: ILanguagesApiService): void {
    this._languagesApi = service;
  }
}

export const serviceProvider = new ServiceProvider();

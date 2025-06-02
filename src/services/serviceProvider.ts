import { IGroupsApiService } from './api/interfaces';
import { GroupsApiService } from './api/group';

class ServiceProvider {
  private _groupsApi?: IGroupsApiService;

  get groupsApi(): IGroupsApiService {
    if (!this._groupsApi) {
      this._groupsApi = new GroupsApiService();
    }
    return this._groupsApi;
  }

  // For testing or different implementations
  setGroupsApi(service: IGroupsApiService): void {
    this._groupsApi = service;
  }
}

export const serviceProvider = new ServiceProvider();

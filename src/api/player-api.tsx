import { getParamsPOST } from '../modules/functions.tsx'
import { ResourcesInvested } from '../types/app-types.tsx';

class PlayerApi {
  async saveResourcesInvested(resources: ResourcesInvested, accessToken: string) {
    const data = { resources };

    const url = `${process.env.REACT_APP_BACK}/player/resources/invested/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }
  async getIsWebsiteUnderMaintenanceAPIView(accessToken: string) {
    const data = {};

    const url = `${process.env.REACT_APP_BACK}/website/maintenance/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  
}

export const playerApi = new PlayerApi();

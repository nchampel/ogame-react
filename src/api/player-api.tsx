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
  async getIsWebsiteUnderMaintenance(accessToken: string) {
    const data = {};

    const url = `${process.env.REACT_APP_BACK}/website/maintenance/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }
  async getSuccessPlayer(accessToken: string) {
    const data = {};

    const url = `${process.env.REACT_APP_BACK}/player/success/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }
  async saveSuccessPlayer(success_to_save: [{}], accessToken: string) {
    const data = { success_to_save };

    const url = `${process.env.REACT_APP_BACK}/player/success/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }
  async getIsAdminPlayer() {
    const data = {};

    const url = `${process.env.REACT_APP_BACK}/admin/player/get/`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
      // body: formData,
    });
    const json = await response.json();
    return json;
  }

  
}

export const playerApi = new PlayerApi();

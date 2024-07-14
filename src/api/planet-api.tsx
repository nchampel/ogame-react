import { getParamsPOST } from '../modules/functions'
import { Resources } from '../types/app-types';
class PlanetApi {
  async getResources(accessToken: string) {
    const data = {};
    // data.energy = energy;
    // let formData = new FormData();
    // formData.append("energy", energy);
    const url = `${process.env.REACT_APP_BACK}/resources/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async getBuildings(accessToken: string) {
    const data = {};
    const url = `${process.env.REACT_APP_BACK}/buildings/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  // pas utilisé
  async getBuildingsResources(accessToken: string) {
    const data = {};
    const url = `${process.env.REACT_APP_BACK}/buildings-resources/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async saveResources(resources: Resources, accessToken: string) {
    const data = { resources };
    const url = `${process.env.REACT_APP_BACK}/resources/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async saveLevel(type: string, level: number, accessToken: string) {
    const data = { type, level };
    const url = `${process.env.REACT_APP_BACK}/level/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async getBoosterCost(coefficient: number, accessToken: string) {
    const data = { coefficient };
    const url = `${process.env.REACT_APP_BACK}/booster/cost/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async saveLevelBooster(coefficient: number, accessToken: string) {
    const data = { coefficient };
    const url = `${process.env.REACT_APP_BACK}/booster/coefficient/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async saveLevelSearch(type: string, level: number, accessToken: string) {
    const data = { type, level };
    const url = `${process.env.REACT_APP_BACK}/search/level/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }
  async reinitialization(user_id: number, accessToken: string) {
    const data = { user_id };
    const url = `${process.env.REACT_APP_BACK}/reinitialization/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  
}

export const planetApi = new PlanetApi();

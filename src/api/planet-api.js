import { getParamsPOST } from '../modules/functions'
class PlanetApi {
  async getResources(accessToken) {
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

  async getBuildings(accessToken) {
    const data = {};
    const url = `${process.env.REACT_APP_BACK}/buildings/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  // pas utilisé
  async getBuildingsResources(accessToken) {
    const data = {};
    const url = `${process.env.REACT_APP_BACK}/buildings-resources/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async saveResources(resources, accessToken) {
    const data = { resources };
    const url = `${process.env.REACT_APP_BACK}/resources/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async saveLevel(type, level, accessToken) {
    const data = { type, level };
    const url = `${process.env.REACT_APP_BACK}/level/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async getBoosterCost(coefficient, accessToken) {
    const data = { coefficient };
    const url = `${process.env.REACT_APP_BACK}/booster/cost/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async saveLevelBooster(coefficient, accessToken) {
    const data = { coefficient };
    const url = `${process.env.REACT_APP_BACK}/booster/coefficient/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async saveLevelSearch(type, level, accessToken) {
    const data = { type, level };
    const url = `${process.env.REACT_APP_BACK}/search/level/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }
  async reinitialization(user_id, accessToken) {
    const data = { user_id };
    const url = `${process.env.REACT_APP_BACK}/reinitialization/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  
}

export const planetApi = new PlanetApi();

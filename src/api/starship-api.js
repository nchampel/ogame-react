import { getParamsPOST } from '../modules/functions.tsx'

class StarshipApi {
  async getStarshipData(accessToken) {
    const data = {};

    const url = `${process.env.REACT_APP_BACK}/starship/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async buildStarship(accessToken) {
    const data = {};

    const url = `${process.env.REACT_APP_BACK}/starship/build/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async saveResourcesPlanetsMultiverse(planets, accessToken) {
    const data = { planets };

    const url = `${process.env.REACT_APP_BACK}/planets/multiverse/resources/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }
}

export const starshipApi = new StarshipApi();

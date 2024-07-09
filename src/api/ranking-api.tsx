import { getParamsPOST } from '../modules/functions.tsx'

class RankingApi {
  async getRanking(accessToken: string) {
    const data = {};

    const url = `${process.env.REACT_APP_BACK}/ranking/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }
}

export const rankingApi = new RankingApi();

import { getParamsPOST } from '../modules/functions.tsx'

class SearchApi {
  async getSearchData(accessToken: string) {
    const data = {};

    const url = `${process.env.REACT_APP_BACK}/search/levels/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }
}

export const searchApi = new SearchApi();

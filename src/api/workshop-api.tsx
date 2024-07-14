import { getParamsPOST } from '../modules/functions.tsx'

class WorkShopApi {
  async saveLogPowerGeneratorBuilt(number: number, accessToken :string) {
    const data = { number };

    const url = `${process.env.REACT_APP_BACK}/workshop/power/generator/log/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  
}

export const workShopApi = new WorkShopApi();

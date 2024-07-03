import { getParamsPOST } from '../modules/functions'

class ShopApi {

  async determinateDaily(accessToken) {
    const data = {};

    const url = `${process.env.REACT_APP_BACK}/unity-link/daily/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    //   return response.json(); // parses JSON response into native JavaScript objects
    // console.log(response);
    const json = await response.json();
    return json;
  }
  async saveDailyClaimed(accessToken) {
    const data = {};

    const url = `${process.env.REACT_APP_BACK}/unity-link/daily/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    //   return response.json(); // parses JSON response into native JavaScript objects
    // console.log(response);
    const json = await response.json();
    return json;
  }
  async getShopItemsData(accessToken) {
    const data = {};

    const url = `${process.env.REACT_APP_BACK}/shop-items/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    //   return response.json(); // parses JSON response into native JavaScript objects
    // console.log(response);
    const json = await response.json();
    return json;
  }
  async saveItemUsing(type, accessToken) {
    const data = { type };

    const url = `${process.env.REACT_APP_BACK}/shop-items/using/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    //   return response.json(); // parses JSON response into native JavaScript objects
    // console.log(response);
    const json = await response.json();
    return json;
  }
  async saveItemBought(type, accessToken) {
    const data = { type };

    const url = `${process.env.REACT_APP_BACK}/shop-items/bought/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    //   return response.json(); // parses JSON response into native JavaScript objects
    // console.log(response);
    const json = await response.json();
    return json;
  }
}

export const shopApi = new ShopApi();
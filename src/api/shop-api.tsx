import { getParamsPOST } from '../modules/functions.tsx'
import { Buildings } from '../types/general-types.tsx';

class ShopApi {

  async determinateDaily(accessToken: string) {
    const data = {};

    const url = `${process.env.REACT_APP_BACK}/unity-link/daily/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    //   return response.json(); // parses JSON response into native JavaScript objects
    // console.log(response);
    const json = await response.json();
    return json;
  }
  async saveDailyClaimed(levels: {ticket: number, unityLink: number}, accessToken: string) {
    const data = { levels };

    const url = `${process.env.REACT_APP_BACK}/unity-link/daily/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    //   return response.json(); // parses JSON response into native JavaScript objects
    // console.log(response);
    const json = await response.json();
    return json;
  }
  async getShopItemsData(accessToken: string) {
    const data = {};

    const url = `${process.env.REACT_APP_BACK}/shop-items/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    //   return response.json(); // parses JSON response into native JavaScript objects
    // console.log(response);
    const json = await response.json();
    return json;
  }
  async saveItemUsing(type: string, accessToken: string) {
    const data = { type };

    const url = `${process.env.REACT_APP_BACK}/shop-items/using/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    //   return response.json(); // parses JSON response into native JavaScript objects
    // console.log(response);
    const json = await response.json();
    return json;
  }
  async saveItemBought(type: string, link_unity_used: number, accessToken: string) {
    const data = { type, link_unity_used };

    const url = `${process.env.REACT_APP_BACK}/shop-items/bought/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    //   return response.json(); // parses JSON response into native JavaScript objects
    // console.log(response);
    const json = await response.json();
    return json;
  }
  async saveItemWon(type: string, accessToken: string) {
    const data = { type };

    const url = `${process.env.REACT_APP_BACK}/shop/item/won/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    //   return response.json(); // parses JSON response into native JavaScript objects
    // console.log(response);
    const json = await response.json();
    return json;
  }
  async getPriceWon(ticket: number, accessToken: string) {
    const data = { ticket};

    const url = `${process.env.REACT_APP_BACK}/shop/price/won/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    //   return response.json(); // parses JSON response into native JavaScript objects
    // console.log(response);
    const json = await response.json();
    return json;
  }
  async getDisplayBuildingsShopLevels(buildings: Buildings, accessToken: string) {
    const data = { buildings };

    const url = `${process.env.REACT_APP_BACK}/shop-buildings/display/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    //   return response.json(); // parses JSON response into native JavaScript objects
    // console.log(response);
    const json = await response.json();
    return json;
  }
  async saveUnityLink(unity_link: number, accessToken: string) {
    const data = { unity_link };

    const url = `${process.env.REACT_APP_BACK}/unity-link/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }
  async saveUnityLinkInvested(unity_link: number, accessToken: string) {
    const data = { unity_link };

    const url = `${process.env.REACT_APP_BACK}/unity-link/invested/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }
}

export const shopApi = new ShopApi();
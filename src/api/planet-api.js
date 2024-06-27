function getParams(accessToken, data){
  const params = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
      // body: formData,
  }
  return params;
}


class PlanetApi {
  async getResources(accessToken) {
    const data = {};
    // data.energy = energy;
    // let formData = new FormData();
    // formData.append("energy", energy);
    const url = `${process.env.REACT_APP_BACK}/resources/get/`;
    const params = getParams(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async getBuildings(accessToken) {
    const data = {};
    const url = `${process.env.REACT_APP_BACK}/buildings/get/`;
    const params = getParams(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  // pas utilisé
  async getBuildingsResources(accessToken) {
    const data = {};
    const url = `${process.env.REACT_APP_BACK}/buildings-resources/get/`;
    const params = getParams(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async saveResources(resources, accessToken) {
    const data = { resources };
    const url = `${process.env.REACT_APP_BACK}/resources/save/`;
    const params = getParams(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async saveLevel(type, level, accessToken) {
    const data = { type, level };
    const url = `${process.env.REACT_APP_BACK}/level/save/`;
    const params = getParams(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async getBoosterCost(coefficient, accessToken) {
    const data = { coefficient };
    const url = `${process.env.REACT_APP_BACK}/booster/cost/get/`;
    const params = getParams(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async saveLevelBooster(coefficient, accessToken) {
    const data = { coefficient };
    const url = `${process.env.REACT_APP_BACK}/booster/coefficient/save/`;
    const params = getParams(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async saveLevelSearch(type, level, accessToken) {
    const data = { type, level };
    const url = `${process.env.REACT_APP_BACK}/search/level/save/`;
    const params = getParams(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }
  async reinitialization(user_id, accessToken) {
    const data = { user_id };
    const url = `${process.env.REACT_APP_BACK}/reinitialization/`;
    const params = getParams(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }

  async determinateDaily(accessToken) {
    const data = {};

    const url = `${process.env.REACT_APP_BACK}/unity-link/daily/get/`;
    const params = getParams(accessToken, data);
    const response = await fetch(url, params);
    //   return response.json(); // parses JSON response into native JavaScript objects
    // console.log(response);
    const json = await response.json();
    return json;
  }
  async saveDailyClaimed(accessToken) {
    const data = {};

    const url = `${process.env.REACT_APP_BACK}/unity-link/daily/save/`;
    const params = getParams(accessToken, data);
    const response = await fetch(url, params);
    //   return response.json(); // parses JSON response into native JavaScript objects
    // console.log(response);
    const json = await response.json();
    return json;
  }
}

export const planetApi = new PlanetApi();

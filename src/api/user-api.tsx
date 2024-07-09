import { getParamsPOST } from '../modules/functions.tsx'
import { LoginData } from '../pages/login.tsx';
import { AnswersForNature } from '../pages/nature.tsx';
import { RegisterData } from '../pages/register.tsx';

class UserApi {
  async subscribe(values: RegisterData) {
    const data = { values };

    const url = `${process.env.REACT_APP_BACK}/subscribe/`;
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

  async login(values: LoginData) {
    const data = { values };

    const url = `${process.env.REACT_APP_BACK}/login/`;
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

  async verifyJWT(jwt: string | null) {
    const data = { jwt };

    const url = `${process.env.REACT_APP_BACK}/jwt/verify/`;
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
  async determineNature(values: AnswersForNature, accessToken: string) {
    const data = { values };

    const url = `${process.env.REACT_APP_BACK}/nature/determine/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }
  async saveNature(values: { choice: string | null }, accessToken: string) {
    const data = { values };

    const url = `${process.env.REACT_APP_BACK}/nature/save/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }
  async getUnityLink(accessToken: string) {
    const data = { };

    const url = `${process.env.REACT_APP_BACK}/unity-link/get/`;
    const params = getParamsPOST(accessToken, data);
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  }
  
}

export const userApi = new UserApi();

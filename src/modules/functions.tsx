import numeral from "numeral";

export function getParamsPOST(accessToken: string, data: {}): {}{
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

export function checkLocalStorage(str: string): string {
  const item = localStorage.getItem(str)
  if (item !== null) {
    return item;
  }
  return '';
}

export function shortNumber(number: number): string | number {
  if (number >= 1000 && number < 1000000) {
    return (Math.floor(number / 1000)).toString() + ' k'
  } else if (number >= 1000000 && number < 1000000000){
    return (Math.floor(number / 1000000)).toString() + ' M'
  } else if (number >= 1000000000){
    return numeral(Math.floor(number / 1000000000)).format("0,000")
    .replaceAll(",", " ").toString() + ' Md'
  } else {
    return number
  }
}

import { getConfig_sp } from '../utils_ng/localStorage_ng';
import { axiosSystemInstance } from './config_ng.js';

export async function fetcherSystem([url, postData]) {
  const axiosClient = axiosSystemInstance();  // AXIOS Instance Created

  var superData = {
    "accountType": "GRAVITUS",
    "postData": postData
  };

  try {
    const res = await axiosClient.post(url, superData);
    return res.data;
  }
  catch (err) {
    return err;
  }
}

export function postDataSystem(url, postData) {
  return new Promise(function (resolve, reject) {
    const axiosClient = axiosSystemInstance();

    var superData = {
      "accountType": "GRAVITUS",
      "postData": postData
    };

    axiosClient.post(url, superData)
      .then(response => {
        // Handle response
        resolve(JSON.parse(JSON.stringify(response.data)));
      })
      .catch(error => {
        // Handle errors
        reject(JSON.parse(JSON.stringify(error.message)));
      });
  });
}

export async function formDataSystem(url, postData) {
  return new Promise(function (resolve, reject) {
    const axiosClient = axiosSystemInstance();

    var superCredits = getConfig_sp();
    if (superCredits.token != 'none') {

      axiosClient.defaults.headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': superCredits.token
      };
    }
    else {
      axiosClient.defaults.headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      };
    }

    var uploadData = new FormData();
    uploadData.append('fileI', postData.fileI);
    uploadData.append('fileName', postData.fileName);
    uploadData.append('updateInfo', JSON.stringify(postData.updateInfo));

    var superData = {
      "accountType": "GRAVITUS",
      "postData": { "appVersion": 205 }
    };

    axiosClient.post(url, superData)
      .then(response => {
        // Handle response
        resolve(JSON.parse(JSON.stringify(response.data)));
      })
      .catch(error => {
        // Handle errors
        reject(JSON.parse(JSON.stringify(error.message)));
      });
  });
}

// Two Factor Authentication (Sign, Reset Security, Withdrawal - INR & Crypto)
export const Send_OTP = () => {
  return 'api/activity/security/sendOTP';
};

export const MarketOverview_URL = () => {
  return 'api/generic/dashboard/markets';
};

export const FavouritesCrypto_URL = () => {
  return 'api/activity/dashboard/favourites';
};

export const Security_URL = () => {
  return 'api/activity/security/secFeatures'
}
// Identity

// Paymethods

// Security Enable, Disable & Reset

// Account Information

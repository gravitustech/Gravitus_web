import { getConfig_sp} from '../utils_ng/localStorage_ng';
import { axiosWalletInstance } from './config_ng.js';

export async function fetcherWallet([url, postData]) {
  const axiosClient = axiosWalletInstance();  // AXIOS Instance Created

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

export function postDataWallet(url, postData) {
  return new Promise(function (resolve, reject) {
    const axiosClient = axiosWalletInstance();

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

export async function formDataWallet(url, postData) {
  return new Promise(function (resolve, reject) {
    const axiosClient = axiosWalletInstance();

    var superCredits = getConfig_sp();
    if(superCredits.token != 'none') {
      
      axiosClient.defaults.headers = { 
        'Accept'       : 'application/json', 
        'Content-Type' : 'multipart/form-data',
        'Authorization': superCredits.token
      };
    }
    else {
      axiosClient.defaults.headers = { 
        'Accept'       : 'application/json', 
        'Content-Type' : 'multipart/form-data'
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

export const Wallet_Fetch_Info = () => {
  return 'api/activity/wallet/fetchInfo';
};

export const Wallet_Fetch_ById = () => {
  return 'api/activity/wallet/fetchById';
};

export const Deposit_Address = () => {
  return 'api/activity/wallet/address';
};

export const Wallet_Statement = () => {
  return 'api/activity/wallet/statement';
};

// Estimate Crypto & INR 
export const Estimate_Withdrawal = () => {
  return 'api/activity/wallet/eWithdrawal';
};

// Sign Crypto & INR 
export const Sign_Withdrawal = () => {
  return 'api/activity/security/wSecurity';
};

// Pre Deposit INR
export const Pre_Rs_Deposit = () => {
  return 'api/activity/wallet/preRsDeposit';
};

// Post Deposit INR
export const Post_Rs_Deposit = () => {
  return 'api/activity/wallet/postRsDeposit';
};

// Pre Withdrawal INR
export const Pre_Rs_Withdraw = () => {
  return 'api/activity/wallet/preRsWithdraw';
};

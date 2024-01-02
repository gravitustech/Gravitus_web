
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

    // var superData = {
    //   "accountType": "GRAVITUS",
    //   "postData": { "appVersion": 205 }
    // };

    axiosClient.post(url, uploadData)
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

export const MarketOverview_URL = () => {
  return 'api/generic/dashboard/markets';
};

// Two Factor Authentication (Sign, Reset Security, Withdrawal - INR & Crypto)
export const Send_OTP = () => {
  return 'api/activity/security/sendOTP';
};

export const FavouritesCrypto_URL = () => {
  return 'api/activity/dashboard/favourites';
};

export const Security_URL = () => {
  return 'api/activity/security/secFeatures'
}

//Dashboard Profile
export const SEND_OTP = () => {
  return 'api/activity/manageUsers/sendOTP'
}

export const sendMOTP = () => {
  return 'api/activity/manageUsers/sendMOTP'
}

export const Reset_Mobile_Number = () => {
  return 'api/activity/manageUsers/resetMobileNo'
}

export const set_Mobile_Number = () => {
  return 'api/activity/manageUsers/setMobileNo'
}

export const Update_Mobile_Number = () => {
  return 'api/activity/manageUsers/updateMobileNo'
}

//
export const Update_PhFeatures = () => {
  return 'api/activity/security/updateFeatures'
}

// Identity
export const Update_Identity = () => {
  return 'api/activity/manageUsers/identity'
}

// Paymethods
export const Update_PayModes = () => {
  return 'api/activity/manageUsers/payModes'
}

//
export const Security_Features = () => {
  return 'api/activity/security/secFeatures'
}

// Security Enable
export const Enable_Security = () => {
  return 'api/activity/security/vSecurity'
}

//Security Disable
export const Disable_Security = () => {
  return 'api/activity/security/dSecurity'
}

// Security Reset
export const Security_Reset = () => {
  return 'api/activity/security/rSecurity'
}

// Account Information
export const Account_Info = () => {
  return 'api/activity/dashboard/accountInfo'
}

//Ticket Raised
export const Ticket_Raised = () => {
  return 'api/activity/ticket/request'
}

//Ticket History
export const Ticket_History = () => {
  return 'api/activity/ticket/history'
}


//LogIn_User
export const LogIn_User = () => {
  return 'api/generic/email/loginUserNg'
}

//SignIn_securit
export const SignIn_security = () => {
  return 'api/generic/security/sSecurity'
}

//
export const Reset_Password = () => {
  return 'api/generic/email/resetPassword'
}

//
export const SignUp_User = () => {
  return 'api/generic/email/createUser'
}

//
export const Referral_Id = () => {
  return 'api/generic/email/validateUser'
}

//
export const Logout_User = () => {
  return 'api/users/logout?access_token='
}

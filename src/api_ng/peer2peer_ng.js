import {getConfig_sp} from '../utils_ng/localStorage_ng';
import {axiosP2PInstance} from './config_ng.js';

export async function fetcherP2P([url, postData]) {
  const axiosClient = axiosP2PInstance();  // AXIOS Instance Created
  
  var superData = {
    "accountType" : "GRAVITUS",
    "postData"    : postData
  };

  try {
    const res = await axiosClient.post(url, superData);
    return res.data;
  }
  catch (err) {
    return err;
  }
}

export function postDataP2P(url, postData) {
  return new Promise(function(resolve, reject) {
    const axiosClient = axiosP2PInstance();

    var superData = {
      "accountType" : "GRAVITUS",
      "postData"    : postData
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

export async function formDataP2P(url, postData) {
  return new Promise(function(resolve, reject) {
    const axiosClient = axiosP2PInstance();

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

export const P2P_PreTrade_URL = () => {
  var superCredits = getConfig_sp();

  if(superCredits.token != 'none') {
    return '/api/activity/nuevoP2P/preTradeP2';
  }
  else {
    return '/api/generic/nuevoP2P/preTradeP2';
  }
};

export const P2P_MatchedOrders_URL = () => {
  return 'api/generic/nuevoP2P/matchedTrades';
};

export const P2P_SuperOrders_URL = () => {
  return 'api/activity/nuevoP2P/v2/superOrders';
};

export const P2P_PostOrder_URL = () => {
  return 'api/activity/nuevoP2P/postOrder';
};

export const P2P_CancelOrder_URL = () => {
  return'api/activity/nuevoP2P/cancelOrder';
};

export const P2P_SuperTrades_URL = () => {
  return 'api/activity/nuevoP2P/v2/superTrades';
};

export const P2P_MatchTrade_URL = () => {
  return 'api/activity/nuevoP2P/matchTrade';
};

export const P2P_OrderDetails_URL = () => {
  return 'api/activity/nuevoP2P/v2/tradeDetails';
};

export const P2P_ReleaseRequest_URL = () => {
  return 'api/activity/nuevoP2P/v2/releaseRequest';
};

export const P2P_OrderClosure_URL = () => {
  return 'api/activity/nuevoP2P/closure';
};

// Fetcher
export const P2P_TradeMessages_URL = () => {
  return 'api/activity/nuevoP2P/v2/tradeMessages';
};

// Post Data
export const P2P_SendMessage_URL = () => {
  return 'api/activity/nuevoP2P/sendMessage';
};

// Form Data
export const P2P_SendPicture_URL = () => {
  return 'api/activity/nuevoP2P/sendPicture';
};

// Post Data
export const P2P_AppealToEscrow_URL = () => {
  return 'api/activity/nuevoP2P/v2/appealToEscrow';
};

// Form Data
export const P2P_UpdateAppeal_URL = () => {
  return 'api/activity/nuevoP2P/v2/updateAppeal';
};

// Post Data
export const P2P_Appeal_Cancel = () => {
  return 'api/activity/nuevoP2P/v2/cancelAppeal';
};
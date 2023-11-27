import {getConfig_sp} from '../utils_ng/localStorage_ng';
import {axiosSPOTInstance, axiosChartInstance} from './config_ng.js';

// export async function fetcherCHART([url]) {
//   const axiosClient = axiosChartInstance();
  
//   try {
//     const res = await axiosClient.get(url);
//     // console.log(url, "Backend Call");
//     return res.data;
//   }
//   catch (err) {
//     return err;
//   }
// }

export function fetcherCHART(url) {
  return new Promise(function(resolve, reject) {
    const axiosClient = axiosChartInstance();

    axiosClient.get(url)
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

export async function fetcherSPOT([url, postData]) {
  const axiosClient = axiosSPOTInstance();  // AXIOS Instance Created
  
  var superData = {
    "accountType" : "GRAVITUS",
    "postData"    : postData
  };

  try {
    const res = await axiosClient.post(url, superData);
    // console.log(url, "Backend Call");
    return res.data;
  }
  catch (err) {
    return err;
  }
}

export function postDataSPOT(url, postData) {
  return new Promise(function(resolve, reject) {
    const axiosClient = axiosSPOTInstance();

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

// Fetcher 
export const Spot_PreTrade_URL = () => {
  var superCredits = getConfig_sp();

  if(superCredits.token != 'none') {
    return 'api/activity/spotTrade/preTradeP2';
  }
  else {
    return 'api/generic/spotTrade/preTradeP2';
  }
};

export const Spot_PostOrder_URL = () => {
  return 'api/activity/spotTrade/postTrade';
};
  
export const Spot_CancelOrder_URL = () => {
  return'api/activity/spotTrade/cancelTrade';
};

export const Spot_ChartData_URL = (platformId, resolution, excType) => {
  return'api/generic/ohlcData/' + platformId + '/' + resolution + '/from/to/countBack/' + excType;
};
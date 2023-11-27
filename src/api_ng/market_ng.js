import { getConfig_sp as getConfig_ng } from '../utils_ng/localStorage_ng';
import { axiosMARKETInstance } from './config_ng.js';

export async function fetcherMARKET([url, postData]) {
    const axiosClient = axiosMARKETInstance();  // AXIOS Instance Created

    var superData = {
        "accountType": "GRAVITUS",
        "postData": postData
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

export const MarketOverview_URL = () => {
    return 'api/generic/dashboard/markets';
};
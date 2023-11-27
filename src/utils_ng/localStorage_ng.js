
import {getUserEssentials, getUserAccessToken} from "../utils/storage";

var appConfig = {};
const appVersion = 201;

export const initLocalStorage_ng = () => {
	try {
		// Setup local storage via key value pairs
		var superConfig = JSON.parse(localStorage.getItem('appConfig'));
	
		if(superConfig == null) {
			appConfig.appVersion = appVersion;
      appConfig.sockStatus = false;
      appConfig.credits = 'none';
			appConfig.dryRun = true;

			appConfig.nCount = 0;
			appConfig.notify = [];

			appConfig.excType = "GRA";
			appConfig.spotType = 0;
			appConfig.P2PType = 0;
			
			appConfig.spotPair = {"platformId" : 0};
			appConfig.P2PPair = {"platformId" : 0};
			appConfig.P2POrderDts = {};
			
			appConfig.P2PMsg = {};
			appConfig.APLMsg = {};

      // appConfig.superRes = {"name" : "1m", "type" : "changeRes", "value" : "1", "status" : 1};
			localStorage.setItem('appConfig', JSON.stringify(appConfig));
		}
		else {
			superConfig.appVersion = appVersion;
			localStorage.setItem('appConfig', JSON.stringify(superConfig));
		}

		return 'initConfig';
	} catch (err) {
		return null
	}
};

export const resetLocalStorage_ng = () => {
	try {
		// Clear local storage
		localStorage.clear();
    initLocalStorage_ng();
	} catch (err) {
		return null
	}
};

export const setConfig_ng = (key, value) => {
	var response = initLocalStorage_ng();
	
	if(response != null) {
		var superConfig = JSON.parse(localStorage.getItem('appConfig'));
		superConfig[key] = value; // Set Configuration

		localStorage.setItem('appConfig', JSON.stringify(superConfig));
		return 'setConfig';
	}
	else {
		return null;
	}
};

export const getConfig_ng = (key) => {
	var response = initLocalStorage_ng();
	
	if(response != null) {
		var superConfig = JSON.parse(localStorage.getItem('appConfig'));

		if(superConfig[key] != null) {
			return superConfig[key];
		}
		else {
			return null;
		}
	}
	else {
		return null;
	}
};

export const getConfig_sp = (key) => {
	if(getUserAccessToken() != null) {
		return {
			"token"  : getUserAccessToken(),
			"userId" : getUserEssentials()?.id 
		};
	}
	else {
		return {
			"userId" : "guestUser",
			"token"  : "none"
		};
	}
}
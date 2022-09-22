import * as actionTypes from "./actionTypes";

// responsible for showing loader on data fetch
export const navStart = () => {
	return {
		type: actionTypes.NAV_LOADING,
	};
};

export const navComplete = () => {
	return {
		type: actionTypes.NAV_COMPLETE,
	};
};

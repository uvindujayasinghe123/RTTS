import { updateObject } from "../../shared/utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = { navLoading: false };

const navStart = (state) => {
	return updateObject(state, {
		navLoading: true,
	});
};

const navComplete = (state) => {
	return updateObject(state, {
		navLoading: false,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.NAV_LOADING:
			return navStart(state);
		case actionTypes.NAV_COMPLETE:
			return navComplete(state);
		default:
			return state;
	}
};

export default reducer;

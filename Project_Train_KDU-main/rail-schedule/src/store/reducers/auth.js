import { authRedirectPath } from "../../shared/consts";
import { updateObject } from "../../shared/utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
	token: null,
	userId: null,
	firstName: null,
	lastName: null,
	error: null,
	loading: false,
	authRedirectPath: authRedirectPath,
};

const authMethodSwitch = (state) => {
	return updateObject(state, {
		error: null,
	});
};

const authStart = (state) => {
	return updateObject(state, {
		error: null,
		loading: true,
	});
};

const authSuccess = (state, action) => {
	return updateObject(state, {
		token: action.idToken,
		userId: action.userId,
		firstName: action.firstName,
		lastName: action.lastName,
		error: null,
		loading: false,
		signed: action.signed,
	});
};

const authFail = (state, action) => {
	return updateObject(state, {
		token: null,
		userId: null,
		firstName: null,
		lastName: null,
		error: action.error,
		loading: false,
	});
};

const authLogout = (state) => {
	return updateObject(state, {
		token: null,
		userId: null,
		firstName: null,
		lastName: null,
		signed: null,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state);
		case actionTypes.AUTH_METHOD_SWITCH:
			return authMethodSwitch(state);
		default:
			return state;
	}
};

export default reducer;

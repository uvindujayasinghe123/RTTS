import { refreshAccessToken, logout } from "../../api/authAPI";
import * as actionTypes from "./actionTypes";
import * as localStorageService from "../../shared/localStorageUtil";

export const authMethodSwitch = () => {
	return {
		type: actionTypes.AUTH_METHOD_SWITCH,
	};
};

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

const authSuccess = (token, id, firstName, lastName, isSignUp) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: id,
		firstName,
		lastName,
		signed: isSignUp,
	};
};

const checkAuthTimeout = (expirationTime) => (dispatch) => {
	console.log("check auth timeout called");
	setTimeout(() => {
		dispatch(authCheckState(true));
	}, expirationTime * 1000);
};

const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

const onAuthLogout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const authLogout = () => async (dispatch) => {
	console.log("auth logout called");
	const refreshToken = localStorageService.getRefreshToken();
	localStorageService.clearOnLogOut();
	if (refreshToken) {
		try {
			await logout(refreshToken);
		} catch (error) {
			console.error(error);
		}
	}
	dispatch(onAuthLogout());
};

export const userAuthenticated = (userData) => (dispatch) => {
	localStorageService.updateRefreshToken(userData.refreshToken);
	localStorageService.updateUserId(userData._id);
	dispatch(
		authSuccess(
			userData.accessToken,
			userData._id,
			userData.firstName,
			userData.lastName,
			false
		)
	);
	dispatch(checkAuthTimeout(userData.expTime));
};

export const onAuthFailed = (errorMessage) => (dispatch) => {
	dispatch(authFail(errorMessage));
};

export const authCheckState =
	(background = false) =>
	async (dispatch) => {
		const refreshToken = localStorageService.getRefreshToken();
		if (!refreshToken) {
			dispatch(onAuthLogout());
		} else {
			try {
				if (!background) dispatch(authStart());
				const response = await refreshAccessToken(refreshToken);
				localStorageService.updateRefreshToken(
					response.data.refreshToken
				);
				dispatch(
					authSuccess(
						response.data.accessToken,
						response.data.userId,
						response.data.firstName,
						response.data.lastName,
						false
					)
				);
				dispatch(checkAuthTimeout(response.data.expTime));
			} catch (error) {
				dispatch(authLogout());
			}
		}
	};

export const userUpdated =
	(userId, firstName, lastName, accessToken, refreshToken) => (dispatch) => {
		localStorageService.updateRefreshToken(refreshToken);
		localStorageService.updateUserId(userId);
		dispatch(authSuccess(accessToken, userId, firstName, lastName, false));
		// TODO: auth check timer
	};

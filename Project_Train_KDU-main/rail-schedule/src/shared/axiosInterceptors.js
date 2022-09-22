import Axios from "axios";

import { APIHost } from "./consts";
import { FORBIDDEN, SIGNIN } from "./routes";

const STATUS_UNAUTHORIZED = 401;
const STATUS_FORBIDDEN = 403;

export const init = (store) => {
	Axios.defaults.baseURL = APIHost;

	Axios.interceptors.request.use(
		(config) => {
			const token = store.getState().auth.token;
			if (token) {
				config.headers["authorization"] = `Bearer ${token}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	Axios.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error) => {
			// const originalConfig = error.config;
			// if (originalConfig.url !== constants.loginRoute && error.response) {
			// 	if (
			// 		originalConfig.url !== constants.refreshTokenRoute &&
			// 		error.response.status === STATUS_UNAUTHORIZED &&
			// 		!originalConfig._retry
			// 	) {
			// 		console.log(originalConfig.url);
			// 		originalConfig._retry = true;

			// 		try {
			// 			const rToken = localStorageService.getRefreshToken();
			// 			const res = await refreshAccessToken(rToken);

			// 			const { accessToken, refreshToken } = res.data;
			// 			localStorageService.updateAccessToken(accessToken);
			// 			localStorageService.updateRefreshToken(refreshToken);

			// 			return Axios(originalConfig);
			// 		} catch (_error) {
			// 			return Promise.reject(_error);
			// 		}
			// 	} else if (error.response.status === STATUS_UNAUTHORIZED) {
			// 		// if (window.location.pathname !== SIGNIN)
			// 		// 	window.location.href = SIGNIN;
			// 	} else if (error.response.status === STATUS_FORBIDDEN) {
			// 		window.location.href = FORBIDDEN;
			// 	}
			// }
			if (error.response.status === STATUS_UNAUTHORIZED) {
				if (window.location.pathname !== SIGNIN) {
				}
				// window.location.href = SIGNIN;
			} else if (error.response.status === STATUS_FORBIDDEN) {
				window.location.href = FORBIDDEN;
			}
			return Promise.reject(error);
		}
	);
};

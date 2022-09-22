import { postRequest, deleteRequest, putRequest, getRequest } from "./utils";
import * as constants from "../shared/consts";

export const register = (data) => postRequest(constants.registerRoute, data);

export const login = (data) => postRequest(constants.loginRoute, data);

export const refreshAccessToken = (rToken) =>
  postRequest(constants.refreshTokenRoute, { refreshToken: rToken });

export const logout = (rToken) =>
  deleteRequest(`${constants.logoutRoute}/${rToken}`);

export const forgotPassword = (email) =>
  getRequest(`${constants.forgotPassword}?email=${email}`);

export const resetPassword = (email, body) =>
  putRequest(`${constants.resetPassword}?email=${email}`, body);

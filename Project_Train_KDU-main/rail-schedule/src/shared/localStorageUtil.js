// const accessTokenKey = "accessToken";
const refreshTokenKey = "refreshToken";
const userIdKey = "userId";

export const updateRefreshToken = (token) =>
	localStorage.setItem(refreshTokenKey, token);

export const getRefreshToken = () => localStorage.getItem(refreshTokenKey);

export const updateUserId = (id) => localStorage.setItem(userIdKey, id);

export const getUserId = () => localStorage.getItem(userIdKey);

export const clearOnLogOut = () => {
	localStorage.removeItem(refreshTokenKey);
	localStorage.removeItem(userIdKey);
};

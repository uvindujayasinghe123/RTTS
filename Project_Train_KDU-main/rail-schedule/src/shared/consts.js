export const APIHost = "http://localhost:5000";

// Auth Const
export const authRedirectPath = "/";

// Device Token
export const deviceTokenKey = "LearnOneDeviceToken";

// Api Routes
const AUTH_URL = "http://localhost:5000/auth";
export const loginRoute = `${AUTH_URL}/login`;
export const registerRoute = `${AUTH_URL}/register`;
export const refreshTokenRoute = `${AUTH_URL}/refresh-token`;
export const logoutRoute = `${AUTH_URL}/logout`;
export const resetPassword = `${AUTH_URL}/reset-password`;
export const forgotPassword = `${AUTH_URL}/forgot-password`;

export const USER_URL = "/v1/user";

export const DESIGNS_URL = "/v1/design";

export const SHOPITEM_URL = "/v1/shop-item";

export const UPLOAD = "/v1//uploads"; // append the upload directory path

//	//Builder API routes
export const USER_SHOP_ITEM_BUILDER = "/v1/user-shop-item-builder";
export const BUILDER_TEMPLATE = "/v1/builder-template";
export const BUILDER_TEMPLATE_STATE = "/v1/builder-template-state";

// Item path params
export const PRODUCT_TYPES = {
	PHOTO_FRAME: "Photo Frame",
	PHOTO_ALBUM: "Photo Album",
	PHOTO_PRINT: "Photo Print"
};


export const designAvailableItemList = ["Photo Frame", "Photo Album", "Photo Print"];

export const alertStates = {
	VISIBLE: 0,
	HIDDING: 1,
	HIDDEN: 2,
};

export const alertTypes = {
	ERROR: "ERROR",
	SUCCESS: "SUCCESS",
};

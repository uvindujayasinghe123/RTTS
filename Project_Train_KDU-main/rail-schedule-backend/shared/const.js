module.exports = Object.freeze({
	// model names
	CATEGORY: "Category",
	DESIGN: "Design",
	SHOPITEM: "ShopItem",
	USER_SHOPITEM_BUILDER: "UserShopItemBuilder",
	USER_BULK_SHOPITEM_BUILDER: "UserBulkShopItemBuilder",
	BUILDER_TEMPLATE: "BuilderTemplate",
	BUILDER_TEMPLATE_STATE: "BuilderTemplateState",
	USER: "User",
	SHOP: "Shop",
	ORDER: "Order",
	ORDER_BULK: "OrderBulk",
	CATEGORY_ATTRIBUTE: "CategoryAttribute",
	ADDRESS: "Address",
	ORDER_INQUIRY: "OrderInquiry",
	ORDER_EVENT: "OrderEvent",
	PROVINCE: "ConfigProvince",
	DISTRICT: "ConfigDistrict",
	CITY: "ConfigCity",

	USER_SHOPITEM_BUILDER_TYPES: {
		BULK: "UserShopItemBuilderBulk",
		SINGLE: "UserShopItemBuilderSingle",
	},

	// order bulk stages
	ORDER_BULK_STAGES: {
		ORDER_PLACED: "order-placed",
		SELLER_ACCEPTED: "seller-accepted",
		SELLER_REJECTED: "seller-rejected",
		USER_CANCELLED: "user-cancelled",
		READY_TO_DISPATCH: "ready-dispatch",
		DISPATCHED: "dispatched",
		COMPLETED: "completed",
	},

	// order stages
	ORDER_STAGES: {
		ORDER_PLACED: "order-placed",
		SELLER_ACCEPTED: "seller-accepted",
		SELLER_REJECTED: "seller-rejected",
		USER_CANCELLED: "user-cancelled",
		READY_TO_DISPATCH: "ready-dispatch",
		DISPATCHED: "dispatched",
		COMPLETED: "completed",
	},

	// payment method
	PAYMENT_METHODS: {
		NONE: "none",
		CARD: "card-payment",
		CASH_ON_DELIVERY: "cash-on-delivery",
	},

	// order events
	ORDER_EVENT_TYPE: {
		ORDER_PLACED: "order-placed",
		SELLER_ACCEPTED: "seller-accepted",
		SELLER_REJECTED: "seller-rejected",
		USER_CANCELLED: "user-cancelled",
		READY_TO_DISPATCH: "ready-dispatch",
		DISPATCHED: "dispatched",
		COMPLETED: "completed",
		INQUIRY_CREATED: "inquiry",
	},

	ORDER_EVENT_MESSAGES: {
		ORDER_PLACED: "Order Placed",
		SELLER_ACCEPTED: "seller-accepted",
		SELLER_REJECTED: "seller-rejected",
		USER_CANCELLED: "user-cancelled",
		READY_TO_DISPATCH: "ready-dispatch",
		DISPATCHED: "dispatched",
		COMPLETED: "completed",
		INQUIRY_CREATED: "inquiry",
	},

	// model status
	DELETED: 0,
	ACTIVE: 1,

	// user roles
	ROLES: {
		SUPER_ADMIN: "super-admin",
		SHOP_OWNER: "shop-owner",
		CUSTOMER: "customer",
	},
});

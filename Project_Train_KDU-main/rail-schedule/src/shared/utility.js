import { deviceTokenKey, alertTypes, alertStates } from "./consts.js";

export const INDEX = "INDEX";

export const updateObject = (object, updates) => {
	return {
		...object,
		...updates,
	};
};

export const checkValidity = (rules, value, optMatcher = "") => {
	let isValid = true;
	if (!rules) {
		return true;
	}

	if (rules.required) {
		isValid = value.trim() !== "" && isValid;
	}

	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
	}

	if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
	}

	if (rules.isEmail) {
		const pattern =
			/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		isValid = pattern.test(value) && isValid;
	}

	if (rules.mustMatch) {
		isValid = value === optMatcher;
	}

	if (rules.valueMin) {
		isValid = value >= rules.valueMin && isValid;
	}

	if (rules.valueMax) {
		isValid = value <= rules.valueMax && isValid;
	}

	if (rules.isZipCode) {
		const pattern = /(\b[0-9]{5}\b)/;
		isValid = pattern.test(value.replaceAll(" ", ""));
	}

	if (rules.isTel) {
		const pattern = /(\b[0-9]{10}\b)/;
		isValid = pattern.test(value.replaceAll(" ", ""));
	}

	return isValid;
};

/**
 * Used to update an array immutabaly
 * @param {array} array the original JS array
 * @param {object} item item to be added
 */
export const addItemToArray = (array, item) => {
	let newArray = [...array];
	newArray.push(item);
	return newArray;
};

/**
 * Used to remve item from an array immutabaly
 * @param {array} array the original JS array
 * @param {string} fieldName name of the field to identify the object from
 * @param {value} value value of the field
 */
export const removeItemFromArray = (array, fieldName, value) => {
	if (fieldName === INDEX) {
		let arr = array.filter((item, index) => {
			return index !== value;
		});

		return arr;
	}
	let newArr = array.filter((item) => {
		return item[fieldName] !== value;
	});

	return newArr;
};

export const getDeviceTokenKey = (userId) => `${deviceTokenKey}_${userId}`;

export const extractValueListFromArray = (arr, prop) => {
	let extractedValue = arr.map((item) => item[prop]);
	return extractedValue;
};

export const provinceList = [
	{
		name: "Central",
		districtList: ["Kandy", "Matale", "Nuwara Eliya"],
	},
	{
		name: "Eastern",
		districtList: ["Ampara", "Batticaloa", "Trincomalee"],
	},
	{
		name: "North Central",
		districtList: ["Anuradhapura", "Polonnaruwa"],
	},
	{
		name: "Northern",
		districtList: [
			"Jaffna",
			"Kilinochchi",
			"Mannar",
			"Mulativu",
			"Vavuniya",
		],
	},
	{
		name: "North Western",
		districtList: ["Kurunegala", "Puttalam"],
	},
	{
		name: "Sabaragamuwa",
		districtList: ["Kegalle", "Ratnapura"],
	},
	{
		name: "Southern",
		districtList: ["Galle", "Hambantota", "Matara"],
	},
	{
		name: "Uva",
		districtList: ["Badulla", "Monaragala"],
	},
	{
		name: "Western",
		districtList: ["Colombo", "Gampaha", "Kaluthara"],
	},
];

export const getAlertObj = (
	alertText,
	isError = true,
	visibility = alertStates.VISIBLE
) => {
	const id = Date.now();
	return {
		id,
		type: isError ? alertTypes.ERROR : alertTypes.SUCCESS,
		message: alertText,
		visibility,
	};
};

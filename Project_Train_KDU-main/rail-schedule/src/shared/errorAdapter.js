import React from "react";

import { getAlertObj } from "./utility";

const networkErrorHandler = (error) => {
	return getAlertObj(error.toJSON().message, true);
};

const validationErrorHandler = (data) => {
	// let title = "Request validation failed";
	let message = "";

	if (data.errors && data.errors.length > 0) {
		// title = "Request validation failed with following errors";
		let errorItems = [];
		data.errors.forEach((validationError, index) => {
			errorItems.push(
				<li
					key={index}
				>{`${message}${validationError.field} ${validationError.defaultMessage}`}</li>
			);
		});
		message = <ul>{errorItems}</ul>;
	}

	return getAlertObj(message, true);
};

const badRequestErrorHandler = (error) => {
	let response = error.response;

	if (response.data && response.data.message) {
		if (response.data.message.includes("Validation failed for")) {
			return validationErrorHandler(response.data);
		}

		return getAlertObj(response.data.error.message, true);
	}

	return getAlertObj(error.message, true);
};

const defaultRequestErrorHandler = (error) => {
	let response = error.response;
	return getAlertObj(response.data.error.message, true);
};

const serverErrorHandler = (_) => {
	return getAlertObj("Something went wrong", true);
};

/**
 * Used to convert an axios error to an alert
 * @param {error} error error to be converted
 */
const getAlertFromError = (error) => {
	if (!error.response) {
		return networkErrorHandler(error);
	}

	switch (error.response.status) {
		case 400:
			return badRequestErrorHandler(error);
		case 500:
			return serverErrorHandler(error);
		default:
			return defaultRequestErrorHandler(error);
	}
};

export default getAlertFromError;

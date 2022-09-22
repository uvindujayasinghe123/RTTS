import * as actionTypes from "./actionTypes";

const addAlert = (alert) => {
	return {
		type: actionTypes.ADD_ALERT,
		alert: alert,
	};
};

const startRemoveAlert = (alertId) => {
	return {
		type: actionTypes.START_REMOVE_ALERT,
		alertId: alertId,
	};
};

const removeAlert = (alertId) => {
	return {
		type: actionTypes.REMOVE_ALERT,
		alertId: alertId,
	};
};

export const onAlertAdded = (alert) => (dispatch) => {
	dispatch(addAlert(alert));
	setTimeout(() => {
		dispatch(startRemoveAlert(alert.id));
		setTimeout(() => {
			dispatch(removeAlert(alert.id));
		}, 1000);
	}, 3000);
};

export const onAlertRemove = (alertId) => (dispatch) => {
	dispatch(startRemoveAlert(alertId));
	setTimeout(() => {
		dispatch(removeAlert(alertId));
	}, 1000);
};

import { addItemToArray, updateObject } from "../../shared/utility";
import { alertStates } from "../../shared/consts";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
	alerts: [],
};

const addAlert = (state, action) => {
	let alertState = {
		alerts: addItemToArray(state.alerts, action.alert),
	};

	return updateObject(state, alertState);
};

const startRemoveAlert = (state, action) => {
	const newAlerts = [...state.alerts];
	const alertIndex = newAlerts.findIndex(
		(alert) => alert.id === action.alertId
	);
	if (alertIndex > -1) {
		newAlerts[alertIndex].visibility = alertStates.HIDDING;
		return { ...state, alerts: newAlerts };
	}
	return { ...state };
};

const removeAlert = (state, action) => {
	const newAlerts = [...state.alerts];
	const alertIndex = newAlerts.findIndex(
		(alert) => alert.id === action.alertId
	);
	if (alertIndex > -1) {
		newAlerts[alertIndex].visibility = alertStates.HIDDEN;
		return { ...state, alerts: newAlerts };
	}
	return { ...state };
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_ALERT:
			return addAlert(state, action);
		case actionTypes.REMOVE_ALERT:
			return removeAlert(state, action);
		case actionTypes.START_REMOVE_ALERT:
			return startRemoveAlert(state, action);
		default:
			return state;
	}
};

export default reducer;

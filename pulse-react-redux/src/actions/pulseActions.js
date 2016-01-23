import fetch from 'isomorphic-fetch';
import * as types from '../constants/ActionTypes';
import * as serverConstants from '../constants/ServerConstants';

export function saveFuelSavings(settings) {
	return { type: types.SAVE_FUEL_SAVINGS, settings };
}

export function calculateFuelSavings(settings, fieldName, value) {
	return { type: types.CALCULATE_FUEL_SAVINGS, settings, fieldName, value };
}

export function requestLoginUser(request) {
	return { type: types.REQUEST_LOGIN_USER, request};
}

export function receiveLoginUser(user) {
	return { type: types.RECEIVE_LOGIN_USER, user};
}

export function requestClasses(sessionToken) {
	return { type: types.REQUEST_CLASSES, sessionToken};
}

export function receiveClasses(pulseClasses) {
	return { type: types.RECEIVE_CLASSES, pulseClasses};
}

export function loginUser(request) {
	console.log(request);
	return dispatch => {
		dispatch(requestLoginUser(request));
		return fetch(serverConstants.login, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: request.username,
				password: request.password
			})
		})
			.then(response => response.json())
			.then(json => dispatch(receiveLoginUser(json)));
	}
}

export function shouldLoginUser(state) {
	const user = state.user;
	if(!user) {
		return true;
	} else if(user.isFetching) {
		return false;
	} else {
		return user.didInvalidate;
	}
}

export function loginUserIfNeeded(request) {
	console.log("Blah");
	return (dispatch, getState) => {
		console.log("Inside return")
		if(shouldLoginUser(getState())) {
			console.log("Login user");
			return dispatch(loginUser(request));
		}
	}
}

export function fetchPulseClasses(sessionToken) {
	return dispatch => {
		dispatch(requestClasses(sessionToken));
		const url = serverConstants.getClasses + "?sessionToken=" + sessionToken;
		return fetch(url)
			.then(response => response.json())
			.then(json => dispatch(receiveClasses(json)));
	}
}

export function shouldFetchPulseClasses(state) {
	const classState = state.classState;
	if(!classState) {
		return true;
	} else if(classState.isFetching) {
		return false;
	} else {
		return classState.didInvalidate;
	}
}

export function fetchPulseClassesIfNeeded(sessionToken) {
	return (dispatch, getState) => {
		if(shouldFetchPulseClasses(getState())) {
			return dispatch(fetchPulseClasses(sessionToken));
		}
	}
}

import fetch from 'isomorphic-fetch';
import * as types from '../constants/ActionTypes';
import * as serverConstants from '../constants/ServerConstants';

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

/*
settings: {
  classId: String,
  sessionToken: String
}
 */
export function requestClassSessions(settings) {
  return { type: types.REQUEST_CLASS_SESSIONS, settings}
}

export function receiveClassSessions(classSessions) {
  return { type: types.RECEIVE_CLASS_SESSIONS, classSessions};
}

export function setCurrentClass(index) {
  return { type: types.SET_CURRENT_CLASS, index};
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

//isFetchingClassSessions
export function fetchClassSessions(settings) {
  return dispatch => {
    dispatch(requestClassSessions(settings));
    const url = serverConstants.getClassSessions(settings.classId) + "?sessionToken=" + settings.sessionToken;
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveClasses(json)));
  }
}

export function shouldFetchClassSessions(state) {
  const currentClassState = state.currentClassState;
  if(!currentClassState) {
    return true;
  } else if(currentClassState.isFetchingClassSessions) {
    return false;
  } else {
    return currentClassState.didInvalidateClassSessions;
  }
}

export function fetchClassSessionsIfNeeded(settings) {
  return (dispatch, getState) => {
    if(shouldFetchClassSessions(getState())) {
      return dispatch(fetchClassSessions(settings));
    }
  }
}

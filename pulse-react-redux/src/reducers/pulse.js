import {REQUEST_LOGIN_USER, RECEIVE_LOGIN_USER, REQUEST_CLASSES, RECEIVE_CLASSES, SET_CURRENT_CLASS, REQUEST_CLASS_SESSIONS, RECEIVE_CLASS_SESSIONS} from '../constants/ActionTypes';
import objectAssign from 'object-assign';
import {actionTypes} from 'redux-localstorage';
const initialState = {
  user : {
    currentUser: null,
    isFetching: false,
    didInvalidate: false
  },
  classState: {
    pulseClasses: null,
    isFetching: false,
    didInvalidate: false
  },
  currentClassState: {
    currentClass: null,
    classSessions: null,
    isFetchingClassSessions: false,
    didInvalidateClassSessions: false
  }
}

export default function pulseAppState(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INIT:
      const persistedState = action.payload.pulseAppState;
      console.log("Blah Per");
      console.log(state);
      console.log(persistedState);
      return Object.assign({}, state, {
        user: persistedState.user
      });
    case REQUEST_LOGIN_USER:
      return Object.assign({}, state, {
        user: {
          isFetching: true,
          didInvalidate: false
        }
      });
    case RECEIVE_LOGIN_USER:
      return Object.assign({}, state, {
        user: {
          currentUser: action.user,
          isFetching: false,
          didInvalidate: false
        }
      });
    case REQUEST_CLASSES:
      return Object.assign({}, state, {
        classState: {
          isFetching: true,
          didInvalidate: false
        }
      });
    case RECEIVE_CLASSES:
      return Object.assign({}, state, {
        classState: {
          pulseClasses: action.pulseClasses,
          isFetching: false,
          didInvalidate: false
        }
      });
    case SET_CURRENT_CLASS:
      return Object.assign({}, state, {
        currentClassState: {
          currentClass: action.index
        }
      });
    case REQUEST_CLASS_SESSIONS:
      return Object.assign({}, state, {
        currentClassState: {
          isFetchingClassSessions: true,
          didInvalidateClassSessions: false
        }
      });
    case RECEIVE_CLASS_SESSIONS:
      return Object.assign({}, state, {
        currentClassState: {
          classSessions: action.classSessions,
          isFetchingClassSessions: false,
          didInvalidateClassSessions: false
        }
      });
    default:
      return state;
  }
}

//IMPORTANT: Note that with Redux, state should NEVER be changed.
//State is considered immutable. Instead,
//create a copy of the state passed and set new values on the copy.
//Note that I'm using Object.assign to create a copy of current state
//and update values on the copy.
// export default function fuelSavingsAppState(state = initialState, action) {
// 	switch (action.type) {
// 		case SAVE_FUEL_SAVINGS:
// 			//in a real app we'd trigger an AJAX call here. For this example, just simulating a save by changing date modified.
// 			return objectAssign({}, state, { dateModified: dateHelper.getFormattedDateTime(new Date()) });
//
// 		case CALCULATE_FUEL_SAVINGS:
// 			let newState = objectAssign({}, state);
// 			newState[action.fieldName] = action.value;
// 			let calc = calculator();
// 			newState.necessaryDataIsProvidedToCalculateSavings = calc.necessaryDataIsProvidedToCalculateSavings(newState);
// 			newState.dateModified = dateHelper.getFormattedDateTime(new Date());
//
// 			if (newState.necessaryDataIsProvidedToCalculateSavings) {
// 				newState.savings = calc.calculateSavings(newState);
// 			}
//
// 			return newState;
//
// 		default:
// 			return state;
// 	}
// }

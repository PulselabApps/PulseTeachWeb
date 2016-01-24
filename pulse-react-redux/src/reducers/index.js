import { combineReducers } from 'redux';
import {routeReducer} from 'redux-simple-router';
import pulseAppState from './pulse';

const rootReducer = combineReducers({
  pulseAppState,
  routeReducer
});

export default rootReducer;

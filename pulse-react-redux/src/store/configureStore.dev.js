//Remember to keep the production/development version of this file in sync.
//This boilerplate file is likely to be the same for each project that uses Redux.
//With Redux, the actual stores are in /reducers.

import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';
//import {browserHistory} from 'react-router';
import {syncHistory} from 'redux-simple-router';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import createHistory from 'history/lib/createHashHistory';

const reducer = compose(
  mergePersistedState()
)(rootReducer);

const storage = compose(
  filter('pulseAppState')
)(adapter(window.localStorage));

const history = createHistory();
console.log(history);
const reduxRouterMiddleware = syncHistory(history);
const loggerMiddleware = createLogger();
const finalCreateStore = compose(
  persistState(storage, 'my-storage-key'),
  applyMiddleware(thunkMiddleware, loggerMiddleware, reduxRouterMiddleware),
  // Middleware you want to use in development:
  //applyMiddleware(d1, d2, d3),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  // Add middleware
  //const store = finalCreateStore(rootReducer, initialState);
  const store = finalCreateStore(reducer, initialState);
  //reduxRouterMiddleware.listenForReplays(store);
  // Configure the store for hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

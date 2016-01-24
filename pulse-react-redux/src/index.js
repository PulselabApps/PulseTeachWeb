import 'babel-core/polyfill';
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from './containers/App';
import PulseSummary from './components/PulseSummary';
import configureStore from './store/configureStore';
import './styles/styles.scss'; //Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
//import '../node_modules/jquery/dist/jquery.min';
//import '../node_modules/bootstrap/dist/js/bootstrap.min';
const store = configureStore();



render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={PulseSummary} />
      </Route>
    </Router>
  </Provider>, document.getElementById('app')
)

//render(
//  <Provider store={store}>
//    <App />
//  </Provider>, document.getElementById('app')
//);
if (process.env.NODE_ENV !== 'production') {
  const showDevTools = require('./showDevTools');
  showDevTools(store);
}

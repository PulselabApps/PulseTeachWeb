// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PulseActions from '../actions/pulseActions';
import PulseSummary from '../components/PulseSummary';
import Navbar from '../components/PartialComponents/Navbar';
// import FuelSavingsApp from '../components/FuelSavingsApp';
// import * as FuelSavingsActions from '../actions/fuelSavingsActions';

class App extends React.Component {

  // componentDidMount() {
  //   PulseActions.loginUserIfNeeded({username: "math_teacher", password: "math_teacher"});
  // }

  render() {
    const {pulseAppState, actions } = this.props;

    return (
      <div>
        <Navbar user={pulseAppState.user} actions={actions}/>
        <h1>Hello</h1>
      <PulseSummary pulseAppState={pulseAppState} actions={actions}/>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  pulseAppState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    pulseAppState: state.pulseAppState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PulseActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

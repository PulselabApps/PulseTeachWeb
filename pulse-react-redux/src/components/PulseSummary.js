import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PulseActions from '../actions/pulseActions';
import ClassesOverview from './ClassesOverview';

class PulseSummary extends React.Component {
  componentDidMount() {
    //this.props.actions.loginUserIfNeeded({username: "math_teacher", password: "math_teacher"});
  }

  render() {
    const {pulseAppState, actions } = this.props;
    var loggedInStatus;
    if(!pulseAppState.user.currentUser) {
      loggedInStatus = (<h1>GET REKT, NOT LOGGED IN</h1>);
    } else {
      loggedInStatus = (
        <div>
          <h1>YOU LOGGED IN, as {this.props.pulseAppState.user.currentUser.username}</h1>
          <ClassesOverview pulseAppState={pulseAppState} actions={actions} />
        </div>
        )
      // this.props.actions.fetchPulseClassesIfNeeded(this.props.pulseAppState.user.currentUser.sessionToken);
    }
    return (
      <div>
        <h1>Blah log</h1>
      {loggedInStatus}
      </div>
    )
  }
}

// const PulseSummary = (props) => {
//   // const save = function () {
//   //   props.actions.saveFuelSavings(props.pulseAppState);
//   // };
//
//   // const onTimeframeChange = function (e) {
//   //   props.actions.calculateFuelSavings(props, 'milesDrivenTimeframe', e.target.value);
//   // };
//   //
//   // const fuelSavingsKeypress = function (name, value) {
//   //   props.actions.calculateFuelSavings(props, name, value);
//   // };
//
//   const settings = props.pulseAppState;
//
//   return (
//     <div>
//     <h1>Blah Blah</h1>
//     </div>
//     );
// };

PulseSummary.propTypes = {
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
)(PulseSummary);

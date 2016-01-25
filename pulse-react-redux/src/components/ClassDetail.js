import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PulseActions from '../actions/pulseActions';
import {Table} from 'react-bootstrap';
class ClassDetail extends React.Component {
  componentDidMount() {
    console.log("detail params");
    console.log(this.props.params);
    this.props.actions.fetchClassSessionsIfNeeded({
      classId: this.props.params.classId,
      sessionToken: this.props.pulseAppState.user.currentUser.sessionToken
    });
  }

  render() {
    var sessionTable;

    const {pulseAppState, actions } = this.props;
    if(!pulseAppState.currentClassState.classSessions) {
      sessionTable = (
        <div className="box-loading">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      );
    } else {
      var innerTable = pulseAppState.currentClassState.classSessions.map(c => {
        return (
          <tr key={c.objectId}>
            <td className="text">{c.createdAt}</td>
          </tr>
        )
      });

      sessionTable = (
        <Table striped responsive>
          <thead>
            <tr>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {innerTable}
          </tbody>
        </Table>
      )
    }

    return (
      <div>
      {sessionTable}
        </div>
    );
  }
}

ClassDetail.propTypes = {
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
)(ClassDetail);

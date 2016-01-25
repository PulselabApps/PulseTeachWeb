import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PulseActions from '../actions/pulseActions';
import {Table, Grid, Row, Col} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

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

    let studentData = [
      {
        name: "Al Allect",
        grade: "90%"
      },
      {
        name: "Bill Blasio",
        grade: "43%"
      },
      {
        name: "Hillary Clinton",
        grade: "10%"
      },
      {
        name: "Bernie Sanders",
        grade: "120%"
      }
    ];

    var options = {
      sortName: "name",
      sortOrder: "desc"
    };

    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={6}>
              <h4>Sessions</h4>
              {sessionTable}
            </Col>
            <Col md={6}>
              <h4>Top Students</h4>
              <BootstrapTable data={studentData} options={options}>
                <TableHeaderColumn dataField="name" isKey={true} dataSort={true}>Name</TableHeaderColumn>
                <TableHeaderColumn dataField="grade" dataSort={true}>Grade</TableHeaderColumn>
              </BootstrapTable>
            </Col>
          </Row>
        </Grid>
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

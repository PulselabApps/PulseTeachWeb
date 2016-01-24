import React, {PropTypes} from 'react';
import {Grid, Row, Col, Button, ButtonInput} from 'react-bootstrap';
//import Form from 'react-router-form';

import styles from '../styles/styles.scss';

class ClassesOverview extends React.Component {
  componentDidMount() {
    this.props.actions.fetchPulseClassesIfNeeded(this.props.pulseAppState.user.currentUser.sessionToken);
  }

  render() {
    var classesToDisplay;
    console.log(styles);
    if (this.props.pulseAppState.classState.pulseClasses) {
      const classState = this.props.pulseAppState.classState;
      classesToDisplay = classState.pulseClasses.map(function (rawItem, index) {
        var classLink = "/class/" + rawItem.objectId;
        return (
          <Col sm={4} key={index}>
            <form action={classLink} method="GET">
              <button type="submit" className={styles.classButton} id="blah">
                <i className="fa fa-pencil fa-3x"></i><span className="pulse-class-font-size">{rawItem.name}</span>
              </button>
            </form>
          </Col>
        )
      });
      //
    } else {
      classesToDisplay = (<h3>No Classes to display :(</h3>);
    }

    return (
      <div>
        <h2>Classes</h2>
      {classesToDisplay}
      </div>
    )
  }
}

ClassesOverview.propTypes = {
  actions: PropTypes.object.isRequired,
  pulseAppState: PropTypes.object.isRequired
};

export default ClassesOverview;

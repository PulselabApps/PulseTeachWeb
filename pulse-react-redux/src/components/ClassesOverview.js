import React, {PropTypes} from 'react';

class ClassesOverview extends React.Component {
  componentDidMount() {
    this.props.actions.fetchPulseClassesIfNeeded(this.props.pulseAppState.user.currentUser.sessionToken);
  }

  render() {
    var classesToDisplay;

    if (this.props.pulseAppState.classState.pulseClasses) {
      const classState = this.props.pulseAppState.classState;
      classesToDisplay = classState.pulseClasses.map(function (rawItem) {
        return (
          <h4>{rawItem.name}</h4>
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

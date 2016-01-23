import React, {PropTypes} from 'react';
import {Button, Input} from 'react-bootstrap';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.loginButtonPressed = this.loginButtonPressed.bind(this);
  }

  loginButtonPressed() {
    console.log(this.refs.username.getValue());
    console.log(this.refs.password.getValue());
    console.log("Login Button Pressed");

    const request = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue()
    };

    this.props.actions.loginUserIfNeeded(request);

  }

  render() {
    const {user} = this.props;
    var logInTag;
    if(user.currentUser) {
      logInTag = (
        <li className="active"><a href="#">Hi, {user.currentUser.username}</a></li>
      );
    } else {
      logInTag = (
          <li className="dropdown" id="menuLogin">
            <a className="dropdown-toggle" href="#" data-toggle="dropdown" id="navLogin">Login</a>
            <div className="dropdown-menu" style={{padding: 17}}>
              <form>
                <div className="form-group">
                  <Input type="text" className="form-control" label="Username" placeholder="username"
                         ref="username"/>
                </div>
                <div className="form-group">
                  <Input type="password" className="form-control" label="Password" ref="password"/>
                </div>
                <div className="form-group">
                  <Button value="Login" onClick={this.loginButtonPressed}>Login</Button>

                </div>
              </form>
            </div>
          </li>
      );
    }
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top pulse-navbar">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <a className="navbar-brand" href="/">PulseTeach</a>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-left">
              <li className="active"><a href="#">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {logInTag}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default Navbar;

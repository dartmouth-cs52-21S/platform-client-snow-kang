import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { signupUser, clearError } from '../actions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    // Remove toasts from previous pages
    toast.dismiss();
    this.props.clearError();
  }

  handleUsernameEdit = (e) => {
    this.setState({ username: e.target.value });
  }

  handleEmailEdit = (e) => {
    this.setState({ email: e.target.value });
  }

  handlePasswordEdit = (e) => {
    this.setState({ password: e.target.value });
  }

  handleSignup = () => {
    const user = this.state;
    this.props.signupUser(user, this.props.history);
  }

  render() {
    return (
      <div className="authentication-entries">
        <div className="edit-box">
          <input type="text"
            onChange={this.handleUsernameEdit}
            value={this.state.username}
            placeholder="Username"
          />
          <input type="text"
            onChange={this.handleEmailEdit}
            value={this.state.email}
            placeholder="Email"
          />
          <input type="password"
            onChange={this.handlePasswordEdit}
            value={this.state.password}
            placeholder="Password"
          />
          <div className="buttons">
            <input type="button" onClick={this.handleSignup} value="Sign Up" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { signupUser, clearError })(Signup);

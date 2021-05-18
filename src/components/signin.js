import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { signinUser, clearError } from '../actions';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    // Remove toasts from previous pages
    toast.dismiss();
    this.props.clearError();
  }

  handleEmailEdit = (e) => {
    this.setState({ email: e.target.value });
  }

  handlePasswordEdit = (e) => {
    this.setState({ password: e.target.value });
  }

  handleSignin = () => {
    const user = this.state;
    this.props.signinUser(user, this.props.history);
  }

  render() {
    return (
      <div>
        <input type="text"
          onChange={this.handleEmailEdit}
          value={this.state.email}
          placeholder="Email"
        />
        <input type="text"
          onChange={this.handlePasswordEdit}
          value={this.state.password}
          placeholder="Password"
        />
        <input type="button" onClick={this.handleSignin} value="Sign In" />
      </div>
    );
  }
}

export default connect(null, { signinUser, clearError })(Signin);

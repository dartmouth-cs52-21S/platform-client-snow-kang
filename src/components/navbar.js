import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { signoutUser } from '../actions';

const logo = require('../img/logo.png');

const NavBar = (props) => {
  const handleSignout = () => {
    props.signoutUser(props.history);
  };

  const renderNavOptions = () => {
    if (props.authenticated) {
      return (
        <ul>
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink exact to="/posts/new">Create</NavLink></li>
          <li><NavLink exact to="/signout" onClick={handleSignout}>Sign out</NavLink></li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink exact to="/posts/new">Create</NavLink></li>
          <li><NavLink exact to="/signin">Sign in</NavLink></li>
          <li><NavLink exact to="/signup">Sign up</NavLink></li>
        </ul>
      );
    }
  };

  return (
    <header>
      <div>
        <NavLink exact to="/"><img src={logo} alt="Compli-Pets Logo" id="logo" /></NavLink>
        <nav>
          { renderNavOptions() }
        </nav>
      </div>
      <div>
        Compliment each other&apos;s pets <i className="far fa-heart" />
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default withRouter(connect(mapStateToProps, { signoutUser })(NavBar));

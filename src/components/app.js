import '../style.scss';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatedSwitch, spring } from 'react-router-transition';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import NavBar from './navbar';
import NewPost from './newPost';
import Posts from './posts';
import ExpandedPost from './expandedPost';
import Signin from './signin';
import Signup from './signup';
import PrivateRoute from './privateRoute';
import { clearError } from '../actions';

/* Page transition code from documentation here
  http://maisano.github.io/react-router-transition/animated-switch/code
*/

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 120,
    damping: 23,
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

const FallBack = () => {
  return <div>post not found</div>;
};

const App = (props) => {
  useEffect(() => {
    if (props.errorMessage) {
      toast(props.errorMessage, { onClose: props.clearError });
    }
  }, [props.errorMessage]);

  return (
    <Router>
      <NavBar />
      <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className="switch-wrapper"
      >
        <Route exact path="/" component={Posts} />
        <PrivateRoute exact path="/posts/new" component={NewPost} />
        <Route exact path="/posts/:postID" component={ExpandedPost} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route component={FallBack} />
      </AnimatedSwitch>
      <ToastContainer position="bottom-center" autoClose={7000} />
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.error.errorMessage,
  };
};

export default connect(mapStateToProps, { clearError })(App);

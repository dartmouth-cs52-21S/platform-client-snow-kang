import '../style.scss';
import React from 'react';
import {
  BrowserRouter as Router, Route, NavLink,
} from 'react-router-dom';
import { AnimatedSwitch, spring } from 'react-router-transition';
import { ToastContainer } from 'react-toastify';
import NewPost from './newPost';
import Posts from './posts';
import ExpandedPost from './expandedPost';

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

const logo = require('../img/logo.png');

const NavBar = () => {
  return (
    <header>
      <div>
        <NavLink exact to="/"><img src={logo} alt="Logo saying Compli-Pets" id="logo" /></NavLink>
        <nav>
          <ul>
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink exact to="/posts/new">Create</NavLink></li>
          </ul>
        </nav>
      </div>
      <div>
        Compliment each other&apos;s pets <i className="far fa-heart" />
      </div>
    </header>
  );
};

const FallBack = () => {
  return <div>post not found</div>;
};

const App = () => {
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
        <Route exact path="/posts/new" component={NewPost} />
        <Route exact path="/posts/:postID" component={ExpandedPost} />
        <Route component={FallBack} />
      </AnimatedSwitch>
      <ToastContainer position="bottom-center" autoClose={7000} />
    </Router>
  );
};

export { App as default };

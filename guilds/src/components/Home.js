import React, { Component } from 'react';
import {
  BrowserRouter,
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
} from 'react-router-dom';

import Login from './Login';
import Signup from './SignUp';
import ForgotPassword from './ForgotPassword';
import guildlogo from '../images/guildslogo.png';
import '../App.css';

// const styleTitle = {
//   float: 'Left'
// }

class Home extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <div className='App__Aside'>
            <img src={guildlogo} alt=''></img>
            <h4 className='caption'>
              Join to connect and trade within your campus
            </h4>
          </div>
          <div className='App__Form'>
            <div className='PageSwitcher'>
              <NavLink
                to='/sign-in'
                activeClassName='PageSwitcher__Item--Active'
                className='PageSwitcher__Item'
              >
                Sign In
              </NavLink>
              <NavLink
                exact
                to='/'
                activeClassName='PageSwitcher__Item--Active'
                className='PageSwitcher__Item'
              >
                Sign Up
              </NavLink>
            </div>
            <div className='FormTitle'>
              <NavLink
                to='/sign-in'
                activeClassName='FormTitle__Link--Active'
                className='FormTitle__Link'
              >
                Sign In
              </NavLink>{' '}
              or{' '}
              <NavLink
                exact
                to='/'
                activeClassName='FormTitle__Link--Active'
                className='FormTitle__Link'
              >
                Sign Up
              </NavLink>
            </div>
            <Route exact path='/' component={Signup}></Route>
            <Route path='/sign-in' component={Login}></Route>{' '}
            {/* changed Login from '/sign-in' to '/' */}
            <Route path='/forgot-password' component={ForgotPassword}></Route>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default Home;

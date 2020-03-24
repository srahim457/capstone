import React, { Component } from 'react';
import Navigation from './Navigation';
import {
  BrowserRouter,
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  Switch
} from 'react-router-dom';

import './styles/profile.css';

class Profile_Borrowed extends Component {
  render() {
    return (
      <div>
        <h1> My Borrowed Items </h1>
      </div>
    );
  }
}

export default Profile_Borrowed;

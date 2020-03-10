import React, { Component } from 'react';
import {
  BrowserRouter,
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  Switch
} from 'react-router-dom';

import Home from './Components/Home';
import Navigation from './Components/Navigation';
import Profile from './Components/Profile';
import MarketPlace from './Components/MarketPlace';
import guildlogo from './images/guildslogo.png';
import Login from './Components/Login';
import Signup from './Components/SignUp';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Home}></Route>
          <Route path='/profile' component={Profile}>
            <Navigation />
          </Route>
          <Route path='/market-place' component={MarketPlace}>
            <Navigation />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

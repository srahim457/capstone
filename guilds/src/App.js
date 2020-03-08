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
import './App.css';
import guildlogo from './images/guildslogo.png';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/profile' component={Profile}>
            <Profile></Profile>
          </Route>
          <Route path='/market-place' component={MarketPlace}>
            <MarketPlace></MarketPlace>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {
  BrowserRouter,
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Home from './components/Home';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import MarketPlace from './components/MarketPlace';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/profile' component={Profile}>
            <Navigation></Navigation>
          </Route>
          <Route path='/market-place' component={MarketPlace}>
            <Navigation></Navigation>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

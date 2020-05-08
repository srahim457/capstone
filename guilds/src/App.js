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
import AllGuilds from './components/AllGuilds';
import Messages from './components/Messages';
import Payment from './components/Payment';
import PaymentSuccess from './components/PaymentSuccess';


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
          <Route path='/all-guilds' component={AllGuilds}>
          <Navigation></Navigation>
          </Route>
          <Route path='/messages' component={Messages}>
          <Navigation></Navigation>
          </Route>
          <Route path='/payment' component={Payment}>
            <Navigation></Navigation>
          </Route>
          <Route path='/payment-success' component={PaymentSuccess}>
            <Navigation></Navigation>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

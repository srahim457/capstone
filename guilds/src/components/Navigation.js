import React from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import '../Navigation.css';
import MarketPlace from './MarketPlace';
import Profile from './Profile';
//add & import routes within content div
const Navigation = () => {
  return (
    <HashRouter>
      <div className='Nav-Bar'>
        <NavLink to='/profile'>Profile</NavLink>
        <NavLink exact to='/market-place'>
          Market Place
        </NavLink>
        <NavLink to='/all-guilds'>All Guilds</NavLink>
        <NavLink to='/messages'>Messages</NavLink>
        <NavLink to='/log-out'>Logout</NavLink>
      </div>
      <div className='content'>
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/market-place' component={MarketPlace} />
      </div>
    </HashRouter>
  );
};
export default Navigation;

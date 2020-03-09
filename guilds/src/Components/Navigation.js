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
        <NavLink to='/Profile'>Profile</NavLink>
        <NavLink to='/Market-Place'>Market Place</NavLink>
        <NavLink to='/All-Guilds'>All Guilds</NavLink>
        <NavLink to='/Messages'>Messages</NavLink>
        <NavLink to='/Log-out'>Logout</NavLink>
      </div>
      <div className='content'>
        <Route path='/Profile' component={Profile} />
        <Route path='/Market-Place' component={MarketPlace} />
      </div>
    </HashRouter>
  );
};
export default Navigation;

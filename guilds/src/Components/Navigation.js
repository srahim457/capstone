import React from 'react';
import { Route, NavLink, BrowserRouter } from 'react-router-dom';
import './styles/Navigation.css';
import MarketPlace from './MarketPlace';
import Messages from './Messages';
import Profile from './Profile.js';
import AllGuilds from './AllGuilds';

//add & import routes within content div
const Navigation = () => {
  return (
    <BrowserRouter>
      <div className='Nav-Bar'>
        <NavLink to='/profile'>Profile</NavLink>
        <NavLink to='/market-place'>Market Place</NavLink>
        <NavLink to='/all-guilds'>All Guilds</NavLink>
        <NavLink to='/messages'>Messages</NavLink>
        <NavLink to='/log-out'>Logout</NavLink>
      </div>
      <div className='content'>
        <Route path='/profile' component={Profile} />
        <Route path='/market-place' component={MarketPlace} />
        <Route path='/messages' component={Messages} />
        <Route path='/all-guilds' component={AllGuilds} />
      </div>
    </BrowserRouter>
  );
};
export default Navigation;

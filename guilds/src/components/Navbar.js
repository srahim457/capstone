// import React from 'react';
// import { Route, NavLink, BrowserRouter } from 'react-router-dom';
// import './styles/Navigation.css';
// import MarketPlace from './MarketPlace';
// import Messages from './Messages';
// import Profile from './Profile.js';
// import AllGuilds from './AllGuilds';

// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { logout } from '../../actions/auth';

// //add & import routes within content div
// const Navigation = () => {
//   return (
//     <BrowserRouter>
//       <div className='Nav-Bar'>
//         <NavLink to='/profile'>Profile</NavLink>
//         <NavLink to='/market-place'>Market Place</NavLink>
//         <NavLink to='/all-guilds'>All Guilds</NavLink>
//         <NavLink to='/messages'>Messages</NavLink>
//         <NavLink to='/log-out'>Logout</NavLink>
//       </div>
//       <div className='content'>
//         <Route path='/profile' component={Profile} />
//         <Route path='/market-place' component={MarketPlace} />
//         <Route path='/messages' component={Messages} />
//         <Route path='/all-guilds' component={AllGuilds} />
//       </div>
//     </BrowserRouter>
//   );
// };
// export default Navigation;

import React, { Fragment } from 'react';
import {
  Route,
  NavLink,
  BrowserRouter,
  Link,
  Redirect,
} from 'react-router-dom';

import MarketPlace from './MarketPlace';
import Messages from './Messages';
import Profile from './Profile.js';
import AllGuilds from './AllGuilds';
import MarketPlaceSearchResults from './MarketPlaceSearch';
import AllGuildsSearchResults from './AllGuildsSearch';
import UserSearchResults from './UserSearch';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import NotFound from './layout/NotFound';

import Payment from './Payment';
import PaymentSuccess from './PaymentSuccess';
// import ResetPassword from './ResetPassword';
// import ForgotPassword from './ForgotPassword';

import './styles/Navigation.css';


//add & import routes within content div
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <BrowserRouter>
      <div className='Nav-Bar'>
        <NavLink to='/profile'>Profile</NavLink>
        <NavLink to='/market-place'>Market Place</NavLink>
        <NavLink to='/all-guilds'>All Guilds</NavLink>
        <NavLink to='/messages'>Messages</NavLink>
        <a onClick={logout} href='#!'>
          Logout
        </a>
      </div>
      <div className='content'>
        <Route path='/profile' component={Profile} />
        <Route exact path='/market-place' component={MarketPlace} />
        <Route exact path='/messages' component={Messages} />
        <Route exact path='/all-guilds' component={AllGuilds} />
        <Route path='/payment' component={Payment} />
        <Route path='/payment-success' component={PaymentSuccess} />
        <Route path='/market-place/search-results' component={MarketPlaceSearchResults} />
        <Route path='/all-guilds/search-results' component={AllGuildsSearchResults} />
        <Route path='/messages/user-search-results' component={UserSearchResults} />
      </div>
    </BrowserRouter>
  );

  const guestLinks = <Redirect to='/' />;

  return (
    <div className='navbar bg-dark'>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

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
import Profile_Borrowed from './Profile_Borrowed';
import Profile_Listed from './Profile_Listed';
import LaserLouis from '../images/LaserLouis.jpg';

function Nombre(props) {
  return <h1>{props.name}</h1>;
}

function Rango(props) {
  return <h1>{props.status}</h1>;
}

// const element = <Nombre name='Profile' />;

class Profile extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='Background'>
          <div className='Header'>
            <div className='NameField'>
              <img src={LaserLouis} alt=''></img>
            </div>
            <div className='NameField'>
              <h1> My Name: </h1>
            </div>
            <div className='NameField'>
              <Nombre name='Rouis Lamirez' />
            </div>
            <div className='NameField'>
              <h1> Rank: </h1>
            </div>
            <div className='NameField'>
              <Rango status='Most Honorable' />
            </div>
          </div>

          <div className='Listings'>
            <div className='PageSwitcher_profile'>
              <NavLink
                to='/profile-borrowed'
                activeClassName='PageSwitcher__Item--Active'
                className='PageSwitcher__Item_profile'
              >
                Borrowed Items
              </NavLink>
              <NavLink
                exact
                to='/profile-listed'
                activeClassName='PageSwitcher__Item--Active'
                className='PageSwitcher__Item_profile'
              >
                Listed Items
              </NavLink>
            </div>
            <Route path='/profile-listed' component={Profile_Listed}></Route>
            <Route
              path='/profile-borrowed'
              component={Profile_Borrowed}
            ></Route>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Profile;

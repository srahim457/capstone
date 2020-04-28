import React, { Component } from 'react';
import {
  BrowserRouter,
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
} from 'react-router-dom';

import './styles/profile.css';
import Profile_Borrowed from './Profile_Borrowed';
import Profile_Listed from './Profile_Listed';
import EditProfile from './EditProfile';
import LaserLouis from '../images/LaserLouis.jpg';

function Nombre(props) {
  return <h1>{props.name}</h1>;
}

function Rango(props) {
  return <h1>{props.status}</h1>;
}

// const element = <Nombre name='Profile' />;

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      click: false, //added to see if it respond on click
      testToken: false,
    };

    this.onClickHandler = this.onClickHandler.bind(this);
  }
  onClickHandler(e) {
    e.preventDefault();
    this.setState({ click: true });
  }
  displayBorrowed() {
    return <Profile_Borrowed />;
  }
  displayListings(){
    return <Profile_Listed />;
  }

  listings(){
    this.setState({ testToken: false })
  }
  borrowed(){
    this.setState({ testToken: true })
  }

  render() {
    {
      /*if the edit profile button is pressed it will redirect*/
    }
    if (this.state.click === true) {
      return <EditProfile />;
    }
    return (
      <BrowserRouter>
        <div className='Background'>
          {/*The user information*/}
          <div className='Header'>
            <div className='ProfilePic'>
              {' '}
              {/*adding the profile pic*/}
              <img src={LaserLouis} alt=''></img>
            </div>
            <div className='button-container'>
              {' '}
              {/*the button that change the page to edit profile information*/}
              <button class='edit-button' onClick={this.onClickHandler}>
                Edit
              </button>
            </div>
            <div className='UserInfoContainer'>
              <div className='HeaderField'>
                {' '}
                {/*the username*/}
                <h1>My Name: </h1>
                <div className='UserField'>
                  <h1>Rouis Lamirez</h1>
                </div>
              </div>
              <div className='HeaderField'>
                {' '}
                {/*the guild ranking*/}
                <h1>My Rank: </h1>
                <div className='UserField'>
                  <h1>Most Honorable</h1>
                </div>
              </div>
            </div>
            <div className='SubfieldInfoContainer'>
              <div className='HeaderSubfield'>
                <h2>Email: </h2>
              </div>
              <div className='UserSubfield'>
                <h2> rouis.lamirez@myuniversity.edu </h2>
              </div>
              <div className='HeaderSubfield'>
                <h2>Phone: </h2>
              </div>
              <div className='UserSubfield'>
                <h2> ###-###-#### </h2>
              </div>
            </div>
          </div>

          {/*The user's listings*/}
          <div className='Listings'>
            {/*the button that switched tabs between items listed and borrowed*/}
            <div className='PageSwitcher_profile'>
              <button
                onClick = {this.listings.bind(this)}
                className={this.state.testToken === false
                            ? 'PageSwitcher__Item_profile_active'
                            : 'PageSwitcher__Item_profile'
                          }
              >
                Listed Items
              </button>
              <button
                onClick = {this.borrowed.bind(this)}
                className={this.state.testToken === true
                            ? 'PageSwitcher__Item_profile_active'
                            : 'PageSwitcher__Item_profile'
                          }
              >
                Borrowed Items
              </button>
            </div>
            {/*these components can be found in Profile_Borrowed.js and Profile_Listed.js*/}
            {this.state.testToken === true
              ? this.displayBorrowed()
              : this.displayListings()
            }
            {/*
            <Route path='/profile-listed' component={Profile_Listed}></Route>
            <Route path='/profile' component={Profile_Borrowed}></Route>
            */}
          </div>

        </div>
      </BrowserRouter>
    );
  }
}

export default Profile;

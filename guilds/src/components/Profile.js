import React, { Component } from 'react';
import {
  BrowserRouter,
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
} from 'react-router-dom';
import axios from 'axios';

import './styles/profile.css';
import Profile_Borrowed from './Profile_Borrowed';
import Profile_Listed from './Profile_Listed';
import EditProfile from './EditProfile';
import LaserLouis from '../images/LaserLouis.jpg';

// function Nombre(props) {
//   return <h1>{props.name}</h1>;
// }

// function Rango(props) {
//   return <h1>{props.status}</h1>;
// }

// const element = <Nombre name='Profile' />;

function parsePath(orig) {
  let res = orig.substr(9);
  res = '.' + res;
  return res;
}

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      phonenum: null,
      email: '',
      description: '',
      online: false,
      rating: null,
      picture: null,
      profile: {},
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
  displayListings() {
    return <Profile_Listed />;
  }

  listings() {
    this.setState({ testToken: false });
  }
  borrowed() {
    this.setState({ testToken: true });
  }

  componentDidMount() {
    let firstname;
    let lastname;
    let email;
    let phonenum;
    let online;
    let rating;
    let picture;

    axios.get('http://localhost:4000/profile').then((res) => {
      const profile = res.data;
      this.setState({ profile });
      //console.log(res.data.email);
      // console.log(res.data.email);
      //response = res.data;

      firstname = res.data.first_name;
      lastname = res.data.last_name;
      email = res.data.email;
      phonenum = res.data.phonenum;
      online = res.data.online;
      rating = res.data.rating;
      picture = res.data.profile_picture;

      this.setState({
        email,
        firstname,
        lastname,
        phonenum,
        online,
        rating,
        picture,
      });

      //console.log(res.data);
      console.log(picture, 'getting PATH');
    });
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
          <h1 className='title'>Profile</h1>
          <div className='Header'>
            <div className='ProfilePic'>
              {' '}
              {/*adding the profile pic*/}
              {/*<h5>{this.state.picture}</h5>*/}
              {this.state.picture === null ? (
                <h5>No Picture</h5>
              ) : (
                <img
                  src={parsePath(this.state.picture)}
                  height='200'
                  width='200'
                  alt=''
                ></img>
              )}
            </div>
            <div className='button-container'>
              {' '}
              {/*the button that change the page to edit profile information*/}
              <button className='edit-button' onClick={this.onClickHandler}>
                Edit
              </button>
            </div>
            <div className='UserInfoContainer'>
              <div className='HeaderField'>
                {' '}
                {/*the username*/}
                <h1>Name: </h1>
                <div className='UserField'>
                  <h1>{this.state.firstname + ' ' + this.state.lastname}</h1>
                </div>
              </div>
              <div className='HeaderField'>
                {' '}
                {/*the guild ranking*/}
                <h1>Rank: </h1>
                <div className='UserField'>
                  <h1>
                    {this.state.rating == null ? 'N/A' : this.state.rating}
                  </h1>
                </div>
              </div>
            </div>
            <div className='SubfieldInfoContainer'>
              <div className='HeaderSubfield'>
                <h2>Email: </h2>
              </div>
              <div className='UserSubfield'>
                <h2> {this.state.email} </h2>
              </div>
              <div className='HeaderSubfield'>
                <h2>Phone: </h2>
              </div>
              <div className='UserSubfield'>
                <h2>
                  {this.state.phonenum == null ? 'N/A' : this.state.phonenum}{' '}
                </h2>
              </div>
            </div>
          </div>

          {/*The user's listings*/}
          <div className='Listings'>
            {/*the button that switched tabs between items listed and borrowed*/}
            <div className='PageSwitcher_profile'>
              <button
                onClick={this.listings.bind(this)}
                className={
                  this.state.testToken === false
                    ? 'PageSwitcher__Item_profile_active'
                    : 'PageSwitcher__Item_profile'
                }
              >
                Listed Items
              </button>
              <button
                onClick={this.borrowed.bind(this)}
                className={
                  this.state.testToken === true
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
              : this.displayListings()}
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

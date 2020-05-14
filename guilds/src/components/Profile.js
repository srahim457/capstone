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
      guilds: [],
      click: false, //added to see if it respond on click
      testToken: false,
    };

    this.onClickHandler = this.onClickHandler.bind(this);
  }
  onClickHandler(e) {
    e.preventDefault();
    this.setState({ click: true });
  }
  /*
      return <DisplayListing
              name = {this.state.name}
              description = {this.state.description}
              return_date = {this.state.return_date}
              insurance = {this.state.insurance}
              listing_type = {this.state.listing_type}
              total_price = {this.state.total_price}
              rent_amount = {this.state.rent_amount}
              policy = {this.state.policy}
              />;
    }




  */
  displayBorrowed() {
    console.log('clicked dis borrow',this.props.location.state.userid)
    return <Profile_Borrowed 
            userid = {this.props.location.state.userid}
            />;
  }
  displayListings() {
    return <Profile_Listed
      userid = {this.props.location.state.userid}
    />;
  }

  listings() {
    this.setState({ testToken: false });
  }
  borrowed() {
    this.setState({ testToken: true });
  }

  async componentDidMount() {
    let firstname;
    let lastname;
    let email;
    let phonenum;
    let online;
    let rating;
    let picture;
    let description;
    let guilds;


   const[firstResp,secondResp] = await Promise.all([
    axios.get('http://localhost:4000/profile/'+this.props.location.state.userid),
    axios.get('http://localhost:4000/profile/guilds/'+this.props.location.state.userid)  
  ]);
      const profile = firstResp.data;
      this.setState({ profile });
      //console.log(res.data.email);
      //console.log(res.data.email);
      //response = res.data;

      //console.log('user profile info',firstResp.data,'\n',secondResp.data);

      this.setState({
        firstname: firstResp.data.first_name,
        lastname: firstResp.data.last_name,
        email: firstResp.data.email,
        phonenum: firstResp.data.phonenum,
        online: firstResp.data.online,
        rating: firstResp.data.rating,
        picture: firstResp.data.profile_picture,
        description: firstResp.data.description,
        guilds: secondResp.data,
        userid: firstResp.data.id
      });

     // console.log(picture, 'getting PATH');
  }

  render() {
      console.log('these are the props passed to profile \n ',this.props.location.state.userid)
      //this is someone elses profile 
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
              {this.state.picture != null ? (
                <img
                  src={parsePath(this.state.picture)}
                  height='200'
                  width='200'
                  alt=''
                ></img>
              ) : (
                <img
                  src='./uploads/noImage.png'
                  height='200'
                  width='200'
                  alt=''
                ></img>
              )}
            </div>
            <div className='button-container'>
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
          </div /*profileHeader*/ >

          <div className='additionalUserInfoPortion'>
          {/*contains the list of the guilds the user is apart of and user bio*/}
            <h1>Bio:</h1>
            <div className='userBioSection'>
              <h1>
              {this.state.description}
              </h1>
            </div>            
            <div className='userGuildListTitle'>
              <div className='centerText'>
                <h1>Affiliated Guilds</h1>
              </div>
            </div>
            <React.Fragment>
            <div className='guildnamelistcontainer'>
              {Object.values(this.state.guilds).map((guild) => (
                <div className='guildnamecontainer' key={guild.id}>
                    <h2> Guild: {guild.name} </h2>
                </div>
              ))}
            </div>
            </React.Fragment>
          </div /*Listings*/>

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
                My Listed Items
              </button>
              <button
                onClick={this.borrowed.bind(this)}
                className={
                  this.state.testToken === true
                    ? 'PageSwitcher__Item_profile_active'
                    : 'PageSwitcher__Item_profile'
                }
              >
                My Borrowed Items
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

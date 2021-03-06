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
import Profile_Completed from './Profile_Completed';
import EditProfile from './EditProfile';
import LaserLouis from '../images/LaserLouis.jpg';
import NotAvailable from '../images/noimageavailable.png';

// function Nombre(props) {
//   return <h1>{props.name}</h1>;
// }

// function Rango(props) {
//   return <h1>{props.status}</h1>;
// }

// const element = <Nombre name='Profile' />;


const styleTitle = {
  fontFamily: 'fantasy',
  color: 'black'
};


function parsePath(orig) {
  let res = orig.substr(9);
  //res = '.' + res;
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
      testToken: 0,
      currUserId: 0,
      // Check to see if current viewer is allowed to edit
      canedit: true,
    };

    this.onClickHandler = this.onClickHandler.bind(this);
  }
  onClickHandler(e) {
    e.preventDefault();
    this.setState({ click: true });
  }
  displayBorrowed() {
    // Fix until sign in redirect is fixed
    if (this.props.location.state == null) {
      this.state.currUserId = -1
      //console.log('user id props is null')
      return <Profile_Borrowed
        userid={-1}
        canedit={this.state.canedit}
      />;
    }
    else {
      return <Profile_Borrowed
        userid={this.props.location.state.userid}
        canedit={this.state.canedit}
      />;
    }
  }
  displayListings() {
    // Fix until sign in redirect is fixed
    if (this.props.location.state == null) {
      this.state.currUserId = -1
      //console.log('user id props is null')
      return <Profile_Listed
        userid={-1}
        canedit={this.state.canedit}
      />;
    }
    else {
      return <Profile_Listed
        userid={this.props.location.state.userid}
        canedit={this.state.canedit}
      />;
    }
  }

  //I copied the function above
  displayCompleted() {
    // Fix until sign in redirect is fixed
    if (this.props.location.state == null) {
      this.state.currUserId = -1
      //console.log('user id props is null')
      return <Profile_Completed
        userid={-1}
        canedit={this.state.canedit}
      />;
    }
    else {
      return <Profile_Completed
        userid={this.props.location.state.userid}
        canedit={this.state.canedit}
      />;
    }
  }


  listings() {
    this.setState({ testToken: 0 });
  }
  borrowed() {
    this.setState({ testToken: 1 });
  }
  completed() {
    this.setState({ testToken: 2 });
  }

  async componentDidMount() {
    let firstname;
    let lastname;
    let username;
    let email;
    let phonenum;
    let online;
    let rating;
    let picture;
    let description;
    let guilds;
    let loggedinuser;

    //console.log('getting profile results for',this.state.currUserId,this.props.location.state.userid)
    if (this.props.location.state != null) {
      this.state.currUserId = this.props.location.state.userid
    }
    const [firstResp, secondResp, thirdResp] = await Promise.all([
      axios.get('http://localhost:4000/profile/' + this.state.currUserId),
      axios.get('http://localhost:4000/profile/guilds/' + this.state.currUserId),
      axios.get('http://localhost:4000/profile/')
    ]);
    const profile = firstResp.data;
    this.setState({ profile });
    //console.log(res.datacompon.email);
    //console.log(res.data.email);
    //response = res.data;

    //console.log('user profile info',firstResp.data,'\n',secondResp.data);

    this.setState({
      firstname: firstResp.data.first_name,
      lastname: firstResp.data.last_name,
      username: firstResp.data.username,
      email: firstResp.data.email,
      phonenum: firstResp.data.phonenum,
      online: firstResp.data.online,
      rating: firstResp.data.rating,
      picture: firstResp.data.profile_picture,
      description: firstResp.data.description,
      guilds: secondResp.data,
      userid: firstResp.data.id,
      loggedinuser: thirdResp.data.id
    });

    // console.log(picture, 'getting PATH');
    console.log('current user profile', firstResp.data)
    console.log('current user guilds', this.state.guilds)
    console.log('current logged in profile', thirdResp.data)
  }

  render() {
    if (this.state.userid != this.state.loggedinuser) {
      console.log('VIEWING SOMEONE ELSES PROFILE \n')
      this.state.canedit = false;
      console.log(this.state.canedit)
    }
    //console.log('these are the props passed to profile \n ',this.props.location.state.userid)
    //this is someone elses profile
    {
      /*if the edit profile button is pressed it will redirect*/
    }
    console.log('able to edit ? ', this.state.canedit)
    if (this.state.click === true && this.state.canedit == true) {
      return <EditProfile
        userid={this.state.currUserId} />;
    }

    const printRating = () => {
      let rating = this.state.rating;
      if (rating >= 4.8) {
        return 'SSS Rank Score: '
      }
      else if (rating < 4.8 && rating >= 4) {
        return 'Chivalrous Score: '
      }
      else if (rating < 4 && rating > 3) {
        return 'Nobleman Score: '
      }
      else if (rating === 3) {
        return 'Guildsman Score: '
      }

      else if (rating < 3 && rating >= 2) {
        return 'Layman Score: '
      }
      else if (rating < 2 && rating >= 1) {
        return 'Lacks Luster Score: '
      }
      else {
        return 'Nincompoop Score: '
      }
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
              {this.state.canedit == true ? (
                <button className='edit-button' onClick={this.onClickHandler}>
                  Edit
                </button>
              ) :
                (console.log(''))
              }
            </div>
            <div className='UserInfoContainer'>
              <div className='HeaderField'>
                {' '}
                {/*the username*/}
                <h1>Name: </h1>
                <div className='UserField'>
                  <h1 style={styleTitle}>{this.state.firstname + ' ' + this.state.lastname}</h1>
                </div>
              </div>
              <div className='HeaderField'>
                {' '}
                {/*the guild ranking*/}
                <h2 style={styleTitle}>Rank (out of 5): </h2>
                <div className='UserField'>
                  <h3 style={styleTitle}>
                    {this.state.rating == null ? 'N/A'
                      : printRating()}

                    {this.state.rating !== null ? this.state.rating
                        : ''}

                  </h3>
                  <br />
                </div>
              </div>
            </div>
            <div className='SubfieldInfoContainer'>
              <div className='HeaderSubfield'>
                <h3 style={styleTitle}>Email: </h3>
              </div>
              <div className='UserSubfield'>
                <h3 style={styleTitle}> {this.state.email} </h3>
              </div>
              <div className='HeaderSubfield'>
                <h3 style={styleTitle} >Phone: </h3>
              </div>
              <div className='UserSubfield'>
                <h3 style={styleTitle}>
                  {this.state.phonenum == null ? 'N/A' : this.state.phonenum}{' '}
                </h3>
              </div>
            </div>
          </div /*profileHeader*/ >

          <div className='additionalUserInfoPortion'>
            {/*contains the list of the guilds the user is apart of and user bio*/}
            <h1 style={styleTitle}>Bio:</h1>
            <div className='userBioSection'>
              <h1 style={styleTitle}>
                {this.state.description}
              </h1>
            </div>
            <div className='userGuildListTitle'>
              <div className='centerText'>
                <h1 >Affiliated Guilds</h1>
              </div>
            </div>
            <React.Fragment>
              <div className='guildnamelistcontainer'>
                {Object.values(this.state.guilds).map((guild) => (
                  <div className='guildnamecontainer' key={guild.id}>
                    <h2 style={styleTitle}> Guild: {guild.name} </h2>
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
                  this.state.testToken === 0
                    ? 'PageSwitcher__Item_profile_active'
                    : 'PageSwitcher__Item_profile'
                }
              >
                {this.state.firstname + "'s"} Listed Items
              </button>
              <button
                onClick={this.borrowed.bind(this)}
                className={
                  this.state.testToken === 1
                    ? 'PageSwitcher__Item_profile_active'
                    : 'PageSwitcher__Item_profile'
                }
              >{this.state.firstname + "'s"} Borrowed Items
              </button>
              <button
                onClick={this.completed.bind(this)}
                className={
                  this.state.testToken === 2
                    ? 'PageSwitcher__Item_profile_completedTransaction_active'
                    : 'PageSwitcher__Item_profile'
                }
              >{this.state.firstname + "'s"} Completed Transactions
              </button>
            </div>
            {/*these components can be found in Profile_Borrowed.js and Profile_Listed.js*/}
            {this.state.testToken === 1
              ? this.displayBorrowed()
              : this.state.testToken === 2
                ? this.displayCompleted()
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

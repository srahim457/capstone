import React, { Component } from 'react';
import {
  Link,
  NavLink,
} from 'react-router-dom';
import './styles/Messages.css';
import Pagination from './Pagination';
import noimage from '../images/noimageavailable.png'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import ChatMain from './ChatMain';


class Messages extends Component {
  constructor() {
    super();
    this.state ={
      search_key: '',
      isLoading: true,
      users: [],
      redirect: null,
      userid: '',
      chat: false,
      loggedInUserName: '',
      targetname: '',
      loggedInUserID: ''
    }

    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
    //this.openListing = this.openListing.bind(this);
  }

  searchChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      search_key: e.target.value,
    });
  };
  // Redirect to the user profile
  openUser(item) {
  console.log('user info that i clicked on ',item)
   this.setState({ redirect: '/profile/viewprofile/'+item.id, userid: item.id });
  }
  openChat(item){
    console.log('opening a chat',item)
    this.setState(({chat: true, targetname: item.username, userid: item.id}))
  }

  async componentDidMount() {
  const[firstResp,secondResp] = await Promise.all([
    axios.get('http://localhost:4000/profile/search/'+this.props.location.data),
    axios.get('http://localhost:4000/profile/')
  ]);
    console.log('users', firstResp.data,'\n',secondResp.data)
    this.setState({users: firstResp.data, isLoading: false,loggedInUserName: secondResp.data.username,loggedInUserID: secondResp.data.id})
  }
  render() {
    console.log(this.state.redirect, '\n current state',window.location,this.props.location)
    const {isLoading} = this.state;
    const {data} = this.props.location;
    if (this.state.redirect) {
      console.log('redirecting with ,', this.state.redirect, ' ', this.state.userid)
      return <Redirect to={{pathname: this.state.redirect, state: {userid: this.state.userid, email: this.state.email}}} />
    }
    if (this.state.chat) {
      console.log('redirecting to the chat app',this.state)
      return (
        <ChatMain username={this.state.loggedInUserName} loggedInUserID={this.state.loggedInUserID} targetname= {this.state.targetname} targetID = {this.state.userid}/>
      );
    }
    
    return (
      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>User Search Results: {data}</h1>
          <div className='itemBoard'>
          {console.log('test res',this.state.users)}
          <React.Fragment>
            {!isLoading ? (
              Object.values(this.state.users).map(user => {
                return(
                  <div className='itemContainer' key={user.id}>
                    {console.log('User ' + user.id ,user)}
                    <div className='itemImage'>
                      {/*listing.image*/}
                      <img src={noimage} height='150' width="200" ></img>
                  </div>
                  <h5>{user.username}</h5>
                  <button className='listing-button'
                  onClick={this.openUser.bind(this, user)}
                  >View Profile</button>
                  <button className='listing-button'
                  onClick={this.openChat.bind(this, user)}
                  >Chat With User</button>
                  <div className='paginate'>
                    <Pagination
                    users={this.state.user}
                    onChangePage={this.onChangePage}
                    />
                  </div>
                  </div>
                );
              })
            ) : (
            <h3>Loading</h3>
              )}
            </React.Fragment>
        </div>
        </div>
      </div>
    );
  }
}

export default Messages;

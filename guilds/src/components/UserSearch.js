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


class Messages extends Component {
  constructor() {
    super();
    this.state ={
      search_key: '',
      isLoading: true,
      users: [],
      redirect: null,
      userid: ''
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

  async componentDidMount() {
    const response = await axios.get('http://localhost:4000/profile/search/'+this.props.location.data)
    console.log('users', response)
    this.setState({users: response.data, isLoading: false})
  }
  render() {
    console.log(this.state.redirect, 'current state',window.location,this.props.location)
    const {isLoading} = this.state;
    const {data} = this.props.location;
    if (this.state.redirect) {
      return <Redirect to={{pathname: this.state.redirect, query: this.state.userid}} />
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
                    {console.log('test user',user)}
                    <div className='itemImage'
                      onClick={this.openUser.bind(this, user)}>
                      {/*listing.image*/}
                      <img src={noimage} height='150' width="200" ></img>

                  </div>
                  <h5>{user.username}</h5>
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

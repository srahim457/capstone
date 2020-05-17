import React, { Component } from 'react';
import {
  Link,
  NavLink,
} from 'react-router-dom';
import './styles/Messages.css';
import axios from "axios";

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      search_key: '',
    }

    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
    //this.openListing = this.openListing.bind(this);
  }

  searchChangeHandler = (e) => {
    this.setState({
      search_key: e.target.value,
    });
  };
  async componentDidMount() {
    const response = await axios.get('http://localhost:4000/all-guilds/') // no route for messages currently using guilds
}

  onClickHandler = (e) => {

  }

  render() {
    return (
      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>Messages</h1>
          <div className='itemBoard'>
            <div className='searchItemsWrapper'>
              <input
                type='text'
                className='item-search-input'
                placeholder='search for a user to chat with'
                maxLength='200'
                value={this.state.search_key}
                onChange={this.searchChangeHandler}
              ></input>

              <button className='listing-button'>
                <Link to={{
                  pathname: '/messages/user-search-results',
                  data: this.state.search_key,
                }}
                  className='yellow'
                >
                  Search
                </Link>
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Messages;

import React, { Component } from 'react';
import {
  Link,
  NavLink,
} from 'react-router-dom';
import './styles/Messages.css';

class Messages extends Component {
  constructor() {
    super();
    this.state ={
      search_key: '',
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

  render() {
    const {data} = this.props.location;
    
    return (
      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>User Search Results: {data}</h1>
          <div className='itemBoard'>
          </div>
        </div>
      </div>
    );
  }
}

export default Messages;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const styleTitle = {
  fontFamily: 'decorative',
};

class NotFound extends Component {
  render() {
    return (
      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>Page not found</h1>
          <h2 style={styleTitle}>Sorry, this page does not exist</h2>
          <Link className='title' to='/'>
            Click to return home
          </Link>
        </div>
      </div>
    );
  }
}

export default NotFound;

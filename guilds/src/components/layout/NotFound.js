import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>Page not found</h1>
          <h2>Sorry, this page does not exist</h2>
        </div>
      </div>
    );
  }
}

export default NotFound;

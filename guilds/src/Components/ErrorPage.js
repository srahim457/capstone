import React, { Component } from 'react';

class ErrorPage extends Component {
  render() {
    return (
      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>Page not found</h1>
          <h2>Looks like the page you requested couldn't be found</h2>
        </div>
      </div>
    );
  }
}

export default ErrorPage;

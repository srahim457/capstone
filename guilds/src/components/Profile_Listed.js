import React, { Component } from 'react';
import Navigation from './Navigation';
import {
  BrowserRouter,
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  Switch
} from 'react-router-dom';

import './styles/profile.css';

class Profile_Listed extends Component {
  render(){
    var tmp = [];
    for (var i = 0; i < 4; i++) {
      tmp.push(i);
    }

    var items = tmp.map(function (i) {
      return (
        <div className='item'>

        </div>
      );
    });

    return (
      <div className='ItemListWrapper'>
        {items}
      </div>

    );
  }
}

export default Profile_Listed;

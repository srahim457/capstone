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

class Profile_Borrowed extends Component {
  render(){
    var tmp = [];
    for (var i = 0; i < 15; i++) {
      tmp.push(i);
    }
    var items = tmp.map(function (i) {
      return (
        <div className='item'>
          <div className='itemImageWrapper'>
            <h1> img {i} </h1>
          </div>
          <div className='itemInfoWrapper'>
            <h1 className='itemInfoField'> Name: Item {i}</h1>
            <h1 className='itemInfoField'> Cost: ${i}</h1>
            <h1 className='itemInfoField'> Borrow Date: #/#/#  Return Date: #/#/# </h1>
          </div>
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

export default Profile_Borrowed;

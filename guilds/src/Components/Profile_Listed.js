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
import EditListing from './EditListing';

class Profile_Listed extends Component {

  constructor() {
    super();

    var numItems = [...Array(100).keys()].map(i => ({
      id: i + 1,
      name: 'Item ' + (i + 1),
      description: 'this is an item',
      cost: i+1,
    }));

    this.state = {
      numItems: numItems,
      name: 'some existing name',
      click: false //added to see if it respond on click
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  testClick(item){
    this.setState({name: item.name});
    this.setState({ click: true });
  }

  onClickHandler(e) {
    e.preventDefault();
    this.setState({ click: true });
  }


  render(){
    {/*routes to an edit listing page*/}

    if (this.state.click === true) {
      return <EditListing name = {this.state.name} />;
    }

    return (
      <div className='ItemListWrapper'>
      {this.state.numItems.map(item => (
        <div className='item' key={item.id}>

          <div className='itemImageWrapper'>
            <h1> img {item.id} </h1>
          </div>

          <div className='itemInfoWrapper'>
            <h1 className='itemInfoField'> Name: {item.name}</h1>
            <h1 className='itemInfoField'> Cost: ${item.cost}</h1>
          </div>

          <div className='editListingButtonWrapper'>
            <button class="edit-button" onClick={this.testClick.bind(this, item)}>
              Edit Listed Item
            </button>
          </div>
        </div>
      ))}
      </div>

    );
  }
}
export default Profile_Listed;

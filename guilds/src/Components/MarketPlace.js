import React, { Component } from 'react';
import Pagination from './Pagination';
import CreateListing from './CreateListing';
import './styles/MarketPlace.css';

class MarketPlace extends Component {
  constructor() {
    super();

    // an example array of 150 items to be paged
    var exampleItems = [...Array(150).keys()].map(i => ({
      id: i + 1,
      name: 'Item ' + (i + 1)
    }));

    this.state = {
      exampleItems: exampleItems,
      pageOfItems: []
    };

    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    return (
      <div className='containerParent'>
        <div className='container'>
          <h1 className='title'>Market Place</h1>
          <div className='button-wrapper'>
            <button className='listing-button'>Create a Listing</button>
          </div>
          {this.state.pageOfItems.map(item => (
            <div className='items' key={item.id}>
              {item.name}
            </div>
          ))}
          <Pagination
            items={this.state.exampleItems}
            onChangePage={this.onChangePage}
          />
        </div>
      </div>
    );
  }
}
export default MarketPlace;

import React, { Component } from 'react';
import Pagination from './Pagination';
import CreateListing from './CreateListing';
import axios from 'axios';
import './styles/MarketPlace.css';

class MarketPlace extends Component {
  constructor() {
    super();

    // an example array of 150 items to be paged
    var exampleItems = [...Array(150).keys()].map((i) => ({
      id: i + 1,
      name: 'Item ' + (i + 1),
    }));

    this.state = {
      exampleItems: exampleItems,
      pageOfItems: [],
      click: false, //added to see if it respond on click
      item: [],
    };

    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.onChangePage = this.onChangePage.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  onClickHandler(e) {
    e.preventDefault();
    this.setState({ click: true });
  }

  // componentDidMount() {
  //   axios.get(`/market-place`).then((res) => {
  //     const item = res.data;
  //     this.setState({ item });
  //   });
  // }
  componentDidMount() {
    fetch(`/market-place/users`)
      .then((res) => res.json())
      .then((item) => this.setState({ item }));
  }

  render() {
    if (this.state.click === true) {
      return <CreateListing />;
    }
    return (
      <div className='containerParent'>
        <div className='container'>
          <h1 className='title'>Market Place</h1>
          <div className='itemBoard'>
            <div className='button-wrapper'>
              <button className='listing-button' onClick={this.onClickHandler}>
                Create a Listing
              </button>
            </div>

            <div className='searchItemsWrapper'>
              <input
                type='text'
                className='item-search-input'
                placeholder='search for item'
                maxLength='200'
              ></input>
              <button className='listing-button'>Search</button>
            </div>

            {this.state.pageOfItems.map((item) => (
              <div className='itemContainer' key={item.id}>
                <div className='itemImage'>image {item.id}</div>
                {item.name}
              </div>
            ))}
          </div>
          <div className='paginate'>
            <Pagination
              items={this.state.exampleItems}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default MarketPlace;

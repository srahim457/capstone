import React, { Component } from 'react';
import Pagination from './Pagination';
import CreateListing from './CreateListing';
import DisplayListing from './DisplayListing';
import axios from 'axios';
import './styles/MarketPlace.css';

class MarketPlace extends Component {
  constructor() {
    super();

    // an example array of 150 items to be paged
    let exampleItems = [...Array(150).keys()].map((i) => ({
      id: i + 1,
      name: 'Item ' + (i+1),
      lender: 'Random guy '+ (i+1),
      description: 'This is the item '+ (i+1) +' an item posted by Random guy '+ (i+1),
    }));

    this.state = {
      exampleItems: exampleItems,
      pageOfItems: [],
      click: false, //added to see if it respond on click
      open: false,
      items: [],
    };

    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.onChangePage = this.onChangePage.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.openListing = this.openListing.bind(this);
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  onClickHandler(e) {
    e.preventDefault();
    this.setState({ click: true });
  }

  openListing(e) {
    e.preventDefault();
    this.setState({ open: true });
  }

  // componentDidMount() {
  //   axios.get(`/market-place`).then((res) => {
  //     const item = res.data;
  //     this.setState({ item });
  //   });
  //   console.log(this.item);
  // }

  componentDidMount() {
    fetch(`/market-place/`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((items) =>
        this.setState({ items }, () => console.log('items fetched..', items))
      );
  }

  render() {
    if (this.state.click === true) {
      return <CreateListing />;
    }
    if(this.state.open === true){
      return <DisplayListing />;
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
                <div className='itemImage' onClick={this.openListing}>image {item.id}</div>
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

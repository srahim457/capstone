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
      //variables that are going to be passed
      name: '',
      id: '',
      description: '',
    };

    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.onChangePage = this.onChangePage.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    //this.openListing = this.openListing.bind(this);
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  onClickHandler(e) {
    e.preventDefault();
    this.setState({ click: true });
  }

  openListing(item) {
    this.setState({name: item.name});
    this.setState({description: item.description});
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
      return <DisplayListing
              name = {this.state.name}
              description = {this.state.description}
              />;
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
                <div className='itemImage'
                  onClick={this.openListing.bind(this, item)}>

                  image {item.id}

                </div>

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

{/*
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
    alert(item.name);
    this.setState({name: item.name});
    this.setState({ click: true });
  }

  onClickHandler(e) {
    e.preventDefault();
    this.setState({ click: true });
  }


  render(){
    {/*routes to an edit listing page*

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

*/}

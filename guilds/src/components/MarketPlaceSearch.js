import React, { Component } from 'react';
import Pagination from './Pagination';
import CreateListing from './CreateListing';
import DisplayListing from './DisplayListing';
import noimage from '../images/noimageavailable.png'
import axios from 'axios';
import './styles/MarketPlace.css';

class MarketPlace extends Component {
  constructor() {
    super();
    this.state ={
      isLoading: true,
      listings: [],
      error: null,
      click: false, //added to see if it respond on click
      open: false,
      name: '',
      id: '',
      description: '',
      insurance: '',
      return_date: '',
      images: '',
      listing_type: '',
      pageOfItems: [],
    }

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
    console.log('open listing wth item', item)
    this.setState({name: item.item_name});
    this.setState({description: item.item_desc});
    this.setState({listing_type: item.type})
    this.setState({insurance: item.insurance_amount});
    this.setState({images: item.image});
    this.setState({ open: true });
    if(item.return_by === null){
      this.setState({return_date: ''});
    }
    else{
      this.setState({return_date: item.return_by});
    }
  }

  // componentDidMount() {
  //   axios.get(`/market-place`).then((res) => {
  //     const item = res.data;
  //     this.setState({ item });
  //   });
  //   console.log(this.item);
  // }

  async componentDidMount() {
    const response = await axios.get('http://localhost:4000/market-place/active')
    console.log('listings', response)
    this.setState({listings: response.data, isLoading: false})
  }

  render() {
    const {isLoading} = this.state;
    const {data} = this.props.location;

    if(this.state.open === true){
      return <DisplayListing
              name = {this.state.name}
              description = {this.state.description}
              return_date = {this.state.return_date}
              insurance = {this.state.insurance}
              listing_type = {this.state.listing_type}
              />;
    }
    return (
      <div className='containerParent'>
      <div className='container'>
        <h1 className='title'>Search Results: {data}</h1>

        <div className='itemBoard'>
          {console.log('test res',this.state.listings)}
          <React.Fragment>
            {!isLoading ? (
              Object.values(this.state.listings).map(listing => {
                return(
                  <div className='itemContainer' key={listing.id}>
                    {console.log('test listing',listing)}
                    <div className='itemImage'
                      onClick={this.openListing.bind(this, listing)}>
                      {/*listing.image*/}
                      <img src={noimage} height='150' width="200" ></img>

                  </div>
                  <h5>{listing.item_name}</h5>
                  <div className='paginate'>
                    <Pagination
                    items={this.state.listing}
                    onChangePage={this.onChangePage}
                    />
                  </div>
                  </div>
                );
              })
            ) : (
            <h3>Loading</h3>
              )}
            </React.Fragment>
        </div>

      </div>
      </div>
    );
  }
}
export default MarketPlace;

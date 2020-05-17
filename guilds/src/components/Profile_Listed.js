import React, { Component } from 'react';
import axios from 'axios';
//import Navigation from './Navigation';
import {
  BrowserRouter,
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
} from 'react-router-dom';

import './styles/profile.css';
import EditListing from './EditListing';
import Spinner from './layout/spinner_transparent.gif';
import NotAvailable from '../images/noimageavailable.png';

function parsePath(orig) {
  let res = orig.substr(9);
  res = '.' + res;
  return res;
}

class Profile_Listed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      listings: [],
      error: null,
    }
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  async componentDidMount() {
    const response = await axios.get('http://localhost:4000/market-place/listed/' + this.props.userid)
    console.log('listings', response)
    this.setState({ listings: response.data, isLoading: false })
  }

  /*
  // dont need to do two seperate requests
  // kept here for future ref in case needed
  const[firstResp] = await Promise.all([
    axios.get('http://localhost:4000/market-place/listed')
  ]);
  const secondResp = await axios.get('http://localhost:4000/item/'+firstResp.data.item_id)

  // Will need to loop and get request on every item for information for every item user has
  console.log('first \n', firstResp, 'second \n', secondResp);

  this.setState({
    itemname: secondResp.data.item_name,
    itemdesc: secondResp.data.item_desc,
    itemimg: secondResp.data.image,
    totalprice: firstResp.data.total_price,
    rentaltype: firstResp.data.type
  })
  */


  testClick(item) {
    //window.location.reload(false)
    this.setState({ name: item.name });
    this.setState({ click: true });
  }

  onClickHandler(e) {
    e.preventDefault();
    this.setState({ click: true });
  }

  render() {
    /*routes to an edit listing page*/
    if (this.state.click === true) {
      return <EditListing name={this.state.name} />;
    }
    //console.log(this.state,'\n current state',isLoading,listings)
    console.log('these are the props passed to listed \n ', this.props.userid, this.state)

    const { isLoading } = this.state;
    console.log('this.state \n', this.state.listings)
    return (
      <React.Fragment>
        <div className='ItemListWrapper'>
          {!isLoading ? (
            Object.values(this.state.listings).map(listing => {
              return (
                <div className='item' key={listing.item_id}>
                  {console.log('test res', listing, listing.borrower_id)}
                  <div className='itemImageWrapper'>
                    {listing.image != null ? <img src={parsePath(listing.image)} height="100" width="100"></img>
                      : <img src={NotAvailable} height="100" width="100"></img>}
                  </div>
                  <div className='itemInfoWrapper' key={listing}>
                    <h1 className='itemInfoField'> Name: {listing.item_name}</h1>
                    <h1 className='itemInfoField'> Desc: {listing.item_desc}</h1>
                    <hr />
                  </div>
                  <div className='editListingButtonWrapper'>
                    <button
                      className='edit-button'
                      onClick={this.testClick.bind(this, listing)}
                    >
                      Edit Listed Item
                  </button>
                  </div>
                </div>
              );
            })
          ) : (
              <div className='spinner'>
                <img src={Spinner} alt="loading..." />
              </div>
            )}
        </div>
      </React.Fragment>
    );
  }
}
export default Profile_Listed;

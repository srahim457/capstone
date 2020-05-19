import React, { Component } from 'react';
import './styles/profile.css';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import Spinner from './layout/spinner_transparent.gif';
import NotAvailable from '../images/noimageavailable.png';

function parsePath(orig) {
  let res = orig.substr(9);
  res = '.' + res;
  return res;
}

class Profile_Borrowed extends Component {
  constructor(props) {
    super(props);
    console.log('props profile borr rec', this.props)
    this.state = {
      isLoading: true,
      listings: [],
      error: null,
    };
  }
  async componentDidMount() {
    console.log('http://localhost:4000/market-place/borrowed/' + this.props.userid)
    const response = await axios.get(
      'http://localhost:4000/market-place/borrowed/' + this.props.userid
    );
    console.log('profile borrowed', response);
    this.setState({ listings: response.data, isLoading: false });
  }
  render() {
    //console.log('these are the props passed to borrowed \n ',this.props.userid,this.state)
    const { isLoading } = this.state;
    //console.log('this.state \n', this.state.listings);
    //{console.log('test res', listing, listing.item_name)}
    return (
      <React.Fragment>
        {!isLoading ? (
          Object.values(this.state.listings).map((listing) => {
            return (
              <div className='item' key={listing.item_id}>
                <div className='borrowedItemImageWrapper'>
                  {listing.image != null ? <img src={parsePath(listing.image)} height="100" width="100"></img>
                    : <img src={NotAvailable} height="100" width="100"></img>}
                </div>
                <div className='itemInfoWrapper' key={listing}>
                  <h1 className='itemInfoField'> Name: {listing.item_name}</h1>
                  <h1 className='itemInfoField'> Desc: {listing.item_desc}</h1>
                  {console.log('formatted time', listing, listing.item_name)}
                  <h1 className='itemInfoField'>
                    {' '}
                    Borrow Date:{' '}
                    {format(
                      parseISO(listing.time_borrowed),
                      'MMMM do,yyyy h:mma'
                    )}
                  </h1>
                  {this.props.canedit == true ? (
                  <h1 className='itemInfoField'>
                  {' '}
                  Return By Date:{' '}
                  {format(parseISO(listing.return_by), 'MMMM do,yyyy h:mma')}
                </h1>
              ):
              ( console.log(''))
              }

                  <hr />
                </div>
              </div>
            );
          })
        ) : (
            <div className='spinner'>
              <img src={Spinner} alt="loading..." />
            </div>
          )}
      </React.Fragment>
    );
  }
}

export default Profile_Borrowed;

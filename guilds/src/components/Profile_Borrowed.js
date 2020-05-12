import React, { Component } from 'react';
import './styles/profile.css';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

class Profile_Borrowed extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      listings: [],
      error: null,
    };
  }
  async componentDidMount() {
    const response = await axios.get(
      'http://localhost:4000/market-place/borrowed'
    );
    console.log('listings', response);
    this.setState({ listings: response.data, isLoading: false });
  }
  render() {
    const { isLoading } = this.state;
    console.log('this.state \n', this.state.listings);
    return (
      <React.Fragment>
        {!isLoading ? (
          Object.values(this.state.listings).map((listing) => {
            return (
              <div className='item' key={listing.item_id}>
                {console.log('test res', listing, listing.item_name)}
                <div className='itemImageWrapper'>
                  <h1> img {listing.image} </h1>
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
                      'MMMM do,yyyy H:mma'
                    )}
                  </h1>
                  <h1 className='itemInfoField'>
                    {' '}
                    Return Date:{' '}
                    {format(parseISO(listing.return_by), 'MMMM do,yyyy H:mma')}
                  </h1>
                  <hr />
                </div>
              </div>
            );
          })
        ) : (
          <h3>Loadin</h3>
        )}
      </React.Fragment>
    );
  }
}

export default Profile_Borrowed;

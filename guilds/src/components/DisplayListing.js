import React, { Component } from 'react';
import './styles/CreateListing.css';
import { format, parseISO } from 'date-fns';

{
  /*uses the same css file as create listing,
because the layout is exactly the same except
when editing the form fields should be filled with existing information
also there is a delete button to delete the listing entirely
*/
}

class DisplayListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      description: 'some description',
      option: '',
      insurance: '0',
      listing_type: '123123',
      return_date: '',
      total_price: '',
      rent_amount: '',
      policy: ''
    };
  }

  handleOptionChange = (e) => {
    e.preventDefault();
    this.setState({
      option: e.currentTarget.value,
    });
  };

  render() {
    let {
      name,
      description,
      listing_type,
      insurance,
      return_date,
      total_price,
      rent_amount
    } = this.props;
    // types are sale, loan, rental
    console.log('type of listing', listing_type)
    if (return_date != '') {
      //Its a sale -> no valid date
      return_date = format(parseISO(return_date), 'MMMM do,yyyy H:mma');
    }
    if(listing_type == 'sale'){
      console.log('sale detected')
    }
    const {listing} = this.state.listing_type;
    console.log(this.props, 'props',return_date)
    return (
      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>{this.state.name}</h1>
          <form onSubmit={this.handleSubmit} className='form-fields'>
            <div>
              <div className='button-wrapper'>
                <button className='close-button'>X</button>
              </div>
              <br />
                <label>Images:</label>
                <br />
              <label>Item Name: </label>
              {name}
            </div>
            <div>
              {/* make into a description box */}
              <label>Item Description: </label>
              {description}
            </div>
            <div>
              <label>Type of Listing: </label>{listing_type}
              {listing_type === 'sale' && 
                <div>
                <label>Total Price: </label>
                {total_price}
                </div>
              }
                {listing_type === 'rental' && 
                <div>
                <label>Insurance Amount: </label>
                {insurance}
                <br />  
                <label>Rent Amount :{rent_amount}</label>
                <br />
                <label>Return time and date: {return_date}</label>
                </div>
              }
                {listing_type === 'loan' && 
                <div>
                <label>Insurance Amount : </label>
                {insurance}
                <br />
                <label>Return time and date :{return_date}</label>
                </div>
              }
                <br />
            </div>
          </form>
          <button>Confirm</button>
        </div>
      </div>
    );
  }
}

export default DisplayListing;

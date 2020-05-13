import React, { Component } from 'react';
import './styles/CreateListing.css';
import { format, parseISO } from 'date-fns';
import { Redirect } from 'react-router-dom'; 
import Payment from './Payment';

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
      click: false,
    };

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler = (e) => {
    e.preventDefault();
    this.setState({ click: true });
  }

  handleOptionChange = (e) => {
    // e.preventDefault();
    this.setState({
      option: e.currentTarget.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    return <Redirect to="/payment" Component={Payment}/>
  }



  render() {
    let {
      name,
      description,
      listing_type,
      insurance,
      return_date,
    } = this.props;
    //console.log('return date', return_date)
    
    // for redirecting to Payment page AL
    // if(this.state.open === true){
    //   return <Payment
    //           name = {this.state.name}
    //           description = {this.state.description}
    //           return_date = {this.state.return_date}
    //           insurance = {this.state.insurance}
    //           listing_type = {this.state.listing_type}
    //           price = {this.state.price}
    //           />;
    // }

    if (return_date != '') {
      //Its a sale -> no valid date
      return_date = format(parseISO(return_date), 'MMMM do,yyyy H:mma');
    }
    //console.log(this.props, 'props',return_date)
    return (
      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>{this.state.name}</h1>
          <form onSubmit={this.handleSubmit} className='form-fields'>
            <div>
              <div className='button-wrapper'>
                <button onClick={this.onClickHandler} className='close-button'>X</button>
              </div>
              <label>Item Name: </label>
              {name}
            </div>
            <div>
              {/* make into a description box */}
              <label>Item Description: </label>
              {description}
            </div>
            <div>
              <label>Type of Listing: </label>
              {listing_type}
              <br />
            </div>
            <div>
              <label>Insurance: $</label>
              {insurance}
              <br />
              <label>Return time and date :{return_date}</label>
              <br />
              <label>Images:</label>
              <br />
            </div>
          </form>
          <button onClick={this.handleSubmit}>Confirm</button>
        </div>
      </div>
    );
  }
}

export default DisplayListing;

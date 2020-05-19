import React, { Component } from 'react';
import './styles/CreateListing.css';
import { format, parseISO, fromUnixTime } from 'date-fns';
import { Redirect } from 'react-router-dom';
import Payment from './Payment';
import noimage from '../images/noimageavailable.png';
import axios from 'axios';

{
  /*uses the same css file as create listing,
because the layout is exactly the same except
when editing the form fields should be filled with existing information
also there is a delete button to delete the listing entirely
*/
}
function parsePath(orig) {
  let res = orig.substr(9);
  res = '.' + res;
  return res;
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
      policy: '',
      click: false,
      open: false,
      images: null
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

  onClickListing = (e) => {
    e.preventDefault();
    this.setState({ open: true });
  }

  closeButton = (e) => {
    e.preventDefault();
    // return <Redirect path='/market-place' Component={MarketPlace}></Redirect>;
    const response = axios.get('http://localhost:4000/market-place/' + this.props.listingid + '/unreserve')
    window.location.reload(false);
  }

  async componentDidMount() {
    const response = await axios.get('http://localhost:4000/market-place/' + this.props.listingid + '/reserve')
  }

  render() {
    let {
      name,
      description,
      listing_type,
      insurance,
      return_date,
      total_price,
      rent_amount,
      images,
      listingid,
      username,
      rating
    } = this.props;
    // types are sale, loan, rental
    //console.log('type of listing display', listing_type,this.props)
    //console.log('return date', return_date)

    //for redirecting to Payment page AL
    if (this.state.open === true) {
      console.log(this.props, '\n', 'listing type to redirect to payment ', this.props.listing_type)
      if (this.props.listing_type == 'loan') {
        return <Payment
          name={this.props.name}
          description={this.props.description}
          return_date={this.props.return_date}
          listing_type={this.props.listing_type}
          price={this.props.insurance}
          lenderid={this.props.lenderid}
          itemid={this.props.itemid}
          listingid={this.props.listingid}
        />;
      }
      if (this.props.listing_type == 'rental') {
        return <Payment
          name={this.props.name}
          description={this.props.description}
          insurance={this.props.insurance}
          return_date={this.props.return_date}
          listing_type={this.props.listing_type}
          price={this.props.rent_amount}
          lenderid={this.props.lenderid}
          itemid={this.props.itemid}
          listingid={this.props.listingid}
        />;
      }
      return <Payment
        name={this.props.name}
        description={this.props.description}
        return_date={this.props.return_date}
        insurance={this.props.insurance}
        listing_type={this.props.listing_type}
        price={this.props.total_price}
        lenderid={this.props.lenderid}
        itemid={this.props.itemid}
        listingid={this.props.listingid}
      />;
    }

    if (return_date != '') {
      //Its a sale -> no valid date
      return_date = format(parseISO(return_date), 'MMMM do,yyyy h:mma');
    }
    const { listing } = this.state.listing_type;
    return (
      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>{this.state.name}</h1>
          <form onSubmit={this.handleSubmit} className='form-fields'>
            <div>
              <div className='button-wrapper'>
                <button onClick={this.closeButton} className='close-button'>X</button>
              </div>
              <br />
              {/*<label>{images}:</label>*/}
              {images != null ? (
                <img
                  src={parsePath(images)}
                  height='350'
                  width='400'
                  alt={this.state.name}
                ></img>
              ) : (
                  <img src={noimage} height='350' width="400" alt={this.state.name} ></img>
                )}
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
                  <label>Rent Amount :{rent_amount}</label>
                  <br />
                  <label>Insurance Amount: </label>
                  {insurance}
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
              <div>
                <label><strong>Posted By: {username} {Math.round((rating+ Number.EPSILON) * 100)/100}/5 </strong></label>                
              </div>
            </div>
          </form>
          <button className="submit-button" onClick={this.onClickListing}>Checkout</button>
        </div>
      </div>
    );
  }
}

export default DisplayListing;

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
    };
  }

  handleOptionChange = (e) => {
    e.preventDefault();
    this.setState({
      option: e.currentTarget.value,
    });
  };

  render() {
<<<<<<< HEAD
    const {
      name,
      description,
      listing_type,
      insurance,
      return_date,
    } = this.props;
=======
    const {name, description,listing_type,insurance,return_date} = this.props;
    //console.log('return date', return_date)
    if(return_date != ''){ //Its a sale -> no valid date
      return_date = format(parseISO(return_date),"MMMM do,yyyy H:mma")
    }      
    //console.log(this.props, 'props',return_date)
>>>>>>> 7980149863fd00be12d135f0f24bed5babe85cd5
    return (
      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>{this.state.name}</h1>
          <form onSubmit={this.handleSubmit} className='form-fields'>
            <div>
              <div className='button-wrapper'>
                <button className='close-button'>X</button>
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
              <label>
                Return time and date :
<<<<<<< HEAD
                {format(parseISO(return_date), 'MMMM do,yyyy H:mma')}
=======
                {return_date}
>>>>>>> 7980149863fd00be12d135f0f24bed5babe85cd5
              </label>
              <br />
              <label>Images:</label>
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

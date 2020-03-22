import React, { Component } from 'react';
import './styles/CreateListing.css';

class CreateListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      description: ''
    };
  }

  render() {
    return (
      // <div>{this.props.children}</div>

      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>Create Listing</h1>
          <form onSubmit={this.handleSubmit} className='form-fields'>
            <div>
              <div className='button-wrapper'>
                <button className='close-button'>X</button>
              </div>
              <label>Item Name </label>

              <br />
              <input type='text' className='form-input'></input>
            </div>
            <div>
              {/* make into a description box */}
              <label>Item Description</label>
              <br />
              <input type='text' className='form-input'></input>
            </div>
            <div>
              <label>
                Input the time and date that you want the item returned
              </label>
              <br />
              <input type='datetime-local' className='form-input'></input>
            </div>
          </form>
          <button>Submit</button>
        </div>
      </div>
    );
  }
}

export default CreateListing;

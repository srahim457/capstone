import React, { Component } from 'react';
import './styles/CreateListing.css';
{/*uses the same css file as create listing,
because the layout is exactly the same except
when editing the form fields should be filled with existing information
also there is a delete button to delete the listing entirely
*/}

class DisplayListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      description: 'some description',
      option: '',
      insurance: '0'
    };
  }


  handleOptionChange = e => {
    e.preventDefault();
    this.setState({
      option: e.currentTarget.value
    });
  };

  render() {
    const {name, description} = this.props;
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
              <label>Item Description:</label>
              {description}
            </div>
            <div>
              <label>Type of Listing:</label>
              <br />
            </div>
            <div>
              <label>Insurance: $</label>
              {this.state.insurance}
              <br />
              <label>
                Return time and date:
              </label>
              <br />
              <label>
                Images:
              </label>
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

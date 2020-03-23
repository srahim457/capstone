import React, { Component } from 'react';
import './styles/CreateListing.css';

class CreateListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      description: '',
      option: ''
    };
  }

  itemNameChangeHandler = e => {
    e.preventDefault();
    this.setState({
      name: e.currentTarget.value
    });
  };

  descriptionChangeHandler = e => {
    e.preventDefault();
    this.setState({
      description: e.currentTarget.value
    });
  };

  handleOptionChange = e => {
    e.preventDefault();
    this.setState({
      option: e.currentTarget.value
    });
  };

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
              <input
                type='text'
                className='form-input'
                placeholder='Name of item'
                maxLength='50'
                value={this.state.name}
                onChange={this.itemNameChangeHandler}
              ></input>
            </div>
            <div>
              {/* make into a description box */}
              <label>Item Description</label>
              <br />
              <textarea
                className='form-input'
                autofocus
                placeholder='Type your description'
                maxlength='180'
                rows='5'
                cols='40'
                value={this.state.description}
                onChange={this.descriptionChangeHandler}
              />
            </div>
            <div>
              <label>Type of Listing:</label>
              <br />
              <input
                type='radio'
                id='sale'
                value={this.state.option === 'sale'}
                name='contact'
                onChange={this.handleOptionChange}
              />
              <label for='sale'>Sale</label>
              <br />
              <input
                type='radio'
                id='loan'
                value={this.state.option === 'loan'}
                name='contact'
                onChange={this.handleOptionChange}
              />
              <label for='loan'>Loan</label>
              <br />
              <input
                type='radio'
                id='rental'
                value={this.state.option === 'rental'}
                name='contact'
                onChange={this.handleOptionChange}
              />
              <label for='rental'>Rental</label>
            </div>
            <div>
              <label>
                Input the time and date that you want the item returned
              </label>
              <br />
              <input type='datetime-local' className='form-input' />
            </div>
          </form>
          <button>Submit</button>
        </div>
      </div>
    );
  }
}

export default CreateListing;

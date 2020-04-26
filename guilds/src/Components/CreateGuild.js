import React, { Component } from 'react';
import './styles/CreateListing.css';
import DisplayLi from './DisplayListing';
function validate(name, description) {
  // true means invalid, so our conditions got reversed
  return {
    name: name.length === 0,
    description: description.length === 0,
  };
}

class CreateGuild extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
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


  handleSubmit = evt => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      alert('Unable to submit: some field may be empty');
      return;
    }
    else{
      alert('submission has been completed');
    }
  };

  canBeSubmitted() {
    const empty = validate(
                            this.state.name,
                            this.state.description,
                          );
    const isDisabled = Object.keys(empty).some(x => empty[x]);
    return !isDisabled;
  }

  render() {
    return (
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
              <br />
              <button> submit </button>
            </div>
          </form>
        </div>
      </div>

    );
  }
}

export default CreateGuild;

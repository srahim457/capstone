import React, { Component } from 'react';
import './styles/EditProfile.css';

/* !!! not pretty, did not edit all the change handlers*/
class CreateListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      number: '',
      email: '',
    };
  }

  itemNameChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      name: e.currentTarget.value,
    });
  };

  emailChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      email: e.currentTarget.value,
    });
  };

  handleOptionChange = (e) => {
    e.preventDefault();
    this.setState({
      option: e.currentTarget.value,
    });
  };

  render() {
    return (
      // <div>{this.props.children}</div>

      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>Edit Profile</h1>
          <form onSubmit={this.handleSubmit} className='form-fields'>
            <div>
              <div className='button-wrapper'>
                <button className='close-button'>X</button>
              </div>
              <label>User's Name: </label>
              <input
                type='text'
                className='form-input'
                placeholder='username'
                maxLength='100'
                value={this.state.name}
                onChange={this.itemNameChangeHandler}
              ></input>
            </div>
            <div>
              <label>User's Email: </label>
              <input
                type='text'
                className='form-input'
                placeholder='example@myuniversity.edu'
                maxlength='180'
                value={this.state.email}
                onChange={this.emailChangeHandler}
              />
            </div>
            <div>
              <label>User's Phone: </label>
              <input
                type='number'
                className='form-input'
                placeholder='only supply numbers'
                maxlength='10'
                value={this.state.email}
                onChange={this.emailChangeHandler}
              />
            </div>
            <div>
              <label>User's Profile Picture: </label>
              <input
                type='file'
                name='images'
                id='images'
                value={this.state.email}
                onChange={this.emailChangeHandler}
              />
            </div>
          </form>
          <button>Submit</button>
        </div>
      </div>
    );
  }
}

export default CreateListing;

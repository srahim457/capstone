import React, { Component } from 'react';
import axios from 'axios';
import './styles/EditProfile.css';

/* !!! not pretty, did not edit all the change handlers*/
class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      number: '',
      email: '',
      picture: null,
      description: '',
    };
  }

  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  numberChangeHandler = (e) => {
    this.setState({
      number: e.target.value,
    });
  };

  pictureChangeHandler = (e) => {
    this.setState({
      picture: e.target.value,
    });
  };

  descriptionChangeHandler = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    alert('submission has been completed');

    console.log(this.state); //post request with axios
    const state = this.state;
    // axios.put(`http://localhost:4000/profile`, { state }).then((res) => {
    //   console.log(res);
    //   console.log(res.data);
    // });
    //window.location.reload(false);
  };

  closeButton(e) {
    e.preventDefault();
    //return <Redirect path='/market-place' Component={MarketPlace}></Redirect>;
    window.location.reload(false);
    console.log('called button');
  }
  render() {
    return (
      // <div>{this.props.children}</div>

      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>Edit Profile</h1>
          <form onSubmit={this.handleSubmit} className='form-fields'>
            <div>
              <div className='button-wrapper'>
                <button className='close-button' onClick={this.closeButton}>
                  X
                </button>
              </div>
              {/* <label>User's Name: </label>
              <input
                type='text'
                className='form-input'
                placeholder='username'
                maxLength='100'
                value={this.state.name}
                onChange={this.nameChangeHandler}
    ></input> */}
            </div>
            {/* <div>
              <label>User's Email: </label>
              <input
                type='email'
                className='form-input'
                placeholder='example@myuniversity.edu'
                maxlength='180'
                value={this.state.email}
                onChange={this.emailChangeHandler}
              />
            </div> */}
            <div>
              <label>User's Phone: </label>
              <br />
              <input
                type='tel'
                className='form-input'
                placeholder='only supply numbers'
                maxlength='10'
                value={this.state.number}
                onChange={this.numberChangeHandler}
              />
            </div>
            <div>
              {/* make into a description box */}
              <label>Bio Description</label>
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
              <label>Profile Picture: </label>
              <input
                type='file'
                name='images'
                id='images'
                value={this.state.picture}
              />
            </div>
          </form>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

export default EditProfile;

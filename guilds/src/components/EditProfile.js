import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MarketPlace from './MarketPlace';
import axios from 'axios';
import './styles/EditProfile.css';

const stylePic = {
  display: 'flex',
  justifycontent: 'center'
}


class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      phonenum: null,
      email: '',
      picture: null,
      description: null,
    };
    this.numberChangeHandler = this.numberChangeHandler.bind(this);
    this.pictureChangeHandler = this.pictureChangeHandler.bind(this);
    this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  numberChangeHandler = (e) => {
    this.setState({
      phonenum: e.target.value,
    });
  };

  pictureChangeHandler = (e) => {
    this.setState({
      picture: e.target.files[0],
      loaded: 0,
    });
    //console.log(this.state.picture, '$$$$');
    //console.log(e.target.files[0], '$$$$');
  };

  descriptionChangeHandler = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  componentDidMount() {
    let phonenum;
    let description;

    axios.get('http://localhost:4000/profile').then((res) => {
      const profile = res.data;
      this.setState({ profile });

      phonenum = res.data.phonenum;
      description = res.data.description;

      this.setState({
        phonenum,
        description,
      });
      console.log(this.state.phonenum)
      console.log(this.state.description)
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    //console.log(this.state, 'the state /n'); //post request with axios
    const state = this.state;
    const phonenum = this.state.phonenum;
    const description = this.state.description;
    //const picture = this.state.picture;
    //console.log(picture, ' in handle submit');
    //console.log(phonenum, description, profile_picture);

    //const profile_picture = new FormData();

    // profile_picture.append(
    //   'myImage',
    //   this.state.picture,
    //   this.state.picture.name
    // );
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // };
    //console.log(this.state.picture, 'name of file');
    await axios
      .put(
        `http://localhost:4000/profile`,

        { phonenum, description }

        //profile_picture,
        //config
        // {
        //   onUploadProgress: (progressEvent) => {
        //     console.log(
        //       'Upload progress ' +
        //         Math.round((progressEvent.loaded / progressEvent.total) * 100) +
        //         '%'
        //     );
        //   },
        // }
      )
      .then((res) => {
        console.log(res, 'this is the response');
        console.log(res.data, 'this is res.data');
        console.log(res.statusText);
      });

    if (this.state.picture != null) {
      const picture = this.state.picture;
      console.log(picture, ' in handle submit');
      //console.log(phonenum, description, profile_picture);

      const profile_picture = new FormData();

      profile_picture.append(
        'myImage',
        this.state.picture,
        this.state.picture.name
      );
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      console.log(this.state.picture, 'name of file');
      await axios
        .post(
          `http://localhost:4000/profile`,

          //{ phonenum, description, profile_picture },

          profile_picture,
          config
          // {
          //   onUploadProgress: (progressEvent) => {
          //     console.log(
          //       'Upload progress ' +
          //         Math.round((progressEvent.loaded / progressEvent.total) * 100) +
          //         '%'
          //     );
          //   },
          // }
        )
        .then((res) => {
          console.log(res, 'this is the response');
          console.log(res.data, 'this is res.data');
          console.log(res.statusText);
        });
    }

    window.location.reload(true);
  };

  closeButton(e) {
    e.preventDefault();
    //return <Redirect path='/market-place' Component={MarketPlace}></Redirect>;
    window.location.reload(false);
    console.log('called close button');
  }
  render() {
    return (
      // <div>{this.props.children}</div>

      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>Edit Profile</h1>
          <form onSubmit={this.handleSubmit} className='form-fields'>
            <div className='button-wrapper'>
              <button className='close-button' onClick={this.closeButton}>
                X
                </button>
            </div>
            {/*</div>
              <label>User's Name: </label>
              <input
                type='text'
                className='form-input'
                placeholder='username'
                maxLength='100'
                value={this.state.name}
                onChange={this.nameChangeHandler}
                ></input>
            </div>*/}
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
                maxLength='10'
                minLength='10'
                value={this.state.phonenum}
                onChange={this.numberChangeHandler}
              />
            </div>
            <div>
              {/* make into a description box */}
              <label>Bio Description</label>
              <br />
              <textarea
                className='form-input'
                autoFocus
                placeholder='Type your description'
                maxLength='180'
                rows='5'
                cols='40'
                value={this.state.description}
                onChange={this.descriptionChangeHandler}
              />
            </div>

            <div className='form-group files '>
              <label>Profile Picture: </label>
              <input
                className='form-control'
                type='file'
                multiple=''
                name='myImage'
                onChange={this.pictureChangeHandler}
              />
            </div>

          </form>
          <button className='submit-button' onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default EditProfile;

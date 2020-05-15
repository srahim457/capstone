import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './styles/CreateListing.css';
import AllGuilds from './AllGuilds';
import MarketPlace from './MarketPlace';
import axios from 'axios';

function validate(name, description) {
  // true means invalid, so our conditions got reversed
  return {
    name: name.length === 0,
    desciption: description.length === 0,
  };
}

class CreateGuild extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      desc: '',
      picture: null,
      close: 'false',
      value: '',
    };
    this.closeButton = this.closeButton.bind(this);
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
      desc: e.currentTarget.value
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

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.canBeSubmitted()) {
      alert('Unable to submit: some field may be empty');
      return;
    }
    else {
      /*
// dont need to do two seperate requests
// kept here for future ref in case needed
const[firstResp] = await Promise.all([
  axios.get('http://localhost:4000/market-place/listed')  
]);
const secondResp = await axios.get('http://localhost:4000/item/'+firstResp.data.item_id)
 
// Will need to loop and get request on every item for information for every item user has
console.log('first \n', firstResp, 'second \n', secondResp);

this.setState({
  itemname: secondResp.data.item_name,
  itemdesc: secondResp.data.item_desc,
  itemimg: secondResp.data.image,
  totalprice: firstResp.data.total_price,
  rentaltype: firstResp.data.type
})
*/

      //console.log(this.state); //post request with axios
      const guild = this.state;
      console.log(guild, 'sending create with that')
      axios
        .post(`http://localhost:4000/all-guilds/create`, { guild })
        .then((res) => {
          console.log(res, '\n that was the response ');
          console.log(res.data);
        }).then(res => {
          if (this.state.picture != null) {

            const picture = this.state.picture;
            console.log(picture, ' in handle submit');
            //console.log(phonenum, description, profile_picture);

            const image_picture = new FormData();

            image_picture.append(
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
            axios
              .post(
                `http://localhost:4000/all-guilds/picture`,

                //{ phonenum, description, profile_picture },

                image_picture,
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

        });
      console.log(this.state, 'after axios', guild, '\n')
      alert('submission has been completed');
    }
  };

  canBeSubmitted() {
    const empty = validate(
      this.state.name,
      this.state.desc,
    );
    const isDisabled = Object.keys(empty).some(x => empty[x]);
    return !isDisabled;
  }

  closeButton(e) {
    e.preventDefault();
    this.setState({ close: true });
  }

  render() {
    if (this.state.close === true) {
      return <AllGuilds />;
    }
    return (
      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>Create Guild</h1>
          <div className='button-wrapper'>
            <button className='close-button' onClick={this.closeButton}>
              X
            </button>
          </div>
          <form onSubmit={this.handleSubmit} className='form-fields'>
            <div>
              <label>Guild Name </label>
              <br />
              <input
                type='text'
                className='form-input'
                placeholder='Name of your guild'
                maxLength='50'
                value={this.state.name}
                onChange={this.itemNameChangeHandler}
              ></input>
            </div>
            <div>
              {/* make into a description box */}

              <label>Guild Biography</label>
              <br />
              <textarea
                className='form-input'
                autofocus
                placeholder='Type information about your guild'
                maxlength='180'
                rows='5'
                cols='40'
                value={this.state.description}
                onChange={this.descriptionChangeHandler}
              />
              <br />
              <div className=' form-group files '>
                <label>Upload Guild Picture: </label>
                <input
                  className='form-control'
                  type='file'
                  multiple=''
                  name='myImage'
                  onChange={this.pictureChangeHandler}
                />
              </div>
              <br />
              <br />
              <button className='submit-button' onClick={this.handleSubmit}> Submit </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateGuild;

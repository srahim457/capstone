import React, { Component, Fragment } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import DateTimePicker from 'react-datetime-picker';
import axios from "axios";
import 'react-confirm-alert/src/react-confirm-alert.css';
/*install this stuff for the confirmation pop-ups:
      npm install react-confirm-alert --save
*/
import './styles/CreateListing.css';
{
  /*uses the same css file as create listing,
because the layout is exactly the same except
when editing the form fields should be filled with existing information
also there is a delete button to delete the listing entirely
*/
}



class EditListing extends Component {
  constructor(props) {
    super(props);
    //console.log('edit listing props\n', props.item)

    this.state = {
      name: '',
      price: '',
      description: '',
      option: '',
      date: '',
      curTime: new Date().toLocaleString(),
      policy: '',
      image: '',
      delete_item: 'false',
      insurance: ''
    };
    this.delete = this.delete.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  itemNameChangeHandler = (e) => {
    const {
      target: { value },
    } = e;
    this.setState({ name: value });
  };

  descriptionChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      description: e.currentTarget.value,
    });
  };

  handleOptionChange = (e) => {
    e.preventDefault();
    this.setState({
      option: e.currentTarget.value,
    });
  };

  priceChangeHandler = (e) => {
    this.setState({
      price: e.currentTarget.value,
    });
  };

  insuranceChangeHandler = (e) => {
    this.setState({
      insurance: e.currentTarget.value,
    });
  };

  policyChangeHandler = (e) => {
    this.setState({
      policy: e.currentTarget.value,
    });
  };

  async handleDeletion() {
    //console.log('at delete \n', this.props.item)
    var itemidToUse = 0
    if (this.props.item.item_id == undefined) {
      itemidToUse = this.props.item.itemid
    } else {
      itemidToUse = this.props.item.item_id
    }
    const deletingitem = await axios.get('http://localhost:4000/market-place/delete/' + itemidToUse)
    this.setState({ delete_item: true });
    window.location.reload(false);
    console.log('at delete \n', this.props.item)
  }

  delete() {
    confirmAlert({
      title: 'Delete this Listing: ',
      message: 'Are you sure you want to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.handleDeletion(),
        },
        {
          label: 'No',
          onClick: () => this.setState({ delete_item: false }),
        },
      ],
    });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    console.log('current state at submit', this.state, 'props', this.props.item)
    var itemidToUse = 0
    if (this.props.item.item_id == undefined) {
      itemidToUse = this.props.item.itemid
    } else {
      itemidToUse = this.props.item.item_id
    }
    var toUpdate = { newItem: this.state, itemID: itemidToUse }
    await axios.put('http://localhost:4000/market-place/' + itemidToUse, { toUpdate })
    if (this.state.image != null) {
      alert(this.state.image);
      const image = this.state.image;
      console.log(image, ' in handle submit');
      //console.log(phonenum, description, profile_picture);

      const listing_picture = new FormData();

      listing_picture.append(
        'myImage',
        this.state.image,
        this.state.image.name
      );
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      console.log(this.state.image, 'name of file');
      await axios
        .post(
          `http://localhost:4000/market-place/picture`,

          //{ phonenum, description, profile_picture },

          listing_picture,
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

  }

  reloadPage() {
    window.location.reload(false);
  }

  componentDidMount() {
    const { name } = this.props;
    this.setState({ name: name });
  }

  pictureChangeHandler = (e) => {
    this.setState({
      image: e.target.files[0],
      loaded: 0,
    });
    //console.log(this.state.picture, '$$$$');
    //console.log(e.target.files[0], '$$$$');
  };

  onDateChange = (date) => this.setState({ date });
  loanForm() {
    let minimumDate = new Date();
    return (
      <Fragment>
        <br />
        <label>Set your insurance amount in case of damage</label>
        <br />$
        <input
          className='priceBox'
          type='number'
          min='0.01'
          step='0.01'
          max='2500'
          onChange={this.insuranceChangeHandler}
        ></input>
        <br />
        <label>
          <strong>
            Input the time and date that you want the item to be returned
          </strong>
        </label>
        <br />
        <br />
        <DateTimePicker
          onChange={this.onDateChange}
          value={this.state.date}
          minDate={minimumDate}
        />
        <br />
        <br />
        <label>
          <strong>Set loan policy</strong>
        </label>
        <br />
        <textarea
          className='form-input'
          autoFocus
          placeholder={this.props.item.policy}
          maxLength='180'
          rows='8'
          cols='70'
          value={this.state.policy}
          onChange={this.policyChangeHandler}
        />
      </Fragment>
    );
  }

  saleForm() {
    return (
      <Fragment>
        <label>Price</label>
        <br />$
        <input
          className='priceBox'
          type='number'
          min='0.01'
          step='0.01'
          max='2500'
          onChange={this.priceChangeHandler}
        ></input>
      </Fragment>
    );
  }

  rentForm() {
    let minimumDate = new Date();
    return (
      <Fragment>
        <label>Set price per hr</label>
        <br />$
        <input
          className='priceBox'
          type='number'
          min='0.01'
          step='0.01'
          max='2500'
          onChange={this.priceChangeHandler}
        ></input>
        <br />
        <label>Set your insurance amount in case of damage</label>
        <br />$
        <input
          className='priceBox'
          type='number'
          min='0.01'
          step='0.01'
          max='2500'
          onChange={this.insuranceChangeHandler}
        ></input>
        <br />
        <label>
          <strong>
            Input the time and date that you want the item to be returned
          </strong>
        </label>
        <br />
        <br />
        <DateTimePicker
          onChange={this.onDateChange}
          value={this.state.date}
          minDate={minimumDate}
        />
        <br />
        <br />
        <label>
          <strong>Set rental policy</strong>
        </label>
        <br />
        <textarea
          className='form-input'
          autoFocus
          placeholder={this.props.item.policy}
          maxLength='180'
          rows='8'
          cols='70'
          value={this.state.policy}
          onChange={this.policyChangeHandler}
        />
      </Fragment>
    );
  }
  render() {
    return (
      // <div>{this.props.children}</div>

      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>Edit Listing: {this.props.item.item_name} </h1>
          <div className='button-wrapper'>
            <button className='close-button' onClick={this.reloadPage}>
              X
            </button>
          </div>
          <form onSubmit={this.handleSubmit} className='form-fields'>
            <div>
              <label>Item Name </label>
              <br />
              <input
                type='text'
                className='form-input'
                placeholder={this.props.item.item_name}
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
                placeholder={this.props.item.item_desc}
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
                value='sale'
                name='contact'
                onChange={this.handleOptionChange}
                checked={this.state.option === 'sale'}
              />
              <label for='sale'>Sale</label>
              <br />
              <input
                type='radio'
                id='loan'
                value='loan'
                name='contact'
                onChange={this.handleOptionChange}
                checked={this.state.option === 'loan'}
              />
              <label for='loan'>Loan</label>
              <br />
              <input
                type='radio'
                id='rental'
                value='rental'
                name='contact'
                onChange={this.handleOptionChange}
                checked={this.state.option === 'rental'}
              />
              <label for='rental'>Rental</label>
            </div>
            {this.state.option === 'sale' || this.state.option === ''
              ? this.saleForm()
              : this.state.option === 'loan'
                ? this.loanForm()
                : this.rentForm()}
            <br />
            <br />
            <label>Upload an image</label>
            <br />
            <input
              className='form-control'
              type='file'
              multiple=''
              name='myImage'
              onChange={this.pictureChangeHandler}
            />
          </form>
          <button className='submit-button' onClick={this.handleSubmit}>Submit</button>
          <button className='submit-button' onClick={this.delete}>Delete Listing</button>
        </div>
      </div>
    );
  }
}

export default EditListing;

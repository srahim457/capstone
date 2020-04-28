import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
/*install this stuff for the confirmation pop-ups:
      npm install react-confirm-alert --save
*/
import './styles/CreateListing.css';
{/*uses the same css file as create listing,
because the layout is exactly the same except
when editing the form fields should be filled with existing information
also there is a delete button to delete the listing entirely
*/}

class EditListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      description: '',
      option: '',
      delete_item: 'false',
    };
    this.delete = this.delete.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  itemNameChangeHandler = e => {
   const { target: {value} } = e;
   this.setState({ name: value });
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
  handleDeletion (){
    this.setState({delete_item: true});
    window.location.reload(false);
  }

  delete (){
    confirmAlert({
      title: 'Delete this Listing: ',
      message: 'Are you sure you want to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>  this.handleDeletion()
        },
        {
          label: 'No',
          onClick: () => this.setState({delete_item: false})
        }
      ]
    });
  }

  reloadPage (){
    window.location.reload(false)
  }

  componentDidMount() {
  const {name} = this.props;
   this.setState({ name: name});
  }

  render() {
    const {name} = this.props;
    return (
      // <div>{this.props.children}</div>

      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>Edit Listing: {name} </h1>
          <div className='button-wrapper'>
            <button className='close-button'
                    onClick = {this.reloadPage}
            >
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
                placeholder={this.state.name}
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
          <button onClick={this.delete}>Delete Listing</button>
        </div>
      </div>
    );
  }
}

export default EditListing;

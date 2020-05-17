import React, { Component } from 'react';
import './styles/EditProfile.css';

/* !!! not pretty, did not edit all the change handlers*/
class CreateListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      score: null,
      option: '',
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  handleOptionChange = (e) => {
    this.setState({
      option: e.currentTarget.value,
      score: Number(e.currentTarget.value),
    });
  };

  reloadPage (){
    window.location.reload(false)
  }

submitHandler() {
    //check if a rating was not selected
    if(this.state.score === null){
      //give an alert
      alert('You must select a rating to complete the transaction!')
    }
    else{
    //time for math!
      console.log('The user id is: ', this.state.borrower_id)
      //pull the users current rank and number of reviews so far (not including this one)
      let curr_rank = 5
      let curr_reviews = 6
      //multiply the users current rank by the number of reviews = current sum
      let curr_sum = curr_rank * curr_reviews
      //add the new rating value to the current sum = new sum
      let new_sum = curr_sum + this.state.score
      //add 1 to the current number of reviews = new num reviews
      let new_num_reviews = curr_reviews + 1
      //divide the new sum by the new sum reviews = new rank
      let new_rank = new_sum/new_num_reviews
      //push new rank to the back end
      console.log('The new rank is: ', new_rank)
      //set the current listed item to deleted
      console.log('The item id is: ', this.state.item_id)
      //alert the submission and refresh the page
      alert('Transaction Complete!')
      this.reloadPage()
    }
  }

  componentDidMount() {
    const { borrower_id, item_name, item_id } = this.props;
    this.setState({ borrower_id: borrower_id });
    this.setState({ item_name: item_name});
    this.setState({item_id: item_id});
  }

  render() {
    return (
      console.log(this.state.borrower_id),
      console.log(this.state.item_name),
      console.log(this.state.score),
      console.log(this.state.option),
      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>Complete Transaction with User: {this.state.borrower_id}</h1>
          <h2 className='title'> The item: {this.state.item_name} </h2>
          <div className='button-wrapper'>
            <button className='close-button' onClick = {this.reloadPage}>X</button>
          </div>
          <div className='form-fields'>
            <h3>What Rating would you like to give this User?</h3>
            <div>
            <br />
            <input
              type='radio'
              value='0'
              onChange={this.handleOptionChange}
              checked={this.state.option === '0'}
            />
            <label>0</label>
            <input
              type='radio'
              value='1'
              onChange={this.handleOptionChange}
              checked={this.state.option === '1'}
            />
            <label>1</label>
            <input
              type='radio'
              value='2'
              onChange={this.handleOptionChange}
              checked={this.state.option === '2'}
            />
            <label>2</label>
            <input
              type='radio'
              value='3'
              onChange={this.handleOptionChange}
              checked={this.state.option === '3'}
            />
            <label>3</label>
            <input
              type='radio'
              value='4'
              onChange={this.handleOptionChange}
              checked={this.state.option === '4'}
            />
            <label>4</label>
            <input
              type='radio'
              value='5'
              onChange={this.handleOptionChange}
              checked={this.state.option === '5'}
            />
            <label>5</label>
            </div>
          </div>
          <button onClick = {this.submitHandler} >Confirm</button>
        </div>
      </div>
    );
  }
}

export default CreateListing;

import React, { Component } from 'react';
import './styles/EditProfile.css';

import axios from 'axios';
import Spinner from './layout/spinner_transparent.gif';
import NotAvailable from '../images/noimageavailable.png';
/* !!! not pretty, did not edit all the change handlers*/

function parsePath(orig) {
  let res = orig.substr(9);
  res = '.' + res;
  return res;
}

class PostTransaction extends Component {
  constructor(props) {
    super(props);

    console.log('props passed to post transaction \n',props)
    this.state = {
      name: '',
      isLoading: true,
      score: null,
      option: '',
      borrowedprofile: [],
      item_image: ''
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
  

async submitHandler() {
  console.log('in submit handler')
    //check if a rating was not selected
    if(this.state.score === null){
      //give an alert
      alert('You must select a rating to complete the transaction!')
    }
    else{
      const borrowerProfileResponse = await axios.get('http://localhost:4000/profile/'+ this.state.borrower_id)
      const borrowerProfile = borrowerProfileResponse.data
      this.setState({ borrowedprofile: borrowerProfile, isLoading: false })
      //time for math!
    //console.log('this state', this.state.borrowedprofile)
    //console.log('The user id is: ', this.state.borrowedprofile.id)
    //pull the users current rank and number of reviews so far (not including this one)
    let curr_rank = this.state.borrowedprofile.rating
    let curr_reviews = this.state.borrowedprofile.number_of_reviews
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
      
      var datatoupdate={newrank: new_rank, userid: this.state.borrower_id}
      const[firstResp,secondResp] = await Promise.all([        
        axios.put('http://localhost:4000/profile/ranking/update/'+ this.state.borrower_id,datatoupdate),
        axios.put('http://localhost:4000/market-place/rate/' + this.state.item_id)
      ]);
      console.log('borrowed profile', firstResp.data)
      console.log('completed item', secondResp.data)

    
      //alert the submission and refresh the page
      alert('Transaction Complete!')
      
      //this.reloadPage()
    }
  }
s
  async componentDidMount() {
    const response = await axios.get('http://localhost:4000/profile/'+ this.props.borrower_id)
    console.log('borrowed profile', response.data)
    this.setState({ borrowedprofile: response.data, isLoading: false })

    const { borrower_id, item_name, item_id,item_image } = this.props;
    this.setState({ borrower_id: borrower_id });
    this.setState({ item_name: item_name});
    this.setState({item_id: item_id});
    this.setState({item_image: item_image})
  }

  render() {
    console.log(this.state,'current state')
    const {isLoading} = this.state;
    return (
      <React.Fragment>
      <div className='container-parent'>
        {!isLoading? (
        <div className='container'>
          {console.log(this.state,'\n state after loading')}
          <h1 className='title'>Complete Transaction with User: {this.state.borrowedprofile.username}
          <div className='itemImageWrapper'>{this.state.borrowedprofile.profile_picture!= null ? <img src = {parsePath(this.state.borrowedprofile.profile_picture)} height="100" width="100"></img> : <img src={NotAvailable} height="100" width="100"></img>}
          </div></h1>
          <br/>
          <h2 className='title'> The item: {this.state.item_name} 
          <div className='itemImageWrapper'>{this.state.item_image!= null ? <img src = {parsePath(this.state.item_image)} height="100" width="100"></img> : <img src={NotAvailable} height="100" width="100"></img>}
          </div></h2>
          <div className='button-wrapper'>
            <button className='close-button' onClick = {this.reloadPage}>X</button>
          </div>
          <div className='form-fields'>
            <h3>What Rating would you like to give to {this.state.borrowedprofile.first_name} </h3>     
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
        ):(
          <div className='spinner'>
            <img src={Spinner} alt="loading..." />
          </div>
          )}
        
      </div>
      </React.Fragment>
    );
  }
}

export default PostTransaction;

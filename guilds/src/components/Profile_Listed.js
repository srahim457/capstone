import React, { Component } from 'react';
import axios from 'axios';
//import Navigation from './Navigation';
import {
  BrowserRouter,
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
} from 'react-router-dom';

import './styles/profile.css';
import EditListing from './EditListing';

class Profile_Listed extends Component {
  constructor() {
    super();

    var numItems = [...Array(100).keys()].map((i) => ({
      id: i + 1,
      name: 'Item ' + (i + 1),
      description: 'this is an item',
      cost: i + 1,
    }));

    this.state = {
      numItems: numItems,
      name: 'some existing name',
      click: false, //added to see if it respond on click
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  async componentDidMount(){
    let listeditemname;
    let listeditemdesc
    let listeditemimg;
    let listeditemcost;
    let listeditempolicy;
    let listedrentaltype;
    let listedrentprice;
    let listedinsurance;

    axios.get('http://localhost:4000/market-place/listed').then((res) => {
      const listedlistings = res.data;
      this.setState({ listedlistings });

      listeditemname = res.data.item_name;
      listeditemdesc = res.data.item_desc;
      listeditemimg = res.data.image;
      listeditemcost = res.data.total_price;
      listeditempolicy = res.data.policy;
      listedrentaltype = res.data.type;
      listedrentprice = res.data.rent_amount;
      listedinsurance = res.data.insurance_amount;

      this.setState({listeditemname,listeditemdesc,listeditemimg,listeditemcost,listeditempolicy,listedrentaltype,listedrentprice,listedinsurance})
  
     console.log(res.data);
  
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

  });
}

  testClick(item) {
    //window.location.reload(false)
    this.setState({ name: item.name });
    this.setState({ click: true });
  }

  onClickHandler(e) {
    e.preventDefault();
    this.setState({ click: true });
  }

  render() {
    {
      /*routes to an edit listing page*/
    }

    if (this.state.click === true) {
      return <EditListing name={this.state.name} />;
    }

    return (
      <div className='ItemListWrapper'>
        {this.state.numItems.map((item) => (
          <div className='item' key={item.id}>
            <div className='itemImageWrapper'>
              <h1> img {item.id} </h1>
            </div>

            <div className='itemInfoWrapper'>
              <h1 className='itemInfoField'> Name: {item.name}</h1>
              <h1 className='itemInfoField'> Cost: ${item.cost}</h1>
            </div>

            <div className='editListingButtonWrapper'>
              <button
                class='edit-button'
                onClick={this.testClick.bind(this, item)}
              >
                Edit Listed Item
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Profile_Listed;

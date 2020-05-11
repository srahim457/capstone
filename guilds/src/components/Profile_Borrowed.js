import React, { Component } from 'react';
import './styles/profile.css';
import axios from 'axios';

class Profile_Borrowed extends Component {
  async componentDidMount(){
    let itemname;
    let itemdesc
    let itemimg;
    let itemcost;
    let itempolicy;
    let rentaltype;
    let rentprice;
    let insurance;

    axios.get('http://localhost:4000/market-place/borrowed').then((res) => {
      const listings = res.data;
      console.log('listing data \n',listings)
      this.setState({ listings });

      itemname = res.data.item_name;
      itemdesc = res.data.item_desc;
      itemimg = res.data.image;
      itemcost = res.data.total_price;
      itempolicy = res.data.policy;
      rentaltype = res.data.type;
      rentprice = res.data.rent_amount;
      insurance = res.data.insurance_amount;

      this.setState({itemname,itemdesc,itemimg,itemcost,itempolicy,rentaltype,rentprice,insurance})
  
     console.log(res.data);

    });  
  }
  render(){
    var tmp = [];
    for (var i = 0; i < 15; i++) {
      tmp.push(i);
    }
    var borroweditems = tmp.map(function (i) {
      return (
        <div className='item'>
          <div className='itemImageWrapper'>
            <h1> img {i} </h1>
          </div>
          <div className='itemInfoWrapper'>
            <h1 className='itemInfoField'> Name: Item {i}</h1>
            <h1 className='itemInfoField'> Cost: ${i}</h1>
            <h1 className='itemInfoField'> Borrow Date: #/#/#  Return Date: #/#/# </h1>
          </div>
        </div>
      );
    });
    
    return (
      <div className='ItemListWrapper'>
        {borroweditems}
      </div>

    );
  }
}

export default Profile_Borrowed;

import React, { Component } from 'react';

class Profile_Listed extends Component {
  render(){
    var tmp = [];
    for (var i = 0; i < 4; i++) {
      tmp.push(i);
    }

    var items = tmp.map(function (i) {
      return (
        <div className='item'>
          <div className='itemImageWrapper'>
            <h1> img {i} </h1>
          </div>
          <div className='itemInfoWrapper'>
            <h1 className='itemInfoField'> Name: Item {i}</h1>
            <h1 className='itemInfoField'> Cost: ${i}</h1>
          </div>
          <div className='editListingButtonWrapper'>
            <button class="edit-button">
              Edit Listed Item
            </button>
          </div>
        </div>
      );
    });

    return (
      <div className='ItemListWrapper'>
        {items}
      </div>

    );
  }
}

export default Profile_Listed;

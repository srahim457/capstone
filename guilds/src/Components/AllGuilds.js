import React, { Component } from 'react';

import './styles/AllGuilds.css';

class AllGuilds extends Component {
  render() {
    var tmp = [];
    for (var i = 0; i < 10; i++) {
      tmp.push(i);
    }

    var guilds = tmp.map(function (i) {
      return (
        <div className='GuildContainer'>
          <div className='GuildImageWrapper'>
            <h1> Image {i} </h1>
          </div>
          <div className='GuildNameWrapper'>
            <h1> guild {i} </h1>
          </div>
        </div>
      );
    });

    return (
      <div className='Background'>
        {' '}
        {/*the background color*/}
        <h1 className='title'>All Guilds</h1>
        <div className='GuildBoard'>
          <div className='addGuildsButtonWrapper'>
            <button className='add-button'>Add New Guild</button>
          </div>

          <div className='searchWrapper'>
            <input
              type='text'
              className='search-input'
              placeholder='search for guilds'
              maxLength='200'
            ></input>
            <button className='search-button'>Search</button>
          </div>

          {guilds}
        </div>
      </div>
    );
  }
}

export default AllGuilds;

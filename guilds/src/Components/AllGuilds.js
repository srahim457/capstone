import React, { Component } from 'react';
import Navigation from './Navigation';
import {
  BrowserRouter,
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  Switch
} from 'react-router-dom';

import './styles/AllGuilds.css';
import CreateGuild from './CreateGuild';
import DisplayGuild from './DisplayGuild';



class AllGuilds extends Component {

  constructor() {
    super();

    var numItems = [...Array(100).keys()].map(i => ({
      id: i + 1,
      name: 'Guild ' + (i + 1),
      description: 'this is guild' + (i+1),
      guildmaster: 'Guy '+ (i+1),
    }));

    this.state = {
      numItems: numItems,
      name: 'some existing name',
      click: false, //added to see if it respond on click
      open: false
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(e) {
    e.preventDefault();
    this.setState({ click: true });
  }
  openGuild(item) {
    this.setState({name: item.name});
    this.setState({description: item.description});
    this.setState({guildmaster: item.guildmaster});
    this.setState({ open: true });
  }

  render(){
    if (this.state.click === true) {
      return <CreateGuild />;
    }

    if (this.state.open === true) {
      return <DisplayGuild
              name = {this.state.name}
              description = {this.state.description}
              guildmaster = {this.state.guildmaster}
            />;
    }

    return(
      <div className='Background'> {/*the background color*/}
        <h1 className='title'>All Guilds</h1>
        <div className='GuildBoard'>

          <div className='addGuildsButtonWrapper'>
            <button class="add-button" onClick={this.onClickHandler}>
            Add New Guild
            </button>
          </div>

          <div className='searchWrapper'>
            <input
              type='text'
              className='search-input'
              placeholder='search for guilds'
              maxLength='200'
            ></input>
            <button class="search-button">
              Search
            </button>
          </div>

            {this.state.numItems.map(item => (
              <div className='GuildContainer'>
                <div className='GuildImageWrapper'
                     onClick={this.openGuild.bind(this, item)}>
                  <h1> Image {item.id} </h1>
                </div>
                <div className='GuildNameWrapper'>
                  <h1> guild {item.id} </h1>
                </div>

              </div>
            ))}

        </div>
      </div>
    );
  }
}

export default AllGuilds;

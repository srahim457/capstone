import React, { Component } from 'react';
//import Navigation from './Navigation';

import './styles/AllGuilds.css';
import CreateGuild from './CreateGuild';
import DisplayGuild from './DisplayGuild';
import noimage from '../images/noimageavailable.png';
import axios from 'axios';


function parsePath(orig) {
  let res = orig.substr(9);
  //res = '.' + res;
  return res;
}

class AllGuildsSearch extends Component {
  constructor() {
    super();
    this.state = {
      click: false, //added to see if it respond on click
      open: false,
      guilds: [],
      isLoading: true,
      description: '',
      picture: null,
      name: '',
      guildid: ''
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(e) {
    e.preventDefault();
    this.setState({ click: true });
  }
  openGuild(item) {
    console.log('open guild listing with search', item)
    this.setState({ name: item.name });
    this.setState({ description: item.guild_desc });
    this.setState({ guildmaster: item.creator_id });
    this.setState({ open: true });
    this.setState({ picture: item.picture }); //added
    this.setState({ guildid: item.id })
  }

  async componentDidMount() {
    const response = await axios.get('http://localhost:4000/all-guilds/search/' + this.props.location.data)
    console.log('all guilds search', response)
    this.setState({ guilds: response.data, isLoading: false })
  }

  render() {
    const { isLoading } = this.state;
    const { data } = this.props.location;

    if (this.state.open === true) {
      console.log(this.state, 'what im passing', this.state)
      return (
        <DisplayGuild
          name={this.state.name}
          description={this.state.description}
          guildmaster={this.state.guildmaster}
          picture={this.state.picture}
          guildid={this.state.guildid}
        />
      );
    }
    return (
      <div className='Background'>
        {' '}
        {/*the background color*/}
        <h1 className='title'>Search Results: {data}</h1>
        <div className='GuildBoard'>
          <React.Fragment>
            {!isLoading ? (
              Object.values(this.state.guilds).map(guild => {
                return (
                  <div className='GuildContainer' key={guild.id}>
                    <div
                      className='GuildImageWrapper'
                      onClick={this.openGuild.bind(this, guild)}
                    >
                      {guild.picture != null ? (
                        <img
                          src={parsePath(guild.picture)}
                          height='200'
                          width='200'
                          alt={this.state.name}
                        ></img>
                      ) : (
                          <img src={noimage} height='200' width="200" alt={this.state.name} ></img>
                        )}
                    </div>
                    <div className='GuildNameWrapper'>
                      <h1>{guild.name} </h1>
                    </div>
                  </div>
                );
              })
            ) : (
                <h3>Loading</h3>
              )}
          </React.Fragment>
        </div>
      </div>
    );
  }
}

export default AllGuildsSearch;

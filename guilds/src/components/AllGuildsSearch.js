import React, { Component } from 'react';
//import Navigation from './Navigation';

import './styles/AllGuilds.css';
import CreateGuild from './CreateGuild';
import DisplayGuild from './DisplayGuild';
import axios from 'axios';

class AllGuilds extends Component {
  constructor() {
    super();
    this.state = {
      click: false, //added to see if it respond on click
      open: false,
      guilds: [],
      isLoading: true,
      description: ''
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(e) {
    e.preventDefault();
    this.setState({ click: true });
  }
  openGuild(item) {
    console.log('open guild listing with', item)
    this.setState({ name: item.name });
    this.setState({ description: item.desc });
    this.setState({ guildmaster: item.creator_id });
    this.setState({ open: true });
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
      //console.log(this.state, 'what im passing', this.state.guilds[0])
      return (
        <DisplayGuild
          name={this.state.guilds[0].name}
          description={this.state.guilds[0].guild_desc}
        // could pull first member of guild
          guildmaster={this.state.guilds[0].creator_id}
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
                      <h1> Image {guild.picture} </h1>
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

export default AllGuilds;

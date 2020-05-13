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
    console.log('open guild listing with',item)
    this.setState({ name: item.name });
    this.setState({ description: item.desc });
    this.setState({ guildmaster: item.guildmaster });
    this.setState({ open: true });
  }

  async componentDidMount() {
    const response = await axios.get('http://localhost:4000/all-guilds/')
    console.log('all guilds', response)
    this.setState({guilds: response.data, isLoading: false})
  }

  render() {
    const {isLoading} = this.state;
    if (this.state.click === true) {
      return <CreateGuild />;
    }

    if (this.state.open === true) {
      console.log(this.state,'what im passing',this.state.guilds[0])
      return (
        <DisplayGuild
          name={this.state.guilds[0].name}
          description={this.state.guilds[0].guild_desc}
          // could pull first member of guild
          //guildmaster={this.state.guildmaster}
        />
      );
    }

    return (
      <div className='Background'>
        {' '}
        {/*the background color*/}
        <h1 className='title'>Search Results: </h1>
      </div>
    );
  }
}

export default AllGuilds;

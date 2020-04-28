import React, { Component } from 'react';
import './styles/CreateListing.css';
import AllGuilds from './AllGuilds';
{/*uses the same css file as create listing,
because the layout is exactly the same except
when editing the form fields should be filled with existing information
also there is a delete button to delete the listing entirely
*/}

class DisplayGuild extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      guildmaster: '',
      close: false,
    };
    this.closeButton = this.closeButton.bind(this);
  }

  closeButton(e) {
    e.preventDefault();
    this.setState({ close: true });
  }

  render() {
    var {name, description, guildmaster} = this.props;

    if (this.state.close === true) {
      return <AllGuilds />;
    }

    return (
      // <div>{this.props.children}</div>

      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>{name}</h1>
          <div className='button-wrapper'>
            <button className='close-button' onClick={this.closeButton}>
              X
            </button>
          </div>
          <form onSubmit={this.handleSubmit} className='form-fields'>
            <div>
              <label> Name: </label>
              {name}
            </div>
            <div>
              {/* make into a description box */}
              <label> Description:</label>
              {description}
            </div>
            <div>
              {/* make into a description box */}
              <label> Founded by: </label>
              {guildmaster}
            </div>
            <div>
              <label>
                Images:
              </label>
              <br />
            </div>
          </form>
          <button>Join Guild</button>
        </div>
      </div>
    );
  }
}

export default DisplayGuild;

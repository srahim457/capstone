import React, { Component } from 'react';
import './styles/CreateListing.css';
import AllGuilds from './AllGuilds';
import noimage from '../images/noimageavailable.png';
import axios from 'axios';
{/*uses the same css file as create listing,
because the layout is exactly the same except
when editing the form fields should be filled with existing information
also there is a delete button to delete the listing entirely
*/}



function parsePath(orig) {
  let res = orig.substr(9);
  res = '.' + res;
  return res;
}

class DisplayGuild extends Component {
  constructor(props) {
    super(props);

    console.log('displayguild props passed \n ',this.props)

    this.state = {
      name: '',
      description: '',
      guildmaster: '',
      close: false,
      picture: null,
      guildmasterinfo: [],
      isLoading:  true
    };
    this.closeButton = this.closeButton.bind(this);
  }

  closeButton(e) {
    e.preventDefault();
    this.setState({ close: true });
  }
  //create a button on click handler
  onClickHandler = (e) => {
    e.preventDefault();
  }

  async componentDidMount(){

    let guildmasterinfo;    
    const response = await axios.get('http://localhost:4000/profile/'+this.props.guildmaster)
    this.setState({ guildmasterinfo: response.data, isLoading: false })
  }

  render() {
    var { name, description, guildmaster, picture } = this.props;
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
              {picture != null ? (
                <img
                  src={parsePath(picture)}
                  height='400'
                  width='450'
                  alt=''
                ></img>
              ) : (
                  <img src={noimage} height='350' width="400" ></img>
                )}

              {/*picture*/}
              <br />
            </div>
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
              <label> Guild Master: </label>
              {this.state.guildmasterinfo.username}
            </div>

          </form>
          <button className="submit-button">Join Guild</button>
        </div>
      </div>
    );
  }
}

export default DisplayGuild;

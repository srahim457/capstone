import React, { Component } from 'react';
import './styles/CreateListing.css';
{/*uses the same css file as create listing,
because the layout is exactly the same except
when editing the form fields should be filled with existing information
also there is a delete button to delete the listing entirely
*/}

class DisplayGuild extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'some guild',
      description: 'some description',
    };
  }


  handleOptionChange = e => {
    e.preventDefault();
    this.setState({
      option: e.currentTarget.value
    });
  };

  render() {
    var {name, price} = this.props;
    return (
      // <div>{this.props.children}</div>

      <div className='container-parent'>
        <div className='container'>
          <h1 className='title'>{this.state.name}</h1>
          <form onSubmit={this.handleSubmit} className='form-fields'>
            <div>
              <div className='button-wrapper'>
                <button className='close-button'>X</button>
              </div>
              <label>Item Name: </label>
              {this.state.name}
            </div>
            <div>
              {/* make into a description box */}
              <label>Item Description:</label>
              {this.state.description}
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

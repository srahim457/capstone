import React, { Component } from 'react';
import './styles/CreateListing.css';


function validate(name, description) {
  // true means invalid, so our conditions got reversed
  return {
    name: name.length === 0,
    description: description.length === 0,
  };
}

class CreateGuild extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
    };
  }

  itemNameChangeHandler = e => {
    e.preventDefault();
    this.setState({
      name: e.currentTarget.value
    });
  };

  descriptionChangeHandler = e => {
    e.preventDefault();
    this.setState({
      description: e.currentTarget.value
    });
  };

  handleSubmit = evt => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      alert('Unable to submit: some field may be empty');
      return;
    }
    else{
      alert('submission has been completed');
    }
  };

  canBeSubmitted() {
    const empty = validate(
                            this.state.name,
                            this.state.description,
                          );
    const isDisabled = Object.keys(empty).some(x => empty[x]);
    return !isDisabled;
  }



  render() {
    return (
      <div>
        Hello
      </div>
    );
  }
}

export default CreateGuild;

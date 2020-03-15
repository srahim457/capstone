import React, { Component } from 'react';
import CreateListing from './CreateListing';

class Items extends Component {
  super();
  render() {
    return <h1>This is an {this.props.name} Component</h1>;
  }
}

export default Items;
